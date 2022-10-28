import { useState, useEffect } from "react";

import { TabelaProduto } from "../../components/Tabela/TabelaProdutos";

export function ControleProdutos() {
  const [produtos, setProdutos] = useState([]);

  function obterProdutos() {
    fetch("https://crud-basico-node.herokuapp.com/produtos")
      .then((res) => res.json())
      .then((res) => setProdutos(res));
  }

  useEffect(() => {
    obterProdutos();
  }, []);
  return <TabelaProduto produtos={produtos} />;
}
