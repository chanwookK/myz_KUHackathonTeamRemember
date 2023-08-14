package team.remember.dto;


import lombok.Data;

@Data
public class TimerDto {

    private String timerState;

    public TimerDto(String timerState) {
        this.timerState = timerState;
    }
}
