package cn.stylefeng.guns.modular.system.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.baomidou.mybatisplus.mapper.BaseMapper;

import cn.stylefeng.guns.modular.system.model.News;

@Mapper
public interface NewsMapper extends BaseMapper<News>{
	 List<News> selectNews(Map<String, Object> paraMap);
	 
	 int questNewsCount(Map<String, Object> map);
	 
	 News queryObjectById(long id);
}