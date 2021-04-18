let controls = document.querySelectorAll(".timer__controls > button");
let text = document.querySelector(".display__time-left");
let dateTime = document.querySelector(".display__end-time");
let only = true;
let dt;
function lessTime(t){
	let min;
	let sec;

	min = Math.floor(t/60);
	sec =t % 60;
	ms(min,sec);
	only = only && endDateTime(t);
	t-=1;
	
	dt=setTimeout(()=>{lessTime(t)},1000);
	
	if(t < 0){
		clearTimeout(dt);
	};
	
}
function ms(min,sec){
	text.textContent=min+":"+((sec < 10 ? "0" : "")+sec);	
}

function endDateTime(sec){
	only =false;
	let date = new Date();
	let h=date.getHours() + Math.floor(sec/3600);
	let m=date.getMinutes() + Math.floor((sec % 3600)/60);
	let s=date.getSeconds() + sec % 60;
	
	h = m >=60 ? h+1 : h;
	m = m >=60 ? m-60 : m;
	s = s >=60 ? m+1 : s;
	console.log(h+":"+m+":"+s,sec);
	dateTime.textContent="Be Back At "+ h +" : "+ ((m < 10 ? "0" : "")+ m);
}
function buttonHandler(e){
	let sec = this.dataset.time * 1 ;
	only = true;
	clearTimeout(dt);
	lessTime(sec);
}
function inputHandler(e){
	e.preventDefault();
	let inp = (this.minutes.value * 1)*60;//換成秒數
	if(inp){
	only = true;
	clearTimeout(dt);
	lessTime(inp);
	this.reset();
	}
}
controls.forEach(control=>control.addEventListener("click",buttonHandler));
document.querySelector("#custom").addEventListener("submit",inputHandler);