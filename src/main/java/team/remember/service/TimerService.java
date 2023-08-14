package team.remember.service;


import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team.remember.auth.PrincipalDetails;
import team.remember.domain.Users;
import team.remember.dto.TimerDto;
import team.remember.repository.UsersRepository;

import javax.persistence.EntityManager;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;


@Service
public class TimerService {
    @Autowired
    private EntityManager em;

    @Autowired
    private UsersRepository usersRepository;


    public static boolean extractLastTwoDigits(String timeString) {
        // 시간 문자열을 ":" 기준으로 분리
        String[] parts = timeString.split(":");

        // 마지막 부분을 추출하고 int로 변환
        String secondPart = parts[1];
        String firstPart = parts[0];

        return (Integer.parseInt(firstPart) > 0) || (Integer.parseInt(secondPart) >= 30);
    }

    public static String addTwoTimeString(String time1, String time2){

        //포맷 지정
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm:ss");

        // 문자열로부터 LocalTime 객체로 변환
        LocalTime time1str = LocalTime.parse(time1, formatter);
        LocalTime time2str = LocalTime.parse(time2, formatter);

        // 두 시간 덧셈 수행
        LocalTime result = time1str.plusHours(time2str.getHour())
                .plusMinutes(time2str.getMinute())
                .plusSeconds(time2str.getSecond());

        // 결과 출력 (시:분:초 형식으로 변환)
        String resultStr = result.format(formatter);

        return resultStr;
    }

    @Transactional
    public TimerDto timerStart(Users user){

        Users currentUser = usersRepository.findByEmail(user.getEmail());

        if(!currentUser.isCurrentlyExercise()){
            currentUser.setCurrentlyExercise(true);
            em.flush();
            return new TimerDto("start");

        }
        return new TimerDto("maintain");

    }

    /**
    *
    *pause 시 현재 운동상태를 변경하고 오늘 운동에 대한 설정을 진행한다.
    *또한 오늘의 운동 시간을 변경한다.
    * */

    @Transactional
    public TimerDto timerPause(Users user, String timerTime){

        Users currentUser = usersRepository.findByEmail(user.getEmail());

        if(!currentUser.isCurrentlyExercise()){
            return new TimerDto("maintain");

        }
        // 만약 30분보다 운동을 오래 했을 경우 유저의 오늘 운동을 true로 설정한다.
        if(extractLastTwoDigits(timerTime)){
            currentUser.setTodayExercise(true);
            em.flush();
        }

        //현재 운동상태를 false로 설정하고, 오늘의 운동 시간을 재설정한다.
        currentUser.setCurrentlyExercise(false);
        currentUser.setTodayExerciseTime(timerTime);
        em.flush();
        return new TimerDto("pause");

    }


}
