<?php
   $num = rand() % 3 + 1;
   
   echo "El numero generado es: ";
   switch ($num) {
       case 1:
           echo "uno";
           break;
       case 2:
           echo "dos";
           break;
       case 3:
           echo "tres";
           break;
   }
   echo "<br>";
   ?>
