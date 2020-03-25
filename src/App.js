import React, { useState } from 'react';
import axios from "axios";
import './App.css';

function App() {
  // SET REDUX STATE
  const [query, setQuery] = useState("Amazon");
  // PREPARE JSX OUTPUT
  return (
    // PARENT ELEMENT
    <div className="App">
      {/* DECORATIVE IMGAGE */}
      <img src='HN.png' alt='HN img'/>
      {/* PROJECT DESCRIPTION FROM PARENT SITE */}
      <div id='head'>This API is built on top of Algolia Search's API. It enables developers to access HN data programmatically using a REST API. This <a href="https://hn.algolia.com/api">documentation</a> describes how to request data from the API and how to interpret the response.</div>
       {/* FORM TO COLLECT SEARCH PARAMETER */}
       <form
        /* ON SUBMIT -> 
          PREVENT RELOAD ->
          DUMP CONTENT STORAGE AREA -> 
          CALL API ->
          USE COUNTER [i] TO TRACK RETURNS AND ITERATE CHILDREN ->
          CREATE NEW DIV ->
          ADD CLASSNAME TO DIFFERENTIATE ->
          NEST NUMBER AND HYPERLINK TO ARTICLE AS TITLE ->
          ADD CHILD
        */
        onSubmit={event => {
          event.preventDefault();
          document.getElementById('output').innerHTML = '';
          axios.get(`http://hn.algolia.com/api/v1/search?query=${query}`).then(
          (response) => {
            document.getElementById('results').innerText = `     Found ${response.data.hits.length} Results`;
            for (var i = 0; i < response.data.hits.length; i++){
              var newDiv = document.createElement('div');
              newDiv.className = i;
              newDiv.innerHTML = `${i+1}. <a href=${response.data.hits[i].url} target='blank'>${response.data.hits[i].title}</a>`;
              document.getElementById('output').append(newDiv);
            }
          })

        }}
      >
        {/* LABEL FOR SEARCH BAR */}
        <span>Search: </span>
        {/* INPUT WINDOW */}
        <input
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        {/* SUBMIT TRIGGERS EVENT => API */}
        <button type="submit">Search</button>
        {/* STORES CURRENT NUMBER OF RESULTS */}
        <span id='results'></span>
      </form>
      {/* STORES CURRENT RESULTS */}
      <div id='output'></div>
      {/* GOES TO  GITHUB REPO */}
      <div id='foot'>
        <a href='https://github.com/fkarticuno/RTS20200323' target='blank'>- See The Code -</a>
      </div>
    </div>
  );
}
// EXPORT MODULE TO ROOT
export default App;
