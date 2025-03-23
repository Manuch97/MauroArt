var initialized = false;
var scene, camera, renderer, controls;
var sp = {x: -228, y: 57, z: -71}

function showThree(container) {
    if (!initialized) {
        initialized = true;
        initThreeJS(container);
    } else {
        camera.position.set(sp.x, sp.y, sp.z);
    }
}

function initThreeJS(container) {
    let mixer;
    init(container);
    animate();

    function init(container) {
        // Create the scene
        scene = new THREE.Scene();
        const width = container.clientWidth;
        const height = container.clientHeight;

        // Set up the camera
        camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.set(sp.x, sp.y, sp.z);

        // Set up the renderer
        renderer = new THREE.WebGLRenderer({
            antialias: true
        });
        renderer.setSize(width, height);
        container.appendChild(renderer.domElement);

        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        scene.add(ambientLight);

        // Add directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(0, 1, 1).normalize();
        scene.add(directionalLight);


        // Orbit controls
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enablePan = true;
        controls.minDistance = 120;
        controls.maxDistance = 900;
        controls.mouseButtons.RIGHT = null;

        const loadingEl = document.getElementById("loading");
        loadingEl.classList.remove("d-none");
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load('resources/models/serene_cat/Serene_Stone_Cat_texture.png', function (texture) {
            console.log('Texture loaded:', texture);
        }, undefined, function (error) {
            console.error('Error loading texture:', error);
        });

        // Load the FBX model
        const loader = new THREE.FBXLoader();
        loader.load('resources/models/serene_cat/Serene_Stone_Cat.fbx', function (object) {
            object.traverse(function (child) {
                if (child.isMesh) {
                    child.material.map = texture; // Apply the texture to the material
                    child.material.needsUpdate = true; // Update the material
                }
            });
            scene.add(object);
            mixer = new THREE.AnimationMixer(object);
            loadingEl.classList.add("d-none");
        }, undefined, function (error) {
            loadingEl.classList.add("d-none");
            console.error(error);
        });
        // Handle window resize
        window.addEventListener('resize', onWindowResize, false);
    }

    function onWindowResize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    }

    function animate() {
        requestAnimationFrame(animate);

        const visible = !container.classList.contains("d-none");

        if (visible) {
            if (mixer) mixer.update(0.01);
            controls.update();
            renderer.render(scene, camera);
        }
    }
}