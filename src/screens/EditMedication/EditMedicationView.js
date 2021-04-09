import { useFormik } from 'formik';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components/native';
import * as yup from 'yup';
import shallow from 'zustand/shallow';
import MedicationNameAutocompleteInput from '../../components/MedicationNameAutocompleteInput';
import Modal from '../../components/Modal';
import ModalActivityIndicator from '../../components/ModalActivityIndicator';
import { useAuth } from '../../store/useAuth';
import useMedication from '../../store/useMedication';
import { useMedicationState } from '../../store/useMedicationState';
import { Colors, deepEqual } from '../../utils';
import apiCalls from '../../utils/api-calls';
import { medicationColors } from '../../utils/colors';
import {
  getDosageTimesString,
  getFrequencyStatusText,
} from '../../utils/medication';

const EditMedicationView = ({ navigation, route }) => {
  const { medId } = route.params;
  const queryClient = useQueryClient();
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const token = useAuth((state) => state.userToken);
  const { data: medication } = useMedication(medId, token);
  const initialValues = {
    name: medication ? medication.name : '',
  };
  const {
    values,
    touched,
    errors,
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
    frequency,
    dosages,
    amount,
    amountUnit,
    name,
    strength,
    strengthUnit,
    condition,
    color,
    setMedicationInfo,
    medicationInfoStatusText,
    setStateValuesFromMedicationObject,
    resetState,
  } = useMedicationState(
    (state) => ({
      setMedicationInfo: state.setMedicationInfo,
      setStateValuesFromMedicationObject:
        state.setStateValuesFromMedicationObject,
      medicationInfoStatusText: `${state.strength} ${state.strengthUnit}${
        state.condition ? `, ${state.condition}` : ''
      }`,
      dosages: state.selectedDosages.map(
        (id) => state.dosages.find((dosage) => dosage.id === id).value,
      ),
      frequency: state.frequencies.find(
        (freq) => freq.id === state.selectedFrequency,
      ).value,
      name: state.name,
      amount: state.amount,
      amountUnit: state.amountUnit,
      strength: state.strength,
      strengthUnit: state.strengthUnit,
      condition: state.condition,
      color: state.color,
      resetState: state.reset,
    }),
    shallow,
  );

  const updateMedication = useMutation(
    () => apiCalls.updateMedicationFromID(updatedMedication, medId, token),
    {
      retry: 3, // retry three times if the mutation fails
      onSuccess: async () => {
        // Invalidate all calendar occurrences due to new medication being added
        await queryClient.invalidateQueries('occurrences');
        await queryClient.invalidateQueries('medications');
        await queryClient.invalidateQueries(['medication', medId]);
        navigation.navigate('Home');
      },
      onError: () => {
        // Show error modal
        setShowErrorModal(true);
      },
    },
  );

  const deleteMedication = useMutation(
    () => apiCalls.deleteMedicationFromID(medId, token),
    {
      retry: 3, // retry three times if the mutation fails
      onSuccess: async () => {
        // Invalidate all calendar occurrences due to new medication being added
        await queryClient.invalidateQueries('occurrences');
        await queryClient.invalidateQueries('medications');
        await queryClient.invalidateQueries(['medication', medId]);
        await navigation.navigate('Home');
      },
      onError: () => {
        // Show error modal
        setShowErrorModal(true);
      },
    },
  );

  const updatedMedication = useMemo(
    () => ({
      _id: medId,
      name,
      amount: Number(amount),
      amountUnit,
      strength: Number(strength),
      strengthUnit,
      condition,
      frequency,
      dosages,
      color,
    }),
    [
      medId,
      name,
      amount,
      amountUnit,
      strength,
      strengthUnit,
      condition,
      frequency,
      dosages,
      color,
    ],
  );

  const handleUpdateMedication = useCallback(async () => {
    await updateMedication.mutateAsync(updatedMedication);
  }, [updatedMedication, updateMedication]);

  const handleDeleteMedication = useCallback(async () => {
    await deleteMedication.mutateAsync();
  }, [deleteMedication]);

  const handleCancel = useCallback(() => {
    if (!hasUnsavedChanges) {
      navigation.goBack();
      return;
    }

    Alert.alert(
      'Discard changes?',
      'You have unsaved changes. Are you sure you want to discard them?',
      [
        { text: 'Keep', style: 'cancel', onPress: () => {} },
        {
          text: 'Discard',
          style: 'destructive',
          onPress: () => {
            navigation.goBack();
            resetState();
          },
        },
      ],
    );
  }, [navigation, hasUnsavedChanges, resetState]);

  useLayoutEffect(() => {
    if (medication) {
      navigation.setOptions({
        title: 'Edit Med',
        headerLeft: () => (
          <TouchableOpacity onPress={handleCancel}>
            <HeaderText>Cancel</HeaderText>
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity onPress={handleUpdateMedication}>
            <HeaderText>Update</HeaderText>
          </TouchableOpacity>
        ),
      });
    }
  }, [medication, navigation, handleUpdateMedication, handleCancel]);

  useEffect(() => {
    setStateValuesFromMedicationObject(medication);
  }, [medication, setStateValuesFromMedicationObject]);

  const handleMedicationInfoPress = useCallback(() => {
    navigation.navigate('EditMedicationInfo');
  }, [navigation]);

  const handleDosageSchedulePress = useCallback(() => {
    navigation.navigate('EditMedicationSchedule');
  }, [navigation]);

  useEffect(() => {
    // the keys below will be excluded when comparing the medication objects
    const invalidBackendKeys = [
      '_id',
      '__v',
      'inactiveDosages',
      'occurrences',
      'medication',
      'active',
      'dateAdded',
      'user',
    ];

    if (!deepEqual(updatedMedication, medication, invalidBackendKeys)) {
      setHasUnsavedChanges(true);
    } else {
      setHasUnsavedChanges(false);
    }
  }, [updatedMedication, medication]);

  const dosageTimesString = getDosageTimesString(updatedMedication);

  return (
    <SafeArea>
      <ModalActivityIndicator
        loadingMessage="Updating medication..."
        show={updateMedication.isLoading}
      />
      <ModalActivityIndicator
        loadingMessage="Deleting medication..."
        show={deleteMedication.isLoading}
      />
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
              <ColorBar color={medicationColors[color]} />
              <NavigationButtonTextContainer>
                <Text>Medication Info</Text>
                <NavigationButtonText>
                  {medicationInfoStatusText}
                </NavigationButtonText>
              </NavigationButtonTextContainer>
            </Container>
            <Icon name="chevron-right" size={18} color={Colors.gray[400]} />
          </NavigationButton>
          <NavigationButton
            onPress={handleDosageSchedulePress}
            activeOpacity={0.6}>
            <Container>
              <NavigationButtonTextContainer>
                <Text>Dosage Schedule</Text>
                <NavigationButtonText>
                  Take {dosageTimesString} {getFrequencyStatusText(frequency)}
                </NavigationButtonText>
              </NavigationButtonTextContainer>
            </Container>
            <Icon name="chevron-right" size={18} color={Colors.gray[400]} />
          </NavigationButton>
        </BottomLayer>
      </Form>
      <ActionArea>
        <ActionItem
          onPress={handleDeleteMedication}
          activeOpacity={0.7}
          style={{ borderBottomWidth: 1 }}>
          <DeleteActionItemText>Delete</DeleteActionItemText>
        </ActionItem>
      </ActionArea>
      <Modal
        title="Something went wrong"
        showModal={showErrorModal}
        showActionBar={false}
        toggleModal={() => setShowErrorModal(!showErrorModal)}>
        <IconContainer>
          <Icon name="alert-circle" color="#EF4444" size={48} />
        </IconContainer>
        <ErrorText>
          We are sorry, but there was a problem with our systems. Please try
          again later.
        </ErrorText>
      </Modal>
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
  flex-direction: row;
  align-items: center;
  margin-right: 8px;
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
  margin-top: 2px;
`;

const ColorBar = styled.View`
  height: 40px;
  width: 12px;
  border-radius: 9999px;
  margin-right: 10px;
  background-color: ${(props) => props.color};
`;

const NavigationButtonTextContainer = styled.View``;

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

const IconContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
`;

const ErrorText = styled.Text`
  font-size: 16px;
  color: ${Colors.gray[700]};
  margin-bottom: 16px;
  padding-left: 8px;
  padding-right: 8px;
`;

export default EditMedicationView;
