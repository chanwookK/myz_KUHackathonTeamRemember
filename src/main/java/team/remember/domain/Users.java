package team.remember.domain;


import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import net.minidev.json.JSONObject;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Users {


    @Builder
    public Users(String email, String realName, String nickName, int level, int continuousNumOfExerciseDays, int totalNumOfExerciseDays, String provider) {
        this.email = email;
        this.realName = realName;
        this.nickName = nickName;
        this.level = level;
        this.continuousNumOfExerciseDays = continuousNumOfExerciseDays;
        this.totalNumOfExerciseDays = totalNumOfExerciseDays;
        this.provider = provider;
    }


    @Id
    @GeneratedValue
    private Long id;

    @Column(unique = true)
    private String email;  //이메일
    private String realName; //사용자 이름
    private String nickName; //닉네임
    private int level; // 레벨
    private String introduction; //한줄소개

    private String totalExerciseTime; //총 운동시간
    private String todayExerciseTime; //오늘 운동시간
    private int continuousNumOfExerciseDays; //연속 운동 일수
    private int totalNumOfExerciseDays; //총 운동 일수


    private String password; //유산소 운동시간

    private boolean currentlyExercise = false;
    private boolean todayExercise = false;


    @Embedded
    private List<exerciseRecord> exerciseRecord;


    @ElementCollection
    private List<String> friendsEmail = new ArrayList<>(); //친구 이메일 FK


    private int weight; //체중
    private int muscleMass; //골격근량
    private int fatMass; //체지방량

    private String provider;


}
