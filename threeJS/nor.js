var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(-3, 5, 8);
camera.lookAt(scene.position);
var renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x404040);
document.body.appendChild(renderer.domElement);

var controls = new THREE.OrbitControls(camera, renderer.domElement);

var light = new THREE.DirectionalLight(0xffffff, 0.5);
light.position.setScalar(10);
scene.add(light);
scene.add(new THREE.AmbientLight(0xffffff, 0.5));

var walls = [];

makeWall(Math.PI * 0.5);
makeWall(0);
makeWall(Math.PI * -0.5);

var clockGeom = new THREE.BoxBufferGeometry(1, 1, 0.1);
clockGeom.translate(0, 0, 0.05);
var clockMat = new THREE.MeshBasicMaterial({
    color: "orange"
});
var clock = new THREE.Mesh(clockGeom, clockMat);
scene.add(clock);

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var intersects = [];
var lookAt = new THREE.Vector3();
var tempIntersect = 0;
renderer.domElement.addEventListener("mousemove", onMouseMove, false);

function onMouseMove(event) {

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    //raycaster.setFromCamera(mouse, camera);
    //raycaster.setFromCamera(camera.position, camera.getWorldDirection());
    raycaster.set(camera.getWorldPosition(), camera.getWorldDirection());
    console.log(camera.getWorldPosition(), camera.getWorldDirection())

    intersects = raycaster.intersectObjects(walls);
    if (intersects.length === 0) return;
    else {
        var intersect = intersects[0].object;
        if(tempIntersect!== intersect){
            if(tempIntersect){
                tempIntersect.material.visible = true
            }
                intersect.material.visible = false;
            tempIntersect = intersect;
        }
    }

   // clock.position.copy(intersects[0].point);
   // clock.lookAt(lookAt.copy(intersects[0].point).add(intersects[0].face.normal));
}

render();

function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

function makeWall(rotY, color) {
    let geom = new THREE.BoxBufferGeometry(8, 8, 0.1);
    geom.translate(0, 0, -4);
    geom.rotateY(rotY);
    let mat = new THREE.MeshLambertMaterial({
        color: Math.random() * 0x777777 + 0x777777
    });
    let wall = new THREE.Mesh(geom, mat);
    scene.add(wall);
    walls.push(wall);
}