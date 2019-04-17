/**
 * Created by Singh on 7/30/2018.
 */
var points = [
    pointCenter1=new THREE.Vector3(),
    pointLower1= new THREE.Vector3(),
    pointLower2= new THREE.Vector3(),
    pointCenter2=new THREE.Vector3(),
    pointUpper1= new THREE.Vector3(),
    pointUpper2= new THREE.Vector3(),
];


var pointsA = [
    -100, 0,   0,
    -100, 100, 0,
    0   , 100, 0,
    0   , 0,   0,
    100 , 0,   0,
    100 , 100, 0,
];
for(var wall = 0; wall < pointsA.length; wall+=18) {

    for (var point = 0; point < 6; point++) {
        {

            points[point].x = pointsA[(point * 3 + 0)];
            points[point].y = pointsA[(point * 3 + 1)];
            points[point].z = pointsA[(point * 3 + 2)];

        }
    }
}
var pointindices = [
    0,3,2,   0,1,2, //back
    4,7,6,   4,5,6, //front
    0,3,7,   0,4,7, //left
    5,6,2,   5,1,2, //right
    7,3,2,   7,6,2, //top
    0,4,5,   0,1,5  //bottom
];

var indices = [0,1,6,0,6,5,];

var fi = [];

/*        0,1,6,0,6,5,
        1,2,7,1,7,6,
        2,3,8,2,8,7,
        3,4,9,3,9,8,
        4,5,10,4,10,9,
        5,6,11,5,11,10,
        6,7,12,6,12,11,
        7,8,13,7,13,12,
        8,9,14,8,14,13,
        9,10,15,9,15,14*/

for(var i=0; i<2; i++) {
    for(var j=0; j<indices.length; j++) {
        fi.push(i + indices[j]);
    }
}
console.log(fi);
console.log(Math.max(...fi));

var iterator = Math.max(...fi);


for(var i=0; i<2; i++) {
    for(var j=0; j<indices.length; j++) {
        fi.push(iterator + indices[j] + 1);
    }
}
console.log(fi);


/*
var tempVertices = [];
var vertices = new Float32Array();

var wallHeight = 10;

tempVertices.push(points.pointCenter2.join());
tempVertices.push(points.pointCenter2.join());
tempVertices.push(points.pointCenter1.join());
tempVertices.push(points.pointCenter1.join());

console.log(tempVertices)*/



var tempArr=[];
for(var i=0; i<indices.length; i+=3){
    tempArr.push(new THREE.Face3(indices[i],indices[i+1],indices[i+2]));
}

console.log(tempArr)


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
    camera.position.set(0, 0, 1000);

    // line material

    var textureLoader = new THREE.TextureLoader();
    textureLoader.load('./textures/monthly.png', function (texture) {
        console.log('texture loaded');
        var material = new THREE.MeshBasicMaterial({
            color: 0xff0000,
            map: texture
        });
        var mesh = new THREE.Mesh(new THREE.BoxGeometry(10,10,10), material);
        scene.add(mesh);
        render();

        console.log(mesh);
    });

    var Orbitcontrols = new THREE.OrbitControls(camera,renderer.domElement);
    Orbitcontrols.update();

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
