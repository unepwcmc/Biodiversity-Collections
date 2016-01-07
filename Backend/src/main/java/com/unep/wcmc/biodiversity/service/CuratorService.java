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
    private Environment environment;

    @Autowired
    private MailUtils mailUtils;

    public void inviteCurator(String email, String institution, String urlCallback) {
        Curator curator = new Curator();
        curator.setEmail(email);
        repo.save(curator);

        Map<String, Object> mailParameters = new HashMap<>();
        mailParameters.put("email", email);
        mailParameters.put("institution", institution);
        mailParameters.put("url", getUrl(curator, urlCallback, email, institution));

        User user = SecurityUtils.getCurrentUser();
        String template = user != null && user.getLanguage().equals(User.PT_BR) ?
                MailUtils.INVITE_CURATOR_TEMPLATE_PT_BR : MailUtils.INVITE_CURATOR_TEMPLATE_EN_GB;

        mailUtils.sendEmail(email, environment.getProperty("support.email"), "Biodiversity Collection Invite", template, mailParameters);
    }

    private String getUrl(Curator curator, String urlCallback, String email, String institution) {
        String result = String.format(urlCallback + "/#/curator/create/" + curator.getId());
        if (!result.startsWith("http")) {
            result = "http://" + result;
        }
        return result;
    }

}
