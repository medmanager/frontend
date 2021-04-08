import { CommonActions, useNavigation } from '@react-navigation/core';
import React, { useCallback } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useQueryClient } from 'react-query';

const myErrorHandler = (error) => {
  // Do something with the error
};

function ErrorFallback({ resetErrorBoundary }) {
  const queryClient = useQueryClient();
  const navigation = useNavigation();

  const handleTryAgain = useCallback(async () => {
    // Invalidate all query caches
    await queryClient.invalidateQueries();

    // Reset the navigation state and try again
    navigation.dispatch((state) => {
      return CommonActions.reset({
        ...state,
        routes: [],
        index: 0,
      });
    });

    resetErrorBoundary();
  }, [queryClient, navigation, resetErrorBoundary]);

  return (
    <View style={[styles.container]}>
      <Text>Something went wrong:</Text>
      <Button title="Try Again" onPress={handleTryAgain} />
    </View>
  );
}
const ErrorHandler = ({ children }) => (
  <ErrorBoundary FallbackComponent={ErrorFallback} onError={myErrorHandler}>
    {children}
  </ErrorBoundary>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
});

export default ErrorHandler;
