// Game value
let min = 1,
	max = 10,
	winningNum = getWinningNum(min, max),
	guessLeft = 3;

// UI element
const game = document.getElementById("game"),
	minNum = document.getElementById("min-num"),
	maxNum = document.getElementById("max-num"),
	guessBtn = document.getElementById("guess-btn"),
	guessInput = document.getElementById("guess-input"),
	message = document.getElementById("message");

// assigng min and max to ui
minNum.textContent = min;

maxNum.textContent = max;

game.addEventListener("mousedown", function (e) {
	if (e.target.className === "play-again") {
		window.location.reload();
	}
});

guessBtn.addEventListener("click", submitHandler);

// FUNCTINS DECLARATION HERE...

console.log = function () {};

function getWinningNum(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function submitHandler(e) {
	const num = parseInt(guessInput.value);
	console.log(num);
	// validate input
	if (num < min || num > max) {
		guessInput.style.borderColor = "red";
		guessInput.style.backgroundColor = "lightpink";
		return setMessage(`Not in range`, "red", "#fff5f2");
	} else if (isNaN(num)) {
		console.log("HERE IT SHOULD ENTER");
		guessInput.style.borderColor = "red";
		guessInput.style.backgroundColor = "lightpink";

		return setMessage("Not a valid input", "red", "#fff5f2");
	}

	if (num === winningNum) {
		// Game Over and won

		guessInput.disabled = true;
		guessInput.style.borderColor = "green";
		guessInput.style.backgroundColor = "lightgreen";
		guessBtn.value = "Play Again";
		guessBtn.className = "play-again";
		console.log(guessLeft);
		setMessage("You guess it right!🖖", "green", "#f9f9f9");
		setTimeout(function () {
			guessInput.disabled = true;
		}, 2001);
	} else {
		guessLeft--;

		if (guessLeft === 0) {
			// Game Over and lost

			guessInput.style.borderColor = "red";
			guessInput.style.backgroundColor = "#fff5f2";
			guessBtn.value = "Play Again";
			guessBtn.className += "play-again";
			setMessage(
				`Game over! 👎, You Lost, The correct number was ${winningNum}`,
				"red",
				"#fff5f2"
			);
			setTimeout(function () {
				guessInput.disabled = true;
			}, 2001);
		} else {
			// Game continues - answer wrong

			guessInput.style.borderColor = "red";
			guessInput.style.backgroundColor = "#fff5f2";
			setMessage(
				`Wrong Answer!, You have ${guessLeft} guess left`,
				"red",
				"#fff5f2"
			);
		}
	}
	e.preventDefault();
}

function setMessage(mess, color, bgColor) {
	message.style.letterSpacing = "0.2em";
	message.style.display = "block";
	message.style.padding = "0.8em";
	message.textContent = mess;
	message.style.color = color;
	message.style.background = bgColor;
	guessInput.disabled = true;

	setTimeout(function () {
		guessInput.value = "";
		guessInput.style.borderColor = "black";
		guessInput.style.background = "white";
		message.style.display = "none";
		guessInput.disabled = false;
	}, 2000);
}
