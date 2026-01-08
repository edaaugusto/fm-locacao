package com.fmlocacao.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Configuracao {
    
    @Id
    private String chave; // Ex: "whatsapp"
    private String valor; // Ex: "552199999999"

    // Construtores
    public Configuracao() {}
    public Configuracao(String chave, String valor) {
        this.chave = chave;
        this.valor = valor;
    }

    // Getters e Setters
    public String getChave() { return chave; }
    public void setChave(String chave) { this.chave = chave; }
    public String getValor() { return valor; }
    public void setValor(String valor) { this.valor = valor; }
}