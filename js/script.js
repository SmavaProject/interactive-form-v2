const nameField = document.getElementById("name");
const email = document.getElementById("mail");
const title = document.getElementById("title");

//const hiddenLabel = document.querySelector(".hidden-label");
//const hiddenInput = document.querySelector(".hidden-input");

const otherTitle = document.querySelector(".other-title");
const desing = document.getElementById("design");

const activities = document.querySelector(".activities");

const payment = document.getElementById("payment");

const card = document.getElementById("cc-num");
const zip = document.getElementById("zip");
const cvv = document.getElementById("cvv");

const cardDiv = document.getElementById("credit-card");
const paypalDiv = document.getElementById("paypal");
const bitcoinDiv = document.getElementById("bitcoin");

/***
 *Puts cursor on the first field
 */
nameField.focus();
/***
 * Hide other-title input field
 */
otherTitle.style.display = "none";
paypalDiv.style.display = "none";
bitcoinDiv.style.display = "none";
/***
 * Event listener for job title
 */
title.addEventListener('change', (event) => {

    const selected = event.target.value; //e / event
    const other = document.querySelectorAll("#title option")[5].value;
    if (selected == other){
        otherTitle.style.display = "block";
    }else{
        otherTitle.style.display = "none";
    }

});

/***
 * Event listener for t-shirt design
 */
desing.addEventListener('change', (event) =>{
    const selected = event.target.value;
    //hide first option once user clicks the dropdown
    document.querySelectorAll("#design option")[0].style.display = 'none';
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

const activitiesInp = document.querySelectorAll(".activities input");

activities.addEventListener('change', (event) =>{
    const checked = event.target.checked;
    const activitiesInp = document.querySelectorAll(".activities input");
    const timeOfActivity = event.target.getAttribute('data-day-and-time');
    const costOfActivity = parseInt(event.target.getAttribute('data-cost'));

    for (let i = 0; i< activitiesInp.length; i++){
        const time = activitiesInp[i].getAttribute('data-day-and-time');
        console.log("time = " + time + ' timeOfActivity = ' + timeOfActivity);
        if (time == timeOfActivity && event.target != activitiesInp[i]){
            //!!!
            if(checked){
                activitiesInp[i].disabled = true;
                //inputs[i].style.color = "#808080";
            }else {
                activitiesInp[i].disabled = false;
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


/***
 * validates username field
 * @param username
 * @return {boolean}
 */
function isValidUsername(username){
    return /^(?!\s*$).+/.test(username);
}

/***
 *
 * @param email
 * @return {boolean}
 */
function isValidEmail(email){
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
}

/***
 *
 * @param card
 * @return {boolean}
 */
function isCardValid(card){
    return /^\d{13,16}$/.test(card);
}

/***
 *
 * @param zip
 * @return {boolean}
 */
function isZipValid(zip){
    return /^\d{5}$/.test(zip);
}

/***
 *
 * @param cvv
 * @return {boolean}
 */
function isCvvValid(cvv){
    return /^\d{3}$/.test(cvv);
}

/***
 *
 * @return {boolean}
 */
function isActivityChecked(){
    for (let i = 0; i< activitiesInp.length; i++){
        if (activitiesInp[i].checked){
            return true;
        }
    }
    return false;
}


/***
 *
 * @param validator
 * @return {function(...[*]=)}
 */
function customEventListener(validator){
    return event =>{
        const text = event.target.value;
        const valid = validator(text);
        const showTip = text !== "" && !valid;
        const tooltip = event.target;
        showOrHideTip(showTip, tooltip);
    };
}

/***
 *
 * @param show
 * @param element
 */
function showOrHideTip(show, element) {
    const text = element.previousElementSibling.textContent;
    if (show){
        element.style.borderColor = "red";
    }else{
        element.style.borderColor = "inherit";
    }
}

nameField.addEventListener('input', customEventListener(isValidUsername));
email.addEventListener('input', customEventListener(isValidEmail));
card.addEventListener('input', customEventListener(isCardValid));
zip.addEventListener('input', customEventListener(isZipValid));
cvv.addEventListener('input', customEventListener(isCvvValid));

/***
 * 2) hide other payment methods
 * 3) enable validation upon clicking submit
 * 4) hide t-shirt designs
 */
