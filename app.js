const BASE_URL= "https://api.currencyapi.com/v3/latest?apikey=cur_live_v4twfQIATp1VsvvRZ0F7Yw3PQ8gXmb68eYDLRoOX";
const dropdowns= document.querySelectorAll(".dropdown");
const btn = document.querySelector(".submit-btn");

for(let dropdown of dropdowns){
    for(let currCode in countryList){
        let newopt = document.createElement("option");
        newopt.innerText = currCode;
        newopt.value = currCode;
        if(dropdown.name === "from" && currCode === "USD"){
            newopt.selected = "selected";
        }
        else if(dropdown.name === "to" && currCode === "INR"){
            newopt.selected="selected";
        }
        dropdown.append(newopt);
          
    }
    dropdown.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });

}

const updateFlag = (element) => {
   let currCode = element.value;
   let countryCode = countryList[currCode];
   let newFlagSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;

   let img=element.parentElement.querySelector("img");
   img.src = newFlagSrc;
}

const getAmountValue = () => {
    let amt=document.querySelector("#amount-box");
    amtValue=amt.value;
    if(amtValue < 1 || isNaN(amtValue)){
        amtValue=1;
        amt.value=1;
        amt.innerText=1;
    }
    return amtValue;

}
function getMsg(amount,fromValue,toValue,finalamt){
    const msg =  document.querySelector("#msg");
    msg.innerText = `${amount} ${fromValue} = ${finalamt} ${toValue} `;
}
btn.addEventListener("click", async() => {
    let fromValue = document.querySelector("#from").value; //country currency code in "from" dropdown
    let toValue = document.querySelector("#to").value; //country currency code in "to" dropdown
    const amount = getAmountValue();
    let response = await fetch(BASE_URL);
    let data = await response.json();
    let fromrate = data.data[fromValue].value; //usd -> "from" currency rate
    let torate = data.data[toValue].value; //usd-> "to" currency rate
    //Conversion
    const FromToUSD = amount / fromrate;
    const finalamt = FromToUSD * torate;
    getMsg(amount,fromValue,toValue,finalamt);
});




