import React, { useRef, useState, useEffect } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { ModalProduto } from "../Modal/ModalProduto";

export function TabelaProduto() {
  const [produtos, setProdutos] = useState([]);
  const refModal = useRef(null);

  function obterProdutos() {
    fetch("https://crud-basico-node.herokuapp.com/produtos")
      .then((res) => res.json())
      .then((res) => setProdutos(res));
  }

  const excluirProduto = (id) => {
    fetch(`https://crud-basico-node.herokuapp.com/produtos/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((res) => {
        atualizarListaProdutos(res);
      });
  };

  useEffect(() => {
    obterProdutos();
  }, [produtos]);

  const handleClickOpen = (produto, action) => {
    refModal.current.handleClickOpen();
    refModal.current.setProduto(produto);
    refModal.current.actionRef(action);
  };

  const atualizarListaProdutos = (data) => {
    const index = produtos.findIndex((produto) => produto.id === data.id);
    produtos.slice(index, 1, data);
  };

  return (
    <>
      <button
        onClick={() =>
          handleClickOpen(
            { nome: "", valor: 0, quantidadeEstoque: 0 },
            "cadastrar"
          )
        }
      >
        Adicionar
      </button>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell align="right">Valor</TableCell>
              <TableCell align="right">Quantida em estoque</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {produtos.map((produto) => (
              <TableRow
                key={produto.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{produto.id}</TableCell>
                <TableCell align="left">{produto.nome}</TableCell>
                <TableCell align="right">{produto.valor}</TableCell>
                <TableCell align="right">{produto.quantidadeEstoque}</TableCell>
                <TableCell align="right">
                  <button onClick={() => handleClickOpen(produto, "editar")}>
                    Editar
                  </button>
                  <button onClick={() => excluirProduto(produto.id)}>
                    Excluir
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ModalProduto ref={refModal} func={atualizarListaProdutos} />
    </>
  );
}
