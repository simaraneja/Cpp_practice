FoyrFP.WallEdge = function(options, geometry, material) {

    var editor = FoyrFP.utils.editor;
    //var scope = this;

    //node1, node2, wallgroup
    THREE.Mesh.call( this );

    this.type = 'walledge';

    this.node1;
    this.node2;
    this.wallgroup;
    this.ctrlnode;

    this.wallGeomPoints = [];
    //this.linearPoints = [];
    this.linearPoints = {
        center : [],
        lower : [],
        upper: []
    };



    if(options){
        this.node1 = options.node1;
        this.node2 = options.node2;
        this.wallgroup = options.wallgroup;
        this.ctrlnode = options.ctrlnode;
    }


    if(this.ctrlnode) {
        this.ctrlnode.wallcurve = this;
    }

    this.mesh3D = [
        new THREE.Mesh(new THREE.BufferGeometry(), new THREE.MeshBasicMaterial({side: THREE.DoubleSide, wireframe: false /*color: 0xffff00*/})),
        new THREE.Mesh(new THREE.BufferGeometry(), new THREE.MeshBasicMaterial({side: THREE.DoubleSide, wireframe: false /*color: 0xffff00*/}))
    ];

    this.islinear = true;
    this.bezier = null;

    this.curveptslength = 0;

    this.curveControlPt = new THREE.Vector2();
    this.curveStartPt = new THREE.Vector2();
    this.curveEndPt = new THREE.Vector2();

    this.points = [];
    this.normals = [];
    this.distances = [];

    this.lineUpper = {p1 : new THREE.Vector2(0, 0), p2 : new THREE.Vector2(0, 0)};
    this.lineLower = {p1 : new THREE.Vector2(0, 0), p2 : new THREE.Vector2(0, 0)};
    this.lineCenter = {p1 : new THREE.Vector2(0, 0), p2 : new THREE.Vector2(0, 0)};

    this.walllength = 0;
    this.wallHeight = 10;

    for(var i=0; i<FoyrFP.WallMaxPointCount; i++) {
        var pt = new THREE.Vector2();
        this.points.push(pt);

        var normal = new THREE.Vector2();
        this.normals.push(normal);

        this.distances.push(0);
    }

    this.thickness = editor.getWallThickness();
    this.color = 0xffffff;

    this.originalcolor = 0x444444;
    this.highlightcolor = 0xde853e;

    this.renderOrder = 2;
    this.touchPriority = TOUCH_PRIORITY_WALL_EDGE;

    this.normalvector = new THREE.Vector2();
    if ( material !== undefined ) {
        this.material = material;
    } else {
        this.material = new THREE.MeshBasicMaterial({
            color: this.originalcolor,
            side: THREE.BackSide,
            depthTest: false,
            wireframe: true
        });
    }

    if ( geometry !== undefined ) {
        this.geometry =  geometry;
    } else {
        this.geometry = new THREE.BufferGeometry();
    }
    // attributes
    var positions = new Float32Array( FoyrFP.WallMaxVertexCount * 3 ); // 3 vertices per point
    var indicesPattern = [0,4,3, 1,4,0, 1,5,4, 2,5,1];

    var indices = new Uint16Array(FoyrFP.WallMaxSegmentCount * indicesPattern.length);

    for(var i=0; i<FoyrFP.WallMaxSegmentCount; i++) {
        for(var j=0; j<indicesPattern.length; j++) {
            indices[indicesPattern.length*i + j] = 3*i + indicesPattern[j];
        }
    }

    this.geometry.setIndex(new THREE.BufferAttribute(new Uint16Array(indices), 1));
    this.geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );

// draw range
//    this.drawCount = 12; // draw the first 6 points, only
//    this.geometry.setDrawRange( 0, this.drawCount );

    //this.convertToCurve();

    this.tempVector1 = new THREE.Vector3();
    this.tempVector2 = new THREE.Vector3();
    this.tempVector3 = new THREE.Vector3();

    this.vector2d_1 = new THREE.Vector2();

    this.referencedParent = null;
    this.referencedChild = {};

    this.addLabel();
}

FoyrFP.WallEdge.prototype = Object.create( THREE.Mesh.prototype );
FoyrFP.WallEdge.prototype.constructor = FoyrFP.WallEdge;

FoyrFP.WallEdge.prototype.shallowCopy = function ( source, recursive) {

    THREE.Mesh.prototype.shallowCopy.call(this, source, recursive);

    FoyrFP.utils.updateReferencedParentNChild(source, this);
}

FoyrFP.WallEdge.prototype.replaceReferenceParent = function( referenceParent ) {

    this.geometry = referenceParent.geometry;
    this.material = referenceParent.material;

    delete this.referencedParent.referencedChild[this.uuid];

    this.referencedParent = referenceParent;
    this.referencedParent.referencedChild[this.uuid] = this;
}

FoyrFP.WallEdge.prototype.isPartOfBoundingBoxCalculation = function() {
    return false;
}

FoyrFP.WallEdge.prototype.update = function() {
    if(!this.node1 || !this.node2)
        return;

    //this.updateVertices();
    this.readjustVertices(this.node1);
}

