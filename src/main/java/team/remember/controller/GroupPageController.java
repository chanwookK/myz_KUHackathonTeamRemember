package team.remember.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import team.remember.auth.PrincipalDetails;
import team.remember.domain.Users;
import team.remember.dto.GroupPageDto;
import team.remember.dto.MyPageUsersDto;
import team.remember.repository.UsersRepository;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class GroupPageController {

    @Autowired
    private UsersRepository usersRepository;


    @RequestMapping(value = "/api/GroupPageData", method = RequestMethod.GET)
    @ResponseStatus(value = HttpStatus.OK)
    public List<GroupPageDto> getGroupPageData(@AuthenticationPrincipal PrincipalDetails principalDetails){
        Users currentUser = principalDetails.getUser();

        List<String> friendEmails = currentUser.getFriendsEmail();
        List<GroupPageDto> groupPageData = new ArrayList<>();

        for (String email:friendEmails) {

            Users byEmail = usersRepository.findByEmail(email);
            groupPageData.add(new GroupPageDto(email, byEmail.getNickName(), byEmail.isCurrentlyExercise()));

        }

        return groupPageData;


    }

    @RequestMapping(value = "/api/GroupPageAddFriend", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.OK)
    @Transactional
    public void groupPageAddFriend(@AuthenticationPrincipal PrincipalDetails principalDetails, @RequestParam("email") String addEmail){

        Users currentUser = principalDetails.getUser();
        currentUser.getFriendsEmail().add(addEmail);

    }


}
