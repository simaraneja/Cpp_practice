/**
 * Created by Singh on 8/17/2018.
 */
if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var container, stats;
var camera, scene, renderer, controls;
var raycaster = new THREE.Raycaster();

var mouse = new THREE.Vector2();
var selectedObjects = [];

var composer, effectFXAA, outlinePass;
var obj3d = new THREE.Object3D();

var group = new THREE.Group();

var params = {
    edgeStrength: 3.0,
    edgeGlow: 0.0,
    edgeThickness: 1.0,
    pulsePeriod: 0,
    rotate: false,
    usePatternTexture: false
};

// Init gui

var gui = new dat.GUI( { width: 300 } );

gui.add( params, 'edgeStrength', 0.01, 10 ).onChange( function ( value ) {

    outlinePass.edgeStrength = Number( value );

} );

gui.add( params, 'edgeGlow', 0.0, 1 ).onChange( function ( value ) {

    outlinePass.edgeGlow = Number( value );

} );

gui.add( params, 'edgeThickness', 1, 4 ).onChange( function ( value ) {

    outlinePass.edgeThickness = Number( value );

} );

gui.add( params, 'pulsePeriod', 0.0, 5 ).onChange( function ( value ) {

    outlinePass.pulsePeriod = Number( value );

} );

gui.add( params, 'rotate' );

gui.add( params, 'usePatternTexture' ).onChange( function ( value ) {

    outlinePass.usePatternTexture = value;

} );

var Configuration = function () {

    this.visibleEdgeColor = '#ffffff';
    this.hiddenEdgeColor = '#190a05';

};

var conf = new Configuration();

var controllerVisible = gui.addColor( conf, 'visibleEdgeColor' ).onChange( function ( value ) {

    outlinePass.visibleEdgeColor.set( value );

} );

var controllerHidden = gui.addColor( conf, 'hiddenEdgeColor' ).onChange( function ( value ) {

    outlinePass.hiddenEdgeColor.set( value );

} );

init();
animate();

function init() {

    container = document.createElement( 'div' );
    document.body.appendChild( container );

    var width = window.innerWidth;
    var height = window.innerHeight;

    renderer = new THREE.WebGLRenderer();
   // renderer.shadowMap.enabled = true;
    // todo - support pixelRatio in this demo
    renderer.setSize( width, height );
    document.body.appendChild( renderer.domElement );

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 45, width / height, 0.1, 100 );
    camera.position.set( 0, 0, 8 );

    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.minDistance = 5;
    controls.maxDistance = 20;
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;

    //

    scene.add( new THREE.AmbientLight( 0xaaaaaa, 0.5 ) );



    // model


    scene.add( group );


    //

    var geometry = new THREE.SphereBufferGeometry( 3, 48, 24 );

    for ( var i = 0; i < 2; i ++ ) {

        var material = new THREE.MeshLambertMaterial();
        material.color.setHSL( Math.random(), 1.0, 0.3 );

        var mesh = new THREE.Mesh( geometry, material );
        mesh.position.x = Math.random() * 4 - 2;
        mesh.position.y = Math.random() * 4 - 2;
        mesh.position.z = Math.random() * 4 - 2;
        mesh.scale.multiplyScalar( Math.random() * 0.3 + 0.1 );
        group.add( mesh );

    }

    // postprocessing

    composer = new THREE.EffectComposer( renderer );

    var renderPass = new THREE.RenderPass( scene, camera );
    composer.addPass( renderPass );

    outlinePass = new THREE.OutlinePass( new THREE.Vector2( window.innerWidth, window.innerHeight ), scene, camera );
    composer.addPass( outlinePass );


    effectFXAA = new THREE.ShaderPass( THREE.FXAAShader );
    effectFXAA.uniforms[ 'resolution' ].value.set( 1 / window.innerWidth, 1 / window.innerHeight );
    effectFXAA.renderToScreen = true;
    composer.addPass( effectFXAA );

    window.addEventListener( 'resize', onWindowResize, false );

    window.addEventListener( 'mousemove', onTouchMove );
    window.addEventListener( 'touchmove', onTouchMove );

    function onTouchMove( event ) {

        var x, y;
        x = event.clientX;
        y = event.clientY;

        mouse.x = ( x / window.innerWidth ) * 2 - 1;
        mouse.y = - ( y / window.innerHeight ) * 2 + 1;

        checkIntersection();
    }

    function addSelectedObject( object ) {

        selectedObjects = [];
        selectedObjects.push( object );

    }

    function checkIntersection() {

        raycaster.setFromCamera( mouse, camera );

        var intersects = raycaster.intersectObjects( [ scene ], true );

        if ( intersects.length > 0 ) {

            var selectedObject = intersects[ 0 ].object;
            addSelectedObject( selectedObject );
            outlinePass.selectedObjects = selectedObjects;

        }
    }
}

function onWindowResize() {

    var width = window.innerWidth;
    var height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize( width, height );
    composer.setSize( width, height );

    effectFXAA.uniforms[ 'resolution' ].value.set( 1 / window.innerWidth, 1 / window.innerHeight );

}

function animate() {

    requestAnimationFrame( animate );

    controls.update();

    composer.render();

}