/* global document*/
/* global getWebGLContext*/
/* global initShaders*/
/*jshint camelcase: false */
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

        //获取attribute变量的存储位置
        var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
        if (a_Position<0) {
            console.log('Failed to get the storage location of a_Position');
            return;
        }

        //向顶点位置赋值
        //设置canvas 背景色
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        //清空
        gl.clear(gl.COLOR_BUFFER_BIT);

        var g_points=[];
        function click (ev, gl, canvas, a_Position ) {
            var x = ev.clientX;
            var y = ev.clientY;
            //得到点击元素的，距离顶部的高度
            var rect = ev.target.getBoundingClientRect();

            x = ((x-rect.left)-canvas.width/2)/(canvas.width/2);
            //由于x,y坐标和canvas坐标的y轴，方向相反
            y = (canvas.height/2-(y-rect.top))/(canvas.height/2);

            var obj={
                x:x,
                y:y
            };
            g_points.push(obj);

            gl.clear(gl.COLOR_BUFFER_BIT);

            var len = g_points.length;

            for(var i = 0;i < len; i++){
                gl.vertexAttrib3f(a_Position, g_points[i].x, g_points[i].y, 0.0);

                //绘制
                gl.drawArrays(gl.POINTS, 0, 1);
            }
        }
        canvas.onmousedown= function(ev) {
            click(ev, gl, canvas, a_Position);
        };

    }

    main();

});
