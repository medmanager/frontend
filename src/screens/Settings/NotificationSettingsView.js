import React, { useCallback, useEffect } from 'react';
import { Switch } from 'react-native';
import { useQueryClient } from 'react-query';
import styled from 'styled-components/native';
import shallow from 'zustand/shallow';
import { useAuth } from '../../store/useAuth';
import useSettings from '../../store/useSettings';
import { Colors } from '../../utils';

const NotificationSettingsScreen = ({ navigation }) => {
  const token = useAuth((state) => state.userToken);
  const {
    silenceAll,
    hideMedName,
    toggleSilenceAllNotifications,
    toggleHideMedName,
    commit,
  } = useSettings(
    (state) => ({
      silenceAll: state.notificationSettings.silenceAll,
      hideMedName: state.notificationSettings.hideMedName,
      toggleSilenceAllNotifications: state.toggleSilenceAllNotifications,
      toggleHideMedName: state.toggleHideMedName,
      commit: state.commit,
    }),
    shallow,
  );
  const queryClient = useQueryClient();

  const handleToggleHideMedName = useCallback(() => {
    toggleHideMedName();
  }, [toggleHideMedName]);

  const handleToggleSilenceAll = useCallback(() => {
    toggleSilenceAllNotifications();
  }, [toggleSilenceAllNotifications]);

  useEffect(() => {
    // add a listener so that when the user navigates away from this screen, commit the changes to the settings
    const unsubscribe = navigation.addListener('beforeRemove', async () => {
      await commit(token); // commit settings changes
      queryClient.invalidateQueries('currentUser');
    });

    return unsubscribe;
  }, [navigation, commit, token, queryClient]);

  return (
    <Container>
      <SettingListItem>
        <SettingInfoContainer>
          <SettingItemText>Silence all notifications</SettingItemText>
          <SettingItemDescriptionText>
            You will not recieve any notifications.
          </SettingItemDescriptionText>
        </SettingInfoContainer>
        <Switch
          onValueChange={handleToggleSilenceAll}
          value={silenceAll}
          trackColor={{
            false: Colors.gray[300],
            true: Colors.blue[500],
          }}
          thumbColor="#fff"
        />
      </SettingListItem>
      <SettingListItem style={{ borderBottomWidth: 1 }}>
        <SettingInfoContainer>
          <SettingItemText>
            Hide medication names in notifications
          </SettingItemText>
          <SettingItemDescriptionText>
            Medication names will not appear in any dosage reminders
          </SettingItemDescriptionText>
        </SettingInfoContainer>
        <Switch
          onValueChange={handleToggleHideMedName}
          value={hideMedName}
          trackColor={{
            false: Colors.gray[300],
            true: Colors.blue[500],
          }}
          thumbColor="#fff"
        />
      </SettingListItem>
    </Container>
  );
};

const Container = styled.SafeAreaView`
  flex: 1;
  margin-vertical: 24px;
`;

const SettingListItem = styled.View`
  padding-horizontal: 18px;
  padding-vertical: 12px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-top-width: 1px;
  border-color: ${Colors.gray[400]};
  background-color: #fff;
`;

const SettingInfoContainer = styled.View`
  flex-direction: column;
  margin-right: 16px;
  flex-shrink: 1;
`;

const SettingItemText = styled.Text`
  color: ${Colors.gray[800]};
  font-size: 17px;
`;

const SettingItemDescriptionText = styled.Text`
  color: ${Colors.gray[500]};
  font-size: 15px;
  margin-top: 4px;
`;

export default NotificationSettingsScreen;
