let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset");
let newbtn = document.querySelector("#new")
let msgcont = document.querySelector(".msg-container");
let msg = document.querySelector("#msg")
let turnO = true;//playerO TURN
const winningP = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const resetgame = () => {
    turnO = true; // Reset turn to player O
    enableboxes(); // Enable all boxes
    msgcont.classList.add("hide"); // Hide the message container
    // Reset the innerText for all boxes to an empty string
    boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false; // Enable the box
    });
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("clicked");
        if (turnO) {
            box.innerText = "O";
            turnO = false;

        }
        else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;

        ishewinner();
    })


}
);
const disableboxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}
const showDraw = () => {
    msg.innerText = "It's a draw!";
    msgcont.classList.remove("hide");
    disableboxes();
};
const enableboxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}
const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgcont.classList.remove("hide");
    disableboxes();
};

const ishewinner = () => {
    let winnerFound = false;
    for (let pattern of winningP) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;
        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                console.log("WINNER", pos1);
                showWinner(pos1);
                winnerFound = true;
                break;
            }
        }
    }
    // If no winner was found, check for a draw
    if (!winnerFound) {
        checkForDraw();
    }
};

const checkForDraw = () => {
    // Check if all boxes are filled
    const allBoxesFilled = Array.from(boxes).every(box => box.innerText.trim() !== "");
    // If all boxes are filled and there is no winner, it's a draw
    if (allBoxesFilled) {
        showDraw();
    }
};

newbtn.addEventListener("click", resetgame)
resetbtn.addEventListener("click", resetgame)

