let btn = document.querySelector(".apply-btn");

btn.addEventListener("click", () => {
    btn.innerText="Applied";
    btn.disabled=true;
    btn.classList.add("applied");
});


let mode_btn = document.querySelector("#theme-btn");
let body = document.querySelector("body");
let currentMode = "light";
mode_btn.addEventListener("click", () => {
    if(currentMode === "light")
    {
        currentMode = "dark";
        body.classList.add("dark");
        body.classList.remove("light");
        mode_btn.innerText = "Dark Mode";
    }
    else
    {
        currentMode = "light";
        body.classList.add("light");
        body.classList.remove("dark");
        mode_btn.innerText = "Light Mode";
    }
});