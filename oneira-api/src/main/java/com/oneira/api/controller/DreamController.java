package com.oneira.api.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/dreams")
public class DreamController {

    @GetMapping
    public List<String> getDreams() {
        return List.of("Rêve 1", "Rêve 2", "Rêve 3");
    }
}