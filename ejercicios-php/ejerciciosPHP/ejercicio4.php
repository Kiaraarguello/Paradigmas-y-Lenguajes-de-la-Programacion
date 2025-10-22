<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Número aleatorio</title>
</head>
<body>
    <?php


        $num = rand(1, 100);
        echo "<h2>El número generado es: $num</h2>";
       
        if ($num <= 50) {
            echo "<p>El número es menor o igual a 50.</p>";
        } else {
            echo "<p>El número es mayor a 50.</p>";
        }
    ?>
</body>
</html>