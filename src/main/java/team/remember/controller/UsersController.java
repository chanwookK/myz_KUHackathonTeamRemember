package team.remember.controller;


import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import team.remember.auth.PrincipalDetails;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class UsersController {


    /*
    *
    * @Id
    private String email;  //이메일
    private String realName; //사용자 이름
    private String nickName; //닉네임
    private int level; // 레벨
    private String introduction; //한줄소개

    private String totalExerciseTime; //총 운동시간
    private String aerobicExerciseTime; //유산소 운동시간
    private String todayExerciseTime; //오늘 운동시간
    private int continuousNumOfExerciseDays; //연속 운동 일수
    private int totalNumOfExerciseDays; //총 운동 일수

    private boolean currentlyExercise;


    @Embedded
    private List<exerciseRecord> exerciseRecord;


    @ElementCollection
    private List<String> friendsEmail; //친구 이메일 FK


    private int weight; //체중
    private int muscleMass; //골격근량
    private int fatMass; //체지방량

    private String provider;
    *
    * */

}
