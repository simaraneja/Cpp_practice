var nearCam = 1.0;
var farCam = 1200.00;
var camFOV = 75.0;

//near variables
var nearHeight, nearWidth;
var nearTopLeft, nearBottomLeft, nearTopRight, nearBottomRight;
x ``, nearPointMat, nearPoints;

//far variables
var farHeight, farWidth;
var farTopLeft, farBottomLeft, farTopRight, farBottomRight;
var farPointGeom, farPointMat, farPoints;


function angToRad(angle) {
    var rad = (angle * Math.PI / 180);
    return rad;
}


var fovRad = angToRad(camFOV);

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(camFOV, window.innerWidth / window.innerHeight, nearCam, farCam);
camera.position.z = farCam;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


init();
animate();

function init() {
    //calculate height first for calculating width
    farHeight = 2 * (Math.tan(fovRad / 2) * farCam);
    farWidth = farHeight * camera.aspect;

    nearHeight = 2 * (Math.tan(fovRad / 2) * nearCam);
    nearWidth = nearHeight * camera.aspect;


    // create the vectors
    farTopLeft = new THREE.Vector3(-farWidth / 2, farHeight / 2, -farCam);
    farBottomLeft = new THREE.Vector3(-farWidth / 2, -farHeight / 2, -farCam);
    farTopRight = new THREE.Vector3(farWidth / 2, farHeight / 2, -farCam);
    farBottomRight = new THREE.Vector3(farWidth / 2, -farHeight / 2, -farCam);

    nearTopLeft = new THREE.Vector3(-nearWidth / 2, nearHeight / 2, -nearCam);
    nearBottomLeft = new THREE.Vector3(-nearWidth / 2, -nearHeight / 2, -nearCam);
    nearTopRight = new THREE.Vector3(nearWidth / 2, nearHeight / 2, -nearCam);
    nearBottomRight = new THREE.Vector3(nearWidth / 2, -nearHeight / 2, -nearCam);


    //adjust the vector to camera position and direction
    camera.updateMatrixWorld();
    farTopLeft.applyMatrix4(camera.matrixWorld);
    farBottomLeft.applyMatrix4(camera.matrixWorld);
    farTopRight.applyMatrix4(camera.matrixWorld);
    farBottomRight.applyMatrix4(camera.matrixWorld);


    nearTopLeft.applyMatrix4(camera.matrixWorld);
    nearBottomLeft.applyMatrix4(camera.matrixWorld);
    nearTopRight.applyMatrix4(camera.matrixWorld);
    nearBottomRight.applyMatrix4(camera.matrixWorld);


    //create Points geometry for far plane and near plane 

    //far plane geom and mat
    farPointGeom = new THREE.Geometry();

    farPointGeom.vertices.push(farTopLeft);
    farPointGeom.vertices.push(farBottomLeft);
    farPointGeom.vertices.push(farTopRight);
    farPointGeom.vertices.push(farBottomRight);

    farPointMat = new THREE.PointsMaterial({
        color: 0xff0000,
        size: 400
    });

    //near plane geom and mat
    nearPointGeom = new THREE.Geometry();

    nearPointGeom.vertices.push(nearTopLeft);
    nearPointGeom.vertices.push(nearBottomLeft);
    nearPointGeom.vertices.push(nearTopRight);
    nearPointGeom.vertices.push(nearBottomRight);

    nearPointMat = new THREE.PointsMaterial({
        color: 0x00ff00,
        size: 1,
        transparent: true,
        opacity: 0.4
    });


    //create points on screen

    //far points

    farPoints = new THREE.Points(farPointGeom, farPointMat);
    scene.add(farPoints);

    //near points

    nearPoints = new THREE.Points(nearPointGeom, nearPointMat);
    scene.add(nearPoints);

    window.addEventListener('resize', onWindowResize, false);

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}