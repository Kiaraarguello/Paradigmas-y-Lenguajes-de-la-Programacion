<?php
function verificarClaves($clave1, $clave2) {
    if ($clave1 !== $clave2) {
        echo "Las claves ingresadas son distintas.";
    } else {
        echo "Las claves coinciden.";
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $usuario = $_POST['usuario'];
    $clave1 = $_POST['clave1'];
    $clave2 = $_POST['clave2'];
    verificarClaves($clave1, $clave2);
} else {
?>
<form method="post">
    Nombre de usuario: <input type="text" name="usuario"><br><br>
    Clave: <input type="password" name="clave1"><br><br>
    Repetir clave: <input type="password" name="clave2"><br><br>
    <input type="submit" value="Enviar">
</form>
<?php
}
?>
