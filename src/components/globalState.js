
import { Redirect } from '../Router/Redirect.js';
import { loadGoogleMapsAPI, updateDropdown, getPlaceDetails, updateResults} from './api.js';
import { 
  clearUI, 
  transformMarker, 
  stopsLocalstorage, 
  transformToRoute,  
  reorderMiddleElements,
  startRide,
} from './helper.js';
import { route } from './route.js';

export const initializeMap = async () => {
  const googleMaps = await loadGoogleMapsAPI();

  // Request needed libraries.
  const { Map, InfoWindow } = await googleMaps.importLibrary("maps");
  const { AdvancedMarkerElement, PinElement } = await googleMaps.importLibrary("marker");

  let stops = stopsLocalstorage();
  const locations = transformMarker(stops);

  // Initialize the map with the first location as the center
  const map = new Map(document.getElementById("map"), {
    zoom: 9,
    center: locations[0].position,
    mapId: "4504f8b37365c3d0",
  });

  const infoWindow = new InfoWindow();

  // Track whether the "Go" button has been clicked for each marker
  const goButtonClicked = new Array(locations.length).fill(false);

  // Create the markers.
  locations.forEach(({ position, title }, i) => {
    const pin = new PinElement({
      glyph: `${i + 1}`,
      glyphColor: "white", // Color of the text
      background: "#000000", // Background color of the pin
      scale: 1.5,
    });
    const marker = new AdvancedMarkerElement({
      position,
      map,
      title: `${title}`,
      content: pin.element,
      gmpClickable: true,
    });

    marker.addListener("click", ({ domEvent }) => {
      // Decide which content to show based on whether "Go" was clicked
      const infoWindowContent = `
      <div style="font-size: 16px; font-weight: bold;">${marker.title}</div>
      <button id="goButton-${i}" style="margin-top: 8px; padding: 5px 10px; background-color: #4285F4; color: white; border: none; border-radius: 4px; cursor: pointer;">
        Go
      </button>
    `;
    
    const infoWindowContentB = `
      <div style="font-size: 16px; font-weight: bold;">${marker.title}</div>
      <button id="goButton-${i}" style="margin-top: 8px; padding: 5px 10px; background-color: #4285F4; color: white; border: none; border-radius: 4px; cursor: pointer;">
        Go
      </button>
      <button id="finishButton-${i}" style="margin-top: 8px; padding: 5px 10px; background-color: #4285F4; color: white; border: none; border-radius: 4px; cursor: pointer;">
        Finish
      </button>
    `;
    
      // Set content based on whether "Go" was clicked
      const contentToShow = goButtonClicked[i] ? infoWindowContentB : infoWindowContent;
      infoWindow.setContent(contentToShow);
      infoWindow.open(map, marker);

      // Attach event listener to the "Go" button if not clicked yet
      google.maps.event.addListener(infoWindow, 'domready', () => {
        const goButton = document.getElementById(`goButton-${i}`);
        if (goButton) {
          goButton.addEventListener('click', () => {
            goButtonClicked[i] = true; // Mark "Go" as clicked for this marker
            infoWindow.setContent(infoWindowContentB); // Update the infoWindow content
            startRide(locations[i]); // Start the ride
          });
        }
        
        // Attach event listener to the "Finish" button
        const finishButton = document.getElementById(`finishButton-${i}`);
        if (finishButton) {
          finishButton.addEventListener('click', () => {
            // Remove the stop from local storage
            let stops = stopsLocalstorage();  // Get current stops from local storage
            stops.splice(i, 1);  // Remove the stop at the current index
            localStorage.setItem('stops', JSON.stringify(stops));  // Update local storage

            // Refresh the page to update the markers
          
            Redirect("/marker");  // Refresh the page to re-render the map
          });
        }
      });
    });
  });

  
  // Geolocation logic for tracking user's position
  let userMarker;
  let lastKnownPosition = null; // Store the last known user position

  function updateUserLocation(position) {
    const userPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };

    lastKnownPosition = userPosition; // Update the last known position

    // Create or update user location marker (blue dot)
    if (userMarker) {
      userMarker.position = userPosition; // Update position directly
    } else {    
      const blueDot = document.createElement("div");
      blueDot.style.backgroundColor = "#4285F4";
      blueDot.style.border = "2px solid white";
      blueDot.style.borderRadius = "50%";
      blueDot.style.width = "12px";
      blueDot.style.height = "12px";

      userMarker = new google.maps.marker.AdvancedMarkerElement({
        position: userPosition,
        map: map,
        title: "Your Location",
        content: blueDot,
      });
    }
  }

  // Handle geolocation error
  function handleLocationError(error) {
    console.error("Error fetching geolocation: ", error.message);
  }

  // Watch user's position and update marker dynamically
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(updateUserLocation, handleLocationError, {
      enableHighAccuracy: true, // High accuracy for better tracking
      maximumAge: 30000, // Cache location for 30 seconds
      timeout: 27000, // Timeout if unable to get location within 27 seconds
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }

  // Button to recenter map on user's location
  const locationButton = document.createElement("button");
  locationButton.textContent = "📍";
  locationButton.classList.add("custom-map-control-button");

  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(locationButton);

  // When the button is clicked, center map on user's current location
  locationButton.addEventListener("click", () => {
    if (lastKnownPosition) {
      map.setCenter(lastKnownPosition); // Immediately center the map on the last known user position
    } else {
      alert("User location is not available yet.");
    }
  });

  // Custom style for the button (you can adjust this)
  const styleElement = document.createElement("style");
  styleElement.textContent = `
    .custom-map-control-button {
      background-color: white;
      border: 2px solid #4285F4;
      border-radius: 50%;
      cursor: pointer;
      margin: 10px;
      padding: 10px;
      font-size: 16px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
    }
    .custom-map-control-button:hover {
      background-color: #4285F4;
      color: white;
    }
  `;
  document.head.appendChild(styleElement);
};



