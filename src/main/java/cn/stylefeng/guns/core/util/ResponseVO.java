package cn.stylefeng.guns.core.util;

public class ResponseVO {
	//版本号
	public static final String VERSION = "v1.0";
	//状态码
	private int state;
	//返回消息
	private String message;
	//版本号
	public String version = VERSION;
	//data对象
	private Object result;
	
	public String getVersion() {
		return version;
	}
	public void setVersion(String version) {
		this.version = version;
	}
	
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}

	public Object getResult() {
		return result;
	}
	public void setResult(Object result) {
		this.result = result;
	}
	public ResponseVO() {
		super();
	}
	
	public int getState() {
		return state;
	}
	public void setState(int state) {
		this.state = state;
	}
	
	public ResponseVO(int state, String message, Object result) {
		super();
		this.state = state;
		this.message = message;
		this.result = result;
	}
	
	public ResponseVO(int state) {
		super();
		this.state = state;
	}
}
