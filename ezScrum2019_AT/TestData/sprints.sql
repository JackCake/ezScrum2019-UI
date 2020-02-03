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

-- 正在傾印表格  sprint_service.sprint 的資料：~2 rows (約數)
/*!40000 ALTER TABLE `sprint` DISABLE KEYS */;
INSERT INTO `sprint` (`sprint_id`, `order_id`, `goal`, `sprint_interval`, `start_date`, `end_date`, `demo_date`, `demo_place`, `daily`, `product_id`, `retrospective`) VALUES
    ('c94b38fe-96f3-40be-a0db-f759e924c131', 1, 'Implement the sprint backlog.', 2, NOW(), DATE_ADD(NOW(), INTERVAL 13 DAY), DATE_ADD(NOW(), INTERVAL 13 DAY), 'Room 1622', '09:00 Room 1321', 'deaf688a-17c8-439e-9c5b-3a9da2268870', 'The good thing is we have finished the list of the product!\nThe difficult thing is the design about the user interface!'),
	('4eadc9b9-47f9-43b2-972b-ae02803b2279', 2, 'Implement the product backlog and sprint backlog.', 2, DATE_ADD(NOW(), INTERVAL 14 DAY), DATE_ADD(NOW(), INTERVAL 27 DAY), DATE_ADD(NOW(), INTERVAL 27 DAY), '12F Room', '10:00 Room 1321', 'deaf688a-17c8-439e-9c5b-3a9da2268870', '');
/*!40000 ALTER TABLE `sprint` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
