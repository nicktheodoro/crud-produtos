import React, { forwardRef, useImperativeHandle, useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const ModalProduto = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState("");
  const [id, setId] = useState(0);
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState(0);
  const [quantidadeEstoque, setquantidadeEstoque] = useState(0);

  useImperativeHandle(ref, () => {
    return {
      handleClickOpen: handleClickOpen,
      setProduto: setProduto,
      actionRef: actionRef,
    };
  });

  const cadastrarProduto = () => {
    const produto = {
      nome: nome,
      valor: valor,
      quantidadeEstoque: quantidadeEstoque,
    };

    fetch("https://crud-basico-node.herokuapp.com/produtos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(produto),
    })
      .then((res) => res.json())
      .then((res) => {
        props.func(res);
        handleClose();
      });
  };

  const editarProduto = () => {
    const produto = {
      nome: nome,
      valor: valor,
      quantidadeEstoque: quantidadeEstoque,
    };

    fetch(`https://crud-basico-node.herokuapp.com/produtos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(produto),
    })
      .then((res) => res.json())
      .then((res) => {
        props.func(res);
        handleClose();
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const setProduto = (produto) => {
    setId(produto.id);
    setNome(produto.nome);
    setValor(produto.valor);
    setquantidadeEstoque(produto.quantidadeEstoque);
  };

  const actionRef = (action) => {
    console.log(action)
    setAction(action)
  }

  const btnAction = () => {
    if(action === "editar") {
      editarProduto()
    }

    if(action === "cadastrar") {
      cadastrarProduto()
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <h2 id="modal-modal-titlee"></h2>
          <div id="modal-modal-description">
            <p width="100%">
              <label style={{ width: "20%" }} htmlFor="idProdut">
                Id:{" "}
              </label>
              <input
                style={{ width: "100%" }}
                disabled
                id="idProduto"
                type="number"
                value={id}
                onChange={(event) => setId(parseInt(event.target.value))}
              />
            </p>
            <p>
              <label style={{ width: "20%" }} htmlFor="nomeProduto">
                Nome:{" "}
              </label>
              <input
                style={{ width: "100%" }}
                id="nomeProduto"
                type="text"
                value={nome}
                onChange={(event) => setNome(event.target.value)}
              />
            </p>
            <p>
              <label style={{ width: "20%" }} htmlFor="valorProduto">
                Valor:{" "}
              </label>
              <input
                style={{ width: "100%" }}
                id="valorProduto"
                type="number"
                value={valor}
                onChange={(event) => setValor(parseFloat(event.target.value))}
              />
            </p>
            <p>
              <label
                style={{ width: "20%" }}
                htmlFor="quantidadeEstoqueProduto"
              >
                Quantidade em estoque:{" "}
              </label>
              <input
                style={{ width: "100%" }}
                id="quantidadeEstoqueProduto"
                type="number"
                value={quantidadeEstoque}
                onChange={(event) => setquantidadeEstoque(parseInt(event.target.value))}
              />
            </p>
          </div>
          <button style={{ width: "100%" }} onClick={btnAction}>
            Salvar
          </button>
        </Typography>
      </Box>
    </Modal>
  );
});
