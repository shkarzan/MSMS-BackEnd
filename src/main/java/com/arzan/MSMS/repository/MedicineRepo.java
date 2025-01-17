package com.arzan.MSMS.repository;


import com.arzan.MSMS.model.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MedicineRepo extends JpaRepository<Medicine, String> {

}
