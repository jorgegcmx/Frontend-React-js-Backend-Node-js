import React, { useEffect, useState } from 'react';
import { Detector } from "react-detect-offline";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import RecipeReviewCard from './components/RecipeReviewCard';

import {
  getEntradas
} from "./Services/Service";
import {
  validaConexionInternet,
  guardalocalStorage
} from "./utils/Utils";


function App() {
  const [entradas, setEtradas] = useState([]);

  useEffect(() => {
    if (validaConexionInternet()) {
      getEntradas()
        .then((response) => {
          if (response !== '') {
            setEtradas(response);
            guardalocalStorage(response, true)
          }
        });

    } else {
      guardalocalStorage([], false)
      setEtradas(guardalocalStorage([], false));
    }

  }, []);

  return (
    <>
      <Detector
        render={({ online }) => (
          <>
            <Container fixed>
              <Container maxWidth="md" >
                <Box>
                  <RecipeReviewCard tareas={entradas} setEtradas={setEtradas}></RecipeReviewCard>
                </Box>
              </Container>
            </Container>
          </>
        )}
      />

    </>
  );
}

export default App;
