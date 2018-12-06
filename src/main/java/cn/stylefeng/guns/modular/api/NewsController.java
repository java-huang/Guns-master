package cn.stylefeng.guns.modular.api;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import cn.stylefeng.guns.modular.system.model.News;
import cn.stylefeng.guns.modular.system.service.INewsService;
import cn.stylefeng.roses.core.base.controller.BaseController;

@RestController
public class NewsController  extends BaseController{
	@Autowired
	private INewsService newsService;
	
	@RequestMapping( "/news")
	public ModelAndView  queryNewsList(HttpServletRequest request,HttpServletResponse response,Integer pageNow) {
		ModelAndView mav = new ModelAndView("gcdt/zxlb");
		
		/**分页处理*/
        Integer pageCount = 0; /**总页数*/
        Integer dataCount = 0; /**总记录数*/
        Integer pageSize = 10;  /**每页显示数*/
        if(null == pageNow || pageNow == 0){
            pageNow = 1;
        }
        Map<String, Object> queryMap = new HashMap<String, Object>();
        dataCount = newsService.questNewsCount(queryMap);
        if(dataCount>0){/**存在记录*/
            /**得到总页数*/
            pageCount = dataCount%pageSize==0?dataCount/pageSize:(dataCount/pageSize)+1;
            
            /**纠错*/
            if(pageNow>pageCount){
                pageNow = pageCount;
            }else if(pageNow<1){
                pageNow = 1;
            }
            
            queryMap.put("pageNow", pageNow);
            queryMap.put("pageSize", pageSize);
            List<News> list = newsService.selectNews(queryMap);
            
            mav.addObject("list", list);
            /** 查询我购买的课程总数 */
            mav.addObject("count", dataCount);
            mav.addObject("pageNow", pageNow);
            mav.addObject("pageCount", pageCount);
        }
		return mav;
	}
	
	@RequestMapping( "/news/detail/{id}")
	public ModelAndView  queryNewsList(@PathVariable ("id") Long id) {
		ModelAndView mav = new ModelAndView("gcdt/newsDetail");
		News  news = newsService.queryNewsObject(id);
		mav.addObject("news",news);
		return mav;
	}
}
