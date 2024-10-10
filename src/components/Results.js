


const Results = (a) => {  

    return (
        a ? (
             `<div class="list"> 
                <h2 >Your selected Stops</h2>
                <div>
                    ${a.map((stop) => (
                        `<div class="product-info">
                            ${stop.name}
                            <div class="pro-remove" onClick="window.State.search.searchInstance.removeStop('${stop.place_id}')"> X </div>
                       
                            </div>`
                    )).join('')}
                </div>          
            </div>` 
            ) : ""
    );
};

export default Results;

