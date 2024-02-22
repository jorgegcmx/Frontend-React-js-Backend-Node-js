import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CircularProgress from '@mui/material/CircularProgress';

import {
  limitaContenido
} from "../utils/Utils";
import {
  postEntradas,
  getEntradasTitulo,
  getEntradasAutor,
  getEntradasContenido,
  getEntradas
} from "../Services/Service";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));



export default function RecipeReviewCard({ tareas, setEtradas }) {
  const [loader, setLoader] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  const [opciones, setOpciones] = useState(0);
  const [search, setSearch] = useState("undefined");
  const [validaCampos, setValidaCampos] = useState({ msg: { titulo: "", autor: "", contenido: "" } });

  const req = {
    titulo: "",
    autor: "",
    fecha: new Date().toISOString(),
    contenido: ""
  }

  const [request, setRequest] = useState(req);

  function handleExpandClick(e) {
    setExpanded(!expanded);
  };

  function handelOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleSave() {
    setLoader(true);
    postEntradas(request).then((res) => {
      if (res.msg.id != 0) {
        getEntradas()
          .then((response) => {
            if (response !== '') {
              setEtradas(response);
              setOpen(false);
              setLoader(false);
            }
          });
      } else {
        setValidaCampos(res);
        setLoader(false);
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  function handelSearch() {
    setLoader(true);
    if (opciones === 1) {
      getEntradasTitulo(search).then((res) => { if (res.msg = "ok") { setEtradas(res.datos); setLoader(false); } }).catch((e) => { console.log(e); });
    } else if (opciones === 2) {
      getEntradasAutor(search).then((res) => { if (res.msg = "ok") { setEtradas(res.datos); setLoader(false); } }).catch((e) => { console.log(e); });
    } else if (opciones === 3) {
      getEntradasContenido(search).then((res) => { if (res.msg = "ok") { setEtradas(res.datos); setLoader(false); } }).catch((e) => { console.log(e); });
    } else {
      getEntradas()
        .then((response) => {
          if (response !== '') {
            setEtradas(response);
            setLoader(false)
          }
        });
    }
  }


  return (
    <>
      <Box
        sx={{
          display: 'flex',
          marginLeft: 10,
          margin: 10
        }}
      >
        <Button variant="contained"
          sx={{
            marginRight: 10
          }}
          onClick={handelOpen}
        >+</Button>
      </Box>
      <Box
        sx={{
          display: 'flex',
          marginLeft: 10,
          margin: 10
        }}
      >

        <Box sx={{ minWidth: 120, marginRight: 5 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Filtro</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={opciones}
              label="Filtro"
              onChange={(e) => { setOpciones(e.target.value) }}
            >
              <MenuItem value={0}>Todas</MenuItem>
              <MenuItem value={1}>Titulo</MenuItem>
              <MenuItem value={2}>Autor</MenuItem>
              <MenuItem value={3}>Contenido</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Stack spacing={2} direction="row">
          <TextField
            autoFocus
            margin="dense"
            label="Buscar"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button variant="outlined" onClick={handelSearch}>{loader ? <CircularProgress /> : <SearchIcon />}  </Button>
        </Stack>
      </Box>

      {
        tareas !== undefined && tareas.map((tarea) => (
          <Card key={tarea.id} sx={{ margin: 10 }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  <CardMedia
                    component="img"
                    image="https://avatars.githubusercontent.com/u/50755574?v=4"
                  />
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={"Titulo: " + tarea.titulo}
              subheader={"Fecha: " + tarea.fecha}
            />
            <p style={{ margin: 10 }} >Autor: {tarea.autor}</p>
            <CardMedia
              component="img"
              height="194"
              image="https://beecrowd.io/wp-content/uploads/2022/08/Beecrowd-Agosto-6-02-larger.png"
              alt={tarea.autor}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {limitaContenido(tarea.contenido) + '...'}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <ExpandMore
                id={tarea.id}
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>
                  {tarea.contenido}
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        ))}
      <div style={{ height: 400, width: '95%', padding: 30 }}>
        <Box
          sx={{
            display: 'flex'
          }}
        >

        </Box>
        <Dialog
          open={open}
          onClose={handleClose}
        >
          <DialogTitle>Registro de Entradas</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label={"Titulo: " + validaCampos.msg.titulo}
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => setRequest({ ...request, titulo: e.target.value })}
            />
            <TextField
              margin="dense"
              label={"Autor: " + validaCampos.msg.autor}
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => setRequest({ ...request, autor: e.target.value })}
            />
            <TextField
              margin="dense"
              label={"Contenido: " + validaCampos.msg.contenido}
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => setRequest({ ...request, contenido: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            {loader ? <CircularProgress /> : <Button type="submit" onClick={handleSave}>Registrar</Button>}

          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}