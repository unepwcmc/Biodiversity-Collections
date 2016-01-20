package com.unep.wcmc.biodiversity.controller;

import com.unep.wcmc.biodiversity.model.Member;
import com.unep.wcmc.biodiversity.service.MemberService;
import com.unep.wcmc.biodiversity.support.AbstractController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/members")
public class MemberController extends AbstractController<Member, MemberService> {
}
