import { CommonActions } from '@react-navigation/native';
import React from 'react';
import { Button, Text } from 'react-native';
import { useQueryClient } from 'react-query';
import styled from 'styled-components/native';

function ErrorScreen({ navigation }) {
  const queryClient = useQueryClient();

  const handleReset = () => {
    // Invalidate all query caches
    queryClient.invalidateQueries(); // invalidate all queries in cache

    // Reset the navigation state and try again
    navigation.dispatch((state) => {
      return CommonActions.reset({
        ...state,
        routes: [],
        index: 0,
      });
    });
  };
  return (
    <Container>
      <Text>Something went wrong.</Text>
      <Button title="Try again" onPress={handleReset} />
    </Container>
  );
}

const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export default ErrorScreen;