FoyrFP.WallEdge.prototype.updateVertices = function() {
    var halfthickness = this.thickness * 0.5;
    var vertices = this.wallgroup.edgevertices;
    var normalvec = this.normalvector;

    if(this.islinear) {
        var pos1 = this.node1.position;
        var pos2 = this.node2.position;

        //center line
        vertices.center[0].set(pos1.x, pos1.z);
        vertices.center[1].set(pos2.x, pos2.z);

        normalvec.subVectors(vertices.center[1], vertices.center[0]);
        var x = normalvec.x;
        var y = normalvec.y;
        normalvec.set(-y, x).normalize().multiplyScalar(halfthickness);

        //upper line
        vertices.upper[0].copy(vertices.center[0]).add(normalvec);
        vertices.upper[1].copy(vertices.center[1]).add(normalvec);
        //lower line
        vertices.lower[0].copy(vertices.center[0]).sub(normalvec);
        vertices.lower[1].copy(vertices.center[1]).sub(normalvec);

        this.geometry.attributes.position.setXYZ(0, vertices.upper[0].x, pos1.y, vertices.upper[0].y);
        this.geometry.attributes.position.setXYZ(3, vertices.upper[1].x, pos2.y, vertices.upper[1].y);
        this.geometry.attributes.position.setXYZ(1, vertices.center[0].x, pos1.y, vertices.center[0].y);
        this.geometry.attributes.position.setXYZ(4, vertices.center[1].x, pos2.y, vertices.center[1].y);
        this.geometry.attributes.position.setXYZ(2, vertices.lower[0].x, pos1.y, vertices.lower[0].y);
        this.geometry.attributes.position.setXYZ(5, vertices.lower[1].x, pos2.y, vertices.lower[1].y);

        this.drawCount = 12; // draw the first 2 points, only
        this.geometry.setDrawRange( 0, this.drawCount );

        this.geometry.attributes.position.needsUpdate = true;

        this.walllength = vertices.center[0].distanceTo(vertices.center[1]);
    }
    else {
        var pos1 = this.node1.position;
        var pos2 = this.node2.position;

        this.curveStartPt.set(pos1.x, pos1.z);
        this.curveEndPt.set(pos2.x, pos2.z);

        if(this.ctrlnode) {
            var ctrlnodepos = this.ctrlnode.position;
            this.curveControlPt.set(ctrlnodepos.x, ctrlnodepos.z);
            this.curveControlPt = FoyrFP.utils.getQControlPoint(this.curveStartPt, this.curveControlPt, this.curveEndPt);
        }
        else {
            vertices.center[0].set(pos1.x, pos1.z);
            vertices.center[1].set(pos2.x, pos2.z);
            normalvec.subVectors(vertices.center[1], vertices.center[0]);
            var x = normalvec.x;
            var y = normalvec.y;
            normalvec.set(-y, x).normalize().multiplyScalar(this.curveStartPt.distanceTo(this.curveEndPt)*0.25);

            this.curveControlPt.copy(this.curveStartPt).add(this.curveEndPt).multiplyScalar(0.5);
            this.curveControlPt.add(normalvec);

            this.curveControlPt = FoyrFP.utils.getQControlPoint(this.curveStartPt, this.curveControlPt, this.curveEndPt);
        }


        this.bezier.points[0].x = this.curveStartPt.x;
        this.bezier.points[0].y = this.curveStartPt.y;
        this.bezier.points[1].x = this.curveControlPt.x;
        this.bezier.points[1].y = this.curveControlPt.y;
        this.bezier.points[2].x = this.curveEndPt.x;
        this.bezier.points[2].y = this.curveEndPt.y;
        this.bezier.update();

        var curvelength = Math.ceil(this.bezier.length());
        var segments = Math.ceil(curvelength/0.5);

        if(segments < 1)
            return;

        var pts = this.bezier.getLUT(segments);
        this.curveptslength = pts.length;

        for(var i=0; i<pts.length; i++) {
            vertices.center[i].set(pts[i].x, pts[i].y);
            this.points[i].set(pts[i].x, pts[i].y);
            var distance = 0;
            if(i > 0){
                distance = this.points[i].distanceTo(this.points[i-1]);
                distance += this.distances[i-1];
            }
            this.distances[i] = distance;
        }

        this.walllength = 0;

        for(var i=0; i<pts.length; i++) {
            if(i < pts.length - 1)
            {
                normalvec.subVectors(vertices.center[i+1], vertices.center[i]);
                var x = normalvec.x;
                var y = normalvec.y;
                normalvec.set(-y, x).normalize().multiplyScalar(halfthickness);

                this.walllength += vertices.center[i].distanceTo(vertices.center[i+1]);
            }
            this.normals[i].copy(normalvec).normalize();

            //upper line
            vertices.upper[i].copy(vertices.center[i]).add(normalvec);
            //lower line
            vertices.lower[i].copy(vertices.center[i]).sub(normalvec);

            var offset = 3*i;

            this.geometry.attributes.position.setXYZ(offset + 0, vertices.upper[i].x, pos1.y, vertices.upper[i].y);
            this.geometry.attributes.position.setXYZ(offset + 1, vertices.center[i].x, pos1.y, vertices.center[i].y);
            this.geometry.attributes.position.setXYZ(offset + 2, vertices.lower[i].x, pos1.y, vertices.lower[i].y);
        }

        this.drawCount = 12*(pts.length-1);
        this.geometry.setDrawRange( 0, this.drawCount );

        this.geometry.attributes.position.needsUpdate = true;

    }
    this.geometry.computeBoundingBox();
    this.geometry.computeBoundingSphere();

    //Vikas TODO multiple updates
    var texture = this.material.map;
    if(texture && this.material.sourceNode){
        var size = this.material.sourceNode.captured2DInfo.size;
        var width = this.walllength;
        var height = this.wallHeight;
        if(size && width && height) {
            var repeatX =  width/size.x;
            var repeatY =  height/size.z;
            texture.repeat.set(repeatX, repeatY);
        }
        this.material.color.setHex(this.color);
        this.material.needsUpdate = true;
    }

    this.updateApertureList();
}