export const state = {
  search: {

    predictions: [],
    keywords: "",
    stops: [],
    api: () => {
      // Update fireKeywords to handle two parameters
      const fireKeywords = (inputType, val) => {
        console.log(`Input Type: ${inputType}, Value: ${val}`);
        updateDropdown(inputType, val);
        // render();  // Rerender the results
      }

      // Update debounce to handle two parameters
      const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
            func.apply(null, args); // Pass multiple arguments to func
          }, delay);
        };
      }

      // Update debounceKeywords to handle two parameters
      const debounceKeywords = debounce(fireKeywords, 2000);

      const removeStop = async (stopId) => {
        let stops = []   
        stops = stopsLocalstorage(); 

          stops.map((stop, i) => {
            if (stop.place_id === stopId) {
              stops.splice(i, 1);
            }
          });

          localStorage.setItem('stops', JSON.stringify(stops));        
          Redirect("/")
      };

      const addStop = async (input, id) => {
        const stop = await getPlaceDetails(id);
        let start = "";
        let end = "";
        let stops = [];
      
        // Retrieve the current stops from local storage
        stops = stopsLocalstorage();
      
        // Update the stops array state based on the type of input
        if (input === "start") {
          start = stop;
          clearUI("dropdownS", input);
        } else if (input === "end") {
          end = stop;
          clearUI("dropdownE", input);
        } else {
          stops.push(stop);
          clearUI("dropdown", input);
        }
      
        // Create the final array, removing null or undefined values
        const finalStops = [start, ...stops, end].filter(Boolean);
      
        // Save the updated stops array to local storage and update the results
        localStorage.setItem('stops', JSON.stringify(finalStops));
        Redirect("/")
      };
      const goButton = async () => {       
        let stops = []   
        stops = stopsLocalstorage();    
        const waypointsOrder = await route(transformToRoute(stops));
        console.log(waypointsOrder);
        const sortedStops = reorderMiddleElements(stops, waypointsOrder);
        localStorage.setItem('stops', JSON.stringify(sortedStops));
          Redirect("/marker")
      };
      return { fireKeywords, debounceKeywords, addStop, removeStop, goButton, Redirect };
    },
  }
};

window.State = state;
// Initialize the search instance
window.State.search.searchInstance = window.State.search.api();

