import React from 'react';

import './autocomplete-input2.scss';

//This component shows the name of the location and then when the user uses the keyboard up and
//down arrow keys to navigate, the description of the location shows on the bottom
//It kind of mimics intellisense in an IDE Environment
const AutocompleteInput2 = ({ locations, searchQuery, currentFocus, handleClick }) => {
    
    return(
        <div className="resultWrapper2">
      {locations &&
        locations.map((location, index) => (
          <div key={index} className={`resultGroup ${currentFocus === index ? 'active': ''}`} onClick={() => handleClick(location.name)}>
            <h3>{location.name}</h3>
    
          </div>
         
        ))}
         {currentFocus > -1 && 
         <div className="descWrapper">
          <p>
             {locations[currentFocus]['description']} 
          </p>
          </div>}
    </div>
   )

}
    



export default  AutocompleteInput2;