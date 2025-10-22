<?php
$contrato = <<<TXT
En la ciudad de ........., se acuerda entre la Empresa .........
representada por el Sr. ......... en su carácter de Apoderado,
con domicilio en la calle ......... y el Sr. .........,
futuro empleado con domicilio en ........., celebrar el presente
contrato a Plazo Fijo, de acuerdo a la normativa vigente de los
artículos 90, 92, 93, 94, 95 y concordantes de la Ley de Contrato de Trabajo N° 20.744.
TXT;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $texto = $_POST['contrato'] ?? '';
  // eliminar puntos suspensivos
  $texto = preg_replace('/\.{2,}/', '', $texto);
  echo '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><title>Contrato final</title></head><body>';
  echo '<h3>Contrato completado:</h3>';
  echo '<pre style="white-space: pre-wrap;">' . htmlspecialchars(trim($texto)) . '</pre>';
  echo '</body></html>';
  exit;
}
?>
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><title>Contrato</title></head>
<body>
  <form method="post">
    <textarea name="contrato" rows="14" cols="80"><?= htmlspecialchars($contrato) ?></textarea><br>
    <button type="submit">Enviar</button>
  </form>
</body>
</html>
