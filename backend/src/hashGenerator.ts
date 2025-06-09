export function hashGenerator(){
    const a: string= "qwertyuiopasdfghjklzxcvbnm1234567890";
    let hash="";
    for(let i = 0;i < 10;i++){
        hash+= a[Math.floor(Math.random()*a.length)]
    }
    return hash;
}