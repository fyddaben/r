function main() {
  var canvas = document.getElementById('webgl');
  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Failed to get the rendering context fo WebGl');
    return;
  }
  var VSHADER_SOURCE = $('#vsh_tmpl').html();
  var FSHADER_SOURCE = $('#fsh_tmpl').html();
  console.log('sstt', VSHADER_SOURCE);

  //初始化着色器j
  if(!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to initialize shaders');
    return;
  }

  //设置canvas背景色
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  //清空canvas
  gl.clear(gl.COLOR_BUFFER_BIT);

  //从gl.program去除a_Position变量
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');

  gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0);
  gl.vertexAttrib1f(a_PointSize, 20.0);

  //绘制一个点
  gl.drawArrays(gl.POINTS, 0, 1);


  gl.vertexAttrib3f(a_Position, 0.0, 0.5, 0.0);
  gl.vertexAttrib1f(a_PointSize, 10.0);

  //绘制一个点
  gl.drawArrays(gl.POINTS, 0, 1);


}
$(function() {
  main();
});
