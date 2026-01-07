
// geeting all data back from backend///
import{API_URL} from "./config.JS"

export async function allMusic(){
 
        const res = await fetch( `${API_URL}/allMusic`)
       if(!res.ok){
        throw new Error("Failed to load music");
       }

       return await res.json();
        
}



