<?php
function to_chin($word) {
    switch ($word) {
        case 'lol':
            return 'LOL';
        case 'ls':
            return '炉石';
        case 'dota2':
            return 'Dota2';
        case 'douyu':
            return '斗鱼';
        case 'panda':
            return '熊猫';
        case 'huomao':
            return '火猫';
         case 'huya':
            return '虎牙';
        case 'zhanqi':
            return '战旗'; 
        default:
            return '';
            break;
    }
}
function loadlive($tb_name, $action){
// Create connection

$domain   = "127.0.0.1";  // or yourdomainname.com
$username = "root";       // db username
$password = "LOUbu123";    // db password
$dbName   = "zhibo";   // db name

$con = mysql_connect($domain,$username,$password);

// Check connection
if (mysqli_connect_errno()){

    echo "Failed to connect to MySQL: " . mysqli_connect_error();
    die('Mysql connection error');
}else{
   // echo "Connection Established";
}
mysql_query('SET NAMES UTF8');

if (!mysql_select_db($dbName, $con)) {
    echo 'Could not select database';
    exit;
}
$strsql="";
$first = mysql_fetch_array(mysql_query("SELECT used FROM exeu WHERE tableID = 1 "));
if (!$first) { // add this check.
    die('Invalid query: ' . mysql_error());
}

$tableID = $first[0];
if ($tableID == 0) {
    if($action == "cate") {
        $strsql = "SELECT * FROM ".$tb_name." WHERE active = 'yes'and view >= 1000 order by view desc";
    } else if ($action == "index") {
        $strsql = "SELECT * FROM dota2 WHERE active = 'yes'and view > 50000 union all SELECT * FROM lol WHERE active = 'yes'and view > 50000 union all SELECT * FROM ls WHERE active = 'yes'and view > 50000 UNION ALL SELECT * FROM other WHERE active = 'yes'and view > 30000 order by view desc";
    } else if ($action == "hot") {
        $strsql = "SELECT * FROM dota2 WHERE active = 'yes'and view > 100000 union all SELECT * FROM lol WHERE active = 'yes'and view > 100000 union all SELECT * FROM ls WHERE active = 'yes'and view > 100000 UNION ALL SELECT * FROM other WHERE active = 'yes'and view > 100000 order by view desc";
    } else if ($action == "user_love") {
        $username = busheng;
        $strsql = "SELECT * FROM dota2 
                        WHERE zhubo in (
                                SELECT zhubo FROM loves WHERE userID 
                                   in (SELECT memberID FROM members WHERE username = '{$username}'))
                        AND active = 'yes'
                    UNION ALL
                    SELECT * FROM lol 
                        WHERE zhubo in (
                                SELECT zhubo FROM loves WHERE userID 
                                   in (SELECT memberID FROM members WHERE username = '{$username}'))
                        AND active = 'yes'
                    UNION ALL
                    SELECT * FROM ls
                        WHERE zhubo in (
                                SELECT zhubo FROM loves WHERE userID 
                                   in (SELECT memberID FROM members WHERE username = '{$username}'))
                        AND active = 'yes'
                    UNION ALL
                    SELECT * FROM other
                        WHERE zhubo in (
                                SELECT zhubo FROM loves WHERE userID 
                                   in (SELECT memberID FROM members WHERE username = '{$username}'))
                        AND active = 'yes'";


    }
} else {
        if($action == "cate") {
        $strsql = "SELECT * FROM ".$tb_name."2 WHERE active = 'yes'and view >= 1000 order by view desc";
    } else if ($action == "index") {
        $strsql = "SELECT * FROM baby2 WHERE active = 'yes'and view > 50000 union all SELECT * FROM dota22 WHERE active = 'yes'and view > 50000 union all SELECT * FROM lol2 WHERE active = 'yes'and view > 50000 union all SELECT * FROM ls2 WHERE active = 'yes'and view > 50000 UNION ALL SELECT * FROM other2 WHERE active = 'yes'and view > 30000 order by view desc";
    } else if ($action == "hot") {
        $strsql = "SELECT * FROM baby2 WHERE active = 'yes'and view > 100000 union all SELECT * FROM dota22 WHERE active = 'yes'and view > 100000 union all SELECT * FROM lol2 WHERE active = 'yes'and view > 100000 union all SELECT * FROM ls2 WHERE active = 'yes'and view > 100000 UNION ALL SELECT * FROM other2 WHERE active = 'yes'and view > 100000 order by view desc";
    } else if ($action == "user_love") {
        $username = busheng;
        $strsql = "SELECT * FROM dota2 
                        WHERE zhubo in (
                                SELECT zhubo FROM loves WHERE userID 
                                   in (SELECT memberID FROM members WHERE username = '{$username}'))
                        AND active = 'yes'
                    UNION ALL
                    SELECT * FROM lol 
                        WHERE zhubo in (
                                SELECT zhubo FROM loves WHERE userID 
                                   in (SELECT memberID FROM members WHERE username = '{$username}'))
                        AND active = 'yes'
                    UNION ALL
                    SELECT * FROM ls
                        WHERE zhubo in (
                                SELECT zhubo FROM loves WHERE userID 
                                   in (SELECT memberID FROM members WHERE username = '{$username}'))
                        AND active = 'yes'
                    UNION ALL
                    SELECT * FROM other
                        WHERE zhubo in (
                                SELECT zhubo FROM loves WHERE userID 
                                   in (SELECT memberID FROM members WHERE username = '{$username}'))
                        AND active = 'yes'";
    }

}

$result = mysql_query($strsql, $con);
if (!$result) {
    echo "DB Error, could not query the database\n";
    echo 'MySQL Error: ' . mysql_error();
    exit;
}
$row = mysql_fetch_row($result);
if ($row >= 1) {
    mysql_data_seek($result, 0);
}echo "<div><ul>";
while($row = mysql_fetch_assoc($result)) {
?>
<!-- <li style="float:left;display:inline;"> -->
<li>

    <a href="<?php echo $row['link']; ?>" target=_blank >

    <img class = "lazy" src = "<?php echo $row['img_url']; ?>"/>
        <h4><?php echo $row['title'];?></h4>
        <p>
            <span class="type fr"><?php echo to_chin($row['cate']); ?></span>
            <span class="username"><?php $name = substr($row['zhubo'], 6); echo $name; ?> </span>
            <span class="view"><?php 
                $i = $row['view'];
                if ($i >= 10000) {
                    echo round(($i/10000),1).'万';
                } else {
                    echo $i;
                }            
                ?></span>

        </p>
    <i></i><div class="dnf"><?php echo to_chin($row['web']); ?></div> <em></em></a>
</li>
<?php
}

echo "<ul></div>";
mysql_free_result($result);
mysql_close($con);
}

?>
