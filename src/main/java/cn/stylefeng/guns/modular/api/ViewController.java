package cn.stylefeng.guns.modular.api;

import static cn.stylefeng.roses.core.util.HttpContext.getIp;

import java.awt.Color;
import java.awt.image.BufferedImage;
import java.io.IOException;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import cn.stylefeng.guns.core.log.LogManager;
import cn.stylefeng.guns.core.log.factory.LogTaskFactory;
import cn.stylefeng.guns.core.shiro.ShiroKit;
import cn.stylefeng.guns.core.util.ValidateCode;
import cn.stylefeng.roses.core.base.controller.BaseController;

@Controller
public class ViewController extends BaseController{
	@RequestMapping( "/index")
    public String index(){
        return "/index.html";
    }

    @RequestMapping( "/register/**")
    public String problem(){
        return "/register.html";
    }
    
    @RequestMapping( "/buying")
    public String buying(){
        return "/gcdt/gcdt.html";
    }
    
    @RequestMapping( "/hmdt")
    public String hmdt(){
        return "/gcdt/hmdt.html";
    }
    
    @RequestMapping( "/charts")
    public String charts(){
        return "/gcdt/zst.html";
    }

    @RequestMapping( "/kjgg")
    public String kjgg(){
        return "/gcdt/kjgg.html";
    }
    
    @RequestMapping( "/news")
    public String zxlb(){
        return "/gcdt/zxlb.html";
    }
    
    @RequestMapping( "/helper")
    public String helper(){
        return "/bzzx/bzzx.html";
    }
    
    @RequestMapping( "/helper/{detail}")
    public String helperDetail(@PathVariable("detail") String detail){
        return "/bzzx/"+detail+".html";
    }
    
    @RequestMapping( "/account")
    public String grzx(){
        return "/personal/grzx.html";
    }
    
    
    @RequestMapping( "/account/{detail}")
    public String grzx(@PathVariable("detail") String detail){
        return "/personal/"+detail+".html";
    }
    /**
     * 跳转到登录页面
     */
    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String login() {
        if (ShiroKit.isAuthenticated() || ShiroKit.getUser() != null) {
            return "/index.html";
        } else {
            return "/login.html";
        }
    }

    /**
     * 退出登录
     */
    @RequestMapping(value = "/logout", method = RequestMethod.GET)
    public String logOut() {
        LogManager.me().executeLog(LogTaskFactory.exitLog(ShiroKit.getUser().getId(), getIp()));
        ShiroKit.getSubject().logout();
        deleteAllCookie();
        return REDIRECT + "/login";
    }
    
    /**
     * 生成验证码
     *
     * @param request
     * @param response
     * @throws IOException
     */
    @RequestMapping(value = "/validateCode")
    public void validateCode(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setHeader("Cache-Control", "no-cache");
        // 获取验证码
        String verifyCode = ValidateCode.generateTextCode(ValidateCode.TYPE_ALL_MIXED, 4, "0Ooil");
        request.getSession().setAttribute("validateCode", verifyCode.toLowerCase());
        response.setContentType("image/jpeg");
        // 生成验证码图片
        BufferedImage bim = ValidateCode.generateImageCode(verifyCode, 120, 40, 5, true, Color.WHITE, null, null);
        // 返回到前台
        ImageIO.write(bim, "JPEG", response.getOutputStream());
    }
}
