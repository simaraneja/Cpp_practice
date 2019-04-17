var Decoration = function() {

    THREE.Group.apply(this, arguments);

    this.rotationSpeed = Math.random() * 0.07;
    this.rotationPosition = Math.random();

    // A random color assignment
    var colors = ['#ff0051', '#f56762', '#a53c6c', '#f19fa0', '#72bdbf', '#47689b'];

    var octaGeom = new THREE.Mesh(new THREE.OctahedronGeometry(10, 1),
        new THREE.MeshStandardMaterial({
            color: colors[Math.floor(Math.random() * colors.length)],

            flatShading: true,
            metalness: 0,
            roughness: 0.8
        })
    );

    octaGeom.castShadow = true;
    octaGeom.receiveShadow = true;
    octaGeom.rotateZ(Math.random() * Math.PI * 2);
    octaGeom.rotateY(Math.random() * Math.PI * 2);
    this.add(octaGeom);

    //Cylinder on top
    var shapeOne = new THREE.Mesh(new THREE.CylinderGeometry(4, 6, 10, 6, 1),
        new THREE.MeshStandardMaterial({
            color: 0xf8db08,
            flatShading: true,
            metalness: 0,
            roughness: 0.8,
            refractionRatio: 0.25
        })
    );

    shapeOne.position.y += 8;
    shapeOne.castShadow = true;
    shapeOne.receiveShadow = true;
    this.add(shapeOne);

    //Torus on top of cylinder

    var shapeTwo = new THREE.Mesh(new THREE.TorusGeometry(2, 1, 6, 4, Math.PI),
        new THREE.MeshStandardMaterial({
            color: 0xf8db08,
            flatShading: true,
            metalness: 0,
            roughness: 0.8,
            refractionRatio: 0.25
        })
    );

    shapeTwo.position.y += 13;
    shapeTwo.castShadow = true;
    shapeTwo.receiveShadow = true;
    this.add(shapeTwo);
};

Decoration.prototype = Object.create(THREE.Group.prototype);
Decoration.prototype.constructor = Decoration;
Decoration.prototype.updatePosition = function() {
    this.rotationPosition += this.rotationSpeed;
    this.rotation.y = (Math.sin(this.rotationPosition));
};


var decorations = [];

var mouse = new THREE.Vector2();
var raycaster = new THREE.Raycaster();

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.set(0, 30, 50);

camera.lookAt(new THREE.Vector3(0, 15, 0));

var renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);

renderer.setClearColor(0xfff6e6);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

document.body.appendChild(renderer.domElement);

var ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

var pointLight = new THREE.PointLight(0xffffff, 1);
scene.add(pointLight);

pointLight.castShadow = true;
pointLight.shadow.mapSize.width = 1024;
pointLight.shadow.mapSize.height = 1024;
pointLight.position.set(25, 50, 25);

scene.add(pointLight);

var shadowMaterial = new THREE.ShadowMaterial({
    color: 0xeeddee
});
shadowMaterial.opacity = 0.7;

var groundMesh = new THREE.Mesh(new THREE.BoxGeometry(100, 0.1, 100), shadowMaterial);
groundMesh.receiveShadow = true;
scene.add(groundMesh);

//add the scenes
var decoration1 = new Decoration();
decoration1.position.y += 10;
scene.add(decoration1);
decorations.push(decoration1);

var decoration2 = new Decoration();
decoration2.position.set(20, 15, -10);
decoration2.scale.set(0.8, 0.8, 0.8);
scene.add(decoration2);
decorations.push(decoration2);


var decoration3 = new Decoration();
decoration3.position.set(-20, 20, -12);
scene.add(decoration3);
decorations.push(decoration3);

var decoration4 = new Decoration();
decoration4.position.set(0, 30, -50);
scene.add(decoration4);
decorations.push(decoration4);
//renderer.render(scene,camera);


//renderer.render(scene,camera);

/*var controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.target = new THREE.Vector3(0,15,0);
controls.maxPolarAngle = Math.PI / 2;*/

window.requestAnimationFrame(render);

function onMouseMove(event) {

    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    console.log(mouse);

    raycaster.setFromCamera(mouse, camera);
    console.log("creating 5th objects");
    var decoration5 = new Decoration();
    var random = 50 + Math.floor(Math.random() * 10);

    var position = raycaster.ray.origin.clone();
    var direction = raycaster.ray.direction.clone();
    position.add(direction.multiplyScalar(random));

    decoration5.position.set(position.x, position.y, position.z);
    scene.add(decoration5);
    decorations.push(decoration5);
    console.log(decorations);
}


function render() {

    // controls.update();


    //ray casting code
    //raycaster.setFromCamera(mouse,camera);

    /* var intersects = raycaster.intersectObjects(scene.children);
    	for ( var i = 0; i < intersects.length; i++ ) {

		intersects[ i ].objects.material.color.set( 0xff0000 );

	}
    
    // Update the decoration positions
    for(var d = 0; d < decorations.length; d++) {
        decorations[d].updatePosition();
    }
*/
    // Render the scene/camera combnation
    renderer.render(scene, camera);

    // Repeat
    requestAnimationFrame(render);
}
window.addEventListener('click', onMouseMove, false);