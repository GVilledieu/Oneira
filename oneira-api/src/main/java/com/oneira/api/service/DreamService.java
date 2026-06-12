package com.oneira.api.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.oneira.api.entity.Dream;
import com.oneira.api.exception.DreamNotFoundException;
import com.oneira.api.repository.DreamRepository;


@Service
public class DreamService {

    private final DreamRepository dreamRepository;

    public DreamService(DreamRepository dreamRepository) {
        this.dreamRepository = dreamRepository;
    }

    public Dream getDreamById(Long id) {
        return dreamRepository
            .findById(id)
            .orElseThrow(() -> new DreamNotFoundException(id));
    }

    public List<Dream> getAllDreams() {
        return dreamRepository
            .findAll();
    }

    public Dream createDream(Dream dream){ 

        if (
            dream.getTitle() == null 
            || dream.getTitle().isBlank()
            || dream.getContent() == null 
            || dream.getContent().isBlank()
            || dream.getType() == null 
            || dream.getType().isBlank()) {
                throw new IllegalArgumentException("Dream fields cannot be null");
        } else {
            return dreamRepository.save(dream);
        }
        
    }

    public Dream updateDream(Long id, Dream dream){ 

        Dream updatedDream = getDreamById(id);
            updatedDream.setTitle(dream.getTitle());
            updatedDream.setContent(dream.getContent());
            updatedDream.setType(dream.getType());
            updatedDream.setDate(dream.getDate());

            dreamRepository.save(updatedDream);
            return updatedDream;
    }

    public void deleteDream(Long id) {
        getDreamById(id);
        dreamRepository.deleteById(id);
    }
}
