import java.io.*;
import java.sql.*;

import javax.servlet.ServletException;
import javax.servlet.ServletInputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.*;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

@WebServlet("/HelloForm")
public class Books extends HttpServlet {
    private static final long serialVersionUID = 1L;
    // JDBC 驱动名及数据库 URL
    static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";
    static final String DB_URL = "jdbc:mysql://localhost:3306/e-book?serverTimezone=GMT%2B8";

    // 数据库的用户名与密码，需要根据自己的设置
    static final String USER = "root";
    static final String PASS = "123qwe";

    public Books() {
        super();
    }

    // 处理 POST 方法请求的方法
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String bookName="",author="",coverPath="",ISBN="";
        int storage=0;
        float price=0;
        // 配置上传参数
        DiskFileItemFactory factory = new DiskFileItemFactory();
        // 设置临时存储目录
        factory.setRepository(new File(System.getProperty("java.io.tmpdir")));
        ServletFileUpload upload = new ServletFileUpload(factory);
        // 中文处理
        upload.setHeaderEncoding("UTF-8");
        // 构造临时路径来存储上传的文件
        // 这个路径相对当前应用的目录
        String rawUploadPath = request.getServletContext().getRealPath("./") +  "images";
        String uploadPath=rawUploadPath.replace('\\','/');
        //String uploadPath = "/images2";

        /*System.out.println(request.getServletContext());
        System.out.println(request.getServletContext().getRealPath("./"));
        System.out.println(request.getServletContext().getRealPath("./") + File.separator);
        System.out.println(request.getServletContext().getRealPath("./") + File.separator + "upload");*/

        // 如果目录不存在则创建
        File uploadDir = new File(uploadPath);
        if (!uploadDir.exists()) {
            uploadDir.mkdir();
        }
        try {
            // 解析请求的内容提取文件数据
            @SuppressWarnings("unchecked")
            List<FileItem> formItems = upload.parseRequest(request);
            if (formItems != null && formItems.size() > 0) {
                // 迭代表单数据
                Map params = new HashMap();
                for (FileItem item : formItems) {
                    // 处理不在表单中的字段
                    if (!item.isFormField()) {
                        String fileName = new File(item.getName()).getName();
                        String filePath = "F:/github/e-Book/public/images/" + fileName;

                        //System.out.println(filePath);
                        File storeFile = new File(filePath);
                        // 在控制台输出文件的上传路径
                        coverPath = fileName;
                        //System.out.println(filePath);
                        //System.out.println(coverPath);

                        // 保存文件到硬盘
                        item.write(storeFile);
                    }
                    else{
                        params.put(item.getFieldName(),item.getString("utf-8"));
                        System.out.print(item.getFieldName()+" ");
                        System.out.println(item.getString());
                    }
                    //System.out.println(item);
                }
                bookName = (String)params.get("bookName");
                author = (String)params.get("author");
                ISBN = (String)params.get("ISBN");
                storage = Integer.parseInt((String)params.get("storage"));
                price = Float.parseFloat((String)params.get("price"));
            }
        } catch (Exception ex) {
            request.setAttribute("message",
                    "错误信息: " + ex.getMessage());
        }
        System.out.println(bookName);
        System.out.println(author);
        System.out.println(coverPath);
        System.out.println(ISBN);
        System.out.println(storage);
        System.out.println(price);

        Connection conn = null;
        Statement stmt = null;

        response.setContentType("application/json;charset=UTF-8");

        PrintWriter out = response.getWriter();


