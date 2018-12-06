package cn.stylefeng.guns.modular.system.service.impl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.stylefeng.guns.modular.system.dao.RechargeLogMapper;
import cn.stylefeng.guns.modular.system.model.RechargeLogEntity;
import cn.stylefeng.guns.modular.system.service.RechargeLogService;

@Service
public class RechargeLogServiceImpl implements RechargeLogService{

	@Autowired
	private RechargeLogMapper rechargeLogMapper;
	
	@Override
	public int deleteByPrimaryKey(Long id) {
		return rechargeLogMapper.deleteByPrimaryKey(id);
	}

	@Override
	public int save(RechargeLogEntity record) {
		return rechargeLogMapper.save(record);
	}

	@Override
	public RechargeLogEntity selectByPrimaryKey(Long id) {
		return rechargeLogMapper.selectByPrimaryKey(id);
	}

}