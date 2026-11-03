"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  STAFF_COOKIE,
  createStaffSessionToken,
  passwordsMatch,
  staffCredentials,
  verifyStaffSessionToken,
} from "@/lib/staff-auth";
import { deleteInboxRecord } from "@/lib/staff-inbox";

export type StaffLoginState = {
  status: "idle" | "invalid" | "failed";
  message?: string;
} | null;

export async function loginStaff(
  _previous: StaffLoginState,
  formData: FormData,
): Promise<StaffLoginState> {
  const credentials = staffCredentials();
  if (!credentials) {
    return {
      status: "failed",
      message: "Staff login is not configured on this server yet.",
    };
  }

  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const nextPath = String(formData.get("next") ?? "/staff").trim() || "/staff";

  if (!username || !password) {
    return {
      status: "invalid",
      message: "Enter your staff username and password.",
    };
  }

  if (username !== credentials.username || !passwordsMatch(password, credentials.password)) {
    return {
      status: "invalid",
      message: "Those staff details were not recognised. Check them and try again.",
    };
  }

  const jar = await cookies();
  jar.set(STAFF_COOKIE, createStaffSessionToken(username), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });

  redirect(nextPath.startsWith("/staff") ? nextPath : "/staff");
}

export async function logoutStaff() {
  const jar = await cookies();
  jar.delete(STAFF_COOKIE);
  redirect("/staff/login");
}

export async function deleteInboxItem(formData: FormData) {
  const jar = await cookies();
  const session = verifyStaffSessionToken(jar.get(STAFF_COOKIE)?.value);
  if (!session) redirect("/staff/login");

  const id = String(formData.get("id") ?? "").trim();
  if (!id) return;

  await deleteInboxRecord(id);
  revalidatePath("/staff");
}
