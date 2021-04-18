/**
 * video language
 */

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('.skip');
const ranges = player.querySelectorAll('player__slider');

//單純只操作功能
function togglePlay(){
	const method = video.paused ? "play" : "pause";//play,pause 用來觸發事件，會觸發function updateButton()	
	video[method]();//這裡的做法就像 video.play() 跟 video.pause() 一樣
	
}

//切換播放按鈕圖案
function updateButton(){
	console.log(this.paused);
	const icon = this.paused ? '►' : '❚ ❚';	
	toggle.textContent =icon; //textContent會輸入內容到HTML顯示出來
}

function skip(){
	video.currentTime += parseFloat(this.dataset.skip);
	//currentTime當前的時間
	//dataset.skip 是 HTML 裡 button的 data-skip值
}

function handlerRangeUpdate(){
	video[this.name] = this.value;
}

function handlerProgress(){
	const percent = (video.currentTime / video.duration) *100;//影片播放到哪的長度
	progressBar.style.flexBasis =`${percent}%`;//給到 style.flexBasis 來給預設寬度 %
}

function scrub(e){
	const scrubTime =(e.offsetX / progress.offsetWidth) * video.duration;
	video.currentTime = scrubTime;
}

video.addEventListener("click",togglePlay);//按畫面會觸發暫停跟撥放
toggle.addEventListener("click",togglePlay);//按按鈕出發暫停播放

video.addEventListener("play",updateButton);//在function togglePlay() 的 method 裡判斷，觸發此事件
video.addEventListener("pause",updateButton);

skipButtons.forEach(e =>e.addEventListener('click',skip));//快轉跟倒帶

video.addEventListener('timeupdate',handlerProgress);//時間條的長度更新

ranges.forEach(e=>e.addEventListener('change',handlerRangeUpdate));
ranges.forEach(e=>e.addEventListener('mousemove',handlerRangeUpdate));

let mousedown =false;

progress.addEventListener('click',scrub);
progress.addEventListener('mousemove',e => mousedown && scrub(e));
//mousedown && scrub(e) 就是 if(mousedown) scrub(e)
//mousedown && scrub(e) 前者要 true 才會執行後者
//mousedown || scrub(e)	前者要 false 才會執行後者

progress.addEventListener('mousedown',() => mousedown =true);
progress.addEventListener('mouseup',() => mousedown =false);
