const canvas = document.getElementById('my_Canvas');
const gl = canvas.getContext('webgl');
var ang =0;
function drawScene(speed) {
var design_half_M_2D_front_face = [
 //x.x,y.y,z.z   x.x,y.y,z.z    x.x,y.y,z.z
   0.0,0.0,0.0,  0.4,0.8,0.0,   0.4,0.0,0.0,
   0.0,0.0,0.0,  0.0,-0.8,0.0,  0.4,0.0,0.0,

   0.4,0.8,0.0,  0.8,0.8,0.0,   0.4,-1.0,0.0,
   0.8,-1.0,0.0,  0.8,0.8,0.0,   0.4,-1.0,0.0,
];
var design_colours_half_M_2D = [49/255, 49/255, 49/255,1.0];
var design_half_M_3D = [];
design_half_M_3D.push.apply(design_half_M_3D,design_half_M_2D_front_face);
design_half_M_3D.push.apply(design_half_M_3D,translation(design_half_M_3D,0,0,-0.5));

var design_half_M_3D_sides = [
     //x.x,y.y,z.z   x.x,y.y,z.z    x.x,y.y,z.z
       0.0,0.0,0.0,  0.4,0.8,0.0,   0.0,0.0,-0.5,
       0.4,0.8,-0.5,  0.4,0.8,0.0,   0.0,0.0,-0.5,
       
       0.0,-0.8,0.0,  0.4,0.0,0.0,   0.0,-0.8,-0.5,
       0.4,0.0,-0.5,  0.4,0.0,0.0,   0.0,-0.8,-0.5,

       0.8,0.8,0.0,  0.8,-1.0,0.0,  0.8,0.8,-0.5,
       0.8,-1.0,-0.5, 0.8,-1.0,0.0,  0.8,0.8,-0.5,

       0.4,0.0,0.0,  0.4,-1.0,0.0,  0.4,0.0,-0.5,
       0.4,-1.0,-0.5, 0.4,-1.0,0.0,  0.4,0.0,-0.5,

       0.4,0.8,0.0,  0.8,0.8,0.0,   0.8,0.8,-0.5,
       0.4,0.8,0.0,  0.4,0.8,-0.5,   0.8,0.8,-0.5,

       0.4,-1.0,0.0,  0.8,-1.0,0.0,   0.8,-1.0,-0.5,
       0.4,-1.0,0.0,  0.4,-1.0,-0.5,   0.8,-1.0,-0.5,
]
var design_colours_half_M_3D_sides = [0, 0, 0,1.0];

var vertices = [];
var colours = [];
vertices.push.apply(vertices,design_half_M_3D);
for(i=0;i<design_half_M_3D.length/3;i++){colours.push.apply(colours,design_colours_half_M_2D);}
vertices.push.apply(vertices,design_half_M_3D_sides);
for(i=0;i<design_half_M_3D_sides.length/3;i++){colours.push.apply(colours,design_colours_half_M_3D_sides);}
vertices.push.apply(vertices,xyz_symmetry_scale(design_half_M_3D,-1,1,1));
for(i=0;i<design_half_M_3D.length/3;i++){colours.push.apply(colours,design_colours_half_M_2D);}
vertices.push.apply(vertices,xyz_symmetry_scale(design_half_M_3D_sides,-1,1,1));
for(i=0;i<design_half_M_3D_sides.length/3;i++){colours.push.apply(colours,design_colours_half_M_3D_sides);}

for(i=0;i<vertices.length;i+=3){
    var place_holder = vertices[i];
      vertices[i] = vertices[i]*Math.cos(30*Math.PI/180) + vertices[i+1]*Math.sin(30*Math.PI/180);
      vertices[i+1] = vertices[i+1]*Math.cos(30*Math.PI/180) - place_holder*Math.sin(30*Math.PI/180);
    }
  for(i=0;i<vertices.length;i+=3){
    var place_holder = vertices[i];
    vertices[i] = vertices[i]*Math.cos(ang*Math.PI/180) + vertices[i+2]*Math.sin(ang*Math.PI/180);
    vertices[i+2] = vertices[i+2]*Math.cos(ang*Math.PI/180) - place_holder*Math.sin(ang*Math.PI/180);
  }

const vertex_buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  
  const colour_buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colour_buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colours), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  
  const vertCode =
    "attribute vec3 coordinates;" +
    "attribute vec4 colors;"+
    "varying vec4 vcolors;"+
    "void main(void) { gl_Position = vec4(coordinates, 1.3);"+
    "vcolors = colors;}";
  
  const vertShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertShader, vertCode);
  gl.compileShader(vertShader);
  
  const fragCode = "precision mediump float;"+
  "varying vec4 vcolors;"+
  "void main(void) {gl_FragColor = vcolors;}";
  
  const fragShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragShader, fragCode);
  gl.compileShader(fragShader);
  
  var shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertShader);
  gl.attachShader(shaderProgram, fragShader);
  gl.linkProgram(shaderProgram);
  gl.useProgram(shaderProgram);
  
  gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
  const coord = gl.getAttribLocation(shaderProgram, "coordinates");
  gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(coord);
  
  gl.bindBuffer(gl.ARRAY_BUFFER, colour_buffer);
  const colors = gl.getAttribLocation(shaderProgram, "colors");
  gl.vertexAttribPointer(colors, 4, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(colors);

  gl.clearColor(1, 1, 1, 1);
gl.enable(gl.DEPTH_TEST);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.viewport(0, 0, canvas.width, canvas.height);
gl.drawArrays(gl.TRIANGLES, 0, vertices.length/3);
ang+=speed;
if(ang>=360){ang=0;}
}
//***************************************Animation*********************************************
var then = 0;
function render(now) {
  now *= 0.0001;  // convert to seconds
  const deltaTime = now - then;
  then = now;

  drawScene(0.8);

  requestAnimationFrame(render);
}
requestAnimationFrame(render);
//***************************************FUNCTIONS*********************************************

