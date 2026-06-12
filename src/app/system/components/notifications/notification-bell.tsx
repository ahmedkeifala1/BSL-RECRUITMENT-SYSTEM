"use client";

import { Badge, Button, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { Notification } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { Icon } from "@/lib/frontend/icons";
import useNavigation from "@/lib/frontend/hooks/navigation-hook";
import {
  getMyUnreadCount,
  listMyNotifications,
  markAllNotificationsRead,
  markNotificationRead,
} from "./_lib/actions";

function timeAgo(date: Date) {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);

  if (seconds < 60) return "just now";

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  return `${Math.floor(hours / 24)}d ago`;
}

export default function NotificationBell() {
  const { push } = useNavigation();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  async function refresh() {
    const [countRes, listRes] = await Promise.all([
      getMyUnreadCount(),
      listMyNotifications(),
    ]);

    if (countRes.isSuccess) {
      setUnreadCount(countRes.data ?? 0);
    }
    if (listRes.isSuccess) {
      setNotifications(listRes.data ?? []);
    }
  }

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, 60000);
    return () => clearInterval(interval);
  }, []);

  async function handleNotificationClick(notification: Notification) {
    if (!notification.isRead) {
      await markNotificationRead(notification.id);
      refresh();
    }

    setIsOpen(false);

    if (notification.link) {
      push(notification.link);
    }
  }

  async function handleMarkAllRead() {
    await markAllNotificationsRead();
    refresh();
  }

  return (
    <Popover placement="bottom-end" isOpen={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <Button isIconOnly variant="light" aria-label="Notifications">
          <Badge
            content={unreadCount}
            color="danger"
            isInvisible={unreadCount === 0}
            shape="circle"
          >
            <Icon name="Bell" size={20} />
          </Badge>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-80 p-0">
        <div className="flex items-center justify-between w-full px-4 py-2 border-b">
          <p className="font-semibold">Notifications</p>

          {unreadCount > 0 && (
            <Button size="sm" variant="light" onPress={handleMarkAllRead}>
              Mark all as read
            </Button>
          )}
        </div>

        <div className="max-h-96 overflow-y-auto w-full">
          {notifications.length === 0 ? (
            <p className="text-center text-sm text-slate-500 py-6">
              No notifications yet
            </p>
          ) : (
            notifications.map((notification) => (
              <button
                key={notification.id}
                onClick={() => handleNotificationClick(notification)}
                className={`w-full text-left px-4 py-3 border-b last:border-b-0 hover:bg-slate-50 ${
                  notification.isRead ? "" : "bg-blue-50"
                }`}
              >
                <p className="font-medium text-sm">{notification.title}</p>
                <p className="text-sm text-slate-600">{notification.message}</p>
                <p className="text-xs text-slate-400 mt-1">
                  {timeAgo(notification.createdAt)}
                </p>
              </button>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
