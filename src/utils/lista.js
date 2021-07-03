import api from "../services/api.js";

async function getLista(setLista) {
  try {
    const { data } = await api.get("/listas");
    setLista(data);
  } catch (err) {
    return err;
  }
}

async function handleListaSubmit(e, tituloLista, setTituloLista) {
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

async function handleListaUpdate(e, idLista, tituloLista, setTituloLista, listaTitulo) {
  e.preventDefault();
  if (tituloLista.trim() === "") {
    setTituloLista(listaTitulo);
    return;
  }
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

async function handleDeleteLista(e, idLista, tituloLista, setLista) {
  e.preventDefault();
  try {
    await api.delete(`/lista/${idLista}`);
  } catch (err) {
    return console.log(err);
  }
  setLista((state) => state.filter((lista) => lista.id !== idLista));
  alert(`Lista ${idLista}, ${tituloLista} deletado com sucesso`);
}

export { getLista, handleListaSubmit, handleListaUpdate, handleDeleteLista };
