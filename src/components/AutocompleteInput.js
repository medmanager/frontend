import React from 'react';
import { FlatList, Platform } from 'react-native';
import styled from 'styled-components/native';
import { Colors } from '../utils';
import Input from './Input';

const AutocompleteInput = ({ data, renderItem, keyExtractor, ...props }) => {
  return (
    <Container>
      <Input {...props} />
      {data && data.length > 0 && (
        <Dropdown
          data={data}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          keyboardShouldPersistTaps="always"
        />
      )}
    </Container>
  );
};

const Container = styled.View`
  position: relative;
`;

const Dropdown = styled(FlatList)`
  top: ${Platform.OS === 'ios' ? 74 : 76}px;
  width: 100%;
  position: absolute;
  background-color: #fff;
  border-width: 0.5px;
  border-color: ${Colors.gray[300]}
  border-radius: 8px;
  z-index: 10;
`;

export default AutocompleteInput;
