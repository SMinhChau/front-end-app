import {clone} from 'lodash';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import IconView from '../../common/IconView';
import GlobalStyles from '../../common/styles/GlobalStyles';
import languages from '../../languages';
import Colors from '../../Themes/Colors';

const MyTabBar = ({state, descriptors, navigation}: any) => {
  return (
    <View style={[styles.cotent]}>
      {state.routes.map((route: any, index: number, iconName: string) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        if (route.name === languages['vi'].home) {
          iconName = isFocused ? 'home' : 'home-outline';
        } else if (route.name === languages['vi'].group) {
          iconName = isFocused ? 'people' : 'people-outline';
        } else if (route.name === languages['vi'].notification) {
          iconName = isFocused
            ? 'md-notifications-sharp'
            : 'md-notifications-outline';
        } else if (route.name === languages['vi'].account) {
          iconName = isFocused ? 'person' : 'person-outline';
        }

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}>
            {/* <TabbarIcon
            stackName={stackName}
            isFocused={isFocused}
            isHome={isHome}
            isHomeFocus={isHomeFocus}
            /> */}
            <View style={GlobalStyles.centerView}>
              <IconView
                name={iconName}
                size={24}
                color={isFocused ? Colors.black : Colors.primary}
              />
            </View>

            <Text style={{color: isFocused ? Colors.black : Colors.primary}}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default MyTabBar;

const styles = StyleSheet.create({
  cotent: {
    flexDirection: 'row',
    backgroundColor: Colors.primaryButton,
    borderTopWidth: 2,
    // borderColor: Colors.primaryButton,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 5,
  },
});
