declare var THREE;

var camera, controls, scene, renderer;

init();

function init () {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
        75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    renderer = new THREE.WebGLRenderer();

    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    
    camera.position.z = 5;

    var ambient = new THREE.AmbientLight( 0x222222 );
    var light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 1, 1, 1 );
    scene.add(ambient);
    scene.add(light);

    controls = new THREE.OrbitControls( camera, renderer.domElement );

    controls.addEventListener( 'change', render ); 
    window.addEventListener( 'resize', onWindowResize, false );
   
    // loading basic planes model
    new THREE.OBJLoader().load(
        'models/planes.obj',
        (obj) => {
            scene.add(obj);
            requestAnimationFrame(render);
        }
    );
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function render() {
    renderer.render( scene, camera );
}
