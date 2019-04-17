var Editor = function () {

    this.DEFAULT_CAMERA = new THREE.PerspectiveCamera(50, 1, 0.01, 1000);
    this.DEFAULT_CAMERA.name = 'Camera';
    this.DEFAULT_CAMERA.position.set(0, 5, 10);
    this.DEFAULT_CAMERA.lookAt(new THREE.Vector3());

    var Signal = signals.Signal;

    this.signals = {
        colorRed : new Signal(),
        colorGreen : new Signal(),
        colorBlue : new Signal()
    };

};