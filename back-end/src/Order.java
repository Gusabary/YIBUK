import java.io.*;
import java.sql.*;

import javax.servlet.ServletException;
import javax.servlet.ServletInputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/HelloForm")
public class Order extends HttpServlet {
    private static final long serialVersionUID = 1L;
    // JDBC 驱动名及数据库 URL
    static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";
    static final String DB_URL = "jdbc:mysql://localhost:3306/e-book?serverTimezone=GMT%2B8";

    // 数据库的用户名与密码，需要根据自己的设置
    static final String USER = "root";
    static final String PASS = "123qwe";

    public Order() {
        super();
    }

    // 处理 POST 方法请求的方法
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
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
            sql="SELECT `orderId`,`userId`,`bookId`, `quantity` from `order`";

            int orderId=0,userId=0,bookId=0,quantity=0;
            out.println("{\"orders\":[");
            ResultSet rs = stmt.executeQuery(sql);
            if (rs.next()){
                orderId = rs.getInt("orderId");
                userId = rs.getInt("userId");
                bookId = rs.getInt("bookId");
                quantity = rs.getInt("quantity");
                out.println(
                        "{" +
                                "\"orderId\":"+orderId +
                                ",\"userId\":"+userId +
                                ",\"bookId\":"+bookId +
                                ",\"quantity\":"+quantity+
                                "}"
                );
            }
            while(rs.next()) {
                orderId = rs.getInt("orderId");
                userId = rs.getInt("userId");
                bookId = rs.getInt("bookId");
                quantity = rs.getInt("quantity");
                out.println(
                        ",{" +
                                "\"orderId\":"+orderId +
                                ",\"userId\":"+userId +
                                ",\"bookId\":"+bookId +
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
}