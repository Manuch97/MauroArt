function init() {
    initDedalo();
    initMenu();
    //initMaze();
}

var moved=false,
    transitioned=false,
    hoverTimeout = {};

function initDedalo() {
    function transitionDedalo(img) {
        img.classList.add('fade-out');

        img.addEventListener('transitionend', function() {
            img.src = img.src.endsWith("resources/images/gattone-logo.svg") ? "resources/images/medusa_bianco.svg" : "resources/images/gattone-logo.svg";
            img.classList.remove('fade-out');
        }, { once: true });
    }

    let clearHoverTimeout = () => { 
        if(hoverTimeout.initRotation)
            clearTimeout(hoverTimeout.initRotation);

        if(hoverTimeout.startTransition)
            clearTimeout(hoverTimeout.startTransition);

        if(hoverTimeout.medusaChange)
            clearTimeout(hoverTimeout.medusaChange); 
    }

    const dedalo = document.getElementById('dedalo_cat');
    let rotation = 0;
    const rotationSpeed = 360;

    dedalo.addEventListener('mouseover', () => {
        clearHoverTimeout();

        let mouseWaitingMs = 45 * 1000;
        hoverTimeout = 
        {
            "initRotation":
                setTimeout(() => {
                    moved=true;
                    rotation += rotationSpeed;
                    dedalo.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
                    document.body.style.cursor = "url('resources/images/gattone-logo.svg'), auto";
                }, mouseWaitingMs),
            "startTransition":
                setTimeout(() => {
                    transitioned = true;
                    transitionDedalo(dedalo.children[0]);
                }, mouseWaitingMs + 1500),
            /*
            "medusaChange":
                setTimeout(() => {
                    dedalo.children[0].src = "resources/images/medusa_bianco.svg";
                }, 5000)
            */
        }
    });

    dedalo.addEventListener('mouseleave', () => {
        clearHoverTimeout();

        if(moved) {
            moved = false;
            rotation -= rotationSpeed;
            dedalo.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
            /*
            setTimeout(() => {
                dedalo.children[0].src = "resources/images/gattone-logo.svg";
            }, 2500);
            */
           if (transitioned) {
                setTimeout(() => {
                    //dedalo.children[0].src = "resources/images/gattone-logo.svg";
                    transitionDedalo(dedalo.children[0]);
                }, 800);
                transitioned = false;
            }
            setTimeout(() => { document.body.style.cursor = "default"; }, 1000);
        }
    });
}