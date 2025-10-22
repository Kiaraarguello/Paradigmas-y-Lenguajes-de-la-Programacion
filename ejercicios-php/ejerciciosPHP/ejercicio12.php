<?php
$mensaje = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $nombre = trim($_POST['nombre'] ?? '');
  $ingreso = $_POST['ingreso'] ?? '';

  if ($nombre !== '' && $ingreso !== '') {
    if ($ingreso === '>3000') {
      $mensaje = htmlspecialchars($nombre) . " debe pagar impuestos a las ganancias.";
    } else {
      $mensaje = htmlspecialchars($nombre) . " no debe pagar impuestos a las ganancias.";
    }
  } else {
    $mensaje = "Completá todos los campos.";
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
    <select name="ingreso" required>
      <option value="">-- Seleccioná tus ingresos --</option>
      <option value="1-1000">1 - 1000</option>
      <option value="1001-3000">1001 - 3000</option>
      <option value=">3000">Más de 3000</option>
    </select>
    <button type="submit">Enviar</button>
  </form>
</body>
</html>
