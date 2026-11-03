"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  STAFF_COOKIE,
  createStaffSessionToken,
  staffAuthConfigured,
  staffUsername,
  verifyStaffSessionToken,
} from "@/lib/staff-auth";
import { changeStaffPassword, verifyStaffPassword } from "@/lib/staff-password";
import { deleteInboxRecord } from "@/lib/staff-inbox";

export type StaffLoginState = {
  status: "idle" | "invalid" | "failed";
  message?: string;
} | null;

export type StaffPasswordState = {
  status: "idle" | "invalid" | "failed" | "success";
  message?: string;
} | null;

async function requireStaffSession() {
  const jar = await cookies();
  const session = verifyStaffSessionToken(jar.get(STAFF_COOKIE)?.value);
  if (!session) redirect("/staff/login");
  return { jar, session };
}

export async function loginStaff(
  _previous: StaffLoginState,
  formData: FormData,
): Promise<StaffLoginState> {
  if (!staffAuthConfigured()) {
    return {
      status: "failed",
      message: "Staff login is not configured on this server yet.",
    };
  }

  const expectedUsername = staffUsername();
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const nextPath = String(formData.get("next") ?? "/staff").trim() || "/staff";

  if (!username || !password) {
    return {
      status: "invalid",
      message: "Enter your staff username and password.",
    };
  }

  const passwordOk = await verifyStaffPassword(password);
  if (username !== expectedUsername || !passwordOk) {
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
  await requireStaffSession();

  const id = String(formData.get("id") ?? "").trim();
  if (!id) return;

  await deleteInboxRecord(id);
  revalidatePath("/staff");
}

export async function updateStaffPassword(
  _previous: StaffPasswordState,
  formData: FormData,
): Promise<StaffPasswordState> {
  const { jar, session } = await requireStaffSession();

  const currentPassword = String(formData.get("currentPassword") ?? "");
  const newPassword = String(formData.get("newPassword") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  if (!currentPassword || !newPassword || !confirmPassword) {
    return {
      status: "invalid",
      message: "Enter your current password and the new password twice.",
    };
  }

  const result = await changeStaffPassword(currentPassword, newPassword, confirmPassword);
  if (!result.ok) {
    return {
      status: result.code === "storage" ? "failed" : "invalid",
      message: result.message,
    };
  }

  // Refresh the session after a successful password change.
  jar.set(STAFF_COOKIE, createStaffSessionToken(session.username), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });

  return {
    status: "success",
    message: "Password updated. From now on only the new password will work. The old password will not.",
  };
}
