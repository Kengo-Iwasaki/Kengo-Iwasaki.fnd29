'use strict'

function fieldSet() {
  const ballCount = Math.ceil((Math.random() + 0.5) * 24);
  let i = 1;
  const field = {};
  while (i <= ballCount) {
    field[i + "番目"] = Math.ceil(Math.random() * 3);
    i += 1;
  }
  return field;

}

function fieldGraph(field) {
  const key = Object.keys(field);
  const value = Object.values(field);
  for (let i = 0; i < key.length; i++) {
    let id = document.getElementById("graph");
    let li = document.createElement("li");
    li.setAttribute("id", "heishi");
    let img = document.createElement("img");
    img.src = `兵士${value[i]}.png`;
    img.setAttribute("id", "fuwafuwa");
    li.append(key[i]);
    li.append(img);
    li.append(value[i]);
    id.append(li);
  }
}

function inputPlayer() {
  let play = [document.getElementById("input1").value, document.getElementById("input2").value, document.getElementById("input3").value];
  play = play.map(function (number) {
    return Number(number);
  });
  if (play[0] === play[1] || play[0] === play[2] || play[1] === play[2]) {
    return alert("重複した数字は入力できません");
  } else if (Math.max(...play) > 3 || Math.min(...play) < 1) {
    return alert("1~3を入力");
  } else if (isNaN(play[0]) || isNaN(play[1]) || isNaN(play[2])) {
    return alert("数字を入力");
  } else if (!Number.isInteger(play[0]) || !Number.isInteger(play[1]) || !Number.isInteger(play[2])) {
    return alert("整数を入力");
  }
  return play;
}

function inputEnemy() {
  const playEnemy = [];
  for (const i of [0, 1, 2]) {
    let enemy = Math.ceil(Math.random() * 3);
    while (playEnemy.includes(enemy)) {
      enemy = Math.ceil(Math.random() * 3);
    }
    playEnemy[i] = enemy;
  }
  return playEnemy;
}

function getBall(play, playEnemy, progress) {
  for (const i of [0, 1, 2]) {
    if (JSON.stringify(field) === "{}") {
      break;
    }
    let j = 0;
    while (j < play[i]) {
      if (JSON.stringify(field) === "{}") {
        break;
      }
      progress[0] += 1;
      progress[1] += field[progress[0] + "番目"];
      delete field[progress[0] + "番目"];
      j += 1;
    }
    j = 0;
    while (j < playEnemy[i]) {
      if (JSON.stringify(field) === "{}") {
        break;
      }
      progress[0] += 1;
      progress[2] += field[progress[0] + "番目"];
      delete field[progress[0] + "番目"];
      j += 1;
    }
  }
  document.getElementById("PP").innerText = `自国の戦力: ${progress[1]}`;
  document.getElementById("EP").innerText = `相手国の戦力: ${progress[2]}`;
  return progress;
}

function judge(player, enemy) {
  if (player > enemy) {
    document.getElementById("judge").innerHTML = `player${player}:enemy${enemy} ` + `<br>あなたの勝ち！</br>`;
  } else if (player < enemy) {
    document.getElementById("judge").innerHTML = `player${player}:enemy${enemy} ` + `<br>相手の勝ち！</br>`;
  } else {
    document.getElementById("judge").innerHTML = `player${player}:enemy${enemy} ` + `<br>引き分け</br>`;
  }
}

function removeSoldier(id) {
  for (let i = 0; i < 12; i++) {
    if (document.getElementById("heishi") != null) {
      document.getElementById(id).remove();
    }
  }
}

let count = 0;
let PP = 0;
let EP = 0;
let progress = [count, PP, EP];

function suutori(field) {
  const play = inputPlayer();
  const playEnemy = inputEnemy();
  progress = getBall(play, playEnemy, progress);
  removeSoldier("heishi");
  if (JSON.stringify(field) === "{}") {
    judge(progress[1], progress[2]);
  }
}
