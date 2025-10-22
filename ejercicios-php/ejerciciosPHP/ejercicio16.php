<?php
$archivo = "pedidos.txt";

if (file_exists($archivo)) {
    $lineas = file($archivo, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    echo "<h2>Pedidos de Pizzas</h2>";
    echo "<table border='1' cellpadding='5'>";
    echo "<tr><th>#</th><th>Pedido</th></tr>";
    foreach ($lineas as $i => $linea) {
        echo "<tr><td>".($i+1)."</td><td>".htmlspecialchars($linea)."</td></tr>";
    }
    echo "</table>";
} else {
    echo "No se encontró el archivo 'pedidos.txt'.";
}
?>
