CREATE TABLE `til` (
	`id` varchar(191) NOT NULL,
	`user_id` varchar(191) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`tags` text NOT NULL,
	CONSTRAINT `til_id` PRIMARY KEY(`id`)
);
