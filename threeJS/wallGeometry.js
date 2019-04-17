/**
 * Created by Singh on 8/4/2018.
 */
/**
 * Created by Singh on 7/30/2018.
 */

var renderer, scene, camera;

init();
animate();


function init() {
    wallsGeometry = function(totalPoints) {

        //var rrnd = (min, max) => (Math.random() * (max - min)) + min
        var irnd = (rng) => (Math.random() * rng) | 0

        function makeRndCanvas(name) {
            var canvas = document.createElement('canvas');
            canvas.width = canvas.height = 64;
            var ctx = canvas.getContext('2d');
            ctx.fillStyle = `rgba(${irnd(256)},${irnd(256)},${irnd(256)},1.0)`
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            ctx.fillStyle = '#ffff00'
            ctx.fillText("CANV:" + name, 3, 32)
            return canvas;
        }


        function makeRndTexture(name) {
            var tex = new THREE.Texture(makeRndCanvas(name))
            tex.minFilter = // THREE.LinearMipMapLinearFilter;
                tex.magFilter = THREE.NearestFilter; //THREE.LinearFilter;

            tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
            //tex.repeat.set(0.01, 0.01);
            tex.needsUpdate = true;
            return tex;
        }

        var material = new THREE.MeshBasicMaterial({ /*color: 0xff0000,*/
            side: THREE.DoubleSide,
            wireframe: false,
            //map: makeRndTexture("MAT 1")
        });
        var material2 = new THREE.MeshBasicMaterial({ /*color: 0x0044400, */
            side: THREE.DoubleSide,
            wireframe: false,
            //map: makeRndTexture("MAT 2")
        });
        var material3 = new THREE.MeshBasicMaterial({ /*color: 0x0044400, */
            side: THREE.DoubleSide,
            wireframe: false,
            //map: makeRndTexture("MAT 3")
        });
        var material4 = new THREE.MeshBasicMaterial({ /*color: 0x0044400, */
            side: THREE.DoubleSide,
            wireframe: false,
            //map: makeRndTexture("MAT 3")
        });
        //var geometry = new THREE.BufferGeometry();

        //forGeometry
        //var geometry = new THREE.Geometry();


        var geometry2 = new THREE.BufferGeometry();

        var wallHeight = 200;


        var pointindices = [
            0, 1, 2, 0, 2, 3, //left

            5, 4, 7, 5, 7, 6, //right

            4, 0, 3, 4, 3, 7, //back

            1, 5, 6, 1, 6, 2, //front

            2, 6, 7, 2, 7, 3, //top

            5, 1, 0, 5, 0, 4, //bottom

        ];

        var pointindices2 = [
            0, 1, 2, 0, 2, 3, //left

            5, 4, 7, 5, 7, 6, //right

            4, 0, 3, 4, 3, 7, //back

            1, 5, 6, 1, 6, 2, //front

            2, 6, 7, 2, 7, 3, //top

            5, 1, 0, 5, 0, 4, //bottom
        ];

        var tempIndices = [];
        var tempIndices2 = [];



        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < pointindices.length; j++) {
                tempIndices[pointindices.length * i + j] = 4 * i + pointindices[j];
            }
        }
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < pointindices2.length; j++) {
                tempIndices2[pointindices2.length * i + j] = 4 * i + pointindices2[j];
            }
        }


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
        var wallSegments = totalPoints.center.length;

        console.log(totalPoints);

        function boxUnwrapUVs(geometry) {
            if (!geometry.boundingBox) geometry.computeBoundingBox();
            var sz = geometry.boundingBox.getSize(new THREE.Vector3());
            var center = geometry.boundingBox.getCenter(new THREE.Vector3())
            var min = geometry.boundingBox.min;
            if (geometry.faceVertexUvs[0].length == 0) {
                for (var i = 0; i < geometry.faces.length; i++) {
                    geometry.faceVertexUvs[0].push([new THREE.Vector2(), new THREE.Vector2(), new THREE.Vector2()]);
                }
            }
            for (var i = 0; i < geometry.faces.length; i++) {
                var face = geometry.faces[i];
                var faceUVs = geometry.faceVertexUvs[0][i]
                var va = geometry.vertices[geometry.faces[i].a]
                var vb = geometry.vertices[geometry.faces[i].b]
                var vc = geometry.vertices[geometry.faces[i].c]
                var vab = new THREE.Vector3().copy(vb).sub(va)
                var vac = new THREE.Vector3().copy(vc).sub(va)
                //now we have 2 vectors to get the cross product of...
                var vcross = new THREE.Vector3().copy(vab).cross(vac);
                //Find the largest axis of the plane normal...

                vcross.set(Math.abs(vcross.x), Math.abs(vcross.y), Math.abs(vcross.z))
                var majorAxis = vcross.x > vcross.y ? (vcross.x > vcross.z ? 'x' : vcross.y > vcross.z ? 'y' : vcross.y > vcross.z) : vcross.y > vcross.z ? 'y' : 'z'
                //Take the other two axis from the largest axis
                var uAxis = majorAxis == 'x' ? 'y' : majorAxis == 'y' ? 'x' : 'x';
                var vAxis = majorAxis == 'x' ? 'z' : majorAxis == 'y' ? 'z' : 'y';
                faceUVs[0].set((va[uAxis] - min[uAxis]) / sz[uAxis], (va[vAxis] - min[vAxis]) / sz[vAxis])
                faceUVs[1].set((vb[uAxis] - min[uAxis]) / sz[uAxis], (vb[vAxis] - min[vAxis]) / sz[vAxis])
                faceUVs[2].set((vc[uAxis] - min[uAxis]) / sz[uAxis], (vc[vAxis] - min[vAxis]) / sz[vAxis])
            }
            geometry.elementsNeedUpdate = geometry.verticesNeedUpdate = true;

            return geometry;
        }

        for (var i = 0; i < totalPoints.lower.length; i++) {
            pointsArray.pointCenter1 = totalPoints.center[i];
            //pointsArray.pointCenter2 = totalPoints.center[i + 1];
            pointsArray.pointLower1 = totalPoints.lower[i];
            //pointsArray.pointLower2 = totalPoints.lower[i + 1];
            pointsArray.pointUpper1 = totalPoints.upper[i];
            //pointsArray.pointUpper2 = totalPoints.upper[i + 1];
            tempVerMesh.push(pointsArray.pointCenter1.x, pointsArray.pointCenter1.y, pointsArray.pointCenter1.z);
            //UVs.push(i/wallSegments,0);

            tempVerMesh.push(pointsArray.pointLower1.x, pointsArray.pointLower1.y, pointsArray.pointLower1.z);
            //UVs.push(i/wallSegments,0);

            tempVerMesh.push(pointsArray.pointLower1.x, pointsArray.pointLower1.y + wallHeight, pointsArray.pointLower1.z);
            //UVs.push(i/wallSegments,1);

            tempVerMesh.push(pointsArray.pointCenter1.x, pointsArray.pointCenter1.y + wallHeight, pointsArray.pointCenter1.z);
            //UVs.push(i/wallSegments,1);



            tempVerMesh2.push(pointsArray.pointCenter1.x, pointsArray.pointCenter1.y, pointsArray.pointCenter1.z);
            tempVerMesh2.push(pointsArray.pointUpper1.x, pointsArray.pointUpper1.y, pointsArray.pointUpper1.z);

            tempVerMesh2.push(pointsArray.pointUpper1.x, pointsArray.pointUpper1.y + wallHeight, pointsArray.pointUpper1.z);
            tempVerMesh2.push(pointsArray.pointCenter1.x, pointsArray.pointCenter1.y + wallHeight, pointsArray.pointCenter1.z);
        }


        var vertices = new Float32Array(tempVerMesh);
        var indices = new Uint32Array(tempIndices);
