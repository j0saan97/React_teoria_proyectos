/* Para entender JSX (JavaScript XML), lo más importante es recordar que es una "azúcar sintáctica": escribimos algo que parece HTML, 
pero React lo convierte en funciones de JavaScript detrás de escena.

Aquí tienes 3 ejemplos que cubren los casos de uso más comunes en el día a día:

1. Inserción de variables y expresiones (Las llaves {})
JSX te permite mezclar lógica de JavaScript directamente en tu marcado usando llaves. No solo puedes poner variables,
 sino también resultados de funciones o cálculos matemáticos.*/ 

const UserProfile = () => {
  const name = "Alex";
  const age = 25;
  const isAdmin = true;

  return (
    <div>
      <h1>Hola, {name}</h1>
      <p>Edad: {age}</p>
      <p>Días vividos: {age * 365}</p>
      <p>Estado: {isAdmin ? "Administrador" : "Usuario estándar"}</p>
    </div>
  );
};

// Punto clave: Todo lo que esté dentro de {} se evalúa como código JavaScript antes de mostrarse.

