/**
  用户表添加字段
 */
ALTER TABLE `guns`.`sys_user`
  ADD COLUMN `user_signature` VARCHAR(200) NULL   COMMENT '用户签名' AFTER `nick_name`,
  CHANGE `name` `name` VARCHAR(45) CHARSET utf8 COLLATE utf8_general_ci NULL   COMMENT '真实姓名',
  ADD COLUMN `pay_sum` DECIMAL(10,2) DEFAULT 0.00  NULL   COMMENT '充值总额' AFTER `balance`,
  ADD COLUMN `withdraw_sum` DECIMAL(10,2) DEFAULT 0.00  NULL   COMMENT '提现总额' AFTER `pay_sum`,
  ADD COLUMN `wechat_num` VARCHAR(50) NULL   COMMENT '微信' AFTER `withdraw_sum`,
  ADD COLUMN `alipay_num` VARCHAR(50) NULL   COMMENT '支付宝' AFTER `wechat_num`,
  ADD COLUMN `qq_num` VARCHAR(20) NULL   COMMENT 'QQ' AFTER `alipay_num`,
  ADD COLUMN `login_error_num` INT(11) DEFAULT 0  NULL   COMMENT '连续登陆错误次数' AFTER `qq_num`,
  ADD COLUMN `register_ip` VARCHAR(50) NULL   COMMENT '注册IP' AFTER `login_error_num`;
