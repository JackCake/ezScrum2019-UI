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

-- 正在傾印表格  kanban.board 的資料：~2 rows (約數)
/*!40000 ALTER TABLE `board` DISABLE KEYS */;
INSERT INTO `board` (`board_id`, `name`, `order_id`, `stage_ids`, `category_ids`) VALUES
	('70ad004f-4290-492c-b3e4-df844a7c23b1', 'Front-End', 2, '5e27cefa-a964-4cb5-88d7-b4fad588a8c9,7a76fa22-d8fb-4b8c-94d5-3f0086edd29f,53369aa5-98e9-4a7e-b183-e5b7f7872ec4', ''),
	('deaf688a-17c8-439e-9c5b-3a9da2268870', 'ezKanban', 1, '50240ce1-8d41-4ddb-855a-aa6f2a762bee,c5277e92-a1fe-4533-9852-1101a2d4e9f9,c5df4045-4098-4834-95f5-c50d5cfd6354', '');
/*!40000 ALTER TABLE `board` ENABLE KEYS */;

-- 正在傾印表格  kanban.board_member 的資料：~2 rows (約數)
/*!40000 ALTER TABLE `board_member` DISABLE KEYS */;
INSERT INTO `board_member` (`board_member_id`, `board_id`, `user_id`) VALUES
	('41226e14-4a80-40c0-b78c-fc72c2e0951a', 'deaf688a-17c8-439e-9c5b-3a9da2268870', '1'),
	('672f1bf2-3d61-4138-9cdf-6e818b7019ed', '70ad004f-4290-492c-b3e4-df844a7c23b1', '1');
/*!40000 ALTER TABLE `board_member` ENABLE KEYS */;

-- 正在傾印表格  kanban.mini_stage 的資料：~6 rows (約數)
/*!40000 ALTER TABLE `mini_stage` DISABLE KEYS */;
INSERT INTO `mini_stage` (`mini_stage_id`, `stage_id`, `title`, `order_id`) VALUES
	('3b5ecc9c-c31a-4c69-aec8-1d625e25d551', '5e27cefa-a964-4cb5-88d7-b4fad588a8c9', '', 1),
	('4d9b0f4e-c4de-4000-bfd0-bdd39703ac36', '50240ce1-8d41-4ddb-855a-aa6f2a762bee', '', 1),
	('5aad4fd0-db9f-41d7-9f7f-2ab48b958ddb', '53369aa5-98e9-4a7e-b183-e5b7f7872ec4', '', 1),
	('8de04a12-a207-40e8-88de-cf788b5948ff', 'c5df4045-4098-4834-95f5-c50d5cfd6354', '', 1),
	('b767efc5-796f-4db6-b0ae-c3183a0be029', '7a76fa22-d8fb-4b8c-94d5-3f0086edd29f', '', 1),
	('cb14facd-28db-496e-9695-6adb762a296f', 'c5277e92-a1fe-4533-9852-1101a2d4e9f9', '', 1);
/*!40000 ALTER TABLE `mini_stage` ENABLE KEYS */;

-- 正在傾印表格  kanban.stage 的資料：~6 rows (約數)
/*!40000 ALTER TABLE `stage` DISABLE KEYS */;
INSERT INTO `stage` (`stage_id`, `title`, `order_id`, `board_id`) VALUES
	('50240ce1-8d41-4ddb-855a-aa6f2a762bee', 'To do', 1, 'deaf688a-17c8-439e-9c5b-3a9da2268870'),
	('53369aa5-98e9-4a7e-b183-e5b7f7872ec4', 'Done', 3, '70ad004f-4290-492c-b3e4-df844a7c23b1'),
	('5e27cefa-a964-4cb5-88d7-b4fad588a8c9', 'To do', 1, '70ad004f-4290-492c-b3e4-df844a7c23b1'),
	('7a76fa22-d8fb-4b8c-94d5-3f0086edd29f', 'Doing', 2, '70ad004f-4290-492c-b3e4-df844a7c23b1'),
	('c5277e92-a1fe-4533-9852-1101a2d4e9f9', 'Doing', 2, 'deaf688a-17c8-439e-9c5b-3a9da2268870'),
	('c5df4045-4098-4834-95f5-c50d5cfd6354', 'Done', 3, 'deaf688a-17c8-439e-9c5b-3a9da2268870');
/*!40000 ALTER TABLE `stage` ENABLE KEYS */;

-- 正在傾印表格  kanban.swim_lane 的資料：~6 rows (約數)
/*!40000 ALTER TABLE `swim_lane` DISABLE KEYS */;
INSERT INTO `swim_lane` (`swim_lane_id`, `mini_stage_id`, `title`, `wip_limit`, `order_id`, `work_item_ids`) VALUES
	('05222c29-7c21-41ac-9320-1e67af463953', '4d9b0f4e-c4de-4000-bfd0-bdd39703ac36', '', -1, 1, ''),
	('1ac0434a-1516-4725-831f-e9b39e325c0e', '3b5ecc9c-c31a-4c69-aec8-1d625e25d551', '', -1, 1, ''),
	('44f4a9be-e728-4e91-b07a-e89a26378c18', 'b767efc5-796f-4db6-b0ae-c3183a0be029', '', -1, 1, ''),
	('67a01dc3-28ba-4917-8606-2c70bd7f8ebd', '8de04a12-a207-40e8-88de-cf788b5948ff', '', -1, 1, ''),
	('eff47ef4-ba03-4fb3-849a-5f8aaef592d9', '5aad4fd0-db9f-41d7-9f7f-2ab48b958ddb', '', -1, 1, ''),
	('f67ebc55-b0a8-4b02-a9a0-c38c887d2119', 'cb14facd-28db-496e-9695-6adb762a296f', '', -1, 1, '');
/*!40000 ALTER TABLE `swim_lane` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
