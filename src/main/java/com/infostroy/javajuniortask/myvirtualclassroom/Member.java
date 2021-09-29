package com.infostroy.javajuniortask.myvirtualclassroom;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Objects;

@Entity
@Getter
@Setter
@ToString
@RequiredArgsConstructor
@NoArgsConstructor
@Table(name = "members")
public class Member {

    @NotBlank
    @NonNull
    @Id
    private String name;


    @Column(name = "hand_move_type")
    @NonNull
    private HandMoveType handMoveType;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Member member = (Member) o;
        return name.equals(member.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name);
    }

    public static enum HandMoveType {
        RAISED,
        LOWERED
    }
}
