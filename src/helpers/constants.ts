import moment from 'moment';

import Config from 'react-native-config';
import {ReqResponse} from '../Interfaces/error.interface';

export const getUrl = () => {
  return 'https://motoringapp.vantagesignals.com/api';
};
export const assetUrl = () => {
  return 'https://motoringapp.vantagesignals.com/public/storage';
};

export function currencyFormat(num) {
  return (
    '\u20A6' +
    Number(num)
      .toFixed(2)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  );
}
export function formatPrice(num) {
  return Number(num)
    .toFixed(0)
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

export const performAsyncCalls = async (
  data = {},
  login: Function,
): Promise<ReqResponse> => {
  let response: ReqResponse;
  try {
    response = await login(data).unwrap();
  } catch (error: any) {
    response = error.data;
    return response;
  }
  return response;
};
export const generateYears = (startYear: number) => {
  var currentYear = new Date().getFullYear(),
    years = [];
  startYear = startYear;
  while (startYear <= currentYear) {
    years.push(startYear++);
  }
  return years;
};
