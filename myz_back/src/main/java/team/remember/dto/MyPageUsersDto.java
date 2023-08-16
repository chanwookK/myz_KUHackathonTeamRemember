package team.remember.dto;


import lombok.Data;

@Data
public class MyPageUsersDto {

    private int continuousNumOfExerciseDays;
    private int level;
    private String todayExerciseTime;
    private boolean currentlyExercise;

    public MyPageUsersDto(int continuousNumOfExerciseDays, int level, String todayExerciseTime, boolean currentlyExercise) {
        this.continuousNumOfExerciseDays = continuousNumOfExerciseDays;
        this.level = level;
        this.todayExerciseTime = todayExerciseTime;
        this.currentlyExercise = currentlyExercise;
    }
}
