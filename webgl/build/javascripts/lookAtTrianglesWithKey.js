function initVertexBuffers(gl) {
  var vertices = new Float32Array([
    // Vertex coordinates and color(RGBA)
     0.0,  0.5,  -0.4,  0.4,  1.0,  0.4, // The back green one
    -0.5, -0.5,  -0.4,  0.4,  1.0,  0.4,
     0.5, -0.5,  -0.4,  1.0,  0.4,  0.4,

     0.5,  0.4,  -0.2,  1.0,  0.4,  0.4, // The middle yellow one
    -0.5,  0.4,  -0.2,  1.0,  1.0,  0.4,
     0.0, -0.6,  -0.2,  1.0,  1.0,  0.4,

     0.0,  0.5,   0.0,  0.4,  0.4,  1.0,  // The front blue one
    -0.5, -0.5,   0.0,  0.4,  0.4,  1.0,
     0.5, -0.5,   0.0,  1.0,  0.4,  0.4,
  ]);
  var n= 9;//点的个数

  //创建缓冲区对象
  var vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
    console.log('Failed to create the buffer object');
    return -1;
  }

  //将缓冲区对象绑定到目标
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  //向缓冲区对象写入数据
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
  var FSIZE = vertices.BYTES_PER_ELEMENT;

  //将缓冲区对象分配给a_Posiiton变量
  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, FSIZE * 6, 0);

  //激活缓冲区对象与a_Position变量之间的关系
  gl.enableVertexAttribArray(a_Position);

  //将缓冲区对象分配给a_Color变量
  gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 6, FSIZE * 3);

  //激活缓冲区对象与a_Color变量之间的关系
  gl.enableVertexAttribArray(a_Color);

  return n;
}

var g_eyeX = 0.20;
var g_eyeY = 0.25;
var g_eyeZ = 0.25;
function main() {
  var canvas = document.getElementById('webgl');
  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Failed to get the rendering context fo WebGl');
    return;
  }
  var VSHADER_SOURCE = $('#vsh_tmpl').html();
  var FSHADER_SOURCE = $('#fsh_tmpl').html();

  //初始化着色器j
  if(!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to initialize shaders');
    return;
  }
  var n = initVertexBuffers(gl);
  if (n < 0) {
    console.log('Failed to create the buffer object');
    return -1;
  }
  //设置canvas背景色
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  var u_ViewMatrix = gl.getUniformLocation(gl.program, 'u_ViewMatrix');

  var viewMatrix = new Matrix4();

  var projMatrix = new Matrix4();

  var u_ProjMatrix = gl.getUniformLocation(gl.program, 'u_ProjMatrix');

  projMatrix.setOrtho(-1.0, 1.0, -1.0, 1.0, 0.0, 2.0);

  //了解改变近裁剪面的改变，对于显示的变化
  //projMatrix.setOrtho(-0.5, 0.5, -1, 1, 0.0, 2.0);

  gl.uniformMatrix4fv(u_ProjMatrix, false, projMatrix.elements);

  document.onkeydown = function(ev){
    if (ev.keyCode == 39) {
      g_eyeX += 0.01;
    } else {
      g_eyeX -= 0.01;
    }
    drawAngle(gl, n, viewMatrix, u_ViewMatrix);
  }
  drawAngle(gl, n, viewMatrix, u_ViewMatrix);
}
function drawAngle(gl, n, viewMatrix, u_ViewMatrix) {

  viewMatrix.setLookAt(g_eyeX, g_eyeY, g_eyeZ, 0, 0, 0, 0, 1, 0);
  //viewMatrix.setLookAt(0, 0, 0, 0, 0, -1, 0, 1, 0);

  gl.uniformMatrix4fv(u_ViewMatrix, false, viewMatrix.elements);

  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.drawArrays(gl.TRIANGLES, 0, n);
}
$(function() {
  main();
});
