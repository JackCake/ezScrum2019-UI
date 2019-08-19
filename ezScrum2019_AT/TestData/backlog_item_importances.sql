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

-- 正在傾印表格  backlog_item_importance_service.backlog_item_importance 的資料：~2 rows (約數)
/*!40000 ALTER TABLE `backlog_item_importance` DISABLE KEYS */;
INSERT INTO `backlog_item_importance` (`backlog_item_id`, `importance`) VALUES
	('ca134a47-9c8c-468a-8987-ff737acd0929', 100),
	('d9b3a374-93cb-4f36-9787-f4ba1faf7777', 95);
/*!40000 ALTER TABLE `backlog_item_importance` ENABLE KEYS */;

-- 正在傾印表格  backlog_item_importance_service.event 的資料：~0 rows (約數)
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
/*!40000 ALTER TABLE `event` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
