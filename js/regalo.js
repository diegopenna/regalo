/* INTERACCIÓN DEL REGALO
   Sin librerías ni archivos externos.
   Los textos se editan en index.html y la apariencia en styles/estilos.css.
*/

// Opciones que podés cambiar.
const DURACION_APERTURA = 1400; // Milisegundos antes de mostrar la imagen.
const CANTIDAD_CONFETI = 150;
const DURACION_CONFETI = 6000;
const COLORES_CONFETI = ['#f1c778', '#e995b4', '#fff1cd', '#c55e88'];

const botonSonido = document.getElementById('sound');
const botonRegalo = document.getElementById('gift');
const botonRepetir = document.getElementById('again');
const tituloFinal = document.getElementById('finalTitle');
const imagenRegalo = document.querySelector('.reveal img');
const canvas = document.getElementById('confetti');
const contexto = canvas.getContext('2d');
const movimientoReducido = matchMedia('(prefers-reduced-motion: reduce)').matches;

let sonidoActivado = true;
let abriendo = false;
let audio;
let temporizador;
let animacionConfeti;

// El enlace para guardar siempre utiliza la misma imagen que se muestra.
document.getElementById('download').href = imagenRegalo.src;

botonSonido.addEventListener('click', () => {
  sonidoActivado = !sonidoActivado;
  botonSonido.textContent = sonidoActivado
    ? '♫ Sonido activado'
    : '♫ Sonido desactivado';
  botonSonido.setAttribute('aria-pressed', String(sonidoActivado));
});

// Sonido de campanitas generado por el navegador: no necesita un MP3.
function reproducirSonido() {
  if (!sonidoActivado) return;

  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audio = audio || new AudioContext();
    audio.resume().catch(() => {});
    const inicio = audio.currentTime;
    const notas = [523.25, 659.25, 783.99, 1046.5, 1318.5];

    notas.forEach((frecuencia, indice) => {
      const oscilador = audio.createOscillator();
      const volumen = audio.createGain();
      const demora = indice * 0.11;

      oscilador.type = 'sine';
      oscilador.frequency.value = frecuencia;
      volumen.gain.setValueAtTime(0, inicio + 0.6 + demora);
      volumen.gain.linearRampToValueAtTime(0.075, inicio + 0.62 + demora);
      volumen.gain.exponentialRampToValueAtTime(0.001, inicio + 1.7 + demora);

      oscilador.connect(volumen);
      volumen.connect(audio.destination);
      oscilador.start(inicio + 0.6 + demora);
      oscilador.stop(inicio + 1.9 + demora);
    });
  } catch (error) {
    // La sorpresa también funciona si el navegador no admite audio.
  }
}

function ajustarCanvas() {
  const escala = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = window.innerWidth * escala;
  canvas.height = window.innerHeight * escala;
  contexto.setTransform(escala, 0, 0, escala, 0, 0);
}

function limpiarConfeti() {
  cancelAnimationFrame(animacionConfeti);
  contexto.clearRect(0, 0, window.innerWidth, window.innerHeight);
}

function lanzarConfeti() {
  if (movimientoReducido) return;
  limpiarConfeti();

  const particulas = Array.from({ length: CANTIDAD_CONFETI }, (_, indice) => ({
    x: window.innerWidth / 2,
    y: window.innerHeight * 0.48,
    velocidadX: (Math.random() - 0.5) * 13,
    velocidadY: -5 - Math.random() * 13,
    rotacion: Math.random() * Math.PI * 2,
    giro: (Math.random() - 0.5) * 0.15,
    ancho: 5 + Math.random() * 6,
    color: COLORES_CONFETI[indice % COLORES_CONFETI.length],
    corazon: indice % 7 === 0,
  }));

  const inicio = performance.now();
  let ultimoCuadro = inicio;

  function dibujarCuadro(ahora) {
    const paso = Math.min((ahora - ultimoCuadro) / 16.67, 2);
    ultimoCuadro = ahora;
    contexto.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (const particula of particulas) {
      particula.x += particula.velocidadX * paso;
      particula.y += particula.velocidadY * paso;
      particula.velocidadY += 0.13 * paso;
      particula.velocidadX *= Math.pow(0.995, paso);
      particula.rotacion += particula.giro * paso;

      contexto.save();
      contexto.translate(particula.x, particula.y);
      contexto.rotate(particula.rotacion);
      contexto.fillStyle = particula.color;

      if (particula.corazon) {
        contexto.font = '16px serif';
        contexto.fillText('♥', -8, 0);
      } else {
        contexto.fillRect(-particula.ancho / 2, -3, particula.ancho, 6);
      }
      contexto.restore();
    }

    if (ahora - inicio < DURACION_CONFETI) {
      animacionConfeti = requestAnimationFrame(dibujarCuadro);
    } else {
      limpiarConfeti();
    }
  }

  animacionConfeti = requestAnimationFrame(dibujarCuadro);
}

function abrirRegalo() {
  if (abriendo) return;
  abriendo = true;
  botonRegalo.disabled = true;
  reproducirSonido();
  document.body.classList.add('opening');

  temporizador = setTimeout(() => {
    document.body.classList.remove('opening');
    document.body.classList.add('revealed');
    lanzarConfeti();
    tituloFinal.focus({ preventScroll: true });
  }, movimientoReducido ? 50 : DURACION_APERTURA);
}

function repetirRegalo() {
  clearTimeout(temporizador);
  limpiarConfeti();
  document.body.classList.remove('opening', 'revealed');
  abriendo = false;
  botonRegalo.disabled = false;
  botonRegalo.focus({ preventScroll: true });
  window.scrollTo(0, 0);
}

botonRegalo.addEventListener('click', abrirRegalo);
botonRepetir.addEventListener('click', repetirRegalo);
window.addEventListener('resize', ajustarCanvas);
ajustarCanvas();
