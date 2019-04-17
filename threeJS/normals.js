normalController = function(_meshes,_object, _camera,_dom){

    this.walls = _meshes;
    this.objects = _object;
    this.camera = _camera;

};
normalController.prototype = {
    init : function(){
        this.raycaster = new THREE.Raycaster();
        this.normalMatrix = new THREE.Matrix3();
        this.worldNormal = new THREE.Vector3();
        this.lookAtVec = new THREE.Vector3();
    },
    update : function(mouse) {
        //console.log(mouse);
        this.raycaster.setFromCamera(mouse, this.camera);
        var intersects = this.raycaster.intersectObjects(this.walls, true);
        this.objects.visible = (intersects.length > 0);
        for(var i = 0; i < intersects.length; i++) {

            this.normalMatrix.getNormalMatrix(intersects[i].object.matrixWorld);
            this.worldNormal.copy(intersects[i].face.normal).applyMatrix3(this.normalMatrix).normalize();
            this.objects.position.addVectors(intersects[i].point, this.worldNormal);
            this.lookAtVec.addVectors(this.objects.position,this.worldNormal);
            this.objects.lookAt(this.lookAtVec);


            // this.objects.position.copy(intersects[i].point);
            // this.objects.lookAt((intersects[i].face.normal).multiplyScalar(15).normalize()   );
            // this.objects.updateMatrixWorld();

        }
    },
    /*mouseMove : function(event) {
        console.log(this.mouse);
       this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }*/
};






var meshes = [];
var mouse  = new THREE.Vector2();

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight, 0.1, 1000);

camera.position.set(0,0,100);

var renderer = new THREE.WebGLRenderer({
    antialias:true
});

renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

var controls = new THREE.OrbitControls(camera,renderer.domElement);

var colorBox = new THREE.Mesh(new THREE.BoxGeometry(50,50,50,1,1), new THREE.MeshBasicMaterial({ color: 'maroon' }));
var wireBox = new THREE.Mesh(new THREE.BoxGeometry(50,50,50,1,1), new THREE.MeshBasicMaterial({ color: 'brown', wireframe:true }));
wireBox.add(colorBox);
scene.add(wireBox);
meshes.push(wireBox);


var normal = new THREE.Matrix3();

var axisHelper = new THREE.AxesHelper(15);
scene.add(axisHelper);


function onMouseMove(event){
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    //normalFinder.update(mouse);
}

normalFinder = new normalController(meshes,axisHelper,camera,renderer.domElement);
normalFinder.init();

animate();

window.addEventListener("mousemove",onMouseMove,false);

function animate(){
    requestAnimationFrame(animate);
    normalFinder.update(mouse);

    wireBox.rotation.x += 0.0125;
    wireBox.rotation.y += 0.0125;
    wireBox.rotation.z += 0.0125;
    renderer.render(scene,camera);

}





