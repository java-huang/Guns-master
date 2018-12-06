/**
 * Copyright 2018-2020 stylefeng & fengshuonan (https://gitee.com/stylefeng)
 * <p>
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * <p>
 * http://www.apache.org/licenses/LICENSE-2.0
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package cn.stylefeng.guns.modular.system.controller;

import static cn.stylefeng.roses.core.util.HttpContext.getIp;

import java.util.Date;

import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import cn.stylefeng.guns.core.common.annotion.BussinessLog;
import cn.stylefeng.guns.core.common.constant.dictmap.UserDict;
import cn.stylefeng.guns.core.common.constant.state.ManagerStatus;
import cn.stylefeng.guns.core.log.LogManager;
import cn.stylefeng.guns.core.log.factory.LogTaskFactory;
import cn.stylefeng.guns.core.shiro.ShiroKit;
import cn.stylefeng.guns.core.shiro.ShiroUser;
import cn.stylefeng.guns.core.util.Contrast;
import cn.stylefeng.guns.core.util.ResponseVO;
import cn.stylefeng.guns.modular.system.factory.UserFactory;
import cn.stylefeng.guns.modular.system.model.User;
import cn.stylefeng.guns.modular.system.service.IUserService;
import cn.stylefeng.guns.modular.system.transfer.UserDto;
import cn.stylefeng.roses.core.base.controller.BaseController;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

/**
 * 登录控制器
 *
 * @author fengshuonan
 * @Date 2017年1月10日 下午8:25:24
 */
@RestController
public class LoginController extends BaseController {

    @Autowired
    private IUserService userService;


    /**
     * 点击登录执行的动作
     */
    @RequestMapping(value = "/doLogin", method = RequestMethod.POST)
    public ResponseVO loginVali(HttpSession session) {

        String username = super.getPara("account").trim();
        String password = super.getPara("password").trim();
        String remember = super.getPara("remember");
        String activeCode = super.getPara("vercode").trim(); //获取用户输入验证码
        String code = (String) session.getAttribute("validateCode");

        //验证验证码是否正确
        if (StringUtils.isBlank(activeCode) || !StringUtils.equals(code, activeCode.toLowerCase())) {
              return new ResponseVO(3,"验证码输入错误",null);
        }

        Subject currentUser = ShiroKit.getSubject();
        UsernamePasswordToken token = new UsernamePasswordToken(username, password.toCharArray());

        if ("on".equals(remember)) {
            token.setRememberMe(true);
        } else {
            token.setRememberMe(false);
        }

        User user = userService.getByAccount(username);
      //账号不存在、密码错误ShiroKit.md5(oldPwd, user.getSalt()
  		if(user == null || !user.getPassword().equals(ShiroKit.md5(password, user.getSalt()))) {
  			return new ResponseVO(3,"用户名或密码错误","/login");
  		}
  		user.setLoginTime(new Date());
  		user.setIsLogin(1);
  		userService.updateUser(user);
  		
        currentUser.login(token);
        ShiroUser shiroUser = ShiroKit.getUser();
        
        super.getSession().setAttribute("shiroUser", user);
        super.getSession().setAttribute("username", shiroUser.getAccount());

        LogManager.me().executeLog(LogTaskFactory.loginLog(shiroUser.getId(), getIp()));

        ShiroKit.getSession().setAttribute("sessionFlag", true);
        if (shiroUser!=null && StringUtils.isNoneBlank(shiroUser.getAccount())) {
			return new ResponseVO(2,null,"/index");
		}else
		   return new ResponseVO(3,"用户名或密码错误","/login");
    }
    
    /**
     * 注册用户
     */
    @RequestMapping("/registerUser")
    @BussinessLog(value = "注册用户", key = "account", dict = UserDict.class)
    @ResponseBody
    public ResponseVO add(@Valid UserDto user,HttpSession session) {
        
       
        String activeCode = super.getPara("vercode").trim(); //获取用户输入验证码
        String code = (String) session.getAttribute("validateCode");

        //验证验证码是否正确
        if (StringUtils.isBlank(activeCode) || !StringUtils.equals(code, activeCode.toLowerCase())) {
              return new ResponseVO(3,"验证码输入错误",null);
        }
        
        // 判断账号是否重复
        User theUser = userService.getByAccount(user.getAccount());
        if (theUser != null) {
        	return new ResponseVO(3,"该用户已经注册","/register");
        }
        String pwd = user.getPassword();
        // 完善账号信息
        user.setSalt(ShiroKit.getRandomSalt(5));
        user.setPassword(ShiroKit.md5(pwd, user.getSalt()));
        user.setRegCode(Contrast.getStringRandom(6));
        user.setStatus(ManagerStatus.OK.getCode());
        user.setCreatetime(new Date());
        user.setLoginTime(new Date());
        boolean flag = this.userService.insert(UserFactory.createUser(user));
        
        if (flag) {
        	Subject currentUser = ShiroKit.getSubject();
        	UsernamePasswordToken token = new UsernamePasswordToken(user.getAccount(), pwd.toCharArray());
        	currentUser.login(token);
            ShiroUser shiroUser = ShiroKit.getUser();
            super.getSession().setAttribute("shiroUser", shiroUser);
        	return new ResponseVO(2,null,"/index");
		}
        return new ResponseVO(3,"注册失败","/register");
    }
}
