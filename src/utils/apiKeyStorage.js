import CryptoJS from "crypto-js";

const STORAGE_KEY = "ai_fitness_api_key";
const SECRET = "ai-fitness-buddy-secret";

export const saveApiKey = (key)=>{
    const encrypted = CryptoJS.AES.encrypt(key,SECRET).toString();
        localStorage.setItem(STORAGE_KEY,encrypted);
};


export const getApiKey =()=>{
    const encrypted = localStorage.getItem(STORAGE_KEY);
    if(!encrypted) return "";
    try{
        const byte = CryptoJS.AES.decrypt(encrypted,SECRET);
        return byte.toString(CryptoJS.enc.Utf8);
    } catch(err){
        return "";
    }
};


export const clearApiKey = ()=>{
    localStorage.removeItem(STORAGE_KEY);
}

