const nameField = document.getElementById("name");
const title = document.getElementById("title");

const hiddenLabel = document.querySelector(".hidden-label");
const hiddenInput = document.querySelector(".hidden-input");

const desing = document.getElementById("design");

const activities = document.querySelector(".activities");

const payment = document.getElementById("payment");

/***
 *
 */
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

/***
 * event listener for ...
 */
desing.addEventListener('change', (event) =>{
    const selected = event.target.value;
    const jspuns = document.querySelectorAll("#design option")[1];
    const heartjs = document.querySelectorAll("#design option")[2];

    const tshirtColors = document.querySelectorAll("#color option");
    console.log("length " + tshirtColors.length);
    for (let i = 0; i < tshirtColors.length; i++) {
        tshirtColors[i].style.display = 'none';
        if (selected == jspuns.value) {
            jspuns.selected = true;
            if (i >= 1 && i <= 3) {
                tshirtColors[i].style.display = 'block';
            }
        } else if (selected == heartjs.value) {
            heartjs.selected = true;
            if (i >= 4 && i <= 6) {
                tshirtColors[i].style.display = 'block';
            }
        }else{
            //show "placeholder" for the color if neither design is selected
            tshirtColors[0].style.display = 'block';
        }
    }
});

let costs = 0;
const totalCosts = document.createElement("div");
activities.appendChild(totalCosts);
/***
 * Event listener for Activities: calculates total costs of the conference
 */
activities.addEventListener('change', (event) =>{
    const checked = event.target.checked;
    const inputs = document.querySelectorAll(".activities input");
    const timeOfActivity = event.target.getAttribute('data-day-and-time');
    const costOfActivity = parseInt(event.target.getAttribute('data-cost'));

    for (let i = 0; i< inputs.length; i++){
        const time = inputs[i].getAttribute('data-day-and-time');
        console.log("time = " + time + ' timeOfActivity = ' + timeOfActivity);
        if (time == timeOfActivity && event.target != inputs[i]){
            //!!!
            if(checked){
                inputs[i].disabled = true;
                //inputs[i].style.color = "#808080";
            }else {
                inputs[i].disabled = false;
            }
        }
    }

    if (checked){
        costs += costOfActivity;
    }else{
        costs = costs - costOfActivity;
    }
    if(costs === 0){
        totalCosts.style.display = "none";
    } else {
        totalCosts.style.display = "block";
        totalCosts.innerText = `Your total costs are: $ ${costs}`;
    }
});

/***
 * Event listener for payment options
 */
payment.addEventListener('change', (event) =>{
    const card = document.querySelectorAll("#payment option")[1];
    const paypal = document.querySelectorAll("#payment option")[2];
    const bitcoin = document.querySelectorAll("#payment option")[3];

    const cardDiv = document.getElementById("credit-card");
    const paypalDiv = document.getElementById("paypal");
    const bitcoinDiv = document.getElementById("bitcoin");

    const selected = event.target.value;

    if (selected == card.value){
        cardDiv.style.display = 'block';
        paypalDiv.style.display = 'none';
        bitcoinDiv.style.display = 'none';
    } else if (selected == paypal.value){
        cardDiv.style.display = 'none';
        paypalDiv.style.display = 'block';
        bitcoinDiv.style.display = 'none';
    }else if(selected == bitcoin.value){
        cardDiv.style.display = 'none';
        paypalDiv.style.display = 'none';
        bitcoinDiv.style.display = 'block';
    }
});

