import { saveMusicToCloud } from "./cloudStorage.js"
import { allMusic } from "./music.js";




saveMusicToCloud();



let currentIndex = 0;
const songsLIST = document.getElementById('songRoll');
const playerImage = document.getElementById('playerImage')

async function loadSong() {
    try {
        const songs = await allMusic();
        console.log(songs);

        songsLIST.innerHTML = "";

        songs.forEach(allSONGS => {


            const track = document.createElement('div');
            track.classList.add('track');
            track.innerHTML = `
            
                    <img src="${allSONGS.image}" alt="" width="100%">
                    <p>${allSONGS.title}</p>
                    <button class="playTrackBtn" data-url="${allSONGS.url}" data-img="${allSONGS.image}" ><i class="fa-solid fa-play"></i></button>
            
            `
            songsLIST.appendChild(track);
            console.log(allSONGS.title);

        });


        playTracks();


    } catch (err) {
        console.log("Error:", err.message)
    };




}

loadSong();


function playTracks() {
    const audio = document.getElementById('audio');
    const playTrackBtn = document.querySelectorAll('.playTrackBtn');
    const iconAll = document.querySelector('#play i')
    playTrackBtn.forEach((btn, index) => {

        btn.addEventListener('click', async () => {
            const icon = btn.querySelector('i')
            const url = btn.getAttribute("data-url");
            const trackImage = btn.getAttribute("data-img")
            currentIndex = index;
            audio.src = url;
            playerImage.src = trackImage;
            await audio.play();
            updateSongTab();

            playTrackBtn.forEach(b => {
                b.querySelector('i').classList.replace('fa-pause', 'fa-play');
            });

            icon.classList.replace('fa-play', 'fa-pause');
            iconAll.classList.replace('fa-play', 'fa-pause');
        });

    });
};







function playBTN() {
    const audio = document.getElementById('audio');
    const playtrack = document.getElementById('play');
    const icon = document.querySelector('#play i');
    playtrack.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            icon.classList.replace('fa-play', 'fa-pause');
        } else {
            audio.pause();
            icon.classList.replace('fa-pause', 'fa-play');
        }



    });
};
playBTN();


async function playAlltracks() {

    const playTrackBtn = document.querySelectorAll('.playTrackBtn');

    try {
        const allSongs = await allMusic();

        const audioForAll = document.getElementById('audio');
        currentIndex++;

        audioForAll.src = allSongs[currentIndex].url;


        if (currentIndex >= allSongs.length) {
            currentIndex = 0;
        };

        playTrackBtn.forEach(b => {
            b.querySelector('i').classList.replace('fa-pause', 'fa-play');
        });

        playTrackBtn[currentIndex].querySelector('i').classList.replace('fa-play', 'fa-pause');

        audioForAll.play();
        updateSongTab()


    } catch (err) {
        console.log("Error:", err.message)
    }





};


async function updateSongTab(){
    try{ 
        const Songs = await allMusic();
        const songtitle = document.getElementById('titlE');
        const Tabname = document.getElementById('Tabname');

        if(!Songs[currentIndex]){
            songtitle.textContent = "Now playing: -- "

            return;

        }
        songtitle.textContent = `${Songs[currentIndex].title}`
        Tabname.textContent =`${Songs[currentIndex].name}`

    }catch(err){
        console.log("Now Playing error", err.message)

    }
};


async function nextSongArray(){
   try{

     const SongS = await allMusic();
    const next = document.getElementById('next');
      const playTrackBtn = document.querySelectorAll('.playTrackBtn');

    next.addEventListener('click', async ()=>{
        currentIndex++;
        if(currentIndex >= SongS.length){
            currentIndex = 0 ;
        }


        audio.src = SongS[currentIndex].url;
        await audio.play();

        updateSongTab();


         playTrackBtn.forEach(b => {
            b.querySelector('i').classList.replace('fa-pause', 'fa-play');
        });
         playTrackBtn[currentIndex].querySelector('i').classList.replace('fa-play', 'fa-pause');


         const mainBtuIcon = document.querySelectorAll('#play i');

         mainBtuIcon.classList.replace('fa-play', 'fa-pause');


    })

   }catch(err){
       
     console.log('Error:', err.message);
   }
}

nextSongArray();


async function prefSongArray(){
   try{

     const SongS = await allMusic();
    const pref = document.getElementById('pref');
      const playTrackBtn = document.querySelectorAll('.playTrackBtn');

    pref.addEventListener('click', async ()=>{
        currentIndex--;
        if(currentIndex >= SongS.length){
            currentIndex = 0 ;
        }


        audio.src = SongS[currentIndex].url;
        await audio.play();

        updateSongTab();


         playTrackBtn.forEach(b => {
            b.querySelector('i').classList.replace('fa-pause', 'fa-play');
        });
         playTrackBtn[currentIndex].querySelector('i').classList.replace('fa-play', 'fa-pause');


         const mainBtuIcon = document.querySelectorAll('#play i');

         mainBtuIcon.classList.replace('fa-play', 'fa-pause');


    })

   }catch(err){
       
     console.log('Error:', err.message);
   }
}

prefSongArray();



function progressBar(){
    const progressBar = document.querySelector('.progress-bar');
    const probar = document.getElementById('proBar');
     const audio= document.getElementById('audio');
     const durationEnd = document.getElementById('durationEnd');
     const durationStart = document.getElementById('durationStart');

    audio.addEventListener('timeupdate', ()=>{
        const progressParcent = (audio.currentTime / audio.duration)*100;
        probar.style.width = `${progressParcent}%`;
       
         const currentMin = Math.floor(audio.currentTime / 60);
        const currentSec = Math.floor(audio.currentTime % 60);
        const totalMin = Math.floor(audio.duration / 60);
        const totalSec = Math.floor(audio.duration % 60);

        const currentTimeFormatted = `${currentMin}:${currentSec < 10 ? '0' : ''}${currentSec}`;
        const totalTimeFormatted = `${totalMin}:${totalSec < 10 ? '0' : ''}${totalSec}`;
        durationStart.textContent = `${currentTimeFormatted} `;
        durationEnd.textContent = `${totalTimeFormatted}`;

        if (!isNaN(audio.duration)) {
 
            }



    });


}

 progressBar();





const audio = document.getElementById('audio');
const icon = document.querySelector('#play i');
const playTrackBTN = document.querySelectorAll('.playTrackBtn');
audio.addEventListener("ended", ()=>{
    playAlltracks();
    icon.classList.replace('fa-pause', 'fa-play');
    playTrackBTN.forEach(b =>{
         b.querySelector('i').classList.replace('fa-pause', 'fa-play');
        
    })


} );
















































































function heroSectionDy() {
    const heroImages = [
        { img: "image/prety.jpg" },
        { img: "image/happy.jpg" },
        { img: "image/boy.jpg" }

    ];


    let i = 0;
    function heroDynamic() {

        const heroCard = document.getElementById('heroCard');
        heroCard.style.backgroundImage = `url(${heroImages[i].img})`
        i++;
        if (i >= heroImages.length) { i = 0; };
    }
    heroDynamic();

    setInterval(heroDynamic, 5000);
}
heroSectionDy();




async function deleteAllSongs() {
     const loaded = document.getElementById('loaded');
    
   const delet = await fetch('http://localhost:5000/deleteAllMusic', {

        method: "DELETE"
    });

    await loadSong();


}
 
document.getElementById('delet').addEventListener('click', ()=>{
    deleteAllSongs();
        loaded.style.display = "flex";

        if(delet.ok){
            loaded.style.display = "none";
        }



    })
