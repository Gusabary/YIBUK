+ 安装 MySQL 时需要注意的地方：

  + 将安装地址追加到 path 环境变量
  + 第一次登录也需要密码，自己设置。
  + `net stop mysql` 停止服务。
  + 重新设置密码：`set password="blabla"`

+ 启动 MySQL 的时候要以管理员身份运行 cmder 。

+ `Class.forName("com.mysql.jdbc.Driver");` 出错的解决方案：

  把 MySQL 的 jar 包拷到 WEB-INF 的 lib 文件夹下（该文件夹可能需要新建）。

+ `conn = DriverManager.getConnection(DB_URL,USER,PASS);` 出错的解决方案：

  将 `mysql-connector-java` 的 jar 包替换为 8.0 版本以上的。[下载地址](https://mvnrepository.com/artifact/mysql/mysql-connector-java/8.0.13) 

+ `stmt = conn.createStatement();` 出错的解决方案：

  >我们只需要在访问数据库的 Url 后面加上以下的语句即可：
  >
  >```
  >?serverTimezone=GMT%2B8
  >```

  即 

  ```
  static final String DB_URL = "jdbc:mysql://localhost:3306/test?serverTimezone=GMT%2B8";
  ```

  （设置时区）

+ ```
  sql = "SELECT id, name, phone FROM `hello-table`";
  ```

  注意关系表的名字要加上**反引号**。

+ 将字符串型变量 `INSERT INTO` 进数据库内，要采用**外单引号内双引号**格式：

  `"...VALUES ('"+username+"', '"+password+"', '"+email+"', '0', '1')";`

##### Last-modified date: 2019.3.6, 3 p.m.

