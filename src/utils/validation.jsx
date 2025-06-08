export const validate = {
  username: (value) => {
    if (!value) return 'Обязательное поле';
    if (value.length < 3 || value.length > 20) return 'Должно быть от 3 до 20 символов';
    if (!/^[a-zA-Z0-9_]+$/.test(value)) return 'Только буквы, цифры и _';
    return '';
  },
  email: (value) => {
    if (!value) return 'Обязательное поле';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Некорректный email';
    return '';
  },
  password: (value) => {
    if (!value) return 'Обязательное поле';
    if (value.length < 8) return 'Пароль должен быть не менее 8 символов';
    return '';
  },
  name: (value) => {
    if (value && !/^[^\d]*$/.test(value)) return 'Имя должно содержать только буквы';
    if (value && value.length > 32) return 'Не более 32 символов';
    return '';
  },
  last_name: (value) => {
    if (value && !/^[^\d]*$/.test(value)) return 'Фамилия должна содержать только буквы';
    if (value && value.length > 32) return 'Не более 32 символов';
    return '';
  },
  date: (value) => {
    if (value && !/^\d{2}\.\d{2}\.\d{4}$/.test(value)) return 'Некорректная дата (ДД.ММ.ГГГГ)';
    return '';
  },
  confirmPassword: (value, password) => {
    if (value !== password) return 'Пароли не совпадают';
    return '';
  },
  currentPassword: (value) => {
    if (!value) return 'Введите текущий пароль';
    return '';
  }
};

export const fieldHints = {
  username: 'От 3 до 20 символов (буквы, цифры, _)',
  email: 'Введите корректный email (например: user@example.com)',
  password: 'Не менее 8 символов',
  first_name: 'Только буквы, не более 32 символов',
  last_name: 'Только буквы, не более 32 символов',
  dob: 'Формат: ДД.ММ.ГГГГ',
  newPassword: 'Не менее 8 символов',
  confirmPassword: 'Повторите новый пароль',
  currentPassword: 'Введите текущий пароль'
};