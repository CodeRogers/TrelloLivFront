import api from "../services/api.js";

async function getCard(setCard) {
  try {
    const { data } = await api.get("/cards");
    setCard(data);
  } catch (err) {
    return err;
  }
}

async function handleCardSubmit(e, listaId, tituloCard, setTituloCard) {
  e.preventDefault();
  if (tituloCard.trim() === "") {
    alert("Campo vazio");
    return;
  } else {
    const cardData = {
      titulo: tituloCard,
      listas_id: listaId,
    };
    try {
      await api.post("/cadastraCard", cardData);
      setTituloCard("");
      console.log(tituloCard);
    } catch (err) {
      return console.log(err);
    }
  }
}

async function handleCardUpdate(
  e,
  idCard,
  tituloCard,
  listaId,
  cardUpdate,
  setCardUpdate
) {
  e.preventDefault();

  if (cardUpdate.titulo === "") setCardUpdate((cardUpdate.titulo = tituloCard));

  if (cardUpdate.listas_id === "")
    setCardUpdate((cardUpdate.listas_id = listaId));

  try {
    await api.put(`/card/${idCard}`, cardUpdate);
  } catch (err) {
    alert(err.response.data.mensage);
    return;
  }
  setCardUpdate({ titulo: "", listas_id: "" });
}

async function handleDeleteCard(e, idCard, tituloCard, setCard) {
  e.preventDefault();
  try {
    await api.delete(`/card/${idCard}`);
  } catch (err) {
    return console.log(err);
  }
  setCard((state) => state.filter((card) => card.id !== idCard));
  alert(`Card ${tituloCard} deletado com sucesso`);
}

export { getCard, handleCardSubmit, handleCardUpdate, handleDeleteCard };
