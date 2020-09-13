var cards = document.querySelectorAll(".card");
console.log(cards);
cards.forEach((card) => card.addEventListener("click", flip));
var count = document.querySelector(".count");
var c = 0;
// variables
var isFillped = false;
var lockboard = false;
var firstcard, secondcard;
let flip_length = 0;

// funtions

function flip() {
  if (lockboard) return;
  if (this === firstcard) return;
  c++;
  count.innerHTML = c;
  this.classList.add("is-flipped");
  if (!isFillped) {
    firstcard = this;
    isFillped = true;
    return;
  } else {
    secondcard = this;
    checkit();
    // console.log(firstcard);
    // console.log(secondcard);
  }
}

checkit = () => {
  let isMatch = firstcard.dataset.image === secondcard.dataset.image;
  isMatch ? success() : fail();
};

success = () => {
  // console.log("success");
  firstcard.removeEventListener("click", flip);
  secondcard.removeEventListener("click", flip);
  flip_length++;
  checkWin();
  reset();
};

fail = () => {
  setTimeout(() => {
    firstcard.classList.remove("is-flipped");
    secondcard.classList.remove("is-flipped");
    reset();
  }, 800);
};

reset = () => {
  [firstcard, secondcard] = [null, null];
  [isFillped, lockboard] = [false, false];
};

//checking if all cards are flipped
checkWin = () => {
  if (6 === flip_length) {
    // console.log("all flips are checked");
    message = "<h2>You have Won!</h2>";
    $("#container").prepend("div").html(message);
  }
};

(shuffle = () => {
  cards.forEach((card) => {
    var index = Math.floor(Math.random() * 12);
    card.style.order = index;
  });
})();
// window.onload();
