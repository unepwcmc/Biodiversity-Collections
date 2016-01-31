package com.unep.wcmc.biodiversity.service;

import com.unep.wcmc.biodiversity.model.InstitutionSummary;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Service
public class ReportService {

    @Autowired
    private InstitutionService institutionService;


    @Autowired
    private BiodiversityCollectionService biodiversityCollectionService;


    public JRBeanCollectionDataSource createSummarySource(){

        ArrayList<HashMap> data = new ArrayList<>();
        List<InstitutionSummary> summaries = institutionService.listInstitutionSummary();

        summaries.forEach( summary ->{

            HashMap<String,String>  values = new HashMap<>();
            values.put("institution_name", summary.getInstitution().getName());
            values.put("fauna", summary.getFaunaCollections().toString());
            values.put("flora", summary.getFloraCollections().toString());
            values.put("microorganisms", summary.getMicroorganismsCollections().toString());
            values.put("specimens",summary.getSpecimens().toString());
            values.put("collections", summary.getCollections().toString());
            values.put("other", summary.getOtherCollections().toString());
            data.add(values);
        });

        return  new JRBeanCollectionDataSource(data);
    }

    public JRBeanCollectionDataSource createInstitutionType(){

        ArrayList<HashMap> dataPie = new ArrayList<>();
        List<Object[]> objectsPie = institutionService.getRepository().countByInstitutionType();

        objectsPie.forEach( obj ->{

            HashMap<String,String>  values = new HashMap<>();

            values.put("type", String.valueOf(obj[0]));
            values.put("value", String.valueOf(obj[1]));

            dataPie.add(values);
        });

        return new JRBeanCollectionDataSource(dataPie);
    }

    public JRBeanCollectionDataSource createBubbleCollection(){

        ArrayList<HashMap> dataBubble = new ArrayList<>();
        List<Object[]> objectsBubble = institutionService.getRepository().countByCollections();

        objectsBubble.forEach( obj ->{

            HashMap<String,String>  values = new HashMap<>();

            values.put("name", String.valueOf(obj[0]));
            values.put("axis_x", String.valueOf(obj[1]));
            values.put("axis_y", String.valueOf(obj[2]));
            values.put("size", String.valueOf(obj[2]));

            dataBubble.add(values);
        });

        return new JRBeanCollectionDataSource(dataBubble);
    }

    public JRBeanCollectionDataSource collectionCountType(){

        ArrayList<HashMap> dataBarCollection = new ArrayList<>();
        List<Object[]> objectsCollections = biodiversityCollectionService.getRepository().countByInstitutionType();

        objectsCollections.forEach( obj ->{

            HashMap<String,String>  values = new HashMap<>();

            values.put("type", String.valueOf(obj[0]));
            values.put("value", String.valueOf(obj[1]));

            dataBarCollection.add(values);
        });

        return new JRBeanCollectionDataSource(dataBarCollection);
    }

    public JRBeanCollectionDataSource collectionCountDefinition(){

        ArrayList<HashMap> dataCollectionDefinition = new ArrayList<>();
        List<Object[]> objectsDefinition = biodiversityCollectionService.getRepository().countByCollectionDefinition();

        objectsDefinition.forEach( obj ->{

            HashMap<String,String>  values = new HashMap<>();

            values.put("type", String.valueOf(obj[0]));
            values.put("value", String.valueOf(obj[1]));

            dataCollectionDefinition.add(values);
        });

        return new JRBeanCollectionDataSource(dataCollectionDefinition);
    }
}
