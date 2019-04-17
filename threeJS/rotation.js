/**
 * Created by Singh on 7/23/2018.
 */
var camera, scene, renderer;
var geometry, material, mesh;
var controls;

init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 1000;
    camera.position.y = 40;

    scene = new THREE.Scene();

    geometry = new THREE.BoxGeometry(200, 200, 200);
    material = new THREE.MeshBasicMaterial({
        color: 0xffff00,
        wireframe: true
    });

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    camera.lookAt(scene.position)

    mesh.position.set(0,-150,0);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    controls = new THREE.RotationControls(camera, renderer.domElement);
    scene.add(controls);
    controls.setAxis('Y');
    controls.attach(mesh);
    controls.setMode('rotate');

    var Orbitcontrols = new THREE.OrbitControls(camera,renderer.domElement);
    Orbitcontrols.update();
}

function animate() {

    requestAnimationFrame(animate);

    renderer.render(scene, camera);

}