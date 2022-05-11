var canvas = document.getElementById('my_Canvas');
var gl = canvas.getContext('experimental-webgl');
var ang = 1
var TotalAng = 0;
var Total = 0;
var row2XZ = true;
var row2XY = false;
var run = true;
var vertices_colors = [];
var colorArray = [];
var verticesMemory = [];
var colorsMemory = [];

var frontface = [0.8, 0.8, 0.8, 0.8];
var topface = [5.0, 5.0, 0.0, 0.8]
var rigthface = [0.0, 0.0, 1.0, 0.8];
var blackbackface = [1.0, 0.0, 0.0, 0.8];
var bottomface = [250 / 255, 104 / 255, 0.0, 0.8]
var leftface = [0.0, 1.0, 0.0, 0.8];
var black = [0.0, 0.0, 0.0, 1];
colorArray = [
    [frontface, topface, black, black, black, leftface],
    [frontface, topface, black, black, black, black],
    [frontface, topface, rigthface, black, black, black],

    [frontface, black, black, black, black, leftface],
    [frontface, black, black, black, black, black],
    [frontface, black, rigthface, black, black, black],

    [frontface, black, black, black, bottomface, leftface],
    [frontface, black, black, black, bottomface, black],
    [frontface, black, rigthface, black, bottomface, black],

    [black, topface, black, black, black, leftface],
    [black, topface, black, black, black, black],
    [black, topface, rigthface, black, black, black],

    [black, black, black, black, black, leftface],
    [black, black, black, black, black, black],
    [black, black, rigthface, black, black, black],

    [black, black, black, black, bottomface, leftface],
    [black, black, black, black, bottomface, black],
    [black, black, rigthface, black, bottomface, black],

    [black, topface, black, blackbackface, black, leftface],
    [black, topface, black, blackbackface, black, black],
    [black, topface, rigthface, blackbackface, black, black],

    [black, black, black, blackbackface, black, leftface],
    [black, black, black, blackbackface, black, black],
    [black, black, rigthface, blackbackface, black, black],

    [black, black, black, blackbackface, bottomface, leftface],
    [black, black, black, blackbackface, bottomface, black],
    [black, black, rigthface, blackbackface, bottomface, black]
]

vertices_colors.push(cube(-0.21, 0.21, 0.21, Math.sqrt(2) / 10, colorArray[0]));
vertices_colors.push(cube(0, 0.21, 0.21, Math.sqrt(2) / 10, colorArray[1]));
vertices_colors.push(cube(0.21, 0.21, 0.21, Math.sqrt(2) / 10, colorArray[2]));

vertices_colors.push(cube(-0.21, 0, 0.21, Math.sqrt(2) / 10, colorArray[3]));
vertices_colors.push(cube(0, 0, 0.21, Math.sqrt(2) / 10, colorArray[4]));
vertices_colors.push(cube(0.21, 0, 0.21, Math.sqrt(2) / 10, colorArray[5]));

vertices_colors.push(cube(-0.21, -0.21, 0.21, Math.sqrt(2) / 10, colorArray[6]));
vertices_colors.push(cube(0, -0.21, 0.21, Math.sqrt(2) / 10, colorArray[7]));
vertices_colors.push(cube(0.21, -0.21, 0.21, Math.sqrt(2) / 10, colorArray[8]));

vertices_colors.push(cube(-0.21, 0.21, 0, Math.sqrt(2) / 10, colorArray[9]));
vertices_colors.push(cube(0, 0.21, 0, Math.sqrt(2) / 10, colorArray[10]));
vertices_colors.push(cube(0.21, 0.21, 0, Math.sqrt(2) / 10, colorArray[11]));

vertices_colors.push(cube(-0.21, 0, 0, Math.sqrt(2) / 10, colorArray[12]));
vertices_colors.push(cube(0, 0, 0, Math.sqrt(2) / 10, colorArray[13]));
vertices_colors.push(cube(0.21, 0, 0, Math.sqrt(2) / 10, colorArray[14]));

vertices_colors.push(cube(-0.21, -0.21, 0, Math.sqrt(2) / 10, colorArray[15]));
vertices_colors.push(cube(0, -0.21, 0, Math.sqrt(2) / 10, colorArray[16]));
vertices_colors.push(cube(0.21, -0.21, 0, Math.sqrt(2) / 10, colorArray[17]));

vertices_colors.push(cube(-0.21, 0.21, -0.21, Math.sqrt(2) / 10, colorArray[18]));
vertices_colors.push(cube(0, 0.21, -0.21, Math.sqrt(2) / 10, colorArray[19]));
vertices_colors.push(cube(0.21, 0.21, -0.21, Math.sqrt(2) / 10, colorArray[20]));