FoyrFP.WallEdge.prototype.readjustVertices = function(startNode, upperPosition, lowerPosition) {

    if(!this.node1 || !this.node2)
        return;

    var halfthickness = this.thickness * 0.5;
    var vertices = this.wallgroup.edgevertices;
    var normalvec = this.normalvector;

    if(this.islinear) {
        var pos1 = (startNode === this.node1) ? this.node1.position : this.node2.position;
        var pos2 = (startNode !== this.node2) ? this.node2.position : this.node1.position;

        //center line
        vertices.center[0].set(pos1.x, pos1.z);
        vertices.center[1].set(pos2.x, pos2.z);

        normalvec.subVectors(vertices.center[1], vertices.center[0]);
        var x = normalvec.x;
        var y = normalvec.y;
        normalvec.set(-y, x).normalize().multiplyScalar(halfthickness);

        if(upperPosition && lowerPosition) {

            var distance = upperPosition.distanceTo(lowerPosition);
            var tmpVector = new THREE.Vector2(0, 0).copy(upperPosition).add(lowerPosition).multiplyScalar(0.5);

            vertices.upper[0].set(upperPosition.x, upperPosition.y);
            vertices.upper[1].copy(vertices.center[1]).add(normalvec);

            vertices.lower[0].set(lowerPosition.x, lowerPosition.y);
            vertices.lower[1].copy(vertices.center[1]).sub(normalvec);

        } else {

            vertices.upper[0].copy(vertices.center[0]).add(normalvec);
            vertices.upper[1].copy(vertices.center[1]).add(normalvec);

            vertices.lower[0].copy(vertices.center[0]).sub(normalvec);
            vertices.lower[1].copy(vertices.center[1]).sub(normalvec);
        }

        this.lineUpper.p1.set(vertices.upper[0].x, vertices.upper[0].y);
        this.lineUpper.p2.set(vertices.upper[1].x, vertices.upper[1].y);
        this.lineLower.p1.set(vertices.lower[0].x, vertices.lower[0].y);
        this.lineLower.p2.set(vertices.lower[1].x, vertices.lower[1].y);
        this.lineCenter.p1.set(vertices.center[0].x, vertices.center[0].y);
        this.lineCenter.p2.set(vertices.center[1].x, vertices.center[1].y);

        this.geometry.attributes.position.setXYZ(0, vertices.upper[0].x, pos1.y, vertices.upper[0].y);
        this.geometry.attributes.position.setXYZ(3, vertices.upper[1].x, pos2.y, vertices.upper[1].y);
        this.geometry.attributes.position.setXYZ(1, vertices.center[0].x, pos1.y, vertices.center[0].y);
        this.geometry.attributes.position.setXYZ(4, vertices.center[1].x, pos2.y, vertices.center[1].y);
        this.geometry.attributes.position.setXYZ(2, vertices.lower[0].x, pos1.y, vertices.lower[0].y);
        this.geometry.attributes.position.setXYZ(5, vertices.lower[1].x, pos2.y, vertices.lower[1].y);

        this.drawCount = 12; // draw the first 2 points, only
        this.geometry.setDrawRange( 0, this.drawCount );

        this.geometry.attributes.position.needsUpdate = true;

        this.walllength = vertices.center[0].distanceTo(vertices.center[1]);
    }
    else {
        var pos1 = (startNode === this.node1) ? this.node1.position : this.node2.position;
        var pos2 = (startNode !== this.node2) ? this.node2.position : this.node1.position;

        this.curveStartPt.set(pos1.x, pos1.z);
        this.curveEndPt.set(pos2.x, pos2.z);

        if(this.ctrlnode) {
            var ctrlnodepos = this.ctrlnode.position;
            this.curveControlPt.set(ctrlnodepos.x, ctrlnodepos.z);
            this.curveControlPt = FoyrFP.utils.getQControlPoint(this.curveStartPt, this.curveControlPt, this.curveEndPt);
        }
        else {
            vertices.center[0].set(pos1.x, pos1.z);
            vertices.center[1].set(pos2.x, pos2.z);
            normalvec.subVectors(vertices.center[1], vertices.center[0]);
            var x = normalvec.x;
            var y = normalvec.y;
            normalvec.set(-y, x).normalize().multiplyScalar(this.curveStartPt.distanceTo(this.curveEndPt)*0.25);

            this.curveControlPt.copy(this.curveStartPt).add(this.curveEndPt).multiplyScalar(0.5);
            this.curveControlPt.add(normalvec);

            this.curveControlPt = FoyrFP.utils.getQControlPoint(this.curveStartPt, this.curveControlPt, this.curveEndPt);
        }

        this.bezier.points[0].x = this.curveStartPt.x;
        this.bezier.points[0].y = this.curveStartPt.y;
        this.bezier.points[1].x = this.curveControlPt.x;
        this.bezier.points[1].y = this.curveControlPt.y;
        this.bezier.points[2].x = this.curveEndPt.x;
        this.bezier.points[2].y = this.curveEndPt.y;
        this.bezier.update();

        var curvelength = Math.ceil(this.bezier.length());
        var segments = Math.ceil(curvelength/0.5);

        if(segments < 1)
            return;

        var pts = this.bezier.getLUT(segments);
        this.curveptslength = pts.length;

        for(var i=0; i<pts.length; i++) {
            vertices.center[i].set(pts[i].x, pts[i].y);
            this.points[i].set(pts[i].x, pts[i].y);
            var distance = 0;
            if(i > 0){
                distance = this.points[i].distanceTo(this.points[i-1]);
                distance += this.distances[i-1];
            }
            this.distances[i] = distance;
        }

        //    console.log(this.points);

        //   console.log(vertices)
        this.walllength = 0;

        for(var i=0; i<pts.length; i++) {
            if(i < pts.length - 1)
            {
                normalvec.subVectors(vertices.center[i+1], vertices.center[i]);
                var x = normalvec.x;
                var y = normalvec.y;
                normalvec.set(-y, x).normalize().multiplyScalar(halfthickness);

                this.walllength += vertices.center[i].distanceTo(vertices.center[i+1]);
            }
//console.log(this.walllength)
            this.normals[i].copy(normalvec).normalize();

            //upper line
            vertices.upper[i].copy(vertices.center[i]).add(normalvec);
            //lower line
            vertices.lower[i].copy(vertices.center[i]).sub(normalvec);

            var offset = 3*i;

            if(i === 0 && upperPosition && lowerPosition) {
                vertices.upper[0].set(upperPosition.x, upperPosition.y);
                vertices.lower[0].set(lowerPosition.x, lowerPosition.y);
            }

            this.geometry.attributes.position.setXYZ(offset + 0, vertices.upper[i].x, pos1.y, vertices.upper[i].y);
            this.geometry.attributes.position.setXYZ(offset + 1, vertices.center[i].x, pos1.y, vertices.center[i].y);
            this.geometry.attributes.position.setXYZ(offset + 2, vertices.lower[i].x, pos1.y, vertices.lower[i].y);
        }

        this.drawCount = 12*(pts.length-1);
        this.geometry.setDrawRange( 0, this.drawCount );

        this.geometry.attributes.position.needsUpdate = true;
    }

    this.geometry.computeBoundingBox();
    this.geometry.computeBoundingSphere();

    //Vikas TODO multiple updates
    var texture = this.material.map;
    if(texture && this.material.sourceNode){
        var size = this.material.sourceNode.captured2DInfo.size;
        var width = this.walllength;
        var height = this.wallHeight;
        if(size && width && height) {
            var repeatX =  width/size.x;
            var repeatY =  height/size.z;
            texture.repeat.set(repeatX, repeatY);
        }
        this.material.color.setHex(this.color);
        this.material.needsUpdate = true;
    }

    this.updateApertureList();
}

