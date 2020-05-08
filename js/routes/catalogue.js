import Home from '../pages/home/index';
import PrjIntro from '../pages/prj-introduction/index';

export const dashRoutes = [
  {
    path: '/home',
    component: Home,
    exact: true,
  },
  {
    path: '/prj-intro',
    component: PrjIntro,
  },
];
