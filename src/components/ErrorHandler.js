import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Button, StyleSheet, Text, View } from 'react-native';

const myErrorHandler = (error) => {
  // Do something with the error
};

function ErrorFallback({ resetErrorBoundary }) {
  return (
    <View style={[styles.container]}>
      <View>
        <Text> Something went wrong: </Text>
        <Button title="Try Again" onPress={resetErrorBoundary} />
      </View>
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
    alignItems: 'stretch',
    justifyContent: 'center',
    alignContent: 'center',
    paddingHorizontal: 12,
  },
});

export default ErrorHandler;
