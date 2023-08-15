package team.remember.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import team.remember.auth.PrincipalDetails;
import team.remember.domain.Users;
import team.remember.repository.UsersRepository;

@Controller
public class UsersController {


    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @GetMapping("/loginForm")
    public String loginFrom(){

        return "loginForm";

    }


    @RequestMapping(value = "/loginRedirect")
    public String loginRedirect(){

        return "redirect:http://localhost:3000";

    }

    @GetMapping("/joinForm")
    public String joinForm(){
        return "joinForm";
    }

    @PostMapping("/join")
    public String join(Users user){

        String rawPassword = user.getPassword();
        String encPassword = bCryptPasswordEncoder.encode(rawPassword);
        user.setPassword(encPassword);
        System.out.println(user);

        usersRepository.save(user); //회원가입 잘됨. 비밀번호 : 1234 => 시큐리티로 로그인을 할 수 없음. 이유는 패스워드가 암호화가 안되어 있기 때문
        return "redirect:/loginForm";
    }

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
