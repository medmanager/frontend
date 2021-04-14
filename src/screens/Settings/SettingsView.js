import React, { useCallback, useEffect } from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import Icon from 'react-native-vector-icons/Feather';
import { Fade, Placeholder, PlaceholderLine } from 'rn-placeholder';
import styled from 'styled-components/native';
import BellIcon from '../../components/icons/bell';
import PhoneIcon from '../../components/icons/phone';
import UserIcon from '../../components/icons/user';
import { useAuth } from '../../store/useAuth';
import useCurrentUser from '../../store/useCurrentUser';
import useSettings from '../../store/useSettings';
import { Colors, defaultNavigatorScreenOptions } from '../../utils';
import AccountSettingsScreen from './AccountSettingsView';
import CaregiverContactSettingsScreen from './CaregiverContactSettingsView';
import NotificationSettingsScreen from './NotificationSettingsView';

const SettingsScreen = ({ navigation }) => {
  const token = useAuth((state) => state.userToken);
  const signOut = useAuth((state) => state.signOut);
  const { data: user, status } = useCurrentUser(token);
  const setSettingsState = useSettings((state) => state.setState);

  const handleAccountSettingsPress = useCallback(() => {
    navigation.navigate('AccountSettings');
  }, [navigation]);

  const handleNavigationSettingsPress = useCallback(() => {
    navigation.navigate('NotificationSettings');
  }, [navigation]);

  const handleCaregiverContactSettingsPress = useCallback(() => {
    navigation.navigate('CaregiverContactSettings');
  }, [navigation]);

  const handleSignOutPress = useCallback(() => {
    signOut();
  }, [signOut]);

  useEffect(() => {
    // update the store with the settings recieved from the current user object
    if (user && 'settings' in user) {
      setSettingsState((state) => ({
        ...state,
        ...user.settings,
      }));
    }
  }, [user, setSettingsState]);

  return (
    <Container>
      <Flex>
        <UserInfoContainer>
          <Avatar>
            <UserIcon color={Colors.blue[500]} size={48} />
          </Avatar>
          {status === 'loading' ? (
            <Placeholder Animation={Fade} style={{ marginTop: 8 }}>
              <PlaceholderLine
                width={50}
                height={32}
                style={{ alignSelf: 'center' }}
              />
            </Placeholder>
          ) : (
            <UserFullName>
              {user ? `${user.firstName} ${user.lastName}` : 'Unknown'}
            </UserFullName>
          )}
        </UserInfoContainer>
        <NavigationMenuContainer>
          <NavigationMenuItem
            activeOpacity={0.7}
            onPress={handleAccountSettingsPress}>
            <IconGroup>
              <IconContainer>
                <UserIcon color={Colors.gray[600]} />
              </IconContainer>
              <NavigationMenuItemText>Account</NavigationMenuItemText>
            </IconGroup>
            <Icon name="chevron-right" size={24} color={Colors.gray[400]} />
          </NavigationMenuItem>
          <NavigationMenuItem
            activeOpacity={0.7}
            onPress={handleNavigationSettingsPress}>
            <IconGroup>
              <IconContainer>
                <BellIcon color={Colors.gray[600]} />
              </IconContainer>
              <NavigationMenuItemText>Notifications</NavigationMenuItemText>
            </IconGroup>
            <Icon name="chevron-right" size={24} color={Colors.gray[400]} />
          </NavigationMenuItem>
          <NavigationMenuItem
            activeOpacity={0.7}
            style={{ borderBottomWidth: 1 }}
            onPress={handleCaregiverContactSettingsPress}>
            <IconGroup>
              <IconContainer>
                <PhoneIcon color={Colors.gray[600]} />
              </IconContainer>
              <NavigationMenuItemText>Caregiver Contact</NavigationMenuItemText>
            </IconGroup>
            <Icon name="chevron-right" size={24} color={Colors.gray[400]} />
          </NavigationMenuItem>
        </NavigationMenuContainer>
      </Flex>
      <ActionArea>
        <ActionItem
          onPress={handleSignOutPress}
          activeOpacity={0.7}
          style={{ borderBottomWidth: 1 }}>
          <SignOutActionItemText>Sign Out</SignOutActionItemText>
        </ActionItem>
      </ActionArea>
    </Container>
  );
};

const Container = styled.SafeAreaView`
  flex: 1;
`;

const Flex = styled.View`
  flex: 1;
`;

const Centered = styled.View`
  flex-direction: column;
  justify-content: center;
`;

const UserInfoContainer = styled.View`
  flex-direction: column;
  align-items: center;
  padding-vertical: 24px;
`;

const Avatar = styled.View`
  border-radius: 99999px;
  border-width: 3px;
  border-color: ${Colors.blue[500]};
  padding: 10px;
`;

const UserFullName = styled.Text`
  font-size: 24px;
  color: ${Colors.gray[900]};
  margin-top: 8px;
`;

const IconGroup = styled.View`
  flex-direction: row;
  align-items: center;
`;

const IconContainer = styled.View`
  margin-right: 16px;
`;

const NavigationMenuContainer = styled.View`
  flex-direction: column;
`;

const NavigationMenuItem = styled.TouchableOpacity`
  padding-horizontal: 28px;
  padding-vertical: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-top-width: 1px;
  border-color: ${Colors.gray[400]};
  background-color: #fff;
`;

const NavigationMenuItemText = styled.Text`
  color: ${Colors.gray[600]};
  font-size: 18px;
`;

const ActionArea = styled.View`
  margin-vertical: 48px;
`;

const ActionItem = styled.TouchableOpacity`
  background-color: white;
  padding-vertical: 12px;
  border-color: ${Colors.gray[300]};
  border-top-width: 1px;
`;

const SignOutActionItemText = styled.Text`
  font-size: 16px;
  text-align: center;
  color: ${Colors.blue[500]};
`;

const SettingsStack = createNativeStackNavigator();

export default () => (
  <SettingsStack.Navigator
    screenOptions={defaultNavigatorScreenOptions}
    initialRouteName="Settings">
    <SettingsStack.Screen name="Settings" component={SettingsScreen} />
    <SettingsStack.Screen
      name="AccountSettings"
      component={AccountSettingsScreen}
      options={{
        headerTitle: 'Account Settings',
      }}
    />
    <SettingsStack.Screen
      name="NotificationSettings"
      component={NotificationSettingsScreen}
      options={{
        headerTitle: 'Notification Settings',
      }}
    />
    <SettingsStack.Screen
      name="CaregiverContactSettings"
      component={CaregiverContactSettingsScreen}
      options={{
        headerTitle: 'Caregiver Contact Settings',
      }}
    />
  </SettingsStack.Navigator>
);