FoyrFP.WallEdge.prototype.calculateLines = function(startNode) {

    if (!this.node1 || !this.node2)
        return;

    var halfthickness = this.thickness * 0.5;
    var vertices = this.wallgroup.edgevertices;
    var normalvec = this.normalvector;

    if (this.islinear) {
        var pos1 = (startNode === this.node1) ? this.node1.position : this.node2.position;
        var pos2 = (startNode !== this.node2) ? this.node2.position : this.node1.position;

        //center line
        vertices.center[0].set(pos1.x, pos1.z);
        vertices.center[1].set(pos2.x, pos2.z);

        normalvec.subVectors(vertices.center[1], vertices.center[0]);
        var x = normalvec.x;
        var y = normalvec.y;
        normalvec.set(-y, x).normalize().multiplyScalar(halfthickness);

        //upper line
        vertices.upper[0].copy(vertices.center[0]).add(normalvec);
        vertices.upper[1].copy(vertices.center[1]).add(normalvec);
        //lower line
        vertices.lower[0].copy(vertices.center[0]).sub(normalvec);
        vertices.lower[1].copy(vertices.center[1]).sub(normalvec);

    }
    else {
        var pos1 = (startNode === this.node1) ? this.node1.position : this.node2.position;
        var pos2 = (startNode !== this.node2) ? this.node2.position : this.node1.position;

        this.curveStartPt.set(pos1.x, pos1.z);
        this.curveEndPt.set(pos2.x, pos2.z);

        if(this.ctrlnode) {
            var ctrlnodepos = this.ctrlnode.position;
            this.curveControlPt.set(ctrlnodepos.x, ctrlnodepos.z);
            this.curveControlPt = FoyrFP.utils.getQControlPoint(this.curveStartPt, this.curveControlPt, this.curveEndPt);
        }
        else {
            vertices.center[0].set(pos1.x, pos1.z);
            vertices.center[1].set(pos2.x, pos2.z);
            normalvec.subVectors(vertices.center[1], vertices.center[0]);
            var x = normalvec.x;
            var y = normalvec.y;
            normalvec.set(-y, x).normalize().multiplyScalar(this.curveStartPt.distanceTo(this.curveEndPt)*0.25);

            this.curveControlPt.copy(this.curveStartPt).add(this.curveEndPt).multiplyScalar(0.5);
            this.curveControlPt.add(normalvec);

            this.curveControlPt = FoyrFP.utils.getQControlPoint(this.curveStartPt, this.curveControlPt, this.curveEndPt);
        }

        this.bezier.points[0].x = this.curveStartPt.x;
        this.bezier.points[0].y = this.curveStartPt.y;
        this.bezier.points[1].x = this.curveControlPt.x;
        this.bezier.points[1].y = this.curveControlPt.y;
        this.bezier.points[2].x = this.curveEndPt.x;
        this.bezier.points[2].y = this.curveEndPt.y;
        this.bezier.update();

        var curvelength = Math.ceil(this.bezier.length());
        var segments = Math.ceil(curvelength/0.5);

        if(segments < 1)
            return;

        var pts = this.bezier.getLUT(segments);
        this.curveptslength = pts.length;

        for(var i=0; i<pts.length; i++) {
            vertices.center[i].set(pts[i].x, pts[i].y);
            this.points[i].set(pts[i].x, pts[i].y);
            var distance = 0;
            if(i > 0){
                distance = this.points[i].distanceTo(this.points[i-1]);
                distance += this.distances[i-1];
            }
            this.distances[i] = distance;
        }

        this.walllength = 0;

        for(var i=0; i<pts.length; i++) {
            if(i < pts.length - 1)
            {
                normalvec.subVectors(vertices.center[i+1], vertices.center[i]);
                var x = normalvec.x;
                var y = normalvec.y;
                normalvec.set(-y, x).normalize().multiplyScalar(halfthickness);

                this.walllength += vertices.center[i].distanceTo(vertices.center[i+1]);
            }

            this.normals[i].copy(normalvec).normalize();

            //upper line
            vertices.upper[i].copy(vertices.center[i]).add(normalvec);
            //lower line
            vertices.lower[i].copy(vertices.center[i]).sub(normalvec);
        }
    }

    this.lineUpper.p1.set(vertices.upper[0].x, vertices.upper[0].y);
    this.lineUpper.p2.set(vertices.upper[1].x, vertices.upper[1].y);
    this.lineLower.p1.set(vertices.lower[0].x, vertices.lower[0].y);
    this.lineLower.p2.set(vertices.lower[1].x, vertices.lower[1].y);
    this.lineCenter.p1.set(vertices.center[0].x, vertices.center[0].y);
    this.lineCenter.p2.set(vertices.center[1].x, vertices.center[1].y);
}

FoyrFP.WallEdge.prototype.set = function(node1, node2) {
    this.node1 = node1;
    this.node2 = node2;
}

FoyrFP.WallEdge.prototype.convertToCurve = function() {

    this.curveStartPt.set(this.node1.position.x, this.node1.position.z);
    this.curveControlPt.set(this.ctrlnode.position.x, this.ctrlnode.position.z);
    this.curveEndPt.set(this.node2.position.x, this.node2.position.z);

    this.curveControlPt = FoyrFP.utils.getQControlPoint(this.curveStartPt, this.curveControlPt, this.curveEndPt);

    this.bezier = new Bezier([this.curveStartPt, this.curveControlPt, this.curveEndPt]);
    this.islinear = false;
    this.update();
}

FoyrFP.WallEdge.prototype.convertToLine = function() {

    this.curveStartPt.set(this.node1.position.x, this.node1.position.z);
    this.curveEndPt.set(this.node2.position.x, this.node2.position.z);

    //this.curveControlPt.addVectors(this.curveStartPt, this.curveEndPt).multiplyScalar(0.5);

    this.bezier = null;
    this.islinear = true;
}

FoyrFP.WallEdge.prototype.updatePosition = function (delta) {
    this.node1.updatePosition(delta);
    this.node2.updatePosition(delta);
}

FoyrFP.WallEdge.prototype.updateNode1Position = function (delta, pos, skipHalfDelta) {
    this.node1.updatePosition(delta, pos, skipHalfDelta);
}

FoyrFP.WallEdge.prototype.updateCtrlNodePosition = function (delta) {
    if(this.ctrlnode) {
        this.ctrlnode.updatePosition(delta);
    }
}

FoyrFP.WallEdge.prototype.canDelete = function () {
    return true;
}

