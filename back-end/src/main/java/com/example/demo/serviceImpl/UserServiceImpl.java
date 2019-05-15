package com.example.demo.serviceImpl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.UserService;
import com.example.demo.util.UserUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    public boolean isBanned(String username) {
        System.out.println(username);
        System.out.println(userRepository.findByUsername(username).getValidity());
        if (userRepository.findByUsername(username).getValidity() == 0)
            return true;
        return false;
    }

    public boolean isLoginInfoCorrect(String username, String password) {
        if (userRepository.findByUsernameAndPassword(username, password) != null)
            return true;
        return false;
    }

    public JSONObject signin(String username) {
        User user = userRepository.findByUsername(username);
        return UserUtil.constructJsonOfSignIn(user.getUserId(), user.getUsername(), user.getIdentity(), user.getValidity());
    }

    public boolean doesUsernameExist(String username) {
        if (userRepository.findByUsername(username) != null)
            return true;
        return false;
    }

    public JSONObject signup(String username, String password, String email) {
        userRepository.save(new User(username, password, email, 0, 1));
        return UserUtil.constructJsonOfSignUp();
    }

    public JSONObject show() {
        JSONArray users = new JSONArray();
        userRepository.findAll().forEach(user -> {
            if (user.getIdentity() != 1) { //if not administrator
                users.add(UserUtil.constructJsonOfUser(user.getUserId(), user.getUsername(), user.getEmail(), user.getValidity()));
            }
        });
        return UserUtil.constructJsonOfShow(users);
    }

    public JSONObject toggle(int userId, int targetValidity) {
        User user = userRepository.findById(userId).get();
        user.setValidity(targetValidity);
        userRepository.save(user);

        return UserUtil.constructJsonOfToggle();
    }

}
