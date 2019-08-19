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

-- 正在傾印表格  release_service.release_plan 的資料：~1 rows (約數)
/*!40000 ALTER TABLE `release_plan` DISABLE KEYS */;
INSERT INTO `release_plan` (`release_id`, `order_id`, `name`, `start_date`, `end_date`, `description`, `product_id`) VALUES
	('010831fa-03cd-413c-962c-a94ab8566da0', 1, 'Release ezKanban', '2019-08-19', '2019-09-28', 'ezKanban Principles', 'deaf688a-17c8-439e-9c5b-3a9da2268870');
/*!40000 ALTER TABLE `release_plan` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
