/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 */

interface IRoute{
  path?: string
  icon?: string
  name: string
  routes?: IRoute[]
  checkActive?(pathname: String, route: IRoute): boolean
  exact?: boolean,
  block?: boolean
}

export function routeIsActive (pathname: String, route: IRoute): boolean {
  if (route.checkActive) {
    return route.checkActive(pathname, route)
  }

  return route?.exact
    ? pathname == route?.path
    : (route?.path ? pathname.indexOf(route.path) === 0 : false)
}

const routes: IRoute[] = [
  {
    block: true,
    name: "Vos salons",
  },
  {
    path: "/rooms/general/communique", // the url
    icon: "HomeIcon", // the component being exported from icons/index.js
    name: "General", // name that appear in Sidebar
    exact: true,
  },
  {
    path: "/rooms/plaintes",
    icon: "FormsIcon",
    name: "Plaintes",
  },
  {
    path: "/rooms/notifications",
    icon: "OutlineBellIcon",
    name: "Notifications",
  },
  {
    block: true,
    name: "Organisation",
  },
  {
    path: "/example/charts",
    icon: "ChartsIcon",
    name: "Services",
  },
  {
    block: true,
    name: "Votre compte",
  },
  {
    path: "/profile",
    icon: "OutlinePersonIcon",
    name: "Profil",
  },
  {
    path: "/example/modals",
    icon: "OutlineCogIcon",
    name: "Parametres",
  },
  {
    path: "/example/tables",
    icon: "OutlineLogoutIcon",
    name: "Déconnexion",
  },
  // {
  //   icon: 'PagesIcon',
  //   name: 'Pages',
  //   routes: [
  //     // submenu
  //     {
  //       path: '/example/login',
  //       name: 'Login',
  //     },
  //     {
  //       path: '/example/create-account',
  //       name: 'Create account',
  //     },
  //     {
  //       path: '/example/forgot-password',
  //       name: 'Forgot password',
  //     },
  //     {
  //       path: '/example/404',
  //       name: '404',
  //     },
  //     {
  //       path: '/example/blank',
  //       name: 'Blank',
  //     },
  //   ],
  // },
];

export type {IRoute}
export default routes
