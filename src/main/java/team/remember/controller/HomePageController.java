package team.remember.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import team.remember.auth.PrincipalDetails;
import team.remember.domain.Users;
import team.remember.dto.MyPageUsersDto;
import team.remember.dto.TimerDto;
import team.remember.service.TimerService;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class HomePageController {

    @Autowired
    private TimerService timerService;

    /**
     * HTTP GET 요청을 통해 MyPage의 정보들을 생성.
     * /api/MyPageData 로 받을 수 있다.
     *
     * @param MyPageUsersDto MyPage의 정보들을 가지고 있는 DTO
     * @return 생성된 MyPage의 정보와 함께 상태 코드 200을 반환. 실패 시 에러 메시지와 함께 다른 상태 코드를 반환.
     *
     */
    @RequestMapping(value = "/api/HomePageData", method = RequestMethod.GET)
    @ResponseStatus(value = HttpStatus.OK)
    public MyPageUsersDto getHomePageData(@AuthenticationPrincipal PrincipalDetails principalDetails){

        Users currentUser = principalDetails.getUser();

        return new MyPageUsersDto(currentUser.getContinuousNumOfExerciseDays(),currentUser.getLevel(), currentUser.getTodayExerciseTime(),currentUser.isCurrentlyExercise());

    }

    /**
     * HTTP POST 요청을 통해 MyPage의 Timer에 대해서 시작할지 멈출지 판단함.
     * /api/startBtn 으로 받을 수 있다.
     *
     * @return 시작 신호는 "start" 멈춤 신호는 "pause" 유지 신호는 "maintain"으로 전달된다.
     *
     */
    @RequestMapping(value = "/api/startBtn", method = RequestMethod.GET)
    @ResponseStatus(value = HttpStatus.OK)
    public TimerDto touchStart(@AuthenticationPrincipal PrincipalDetails principalDetails){
        Users currentUser = principalDetails.getUser();

        return timerService.timerStart(currentUser);
    }


    /**
     * HTTP POST 요청을 통해 MyPage의 Timer에 대해서 시작할지 멈출지 판단함.
     * /api/pauseBtn 으로 받을 수 있다.
     *
     * @return 시작 신호는 "start" 멈춤 신호는 "pause" 유지 신호는 "maintain"으로 전달된다.
     * 타이머를 멈출 시 타이머의 시간을 데이터베이스에 저장한다.
     *
     */

    @RequestMapping(value = "/api/pauseBtn", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.OK)
    public TimerDto touchPause(@AuthenticationPrincipal PrincipalDetails principalDetails, @RequestParam("time") String timerTime){
        Users currentUser = principalDetails.getUser();

        return timerService.timerPause(currentUser, timerTime);
    }


}
