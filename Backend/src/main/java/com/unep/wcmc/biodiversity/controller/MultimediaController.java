package com.unep.wcmc.biodiversity.controller;


import com.unep.wcmc.biodiversity.service.AttachmentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/medias")
public class MultimediaController {

    private final Logger log = LoggerFactory.getLogger(this.getClass());

    @Autowired
    AttachmentService attachmentService;

    @ResponseBody
    @RequestMapping(value = "{id}/image", method = RequestMethod.GET, produces = MediaType.IMAGE_JPEG_VALUE)
    public byte[] getImage( @PathVariable Long id ) {

        byte[] file = attachmentService.get(id).getFile();

        try{
            return file;
        }
        catch (Exception e){
            log.error(e.getMessage());
        }

        return null;
    }
}
