import { Spinner, Text } from 'native-base';
import React from 'react';

export default function LoadingSpinner() {
  return (
    <>
      <Spinner accessibilityLabel="Loading" color="blue.500" />
      <Text color="blue.500" fontSize="md">
        Loading...
      </Text>
    </>
  );
}