vertices_colors.push(cube(-0.21, 0, -0.21, Math.sqrt(2) / 10, colorArray[21]));
vertices_colors.push(cube(0, 0, -0.21, Math.sqrt(2) / 10, colorArray[22]));
vertices_colors.push(cube(0.21, 0, -0.21, Math.sqrt(2) / 10, colorArray[23]));

vertices_colors.push(cube(-0.21, -0.21, -0.21, Math.sqrt(2) / 10, colorArray[24]));
vertices_colors.push(cube(0, -0.21, -0.21, Math.sqrt(2) / 10, colorArray[25]));
vertices_colors.push(cube(0.21, -0.21, -0.21, Math.sqrt(2) / 10, colorArray[26]));
var vertices_colors_memory = vertices_colors;
var move_xyz = [true, false, false, false, false, false, false, false, false];

function drawScene() {
    var vertices = [];
    var colors = [];
    rowxy(2, 0, 1, -1);
    rowyz(2, 1, 2);
    rowxz(2, 2, 3,1);
    rowxy(0, 3, 4, 1);
    rowxz(0, 4, 5,1);
    rowyz(0, 5, 0);



    for (i = 0; i < vertices_colors.length; i++) {
        vertices.push.apply(vertices, vertices_colors[i][0])
    }
    for (i = 0; i < vertices_colors.length; i++) {
        colors.push.apply(colors, vertices_colors[i][1])
    }



    for (i = 0; i < vertices.length; i += 3) {
        var place_holder = vertices[i];
        vertices[i] = vertices[i] * Math.cos(30 * Math.PI / 180) - vertices[i + 1] * Math.sin(30 * Math.PI / 180);
        vertices[i + 1] = vertices[i + 1] * Math.cos(30 * Math.PI / 180) + place_holder * Math.sin(30 * Math.PI / 180);
    }
    for (i = 0; i < vertices.length; i += 3) {
        var place_holder = vertices[i];
        vertices[i] = vertices[i] * Math.cos(45 * Math.PI / 180) - vertices[i + 2] * Math.sin(45 * Math.PI / 180);
        vertices[i + 2] = vertices[i + 2] * Math.cos(45 * Math.PI / 180) + place_holder * Math.sin(45 * Math.PI / 180);
    }/*
    for (i = 0; i < vertices.length; i += 3) {
        var place_holder = vertices[i];
        vertices[i] = vertices[i] * Math.cos(Total * Math.PI / 180) - vertices[i + 1] * Math.sin(Total * Math.PI / 180);
        vertices[i + 1] = vertices[i + 1] * Math.cos(Total * Math.PI / 180) + place_holder * Math.sin(Total * Math.PI / 180);
    }*/

    var vertex_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    var colors_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colors_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    /* Step3: Create and compile Shader programs */
    var vertCode =
        'attribute vec3 coordinates;' +
        'attribute vec4 colors;' +
        'varying lowp vec4 vcolors;' +
        'void main(void) { gl_Position = vec4(coordinates, 1.0);' +
        'vcolors = colors;}';
    var vertShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertShader, vertCode);
    gl.compileShader(vertShader);

    var fragCode =
        'varying lowp vec4 vcolors;' +
        'void main(void) {gl_FragColor = vcolors;}';
    var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragShader, fragCode);
    gl.compileShader(fragShader);

    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertShader);
    gl.attachShader(shaderProgram, fragShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    /* Step 4: Associate the shader programs to buffer objects */
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    var coord = gl.getAttribLocation(shaderProgram, "coordinates");
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(coord);

    gl.bindBuffer(gl.ARRAY_BUFFER, colors_buffer);
    var color = gl.getAttribLocation(shaderProgram, "colors");
    gl.vertexAttribPointer(color, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(color);

    /* Step5: Drawing the required object (triangle) */

    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 3);


    if (move_xyz[7]) {
        Total -= ang / 2;
        if (Total == 0) { move_xyz[7] = false; }
    }
    else {
        Total += ang / 2;
        if (Total == 180) { move_xyz[7] = true; }
    }
}
var then = 0;
function render(now) {
    now *= 0.001;  // convert to seconds
    const deltaTime = now - then;
    then = now;

    drawScene();

    requestAnimationFrame(render);
}
requestAnimationFrame(render);

