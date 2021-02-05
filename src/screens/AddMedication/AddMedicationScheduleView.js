import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styled from 'styled-components/native';
import Button from '../../components/Button';
import Label from '../../components/Label';
import { Colors } from '../../utils';
import DosageMultiSelect from './components/DosageMultiSelect';
import FrequencyRadioGroup from './components/FrequencyRadioGroup';

const AddMedicationScheduleView = () => {
  const navigator = useNavigation();

  const handleSubmit = () => {
    navigator.navigate('');
  };

  return (
    <View>
      <KeyboardAwareScrollView>
        <Form>
          <FormField>
            <Label>Frequency</Label>
            <FrequencyRadioGroup />
          </FormField>
          <FormField>
            <Label>Dosage Times</Label>
            <DosageMultiSelect />
          </FormField>
        </Form>
      </KeyboardAwareScrollView>
      <ButtonContainer>
        <Button onPress={handleSubmit} text="Save" />
      </ButtonContainer>
    </View>
  );
};

const ButtonContainer = styled.View`
  border-top-width: 1px;
  border-top-color: ${Colors.gray[300]}
  width: 100%;
  padding-left: 24px;
  padding-right: 24px;
  padding-top: 8px;
  padding-bottom: 8px;
`;

const View = styled.SafeAreaView`
  flex: 1;
`;

const Form = styled.View`
  flex-direction: column;
  padding: 24px;
`;

const FormField = styled.View`
  margin-bottom: 24px;
`;

export default AddMedicationScheduleView;
