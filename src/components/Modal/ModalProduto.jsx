import React, { forwardRef, useImperativeHandle } from "react";

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
  const [open, setOpen] = React.useState(false);

  useImperativeHandle(ref, () => {
    return {
      handleClickOpen: handleClickOpen,
    };
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
          <p>
            <label htmlFor="idProdut">Id: </label>
            <input id="idProduto" type="number" />
          </p>
          <p>
            <label htmlFor="nomeProduto">Nome: </label>
            <input id="nomeProduto" type="text" />
          </p>
          <p>
            <label htmlFor="valorProduto">Valor: </label>
            <input id="valorProduto" type="number" />
          </p>
          <p>
            <label htmlFor="quantidadeEstoqueProduto">
              Quantidade em estoque:{" "}
            </label>
            <input id="quantidadeEstoqueProduto" type="number" />
          </p>
          <button>Salvar</button>
        </Typography>
      </Box>
    </Modal>
  );
});
