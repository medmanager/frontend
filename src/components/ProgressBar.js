import React from 'react';
import styled from 'styled-components/native';
import { Colors } from '../utils';

const ProgressBar = ({ percent = 0, containerStyle }) => {
  return (
    <Container style={containerStyle}>
      <Bar percent={percent} />
    </Container>
  );
};

const Container = styled.View`
  height: 5px;
  background-color: ${Colors.gray[300]};
  border-radius: 9999px;
`;

const Bar = styled.View`
  height: 100%;
  width: ${(props) => props.percent * 100}%;
  background-color: ${Colors.blue[500]};
  border-radius: 9999px;
`;

export default ProgressBar;
