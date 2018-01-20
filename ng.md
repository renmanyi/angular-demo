/**
 * Created by renmy on 18-1-18.
 */
//常见 ng-repeat用法


// 遍历数组：
<li ng-repeat="item in array">{{item}}</li>

// 遍历对象：key：对象的keyvalue：对象的value
<li ng-repeat="(key,value) in obj">{{key}} | {{value}}</li>


// 遍历对象：控制输出个数
<div ng-repeat="item in items | limitTo: 4">{{item | json }}</div>



绑定$$haskKey:
给每个item绑定唯一ID,当数组发生变化时，ID不变！
<li ng-repeat="item in items track by $id(item)"></li>

    过滤器：
对item的每个属性进行模糊匹配
<li ng-repeat="item in items |filter: 25"></li>


    绑定属性过滤：
对item的某个属性进行模糊匹配
<li ng-repeat="item in items |filter: 25 track by item.age"></li>

    保存匹配结果：
把匹配到的结果另存到results数组变量,可供外部使用
<li ng-repeat="item in items |filter: 25 as results"></li>

    保存针对某个属性的过滤结果：
<li ng-repeat="item in items |filter: 25 as results track by item.age "></li>







对于某些密码，想要在手机上调出数字键盘，同时要隐藏文字。可结合type=tel和 text-security属性达到目的。

input{
    -webkit-text-security:disc;
    text-security:disc; /*使用指定形状代替文字显示 circle圆圈 disc 圆形 square 正方形*/
}



ng-class


1、
<div ng-class {'selected': isSelected, 'car': isCar}"></div>
2、
<div ng-class="{true: 'active', false: 'inactive'}[isActive]"></div>



-webkit-appearance: none;   //去苹果内阴影



常用正则
//匹配两位小数
var pattern= new RegExp("^[0-9]+(.[0-9]{0,2})?$");
//匹配非负整数
var reg = /^\d+$/;




nvm 设置默认 node 版本   nvm alias default v版本号