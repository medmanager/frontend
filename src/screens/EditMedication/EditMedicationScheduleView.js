import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styled from 'styled-components/native';
import DosageMultiSelect from '../../components/DosageMultiSelect';
import FrequencyRadioGroup from '../../components/FrequencyRadioGroup';
import Label from '../../components/Label';

const EditMedicationScheduleView = () => {
  return (
    <SafeArea>
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
    </SafeArea>
  );
};

const SafeArea = styled.SafeAreaView`
  flex: 1;
`;

const Form = styled.View`
  flex-direction: column;
  padding: 24px;
`;

const FormField = styled.View`
  margin-bottom: 24px;
`;

export default EditMedicationScheduleView;
