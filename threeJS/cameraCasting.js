var scene, renderer, camera, controls, mesh, stats, raycaster,
intersects
    ,myObjectId
    ,t = 1;

init();
animate();

function init()
{
    renderer = new THREE.WebGLRenderer( {antialias:true} );
    var width = window.innerWidth;
    var height = window.innerHeight;

    renderer.setSize (width, height);

    document.body.appendChild (renderer.domElement);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera (60, width/height, 0.01, 10000);
    camera.position.y = 16;
    camera.position.z = 40;
    camera.lookAt (new THREE.Vector3(0,0,0));

    var material = new THREE.LineBasicMaterial({ color: 0xAAFFAA });

    // crosshair size
    var x = 0.01, y = 0.01;

    var geometry = new THREE.Geometry();

    // crosshair
    geometry.vertices.push(new THREE.Vector3(0, y, 0));
    geometry.vertices.push(new THREE.Vector3(0, -y, 0));
    geometry.vertices.push(new THREE.Vector3(0, 0, 0));
    geometry.vertices.push(new THREE.Vector3(x, 0, 0));
    geometry.vertices.push(new THREE.Vector3(-x, 0, 0));

    var crosshair = new THREE.Line( geometry, material );

    // place it in the center
    var crosshairPercentX = 50;
    var crosshairPercentY = 50;
    var crosshairPositionX = (crosshairPercentX / 100) * 2 - 1;
    var crosshairPositionY = (crosshairPercentY / 100) * 2 - 1;

    crosshair.position.x = crosshairPositionX * camera.aspect;
    crosshair.position.y = crosshairPositionY;
    crosshair.position.z = -0.3;

    camera.add( crosshair );
    scene.add( camera );

    //  controls = new THREE.OrbitControls (camera, renderer.domElement);

    var gridXZ = new THREE.GridHelper(100, 10);
    gridXZ.setColors( new THREE.Color(0xff0000), new THREE.Color(0xffffff) );
    scene.add(gridXZ);

    material = new THREE.MeshPhongMaterial();

    // Create cube and add to scene.
    var geometry = new THREE.BoxGeometry(4, 4, 4);
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    myObjectId = mesh.id;

    // Create ambient light and add to scene.
    var light = new THREE.AmbientLight(0x404040); // soft white light
    scene.add(light);

    // Create directional light and add to scene.
    var directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    // Add listener for window resize.
    window.addEventListener('resize', onWindowResize, false);
    controls = new THREE.OrbitControls(camera,renderer.domElement);

    // Add stats to page.
    document.body.appendChild(stats.dom);
    raycaster = new THREE.Raycaster(camera.position, camera.getWorldDirection());
}

function animate()
{
    //controls.update();
    requestAnimationFrame ( animate );
    mesh.rotation.x += 0.005;
    mesh.rotation.y += 0.001;
    renderer.render (scene, camera);

    mesh.position.x += t;

    if (mesh.position.x > 50) {
        t = -0.3;
    } else if (mesh.position.x < -50) {
        t = 0.3;
    }

    raycaster = new THREE.Raycaster(camera.position, camera.getWorldDirection());
    intersects = raycaster.intersectObjects(scene.children);
    if (intersects[0] && intersects[0].object.id == myObjectId) {
        mesh.material.color.setHex(0x00ff00);
    } else {
        mesh.material.color.setHex(0xffffff);
    }

}


function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
