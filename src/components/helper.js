

export const clearUI = (dropdown, inputType) => {

    const display = document.querySelector(`#${dropdown}`);
    const displayinput = document.querySelector(`#${inputType}`);
    display.innerHTML = '';
    displayinput.value = '';

}



  
// below func transform the format of local storage data to that required by Marker component structure see types of both structure
export const transformMarker = (data) => data.map(item => ({
    position: {
        lat: item.lat,
        lng: item.lng
    },
    title: item.name
}));


// below func transform the format of local storage data to that required by Marker component see types of both structure

export const transformToRoute = (b) => {
  
    // Get the origin, destination, and waypoints
    const origin = {
      lat: b[0].lat,
      lng: b[0].lng,
    };
  
    const destination = {
      lat: b[b.length - 1].lat,
      lng: b[b.length - 1].lng,
    };
  
    const waypoints = b.slice(1, -1).map(item => ({
      location: {
        lat: item.lat,
        lng: item.lng,
      },
    }));
  
    // Return the structure
    return {
      origin,
      destination,
      waypoints,
      optimizeWaypoints: true,
      travelMode: "DRIVING" 
    };
  };
  
// below is clean code of nested two fold if statement if window true then go inside then if local storage true then do that
export const stopsLocalstorage = () => {
    if (typeof window === 'undefined') return [];  
    return JSON.parse(localStorage.getItem('stops') ?? '[]');
  }

  export const reorderMiddleElements = (b, a) => {
    // Extract middle elements from b (excluding first and last elements)
    const middleElements = b.slice(1, b.length - 1);
  
    // Sort the middle elements based on the order defined in a
    const sortedMiddle = a.map(index => middleElements[index]);
  
    // Reconstruct b with the sorted middle elements
    return [b[0], ...sortedMiddle, b[b.length - 1]];
  };

  export const startRide = (obj) => {
  // Extract latitude and longitude from destination object
  const { lat, lng } = obj.position;

  // Construct the Google Maps URL with the destination lat/lng
  const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;

  // Open Google Maps in a new tab with the destination pre-populated
  window.open(googleMapsUrl, '_blank');

  }
