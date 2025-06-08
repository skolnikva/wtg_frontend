import React, { useRef, useEffect, useState } from 'react';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.css';
import { useNavigate } from 'react-router-dom';
import { Russian } from 'flatpickr/dist/l10n/ru';
import styles from './ProfileEditForm.module.scss';
import LabeledInput from '@molecules/Form/LabeledInput/LabeledInput';
import SelectField from '@atoms/Form/Select/Select';
import Textarea from '@atoms/Form/Textarea/Textarea';
import FormField from '@molecules/Form/FormField/FormField';
import SubmitButton from '@atoms/Buttons/SubmitButton/SubmitButton';
import LittleButtons from '@molecules/Buttons/LittleButtons/LittleButtons';
import { validate, fieldHints } from '@utils/validation';
import Typography from '@atoms/Text/Typography/Typography';

const ProfileEditForm = ({
  userData,
  errors,
  handleChange,
  handleSave,
  isSubmitting,
  onOpenResetPassword,
}) => {
  const navigate = useNavigate();
  const datepickerRef = useRef(null);
  const flatpickrInstance = useRef(null);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (datepickerRef.current) {
      flatpickrInstance.current = flatpickr(datepickerRef.current, {
        dateFormat: 'd.m.Y',
        onChange: (selectedDates, dateStr) => {
          handleFieldChange({ target: { name: 'dob', value: dateStr } });
        },
        locale: Russian,
        disableMobile: true,
      });
    }
    return () => flatpickrInstance.current?.destroy();
  }, []);

  useEffect(() => {
    if (flatpickrInstance.current && userData?.dob) {
      flatpickrInstance.current.setDate(userData.dob, false);
    }
  }, [userData?.dob]);

  const validateField = (name, value) => {
    let error = '';
    if (name === 'username') error = validate.username(value);
    else if (name === 'email') error = validate.email(value);
    else if (name === 'first_name') error = validate.name(value);
    else if (name === 'last_name') error = validate.last_name(value);
    else if (name === 'dob') error = validate.date(value);

    setValidationErrors(prev => ({ ...prev, [name]: error }));
    return !error;
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    handleChange(e);
    validateField(name, value);
  };

  const handleGenderChange = (selectedOption) => {
    const fakeEvent = {
      target: {
        name: 'gender',
        value: selectedOption.value,
      },
    };
    handleChange(fakeEvent);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let isValid = true;
    const newErrors = {};

    Object.keys(userData).forEach((key) => {
      const isFieldValid = validateField(key, userData[key]);
      if (!isFieldValid) {
        newErrors[key] = true;
        isValid = false;
      }
    });

    if (!isValid) return;

    handleSave(e);
  };

  const genderOptions = [
    { value: 'not_specified', label: 'Не выбрано' },
    { value: 'male', label: 'Мужской' },
    { value: 'female', label: 'Женский' },
  ];

  const selectedGender = genderOptions.find(
    (opt) => opt.value === (userData?.gender || 'not_specified')
  );

  const littleButtonsData = [
    {
      type: 'submit',
      variant: 'black',
      disabled: isSubmitting,
      label: isSubmitting ? 'Сохранение...' : 'Сохранить',
    },
    {
      type: 'button',
      variant: 'grey',
      onClick: () => navigate(-1),
      label: 'Отменить',
    },
  ];

  return (
    <form onSubmit={handleSubmit} className={styles['edit-profile-form']}>
      <LabeledInput
        label="Логин"
        placeholder="Логин"
        name="username"
        value={userData?.username || ''}
        onChange={handleFieldChange}
        error={validationErrors.username || errors?.username}
        required
        hint={fieldHints.username}
      />

      <LabeledInput
        label="Имя"
        placeholder="Имя"
        name="first_name"
        value={userData?.first_name || ''}
        onChange={handleFieldChange}
        error={validationErrors.first_name || errors?.first_name}
        hint={fieldHints.first_name}
      />

      <LabeledInput
        label="Фамилия"
        placeholder="Фамилия"
        name="last_name"
        value={userData?.last_name || ''}
        onChange={handleFieldChange}
        error={validationErrors.last_name || errors?.last_name}
        hint={fieldHints.last_name}
      />

      <FormField label="Дата рождения" className={styles.dateInputStyle}>
        <input
          type="text"
          ref={datepickerRef}
          placeholder="дд.мм.гггг."
          name="dob"
          className={styles.dateInput}
        />
        {validationErrors.dob && (
          <Typography variant="error" className={styles.error}>
            {validationErrors.dob}
          </Typography>
        )}
      </FormField>

      <SelectField
        label="Пол"
        name="gender"
        value={userData?.gender || 'not_specified'}
        onChange={handleFieldChange}
        options={genderOptions}
        error={validationErrors.gender || errors?.gender}
      />

      <LabeledInput
        label="Email"
        placeholder="Email"
        type="email"
        name="email"
        value={userData?.email || ''}
        onChange={handleFieldChange}
        error={validationErrors.email || errors?.email}
        required
        hint={fieldHints.email}
      />

      <FormField label="Описание" className={styles.lastFormField}>
        <Textarea
          name="description"
          value={userData?.description || ''}
          onChange={handleFieldChange}
        />
      </FormField>

      <SubmitButton
        type="button"
        onClick={onOpenResetPassword}
        className={styles.submitButton}
        disabled={isSubmitting}
      >
        Изменить пароль
      </SubmitButton>

      <LittleButtons buttons={littleButtonsData} />
    </form>
  );
};

export default ProfileEditForm;
