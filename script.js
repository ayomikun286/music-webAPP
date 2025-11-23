// const audio = document.getElementById('audio');
// const playBTN = document.querySelector('#play');
// const icon = document.querySelector('#play i');


// playBTN.addEventListener('click', ()=>{
//     if(audio.paused){
//         audio.play();
//         icon.classList.remove('fa-play');
//         icon.classList.add('fa-pause');
//     }else{
//         audio.pause();
        
//         icon.classList.remove('fa-pause')
//         icon.classList.add('fa-play');
        
//     }
// });


function playMUsic(){
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


}
 playMUsic();

const cloudName = "doua1o7qw";
const uploadPreset = "music_upload";


const file = document.getElementById('file');
const artistName = document.getElementById('Name');
const title = document.getElementById('title');
const upLoad = document.getElementById('save')


upLoad.addEventListener('click', async (e)=>{
    e.preventDefault();

 const File = file.files[0];
 const name = artistName.value.trim();
 const Title = title.value.trim();


    if(!File || !name || !Title){
        alert('file the datials ')
        return;
    }

   

    const formData = new FormData();
    formData.append("file", File);
    formData.append("upload_preset", uploadPreset);


   const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload `,{
        method: "POST",
        body: formData
    });

    const data = await res.json();


    console.log("uploaded file:", data.secure_url);

    document.getElementById('form').reset();
    document.getElementById('mesg').textContent =` ${data.secure_url}`;




})








