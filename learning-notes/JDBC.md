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

+ 访问数据库时的 JSON 格式为

  `{"key1":value1,"key2":value2}`

  用 superagent 和 Postman 发出去的格式不一样。

+ ```java
  ResultSet rs = stmt.executeQuery(sql);
  while(rs.next()) {
      int userId = rs.getInt("userId");
      int identity = rs.getInt("identity");
      int validity = rs.getInt("validity");
      out.println(userId);
      out.println(identity);
      out.println(validity);
  }
  rs.close();
  ```

  注意用 ResultSet 时要有 `rs.next()` 。因为查询结果可能会有多个元组而且读取 `rs` 中的值时也要用该 next 方法将光标移动到第一个元组上。

##### Last-modified date: 2019.3.6, 8 p.m.