FoyrFP.WallEdge.prototype.getIntersection = function(edge) {

}

FoyrFP.WallEdge.prototype.highlight = function(enable) {
    if(this.referencedParent) return;

    if(this.material.map){
        if(enable) {
            this.material.color.set(this.highlightcolor);
        } else {
            this.material.color.setHex(this.color);
        }
    } else {
        this.material.color.set(enable ? this.highlightcolor : this.originalcolor);
    }


}

FoyrFP.WallEdge.prototype.select = function(enable) {
    var scope = this;
    if(this.material.map){
        if(enable) {
            this.material.color.set(this.highlightcolor);
        } else {
            this.material.color.setHex(this.color);
        }
    } else {
        this.material.color.set(enable ? this.highlightcolor : this.originalcolor);
    }

    var editor = FoyrFP.utils.editor;
    var signals = editor.signals;

    signals.showWallEdgeOption.dispatch(enable ? this : null);
    var textureLoader = new THREE.TextureLoader();
    textureLoader.load('../editor/res/Capture.PNG', function (texture) {
        console.log('texture loaded');
        texture.minFilter = THREE.LinearFilter;

        scope.mesh3D[0].material.map = texture;


    });
}

FoyrFP.WallEdge.prototype.onValueUpdated = function(attributeName) {
    var editor = FoyrFP.utils.editor;

    if(attributeName == 'thickness') {
        editor.setWallThickness(this.thickness);
        this.update();
    } else if(attributeName == 'color') {
        this.material.color.setHex(this.color);
    }
}

FoyrFP.WallEdge.prototype.getCurveShapePoints = function() {
    var pts = [];
    if(!this.islinear) {
        for(var i=0; i<this.curveptslength; i++) {
            pts.push(this.points[i]);
        }
    }

    return pts;
}

FoyrFP.WallEdge.prototype.getNearestPoint = function(point) {
    var pos1 = this.node1.getWorldPosition(); //Vikas position;
    var pos2 = this.node2.getWorldPosition(); //Vikas position;
    var t1 = 0, t2 = 1;

    if(!this.islinear) {
        var pt2 = this.tempVector1;
        var distanceSqPoint = Infinity;
        var pt1 = this.tempVector2;
        for(var i=0; i<this.curveptslength; i++) {
            var index = 3*i;
            pt2.fromBufferAttribute(this.geometry.attributes.position, index + 1);
            var dist = pt2.distanceToSquared(point);
            if(dist < distanceSqPoint) {
                distanceSqPoint = dist;
            }
            else {
                t1 = (i-1)/this.curveptslength;
                t2 = i/this.curveptslength;
                break;
            }
            pt1.copy(pt2);
        }
        pos1 = pt1;
        pos2 = pt2;

    }
    var resultpoint = this.tempVector3;
    resultpoint = FoyrFP.utils.projectPointOnLineSegment(pos1, pos2, point, resultpoint);
    var factor = pos1.distanceTo(resultpoint)/pos1.distanceTo(pos2);
    var distanceSqPoint = resultpoint.distanceToSquared(point);

    var pt = resultpoint;
    var t = t1 + (t2 - t1)*factor;

    return {distance: distanceSqPoint, point: {x: pt.x, y: pt.y, z: pt.z}, t : t, object: this, pt1: pos1, pt2: pos2};
}

FoyrFP.WallEdge.prototype.getNormalAtT = function(t, result) {
    if(!this.islinear) {
        if(t <= 0) {
            result.set(this.normals[0].x, this.position.y, this.normals[0].y);
            return result;
        }
        if(t >= 1) {
            var last = this.curveptslength-1;
            result.set(this.normals[last].x, this.position.y, this.normals[last].y);
            return result;
        }
        var index = this.curveptslength - 1;
        var distT = t*this.walllength;
        for(var i=0; i<this.curveptslength; i++) {
            var distance = this.distances[i];
            if(distT <= distance) {
                index = i;
                break;
            }
        }

        //var indexFraction = t * this.curveptslength;
        //var index = Math.floor(indexFraction);
        return result.set(this.normals[index].x, this.position.y, this.normals[index].y);
    }
    else {
        return result.set(this.normalvector.x, this.position.y, this.normalvector.y);
    }

}

FoyrFP.WallEdge.prototype.getPointAtT = function(t, result) {
    if(!this.islinear) {
        if(t <= 0) {
            return result.set(this.points[0].x, this.position.y, this.points[0].y);
        }
        if(t >= 1) {
            var pt = this.points[this.curveptslength-1];
            return result.set(pt.x, this.position.y, pt.y);
        }
        var index = this.curveptslength - 1;
        var fraction = 0;
        var distT = t*this.walllength;
        for(var i=0; i<this.curveptslength; i++) {
            var distance = this.distances[i];
            if(distT < distance) {
                index = i-1;
                var deltaDist = this.distances[i] - this.distances[i-1];
                var distRem = this.distances[i] - distT;
                fraction = 1 - distRem/deltaDist;
                break;
            }
        }

        //var indexFraction = t * this.curveptslength;
        //var index = Math.floor(indexFraction);
        if(index == this.curveptslength-1) {
            var pt1 = this.points[index];
            return result.set(pt1.x, this.position.y, pt1.y);
        }

        //var fraction = indexFraction - index;
        var pt1 = this.points[index];
        var pt2 = this.points[index+1];
        this.vector2d_1.lerpVectors(pt1, pt2, fraction);
        return result.set(this.vector2d_1.x, this.position.y, this.vector2d_1.y);
    }
    else {
        var pos1 = this.node1.position;
        var pos2 = this.node2.position;
        if(t == 0) return result.copy(pos1);
        if(t == 1) return result.copy(pos2);

        result.lerpVectors(pos1, pos2, t);
        return result;
    }
}

FoyrFP.WallEdge.prototype.updateApertureList = function(){
    for(var i=0; i<this.children.length; i++) {
        var aperture = this.children[i];
        aperture.transformAperture(this.wallgroup);
    }
}

FoyrFP.WallEdge.prototype.getWallLength = function() {
    return this.walllength;
}

