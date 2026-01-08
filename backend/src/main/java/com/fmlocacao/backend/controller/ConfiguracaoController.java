package com.fmlocacao.backend.controller;


import com.fmlocacao.backend.model.Configuracao;
import com.fmlocacao.backend.repository.ConfiguracaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/config")
public class ConfiguracaoController {

    @Autowired
    private ConfiguracaoRepository repository;

    @GetMapping("/whatsapp")
    public String getWhatsapp() {
        return repository.findById("whatsapp")
                .map(Configuracao::getValor)
                .orElse("550000000000");
    }

    @PostMapping("/whatsapp")
    public void setWhatsapp(@RequestBody String novoNumero) {
        Configuracao config = new Configuracao("whatsapp", novoNumero);
        repository.save(config);
    }
}