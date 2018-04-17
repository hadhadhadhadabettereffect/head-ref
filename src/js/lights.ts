function initLights () {
    var light = new THREE.PointLight( 0xffffff, 1, 100 );
    scene.add(new THREE.AmbientLight( 0x222222 ));
    lamp = new THREE.Object3D();
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