package com.unep.wcmc.biodiversity.service;

import com.unep.wcmc.biodiversity.model.*;
import com.unep.wcmc.biodiversity.repository.InstitutionRepository;
import com.unep.wcmc.biodiversity.support.AbstractService;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class InstitutionService extends AbstractService<Institution, InstitutionRepository> {

    @Override
    public Institution get(Long id) {
        Institution result = repo.getById(id);
        if (result != null) {
            for (Curator curator : result.getCurators()) {
                curator.getUser().setInstitution(null);
            }
        }
        return result;
    }


    @Override
    public Institution save(Institution institution) {
        Set<Curator> curators = institution.getCurators();
        institution.setCurators(null);
        institution = super.save(institution);
        institution.setCurators(curators);
        return super.save(institution);
    }

    public List<InstitutionSummary> listInstitutionSummary() {
        List<InstitutionSummary> result = new ArrayList<>();
        List<Object[]> queryResult = repo.listInstitutionSummary();
        for (Object[] record : queryResult) {
            Contact contact = new Contact();
            InstitutionType institutionType = record[9] != null ? InstitutionType.valueOf((String) record[9]) : null;
            Institution institution = new Institution(((BigInteger) record[0]).longValue(), (String) record[1], contact,
                    institutionType);
            InstitutionSummary summary = new InstitutionSummary(institution, ((BigInteger) record[10]).longValue(),
                    ((BigInteger) record[11]).longValue(), ((BigInteger) record[12]).longValue(),
                    ((BigInteger) record[13]).longValue(), ((BigInteger) record[14]).longValue(),
                    ((BigInteger) record[15]).longValue(), ((BigInteger) record[16]).longValue());
            result.add(summary);
        }
        return result;
    }


}
