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
        String rawUploadPath = request.getServletContext().getRealPath("./") +  "images";
        String uploadPath=rawUploadPath.replace('\\','/');

        File uploadDir = new File(uploadPath);
        if (!uploadDir.exists()) {
            uploadDir.mkdir();
        }
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
                        System.out.print(item.getFieldName()+" ");
                        System.out.println(item.getString());
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
            sql="INSERT INTO `book` (`bookName`, `author`, `coverPath`, `ISBN`, `storage`, `price`,`introduction`) " +
                    "VALUES ('"+bookName+"', '"+author+"', '"+coverPath+"', '"+ISBN+"', "+storage+", "+price+",'"+introduction+"')";

            int rs = stmt.executeUpdate(sql);
            out.println("{\"message\":\"Add book successfully!\"}");
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
        BufferedReader br=request.getReader();
        String str,wholeStr="";
        while ((str=br.readLine())!=null){
            wholeStr+=str;
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
            sql="SELECT `bookId`, `bookName`, `author`, `coverPath`, `ISBN`, `storage`, `price`,`introduction` from `book`";

            ResultSet rs = stmt.executeQuery(sql);

            int bookId=0;
            String bookName="",author="",coverPath="",ISBN="";
            int storage=0;
            float price=0;
            String introduction="";
            out.println("{\"books\":[");
            if (rs.next()){
                bookId = rs.getInt("bookId");
                bookName = rs.getString("bookName");
                author=rs.getString("author");
                coverPath = rs.getString("coverPath");
                ISBN=rs.getString("ISBN");
                storage=rs.getInt("storage");
                price=rs.getFloat("price");
                introduction = rs.getString("introduction");
                out.println(
                        "{" +
                                "\"bookId\":"+bookId +
                                ",\"bookName\":\""+bookName+
                                "\",\"author\":\""+author+
                                "\",\"coverPath\":\""+coverPath.replace("|","\\\\")+
                                "\",\"ISBN\":\""+ISBN+
                                "\",\"storage\":"+storage+
                                ",\"price\":"+price+
                                ",\"introduction\":\""+introduction+
                                "\"}"
                );
            }
            while(rs.next()) {
                bookId = rs.getInt("bookId");
                bookName = rs.getString("bookName");
                author=rs.getString("author");
                coverPath = rs.getString("coverPath");
                ISBN=rs.getString("ISBN");
                storage=rs.getInt("storage");
                price=rs.getFloat("price");
                introduction = rs.getString("introduction");
                out.println(
                        ",{" +
                                "\"bookId\":"+bookId +
                                ",\"bookName\":\""+bookName+
                                "\",\"author\":\""+author+
                                "\",\"coverPath\":\""+coverPath.replace("|","\\\\")+
                                "\",\"ISBN\":\""+ISBN+
                                "\",\"storage\":"+storage+
                                ",\"price\":"+price+
                                ",\"introduction\":\""+introduction+
                                "\"}"
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
    public void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        BufferedReader br=request.getReader();
        String str,wholeStr="";
        while ((str=br.readLine())!=null){
            wholeStr+=str;
        }

        int pos0=wholeStr.indexOf("\"bookName\"");
        int bookId=Integer.parseInt(wholeStr.substring(10,pos0-1));
        int pos1=wholeStr.indexOf("\"author\"");
        String  bookName=wholeStr.substring(pos0+12,pos1-2);
        int pos2=wholeStr.indexOf("\"coverPath\"");
        String  author=wholeStr.substring(pos1+10,pos2-2);
        int pos3=wholeStr.indexOf("\"ISBN\"");
        String  coverPath=wholeStr.substring(pos2+13,pos3-2);
        int pos4=wholeStr.indexOf("\"storage\"");
        String  ISBN=wholeStr.substring(pos3+8,pos4-2);
        int pos5=wholeStr.indexOf("\"price\"");
        int storage=Integer.parseInt(wholeStr.substring(pos4+10,pos5-1));
        int pos6=wholeStr.length();
        float price=Float.parseFloat(wholeStr.substring(pos5+8,pos6-1));

        response.setContentType("application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();

        Connection conn = null;
        Statement stmt = null;
        try{
            Class.forName("com.mysql.jdbc.Driver");
            conn = DriverManager.getConnection(DB_URL,USER,PASS);
            stmt = conn.createStatement();

            String sql;
            sql="UPDATE `book` SET `bookName`='"+bookName+"', " +
                    "`author`='"+author+"', " +
                    "`coverPath`='"+coverPath+"', " +
                    "`ISBN`='"+ISBN+"', " +
                    "`storage`='"+storage+"', " +
                    "`price`='"+price+"'" +
                    "WHERE `bookId`="+bookId;

            int rs = stmt.executeUpdate(sql);

            out.println("Update book successfully!");
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

        int pos0=wholeStr.length();
        int bookId=Integer.parseInt(wholeStr.substring(10,pos0-1));

        response.setContentType("application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();

        Connection conn = null;
        Statement stmt = null;
        try{
            Class.forName("com.mysql.jdbc.Driver");
            conn = DriverManager.getConnection(DB_URL,USER,PASS);
            stmt = conn.createStatement();

            String sql;
            sql="DELETE FROM `book` WHERE `bookId`="+bookId;
            int rs = stmt.executeUpdate(sql);

            out.println("Delete book successfully!");
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