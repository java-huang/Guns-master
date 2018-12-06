package cn.stylefeng.guns.modular.system.service;

import java.util.List;
import java.util.Map;


import cn.stylefeng.guns.modular.system.model.News;

public interface INewsService{
      int questNewsCount(Map<String, Object> map);
      
	  List<News> selectNews(Map<String, Object> paraMap);
	  
	  News queryNewsObject(Long id);
}
