package team.remember.domain;


import lombok.Getter;

import javax.persistence.Embeddable;
import javax.persistence.Embedded;


@Embeddable
@Getter
public class exerciseRecord {

    private String sett;
    private String exerciseType;

    protected exerciseRecord(){

    }

    public exerciseRecord(String sett, String exerciseType){
        this.sett = sett;
        this.exerciseType = exerciseType;
    }
}
