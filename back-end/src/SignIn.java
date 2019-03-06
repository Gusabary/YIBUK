import java.io.*;
import java.sql.*;

import javax.servlet.ServletException;
import javax.servlet.ServletInputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/HelloForm")
public class SignIn extends HttpServlet {
    private static final long serialVersionUID = 1L;
    // JDBC 驱动名及数据库 URL
    static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";
    static final String DB_URL = "jdbc:mysql://localhost:3306/e-book?serverTimezone=GMT%2B8";

    // 数据库的用户名与密码，需要根据自己的设置
    static final String USER = "root";
    static final String PASS = "123qwe";

    public SignIn() {
        super();
    }

    // 处理 POST 方法请求的方法
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Connection conn = null;
        Statement stmt = null;
        String username="",password="",email="";

        response.setContentType("application/json;charset=UTF-8");

        BufferedReader br=request.getReader();
        String str,wholeStr="";
        while ((str=br.readLine())!=null){
            wholeStr+=str;
        }

        //parse request
        int pos1=wholeStr.indexOf("\"password\"");
        username=wholeStr.substring(13,pos1-2);
        int pos2=wholeStr.length();
        password=wholeStr.substring(pos1+12,pos2-2);

        System.out.println(username);
        System.out.println(password);

        PrintWriter out = response.getWriter();

        try{
            // 注册 JDBC 驱动器
            Class.forName("com.mysql.jdbc.Driver");

            // 打开一个连接
            conn = DriverManager.getConnection(DB_URL,USER,PASS);

            // 执行 SQL 查询
            stmt = conn.createStatement();
            String sql;
            sql="SELECT `userId`, `identity`, `validity` from `user`" +
                    "WHERE `username`='"+username+"' AND `password`='"+password+"'";

            int userId=0,identity=1,validity=1;
            ResultSet rs = stmt.executeQuery(sql);
            while(rs.next()) {
                userId = rs.getInt("userId");
                identity = rs.getInt("identity");
                validity = rs.getInt("validity");
            }
            rs.close();

            if (userId==0) {
                response.setStatus(500);
                out.println("Error: wrong username or password!");
            }
            if (validity==0){
                response.setStatus(403);
                out.println("Error: you are forbidden!");
            }
            out.println(
                    "{" +
                    "\"userId\":"+userId +
                    ",\"identity\":"+identity+
                    ",\"validity\":"+validity+
                    "}"
            );
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