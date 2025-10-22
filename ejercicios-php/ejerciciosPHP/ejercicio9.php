<form method="post" action="ejercicio7.2.php">
        Ingrese su Nombre: <input type="text" name="nombre" required><br>
        Ingrese su Edad: <input type="number" name="edad" required><br>
        <input type="submit" value="Enviar">
    </form>

 <?php
        echo "El nombre ingresado es: {$_REQUEST['nombre']}";
        echo "<br>";
        echo "La edad ingresada es: {$_REQUEST['edad']}";
    ?>