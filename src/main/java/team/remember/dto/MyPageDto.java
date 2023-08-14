package team.remember.dto;


import lombok.Data;

import java.util.List;

@Data
public class MyPageDto {

    private String nickName;
    private String introduction;
    private int level;
    private int weight;
    private int muscleMass;
    private int fatMass;
    private List<ExerciseRecordDto> exerciseRecord;

    public MyPageDto(String nickName, String introduction, int level, int weight, int muscleMass, int fatMass, List<ExerciseRecordDto> exerciseRecord) {
        this.nickName = nickName;
        this.introduction = introduction;
        this.level = level;
        this.weight = weight;
        this.muscleMass = muscleMass;
        this.fatMass = fatMass;
        this.exerciseRecord = exerciseRecord;
    }
}
