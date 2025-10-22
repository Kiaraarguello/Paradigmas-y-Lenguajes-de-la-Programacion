<?php
$mensaje = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $nombre = trim($_POST['nombre'] ?? '');
  $deportes = $_POST['deportes'] ?? [];
  $cant = count($deportes);

  if ($nombre !== '') {
    $mensaje = htmlspecialchars($nombre) . " practica $cant deporte" . ($cant != 1 ? 's' : '') . ".";
  } else {
    $mensaje = "Completá el nombre.";
  }
}
?>
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><title>Formulario</title></head>
<body>
  <?php if ($mensaje): ?>
    <p><?= $mensaje ?></p>
    <hr>
  <?php endif; ?>

  <form method="post">
    <input type="text" name="nombre" placeholder="Nombre" required><br>
    <label><input type="checkbox" name="deportes[]" value="futbol"> Fútbol</label>
    <label><input type="checkbox" name="deportes[]" value="basket"> Basket</label>
    <label><input type="checkbox" name="deportes[]" value="tennis"> Tennis</label>
    <label><input type="checkbox" name="deportes[]" value="voley"> Voley</label><br>
    <button type="submit">Enviar</button>
  </form>
</body>
</html>
