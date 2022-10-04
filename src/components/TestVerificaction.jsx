import React from "react";
import { WebVerification } from "vdid-sdk-web";

const TestVerificaction = () => {
  //Iniciar la instancia de la verificación
  const vdid = new WebVerification("<-- PUBLIC API KEY -->");

  const verificationEp = async () => {
    // Llamada al endpoint para la creación de una nueva verificación
    const response = await fetch(
      "https://veridocid.azure-api.net/api/id/v2/createVerification",
      {
        method: "POST",
        headers: {
          "x-api-key": "<-- PRIVATE API KEY -->",
        },
        body: JSON.stringify({
          id: "test-verification-01",
          options: {
            checks: {
              selfie: true,
              verifyIp: true,
            },
            redirect_url: "https://verificaciones.sumamexico.com/",
          },
        }),
      }
    );

    if (response.ok) {
      const uuidIdentifier = await response.text();
      //Se obtiene el uuid y se implementa, para iniciar con el proceso de captura de imagenes
      vdid.verifyIdentity(uuidIdentifier);
    } else {
      const error = await response.json();
      console.log("error", error);
    }
  };

  const createVerification = () => {
    verificationEp();
  };

  return (
    <div>
      <h1>Bienvenido a la prueba de verificación</h1>
      <p>Este es una prueba de verificación para entender el proceso del SDK</p>
      <button id="create" onClick={createVerification}>
        Crear Verificación
      </button>
    </div>
  );
};

export default TestVerificaction;
