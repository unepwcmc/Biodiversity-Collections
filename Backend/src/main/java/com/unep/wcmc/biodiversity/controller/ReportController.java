package com.unep.wcmc.biodiversity.controller;

import com.unep.wcmc.biodiversity.model.InstitutionSummary;
import com.unep.wcmc.biodiversity.service.BiodiversityCollectionService;
import com.unep.wcmc.biodiversity.service.InstitutionService;
import com.unep.wcmc.biodiversity.service.ReportService;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.design.JasperDesign;
import net.sf.jasperreports.engine.type.WhenNoDataTypeEnum;
import net.sf.jasperreports.engine.xml.JRXmlLoader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/report")
public class ReportController {

    private static Logger log = LoggerFactory.getLogger(ReportController.class);

    @Autowired
    private ReportService service;


    @RequestMapping(value="/pdf", method = { RequestMethod.GET })
    public void getReport(HttpServletResponse response){

        HashMap<String, Object> parameters =  new HashMap<String, Object>();

        parameters.put("institution_chart_datasource",service.createInstitutionType());
        parameters.put("overall_picture_datasource", service.createBubbleCollection());
        parameters.put("organisms_type_datasource", service.collectionCountType());
        parameters.put("collection_type_datasource", service.collectionCountDefinition());

        JasperPrint jasperPrint = getObjectPdf("jasper_template/biodiversity.jrxml", parameters, service.createSummarySource());

        sendPdfResponse(response, jasperPrint, "collecions");
    }


    public JasperPrint getObjectPdf(String path, Map<String, Object> parameters, JRDataSource dataSource) {
        JasperPrint jasperPrint = null;

        InputStream inStream = null;
        try {
            inStream = getClass().getClassLoader().getResourceAsStream(path);
            JasperDesign jasperDesign = JRXmlLoader.load(inStream);
            JasperReport jasperReport = JasperCompileManager.compileReport(jasperDesign);
            jasperReport.setWhenNoDataType(WhenNoDataTypeEnum.ALL_SECTIONS_NO_DETAIL);
            jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);
        } catch (JRException jre) {
            log.error("Error creating Pdf", jre);
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

    public static void sendPdfResponse(HttpServletResponse response, JasperPrint jasperPrint, String fileName){

        //Remove all whitespace from file name
        fileName.replaceAll("\\s","");

        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {
            JasperExportManager.exportReportToPdfStream(jasperPrint, out);
        } catch (JRException e1) {
            e1.printStackTrace();
        }

        byte[] data = out.toByteArray();

        response.setContentType("application/pdf");
        //To make it a download change "inline" to "attachment"
        response.setHeader("Content-disposition", "inline; filename=" + fileName + ".pdf");
        response.setContentLength(data.length);

        try {
            response.getOutputStream().write(data);
            response.getOutputStream().flush();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }
}
