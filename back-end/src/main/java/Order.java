import com.alibaba.fastjson.JSONArray;
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
public class Order extends HttpServlet {
    private static final long serialVersionUID = 1L;
    static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";
    static final String DB_URL = "jdbc:mysql://localhost:3306/e-book?serverTimezone=GMT%2B8";
    static final String USER = "root";
    static final String PASS = "123qwe";

    public Order() {
        super();
    }

    /*public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        BufferedReader br=request.getReader();
        String str,wholeStr="";
        while ((str=br.readLine())!=null){
            wholeStr+=str;
        }

        JSONObject req = JSONObject.parseObject(wholeStr);
        String userId = req.getString("userId");
        JSONArray books = req.getJSONArray("books");

        response.setContentType("application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();

        Connection conn = null;
        Statement stmt = null;
        try{
            Class.forName("com.mysql.jdbc.Driver");
            conn = DriverManager.getConnection(DB_URL,USER,PASS);
            stmt = conn.createStatement();

            String sql;
            for (Object book:books){
                JSONObject tmp = (JSONObject)book;

                int bookId = tmp.getInteger("bookId");
                int quantity = tmp.getInteger("quantity");
                sql = "INSERT INTO `order`";
            }

            sql="SELECT `userId`, `identity`, `validity` from `user`" +
                    "WHERE `username`='"+username+"' AND `password`='"+password+"'";

            ResultSet rs = stmt.executeQuery(sql);
            JSONObject resp = new JSONObject();
            while(rs.next()) {
                resp.put("userId", rs.getInt("userId"));
                resp.put("identity", rs.getInt("identity"));
                resp.put("validity", rs.getInt("validity"));
            }
            rs.close();

            if (resp.get("userId") == null) {
                response.setStatus(500);
                JSONObject err = new JSONObject();
                err.put("error", "Wrong username or password!");
                out.println(err);
                return;
            }
            if (resp.getInteger("validity") == 0) {
                response.setStatus(403);
                JSONObject err = new JSONObject();
                err.put("error", "You are forbidden!");
                out.println(err);
                return;
            }

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
    }*/

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