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

##### Last-modified date: 2019.3.1, 7 p.m.