package cn.stylefeng.guns.modular.system.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.baomidou.mybatisplus.service.impl.ServiceImpl;

import cn.stylefeng.guns.core.util.VDateUtils;
import cn.stylefeng.guns.modular.system.dao.NewsMapper;
import cn.stylefeng.guns.modular.system.model.News;
import cn.stylefeng.guns.modular.system.service.INewsService;

@Service
public class NewsServiceImpl extends ServiceImpl<NewsMapper, News> implements INewsService {
	@Resource
	private NewsMapper newsMapper;
	
	@Override
	public List<News> selectNews(Map<String, Object> paraMap) {
		List<News> newsList = newsMapper.selectNews(paraMap);
		if (newsList!=null && newsList.size()>0) {
			for (News news:newsList) {
				news.setCreateTimeStr(VDateUtils.dateToString(news.getCreateTime(), "yyyy-MM-dd HH:mm:ss"));
			}
		}
		return newsList;
	}

	@Override
	public int questNewsCount(Map<String, Object> map) {
		return newsMapper.questNewsCount(map);
	}

	@Override
	public News queryNewsObject(Long id) {
		News news = newsMapper.queryObjectById(id);
		if (news!=null) {
		   news.setCreateTimeStr(VDateUtils.dateToString(news.getCreateTime(), "yyyy-MM-dd HH:mm:ss"));
		}
		return news;
	}
}
