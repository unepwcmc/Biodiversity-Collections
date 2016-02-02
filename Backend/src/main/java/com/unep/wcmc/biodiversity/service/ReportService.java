package com.unep.wcmc.biodiversity.service;

import com.unep.wcmc.biodiversity.model.InstitutionSummary;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.design.JasperDesign;
import net.sf.jasperreports.engine.type.WhenNoDataTypeEnum;
import net.sf.jasperreports.engine.xml.JRXmlLoader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ReportService {

    public final String PDF = "PDF";
    public final String XLS = "XLS";

    private static Logger log = LoggerFactory.getLogger(ReportService.class);

    @Autowired
    private InstitutionService institutionService;


    @Autowired
    private BiodiversityCollectionService biodiversityCollectionService;


    public JRBeanCollectionDataSource createSummarySource(){

        ArrayList<HashMap> data = new ArrayList<>();
        List<InstitutionSummary> summaries = institutionService.getRepository().listInstitutionSummary();

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

            if(obj[0] != null){

                HashMap<String,String>  values = new HashMap<>();

                values.put("type", String.valueOf(obj[0]));
                values.put("value", String.valueOf(obj[1]));

                dataPie.add(values);
            }
        });

        return new JRBeanCollectionDataSource(dataPie);
    }

    public JRBeanCollectionDataSource createBubbleCollection(){

        ArrayList<HashMap> dataBubble = new ArrayList<>();
        List<Object[]> objectsBubble = institutionService.getRepository().countByCollections();

        int index = 1;
        for( Object[] obj : objectsBubble){

            if(obj[0] != null){

                HashMap<String,String>  values = new HashMap<>();

                values.put("name", String.valueOf(obj[0]));
                values.put("axis_x", String.valueOf(Math.floor((Math.random() * 100) + 1)));
                values.put("axis_y", String.valueOf(Math.floor((Math.random() * 100) + 1)));
                values.put("size", String.valueOf(obj[2]));

                dataBubble.add(values);
                index++;
            }
        }

        return new JRBeanCollectionDataSource(dataBubble);
    }

    public JRBeanCollectionDataSource createBubbleSpecimen(){

        ArrayList<HashMap> dataBubble = new ArrayList<>();
        List<Object[]> objectsBubble = institutionService.getRepository().countBySpecimens();

        int index = 1;
        for( Object[] obj : objectsBubble){

            if(obj[0] != null){

                HashMap<String,String>  values = new HashMap<>();

                values.put("name", String.valueOf(obj[0]));
                values.put("axis_x", String.valueOf(Math.floor((Math.random() * 100) + 1)));
                values.put("axis_y", String.valueOf(Math.floor((Math.random() * 100) + 1)));
                values.put("size", String.valueOf(obj[2]));

                dataBubble.add(values);
                index++;
            }
        }

        return new JRBeanCollectionDataSource(dataBubble);
    }

    public JRBeanCollectionDataSource collectionCountType(){

        ArrayList<HashMap> dataBarCollection = new ArrayList<>();
        List<Object[]> objectsCollections = biodiversityCollectionService.getRepository().countByInstitutionType();

        objectsCollections.forEach( obj ->{

            if(obj[0] != null){

                HashMap<String,String>  values = new HashMap<>();

                values.put("type", String.valueOf(obj[0]));
                values.put("value", String.valueOf(obj[1]));

                dataBarCollection.add(values);
            }
        });

        return new JRBeanCollectionDataSource(dataBarCollection);
    }

    public JRBeanCollectionDataSource collectionCountDefinition(){

        ArrayList<HashMap> dataCollectionDefinition = new ArrayList<>();
        List<Object[]> objectsDefinition = biodiversityCollectionService.getRepository().countByCollectionDefinition();

        objectsDefinition.forEach( obj ->{

            if(obj[0] != null){

                HashMap<String,String>  values = new HashMap<>();

                values.put("type", String.valueOf(obj[0]));
                values.put("value", String.valueOf(obj[1]));

                dataCollectionDefinition.add(values);
            }
        });

        return new JRBeanCollectionDataSource(dataCollectionDefinition);
    }

    public JasperPrint getReport(){

        HashMap<String, Object> parameters =  new HashMap<String, Object>();

        parameters.put("institution_chart_datasource",createInstitutionType());
        parameters.put("overall_picture_datasource", createBubbleCollection());
        parameters.put("bubble_specimen_datasource", createBubbleSpecimen());
        parameters.put("organisms_type_datasource", collectionCountType());
        parameters.put("collection_type_datasource", collectionCountDefinition());


        return getJasperPrint("jasper_template/biodiversity.jrxml", parameters, createSummarySource());
    }

    private JasperPrint getJasperPrint(String path, Map<String, Object> parameters, JRDataSource dataSource) {
        JasperPrint jasperPrint = null;

        InputStream inStream = null;
        try {
            inStream = getClass().getClassLoader().getResourceAsStream(path);
            JasperDesign jasperDesign = JRXmlLoader.load(inStream);
            JasperReport jasperReport = JasperCompileManager.compileReport(jasperDesign);
            jasperReport.setWhenNoDataType(WhenNoDataTypeEnum.ALL_SECTIONS_NO_DETAIL);
            jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);

        } catch (JRException jre) {
            log.error("Error creating Report", jre);
        } finally {
            if (inStream != null) {
                try {
                    inStream.close();
                } catch (IOException e) {
                    log.error("Error closing stream", e);
                }
            }
        }

        return jasperPrint;
    }
}
