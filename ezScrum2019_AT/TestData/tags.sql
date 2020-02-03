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

-- 正在傾印表格  tag_service.tag 的資料：~3 rows (約數)
/*!40000 ALTER TABLE `tag` DISABLE KEYS */;
INSERT INTO `tag` (`tag_id`, `order_id`, `name`, `product_id`) VALUES
	('030cb784-2130-4ba3-aecb-3464ccdc6134', 3, '"Important" Thing!!!', 'deaf688a-17c8-439e-9c5b-3a9da2268870'),
	('6b9067c1-1712-491a-bf8f-d6f70ba7ee16', 1, 'Thesis Tag', 'deaf688a-17c8-439e-9c5b-3a9da2268870'),
	('e619a591-38e6-4506-af53-22ffdd8986b5', 2, 'Bug', 'deaf688a-17c8-439e-9c5b-3a9da2268870');
/*!40000 ALTER TABLE `tag` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
