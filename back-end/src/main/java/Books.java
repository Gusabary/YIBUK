import java.io.*;
import java.sql.*;

import javax.servlet.ServletException;
import javax.servlet.ServletInputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.*;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

@WebServlet("/HelloForm")
public class Books extends HttpServlet {
    private static final long serialVersionUID = 1L;
    static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";
    static final String DB_URL = "jdbc:mysql://localhost:3306/e-book?serverTimezone=GMT%2B8";
    static final String USER = "root";
    static final String PASS = "123qwe";

    public Books() {
        super();
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String bookName="",author="",coverPath="",ISBN="";
        int storage=0;
        float price=0;
        String introduction="";

        DiskFileItemFactory factory = new DiskFileItemFactory();
        factory.setRepository(new File(System.getProperty("java.io.tmpdir")));
        ServletFileUpload upload = new ServletFileUpload(factory);
        upload.setHeaderEncoding("UTF-8");

        try {
            @SuppressWarnings("unchecked")
            List<FileItem> formItems = upload.parseRequest(request);
            if (formItems != null && formItems.size() > 0) {
                Map params = new HashMap();
                for (FileItem item : formItems) {
                    if (!item.isFormField()) {
                        String fileName = new File(item.getName()).getName();
                        coverPath = fileName;
                        String filePath = "F:/github/e-Book/public/images/" + fileName;
                        File storeFile = new File(filePath);
                        item.write(storeFile);
                    }
                    else{
                        params.put(item.getFieldName(),item.getString("utf-8"));
                    }
                }
                bookName = (String)params.get("bookName");
                author = (String)params.get("author");
                ISBN = (String)params.get("ISBN");
                storage = Integer.parseInt((String)params.get("storage"));
                price = Float.parseFloat((String)params.get("price"));
                introduction = (String)params.get("introduction");
            }
        } catch (Exception ex) {
            request.setAttribute("message",
                    "错误信息: " + ex.getMessage());
        }

        response.setContentType("application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();

        Connection conn = null;
        Statement stmt = null;
        try{
            Class.forName("com.mysql.jdbc.Driver");
            conn = DriverManager.getConnection(DB_URL,USER,PASS);
            stmt = conn.createStatement();

            String sql;
            sql = "INSERT INTO `book` (`bookName`, `author`, `coverPath`, `ISBN`, `storage`, `price`,`introduction`) " +
                    "VALUES ('"+bookName+"', '"+author+"', '"+coverPath+"', '"+ISBN+"', "+storage+", "+price+",'"+introduction+"')";
            int rs = stmt.executeUpdate(sql);

            sql = "SELECT `bookId` from `book` WHERE `ISBN` = '" + ISBN + "'";
            ResultSet rs2 = stmt.executeQuery(sql);

            JSONObject newBook = new JSONObject();
            if (rs2.next()){
                newBook.put("bookId", rs2.getInt("bookId"));
                newBook.put("bookName", bookName);
                newBook.put("author", author);
                newBook.put("coverPath", coverPath);
                newBook.put("ISBN", ISBN);
                newBook.put("storage", storage);
                newBook.put("price", price);
                newBook.put("introduction", introduction);
            }
            JSONObject resp = new JSONObject();
            resp.put("message", "Add book successfully!");
            resp.put("newBook", newBook);

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

            String sql;
            sql="SELECT `bookId`, `bookName`, `author`, `coverPath`, `ISBN`, `storage`, `price`,`introduction` from `book`";

            ResultSet rs = stmt.executeQuery(sql);

            JSONArray array = new JSONArray();
            while(rs.next()) {
                JSONObject tmp = new JSONObject();
                tmp.put("bookId",rs.getInt("bookId"));
                tmp.put("bookName",rs.getString("bookName"));
                tmp.put("author",rs.getString("author"));
                tmp.put("coverPath",rs.getString("coverPath"));
                tmp.put("ISBN",rs.getString("ISBN"));
                tmp.put("storage",rs.getInt("storage"));
                tmp.put("price",rs.getFloat("price"));
                tmp.put("introduction",rs.getString("introduction"));
                array.add(tmp);
            }
            rs.close();
            JSONObject resp = new JSONObject();
            resp.put("books", array);
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
        String bookName="",author="",coverPath="",ISBN="";
        int bookId=0,storage=0;
        float price=0;
        String introduction="";

        DiskFileItemFactory factory = new DiskFileItemFactory();
        factory.setRepository(new File(System.getProperty("java.io.tmpdir")));
        ServletFileUpload upload = new ServletFileUpload(factory);
        upload.setHeaderEncoding("UTF-8");

        try {
            @SuppressWarnings("unchecked")
            List<FileItem> formItems = upload.parseRequest(request);
            if (formItems != null && formItems.size() > 0) {
                Map params = new HashMap();
                for (FileItem item : formItems) {
                    if (!item.isFormField()) {
                        String fileName = new File(item.getName()).getName();
                        String filePath = "F:/github/e-Book/public/images/" + fileName;
                        File storeFile = new File(filePath);
                        coverPath = fileName;
                        item.write(storeFile);
                    }
                    else{
                        params.put(item.getFieldName(),item.getString("utf-8"));
                    }
                }
                bookId = Integer.parseInt((String)params.get("bookId"));
                bookName = (String)params.get("bookName");
                author = (String)params.get("author");
                ISBN = (String)params.get("ISBN");
                storage = Integer.parseInt((String)params.get("storage"));
                price = Float.parseFloat((String)params.get("price"));
                introduction = (String)params.get("introduction");
            }
        } catch (Exception ex) {
            request.setAttribute("message",
                    "错误信息: " + ex.getMessage());
        }

        response.setContentType("application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();

        Connection conn = null;
        Statement stmt = null;
        try{
            Class.forName("com.mysql.jdbc.Driver");
            conn = DriverManager.getConnection(DB_URL,USER,PASS);
            stmt = conn.createStatement();

            String sql;
            sql = "UPDATE `book` SET `bookName` = '" + bookName + "', " +
                    "`author` = '" + author + "', " +
                    "`coverPath` = '" + coverPath + "', " +
                    "`ISBN` = '" + ISBN + "', " +
                    "`storage` = " + storage + ", " +
                    "`price` = " + price + ", " +
                    "`introduction` = '" + introduction + "'" +
                    "WHERE `bookId` = " + bookId;

            int rs = stmt.executeUpdate(sql);

            JSONObject resp = new JSONObject();
            resp.put("message","Update book successfully!");
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

        JSONObject req = new JSONObject();
        int bookId = req.getInteger("bookId");

        response.setContentType("application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();

        Connection conn = null;
        Statement stmt = null;
        try{
            Class.forName("com.mysql.jdbc.Driver");
            conn = DriverManager.getConnection(DB_URL,USER,PASS);
            stmt = conn.createStatement();

            String sql;
            sql = "DELETE FROM `book` WHERE `bookId` = " + bookId;
            int rs = stmt.executeUpdate(sql);

            JSONObject resp = new JSONObject();
            resp.put("message", "Delete book successfully!");
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