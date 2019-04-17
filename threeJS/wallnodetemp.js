/**
 * Created by Singh on 7/30/2018.
 */

var renderer, scene, camera;

init();
animate();


function init() {
    wallsGeometry = function(totalPoints,distances){


        var material = new THREE.MeshBasicMaterial({/*color: 0xff0000,*/ side: THREE.DoubleSide, wireframe : false  });
        var material2 = new THREE.MeshBasicMaterial({/*color: 0x0044400, */side: THREE.DoubleSide, wireframe : false});

        var geometry = new THREE.BufferGeometry();
        var geometry2 = new THREE.BufferGeometry();

        var wallHeight = 200;

        var finalIndices = [];
        var finalIndices2 = [];


        var tempVerMesh = [];
        var tempVerMesh2 = [];


        var UVs = [];
        var UVs2 = [];



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
        //var topIndicesPatternLower = [0,1,6,0,6,5];
        var topIndicesPatternUpper = [totalPoints.center.length,totalPoints.center.length+1,1,totalPoints.center.length,1,0];
        var topIndicesPatternLower = [0,1,totalPoints.center.length+1,0,totalPoints.center.length+1,totalPoints.center.length];

        for(var wall = 0; wall <= 1; wall++) {
            //vertices lower
            if(wall == 0) {
                for (var i = 0; i < totalPoints.lower.length; i++) {
                    pointsArray.pointLower1 = totalPoints.lower[i];
                    tempVerMesh.push(pointsArray.pointLower1.x, pointsArray.pointLower1.y + wallHeight, pointsArray.pointLower1.z);
                    UVs.push(i / wallSegments, 0);
                }
            }
            else {             //vertices upper

                for (var i = 0; i < totalPoints.upper.length; i++) {
                    pointsArray.pointUpper1 = totalPoints.upper[i];
                    tempVerMesh2.push(pointsArray.pointUpper1.x, pointsArray.pointUpper1.y + wallHeight, pointsArray.pointUpper1.z);
                    UVs2.push(1 - i / wallSegments,0);
                }
            }
        }
        for (var i = 0; i < totalPoints.center.length; i++) {
            pointsArray.pointCenter1 = totalPoints.center[i];
            tempVerMesh.push(pointsArray.pointCenter1.x, pointsArray.pointCenter1.y + wallHeight, pointsArray.pointCenter1.z);
            UVs.push(i / wallSegments, 1);

             tempVerMesh2.push(pointsArray.pointCenter1.x, pointsArray.pointCenter1.y + wallHeight, pointsArray.pointCenter1.z);
             UVs2.push(1 - i / wallSegments,1);
        }
        //indices
        for (var i = 0; i < wallSegments-1; i++) {
            for (var j = 0; j < topIndicesPatternLower.length; j++) {
                finalIndices.push(i + topIndicesPatternLower[j]);
            }
        }
        for (var i = 0; i < wallSegments-1; i++) {
            for (var j = 0; j < topIndicesPatternUpper.length; j++) {
                finalIndices2.push(i + topIndicesPatternUpper[j]);
            }
        }



        //sending front
        //indices
        var incrementor = Math.max(...finalIndices);

        var frontIndicesPatternLower = [];
        for(var i = 0; i<topIndicesPatternLower.length;i++){
            frontIndicesPatternLower[i] = (1+incrementor+topIndicesPatternLower[i]);
        }
        for(var i=0; i<wallSegments-1; i++) {
            for (var j = 0; j < frontIndicesPatternLower.length; j++) {
                finalIndices.push(i + frontIndicesPatternLower[j]);
            }
        }

        var incrementor2 = Math.max(...finalIndices2);

        var frontIndicesPatternUpper = [];
        for(var i = 0; i<topIndicesPatternUpper.length;i++){
            frontIndicesPatternUpper[i] = (1+incrementor2+topIndicesPatternUpper[i]);
        }
        for(var i=0; i<wallSegments-1; i++) {
            for (var j = 0; j < frontIndicesPatternUpper.length; j++) {
                finalIndices2.push(i + frontIndicesPatternUpper[j]);
            }
        }

        //vertices lower
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

        //vertices upper
        for (var i = 0; i < totalPoints.upper.length; i++) {
            pointsArray.pointUpper1 = totalPoints.upper[i];
            tempVerMesh2.push(pointsArray.pointUpper1.x, pointsArray.pointUpper1.y, pointsArray.pointUpper1.z);
            UVs2.push(1 - i / wallSegments,0);
        }
        for (var i = 0; i < totalPoints.upper.length; i++) {
            pointsArray.pointUpper1 = totalPoints.upper[i];
            tempVerMesh2.push(pointsArray.pointUpper1.x, pointsArray.pointUpper1.y + wallHeight, pointsArray.pointUpper1.z);
            UVs2.push(1 - i / wallSegments,1);
        }



       //sending back
        //indices
        incrementor = Math.max(...finalIndices);
        var backIndicesPatternLower = [];
        for(var i = 0; i<topIndicesPatternLower.length;i++){
            backIndicesPatternLower[i] = (1+incrementor+topIndicesPatternLower[i]);
        }
        for(var i=0; i<wallSegments-1; i++) {
            for (var j = 0; j < backIndicesPatternLower.length; j++) {
                finalIndices.push(i + backIndicesPatternLower[j]);
            }
        }
        incrementor2 = Math.max(...finalIndices2);
        var backIndicesPatternUpper = [];
        for(var i = 0; i<topIndicesPatternUpper.length;i++){
            backIndicesPatternUpper[i] = (1+incrementor2+topIndicesPatternUpper[i]);
        }
        for(var i=0; i<wallSegments-1; i++) {
            for (var j = 0; j < backIndicesPatternUpper.length; j++) {
                finalIndices2.push(i + backIndicesPatternUpper[j]);
            }
        }
        //vertices
        for (var i = 0; i < totalPoints.center.length; i++) {
            pointsArray.pointCenter1 = totalPoints.center[i];
            tempVerMesh.push(pointsArray.pointCenter1.x, pointsArray.pointCenter1.y + wallHeight, pointsArray.pointCenter1.z);
            tempVerMesh2.push(pointsArray.pointCenter1.x, pointsArray.pointCenter1.y + wallHeight, pointsArray.pointCenter1.z);

            UVs.push(i/wallSegments,1);
            UVs2.push(1 - i/wallSegments,1);

        }
        for (var i = 0; i < totalPoints.center.length    ; i++) {
            pointsArray.pointCenter1 = totalPoints.center[i];
            tempVerMesh.push(pointsArray.pointCenter1.x, pointsArray.pointCenter1.y, pointsArray.pointCenter1.z);
            tempVerMesh2.push(pointsArray.pointCenter1.x, pointsArray.pointCenter1.y, pointsArray.pointCenter1.z);
            UVs.push(i/wallSegments,0);
            UVs2.push(1 - i/wallSegments,0);

        }

        //sending bottom
        //indices
        incrementor = Math.max(...finalIndices);
        var bottomIndicesPatternLower = [];
        for(var i = 0; i<topIndicesPatternLower.length;i++){
            bottomIndicesPatternLower[i] = (1+incrementor+topIndicesPatternLower[i]);
        }
        for(var i=0; i<wallSegments-1; i++) {
            for (var j = 0; j < bottomIndicesPatternLower.length; j++) {
                finalIndices.push(i + bottomIndicesPatternLower[j]);
            }
        }

        incrementor2 = Math.max(...finalIndices2);
        var bottomIndicesPatternUpper = [];
        for(var i = 0; i<topIndicesPatternUpper.length;i++){
            bottomIndicesPatternUpper[i] = (1+incrementor2+topIndicesPatternUpper[i]);
        }
        for(var i=0; i<wallSegments-1; i++) {
            for (var j = 0; j < bottomIndicesPatternUpper.length; j++) {
                finalIndices2.push(i + bottomIndicesPatternUpper[j]);

            }
        }
        //vertices
        for(var wall = 0; wall <= 1; wall++) {
            if(wall == 0) {
                for (var i = 0; i < totalPoints.lower.length; i++) {
                    pointsArray.pointLower1 = totalPoints.lower[i];
                    tempVerMesh.push(pointsArray.pointLower1.x, pointsArray.pointLower1.y, pointsArray.pointLower1.z);
                    UVs.push(i / wallSegments, 0);
                }
            }
            else {
                for (var i = 0; i < totalPoints.upper.length; i++) {
                    pointsArray.pointUpper1 = totalPoints.upper[i];
                    tempVerMesh2.push(pointsArray.pointUpper1.x, pointsArray.pointUpper1.y, pointsArray.pointUpper1.z);
                    UVs2.push(i / wallSegments, 0);
                }
            }
        }
        for (var i = 0; i < totalPoints.center.length; i++) {
            pointsArray.pointCenter1 = totalPoints.center[i];
            tempVerMesh.push(pointsArray.pointCenter1.x, pointsArray.pointCenter1.y, pointsArray.pointCenter1.z);
            UVs.push(i/wallSegments,1);

            tempVerMesh2.push(pointsArray.pointCenter1.x, pointsArray.pointCenter1.y, pointsArray.pointCenter1.z);
            UVs2.push(i/wallSegments,1);
        }



        //sending left
        //indices
        var leftIndicesPatternLower = [0,1,2,0,2,3];
             incrementor = Math.max(...finalIndices);
               for(var i = 0; i<leftIndicesPatternLower.length;i++){
                   leftIndicesPatternLower[i] = (1+incrementor+leftIndicesPatternLower[i]);
               }
        for(var i=0; i<1; i++) {
            for (var j = 0; j < leftIndicesPatternLower.length; j++) {
                finalIndices.push(i + leftIndicesPatternLower[j]);
            }
        }

        var leftIndicesPatternUpper = [1,0,3,1,3,2];
        incrementor2 = Math.max(...finalIndices2);
        for(var i = 0; i<leftIndicesPatternUpper.length;i++){
            leftIndicesPatternUpper[i] = (1+incrementor2+leftIndicesPatternUpper[i]);
        }
        for(var i=0; i<1; i++) {
            for (var j = 0; j < leftIndicesPatternUpper.length; j++) {
                finalIndices2.push(i + leftIndicesPatternUpper[j]);
            }
        }

        //vertices
        pointsArray.pointCenter1 = totalPoints.center[0];
        tempVerMesh.push(pointsArray.pointCenter1.x, pointsArray.pointCenter1.y, pointsArray.pointCenter1.z);
        UVs.push(0,1);

        tempVerMesh2.push(pointsArray.pointCenter1.x, pointsArray.pointCenter1.y, pointsArray.pointCenter1.z);
        UVs2.push(0,1);


        pointsArray.pointLower1 = totalPoints.lower[0];
        tempVerMesh.push(pointsArray.pointLower1.x, pointsArray.pointLower1.y, pointsArray.pointLower1.z);
        UVs.push(0, 0);
        tempVerMesh.push(pointsArray.pointLower1.x, pointsArray.pointLower1.y + wallHeight, pointsArray.pointLower1.z);
        UVs.push(1,0);

        pointsArray.pointCenter1 = totalPoints.center[0];
        tempVerMesh.push(pointsArray.pointCenter1.x, pointsArray.pointCenter1.y + wallHeight, pointsArray.pointCenter1.z);
        UVs.push(1,1);

    //left upper
        pointsArray.pointUpper1 = totalPoints.upper[0];
        tempVerMesh2.push(pointsArray.pointUpper1.x, pointsArray.pointUpper1.y, pointsArray.pointUpper1.z);
        UVs2.push(0, 0);
        tempVerMesh2.push(pointsArray.pointUpper1.x, pointsArray.pointUpper1.y + wallHeight, pointsArray.pointUpper1.z);
        UVs2.push(1,0);

        pointsArray.pointCenter1 = totalPoints.center[0];
        tempVerMesh2.push(pointsArray.pointCenter1.x, pointsArray.pointCenter1.y + wallHeight, pointsArray.pointCenter1.z);
        UVs2.push(1,1);

        //sending right
        //indices
        var rightIndicesPatternLower = [1,0,3,1,3,2];

        incrementor = Math.max(...finalIndices);
        for(var i = 0; i<rightIndicesPatternLower.length;i++){
            rightIndicesPatternLower[i] = (1+incrementor+rightIndicesPatternLower[i]);
        }
        for(var i=0; i<1; i++) {
            for (var j = 0; j < rightIndicesPatternLower.length; j++) {
                finalIndices.push(i + rightIndicesPatternLower[j]);
            }
        }

        var rightIndicesPatternUpper = [0,1,2,0,2,3];

        incrementor2 = Math.max(...finalIndices2);
        for(var i = 0; i<rightIndicesPatternUpper.length;i++){
            rightIndicesPatternUpper[i] = (1+incrementor2+rightIndicesPatternUpper[i]);
        }
        for(var i=0; i<1; i++) {
            for (var j = 0; j < rightIndicesPatternUpper.length; j++) {
                finalIndices2.push(i + rightIndicesPatternUpper[j]);
            }
        }

        //vertices
        pointsArray.pointCenter1 = totalPoints.center[ totalPoints.center.length-1];
        tempVerMesh.push(pointsArray.pointCenter1.x, pointsArray.pointCenter1.y, pointsArray.pointCenter1.z);
        UVs.push(0,1);

        tempVerMesh2.push(pointsArray.pointCenter1.x, pointsArray.pointCenter1.y, pointsArray.pointCenter1.z);
        UVs2.push(0,1);

        pointsArray.pointLower1 = totalPoints.lower[totalPoints.center.length-1];
        tempVerMesh.push(pointsArray.pointLower1.x, pointsArray.pointLower1.y, pointsArray.pointLower1.z);
        UVs.push(0, 0);

        tempVerMesh.push(pointsArray.pointLower1.x, pointsArray.pointLower1.y + wallHeight, pointsArray.pointLower1.z);
        UVs.push(1,0);

        pointsArray.pointCenter1 = totalPoints.center[totalPoints.center.length-1];
        tempVerMesh.push(pointsArray.pointCenter1.x, pointsArray.pointCenter1.y + wallHeight, pointsArray.pointCenter1.z);
        UVs.push(1,1);

        //right upper
        pointsArray.pointUpper1 = totalPoints.upper[totalPoints.upper.length-1];
        tempVerMesh2.push(pointsArray.pointUpper1.x, pointsArray.pointUpper1.y, pointsArray.pointUpper1.z);
        UVs2.push(0, 0);

        tempVerMesh2.push(pointsArray.pointUpper1.x, pointsArray.pointUpper1.y + wallHeight, pointsArray.pointUpper1.z);
        UVs2.push(1,0);

        pointsArray.pointCenter1 = totalPoints.center[totalPoints.center.length-1];
        tempVerMesh2.push(pointsArray.pointCenter1.x, pointsArray.pointCenter1.y + wallHeight, pointsArray.pointCenter1.z);
        UVs2.push(1,1);


        var vertices = new Float32Array(tempVerMesh);
        var indices = new Uint32Array( finalIndices );

        var uvs = new Float32Array(UVs);

                geometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
                geometry.setIndex(new THREE.BufferAttribute(indices, 1));
                geometry.addAttribute('uv', new THREE.BufferAttribute(uvs, 2));

                geometry.computeFaceNormals();
                geometry.computeVertexNormals();
                console.log(geometry);

                var mesh = new THREE.Mesh(geometry, material);

       var vertices2 = new Float32Array(tempVerMesh2);
        var uvs2 = new Float32Array(UVs2);
        var indices2 = new Uint32Array(finalIndices2);

        geometry2.addAttribute('position', new THREE.BufferAttribute(vertices2, 3));
        geometry2.setIndex(new THREE.BufferAttribute(indices2, 1));
        geometry2.addAttribute('uv', new THREE.BufferAttribute(uvs2, 2));
        geometry2.computeFaceNormals();
        geometry2.computeVertexNormals();

        var mesh2 = new THREE.Mesh(geometry2, material2);

        //return [mesh];

        return [mesh,mesh2];

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
        center : [new THREE.Vector3(-70, 0, 0),new THREE.Vector3(0, 0, 0),new THREE.Vector3(50, 0, 0),new THREE.Vector3(100, 0, 0),new THREE.Vector3(130, 0, 0),new THREE.Vector3(150, 0, 0)],
        lower : [new THREE.Vector3(-70, 0, 20),new THREE.Vector3(0, 0, 20),new THREE.Vector3(50, 0, 20),new THREE.Vector3(100, 0, 20),new THREE.Vector3(130, 0, 20),new THREE.Vector3(150, 0, 20)],
        upper : [new THREE.Vector3(-70, 0, -20),new THREE.Vector3(0, 0, -20),new THREE.Vector3(50, 0, -20),new THREE.Vector3(100, 0, -20),new THREE.Vector3(130, 0, -20),new THREE.Vector3(150, 0, -20)]
    };

    var tempPoints = createWallPoints(totalPoints.center);
    console.log(tempPoints);


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

        var intersects = rayCaster.intersectObject(mesh[1], true);
        var i, il, intersect;
        if (intersects[0]) {
            var face = intersects[0].face;
            var point = intersects[0].point;
            var object = intersects[0].object;
            updateArrow(object, point, face);
        }
    }

    function createWallPoints(centerPoints) {
        var wallThickness = 1.0;
        var totalPoints = {
            center : [],
            lower : [],
            upper: []
        };
        var tempPoints = { // for testing
            pointUpper: new THREE.Vector2(),
            pointCenter: new THREE.Vector3(),
            pointLower: new THREE.Vector2(),
        };

        for(var i = 0; i < centerPoints.length; i++  ){
            tempPoints.pointCenter = centerPoints[i];

            totalPoints.center.push(new THREE.Vector3(tempPoints.pointCenter.x,0,tempPoints.pointCenter.z));
            totalPoints.lower.push(new THREE.Vector3(tempPoints.pointCenter.x,0,(tempPoints.pointCenter.z + wallThickness * 0.5)));
            totalPoints.upper.push(new THREE.Vector3(tempPoints.pointCenter.x,0,-(tempPoints.pointCenter.z + wallThickness * 0.5)));
        }
        return totalPoints;
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

    textureLoader.load('./textures/Capture.PNG', function (texture) {
        console.log('texture loaded');
        texture.minFilter = THREE.LinearFilter;
        mesh[1].material.map = texture;
        scene.add(mesh[1]);
        var vertexNormalsHelper = new THREE.VertexNormalsHelper( mesh[1], 10 );
        mesh[1].add( vertexNormalsHelper );
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

