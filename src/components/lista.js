import React, { useEffect, useState } from "react";
import api from "../services/api";
import Card from "./card";
import editarIcon from "../assets/editar.png";
import lixeiraIcon from "../assets/lixeira.png";
import directIcon from "../assets/direct.png";

import style from "../styles/lista.module.css";

function Lista() {
  const [lista, setLista] = useState([]);
  const [tituloLista, setTituloLista] = useState("");
  const [tituloCard, setTituloCard] = useState("");

  useEffect(() => {
    async function getLista() {
      try {
        const { data } = await api.get("/listas");
        setLista(data);
      } catch (err) {
        return err;
      }
    }
    getLista();
  }, [tituloLista, tituloCard]);

  async function handleListaSubmit(e) {
    e.preventDefault();
    if (tituloLista.trim() === "") {
      alert("Campo vazio");
      return;
    }
    const listaData = {
      titulo: tituloLista,
    };
    try {
      await api.post("/cadastraLista", listaData);
    } catch (err) {
      return console.log(err);
    }
    setTituloLista("");
  }

  async function handleListaUpdate(e, idLista) {
    e.preventDefault();

    const listaData = {
      titulo: tituloLista,
    };

    try {
      await api.put(`/lista/${idLista}`, listaData);
    } catch (err) {
      return console.log(err);
    }
    setTituloLista("");
  }

  async function handleDelete(e, idLista, tituloLista) {
    e.preventDefault();
    try {
      await api.delete(`/lista/${idLista}`);
    } catch (err) {
      return console.log(err);
    }
    setLista((state) => state.filter((lista) => lista.id !== idLista));
    alert(`Lista ${idLista}, ${tituloLista} deletado com sucesso`);
  }

  async function handleCardSubmit(e, listaId) {
    e.preventDefault();
    if (tituloCard.trim() === "") {
      alert("Campo vazio");
      return;
    }
    const cardData = {
      titulo: tituloCard,
      listas_id: listaId,
    };
    try {
      await api.post("/cadastraCard", cardData);
    } catch (err) {
      return console.log(err);
    }
    setTituloCard("");
  }

  return (
    <div>
      <div className={style.navbar}>
        <h1>Trello</h1>
      </div>
      <div className={style.containerList}>
        {lista.map((lista) => (
          <div className={style.list} key={lista.id}>
            <div className={style.listContent}>
              <span className={style.listaTittle}>{lista.titulo}</span>
              <p>Id da Lista: {lista.id}</p>
              <form className={style.headerList}>
                <label>Editar Lista: </label>
                <input
                  onChange={(e) => setTituloLista(e.target.value)}
                  type="text"
                  required
                  defaultValue={lista.titulo}
                ></input>

                <button onClick={(e) => handleListaUpdate(e, lista.id)}>
                  <img
                    className={style.imageIcon}
                    src={editarIcon}
                    alt="Editar"
                  />
                </button>

                <button
                  onClick={(e) => handleDelete(e, lista.id, lista.titulo)}
                >
                  <img
                    className={style.imageIcon}
                    src={lixeiraIcon}
                    alt="Excluir"
                  />
                </button>
              </form>
              <div className={style.containerCards}>
                <Card idLista={lista.id} />
                <form className={style.formEnviar}>
                  <label>Novo Card: </label>
                  <input
                    onChange={(e) => setTituloCard(e.target.value)}
                    type="text"
                    required
                  ></input>

                  <button onClick={(e) => handleCardSubmit(e, lista.id)}>
                    <img
                      className={`${style.imageIcon} ${style.enviarButton}`}
                      src={directIcon}
                      alt="Inserir"
                    />
                  </button>
                </form>
              </div>
            </div>
          </div>
        ))}
        <form className={`${style.form} ${style.formEnviar}`}>
          <label>Nova Lista: </label>
          <input
            onChange={(e) => setTituloLista(e.target.value)}
            type="text"
            required
          ></input>

          <button onClick={(e) => handleListaSubmit(e)}>
            <img
              className={`${style.imageIcon} ${style.enviarButton}`}
              src={directIcon}
              alt="Inserir"
            />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Lista;
