package com.arzan.MSMS.controller;

import com.arzan.MSMS.Service.EmailService;
import com.arzan.MSMS.exception.SalesNotFound.SalesNotFoundException;
import com.arzan.MSMS.model.Invoice;
import com.arzan.MSMS.repository.InvoiceRepo;
import com.arzan.MSMS.repository.SalesRepo;
import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/api/invoice")
public class InvoiceController {
    @Autowired
    private EmailService emailService;

    @Autowired
    private InvoiceRepo invoiceRepo;
    @Autowired
    private SalesRepo salesRepo;

    @PostMapping("/sendEmail")
    public ResponseEntity<String> sendInvoice(@RequestParam("email") String email, @RequestParam("file")MultipartFile file){
        try{
            emailService.sendEmailWithAttachment(email,file);
            return ResponseEntity.ok("Invoice sent Successfully");
        } catch (MessagingException | IOException e) {
            return ResponseEntity.status(500).body("Failed to send invoice");
        }
    }

    @PostMapping("/upload")
    ResponseEntity<String> uploadInvoice(@RequestParam("salesId") Long salesId,@RequestParam("customerId") Long customerId,@RequestParam("file") MultipartFile pdfFile){
        if(!Objects.equals(pdfFile.getContentType(), "application/pdf")){
            return ResponseEntity.badRequest().body("Invalid File Type");
        }
        try{
            byte[] pdf = pdfFile.getBytes();
            Invoice invoice = new Invoice(salesId,customerId,pdf);
            invoiceRepo.save(invoice);
            return ResponseEntity.ok().body("Invoice Saved Successfully");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Failed to Upload a file:"+e.getMessage());
        }
    }

    @PostMapping("/sendEmailBySalesId/{salesId}")
    ResponseEntity<String> sendPdfToEmailBySalesId(@PathVariable Long salesId, @RequestParam("email") String email) throws MessagingException {
        if(invoiceRepo.existsById(salesId)){
            Optional<Invoice> invoice = invoiceRepo.findById(salesId);
            if(invoice.isPresent()) {
                try{
                    byte[] file = invoice.get().getInvoicePdf();
                    emailService.sendEmailBySalesId(email, file);
                    return ResponseEntity.ok().body("Invoice sent Successfully");
                } catch (Exception e) {
                    return ResponseEntity.status(404).body("No Invoice Found");
                }
            }
            else{
                return ResponseEntity.status(404).body("Sales Id Not found");
            }

        }
        return ResponseEntity.status(404).body("Invoice not found with sales id:"+ salesId);
    }

    @GetMapping("/get/{salesId}")
    ResponseEntity<byte[]> getPdfBySalesId(@PathVariable Long salesId){
        Optional<Invoice> invoice = invoiceRepo.findById(salesId);
        return invoice.map(value -> ResponseEntity.ok()
                .header("Content-Type", "application/pdf")
                .body(value.getInvoicePdf())).orElseThrow(() -> new SalesNotFoundException(salesId));
    }

    @Transactional
    @DeleteMapping("/delete/{salesId}")
    ResponseEntity<String> deleteInvoiceBySalesId(@PathVariable Long salesId){
        if(invoiceRepo.existsById(salesId)){
            invoiceRepo.deleteById(salesId);
            salesRepo.deleteById(salesId);
            return ResponseEntity.ok().body("Invoice Deleted Successfully");
        }
        return ResponseEntity.status(404).body("Invoice with sales id:"+salesId+" not found");
    }

    @GetMapping("/all")
    List<Invoice> getAllInvoices(){
        return invoiceRepo.findAll();
    }
}
