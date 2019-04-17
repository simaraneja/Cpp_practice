var renderer, scene, camera;
var mouse;
var isMouseDown;
var startVertex;
var  count = 0, line;
var drawCount;
var MAX_POINTS = 10000;
var material;

var geomDrawn = false, firsttime = true;

init();

function init(){
// renderer
    renderer = new THREE.WebGLRenderer();

    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    // scene
    scene = new THREE.Scene();

    // camera
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.set( 0, 0, 300 );

    //mouse
    mouse = new THREE.Vector3();
    startVertex = new THREE.Vector3();

    render();

    document.addEventListener("mousemove",onMouseMove,false);
    document.addEventListener("mouseup",onMouseUp,false);
    document.addEventListener("mousedown",onMouseDown,false);
    window.addEventListener('resize',onResize,false);
}

function render() {

    renderer.render( scene, camera );
    requestAnimationFrame(render);
}

function onResize(){

    console.log("in resize function");
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onMouseUp(){
        console.log("mouse up");
    isMouseDown = false;
    firsttime = false;
    if(geomDrawn){
        var tempPositions = [];
        addStartVertexToArray();
        line.geometry.setDrawRange(0, count);
        line.geometry.attributes.position.needsUpdate = true;

        var positions = line.geometry.attributes.position.array;
        console.log(positions);
        for(var i = 0; i< count*3; i++) {
            tempPositions.push(positions[i]);
        }

        console.log(tempPositions);
        console.log(count);
        var verticesToObjs = convertToObjects(tempPositions);
        console.log(verticesToObjs);
        var simplifiedVertexObjs = simplify(verticesToObjs,0.011,false);
        console.log(simplifiedVertexObjs);
        var verticesArray = convertBackToArray(simplifiedVertexObjs);
        //console.log("LENGTH" + verticesArray.length);

        var newLine = addLine();
        scene.add(newLine);
        positions = newLine.geometry.attributes.position.array;
        var temp = 0;
        for(var i = 0; i< verticesArray.length/3; i++) {

            positions[i * 3 + 0]=(verticesArray[temp]);
            positions[i * 3 + 1]=(verticesArray[++temp]);
            positions[i * 3 + 2]=(verticesArray[++temp]);
            temp++;
            if (i > 1){
                console.log(temp);
            }
        }
        console.log(positions);
        //console.log("Count:" + count);
        line.geometry.setDrawRange(0, verticesArray.length/3);
        line.geometry.attributes.position.needsUpdate = true;
        geomDrawn = false;
        startVertex = null;
    }

    count = 0;

}

function onMouseDown(event) {
    console.log("mouse down");
    isMouseDown = true;
    firsttime = true;
    //addLine();
    //scene.add(line);
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    mouse.z = 0;
    mouse.unproject(camera);

    startVertex = saveStartVertex(mouse);
    //addVertexToArray();


}

function onMouseMove(event) {

    if(isMouseDown && startVertex ) {
        if(firsttime){
            firsttime = false;
            geomDrawn = true;
            addLine();
            scene.add(line);
            addStartVertexToArray();
        }
        //count++;
        console.log("mouse move");
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        mouse.z = 0;
        mouse.unproject(camera);
        console.log(mouse)
        addVertexToArray();
        //updateVertices();
    }
}

function addVertexToArray() {
    var positions = line.geometry.attributes.position.array;
    positions[count * 3 + 0] = mouse.x;
    positions[count * 3 + 1] = mouse.y;
    positions[count * 3 + 2] = mouse.z;
    count++;
    line.geometry.setDrawRange(0, count);
    //console.log(positions);
    line.geometry.attributes.position.needsUpdate = true;
    //console.log("addVertextoaray" + count);
}


function saveStartVertex(_mouse) {

    var TempVec = new THREE.Vector3();
    TempVec.x = _mouse.x; TempVec.y = _mouse.y; TempVec.z = _mouse.z;
    return TempVec;
    //count++;
}

function addStartVertexToArray(){
    var positions = line.geometry.attributes.position.array;
    positions[count * 3 + 0] = startVertex.x;
    positions[count * 3 + 1] = startVertex.y;
    positions[count * 3 + 2] = startVertex.z;
    count++;
    //console.log("addStartVertexToArray" + count);
}

function addLine(){

    var geometry = new THREE.BufferGeometry();

    // attributes
    var positions = new Float32Array( MAX_POINTS * 3 ); // 3 vertices per point

    geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );

    // material
    var material = new THREE.LineBasicMaterial( { color: Math.random() * 0xffffff, linewidth: 2 } );
    line = new THREE.Line( geometry,  material );

    return line;

    //count = 0;
}


var convertToObjects = function(_vertices){
    var convertedVerticesToObj = [];
    console.log(_vertices.length);
    for(var i = 0; i < _vertices.length; i+=3){
        //convertedVertices.push(new THREE.Vector3(vertices[i],vertices[i+1],vertices[i+2]));
        convertedVerticesToObj.push({x:_vertices[i],y:_vertices[i+1],z:_vertices[i+2]});
    }
    return convertedVerticesToObj;
};

var convertBackToArray = function(_converted) {
    var convertedVerticesToArray = [];
    for (var i =0; i < _converted.length; i++) {
        // for(var j = 0; j < Object.keys(converted[i]).length; j++);
        for (var key in _converted[i]) {
            if (_converted[i].hasOwnProperty(key)) {
                convertedVerticesToArray.push(_converted[i][key]);
            }
        }
    }
    console.log(convertedVerticesToArray);
    return convertedVerticesToArray;
};
