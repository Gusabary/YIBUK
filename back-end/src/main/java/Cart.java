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

            sql="INSERT INTO `cart` (`userId`, `bookId`, `quantity`) " +
                    "VALUES ("+userId+", "+bookId+", "+quantity+")";
            int rs = stmt.executeUpdate(sql);

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
        int quantity=0;
        BufferedReader br=request.getReader();
        String str,wholeStr="";
        while ((str=br.readLine())!=null){
            wholeStr+=str;
        }

        int pos1=wholeStr.indexOf("\"bookId\"");
        int userId=Integer.parseInt(wholeStr.substring(10,pos1-1));
        int pos2=wholeStr.indexOf("\"consumeQuantity\"");
        int bookId=Integer.parseInt(wholeStr.substring(pos1+9,pos2-1));
        int pos3=wholeStr.length();
        int consumeQuantity=Integer.parseInt(wholeStr.substring(pos2+18,pos3-1));

        response.setContentType("application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();

        Connection conn = null;
        Statement stmt = null;
        try{
            Class.forName("com.mysql.jdbc.Driver");
            conn = DriverManager.getConnection(DB_URL,USER,PASS);
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