+ 使用 IDEA 新建 Servlet 项目教程：https://blog.csdn.net/a376298333/article/details/79121548

  教程中有一点需要注意：![](F:\github\e-Book\learning-notes\image1.png)

+ 调用 request.getParameter(key) 方法来获取表单参数中与 key 对应的 value。

+ 在 doPost 方法中写如下代码可以输出 request body：

  ```java
  BufferedReader br=request.getReader();
  String str,wholeStr="";
  while ((str=br.readLine())!=null){
  	wholeStr+=str;
  }
  response.getWriter().println(wholeStr);
  ```

  或

  ```java
  int len = request.getContentLength();
  ServletInputStream iii = request.getInputStream();
  byte[] buffer = new byte[len];
  iii.read(buffer, 0, len);
  String str=new String(buffer);
  response.getWriter().println(str);
  ```

+ 发 HTTP 请求时如果 url 是 localhost，一定要加上 **`http://`** 。

+ 处理 form-data 类型的请求时，需要导入 commons 的两个 jar 包。如果遇到 java.lang.NoClassDefFoundError 错误，可能的解决方案是将这两个 jar 包放到 WEB-INF/lib 目录下。

+ JSONArray 类的 add 方法接受两个参数 index，element。

  index 是指在这个位置插入 element（index从 0 开始计）。

  如果 Array 中已经有了 n 个元素，0,1,2,...,n-1，则 index 只能取 `<= n` 的值，因为 Array 中不能出现空档。

##### Last-modified date: 2019.3.12, 10 p.m.