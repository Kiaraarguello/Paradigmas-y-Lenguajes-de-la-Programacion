<?php
// index.php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $nombre = trim($_POST['nombre'] ?? '');
  $direccion = trim($_POST['direccion'] ?? '');
  $tipos = $_POST['tipos'] ?? [];
  $cantidades = $_POST['cantidades'] ?? [];

  $pedido = "Nombre: $nombre\nDirección: $direccion\n";

  foreach ($tipos as $tipo) {
    $cantidad = intval($cantidades[$tipo] ?? 0);
    $pedido .= ucfirst($tipo) . ": $cantidad\n";
  }

  $pedido .= str_repeat('.', 30) . "\n";

  file_put_contents("pedidos.txt", $pedido, FILE_APPEND);

  echo "<p>Pedido registrado correctamente.</p>";
  exit;
}
?>
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><title>Pedido de Pizza</title></head>
<body>
  <form method="post">
    <label>Nombre: <input type="text" name="nombre" required></label><br>
    <label>Dirección: <input type="text" name="direccion" required></label><br><br>

    <label><input type="checkbox" name="tipos[]" value="jamon y queso"> Jamón y Queso</label>
    <input type="number" name="cantidades[jamon y queso]" min="0" placeholder="Cantidad"><br>

    <label><input type="checkbox" name="tipos[]" value="napolitana"> Napolitana</label>
    <input type="number" name="cantidades[napolitana]" min="0" placeholder="Cantidad"><br>

    <label><input type="checkbox" name="tipos[]" value="muzzarella"> Muzzarella</label>
    <input type="number" name="cantidades[muzzarella]" min="0" placeholder="Cantidad"><br><br>

    <button type="submit">Confirmar</button>
  </form>
</body>
</html>
