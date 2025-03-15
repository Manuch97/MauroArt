var menuItems;
var rightCard;
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
                break;
        }
        
    } else console.error("unknown content '" + funcName + "'");
}

function resetContent() {
    document.getElementById("dedalo_cat").style.clipPath = "inset(0% 0% 0% 0%)";
    if (!openItem) return;
    
    openItem.classList.add('d-none');
    resetBackGround(openItem);
    changeSymbols(false);
}


function setBioBackground() {
    rightCard.style.backgroundImage = "url('resources/images/athena-cropped.svg')";
    rightCard.style.backgroundSize = "cover";
    rightCard.style.backgroundPosition = "center";
    rightCard.style.backgroundRepeat = "no-repeat";
    rightCard.style.backgroundSize= "70vh auto"
    rightCard.style.backgroundPosition = "left bottom";
}

function setPoeticaBackground() {
    rightCard.style.backgroundImage = "url('resources/images/dipinti.svg')";
    rightCard.style.backgroundSize = "cover";
    rightCard.style.backgroundPosition = "center";
    rightCard.style.backgroundRepeat = "no-repeat";
    //rightCard.style.backgroundSize= "100%"
    rightCard.style.backgroundPosition = "left bottom";
}

function changeSymbols(whiteColor) {
    symbols = rightCard.getElementsByClassName("symbol");
    let newImg = whiteColor ? "resources/images/luna.svg" : "resources/images/luna_2.svg";
    Array.from(symbols).forEach(item => {
        img = item.getElementsByTagName("img")[0];
        
        img.src = newImg;
    });
}

function resetBackGround(openItem) {
    rightCard.style.background = "";
}