package com.fmlocacao.backend.controller;

import com.fmlocacao.backend.model.Item;
import com.fmlocacao.backend.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/itens")
@CrossOrigin(origins = "*")
public class ItemController {

    @Autowired
    private ItemRepository repository;

    // Listar Tudo
    @GetMapping
    public List<Item> listarTodos() {
        return repository.findAll();
    }

    // Buscar UM item específico (Para edição)
    @GetMapping("/{id}")
    public Item buscarPorId(@PathVariable Long id) {
        return repository.findById(id).orElse(null);
    }

    // Criar Novo
    @PostMapping
    public Item cadastrar(@RequestBody Item item) {
        return repository.save(item);
    }

    // Atualizar Existente
    @PutMapping("/{id}")
    public Item atualizar(@PathVariable Long id, @RequestBody Item item) {
        item.setId(id); // Garante que vai atualizar o ID certo
        return repository.save(item);
    }

    // Deletar
    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        repository.deleteById(id);
    }
}