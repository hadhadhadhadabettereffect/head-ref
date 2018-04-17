init();

function init () {
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer();

    W_HEIGHT = window.innerHeight;
    W_WIDTH = window.innerWidth;

    renderer.setSize( W_WIDTH, W_HEIGHT );
    container = renderer.domElement;
    camera = new THREE.PerspectiveCamera( 75, W_WIDTH/W_HEIGHT, 0.1, 1000 );
    camera.position.z = 10;
    
    controls = new THREE.OrbitControls( camera, container );
    controls.enableDamping = true; 
    controls.dampingFactor = 0.25;
    controls.maxDistance = 30;
    controls.minDistance = 2;

    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();
    plane = new THREE.Plane();
    offset = new THREE.Vector3();
    intersection = new THREE.Vector3();
    initLights();
    requestAnimationFrame(animate);

    document.body.appendChild( container );
    // loading basic planes model
    new THREE.OBJLoader().load(
        'models/planes.obj',
        (obj) => scene.add(obj)
    );
    window.addEventListener( 'resize', onWindowResize, false );
    window.addEventListener( 'mousemove', onMouseMove, false );
    container.addEventListener("mousedown", onMouseDown, false);
    container.addEventListener("mouseup", onMouseUp, false);
}

function animate() {
    requestAnimationFrame( animate );
    render();
}

function render() {
    controls.update();
	raycaster.setFromCamera( mouse, camera );
    if (selected) {
        container.style.cursor = "move";
    } else {
        var intersects = raycaster.intersectObjects( dragTargets );
        if (intersects.length > 0) {
            if (hovered != intersects[0]) {
                hovered = intersects[0].object;
                plane.setFromNormalAndCoplanarPoint( camera.getWorldDirection( plane.normal ), lamp.position );

                hovered.material.color.set(0xffdd22);
                container.style.cursor = "pointer";
                controls.enabled = false;
                
            }
        } else {
            if (hovered !== null) {
                hovered = null;
                container.style.cursor = "default";
                controls.enabled = true;
                orb.material.color.set(0xffaa22);
            }
        }
    }
	renderer.render( scene, camera );
}


/***
 * Event Listeners
 */

function onMouseMove (event) {
	mouse.x = ( event.clientX / W_WIDTH ) * 2 - 1;
	mouse.y = - ( event.clientY / W_HEIGHT ) * 2 + 1;

    // if object selected, drag selected
    if (selected && raycaster.ray.intersectPlane(plane, intersection))
        lamp.position.copy(intersection.sub(offset));
}

function onMouseDown (event) {
    selected = hovered;
    if (selected !== null) {
        if ( raycaster.ray.intersectPlane(plane, intersection) ) {
            offset.copy(intersection).sub(lamp.position);
        }
    }
}

function onMouseUp () {
    selected = null;
}

function onWindowResize () {
    W_HEIGHT = window.innerHeight;
    W_WIDTH = window.innerWidth;

    camera.aspect = W_WIDTH / W_HEIGHT;
    camera.updateProjectionMatrix();
    renderer.setSize( W_WIDTH, W_HEIGHT );
}