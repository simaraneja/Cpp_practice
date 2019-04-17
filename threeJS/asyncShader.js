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

var date = new Date();
var seconds = date.getTime();


var scene = new THREE.Scene();


var camera = new THREE.PerspectiveCamera(60, //FOV
    window.innerWidth / window.innerHeight, //ASPECT RATIO
    0.1, //NEAR PLANE
    1000); //FAR PLANE

//Resposition the camera
camera.position.set(0, 30, 50);

//point the camera at given coordinate
camera.lookAt(new THREE.Vector3(0, 0, 0));

//Adding the renderer.

var renderer = new THREE.WebGLRenderer({ antialias: true });


//SET THE SIZE
renderer.setSize(window.innerWidth, window.innerHeight);

// Set a near white clear color (default is black)
renderer.setClearColor(0xfff6e6);


//APPEND TO THE DOCUMENT
document.body.appendChild(renderer.domElement);

//first we create the geometry
var octaGeometry = new THREE.BoxGeometry(10, 10, 10);

//Uniforms
var _uniforms = {
    time: {
        value: 0
    }
};


ShaderLoader('shaders/vertex.vert', 'shaders/fragment.frag',
    function(vertex, fragment) {
        var octaMaterial = new THREE.ShaderMaterial({
            uniforms: _uniforms,
            vertexShader: vertex,
            fragmentShader: fragment
        });

        var shapeOne = new THREE.Mesh(octaGeometry, octaMaterial);
        scene.add(shapeOne);

        //Render the scene/camera combination
        function animate() {
            var date = new Date();
            var seconds = Math.ceil(date.getSeconds());

            console.log(seconds);
            shapeOne.material.uniforms.time.value = seconds;
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        }
        animate();
    }
);