function cube(x0, y0, z0, rad, array) {
    var vertex_color_vec = [];
    var vertexVec = [];
    var vector = [];
    var y = rad * Math.sin(45 * Math.PI / 180);
    var x = rad * Math.cos(45 * Math.PI / 180);
    var z = rad * Math.sin(45 * Math.PI / 180);
    vertexVec.push(x + x0, y + y0, z + z0, x + x0, -y + y0, z + z0, - x + x0, - y + y0, z + z0, x + x0, y + y0, z + z0, -x + x0, y + y0, z + z0, -x + x0, -y + y0, z + z0); //frontface
    vertexVec.push(x + x0, y + y0, z + z0, -x + x0, y + y0, z + z0, -x + x0, y + y0, -z + z0, x + x0, y + y0, z + z0, x + x0, y + y0, -z + z0, -x + x0, y + y0, -z + z0); //topface
    vertexVec.push(x + x0, y + y0, z + z0, x + x0, -y + y0, z + z0, x + x0, y + y0, -z + z0, x + x0, -y + y0, -z + z0, x + x0, -y + y0, z + z0, x + x0, y + y0, -z + z0); //rightface
    vertexVec.push(x + x0, y + y0, -z + z0, x + x0, -y + y0, -z + z0, - x + x0, - y + y0, -z + z0, x + x0, y + y0, -z + z0, -x + x0, y + y0, -z + z0, -x + x0, -y + y0, -z + z0); //backface
    vertexVec.push(x + x0, -y + y0, z + z0, -x + x0, -y + y0, z + z0, -x + x0, -y + y0, -z + z0, x + x0, -y + y0, z + z0, x + x0, -y + y0, -z + z0, -x + x0, -y + y0, -z + z0); //bottomface
    vertexVec.push(-x + x0, y + y0, z + z0, -x + x0, -y + y0, z + z0, -x + x0, y + y0, -z + z0, -x + x0, -y + y0, -z + z0, -x + x0, -y + y0, z + z0, -x + x0, y + y0, -z + z0); //leftface

    for (i = 0; i < array.length; i++) {
        for (j = 0; j < 6; j++) {
            vector.push.apply(vector, array[i]);
        }
    }
    vertex_color_vec.push(vertexVec, vector);
    return vertex_color_vec;

}


function rowxy(n, move, next, forward) {
    if (move_xyz[move]) {
        for (i = 0 + 9 * n; i < 9 * n + 9; i++) {
            for (j = 0; j < 108; j += 3) {
                var place_holder = vertices_colors[i][0][j];
                vertices_colors[i][0][j] = vertices_colors[i][0][j] * Math.cos(forward * ang * Math.PI / 180) + vertices_colors[i][0][j + 1] * Math.sin(forward * ang * Math.PI / 180);
                vertices_colors[i][0][j + 1] = vertices_colors[i][0][j + 1] * Math.cos(forward * ang * Math.PI / 180) - place_holder * Math.sin(forward * ang * Math.PI / 180);
            }
        }
        TotalAng += ang;
        if (TotalAng == 90 && forward == 1) {
            move_xyz[move] = false;
            var place_holder0 = vertices_colors[0 + 9 * n];
            var place_holder1 = vertices_colors[1 + 9 * n];
            var place_holder2 = vertices_colors[5 + 9 * n];
            var place_holder3 = vertices_colors[2 + 9 * n];
            vertices_colors[0 + 9 * n] = vertices_colors[6 + 9 * n]
            vertices_colors[1 + 9 * n] = vertices_colors[3 + 9 * n]
            vertices_colors[2 + 9 * n] = place_holder0;
            vertices_colors[3 + 9 * n] = vertices_colors[7 + 9 * n];
            vertices_colors[4 + 9 * n] = vertices_colors[4 + 9 * n];
            vertices_colors[5 + 9 * n] = place_holder1;
            vertices_colors[6 + 9 * n] = vertices_colors[8 + 9 * n];
            vertices_colors[7 + 9 * n] = place_holder2;
            vertices_colors[8 + 9 * n] = place_holder3
            TotalAng = 0;
            move_xyz[next] = true;
        }
        if (TotalAng == 90 && forward == -1) {
            move_xyz[move] = false;
            var place_holder0 = vertices_colors[1 + 9 * n];
            var place_holder1 = vertices_colors[0 + 9 * n];
            var place_holder2 = vertices_colors[3 + 9 * n];
            var place_holder3 = vertices_colors[6 + 9 * n];
            vertices_colors[0 + 9 * n] = vertices_colors[2 + 9 * n];
            vertices_colors[1 + 9 * n] = vertices_colors[5 + 9 * n];
            vertices_colors[2 + 9 * n] = vertices_colors[8 + 9 * n];
            vertices_colors[3 + 9 * n] = place_holder0;
            vertices_colors[4 + 9 * n] = vertices_colors[4 + 9 * n];
            vertices_colors[5 + 9 * n] = vertices_colors[7 + 9 * n];
            vertices_colors[6 + 9 * n] = place_holder1;
            vertices_colors[7 + 9 * n] = place_holder2;
            vertices_colors[8 + 9 * n] = place_holder3
            TotalAng = 0;
            move_xyz[next] = true;
        }
    }
}


