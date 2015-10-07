function initVertexBuffers(gl) {
  var vertices = new Float32Array([
      // Three triangles on the right side
     // Vertex coordinates and color
     1.0,  1.0,  1.0,     1.0,  1.0,  1.0,  // v0 White
    -1.0,  1.0,  1.0,     1.0,  0.0,  1.0,  // v1 Magenta
    -1.0, -1.0,  1.0,     1.0,  0.0,  0.0,  // v2 Red
     1.0, -1.0,  1.0,     1.0,  1.0,  0.0,  // v3 Yellow
     1.0, -1.0, -1.0,     0.0,  1.0,  0.0,  // v4 Green
     1.0,  1.0, -1.0,     0.0,  1.0,  1.0,  // v5 Cyan
    -1.0,  1.0, -1.0,     0.0,  0.0,  1.0,  // v6 Blue
    -1.0, -1.0, -1.0,     0.0,  0.0,  0.0   // v7 Black
  ]);
  var indexs = new Uint8Array([
    0, 1, 2,   0, 2, 3,    // front
    0, 3, 4,   0, 4, 5,    // right
    0, 5, 6,   0, 6, 1,    // up
    1, 6, 7,   1, 7, 2,    // left
    7, 4, 3,   7, 3, 2,    // down
    4, 7, 6,   4, 6, 5     // back
  ]);
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

  //将顶点索引数据写入缓冲区
  var indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indexs, gl.STATIC_DRAW);

  return indexs.length;
}
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

  gl.enable(gl.DEPTH_TEST);
  var u_MvpMatrix = gl.getUniformLocation(gl.program, 'u_MvpMatrix');

  var viewMatrix = new Matrix4();
  var projMatrix = new Matrix4();
  var modelMatrix = new Matrix4();
  var mvpMatrix = new Matrix4();

  //设置视点，视线，方向
  viewMatrix.setLookAt(3, 3, 7, 0, 0, 0, 0, 1, 0);

  projMatrix.setPerspective(30, 1, 1, 100);
  mvpMatrix.set(projMatrix).multiply(viewMatrix);

  gl.uniformMatrix4fv(u_MvpMatrix, false, mvpMatrix.elements);

  //清空canvas
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


  gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_BYTE, 0);
}
$(function() {
  main();
});
