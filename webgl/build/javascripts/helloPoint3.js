
function initVertexBuffers(gl) {
  var vertices = new Float32Array([
    0.0, 0.5, -0.5, -0.5, 0.5, -0.5
  ]);
  var n= 3;//点的个数

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

  //将缓冲区对象分配给a_Posiiton变量
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

  //激活缓冲区对象与a_Position变量之间的关系
  gl.enableVertexAttribArray(a_Position);

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

  //设置canvas背景色
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  //清空canvas
  gl.clear(gl.COLOR_BUFFER_BIT);
  var n = initVertexBuffers(gl);
  if (n < 0) {
    console.log('Failed to create the buffer object');
    return -1;
  }
  gl.drawArrays(gl.POINTS, 0, n);
}
$(function() {
  main();
});
