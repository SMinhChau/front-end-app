import React from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {responsiveFont} from '../utilities/sizeScreen';
import Colors from '../Themes/Colors';
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';
interface Props {
  success?: boolean;
  error?: boolean;
  message?: string;
  icon?: any;
  title?: string;
}

const PopupNotification = ({}: Props) => {
  return (
    <>
      <AlertNotificationRoot>
        <View>
          // dialog box
          <Button
            title={'dialog box'}
            onPress={() =>
              Dialog.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Success',
                textBody: 'Congrats! this is dialog box success',
                button: 'close',
              })
            }
          />
          // toast notification
          <Button
            title={'toast notification'}
            onPress={() =>
              Toast.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Success',
                textBody: 'Congrats! this is toast notification success',
              })
            }
          />
        </View>
      </AlertNotificationRoot>
      ;
    </>
  );
};
export default PopupNotification;

const styles = StyleSheet.create({
  contentModal: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    height: '20%',
    backgroundColor: Colors.white,
  },
  title: {
    color: '#f28482',
    fontSize: responsiveFont(16),
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});
