function initVertexBuffers(gl) {
  var vertices = new Float32Array([
      // Three triangles on the right side
     // Vertex coordinates and color
     0.0,  2.5,  -5.0,  0.4,  1.0,  0.4, // The green triangle
    -2.5, -2.5,  -5.0,  0.4,  1.0,  0.4,
     2.5, -2.5,  -5.0,  1.0,  0.4,  0.4,

     0.0,  3.0,  -5.0,  1.0,  0.4,  0.4, // The yellow triagle
    -3.0, -3.0,  -5.0,  1.0,  1.0,  0.4,
     3.0, -3.0,  -5.0,  1.0,  1.0,  0.4,
  ]);
  var n= 6;//点的个数

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

  //Set clear color and enable the hidden surface removal function
  gl.clearColor(0, 0, 0, 1);
  gl.enable(gl.DEPTH_TEST);

  // Get the storage locations of u_ViewProjMatrix
  var u_ViewProjMatrix = gl.getUniformLocation(gl.program, 'u_ViewProjMatrix');
  if (!u_ViewProjMatrix) {
    console.log('Failed to get the storage locations of u_ViewProjMatrix');
    return;
  }

  var viewProjMatrix = new Matrix4();
  // Set the eye point, look-at point, and up vector.
  viewProjMatrix.setPerspective(30, canvas.width/canvas.height, 1, 100);
  viewProjMatrix.lookAt(3.06, 2.5, 10.0, 0, 0, -2, 0, 1, 0);

  // Pass the view projection matrix to u_ViewProjMatrix
  gl.uniformMatrix4fv(u_ViewProjMatrix, false, viewProjMatrix.elements);

  // Clear color and depth buffer
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Enable the polygon offset function
  gl.enable(gl.POLYGON_OFFSET_FILL);
  // Draw the triangles
  gl.drawArrays(gl.TRIANGLES, 0, n/2);   // The green triangle

  gl.polygonOffset(1.0, 1.0);          // Set the polygon offset

  gl.drawArrays(gl.TRIANGLES, n/2, n/2); // The yellow triangle
}
$(function() {
  main();
});
