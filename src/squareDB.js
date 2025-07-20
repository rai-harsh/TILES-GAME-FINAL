const tiles = 6;
const tilesSq = tiles * tiles;

// Create and populate the arr array with pairs of tiles
let arr = [];
for (let i = 1; i <= tilesSq / 2; i++) {
    const tileData = {
        number: i,
        img: `/icons/${i}.svg`  // Correct path for public folder
    };
    arr.push({ ...tileData });
    arr.push({ ...tileData }); // Add the pair
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

// Initialize the initialTiles array using the shuffled arr
const initialTiles = arr.map((tile, index) => ({
    id: index + 1,
    selected: false,
    won: false,
    num: tile.number,
    img: tile.img
}));

export default initialTiles;
