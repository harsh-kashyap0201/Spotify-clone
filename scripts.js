
let songArray=[
    {"songName":"Love Me Like You Do","artist":"ellie goudling","songSrc":"songs/Love Me Like You Do.mp3"},
    {"songName":"aaj bhi","artist":"vishal mishra","songSrc":"songs/aaj bhi.mp3"},
    {"songName":"bekhayali","artist":"arijit singh","songSrc":"songs/bekhayali.mp3"},
    {"songName":"excuses","artist":"a.p dhillon ","songSrc":"songs/excuses.mp3"},
    {"songName":"hamari adhuri kahani","artist":"arijit singh","songSrc":"songs/hamari adhuri kahani.mp3"},
    {"songName":"hawa banke","artist":"darshan raval","songSrc":"songs/hawa banke.mp3"},
    {"songName":"iss qadar","artist":"darshan raval","songSrc":"songs/iss qadar.mp3"},
    {"songName":"Judaiyaan","artist":"darshan raval","songSrc":"songs/Judaiyaan.mp3"},
    {"songName":"main kisi aur ka","artist":"darshan raval","songSrc":"songs/main kisi aur ka.mp3"},
    {"songName":"saari ki saari","artist":"darshan raval","songSrc":"songs/saari ki saari.mp3"},
    {"songName":"Tera Zikr","artist":"darshan raval","songSrc":"songs/Tera Zikr.mp3"},
    {"songName":"tujhe kitna chahne lage hum","artist":"darshan raval","songSrc":"songs/tujhe kitna chahne lage.mp3"},
]
let songIndex=0;
let current_song=new Audio();
let play=document.getElementById('play');
let next=document.getElementById('next');
let prev=document.getElementById('prev');
let gif=document.getElementById('gif');
let progressBar=document.getElementById('progressBar');
let songItem=Array.from(document.getElementsByClassName('songItem'));
let cursongItem=songItem[0];
let curSongName=document.getElementById('bottomName');
let curSongArtist=document.getElementById('bottomArtist');


songItem.forEach((item,i)=>{
    item.getElementsByTagName('img')[0].src='images_cover/'+songArray[i].songName+'.jpg';  

    if(songArray[i].songName.length>20){
        item.getElementsByClassName('songname')[0].innerText=songArray[i].songName.toUpperCase().slice(0,20)+'...';
    }
    else{
        item.getElementsByClassName('songname')[0].innerText=songArray[i].songName.toUpperCase()+"    ".repeat(6);
    }
    let temp=new Audio();
    temp.src=songArray[i].songSrc;

    temp.onloadedmetadata = (event) => {
    let durationMinutes = Math.floor(temp.duration / 60);
    let durationSeconds = Math.floor(temp.duration - durationMinutes * 60);
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
    item.getElementsByClassName('timeStamp')[0].innerHTML=durationMinutes + ":" + durationSeconds;
    };

    item.getElementsByClassName('artist')[0].innerText=songArray[i].artist.toUpperCase();
    item.addEventListener('click',()=>{
        cursongItem.style=null;
        songIndex=i;
        cursongItem=item;
        cursongItem.style='background-color: #1DB954;color: white';
    
        if(songIndex==0){
            prev.style.opacity=0.5;
        }
        if(songIndex==songArray.length-1){
            next.style.opacity=0.5;
        }
        else{
            next.style.opacity=1;
            prev.style.opacity=1;
        }
        current_song.src=songArray[songIndex].songSrc;
        current_song.play();
        play.classList.remove('fa-play-circle');
        play.classList.add('fa-pause-circle');
        gif.style.opacity=1;
        curSongName.opacity=1;
        curSongArtist.opacity=1;
        curSongName.innerText=songArray[songIndex].songName.toUpperCase();
        curSongArtist.innerText=songArray[songIndex].artist.toUpperCase();
    });
});

current_song.src=songArray[songIndex].songSrc;
play.addEventListener('click',()=>{
    if(current_song.paused || current_song.currentTime==0){
        current_song.play();
        play.classList.remove('fa-play-circle');
        play.classList.add('fa-pause-circle');
        gif.style.opacity=1;
        curSongName.innerText=songArray[songIndex].songName;
        curSongArtist.innerText=songArray[songIndex].artist;
    }else{
        current_song.pause();
        play.classList.remove('fa-pause-circle');
        play.classList.add('fa-play-circle');
        gif.style.opacity=0;
        curSongName.innerText='';
        curSongArtist.innerText='';
    }
});

next.addEventListener('click',()=>{
    prev.style.opacity=1;
    songItem[songIndex].style=null;
    if(songIndex===songArray.length-1){
        next.style.opacity=0.5;
    }
    else{
        next.style.opacity=1;
        songIndex++;
        songItem[songIndex].style='background-color: rgba(29, 185, 84,0.5)';
        current_song.src=songArray[songIndex].songSrc;
        current_song.play();
        play.classList.replace('fa-play','fa-pause');
        gif.style.opacity=1;
        curSongName.innerText=songArray[songIndex].songName;
        curSongArtist.innerText=songArray[songIndex].artist;
    }
});

prev.addEventListener('click',()=>{
    prev.style.opacity=1;
    songItem[songIndex].style=null;
    if(songIndex===0){
        prev.style.opacity=0.5;
    }
    else{
        prev.style.opacity=1;
        songIndex--;
        songItem[songIndex].style='background-color: rgba(29, 185, 84,0.5)';
        current_song.src=songArray[songIndex].songSrc;
        current_song.play();
        play.classList.replace('fa-play','fa-pause');
        gif.style.opacity=1;
        curSongName.innerText=songArray[songIndex].songName;
        curSongArtist.innerText=songArray[songIndex].artist;
    }
});

current_song.addEventListener('timeupdate',()=>{
    progress=parseFloat((current_song.currentTime/current_song.duration)*100);
    progressBar.value=progress;
});

current_song.addEventListener('ended',()=>{
    play.classList.remove('fa-pause-circle');
    play.classList.add('fa-play-circle');
    gif.style.opacity=0;
    songIndex++;
    if(songIndex>songArray.length-1){
        songIndex=0;
    }
    current_song.src=songArray[songIndex].songSrc;
    current_song.play();
});

progressBar.addEventListener('change',()=>{
    let time=current_song.duration*(progressBar.value/100);
    current_song.currentTime=time;
});

