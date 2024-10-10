import Marker from '../components/Marker.js';
import Search from '../components/Search.js';
import {initializeMap} from '../components/globalState.js';


const routes = {
  "/": Search,
  "/marker": Marker,
  
};

const router = () => {
  const path = window.location.pathname;
  const routeHandler = routes[path] || (() => "NotFound");

  // Render the appropriate component
  document.querySelector('#app').innerHTML = routeHandler();

  // Access the state (passed parameters)
  const state = history.state; // This is where the data passed in pushState is stored

  if (path === '/marker') {
    const mapDiv = document.getElementById('map');
    if (mapDiv) {
      initializeMap();
    }
  }

  if (path === '/ride') {
    const mapDiv = document.getElementById('map');
    if (mapDiv) {
      const { destination, userPosition } = state || {}; // Access passed parameters
      if (destination && userPosition) {
        startRide(destination, userPosition); // Use passed params in startRide
      } else {
        console.error('Missing destination or user position');
      }
    }
  }
};


export const navigateTo = (path, state = {}) => {
  history.pushState(state, path, window.location.origin + path); // Add the state to history
  router();
};
window.navigateTo = navigateTo;
window.addEventListener('popstate', router);

export default router;
