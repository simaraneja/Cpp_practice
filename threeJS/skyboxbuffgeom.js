var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000);

camera.position.set(0, 0, 300);

camera.lookAt(new THREE.Vector3());

var renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);

renderer.setClearColor(0xfff000);


document.body.appendChild(renderer.domElement);

//var meshMaterial = new THREE.MeshLambertMaterial({ color: 0xCC0000 });
//var cubeMaterialArray = [];
// order to add materials: x+,x-,y+,y-,z+,z-
/*
cubeMaterialArray.push(new THREE.MeshBasicMaterial({ color: 0xff3333 }));
cubeMaterialArray.push(new THREE.MeshBasicMaterial({ color: 0xff8800 }));
cubeMaterialArray.push(new THREE.MeshBasicMaterial({ color: 0xffff33 }));
cubeMaterialArray.push(new THREE.MeshBasicMaterial({ color: 0x33ff33 }));
cubeMaterialArray.push(new THREE.MeshBasicMaterial({ color: 0x3333ff }));
cubeMaterialArray.push(new THREE.MeshBasicMaterial({ color: 0x8833ff }));
var cubeMaterials = new THREE.MeshFaceMaterial(cubeMaterialArray);
*/
var texture = new THREE.TextureLoader().load("textures/cubemap.jpg", function(tex) {
    console.log("inside callback");
});
texture.minFilter = THREE.LinearFilter;

var texMaterials = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide
});

//var geom = new THREE.Geometry();


/*

var v1 = new THREE.Vector3(100, 100, 100);
var v2 = new THREE.Vector3(100, 100, -100);
var v3 = new THREE.Vector3(100, -100, 100);
var v4 = new THREE.Vector3(100, -100, -100);
var v5 = new THREE.Vector3(-100, 100, -100);
var v6 = new THREE.Vector3(-100, 100, 100);
var v7 = new THREE.Vector3(-100, -100, -100);
var v8 = new THREE.Vector3(-100, -100, 100);

geom.vertices.push(v1);
geom.vertices.push(v2);
geom.vertices.push(v3);
geom.vertices.push(v4);
geom.vertices.push(v5);
geom.vertices.push(v6);
geom.vertices.push(v7);
geom.vertices.push(v8);

*/

 
/*

var uvFaces = [];
geom.faces.push(new THREE.Face3(0, 2, 1));
uvFaces.push(new THREE.Vector2(0, 1));
uvFaces.push(new THREE.Vector2(0, 0));
uvFaces.push(new THREE.Vector2(1 / 6, 1));
geom.faceVertexUvs[0].push(uvFaces);

uvFaces = [];
geom.faces.push(new THREE.Face3(2, 3, 1));
uvFaces.push(new THREE.Vector2(0, 0));
uvFaces.push(new THREE.Vector2(1 / 6, 0));
uvFaces.push(new THREE.Vector2(1 / 6, 1));
geom.faceVertexUvs[0].push(uvFaces);

uvFaces = [];

geom.faces.push(new THREE.Face3(4, 6, 5))
uvFaces.push(new THREE.Vector2(2 / 6, 1));
uvFaces.push(new THREE.Vector2(2 / 6, 0));
uvFaces.push(new THREE.Vector2(3 / 6, 1));
geom.faceVertexUvs[0].push(uvFaces);




uvFaces = [];
geom.faces.push(new THREE.Face3(6, 7, 5));
uvFaces.push(new THREE.Vector2(2 / 6, 0));
uvFaces.push(new THREE.Vector2(3 / 6, 0));
uvFaces.push(new THREE.Vector2(3 / 6, 1));
geom.faceVertexUvs[0].push(uvFaces);

uvFaces = [];
geom.faces.push(new THREE.Face3(4, 5, 1));
uvFaces.push(new THREE.Vector2(4 / 6, 1));
uvFaces.push(new THREE.Vector2(4 / 6, 0));
uvFaces.push(new THREE.Vector2(5 / 6, 1));
geom.faceVertexUvs[0].push(uvFaces);

uvFaces = [];

geom.faces.push(new THREE.Face3(5, 0, 1));
uvFaces.push(new THREE.Vector2(4 / 6, 0));
uvFaces.push(new THREE.Vector2(5 / 6, 0));
uvFaces.push(new THREE.Vector2(5 / 6, 1));
geom.faceVertexUvs[0].push(uvFaces);

uvFaces = [];




geom.faces.push(new THREE.Face3(7, 6, 2));
uvFaces.push(new THREE.Vector2(5 / 6, 1));
uvFaces.push(new THREE.Vector2(5 / 6, 0));
uvFaces.push(new THREE.Vector2(1, 1));
geom.faceVertexUvs[0].push(uvFaces);

uvFaces = [];
geom.faces.push(new THREE.Face3(6, 3, 2));
uvFaces.push(new THREE.Vector2(5 / 6, 0));
uvFaces.push(new THREE.Vector2(1, 0));
uvFaces.push(new THREE.Vector2(1, 1));
geom.faceVertexUvs[0].push(uvFaces);

uvFaces = [];

geom.faces.push(new THREE.Face3(5, 7, 0));
uvFaces.push(new THREE.Vector2(3 / 6, 1));
uvFaces.push(new THREE.Vector2(3 / 6, 0));
uvFaces.push(new THREE.Vector2(4 / 6, 1));
geom.faceVertexUvs[0].push(uvFaces);

uvFaces = [];
geom.faces.push(new THREE.Face3(7, 2, 0));
uvFaces.push(new THREE.Vector2(3 / 6, 0));
uvFaces.push(new THREE.Vector2(4 / 6, 0));
uvFaces.push(new THREE.Vector2(4 / 6, 1));
geom.faceVertexUvs[0].push(uvFaces);

uvFaces = [];
geom.faces.push(new THREE.Face3(1, 3, 4));
uvFaces.push(new THREE.Vector2(1 / 6, 1));
uvFaces.push(new THREE.Vector2(1 / 6, 0));
uvFaces.push(new THREE.Vector2(2 / 6, 1));
geom.faceVertexUvs[0].push(uvFaces);

uvFaces = [];
geom.faces.push(new THREE.Face3(3, 6, 4));
uvFaces.push(new THREE.Vector2(1 / 6, 0));
uvFaces.push(new THREE.Vector2(2 / 6, 0));
uvFaces.push(new THREE.Vector2(2 / 6, 1));
geom.faceVertexUvs[0].push(uvFaces);

*/

