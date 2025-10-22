<?php
// probar mensaje get: http://localhost/perfilador-php/?mensaje=Hola%20desde%20la%20URL
// probar sin mensaje: http://localhost/perfilador-php/

$es_post = $_SERVER['REQUEST_METHOD'] === 'POST';

// capturar GET en variable_get 
$variable_get = '';
if (isset($_GET['mensaje'])) {
    $variable_get = htmlspecialchars(trim((string)$_GET['mensaje']), ENT_QUOTES, 'UTF-8');
}

$nombre_usuario = '';
$edad_usuario   = '';
$hobby_usuario  = '';
$tipo_perfil    = '';
$mensaje_perfil = '';

if ($es_post) {
    $nombre_usuario = htmlspecialchars($_POST['nombre'] ?? '', ENT_QUOTES, 'UTF-8');
    $hobby_usuario  = htmlspecialchars($_POST['hobby']  ?? '', ENT_QUOTES, 'UTF-8');
// sanitizar datos
    $edad_cruda = $_POST['edad'] ?? '';
    $edad_numerica = filter_var($edad_cruda, FILTER_SANITIZE_NUMBER_INT);
$edad_usuario  = (string)$edad_numerica;


    // Lógica de perfil
    if ($edad_usuario === '' || $edad_numerica < 0 || $edad_numerica > 120) {
        $tipo_perfil = 'Edad inválida';
        $mensaje_perfil = 'Revisá el valor de edad (0–120).';
    } elseif ($edad_numerica >= 60) {
        $tipo_perfil = 'Perfil Senior';
        $mensaje_perfil = 'Tenés mucha experiencia y sabiduría.';
    } elseif ($edad_numerica >= 18) {
        $tipo_perfil = 'Perfil Activo';
        $mensaje_perfil = 'En plena acción, ¡seguí así!';
    } else {
        $tipo_perfil = 'Perfil en Desarrollo';
        $mensaje_perfil = 'Aprendiendo día a día.';
    }
}
?>
<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Perfilador PHP</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    :root { font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial; }
    body { margin: 0; background:#0f172a; color:#e2e8f0; display:grid; place-items:center; min-height:100vh; }
    .wrap { width: min(900px, 92vw); display:grid; gap:18px; }
    .card, .panel { background:#111827; border:1px solid #1f2937; border-radius:14px; padding:18px; }
    .title { font-size:1.4rem; margin:0 0 12px; }
    .grid { display:grid; gap:12px; }
    label { font-size:.95rem; color:#cbd5e1; display:block; margin-bottom:6px; }
    input { width:100%; padding:10px 12px; background:#0b1220; color:#e5e7eb; border:1px solid #263248; border-radius:10px; outline:none; }
    input:focus { border-color:#60a5fa; }
    .row { display:grid; grid-template-columns:1fr 140px; gap:12px; }
    button { padding:10px 14px; border-radius:10px; border:1px solid #334155; background:#1f2937; color:#e5e7eb; cursor:pointer; }
    button:hover { filter:brightness(1.15); }
    .tag { display:inline-block; padding:6px 10px; border-radius:999px; background:#0b5; color:#041; font-weight:700; }
    .error { background:#3b1113; border-color:#7f1d1d; color:#fecaca; }
    .ok { background:#0d1b12; border-color:#14532d; color:#bbf7d0; }
    .flex { display:flex; gap:12px; align-items:center; }
    .sp { height:8px; }
  </style>
  <script>
    function validar(e){
      const f = e.target;
      const nombre = f.nombre.value.trim();
      const edad   = f.edad.value.trim();
      const hobby  = f.hobby.value.trim();
      if(!nombre || !edad || !hobby){ alert("Completá todos los campos."); e.preventDefault(); return; }
      const n = Number(edad);
      if(!Number.isInteger(n) || n < 0 || n > 120){ alert("Edad inválida (0–120)."); e.preventDefault(); }
    }
    window.addEventListener('DOMContentLoaded', ()=>{
      const formulario = document.getElementById('formulario_perfil');
      formulario.addEventListener('submit', validar);
    });
  </script>
</head>
<body>
  <div class="wrap">
    <div class="panel">
      <h1 class="title">Generador de Tarjeta de Perfil (PHP)</h1>
    </div>

    <?php if ($variable_get !== ''): ?>
      <div class="panel ok">
        <strong>El mensaje de la URL capturado por GET es:</strong>
        <div><?= $variable_get ?></div>
      </div>
    <?php endif; ?>

    <form id="formulario_perfil" class="card" method="POST" action="">
      <div class="grid">
        <div>
          <label for="nombre">Nombre</label>
          <input id="nombre" name="nombre" type="text" placeholder="Tu nombre" required value="<?= $nombre_usuario ?>">
        </div>
        <div class="row">
          <div>
            <label for="edad">Edad</label>
            <input id="edad" name="edad" type="number" min="0" max="120" placeholder="Ej: 21" required value="<?= $edad_usuario ?>">
          </div>
          <div style="display:flex; align-items:flex-end;">
            <button type="submit">Generar tarjeta</button>
          </div>
        </div>
        <div>
          <label for="hobby">Hobby</label>
          <input id="hobby" name="hobby" type="text" placeholder="Ej: fútbol, música..." required value="<?= $hobby_usuario ?>">
        </div>
      </div>
    </form>

    <?php if ($es_post): ?>
      <div class="card <?= $tipo_perfil==='Edad inválida' ? 'error' : 'ok' ?>">
        <div class="flex">
          <span class="tag"><?= $tipo_perfil ?></span>
        </div>
        <div class="sp"></div>
        <div class="grid">
          <div><strong>Nombre:</strong> <?= $nombre_usuario ?: '—' ?></div>
          <div><strong>Edad:</strong> <?= $edad_usuario !== '' ? $edad_usuario : '—' ?></div>
          <div><strong>Hobby:</strong> <?= $hobby_usuario ?: '—' ?></div>
          <div><strong>Mensaje:</strong> <?= htmlspecialchars($mensaje_perfil, ENT_QUOTES, 'UTF-8') ?></div>
        </div>
      </div>
    <?php endif; ?>
  </div>
</body>
</html>
