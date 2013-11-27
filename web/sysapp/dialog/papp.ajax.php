<?php
	require('../../global.php');
	
	switch($ac){
		case 'edit':
			if($id == ''){
				addApp(array(
					'type' => $val_type,
					'icon' => $val_icon,
					'name' => $val_name,
					'url' => $val_url,
					'width' => $val_width,
					'height' => $val_height,
					'isresize' => $val_isresize,
					'isopenmax' => $val_isopenmax,
					'isflash' => $val_isflash,
					'desk' => $desk
				));
			}else{
				$set = array(
					'type = "'.$val_type.'"',
					'icon = "'.$val_icon.'"',
					'name = "'.$val_name.'"',
					'url = "'.$val_url.'"',
					'width = '.$val_width,
					'height = '.$val_height,
					'isresize = '.$val_isresize,
					'isopenmax = '.$val_isopenmax,
					'isflash = '.$val_isflash
				);
				$db->update(0, 0, 'tb_member_app', $set, 'and tbid = '.$id.' and member_id = '.$_SESSION['member']['id']);
			}
			echo json_encode(array(
				'info' => '',
				'status' => 'y'
			));
			break;
		case 'uploadImg':
			include('libs/Uploader.class.php');
			$config = array(
				'savePath' => 'uploads/'.$_SESSION['member']['id'].'/shortcut/', //保存路径
				'allowFiles' => array('.jpg', '.jpeg', '.png', '.gif', '.bmp'), //文件允许格式
				'maxSize' => 1000 //文件大小限制，单位KB
			);
			$up = new Uploader('xfile', $config);
			$info = $up->getFileInfo();
			echo '{"url":"'.$info['url'].'","fileType":"'.$info['type'].'","original":"'.$info['originalName'].'","state":"'.$info['state'].'"}';
			break;
	}
?>