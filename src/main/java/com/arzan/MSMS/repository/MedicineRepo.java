package com.arzan.MSMS.repository;


import com.arzan.MSMS.model.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MedicineRepo extends JpaRepository<Medicine, String> {
    List<Medicine> findByQuantityLessThan(Long val);
    long countByQuantityLessThan(Long val);

}
