var date = new Date();
var seconds = date.getTime() ;


var scene = new THREE.Scene();


var camera = new THREE.PerspectiveCamera(60,                                        //FOV
                                         window.innerWidth/window.innerHeight,      //ASPECT RATIO
                                         0.1,                                        //NEAR PLANE
                                         1000);                                    //FAR PLANE

//Resposition the camera
camera.position.set(0,30,50);

//point the camera at given coordinate
camera.lookAt(new THREE.Vector3(0,0,0));

//Adding the renderer.

var renderer = new THREE.WebGLRenderer({antialias : true});


//SET THE SIZE
renderer.setSize(window.innerWidth,window.innerHeight);

// Set a near white clear color (default is black)
renderer.setClearColor( 0xfff6e6 );


//APPEND TO THE DOCUMENT
document.body.appendChild(renderer.domElement);

//first we create the geometry
var octaGeometry = new THREE.BoxGeometry(10,10,10);

//Uniforms
 var _uniforms = {
     time: {
         value: 0
     }
 };


//then we add the material to that geometry
var octaMaterial = new THREE.ShaderMaterial ({
    uniforms: _uniforms, 
    vertexShader: document.getElementById( 'vertexShader' ).textContent,
	fragmentShader: document.getElementById( 'fragmentShader' ).textContent
});

//then we add both geometry and material to the mesh

var shapeOne = new THREE.Mesh( octaGeometry, octaMaterial );
///shapeOne.position.y += 10;
//shapeOne.rotateZ(Math.PI/3);

scene.add(shapeOne);

//var ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
//scene.add(ambientLight);


//Render the scene/camera combination
function animate() {
    var date = new Date();
    var seconds = Math.ceil(date.getSeconds()) ;

    console.log(seconds);
    shapeOne.material.uniforms.time.value = seconds ;
    renderer.render(scene,camera);
    requestAnimationFrame(animate);
}

animate();


//LETS SET UP THE ORBITAL CONTROLS

var controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.target = new THREE.Vector3(0,0,0);
//controls.maxPolarAngle = Math.PI / 2;
controls.addEventListener('change', function() { renderer.render(scene,camera); });