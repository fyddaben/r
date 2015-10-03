function initVertexBuffers(gl) {
  var vertices = new Float32Array([
    -0.5, 0.5, 0.0, 1.0,
    -0.5, -0.5, 0.0, 0.0,
    0.5, 0.5, 1.0, 1.0,
    0.5, -0.5, 1.0, 0.0
  ]);
  var n= 4;//点的个数

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
  var a_TexCoord = gl.getAttribLocation(gl.program, 'a_TexCoord');
  var FSIZE = vertices.BYTES_PER_ELEMENT;

  //将缓冲区对象分配给a_Posiiton变量
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 4, 0);

  //激活缓冲区对象与a_Position变量之间的关系
  gl.enableVertexAttribArray(a_Position);

  //将缓冲区对象分配给a_TexCoord变量
  gl.vertexAttribPointer(a_TexCoord, 2, gl.FLOAT, false, FSIZE * 4, FSIZE * 2);

  //激活缓冲区对象与a_TexCoord变量之间的关系
  gl.enableVertexAttribArray(a_TexCoord);

  return n;
}

function loadTexture(gl, n, texture, u_Sampler, image) {
  //对图像进行Y轴翻转
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);

  //开启0号纹理单元
  gl.activeTexture(gl.TEXTURE0);

  ////向target绑定纹理单元
  gl.bindTexture(gl.TEXTURE_2D, texture);

  ////配置纹理参数
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

  ////配置纹理图像
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

  ////将0 号纹理传递给着色器j
  gl.uniform1i(u_Sampler, 0);

  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
}
function initTextures(gl, n) {
  var texture = gl.createTexture();//创建纹理对象
  if (!texture) {
    console.log('failed to create obj texture');
  }
  var u_Sampler = gl.getUniformLocation(gl.program, 'u_Sampler');
  if (!u_Sampler) {
    console.log('failed to get u_Sampler location');
  }
  var image = new Image();

  //注册图像加载事件的响应函数
  image.onload = function () {
    loadTexture(gl, n , texture, u_Sampler, image);
  }
  image.src = './img/sky.jpg';
  //image.src = './img/head.png';
  return true;
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
  console.log('sstt');

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

  if(!initTextures(gl, n)) {
    console.log('failed to create img texture');
  }
}
$(function() {
  main();
});
