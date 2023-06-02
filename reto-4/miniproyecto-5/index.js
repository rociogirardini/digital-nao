function startRecognition() {
  document.getElementById("listening").style.display = "block";
  // Configuraciones iniciales
  let recognition = new webkitSpeechRecognition();
  recognition.lang = "es-ES";
  recognition.interimResults = false;

  // Inicio
  recognition.start();

  recognition.onresult = function (event) {
    let result = event.results[event.results.length - 1];
    let transcript = result[0].transcript;

    // Validar si el resultado es un número
    if (/^\d+$/.test(transcript)) {
      let number = parseInt(transcript);
      document.getElementById("output").textContent = number;
    } else {
      document.getElementById("output").textContent =
        "No se reconoció un número válido";
    }
  };

  // Manejo de errores
  recognition.onerror = function (event) {
    console.error(event.error);
  };

  // Fin
  recognition.onend = function () {
    document.getElementById("listening").style.display = "none";
  };
}
