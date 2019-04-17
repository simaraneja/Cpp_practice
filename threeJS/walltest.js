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
    camera.position.set(0, 0, 400);

    var point1 = new THREE.Vector3( 10,0,0 );
    var point2 = new THREE.Vector3( 40,0,0 );

    var vector12 = new THREE.Vector3().copy( point2 ).sub( point1 );
    var point3 = new THREE.Vector3().copy( vector12 ).multiplyScalar( 0.5 ).add( point1 );

    var wallHeight = 30;

    var sphere = new THREE.SphereGeometry( 2, 10, 10 );

    var point1mesh = new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xff0000 } ) );
    point1mesh.position.copy( point1 );
    scene.add( point1mesh );

    var point2mesh = new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x0000ff } ) );
    point2mesh.position.copy( point2 );
    scene.add( point2mesh );

    var plane = new THREE.PlaneGeometry( 1, 1, 1 );

    var wall = new THREE.Mesh( plane, new THREE.MeshBasicMaterial( { color: 0x00ff00, side : THREE.DoubleSide } ) );
    wall.position.copy( point3 );
    wall.position.y = wallHeight;
    wall.scale.x = vector12.length();
    wall.scale.y = wall.position.y * 2;
    wall.doubleSided = true;
    scene.add( wall );

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

/*

//Array of promises test
var promise1 = Promise.resolve(3);
var promise2 = 42;
var promise3 = new Promise(function(resolve, reject) {
    setTimeout(resolve, 100, 'foo');
});

Promise.all([promise1, promise2, promise3]).then(function(values) {
    console.log(values);
});*/

var octree;
var projector;
octree = new THREE.Octree( {
    // uncomment below to see the octree (may kill the fps)
    //scene: scene,
    // when undeferred = true, objects are inserted immediately
    // instead of being deferred until next octree.update() call
    // this may decrease performance as it forces a matrix update
    undeferred: false,
    // set the max depth of tree
    depthMax: Infinity,
    // max number of objects before nodes split or merge
    objectsThreshold: 8,
    // percent between 0 and 1 that nodes will overlap each other
    // helps insert objects that lie over more than one node
    overlapPct: 0.15
} );
var octreeObjects;
var intersectionsOC;


walls.forEach(function(wall){
    octree.add(wall);
});
/*var vector = new THREE.Vector3( this.mouse.x, this.mouse.y, 0.5 );
 projector.unprojectVector( vector, object );*/
var raycaster = new THREE.Raycaster( startPoint, direction );
 octreeObjects = octree.search( raycaster.ray.origin, raycaster.ray.far, true, raycaster.ray.direction );
 console.log(octreeObjects);
 intersectionsOC = raycaster.intersectOctreeObjects( octreeObjects );
