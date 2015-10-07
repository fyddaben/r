# 学习进度

### `helloPoint1`
- 了解最基本的webgl绘制过程
- 顶点着色器，片元着色器的基本概念，及在javascript中初始化到webgl语言 
- 获取绘图上下文
- 初始化着色器，即把片元，顶点着色器代码从`javascirpt`传到`webgl`系统中
- 设置绘图区域颜色
- 清除颜色缓存（）

### `helloPoint2`
- 学会将js变量，传给着色器内部使用 
- 利用`gl.program`, 首先向`webgl`系统请求该变量的存储地址
- 通过`gl.vertexAttrib3f`,向着色器变量传入值

### `helloPoint3`
- 利用缓冲区，一次绘画多个顶点

### `transAngle`
- 利用矩阵完成三角形的旋转 

### `animateAngle`
- 利用工具函数，完成定时绘制，从而使得三角形旋转动起来 


### `helloPoint4`
- 在一个缓冲区数组中，组合顶点坐标，大小，颜色等数据 


### `texturedQuad`
- 通过片元着色器，从纹理图像中抽取纹理颜色 
- 矩阵的乘法，矩阵与向量的乘法，向量与矩阵的乘法


### `lookAtTriangle`
- 改变视点，达到旋转物体的效果 

### `lookAtRotateTriangle`
- 通过计算，模型视图矩阵(视图矩阵 * 模型矩阵)
- 学习盒状可视空间(正射投影矩阵)，并改变近距离面的比例，对显示物体的影响


### `PerspectiveView`
- 学习透视投影矩阵



### `PerspectiveMvp`
- 利用投影矩阵，视图矩阵，模型矩阵，画出物体 

### `PerspectiveMvpError`
- 由于webgl按照先后顺序画图，所以会出现后面的物体跑到前面来
- 解决这个冲突，利用开启隐藏面消除

### `PerspectiveDepth`
- 观察深度冲突表现




