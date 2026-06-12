package com.oneira.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.oneira.api.entity.Dream;

@Repository
public interface DreamRepository
        extends JpaRepository<Dream, Long> {
}