const Marker = () => `
  <div class="layoutMap">
    <div class="widget-menu-wrap">
      <ul class="nav-menu">
        <li onclick="window.State.search.searchInstance.Redirect('/')">Home</li>
        <li onclick="window.State.search.searchInstance.Redirect('/marker')">Map</li>
      </ul>
    </div>
    <div id="map" style="height: 100%"></div>
  </div>
`;

export default Marker;

  
