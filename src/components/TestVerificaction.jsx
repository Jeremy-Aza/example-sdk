import React from "react";
import { WebVerification } from "vdid-sdk-web";

const TestVerificaction = () => {
  //Iniciar la instancia de la verificación
  const vdid = new WebVerification(
    "pk_test_xINwWPFwmlL4P/8uV5XcaWdAERkQufMz3hLNCBcPxL4="
  );

  const verificationEp = async () => {
    // Llamada al EP createVerification
    const response = await fetch(
      // "http://localhost:7072/api/createVerification",
      "https://veridocid.azure-api.net/api/id/v2/createVerification",
      {
        method: "POST",
        headers: {
          "x-api-key": "sk_test_sjUb2g1/4ym/oZC2WVD7QySHG8UiZrmmkiXQJCY/EAs=",
        },
        body: JSON.stringify({
          id: "test-seon-sdk-6",
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

  // const reload = () => {
  //   const vdid = new WebVerification(
  //     "pk_test_xINwWPFwmlL4P/8uV5XcaWdAERkQufMz3hLNCBcPxL4="
  //   );
  //   vdid.verifyIdentity("b566f294-92ce-4fd2-89ad-0aed618f8111");
  // };

  return (
    <div>
      <h1>Bienvenido a la prueba de verificación</h1>
      <p>Este es una prueba de verificación para entender el proceso del SDK</p>
      <button id="create" onClick={createVerification}>
        Crear Verificación
      </button>
      {/* <button onClick={reload}>Re-construir</button> */}
    </div>
  );
};

export default TestVerificaction;
