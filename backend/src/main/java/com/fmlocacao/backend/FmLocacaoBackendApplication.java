package com.fmlocacao.backend;

import com.fmlocacao.backend.model.Item;
import com.fmlocacao.backend.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Collections;

@SpringBootApplication
public class FmLocacaoBackendApplication implements CommandLineRunner {

	@Autowired
	private ItemRepository repository;

	public static void main(String[] args) {
		SpringApplication.run(FmLocacaoBackendApplication.class, args);
		
		System.out.println("\n\n----------------------------------------------------------");
		System.out.println("  APLICAÇÃO RODANDO! ACESSE: http://localhost:8080/");
		System.out.println("----------------------------------------------------------\n");
	}

	@Override
	public void run(String... args) throws Exception {
		// Essa parte roda assim que o sistema liga!
		
		// 1. Verifica se já tem algo no banco para não duplicar
		if (repository.count() == 0) {
			
			// 2. Cria um produto novo compatível com a NOVA estrutura
			Item item = new Item();
			item.setNome("Mesa de Plástico (Exemplo)");
			item.setDescricao("Mesa quadrada resistente, cadastro automático de teste.");
			item.setCategoria("Mesas");
			item.setTamanho("70x70cm");
			item.setMaterial("Plástico");
			item.setDisponivel(true);

			// Como agora é uma lista de imagens, usamos assim:
			// (Usando uma imagem genérica da internet para não quebrar)
			item.setImagens(Collections.singletonList("https://cdn.pixabay.com/photo/2016/11/19/15/50/chair-1839753_1280.jpg"));

			// 3. Salva no Banco
			repository.save(item);
			
			System.out.println(">>> SUCESSO: Banco populado com item atualizado! <<<");
		}
	}
}