FoyrFP.WallEdge.prototype.getMesh3D = function() {
    var geometry = [];

    for(var wall = 0; wall < 2; wall++){
        geometry[wall] = this.mesh3D[wall].geometry;
        geometry[wall].dispose();
    }


    var width = this.walllength;
    var height = this.wallHeight;
    var vertices = this.wallgroup.edgevertices;
    var scope = this;

    console.log(width);
    console.log(this.curveptslength);
    /* //Vikas Working
     var shape = new THREE.Shape();
     shape.moveTo(0, 0);
     shape.lineTo(0, height);
     if(this.islinear) {
     shape.lineTo(width, height);
     shape.lineTo(width, 0);
     }
     else {
     var dist = 0;
     for(var i=1; i<this.curveptslength; i++) {
     dist += this.points[i].distanceTo(this.points[i-1]);
     shape.lineTo(dist, height);
     }

     for(var i=this.curveptslength-1; i>0; i--) {
     shape.lineTo(dist, 0);
     dist -= this.points[i].distanceTo(this.points[i-1]);
     }
     }
     shape.lineTo(0, 0); */

    //Vikas
    var shape = new THREE.Shape();
    if(this.islinear) {
        /*
         shape.moveTo(this.lineCenter.p1.x, this.lineCenter.p1.y);

         shape.lineTo(this.lineLower.p1.x, this.lineLower.p1.y);
         shape.lineTo(this.lineLower.p2.x, this.lineLower.p2.y);
         shape.lineTo(this.lineCenter.p2.x, this.lineCenter.p2.y);
         shape.lineTo(this.lineUpper.p2.x, this.lineUpper.p2.y);
         shape.lineTo(this.lineUpper.p1.x, this.lineUpper.p1.y);
         shape.lineTo(this.lineCenter.p1.x, this.lineCenter.p1.y); */

        /*
         shape.moveTo(0, 0);
         shape.lineTo(-this.lineCenter.p1.distanceTo(this.lineLower.p1), 0);
         shape.lineTo(-this.lineCenter.p2.distanceTo(this.lineLower.p2), this.lineLower.p1.distanceTo(this.lineLower.p2));
         shape.lineTo(0, this.lineCenter.p1.distanceTo(this.lineCenter.p2));
         shape.lineTo(this.lineCenter.p2.distanceTo(this.lineUpper.p2), this.lineUpper.p1.distanceTo(this.lineUpper.p2));
         shape.lineTo(this.lineUpper.p1.distanceTo(this.lineCenter.p1), 0);
         shape.lineTo(0, 0); */

        /*
         shape.moveTo(0, 0);
         shape.lineTo(this.lineLower.p1.distanceTo(this.lineCenter.p1), 0);
         shape.lineTo(this.lineLower.p1.distanceTo(this.lineCenter.p1) + this.lineCenter.p1.distanceTo(this.lineUpper.p1), 0);
         shape.lineTo(this.lineLower.p2.distanceTo(this.lineCenter.p2) + this.lineCenter.p2.distanceTo(this.lineUpper.p2), this.lineUpper.p1.distanceTo(this.lineUpper.p2));
         shape.lineTo(this.lineLower.p2.distanceTo(this.lineCenter.p2), this.lineCenter.p1.distanceTo(this.lineCenter.p2));
         shape.lineTo(0, this.lineLower.p1.distanceTo(this.lineLower.p2));
         shape.lineTo(0, 0); */

        shape.moveTo(0, 0);
        shape.lineTo(this.lineCenter.p1.distanceTo(this.lineLower.p1), 0);
        shape.lineTo(this.lineCenter.p2.distanceTo(this.lineLower.p2), this.lineLower.p1.distanceTo(this.lineLower.p2));
        shape.lineTo(0, this.lineCenter.p1.distanceTo(this.lineCenter.p2));
        shape.lineTo(-this.lineCenter.p2.distanceTo(this.lineUpper.p2), this.lineUpper.p1.distanceTo(this.lineUpper.p2));
        shape.lineTo(-this.lineCenter.p1.distanceTo(this.lineUpper.p1), 0);
        shape.lineTo(0, 0);

        this.linearPoints.center = [];
        this.linearPoints.lower = [];
        this.linearPoints.upper = [];

        this.linearPoints.center.push(this.lineCenter.p1);
        this.linearPoints.center.push(this.lineCenter.p2);
        this.linearPoints.lower.push(this.lineLower.p1);
        this.linearPoints.lower.push(this.lineLower.p2);
        this.linearPoints.upper.push(this.lineUpper.p1);
        this.linearPoints.upper.push(this.lineUpper.p2);
        console.log(this.linearPoints);

        // this.wallGeomPoints = [];
        //  this.wallGeomPoints = this.linearPoints;
    }
    else {
        shape.moveTo(0, 0);
        shape.lineTo(0, height);
        var dist = 0;
        for(var i=1; i<this.curveptslength; i++) {
            dist += this.points[i].distanceTo(this.points[i-1]);
            shape.lineTo(dist, height);
        }

        for(var i=this.curveptslength-1; i>0; i--) {
            shape.lineTo(dist, 0);
            dist -= this.points[i].distanceTo(this.points[i-1]);
        }
        shape.lineTo(0, 0);
        this.wallGeomPoints = [];
        this.wallGeomPoints = this.points;
    }


    //geometry = new THREE.ExtrudeGeometry(shape, {amount: this.thickness, bevelEnabled: false});
    //geometry = new THREE.ExtrudeGeometry(shape, {amount: this.wallHeight, bevelEnabled: false});
    //this.mesh3D.geometry = geometry;


    //console.log(vertices);

//TODO SIMAR
    geometry = new FoyrFP.WallGeometry(this.wallGeomPoints,this.linearPoints,this.distances,this.curveptslength,this.wallHeight,this.thickness,this.islinear);

    console.log(geometry);


    for(var wall=0; wall<2;wall++) {


        var wall_bsp;

        //if(this.children.length > 0)
        wall_bsp = new ThreeBSP(geometry[wall]);

        //shape.holes = [];

        for (var i = 0; i < this.children.length; i++) {
            var aperture = this.children[i];
            /*
             var hole = aperture.getShapePath();
             if(hole) {
             shape.holes.push(hole);
             }*/

            if (aperture.type !== 'topplane') continue;

            var aperturemesh = aperture.getTransformedMesh();
            if (aperturemesh) {
                this.mesh3D[wall].add(aperturemesh);

                var apertureMeshBoundingBox = new THREE.Box3().setFromObject(aperturemesh);
                //if(height > apertureMeshBoundingBox.min.y && height > apertureMeshBoundingBox.max.y)
                {
                    var hole = aperture.getShapePath();
                    if (hole) {
                        //shape.holes.push(hole);
                        var geohole = new THREE.ExtrudeGeometry(hole, {amount: this.thickness * 5, bevelEnabled: false});
                        var hole_bsp = new ThreeBSP(geohole);

                        wall_bsp = wall_bsp.subtract(hole_bsp);
                    }
                }
            }
        }
        //if(this.children.length > 0)
        geometry[wall] = wall_bsp.toGeometry();


        function boxUnwrapUVs(geometry, width, height, thickness) {

            if (!geometry.boundingBox) geometry.computeBoundingBox();

            var sz = new THREE.Vector3(width, height, thickness * 0.5);
            var min = new THREE.Vector3(0, 0, 0);
            console.log(sz);
            //console.log(szw)
            if (geometry.faceVertexUvs[0].length == 0) {
                for (var i = 0; i < geometry.faces.length; i++) {
                    geometry.faceVertexUvs[0].push([new THREE.Vector2(), new THREE.Vector2(), new THREE.Vector2()]);
                }
            }
            for (var i = 0; i < geometry.faces.length; i++) {
                var faceUVs = geometry.faceVertexUvs[0][i];
                var va = geometry.vertices[geometry.faces[i].a];
                var vb = geometry.vertices[geometry.faces[i].b];
                var vc = geometry.vertices[geometry.faces[i].c];
                var vab = new THREE.Vector3().copy(vb).sub(va);
                var vac = new THREE.Vector3().copy(vc).sub(va);
                //now we have 2 vectors to get the cross product of...
                var vcross = new THREE.Vector3().copy(vab).cross(vac);
                //Find the largest axis of the plane normal...

                vcross.set(Math.abs(vcross.x), Math.abs(vcross.y), Math.abs(vcross.z));
                var majorAxis = vcross.x > vcross.y ? (vcross.x > vcross.z ? 'x' : vcross.y > vcross.z ? 'y' : vcross.y > vcross.z) : vcross.y > vcross.z ? 'y' : 'z';
                //Take the other two axis from the largest axis
                var uAxis = majorAxis == 'x' ? 'y' : majorAxis == 'y' ? 'x' : 'x';
                var vAxis = majorAxis == 'x' ? 'z' : majorAxis == 'y' ? 'z' : 'y';
                faceUVs[0].set((va[uAxis] - min[uAxis]) / sz[uAxis], (va[vAxis] - min[vAxis]) / sz[vAxis]);
                faceUVs[1].set((vb[uAxis] - min[uAxis]) / sz[uAxis], (vb[vAxis] - min[vAxis]) / sz[vAxis]);
                faceUVs[2].set((vc[uAxis] - min[uAxis]) / sz[uAxis], (vc[vAxis] - min[vAxis]) / sz[vAxis]);
            }
            geometry.elementsNeedUpdate = geometry.verticesNeedUpdate = true;

            return geometry;
        }


        if (geometry[wall].type === "Geometry") {


            var offset = new THREE.Vector2(0, 0);
            var range = new THREE.Vector2(width, height);
            console.log(geometry[wall]);

            var faces = geometry[wall].faces;

            geometry[wall].faceVertexUvs[0] = [];

            for (var i = 0; i < faces.length; i++) {

                var v1 = geometry[wall].vertices[faces[i].a],
                    v2 = geometry[wall].vertices[faces[i].b],
                    v3 = geometry[wall].vertices[faces[i].c];

                geometry[wall].faceVertexUvs[0].push([
                    new THREE.Vector2((v1.x + offset.x) / range.x, (v1.y + offset.y) / range.y),
                    new THREE.Vector2((v2.x + offset.x) / range.x, (v2.y + offset.y) / range.y),
                    new THREE.Vector2((v3.x + offset.x) / range.x, (v3.y + offset.y) / range.y)
                ]);
            }
            geometry[wall].uvsNeedUpdate = true;

            // geometry = boxUnwrapUVs(geometry,width,height,this.thickness);


            console.log();
            var posX = 0;
            for (var i = 0; i < geometry[wall].vertices.length; i++) {
                var vt = (posX + geometry[wall].vertices[i].x) / (width);
                if (vt < 0) {
                    vt = 0;
                }
                if (vt > 1) {
                    vt = 1;
                }

                var pt = this.getPointAtT(vt, this.tempVector1);
                var normal = this.getNormalAtT(vt, this.tempVector2);

                var posTransformed = normal;
                posTransformed.normalize().multiplyScalar(geometry[wall].vertices[i].z).add(pt);

                posTransformed.sub(this.position);
                geometry[wall].vertices[i].x = posTransformed.x;
                geometry[wall].vertices[i].z = posTransformed.z;

            }


            geometry[wall].verticesNeedUpdate = true;
            geometry[wall].computeFaceNormals();
            geometry[wall].computeVertexNormals();


            this.mesh3D[wall].geometry = geometry[wall];

            var texture = foyrFPEditor.imageLoader.textureMap['walldefault'];
            if (this.material.map) {
                this.mesh3D[wall].material.map = this.material.map;
            } else {
                this.mesh3D[wall].material.map = texture;
            }
            this.mesh3D[wall].material.color.setHex(this.color);
            this.mesh3D[wall].material.needsUpdate = true;

        } else {
            this.mesh3D[wall].geometry = geometry[wall];
            /*        var textureLoader = new THREE.TextureLoader();
             textureLoader.load('../editor/res/Capture.PNG', function (texture) {
             console.log('texture loaded');
             texture.minFilter = THREE.LinearFilter;

             scope.mesh3D.material.map = texture;
             texture.needsUpdate = true;
             });*/
        }
        this.mesh3D[wall].material.needsUpdate = true;
    }

    console.log(this.mesh3D)
    //var vertexNormalsHelper = new THREE.FaceNormalsHelper( this.mesh3D, 2, 0x00ff00, 2 );
    //this.mesh3D.add( vertexNormalsHelper );
    //this.mesh3D.geometry.computeBoundingBox();
    return this.mesh3D;
}

