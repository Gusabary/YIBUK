package com.example.demo.serviceImpl;

import com.example.demo.entity.MUser;
import com.example.demo.repository.MUserRepository;
import com.example.demo.service.MUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MUserServiceImpl implements MUserService {

    @Autowired
    MUserRepository mUserRepository;

    @Override
    public void test() {
        MUser mUser = new MUser("tbc2", "19", "male");
        mUserRepository.save(mUser);
    }

}
