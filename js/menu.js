var menuItems, rightCard;
let openItem = null;

function initMenu() {
    menuItems = document.getElementsByClassName("menu-item");
    rightCard = document.getElementsByClassName("rightCard")[0];

    Array.from(menuItems).forEach(item => {
        img = item.getElementsByTagName("img")[0];
        img.addEventListener("click", openContent);
    });

    document.getElementsByClassName("logo")[0].addEventListener("click", resetContent);
}

function openContent(event) {
    let poeticaUrls     = [
        "resources/images/opere/360_F_48417977_p5P75ihoMUCbjNbTXb638dEvAFjBwY1b.jpg",
        "resources/images/opere/29155128-panorama-di-bellissimo-alba-al-di-sopra-di-lago-foto.jpg",
        "resources/images/opere/Panorama-580.jpg",
        "resources/images/opere/panorama-al-tramonto-sulla-spiaggia_43605-106.avif",
        "resources/images/opere/Perche-un-panorama-ci-colpisce-scaled.jpg",
    ],
    labyrinthusUrls = [
        "resources/images/labyrinthus/81dxjiYexOL.jpg",
        "resources/images/labyrinthus/graphic-art-photo.jpg",
        "resources/images/labyrinthus/pexels-misael-garcia-832776-1707820.jpg",
        "resources/images/labyrinthus/pexels-photo-1590549.jpeg",
        "resources/images/labyrinthus/pngtree-a-two-lane-road-through-blackwater-falls-state-park-during-autumn-photo-image_3019985.jpg"
    ];

    resetContent();

    document.getElementById("dedalo_cat").style.clipPath = "inset(0% 50% 0% 0%)";
    let imgId = event.target.id;
    let funcName = imgId.split("-")[0];

    
    let contentEl = document.getElementById(funcName + "-content");
    if(contentEl) {
        openItem = contentEl;
        contentEl.classList.remove('d-none');

        switch (funcName) {
            case "biografia":
                setBioBackground();
                break;

            case "poetica":
                setPoeticaBackground();
                changeSymbols(true);
                showEntraButton(35, 48);
                slideShowInstance.setPhotos(poeticaUrls);
                break;
            
            case "labyrinthus":
                setLabyrinthusBackground();
                changeSymbols(true, true);
                showEntraButton(10, 46);
                slideShowInstance.setPhotos(labyrinthusUrls);
                break;
        }
        
    } else console.error("unknown content '" + funcName + "'");
}

function resetContent(ignoreDedalo) {
    if (typeof ignoreDedalo != "boolean" || !ignoreDedalo)
        document.getElementById("dedalo_cat").style.clipPath = "inset(0% 0% 0% 0%)";

    if (!openItem) return;
    
    openItem.classList.add('d-none');
    let btn = document.getElementById("entra-btn");
    if(btn) btn.classList.add('d-none');

    document.getElementById("slide-show").classList.add("d-none");
    document.getElementById("slide-display").classList.add("d-none");

    resetBackGround(openItem);
    changeSymbols(false);
}


function setBioBackground() {
    rightCard.style.backgroundImage = "url('resources/images/athena-cropped.svg')";
    rightCard.style.backgroundSize= "70vh auto"
    rightCard.style.backgroundPosition = "center";
    rightCard.style.backgroundRepeat = "no-repeat";
    rightCard.style.backgroundPosition = "left bottom";
}

function setPoeticaBackground() {
    rightCard.style.backgroundImage = "url('resources/images/dipinti.svg')";
    rightCard.style.backgroundSize = "cover";
    rightCard.style.backgroundPosition = "center";
    rightCard.style.backgroundRepeat = "no-repeat";
    rightCard.style.backgroundPosition = "left bottom";
}

function setLabyrinthusBackground() {
    rightCard.style.backgroundImage = "url('resources/images/Labirynthus.svg')";
    rightCard.style.backgroundSize = "cover";
    rightCard.style.backgroundPosition = "center";
    rightCard.style.backgroundRepeat = "no-repeat";
    rightCard.style.backgroundPosition = "left bottom";
}

function changeSymbols(whiteColor, onlyBottom) {
    symbols = rightCard.getElementsByClassName("symbol");
    let newImg = whiteColor ? "resources/images/luna.svg" : "resources/images/luna_2.svg";
    Array.from(symbols).forEach(item => {
        if (!onlyBottom || item.classList.contains('bottomSymbol')) {
            img = item.getElementsByTagName("img")[0];
            img.src = newImg;
        }
    });
}

function showEntraButton(topPercent, leftPercent) {
    btn = document.getElementById("entra-btn");
    btn.style.top = topPercent + "%";
    btn.style.left = leftPercent + "%";

    btn.classList.remove('d-none');
}

function resetBackGround(openItem) {
    rightCard.style.background = "";
}