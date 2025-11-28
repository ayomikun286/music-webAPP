
// geeting all data back from backend///


export async function allMusic(){
 
        const res = await fetch("http://localhost:5000/allMusic")
       if(!res.ok){
        throw new Error("Failed to load music");
       }

       return await res.json();
        
}



