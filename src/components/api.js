

import { stopsLocalstorage } from './helper.js';


export const loadGoogleMapsAPI = () => {
    if (!window.googleMapsAPI) {
        window.googleMapsAPI = new Promise((resolve, reject) => {
            if (typeof google !== 'undefined' && google.maps) {
                resolve(google.maps);  // API is already loaded
            } else {
                const script = document.createElement('script');
                script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyD_T-yrqZE5Lnav12B9SYgycFNn8j9dUUQ&libraries=places";
                script.async = true;
                script.onload = () => resolve(google.maps);
                script.onerror = (error) => reject(error);
                document.head.appendChild(script);
            }
        });
    }
    return window.googleMapsAPI;
  };
    
  
 const observeDOM = (callback) => {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.id === 'map') {
                    // Stop observing once the target div is found
                    observer.disconnect();
                    callback();
                }
            });
        });
    });

    // Start observing the document body for child node additions
    observer.observe(document.body, { childList: true, subtree: true });
};

export default observeDOM





export const getPredictions = async (inputText) => {    
    const googleMaps = await loadGoogleMapsAPI();  
    const service = new googleMaps.places.AutocompleteService();       
    const response = service.getPlacePredictions({ input: inputText }, (predictions, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
              return predictions;
            } else {
              throw new Error(`error! status: ${status}`);
            }
          });
    return response;
};

export const showPredictions = (inputType, a) => (
    a ? (          
        `<div> ${a.map(prediction => 
            `<div onclick="window.State.search.searchInstance.addStop('${inputType}', '${prediction.place_id}')">${prediction.description}</div>`
        ).join('')} </div>`
    ) : a
);



export const updateDropdown = async (inputType, text) => {

    let display;

    inputType === "start" 
    ? display = document.querySelector('#dropdownS')
    : inputType === "end" 
    ? display = document.querySelector('#dropdownE')
    : display = document.querySelector('#dropdown')  
        
    
        // Use ternary to either clear the UI or fetch and display predictions
        !text 
            ? display.innerHTML = '' // Clear the UI if text is empty
            : display.innerHTML = showPredictions(inputType, (await getPredictions(text)).predictions); 
}


export const updateResults = (a) => {   
    const results = document.querySelector('#results');
    return (
        a 
        ? results.innerHTML = (          
            `<div class="col-8"> 
                <h2 >Your selected Stops</h2>
                <div>
                    ${a.map((stop) => (
                        `<div class="product-info">
                            ${stop.name}
                            <a href="" class="pro-remove text-center" onClick="window.State.search.searchInstance.removeStop('${stop.place_id}')"> × </a>
                        </div>`
                    )).join('')}
                </div>
                <hr />           
            </div>`
        ) 
        : results.innerHTML = ""
    );     
};



export const getPlaceDetails = async (placeId) => { 
    const googleMaps = await loadGoogleMapsAPI();    

    // Use an invisible dummy element as the PlacesService still requires one.
    const service = new googleMaps.places.PlacesService(document.createElement('div'));

    try {
        // Wrap the callback-based function in a Promise
        const response = await new Promise((resolve, reject) => {
            service.getDetails({ placeId }, (placeDetails, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    resolve({
                        place_id: placeDetails.place_id,
                        name: placeDetails.name,
                        lat: placeDetails.geometry.location.lat(),
                        lng: placeDetails.geometry.location.lng(),
                    });
                } else {
                    reject(new Error(`Failed to get place details: ${status}`));
                }
            });
        });

        // Log the response directly inside the function
      
        return response;

    } catch (error) {
        console.error(error);
        throw error; // Re-throw if you want the calling code to catch this error
    }
};

  
export const getStops = async () => {
    const stops = await stopsLocalstorage();
    updateResults(stops);
};





