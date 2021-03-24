import React, { Fragment, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';
import { useAddMedication } from '../store/useAddMedication';
import { Colors, strengthUnitChoices } from '../utils';
import Error from './Error';
import Label from './Label';
import Modal from './Modal';
import NumericInput from './NumericInput';
import { RadioGroupValueSelector } from './RadioButtonGroup';

const StrengthInput = ({ touched, error, ...props }) => {
  const [showModal, setShowModal] = useState(false);
  const { strengthUnit, setStrengthUnit } = useAddMedication((state) => ({
    strengthUnit: state.strengthUnit,
    setStrengthUnit: state.setStrengthUnit,
  }));

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <Fragment>
      <Container>
        <Label>Strength</Label>
        <AmountInputContainer>
          <LeftCol>
            <NumericInput {...props} />
          </LeftCol>
          <RightCol>
            <StrengthUnitsPicker
              activeOpacity={0.6}
              onPress={() => setShowModal(true)}>
              <Text>{strengthUnit}</Text>
              <Icon name="chevron-right" size={18} color={Colors.gray[400]} />
            </StrengthUnitsPicker>
          </RightCol>
        </AmountInputContainer>
        {touched && error && <Error>{error}</Error>}
      </Container>
      <Modal title="Units" toggleModal={toggleModal} showModal={showModal}>
        <RadioGroupValueSelector
          data={strengthUnitChoices}
          selectedValue={strengthUnit}
          onChange={(value) => setStrengthUnit(value)}
        />
      </Modal>
    </Fragment>
  );
};

const Container = styled.View`
  margin-bottom: 24px;
`;

const AmountInputContainer = styled.View`
  flex-direction: row;
`;

const LeftCol = styled.View`
  flex-basis: 50%;
  padding-right: 4px;
`;

const RightCol = styled.View`
  flex-basis: 50%;
  padding-left: 4px;
`;

const StrengthUnitsPicker = styled.TouchableOpacity`
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 10px;
  padding-bottom: 10px;
  height: 40px;
  border-radius: 8px;
  background-color: #fff;
  border-width: 0.5px;
  border-color: ${Colors.gray[300]};
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

const Text = styled.Text`
  font-size: 16px;
`;

export default StrengthInput;
