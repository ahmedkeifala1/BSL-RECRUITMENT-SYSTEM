"use server";

import { getLoggedUser } from "@/app/auth/_lib/actions";
import { ErrorResponse } from "@/lib/shared/response";
import {
  getUnreadCount,
  listNotifications,
  markAllAsRead,
  markAsRead,
} from "@/lib/backend/services/notification-service";

export async function listMyNotifications() {
  const logged = await getLoggedUser();

  if (logged.isFailure || !logged.data) {
    return ErrorResponse.create(logged.message, logged.code);
  }

  return listNotifications(logged.data.id);
}

export async function getMyUnreadCount() {
  const logged = await getLoggedUser();

  if (logged.isFailure || !logged.data) {
    return ErrorResponse.create(logged.message, logged.code);
  }

  return getUnreadCount(logged.data.id);
}

export async function markNotificationRead(id: string) {
  const logged = await getLoggedUser();

  if (logged.isFailure || !logged.data) {
    return ErrorResponse.create(logged.message, logged.code);
  }

  return markAsRead(id, logged.data.id);
}

export async function markAllNotificationsRead() {
  const logged = await getLoggedUser();

  if (logged.isFailure || !logged.data) {
    return ErrorResponse.create(logged.message, logged.code);
  }

  return markAllAsRead(logged.data.id);
}
