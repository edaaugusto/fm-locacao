package com.fmlocacao.backend;

import com.fmlocacao.backend.model.Item;
import com.fmlocacao.backend.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.math.BigDecimal;

@SpringBootApplication
public class FmLocacaoBackendApplication implements CommandLineRunner { // Mudei aqui para o seu nome

	@Autowired
	private ItemRepository repository;

	public static void main(String[] args) {
		SpringApplication.run(FmLocacaoBackendApplication.class, args); // Mudei aqui também
		
		System.out.println("\n\n----------------------------------------------------------");
		System.out.println("  APLICAÇÃO RODANDO! ACESSE: http://localhost:8080/itens");
		System.out.println("----------------------------------------------------------\n");
	}

	@Override
	public void run(String... args) throws Exception {
		// Essa parte roda assim que o sistema liga!
		
		// 1. Verifica se já tem algo no banco para não duplicar
		if (repository.count() == 0) {
			
			// 2. Cria um produto novo na memória do Java
			Item mesa = new Item();
			mesa.setNome("Mesa de Plástico Branca");
			mesa.setDescricao("Mesa quadrada resistente, ideal para festas. 70x70cm.");
			mesa.setPreco(new BigDecimal("15.00")); // R$ 15,00 a diária
			mesa.setImagemUrl("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_x228gWvC5eXm2_rN_w&s");
			mesa.setDisponivel(true);

			// 3. Manda o Repository salvar no Banco de Dados
			repository.save(mesa);
			
			System.out.println(">>> SUCESSO: Primeiro produto cadastrado automaticamente! <<<");
		}
	}
}