import RouteNames from '../RouteNames';

export const MENU = [
  {
    key: 'group',
  },
  {
    key: 'listGroup',
    backgroupIcon: '#a2d2ff',
    borderIcon: '#0096c7',
    title: 'Danh sách nhóm',
    navigate: RouteNames.ItemListGroup,
    icon: 'people-sharp',
    iconColor: '#0096c7',
  },
  {
    key: 'students',
    backgroupIcon: '#fae1dd',
    borderIcon: '#fec5bb',
    title: 'Danh sách sinh viên',
    navigate: RouteNames.ItemStudents,
    icon: 'ios-people-circle-outline',
    iconColor: '#f4978e',
  },
  {
    key: 'students',
    backgroupIcon: '#caffbf',
    borderIcon: '#38b000',
    title: 'Yêu cầu tham gia nhóm',
    navigate: RouteNames.JoinGroupToOrther,
    icon: 'people-circle',
    iconColor: '#008000',
  },
  {
    key: 'students',
    backgroupIcon: '#f8edeb',
    borderIcon: '#bc4749',
    title: 'Lời mời tham gia nhóm',
    navigate: RouteNames.InviteJoinGroup,
    icon: 'ios-person-add',
    iconColor: '#bc4749',
  },
  {
    key: 'topic',
    backgroupIcon: '#cce3de',
    borderIcon: '#6b9080',
    title: 'Đề tài',
    navigate: RouteNames.ItemTopicMenu,
    icon: 'md-book',
    iconColor: '#6b9080',
  },
];
