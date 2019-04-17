if (!Detector.webgl)
    Detector.addGetWebGLMessage();

var Decoration = function() {

    THREE.Group.apply(this, arguments);


    // A random color assignment
    var colors = ['#ff0051', '#f56762', '#a53c6c', '#f19fa0', '#72bdbf', '#47689b'];

    var octaGeom = new THREE.Mesh(new THREE.OctahedronGeometry(20, 1),
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
    var shapeOne = new THREE.Mesh(new THREE.CylinderGeometry(10, 13, 17, 13, 10),
        new THREE.MeshStandardMaterial({
            color: 0xf8db08,
            flatShading: true,
            metalness: 0,
            roughness: 0.8,
            refractionRatio: 0.25
        })
    );

    shapeOne.position.y += 14;
    shapeOne.castShadow = true;
    shapeOne.receiveShadow = true;
    this.add(shapeOne);

    //Torus on top of cylinder

    var shapeTwo = new THREE.Mesh(new THREE.TorusGeometry(6, 2, 12, 8, Math.PI),
        new THREE.MeshStandardMaterial({
            color: 0xf8db08,
            flatShading: true,
            metalness: 0,
            roughness: 0.8,
            refractionRatio: 0.25
        })
    );

    shapeTwo.position.y += 20;
    shapeTwo.castShadow = true;
    shapeTwo.receiveShadow = true;
    this.add(shapeTwo);
};

Decoration.prototype = Object.create(THREE.Group.prototype);
Decoration.prototype.constructor = Decoration;


var renderer, scene, camera, mouse, raycaster, isShiftDown = false;
var rollOverRender, gridRender, planeCastRender, ambientLightRender, directionalLightRender;
var cubeGeo, cubeMaterial;
var objects = [];

var intersects, controls;

var isCursorMoved = false;
var isMouseDown = false;

init();
render();

function rollOverFunc() {

    var rollOverGeo, rollOverMat, rollOverMesh;

    //Rollover Helper Mesh

    rollOverGeo = new THREE.OctahedronGeometry(20, 1);
    rollOverMat = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        opacity: 0.5,
        transparent: true
    });

    rollOverMesh = new THREE.Mesh(rollOverGeo, rollOverMat);

    return rollOverMesh;
}

function gridHelperFunc() {
    return new THREE.GridHelper(800, 20);
}

function planeForCastFunc() {
    return new THREE.Mesh(new THREE.PlaneBufferGeometry(800, 800).rotateX(-Math.PI / 2),
        new THREE.MeshBasicMaterial({ color: 0xffff00, visible: true }));

}

function ambientLightFunc() {
    return new THREE.AmbientLight(0x606060);
}

function directionalLightFunc() {
    return new THREE.DirectionalLight({
        color: 0xffffff
    });
}

function setUpRaycaster() {
    event.preventDefault();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    mouse.set(mouse.x, mouse.y);

    //send the ray 

    raycaster.setFromCamera(mouse, camera);
    intersects = raycaster.intersectObjects(objects, true);
    /*
        intersects.sort(function(a, b) {
            return (a.distance - b.distance);
        });*/
    return intersects;
}

/* function drawMeshWithTexture() {
    cubeGeo = new THREE.BoxGeometry(40, 40, 40);
    cubeMaterial = new THREE.MeshLambertMaterial({
        color: 0xfeb74c,
        map: new THREE.TextureLoader().load("textures/monthly.png")
    });
    var voxel = new THREE.Mesh(cubeGeo, cubeMaterial);
    return voxel;
} */
function onDocumentMouseMove(event) {

    intersects = setUpRaycaster(event);
    if ((intersects.length) > 0) {
        var intersect = intersects[0];

        rollOverRender.position.copy(intersect.point).add(intersect.face.normal);
        rollOverRender.position.divideScalar(40).floor().multiplyScalar(40).addScalar(20);

    }
    isCursorMoved = true;

    //console.log(isCursorMoved, isMouseDown);
    render();
}


