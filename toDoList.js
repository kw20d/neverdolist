const audioDelete = new Audio('sfx-re.wav');
const audioAdd = new Audio('sfx-add.wav');
const audioComplete = new Audio('sfx-c.wav');
const audioUncomplete = new Audio('sfx-unc.wav');
let logoFade = document.querySelector('#logo-vid');
let logoLoop = document.querySelector('#logo-loop');
logoFade.addEventListener('ended', () => {
   logoLoop.style.opacity = 1;
   logoFade.style.opacity = 0;
   logoLoop.play();

});

const counterDisplay = document.getElementById('counter-badge');
let updateUi = () => {
   let freshItems = document.querySelectorAll(
      '.list-group-item:not(.completed)'
   );
   counterDisplay.textContent = freshItems.length;
};

let deleteCom = (item) => {
   item.classList.add('is-deleting');
   setTimeout(() => {
      item.remove();
   }, 700);
   audioDelete.play();
}


let completeItem = (item) => {

   if (item.classList.contains('completed')) {

      // Undo completion
      item.classList.remove('completed');

      // Remove existing delete button
      item.querySelector('.delete-btn')?.remove();
      audioUncomplete.play();

   } else {

      // Complete task
      item.classList.add('completed');

      // Create delete button
      let deleteButton = document.createElement('button');
      deleteButton.textContent = 'X';
      deleteButton.className = 'delete-btn';

      deleteButton.addEventListener('click', (event) => {
         event.stopPropagation();
         deleteCom(item);
      });
      audioComplete.play();
      item.append(deleteButton);
   }
   updateUi();
};

const list = document.querySelector('.list-group');
let input = document.querySelector('input');
let buttonClick = () => {
   if(input.value.trim() === "")
   {
      return;
   }
   let newSpace = document.createElement('li');
   newSpace.textContent = input.value;
   newSpace.className = 'list-group-item';
   newSpace.classList.add('rows');
   newSpace.addEventListener('click', () => completeItem(newSpace));
   list.appendChild(newSpace);
   input.value = "";
   audioAdd.play();
   updateUi();
};



input.addEventListener('keydown', (event) => {
   if(event.key === 'Enter')
   {   
      event.preventDefault(); 
      buttonClick();
   }
});

