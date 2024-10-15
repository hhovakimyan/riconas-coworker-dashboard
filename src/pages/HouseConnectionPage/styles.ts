import { sidebarWidth } from 'constants/main';

export const mainContentStyles = {
  marginLeft: `${sidebarWidth}px`,
  overflowX: 'scroll',
  maxWidth: `calc(100% - ${sidebarWidth}px)`
}