import { addNotification, setConnected } from '@/common/stores/notificationStore/notificationSlice';
import { fetchUnreadCountThunk, fetchUnreadNotificationsThunk } from '@/common/stores/notificationStore/notificationThunks';
import { useAppDispatch, useAppSelector } from '@/core/store/hooks';
import { getAccessToken } from '@/common/utils/cookies';

import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { useEffect, useRef } from 'react';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const useSignalRConnection = () => {
  const dispatch = useAppDispatch();
  const connectionRef = useRef<HubConnection | null>(null);
  const user = useAppSelector((state) => state.root.auth.user);
  const isAuthenticated = useAppSelector((state) => state.root.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated || !user || user.role !== 'SystemAdmin') {
      return;
    }

    const accessToken = getAccessToken();
    if (!accessToken) {
      return;
    }

    // Create SignalR connection
    const connection = new HubConnectionBuilder()
      .withUrl(`${BASE_URL}/notifications`, {
        accessTokenFactory: () => accessToken,
        skipNegotiation: true,
        transport: 1, // WebSockets
      })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();

    // Set up event handlers
    connection.on('OrderCreated', (notificationContent: string | object) => {
      try {
        // notificationContent might be a string (JSON) or already an object
        const notification = typeof notificationContent === 'string' 
          ? JSON.parse(notificationContent) 
          : notificationContent;
        
        // Ensure the notification has the required structure
        if (notification && notification.id) {
          dispatch(addNotification(notification));
          // Refresh unread count
          if (user?.sub) {
            dispatch(fetchUnreadCountThunk(user.sub));
          }
        } else {
          console.warn('Received invalid notification format:', notificationContent);
          // Refresh notifications from server to get the latest
          if (user?.sub) {
            dispatch(fetchUnreadNotificationsThunk(user.sub));
            dispatch(fetchUnreadCountThunk(user.sub));
          }
        }
      } catch (error) {
        console.error('Failed to parse notification:', error);
        // If parsing fails, refresh notifications from server
        if (user?.sub) {
          dispatch(fetchUnreadNotificationsThunk(user.sub));
          dispatch(fetchUnreadCountThunk(user.sub));
        }
      }
    });

    connection.onreconnecting(() => {
      dispatch(setConnected(false));
    });

    connection.onreconnected(() => {
      dispatch(setConnected(true));
    });

    // Start connection
    connection
      .start()
      .then(() => {
        console.log('SignalR Connected');
        dispatch(setConnected(true));
      })
      .catch((error) => {
        console.error('SignalR Connection Error:', error);
        dispatch(setConnected(false));
      });

    connectionRef.current = connection;

    // Cleanup on unmount
    return () => {
      if (connectionRef.current) {
        connectionRef.current.stop();
        connectionRef.current = null;
        dispatch(setConnected(false));
      }
    };
  }, [isAuthenticated, user, dispatch]);

  return connectionRef.current;
};

