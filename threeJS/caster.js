var mouse = new THREE.Vector2();

//var raycaster = new THREE.Raycaster();

var camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 10000);

camera.position.set(500, 800, 1300);
var scene = new THREE.Scene();
scene.background = new THREE.Color(0xff00ff);
var raycaster = new THREE.Raycaster(camera.position, camera.getWorldDirection());

var planeCastRender, ambientLightRender;

var objects = [];

//camera.position.set(0, 30, 50);

//camera.lookAt(new THREE.Vector3(0, 15, 0));
camera.lookAt(new THREE.Vector3());



var renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

function planeForCastFunc() {
    return new THREE.Mesh(new THREE.PlaneBufferGeometry(800, 800).rotateX(-Math.PI / 2),
        new THREE.MeshBasicMaterial({ color: 0xffff00, visible: true }));

}
var controls = new THREE.OrbitControls(camera,renderer.domElement);

function ambientLightFunc() {
    return new THREE.AmbientLight(0x606060);
}

function onMouseMove(event) {

    console.log(event.clientX, event.clientY);

    console.log('window.innerWidth = ' + window.innerWidth);
    console.log('window.innerHeigth = ' + window.innerHeight);
    console.log('window width =' + window.outerWidth);

    console.log('(' + event.clientX + '/' + window.innerWidth + ') =' + (event.clientX / window.innerWidth));
    console.log('(' + event.clientX + '/' + window.innerWidth + ') * 2 =' + ((event.clientX / window.innerWidth) * 2));
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    console.log('(' + event.clientX + '/' + window.innerWidth + ')' + '*' + '2' + '-' + '1' + '=' + ((event.clientX / window.innerWidth) * 2 - 1));

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    console.log(mouse);


    //raycaster.setFromCamera(mouse, camera);
   raycaster = new THREE.Raycaster(camera.position, camera.getWorldDirection());

    // calculate objects intersecting the picking ray
    var intersects = raycaster.intersectObjects(scene.children);
    console.log(intersects);

    var intersect = intersects[0].object;
    console.log(intersect);
}

function render() {

    // update the picking ray with the camera and mouse position
    //raycaster.setFromCamera(mouse, camera);
   raycaster = new THREE.Raycaster(camera.position, camera.getWorldDirection());

    console.log(scene.children);

    // calculate objects intersecting the picking ray
    var intersects = raycaster.intersectObjects(scene.children);
    console.log(intersects);
    /*
    	for ( var i = 0; i < intersects.length; i++ ) {

    		intersects[ i ].objects.material.color.set( 0xff0000 );

    	}

    */


    ambientLightRender = ambientLightFunc();
    scene.add(ambientLightRender);

    planeCastRender = planeForCastFunc();
    scene.add(planeCastRender);
    objects.push(planeCastRender); // adding it to the objects array

    renderer.render(scene, camera);

}

window.addEventListener('click', onMouseMove, false);

window.requestAnimationFrame(render);