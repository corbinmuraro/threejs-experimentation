
var width  = window.innerWidth,
    height = window.innerHeight;
var scene = new THREE.Scene();
var axes = new THREE.AxisHelper(200);
scene.add(axes);
var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
camera.position.y = -200;
camera.position.z = 100;
var renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
//renderer.shadowMapEnabled = true;
//renderer.shadowMapSoft = true;
loadTerrain('besseggen.bin', function (data){
    console.log(data);
    var geometry = new THREE.PlaneGeometry(200, 200, 199, 199);
    geometry.computeFaceNormals();
    geometry.computeVertexNormals();
    for (var i = 0, l = geometry.vertices.length; i < l; i++) {
        geometry.vertices[i].z = data[i] / 65535 * 100;
    }
    var material = new THREE.MeshPhongMaterial({
        color: 0xdddddd, 
        wireframe: true
    });
    var plane = new THREE.Mesh(geometry, material);
    plane.castShadow = true;
    plane.receiveShadow = true;
    scene.add(plane);
    var controls = new THREE.TrackballControls(camera); 
    document.getElementById('webgl').appendChild(renderer.domElement);
    scene.add(new THREE.AmbientLight(0x111111));
    var light = new THREE.DirectionalLight(0xffffff, 1);
    light.shadowCameraVisible = true;
    light.position.set(0,300,100);
    scene.add(light);
    render();
    function render() {
        controls.update();    
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }
});
var controls = new THREE.TrackballControls(camera); 
document.getElementById('webgl').appendChild(renderer.domElement);
render();
function render() {
    controls.update();    
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}
