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
public class Cart extends HttpServlet {
    private static final long serialVersionUID = 1L;
    static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";
    static final String DB_URL = "jdbc:mysql://localhost:3306/e-book?serverTimezone=GMT%2B8";
    static final String USER = "root";
    static final String PASS = "123qwe";

    public Cart() {
        super();
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        BufferedReader br=request.getReader();
        String str,wholeStr="";
        while ((str=br.readLine())!=null){
            wholeStr+=str;
        }

        JSONObject req = JSONObject.parseObject(wholeStr);
        int userId = req.getInteger("userId");
        int bookId = req.getInteger("bookId");
        int quantity = req.getInteger("quantity");

        response.setContentType("application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();

        Connection conn = null;
        Statement stmt = null;
        try{
            Class.forName("com.mysql.jdbc.Driver");
            conn = DriverManager.getConnection(DB_URL,USER,PASS);
            stmt = conn.createStatement();
            String sql;

            sql = "SELECT `quantity` from `cart` where `userId` = " + userId + " and `bookId` = " + bookId;
            ResultSet rs0 = stmt.executeQuery(sql);
            boolean hasExisted = false;
            int existedQuantity = 0;
            if (rs0.next()){
                hasExisted = true;
                existedQuantity = rs0.getInt("quantity");
            }
            int targetQuantity = quantity + existedQuantity;

            if (hasExisted){
                sql = "UPDATE `cart` set `quantity` = " + targetQuantity + " where" +
                        "`userId` = " + userId + " and `bookId` = " + bookId;
                int rs = stmt.executeUpdate(sql);
            }
            else {
                sql = "INSERT INTO `cart` (`userId`, `bookId`, `quantity`) " +
                        "VALUES (" + userId + ", " + bookId + ", " + quantity + ")";
                int rs = stmt.executeUpdate(sql);
            }
            JSONObject resp = new JSONObject();
            resp.put("message","Add to cart successfully!");
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
        int userId = Integer.parseInt(request.getParameter("userId"));

        response.setContentType("application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();

        Connection conn = null;
        Statement stmt = null;
        try{
            Class.forName("com.mysql.jdbc.Driver");
            conn = DriverManager.getConnection(DB_URL,USER,PASS);
            stmt = conn.createStatement();

            String sql;
            sql="SELECT `bookId`, `quantity` from `cart` WHERE `userId`="+userId;

            ResultSet rs = stmt.executeQuery(sql);

            JSONArray array = new JSONArray();
            while(rs.next()) {
                JSONObject tmp = new JSONObject();
                tmp.put("bookId",rs.getInt("bookId"));
                tmp.put("quantity",rs.getInt("quantity"));
                array.add(tmp);
            }
            rs.close();
            JSONObject resp = new JSONObject();
            resp.put("cart", array);
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
    public void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //int quantity=0;
        BufferedReader br=request.getReader();
        String str,wholeStr="";
        while ((str=br.readLine())!=null){
            wholeStr+=str;
        }

        JSONObject req = JSONObject.parseObject(wholeStr);
        int userId = req.getInteger("userId");
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
            for (Object book : books){
                JSONObject tmp = (JSONObject)book;
                int bookId = tmp.getInteger("bookId");
                int consumeQuantity = tmp.getInteger("quantity");

                sql = "SELECT `storage` from `book` where `bookId` = " + bookId;
                ResultSet rs0 = stmt.executeQuery(sql);
                int storage = 0;
                if (rs0.next()){
                    storage = rs0.getInt("storage");
                }

                sql = "SELECT `quantity` from `cart` where `bookId` = " + bookId + " and `userId` = " + userId;
                rs0 = stmt.executeQuery(sql);
                int quantity = 0;
                if (rs0.next()){
                    quantity = rs0.getInt("quantity");
                }

                int targetStorage = storage - consumeQuantity;
                sql = "UPDATE `book` SET `storage` = " + targetStorage + " WHERE `bookId` = " + bookId;
                stmt.executeUpdate(sql);

                int targetQuantity = quantity - consumeQuantity;
                if (targetQuantity == 0)
                    sql = "DELETE from `cart` where `bookId` = " + bookId + " and `userId` = " + userId;
                else
                    sql = "UPDATE `cart` SET `quantity` = " + targetQuantity +
                            " where `bookId` = " + bookId + " and `userId` = " + userId;
                stmt.executeUpdate(sql);

                sql="INSERT INTO `order` (`userId`, `bookId`, `quantity`,`time`) " +
                        "VALUES ('"+userId+"', '"+bookId+"', '"+consumeQuantity+"',NOW())";
                stmt.executeUpdate(sql);
            }
            JSONObject resp = new JSONObject();
            resp.put("message", "Purchase successfully!");
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
    public void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        BufferedReader br=request.getReader();
        String str,wholeStr="";
        while ((str=br.readLine())!=null){
            wholeStr+=str;
        }

        int pos1=wholeStr.indexOf("\"bookId\"");
        int userId=Integer.parseInt(wholeStr.substring(10,pos1-1));
        int pos2=wholeStr.indexOf("\"consumeQuantity\"");
        int bookId=Integer.parseInt(wholeStr.substring(pos1+9,pos2-1));

        response.setContentType("application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();

        Connection conn = null;
        Statement stmt = null;
        try{
            Class.forName("com.mysql.jdbc.Driver");
            conn = DriverManager.getConnection(DB_URL,USER,PASS);
            stmt = conn.createStatement();

            String sql;
            sql="DELETE FROM `cart` WHERE `userId`="+userId+" AND `bookId`="+bookId;
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
}