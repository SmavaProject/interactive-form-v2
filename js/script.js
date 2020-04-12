const nameField = document.getElementById("name");
const title = document.getElementById("title");

const hiddenLabel = document.querySelector(".hidden-label");
const hiddenInput = document.querySelector(".hidden-input");

nameField.focus();

title.addEventListener('change', (event) => {

    const selected = event.target.value; //e / event
    const other = document.querySelectorAll("#title option")[5].value;
    if (selected == other){
        hiddenInput.style.display = "block";
        hiddenLabel.style.display = "block";
    }else{
        hiddenLabel.style.display = "none";
        hiddenInput.style.display = "none";
    }

});


