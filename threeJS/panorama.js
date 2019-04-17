var radius = 2,
    camFOV = 60,
    nearCam = 0.1,
    farCam = 1000;
//near variables
var nearHeight, nearWidth;
var nearTopLeft, nearBottomLeft, nearTopRight, nearBottomRight;
var nearPointGeom;
var fovRad = angToRad(camFOV);

var buttonClick = 0;
//button
var btn, t;

var scene = new THREE.Scene();

var clock = new THREE.Clock();

var camera = new THREE.PerspectiveCamera(camFOV,
    window.innerWidth / window.innerHeight,
    nearCam,
    farCam);

//Resposition the camera
camera.position.set(0, 0, 0);

//point the camera at given coordinate
camera.lookAt(new THREE.Vector3(0, 0, 0));
scene.add(camera);


var renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xfff6e6);

//APPEND TO THE DOCUMENT
document.body.appendChild(renderer.domElement);

var bufferTexture = new THREE.WebGLRenderTarget(
    window.innerWidth, window.innerHeight, {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.NearestFilter
    });


var controls = new THREE.OrbitControls(camera, renderer.domElement);

var ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);


var sphere1Geom = new THREE.SphereGeometry(radius, 64, 64);
var sphere1Mat = new THREE.MeshBasicMaterial({
    flatShading: true,
    map: new THREE.TextureLoader().load("textures/landscape_1.jpg"),
    side: THREE.DoubleSide
});
var sphere1Mesh = new THREE.Mesh(sphere1Geom, sphere1Mat);
scene.add(sphere1Mesh);

var planeMesh;

var sphere2Geom = new THREE.SphereGeometry(radius, 64, 64);
var sphere2Mat = new THREE.MeshBasicMaterial({
    flatShading: true,
    map: new THREE.TextureLoader().load("textures/landscape_2.jpg"),
    side: THREE.DoubleSide
});
var sphere2Mesh = new THREE.Mesh(sphere2Geom, sphere2Mat);
sphere2Mesh.position.x = 4;
scene.add(sphere2Mesh);

var geomPlane = new THREE.BufferGeometry();

var planeVertices = getNearPoints();
var faceIndices = [0, 2, 1, 2, 3, 1];
var uvs = new Float32Array([
    0, 1,
    0, 0,
    1, 1,
    1, 0
]);

geomPlane.addAttribute('position', new THREE.BufferAttribute(planeVertices, 3));
geomPlane.addAttribute('uv', new THREE.BufferAttribute(uvs, 2));
geomPlane.setIndex(new THREE.BufferAttribute(new Uint16Array(faceIndices), 1));

var geomTex = new THREE.MeshBasicMaterial({
    map: bufferTexture.texture,
    //map: new THREE.TextureLoader().load("/textures/abc.jpg"),
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.0
});

var plane = new THREE.Mesh(geomPlane, geomTex);
plane.position.z = 0.001;
camera.add(plane);
plane.visible = false;



/* var planeGeom = new THREE.PlaneGeometry(16, 9);
var planeMat = new THREE.MeshBasicMaterial({
    //map: new THREE.TextureLoader().load("/textures/abc.jpg"),
    map: bufferTexture,
    side: THREE.DoubleSide
});

var planeMesh = new THREE.Mesh(planeGeom, planeMat);
planeMesh.position.z = -10;
planeMesh.position.x = -10;
scene.add(planeMesh); */


createButton();
animate();

btn.addEventListener('click', function() {
    goToNextPanorama();
    buttonClick = (!buttonClick);
});

function goToNextPanorama() {
    console.log("infunction");
    //renderer.render(scene, camera);
    renderer.render(scene, camera, bufferTexture);
    plane.visible = true;
    geomTex.opacity = 1.0;
    if (buttonClick)
        camera.position.set(0, 0, 0);
    else
        camera.position.set(4, 0, 0);
    var a = 5;
    while (a > 0) {
        console.log(a);
        a -= 0.003;
    }
}

function animate() {
    var delta = clock.getDelta();
    sphere1Mesh.rotation.y += delta * 0.1;
    sphere2Mesh.rotation.y += delta * 0.1;



    renderer.render(scene, camera);
    if (geomTex.opacity > 0.0) {
        geomTex.opacity = geomTex.opacity - 0.009;
    }

    requestAnimationFrame(animate);
    controls.update();
}


function angToRad(angle) {
    var rad = (angle * Math.PI / 180);
    return rad;
}

function getNearPoints() {

    nearHeight = 2 * (Math.tan(fovRad / 2) * nearCam);
    nearWidth = nearHeight * camera.aspect;

    nearTopLeft = new THREE.Vector3(-nearWidth / 2, nearHeight / 2, -nearCam);
    nearBottomLeft = new THREE.Vector3(-nearWidth / 2, -nearHeight / 2, -nearCam);
    nearTopRight = new THREE.Vector3(nearWidth / 2, nearHeight / 2, -nearCam);
    nearBottomRight = new THREE.Vector3(nearWidth / 2, -nearHeight / 2, -nearCam);

    camera.updateMatrixWorld();
    nearTopLeft.applyMatrix4(camera.matrixWorld);
    nearBottomLeft.applyMatrix4(camera.matrixWorld);
    nearTopRight.applyMatrix4(camera.matrixWorld);
    nearBottomRight.applyMatrix4(camera.matrixWorld);

    //near plane geom and mat
    var nearPoints = new Float32Array([
        nearTopLeft.x, nearTopLeft.y, nearTopLeft.z * 1.01,
        nearBottomLeft.x, nearBottomLeft.y, nearBottomLeft.z * 1.01,
        nearTopRight.x, nearTopRight.y, nearTopRight.z * 1.01,
        nearBottomRight.x, nearBottomRight.y, nearBottomRight.z * 1.01
    ]);

    return nearPoints;
}

function createButton() {
    btn = document.createElement("BUTTON");
    btn.setAttribute("id", "btn1");
    t = document.createTextNode("CLICK ME");
    btn.appendChild(t);
    /* 
        btn2 = document.createElement("BUTTON");
        btn2.setAttribute("id", "btn2");
        t2 = document.createTextNode("EFFECT");
        btn2.appendChild(t2);

     */
    document.body.appendChild(btn);
    //    document.body.appendChild(btn2);

    /*     document.getElementById("btn1").style.left = "100px";
        document.getElementById("btn1").style.top = "500px"; */

}


//var controls = new THREE.OrbitControls(camera, renderer.domElement);
//controls.maxPolarAngle = Math.PI / 2;
//controls.target = new THREE.Vector3(10,0,0);