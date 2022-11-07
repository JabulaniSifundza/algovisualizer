myCanvas.width = 400;
myCanvas.height = 300;
const margin = 30;

const n = 20;
const arr = [];
let moves = [];

const columns = [];
const spacing = (myCanvas.width - margin *2)/n;
const ctx = myCanvas.getContext("2d");

const maxColumnHeight = 200;

init();

function init(){
	for(let i = 0; i < n; i++){
		array[i] = Math.random();
	}
	moves = [];

	for(let i = 0; i < arr.length; i++){
		//placing columns with x and y coordinates
		const x = i * spacing + spacing/2 + margin;
		const y = myCanvas.height - margin - i * 3;
		const width = spacing - 4;
		const height = maxColumnHeight*arr[i];
		columns[i] = new Column(x, y, width, height);
		
	}
}

function play(){
	moves = bubbleSort(arr);
}

//console.log(arr)
//Drawing coumns

animate();

//Bubble sort algorithm
function bubbleSort(arr){
	const moves = [];
	do{
		var swapped = false;
		for(let i = 1; i < arr.length; i++){
			if(arr[i -1]>arr[i]){
				swapped = true;
				[arr[i - 1], arr[i]] = [arr[i], arr[i -1]];
				moves.push(
					{
						indices: [i - 1, i], swap: true
					}
				);
			}
			else{
				moves.push({
					indices: [i - 1, i], swap: false
				})
			}
		}
		
	}
	while(swapped);
	return moves;
}

function animate(){
	ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
	let changed = false;
	for(let i = 0; columns.length; i++){
		changed = columns[i].draw(ctx) || changed;
	}

	if(!changed && moves.length > 0){
		const move = moves.shift();
		const [i, j] = move.indices;
		if(move.swap){
			columns[i].moveTo(columns[j]);
			columns[j].moveTo(columns[i], -1);

			[columns[i], columns[j]] = [columns[j], columns[i]];
		}
	}else{
		columns[i].jump();
		columns[j].jump();

	}

	requestAnimationFrame(animate);
}