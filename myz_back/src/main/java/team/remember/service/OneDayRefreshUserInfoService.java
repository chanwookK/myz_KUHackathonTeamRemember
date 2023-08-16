package team.remember.service;


import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team.remember.domain.Users;
import team.remember.repository.UsersRepository;

import java.sql.Time;
import java.util.Optional;


@Service
public class OneDayRefreshUserInfoService {

    @Autowired
    private UsersRepository usersRepository;


    @Transactional
    @Scheduled(cron = "0 0 0 * * *")
    public void performDailyDatabaseChange() {

        // 데이터베이스 변경 작업 수행
        Long i = 1L;


        while(usersRepository.findById(i).isPresent()){
            Optional<Users> Ouser = usersRepository.findById(i);
            Users user = Ouser.get();

            String newTotalTime = TimerService.addTwoTimeString(user.getTodayExerciseTime(), user.getTotalExerciseTime());
            user.setTotalExerciseTime(newTotalTime);
            user.setTodayExerciseTime("00:00:00");
            if(user.isTodayExercise()){
                user.setTotalNumOfExerciseDays(user.getTotalNumOfExerciseDays() + 1);
                user.setContinuousNumOfExerciseDays(user.getContinuousNumOfExerciseDays() + 1);
                user.setTodayExercise(false);
            }
            else{
                user.setContinuousNumOfExerciseDays(0);
            }
            
            //레벌업 로직 추가

            i++;

        }
    }
}
