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
	    case 'movie':
	        return '影视';
	    case 'hwzb':
	       return '户外';
	    case 'baby':
	       return '美女';
	    case 'wow':
	       return '魔兽';
	    case 'war3':
	       return '魔兽';
	    case 'other':
	       return 'PC';
	    case 'dnf':
	       return 'DNF';
        case 'sc2':
            return '星际';
	    case 'cf':
	       return 'CF';
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
function getnum($word){
    switch ($word) {
        case 'lol':
            return 3000;
        case 'ls':
            return 1000;
        case 'dota2':
            return 1000;
	case 'movie':
	    return 300;
	case 'hwzb':
	    return 1000;
	case 'baby':
	    return 2000;
	case 'wow':
	    return 1000;
	case 'war3':
	    return 1000;
	case 'other':
	    return 2000;
	case 'dnf':
	    return 1000;
	case 'cf':
	    return 1000;
        default:
            return 1000;
            break;
    }
}


function loadlive($tb_name, $action, $user){
$userid;
$domain   = "127.0.0.1";  // or yourdomainname.com
$username = "root";       // db username
$password = "LOUbu123";    // db password
$dbName   = "zhibo";   // db name

$con = mysql_connect($domain,$username,$password);
    if ($user->is_logged_in()) {
         $userid = $_SESSION['memberID'];

    } else {
        $userid = 0;
    } 
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
$viewnum = getnum($tb_name);
if ($tableID == 0) {
    if($action == "cate") {
        $strsql = "SELECT * FROM ".$tb_name." WHERE active = 'yes'and view >= ".$viewnum." order by view desc";
    } else if ($action == "index") {
        $strsql = "SELECT * FROM dota2 WHERE active = 'yes'and view > 50000 union all SELECT * FROM lol WHERE active = 'yes'and view > 50000 union all SELECT * FROM ls WHERE active = 'yes'and view > 50000 UNION ALL SELECT * FROM other WHERE active = 'yes'and view > 30000 order by view desc";
    } else if ($action == "hot") {
        $strsql = "SELECT * FROM dota2 WHERE active = 'yes'and view > 100000 union all SELECT * FROM lol WHERE active = 'yes'and view > 100000 union all SELECT * FROM ls WHERE active = 'yes'and view > 100000 UNION ALL SELECT * FROM other WHERE active = 'yes'and view > 100000 order by view desc";
    } else if ($action == "user_love"  || $action == "user_top") {
        $strsql = "SELECT * FROM dota2 
                        WHERE active = 'yes'
                        AND zhubo in (
                            SELECT zhubo FROM loves WHERE userID = '{$userid}')
                    UNION ALL
                    SELECT * FROM lol 
                        WHERE active = 'yes'
                        AND zhubo in (
                                SELECT zhubo FROM loves WHERE userID = '{$userid}')
                    UNION ALL
                    SELECT * FROM ls
                        WHERE active = 'yes' 
                        AND zhubo in (
                                SELECT zhubo FROM loves WHERE userID = '{$userid}')
                    UNION ALL
                    SELECT * FROM dnf                    
                        WHERE active = 'yes'
                        AND zhubo in (
                                SELECT zhubo FROM loves WHERE userID = '{$userid}')  
                    UNION ALL
                    SELECT * FROM wow
                        WHERE active = 'yes'
                        AND zhubo in (
                                SELECT zhubo FROM loves WHERE userID = '{$userid}')
                    UNION ALL
                    SELECT * FROM war3
                        WHERE active = 'yes'
                        AND zhubo in (
                                SELECT zhubo FROM loves WHERE userID = '{$userid}')
                    UNION ALL
                    SELECT * FROM hwzb
                        WHERE active = 'yes'
                        AND zhubo in (
                                SELECT zhubo FROM loves WHERE userID = '{$userid}')
                    UNION ALL
                    SELECT * FROM baby
                        WHERE active = 'yes'
                        AND zhubo in (
                                SELECT zhubo FROM loves WHERE userID = '{$userid}')
                    UNION ALL
                    SELECT * FROM sc2
                        WHERE active = 'yes'
                        AND zhubo in (
                                SELECT zhubo FROM loves WHERE userID = '{$userid}')
                    UNION ALL
                    SELECT * FROM movie
                        WHERE active = 'yes'
                        AND zhubo in (
                                SELECT zhubo FROM loves WHERE userID = '{$userid}')
                    UNION ALL
                    SELECT * FROM cf
                        WHERE active = 'yes'
                        AND zhubo in (
                                SELECT zhubo FROM loves WHERE userID = '{$userid}')
                    UNION ALL
                    SELECT * FROM other                        
                        WHERE active = 'yes'
                        AND  zhubo in (
                                SELECT zhubo FROM loves WHERE userID = '{$userid}')";

    }
} else {
        if($action == "cate") {
        $strsql = "SELECT * FROM ".$tb_name."2 WHERE active = 'yes'and view >= ".$viewnum." order by view desc limit 50";
    } else if ($action == "index") {
        $strsql = "SELECT * FROM baby2 WHERE active = 'yes'and view > 50000 union all SELECT * FROM dota22 WHERE active = 'yes'and view > 50000 union all SELECT * FROM lol2 WHERE active = 'yes'and view > 50000 union all SELECT * FROM ls2 WHERE active = 'yes'and view > 50000 UNION ALL SELECT * FROM war3 WHERE active = 'yes'and view > 50000 union all SELECT * FROM dnf WHERE active = 'yes'and view > 50000 union all SELECT * FROM movie WHERE active = 'yes'and view > 50000 union all SELECT * FROM sc2 WHERE active = 'yes'and view > 50000 union all SELECT * FROM hwzb WHERE active = 'yes'and view > 50000 union all SELECT * FROM cf WHERE active = 'yes'and view > 80000 union all SELECT * FROM wow WHERE active = 'yes'and view > 50000 union all SELECT * FROM other2 WHERE active = 'yes'and view > 30000 order by view desc";
    } else if ($action == "hot") {
        $strsql = "SELECT * FROM baby2 WHERE active = 'yes'and view > 100000 union all SELECT * FROM dota22 WHERE active = 'yes'and view > 100000 union all SELECT * FROM lol2 WHERE active = 'yes'and view > 100000 union all SELECT * FROM ls2 WHERE active = 'yes'and view > 100000 UNION ALL SELECT * FROM war3 WHERE active = 'yes'and view > 100000 union all SELECT * FROM dnf WHERE active = 'yes'and view > 100000 union all SELECT * FROM movie WHERE active = 'yes'and view > 100000 union all SELECT * FROM sc2 WHERE active = 'yes'and view > 100000 union all SELECT * FROM hwzb WHERE active = 'yes'and view > 100000 union all SELECT * FROM cf WHERE active = 'yes'and view > 100000 union all SELECT * FROM wow WHERE active = 'yes'and view > 100000 union all SELECT * FROM other2 WHERE active = 'yes'and view > 100000 order by view desc";
    } else if ($action == "user_love" || $action == "user_top") {        
        $strsql = "SELECT * FROM dota22 
                        WHERE active = 'yes'
                        AND zhubo in (
                            SELECT zhubo FROM loves WHERE userID = '{$userid}')
                    UNION ALL
                    SELECT * FROM lol2 
                        WHERE active = 'yes'
                        AND zhubo in (
                                SELECT zhubo FROM loves WHERE userID = '{$userid}')
                    UNION ALL
                    SELECT * FROM ls2
                        WHERE active = 'yes' 
                        AND zhubo in (
                                SELECT zhubo FROM loves WHERE userID = '{$userid}')
                    UNION ALL
                    SELECT * FROM dnf2                    
                        WHERE active = 'yes'
                        AND zhubo in (
                                SELECT zhubo FROM loves WHERE userID = '{$userid}')  
                    UNION ALL
                    SELECT * FROM wow2
                        WHERE active = 'yes'
                        AND zhubo in (
                                SELECT zhubo FROM loves WHERE userID = '{$userid}')
                    UNION ALL
                    SELECT * FROM war32
                        WHERE active = 'yes'
                        AND zhubo in (
                                SELECT zhubo FROM loves WHERE userID = '{$userid}')
                    UNION ALL
                    SELECT * FROM hwzb2
                        WHERE active = 'yes'
                        AND zhubo in (
                                SELECT zhubo FROM loves WHERE userID = '{$userid}')
                    UNION ALL
                    SELECT * FROM baby2
                        WHERE active = 'yes'
                        AND zhubo in (
                                SELECT zhubo FROM loves WHERE userID = '{$userid}')
                    UNION ALL
                    SELECT * FROM sc22
                        WHERE active = 'yes'
                        AND zhubo in (
                                SELECT zhubo FROM loves WHERE userID = '{$userid}')
                    UNION ALL
                    SELECT * FROM movie2
                        WHERE active = 'yes'
                        AND zhubo in (
                                SELECT zhubo FROM loves WHERE userID = '{$userid}')
                    UNION ALL
                    SELECT * FROM cf2
                        WHERE active = 'yes'
                        AND zhubo in (
                                SELECT zhubo FROM loves WHERE userID = '{$userid}')
                    UNION ALL
                    SELECT * FROM other2                        
                        WHERE active = 'yes'
                        AND  zhubo in (
                                SELECT zhubo FROM loves WHERE userID = '{$userid}')";
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
if ($userid == 0 && $action == "user_love"){
    header("Location: index.php"); 
    exit();
}
else if ($row == 0 && $action == "user_love") {
    echo "<h2>客官，您好像还没有关注任何主播，快去关注一下吧</h2>";
} else if ($row == 0 && $action == "user_top") {
    ?>
                    <div class="no-rss">哇哦，订阅空空如也<br>快去把喜欢的主播装进来吧~</div>
                    <div class="more pa"><a class="more pa" href="/hot">去看看热门直播</a></div>
                    <div class="hm-rss">
                    </div>
    <?php
}

if ($action == "user_top") {
    
    ?>
    <div class="hm-rss">
    <?php
    $num = 0;
    while($row = mysql_fetch_assoc($result)) {
        $num += 1;
        if ($num > 8) break;
    ?>
            <a target=_blank href="<?php echo $row['link']; ?>" long="live">
            <h4><?php echo $row['title'];?></h4>
            <p>
            <span class="state on"><?php echo to_chin($row['web'])." - ".to_chin($row['cate']); ?></span>
            <span class="username"><?php $name = substr($row['zhubo'],6); echo $name; ?></span>
            <span class="view"><?php 
                    $i = $row['view'];
                    if ($i >= 10000) {
                        echo round(($i/10000),1).'万';
                    } else {
                        echo $i;
                    }            
            ?></span>
            </p>
            </a>
    <?php        
    }
    ?>
    </div>
    <a class="more pa" href="user_love">
               查看全部                      </a>                  
    <?php
    

} else {
    while($row = mysql_fetch_assoc($result)) {
        if ($action == "user_love") {
            $subscribed = 1;
        } else {
        $subscribed = $user->is_user_subscribe($row['cate'], $row['zhubo'], $userid);
        }
    ?>
    <li>
        <a href="<?php echo $row['link']; ?>" target=_blank >

        <img class = "lazy" src = "<?php echo $row['img_url']; ?>"/>
            <h4><?php echo $row['title'];?></h4>
            <p>
                <span class="type fr"><?php echo to_chin($row['cate']); ?></span>
                <span class="username"><?php $name = substr($row['zhubo'],6); echo $name; ?> </span>
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

                                    <div class="focus-box">
                                        <a cate = <?php echo $row['cate']; ?> zhubo = <?php echo $row['zhubo'];?> class="r-com-btn follow-btn hide subscribe" href="javascript:;" title="关注" data-anchor-info="follow"
                                            <?php
                                            if ($subscribed == 1) echo 'style = "display:none;"';
                                            ?>
                                            >关注一下</a>
                                        <a class="r-com-btn follow-btn hide " href="javascript:;" title="关注" data-anchor-info="follow" style = "display:none;">已经取消关注</a>
                                        <a class="r-com-btn follow-btn yet " href="javascript:;" data-anchor-info="followed" style = "display:none;">再次点击可取消关注</a>
                                        <a cate = <?php echo $row['cate']; ?> zhubo = <?php echo $row['zhubo'];?> class="r-com-btn follow-btn yet unsubscribe" href="javascript:;" data-anchor-info="followed" 
                                            <?php
                                            if ($subscribed != 1) echo 'style = "display:none;"';
                                            ?>
                                            >已关注</a>
                                    </div>
    </li>
    <?php
    }

    echo "<ul></div>";
}
mysql_free_result($result);
mysql_close($con);
}

?>
