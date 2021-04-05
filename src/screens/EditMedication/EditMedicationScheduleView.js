import React, { useCallback, useLayoutEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styled from 'styled-components/native';
import DosageMultiSelect from '../../components/DosageMultiSelect';
import FrequencyRadioGroup from '../../components/FrequencyRadioGroup';
import Label from '../../components/Label';
import { useMedicationState } from '../../store/useMedicationState';

const EditMedicationScheduleView = ({ navigation }) => {
  const setMedicationInfo = useMedicationState(
    (state) => state.setMedicationInfo,
  );

  const handleUpdateSchedule = useCallback(() => {
    console.log('update');
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleUpdateSchedule}>
          <HeaderText>Save</HeaderText>
        </TouchableOpacity>
      ),
    });
  }, [navigation, handleUpdateSchedule]);

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

const HeaderText = styled.Text`
  color: white;
  font-size: 18px;
`;

const Form = styled.View`
  flex-direction: column;
  padding: 24px;
`;

const FormField = styled.View`
  margin-bottom: 24px;
`;

export default EditMedicationScheduleView;
