package com.unep.wcmc.biodiversity.controller;


import com.unep.wcmc.biodiversity.model.Image;
import com.unep.wcmc.biodiversity.service.AttachmentService;
import com.unep.wcmc.biodiversity.service.ImageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Base64;

@RestController
@RequestMapping("/medias")
public class MultimediaController {

    private final Logger log = LoggerFactory.getLogger(this.getClass());

    @Autowired
    AttachmentService attachmentService;

    @Autowired
    private ImageService imageService;

    @ResponseBody
    @RequestMapping(value = "{id}/image", method = RequestMethod.GET, produces = MediaType.IMAGE_JPEG_VALUE)
    public Object getImage( @PathVariable Long id ) {

        byte[] file = attachmentService.get(id).getFile();

        try{
            return new String(Base64.getEncoder().encode(file));
        }
        catch (Exception e){
            log.error(e.getMessage());
        }

        return null;
    }
    @RequestMapping(method= RequestMethod.POST)
    public Image uploadMedia(@RequestParam("file") MultipartFile file) {

        return imageService.save(file);
    }


}
