-- --------------------------------------------------------
-- 主機:                           127.0.0.1
-- 伺服器版本:                        5.7.8-rc-log - MySQL Community Server (GPL)
-- 伺服器操作系統:                      Win64
-- HeidiSQL 版本:                  10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- 正在傾印表格  tag_service.assigned_tag 的資料：~3 rows (約數)
/*!40000 ALTER TABLE `assigned_tag` DISABLE KEYS */;
INSERT INTO `assigned_tag` (`assigned_tag_id`, `backlog_item_id`, `tag_id`) VALUES
	('30d7a4cf-288c-4fd1-9a5b-8a20a13f5046', 'ca134a47-9c8c-468a-8987-ff737acd0929', '6b9067c1-1712-491a-bf8f-d6f70ba7ee16'),
	('845250b0-9e6a-4d05-81fe-af54a4d11906', 'ca134a47-9c8c-468a-8987-ff737acd0929', 'e619a591-38e6-4506-af53-22ffdd8986b5'),
	('e6f9e76e-6529-4bb5-9414-f29b120e2ef7', 'ca134a47-9c8c-468a-8987-ff737acd0929', '030cb784-2130-4ba3-aecb-3464ccdc6134');
/*!40000 ALTER TABLE `assigned_tag` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
