import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

import java.io.*;
import java.sql.*;
import java.util.Date;

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

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        BufferedReader br=request.getReader();
        String str,wholeStr="";
        while ((str=br.readLine())!=null){
            wholeStr+=str;
        }

        JSONObject req = JSONObject.parseObject(wholeStr);
        int userId = Integer.parseInt(req.getString("userId"));
        int bookId = Integer.parseInt(req.getString("bookId"));
        int quantity = Integer.parseInt(req.getString("quantity"));

        response.setContentType("application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();

        Connection conn = null;
        Statement stmt = null;
        try{
            Class.forName("com.mysql.jdbc.Driver");
            conn = DriverManager.getConnection(DB_URL,USER,PASS);
            stmt = conn.createStatement();

            Date now = new Date();
            String userId_s = String.valueOf(userId);
            String padding = "";
            for (int i = 1; i <= 5 - userId_s.length(); i++)
                padding += '0';
            String orderId = String.valueOf(now.getTime()) + padding + userId_s;
            String sql;
            sql = "INSERT into `order` (`orderId`, `userId`, `bookId`, `quantity`, `time`) " +
                    "VALUES ( " + orderId + ", " + userId + "," + bookId + "," + quantity + ", NOW())";
            stmt.executeUpdate(sql);

            sql = "SELECT `storage` from `book` where `bookId` = " + bookId;
            ResultSet rs = stmt.executeQuery(sql);
            int storage = 0;
            if (rs.next()){
                storage = rs.getInt("storage");
            }

            int targetStorage = storage - quantity;
            sql = "UPDATE `book` SET `storage` = " + targetStorage + " where `bookId` = " + bookId;
            stmt.executeUpdate(sql);

            JSONObject resp = new JSONObject();
            resp.put("message","Purchase successfully!");
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

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();

        Connection conn = null;
        Statement stmt = null;
        try{
            Class.forName("com.mysql.jdbc.Driver");
            conn = DriverManager.getConnection(DB_URL,USER,PASS);
            stmt = conn.createStatement();

            String sql = "";
            if (request.getParameter("userId") == null)
                sql = " SELECT * from `order`";
            else{
                int userId = Integer.parseInt(request.getParameter("userId"));
                sql = " SELECT * from `order` where `userId` = " + userId;
            }

            ResultSet rs = stmt.executeQuery(sql);
            JSONArray array = new JSONArray();
            while(rs.next()) {
                JSONObject tmp = new JSONObject();
                tmp.put("orderId", rs.getString("orderId"));
                tmp.put("userId", rs.getInt("userId"));
                tmp.put("bookId", rs.getInt("bookId"));
                tmp.put("quantity", rs.getInt("quantity"));
                tmp.put("time", rs.getString("time"));
                array.add(tmp);
            }
            rs.close();
            JSONObject resp = new JSONObject();
            resp.put("orders",array);
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