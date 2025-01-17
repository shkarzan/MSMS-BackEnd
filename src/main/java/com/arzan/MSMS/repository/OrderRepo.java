package com.arzan.MSMS.repository;

import java.util.List;

import com.arzan.MSMS.model.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface OrderRepo extends JpaRepository<Orders, Long> {

    List<Orders> findByVendorName(String name);
}
