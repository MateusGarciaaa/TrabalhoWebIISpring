package main.java.br.edu.ifpr.casalapp.controller;

import br.edu.ifpr.casalapp.dto.TransacaoRequest;
import br.edu.ifpr.casalapp.dto.TransacaoResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class TransacaoController {

    record TransacaoResponse(
            int id,
            String descricao,
            double valor,
            String tipo) {
    }

    private int proximoId = 4;

    private final List<TransacaoResponse> transacoes = new ArrayList<>(List.of(
            new TransacaoResponse(1, "supermercado", 150.75, "DESPESA"),
            new TransacaoResponse(2, "combustivel", 80.00, "DESPESA"),
            new TransacaoResponse(3, "consulta medica", 200.00, "DESPESA")
    ));

    @GetMapping("/transacoes")
    public List<TransacaoResponse> listarTransacoes() {
        return transacoes;
    }

    @PostMapping("/transacoes")
    public ResponseEntity<TransacaoResponse> criarTransacao(
            @RequestBody TransacaoRequest request) {

        TransacaoResponse nova = new TransacaoResponse(
                proximoId,
                request.descricao(),
                request.valor(),
                request.tipo());

        proximoId++;
        transacoes.add(nova);

        return ResponseEntity.status(201).body(nova);
    }

    @PutMapping("/transacoes/{id}")
    public ResponseEntity<TransacaoResponse> atualizarTransacao(
            @PathVariable int id,
            @RequestBody TransacaoRequest request) {

        for (int i = 0; i < transacoes.size(); i++) {
            if (transacoes.get(i).id() == id) {

                TransacaoResponse atualizada = new TransacaoResponse(
                        id,
                        request.descricao(),
                        request.valor(),
                        request.tipo());

                transacoes.set(i, atualizada);

                return ResponseEntity.ok(atualizada);
            }
        }

        return ResponseEntity.notFound().build();
    }

    @PatchMapping("/transacoes/{id}")
    public ResponseEntity<TransacaoResponse> atualizarParcialTransacao(
            @PathVariable int id,
            @RequestBody TransacaoRequest request) {

        for (int i = 0; i < transacoes.size(); i++) {
            if (transacoes.get(i).id() == id) {

                TransacaoResponse existente = transacoes.get(i);

                String novaDescricao = request.descricao() != null
                        ? request.descricao()
                        : existente.descricao();

                Double novoValor = request.valor() != null
                        ? request.valor()
                        : existente.valor();

                String novoTipo = request.tipo() != null
                        ? request.tipo()
                        : existente.tipo();

                TransacaoResponse atualizada = new TransacaoResponse(
                        id,
                        novaDescricao,
                        novoValor,
                        novoTipo);

                transacoes.set(i, atualizada);

                return ResponseEntity.ok(atualizada);
            }
        }

        return ResponseEntity.notFound().build();
    }
}