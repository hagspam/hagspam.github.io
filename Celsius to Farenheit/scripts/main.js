function cToF (){

    let cedit = document.querySelector("#celsius");
    let fedit = document.querySelector("#fahrenheit");
    let cval = parseFloat(cedit.value);
    let timer = setTimeout(removeError, 5000);
    if(isNaN(cval)){
        cedit.nextElementSibling.textContent = "Value \"" + cedit.value + "\" is not a number!";
        cedit.nextElementSibling.classList.remove("hidden");
        return;
    } 
    fedit.value = cval * 1.8 + 32;
    cedit.nextElementSibling.classList.add("hidden");
    fedit.nextElementSibling.classList.add("hidden");
}

function fToC (){

    let cedit = document.querySelector("#celsius");
    let fedit = document.querySelector("#fahrenheit");
    let fval = parseFloat(fedit.value);
    let timer = setTimeout(removeError, 5000);
    if(isNaN(fval)){
        fedit.nextElementSibling.textContent = "Value \"" + fedit.value + "\" is not a number!";
        fedit.nextElementSibling.classList.remove("hidden");
        return;
    }
    cedit.value = (fval - 32) / 1.8;
    cedit.nextElementSibling.classList.add("hidden");
    fedit.nextElementSibling.classList.add("hidden");
}

function removeError(){
    let cedit = document.querySelector("#celsius");
    let fedit = document.querySelector("#fahrenheit");
    cedit.nextElementSibling.classList.add("hidden");
    fedit.nextElementSibling.classList.add("hidden");
}


document.querySelector("#ctof").addEventListener('click', cToF);
document.querySelector("#ftoc").addEventListener('click', fToC);