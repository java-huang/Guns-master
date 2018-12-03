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
package cn.stylefeng.guns.modular.system.transfer;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.util.Date;

/**
 * 用户传输bean
 *
 * @author stylefeng
 * @Date 2017/5/5 22:40
 */
@Data
public class UserDto {

    private Integer id;
    private String avatar;
    private String account;
    private String password;
    private String salt;
    private String nickName;
    private String userSignature;
    private String cardNo;
    private String name;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date birthday;
    private Integer sex;
    private String email;
    private String phone;
    private String roleid;
    private String deptid;
    private String regCode;
    private BigDecimal balance;
    private BigDecimal paySum;
    private BigDecimal withdrawSum;
    private String wechatNum;
    private String alipayNum;
    private String qqNum;
    private Integer loginErrorNum;
    private String registerIp;
    private Integer status;
    private Date createtime;
    private Integer isLogin;
    private Date loginTime;

}
