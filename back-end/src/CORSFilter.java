import javax.servlet.*;
import javax.servlet.http.HttpServletResponse;
import java.util.*;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

//实现 Filter 类
public class CORSFilter implements Filter {
    public void  init(FilterConfig config) throws ServletException {

    }
    public void  doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws java.io.IOException, ServletException {
        HttpServletResponse HttpResponse = (HttpServletResponse) response;
        //System.out.println(111);
        //String origin = (String) servletRequest.getRemoteHost()+":"+servletRequest.getRemotePort();
        HttpResponse.setHeader("Access-Control-Allow-Origin", "*");
        HttpResponse.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
        HttpResponse.setHeader("Access-Control-Max-Age", "3600");
        HttpResponse.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        HttpResponse.setHeader("Access-Control-Allow-Credentials","true");
        chain.doFilter(request, response);
    }
    public void destroy( ){

    }
}