function xy_xz_yz_rotation(vertexArray, dep, indep,ang){
    var vecPoints = [];
    vecPoints.push.apply(vecPoints,vertexArray);
    for(i=0;i<vecPoints.length;i+=3){
    var place_holder = vecPoints[i+dep];
      vecPoints[i+dep] = vecPoints[i+dep]*Math.cos(ang*Math.PI/180) - vecPoints[i+indep]*Math.sin(ang*Math.PI/180);
      vecPoints[i+indep] = vecPoints[i+indep]*Math.cos(ang*Math.PI/180) + place_holder*Math.sin(ang*Math.PI/180);
    }
    return vecPoints;
}

function translation(vertexArray,plus_x,plus_y,plus_z){
    var vecPoints = [];
    for(i=0;i<vertexArray.length/3;i++){
        vecPoints.push(vertexArray[3*i]+plus_x);
        vecPoints.push(vertexArray[3*i+1]+plus_y);
        vecPoints.push(vertexArray[3*i+2]+plus_z);
    }
    return vecPoints;
}

function xyz_symmetry_scale(vertexArray,flip_x,flip_y,flip_z){
    var vecPoints = [];
    for(i=0;i<vertexArray.length/3;i++){
        vecPoints.push(vertexArray[3*i]*flip_x);
        vecPoints.push(vertexArray[3*i+1]*flip_y);
        vecPoints.push(vertexArray[3*i+2]*flip_z);
    }
    return vecPoints;
}
var page = true;
function callRubiks(){
  if(page){ document.getElementById("frame").src = "RubiksCube.html";
  document.getElementById("toCube").innerHTML="Go back home";
  page=false;
}
  else{ document.getElementById("frame").src = "3D_canvas_2.html";
  document.getElementById("toCube").innerHTML="Play with Rubik's Cube";
  page=true;
}
 
}
