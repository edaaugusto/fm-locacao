package com.fmlocacao.backend.repository;

import com.fmlocacao.backend.model.Configuracao;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConfiguracaoRepository extends JpaRepository<Configuracao, String> {
}