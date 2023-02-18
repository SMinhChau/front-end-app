import {useEffect, useMemo} from 'react';
import {TouchableOpacity, View, Text, StyleSheet, Image} from 'react-native';
import Header from '../../common/Header';
import GlobalStyles from '../../common/styles/GlobalStyles';
import {Images} from '../../assets/images/Images';
import Line from '../../common/Line';
import TextItemAccount from './component/TextItemAccount';
import languages from '../../languages';
import Colors from '../../Themes/Colors';
import IconView from '../../common/IconView';

const Account: React.FC<{}> = () => {
  const renderTop = () => {
    return (
      <View style={[styles.topAccount]}>
        <Image source={Images.avatar} style={styles.imgaAvatar} />
        <View style={styles.topLeft}>
          <TextItemAccount
            main={true}
            textLeft={languages['vi'].code}
            textRight={'19468371'}></TextItemAccount>
          <TextItemAccount
            main={true}
            textLeft={languages['vi'].name}
            textRight={'Nguyễn Thị Minh Châu'}></TextItemAccount>
        </View>
      </View>
    );
  };

  const renderMain = () => {
    return (
      <View style={styles.main}>
        <TextItemAccount
          textLeft={languages['vi'].dayofbirth}
          textRight={'14/01/2001'}
          line={true}></TextItemAccount>

        <TextItemAccount
          textLeft={languages['vi'].class}
          textRight={'ĐHKTPM15A'}
          line={true}></TextItemAccount>

        <TextItemAccount
          textLeft={languages['vi'].numberPhone}
          textRight={'0795815992'}
          line={true}></TextItemAccount>

        <TextItemAccount
          textLeft={languages['vi'].email}
          textRight={'chaunguyen@gmadddddddddddddddddddddddddddddddil.com'}
          line={true}></TextItemAccount>
      </View>
    );
  };

  return (
    <>
      <Header
        title="Thông tin"
        // iconLeft={true}
        // home={true}
        // iconRight={true}
      ></Header>

      <View style={[styles.update]}>
        <TouchableOpacity>
          <IconView name={'md-brush'} size={24} color={Colors.blueBoder} />
        </TouchableOpacity>
      </View>

      <View style={[GlobalStyles.container, styles.content]}>
        {renderTop()}

        <Line></Line>
        <Line></Line>
        <Line></Line>
        <Line></Line>

        {renderMain()}
        <TouchableOpacity style={[GlobalStyles.flexDirectionRow]}>
          <Text style={styles.logout}>{languages['vi'].logout}</Text>
          <IconView name={'ios-log-out-outline'} size={24} color={Colors.red} />
        </TouchableOpacity>
      </View>
    </>
  );
};
export default Account;

const styles = StyleSheet.create({
  content: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  topAccount: {
    flexDirection: 'row',
  },
  imgaAvatar: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    borderRadius: 50,
    margin: 10,
    borderColor: Colors.blueBoder,
    borderWidth: 1,
    elevation: 2.5,
    shadowOpacity: 0.02,
    shadowOffset: {width: 2, height: 3},
  },
  topLeft: {
    justifyContent: 'flex-end',
    flexDirection: 'column',
    paddingBottom: 5,
  },
  main: {
    marginTop: 20,
    marginHorizontal: 20,
    flexDirection: 'column',
  },
  logout: {
    color: Colors.red,
    fontSize: 15,
    paddingRight: 20,
    marginLeft: 20,
  },
  update: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingTop: 10,
    paddingRight: 15,
    backgroundColor: Colors.white,
  },
});