function rowxz(n, move, next, forward) {
    if (move_xyz[move]) {
        for (k = 3 * n; k < 3 * (n + 1); k++) {
            for (i = 0 + k; i < 25 + k; i += 9) {
                for (j = 0; j < 108; j += 3) {
                    var place_holder = vertices_colors[i][0][j];
                    vertices_colors[i][0][j] = vertices_colors[i][0][j] * Math.cos(forward*ang * Math.PI / 180) + vertices_colors[i][0][j + 2] * Math.sin(forward*ang * Math.PI / 180);
                    vertices_colors[i][0][j + 2] = vertices_colors[i][0][j + 2] * Math.cos(forward*ang * Math.PI / 180) - place_holder * Math.sin(forward*ang * Math.PI / 180);
                }
            }
        }
        TotalAng += ang;
        if (TotalAng == 90 && forward==1) {
            move_xyz[move] = false;
            var place_holder0 = vertices_colors[0 + 3 * n];
            var place_holder1 = vertices_colors[1 + 3 * n];
            var place_holder2 = vertices_colors[11 + 3 * n];
            var place_holder3 = vertices_colors[2 + 3 * n];
            vertices_colors[0 + 3 * n] = vertices_colors[18 + 3 * n]
            vertices_colors[1 + 3 * n] = vertices_colors[9 + 3 * n]
            vertices_colors[2 + 3 * n] = place_holder0;
            vertices_colors[9 + 3 * n] = vertices_colors[19 + 3 * n];
            vertices_colors[10 + 3 * n] = vertices_colors[10 + 3 * n];
            vertices_colors[11 + 3 * n] = place_holder1;
            vertices_colors[18 + 3 * n] = vertices_colors[20 + 3 * n];
            vertices_colors[19 + 3 * n] = place_holder2;
            vertices_colors[20 + 3 * n] = place_holder3
            TotalAng = 0;
            move_xyz[next] = true;
        }
        if (TotalAng == 90 && forward==-1) {
            move_xyz[move] = false;
            var place_holder0 = vertices_colors[0 + 3 * n];
            var place_holder1 = vertices_colors[1 + 3 * n];
            var place_holder2 = vertices_colors[11 + 3 * n];
            var place_holder3 = vertices_colors[2 + 3 * n];
            vertices_colors[0 + 3 * n] = vertices_colors[18 + 3 * n]
            vertices_colors[1 + 3 * n] = vertices_colors[9 + 3 * n]
            vertices_colors[2 + 3 * n] = place_holder0;
            vertices_colors[9 + 3 * n] = vertices_colors[19 + 3 * n];
            vertices_colors[10 + 3 * n] = vertices_colors[10 + 3 * n];
            vertices_colors[11 + 3 * n] = place_holder1;
            vertices_colors[18 + 3 * n] = vertices_colors[20 + 3 * n];
            vertices_colors[19 + 3 * n] = place_holder2;
            vertices_colors[20 + 3 * n] = place_holder3
            TotalAng = 0;
            move_xyz[next] = true;
        }
    }
}

function rowyz(n, move, next) {
    if (move_xyz[move]) {
        for (i = 0 + n; i < 25 + n; i += 3) {
            for (j = 0; j < 108; j += 3) {
                var place_holder = vertices_colors[i][0][j + 1];
                vertices_colors[i][0][j + 1] = vertices_colors[i][0][j + 1] * Math.cos(ang * Math.PI / 180) - vertices_colors[i][0][j + 2] * Math.sin(ang * Math.PI / 180);
                vertices_colors[i][0][j + 2] = vertices_colors[i][0][j + 2] * Math.cos(ang * Math.PI / 180) + place_holder * Math.sin(ang * Math.PI / 180);
            }
        }
        TotalAng += ang;
        if (TotalAng == 90) {
            move_xyz[move] = false;
            var place_holder0 = vertices_colors[0 + n];
            var place_holder1 = vertices_colors[3 + n];
            var place_holder2 = vertices_colors[15 + n];
            var place_holder3 = vertices_colors[6 + n];
            vertices_colors[0 + n] = vertices_colors[18 + n]
            vertices_colors[3 + n] = vertices_colors[9 + n]
            vertices_colors[6 + n] = place_holder0;
            vertices_colors[9 + n] = vertices_colors[21 + n];
            vertices_colors[12 + n] = vertices_colors[12 + n];
            vertices_colors[15 + n] = place_holder1;
            vertices_colors[18 + n] = vertices_colors[24 + n];
            vertices_colors[21 + n] = place_holder2;
            vertices_colors[24 + n] = place_holder3
            TotalAng = 0;
            move_xyz[next] = true;
        }
    }
}

