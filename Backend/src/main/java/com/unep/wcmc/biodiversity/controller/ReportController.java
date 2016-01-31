package com.unep.wcmc.biodiversity.controller;

import com.unep.wcmc.biodiversity.service.ReportService;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.export.ooxml.JRXlsxExporter;
import net.sf.jasperreports.export.SimpleExporterInput;
import net.sf.jasperreports.export.SimpleOutputStreamExporterOutput;
import net.sf.jasperreports.export.SimpleXlsxReportConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

@Controller
@RequestMapping("/report")
public class ReportController {

    @Autowired
    private ReportService service;


    @RequestMapping(value="/pdf", method = { RequestMethod.GET })
    public void getReport(HttpServletResponse response){

        sendPdfResponse(response, service.getReport(), "collecions");
    }

    @RequestMapping(value="/xls", method = { RequestMethod.GET })
    public void getReportXls(HttpServletResponse response){

        sendXlsResponse(response, service.getReport(), "collecions");
    }


    public static void sendPdfResponse(HttpServletResponse response, JasperPrint jasperPrint, String fileName){

        fileName.replaceAll("\\s","");

        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {
            JasperExportManager.exportReportToPdfStream(jasperPrint, out);
        } catch (JRException e1) {
            e1.printStackTrace();
        }

        byte[] data = out.toByteArray();

        response.setContentType("application/pdf");
        response.setHeader("Content-disposition", "inline; filename=" + fileName + ".pdf");
        response.setContentLength(data.length);

        try {
            response.getOutputStream().write(data);
            response.getOutputStream().flush();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void sendXlsResponse(HttpServletResponse response, JasperPrint jasperPrint, String fileName){

        fileName.replaceAll("\\s","");
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {

            JRXlsxExporter exporter = new JRXlsxExporter();
            SimpleXlsxReportConfiguration configuration = new SimpleXlsxReportConfiguration();

            configuration.setDetectCellType(true);
            configuration.setCollapseRowSpan(false);
            configuration.setRemoveEmptySpaceBetweenColumns(true);
            configuration.setRemoveEmptySpaceBetweenRows(true);
            configuration.setIgnoreGraphics(false);
            configuration.setWhitePageBackground(true);
            configuration.setOnePagePerSheet(false);
            configuration.setDetectCellType(false);

            exporter.setExporterInput(new SimpleExporterInput(jasperPrint));
            exporter.setExporterOutput(new SimpleOutputStreamExporterOutput(out));
            exporter.setConfiguration(configuration);
            exporter.exportReport();


        } catch (JRException e1) {
            e1.printStackTrace();
        }

        byte[] data = out.toByteArray();

        response.setContentType("application/xls");
        response.setHeader("Content-disposition", "inline; filename=" + fileName + ".xls");
        response.setContentLength(data.length);

        try {
            response.getOutputStream().write(data);
            response.getOutputStream().flush();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
