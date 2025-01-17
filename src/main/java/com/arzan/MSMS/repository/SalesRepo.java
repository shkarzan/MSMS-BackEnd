package com.arzan.MSMS.repository;

import com.arzan.MSMS.model.Sales;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SalesRepo extends JpaRepository<Sales,Long> {
}
