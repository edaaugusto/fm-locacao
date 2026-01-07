package com.fmlocacao.backend.model;

import jakarta.persistence.*;
import lombok.Data; 
import java.math.BigDecimal;

@Entity // Avisa o Spring para criar uma tabela disso
@Table(name = "tb_itens") // Nome da tabela no banco
@Data // O Lombok cria os Getters e Setters sozinho
public class Item {

    @Id // Chave primária
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-incremento (1, 2, 3...)
    private Long id;

    @Column(nullable = false) // Obrigatório ter nome
    private String nome;

    @Column(columnDefinition = "TEXT") // Permite textos longos na descrição
    private String descricao;

    private BigDecimal preco; // Preço da locação

    private String imagemUrl; // Link da foto do produto

    private Boolean disponivel = true; // Se está livre para alugar
}