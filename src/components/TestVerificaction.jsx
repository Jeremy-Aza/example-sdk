import React from "react";
import { WebVerification } from "vdid-sdk-web";

const TestVerificaction = () => {
   // SDK web
   const vdid = new WebVerification("PUBLIC_API_KEY");

   const verificationEp = async () => {
      const response = await fetch(
         "https://veridocid.azure-api.net/api/id/v2/createVerification",
         {
            method: "POST",
            headers: {
               "x-api-key": "PRIVATE_API_KEY",
            },
            body: JSON.stringify({
               id: "test",
               options: {
                  checks: {
                     selfie: false,
                  },
                  redirect_url: "https://verificaciones.sumamexico.com/",
               },
            }),
         }
      );

      if (response.ok) {
         const uuidIdentifier = await response.text();
         //Se obtiene el uuid y se pasa para poder crear la verificación
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
         <p>
            Este es una prueba de verificación para entender el proceso del SDK
         </p>
         <button id="create" onClick={createVerification}>
            Crear Verificación
         </button>
      </div>
   );
};

export default TestVerificaction;
