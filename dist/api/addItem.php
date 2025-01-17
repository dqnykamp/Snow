<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

include "db_connection.php";


$jwtArray = include "jwtArray.php";
$userId = $jwtArray['userId'];

$driveId = mysqli_real_escape_string($conn,$_REQUEST["driveId"]);
$parentFolderId = mysqli_real_escape_string($conn,$_REQUEST["parentFolderId"]);
$itemId = mysqli_real_escape_string($conn,$_REQUEST["itemId"]);
$versionId = mysqli_real_escape_string($conn,$_REQUEST["versionId"]);
$label = mysqli_real_escape_string($conn,$_REQUEST["label"]);
$type = mysqli_real_escape_string($conn,$_REQUEST["type"]);
$branchId = mysqli_real_escape_string($conn,$_REQUEST["branchId"]);
$sortOrder = mysqli_real_escape_string($conn,$_REQUEST["sortOrder"]);

$success = TRUE;
$results_arr = array();

$sql = "
SELECT canAddItemsAndFolders
FROM drive_user
WHERE userId = '$userId'
AND driveId = '$driveId'
";

$result = $conn->query($sql); 
if ($result->num_rows > 0){
$row = $result->fetch_assoc();
$canAdd = $row["canAddItemsAndFolders"];
if (!$canAdd){
  $success = FALSE;
}
}else{
  //Fail because there is no DB row for the user on this drive so we shouldn't allow an add
  $success = FALSE;
}

if ($success){


  if ($type == 'Folder'){
    $sql="
  INSERT INTO drive_content
  (driveId,itemId,parentFolderId,label,creationDate,isDeleted,itemType,branchId,sortOrder)
  VALUES
  ('$driveId','$itemId','$parentFolderId','$label',NOW(),'0','$type',NULL,'$sortOrder')
  ";

  $result = $conn->query($sql); 

  }else if ($type == 'Url'){
    $sql="
  INSERT INTO drive_content
  (driveId,itemId,parentFolderId,label,creationDate,isDeleted,itemType,branchId,sortOrder)
  VALUES
  ('$driveId','$itemId','$parentFolderId','$label',NOW(),'0','$type',NULL,'$sortOrder')
  ";

  $result = $conn->query($sql); 

  }else if ($type == 'DoenetML'){
    $fileName = $branchId;
    //TODO: Config file needed for server
    $newfile = fopen("../media/$fileName.doenet", "w") or die("Unable to open file!");
    fwrite($newfile, "");
    fclose($newfile);

    $sql="
    INSERT INTO drive_content
    (driveId,itemId,parentFolderId,label,creationDate,isDeleted,itemType,branchId,sortOrder)
    VALUES
    ('$driveId','$itemId','$parentFolderId','$label',NOW(),'0','$type','$branchId','$sortOrder')
    ";
    
    $result = $conn->query($sql); 
    $sql="
    INSERT INTO content
    (branchId,versionId,contentId,title,timestamp,isDraft,removedFlag,public)
    VALUES
    ('$branchId','$versionId','$branchId','Draft',NOW(),'1','0','1')
    ";
    
    $result = $conn->query($sql); 
  }else{
    $success = FALSE;
  }

}

$response_arr = array(
  "success"=>$success
  );

// set response code - 200 OK
http_response_code(200);

// make it json format
echo json_encode($response_arr);
$conn->close();

?>