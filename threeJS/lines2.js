/**
 * Created by Simar on 7/12/2018.
 */


var renderer, scene, camera;
var line;
var count = 0;
var mouse = new THREE.Vector3();

init();
animate();

function init() {

	// renderer
	renderer = new THREE.WebGLRenderer();

	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	// scene
	scene = new THREE.Scene();

	// camera
	camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
	camera.position.set(0, 0, 1000);

	// geometry
	var geometry = new THREE.BufferGeometry();
	var MAX_POINTS = 500;
	positions = new Float32Array(MAX_POINTS * 3);
	geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));

	// material
	var material = new THREE.LineBasicMaterial({
		color: 0xff0000,
		linewidth: 160
	});

	// line
	line = new THREE.Line(geometry, material);
	scene.add(line);

	document.addEventListener("mousemove", onMouseMove, false);
	document.addEventListener('mousedown', onMouseDown, false);
}

// update line
function updateLine() {
	positions[count * 3 - 3] = mouse.x;
	positions[count * 3 - 2] = mouse.y;
	positions[count * 3 - 1] = mouse.z;
	line.geometry.attributes.position.needsUpdate = true;
}

// mouse move handler
function onMouseMove(event) {
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
	mouse.z = 0;
	mouse.unproject(camera);

	console.log(positions);
	for(var i = 0; i < count; i++){
		console.log("point nr " + count + ": " + mouse.x + " " + mouse.y + " " + mouse.z);
		//console.log("in for loop" + " " + (positions[i * 3 + 0]));
	/*if (((mouse.x - (positions[i * 3 + 0]))===0) || ((mouse.y - (positions[i * 3 + 1]))===0)){
		console.log("line is parrallel to that point");
		console.log("Draw something");
	}*/
}

	if( count !== 0 ){
		updateLine();
	}

	/*if( count !== 0 ){
		updateLine();
	}*/
}

// add point
function addPoint(event){
	console.log("point nr " + count + ": " + mouse.x + " " + mouse.y + " " + mouse.z);
	positions[count * 3 + 0] = mouse.x;
	positions[count * 3 + 1] = mouse.y;
	positions[count * 3 + 2] = mouse.z;
	count++;
	line.geometry.setDrawRange(0, count);
	updateLine();
}

// mouse down handler
function onMouseDown(evt) {
	// on first click add an extra point
	if( count === 0 ){
		addPoint();
	}
	addPoint();
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
