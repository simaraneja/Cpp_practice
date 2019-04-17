var renderer, scene, camera;
//var angle = 0;

init();
animate();


function init() {

    // renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    // scene
    scene = new THREE.Scene();

    // camera
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(0, 0, 400);

    // line material
    var material = new THREE.MeshBasicMaterial({
        color: 0xff0000
    });

    // Geometry
    var geometry = new THREE.Geometry();
    vertices = [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(100, 0, 0),
        new THREE.Vector3(100, 100, 0),
        new THREE.Vector3(0, 100, 0),
    ];
    geometry.vertices = vertices;
    geometry.faces = [
        new THREE.Face3(0, 1, 2),
        new THREE.Face3(0, 2, 3)
    ];

    //Buffer geometry
    var bufferGeometry = new THREE.BufferGeometry();
    var positions = new Float32Array(vertices.length * 3);
    for (var i = 0; i < vertices.length; i++) {
        positions[i * 3] = vertices[i].x;
        positions[i * 3 + 1] = vertices[i].y;
        positions[i * 3 + 2] = vertices[i].z;
    }
    indices = [0, 1, 2, 0, 2, 3];
    bufferGeometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
    bufferGeometry.setIndex(new THREE.BufferAttribute(new Uint16Array(indices), 1));

    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    var bufferMesh = new THREE.Mesh(bufferGeometry, material);
    bufferMesh.position.set(-100, -100, 0);
    scene.add(bufferMesh);

    // With indexes
    console.log(bufferGeometry);

    // Without indexes
    bufferGeometry = new THREE.BufferGeometry();
    bufferGeometry.fromGeometry(geometry);
    console.log(bufferGeometry);
}

// render
function render() {
    renderer.render(scene, camera);
}

// animate
function animate() {
    requestAnimationFrame(animate);
    render();
}


//Array of promises test
var promise1 = Promise.resolve(3);
var promise2 = 42;
var promise3 = new Promise(function(resolve, reject) {
    setTimeout(resolve, 100, 'foo');
});

Promise.all([promise1, promise2, promise3]).then(function(values) {
    console.log(values);
});