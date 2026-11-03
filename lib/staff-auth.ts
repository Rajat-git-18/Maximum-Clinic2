import { createHmac, timingSafeEqual } from "crypto";

export const STAFF_COOKIE = "mh_staff_session";
const SESSION_HOURS = 12;

function sessionSecret(): string {
  const fromEnv = process.env.STAFF_SESSION_SECRET?.trim();
  if (fromEnv) return fromEnv;
  if (process.env.NODE_ENV !== "production") return "maximum-healthcare-dev-staff-secret";
  return "";
}

export function staffCredentials(): { username: string; password: string } | null {
  const username = process.env.STAFF_USERNAME?.trim() || (process.env.NODE_ENV !== "production" ? "staff" : "");
  const password =
    process.env.STAFF_PASSWORD?.trim() || (process.env.NODE_ENV !== "production" ? "MaximumStaff2026" : "");
  if (!username || !password || !sessionSecret()) return null;
  return { username, password };
}

function sign(payload: string): string {
  return createHmac("sha256", sessionSecret()).update(payload).digest("base64url");
}

export function createStaffSessionToken(username: string, now = Date.now()): string {
  const expires = String(now + SESSION_HOURS * 60 * 60 * 1000);
  const payload = `${username}|${expires}`;
  return `${payload}|${sign(payload)}`;
}

export function verifyStaffSessionToken(token: string | undefined | null): { username: string } | null {
  if (!token || !sessionSecret()) return null;
  const parts = token.split("|");
  if (parts.length !== 3) return null;
  const [username, expires, signature] = parts;
  if (!username || !expires || !signature) return null;
  const expected = sign(`${username}|${expires}`);
  try {
    const left = Buffer.from(signature);
    const right = Buffer.from(expected);
    if (left.length !== right.length || !timingSafeEqual(left, right)) return null;
  } catch {
    return null;
  }
  const expiresAt = Number(expires);
  if (!Number.isFinite(expiresAt) || expiresAt < Date.now()) return null;
  const credentials = staffCredentials();
  if (!credentials || credentials.username !== username) return null;
  return { username };
}

export function passwordsMatch(provided: string, expected: string): boolean {
  const left = Buffer.from(provided);
  const right = Buffer.from(expected);
  if (left.length !== right.length) return false;
  try {
    return timingSafeEqual(left, right);
  } catch {
    return false;
  }
}
