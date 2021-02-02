import React, { useState } from 'react';
import styled from 'styled-components/native';
import Button from '../../components/Button';
import DismissKeyboard from '../../components/DismissKeyboard';
import Input from '../../components/Input';
import AmountInput from './components/AmountInput';
import ClickThroughSetting from './components/ClickThroughSetting';
import DosageInput from './components/DosageInput';

const AddMedicationView = ({ navigator }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <Container>
      <Form behavior="padding">
        <DismissKeyboard>
          <Scrollable>
            <Input label="Name" />
            <Row>
              <DosageInput />
              <AmountInput />
            </Row>
            <Input
              inputStyle={{ height: 150, justifyContent: 'flex-start' }}
              multiline
              numberOfLines={10}
              label="Description"
            />
            <ClickThroughSetting
              setting="Frequency"
              icon="repeat"
              navigateTo="AddMedicationFrequency"
              label="Daily"
            />
            <ClickThroughSetting
              setting="Time"
              icon="clock"
              navigateTo="AddMedicationTime"
              label="9:00 PM"
            />
            <ClickThroughSetting
              setting="Reminder"
              icon="bell"
              navigateTo="AddMedicationReminder"
              label="30 minutes before"
              style={{ marginBottom: 16 }}
            />
          </Scrollable>
        </DismissKeyboard>
      </Form>
      <ButtonContainer>
        <Button text="Save" />
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
`;

const Scrollable = styled.ScrollView``;

const Form = styled.KeyboardAvoidingView`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 24px;
`;

const Row = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
`;

const ButtonContainer = styled.View`
  width: 100%;
  padding-left: 24px;
  padding-right: 24px;
  padding-top: 10px;
  padding-bottom: 10px;
`;

export default AddMedicationView;
