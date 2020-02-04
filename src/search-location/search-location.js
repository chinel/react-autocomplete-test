import React, { Component } from "react";
import AutocompleteInput1 from "../autocomplete-input/autocomplete-input1/autocomplete-input1";
import AutocompleteInput2 from "../autocomplete-input/autocomplete-input2/autocomplete-input2";
import spinner from "../assets/spinner.svg";
import {Link} from "react-router-dom";

import "./search-location.scss";

class SearchLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      filteredLocations: [],
      searchQuery: '',
      currentFocus: -1,
      showAutoComplete: false
    };
  }

  //this function is called once the user enters an input on the search box
  //Based on the user's query the corresponding location that matches the user's query is returned
  handleLocationChange = (e) => {
    let queryString =  e.target.value;
    if (queryString  !== " ") {
      this.setState({ loading: true , searchQuery: queryString,filteredLocations: [], showAutoComplete: true})
        fetch(
          ` https://coding-challenge.echoandapex.com/locations?q=${queryString.toLowerCase()}`
        )
          .then(response => response.json())
          .then(locations =>{
            this.setState({
              loading: false,
              filteredLocations: locations["predictions"].filter(
                (location) => location.name.toLowerCase().includes(this.state.searchQuery.toLowerCase()) || location.description.toLowerCase().includes(this.state.searchQuery.toLowerCase())
                )
            });
          
          }
          );   
      
  }else{
  this.setState({ filteredLocations: [] });
  }
};


  //This function is executed when the user presses a key on their keyboard

  handleKeyPress = (e) => {
    
   let keyPressed = e.keyCode;
   switch (keyPressed) {
     case 40:
       this.setState((prevState, prevProps) => {
         return{currentFocus: 
          (prevState.currentFocus === (prevState.filteredLocations.length-1))? 0 :prevState.currentFocus + 1}},()=>console.log(this.state.currentFocus));
       break;
     case 38:
      this.setState((prevState, prevProps) => {return{currentFocus: (prevState.currentFocus === 0)? prevState.filteredLocations.length - 1:prevState.currentFocus - 1}}); 
      break;
     case 13:
      if(this.state.currentFocus !== -1){ 
        this.setState((prevState, prevProps) => {return{searchQuery: prevState.filteredLocations[prevState.currentFocus]['name'], showAutoComplete: !prevState.showAutoComplete }}) 
      break; 
      }
      break;
       default:
       break;
   }

  }


  handleClick = (locationName) => {
    this.setState({
      searchQuery: locationName,
      showAutoComplete: false
    })
  }

  render() {
    const { loading, searchQuery, filteredLocations, showAutoComplete, currentFocus} = this.state;
  
    
    return (
      <div>
        <div className="btnWrap"> 
          <Link to={'/'} className="backBtn">Back to Home Page</Link>
        </div>
        <h2>Search location</h2>
        <div className="inputWrapper">
          <input
            type="text"
            onChange={this.handleLocationChange}
            onKeyDown={this.handleKeyPress}
            className="inputForm"
            value={searchQuery}
            placeholder="Start typing ......"
          />
          {loading && (
            <span>
              <img src={spinner} alt="" />
            </span>
          )}
        </div>
        {filteredLocations.length > 0 && showAutoComplete &&
        (this.props.match.params.id === "1" ? (
          <AutocompleteInput1 locations={filteredLocations} searchQuery={searchQuery} currentFocus={currentFocus} handleClick={this.handleClick}/>
        ) : (
          <AutocompleteInput2 locations={filteredLocations} searchQuery={searchQuery} currentFocus={currentFocus} handleClick={this.handleClick}/>
        ))}
  
      </div>
    );
  }
}

export default SearchLocation;
