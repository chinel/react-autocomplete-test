import React from 'react';



const homePage = () => (
<div >
<h1 id="intro">Welcome</h1>
     <p id="subIntro">To my mini autocomplete search application</p>
      <div className="btnWrapper">
        <div><a href={`/demo/${1}`}>View Demo 1</a></div>
        <div><a href={`/demo/${2}`}>View Demo 2</a></div>
      </div>
</div>
)

export default homePage;