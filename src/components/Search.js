

import { stopsLocalstorage } from './helper.js';
import  Results  from './Results.js';
import zujImage from '../zuj.png';  // Import the image file

const Search =  () => {
  const  stops  =  stopsLocalstorage(); 

  return (    
    `<div class="layout">
      <div class="widget-menu-wrap">
         <ul class="nav-menu">
         <li onclick="window.State.search.searchInstance.Redirect('/')">Home</li>
         <li onclick="window.State.search.searchInstance.Redirect('/marker')">Map</li>          
      </div>
      <div class="photo">
      <img src="${zujImage}" alt="zunair">
        <div class="photocap"><p>Optimize Your Delivery route with Sirjeel's App</p></div>
      </div>
      
      <div class="screen">
         <div>
            <label for="search">Add Stops:</label>
            <input type="text" name="subject" id="search" oninput="window.State.search.searchInstance.debounceKeywords('search', this.value)" placeholder="Search here" />
            <div id="dropdown"></div>
            <label for="fname">Start:</label>
            <input type="text" id="start" name="start" oninput="window.State.search.searchInstance.debounceKeywords('start', this.value)" placeholder="Starting place...">
            <div id="dropdownS"></div>
            <label for="lname">End:</label>
            <input type="text" id="end" name="end" oninput="window.State.search.searchInstance.debounceKeywords('end', this.value)" placeholder="Final destination...">
            <div id="dropdownE"></div>
         </div>
         <div id='results' class="results"> ${Results(stops)} </div>
         <div class="go" onclick="window.State.search.searchInstance.goButton()">Go</div>
      </div>
   </div>`
  );
};

export default Search;
