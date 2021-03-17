import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import { setDeviceToken } from '../utils';

export const setupPushNotification = (handleNotification) => {
  PushNotification.configure({
    onRegister: ({ token }) => {
      setDeviceToken(token);
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
