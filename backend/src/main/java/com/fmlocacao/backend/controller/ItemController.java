package com.fmlocacao.backend.controller;

import com.fmlocacao.backend.model.Item;
import com.fmlocacao.backend.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // Fala pro Spring: "Eu sou o cara que recebe pedidos da internet"
@RequestMapping("/itens") // O endereço será: localhost:8080/itens
public class ItemController {

    @Autowired // Injeta o repository aqui dentro automaticamente
    private ItemRepository repository;

    // 1. Rota para Listar Tudo (GET)
    @GetMapping
    public List<Item> listarTodos() {
        return repository.findAll();
    }

    // 2. Rota para Cadastrar (POST)
    @PostMapping
    public Item cadastrar(@RequestBody Item item) {
        return repository.save(item);
    }
}