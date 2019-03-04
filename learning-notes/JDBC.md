+ 安装 MySQL 时需要注意的地方：

  + 将安装地址追加到 path 环境变量
  + 第一次登录也需要密码，自己设置。
  + `net stop mysql` 停止服务。
  + 重新设置密码：`set password="blabla"`

+ `Class.forName("com.mysql.jdbc.Driver");` 出错的解决方案：

  把 MySQL 的 jar 包拷到 WEB-INF 的 lib 文件夹下（该文件夹可能需要新建）。

##### Last-modified date: 2019.3.4, 8 p.m.