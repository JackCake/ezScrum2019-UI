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

-- 正在傾印表格  kanban.board 的資料：~1 rows (約數)
/*!40000 ALTER TABLE `board` DISABLE KEYS */;
INSERT INTO `board` (`board_id`, `name`, `order_id`, `stage_ids`, `category_ids`) VALUES
	('deaf688a-17c8-439e-9c5b-3a9da2268870', 'ezKanban', 1, '8b8600c3-8d61-4ccd-b4ab-55aac0bbc619,4f584066-e615-42db-b59f-874cfd7fca19,00205cba-9e0d-4d9b-8402-596036429cdf', '');
/*!40000 ALTER TABLE `board` ENABLE KEYS */;

-- 正在傾印表格  kanban.board_member 的資料：~1 rows (約數)
/*!40000 ALTER TABLE `board_member` DISABLE KEYS */;
INSERT INTO `board_member` (`board_member_id`, `board_id`, `user_id`) VALUES
	('57d15b29-9e98-4b5d-8886-7fb0e6f305ed', 'deaf688a-17c8-439e-9c5b-3a9da2268870', '1');
/*!40000 ALTER TABLE `board_member` ENABLE KEYS */;

-- 正在傾印表格  kanban.mini_stage 的資料：~3 rows (約數)
/*!40000 ALTER TABLE `mini_stage` DISABLE KEYS */;
INSERT INTO `mini_stage` (`mini_stage_id`, `stage_id`, `title`, `order_id`) VALUES
	('2f46a353-2eab-44a7-9e56-95acae4ed96c', '00205cba-9e0d-4d9b-8402-596036429cdf', '', 1),
	('6fd5b708-9e8d-4e57-85bb-041c3706a0e0', '4f584066-e615-42db-b59f-874cfd7fca19', '', 1),
	('e69a7285-f585-4068-9124-ddcd096a7a66', '8b8600c3-8d61-4ccd-b4ab-55aac0bbc619', '', 1);
/*!40000 ALTER TABLE `mini_stage` ENABLE KEYS */;

-- 正在傾印表格  kanban.stage 的資料：~3 rows (約數)
/*!40000 ALTER TABLE `stage` DISABLE KEYS */;
INSERT INTO `stage` (`stage_id`, `title`, `order_id`, `board_id`) VALUES
	('00205cba-9e0d-4d9b-8402-596036429cdf', 'Done', 3, 'deaf688a-17c8-439e-9c5b-3a9da2268870'),
	('4f584066-e615-42db-b59f-874cfd7fca19', 'Doing', 2, 'deaf688a-17c8-439e-9c5b-3a9da2268870'),
	('8b8600c3-8d61-4ccd-b4ab-55aac0bbc619', 'To do', 1, 'deaf688a-17c8-439e-9c5b-3a9da2268870');
/*!40000 ALTER TABLE `stage` ENABLE KEYS */;

-- 正在傾印表格  kanban.swim_lane 的資料：~3 rows (約數)
/*!40000 ALTER TABLE `swim_lane` DISABLE KEYS */;
INSERT INTO `swim_lane` (`swim_lane_id`, `mini_stage_id`, `title`, `wip_limit`, `order_id`, `work_item_ids`) VALUES
	('ac553956-109d-434c-a7ae-9f0563cc19d7', '6fd5b708-9e8d-4e57-85bb-041c3706a0e0', '', -1, 1, ''),
	('ae8c7228-ca16-4222-94b3-caeb1b913b38', '2f46a353-2eab-44a7-9e56-95acae4ed96c', '', -1, 1, ''),
	('c223fa5a-bbb8-4b82-8bc2-ac954291f0f4', 'e69a7285-f585-4068-9124-ddcd096a7a66', '', -1, 1, '');
/*!40000 ALTER TABLE `swim_lane` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
