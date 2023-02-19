let currentMajor = 0; // 0 : 인문, 1 : 자연
const score = [
  ["100/120/80", "100/120/80", "서울대"],
  ["200/200/100/100", "200/300/100/300", "연세대"],
  ["200/200/160", "200/240/200", "고려대"],
  ["110/130/60", "110/130/60", "서강대"],
  ["350/350/300", "300/350/350", "성균관대"],
  ["300/300/100/300", "200/350/100/350", "한양대"],
  ["200/200/100", "125/200/175", "중앙대"],
  ["350/250/150/250", "200/350/150/300", "경희대"],
  ["300/250/200/250", "250/300/200/250", "이화여대"],
  ["300/300/200/200", "200/350/150/300", "한국외대"],
  ["350/400/150/100", "200/400/100/300", "시립대"],
  ["300/250/150/250", "200/300/150/300", "건국대"],
  ["300/250/200/200", "250/300/200/200", "동국대"],
  ["300/300/150/250", "200/350/150/300", "홍익대"],
  ["300/300/200/200", "200/300/200/300", "국민대"],
  ["350/250/200/200", "200/350/200/250", "숭실대"],
  ["300/300/200/200", "200/350/200/250", "세종대"],
  ["350/250/200/200", "200/350/200/250", "단국대"],
];

function textChange(clicked_id) {
  if (
    document.getElementById(clicked_id).innerText ===
    score[clicked_id][currentMajor]
  ) {
    // 대학 이름 대신 반영 비율이 표시되어있다면
    document.getElementById(clicked_id).innerText = score[clicked_id][2];
    document.getElementById(clicked_id).style.backgroundColor = "white";
  } else {
    document.getElementById(clicked_id).innerText =
      score[clicked_id][currentMajor];
    document.getElementById(clicked_id).style.backgroundColor = "gray";
  }
}

function majorChange(major_id) {
  if (major_id === "100") {
    for (let i = 0; i < 18; i++) {
      if (document.getElementById(i).innerText === score[i][1])
        document.getElementById(i).innerText = score[i][0];
    }
    currentMajor = 0;
    document.getElementById("100").style.backgroundColor = "gray";
    document.getElementById("101").style.backgroundColor = "white";
  } else if (major_id === "101") {
    for (let j = 0; j < 18; j++) {
      if (document.getElementById(j).innerText === score[j][0])
        document.getElementById(j).innerText = score[j][1];
    }
    currentMajor = 1;
    document.getElementById("100").style.backgroundColor = "white";
    document.getElementById("101").style.backgroundColor = "gray";
  }
}

if (currentMajor === 0) {
  document.getElementById("100").style.backgroundColor = "gray";
  document.getElementById("101").style.backgroundColor = "white";
} else if (currentMajor === 1) {
  document.getElementById("100").style.backgroundColor = "white";
  document.getElementById("101").style.backgroundColor = "gray";
}
