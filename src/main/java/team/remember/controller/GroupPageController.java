package team.remember.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import team.remember.auth.PrincipalDetails;
import team.remember.domain.Users;
import team.remember.domain.exerciseRecord;
import team.remember.dto.ExerciseRecordDto;
import team.remember.dto.GroupPageDto;
import team.remember.dto.MyPageDto;
import team.remember.dto.MyPageUsersDto;
import team.remember.repository.UsersRepository;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true", allowedHeaders = "*")
@RestController
public class GroupPageController {

    @Autowired
    private UsersRepository usersRepository;


    @RequestMapping(value = "/api/GroupPageData", method = RequestMethod.GET)
    @ResponseStatus(value = HttpStatus.OK)
    public List<GroupPageDto> getGroupPageData(@AuthenticationPrincipal PrincipalDetails principalDetails){

        Users currentUser = usersRepository.findByEmail(principalDetails.getUser().getEmail());


        List<String> friendEmails = currentUser.getFriendsEmail();
        List<GroupPageDto> groupPageData = new ArrayList<>();

        if(friendEmails == null)
            return null;

        for (String email:friendEmails) {

            Users byEmail = usersRepository.findByEmail(email);
            groupPageData.add(new GroupPageDto(email, byEmail.getNickName(), byEmail.isCurrentlyExercise()));

        }

        return groupPageData;


    }

    @RequestMapping(value = "/api/GroupPageAddFriend", method = {RequestMethod.GET, RequestMethod.POST})
    @ResponseStatus(value = HttpStatus.OK)
    @Transactional
    public void groupPageAddFriend(@AuthenticationPrincipal PrincipalDetails principalDetails, @RequestParam("email") String addEmail){

        Users currentUser = usersRepository.findByEmail(principalDetails.getUser().getEmail());
        if(currentUser == null)
            return;

        currentUser.getFriendsEmail().add(addEmail);

    }

    @RequestMapping(value = "/api/GroupPageToFriendPageData", method = {RequestMethod.GET, RequestMethod.POST})
    @ResponseStatus(value = HttpStatus.OK)
    public MyPageDto friendPageData(@RequestParam("email") String email){

        Users currentUser = usersRepository.findByEmail(email);

        List<ExerciseRecordDto> exerciseRecord = new ArrayList<>();

        if(currentUser.getExerciseRecord() != null){

            for (team.remember.domain.exerciseRecord c : currentUser.getExerciseRecord()) {
                ExerciseRecordDto exerciseRecordDto = new ExerciseRecordDto();
                exerciseRecordDto.setExerciseType(c.getExerciseType());
                exerciseRecordDto.setSett(c.getSett());

                exerciseRecord.add(exerciseRecordDto);

            }
        }

        return new MyPageDto(currentUser.getNickName(), currentUser.getIntroduction(), currentUser.getLevel() , currentUser.getWeight(), currentUser.getMuscleMass(), currentUser.getFatMass(),exerciseRecord);

    }




}
