
<?php

echo "<h2>For loop:</h2>";
for ($i = 2; $i <= 100; $i += 2) {
    echo "<p>$i</p>";
}
echo "<h2>While loop:</h2>";
$i = 2;
while ($i <= 100) {
    echo "<p>$i</p>";
    $i += 2;
}
echo "<h2>Do-While loop:</h2>";
$i = 2;
do {
    echo "<p>$i</p>";
    $i += 2;
} while ($i <= 100);
?>
