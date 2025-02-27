package com.arzan.MSMS.Service;

import com.arzan.MSMS.repository.SystemRepo;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.mail.util.ByteArrayDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    SystemRepo systemRepo;

    public void sendEmailWithAttachment(String to, MultipartFile file) throws MessagingException, IOException{
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message,true);
        helper.setTo(to);
        helper.setSubject("Your Invoice");
        helper.setText("Please find your invoice attached");
        helper.setFrom("skypearzan@gmail.com");
        helper.addAttachment("invoice.pdf",file);
        javaMailSender.send(message);
    }

    public void sendEmailBySalesId(String to, byte[] pdfFile) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message,true);
        helper.setTo(to);
        helper.setSubject("Your Invoice");
        helper.setText("Please find your invoice attached");
        helper.setFrom("skypearzan@gmail.com");
        helper.addAttachment("Invoice.pdf",new ByteArrayDataSource(pdfFile,"application/pdf"));
        javaMailSender.send(message);
    }

    public void sendEmailToSupplier(String to,String medName,Long quantity) throws MessagingException{
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        helper.setTo(to);
        helper.setSubject("Medicine Order Mail");
        helper.setText("Company Name: Wellness Forever\nPhone Number: 8657929785\nPlacing order for the following medicine:\nMedicine name : "+medName+"\nQuantity:"+quantity);
        javaMailSender.send(message);
    }

}
