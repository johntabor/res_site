<?php
error_reporting(E_ALL);
#require 'vendor/autoload.php';
$dateNow = date('d-m-Y');

if(isset($_POST['payload'])){
    $i = json_decode(urldecode($_POST['payload']));
    $intake = $_POST['payload'];

    $path = 'newSignups_'.$dateNow.'.csv';
    $fp = fopen($path, 'w+');
    
    fputcsv($fp, ['firstName', 'lastName', 'emailAddress', 'signupDate'], ',');
    foreach($i as $iobj){
        fputcsv($fp, [$iobj->firstName,$iobj->lastName,$iobj->emailAddress, $iobj->signupDate], ',');
    }
    header("Content-Description: File Transfer");
    header("Content-Type: application/octet-stream"); // add here more headers
    header("Content-Disposition: attachment; filename=\"".basename($path)."\""); // use 'attachment' to force a download
    readfile('newSignups_'.$dateNow.'.csv');
    exit;
}

elseif (isset($_POST['dKey'])) {
    $i = json_decode(urldecode($_POST['package']));
    $dk = $_POST['dKey'];

    $path = 'event_'.$dk.'.csv';
    $fp = fopen($path, 'w+');
    
    fputcsv($fp, ['emailAddress','state (r=returning, n=new)'], ',');
    foreach($i as $iobj){
        fputcsv($fp, [$iobj->emailAddress,$iobj->state], ',');
    }
    header("Content-Description: File Transfer");
    header("Content-Type: application/octet-stream"); // add here more headers
    header("Content-Disposition: attachment; filename=\"".basename($path)."\""); // use 'attachment' to force a download
    readfile('event_'.$dk.'.csv');
    exit;
}

else {
    print('Not signed in or unauthorized');
    //header('Location: /signups.html');
}
?>