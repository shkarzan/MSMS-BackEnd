package com.arzan.MSMS.repository;

import com.arzan.MSMS.model.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvoiceRepo extends JpaRepository<Invoice,Long> {
}
