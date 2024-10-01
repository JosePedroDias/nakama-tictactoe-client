export function setup(play) {
  const boardEl = document.body.querySelector(".board");
  boardEl.addEventListener("click", (ev) => {
    const el = ev.target;
    const num = parseInt(el.dataset.num, 10);
    play(num);
  });
}

export function updateFeedback(text) {
  const el = document.body.querySelector(".feedback");
  el.innerHTML = text;
}

export function updateNextPlayer(text) {
  const el = document.body.querySelector(".next-player");
  el.innerHTML = text;
}

export function updateBoard(board) {
  const cellEls = Array.from(document.body.querySelectorAll(".cell"));
  cellEls.forEach((el, i) => {
    el.classList.remove("x");
    el.classList.remove("o");
    const v = board[i];
    if (v === 1) el.classList.add("x");
    else if (v === 2) el.classList.add("o");
  });
}
