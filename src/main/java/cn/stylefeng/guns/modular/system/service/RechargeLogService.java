package cn.stylefeng.guns.modular.system.service;


import cn.stylefeng.guns.modular.system.model.RechargeLogEntity;

public interface RechargeLogService {
    int deleteByPrimaryKey(Long id);

    int save(RechargeLogEntity record);

    RechargeLogEntity selectByPrimaryKey(Long id);

}