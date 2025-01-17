package com.arzan.MSMS.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.arzan.MSMS.model.SystemDetails;

@Repository
public interface SystemRepo extends JpaRepository<SystemDetails, String> {

}
