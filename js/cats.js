function initMaze() {
    //const cat = document.getElementById('cat');
    const cats = document.getElementsByClassName("cat");
    const maze = document.getElementsByTagName("body")[0];/*document.getElementById('maze');*/

    function getRandomPosition(cat) {
        const mazeRect = maze.getBoundingClientRect();
        const catWidth = cat.clientWidth;
        const catHeight = cat.clientHeight;

        // Generate random positions within the maze boundaries
        //const randomX = Math.random() * (mazeRect.width/2 - catWidth);
        //const randomY = Math.random() * (mazeRect.height/2 - catHeight);
        const randomX = Math.random() * mazeRect.width
        const randomY = Math.random() * mazeRect.height

        return { x: randomX, y: randomY };
    }

    function moveCat(cat) {
        const { x, y } = getRandomPosition(cat);
        cat.style.transform = `translate(${x}px, ${y}px)`;
    }

    for (let i=0; i<cats.length; i++) {
        setInterval(() => {moveCat(cats[i])}, 1500);
    }
    
}