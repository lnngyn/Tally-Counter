let tallies = JSON.parse(localStorage.getItem('tallies')) ||
  [{title: `Tally 1`,value: 0, posInc: 1, negInc: 1}];


/*
const titleElem = document.querySelector(".js-tally-title");
titleElem.addEventListener('input', () =>{
  titleElem.setAttribute('size', titleElem.value.size);
});
*/



renderTallyGrid();


function renderTallyGrid(){
  tallyGridHTML = ``;

  tallies.forEach( (val, i) => {
    const html =`
    <div class="tally-container js-tally-container">
				<div class = "kebab-container">
          <figure></figure>
          <figure></figure>
          <figure></figure>
          <ul class="dropdown">
            <li>Delete Tally</li>
          </ul>
				</div>
				<div class="tally-header">
					<input value="${val.title}" class="tally-title js-tally-title">
				</div>
	
				<div class="tally-val-container">
         ${val.value}
				</div>
				
				<div class="tally-footer">
					<button class="plus-button">
						<img src="icons/plus-icon.png" class="plus-icon">
					</button>
					<button class="minus-button">
						<img src="icons/minus-icon.png" class="minus-icon">
					</button>
				</div>
			</div>
    `;
    tallyGridHTML += html;
    
    
  });
  //add tally button to end of grid
  const html =`
    <button class="add-tally-button js-add-tally-button">
      Add New Tally
		</button>
    `;
  tallyGridHTML += html;
  document.querySelector('.js-tally-counter-grid')
      .innerHTML = tallyGridHTML;
  
  const addTallyElem = document.querySelector('.js-add-tally-button');
  
  addTallyElem.addEventListener('click', () =>{
    tallies.push({title: `Tally ${tallies.length+1}`,value: 0, posInc: 1, negInc: 1});
    renderTallyGrid();

  });

  
  //apply event listeners to all tallies
  document.querySelectorAll('.js-tally-container').forEach( (tally, i) =>{
    const kebab = tally.children[0],
    middle = kebab.children[1],
    dropdown = kebab.children[3];

    kebab.addEventListener('click', () =>{
      middle.classList.toggle('active');
      dropdown.classList.toggle('active');
    })

    //dropdown delete button
    dropdown.children[0].addEventListener('click', () => {
      tallies.splice(i, 1);
      renderTallyGrid();
    })

    //tally title element
    const tallyTitle = tally.children[1].children[0];
    
    tallyTitle.addEventListener('keydown', (event) =>{
      tallies[i].title = tallyTitle.value;
      localStorage.setItem('tallies', JSON.stringify(tallies));
  
      if(event.key === 'Enter'){
        tallyTitle.disabled = true;
      }
    });

    
    tally.children[3].children[0].addEventListener('click', () =>{
      const valContainer = document.querySelectorAll('.tally-val-container')[i];
      incrementVal(valContainer, tallies[i].posInc, i);
    });
    tally.children[3].children[1].addEventListener('click', () =>{
      const valContainer = document.querySelectorAll('.tally-val-container')[i];
      incrementVal(valContainer, tallies[i].negInc*-1, i);
    });

    
  });
  if(tallies.length === 0){
    localStorage.removeItem('tallies');
  }
  else{
    localStorage.setItem('tallies', JSON.stringify(tallies));
  }
}

function incrementVal(valContainer, inc, i){
  const newVal =  Number(valContainer.innerHTML) + inc;
  tallies[i].value = newVal;
  valContainer.innerHTML = newVal;
  localStorage.setItem('tallies', JSON.stringify(tallies));
}
