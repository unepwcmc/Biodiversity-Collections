package com.unep.wcmc.biodiversity.service;

import com.unep.wcmc.biodiversity.model.Image;
import com.unep.wcmc.biodiversity.repository.ImageRepository;
import com.unep.wcmc.biodiversity.support.AbstractService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ImageService extends AbstractService<Image, ImageRepository> {


    /**
     * Persists the multimedia file data
     *
     * @param file
     * @return Image
     */
    public Image save(MultipartFile file) {

        Image result = null;

        if (!file.isEmpty()) {

            try {
                Image image = new Image(file);
                      image.setStatus(true);

                result = repo.save(image);


            } catch (Exception e) {
                log.error(e.getMessage());
            }
        }


        return result;
    }
}
