
import axios from "axios";
class apiDistelsaService {
    private apiUrl: string = "https://apigt.tienda.max.com.gt/v1/"
    private apikey = "ROGi1LWB3saRqFw4Xdqc4Z9jGWVxYLl9ZEZjbJu9"
    public async getData(endpoint: string) {
        const response = await fetch(this.apiUrl + endpoint, {
            headers: {
                "X-API-Key": this.apikey
            }
        });
        return response.json();
    }
    public async getProductsByTarget(){
        const headers = {
            "X-API-Key": this.apikey,
            "Content-Type": "application/json"
        }
        const response = await axios.post("https://apigt.tienda.max.com.gt/v2/products/byTarget", {"target":"ids","keyParameters":{"ids":["AP12CW1RNXS20","65Q6QV","MEH94AMA","HP15FC0258LA","BN801","1c6c6e8e","af9ed3a2","SC199750","b73537a2","1385866CM","RMD165PVCRS0","HRDSKAB1C","SRSULT50BZLA","SMA266MZK","0a49e8f0","769c2176","8e20391f","7d3f23d4"]}},{
            headers: headers
        
        });
        return response.data;
    }
}

export const apiDistelsa = new apiDistelsaService()


//catalogs/categories/summary?categoryDepth=5&categoryType=Base%2CPromoci%C3%B3n 