function onDocumentMouseDown(event) {
    isMouseDown = true;
    isCursorMoved = false;

    intersects = setUpRaycaster(event);
    if (intersects.length > 0) {
        var intersect = intersects[0];
        if (intersect.object.parent instanceof Decoration) {
            console.log("in else if");
            var selected;
            selected = intersect.object.parent;
            selected.position.copy(intersect.point).add(intersect.face.normal);
            selected.position.divideScalar(40).floor().multiplyScalar(40).addScalar(20);
        } else
            controls.enabled = false;

    } else
        controls.enabled = true;
    console.log(isCursorMoved, isMouseDown);
    render();
}

function onDocumentMouseUp(event) {

    console.log(isCursorMoved, isMouseDown);
    intersects = setUpRaycaster(event);
    console.log(objects);
    console.log(intersects);
    //console.log(intersects);
    if (intersects.length > 0) {
        // controls.enabled = false;
        var intersect = intersects[0];
        if (isShiftDown) {
            if (intersect.object.parent != Decoration) {
                console.log('removing');
                scene.remove(intersect.object.parent);
                objects.splice(objects.indexOf(intersect.object), 1);
            }
        }
        /*else if (intersect.objects.parent instanceof Decoration) {
                   console.log("in else if");
                   var selected;
                   selected = intersect.objects.parent;
                   selected.position.copy(intersect.point).add(intersect.face.normal);
                  // selected.position.divideScalar(40).floor().multiplyScalar(40).addScalar(20);
               } */
        else {

            if (!isCursorMoved && isMouseDown) {
                isCursorMoved = true;
                isMouseDown = true;
                var decoration1 = new Decoration();
                /*
                if (intersect.objects.parent instanceof Decoration) {
                    var bbox = new THREE.Box3().setFromObject(intersect.objects);
                    decoration1.position.copy(intersect.objects.getWorldPosition());
                    decoration1.position.y += bbox.getSize().y;

                } else */
                {
                    decoration1.position.copy(intersect.point).add(intersect.face.normal);
                    decoration1.position.divideScalar(40).floor().multiplyScalar(40).addScalar(20);
                    scene.add(decoration1);
                    objects.push(decoration1);

                }
            } else {
                console.log("click not completed");
            }
        }
        //console.log(objects);

        // }

        // var voxel = drawMeshWithTexture();
        // voxel.position.copy(intersect.point).add(intersect.face.normal);
        // voxel.position.divideScalar(40).floor().multiplyScalar(40).addScalar(20);
        // scene.add(voxel);
        // objects.push(voxel);
        render();

    }



}

function onDocumentKeyDown(event) {
    switch (event.keyCode) {
        case 16:
            isShiftDown = true;
            break;
    }
}

function onDocumentKeyUp(event) {
    switch (event.keyCode) {
        case 16:
            isShiftDown = false;
            break;
    }
}



function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function init() {

    camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(500, 800, 1300);
    camera.lookAt(new THREE.Vector3());


    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);


    renderer = new THREE.WebGLRenderer({
        antialias: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);

    rollOverRender = rollOverFunc();
    scene.add(rollOverRender);

    gridRender = gridHelperFunc();
    scene.add(gridRender);

    planeCastRender = planeForCastFunc();
    scene.add(planeCastRender);
    objects.push(planeCastRender); // adding it to the objects array

    ambientLightRender = ambientLightFunc();
    scene.add(ambientLightRender);

    directionalLightRender = directionalLightFunc();
    directionalLightRender.position.set(1, 0.75, 0.5).normalize();
    scene.add(directionalLightRender);


    mouse = new THREE.Vector2();
    raycaster = new THREE.Raycaster();

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.target = new THREE.Vector3(0, 40, 0);
    controls.maxPolarAngle = Math.PI / 2;


    document.addEventListener("mousemove", onDocumentMouseMove, false);

    document.addEventListener("mousedown", onDocumentMouseDown, false);
    document.addEventListener("mouseup", onDocumentMouseUp, false);
    document.addEventListener("keydown", onDocumentKeyDown, false);
    document.addEventListener("keyup", onDocumentKeyUp, false);

    document.addEventListener('resize', onWindowResize, false);

}

function render() {
    renderer.render(scene, camera);
}