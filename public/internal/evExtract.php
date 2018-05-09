<?php
error_reporting(E_ALL);
$dateNow = date('d-m-Y');
$i = $_POST['dKey'];

if(isset($_POST['dKey'])){
    $intake = $_POST['payload'];

    $path = 'newSignups_'.$dateNow.'.csv';
    $fp = fopen($path, 'w+');
    
    fputcsv($fp, ['firstName', 'lastName', 'emailAddress'], ',');
    foreach($i as $iobj){
        fputcsv($fp, [$iobj->firstName,$iobj->lastName,$iobj->emailAddress], ',');
    }
    header("Content-Description: File Transfer");
    header("Content-type: application/octet-stream"); // add here more headers
    header("Content-Disposition: attachment; filename=\"".basename($path)."\""); // use 'attachment' to force a download
    readfile('newSignups_'.$dateNow.'.csv');
    exit;
}
else {
    print('Not signed in or unauthorized');
    //header('Location: /signups.html');
}
?>