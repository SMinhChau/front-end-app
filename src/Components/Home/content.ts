import {useNavigation} from '@react-navigation/native';
import RouteNames from '../RouteNames';
const navigation = useNavigation();

export const menu = [
  {
    name: 'Học kỳ',
    key: 'term',
    navigation: () => navigation.navigate(RouteNames.TermMenu),
    icon: 'book-sharp',
    color: '#bc6c25',
    backgroundColor: '#f8edeb',
  },
  {
    name: 'Đề tài',
    key: 'topic',
    navigation: () => navigation.navigate(RouteNames.TopicMenu),
    icon: 'file-tray-full',
    color: '#0077b6',
    backgroundColor: '#caf0f8',
  },
];
export const menuBottom = [
  {
    name: 'Đánh giá',
    key: 'check',
    navigation: () => navigation.navigate(RouteNames.EvaluationMenu),
    icon: 'people-circle',
    color: '#a7c957',
    backgroundColor: '#d4e09b',
  },
  {
    name: 'Giảng Viên',
    key: 'lecture',
    navigation: () => navigation.navigate(RouteNames.LectureMenu),
    icon: 'school',
    color: '#f08080',
    backgroundColor: '#ffcad4',
  },
];