FoyrFP.WallEdge.prototype.divideCurve = function(point) {
    var intersectdata = this.getNearestPoint(point);
    var pt = intersectdata.point;
    var t = intersectdata.t;
    var leftcurveT = t*0.5;
    var rightcurveT = t + (1-t)*0.5;
    var leftctrlpt = this.getPointAtT(leftcurveT, this.tempVector1);
    var rightctrlpt = this.getPointAtT(rightcurveT, this.tempVector2);

    var leftctrlnode = new FoyrFP.WallCtrlNode();
    leftctrlnode.position.copy(leftctrlpt);

    var rightctrlnode = new FoyrFP.WallCtrlNode();
    rightctrlnode.position.copy(rightctrlpt);

    var intersectedNode = new FoyrFP.WallNode(this.wallgroup);
    intersectedNode.position.set(pt.x, pt.y, pt.z);


    var wallcurveleft = new FoyrFP.WallEdge({node1: this.node1, node2: intersectedNode, wallgroup: this.wallgroup, ctrlnode: leftctrlnode});
    wallcurveleft.thickness = this.thickness;
    wallcurveleft.convertToCurve();

    var wallcurveright = new FoyrFP.WallEdge({node1: intersectedNode, node2: this.node2, wallgroup: this.wallgroup, ctrlnode: rightctrlnode});
    wallcurveright.thickness = this.thickness;
    wallcurveright.convertToCurve();

    return {left: wallcurveleft, right: wallcurveright};
}

