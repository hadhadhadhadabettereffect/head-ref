var ambient, light;
function initLights () {
    ambient = new THREE.AmbientLight( 0x222222 );
    scene.add(ambient);

    lamp = new THREE.Object3D();

    light = new THREE.PointLight( 0xffffff, 1, 100 );
    lamp.position.set( 3, 3, 3 );
    lamp.add(light);

    orb = new THREE.Mesh(
        new THREE.SphereGeometry(0.25,16,8),
        new THREE.MeshBasicMaterial({color: 0xffaa22})
    );
    lamp.add(orb);
    scene.add(lamp);
    dragTargets.push(orb);
}