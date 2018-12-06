package cn.stylefeng.guns.modular.system.dao;

import org.apache.ibatis.annotations.Mapper;

import cn.stylefeng.guns.modular.system.model.RechargeLogEntity;
@Mapper
public interface RechargeLogMapper {
    int deleteByPrimaryKey(Long id);

    int save(RechargeLogEntity record);

    RechargeLogEntity selectByPrimaryKey(Long id);

}