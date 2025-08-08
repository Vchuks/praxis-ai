import { create } from "zustand";

interface NotificationDataType {
  id: string;
  message: string;
}

interface NotificationState {
  notifications: NotificationDataType[];
  addNotification: (message: string) => void;
  removeNotification: (id: string) => void;
}

export const useNotification = create<NotificationState>((set) => ({
  notifications: [
    {
        id: "1",
        message: "Update"
    },
    {
        id: "2",
        message: "Update"
    },
    {
        id: "3",
        message: "Update"
    },
  ],
  addNotification: (message) => {
    const notify = {
      id: Date.now().toString(),
      message,
    };
    set((prev) => ({ notifications: [...prev.notifications, notify] }));
  },

  removeNotification: (dataId) => {
    set((prev) => ({notifications: prev.notifications.filter(nid => nid.id !== dataId)}))
  }
}));
