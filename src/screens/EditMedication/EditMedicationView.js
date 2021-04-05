import { useFormik } from 'formik';
import React, { useCallback, useEffect, useLayoutEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';
import * as yup from 'yup';
import shallow from 'zustand/shallow';
import MedicationNameAutocompleteInput from '../../components/MedicationNameAutocompleteInput';
import { useAuth } from '../../store/useAuth';
import useMedication from '../../store/useMedication';
import { useMedicationState } from '../../store/useMedicationState';
import { Colors } from '../../utils';
import {
  getDosageTimesString,
  getFrequencyStatusText,
} from '../../utils/medication';

const EditMedicationView = ({ navigation, route }) => {
  const { medId } = route.params;
  const token = useAuth((state) => state.userToken);
  const { data: medication } = useMedication(medId, token);
  const initialValues = {
    name: medication ? medication.name : '',
  };
  const {
    values,
    touched,
    errors,
    isValid,
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema: yup.object().shape({
      name: yup
        .string()
        .required('Name is a required field')
        .max(100, 'Name must not be more than 100 characters'),
    }),
    onSubmit: (formValues) => {
      setMedicationInfo(formValues);
    },
  });
  const {
    setMedicationInfo,
    medicationInfoStatusText,
    setStateValuesFromMedicationObject,
  } = useMedicationState(
    (state) => ({
      setMedicationInfo: state.setMedicationInfo,
      setStateValuesFromMedicationObject:
        state.setStateValuesFromMedicationObject,
      medicationInfoStatusText: `${state.strength} ${state.strengthUnit}${
        state.condition ? `, ${state.condition}` : ''
      }`,
    }),
    shallow,
  );

  const handleUpdateMedication = useCallback(() => {
    console.log('update');
  }, []);

  useLayoutEffect(() => {
    if (medication) {
      navigation.setOptions({
        title: `Edit ${medication.name}`,
        headerRight: () => (
          <TouchableOpacity onPress={handleUpdateMedication}>
            <HeaderText>Save</HeaderText>
          </TouchableOpacity>
        ),
      });
    }
  }, [medication, navigation, handleUpdateMedication]);

  useEffect(() => {
    setStateValuesFromMedicationObject(medication);
  }, [medication]);

  const handleMedicationInfoPress = useCallback(() => {
    navigation.navigate('EditMedicationInfo');
  }, [navigation]);

  const handleDosageSchedulePress = useCallback(() => {
    navigation.navigate('EditMedicationSchedule');
  }, [navigation]);

  const dosageTimesString = getDosageTimesString(medication);

  return (
    <SafeArea>
      <Form>
        <MedicationNameAutocompleteInput
          onChangeText={handleChange('name')}
          onBlur={handleBlur('name')}
          onPress={(name) => setFieldValue('name', name)}
          value={values.name}
          touched={touched}
          error={errors.name}
          label="Name"
        />
        <BottomLayer>
          <NavigationButton
            onPress={handleMedicationInfoPress}
            activeOpacity={0.6}>
            <Container>
              <Text>Medication Info</Text>
              <NavigationButtonText>
                {medicationInfoStatusText}
              </NavigationButtonText>
            </Container>
            <Icon name="chevron-right" size={18} color={Colors.gray[400]} />
          </NavigationButton>
          <NavigationButton
            onPress={handleDosageSchedulePress}
            activeOpacity={0.6}>
            <Container>
              <Text>Dosage Schedule</Text>
              <NavigationButtonText>
                Take {dosageTimesString}{' '}
                {getFrequencyStatusText(medication.frequency)}
              </NavigationButtonText>
            </Container>
            <Icon name="chevron-right" size={18} color={Colors.gray[400]} />
          </NavigationButton>
        </BottomLayer>
      </Form>
      <ActionArea>
        <ActionItem activeOpacity={0.7} style={{ borderBottomWidth: 1 }}>
          <DeleteActionItemText>Delete</DeleteActionItemText>
        </ActionItem>
      </ActionArea>
    </SafeArea>
  );
};

const SafeArea = styled.SafeAreaView`
  flex: 1;
`;

const Form = styled.View`
  padding: 24px;
  flex: 1;
`;

const BottomLayer = styled.View`
  z-index: -1;
`;

const Container = styled.View`
  flex-direction: column;
`;

const HeaderText = styled.Text`
  color: white;
  font-size: 18px;
`;

const NavigationButton = styled.TouchableOpacity`
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 8px;
  background-color: #fff;
  border-width: 0.5px;
  border-color: ${Colors.gray[300]};
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  margin-bottom: 16px;
`;

const NavigationButtonText = styled.Text`
  font-size: 14px;
  color: ${Colors.gray[500]};
`;

const Text = styled.Text`
  font-size: 16px;
`;

const ActionArea = styled.View`
  margin-vertical: 48px;
`;

const ActionItem = styled.TouchableOpacity`
  background-color: white;
  padding-vertical: 12px;
  border-color: ${Colors.gray[300]};
  border-top-width: 1px;
`;

const DeleteActionItemText = styled.Text`
  font-size: 16px;
  text-align: center;
  color: red;
`;

export default EditMedicationView;
