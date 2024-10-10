import { loadGoogleMapsAPI } from './api.js';


export const route = async (a) => {

    const googleMaps = await loadGoogleMapsAPI();    
    const service =  new googleMaps.DirectionsService();       
    const response = await service.route(a);

   return response.routes[0].waypoint_order;

}
                       
 



