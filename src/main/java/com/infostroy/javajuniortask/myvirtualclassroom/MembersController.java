package com.infostroy.javajuniortask.myvirtualclassroom;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/members")
@CrossOrigin
public class MembersController {

    private final MemberRepository memberRepository;

    public MembersController(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @GetMapping
    public List<Member> getMembers() {
        return memberRepository.findAll();
    }

    @GetMapping("/{id}")
    public Member getMember(@PathVariable String id) {
        return memberRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @PostMapping
    public ResponseEntity<?> createMember(@RequestBody Member member) throws URISyntaxException {
        member.setHandMoveType(Member.HandMoveType.LOWERED);
        Member savedMember = memberRepository.save(member);
        return ResponseEntity.created(new URI("/members/" + savedMember.getName().replace(" ", "%20"))).body(savedMember);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateMember(@PathVariable String id, @RequestBody Member member) {
        Member currentMember = memberRepository.findById(id).orElseThrow(RuntimeException::new);
        currentMember.setName(member.getName());
        currentMember.setHandMoveType(member.getHandMoveType());
        currentMember = memberRepository.save(member);

        return ResponseEntity.ok(currentMember);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteById(@PathVariable String id) {
        memberRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @MessageMapping("/changeMember")
    @SendTo("/topic/activity")
    public Member member(Member member) {
        return memberRepository.save(member);
    }
}
