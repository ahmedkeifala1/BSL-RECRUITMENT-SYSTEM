import Database from "@/lib/backend/database/db-context";
import { ErrorResponse, OkResponse } from "@/lib/shared/response";

export async function createNotification(data: {
  userId: string;
  title: string;
  message: string;
  link?: string;
}) {
  return Database.notification
    .create({ data })
    .then(
      (notification) => OkResponse.created(notification, "Notification created"),
      (error) => ErrorResponse.fromError(error)
    )
    .catch((error) => ErrorResponse.fromError(error));
}

export async function getUnreadCount(userId: string) {
  return Database.notification
    .count({ where: { userId, isRead: false } })
    .then(
      (count) => OkResponse.create(count),
      (error) => ErrorResponse.fromError(error)
    )
    .catch((error) => ErrorResponse.fromError(error));
}

export async function listNotifications(userId: string) {
  return Database.notification
    .findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 10,
    })
    .then(
      (notifications) => OkResponse.create(notifications),
      (error) => ErrorResponse.fromError(error)
    )
    .catch((error) => ErrorResponse.fromError(error));
}

export async function markAsRead(id: string, userId: string) {
  return Database.notification
    .updateMany({
      where: { id, userId },
      data: { isRead: true },
    })
    .then(
      () => OkResponse.create(true, { message: "Notification marked as read" }),
      (error) => ErrorResponse.fromError(error)
    )
    .catch((error) => ErrorResponse.fromError(error));
}

export async function markAllAsRead(userId: string) {
  return Database.notification
    .updateMany({
      where: { userId, isRead: false },
      data: { isRead: true },
    })
    .then(
      () =>
        OkResponse.create(true, { message: "All notifications marked as read" }),
      (error) => ErrorResponse.fromError(error)
    )
    .catch((error) => ErrorResponse.fromError(error));
}
