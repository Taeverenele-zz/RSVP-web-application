const form = document.getElementById('registrar'); //get hold of <form>'s ID 'registrar' and store it in a variable
const input = form.querySelector('input'); //use the new 'form' variable to get hold of <input> and store it in a variable
const mainDiv = document.querySelector('.main'); //use <div class="main"> in HTML to get hold of the parent element to the <div> we create below
const ul = document.getElementById('invitedList');// get hold of <ul>'s ID 'invitedList' and store it in a variable

//create a <div> to add a <label> and a <checkbox> to hide guests not confirmed
const div = document.createElement('div'); //create <div> and store it in a variable
const filterLabel = document.createElement('label'); //create <label> and store it in a variable
const filterCheckBox = document.createElement('input'); //create <input> and store it in a variable

filterLabel.textContent = "Hide those who haven't responded"; //give label text content
filterCheckBox.type = 'checkbox'; //give <input> type 'checkbox
div.appendChild(filterLabel); //append label to div
div.appendChild(filterCheckBox); //append checkbox to div
mainDiv.insertBefore(div, ul); //insert our new 'div' to its parent 'mainDiv'
filterCheckBox.addEventListener('change', (e) => { //add event handler to the checkbox
  const isChecked = e.target.checked; //if checkbox is ticked, store it in a variable
  const lis = ul.children; //store all list items that are children of <ul> element in a variable
  if (isChecked) { //if checkbox is checked (isChecked === true)
    for (var i = 0; i < lis.length; i += 1) { //loop through all list items to check if any have been checked
      var li = lis[i]; //create a variable to represent the individual 'li's to make it more readable
      if (li.className === 'responded') { //if 'li' has got a class name' responded'
        li.style.display = ''; // keep its previous styles
      } else { //otherwise
        li.style.display = 'none'; // hide the element
      }
    }
  } else {
    for (var i = 0; i < lis.length; i += 1) { //loop through all list items to check if any have been checked
      var li = lis[i]; //create a variable to represent the individual 'li's to make it more readable
      li.style.display = ''; //if checkbox is not checked, keep the previous styles
    }
  }
});


function createLI(text) { //create a function which creates new <li> items
  const li = document.createElement('li'); //create <li> element and store it in a variable
  const span = document.createElement('span'); //create a <span> element and store it in a variable
  span.textContent = text; //set 'span' variable text content to text
  li.appendChild(span); //append 'span' to 'li' in order to be able to change the input type when clicking on edit button
  //create a checkbox to be able to confirm guests
  const label = document.createElement('label'); //create a new <label> element and store it in a variable
  label.textContent = 'Confirmed'; //have the lable say 'confirmed'
  const checkbox = document.createElement('input'); //create an <input> element to go with the label and store it in a var
  checkbox.type = 'checkbox'; // make the <input> into a checkbox by giving it a type
  label.appendChild(checkbox); //append 'checkbox' to 'label'
  li.appendChild(label); //and append 'label' to 'li'
  // create an 'edit' button
  const editButton = document.createElement('button'); //create a new button and store it in a variable
  editButton.textContent = 'edit'; //name the button 'edit'
  li.appendChild(editButton); //append the button to the 'li'
  //create a 'remove' button
  const removeButton = document.createElement('button'); //create a new button and store it in a variable
  removeButton.textContent = 'remove'; //name the button 'remove'
  li.appendChild(removeButton); //append the button to the 'li'
  return li; //return the <li> element to the handler
}

form.addEventListener('submit', (e) => { //add event handler to the <form> element
  e.preventDefault(); //'submit' makes the page reload by default, which we do not need in this case
  const text = input.value; //store input value in a var 'text'
  input.value = ''; //once input value has been stored in a variable, clear the input field
  const li = createLI(text); //call the function 'createLI' and store it in a variable
  ul.appendChild(li); //append that 'li' to the parent 'ul' element
});

ul.addEventListener('change', (e) => { //add event handler to the checkbox
  const checkbox = event.target; //store the checkbox in a variable by using the 'target'
  const checked = checkbox.checked; //create a new variable for when the checkbox is checked
  const listItem = checkbox.parentNode.parentNode; //use travesing to link together checkbox-label-li and store it in a var
  // if checkbox is checked, change the look of this <li>
  if (checked) { //if checked === true
    listItem.className = 'responded'; //give 'listItem' the class name 'responded'
  } else { //otherwise
    listItem.className = ''; //no class name
  }
});

ul.addEventListener('click', (e) => { //add event handler to the buttons
  if (e.target.tagName === 'BUTTON') { //if the clicked element has a tag name 'button'
    const button = e.target; //clean up as we used 'e.target' in a few places
    const li = button.parentNode; //traverse up from button to its parent <li> and store it in a variable
    const ul = li.parentNode; //traverse up again to get hold of <li>'s parent <ul> and store that in a variable
    if (button.textContent === 'remove') { //if button says 'remove'
      ul.removeChild(li); //remove 'li' item from the 'ul'
    } else if (button.textContent === 'edit') { //if button says 'edit'
      const span = li.firstElementChild; //get hold of <span> element and store it in a variable
      const input = document.createElement('input'); //create a new <input> element and store it in a variable
      input.type = 'text'; //set input type to 'text'
      input.value = span.textContent; //set the input value to be the text content of 'span'
      li.insertBefore(input, span); //use 'span' to place <input> element into the <li> element
      li.removeChild(span); //remove 'span' from 'li'
      button.textContent = 'save'; // change the button to say 'save'
    } else if (button.textContent === 'save') { // if button text content is 'save' - reverse the above
    const input = li.firstElementChild; // select <input> and store it in a variable
    const span = document.createElement('span'); // create an <ispan> element and store it in a variable
    span.textContent = input.value; // set the span text content to the value of input field
    li.insertBefore(span, input); // use 'span' to put input into the <li> element
    li.removeChild(input); // remove input from <li>
    button.textContent = 'edit'; // when all of the above has run, turn the button's text content back to 'edit'
    }
  }
});









