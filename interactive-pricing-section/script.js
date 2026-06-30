const monthlyBtn=document.querySelector("#monthlyBtn");
const annualBtn=document.querySelector("#annualBtn");

const amounts=document.querySelectorAll(".amount");
const periods=document.querySelectorAll(".period");

const cards=document.querySelectorAll(".card");
const selectBtn=document.querySelectorAll(".select-btn");

const message=document.querySelector(".message");

const monthlyPrices=["$10","$20","$30"]; 
const annualPrices=["$100","$200","$300"];

monthlyBtn.addEventListener("click",function(){
    monthlyBtn.classList.add("active");
    annualBtn.classList.remove("active");

    amounts.forEach(function(amount,index){
        amount.innerText=monthlyPrices[index];
    });
    periods.forEach(function(period){
        period.innerText="/month";
    });
});

annualBtn.addEventListener("click",function(){
    annualBtn.classList.add("active");
    monthlyBtn.classList.remove("active");

    amounts.forEach(function(amount,index){
        amount.innerText=annualPrices[index];
    });

    periods.forEach(function(period){
        period.innerText="/year";
    });

});

selectBtn.forEach(function(button,index){
    button.addEventListener("click",function(){
        cards.forEach(function(card){
            card.classList.remove("selected");

        });
        selectBtn.forEach(function(btn){
            btn.innerText="Select Plan";
        });

        cards[index].classList.add("selected");
        button.innerText="Selected";

        let cardName=cards[index].querySelector("h3").innerText;
        message.innerText="You selected the "+cardName+" Plan.";

    });

})