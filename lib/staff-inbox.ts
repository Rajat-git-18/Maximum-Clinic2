import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { Redis } from "@upstash/redis";

export type AppointmentRecord = {
  id: string;
  type: "appointment_request";
  submittedAt: string;
  service: string;
  doctor: string;
  preferredDate: string;
  timeOfDay: string;
  fullName: string;
  phone: string;
  email: string;
  note: string;
};

export type CareerRecord = {
  id: string;
  type: "career_application";
  submittedAt: string;
  fullName: string;
  phone: string;
  email: string;
  role: string;
  qualification: string;
  experience: string;
  city: string;
  note: string;
};

export type CallbackRecord = {
  id: string;
  type: "callback_request";
  submittedAt: string;
  service: string;
  fullName: string;
  phone: string;
  email: string;
};

export type InboxRecord = AppointmentRecord | CareerRecord | CallbackRecord;

type InboxFile = {
  records: InboxRecord[];
};

const INBOX_KEY = "mh:staff-inbox";
const MAX_RECORDS = 500;
const DATA_DIR = path.join(process.cwd(), "data");
const INBOX_PATH = path.join(DATA_DIR, "staff-inbox.json");

function redisConfigured(): boolean {
  return Boolean(process.env.UPSTASH_REDIS_REST_URL?.trim() && process.env.UPSTASH_REDIS_REST_TOKEN?.trim());
}

function getRedis(): Redis {
  return Redis.fromEnv();
}

function normalizeRecords(value: unknown): InboxRecord[] {
  if (!value) return [];
  if (Array.isArray(value)) return value as InboxRecord[];
  if (typeof value === "object" && value !== null && Array.isArray((value as InboxFile).records)) {
    return (value as InboxFile).records;
  }
  return [];
}

async function readInbox(): Promise<InboxFile> {
  if (redisConfigured()) {
    const raw = await getRedis().get<InboxRecord[] | InboxFile>(INBOX_KEY);
    return { records: normalizeRecords(raw) };
  }

  try {
    const raw = await readFile(INBOX_PATH, "utf8");
    const parsed = JSON.parse(raw) as InboxFile;
    if (!parsed || !Array.isArray(parsed.records)) return { records: [] };
    return { records: parsed.records };
  } catch {
    return { records: [] };
  }
}

async function writeInbox(inbox: InboxFile): Promise<void> {
  if (redisConfigured()) {
    await getRedis().set(INBOX_KEY, inbox.records);
    return;
  }

  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(INBOX_PATH, `${JSON.stringify(inbox, null, 2)}\n`, "utf8");
}

export async function saveInboxRecord(
  record: Omit<AppointmentRecord, "id"> | Omit<CareerRecord, "id"> | Omit<CallbackRecord, "id">,
): Promise<InboxRecord> {
  const inbox = await readInbox();
  const saved = { ...record, id: randomUUID() } as InboxRecord;
  inbox.records.unshift(saved);
  inbox.records = inbox.records.slice(0, MAX_RECORDS);
  await writeInbox(inbox);
  return saved;
}

export async function listInboxRecords(): Promise<InboxRecord[]> {
  const inbox = await readInbox();
  return inbox.records;
}

export async function deleteInboxRecord(id: string): Promise<boolean> {
  const trimmed = id.trim();
  if (!trimmed) return false;
  const inbox = await readInbox();
  const next = inbox.records.filter((item) => item.id !== trimmed);
  if (next.length === inbox.records.length) return false;
  await writeInbox({ records: next });
  return true;
}

export function appointmentsFrom(records: InboxRecord[]): AppointmentRecord[] {
  return records.filter((item): item is AppointmentRecord => item.type === "appointment_request");
}

export function careersFrom(records: InboxRecord[]): CareerRecord[] {
  return records.filter((item): item is CareerRecord => item.type === "career_application");
}

export function callbacksFrom(records: InboxRecord[]): CallbackRecord[] {
  return records.filter((item): item is CallbackRecord => item.type === "callback_request");
}
