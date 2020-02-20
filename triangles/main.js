$(function() {

	var $body = $('body'),
			$box = $('.box'),
			$newTriangle = $('.new-triangle'),
			$coordinates = $('button#coordinates'),
			$points = $('#points'),
			$transformations = $('#transformations'),
			$transformationBtns = $('#transformation-buttons'),
			$chooseTransformation = $('#choose-transformation'),
			$translationBtn = $('#translation-btn'),
			$reflectionBtn = $('#reflection-btn'),
			$rotationBtn = $('#rotation-btn'),
			$translation = $('#translation'),
			$reflection = $('#reflection'),
			$rotation = $('#rotation'),
			$horizontalSlide = $('#horizontal-slide'),
			$verticalSlide = $('#vertical-slide'),
			$translationSubmit = $('#translation-submit'),
			$overX = $('#over-x'),
			$overY = $('#over-y'),
			$over45 = $('#over45'),
			$overNeg45 = $('#over-45'),
			$90deg = $('.90deg'),
			$180deg = $('.180deg'),
			$270deg = $('.270deg'),
			$coordinateax = $('.ax'),
			$coordinateay = $('.ay'),
			$coordinatebx = $('.bx'),
			$coordinateby = $('.by'),
			$coordinatecx = $('.cx'),
			$coordinatecy = $('.cy'),
			$coordinatedx = $('.dx'),
			$coordinatedy = $('.dy'),
			$coordinateex = $('.ex'),
			$coordinateey = $('.ey'),
			$coordinatefx = $('.fx'),
			$coordinatefy = $('.fy'),
			$ax = $('#ax'),
			$ay = $('#ay'),
			$bx = $('#bx'),
			$by = $('#by'),
			$cx = $('#cx'),
			$cy = $('#cy'),
			$canvas = $('#canvas');

	//Declare global variables for canvas
	var renderer,
			scene,
			camera,
			controls,
			meshMaterial;

	// Declare global variables for original and transformed triangles
	var triangleABC = { ax: 0, ay: 0, bx: 0, by: 0, cx: 0, cy: 0};
	var triangleDEF = { dx: 0, dy: 0, ex: 0, ey: 0, fx: 0, fy: 0};

	// Set event handlers
	$coordinates.on('click', getPoints);
	$translationBtn.on('click', translation);
	$reflectionBtn.on('click', reflection);
	$rotationBtn.on('click', rotation);
	$translationSubmit.on('click', computeTranslation);
	$overX.on('click', reflectX);
	$overY.on('click', reflectY);
	$over45.on('click', reflect45);
	$overNeg45.on('click', reflectNeg45);
	$90deg.on('click', rotate90);
	$180deg.on('click', rotate180);
	$270deg.on('click', rotate270);

	// Store height and width and set the canvas	
	var width = $canvas.width();
	var height = window.innerHeight * 0.55;
	var container = document.getElementById("canvas");
	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize( width, height );
	renderer.setClearColor( 0xFFFFFF, 1.0 );
	container.appendChild( renderer.domElement );

	// Set the scene
	scene = new THREE.Scene();

	// Add axes using functions defined below
	axes = buildAxes(10);
	scene.add( axes );

	// var triangle = new THREE.Geometry();
	// var vertex1 = new THREE.Vector3(1, 1, 0);
	// var vertex2 = new THREE.Vector3(3, 3, 0);
	// var vertex3 = new THREE.Vector3(5, 1, 0);
	// triangle.vertices.push(vertex1);
	// triangle.vertices.push(vertex2);
	// triangle.vertices.push(vertex3);
	// triangle.faces.push( new THREE.Face3(0,2,1));
	// triangle.computeFaceNormals();
	// var mesh = new THREE.Mesh(triangle, new THREE.MeshNormalMaterial());
	// scene.add(mesh);

	// Set the camera above the axes
	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.set( 0, 0, 25 );
	camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );

	// // Controls to move the camera (Disabled)
	controls = new THREE.TrackballControls( camera );
	controls.rotateSpeed = 1.0;
	controls.zoomSpeed = 0.2;
	controls.panSpeed = 0.8;
	controls.noZoom = false;
	controls.noPan = false;
	controls.staticMoving = true;
	controls.dynamicDampingFactor = 0.3;

	// Animate
	animate();

	// Animates the scene
	function animate() {
		requestAnimationFrame( animate );
		controls.update();
		renderer.render( scene, camera );
	}

	// Function to build up the coordinate axes
	function buildAxes( length ) {
		var axes = new THREE.Object3D(),
		index;
		axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( length, 0, 0 ), 0x000000, 3 ) ); // +X
		for (index = -length; index <= length; index++) {
			axes.add( buildAxis( new THREE.Vector3( 0, index, 0 ), new THREE.Vector3( length, index, 0 ), 0x000000, 1 ) );		
		}
		axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( -length, 0, 0 ), 0x000000, 3) ); // -X
		for (index = -length; index <= length; index++) {
			axes.add( buildAxis( new THREE.Vector3( 0, index, 0 ), new THREE.Vector3( -length, index, 0 ), 0x000000, 1 ) );		
		}
		axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, length, 0 ), 0x000000, 3 ) ); // +Y
		for (index = -length; index <= length; index++) {
			axes.add( buildAxis( new THREE.Vector3( index, 0, 0 ), new THREE.Vector3( index, length, 0 ), 0x000000, 1 ) );		
		}
		axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, -length, 0 ), 0x000000, 3 ) ); // -Y
		for (index = -length; index <= length; index++) {
			axes.add( buildAxis( new THREE.Vector3( index, 0, 0 ), new THREE.Vector3( index, -length, 0 ), 0x000000, 1 ) );		
		}
		// axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, length ), 0x0000FF, false ) ); // +Z
		// axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, -length ), 0x0000FF, true ) ); // -Z
		return axes;
	}

	// Function to build single line
	function buildAxis( src, dst, colorHex, linewidth ) {
		var geom = new THREE.Geometry(),
			mat; 
		mat = new THREE.LineBasicMaterial({ linewidth: linewidth, color: colorHex });
		geom.vertices.push( src.clone() );
		geom.vertices.push( dst.clone() );
		var axis = new THREE.Line( geom, mat, THREE.LineSegments );
		return axis;
	}

	// On click, changes the background and toggles the translations window
	function translation() {
		event.preventDefault();
		$body.css('background-color', '#ffb2b2');
		$box.css('background-color', '#ffcccc');
		$chooseTransformation.toggle();
		$transformationBtns.toggle();
		$translation.toggle();
	}

	// Takes the values for h and k and computes the points D, E, and F.
	// Then calls function to render triangle DEF and show the new coordinates.
	function computeTranslation() {
		event.preventDefault();
		var h = Number($horizontalSlide.val());
		var k = Number($verticalSlide.val());
		triangleDEF.dx = triangleABC.ax + h;
		triangleDEF.dy = triangleABC.ay + k;
		triangleDEF.ex = triangleABC.bx + h;
		triangleDEF.ey = triangleABC.by + k;
		triangleDEF.fx = triangleABC.cx + h;
		triangleDEF.fy = triangleABC.cy + k;
		renderTriangleDEF();
		insertNewPoints();
		$newTriangle.toggle();
	}

	// On click, changes the background and toggles the reflections window
	function reflection() {
		event.preventDefault();
		$body.css('background-color', '#b2ffb2');
		$box.css('background-color', '#ccffcc');
		$chooseTransformation.toggle();
		$transformationBtns.toggle();
		$reflection.toggle();
	}

	// Takes the coordinates for triangle ABC and calculates the coordinates for
	// triangle DEF using a reflection over the x-axis.  Then calls function
	// to render triangle DEF and show the new coordinates
	function reflectX() {
		event.preventDefault();
		triangleDEF.dx = triangleABC.ax;
		triangleDEF.dy = -1 * triangleABC.ay;
		triangleDEF.ex = triangleABC.bx;
		triangleDEF.ey = -1 * triangleABC.by;
		triangleDEF.fx = triangleABC.cx;
		triangleDEF.fy = -1 * triangleABC.cy;
		renderTriangleDEF();
		insertNewPoints();
		$newTriangle.toggle();		
	}

	// Takes the coordinates for triangle ABC and calculates the coordinates for
	// triangle DEF using a reflection over the y-axis.  Then calls function
	// to render triangle DEF and show the new coordinates
	function reflectY() {
		event.preventDefault();
		triangleDEF.dx = -1 * triangleABC.ax;
		triangleDEF.dy = triangleABC.ay;
		triangleDEF.ex = -1 * triangleABC.bx;
		triangleDEF.ey = triangleABC.by;
		triangleDEF.fx = -1 * triangleABC.cx;
		triangleDEF.fy = triangleABC.cy;
		renderTriangleDEF();
		insertNewPoints();
		$newTriangle.toggle();		
	}

	// Takes the coordinates for triangle ABC and calculates the coordinates for
	// triangle DEF using a reflection over the line y=x (45 degrees).  Then calls
	// function to render triangle DEF and show the new coordinates
	function reflect45() {
		event.preventDefault();
		triangleDEF.dx = triangleABC.ay;
		triangleDEF.dy = triangleABC.ax;
		triangleDEF.ex = triangleABC.by;
		triangleDEF.ey = triangleABC.bx;
		triangleDEF.fx = triangleABC.cy;
		triangleDEF.fy = triangleABC.cx;
		renderTriangleDEF();
		insertNewPoints();
		$newTriangle.toggle();		
	}

	// Takes the coordinates for triangle ABC and calculates the coordinates for
	// triangle DEF using a reflection over the line y=-x (-45 degrees).  Then 
	// calls function to render triangle DEF and show the new coordinates
	function reflectNeg45() {
		event.preventDefault();
		triangleDEF.dx = -1 * triangleABC.ay;
		triangleDEF.dy = -1 * triangleABC.ax;
		triangleDEF.ex = -1 * triangleABC.by;
		triangleDEF.ey = -1 * triangleABC.bx;
		triangleDEF.fx = -1 * triangleABC.cy;
		triangleDEF.fy = -1 * triangleABC.cx;
		renderTriangleDEF();
		insertNewPoints();
		$newTriangle.toggle();		
	}

	// On click, changes the background and toggles the rotations window
	function rotation() {
		event.preventDefault();
		$body.css('background-color', '#b2b2ff');
		$box.css('background-color', '#ccccff');
		$chooseTransformation.toggle();
		$transformationBtns.toggle();
		$rotation.toggle();
	}

	// Takes the coordinates for triangle ABC and calculates the coordinates for
	// triangle DEF using a 90 degree rotation.  Then calls function
	// to render triangle DEF and show the new coordinates
	function rotate90() {
		event.preventDefault();
		triangleDEF.dx = -1 * triangleABC.ay;
		triangleDEF.dy = triangleABC.ax;
		triangleDEF.ex = -1 * triangleABC.by;
		triangleDEF.ey = triangleABC.bx;
		triangleDEF.fx = -1 * triangleABC.cy;
		triangleDEF.fy = triangleABC.cx;
		renderTriangleDEF();
		insertNewPoints();
		$newTriangle.toggle();		
	}

	// Takes the coordinates for triangle ABC and calculates the coordinates for
	// triangle DEF using a 90 degree rotation.  Then calls function
	// to render triangle DEF and show the new coordinates
	function rotate180() {
		event.preventDefault();
		triangleDEF.dx = -1 * triangleABC.ax;
		triangleDEF.dy = -1 * triangleABC.ay;
		triangleDEF.ex = -1 * triangleABC.bx;
		triangleDEF.ey = -1 * triangleABC.by;
		triangleDEF.fx = -1 * triangleABC.cx;
		triangleDEF.fy = -1 * triangleABC.cy;
		renderTriangleDEF();
		insertNewPoints();
		$newTriangle.toggle();		
	}

	// Takes the coordinates for triangle ABC and calculates the coordinates for
	// triangle DEF using a 90 degree rotation.  Then calls function
	// to render triangle DEF and show the new coordinates
	function rotate270() {
		event.preventDefault();
		triangleDEF.dx = triangleABC.ay;
		triangleDEF.dy = -1 * triangleABC.ax;
		triangleDEF.ex = triangleABC.by;
		triangleDEF.ey = -1 * triangleABC.bx;
		triangleDEF.fx = triangleABC.cy;
		triangleDEF.fy = -1 * triangleABC.cx;
		renderTriangleDEF();
		insertNewPoints();
		$newTriangle.toggle();		
	}

	// Takes in the values of the points and calls functions to render
	// the triangle and append the values to the page.  Then opens the
	// transformations window
	function getPoints() {
		event.preventDefault();
		triangleABC.ax = Number($ax.val());
		triangleABC.ay = Number($ay.val());
		triangleABC.bx = Number($bx.val());
		triangleABC.by = Number($by.val());
		triangleABC.cx = Number($cx.val());
		triangleABC.cy = Number($cy.val());
		renderTriangleABC();
		emptyPointBoxes();
		insertPoints();
		$points.toggle();
		$transformations.toggle();
	}
 
 	// Adds triangle ABC to the grid
	function renderTriangleABC() {
		var triABC = new THREE.Geometry();
		// Define the vertices
		var vertexA = new THREE.Vector3(triangleABC.ax, triangleABC.ay, 0);
		var vertexB = new THREE.Vector3(triangleABC.bx, triangleABC.by, 0);
		var vertexC = new THREE.Vector3(triangleABC.cx, triangleABC.cy, 0);
		// Push the vertices to the triangle
		triABC.vertices.push(vertexA);
		triABC.vertices.push(vertexB);
		triABC.vertices.push(vertexC);
		// Create the face
		triABC.faces.push( new THREE.Face3(0,1,2));
		triABC.faces.push( new THREE.Face3(0,2,1));
		triABC.computeFaceNormals();
		// Give the triangle a mesh and add it to the scene
		var mesh = new THREE.Mesh( triABC, new THREE.MeshNormalMaterial() );
		scene.add(mesh);
	}

	// Adds triangle DEF to the grid
	function renderTriangleDEF() {
		var triDEF = new THREE.Geometry();
		// Define the vertices
		var vertexD = new THREE.Vector3(triangleDEF.dx, triangleDEF.dy, 0);
		var vertexE = new THREE.Vector3(triangleDEF.ex, triangleDEF.ey, 0);
		var vertexF = new THREE.Vector3(triangleDEF.fx, triangleDEF.fy, 0);
		// Push the vertices to the triangle
		triDEF.vertices.push(vertexD);
		triDEF.vertices.push(vertexE);
		triDEF.vertices.push(vertexF);
		// Create the face
		triDEF.faces.push( new THREE.Face3(0,1,2));
		triDEF.faces.push( new THREE.Face3(0,2,1));
		triDEF.computeFaceNormals();
		// Give the triangle a mesh and add it to the scene
		var mesh = new THREE.Mesh( triDEF, new THREE.MeshNormalMaterial() );
		scene.add(mesh);
	}

	// Clears the coordinates out of the boxes to be reused
	function emptyPointBoxes() {
		$ax.val('');
		$ay.val('');
		$bx.val('');
		$by.val('');
		$cx.val('');
		$cy.val('');
	}

	// Appends the points for triangle ABC to the page
	function insertPoints() {
		$coordinateax.text(triangleABC.ax);
		$coordinateay.text(triangleABC.ay);
		$coordinatebx.text(triangleABC.bx);
		$coordinateby.text(triangleABC.by);
		$coordinatecx.text(triangleABC.cx);
		$coordinatecy.text(triangleABC.cy);
	}

	// Appends the points for triangle DEF to the page
	function insertNewPoints() {
		$coordinatedx.text(triangleDEF.dx);
		$coordinatedy.text(triangleDEF.dy);
		$coordinateex.text(triangleDEF.ex);
		$coordinateey.text(triangleDEF.ey);
		$coordinatefx.text(triangleDEF.fx);
		$coordinatefy.text(triangleDEF.fy);
	}

});





