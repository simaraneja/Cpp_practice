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
  vertex_loader.load(vertex_url, function (vertex_text) {
    var fragment_loader = new THREE.XHRLoader(THREE.DefaultLoadingManager); 
    fragment_loader.setResponseType('text');
    fragment_loader.load(fragment_url, function (fragment_text) {
      onLoad(vertex_text, fragment_text);
    });
  }, onProgress, onError);
}

// ============================================================================



var isUserInteracting = false,
onMouseDownMouseX = 0, onMouseDownMouseY = 0,
lon = 0, onMouseDownLon = 0,
lat = 0, onMouseDownLat = 0,
phi = 0, theta = 0, radius = 2;
var date = new Date();
var seconds = date.getTime() ;


var scene = new THREE.Scene();


var camera = new THREE.PerspectiveCamera(75,                                        //FOV
                                         window.innerWidth/window.innerHeight,      //ASPECT RATIO
                                         1,                                        //NEAR PLANE
                                         1100);                                    //FAR PLANE

//Resposition the camera
camera.position.set(0,0,4);

camera.target = new THREE.Vector3(0,0,0);

//point the camera at given coordinate
//camera.lookAt(new THREE.Vector3(0,0,0));

//Adding the renderer.

var renderer = new THREE.WebGLRenderer({antialias : true});


//SET THE SIZE
renderer.setSize(window.innerWidth,window.innerHeight);

// Set a near white clear color (default is black)
renderer.setClearColor( 0xfff6e6 );


//APPEND TO THE DOCUMENT
document.body.appendChild(renderer.domElement);

//first we create the geometry

/*
octaGeometry.scale.x = -1;
octaGeometry.scale.y = 1;
octaGeometry.scale.z = 1;
*/
//Uniforms
 var _uniforms = {
     time: {
         value: 0
     },
     u_texture: {
         value: new THREE.TextureLoader().load("textures/abc.jpg")
     }
 };

ShaderLoader('shaders/vertex.vert','shaders/fragment.frag',
             function(vertex,fragment){
            var bufferScene = new THREE.Scene();
            var bufferTexture = new THREE.WebGLRenderTarget (
                window.innerWidth, window.innerHeight, {
                    minFilter : THREE.LinearFilter,
                    magFilter : THREE.NearestFilter
                });
            var octaGeometry = new THREE.SphereGeometry(2,64,64);
            //octaGeometry.scale(1,1,1);
    
            var octaMaterial = new THREE.MeshBasicMaterial({
                map: new THREE.TextureLoader().load("textures/abc.jpg"),
                side: THREE.DoubleSide
            });/*new THREE.ShaderMaterial ({
                uniforms: _uniforms, 
                vertexShader: vertex,
	            fragmentShader: fragment,
                side: THREE.DoubleSide
            });*/
    
            var shapeOne = new THREE.Mesh( octaGeometry, octaMaterial );
            //shapeOne.position.z = 1;
            bufferScene.add(shapeOne);
    
    
    //Main Sphere
    
            //var outerSphereGeom = new THREE.SphereGeometry(radius+8,64,64);
            var outerSphereGeom  = new THREE.BoxGeometry(5,5,5);
            outerSphereGeom.scale(1,1,1);

            var outerSphereMat = new THREE.MeshBasicMaterial({
                map: bufferTexture,
                color: 0xff0000,
                side: THREE.DoubleSide
            });
    
            var outerSphere = new THREE.Mesh(outerSphereGeom,outerSphereMat);
            scene.add(outerSphere);
            //Render the scene/camera combination
    
            function animate() {
                requestAnimationFrame(animate);
                renderer.render( scene, camera, bufferTexture );
                //controls.update();
                renderer.render( scene, camera );
                update();
            }
    
        function update() {
            if ( isUserInteracting === false ) {
                lon += 0.1;
            }
            
            /*lat = Math.max( - 85, Math.min( 85, lat ) );
            phi = THREE.Math.degToRad( 90 - lat );
            theta = THREE.Math.degToRad( lon );
            camera.target.x = radius+8 * Math.sin( phi ) * Math.cos( theta );
            camera.target.y = radius+8 * Math.cos( phi );
            camera.target.z = radius+8 * Math.sin( phi ) * Math.sin( theta );*/
            camera.lookAt( camera.target );
				/*
				// distortion
				camera.position.copy( camera.target ).negate();
				*/
            //renderer.render( scene, camera );
        }
    animate();
})

var controls = new THREE.OrbitControls( camera, renderer.domElement );
//var controls = new THREE.TrackballControls(camera);
//controls.target = new THREE.Vector3(10,0,0);
//controls.maxPolarAngle = Math.PI / 2;
//controls.addEventListener('change', function() { renderer.render(scene,camera); });
