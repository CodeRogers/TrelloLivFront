import React, { useEffect, useState } from "react";
import {
  getLista,
  handleListaSubmit,
  handleListaUpdate,
  handleDeleteLista,
} from "../utils/lista";
import {
  getCard,
  handleCardSubmit,
  handleCardUpdate,
  handleDeleteCard,
} from "../utils/card.js";
import editarIcon from "../assets/editar.png";
import lixeiraIcon from "../assets/lixeira.png";
import directIcon from "../assets/direct.png";

import style from "../styles/home.module.css";

function Home() {
  const [lista, setLista] = useState([]);
  const [tituloLista, setTituloLista] = useState("");
  const [tituloCard, setTituloCard] = useState("");
  const [card, setCard] = useState([]);
  const [cardUpdate, setCardUpdate] = useState({ titulo: "", listas_id: "" });

  useEffect(() => {
    getLista(setLista);
  }, [tituloLista, tituloCard]);

  useEffect(() => {
    getCard(setCard);
  }, [cardUpdate, tituloCard]);

  return (
    <div>
      <div className={style.navbar}>
        <h1>Trello</h1>
      </div>
      <div className={style.containerList}>
        {lista.map((lista) => (
          <div className={style.list} key={lista.id}>
            <div className={style.listContent}>
              <div className={style.headerList}>
                <form>
                  <input
                    onChange={(e) => setTituloLista(e.target.value)}
                    defaultValue={lista.titulo}
                    required
                    className={style.listaTittle}
                  ></input>
                </form>
                <div>
                  <button
                    onSubmit={(e) =>
                      handleListaUpdate(
                        e,
                        lista.id,
                        tituloLista,
                        setTituloLista,
                        lista.titulo
                      )
                    }
                  >
                    <img
                      className={style.imageIcon}
                      src={editarIcon}
                      alt="Editar"
                    />
                  </button>

                  <button
                    onClick={(e) =>
                      handleDeleteLista(e, lista.id, lista.titulo, setLista)
                    }
                  >
                    <img
                      className={style.imageIcon}
                      src={lixeiraIcon}
                      alt="Excluir"
                    />
                  </button>
                </div>
              </div>
              <p>Id da Lista: {lista.id}</p>
              <div className={style.containerCards}>
                <div>
                  {card
                    .filter((card) => card.listas_id === lista.id)
                    .map((card) => (
                      <div key={card.id}>
                        <div className={style.containerCard}>
                          <div className={style.headerCard}>
                            <form>
                              <label>
                                <div>
                                  <input
                                    className={style.inputCard}
                                    defaultValue={card.titulo}
                                    onChange={(e) =>
                                      setCardUpdate({
                                        ...cardUpdate,
                                        titulo: e.target.value,
                                      })
                                    }
                                  ></input>
                                </div>
                              </label>
                            </form>
                            <div>
                              <button
                                onClick={(e) =>
                                  handleCardUpdate(
                                    e,
                                    card.id,
                                    card.titulo,
                                    card.listas_id,
                                    cardUpdate,
                                    setCardUpdate
                                  )
                                }
                              >
                                <img
                                  className={style.imageIcon}
                                  src={editarIcon}
                                  alt="Editar"
                                />
                              </button>
                              <button
                                onClick={(e) =>
                                  handleDeleteCard(
                                    e,
                                    card.id,
                                    card.titulo,
                                    setCard
                                  )
                                }
                              >
                                <img
                                  className={style.imageIcon}
                                  src={lixeiraIcon}
                                  alt="Excluir"
                                />
                              </button>
                            </div>
                          </div>
                          <div className={style.card}>
                            <form>
                              <div className={style.infoContainer}>
                                <div className={style.editInfoContainer}>
                                  <label>Muda lista por id: </label>
                                  <input
                                    onChange={(e) =>
                                      setCardUpdate({
                                        ...cardUpdate,
                                        listas_id: e.target.value,
                                      })
                                    }
                                    type="number"
                                    required
                                    defaultValue={card.listas_id}
                                  ></input>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                <form className={style.formEnviar}>
                  <label htmlFor={lista.id}>
                    <div className={style.inputEnviar}>
                      <input
                        id={lista.id}
                        placeholder="Novo card"
                        onChange={(e) => setTituloCard(e.target.value)}
                        type="text"
                        required
                      ></input>
                    </div>
                  </label>
                  <button
                    onClick={(e) =>
                      handleCardSubmit(e, lista.id, tituloCard, setTituloCard)
                    }
                  >
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
        <label className={`${style.form} ${style.formEnviar}`}>
          <div className={style.inputEnviar}>
            <input
              placeholder="Nova Lista"
              onChange={(e) => setTituloLista(e.target.value)}
              type="text"
              required
            ></input>
          </div>

          <button
            onClick={(e) => handleListaSubmit(e, tituloLista, setTituloLista)}
          >
            <img
              className={`${style.imageIcon} ${style.enviarButton}`}
              src={directIcon}
              alt="Inserir"
            />
          </button>
        </label>
      </div>
    </div>
  );
}

export default Home;