var geom = new THREE.BufferGeometry();

var vertices = new Float32Array([
    100, 100, 100,
    100, 100, -100,
    100, -100, 100,
    100, -100, -100,
    -100, 100, -100,
    -100, 100, 100,
    -100, -100, -100,
    -100, -100, 100
]);

var faceIndices = [0, 2, 1, 2, 3, 1, 4, 6, 5, 6, 7, 5, 4, 5, 1, 5, 0, 1, 7, 6, 2, 6, 3, 2, 5, 7, 0, 7, 2, 0, 1, 3, 4, 3, 6, 4];

var uvs = new Float32Array([
    0,   1,
    0,   0,
    1/6, 1,
    0,   0,
    1/6, 0,
    1/6, 1,
    2/6, 1,
    2/6, 0,
    3/6, 1,
    2/6, 0,
    3/6, 0,
    3/6, 1,
    4/6, 1,
    4/6, 0,
    5/6, 1,
    4/6, 0,
    5/6, 0,
    5/6, 1,
    5/6, 1,
    5/6, 0,
    1,   1,
    5/6, 0,
    1,   0,
    1,   1,
    3/6, 1,
    3/6, 0,
    4/6, 1,
    3/6, 0,
    4/6, 0,
    4/6, 1,
    1/6, 1,
    1/6, 0,
    2/6, 1,
    1/6, 0,
    2/6, 1,
    2/6, 1    
]);


geom.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
geom.addAttribute('uv', new THREE.BufferAttribute(uvs, 2));
geom.setIndex(new THREE.BufferAttribute(new Uint16Array(faceIndices), 1));


//geom.computeFaceNormals();
//geom.computeVertexNormals();
//geom.uvsNeedUpdate = true;

console.log(geom);
//var objects = new THREE.Mesh(geom, cubeMaterials);
var object = new THREE.Mesh(geom, texMaterials);
//objects.doubleSided = true;

scene.add(object);



/*
var octaGeometry = new THREE.BoxGeometry(100, 100, 100);

//then we add the material to that geometry
var octaMaterial = new THREE.MeshStandardMaterial({
    color: 0xff0051,
    flatShading: true,
    metalness: 0,
    roughness: 0.8,
    map: new THREE.TextureLoader().load("textures/monthly.png")

});
*/

//then we add both geometry and material to the mesh

// var shapeOne = new THREE.Mesh(octaGeometry, octaMaterial);


// scene.add(shapeOne);

var ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

var pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(-5, 0, 100);

scene.add(pointLight);


function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
animate();


var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.target = new THREE.Vector3(0, 15, 0);
//controls.maxPolarAngle = Math.PI / ;
controls.addEventListener('change', function() { renderer.render(scene, camera); });