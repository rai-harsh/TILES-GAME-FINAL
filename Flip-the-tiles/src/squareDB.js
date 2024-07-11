// Create and populate the arr array
var arr = [];
for (var i = 1; i < 6; i++) {
    arr.push({
        number :i,
        img:`../public/icons/${i}.svg`
    });
    arr.push({
        number :i,
        img:`../public/icons/${i}.svg`      
    });
}

// Shuffle the arr array
shuffleArray(arr);

// Define the shuffleArray function
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Initialize the initialTiles array after arr is created and shuffled
const initialTiles = Array.from({ length: 10 }).map((_, index) => {
    return {
        id: index + 1,
        selected: false,
        won: false,
        num: arr[index].number,
        img: arr[index].img
    };
});

export default initialTiles;