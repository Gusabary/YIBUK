import java.io.*;
import java.sql.*;

import javax.servlet.ServletException;
import javax.servlet.ServletInputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/HelloForm")
public class Validity extends HttpServlet {
    private static final long serialVersionUID = 1L;
    static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";
    static final String DB_URL = "jdbc:mysql://localhost:3306/e-book?serverTimezone=GMT%2B8";
    static final String USER = "root";
    static final String PASS = "123qwe";

    public Validity() {
        super();
    }

    public void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        BufferedReader br=request.getReader();
        String str,wholeStr="";
        while ((str=br.readLine())!=null){
            wholeStr+=str;
        }

        int pos1=wholeStr.indexOf("\"targetValidity\"");
        int userId=Integer.parseInt(wholeStr.substring(10,pos1-1));
        int pos2=wholeStr.length();
        int targetValidity=Integer.parseInt(wholeStr.substring(pos1+17,pos2-1));

        response.setContentType("application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();

        Connection conn = null;
        Statement stmt = null;
        try{
            Class.forName("com.mysql.jdbc.Driver");
            conn = DriverManager.getConnection(DB_URL,USER,PASS);
            stmt = conn.createStatement();

            String sql;
            sql="UPDATE `user` SET `validity`="+targetValidity+" WHERE `userId`="+userId;
            int rs = stmt.executeUpdate(sql);
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

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();

        Connection conn = null;
        Statement stmt = null;
        try{
            Class.forName("com.mysql.jdbc.Driver");
            conn = DriverManager.getConnection(DB_URL,USER,PASS);
            stmt = conn.createStatement();

            String sql;
            sql="SELECT `userId`, `username`,`email`, `validity` from `user`";

            int userId=0,validity=1;
            String username="",email="";
            out.println("{\"users\":[");
            ResultSet rs = stmt.executeQuery(sql);
            if (rs.next()){
                userId = rs.getInt("userId");
                username = rs.getString("username");
                email=rs.getString("email");
                validity = rs.getInt("validity");
                out.println(
                        "{" +
                            "\"userId\":"+userId +
                            ",\"username\":\""+username+
                            "\",\"email\":\""+email+
                            "\",\"validity\":"+validity+
                        "}"
                );
            }
            while(rs.next()) {
                userId = rs.getInt("userId");
                username = rs.getString("username");
                email=rs.getString("email");
                validity = rs.getInt("validity");
                out.println(
                        ",{" +
                                "\"userId\":"+userId +
                                ",\"username\":\""+username+
                                "\",\"email\":\""+email+
                                "\",\"validity\":"+validity+
                        "}"
                );
            }
            rs.close();
            out.println("]}");
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