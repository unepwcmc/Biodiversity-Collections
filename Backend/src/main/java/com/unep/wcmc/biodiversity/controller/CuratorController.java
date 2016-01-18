package com.unep.wcmc.biodiversity.controller;

import com.unep.wcmc.biodiversity.dto.ErrorMessage;
import com.unep.wcmc.biodiversity.dto.SuccessResponse;
import com.unep.wcmc.biodiversity.model.Curator;
import com.unep.wcmc.biodiversity.model.InviteCurator;
import com.unep.wcmc.biodiversity.model.InviteCuratorToken;
import com.unep.wcmc.biodiversity.service.CuratorService;
import com.unep.wcmc.biodiversity.service.ImageService;
import com.unep.wcmc.biodiversity.support.AbstractController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/curators")
public class CuratorController extends AbstractController<Curator, CuratorService> {

    @Autowired
    private ImageService imageService;

    @Override
    public Object read(@PathVariable String id) {
        return service.get(new Long(id));
    }

    @RequestMapping(method= RequestMethod.GET, value="/search/name")
    public Page<Curator> name(@RequestParam String name,
                              @PageableDefault(page = 0, size = 10) Pageable pageable) {
        return service.getRepository().findByNameContainingIgnoreCaseOrderByNameAsc(name, pageable);
    }

    @RequestMapping(method= RequestMethod.GET, value="/search/autocomplete")
    public List<Curator> autocomplete(@RequestParam String name, @PageableDefault(page = 0, size = 10) Pageable pageable) {
        return service.getRepository().findTop5ByNameContainingIgnoreCaseOrderByNameAsc(name, pageable);
    }


    @RequestMapping(method= RequestMethod.POST, value="/{id}/media")
    public Curator uploadMedia(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        Curator curator = service.get(id);
        if (!file.isEmpty())
            curator.setImage(imageService.save(file));

        return service.save(curator);
    }

    @RequestMapping(value = "/invite", method= RequestMethod.POST)
    public SuccessResponse invite(@RequestBody InviteCurator invite) {
        service.inviteCurator(invite.getEmail(), invite.getInstitution(), invite.getUrl());
        return new SuccessResponse("curator's invite sent successful");
    }

    @RequestMapping(method= RequestMethod.GET, value = "/token/{token}")
    public Object getByToken(@PathVariable String token) {
        InviteCuratorToken inviteCuratorToken = service.findByToken(token);
        return inviteCuratorToken == null ? new ErrorMessage(token, "no matches found") : inviteCuratorToken.getCurator();
    }
}