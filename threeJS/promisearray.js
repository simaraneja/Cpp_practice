 // instantiate a loader
 var loader = new THREE.TextureLoader();

 // earth textures
 var textures = {
     'map': {
         url: 'relief.jpg',
         val: undefined
     },
     'bumpMap': {
         url: 'elev_bump_4k.jpg',
         val: undefined
     },
     'specularMap': {
         url: 'wateretopo.png',
         val: undefined
     }
 };

 var texturePromises = [],
     path = './';

 for (var key in textures) {
     texturePromises.push(new Promise(function(resolve, reject) {
         var entry = textures[key];
         var url = path + entry.url;
         loader.load(url,
             function(texture) {
                 entry.val = texture;
                 if (entry.val instanceof THREE.Texture) resolve(entry);
             },
             function(xhr) {
                 console.log(url + ' ' + (xhr.loaded / xhr.total * 100) +
                     '% loaded');
             },
             function(xhr) {
                 reject(new Error(xhr +
                     'An error occurred loading while loading: ' +
                     entry.url));
             }
         );
     }));
 }