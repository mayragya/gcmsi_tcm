<?php
function regex($inputString){
    $regex = "/[^a-zA-Z0-9.:,-_ ]/"; 
    $cleaned_string = preg_replace($regex, "", $inputString); 
    return $cleaned_string;
    
    }
?>
