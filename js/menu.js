const menuItems = document.getElementsByClassName("menu-item");
let openItem = null;

function initMenu() {
    Array.from(menuItems).forEach(item => {
        img = item.getElementsByTagName("img")[0]
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

        if (funcName == "biografia") {
            setCardCustomBackground();
        }
    } else console.error("unknown content " + content);
}

function resetContent() {
    document.getElementById("dedalo_cat").style.clipPath = "inset(0% 0% 0% 0%)";
    if (!openItem) return;
    
    openItem.classList.add('d-none');
    resetBackGround(openItem);
}


function setCardCustomBackground() {
    let card = document.getElementsByClassName("rightCard")[0];

    card.style.backgroundImage = "url('../resources/images/athena-cropped.svg')";
    card.style.backgroundSize = "cover";
    card.style.backgroundPosition = "center";
    card.style.backgroundRepeat = "no-repeat";
    card.style.backgroundSize= "70vh auto"
    card.style.backgroundPosition = "left bottom";
}

function resetBackGround(openItem) {
    let card = document.getElementsByClassName("rightCard")[0];
    card.style.background = "";
}