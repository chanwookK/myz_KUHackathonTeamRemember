package team.remember.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import team.remember.auth.PrincipalDetails;
import team.remember.domain.Users;
import team.remember.dto.MyPageUsersDto;
import team.remember.repository.UsersRepository;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true", allowedHeaders = "*")
@RestController
public class SettingController {

    @Autowired
    private UsersRepository usersRepository;

    @RequestMapping(value = "/api/nickname-setting", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.OK)
    @Transactional
    public void setNickName(@AuthenticationPrincipal PrincipalDetails principalDetails, @RequestParam("name") String name){

        Users currentUser = usersRepository.findByEmail(principalDetails.getUser().getEmail());
        currentUser.setNickName(name);

    }

    @RequestMapping(value = "/api/introduction-setting", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.OK)
    @Transactional
    public void setIntro(@AuthenticationPrincipal PrincipalDetails principalDetails, @RequestParam("intro") String intro){

        Users currentUser = usersRepository.findByEmail(principalDetails.getUser().getEmail());
        currentUser.setIntroduction(intro);

    }

}
