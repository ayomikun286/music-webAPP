const audio = document.getElementById('audio');
const playBTN = document.querySelector('#play');
const icon = document.querySelector('#play i');


playBTN.addEventListener('click', ()=>{
    if(audio.paused){
        audio.play();
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
    }else{
        audio.pause();
        
        icon.classList.remove('fa-pause')
        icon.classList.add('fa-play');
        
    }
});