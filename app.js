const baseURL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns=document.querySelectorAll(".dropdown select");

const msg=document.querySelector(".msg");
for(let select of dropdowns)
{
    for(currCode in countryList)
    {
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        if(select.name === "from" && currCode === "INR")
        {
            newOption.selected = "selected";
        }
        else if(select.name === "to" && currCode === "USD")
        {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target); //target passes where the change was made
    });
}
const updateFlag = (element) => {
    //console.log(element);
    let currCode=element.value; 
    console.log(currCode);
    let countryCode= countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img= element.parentElement.querySelector("img");
    img.src=newSrc;

}
const btn= document.querySelector("button");
const fromCurrency= document.querySelector(".from select");
const toCurrency=document.querySelector(".to select");
btn.addEventListener("click", (evt)=>
{
    evt.preventDefault();
    updateExchangeRate(); //to stop refreshing on clicking the button

});
const updateExchangeRate= async () =>
{
    let amount = document.querySelector("form input");
    let amtVal= amount.value;
    console.log(amtVal);
    if(amtVal==="" || amtVal<1)
    {
        amtVal=1;
        amtVal.value="1";
    }
    //console.log(fromCurrency.value, toCurrency.value);
    const URL= `${baseURL}/${fromCurrency.value.toLowerCase()}.json`;
    let response= await fetch(URL);
    let data= await response.json();
    
    //console.log(response);
   
    let rate= data[fromCurrency.value.toLowerCase()][toCurrency.value.toLowerCase()];
    console.log(rate);
    let finalAmount= rate * amtVal;
    console.log(finalAmount);
    msg.innerText= `${amtVal} ${fromCurrency.value}= ${finalAmount} ${toCurrency.value}`;
}
window.addEventListener("load", () => {
    updateExchangeRate();
});