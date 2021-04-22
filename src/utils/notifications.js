import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import { getToken, setDeviceToken } from '../utils';
import apiCalls from './api-calls';

export const setupPushNotifications = (handleNotification) => {
  PushNotification.configure({
    onRegister: async (deviceInfo) => {
      const authToken = await getToken();

      if (authToken) {
        await apiCalls.registerDevice(authToken, deviceInfo);
      }
      await setDeviceToken(deviceInfo.token);
    },

    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: (notification) => {
      console.log('NOTIFICATION:', notification);

      handleNotification(notification);

      // (required) Called when a remote is received or opened, or local notification is opened
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    popInitialNotification: true,
    requestPermissions: true,
  });

  return PushNotification;
};
