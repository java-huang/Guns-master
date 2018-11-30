package cn.stylefeng.guns.system;

import cn.stylefeng.guns.base.BaseJunit;
import cn.stylefeng.guns.core.util.Contrast;
import cn.stylefeng.guns.modular.system.dao.UserMapper;
import org.junit.Test;

import javax.annotation.Resource;

/**
 * 用户测试
 *
 * @author fengshuonan
 * @date 2017-04-27 17:05
 */
public class UserTest extends BaseJunit {

    @Resource
    UserMapper userMapper;

    public static void main(String[] args) {
		System.out.println(Contrast.getStringRandom(6));
	}

}
