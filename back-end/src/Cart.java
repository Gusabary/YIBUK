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

        int userId=0,bookId=0,consumeQuantity=0,quantity=0;

        response.setContentType("application/json;charset=UTF-8");

        BufferedReader br=request.getReader();
        String str,wholeStr="";
        while ((str=br.readLine())!=null){
            wholeStr+=str;
        }

        //parse request
        int pos1=wholeStr.indexOf("\"bookId\"");
        userId=Integer.parseInt(wholeStr.substring(10,pos1-1));
        int pos2=wholeStr.indexOf("\"consumeQuantity\"");
        bookId=Integer.parseInt(wholeStr.substring(pos1+9,pos2-1));
        int pos3=wholeStr.length();
        consumeQuantity=Integer.parseInt(wholeStr.substring(pos2+18,pos3-1));

        PrintWriter out = response.getWriter();

        try{
            // 注册 JDBC 驱动器
            Class.forName("com.mysql.jdbc.Driver");

            // 打开一个连接
            conn = DriverManager.getConnection(DB_URL,USER,PASS);

            // 执行 SQL 查询
            stmt = conn.createStatement();
            String sql;
            sql="SELECT `storage` from `book`" +
                    "WHERE `bookId`='"+bookId+"'";
            ResultSet rs1=stmt.executeQuery(sql);
            int storage=0;
            if (rs1.next()) {
                storage = rs1.getInt("storage");
            }

            if (storage<consumeQuantity){
                response.setStatus(403);
                out.println("Storage is not enough!");
                return;
            }
            out.println("Purchase successfully!");
            sql="INSERT INTO `order` (`userId`, `bookId`, `quantity`,`time`) " +
                    "VALUES ('"+userId+"', '"+bookId+"', '"+consumeQuantity+"',NOW())";
            int rs2 = stmt.executeUpdate(sql);

            int targetStorage=storage-consumeQuantity;
            sql="UPDATE `book` SET `storage`="+targetStorage+ " WHERE `bookId`="+bookId;
            int rs3 = stmt.executeUpdate(sql);


            sql="SELECT `quantity` from `cart`" +
                    "WHERE `userId`="+userId+" AND `bookId`="+bookId;
            ResultSet rs4=stmt.executeQuery(sql);
            if (rs4.next()) {
                quantity = rs4.getInt("quantity");
            }

            if (quantity==consumeQuantity) {
                doDelete(request, response);
                return;
            }

            int targetQuantity=quantity-consumeQuantity;
            sql="UPDATE `cart` SET `quantity`="+targetQuantity +
                    " WHERE `bookId`="+bookId;
            int rs5 = stmt.executeUpdate(sql);
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

        int userId=0,bookId=0;

        response.setContentType("application/json;charset=UTF-8");

        BufferedReader br=request.getReader();
        String str,wholeStr="";
        while ((str=br.readLine())!=null){
            wholeStr+=str;
        }

        //parse request
        int pos1=wholeStr.indexOf("\"bookId\"");
        userId=Integer.parseInt(wholeStr.substring(10,pos1-1));
        int pos2=wholeStr.indexOf("\"consumeQuantity\"");
        bookId=Integer.parseInt(wholeStr.substring(pos1+9,pos2-1));

        PrintWriter out = response.getWriter();

        try{
            // 注册 JDBC 驱动器
            Class.forName("com.mysql.jdbc.Driver");

            // 打开一个连接
            conn = DriverManager.getConnection(DB_URL,USER,PASS);

            // 执行 SQL 查询
            stmt = conn.createStatement();
            String sql;
            sql="DELETE FROM `cart` WHERE `userId`="+userId+" AND `bookId`="+bookId;
            int rs = stmt.executeUpdate(sql);

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