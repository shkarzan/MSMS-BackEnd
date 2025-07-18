package com.arzan.MSMS.Service;

import com.arzan.MSMS.model.Orders;
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
        String htmlText = "<h1>Company Name: Wellness Forever | Phone Number: 8657929785 | Placing order for the following medicine: 1.Medicine name : "+medName+" | 2.Quantity:"+quantity+"</h1>";
        helper.setText(htmlText,true);
        javaMailSender.send(message);
    }

    public void sendCancelEmailToSupplier(Orders order,String to) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        helper.setTo(to);
        helper.setSubject("Medicine Order Cancel Email");
        String htmlText = "<h1>This email is to cancel the order placed for the Medicine :"+order.getMedName()+" and Quantity:"+order.getQuantity()+"</h1>";
        helper.setText(htmlText,true);
        javaMailSender.send(message);
    }

}
