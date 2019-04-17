var vertices = [-0.2619572579860687, 0.3894585967063904,
    -0.2619572579860687, 0.3894585967063904,
    -0.2619572579860687, 0.3871403932571411,
    -0.2712301015853882, 0.38482218980789185,
    -0.28745752573013306, 0.3755493760108948,
    -0.3245488405227661, 0.340776264667511,
    -0.3593219220638275, 0.2758665084838867,
    -0.36395832896232605, 0.25268444418907166,
    -0.36395832896232605, 0.21327494084835052,
    -0.35004910826683044, 0.18313826620578766,
    -0.3338216543197632, 0.16922903060913086,
    -0.30832138657569885, 0.16922903060913086,
    -0.28050291538238525, 0.18313826620578766,
    -0.22486597299575806, 0.22022956609725952,
    -0.21327494084835052, 0.23182059824466705,
    -0.21095673739910126, 0.23877520859241486 ];

console.log(vertices);

var convertToObjects = function(_vertices){
    var convertedVerticesToObj = [];
    for(var i = 0; i < _vertices.length; i+=3){
        //convertedVertices.push(new THREE.Vector3(vertices[i],vertices[i+1],vertices[i+2]));
        //convertedVerticesToObj.push({x:_vertices[i],y:_vertices[i+1],z:_vertices[i+2]});
        convertedVerticesToObj.push({x:_vertices[i],y:_vertices[i+1]});
    }
    console.log(convertedVerticesToObj);
    return convertedVerticesToObj;
};

var verticesObjects = convertToObjects(vertices);

var simple = simplify(verticesObjects,5,false);
console.log(simple);

var convertBackToArray = function(_converted) {
    var convertedVerticesToArray = [];
    for (var i =0; i < _converted.length; i++) {
        // for(var j = 0; j < Object.keys(converted[i]).length; j++);
        for (var key in _converted[i]) {
            if (_converted[i].hasOwnProperty(key)) {
                console.log(key + " -> " + _converted[i][key]);
                convertedVerticesToArray.push(_converted[i][key]);
            }
        }
    }
    console.log(convertedVerticesToArray);
    return convertedVerticesToArray;
};

var verticesArray = convertBackToArray(verticesObjects);

