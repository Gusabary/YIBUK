import java.io.*;
import java.sql.*;

import javax.servlet.ServletException;
import javax.servlet.ServletInputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/HelloForm")
public class Books extends HttpServlet {
    private static final long serialVersionUID = 1L;
    // JDBC 驱动名及数据库 URL
    static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";
    static final String DB_URL = "jdbc:mysql://localhost:3306/e-book?serverTimezone=GMT%2B8";

    // 数据库的用户名与密码，需要根据自己的设置
    static final String USER = "root";
    static final String PASS = "123qwe";

    public Books() {
        super();
    }

    // 处理 POST 方法请求的方法
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Connection conn = null;
        Statement stmt = null;

        String bookName="",author="",coverPath="",ISBN="";
        int storage=0;
        float price=0;

        response.setContentType("application/json;charset=UTF-8");

        BufferedReader br=request.getReader();
        String str,wholeStr="";
        while ((str=br.readLine())!=null){
            wholeStr+=str;
        }

        //parse request
        int pos1=wholeStr.indexOf("\"author\"");
        bookName=wholeStr.substring(13,pos1-2);
        int pos2=wholeStr.indexOf("\"coverPath\"");
        author=wholeStr.substring(pos1+10,pos2-2);
        int pos3=wholeStr.indexOf("\"ISBN\"");
        coverPath=wholeStr.substring(pos2+13,pos3-2);
        int pos4=wholeStr.indexOf("\"storage\"");
        ISBN=wholeStr.substring(pos3+8,pos4-2);
        int pos5=wholeStr.indexOf("\"price\"");
        storage=Integer.parseInt(wholeStr.substring(pos4+10,pos5-1));
        int pos6=wholeStr.length();
        price=Float.parseFloat(wholeStr.substring(pos5+8,pos6-1));

        //System.out.println(username);
        //System.out.println(password);

        PrintWriter out = response.getWriter();
        out.println(bookName);
        out.println(author);
        out.println(coverPath);
        out.println(ISBN);
        out.println(storage);
        out.println(price);

        try{
            // 注册 JDBC 驱动器
            Class.forName("com.mysql.jdbc.Driver");

            // 打开一个连接
            conn = DriverManager.getConnection(DB_URL,USER,PASS);

            // 执行 SQL 查询
            stmt = conn.createStatement();
            String sql;
            sql="INSERT INTO `book` (`bookName`, `author`, `coverPath`, `ISBN`, `storage`, `price`) " +
                    "VALUES ('"+bookName+"', '"+author+"', '"+coverPath+"', '"+ISBN+"', '"+storage+"', '"+price+"')";

            int rs = stmt.executeUpdate(sql);

            /*if (userId==0) {
                response.setStatus(500);
                out.println("Error: wrong username or password!");
            }
            if (validity==0){
                response.setStatus(403);
                out.println("Error: you are forbidden!");
            }*/
            out.println("Add book successfully!");
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