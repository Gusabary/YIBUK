import java.io.*;
import java.sql.*;

import javax.servlet.ServletException;
import javax.servlet.ServletInputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/HelloForm")
public class Cart extends HttpServlet {
    private static final long serialVersionUID = 1L;
    // JDBC 驱动名及数据库 URL
    static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";
    static final String DB_URL = "jdbc:mysql://localhost:3306/e-book?serverTimezone=GMT%2B8";

    // 数据库的用户名与密码，需要根据自己的设置
    static final String USER = "root";
    static final String PASS = "123qwe";

    public Cart() {
        super();
    }

    // 处理 POST 方法请求的方法
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Connection conn = null;
        Statement stmt = null;

        int userId=0,bookId=0,quantity=0;

        response.setContentType("application/json;charset=UTF-8");

        BufferedReader br=request.getReader();
        String str,wholeStr="";
        while ((str=br.readLine())!=null){
            wholeStr+=str;
        }

        //parse request
        int pos1=wholeStr.indexOf("\"bookId\"");
        userId=Integer.parseInt(wholeStr.substring(10,pos1-1));
        int pos2=wholeStr.indexOf("\"quantity\"");
        bookId=Integer.parseInt(wholeStr.substring(pos1+9,pos2-1));
        int pos3=wholeStr.length();
        quantity=Integer.parseInt(wholeStr.substring(pos2+11,pos3-1));

        PrintWriter out = response.getWriter();
        out.println(userId);
        out.println(bookId);
        out.println(quantity);

        try{
            // 注册 JDBC 驱动器
            Class.forName("com.mysql.jdbc.Driver");

            // 打开一个连接
            conn = DriverManager.getConnection(DB_URL,USER,PASS);

            // 执行 SQL 查询
            stmt = conn.createStatement();
            String sql;

            /*sql="SELECT `storage` from `book`" +
                    "WHERE `bookId`='"+bookId+"'";
            ResultSet rs1=stmt.executeQuery(sql);
            int storage=0;
            if (rs1.next()) {
                storage = rs1.getInt("storage");
            }

            if (storage<quantity){
                response.setStatus(403);
                out.println("Storage is not enough!");
                return;
            }*/
            out.println("Add to cart successfully!");

            sql="INSERT INTO `cart` (`userId`, `bookId`, `quantity`) " +
                    "VALUES ("+userId+", "+bookId+", "+quantity+")";
            int rs2 = stmt.executeUpdate(sql);

            /*int targetStorage=storage-quantity;
            sql="UPDATE `book` SET `storage`="+targetStorage+ " WHERE `bookId`="+bookId;
            int rs3 = stmt.executeUpdate(sql);*/

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

        int userId = Integer.parseInt(request.getParameter("userId"));
        PrintWriter out = response.getWriter();

        try{
            // 注册 JDBC 驱动器
            Class.forName("com.mysql.jdbc.Driver");

            // 打开一个连接
            conn = DriverManager.getConnection(DB_URL,USER,PASS);

            // 执行 SQL 查询
            stmt = conn.createStatement();
            String sql;
            sql="SELECT `bookId`, `quantity` from `cart` WHERE `userId`="+userId;

            int bookId=0,quantity=0;
            out.println("{\"cart\":[");
            ResultSet rs = stmt.executeQuery(sql);
            if (rs.next()){
                bookId = rs.getInt("bookId");
                quantity = rs.getInt("quantity");
                out.println(
                        "{" +
                                "\"bookId\":"+bookId +
                                ",\"quantity\":"+quantity+
                                "}"
                );
            }
            while(rs.next()) {
                bookId = rs.getInt("bookId");
                quantity = rs.getInt("quantity");
                out.println(
                        ",{" +
                                "\"bookId\":"+bookId +
                                ",\"quantity\":"+quantity+
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