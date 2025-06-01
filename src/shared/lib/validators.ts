const username = {
  required: 'Поле обязательно для заполнения',
  minLength: {
    value: 3,
    message: 'Длина логина должна быть не менее 3 символов',
  },
  maxLength: {
    value: 16,
    message: 'Длина логина должна быть не больше 16 символов',
  },
  pattern: {
    value: /^[a-zA-Z0-9_]+$/,
    message: 'Введенный вами логин содержит недопустимые символы',
  },
};

const firstName = {
  required: 'Поле обязательно для заполнения',
  maxLength: {
    value: 50,
    message: 'Имя не может быть больше 50 символов',
  },
  pattern: {
    value: /^[a-zA-Zа-яА-Я]*$/,
    message: 'Введенное значение содержит недопустимые символы',
  },
};

const lastName = {
  ...firstName,
  maxLength: {
    ...firstName.maxLength,
    message: 'Фамилия не может быть больше 50 символов',
  },
};

const phone = {
  required: 'Поле обязательно для заполения',
  pattern: {
    value: /^[8]-[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}$/i,
    message: 'Неверный формат номера телефона',
  },
};

const email = {
  required: 'Поле обязательно для заполнения',
  pattern: {
    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    message: 'Неверный формат email адреса',
  },
};

const city = {
  required: 'Поле обязательно для заполнения',
  maxLength: {
    value: 20,
    message: 'Длина значения не может быть больше 20 символов',
  },
  pattern: {
    value: /^[a-zA-Z]+$/,
    message: 'Введенное вами значение содержит недопустимые символы',
  },
};

const website = {
  required: 'Поле обязательно для заполнения',
  maxLength: {
    value: 50,
    message: 'Длина значения должна быть не больше 50 символов',
  },
  pattern: {
    value: /^[a-zA-Z]+[a-zA-Z0-9._-]+\.[a-zA-Z]+$/,
    message: 'Неправильный формат адреса веб сайта',
  },
};

const getTextValidator = () => {
  return {
    required: 'Поле обязательно для заполнения',
    maxLength: {
      value: 50,
      message: 'Длина текста не может быть больше 50 символов',
    },
  };
};

const getNumberValidator = () => {
  return {
    required: 'Поле обязательно для заполнения',
    pattern: {
      value: /^[0-9]+$/,
      message: 'Введите числовое значение',
    },
  };
};

const getStatusValidator = () => {
  return {
    required: 'Поле обязательно для заполнения',
    pattern: {
      value: /^(Online|Offline)$/,
      message: 'Статус может быть только Online или Offline',
    },
  };
};

export const validators = {
  username,
  firstName,
  lastName,
  email,
  phone,
  title: getTextValidator(),
  description: getTextValidator(),
  city,
  website,
  countLikes: getNumberValidator(),
  countProjects: getNumberValidator(),
  countFriends: getNumberValidator(),
  rating: getNumberValidator(),
  countSubscribers: getNumberValidator(),
  status: getStatusValidator(),
};
