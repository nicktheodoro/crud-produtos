import React, { useRef } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { ModalProduto } from "../Modal/ModalProduto";

export function TabelaProduto(props) {
  const refModal = useRef(null);

  const handleClickOpen = () => {
    refModal.current.handleClickOpen();
  };

  return (
    <>
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
            {props.produtos.map((produto) => (
              <TableRow
                key={produto.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{produto.id}</TableCell>
                <TableCell align="left">{produto.nome}</TableCell>
                <TableCell align="right">{produto.valor}</TableCell>
                <TableCell align="right">{produto.quantidadeEstoque}</TableCell>
                <TableCell align="right">
                  <button onClick={handleClickOpen}>Adicionar</button>
                  <button>Editar</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ModalProduto ref={refModal}></ModalProduto>
    </>
  );
}
