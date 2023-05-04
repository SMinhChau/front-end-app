import {ALERT_TYPE, Toast} from 'react-native-alert-notification';

export function validateEmail(email: string) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export const isEmpty = (val: any) => {
  return val === undefined ||
    val == null ||
    Number.isNaN(val) ||
    val.length <= 0
    ? true
    : false;
};

export const showMessageWarning = (message: string) => {
  Toast.show({
    type: ALERT_TYPE.WARNING,
    title: 'Thông báo',
    titleStyle: {
      color: '#bc6c25',
    },
    textBody: message,
    textBodyStyle: {
      color: '#ffb703',
      fontSize: 15,
    },
  });
};
export const showMessageSuccess = (message: string) => {
  Toast.show({
    type: ALERT_TYPE.SUCCESS,
    title: 'Thông báo',
    titleStyle: {
      color: '#2b9348',
    },
    textBody: message,
    textBodyStyle: {
      color: '#55a630',
      fontSize: 15,
    },
  });
};
export const showMessageEror = (message: string) => {
  Toast.show({
    type: ALERT_TYPE.DANGER,
    title: 'Thông báo',
    titleStyle: {
      color: '#8d0801',
    },
    textBody: message,
    textBodyStyle: {
      color: '#bf0603',
      fontSize: 15,
    },
  });
};
