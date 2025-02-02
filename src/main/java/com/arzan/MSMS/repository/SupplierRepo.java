package com.arzan.MSMS.repository;

import com.arzan.MSMS.model.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SupplierRepo extends JpaRepository<Supplier,Long> {
    @Query("SELECT supplierName from Supplier supplier")
    List<String> findAllSupplierName();
}
