import axios from "axios";

let baseUrl = process.env.REACT_APP_SERVICIO;

export function getEntradas() {
  const url = baseUrl;
  const promise = axios.get(url);
  const dataPromise = promise.then((response) => response.data);
  return dataPromise;
}
export function getEntradasTitulo(titulo) {
  const url = `${baseUrl}/titulo/${titulo.trim()}`;
  const promise = axios.get(url);
  const dataPromise = promise.then((response) => response.data);
  return dataPromise;
}
export function getEntradasAutor(autor) {
  const url = `${baseUrl}/autor/${autor.trim()}`;
  const promise = axios.get(url);
  const dataPromise = promise.then((response) => response.data);
  return dataPromise;
}
export function getEntradasContenido(contenido) {
  const url = `${baseUrl}/contenido/${contenido.trim()}`;
  const promise = axios.get(url);
  const dataPromise = promise.then((response) => response.data);
  return dataPromise;
}
export function postEntradas(req) {
  const url = baseUrl;
  const promise = axios.post(url, req);
  const dataPromise = promise.then((response) => response.data);
  return dataPromise;
}
