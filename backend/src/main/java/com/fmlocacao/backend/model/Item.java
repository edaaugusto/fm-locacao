package com.fmlocacao.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    
    @Column(columnDefinition = "TEXT") // Permite textos longos
    private String descricao;
    
    private String categoria;
    private String tamanho;
    private String material;
    private boolean disponivel = true;

    // --- MUDANÇA PRINCIPAL: LISTA DE IMAGENS ---
    // @ElementCollection cria uma tabela extra só para guardar as URLs/Base64 das fotos
    @ElementCollection
    @CollectionTable(name = "item_imagens", joinColumns = @JoinColumn(name = "item_id"))
    @Column(name = "imagem", columnDefinition = "LONGTEXT") // LONGTEXT para caber a foto em Base64
    private List<String> imagens = new ArrayList<>();
}