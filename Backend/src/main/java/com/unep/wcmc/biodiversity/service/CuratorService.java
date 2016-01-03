package com.unep.wcmc.biodiversity.service;

import com.unep.wcmc.biodiversity.helper.MailUtils;
import com.unep.wcmc.biodiversity.model.Curator;
import com.unep.wcmc.biodiversity.model.InviteCuratorToken;
import com.unep.wcmc.biodiversity.model.User;
import com.unep.wcmc.biodiversity.repository.CuratorRepository;
import com.unep.wcmc.biodiversity.repository.InviteCuratorTokenRepository;
import com.unep.wcmc.biodiversity.security.SecurityUtils;
import com.unep.wcmc.biodiversity.support.AbstractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class CuratorService extends AbstractService<Curator, CuratorRepository> {

    @Autowired
    private InviteCuratorTokenRepository inviteTokenRepo;

    @Autowired
    private Environment environment;

    @Autowired
    private MailUtils mailUtils;

    public void inviteCurator(String email, String institution, String urlCallback) {
        User user = SecurityUtils.getCurrentUser();

        Map<String, Object> mailParameters = new HashMap<>();
        mailParameters.put("email", email);
        mailParameters.put("institution", institution);
        mailParameters.put("url", getUrl(user, urlCallback, email, institution));

        String template = user != null && user.getLanguage().equals(User.PT_BR) ?
                MailUtils.INVITE_CURATOR_TEMPLATE_PT_BR : MailUtils.INVITE_CURATOR_TEMPLATE_EN_GB;

        mailUtils.sendEmail(email, environment.getProperty("support.email"), "Reset Password", template, mailParameters);
    }

    private String getUrl(User user, String urlCallback, String email, String institution) {
        final String token = UUID.randomUUID().toString();
        final InviteCuratorToken inviteToken = new InviteCuratorToken(token, urlCallback, user, email, institution);
        inviteTokenRepo.save(inviteToken);
        String result = String.format(urlCallback + "/#/curator/signup/%s", token);
        if (!result.startsWith("http")) {
            result = "http://" + result;
        }
        return result;
    }

}