FoyrFP.WallEdge.prototype.addLabel = function () {

    var editor = FoyrFP.utils.editor;

    if(!this.label2DParent) {
        this.label2DParent = this.wallgroup.parent ? this.wallgroup.parent.labelLayer : editor.viewport.labeldivcontainer;
    }

    if(!this.label2D) {
        this.label2D = new FoyrFP.Label2D(editor);
        this.label2D.setHTML("Label " + this.walllength);
        this.label2D.setParent(this);
        editor.textLabels.push(this.label2D);

        this.label2DParent.appendChild(this.label2D.element);
    }
}

FoyrFP.WallEdge.prototype.removeLabel = function () {

    var editor = FoyrFP.utils.editor;

    if(this.label2D && this.label2DParent) {
        var index = editor.textLabels.indexOf(this.label2D);
        if (index > -1) {
            editor.textLabels.splice(index, 1);
            this.label2DParent.removeChild(this.label2D.element);
            this.label2D = null;
        }
    }

}

FoyrFP.WallEdge.prototype.updateLabelVisibility = function (show) {

    if(this.label2D) {
        this.label2D.setVisibility(show);
    }

}

FoyrFP.WallEdge.prototype.toJSON = function () {

    var outputObj = {};

    outputObj.type = this.type;
    outputObj.uuid = this.uuid;
    outputObj.name = this.name;
    outputObj.position = this.position.toArray();
    outputObj.rotation = this.rotation.toArray();
    outputObj.scale = this.scale.toArray();
    outputObj.visible = this.visible;
    outputObj.renderOrder = this.renderOrder;
    outputObj.userData = this.userData;
    outputObj.islinear = this.islinear;
    outputObj.node1 = this.node1.uuid;
    outputObj.node2 = this.node2.uuid;
    outputObj.wallgroup = this.wallgroup.uuid;
    outputObj.ctrlnode = this.ctrlnode ? this.ctrlnode.toJSON() : undefined;
    outputObj.thickness = this.thickness;
    outputObj.color = this.color;
    outputObj.wallHeight = this.wallHeight;

    outputObj.children = [];
    for (var i=0; i<this.children.length; i++) {

        var child = this.children[i];
        var childOutputObj = child.toJSON();
        outputObj.children.push(childOutputObj);
    }

    return outputObj;
}

FoyrFP.WallEdge.prototype.to3dsMaxJSON = function (zip) {

    var outputObj = {};

    outputObj.type = this.type;
    outputObj.uuid = this.uuid;
    outputObj.name = this.name;
    outputObj.position = this.position.toArray();
    outputObj.rotation = this.rotation.toArray();
    outputObj.scale = this.scale.toArray();
    outputObj.visible = this.visible;
    outputObj.renderOrder = this.renderOrder;
    outputObj.userData = this.userData;
    outputObj.islinear = this.islinear;

    var filename = 'aws/walls/' + FoyrFP.utils.toAttribute(this.uuid) + '.obj';
    outputObj.objpath = filename;
    if (zip) {
        var exporter = new THREE.OBJExporter();
        zip.file(filename, exporter.parse(this.mesh3D, true));
    }
    outputObj.walllength = this.walllength;
    outputObj.wallHeight = this.wallHeight;
    outputObj.points = [];
    outputObj.normals = [];
    outputObj.distances = [];

    if(this.islinear) {
        outputObj.points.push([this.node1.position.x*12, this.node1.position.z*12]);
        outputObj.points.push([this.node2.position.x*12, this.node2.position.z*12]);
        outputObj.normals.push([this.normalvector.x, this.normalvector.y]);
    }
    else {
        for(var i=0; i<this.curveptslength; i++) {
            var pointval = [];
            var point = this.points[i];
            pointval[0] = (point.x*12);pointval[1] = (point.y*12);
            outputObj.points.push(pointval);

            var normalval = [];
            point = this.normals[i];
            normalval[0] = point.x;normalval[1] = point.y;
            outputObj.normals.push(normalval);

            outputObj.distances.push(this.distances[i]*12);
        }
    }
    outputObj.color = this.color;

    outputObj.children = [];
    for (var i=0; i<this.children.length; i++) {

        var child = this.children[i];
        var childOutputObj = child.to3dsMaxJSON();
        outputObj.children.push(childOutputObj);
    }

    return outputObj;
}

FoyrFP.WallEdge.prototype.fromJSON = function(node, json, parent) {

    this.type = node.type;
    this.uuid = node.uuid;
    this.name = node.name;
    this.position.fromArray(node.position);
    this.rotation.fromArray(node.rotation);
    this.scale.fromArray(node.scale);
    this.visible = node.visible;
    this.renderOrder = node.renderOrder;
    this.userData = node.userData;

    this.islinear = node.islinear;
    this.thickness = node.thickness;
    this.color = node.color;

    if(node.walllength) {
        this.walllength = node.walllength;
    }
    this.wallHeight = node.wallHeight ? node.wallHeight : 10 ;

    for(var childKey in node.children){

        var childNode = node.children[childKey];
        //FoyrFP.utils.traverseScenegraph(childNode, json, this)

        if (childNode.type === 'topplane') {

            var objectInstance = new FoyrFP.TopPlane();
            objectInstance.fromJSON(childNode, json, this);

            this.add(objectInstance);
        }

    }

}