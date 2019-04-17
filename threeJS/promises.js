var sphere1Mesh, sphere2Mesh;

var clock = new THREE.Clock();


var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 40);
camera.lookAt(new THREE.Vector3(0, 0, 0));

var renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xfff6e6);


document.body.appendChild(renderer.domElement);


var sphereGeom = new THREE.SphereGeometry(4, 64, 64);


var shaders = {
    vertex: {
        path: './shaders/vertex.vert'
    },
    fragment: {
        path: './shaders/fragment.frag'
    }
};

var uniforms = {
    effect: {
        value: 0
    },
    progress: {
        value: 0
    },
    from: {
        value: undefined
    },
    to: {
        value: undefined
    }
};

var path = './textures/';

var textures = {
    from: {
        tex_name: 'ccg_lab_001.jpg',
        val: undefined
    },
    to: {
        tex_name: 'ccg_lab_002.jpg',
        val: undefined
    }
};


var loader = new THREE.TextureLoader();
var promiseArray = [];



var promise = new Promise(function(resolve, reject) {
    vertex_loader = new THREE.FileLoader(THREE.DefaultLoadingManager);
    vertex_loader.setResponseType('text');
    vertex_loader.load(shaders.vertex.path, function(value) {
        resolve(vertex_loader);
    }, null, function() {
        console.log("Vertex Shader Failed");
    });
}).then(function() {
    fragment_loader = new THREE.FileLoader(THREE.DefaultLoadingManager);
    fragment_loader.setResponseType('text');
    fragment_loader.load(shaders.fragment.path, function() {
        resolve()
    }, null, function() {
        console.log("fragment Shader failed");
    });
}).then(function() {
    Promise.all(promiseArray).then(function(values) {
        uniforms.from.value = values[0];
        uniforms.to.value = values[1];
    });
});


for (var key in textures) {
    console.log(key + ':' + textures[key].tex_name);
    var url = path + textures[key].tex_name;
    pushtopromise(url, key);
}

function pushtopromise(url, _key) {
    promiseArray.push(new Promise(function(resolve, reject) {
        textures[_key].val = loader.load(url, function() {
                resolve(textures[_key]);
            },
            null,
            function() {
                reject("cannot load textures");
            });
    }));
}


































/*
var promise = new Promise(function(resolve, reject) {
        var texture = new THREE.TextureLoader().load("textures/monthly.png", function() {
            resolve(texture);
        }, null, function() {
            reject("Cannot load texture");
        });
    })
    .then(function(texture) {
        var sphere1Mat = new THREE.MeshBasicMaterial({
            flatShading: true,
            map: texture,
            side: THREE.DoubleSide
        });
        sphere1Mesh = new THREE.Mesh(sphereGeom, sphere1Mat);
        scene.add(sphere1Mesh);

        animate();
    })
    .catch(function(error) {
        console.error(error);
    });
*/
function animate() {
    var delta = clock.getDelta();
    sphere1Mesh.rotation.y += delta * 0.5;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

/* 
console.log("main function resuming");

var sphere2Mat = new THREE.MeshBasicMaterial({
    color: 0xffeeff,
    side: THREE.DoubleSide
});

sphere2Mesh = new THREE.Mesh(sphereGeom, sphere2Mat);
scene.add(sphere2Mesh);
animateMain();

function animateMain() {
    sphere2Mesh.position.y = 3.0;
    renderer.render(scene, camera);
    requestAnimationFrame(animateMain);
} */