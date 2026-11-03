import { randomBytes, scrypt, timingSafeEqual } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { promisify } from "util";
import { Redis } from "@upstash/redis";
import { passwordsMatch } from "@/lib/staff-auth";

const scryptAsync = promisify(scrypt);

const PASSWORD_KEY = "mh:staff-password";
const DATA_DIR = path.join(process.cwd(), "data");
const PASSWORD_PATH = path.join(DATA_DIR, "staff-password.json");
const HASH_BYTES = 64;
const MIN_PASSWORD_LENGTH = 10;

export type StoredPassword = {
  algo: "scrypt";
  salt: string;
  hash: string;
  updatedAt: string;
};

function redisConfigured(): boolean {
  return Boolean(process.env.UPSTASH_REDIS_REST_URL?.trim() && process.env.UPSTASH_REDIS_REST_TOKEN?.trim());
}

function getRedis(): Redis {
  return Redis.fromEnv();
}

export function bootstrapStaffPassword(): string {
  return process.env.STAFF_PASSWORD?.trim() || (process.env.NODE_ENV !== "production" ? "MaximumStaff2026" : "");
}

export function passwordStorageReady(): boolean {
  if (redisConfigured()) return true;
  return process.env.NODE_ENV !== "production";
}

async function readStoredPassword(): Promise<StoredPassword | null> {
  if (redisConfigured()) {
    const raw = await getRedis().get<StoredPassword>(PASSWORD_KEY);
    if (!raw || typeof raw !== "object") return null;
    if (raw.algo !== "scrypt" || !raw.salt || !raw.hash) return null;
    return raw;
  }

  try {
    const raw = await readFile(PASSWORD_PATH, "utf8");
    const parsed = JSON.parse(raw) as StoredPassword;
    if (!parsed || parsed.algo !== "scrypt" || !parsed.salt || !parsed.hash) return null;
    return parsed;
  } catch {
    return null;
  }
}

async function writeStoredPassword(record: StoredPassword): Promise<void> {
  if (redisConfigured()) {
    await getRedis().set(PASSWORD_KEY, record);
    return;
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("Password storage requires Upstash Redis in production.");
  }

  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(PASSWORD_PATH, `${JSON.stringify(record, null, 2)}\n`, "utf8");
}

async function hashPassword(password: string, salt = randomBytes(16)): Promise<StoredPassword> {
  const derived = (await scryptAsync(password, salt, HASH_BYTES)) as Buffer;
  return {
    algo: "scrypt",
    salt: salt.toString("base64"),
    hash: derived.toString("base64"),
    updatedAt: new Date().toISOString(),
  };
}

async function verifyAgainstHash(password: string, stored: StoredPassword): Promise<boolean> {
  try {
    const salt = Buffer.from(stored.salt, "base64");
    const expected = Buffer.from(stored.hash, "base64");
    const derived = (await scryptAsync(password, salt, expected.length)) as Buffer;
    if (derived.length !== expected.length) return false;
    return timingSafeEqual(derived, expected);
  } catch {
    return false;
  }
}

export async function verifyStaffPassword(provided: string): Promise<boolean> {
  const stored = await readStoredPassword();
  if (stored) return verifyAgainstHash(provided, stored);

  const bootstrap = bootstrapStaffPassword();
  if (!bootstrap) return false;
  return passwordsMatch(provided, bootstrap);
}

export type PasswordChangeResult =
  | { ok: true }
  | { ok: false; code: "auth" | "validation" | "storage" | "same"; message: string };

export async function changeStaffPassword(current: string, next: string, confirm: string): Promise<PasswordChangeResult> {
  if (!(await verifyStaffPassword(current))) {
    return { ok: false, code: "auth", message: "Current password is incorrect." };
  }

  const trimmedNext = next.trim();
  const trimmedConfirm = confirm.trim();

  if (trimmedNext.length < MIN_PASSWORD_LENGTH) {
    return {
      ok: false,
      code: "validation",
      message: `New password must be at least ${MIN_PASSWORD_LENGTH} characters.`,
    };
  }

  if (trimmedNext !== trimmedConfirm) {
    return { ok: false, code: "validation", message: "New password and confirmation do not match." };
  }

  if (trimmedNext === current) {
    return { ok: false, code: "same", message: "Choose a new password that is different from the current one." };
  }

  if (!passwordStorageReady()) {
    return {
      ok: false,
      code: "storage",
      message:
        "Password changes need Upstash Redis on this server. Add UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN, then try again.",
    };
  }

  try {
    const record = await hashPassword(trimmedNext);
    await writeStoredPassword(record);
    return { ok: true };
  } catch {
    return {
      ok: false,
      code: "storage",
      message: "The new password could not be saved. Try again in a moment.",
    };
  }
}

export async function staffPasswordIsCustom(): Promise<boolean> {
  return Boolean(await readStoredPassword());
}
