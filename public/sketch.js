var score = 0;

function empty(element) {
	while(element.firstElementChild) {
		element.firstElementChild.remove();
	}
}

function scoreChanger(card) {
	var value = 0;
	var mult = 1;
	if (card[2] != '0') {
		cardNum = card[1];
	} else {
		cardNum = '10';
	}

	if (cardNum == 'j') {
		return "<b>x2</b>";
	} else if (cardNum == 'a') {
		return "<b>x2</b>";
	} else if (cardNum == 'q' || cardNum == 'k') {
		return "<b style='color:red'>BROKE!</b>";
	} else {
		return "+" + cardNum;
	}
}

function calculateScore(score, card) {
	var value = 0;
	var mult = 1;

	if (card[2] != '0') {
		cardNum = card[1];
	} else {
		cardNum = '10';
	}

	if (cardNum == 'a') {
		mult = 2;
	} else if (cardNum == 'j') {
		mult = 2;
	} else if (cardNum == 'q') {
		mult = 0;
	} else if (cardNum == 'k') {
		mult = 0;
	} else {
		value = parseInt(cardNum, 10);
	}
	
	score = score * mult + value;
	return score;
}

function getCard() {
	var rand = Math.floor( Math.random() * 3)+1;
	
	var suit = 'a';

	switch (rand) {
		case 1:
			suit = 's';
			break;
		case 2:
			suit = 'k';
			break;
		case 3:
			suit = 'p';
			break;
		case 4:
			suit = 'a';
			break;
	}

	rand = Math.floor( Math.random() * 12)+1;
	var cardNum = 0;

	switch (rand) {
		case 1:
			cardNum = 'a';
			break;
		case 11:
			cardNum = 'j';
			break;
		case 12:
			cardNum = 'q';
			break;
		case 13:
			cardNum = 'k';
			break;
		default:
			cardNum = rand.toString();
	}
	console.log(suit+cardNum);
	return suit + cardNum;
}

function buildImageUrl(card) {
	url = `https://www.improvemagic.com/wp-content/uploads/2020/11/`;
	url += card + ".png";
	console.log(url);
	return url;
}

function displayCard() {
	const elem = document.getElementById('card');
	empty(elem);
	var width = 133;
	var height = 187;

	var img = document.createElement('img');
	var scoreText = document.getElementById('score');
	var scoreChange = document.getElementById('score-change');
	var card = getCard();
	score = calculateScore(score, card);
	scoreChange.innerHTML = scoreChanger(card);
	scoreText.innerHTML = "Score: " + score;
	img.src = buildImageUrl(card);
	img.width = width;
	img.height = height;
	document.getElementById('card').appendChild(img);
}

fetch("http://lyssie.org/scores")
	.then((resp) => {
		return resp.json();
	}).then((data) => {
		var maindiv = document.getElementById('game');
		for (var i = 0; i < data.length; i++) {
			var scoreData = document.createElement('p');
			scoreData.innerText = data[i].username + ": " + data[i].score + "<br>";
			maindiv.appendChild(scoreData);
		}
		
		
	});

