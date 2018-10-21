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
    
    LightenDarkenColor(color, amount) {
        var usePound = false;
        if (color[0] == "#") {
            color = color.slice(1);
            usePound = true;
        }
        var num = parseInt(color,16);
    
        var red = (num >> 16) + amount;
        if (red > 255) red = 255;
        else if  (red < 0) red = 0;
     
        var blue = ((num >> 8) & 0x00FF) + amount;
        if (blue > 255) blue = 255;
        else if  (blue < 0) blue = 0;

        var green = (num & 0x0000FF) + amount;
        if (green > 255) green = 255;
        else if (green < 0) green = 0;
     
        return (usePound?"#":"") + (green | (blue << 8) | (red << 16)).toString(16);
      
    }
    }

