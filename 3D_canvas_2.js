/*Step1: Prepare the canvas and get WebGL context */

const canvas = document.getElementById("Canvas");
const gl = canvas.getContext("webgl");

var ang =[0,0,0];
var then = 0;
var index = 0;



// Draw the scene.
function drawScene(speed) {

/* Step2: Define the geometry and store it in buffer objects */
var vertices = [];
var colours = [];
var shapes = [120,90,60,45,30,45,60,90,120];
plot(shapes[index]);

  for(i=0;i<vertices.length;i+=3){
    var place_holder = vertices[i+1];
    vertices[i+1] = vertices[i+1]*Math.cos(ang[1]*Math.PI/180) + vertices[i+2]*Math.sin(ang[1]*Math.PI/180);
    vertices[i+2] = vertices[i+2]*Math.cos(ang[1]*Math.PI/180) - place_holder*Math.sin(ang[1]*Math.PI/180);
  }
  for(i=0;i<vertices.length;i+=3){
    var place_holder = vertices[i];
    vertices[i] = vertices[i]*Math.cos(ang[2]*Math.PI/180) + vertices[i+2]*Math.sin(ang[2]*Math.PI/180);
    vertices[i+2] = vertices[i+2]*Math.cos(ang[2]*Math.PI/180) - place_holder*Math.sin(ang[2]*Math.PI/180);
  }




var vertex_buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
gl.bindBuffer(gl.ARRAY_BUFFER, null);

var colour_buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, colour_buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colours), gl.STATIC_DRAW);
gl.bindBuffer(gl.ARRAY_BUFFER, null);

/* Step3: Create and compile Shader programs */
var vertCode =
  "attribute vec3 coordinates;" +
  "attribute vec4 colors;"+
  "varying vec4 vcolors;"+
  "void main(void) { gl_Position = vec4(coordinates,1.0);"+
  "vcolors = colors;}";
var vertShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertShader, vertCode);
gl.compileShader(vertShader);
var fragCode = "precision mediump float;"+
"varying vec4 vcolors;"+
"void main(void) {gl_FragColor = vcolors;}";
var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragShader, fragCode);
gl.compileShader(fragShader);var shaderProgram = gl.createProgram();
gl.attachShader(shaderProgram, vertShader);
gl.attachShader(shaderProgram, fragShader);
gl.linkProgram(shaderProgram);
gl.useProgram(shaderProgram);

/* Step 4: Associate the shader programs to buffer objects */
gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
var coord = gl.getAttribLocation(shaderProgram, "coordinates");
gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(coord);

gl.bindBuffer(gl.ARRAY_BUFFER, colour_buffer);
var colors = gl.getAttribLocation(shaderProgram, "colors");
gl.vertexAttribPointer(colors, 4, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(colors);

gl.clearColor(0, 0, 0, 0);
gl.enable(gl.DEPTH_TEST);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.viewport(0, 0, canvas.width, canvas.height);
gl.drawArrays(gl.TRIANGLES, 0, vertices.length/3);
if(center){ang[0]++;ang[1]=ang[0];ang[2]=ang[0];}
if(ang[0]>=360){ang[0]=0;ang[1]=0;}
if(ang[0]==90||ang[0]==180||ang[0]==270||ang[0]==360){index+=1;}
if(index==shapes.length){index=0;}

function plot(rot){
  for(p=0;p<360;p+=rot){
  var verticesholder = [];
  var coloursholder = [];
  circleSector3DxzRotDraw(verticesholder,-0.7,0,0, 0.25, 0, 360, 5,rot);
for(j=0;j<360/5;j++){
  for(i=0;i<3;i++){coloursholder.push(0,0.5,0.5,1);}
for(i=0;i<6;i++){coloursholder.push(0.5,0,0.5,1-j/150);}
}
vertices.push.apply(vertices,verticesholder);
colours.push.apply(colours,coloursholder);

for(i=0;i<vertices.length;i+=3){
  var place_holder = vertices[i];
  vertices[i] = vertices[i]*Math.cos(rot*Math.PI/180) + vertices[i+2]*Math.sin(rot*Math.PI/180);
  vertices[i+2] = vertices[i+2]*Math.cos(rot*Math.PI/180) - place_holder*Math.sin(rot*Math.PI/180);
}}
}
 
}

  var then = 0;

  // Draw the scene repeatedly
  function render(now) {
    now *= 0.001;  // convert to seconds
    const deltaTime = now - then;
    then = now;

    drawScene();

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);



function circleSector3DxzRotDraw(vecPoints, x0,y0,z0, rad, degAng_i, degAng_f, degAngStep,xzRotang){
  vecPoints.push(x0,y0,z0);
  for (thita = degAng_i; thita <= degAng_f; thita += degAngStep) {
    vecPoints.push(rad*Math.cos(thita*Math.PI/180)+x0,rad*Math.sin(thita*Math.PI/180)+y0,z0);
    if(thita-degAng_i>=degAngStep){
      vecPoints.push(vecPoints[vecPoints.length-2*3],vecPoints[vecPoints.length-2*3+1],vecPoints[vecPoints.length-2*3+2],
        vecPoints[vecPoints.length-1*3],vecPoints[vecPoints.length-1*3+1],vecPoints[vecPoints.length-1*3+2],
        vecPoints[vecPoints.length-1*3]*Math.cos(xzRotang*Math.PI/180)+vecPoints[vecPoints.length-1*3+2]*Math.sin(xzRotang*Math.PI/180),vecPoints[vecPoints.length-1*3+1],vecPoints[vecPoints.length-1*3+2]*Math.cos(xzRotang*Math.PI/180)-vecPoints[vecPoints.length-1*3]*Math.sin(xzRotang*Math.PI/180),
        vecPoints[vecPoints.length-2*3],vecPoints[vecPoints.length-2*3+1],vecPoints[vecPoints.length-2*3+2],
        vecPoints[vecPoints.length-1*3]*Math.cos(xzRotang*Math.PI/180)+vecPoints[vecPoints.length-1*3+2]*Math.sin(xzRotang*Math.PI/180),vecPoints[vecPoints.length-1*3+1],vecPoints[vecPoints.length-1*3+2]*Math.cos(xzRotang*Math.PI/180)-vecPoints[vecPoints.length-1*3]*Math.sin(xzRotang*Math.PI/180),
        vecPoints[vecPoints.length-2*3]*Math.cos(xzRotang*Math.PI/180)+vecPoints[vecPoints.length-2*3+2]*Math.sin(xzRotang*Math.PI/180),vecPoints[vecPoints.length-2*3+1],vecPoints[vecPoints.length-2*3+2]*Math.cos(xzRotang*Math.PI/180)-vecPoints[vecPoints.length-2*3]*Math.sin(xzRotang*Math.PI/180));
     
    }
    if(degAng_i<=thita-degAngStep && thita < degAng_f ){
       vecPoints.push(x0,y0,z0,rad*Math.cos(thita*Math.PI/180)+x0,rad*Math.sin(thita*Math.PI/180)+y0,z0);
    }
  }
}

var center = true;
function center(){
  if(center){
  document.getElementById("mode").style="stop-color:rgb(24, 206, 24);stop-opacity:1";
  center=false;
}
  else{
  document.getElementById("mode").style="stop-color:rgb(206, 24, 24);stop-opacity:1";
  center=true;
}
 
}
function start() {

}
function end() {
  clearInterval(counter)
}