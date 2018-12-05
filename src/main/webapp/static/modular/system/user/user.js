/**
 * 用户列表
 */
var User = {
    id: "userTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
User.initColumn = function () {
    var columns = [
        // {field: 'selectItem', radio: false, visible: false},
        {title: 'ID', field: 'id', visible: false, align: 'center', valign: 'middle'},
        {title: '账号', field: 'account', align: 'center', valign: 'middle', sortable: true},
        {title: 'QQ', field: 'qq_num', align: 'center', valign: 'middle', sortable: true},
        {title: '昵称', field: 'nick_name', align: 'center', valign: 'middle', sortable: true},
        {
            title: '状态',
            field: 'is_login',
            align: 'center',
            valign: 'middle',
            sortable: true,
            formatter: function (value, row, index) {
                if (value == 1) {
                    return "在线";
                } else {
                    return "离线";
                }
            }
        },
        {title: '余额', field: 'balance', align: 'center', valign: 'middle', sortable: true},
        {title: '提现', field: 'withdraw_sum', align: 'center', valign: 'middle', sortable: true},
        {title: '充值', field: 'pay_sum', align: 'center', valign: 'middle', sortable: true},
        {title: '归属', field: '', align: 'center', valign: 'middle', sortable: true},
        {
            title: '标识',
            field: 'status',
            align: 'center',
            valign: 'middle',
            sortable: true,
            formatter: function (value, row, index) {
                if (value === 1)
                    return "正常";
                else if (value === 2)
                    return "冻结";
                else
                    return "已删除";
            }
        },
        {title: '注册时间', field: 'createtime', align: 'center', valign: 'middle', sortable: true},
        {title: '登录时间', field: 'login_time', align: 'center', valign: 'middle', sortable: true},
        {
            title: '操作',
            field: '',
            align: 'center',
            width: '9%',
            formatter: function (value, row, index) {
                var txt = '';
                txt += '<button type="button" class="btn btn-primary btn-xs" onclick="User.openUserPay(' + row.id + ',' + row.status + ')">充值</button>&nbsp;';
                if (row.status === 3)
                    txt += '<button type="button" class="btn btn-primary btn-xs" onclick="User.openDelMgr(' + row.id + ', \'' + row.account + '\', 1)">恢复</button>&nbsp;';
                else
                    txt += '<button type="button" class="btn btn-primary btn-xs" onclick="User.openDelMgr(' + row.id + ', \'' + row.account + '\', 3)">删除</button>&nbsp;';
                txt += '<button type="button" class="btn btn-primary btn-xs" onclick="User.openChangeUser(' + row.id + ')">修改</button>';
                return txt;
            }
        }
    ]
    return columns;
};


/**
 * 检查是否选中
 */
User.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if (selected.length == 0) {
        Feng.info("请先选中表格中的某一记录！");
        return false;
    } else {
        User.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加管理员
 */
User.openAddMgr = function () {
    var index = layer.open({
        type: 2,
        title: '新增虚拟用户',
        area: ['500px', '300px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/mgr/user_add'
    });
    this.layerIndex = index;
};

/**
 * 点击充值按钮时
 */
User.openUserPay = function (userId, status) {
    if (status == 3) {
        Feng.error("操作失败!该用户已经删除!");
        return false;
    }
    var index = layer.open({
        type: 2,
        title: '请输入充值金额（可以为负数）',
        area: ['500px', '300px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/mgr/user_pay/' + userId
    });
    this.layerIndex = index;
};

/**
 * 点击修改按钮时
 */
User.openChangeUser = function (userId) {
    var index = layer.open({
        type: 2,
        title: '编辑用户',
        area: ['800px', '400px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/mgr/user_edit/' + userId
    });
    this.layerIndex = index;
};

/**
 * 点击删除按钮时
 *
 * =1启动 =3删除
 */
User.openDelMgr = function (userId, account, type) {
    var text = '删除';
    if (type == 1)
        text = '恢复';
    var operation = function () {
        var ajax = new $ax(Feng.ctxPath + "/mgr/delete", function () {
            Feng.success(text + "成功!");
            User.table.refresh();
        }, function (data) {
            Feng.error(text + "失败!" + data.responseJSON.message + "!");
        });
        ajax.set("userId", userId);
        ajax.set("type", type);
        ajax.start();
    };

    Feng.confirm("确定" + text + "&nbsp;[&nbsp;<span style=\"color: red;\">" + account + "</span>&nbsp;]&nbsp;吗？", operation);

};

/**
 * 查询表单提交参数对象
 * @returns {{}}
 */
User.formParams = function () {
    var userDto = {};
    userDto.name = $("#userName").val();
    userDto.beginTime = $("#beginTime").val();
    userDto.endTime = $("#endTime").val();
    userDto.roleid = $("#roleid").val();
    return userDto;
};

/**
 * 搜索角色
 */
User.search = function () {
    User.table.refresh({query: User.formParams()});
};

$(function () {
    var defaultColunms = User.initColumn();
    var table = new BSTable(User.id, "/mgr/list", defaultColunms);
    table.setPaginationType("client");
    table.setQueryParams(User.formParams());
    table.init();
    User.table = table;
});
