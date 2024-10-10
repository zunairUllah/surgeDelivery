import { navigateTo } from './Router';

export const Redirect = (to, state = {}) => navigateTo(to, state);
  
