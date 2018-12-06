package cn.stylefeng.guns.modular.api;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import cn.stylefeng.guns.core.util.ResponseVO;
import cn.stylefeng.roses.core.base.controller.BaseController;

public class RechargeController extends BaseController{
	
	@RequestMapping(value = "/Account/RechargeRecord", method = RequestMethod.POST)
	public ResponseVO recharge() {
		return new ResponseVO(1);

	}
}