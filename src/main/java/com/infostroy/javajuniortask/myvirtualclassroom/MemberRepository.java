package com.infostroy.javajuniortask.myvirtualclassroom;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, String> {
}
