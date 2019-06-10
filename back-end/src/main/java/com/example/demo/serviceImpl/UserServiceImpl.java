package com.example.demo.serviceImpl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.example.demo.dao.UserDao;
import com.example.demo.entity.User;
import com.example.demo.secret.DefensePolicy;
import com.example.demo.service.UserService;
import com.example.demo.util.UserUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private DefensePolicy defensePolicy;

    @Override
    public boolean isBanned(String username) {
        System.out.println(username);
        System.out.println(userDao.findByUsername(username).getValidity());
        if (userDao.findByUsername(username).getValidity() == 0)
            return true;
        return false;
    }

    @Override
    public boolean isLoginInfoCorrect(String username, String password) {
        if (userDao.findByUsernameAndPassword(username, password) != null)
            return true;
        return false;
    }

    @Override
    public JSONObject signin(String username) {
        User user = userDao.findByUsername(username);
        return UserUtil.constructJsonOfSignIn(user.getUserId(), user.getUsername(), user.getIdentity(), user.getValidity());
    }

    @Override
    public boolean doesUsernameExist(String username) {
        if (userDao.findByUsername(username) != null)
            return true;
        return false;
    }

    @Override
    public JSONObject signup(String username, String password, String email, String ipAddr) {
        if (!defensePolicy.doAllowSignUp(ipAddr))
            return UserUtil.constructJsonOfDisallow();
        defensePolicy.checkDatebase();
        userDao.save(new User(username, password, email, 0, 1));
        return UserUtil.constructJsonOfSignUp();
    }

    @Override
    public JSONObject show() {
        JSONArray users = new JSONArray();
        userDao.findAll().forEach(user -> {
            if (user.getIdentity() != 1) {  //if not administrator
                users.add(UserUtil.constructJsonOfUser(user.getUserId(), user.getUsername(), user.getEmail(), user.getValidity()));
            }
        });
        return UserUtil.constructJsonOfShow(users);
    }

    @Override
    public JSONObject toggle(int userId, int targetValidity) {
        User user = userDao.findById(userId);
        user.setValidity(targetValidity);
        userDao.save(user);

        return UserUtil.constructJsonOfToggle();
    }

}
