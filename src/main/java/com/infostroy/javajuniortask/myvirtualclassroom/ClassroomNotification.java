package com.infostroy.javajuniortask.myvirtualclassroom;

import lombok.Data;
import lombok.NonNull;

@Data
public class ClassroomNotification {

    @NonNull
    private String content;

    @NonNull
    private String sender;

    @NonNull
    private NotificationType type;

    public enum NotificationType{
        JOIN_CLASSROOM,
        LEAVE_CLASSROOM,
        RAISED_HAND,
        LOWERED_HAND
    }
}
