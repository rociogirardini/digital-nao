// Obtener las fechas de ahora y el próximo Año Nuevo
let now = new Date();
let nextYear = now.getFullYear() + 1;
let newYear = new Date('January 1, ' + nextYear + ' 00:00:00').getTime();

// Actualizar la cuenta atras cada segundo.
let countdownInterval = setInterval(function() {
  let now = new Date().getTime();
  let difference = newYear - now;
  
  // Calcular los días, horas, minutos y segundos restantes
  let days = Math.floor(difference / (1000 * 60 * 60 * 24));
  let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((difference % (1000 * 60)) / 1000);
  
  document.getElementById('days').textContent = days.toString().padStart(2, '0');
  document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
  document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
  document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
  
  if (difference < 0) {
    clearInterval(countdownInterval);
    document.getElementById('countdown').textContent = "¡Feliz Año Nuevo!";
  }

  effectCircle(days, hours, minutes, seconds);

}, 1000);

effectCircle = function(d, h, m, s){
  // Establecer los valores máximos
  const max_sec = 60;
  const max_min = 60;
  const max_hour = 24;
  const max_day = 30;

  // Establecer estilos
  const strokeDashoffset = 439; 
  let circleSVG = document.getElementsByClassName('outer');

  // Días
  
  let valPerDay = strokeDashoffset / max_day;
  let sizeDay = strokeDashoffset - (valPerDay * d);
  circleSVG[0].style.strokeDashoffset = sizeDay;
  // Horas
  let valPerHour = strokeDashoffset / max_hour;
  let sizeHour = strokeDashoffset - (valPerHour * h);
  circleSVG[1].style.strokeDashoffset = sizeHour;
  // Minutos
  let valPerMin = strokeDashoffset / max_min;
  let sizeMin = strokeDashoffset - (valPerMin * m);
  circleSVG[2].style.strokeDashoffset = sizeMin;
  // Segundos
  let valPerSecond = strokeDashoffset / max_sec;
  let sizeSecond = strokeDashoffset - (valPerSecond * s);
  circleSVG[3].style.strokeDashoffset = sizeSecond;
}