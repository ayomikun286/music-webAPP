export const allSongDIS = {
    name: '',
    title: '',
    url: '',


}

export function saveMusicToCloud() {
    const cloudName = "doua1o7qw";
    const uploadPreset = "music_upload";


    const file = document.getElementById('file');
    const artistName = document.getElementById('Name');
    const title = document.getElementById('title');
    const upoad = document.getElementById('ave');
    const loaded = document.getElementById('loaded')

    // --- file input-- ///
    upoad.addEventListener('click', async (e) => {
        e.preventDefault();

        const File = file.files[0];
        const name = artistName.value.trim();
        const Title = title.value.trim();


        if (!File || !name || !Title) {
            alert('file the datials ')
            return;
        }else{
            loaded.style.display = " flex";

        }


// upload to cloudstorage --..//
        const formData = new FormData();
        formData.append("file", File);
        formData.append("upload_preset", uploadPreset);


        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
            method: "POST",
            body: formData
        });





        if (!res.ok) {
            console.log(await res.text())
            return;
        }

n 

        const data = await res.json();

        allSongDIS.name = name;
        allSongDIS.title = Title;
        allSongDIS.url = data.secure_url;


         

        // ===== save to backend ====//
        async function songsArray() {
            const backendRes = await fetch("http://localhost:5000/saveMusic", {

                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(allSongDIS),


            });

            const backendData = await backendRes.json();
            
            if(backendRes.ok){
                 loaded.style.display = "none";
                 document.getElementById('form').reset();


            }
            console.log('music:', backendData);
        }


            songsArray()
       


    });


}


