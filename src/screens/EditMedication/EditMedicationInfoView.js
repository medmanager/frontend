import { useFormik } from 'formik';
import React, { useCallback, useEffect } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styled from 'styled-components/native';
import * as yup from 'yup';
import shallow from 'zustand/shallow';
import { ColorSelect } from '../../components/ColorSelect';
import Input from '../../components/Input';
import Label from '../../components/Label';
import StrengthInput from '../../components/StrengthInput';
import { useMedicationState } from '../../store/useMedicationState';

const textAreaInputStyle = {
  height: 150,
  justifyContent: 'flex-start',
  paddingVertical: 8,
};

const EditMedicationInfoView = ({ navigation }) => {
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
  const { values, touched, errors, handleChange, handleBlur } = useFormik({
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

  const handleUpdateMedicationInfo = useCallback(() => {
    setMedicationInfo(values);
  }, [setMedicationInfo, values]);

  useEffect(() => {
    const unsubscribe = navigation.addListener(
      'beforeRemove',
      handleUpdateMedicationInfo,
    );

    return unsubscribe;
  }, [navigation, handleUpdateMedicationInfo]);

  return (
    <SafeArea>
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
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
          <Label>Color</Label>
          <ColorSelect />
        </Form>
      </KeyboardAwareScrollView>
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
