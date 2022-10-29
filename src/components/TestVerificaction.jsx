import React from "react";
import { WebVerification } from "vdid-sdk-web";

const TestVerificaction = () => {
  //Iniciar la instancia de la verificación
  const vdid = new WebVerification("<-- PUBLIC API KEY -->");

  const createVerification = async () => {
    // Llamada al endpoint para la creación de una nueva verificación
    const response = await fetch(
      "https://veridocid.azure-api.net/api/id/v3/createVerification",
      {
      method: "POST",
      headers: {
        "x-api-key": "<-- PRIVATE API KEY -->",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: "testing: sdk_01",
        options: {
          checks: {
            selfie: false,
            verifyIp: false,
          },
          redirect_url: "https://verificaciones.sumamexico.com/",
        },
      }),
    });

    if (response.ok) {      
      const uuidIdentifier = await response.text();
      //Se obtiene el uuid y se implementa, para iniciar con el proceso de captura de imagenes
      vdid.verifyIdentity(uuidIdentifier);
    } else {
      const error = await response.json();
      console.log("error", error);
    }
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
