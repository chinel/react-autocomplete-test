import React from "react";

import "./autocomplete-input1.scss";

//This component shows the name and description of the location on the same box
const AutocompleteInput1 = ({ locations, searchQuery, currentFocus, handleClick }) => {
 
  let regexPattern =  RegExp(`${searchQuery}`, 'i');
  
  return (
    <div className="resultWrapper">
      {locations &&
        locations.map((location, index) => (
          <div key={index} className={`resultGroup ${currentFocus === index ? 'active': ''}`} onClick={() => handleClick(location.name)}>
            <h3>{location.name}</h3>
            <p
              dangerouslySetInnerHTML={{
                __html: location.description.replace(
                   regexPattern ,
                    "<span>" + location.description.match(regexPattern)[0] + "</span>"
                )
              }}
            ></p>
          </div>
        ))}
    </div>
  );
            
};

export default AutocompleteInput1;
