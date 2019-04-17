/*
Firstly we need a Scene — a group or stage containing all the objects we want to render.
Scenes allow you to set up what and where is going to be rendered by Three.js.
This is where you place objects, lights, and cameras.
*/

var scene = new THREE.Scene();

/*
PerspectiveCamera: The first two parameters specify the field of view
and aspect ratio of the camera respectively. The last two parameters
represent the cutoff distances for objects that will be rendered
by this camera.
What that means, is that objects further away from the camera than the
value of far or closer than near won't be rendered. You don't have to
worry about this now, but you may want to use other values in your
apps to get better performance.
*/

//Adding the camera, FOV, aspect ratio and cutoff distances.

var camera = new THREE.PerspectiveCamera(60,                                        //FOV
                                         window.innerWidth/window.innerHeight,      //ASPECT RATIO
                                         0.1,                                        //NEAR PLANE
                                         1000);                                    //FAR PLANE

//Resposition the camera
camera.position.set(0,30,50);

//point the camera at given coordinate
camera.lookAt(new THREE.Vector3(0,15,0));

/*
The last critical piece of the puzzle is the renderer itself,
which handles the rendering of a Scene from a given camera angle
    This is where the magic happens.
    In addition to the WebGLRenderer we use here,
    three.js comes with a few others, often used as
    fallbacks for users with older browsers or for those
    who don't have WebGL support for some reason.
*/

//Adding the renderer.

var renderer = new THREE.WebGLRenderer({antialias : true});

/*
In addition to creating the renderer instance, we also need to set the size at
which we want it to render our app. It's a good idea to use the width and height
of the area we want to fill with our app - in this case, the width and height of
the browser window. For performance intensive apps, you can also give setSize
smaller values, like window.innerWidth/2 and window.innerHeight/2, which will
make the app render at half size.
*/
/*
If you wish to keep the size of your app but render it at a lower resolution,
you can do so by calling setSize with false as updateStyle (the third argument).
For example, setSize(window.innerWidth/2, window.innerHeight/2, false) will
render your app at half resolution, given that your <canvas> has 100% width and height.
*/

//SET THE SIZE
renderer.setSize(window.innerWidth,window.innerHeight);

// Set a near white clear color (default is black)
renderer.setClearColor( 0xfff6e6 );

//enable shadowMaps

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;



/*
Last but not least, we add the renderer element to our HTML document.
This is a <canvas> element the renderer uses to display the scene to us.
*/

//APPEND TO THE DOCUMENT
document.body.appendChild(renderer.domElement);



//LETS ADD GEOMETRY
// A mesh is created from the geometry and material, then added to the scene
//Adding the flat plane.


/*
    var plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5,5,5,5),
    new THREE.MeshBasicMaterial({ color:0x22ee22, wireframe : true })
);
plane.rotateX(Math.PI/2);
scene.add(plane);
*/


//first we create the geometry
var octaGeometry = new THREE.OctahedronGeometry(10,1);

//then we add the material to that geometry
var octaMaterial = new THREE.MeshStandardMaterial ({
    color : 0xff0051,
    flatShading : true,
    metalness : 0,
    roughness : 0.8

});

//then we add both geometry and material to the mesh

var shapeOne = new THREE.Mesh( octaGeometry, octaMaterial );
shapeOne.position.y += 10;
shapeOne.rotateZ(Math.PI/3);


//now tell which mesh to cast the shadow.
shapeOne.castShadow = true;
scene.add(shapeOne);

//add another shape
var shapeTwo = new THREE.Mesh( 
    new THREE.OctahedronGeometry(5,1),
    new THREE.MeshStandardMaterial ({
        color: 0x47689b,
        flatShading : true,
        metalness : 0,
        roughness : 0.8
    })
);

shapeTwo.position.y += 5;
shapeTwo.position.x += 15;
shapeTwo.rotateZ(Math.PI/5);
shapeTwo.castShadow = true;

scene.add(shapeTwo);

/*
Once we have objects in our Scene, we need to light them.
To do this we’ll add two different varieties: ‘ambient’ and ‘point’ lights.

*/

//AMBIENT : This AmbientLight’s colour gets applied to all objects in the Scene globally.
var ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

//POINT : Point lights create a light at a specific position in the scene. The light shines in all directions, in roughly the same way as a light bulb.

var pointLight = new  THREE.PointLight(0xffffff, 1);
pointLight.position.set(25,50,25);

//Once we have the lights in the scene, we need to set the shadowMaps,
//by default, shadows are off, we need to enable that in renderer on the top, before appending to DOM.

//Create ShadowMap now after enabling it on top, and tell which light to create shadowMap and size of shadows

pointLight.castShadow = true;
pointLight.shadow.mapSize.width = 1024;
pointLight.shadow.mapSize.height = 1024;
scene.add(pointLight);



var shadowMaterial = new THREE.ShadowMaterial( { color: 0xeeddee } );
shadowMaterial.opacity = 0.7;

var groundMesh = new THREE.Mesh( 
    new THREE.BoxGeometry(100,.1,100),
    shadowMaterial
);
groundMesh.receiveShadow = true;
scene.add(groundMesh);



//Render the scene/camera combination
function animate() {
    renderer.render(scene,camera);
    requestAnimationFrame(animate);
}

animate();


//LETS SET UP THE ORBITAL CONTROLS

var controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.target = new THREE.Vector3(0,15,0);
controls.maxPolarAngle = Math.PI / 2;
controls.addEventListener('change', function() { renderer.render(scene,camera); });