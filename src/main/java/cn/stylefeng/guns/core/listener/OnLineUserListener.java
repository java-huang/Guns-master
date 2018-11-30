package cn.stylefeng.guns.core.listener;

import java.util.LinkedList;
import java.util.List;

import javax.servlet.annotation.WebListener;
import javax.servlet.http.HttpSessionAttributeListener;
import javax.servlet.http.HttpSessionBindingEvent;

import cn.stylefeng.guns.core.shiro.ShiroUser;

@WebListener
public class OnLineUserListener implements HttpSessionAttributeListener{
	 /**
     * 存放在线用户列表
     */
    public static List<Object> onLineUserList = new LinkedList<Object>();

    /**
     * 根据用户ID，查询用户是否在线
     * @param userId  用户ID
     * @return  true:表示用户在线   false:表示用户离线
     */
    public static boolean findUserOnLine(Integer userId){
            return onLineUserList.contains(userId);
    }
    

    /**
     * 用户登录时候，把用户的信息存到userSession里
     * UserSession类的结构很简单，只有userId,userName两个属性
     */
    @Override
    public void attributeAdded(HttpSessionBindingEvent se) {
            if ("username".equals(se.getName())){
                    /**
                     * 用户上线的话，把用户的ID，添加到onLineUserList里
                     */
                    Integer userId = ((ShiroUser)se.getValue()).getId();
                    onLineUserList.add(userId);
                    System.out.println("用户ID："+userId + " 上线了");
            }
    }

    @Override
    public void attributeRemoved(HttpSessionBindingEvent se) {
            if ("username".equals(se.getName())){
                    /**
                     * 用户下线的话，把用户的ID，从onLineUserList中移除
                     */
                    Integer userId = ((ShiroUser)se.getValue()).getId();
                    onLineUserList.remove(userId);
                    System.out.println("用户ID："+userId + " 下线了");
            }
    }


	@Override
	public void attributeReplaced(HttpSessionBindingEvent se) {
		// TODO Auto-generated method stub
		
	}
}
