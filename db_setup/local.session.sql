CREATE DATABASE IF NOT EXISTS recruitment_orchestration_api;
CREATE USER 'system_acct' @'%' IDENTIFIED BY '{password}';
GRANT ALL PRIVILEGES ON recruitment_orchestration_api.* TO 'system_acct' @'%';
FLUSH PRIVILEGES;
SHOW GRANTS FOR system_acct