/**
 * @author arodic / https://github.com/arodic
 */

( function () {

	'use strict';

	var GizmoMaterial = function ( parameters ) {
		THREE.MeshBasicMaterial.call( this );
		this.depthTest = false;
		this.depthWrite = false;
		this.fog = false;
		this.side = THREE.FrontSide;
		this.transparent = true;

		this.setValues( parameters );
		this.oldColor = this.color.clone();
		this.oldOpacity = this.opacity;
		this.highlight = function ( highlighted ) {
			if ( highlighted ) {
				this.color.setRGB( 1, 1, 0 );
				this.opacity = 1;
			} else {
				this.color.copy( this.oldColor );
				this.opacity = this.oldOpacity;
			}
		};
	};

	GizmoMaterial.prototype = Object.create( THREE.MeshBasicMaterial.prototype );
	GizmoMaterial.prototype.constructor = GizmoMaterial;

	var GizmoLineMaterial = function ( parameters ) {
		THREE.LineBasicMaterial.call( this );
		this.depthTest = false;
		this.depthWrite = false;
		this.fog = false;
		this.transparent = true;
		this.linewidth = 1;

		this.setValues( parameters );

		this.oldColor = this.color.clone();
		this.oldOpacity = this.opacity;

		this.highlight = function ( highlighted ) {
			if ( highlighted ) {
				this.color.setRGB( 0, 0.2, 0.5 );
				this.opacity = 1;
			} else {
				this.color.copy( this.oldColor );
				this.opacity = this.oldOpacity;
			}
		};
	};

	GizmoLineMaterial.prototype = Object.create( THREE.LineBasicMaterial.prototype );
	GizmoLineMaterial.prototype.constructor = GizmoLineMaterial;

	var pickerMaterial = new GizmoMaterial( { visible: false, transparent: false } );
	var scope = this;
	THREE.RotationGizmo = function () {

		this.init = function () {
			THREE.Object3D.call( this );

			this.handles = new THREE.Object3D();
			this.pickers = new THREE.Object3D();
			this.planes = new THREE.Object3D();

			this.add( this.handles );
			this.add( this.pickers );
			this.add( this.planes );

			//// PLANES

			var planeGeometry = new THREE.PlaneBufferGeometry( 50, 50, 2, 2 );
			var planeMaterial = new THREE.MeshBasicMaterial( { visible: false, side: THREE.DoubleSide } );

			var planes = {
				"XY": new THREE.Mesh( planeGeometry, planeMaterial ),
				"YZ": new THREE.Mesh( planeGeometry, planeMaterial ),
				"XZ": new THREE.Mesh( planeGeometry, planeMaterial ),
			};
			planes[ "YZ" ].rotation.set( 0, Math.PI / 2, 0 );
			planes[ "XZ" ].rotation.set( - Math.PI / 2, 0, 0 );

			for ( var i in planes ) {
				planes[ i ].name = i;
				this.planes.add( planes[ i ] );
				this.planes[ i ] = planes[ i ];
			}
			//// HANDLES AND PICKERS
			var setupGizmos = function ( gizmoMap, parent ) {
				for ( var name in gizmoMap ) {
					for ( i = gizmoMap[ name ].length; i --; ) {
						var object = gizmoMap[ name ][ i ][ 0 ];
						var position = gizmoMap[ name ][ i ][ 1 ];
						var rotation = gizmoMap[ name ][ i ][ 2 ];
						object.name = name;
						object.renderOrder = Infinity; // avoid being hidden by other transparent objects
						if ( position ) object.position.set( position[ 0 ], position[ 1 ], position[ 2 ] );
						if ( rotation ) object.rotation.set( rotation[ 0 ], rotation[ 1 ], rotation[ 2 ] );
						parent.add( object );
					}
				}
			};

			setupGizmos( this.handleGizmos, this.handles );
			setupGizmos( this.pickerGizmos, this.pickers );

			// reset Transformations

			this.traverse( function ( child ) {

				if ( child instanceof THREE.Mesh ) {
					child.updateMatrix();

					var tempGeometry = child.geometry.clone();
					tempGeometry.applyMatrix( child.matrix );
					child.geometry = tempGeometry;

					child.position.set( 0, 0, 0 );
					child.rotation.set( 0.03, 0.03, 0.03 );
					child.scale.set( 1, 1, 1 );
				}
			} );
		};

		this.highlight = function ( axis ) {
			this.traverse( function ( child ) {
				if ( child.material && child.material.highlight ) {
					if ( child.name === axis ) {
						child.material.highlight( true );
					} else {
						child.material.highlight( false );
					}
				}
			} );
		};
	};

	THREE.RotationGizmo.prototype = Object.create( THREE.Object3D.prototype );
	THREE.RotationGizmo.prototype.constructor = THREE.RotationGizmo;

	THREE.RotateGizmoRotate = function () {

		THREE.RotationGizmo.call( this );

		var CircleGeometry = function ( radius, facing, arc ) {

			var geometry = new THREE.BufferGeometry();
			var vertices = [];
			arc = arc ? arc : 1;
			for ( var i = 0; i <= 64 * arc; ++ i ) {
				if ( facing === 'x' ) vertices.push( 0, Math.cos( i / 32 * Math.PI ) * radius, Math.sin( i / 32 * Math.PI ) * radius );
				if ( facing === 'y' ) vertices.push( Math.cos( i / 32 * Math.PI ) * radius, 0, Math.sin( i / 32 * Math.PI ) * radius );
				if ( facing === 'z' ) vertices.push( Math.sin( i / 32 * Math.PI ) * radius, Math.cos( i / 32 * Math.PI ) * radius, 0 );

			}
			geometry.addAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
			return geometry;
		};
		this.handleGizmos = {

			X: [
				[ new THREE.Line( new CircleGeometry( 1, 'x', 1), new GizmoLineMaterial( { color: 0xff0000 } ) ) ]
			],

			Y: [
				[ new THREE.Line( new CircleGeometry( 1, 'y', 1 ), new GizmoLineMaterial( { color: 0x00ff00 } ) ) ]
			],

			Z: [
				[ new THREE.Line( new CircleGeometry( 1, 'z', 1 ), new GizmoLineMaterial( { color: 0x0000ff } ) ) ]
			],

		};

		this.pickerGizmos = {

			X: [
				[ new THREE.Mesh( new THREE.TorusBufferGeometry( 1, 0.12, 4, 12, Math.PI * 2 ), pickerMaterial ), [ 0, 0, 0 ], [ 0, - Math.PI / 2, - Math.PI / 2 ]]
			],

			Y: [
				[ new THREE.Mesh( new THREE.TorusBufferGeometry( 1, 0.12, 4, 12, Math.PI * 2 ), pickerMaterial ), [ 0, 0, 0 ], [ Math.PI / 2, 0, 0 ]]
			],

			Z: [
				[ new THREE.Mesh( new THREE.TorusBufferGeometry( 1, 0.12, 4, 12, Math.PI * 2 ), pickerMaterial ), [ 0, 0, 0 ], [ 0, 0, - Math.PI / 2 ]]
			],


		};




		this.setActivePlane = function ( axis ) {
			if ( axis === "X" ) this.activePlane = this.planes[ "YZ" ];
			if ( axis === "Y" ) this.activePlane = this.planes[ "XZ" ];
			if ( axis === "Z" ) this.activePlane = this.planes[ "XY" ];
		};


		this.init();
	};

	THREE.RotateGizmoRotate.prototype = Object.create( THREE.RotationGizmo.prototype );
	THREE.RotateGizmoRotate.prototype.constructor = THREE.RotateGizmoRotate;

	THREE.RotationControls = function ( camera, domElement ) {

		// TODO: Make non-uniform scale and rotate play nice in hierarchies
		// TODO: ADD RXYZ contol

		THREE.Object3D.call( this );

		domElement = ( domElement !== undefined ) ? domElement : document;

		this.object = undefined;
		this.visible = false;
		this.translationSnap = null;
		this.rotationSnap = null;
		this.space = "world";
		this.size = 1;
		this.axis = null;


		var scope = this;

		var _mode = "rotate";
		var _dragging = false;
		var _gizmo = {
			"rotate": new THREE.RotateGizmoRotate(),
		};

		for ( var type in _gizmo ) {
			var gizmoObj = _gizmo[ type ];

			gizmoObj.visible = ( type === _mode );
			this.add( gizmoObj );
		}

		var changeEvent = { type: "change" };
		var mouseDownEvent = { type: "mouseDown" };
		var mouseUpEvent = { type: "mouseUp", mode: _mode };
		var objectChangeEvent = { type: "objectChange" };

		var ray = new THREE.Raycaster();
		var pointerVector = new THREE.Vector2();

		var point = new THREE.Vector3();
		var offset = new THREE.Vector3();

		var rotation = new THREE.Vector3();
		var offsetRotation = new THREE.Vector3();
		var scale = 1;

		var eye = new THREE.Vector3();

		var tempMatrix = new THREE.Matrix4();
		var tempVector = new THREE.Vector3();
		var tempQuaternion = new THREE.Quaternion();
		var unitX = new THREE.Vector3( 1, 0, 0 );
		var unitY = new THREE.Vector3( 0, 1, 0 );
		var unitZ = new THREE.Vector3( 0, 0, 1 );

		var quaternionXYZ = new THREE.Quaternion();
		var quaternionX = new THREE.Quaternion();
		var quaternionY = new THREE.Quaternion();
		var quaternionZ = new THREE.Quaternion();

		var oldRotationMatrix = new THREE.Matrix4();

		var parentRotationMatrix = new THREE.Matrix4();

		var worldPosition = new THREE.Vector3();
		var worldRotation = new THREE.Euler();
		var worldRotationMatrix = new THREE.Matrix4();
		var camPosition = new THREE.Vector3();
		var camRotation = new THREE.Euler();

		domElement.addEventListener( "mousedown", onPointerDown, false );
		domElement.addEventListener( "touchstart", onPointerDown, false );

		domElement.addEventListener( "mousemove", onPointerHover, false );
		domElement.addEventListener( "touchmove", onPointerHover, false );

		domElement.addEventListener( "mousemove", onPointerMove, false );
		domElement.addEventListener( "touchmove", onPointerMove, false );

		domElement.addEventListener( "mouseup", onPointerUp, false );
		domElement.addEventListener( "mouseout", onPointerUp, false );
		domElement.addEventListener( "touchend", onPointerUp, false );
		domElement.addEventListener( "touchcancel", onPointerUp, false );
		domElement.addEventListener( "touchleave", onPointerUp, false );

		this.dispose = function () {

			domElement.removeEventListener( "mousedown", onPointerDown );
			domElement.removeEventListener( "touchstart", onPointerDown );

			domElement.removeEventListener( "mousemove", onPointerHover );
			domElement.removeEventListener( "touchmove", onPointerHover );

			domElement.removeEventListener( "mousemove", onPointerMove );
			domElement.removeEventListener( "touchmove", onPointerMove );

			domElement.removeEventListener( "mouseup", onPointerUp );
			domElement.removeEventListener( "mouseout", onPointerUp );
			domElement.removeEventListener( "touchend", onPointerUp );
			domElement.removeEventListener( "touchcancel", onPointerUp );
			domElement.removeEventListener( "touchleave", onPointerUp );

		};

		this.attach = function ( object ) {

			this.object = object;
			this.visible = true;
			this.update();

		};

		this.detach = function () {

			this.object = undefined;
			this.visible = false;
			this.axis = null;

		};

		this.getMode = function () {

			return _mode;

		};

		this.setMode = function ( mode ) {
				mode = 'rotate';
			_mode = mode ? mode : _mode;

			for ( var type in _gizmo ) _gizmo[ type ].visible = ( type === _mode );
			this.update();
			scope.dispatchEvent( changeEvent );
		};


/*
		this.setRotationSnap = function ( rotationSnap ) {
			scope.rotationSnap = rotationSnap;
		};
*/

		this.setSize = function ( size ) {
			scope.size = size;
			this.update();
			scope.dispatchEvent( changeEvent );
		};

		this.setAxis = function(axis) {
			console.log(_gizmo[ _mode ].pickers.children);
			switch(axis) {

				case 'X' :
					_gizmo[ _mode ].pickers.children[0].visible = true;
					_gizmo[ _mode ].pickers.children[1].visible = false;
					_gizmo[ _mode ].pickers.children[2].visible = false;

					_gizmo[ _mode ].handles.children[0].visible = true;
					_gizmo[ _mode ].handles.children[1].visible = false;
					_gizmo[ _mode ].handles.children[2].visible = false;

					break;

				case 'Y' :
					_gizmo[ _mode ].pickers.children[0].visible = false;
					_gizmo[ _mode ].pickers.children[1].visible = true;
					_gizmo[ _mode ].pickers.children[2].visible = false;

					_gizmo[ _mode ].handles.children[0].visible = false;
					_gizmo[ _mode ].handles.children[1].visible = true;
					_gizmo[ _mode ].handles.children[2].visible = false;

					break;

				case 'Z' :
					_gizmo[ _mode ].pickers.children[0].visible = false;
					_gizmo[ _mode ].pickers.children[1].visible = false;
					_gizmo[ _mode ].pickers.children[2].visible = true;

					_gizmo[ _mode ].handles.children[0].visible = false;
					_gizmo[ _mode ].handles.children[1].visible = false;
					_gizmo[ _mode ].handles.children[2].visible = true;

					break;
				case 'xyz' :
					_gizmo[ _mode ].pickers.children[0].visible = true;
					_gizmo[ _mode ].pickers.children[1].visible = true;
					_gizmo[ _mode ].pickers.children[2].visible = true;
					_gizmo[ _mode ].handles.children[0].visible = true;
					_gizmo[ _mode ].handles.children[1].visible = true;
					_gizmo[ _mode ].handles.children[2].visible = true;

					break;

				default :
					console.log("rotation is off");
			}
			scope.axis = axis;
			this.update();
			scope.dispatchEvent( changeEvent );

		};


		this.update = function () {

			if ( scope.object === undefined ) return;

			scope.object.updateMatrixWorld();
			worldPosition.setFromMatrixPosition( scope.object.matrixWorld );
			worldRotation.setFromRotationMatrix( tempMatrix.extractRotation( scope.object.matrixWorld ) );

			camera.updateMatrixWorld();
			camPosition.setFromMatrixPosition( camera.matrixWorld );
			camRotation.setFromRotationMatrix( tempMatrix.extractRotation( camera.matrixWorld ) );

			scale = worldPosition.distanceTo( camPosition ) / 6 * scope.size;
			this.position.copy( worldPosition );
			this.scale.set( scale, scale, scale );

			if ( camera instanceof THREE.PerspectiveCamera ) {
				eye.copy( camPosition ).sub( worldPosition ).normalize();
			} else if ( camera instanceof THREE.OrthographicCamera ) {
				eye.copy( camPosition ).normalize();
			}
			//_gizmo[ _mode ].highlight( scope.axis );

		};

		function onPointerHover( event ) {

			if ( scope.object === undefined || _dragging === true || ( event.button !== undefined && event.button !== 0 ) ) return;

			var pointer = event.changedTouches ? event.changedTouches[ 0 ] : event;

			var intersect = intersectObjects( pointer, _gizmo[ _mode ].pickers.children );

			var axis = null;

			if ( intersect ) {
				axis = intersect.object.name;
				event.preventDefault();
			}

			if ( scope.axis !== axis ) {
				scope.axis = axis;
				scope.update();
				_gizmo[ _mode ].highlight( scope.axis );

				scope.dispatchEvent( changeEvent );
			}
		}
		function onPointerDown( event ) {

			if ( scope.object === undefined || _dragging === true || ( event.button !== undefined && event.button !== 0 ) ) return;

			var pointer = event.changedTouches ? event.changedTouches[ 0 ] : event;

			if ( pointer.button === 0 || pointer.button === undefined ) {
				var intersect = intersectObjects( pointer, _gizmo[ _mode ].pickers.children );
				if ( intersect ) {
					event.preventDefault();
					event.stopPropagation();

					scope.axis = intersect.object.name;

					scope.dispatchEvent( mouseDownEvent );

					scope.update();
					_gizmo[ _mode ].highlight( scope.axis );

					eye.copy( camPosition ).sub( worldPosition ).normalize();

					_gizmo[ _mode ].setActivePlane( scope.axis, eye );

					var planeIntersect = intersectObjects( pointer, [ _gizmo[ _mode ].activePlane ] );

					if ( planeIntersect ) {

						oldRotationMatrix.extractRotation( scope.object.matrix );
						worldRotationMatrix.extractRotation( scope.object.matrixWorld );

						parentRotationMatrix.extractRotation( scope.object.parent.matrixWorld );

						offset.copy( planeIntersect.point );
					}
				}
			}
			_dragging = true;
		}

		function onPointerMove( event ) {

			if ( scope.object === undefined || scope.axis === null || _dragging === false || ( event.button !== undefined && event.button !== 0 ) ) return;

			var pointer = event.changedTouches ? event.changedTouches[ 0 ] : event;
			var planeIntersect = intersectObjects( pointer, [ _gizmo[ _mode ].activePlane ] );

			if ( planeIntersect === false ) return;

			event.preventDefault();
			event.stopPropagation();

			point.copy( planeIntersect.point );

			 if ( _mode === "rotate" ) {

				point.sub( worldPosition );
				tempVector.copy( offset ).sub( worldPosition );


			 if ( scope.space === "world" ) {
					rotation.set( Math.atan2( point.z, point.y ), Math.atan2( point.x, point.z ), Math.atan2( point.y, point.x ) );
					offsetRotation.set( Math.atan2( tempVector.z, tempVector.y ), Math.atan2( tempVector.x, tempVector.z ), Math.atan2( tempVector.y, tempVector.x ) );

					tempQuaternion.setFromRotationMatrix( tempMatrix.getInverse( parentRotationMatrix ) );

					if ( scope.rotationSnap !== null ) {
						quaternionX.setFromAxisAngle( unitX, Math.round( ( rotation.x - offsetRotation.x ) / scope.rotationSnap ) * scope.rotationSnap );
						quaternionY.setFromAxisAngle( unitY, Math.round( ( rotation.y - offsetRotation.y ) / scope.rotationSnap ) * scope.rotationSnap );
						quaternionZ.setFromAxisAngle( unitZ, Math.round( ( rotation.z - offsetRotation.z ) / scope.rotationSnap ) * scope.rotationSnap );

					} else {
						quaternionX.setFromAxisAngle( unitX, rotation.x - offsetRotation.x );
						quaternionY.setFromAxisAngle( unitY, rotation.y - offsetRotation.y );
						quaternionZ.setFromAxisAngle( unitZ, rotation.z - offsetRotation.z );
					}
					quaternionXYZ.setFromRotationMatrix( worldRotationMatrix );

				 if ( scope.axis === "X" ) tempQuaternion.multiplyQuaternions( tempQuaternion, quaternionX );
				 if ( scope.axis === "Y" ) tempQuaternion.multiplyQuaternions( tempQuaternion, quaternionY );
				 if ( scope.axis === "Z" ) tempQuaternion.multiplyQuaternions( tempQuaternion, quaternionZ );

					tempQuaternion.multiplyQuaternions( tempQuaternion, quaternionXYZ );
					scope.object.quaternion.copy( tempQuaternion );
				}
			}
			scope.update();
			scope.dispatchEvent( changeEvent );
			scope.dispatchEvent( objectChangeEvent );
		}

		function onPointerUp( event ) {
			event.preventDefault(); // Prevent MouseEvent on mobile
			if ( event.button !== undefined && event.button !== 0 ) return;
			if ( _dragging && ( scope.axis !== null ) ) {
				mouseUpEvent.mode = _mode;
				scope.dispatchEvent( mouseUpEvent );
			}
			_dragging = false;
			if ( 'TouchEvent' in window && event instanceof TouchEvent ) {
				// Force "rollover"
				scope.axis = null;
				scope.update();
				scope.dispatchEvent( changeEvent );
			} else {
				onPointerHover( event );
			}
		}
		function intersectObjects( pointer, objects ) {

			var rect = domElement.getBoundingClientRect();
			var x = ( pointer.clientX - rect.left ) / rect.width;
			var y = ( pointer.clientY - rect.top ) / rect.height;

			pointerVector.set( ( x * 2 ) - 1, - ( y * 2 ) + 1 );
			ray.setFromCamera( pointerVector, camera );

			var intersections = ray.intersectObjects( objects, true );
			return intersections[ 0 ] ? intersections[ 0 ] : false;
		}
	};

	THREE.RotationControls.prototype = Object.create( THREE.Object3D.prototype );
	THREE.RotationControls.prototype.constructor = THREE.RotationControls;

}() );
