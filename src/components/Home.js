/*import Radiobox from './Radiobox';
import Checkbox from './Checkbox';
import showFilterResults from './Products';
import {getShopa} from '../api';

const Home = async () => {
    const check = await Checkbox();   
    const radio = Radiobox();  
    const { data } = await getShopa();
 
    return (   
        `
    <div>
  <div>
      <img class="logo-main" src="assets/img/logo.png" alt="Logo" />
  </div>
    <div class="header-navigation-area">
      <ul class="main-menu nav justify-content-center">
        <li><a href="index.html">Home</a></li>
        <li class="has-submenu full-width"><a href="index.html">Shop</a>
 
    </div>
  </div>
        
        <div class="rowShop">
            <div class="mob-shop">
                <h4>Filter by categories</h4>
                <ul>${check}</ul>
                <h4>Filter by price range</h4>
                <div>${radio}</div>
            </div>
        </div>
        <div id="display">
        ${showFilterResults(data)}                      
        </div>`
    );
};

export default Shop;
*/