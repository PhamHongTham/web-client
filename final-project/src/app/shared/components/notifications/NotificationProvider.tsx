import React, { createContext, useState } from 'react';
import { v4 } from 'uuid';
import Notification from './Notification';

interface NotificationOptions {
  id: string;
  type: string;
  message: string;
}
export const NotificationContext = createContext<any>(null);

const NotificationProvider = ({ children }: any) => {
  const [notifications, setNotifications] = useState<NotificationOptions[]>([]);
  const handleAddNotification = (notification: NotificationOptions) => {
    let newNotification: NotificationOptions = {
      id: v4(),
      type: notification.type,
      message: notification.message,
    };
    setNotifications((notifications) => [...notifications, newNotification]);
  };
  const handleDeleteNotification = (notificationId: string) => {
    setNotifications((notifications) =>
      notifications.filter(
        (item: NotificationOptions) => item.id !== notificationId
      )
    );
  };
  const contextData = {
    handleAddNotification,
    handleDeleteNotification,
  };
  return (
    <NotificationContext.Provider value={contextData}>
      <div className="notification-wrapper">
        {notifications.map((notification: NotificationOptions) => (
          <Notification key={notification.id} notification={notification} />
        ))}
      </div>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
