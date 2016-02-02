package com.unep.wcmc.biodiversity.service;

import com.unep.wcmc.biodiversity.model.BiodiversityCollection;
import com.unep.wcmc.biodiversity.model.CollectionDefinition;
import com.unep.wcmc.biodiversity.model.User;
import com.unep.wcmc.biodiversity.model.UserRole;
import com.unep.wcmc.biodiversity.repository.BiodiversityCollectionRepository;
import com.unep.wcmc.biodiversity.security.SecurityUtils;
import com.unep.wcmc.biodiversity.support.AbstractService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BiodiversityCollectionService extends AbstractService<BiodiversityCollection, BiodiversityCollectionRepository> {

    public Page<BiodiversityCollection> searchByName(String name, Pageable pageable) {
        User user = SecurityUtils.getCurrentUser();
        if (user == null) {
            return repo.findByNameContainingIgnoreCaseAndPublishedOrderByNameAsc(name, true, pageable);
        } else if (user.getUserRole().getRole().equals(UserRole.RoleType.CURATOR.name())) {
            return repo.findByNameContainingIgnoreCaseOrderByNameAscForCurator(name, user.getId(), pageable);
        }
        return repo.findByNameContainingIgnoreCaseOrderByNameAsc(name, pageable);
    }

    public List<BiodiversityCollection> searchByNameTop5(String name) {
        User user = SecurityUtils.getCurrentUser();
        if (user == null) {
            return repo.findTop5ByNameContainingIgnoreCaseAndPublishedOrderByNameAsc(name, true);
        } else if (user.getUserRole().getRole().equals(UserRole.RoleType.CURATOR.name())) {
            Pageable top5 = new PageRequest(0, 5);
            return repo.findTop5ByNameContainingIgnoreCaseOrderByNameAscForCurator(name, user.getId(), top5);
        }
        return repo.findTop5ByNameContainingIgnoreCaseOrderByNameAsc(name);
    }

    public Page<BiodiversityCollection> searchByDefinition(String definition, Pageable pageable) {
        User user = SecurityUtils.getCurrentUser();
        CollectionDefinition colDefinition = CollectionDefinition.valueOf(definition.toUpperCase());
        if (user == null) {
            return repo.findAllByCollectionDefinitionAndPublishedOrderByName(colDefinition, true, pageable);
        } else if (user.getUserRole().getRole().equals(UserRole.RoleType.CURATOR.name())) {
            return repo.findAllByCollectionDefinitionForCurator(colDefinition, user.getId(), pageable);
        }
        return repo.findAllByCollectionDefinitionOrderByName(colDefinition, pageable);
    }

    public Page<BiodiversityCollection> searchAll(Pageable pageable) {
        User user = SecurityUtils.getCurrentUser();
        if (user == null) {
            return repo.findAllByPublishedOrderByName(true, pageable);
        } else if (user.getUserRole().getRole().equals(UserRole.RoleType.CURATOR.name())) {
            return repo.findAllForCurator(user.getId(), pageable);
        }
        return repo.findAllOrderByName(pageable);
    }

    public List<Object[]> searchCoordinatesByDefinition(String definition) {
        User user = SecurityUtils.getCurrentUser();
        CollectionDefinition colDefinition = CollectionDefinition.valueOf(definition.toUpperCase());
        if (user == null) {
            return repo.listAllCoordinatesByDefinitionAndPublished(colDefinition, true);
        } else if (user.getUserRole().getRole().equals(UserRole.RoleType.CURATOR.name())) {
            return repo.listAllCoordinatesByDefinitionForCurator(colDefinition, user.getId());
        }
        return repo.listAllCoordinatesByDefinition(colDefinition);
    }

    public List<Object[]> searchCoordinates() {
        User user = SecurityUtils.getCurrentUser();
        if (user == null) {
            return repo.listAllCoordinatesPublished(true);
        } else if (user.getUserRole().getRole().equals(UserRole.RoleType.CURATOR.name())) {
            return repo.listAllCoordinatesForCurator(user.getId());
        }
        return repo.listAllCoordinates();
    }

}