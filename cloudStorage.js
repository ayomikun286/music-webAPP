import{API_URL} from "./config.js";
export const allSongDIS = {
    name: '',
    title: '',
    url: '',
    image: '',



}

export function saveMusicToCloud() {
    const cloudName = "doua1o7qw";
    const uploadPreset = "music_upload";


    const file = document.getElementById('file');
    const artistName = document.getElementById('Name');
    const title = document.getElementById('title');
    const upoad = document.getElementById('ave');
    const loaded = document.getElementById('loaded')
    const trackImage = document.getElementById('image');
    const rolling = document.querySelector('.rolling')
    const successMsg = document.getElementById('success');

    // --- file input-- ///
    upoad.addEventListener('click', async (e) => {
        e.preventDefault();
        const imageUrl = trackImage.files[0];
        const File = file.files[0];
        const name = artistName.value.trim();
        const Title = title.value.trim();


        if (!File || !name || !Title) {
            alert('Fill the form')
            return;
        } else {
            loaded.style.display = "flex";

        }


        // upload track to cloudstorage --..//
        const formData = new FormData();
        formData.append("file", File);
        formData.append("upload_preset", uploadPreset);


        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
            method: "POST",
            body: formData
        });


        if (!res.ok) {
            // console.log(await res.text())
            rolling.classList.remove('done')
            rolling.classList.add('error')
            successMsg.style.color = "red"
            successMsg.textContent = "upload error"
            document.getElementById('form').reset();
            setTimeout(() => {
                loaded.style.display = "none";
            },1000)
            return;
        }
        // track url/
        const data = await res.json();


        // upload image to cloudinary ///
        const imageData = new FormData();
        imageData.append("file", imageUrl);
        imageData.append("upload_preset", uploadPreset);

        const imageRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: "POST",
            body: imageData
        });



        if (!imageRes.ok) {
            console.log(imageRes.text())
            rolling.classList.remove('done')
            rolling.classList.add('error')
            successMsg.style.color = "red"
            successMsg.textContent = "upload error"
            document.getElementById('form').reset();
            setTimeout(() => {
                loaded.style.display = "none";
            },1000)
        }

        const imageURL = await imageRes.json();











        allSongDIS.name = name;
        allSongDIS.title = Title;
        allSongDIS.url = data.secure_url;
        allSongDIS.image = imageURL.secure_url;



        // ===== save to backend ====//
        async function songsArray() {
            const backendRes = await fetch(`${API_URL}/saveMusic`, {

                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(allSongDIS),


            });



            if (backendRes.ok) {
                rolling.classList.remove('error')
                rolling.classList.add('done');
                successMsg.style.color = "green"
                successMsg.textContent = "upload successful"
                document.getElementById('form').reset();
                //  uploaad alret --------- here //
            } else {
                rolling.classList.remove('done')
                rolling.classList.add('error')
                successMsg.style.color = "red"
                successMsg.textContent = "upload error"
                document.getElementById('form').reset();
            }

            setTimeout(() => {
                loaded.style.display = "none";
            }, 1000)

            const backendData = await backendRes.json();
            console.log(backendData)

        }


        songsArray();



    });


};


