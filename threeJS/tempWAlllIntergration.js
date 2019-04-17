
/**
 * Created by Singh on 8/7/2018.
 */
FoyrFP.WallGeometry = function(totalPoints,distances,wallLength) {


    var material = new THREE.MeshBasicMaterial({/*color: 0xff0000,*/ side: THREE.DoubleSide, wireframe: false});
    var material2 = new THREE.MeshBasicMaterial({/*color: 0x0044400, */side: THREE.DoubleSide, wireframe: false});

    var geometry = new THREE.BufferGeometry();
    var geometry2 = new THREE.BufferGeometry();

    var wallHeight = 5;

    var finalIndices = [];
    var finalIndices2 = [];


    var tempVerMesh = [];
    var tempVerMesh2 = [];


    var UVs = [];
    var UVs2 = [];

    console.log(totalPoints)
    var pointsArray = { // for testing
        pointUpper1: new THREE.Vector3(),
        pointUpper2: new THREE.Vector3(),
        pointCenter1: new THREE.Vector3(),
        pointCenter2: new THREE.Vector3(),
        pointLower1: new THREE.Vector3(),
        pointLower2: new THREE.Vector3()
    };


    var wallSegments = FoyrFP.WallMaxSegmentCount;
    //sending top
    //indices
    var topIndicesPatternUpper = [totalPoints.center.length, totalPoints.center.length + 1, 1, totalPoints.center.length, 1, 0];
    var topIndicesPatternLower = [0, 1, totalPoints.center.length + 1, 0, totalPoints.center.length + 1, totalPoints.center.length];

    for (var wall = 0; wall <= 1; wall++) {
        //vertices lower
        if (wall == 0) {
            for (var i = 0; i < totalPoints.lower.length; i++) {
                pointsArray.pointLower1 = totalPoints.lower[i];
                tempVerMesh.push(pointsArray.pointLower1.x, pointsArray.pointLower1.y + wallHeight, pointsArray.pointLower1.y);
                UVs.push(i / wallSegments, 0);
            }
        }
        else {             //vertices upper

            for (var i = 0; i < totalPoints.upper.length; i++) {
                pointsArray.pointUpper1 = totalPoints.upper[i];
                tempVerMesh2.push(pointsArray.pointUpper1.x, pointsArray.pointUpper1.y + wallHeight, pointsArray.pointUpper1.y);
                UVs2.push(1 - i / wallSegments, 0);
            }
        }
    }
    for (var i = 0; i < totalPoints.center.length; i++) {
        pointsArray.pointCenter1 = totalPoints.center[i];
        tempVerMesh.push(pointsArray.pointCenter1.x, pointsArray.pointCenter1.y + wallHeight, pointsArray.pointCenter1.y);
        UVs.push(i / wallSegments, 1);

        tempVerMesh2.push(pointsArray.pointCenter1.x, pointsArray.pointCenter1.y + wallHeight, pointsArray.pointCenter1.y);
        UVs2.push(1 - i / wallSegments, 1);
    }
    //indices
    for (var i = 0; i < wallSegments - 1; i++) {
        for (var j = 0; j < topIndicesPatternLower.length; j++) {
            finalIndices.push(i + topIndicesPatternLower[j]);
        }
    }
    for (var i = 0; i < wallSegments - 1; i++) {
        for (var j = 0; j < topIndicesPatternUpper.length; j++) {
            finalIndices2.push(i + topIndicesPatternUpper[j]);
        }
    }


    //sending front
    //indices
    //var incrementor = Math.max(...finalIndices);
    var incrementor = Math.max.apply(null, finalIndices);
    var frontIndicesPatternLower = [];
    for (var i = 0; i < topIndicesPatternLower.length; i++) {
        frontIndicesPatternLower[i] = (1 + incrementor + topIndicesPatternLower[i]);
    }
    for (var i = 0; i < wallSegments - 1; i++) {
        for (var j = 0; j < frontIndicesPatternLower.length; j++) {
            finalIndices.push(i + frontIndicesPatternLower[j]);
        }
    }

    //var incrementor2 = Math.max(...finalIndices2);
    var incrementor2 = Math.max.apply(null, finalIndices2);

    var frontIndicesPatternUpper = [];
    for (var i = 0; i < topIndicesPatternUpper.length; i++) {
        frontIndicesPatternUpper[i] = (1 + incrementor2 + topIndicesPatternUpper[i]);
    }
    for (var i = 0; i < wallSegments - 1; i++) {
        for (var j = 0; j < frontIndicesPatternUpper.length; j++) {
            finalIndices2.push(i + frontIndicesPatternUpper[j]);
        }
    }

    //vertices lower
    for (var i = 0; i < totalPoints.lower.length; i++) {
        pointsArray.pointLower1 = totalPoints.lower[i];
        tempVerMesh.push(pointsArray.pointLower1.x, pointsArray.pointLower1.y, pointsArray.pointLower1.y);
        UVs.push(i / wallSegments, 0);
    }
    for (var i = 0; i < totalPoints.lower.length; i++) {
        pointsArray.pointLower1 = totalPoints.lower[i];
        tempVerMesh.push(pointsArray.pointLower1.x, pointsArray.pointLower1.y + wallHeight, pointsArray.pointLower1.y);
        UVs.push(i / wallSegments, 1);
    }

    //vertices upper
    for (var i = 0; i < totalPoints.upper.length; i++) {
        pointsArray.pointUpper1 = totalPoints.upper[i];
        tempVerMesh2.push(pointsArray.pointUpper1.x, pointsArray.pointUpper1.y, pointsArray.pointUpper1.y);
        UVs2.push(1 - i / wallSegments, 0);
    }
    for (var i = 0; i < totalPoints.upper.length; i++) {
        pointsArray.pointUpper1 = totalPoints.upper[i];
        tempVerMesh2.push(pointsArray.pointUpper1.x, pointsArray.pointUpper1.y + wallHeight, pointsArray.pointUpper1.y);
        UVs2.push(1 - i / wallSegments, 1);
    }


    //sending back
    //indices
    //incrementor = Math.max(...finalIndices);
    incrementor = Math.max.apply(null, finalIndices);
    var backIndicesPatternLower = [];
    for (var i = 0; i < topIndicesPatternLower.length; i++) {
        backIndicesPatternLower[i] = (1 + incrementor + topIndicesPatternLower[i]);
    }
    for (var i = 0; i < wallSegments - 1; i++) {
        for (var j = 0; j < backIndicesPatternLower.length; j++) {
            finalIndices.push(i + backIndicesPatternLower[j]);
        }
    }
    //incrementor2 = Math.max(...finalIndices2);
    incrementor2 = Math.max.apply(null, finalIndices2);
    var backIndicesPatternUpper = [];
    for (var i = 0; i < topIndicesPatternUpper.length; i++) {
        backIndicesPatternUpper[i] = (1 + incrementor2 + topIndicesPatternUpper[i]);
    }
    for (var i = 0; i < wallSegments - 1; i++) {
        for (var j = 0; j < backIndicesPatternUpper.length; j++) {
            finalIndices2.push(i + backIndicesPatternUpper[j]);
        }
    }
    //vertices
    for (var i = 0; i < totalPoints.center.length; i++) {
        pointsArray.pointCenter1 = totalPoints.center[i];
        tempVerMesh.push(pointsArray.pointCenter1.x, pointsArray.pointCenter1.y + wallHeight, pointsArray.pointCenter1.y);
        tempVerMesh2.push(pointsArray.pointCenter1.x, pointsArray.pointCenter1.y + wallHeight, pointsArray.pointCenter1.y);

        UVs.push(i / wallSegments, 1);
        UVs2.push(1 - i / wallSegments, 1);

    }
    for (var i = 0; i < totalPoints.center.length; i++) {
        pointsArray.pointCenter1 = totalPoints.center[i];
        tempVerMesh.push(pointsArray.pointCenter1.x, pointsArray.pointCenter1.y, pointsArray.pointCenter1.y);
        tempVerMesh2.push(pointsArray.pointCenter1.x, pointsArray.pointCenter1.y, pointsArray.pointCenter1.y);
        UVs.push(i / wallSegments, 0);
        UVs2.push(1 - i / wallSegments, 0);

    }

    //sending bottom
    //indices
    //incrementor = Math.max(...finalIndices);
    incrementor = Math.max.apply(null, finalIndices);
    var bottomIndicesPatternLower = [];
    for (var i = 0; i < topIndicesPatternLower.length; i++) {
        bottomIndicesPatternLower[i] = (1 + incrementor + topIndicesPatternLower[i]);
    }
    for (var i = 0; i < wallSegments - 1; i++) {
        for (var j = 0; j < bottomIndicesPatternLower.length; j++) {
            finalIndices.push(i + bottomIndicesPatternLower[j]);
        }
    }

    //incrementor2 = Math.max(...finalIndices2);
    incrementor2 = Math.max.apply(null, finalIndices2)
    var bottomIndicesPatternUpper = [];
    for (var i = 0; i < topIndicesPatternUpper.length; i++) {
        bottomIndicesPatternUpper[i] = (1 + incrementor2 + topIndicesPatternUpper[i]);
    }
    for (var i = 0; i < wallSegments - 1; i++) {
        for (var j = 0; j < bottomIndicesPatternUpper.length; j++) {
            finalIndices2.push(i + bottomIndicesPatternUpper[j]);

        }
    }
    //vertices
    for (var wall = 0; wall <= 1; wall++) {
        if (wall == 0) {
            for (var i = 0; i < totalPoints.lower.length; i++) {
                pointsArray.pointLower1 = totalPoints.lower[i];
                tempVerMesh.push(pointsArray.pointLower1.x, pointsArray.pointLower1.y, pointsArray.pointLower1.y);
                UVs.push(i / wallSegments, 0);
            }
        }
        else {
            for (var i = 0; i < totalPoints.upper.length; i++) {
                pointsArray.pointUpper1 = totalPoints.upper[i];
                tempVerMesh2.push(pointsArray.pointUpper1.x, pointsArray.pointUpper1.y, pointsArray.pointUpper1.y);
                UVs2.push(i / wallSegments, 0);
            }
        }
    }
    for (var i = 0; i < totalPoints.center.length; i++) {
        pointsArray.pointCenter1 = totalPoints.center[i];
        tempVerMesh.push(pointsArray.pointCenter1.x, pointsArray.pointCenter1.y, pointsArray.pointCenter1.y);
        UVs.push(i / wallSegments, 1);

        tempVerMesh2.push(pointsArray.pointCenter1.x, pointsArray.pointCenter1.y, pointsArray.pointCenter1.y);
        UVs2.push(i / wallSegments, 1);
    }


    //sending left
    //indices
    var leftIndicesPatternLower = [0, 1, 2, 0, 2, 3];
    //incrementor = Math.max(...finalIndices);
    incrementor = Math.max.apply(null, finalIndices);
    for (var i = 0; i < leftIndicesPatternLower.length; i++) {
        leftIndicesPatternLower[i] = (1 + incrementor + leftIndicesPatternLower[i]);
    }
    for (var i = 0; i < 1; i++) {
        for (var j = 0; j < leftIndicesPatternLower.length; j++) {
            finalIndices.push(i + leftIndicesPatternLower[j]);
        }
    }

    var leftIndicesPatternUpper = [1, 0, 3, 1, 3, 2];
    //incrementor2 = Math.max(...finalIndices2);
    incrementor2 = Math.max.apply(null, finalIndices2);
    for (var i = 0; i < leftIndicesPatternUpper.length; i++) {
        leftIndicesPatternUpper[i] = (1 + incrementor2 + leftIndicesPatternUpper[i]);
    }
    for (var i = 0; i < 1; i++) {
        for (var j = 0; j < leftIndicesPatternUpper.length; j++) {
            finalIndices2.push(i + leftIndicesPatternUpper[j]);
        }
    }

    //vertices
    pointsArray.pointCenter1 = totalPoints.center[0];
    tempVerMesh.push(pointsArray.pointCenter1.x, pointsArray.pointCenter1.y, pointsArray.pointCenter1.y);
    UVs.push(0, 1);

    tempVerMesh2.push(pointsArray.pointCenter1.x, pointsArray.pointCenter1.y, pointsArray.pointCenter1.y);
    UVs2.push(0, 1);


    pointsArray.pointLower1 = totalPoints.lower[0];
    tempVerMesh.push(pointsArray.pointLower1.x, pointsArray.pointLower1.y, pointsArray.pointLower1.y);
    UVs.push(0, 0);
    tempVerMesh.push(pointsArray.pointLower1.x, pointsArray.pointLower1.y + wallHeight, pointsArray.pointLower1.y);
    UVs.push(1, 0);

    pointsArray.pointCenter1 = totalPoints.center[0];
    tempVerMesh.push(pointsArray.pointCenter1.x, pointsArray.pointCenter1.y + wallHeight, pointsArray.pointCenter1.y);
    UVs.push(1, 1);

    //left upper
    pointsArray.pointUpper1 = totalPoints.upper[0];
    tempVerMesh2.push(pointsArray.pointUpper1.x, pointsArray.pointUpper1.y, pointsArray.pointUpper1.y);
    UVs2.push(0, 0);
    tempVerMesh2.push(pointsArray.pointUpper1.x, pointsArray.pointUpper1.y + wallHeight, pointsArray.pointUpper1.y);
    UVs2.push(1, 0);

    pointsArray.pointCenter1 = totalPoints.center[0];
    tempVerMesh2.push(pointsArray.pointCenter1.x, pointsArray.pointCenter1.y + wallHeight, pointsArray.pointCenter1.y);
    UVs2.push(1, 1);

    //sending right
    //indices
    var rightIndicesPatternLower = [1, 0, 3, 1, 3, 2];

    //incrementor = Math.max(...finalIndices);
    incrementor = Math.max.apply(null, finalIndices);
    for (var i = 0; i < rightIndicesPatternLower.length; i++) {
        rightIndicesPatternLower[i] = (1 + incrementor + rightIndicesPatternLower[i]);
    }
    for (var i = 0; i < 1; i++) {
        for (var j = 0; j < rightIndicesPatternLower.length; j++) {
            finalIndices.push(i + rightIndicesPatternLower[j]);
        }
    }

    var rightIndicesPatternUpper = [0, 1, 2, 0, 2, 3];

    //incrementor2 = Math.max(...finalIndices2);
    incrementor2 = Math.max.apply(null, finalIndices2);
    for (var i = 0; i < rightIndicesPatternUpper.length; i++) {
        rightIndicesPatternUpper[i] = (1 + incrementor2 + rightIndicesPatternUpper[i]);
    }
    for (var i = 0; i < 1; i++) {
        for (var j = 0; j < rightIndicesPatternUpper.length; j++) {
            finalIndices2.push(i + rightIndicesPatternUpper[j]);
        }
    }

    //vertices
    pointsArray.pointCenter1 = totalPoints.center[totalPoints.center.length - 1];
    tempVerMesh.push(pointsArray.pointCenter1.x, pointsArray.pointCenter1.y, pointsArray.pointCenter1.y);
    UVs.push(0, 1);

    tempVerMesh2.push(pointsArray.pointCenter1.x, pointsArray.pointCenter1.y, pointsArray.pointCenter1.y);
    UVs2.push(0, 1);

    pointsArray.pointLower1 = totalPoints.lower[totalPoints.center.length - 1];
    tempVerMesh.push(pointsArray.pointLower1.x, pointsArray.pointLower1.y, pointsArray.pointLower1.y);
    UVs.push(0, 0);

    tempVerMesh.push(pointsArray.pointLower1.x, pointsArray.pointLower1.y + wallHeight, pointsArray.pointLower1.y);
    UVs.push(1, 0);

    pointsArray.pointCenter1 = totalPoints.center[totalPoints.center.length - 1];
    tempVerMesh.push(pointsArray.pointCenter1.x, pointsArray.pointCenter1.y + wallHeight, pointsArray.pointCenter1.y);
    UVs.push(1, 1);

    //right upper
    pointsArray.pointUpper1 = totalPoints.upper[totalPoints.upper.length - 1];
    tempVerMesh2.push(pointsArray.pointUpper1.x, pointsArray.pointUpper1.y, pointsArray.pointUpper1.y);
    UVs2.push(0, 0);

    tempVerMesh2.push(pointsArray.pointUpper1.x, pointsArray.pointUpper1.y + wallHeight, pointsArray.pointUpper1.y);
    UVs2.push(1, 0);

    pointsArray.pointCenter1 = totalPoints.center[totalPoints.center.length - 1];
    tempVerMesh2.push(pointsArray.pointCenter1.x, pointsArray.pointCenter1.y + wallHeight, pointsArray.pointCenter1.y);
    UVs2.push(1, 1);


    var vertices = new Float32Array(tempVerMesh);
    var indices = new Uint32Array(finalIndices);

    var uvs = new Float32Array(UVs);

    geometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geometry.setIndex(new THREE.BufferAttribute(indices, 1));
    geometry.addAttribute('uv', new THREE.BufferAttribute(uvs, 2));

    geometry.computeFaceNormals();
    geometry.computeVertexNormals();
    //console.log(geometry);

    //var mesh = new THREE.Mesh(geometry, material);

    var vertices2 = new Float32Array(tempVerMesh2);
    var uvs2 = new Float32Array(UVs2);
    var indices2 = new Uint32Array(finalIndices2);

    geometry2.addAttribute('position', new THREE.BufferAttribute(vertices2, 3));
    geometry2.setIndex(new THREE.BufferAttribute(indices2, 1));
    geometry2.addAttribute('uv', new THREE.BufferAttribute(uvs2, 2));
    geometry2.computeFaceNormals();
    geometry2.computeVertexNormals();

    return geometry;
};