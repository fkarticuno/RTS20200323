import React, { useState } from 'react';
import axios from "axios";
import './App.css';

function App() {
  const [query, setQuery] = useState("Cats");
  var data = [];
  return (
    <div className="App">
      <img src='HN.png' alt='HN img'/>
      <div id='head'>This API is built on top of Algolia Search's API. It enables developers to access HN data programmatically using a REST API. This <a href="https://hn.algolia.com/api">documentation</a> describes how to request data from the API and how to interpret the response.</div>
       <form
        onSubmit={event => {
          event.preventDefault();
          document.getElementById('output').innerHTML = ''
          axios.get(`http://hn.algolia.com/api/v1/search?query=${query}`).then(
          (response) => {
            //console.log(response.data.hits[0])
            document.getElementById('results').innerText = `     Found ${response.data.hits.length} Results`
            for (var i = 0; i < response.data.hits.length; i++){
              data.push(response.data.hits[i].title)
              var newDiv = document.createElement('div');
              newDiv.className = i;
              newDiv.innerHTML = `${i+1}. <a href=${response.data.hits[i].url} target='blank'>${response.data.hits[i].title}</a>`
              document.getElementById('output').append(newDiv)
            }
          })
        }}
      >
        <span>Search: </span>
        <input
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        <button type="submit">Search</button>
        <span id='results'></span>
      </form>
      <div id='output'></div>
      <div id='foot'>
        <a href='https://github.com/fkarticuno/RTS20200323' target='blank'>- See The Code -</a>
      </div>
    </div>
  );
}

export default App;
