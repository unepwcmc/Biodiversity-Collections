package com.unep.wcmc.biodiversity.service;

import com.unep.wcmc.biodiversity.helper.MailUtils;
import com.unep.wcmc.biodiversity.model.*;
import com.unep.wcmc.biodiversity.repository.CuratorRepository;
import com.unep.wcmc.biodiversity.repository.InviteCuratorTokenRepository;
import com.unep.wcmc.biodiversity.security.SecurityUtils;
import com.unep.wcmc.biodiversity.support.AbstractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class CuratorService extends AbstractService<Curator, CuratorRepository> {

    @Autowired
    private InviteCuratorTokenRepository inviteTokenRepo;

    @Autowired
    private InstitutionService institutionService;

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private Environment environment;

    @Autowired
    private MailUtils mailUtils;

    @Override
    public Curator get(Long id) {
        Curator result = super.get(id);
        User user = result.getUser();
        if (user != null) {
            user.setPassword("");
            user.setActualPassword("");
        }
        return result;
    }

    @Override
    public Curator save(Curator curator) {
        User user = curator.getUser();
        if (user != null) {
            user.setEnabled(true);
            user.setPassword(
                    passwordEncoder.encode(user.getPassword()));
        }
        return super.save(curator);
    }

    public Curator create(User user) {
        Curator curator = new Curator();
        curator.setUser(user);
        return save(curator);
    }

    public void inviteCurator(String email, String institutionId, String urlCallback) {
        Institution institution = institutionService.get(new Long(institutionId));

        User user = userService.getRepository().findByEmail(email);
        if (user == null) {
            user = new User();
            user.setEmail(email);
            user.setUsername(email);
            user.setPassword("123456");
            user.setInstitution(institution);
            user.setRole(UserRole.RoleType.CURATOR.name());
            user = userService.create(user);
        }

        Curator curator = repo.findByUserEmail(email);
        if (curator == null) {
            curator = create(user);
        }

        Map<String, Object> mailParameters = new HashMap<>();
        mailParameters.put("email", email);
        mailParameters.put("institution", institution);
        mailParameters.put("curator", curator);
        mailParameters.put("url", getUrl(curator, institution, urlCallback, email));

        String template = user != null && user.getLanguage().equals(User.PT_BR) ?
                MailUtils.INVITE_CURATOR_TEMPLATE_PT_BR : MailUtils.INVITE_CURATOR_TEMPLATE_EN_GB;

        mailUtils.sendEmail(email, environment.getProperty("support.email"), "Biodiversity Collection Invite", template, mailParameters);
    }

    private String getUrl(Curator curator, Institution institution, String urlCallback, String email) {
        String token = UUID.randomUUID().toString();
        InviteCuratorToken inviteToken = new InviteCuratorToken(token, urlCallback, curator, email);
        inviteToken.setInstitution(institution);
        inviteTokenRepo.save(inviteToken);
        String result = String.format(urlCallback + "/#/curator/signup/%s", token);
        if (!result.startsWith("http")) {
            result = "http://" + result;
        }
        return result;
    }

    public InviteCuratorToken findByToken(String token) {
        InviteCuratorToken result = inviteTokenRepo.findByToken(token);
        result.getCurator().getUser().setPassword("");
        result.getCurator().getUser().setActualPassword("");
        return result;
    }

}
