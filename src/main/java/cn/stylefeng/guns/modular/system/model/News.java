package cn.stylefeng.guns.modular.system.model;

import java.io.Serializable;
import java.util.Date;

import com.baomidou.mybatisplus.activerecord.Model;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;
import com.baomidou.mybatisplus.enums.IdType;

@TableName("sys_news")
public class News extends Model<News>{

	private static final long serialVersionUID = 1L;
	
	/**
     * 主键
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;
    
    /**
     * 标题
     */
    private String newsTitle;
    /**
     * 内容
     */
    private String newsDetail;
    /**
     * 类型
     */
    private byte newsType;
    /**
     * 创建时间
     */
    private Date createTime;
    /**
     * 创建人
     */
    private String createUser;
    
    private String createTimeStr;


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getNewsTitle() {
		return newsTitle;
	}


	public void setNewsTitle(String newsTitle) {
		this.newsTitle = newsTitle;
	}


	public String getNewsDetail() {
		return newsDetail;
	}


	public void setNewsDetail(String newsDetail) {
		this.newsDetail = newsDetail;
	}


	public byte getNewsType() {
		return newsType;
	}


	public void setNewsType(byte newsType) {
		this.newsType = newsType;
	}

	public Date getCreateTime() {
		return createTime;
	}


	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}


	public String getCreateUser() {
		return createUser;
	}


	public void setCreateUser(String createUser) {
		this.createUser = createUser;
	}

	public String getCreateTimeStr() {
		return createTimeStr;
	}


	public void setCreateTimeStr(String createTimeStr) {
		this.createTimeStr = createTimeStr;
	}


	@Override
	protected Serializable pkVal() {
		 return this.id;
	}
}
