<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Formulario</title>
</head>
<body>
  <?php
  if($_POST){
    $nombre = $_POST['nombre'];
    $niveles = ["1"=>"no tiene estudios","2"=>"estudios primarios","3"=>"estudios secundarios"];
    echo "<p>$nombre posee ".$niveles[$_POST['estudios']].".</p>";
  } else {
  ?>
  <form method="post">
    <input type="text" name="nombre" placeholder="Nombre" required><br>
    <label><input type="radio" name="estudios" value="1" required> Sin estudios</label>
    <label><input type="radio" name="estudios" value="2"> Primarios</label>
    <label><input type="radio" name="estudios" value="3"> Secundarios</label><br>
    <button type="submit">Enviar</button>
  </form>
  <?php } ?>
</body>
</html>
