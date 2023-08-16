package team.remember.dto;


import lombok.Data;

@Data
public class GroupPageDto {

    private String email;
    private String nickName;
    private boolean currentlyExercise;

    public GroupPageDto(String email, String nickName, boolean currentlyExercise) {
        this.email = email;
        this.nickName = nickName;
        this.currentlyExercise = currentlyExercise;
    }
}
