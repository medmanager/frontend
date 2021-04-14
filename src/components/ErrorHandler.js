import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Button, Text } from 'react-native';
import RNRestart from 'react-native-restart';
import styled from 'styled-components/native';

const myErrorHandler = (error) => {
  // Do something with the error
};

function ErrorFallback({ resetErrorBoundary }) {
  const handleTryAgain = React.useCallback(async () => {
    resetErrorBoundary();
    RNRestart.Restart();
  }, [resetErrorBoundary]);

  return (
    <SafeArea>
      <Container>
        <Text>Something went wrong</Text>
        <Button title="Try Again" onPress={handleTryAgain} />
      </Container>
    </SafeArea>
  );
}
const ErrorHandler = ({ children }) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={myErrorHandler}>
      {children}
    </ErrorBoundary>
  );
};

const SafeArea = styled.SafeAreaView`
  flex: 1;
`;

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;
`;

export default ErrorHandler;
