<?php
// ejercicio17.php - vectores asociativos
$usuarios = [
    "alejo" => "1234",
    "carla" => "abcd",
    "juan" => "pass321",
    "maria" => "qwerty",
    "sofia" => "xyz987"
];
// mostrar todo
echo "<h3>Claves de acceso</h3>";
foreach ($usuarios as $nombre => $clave) {
    echo "$nombre → $clave<br>";
}
// mostrar una sola componente
echo "<p>La clave de Juan es: " . $usuarios["juan"] . "</p>";
?>
