export class Utilities {
    constructor() {
    }
    
    sumProperty(arr, prop) {
        var total = 0;
        for (var x=0; x<arr.length; x++) {
            total += arr[x][prop];
        }
        return total;
    }
}

