package team.remember.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import team.remember.auth.PrincipalDetails;
import team.remember.domain.Users;
import team.remember.domain.exerciseRecord;
import team.remember.dto.ExerciseRecordDto;
import team.remember.dto.MyPageDto;
import team.remember.dto.MyPageUsersDto;
import team.remember.repository.UsersRepository;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true", allowedHeaders = "*")
@RestController
public class MyPageController {

    @Autowired
    private UsersRepository usersRepository;


    @RequestMapping(value = "/api/MyPageData", method = RequestMethod.GET)
    @ResponseStatus(value = HttpStatus.OK)
    public MyPageDto getMyPageData(@AuthenticationPrincipal PrincipalDetails principalDetails){

        Users currentUser = usersRepository.findByEmail(principalDetails.getUser().getEmail());

        List<ExerciseRecordDto> exerciseRecord = new ArrayList<>();

        if(currentUser.getExerciseRecord() != null) {

            for (exerciseRecord c : currentUser.getExerciseRecord()) {
                ExerciseRecordDto exerciseRecordDto = new ExerciseRecordDto();
                exerciseRecordDto.setExerciseType(c.getExerciseType());
                exerciseRecordDto.setSett(c.getSett());

                exerciseRecord.add(exerciseRecordDto);

            }
        }



        return new MyPageDto(currentUser.getNickName(), currentUser.getIntroduction(), currentUser.getLevel() , currentUser.getWeight(), currentUser.getMuscleMass(), currentUser.getFatMass(),exerciseRecord);

    }

}
