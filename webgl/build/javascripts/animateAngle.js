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

  var n = initVertexBuffers(gl);
  if (n < 0) {
    console.log('Failed to create the buffer object');
    return -1;
  }
  var modelMatrix = new Matrix4();

  //当前角度
  var currentAngle = 0;
  //旋转速度
  var angleStep = 90;
  //当前时间
  var lastDate  = new Date().getTime();

  var u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
  var tick = function() {

    var nowDate = new Date().getTime();

    var chaDate = nowDate - lastDate;

    lastDate = nowDate;

    currentAngle = currentAngle + (angleStep * chaDate) / 1000;

    //计算应该转多少
    currentAngle = currentAngle % 360;

    modelMatrix.setRotate(currentAngle, 0, 0, 1);
    modelMatrix.translate(0.35, 0, 0);
    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);

    //清空canvas,颜色缓冲区
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLES, 0, n);

    requestAnimationFrame(tick);
  }
  tick();
}
$(function() {
  main();
});
