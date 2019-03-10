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
    static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";
    static final String DB_URL = "jdbc:mysql://localhost:3306/e-book?serverTimezone=GMT%2B8";
    static final String USER = "root";
    static final String PASS = "123qwe";

    public SignIn() {
        super();
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        BufferedReader br=request.getReader();
        String str,wholeStr="";
        while ((str=br.readLine())!=null){
            wholeStr+=str;
        }

        int pos1=wholeStr.indexOf("\"password\"");
        String username=wholeStr.substring(13,pos1-2);
        int pos2=wholeStr.length();
        String password=wholeStr.substring(pos1+12,pos2-2);

        response.setContentType("application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();

        Connection conn = null;
        Statement stmt = null;
        try{
            Class.forName("com.mysql.jdbc.Driver");
            conn = DriverManager.getConnection(DB_URL,USER,PASS);
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
            se.printStackTrace();
        } catch(Exception e) {
            e.printStackTrace();
        }finally{
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