/*
        var uvs = new Float32Array(UVs);
        geometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
        geometry.setIndex(new THREE.BufferAttribute(indices, 1));*/
        //geometry.addAttribute('uv', new THREE.BufferAttribute(uvs, 2));

        //for Geometry

        var geometry = new THREE.Geometry();

        for(var i=0; i < vertices.length;i+=3){
            geometry.vertices.push(new THREE.Vector3(vertices[i+0],vertices[i+1],vertices[i+2]));
        }

        //geometry.vertices.push(tempVerMesh);

        for(var i=0; i < tempIndices.length;i+=3){
            geometry.faces.push(new THREE.Face3(tempIndices[i],tempIndices[i+1],tempIndices[i+2]));
        }


        geometry.computeFaceNormals();
        geometry.computeVertexNormals();
        console.log(geometry);
        /*
         var geom = new THREE.Geometry().fromBufferGeometry(geometry);
         var temp = boxUnwrapUVs(geom);
         */
        var temp = boxUnwrapUVs(geometry);
        for (var i = 0; i < temp.faces.length; i++) {
            if (Math.abs(temp.faces[i].normal.x) > 0.5) temp.faces[i].materialIndex = 0;
            else if (Math.abs(temp.faces[i].normal.y) > 0.5) temp.faces[i].materialIndex = 1;
            else if (Math.abs(temp.faces[i].normal.z) > 0.5) temp.faces[i].materialIndex = 2;

            // temp.faces[i].materialIndex=(Math.random()*3)|0
        }
        temp.groupsNeedUpdate = true;
        //geometry = new THREE.BufferGeometry().fromGeometry(temp);

        var mesh = new THREE.Mesh(geometry, [material, material2, material3]);
        console.log(mesh)

        var vertices2 = new Float32Array(tempVerMesh2);

        var indices2 = new Uint32Array(tempIndices2);
        geometry2.addAttribute('position', new THREE.BufferAttribute(vertices2, 3));
        geometry2.setIndex(new THREE.BufferAttribute(indices2, 1));

        geometry2.computeFaceNormals();
        geometry2.computeVertexNormals();

        var geom = new THREE.Geometry().fromBufferGeometry(geometry2);
        var temp = boxUnwrapUVs(geom);
        geometry2 = new THREE.BufferGeometry().fromGeometry(temp);
        var mesh2 = new THREE.Mesh(geometry2, material4);


        //geometry2.addAttribute('uv', new THREE.BufferAttribute(uvs2, 2));


        return [mesh, mesh2];

    };

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 400;

    scene = new THREE.Scene();

    var arrow;
    var rayCaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    renderer.domElement.addEventListener("mousemove", onMouseMove);

    var points = {
        pointUpper1: new THREE.Vector3(-50, 0, -20),
        pointUpper2: new THREE.Vector3(150, 0, -20),
        pointCenter1: new THREE.Vector3(-100, 0, 0),
        pointCenter2: new THREE.Vector3(150, 0, 0),
        pointLower1: new THREE.Vector3(-50, 0, 20),
        pointLower2: new THREE.Vector3(150, 0, 20)
    };

    var totalPoints = {
        center: [new THREE.Vector3(-60, 0, 0), new THREE.Vector3(0, 0, -10), new THREE.Vector3(50, 0, -20), new THREE.Vector3(100, 0, -10), new THREE.Vector3(150, 0, 0)],
        lower: [new THREE.Vector3(-50, 0, 20), new THREE.Vector3(0, 0, 10), new THREE.Vector3(50, 0, 0), new THREE.Vector3(100, 0, 10), new THREE.Vector3(150, 0, 20)],
        upper: [new THREE.Vector3(-50, 0, -20), new THREE.Vector3(0, 0, -30), new THREE.Vector3(50, 0, -40), new THREE.Vector3(100, 0, -30), new THREE.Vector3(150, 0, -20)]
    };

    var sphere = new THREE.SphereGeometry(2, 10, 10);

    function initPoints() {
        var point1mesh = new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({
            color: 0xff00
        }));
        point1mesh.position.copy(points.pointUpper1);
        scene.add(point1mesh);

        var point2mesh = new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({
            color: 0x0000ff
        }));
        point2mesh.position.copy(points.pointUpper2);
        scene.add(point2mesh);

        var point3mesh = new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({
            color: 0xff00
        }));
        point3mesh.position.copy(points.pointCenter1);
        scene.add(point3mesh);

        var point4mesh = new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({
            color: 0x0000ff
        }));
        point4mesh.position.copy(points.pointCenter2);
        scene.add(point4mesh);

        var point5mesh = new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({
            color: 0xff00
        }));
        point5mesh.position.copy(points.pointLower1);
        scene.add(point5mesh);

        var point6mesh = new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({
            color: 0x0000ff
        }));
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
        var normalMatrix = new THREE.Matrix3().getNormalMatrix(object.matrixWorld);
        var normal = face.normal.clone().applyMatrix3(normalMatrix).normalize();
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
            //updateArrow(object, point, face);
        }
    }




            var textureLoader = new THREE.TextureLoader();
     textureLoader.load('./textures/Capture.PNG', function (texture) {
     console.log('texture loaded');
     texture.minFilter = THREE.LinearFilter;

            mesh[0].material[0].map = texture;
         mesh[0].material[1].map = texture;
         mesh[0].material[2].map = texture;
         scene.add(mesh[0]);
         var vertexNormalsHelper = new THREE.VertexNormalsHelper(mesh[0], 10);
         mesh[0].add(vertexNormalsHelper);

     });



        textureLoader.load('./textures/abc.jpg', function (texture) {
     console.log('texture loaded');
     texture.minFilter = THREE.LinearFilter;
     mesh[1].material.map = texture;
            //mesh[1].material[1].map = texture;
            //mesh[1].material[2].map = texture;


            scene.add(mesh[1]);
            var vertexNormalsHelper = new THREE.VertexNormalsHelper(mesh[1], 10);
            mesh[1].add(vertexNormalsHelper);
     });

    //
    var Orbitcontrols = new THREE.OrbitControls(camera, renderer.domElement);
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

