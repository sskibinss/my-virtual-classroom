package com.infostroy.javajuniortask.myvirtualclassroom;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;


@Component
public class DatabaseLoader implements CommandLineRunner {

    private final MemberRepository repository;

    @Autowired
    public DatabaseLoader(MemberRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... strings) throws Exception {
        this.repository.save(new Member("Frodo Begins", Member.HandMoveType.LOWERED));
        this.repository.save(new Member("Bilbo Begins", Member.HandMoveType.LOWERED));
        this.repository.save(new Member("Frederik Munches", Member.HandMoveType.RAISED));
    }
}
