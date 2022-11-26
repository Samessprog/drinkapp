
<?php 
include_once ("core.php");
    $connect = mysqli_connect("localhost", "root", "", "drinks");

    $sql = "SELECT * FROM drink ORDER BY ID_Drink DESC";
    $result = mysqli_query($connect , $sql);

    $json_array = array();

    while($row = mysqli_fetch_assoc($result)) {
        $json_array[] = $row;

    }

    echo json_encode($json_array);
?>

