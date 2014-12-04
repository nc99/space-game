function Game() {
	var scene;
	var camera;

	start();

	function start() {
		scene = new THREE.Scene();
		camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

		var renderer = new THREE.WebGLRenderer();
		renderer.setSize( window.innerWidth, window.innerHeight );
		renderer.domElement.style.width = "1280px";
		renderer.domElement.style.height = "720px";
		document.body.appendChild( renderer.domElement );

		var planet = new Planet( -3, 0, 0, 0x00ff00, Math.random(), Math.random() / 30 );
		var star = new Star( 2, 0, 0, 0xffff00, Math.random() * 2);
		

		//scene.add( new THREE.Mesh( new THREE.BoxGeometry( 1, 1, 1 ), new THREE.MeshBasicMaterial( { color: 0x00ff00 } ) ) );

		requestAnimationFrame( render );

		camera.position.z = 8;
		camera.lookAt( scene.position );

		var speed = Math.random() * 1000;

		function render() {
			planet.form.rotation.x += planet.rotation_speed;
			
			planet.form.position.x = Math.cos( Date.now() / speed ) * 5 + star.position.x;
			planet.form.position.y = Math.sin( Date.now() / speed ) * 5 + star.position.y;

			requestAnimationFrame( render );
			camera.lookAt( scene.position );
			renderer.render( scene, camera );
		}
		render();
	}



	function Planet(x, y, z, color, size, rotation_speed) {
		this.rotation_speed = rotation_speed;

		var geometry = new THREE.BoxGeometry( size, size, size );
		var material = new THREE.MeshPhongMaterial( { color: color } );
		var form = new THREE.Mesh( geometry, material );
		form.position.x = x;
		form.position.y = y;
		form.position.z = z;

		form.rotation.z = Math.random();
		this.form = form;
		scene.add( form );
	}

	function Star(x, y, z, color, size) {
		this.position = { };
		this.position.x = x;
		this.position.y = y;


		var geometry = new THREE.SphereGeometry( size, 32, 32 );
		var material = new THREE.MeshBasicMaterial( { color: color } );
		var form = new THREE.Mesh( geometry, material );
		form.position.x = x;
		form.position.y = y;
		form.position.z = z;

		scene.add( form );

		var light = new THREE.PointLight( 0xffffff, size, size * 64 );
		light.position.set( x, y, z + size + 1 );
		scene.add( light );
	}
}