        try{
            // 注册 JDBC 驱动器
            Class.forName("com.mysql.jdbc.Driver");

            // 打开一个连接
            conn = DriverManager.getConnection(DB_URL,USER,PASS);

            // 执行 SQL 查询
            stmt = conn.createStatement();
            String sql;
            sql="INSERT INTO `book` (`bookName`, `author`, `coverPath`, `ISBN`, `storage`, `price`) " +
                    "VALUES ('"+bookName+"', '"+author+"', '"+coverPath+"', '"+ISBN+"', "+storage+", "+price+")";

            int rs = stmt.executeUpdate(sql);

            out.println("{\"message\":\"Add book successfully!\"}");
        } catch(SQLException se) {
            // 处理 JDBC 错误
            se.printStackTrace();
            out.println(se);
            out.println("JDBCError");
        } catch(Exception e) {
            // 处理 Class.forName 错误
            e.printStackTrace();
            out.println("ForNameError");
        }finally{
            // 最后是用于关闭资源的块
            try{
                if(stmt!=null)
                    stmt.close();
            }catch(SQLException se2){
            }
            try{
                if(conn!=null)
                    conn.close();
            }catch(SQLException se){
                se.printStackTrace();
            }
        }
    }
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Connection conn = null;
        Statement stmt = null;

        response.setContentType("application/json;charset=UTF-8");

        BufferedReader br=request.getReader();
        String str,wholeStr="";
        while ((str=br.readLine())!=null){
            wholeStr+=str;
        }
        PrintWriter out = response.getWriter();

        try{
            // 注册 JDBC 驱动器
            Class.forName("com.mysql.jdbc.Driver");

            // 打开一个连接
            conn = DriverManager.getConnection(DB_URL,USER,PASS);

            // 执行 SQL 查询
            stmt = conn.createStatement();
            String sql;
            sql="SELECT `bookId`, `bookName`, `author`, `coverPath`, `ISBN`, `storage`, `price` from `book`";

            ResultSet rs = stmt.executeQuery(sql);

            int bookId=0;
            String bookName="",author="",coverPath="",ISBN="";
            int storage=0;
            float price=0;
            out.println("{\"books\":[");
            if (rs.next()){
                bookId = rs.getInt("bookId");
                bookName = rs.getString("bookName");
                author=rs.getString("author");
                coverPath = rs.getString("coverPath");
                ISBN=rs.getString("ISBN");
                storage=rs.getInt("storage");
                price=rs.getFloat("price");
                out.println(
                        "{" +
                                "\"bookId\":"+bookId +
                                ",\"bookName\":\""+bookName+
                                "\",\"author\":\""+author+
                                "\",\"coverPath\":\""+coverPath.replace("|","\\\\")+
                                "\",\"ISBN\":\""+ISBN+
                                "\",\"storage\":"+storage+
                                ",\"price\":"+price+
                                "}"
                );
            }
            while(rs.next()) {
                bookId = rs.getInt("bookId");
                bookName = rs.getString("bookName");
                author=rs.getString("author");
                coverPath = rs.getString("coverPath");
                ISBN=rs.getString("ISBN");
                storage=rs.getInt("storage");
                price=rs.getFloat("price");
                out.println(
                        ",{" +
                                "\"bookId\":"+bookId +
                                ",\"bookName\":\""+bookName+
                                "\",\"author\":\""+author+
                                "\",\"coverPath\":\""+coverPath.replace("|","\\\\")+
                                "\",\"ISBN\":\""+ISBN+
                                "\",\"storage\":"+storage+
                                ",\"price\":"+price+
                                "}"
                );
            }
            rs.close();
            out.println("]}");
        } catch(SQLException se) {
            // 处理 JDBC 错误
            se.printStackTrace();
            out.println(se);
            out.println("JDBCError");
        } catch(Exception e) {
            // 处理 Class.forName 错误
            e.printStackTrace();
            out.println("ForNameError");
        }finally{
            // 最后是用于关闭资源的块
            try{
                if(stmt!=null)
                    stmt.close();
            }catch(SQLException se2){
            }
            try{
                if(conn!=null)
                    conn.close();
            }catch(SQLException se){
                se.printStackTrace();
            }
        }
    }
    public void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Connection conn = null;
        Statement stmt = null;

        int bookId=0;
        String bookName="",author="",coverPath="",ISBN="";
        int storage=0;
        float price=0;

        response.setContentType("application/json;charset=UTF-8");

        BufferedReader br=request.getReader();
        String str,wholeStr="";
        while ((str=br.readLine())!=null){
            wholeStr+=str;
        }

        //parse request
        int pos0=wholeStr.indexOf("\"bookName\"");
        bookId=Integer.parseInt(wholeStr.substring(10,pos0-1));
        int pos1=wholeStr.indexOf("\"author\"");
        bookName=wholeStr.substring(pos0+12,pos1-2);
        int pos2=wholeStr.indexOf("\"coverPath\"");
        author=wholeStr.substring(pos1+10,pos2-2);
        int pos3=wholeStr.indexOf("\"ISBN\"");
        coverPath=wholeStr.substring(pos2+13,pos3-2);
        int pos4=wholeStr.indexOf("\"storage\"");
        ISBN=wholeStr.substring(pos3+8,pos4-2);
        int pos5=wholeStr.indexOf("\"price\"");
        storage=Integer.parseInt(wholeStr.substring(pos4+10,pos5-1));
        int pos6=wholeStr.length();
        price=Float.parseFloat(wholeStr.substring(pos5+8,pos6-1));

        //System.out.println(username);
        //System.out.println(password);

        PrintWriter out = response.getWriter();
        /*out.println(bookId);
        out.println(bookName);
        out.println(author);
        out.println(coverPath);
        out.println(ISBN);
        out.println(storage);
        out.println(price);*/

        try{
            // 注册 JDBC 驱动器
            Class.forName("com.mysql.jdbc.Driver");

            // 打开一个连接
            conn = DriverManager.getConnection(DB_URL,USER,PASS);

            // 执行 SQL 查询
            stmt = conn.createStatement();
            String sql;
            sql="UPDATE `book` SET `bookName`='"+bookName+"', " +
                    "`author`='"+author+"', " +
                    "`coverPath`='"+coverPath+"', " +
                    "`ISBN`='"+ISBN+"', " +
                    "`storage`='"+storage+"', " +
                    "`price`='"+price+"'" +
                    "WHERE `bookId`="+bookId;

            int rs = stmt.executeUpdate(sql);

            out.println("Update book successfully!");
        } catch(SQLException se) {
            // 处理 JDBC 错误
            se.printStackTrace();
            out.println(se);
            out.println("JDBCError");
        } catch(Exception e) {
            // 处理 Class.forName 错误
            e.printStackTrace();
            out.println("ForNameError");
        }finally{
            // 最后是用于关闭资源的块
            try{
                if(stmt!=null)
                    stmt.close();
            }catch(SQLException se2){
            }
            try{
                if(conn!=null)
                    conn.close();
            }catch(SQLException se){
                se.printStackTrace();
            }
        }
    }
    public void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Connection conn = null;
        Statement stmt = null;

        int bookId=0;

        response.setContentType("application/json;charset=UTF-8");

        BufferedReader br=request.getReader();
        String str,wholeStr="";
        while ((str=br.readLine())!=null){
            wholeStr+=str;
        }

        //parse request
        int pos0=wholeStr.length();
        bookId=Integer.parseInt(wholeStr.substring(10,pos0-1));

        PrintWriter out = response.getWriter();

        try{
            // 注册 JDBC 驱动器
            Class.forName("com.mysql.jdbc.Driver");

            // 打开一个连接
            conn = DriverManager.getConnection(DB_URL,USER,PASS);

            // 执行 SQL 查询
            stmt = conn.createStatement();
            String sql;
            sql="DELETE FROM `book` WHERE `bookId`="+bookId;
            int rs = stmt.executeUpdate(sql);

            out.println("Delete book successfully!");
        } catch(SQLException se) {
            // 处理 JDBC 错误
            se.printStackTrace();
            out.println(se);
            out.println("JDBCError");
        } catch(Exception e) {
            // 处理 Class.forName 错误
            e.printStackTrace();
            out.println("ForNameError");
        }finally{
            // 最后是用于关闭资源的块
            try{
                if(stmt!=null)
                    stmt.close();
            }catch(SQLException se2){
            }
            try{
                if(conn!=null)
                    conn.close();
            }catch(SQLException se){
                se.printStackTrace();
            }
        }
    }
}