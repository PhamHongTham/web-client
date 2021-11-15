import React, { useContext, useEffect } from 'react';
import { NotificationContext } from './NotificationProvider';

interface NotificationOptions {
  id: string;
  type: string;
  message: string;
}

const Notification = ({
  notification,
}: {
  notification: NotificationOptions;
}) => {
  const { handleDeleteNotification } = useContext(NotificationContext);
  useEffect(() => {
    setTimeout(() => {
      handleDeleteNotification(notification.id);
    }, 3000);
  });
  return (
    <div
      className={`notification-item ${notification.type === 'SUCCESS' ? 'success' : 'error'
        }`}
    >
      <p>{notification.message}</p>
    </div>
  );
};

export default Notification;
