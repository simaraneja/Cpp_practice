/**
 * Created by Singh on 7/30/2018.
 */

var renderer, scene, camera;

init();
animate();


function init() {
    wallsGeometry = function(totalPoints){


        var material = new THREE.MeshBasicMaterial({/*color: 0xff0000,*/ side: THREE.DoubleSide, wireframe : false  });
        var material2 = new THREE.MeshBasicMaterial({/*color: 0x0044400, */side: THREE.DoubleSide, wireframe : true});

        var geometry = new THREE.BufferGeometry();
        var geometry2 = new THREE.BufferGeometry();

        var wallHeight = 200;

        /*
         var pointindices = [
         0,1,2,0,2,3,   //left

         5,4,7,5,7,6,   //right

         4,0,3,4,3,7,  //back

         1,5,6,1,6,2,    //front

         2,6,7,2,7,3,    //top

         5,1,0,5,0,4,  //bottom

         ];*/

        var finalIndices = [];


        var tempVerMesh = [];
        var tempVerMesh2 = [];


        var UVs = [];


        var pointsArray = { // for testing
            pointUpper1: new THREE.Vector3(),
            pointUpper2: new THREE.Vector3(),
            pointCenter1: new THREE.Vector3(),
            pointCenter2: new THREE.Vector3(),
            pointLower1: new THREE.Vector3(),
            pointLower2: new THREE.Vector3()
        };

        /* function generateUVs(geometry) {
         geometry.computeBoundingBox();

         var max = geometry.boundingBox.max, min = geometry.boundingBox.min;

         var offset = new THREE.Vector3(0 - min.x, 0 - min.y);
         var range = new THREE.Vector3(max.x - min.x, max.y - min.y);
         var faces = geometry.faces;

         geometry.faceVertexUvs[0] = [];

         for (var i = 0; i < faces.length ; i++) {

         var v1 = geometry.vertices[faces[i].a],
         v2 = geometry.vertices[faces[i].b],
         v3 = geometry.vertices[faces[i].c];

         geometry.faceVertexUvs[0].push([
         new THREE.Vector3((v1.x + offset.x)/range.x ,(v1.y + offset.y)/range.y),
         new THREE.Vector3((v2.x + offset.x)/range.x ,(v2.y + offset.y)/range.y),
         new THREE.Vector3((v3.x + offset.x)/range.x ,(v3.y + offset.y)/range.y),
         ]);
         }
         geometry.uvsNeedUpdate = true;
         return geometry;
         }*/

        var wallSegments = totalPoints.center.length;
        //sending top
        //indices
        var topIndicesPatternLower = [0,1,6,0,6,5];

        //vertices
        for (var i = 0; i < totalPoints.lower.length; i++) {
            pointsArray.pointLower1 = totalPoints.lower[i];
            tempVerMesh.push(pointsArray.pointLower1.x, pointsArray.pointLower1.y + wallHeight, pointsArray.pointLower1.z);
            UVs.push(i / wallSegments, 0);
        }
        for (var i = 0; i < totalPoints.center.length; i++) {
            pointsArray.pointCenter1 = totalPoints.center[i];
            tempVerMesh.push(pointsArray.pointCenter1.x, pointsArray.pointCenter1.y + wallHeight, pointsArray.pointCenter1.z);
            UVs.push(i/wallSegments,1);
        }
        for(var i=0; i<4; i++) {
            for (var j = 0; j < topIndicesPatternLower.length; j++) {
                finalIndices.push(i + topIndicesPatternLower[j]);
            }
        }


        //sending front
        //indices
        var incrementor = Math.max(...finalIndices);

        var frontIndicesPattern = [];
        for(var i = 0; i<topIndicesPatternLower.length;i++){
            frontIndicesPattern[i] = (1+incrementor+topIndicesPatternLower[i]);
        }
        for(var i=0; i<4; i++) {
            for (var j = 0; j < frontIndicesPattern.length; j++) {
                finalIndices.push(i + frontIndicesPattern[j]);
            }
        }
        //vertices
        for (var i = 0; i < totalPoints.lower.length; i++) {
            pointsArray.pointLower1 = totalPoints.lower[i];
            tempVerMesh.push(pointsArray.pointLower1.x, pointsArray.pointLower1.y, pointsArray.pointLower1.z);
            UVs.push(i / wallSegments, 0);
        }
        for (var i = 0; i < totalPoints.lower.length; i++) {
            pointsArray.pointLower1 = totalPoints.lower[i];
            tempVerMesh.push(pointsArray.pointLower1.x, pointsArray.pointLower1.y + wallHeight, pointsArray.pointLower1.z);
            UVs.push(i / wallSegments, 1);
        }



        //sending back
        //indices
        incrementor = Math.max(...finalIndices);
        var backIndicesPattern = [];
        for(var i = 0; i<topIndicesPatternLower.length;i++){
            backIndicesPattern[i] = (1+incrementor+topIndicesPatternLower[i]);
        }
        for(var i=0; i<4; i++) {
            for (var j = 0; j < backIndicesPattern.length; j++) {
                finalIndices.push(i + backIndicesPattern[j]);
            }
        }
        //vertices
        for (var i = 0; i < totalPoints.center.length; i++) {
            pointsArray.pointCenter1 = totalPoints.center[i];
            tempVerMesh.push(pointsArray.pointCenter1.x, pointsArray.pointCenter1.y + wallHeight, pointsArray.pointCenter1.z);
            UVs.push(i/wallSegments,1);
        }
        for (var i = 0; i < totalPoints.center.length    ; i++) {
            pointsArray.pointCenter1 = totalPoints.center[i];
            tempVerMesh.push(pointsArray.pointCenter1.x, pointsArray.pointCenter1.y, pointsArray.pointCenter1.z);
            UVs.push(i/wallSegments,0);
        }

        //sending bottom
        //indices
        incrementor = Math.max(...finalIndices);
        var bottomIndicesPattern = [];
        for(var i = 0; i<topIndicesPatternLower.length;i++){
            bottomIndicesPattern[i] = (1+incrementor+topIndicesPatternLower[i]);
        }
        for(var i=0; i<4; i++) {
            for (var j = 0; j < bottomIndicesPattern.length; j++) {
                finalIndices.push(i + bottomIndicesPattern[j]);
            }
        }
        //vertices
        for (var i = 0; i < totalPoints.lower.length; i++) {
            pointsArray.pointLower1 = totalPoints.lower[i];
            tempVerMesh.push(pointsArray.pointLower1.x, pointsArray.pointLower1.y, pointsArray.pointLower1.z);
            UVs.push(i/wallSegments, 0);
        }
        for (var i = 0; i < totalPoints.center.length; i++) {
            pointsArray.pointCenter1 = totalPoints.center[i];
            tempVerMesh.push(pointsArray.pointCenter1.x, pointsArray.pointCenter1.y, pointsArray.pointCenter1.z);
            UVs.push(i/wallSegments,1);
        }



        //sending left
        //indices
        var leftIndicesPattern = [0,1,2,0,2,3];

        incrementor = Math.max(...finalIndices);
        for(var i = 0; i<leftIndicesPattern.length;i++){
            leftIndicesPattern[i] = (1+incrementor+leftIndicesPattern[i]);
            console.log(leftIndicesPattern);
        }
        for(var i=0; i<1; i++) {
            for (var j = 0; j < leftIndicesPattern.length; j++) {
                finalIndices.push(i + leftIndicesPattern[j]);
            }
        }
        //vertices
        pointsArray.pointCenter1 = totalPoints.center[0];
        tempVerMesh.push(pointsArray.pointCenter1.x, pointsArray.pointCenter1.y, pointsArray.pointCenter1.z);
        UVs.push(0,1);

        pointsArray.pointLower1 = totalPoints.lower[0];
        tempVerMesh.push(pointsArray.pointLower1.x, pointsArray.pointLower1.y, pointsArray.pointLower1.z);
        UVs.push(0, 0);

        pointsArray.pointLower1 = totalPoints.lower[0];
        tempVerMesh.push(pointsArray.pointLower1.x, pointsArray.pointLower1.y + wallHeight, pointsArray.pointLower1.z);
        UVs.push(1,0);

        pointsArray.pointCenter1 = totalPoints.center[0];
        tempVerMesh.push(pointsArray.pointCenter1.x, pointsArray.pointCenter1.y + wallHeight, pointsArray.pointCenter1.z);
        UVs.push(1,1);


        //sending right
        //indices
        var rightIndicesPattern = [1,0,3,1,3,2];

        incrementor = Math.max(...finalIndices);
        for(var i = 0; i<rightIndicesPattern.length;i++){
            rightIndicesPattern[i] = (1+incrementor+rightIndicesPattern[i]);
            console.log(leftIndicesPattern);
        }
        for(var i=0; i<1; i++) {
            for (var j = 0; j < rightIndicesPattern.length; j++) {
                finalIndices.push(i + rightIndicesPattern[j]);
            }
        }
        //vertices
        pointsArray.pointCenter1 = totalPoints.center[ totalPoints.center.length-1];
        tempVerMesh.push(pointsArray.pointCenter1.x, pointsArray.pointCenter1.y, pointsArray.pointCenter1.z);
        UVs.push(0,1);

        pointsArray.pointLower1 = totalPoints.lower[totalPoints.center.length-1];
        tempVerMesh.push(pointsArray.pointLower1.x, pointsArray.pointLower1.y, pointsArray.pointLower1.z);
        UVs.push(0, 0);

        pointsArray.pointLower1 = totalPoints.lower[totalPoints.center.length-1];
        tempVerMesh.push(pointsArray.pointLower1.x, pointsArray.pointLower1.y + wallHeight, pointsArray.pointLower1.z);
        UVs.push(1,0);

        pointsArray.pointCenter1 = totalPoints.center[totalPoints.center.length-1];
        tempVerMesh.push(pointsArray.pointCenter1.x, pointsArray.pointCenter1.y + wallHeight, pointsArray.pointCenter1.z);
        UVs.push(1,1);


        /*          //sending upper vertices
         for (var i = 0; i < totalPoints.upper.length    ; i++) {
         pointsArray.pointUpper1 = totalPoints.upper[i];

         tempVerMesh.push(pointsArray.pointUpper1.x, pointsArray.pointUpper1.y, pointsArray.pointUpper1.z);
         tempVerMesh.push(pointsArray.pointUpper1.x, pointsArray.pointUpper1.y + wallHeight, pointsArray.pointUpper1.z );
         /!* tempVerMesh2.push(pointsArray.pointCenter1.x, pointsArray.pointCenter1.y, pointsArray.pointCenter1.z);
         tempVerMesh2.push(pointsArray.pointUpper1.x, pointsArray.pointUpper1.y, pointsArray.pointUpper1.z);
         tempVerMesh2.push(pointsArray.pointUpper1.x, pointsArray.pointUpper1.y + wallHeight, pointsArray.pointUpper1.z );
         tempVerMesh2.push(pointsArray.pointCenter1.x, pointsArray.pointCenter1.y + wallHeight, pointsArray.pointCenter1.z);*!/
         }



         //sending upper vertices
         for (var i = 0; i < totalPoints.upper.length    ; i++) {
         pointsArray.pointUpper1 = totalPoints.upper[i];

         tempVerMesh.push(pointsArray.pointUpper1.x, pointsArray.pointUpper1.y, pointsArray.pointUpper1.z);
         tempVerMesh.push(pointsArray.pointUpper1.x, pointsArray.pointUpper1.y + wallHeight, pointsArray.pointUpper1.z );
         /!* tempVerMesh2.push(pointsArray.pointCenter1.x, pointsArray.pointCenter1.y, pointsArray.pointCenter1.z);
         tempVerMesh2.push(pointsArray.pointUpper1.x, pointsArray.pointUpper1.y, pointsArray.pointUpper1.z);
         tempVerMesh2.push(pointsArray.pointUpper1.x, pointsArray.pointUpper1.y + wallHeight, pointsArray.pointUpper1.z );
         tempVerMesh2.push(pointsArray.pointCenter1.x, pointsArray.pointCenter1.y + wallHeight, pointsArray.pointCenter1.z);*!/
         }*/
        var vertices = new Float32Array(tempVerMesh);
        var indices = new Uint32Array( finalIndices );

        var vertices2 = new Float32Array(tempVerMesh2);

        var uvs = new Float32Array(UVs);

        geometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
        geometry.setIndex(new THREE.BufferAttribute(indices, 1));
        geometry.addAttribute('uv', new THREE.BufferAttribute(uvs, 2));

        geometry.computeFaceNormals();
        geometry.computeVertexNormals();
        console.log(geometry);

        /*                var geom = new THREE.Geometry().fromBufferGeometry(geometry);
         var temp = generateUVs(geom);
         geometry = new THREE.BufferGeometry().fromGeometry(temp);*/
        var mesh = new THREE.Mesh(geometry, material);



        /* var indices2 = new Uint32Array(tempIndices);
         geometry2.addAttribute('position', new THREE.BufferAttribute(vertices2, 3));
         geometry2.setIndex(new THREE.BufferAttribute(indices2, 1));



         geometry2.computeFaceNormals();
         geometry2.computeVertexNormals();

         var geom = new THREE.Geometry().fromBufferGeometry(geometry2);
         var temp = generateUVs(geom);
         geometry2 = new THREE.BufferGeometry().fromGeometry(temp);
         var mesh2 = new THREE.Mesh(geometry2, material2);*/


        //geometry2.addAttribute('uv', new THREE.BufferAttribute(uvs2, 2));


        return [mesh]//,mesh2];

    };

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 400;

    scene = new THREE.Scene();

    var arrow;
    var rayCaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    renderer.domElement.addEventListener("mousemove", onMouseMove);

    var points = {
        pointUpper1: new THREE.Vector3(-70, 0, -20),
        pointUpper2: new THREE.Vector3(130, 0, -20),
        pointCenter1: new THREE.Vector3(-100, 0, 0),
        pointCenter2: new THREE.Vector3(150, 0, 0),
        pointLower1: new THREE.Vector3(-70, 0, 20),
        pointLower2: new THREE.Vector3(130, 0, 20)
    };

    var totalPoints = {
        center : [new THREE.Vector3(-70, 0, 0),new THREE.Vector3(0, 0, 0),new THREE.Vector3(50, 0, 0),new THREE.Vector3(100, 0, 0),new THREE.Vector3(130, 0, 0)],
        lower : [new THREE.Vector3(-70, 0, 20),new THREE.Vector3(0, 0, 20),new THREE.Vector3(50, 0, 20),new THREE.Vector3(100, 0, 20),new THREE.Vector3(130, 0, 20)],
        upper : [new THREE.Vector3(-70, 0, -20),new THREE.Vector3(0, 0, -20),new THREE.Vector3(50, 0, -20),new THREE.Vector3(100, 0, -20),new THREE.Vector3(130, 0, -20)]
    };

    var sphere = new THREE.SphereGeometry(2, 10, 10);

    function initPoints(){
        var point1mesh = new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({color: 0xff00}));
        point1mesh.position.copy(points.pointUpper1);
        scene.add(point1mesh);

        var point2mesh = new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({color: 0x0000ff}));
        point2mesh.position.copy(points.pointUpper2);
        scene.add(point2mesh);

        var point3mesh = new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({color: 0xff00}));
        point3mesh.position.copy(points.pointCenter1);
        scene.add(point3mesh);

        var point4mesh = new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({color: 0x0000ff}));
        point4mesh.position.copy(points.pointCenter2);
        scene.add(point4mesh);

        var point5mesh = new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({color: 0xff00}));
        point5mesh.position.copy(points.pointLower1);
        scene.add(point5mesh);

        var point6mesh = new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({color: 0x0000ff}));
        point6mesh.position.copy(points.pointLower2);
        scene.add(point6mesh);
    }
    initPoints();

    var mesh = new wallsGeometry(totalPoints);



    function createArrow() {
        var length = 30;
        arrow = new THREE.ArrowHelper(
            THREE.Object3D.DefaultUp,
            new THREE.Vector3(),
            length,
            0xffff00,
            1.5 * length,
            1.25 * length
        );
        arrow.position.z = 10;
        scene.add(arrow);
    }
    // arrow
    createArrow();

    function updateArrow(object, point, face) {
        arrow.position.copy(point);
        var normalMatrix = new THREE.Matrix3().getNormalMatrix( object.matrixWorld );
        var normal = face.normal.clone().applyMatrix3( normalMatrix ).normalize();
        arrow.setDirection(normal);
    }

    function onMouseMove(event) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        rayCaster.setFromCamera(mouse, camera);

        var intersects = rayCaster.intersectObject(mesh[0], true);
        var i, il, intersect;
        if (intersects[0]) {
            var face = intersects[0].face;
            var point = intersects[0].point;
            var object = intersects[0].object;
            updateArrow(object, point, face);
        }
    }


    var textureLoader = new THREE.TextureLoader();
    textureLoader.load('./textures/Capture.PNG', function (texture) {
        console.log('texture loaded');
        texture.minFilter = THREE.LinearFilter;

        mesh[0].material.map = texture;
        scene.add(mesh[0]);
        var vertexNormalsHelper = new THREE.VertexNormalsHelper( mesh[0], 10 );
        mesh[0].add( vertexNormalsHelper );
    });

    textureLoader.load('./textures/abc.jpg', function (texture) {
        console.log('texture loaded');
        texture.minFilter = THREE.LinearFilter;
        //mesh[1].material.map = texture;
        //scene.add(mesh[1]);
        //var vertexNormalsHelper = new THREE.VertexNormalsHelper( mesh[1], 10 );
        // mesh[1].add( vertexNormalsHelper );
    });
    //


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

