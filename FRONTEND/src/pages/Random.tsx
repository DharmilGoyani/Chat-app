export function Random() {
    let roomCode = "";
    const possibleCode = ["A","B","C","D","E","F","G","H","I","J","K","L","M","V","W","X","Y","Z","0","1","2","3","4","5","6","7","8","9"]
    for(let i=0;i<6;i++){
        roomCode = roomCode + possibleCode[parseInt(Math.random() * 28)];
        
        
    }

    return roomCode;
}