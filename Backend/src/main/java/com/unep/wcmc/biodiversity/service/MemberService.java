package com.unep.wcmc.biodiversity.service;


import com.unep.wcmc.biodiversity.model.Member;
import com.unep.wcmc.biodiversity.repository.MemberRepository;
import com.unep.wcmc.biodiversity.support.AbstractService;
import org.springframework.stereotype.Service;

@Service
public class MemberService extends AbstractService<Member, MemberRepository> {
}
