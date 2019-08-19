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

-- 正在傾印表格  task_service.event 的資料：~2 rows (約數)
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
INSERT INTO `event` (`event_id`, `event_body`, `event_type`) VALUES
	(3, '{"occurredOn":"Aug 18, 2019 7:34:09 PM","taskId":"12bb9bc0-ed9d-46e7-82b7-cc10ca03e195"}', 'ntut.csie.taskService.model.task.TaskAdded'),
	(4, '{"occurredOn":"Aug 18, 2019 7:34:18 PM","taskId":"406bb9d4-33de-4628-9d8a-3f95596201b3"}', 'ntut.csie.taskService.model.task.TaskAdded');
/*!40000 ALTER TABLE `event` ENABLE KEYS */;

-- 正在傾印表格  task_service.task 的資料：~2 rows (約數)
/*!40000 ALTER TABLE `task` DISABLE KEYS */;
INSERT INTO `task` (`task_id`, `order_id`, `description`, `handler_id`, `status`, `estimate`, `remains`, `notes`, `backlog_item_id`) VALUES
	('12bb9bc0-ed9d-46e7-82b7-cc10ca03e195', 1, 'Use Case', NULL, 'To do', 5, 5, '', 'ca134a47-9c8c-468a-8987-ff737acd0929'),
	('406bb9d4-33de-4628-9d8a-3f95596201b3', 2, 'Unit Test', NULL, 'To do', 3, 3, '', 'ca134a47-9c8c-468a-8987-ff737acd0929');
/*!40000 ALTER TABLE `task` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
