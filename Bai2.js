function missingNumber(arr){
    let mid = 0;
    for(let i =0; i< arr.length-1; i++){
        if(Math.abs(arr[i]-arr[i+1] > 1)){
             mid = (arr[i] + arr[i+1])/2;
        } else{
            for( let j = 0; j< arr.length +1; j++ ){
                let count = 0;
                arr.map(num => {
                    if(j == num){
                       count += 1;
                    } 
                })
                if(count == 0){
                    return j;
                }
            }
        }
    }
    return mid;
}
const arr = [0,1,2]
console.log(missingNumber(arr))