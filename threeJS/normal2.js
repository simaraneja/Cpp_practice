normalController = function(_meshes,_object, _camera,_dom){
/*

    var Signal = signals.Signal;

    this.signals = {
        objectSelected : new Signal(),
        objectUnselected : new Signal()
    };
*/

    this.walls = _meshes;
    this.objects = _object;
    this.camera = _camera;

};
normalController.prototype = {
    init : function(){
        this.raycasterWalls = new THREE.Raycaster();

        this.raycasterObjs = new THREE.Raycaster();
        this.normalMatrix = new THREE.Matrix3();
        this.worldNormal = new THREE.Vector3();
        this.lookAtVec = new THREE.Vector3();
        this.intersectsObjs = [];
        this.intersectsWalls = [];

    },
    update : function(mouse,selectedObject) {
        var position, direction;
        //if(this.intersects.length > 0){
        this.raycasterWalls.setFromCamera(mouse, this.camera);
        this.intersectsWalls = this.raycasterWalls.intersectObjects(this.walls, true);
        //console.log(this.intersectsWalls.length + "  walls");

        for(var i = 0; i < this.intersectsWalls.length; i++) {
                    //console.log(mouse);
                    this.normalMatrix.getNormalMatrix(this.intersectsWalls[0].object.matrixWorld);
                    this.worldNormal.copy(this.intersectsWalls[0].face.normal).applyMatrix3(this.normalMatrix).normalize();
                    selectedObject.position.addVectors(this.intersectsWalls[0].point, this.worldNormal);
                    this.lookAtVec.addVectors(selectedObject.position, this.worldNormal);
                    selectedObject.lookAt(this.lookAtVec);
            }
            /*console.log(intersects.length + 'in else');
            position = this.raycaster.ray.origin.clone();
            direction = this.raycaster.ray.direction.clone();
            position.add(direction.multiplyScalar(100));
            this.objects.position.copy(position);
            this.objects.lookAt(this.camera.position);*/

    },
    mousePoint : function(mouse){
        this.raycasterObjs.setFromCamera(mouse, this.camera);
        this.intersectsObjs = this.raycasterObjs.intersectObjects(this.objects, true);
        //console.log(this.intersectsObjs.length + "  mousePoint");
        if (this.intersectsObjs.length){
            var object = this.intersectsObjs[0].object;
            this.update(mouse,object);
        }
    }
    /*mouseMove : functioouse);
       this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }*/
};







var walls = [];
var objects = [];
var mouse  = new THREE.Vector3();
var mouseDown = mouseMove = false;


var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight, 0.1, 1000);

camera.position.set(0,0,150);

var renderer = new THREE.WebGLRenderer({
    antialias:true
});


renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

var controls = new THREE.OrbitControls(camera,renderer.domElement);

var colorBox = new THREE.Mesh(new THREE.BoxGeometry(40,60,10,1,1), new THREE.MeshBasicMaterial({ color: 'maroon'/*, side: THREE.DoubleSide*/ }));
var wireBox = new THREE.Mesh(new THREE.BoxGeometry(40,60,10,1,1), new THREE.MeshBasicMaterial({ color: Math.random()*0xffffff, /*side: THREE.DoubleSide,*/ wireframe:false }));

//wireBox.add(colorBox);

wireBox.position.x = -40;
wireBox.rotateY(THREE.Math.degToRad(30));
scene.add(wireBox);
walls.push(wireBox);


var wireBox2 = wireBox.clone();
wireBox2.position.x = -65;
wireBox2.position.z = 35;
wireBox2.rotateY(THREE.Math.degToRad(50));
scene.add(wireBox2);
walls.push(wireBox2);


var wireBox3 = wireBox.clone();
wireBox3.position.x = 2;
wireBox3.position.z = -10;
wireBox3.rotateY(THREE.Math.degToRad(-30));
scene.add(wireBox3);
walls.push(wireBox3);


var wireBox4 = wireBox.clone();
wireBox4.position.x = 45;
wireBox4.position.z = -2;
wireBox4.rotateY(THREE.Math.degToRad(-50));
scene.add(wireBox4);
walls.push(wireBox4);


var wireBox5 = wireBox2.clone();
wireBox5.position.x = 73;
wireBox5.position.z = 30;
wireBox5.rotateY(THREE.Math.degToRad(25));
scene.add(wireBox5);
walls.push(wireBox5);

var wireBox6 = wireBox.clone();
wireBox6.position.x = 0;
wireBox6.position.y = 30;
wireBox6.position.z = 30;
//wireBox6.material.color.setHex(0xff0000);
wireBox6.rotateY(THREE.Math.degToRad(-120));
wireBox6.rotateX(THREE.Math.degToRad(90));

scene.add(wireBox6);
walls.push(wireBox6);

var frame = new THREE.Mesh(new THREE.BoxGeometry(10,13,1.05), new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('textures/Capture.png',function(texture){
        texture.minFilter = THREE.LinearFilter;scene.add(frame);
        objects.push(frame);

        var frame2 = frame.clone();
        frame2.position.x = -10;
        scene.add(frame2);
        objects.push(frame2);

        var frame3 = frame.clone();
        frame3.position.x = 10;
        scene.add(frame3);
        objects.push(frame3);

        var frame4 = frame.clone();
        frame4.position.y = 10;
        scene.add(frame4);
        objects.push(frame4);

        var frame5 = frame.clone();
        frame5.position.y = -10;
        scene.add(frame5);
        objects.push(frame5);

    })}));

window.addEventListener('mousedown',onMouseDown,false);
window.addEventListener("mousemove",onMouseMove,false);
window.addEventListener('mouseup',onMouseUp,false);


function onMouseDown(event){
    controls.enabled = false;

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    mouse.z = 0;
    mouseDown = true;
    animate();
}

function onMouseMove(event){

    if(mouseDown)
    {
        controls.enabled = false;
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        mouse.z = 0;
        animate();

    }
}

function onMouseUp(){
    //controls.enabled = true;
    mouseDown = false;
}

normalFinder = new normalController(walls,objects,camera,renderer.domElement);
normalFinder.init();

animate();





function animate(){
    //requestAnimationFrame(animate);
    normalFinder.mousePoint(mouse);
/*   wireBox.rotation.x += 0.0125;
    wireBox.rotation.y += 0.0125;
    wireBox.rotation.z += 0.0125;*/
    renderer.render(scene,camera);

}





