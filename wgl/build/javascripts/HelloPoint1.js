/* global document*/
/* global getWebGLContext*/
/* global initShaders*/

$(function () {
    //顶点着色器
    var VSHADER_SOURCE = $('#topTmpl').html();
    //片元着色器
    var FSHADER_SOURCE = $('#eleTmpl').html();

    function main() {
        //获取canvas元素
        var canvas = document.getElementById('webgl');

        var gl = getWebGLContext(canvas);

        if (!gl) {
            console.log('Failed to get the rendering context for WebGL');
            return;
        }
        //初始化着色器
        if(!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)){
            console.log('Failed to initialize shaders.');
            return;
        }


        //设置canvas 背景色
        gl.clearColor(0.0, 0.0, 0.0, 1.0);


        //清空
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.drawArrays(gl.POINTS, 0, 1);

    }

    main();

});
