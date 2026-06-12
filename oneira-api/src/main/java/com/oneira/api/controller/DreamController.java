package com.oneira.api.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.oneira.api.entity.Dream;
import com.oneira.api.service.DreamService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;



@RestController
@RequestMapping("/api/dreams")
public class DreamController {

    private final DreamService dreamService;

    public DreamController(DreamService dreamService) {
        this.dreamService = dreamService;
    }

    @GetMapping
    public List<Dream> getDreams() {
        return dreamService.getAllDreams();
    
    }

    @GetMapping("/{id}")
    public Dream getDreamById(@PathVariable Long id) {
        return dreamService.getDreamById(id);
    
    }

    @PostMapping
    public Dream addDream(@RequestBody Dream dream) {
        return dreamService.createDream(dream);
    }
    
    @PutMapping("/{id}")
    public Dream updateDream(@PathVariable Long id, @RequestBody Dream dream) {
        return dreamService.updateDream(id, dream);
    }

    @DeleteMapping("/{id}")
    public void deleteDreamById(@PathVariable Long id){
        dreamService.deleteDream(id);
    }
}