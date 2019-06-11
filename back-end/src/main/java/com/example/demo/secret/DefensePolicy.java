package com.example.demo.secret;

import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class DefensePolicy {

    @Autowired
    private UserRepository userRepository;

    private static final int recordSize = 5;  //5 sign up requests
    private static final int timeout = 6 * 60 * 60 * 1000;  //6 hours
    private static final int upperLimitOfUserNum = 30;
    private static int maxID = 119;
    private static Map<String, List<Date>> signUpRecords = new HashMap<>();

    private boolean isTimeOut(Date time) {
        return (new Date().getTime() - time.getTime() > timeout);
    }

    //can sign up for 5 times every 6 hours
    public boolean doAllowSignUp(String ipAddr) {
        if (signUpRecords.containsKey(ipAddr)) {
            List<Date> signUpRecord = signUpRecords.get(ipAddr);
            //remove timeout records
            for (int i = 0; i < recordSize; i++) {
                if (signUpRecord.isEmpty() || !isTimeOut(signUpRecord.get(0)))
                    break;
                signUpRecord.remove(0);
            }
            if (signUpRecords.get(ipAddr).size() >= recordSize)  //flood attack detected
                return false;
            signUpRecord.add(new Date());
            signUpRecords.put(ipAddr, signUpRecord);
        }
        else {
            List<Date> signUpRecord = new ArrayList<>();
            signUpRecord.add(new Date());
            signUpRecords.put(ipAddr, signUpRecord);
        }
        return true;
    }

    //delete last 5 users indiscriminately
    public void checkDatebase() {
        if (userRepository.count() >= upperLimitOfUserNum) {
            int numOfDeleted = 0;
            int id = maxID;
            while (numOfDeleted < 3) {
                if (userRepository.existsById(id)) {
                    userRepository.deleteById(id);
                    numOfDeleted++;
                }
                id--;
            }
        }
        maxID++;
    }

}
