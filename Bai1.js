function validTime(time){
    let h_m = time.split(":")
    if(h_m[0] > 12 && h_m[0] < 25 ){
        return true;
    } 
    return false;
    //console.log(h_m)
}
console.log(validTime("02:00"));