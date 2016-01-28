package com.unep.wcmc.biodiversity.controller;

import com.unep.wcmc.biodiversity.model.BiodiversityCollection;
import com.unep.wcmc.biodiversity.service.BiodiversityCollectionService;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.design.JasperDesign;
import net.sf.jasperreports.engine.export.JRPdfExporter;
import net.sf.jasperreports.engine.type.WhenNoDataTypeEnum;
import net.sf.jasperreports.engine.xml.JRXmlLoader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

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
    private BiodiversityCollectionService collectionService;

    @RequestMapping(value="/pdf", method = { RequestMethod.GET })
    public void getReport(HttpServletResponse response){

       // Page<BiodiversityCollection> collections = collectionService.list(new PageRequest(1,10));
      //  JRDataSource dataSource = new JRBeanCollectionDataSource(collections.getContent());


        ArrayList<HashMap> data = new ArrayList<>();
        HashMap<String,String>  values = new HashMap<>();
                                values.put("institution_name", "INPA Institution");
                                values.put("fauna", "1");
                                values.put("flora", "2");
                                values.put("microorganisms", "3");
                                values.put("state","4");
                                values.put("private", "5");
                                values.put("country", "6");
                                values.put("federal", "7");
                                values.put("other", "8");
                                values.put("institution_type", "federal");
                                values.put("institution_type_value", "8");
                                values.put("overall_picture_name", "10");
                                values.put("overall_picture_axis_x", "3");
                                values.put("overall_picture_axis_y", "5");
                                values.put("overall_picture_size", "20");

        HashMap<String,String>  values2 = new HashMap<>();
        values2.put("institution_name", "INPA Institution");
        values2.put("fauna", "13");
        values2.put("flora", "22");
        values2.put("microorganisms", "23");
        values2.put("state","42");
        values2.put("private", "52");
        values2.put("country", "62");
        values2.put("federal", "72");
        values2.put("other", "82");
        values2.put("institution_type", "state");
        values2.put("institution_type_value", "82");
        values.put("overall_picture_name", "12");
        values.put("overall_picture_axis_x", "8");
        values.put("overall_picture_axis_y", "10");
        values.put("overall_picture_size", "40");

        data.add(values);
        data.add(values2);



       // JasperPrint jasperPrint = getObjectPdf("jasper_template/biodiversity.jrxml", new HashMap<String, Object>(), dataSource);
        JasperPrint jasperPrint = getObjectPdf("jasper_template/biodiversity.jrxml", new HashMap<String, Object>(), new JRBeanCollectionDataSource(data));

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

   /* @RequestMapping(method = RequestMethod.GET , value = "pdf")
    public ModelAndView generatePdfReport(ModelAndView modelAndView){

        logger.debug("--------------generate PDF report----------");

        Map<String,Object> parameterMap = new HashMap<String,Object>();

        List<User> usersList = userDao.retrieveAllRegisteredUsers();

        JRDataSource JRdataSource = new JRBeanCollectionDataSource(usersList);

        parameterMap.put("datasource", JRdataSource);

        //pdfReport bean has ben declared in the jasper-views.xml file
        modelAndView = new ModelAndView("pdfReport", parameterMap);

        return modelAndView;

    }//generatePdfReport



    @RequestMapping(method = RequestMethod.GET , value = "xls")
    public ModelAndView generateXlsReport(ModelAndView modelAndView){

        logger.debug("--------------generate XLS report----------");

        Map<String,Object> parameterMap = new HashMap<String,Object>();

        List<User> usersList = userDao.retrieveAllRegisteredUsers();

        JRDataSource JRdataSource = new JRBeanCollectionDataSource(usersList);

        parameterMap.put("datasource", JRdataSource);

        //xlsReport bean has ben declared in the jasper-views.xml file
        modelAndView = new ModelAndView("xlsReport", parameterMap);

        return modelAndView;

    }//generatePdfReport
*/
}
