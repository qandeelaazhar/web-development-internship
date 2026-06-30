let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");

let popupContainer = document.querySelector("#popup-container");
let popupMessage = document.querySelector("#popup-message");
let newGameBtn = document.querySelector("#new-game");

let winningBoxes = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

let turnO = true;
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            box.style.color = "#FB6F92"; 
            turnO = false;
        } else {
            box.innerText = "X";
            box.style.color = "#FFE5EC"; 
            turnO = true;
        }
        box.disabled = true;
        checkWinner();
    });
});

const checkWinner = () => {
    for (let pattern of winningBoxes) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showPopup(`Winner is ${pos1Val}!`);
                return;
            }
        }
    }

    let isDraw = Array.from(boxes).every(box => box.innerText !== "");
    if (isDraw) {
        showPopup("It's a Draw!");
    }
};

const showPopup = (msg) => {
    popupMessage.innerText = msg;
    popupContainer.classList.remove("hide");
    disableAllBoxes();
};

const disableAllBoxes = () => {
    boxes.forEach(box => box.disabled = true);
};

const resetGame = () => {
    turnO = true;
    boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
    });
    popupContainer.classList.add("hide"); 
};
resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);