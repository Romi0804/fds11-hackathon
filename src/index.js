
let board = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

// 바둑돌 클릭할때마다 순서바꿔서 놓기

  let click = true;
  let flag = true;

  function Game () {
    document.querySelectorAll(".col").forEach(el => {
      el.addEventListener("click", e => {
        if (!flag) {
          return;
        }
        //flag이 false 되면 모든 함수를 멈춰라. (게임종료후 아무것도 선택되지 못하게 하기 위함)
        //Browser Inspection의 console을 보면 클릭할때마다 column과 row의 좌표 상태가 뜨는데 그 배열의 인덱스를 구분하여 좌표를 저장.
        let col = Array.from(el.classList)[0].split("-")[1];
        let row = Array.from(el.closest(".row").classList)[0].split("-")[1];
        //클릭해서 돌을 놓는다.
        console.log(Array.from(el.classList));
        console.log(Array.from(el.closest(".row").classList));
        // 중복금지 : 놓았던 곳에 돌을 놓는것을 막는다.
        if (el.classList.contains("black") || el.classList.contains("white")) {
          alert("중복금지");
          return; //여기서 return하여 함수를 종료해줘야지 뒤에 코드 실행안되서, 돌 중복을 막을 수 있다.
        }
        // 클릭 한번 할때마다 Black, White를 번갈아서 설정이된다.
        el.classList.add(click ? "black" : "white");
        click = !click;

        board[row - 1][col - 1] = click ? 1 : 2;
        //돌이 놓여지는 좌표
        if (omok(board) === 2) {
          setTimeout(() => {
            alert("흑돌이 승리하였습니다 !");
          }, 200);
          //자바스크립트에 내장되어 있는 시간조절 메소드인 setTimeout 이용. 게임끝나고 잠시후 알림창이 뜰수 있게 시간조절
          flag = false;
          //게임종료후 더이상 돌이 표시 되지 못하게 하는것
        } else if (omok(board) === 1) {
          setTimeout(() => {
            alert("흰돌이 승리하였습니다!");
          }, 200);
          flag = false;
          //게임종료후 더이상 돌이 표시 되지 못하게 하는 것
        }
        //오목인지 아닌지 체크
        //JS에서 함수가 들어가면 일단 default로 undefined를 반환한다.
        //그래서 조건문을 쓸때, 명확한 값을 넣어서 설정하면 조건에 맞는 반응이 일어난다.
      });
    });
  }


//승패결정 Logic
function omok(arr) {
  let currentPlayer;
  let count;
  // 가로줄 확인
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      // 새로운 플레이어를 발견했을 때
      if (currentPlayer !== arr[i][j]) {
        currentPlayer = arr[i][j];
        count = 1;
      } else {
        count++;
      }
      if ((currentPlayer === 1 || currentPlayer === 2) && count === 5) {
        console.log(`가로줄 - i: ${i}, j: ${j}, cp: ${currentPlayer}`)
        return currentPlayer;
      }
    }
  }

  let currentPlayera;
  let counta;
  // 세로줄확인
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (currentPlayera !== arr[j][i]) {
        currentPlayera = arr[j][i];
        counta = 1;
      } else {
        counta++;
      }
      if ((currentPlayera === 1 || currentPlayera === 2) && counta === 5) {
        console.log(`세로줄 - i: ${i}, j: ${j}, cp: ${currentPlayera}`)
        return currentPlayera;
      }
    }
  }

  let currentPlayerb;
  let countb;
  //오른쪽대각선확인
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (i + j < arr.length && currentPlayerb != arr[i + j][j]) {
        currentPlayerb = arr[i + j][j];
        countb = 1;
      } else {
        countb++;
      }
      if ((currentPlayerb === 1 || currentPlayerb === 2) && countb === 5) {
        console.log(`오대 - i: ${i}, j: ${j}, cp: ${currentPlayerb}`)
        return currentPlayerb;
      }
    }
  }

  let currentPlayerc;
  let countc;
  //오른쪽 2번째
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      console.log(`i: ${i}, j: ${j}`)
      if (i + j < arr.length && currentPlayerc != arr[j][i + j]) {
        currentPlayerc = arr[j][j + i];
        countc = 1;
      } else {
        countc++;
      }
      if ((currentPlayerc === 1 || currentPlayerc === 2) && countc === 5) {
        console.log(`오2 - i: ${i}, j: ${j}, cp: ${currentPlayerc}`)
        return currentPlayerc;
      }
    }
  }

  let currentPlayerd;
  let countd;
  //왼쪽대각선확인
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (
        i + j < arr.length &&
        currentPlayerd != arr[i + j][arr.length - 1 - j]
      ) {
        currentPlayerd = arr[i + j][arr.length - 1 - j];
        countd = 1;
      } else {
        countd++;
      }
      if ((currentPlayerd === 1 || currentPlayerd === 2) && countd === 5) {
        console.log(`왼대 - i: ${i}, j: ${j}, cp: ${currentPlayerd}`)
        return currentPlayerd;
      }
    }
  }

  let currentPlayere;
  let counte;
  //왼쪽 2번째
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (
        i + j < arr.length &&
        currentPlayere != arr[arr.length - 1 - j][i + j]
      ) {
        currentPlayere = arr[arr.length - 1 - j][i + j];
        counte = 1;
      } else {
        counte++;
      }
      if ((currentPlayere === 1 || currentPlayere === 2) && counte === 5) {
        console.log(`왼2 - i: ${i}, j: ${j}, cp: ${currentPlayere}`)
        return currentPlayere;
      }
    }
  }
}
// REPLAY 버튼을 눌렀을 때 리셋하기
document.querySelector(".resetBtn").addEventListener("click", e => {
  document.querySelectorAll(".col").forEach(el => {
    board = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    // 오목알들을 다 없애준다.
    // 추가했던 class들을 다 떼준다.
    el.classList.remove("black");
    el.classList.remove("white");
    // REPLAY 버튼이 안보이게 해준다.
    document.querySelector(".resetBtn").classList.remove("show");
    // Start 버튼을 보여준다.
    document.querySelector(".startBtn").classList.add("show");
    flag = true;
  });
});

document.querySelector(".startBtn").addEventListener("click", e => {
  Game();
});
