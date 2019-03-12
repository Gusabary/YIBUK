import com.alibaba.fastjson.JSONObject;

import java.io.*;
import java.sql.*;

import javax.servlet.ServletException;
import javax.servlet.ServletInputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/HelloForm")
public class SignUp extends HttpServlet {
    private static final long serialVersionUID = 1L;
    static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";
    static final String DB_URL = "jdbc:mysql://localhost:3306/e-book?serverTimezone=GMT%2B8";
    static final String USER = "root";
    static final String PASS = "123qwe";

    public SignUp() {
        super();
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        BufferedReader br=request.getReader();
        String str,wholeStr="";
        while ((str=br.readLine())!=null){
            wholeStr+=str;
        }

        JSONObject req = JSONObject.parseObject(wholeStr);
        String username = req.getString("username");
        String password = req.getString("password");
        String email = req.getString("email");

        response.setContentType("application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();

        Connection conn = null;
        Statement stmt = null;
        try{
            Class.forName("com.mysql.jdbc.Driver");
            conn = DriverManager.getConnection(DB_URL,USER,PASS);
            stmt = conn.createStatement();

            String sql;
            sql="SELECT `username` from `user`";
            ResultSet rs0=stmt.executeQuery(sql);
            while (rs0.next()){
                String existedUsername=rs0.getString("username");
                if (username.equals(existedUsername)){
                    response.setStatus(403);
                    JSONObject err = new JSONObject();
                    err.put("error", "Username has existed!");
                    out.println(err);
                    return;
                }
            }
            sql="INSERT INTO `user` (`username`, `password`, `email`, `identity`, `validity`) " +
                    "VALUES ('"+username+"', '"+password+"', '"+email+"', '0', '1')";
            int rs = stmt.executeUpdate(sql);

            JSONObject resp = new JSONObject();
            resp.put("message", "Sign up successfully!");
            out.println(resp);

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