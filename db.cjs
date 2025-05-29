const [minFields, maxFields] = [5, 15];

module.exports = () => {
  const data = { entities: [] };

  const countFields = getRandomNum(minFields, maxFields);
  const fields = Object.keys(mapFieldsToGenerateFunction).slice(0, countFields);

  for (let i = 0; i < 50; i++) {
    const item = fields.reduce((res, field) => {
      return { ...res, [field]: mapFieldsToGenerateFunction[field]() };
    }, {});

    data.entities.push({ id: i, ...item });
  }

  return data;
};

const getRandomNum = (minValue, maxValue) => {
  return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
};

const strings = [
  'Sed do eiusmod tempor',
  'Incididunt ut labore',
  'Excepteur sint occaecat',
  'Ut enim ad minim veniam',
  'Non proident sunt',
];

const cities = ['Москва', 'Санкт-Петербург', 'Сочи', 'Калининград', 'Екатеринбург'];
const emails = ['test', 'something', 'qwerty', 'qwerty123'];
const usernames = ['user', 'qazwsxedc', 'qweqwe', 'qwe123'];
const firstNames = ['Jack', 'Walker', 'Ryan', 'Caroline', 'Sienna'];
const lastNames = ['Brown', 'Williams', 'Johns', 'Davis', 'Roberts'];
const statuses = ['online', 'offline'];

const createPhoneNumber = () => {
  const getNumberPart = (countNumbers) =>
    [...Array(countNumbers)].map(() => getRandomNum(0, 9)).join('');

  const generateNumber =
    '8-' +
    [3, 3, 2, 2].reduce((res, countNumbers) => [...res, getNumberPart(countNumbers)], []).join('-');

  return generateNumber;
};

const getValueFromArr = (arr) => {
  return arr[getRandomNum(0, arr.length - 1)];
};

const mapFieldsToGenerateFunction = {
  title: () => getValueFromArr(strings),
  description: () => getValueFromArr(strings),
  city: () => getValueFromArr(cities),
  phone: () => createPhoneNumber(),
  email: () => `${getValueFromArr(emails)}@test.ru`,
  website: () => `${getValueFromArr(emails)}.ru`,
  username: () => getValueFromArr(usernames),
  firstName: () => getValueFromArr(firstNames),
  lastName: () => getValueFromArr(lastNames),
  countLikes: () => getRandomNum(0, 50),
  status: () => getValueFromArr(statuses),
  countProjects: () => getRandomNum(0, 10),
  countFriends: () => getRandomNum(0, 20),
  rating: () => getRandomNum(0, 10),
  countSubscribers: () => getRandomNum(0, 30),
};
