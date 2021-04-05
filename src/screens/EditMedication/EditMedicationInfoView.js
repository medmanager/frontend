import { useFormik } from 'formik';
import React, { useCallback, useLayoutEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import * as yup from 'yup';
import shallow from 'zustand/shallow';
import Input from '../../components/Input';
import StrengthInput from '../../components/StrengthInput';
import { useMedicationState } from '../../store/useMedicationState';

const EditMedicationInfoView = ({ navigation }) => {
  const textAreaInputStyle = {
    height: 150,
    justifyContent: 'flex-start',
  };
  const { setMedicationInfo, strength, condition } = useMedicationState(
    (state) => ({
      setMedicationInfo: state.setMedicationInfo,
      condition: state.condition,
      strength: state.strength,
      strengthUnit: state.strengthUnit,
    }),
    shallow,
  );
  const initialValues = {
    strength,
    condition,
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
      strength: yup
        .number()
        .nullable()
        .required('Strength is a required field'),
      condition: yup.string(),
    }),
    onSubmit: (medicationInfo) => {
      setMedicationInfo(medicationInfo);
    },
  });

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
      <Form>
        <StrengthInput
          onChangeText={handleChange('strength')}
          onBlur={handleBlur('strength')}
          value={values.strength}
          touched={touched}
          error={errors.strength}
        />
        <Input
          onChangeText={handleChange('condition')}
          onBlur={handleBlur('condition')}
          value={values.condition}
          touched={touched}
          error={errors.condition}
          inputStyle={textAreaInputStyle}
          multiline
          numberOfLines={10}
          label="Condition"
        />
      </Form>
    </SafeArea>
  );
};

const SafeArea = styled.SafeAreaView`
  flex: 1;
`;

const Form = styled.View`
  flex: 1;
  padding: 24px;
`;

const HeaderText = styled.Text`
  color: white;
  font-size: 18px;
`;

export default EditMedicationInfoView;
