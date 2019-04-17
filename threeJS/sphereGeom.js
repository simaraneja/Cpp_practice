/**
 * This is a basic asyncronous shader loader for THREE.js.
 * 
 * It uses the built-in THREE.js async loading capabilities to load shaders from files!
 * 
 * `onProgress` and `onError` are standard THREE.js stuff. Look at 
 * https://threejs.org/examples/webgl_loader_obj.html for an example. 
 * 
 * @param {String} vertex_url URL to the vertex shader code.
 * @param {String} fragment_url URL to fragment shader code
 * @param {function(String, String)} onLoad Callback function(vertex, fragment) that take as input the loaded vertex and fragment contents.
 * @param {function} onProgress Callback for the `onProgress` event. 
 * @param {function} onError Callback for the `onError` event.
 */
function ShaderLoader(vertex_url, fragment_url, onLoad, onProgress, onError) {
    var vertex_loader = new THREE.XHRLoader(THREE.DefaultLoadingManager);
    vertex_loader.setResponseType('text');
    vertex_loader.load(vertex_url, function(vertex_text) {
        var fragment_loader = new THREE.XHRLoader(THREE.DefaultLoadingManager);
        fragment_loader.setResponseType('text');
        fragment_loader.load(fragment_url, function(fragment_text) {
            onLoad(vertex_text, fragment_text);
        });
    }, onProgress, onError);
}

// ============================================================================
/*
var isUserInteracting = false,
onMouseDownMouseX = 0, onMouseDownMouseY = 0,
lon = 0, onMouseDownLon = 0,
lat = 0, onMouseDownLat = 0,
phi = 0, theta = 0, 
*/



var radius = 5;
var date = new Date();
var seconds = date.getTime();


var scene = new THREE.Scene();


var camera = new THREE.PerspectiveCamera(75, //FOV
    window.innerWidth / window.innerHeight, //ASPECT RATIO
    1, //NEAR PLANE
    1100); //FAR PLANE

//Resposition the camera
camera.position.set(0, 0, 0);

camera.lookAt(new THREE.Vector3(0, 0, 0));

//point the camera at given coordinate
//camera.target(new THREE.Vector3(0,0,0));

//Adding the renderer.

var renderer = new THREE.WebGLRenderer({ antialias: true });

var clock = new THREE.Clock();

//SET THE SIZE
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xfff6e6);
document.body.appendChild(renderer.domElement);

//first we create the geometry
var octaGeometry = new THREE.SphereGeometry(radius, 64, 64);
//octaGeometry.scale(1,1,1);


//Uniforms
var _uniforms = {
    effect: {
        value: 0
    },
    progress: {
        value: 0
    },
    from: {
        value: new THREE.TextureLoader().load("textures/abc.jpg")
    },
    to: {
        value: new THREE.TextureLoader().load("textures/ccg_lab_003.jpg")
    }
};

var progress = 0;
var set = 1;
var button = 0,
    click = 0;
var oldTime = date.getTime();
var newTime = 0;
var btn, t;

function createButton() {
    btn = document.createElement("BUTTON");
    btn.setAttribute("id", "btn1");
    t = document.createTextNode("CLICK ME");
    btn.appendChild(t);

    btn2 = document.createElement("BUTTON");
    btn2.setAttribute("id", "btn2");
    t2 = document.createTextNode("EFFECT");
    btn2.appendChild(t2);

    document.body.appendChild(btn);
    document.body.appendChild(btn2);

    document.getElementById("btn2").style.left = "100px";
    document.getElementById("btn2").style.top = "200px";


}

createButton();



ShaderLoader('shaders/vertex.vert', 'shaders/fragment.frag',
    function(vertex, fragment) {

        var octaMaterial = new THREE.ShaderMaterial({
            uniforms: _uniforms,
            vertexShader: vertex,
            fragmentShader: fragment,
            side: THREE.DoubleSide
        });

        var shapeOne = new THREE.Mesh(octaGeometry, octaMaterial);
        scene.add(shapeOne);

        //Render the scene/camera combination
        function animate() {
            var date = new Date();
            newTime = date.getTime();

            /*            if(set) {
                            oldTime = newTime;
                            set = 0;
                            console.log("TIME SET");
                        }*/

            //        var seconds = Math.ceil(date.getSeconds()) ;
            /*      
              if((newTime - oldTime) > 5000) {
                  button = !(button); 
                  oldTime = newTime;
                  console.log("TIME CROSSED 3000");
              }
              */
            if (button && progress < 1.0) {
                progress += 0.024;
            } else if (button && progress > 1.0) {
                progress = 1.0;
            }


            if (!button && progress > 0.0) {
                progress -= 0.024;
            } else if (!button && progress < 1.0) {
                progress = 0.0;
            }

            shapeOne.material.uniforms.progress.value = progress;

            if (click)
                shapeOne.material.uniforms.effect.value = 0;
            else
                shapeOne.material.uniforms.effect.value = 1;



            //    var delta = clock.getDelta();
            //renderer.render(scene,camera);
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
            //update();
        }

        function update() {
            /*if ( isUserInteracting === false ) {
                lon += 0.1;
            }*/



            camControls.lookSpeed = 0.4;
            camControls.movementSpeed = 10;
            camControls.noFly = true;
            camControls.lookVertical = true;
            camControls.constrainVertical = true;
            camControls.verticalMin = 1.0;
            camControls.verticalMax = 2.0;
            camControls.lon = 0;
            camControls.lat = 0;


            //     lat = Math.max( - 85, Math.min( 85, lat ) );
            //     lon = Math.max( -90, Math.min(90,lon));
            /*
            phi = THREE.Math.degToRad( 90 - lat );
            theta = THREE.Math.degToRad( lon );
            camera.target.x = radius * Math.sin( phi ) * Math.cos( theta );
            camera.target.y = radius * Math.cos( phi );
            camera.target.z = radius * Math.sin( phi ) * Math.sin( theta );
            */
            //camera.lookAt( camera.target );

            /*
            // distortion
            camera.position.copy( camera.target ).negate();
            */
            renderer.render(scene, camera);
        }
        animate();
    });

btn.addEventListener('click', function() {
    button = !(button);
    console.log(button);
});

btn2.addEventListener('click', function() {
    click = !(click);
});

//var controls = new THREE.OrbitControls( camera, renderer.domElement );
//var controls = new THREE.TrackballControls(camera);
//controls.target = new THREE.Vector3(10,0,0);
//controls.maxPolarAngle = Math.PI / 2;
//controls.addEventListener('change', function() { renderer.render(scene,camera); });