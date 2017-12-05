/**
 * Created by renmy on 17-12-5.
 */
//    import weui from 'weui.js';
var vm = this;
//打开地址弹窗
//   后台返回数据格式如下：
    $scope.data=[
        {
           label:'河南省',
           value:'410000',
            children:[
                {
                    label:'商丘市',
                    value:'411400',
                    children:[
                        {
                            label:'虞城县',
                            value:'411425',
                        }

                    ],
                },
                {
                    label:'商丘市',
                    value:'411400',
                    children:[
                        {
                            label:'虞城县',
                            value:'411425',
                        }

                    ],
                },
                {
                    label:'商丘市',
                    value:'411400',
                    children:[
                        {
                            label:'虞城县',
                            value:'411425',
                        }

                    ],
                },
            ]
        },
        {
            label:'浙江省',
            value:'410000',
            children:[
                {
                    label:'杭州市',
                    value:'411400',
                    children:[
                        {
                            label:'江干区',
                            value:'411425',
                        }

                    ],
                },
                {
                    label:'杭州市',
                    value:'411400',
                    children:[
                        {
                            label:'江干区',
                            value:'411425',
                        }

                    ],
                },
                {
                    label:'杭州市',
                    value:'411400',
                    children:[
                        {
                            label:'江干区',
                            value:'411425',
                        }

                    ],
                },
            ]
        },
    ]
    weui.picker($scope.data, {
        depth: 3,
        defaultValue: [0, 0, 0],       //和对应的value一样时，为默认选项
        onChange: function (result) {
            for (let i = 0; i < result.length; i++) {
                $scope.adcNo = result[result.length - 1].value;
            }
        },
        onClose: function (result) {                  //picker关闭后的回调
           console.log('关闭picker')
        },
        onConfirm: function (result) {            //点击确定
            for (let i = 0; i < result.length; i++) {
                if (result.length == 3) {
                    vm.province = result[result.length - 3].label;
                    vm.city = result[result.length - 2].label;
                    vm.area = result[result.length - 1].label;
                } else if (result.length == 2) {
                    vm.province = result[result.length - 2].label;
                    vm.city = result[result.length - 1].label;
                } else {
                    vm.province = result[result.length - 1].label;
                }
                vm.adcNo = result[result.length - 1].value;
            }
            console.log('result1',result,vm.adcNo);
            $scope.$apply();   //更新数据      或者用timeout
        },
        id: 'cascadePicker'
    });




//    时间选择器

        weui.datePicker({
            start: new Date(),     //开始日期
            end: new Date().getFullYear(),   //结束年份
            defaultValue: [new Date().getFullYear(), new Date().getMonth()+1, new Date().getDate()],    //默认
            onConfirm: function(result){
                console.log('result',result[0].label);
                $scope.select.time=result[0].label+result[1].label+result[2].label;
                $scope.$apply();   //更新数据      或者用timeout
            },
            id: 'ma_expect_date',
            className: 'ma_expect_date_picker'
        });

//项目中需求：做到店自提时间，时间显示为本月以及下月整月日期，要求年月在一起，相当与两级联动
// 在填充下月数据时，要注意判断下月是不是下年的1月份，为1个界限
//js实现方式如下
//考虑到数据为两个月，范围不是很大，

// $scope.timeData=[
//     {
//      label:'2017年12月',
//      value:'2017年12月',
//      children:[
//          {
//              label:'5日',
//              value:'5日',
//          },
//          {
//              label:'6日',
//              value:'6日',
//          }
//      ],
//     },
//     {
//         label:'2018年1月',
//         value:'2018年1月',
//         children:[
//             {
//                 label:'1日',
//                 value:'1日',
//             },
//             {
//                 label:'2日',
//                 value:'2日',
//             }
//         ],
//     }
// ];
//以上数据为自己想要的格式
var myTime = new Date();
var day1 = new Date(myTime.getFullYear(), myTime.getMonth() + 1, 0);  //本月
//获取天数：
var daycount1 = day1.getDate();   //获取本月天数
$scope.timeData=[];    //定义数组接收两个月的数据，将arr1,arr2   push数组中;
$scope.arr1 = {
    label: '',
    value:'',
    children: [],
};
$scope.arr2 = {
    label: '',
    value:'',
    children: [],
};
for (var i = myTime.getDate(); i <= daycount1; i++) {
    var label = i + '日';
    var value=i + '日';
    $scope.arr1.children.push({label: label,value:value});
}
$scope.arr1.label=myTime.getFullYear() + '年' + (myTime.getMonth() + 1) + '月';
$scope.arr1.value=myTime.getFullYear() + '年' + (myTime.getMonth() + 1) + '月';
$scope.timeData.push($scope.arr1);

if (myTime.getMonth() + 2 > 12) {     //判断下月是不是下年的1月份
    var day2=new Date((myTime.getFullYear() + 1),(myTime.getMonth() + 2 - 12),0);
    $scope.arr2.label=(myTime.getFullYear() + 1) + '年' + (myTime.getMonth() + 2 - 12) + '月';
    $scope.arr2.value=(myTime.getFullYear() + 1) + '年' + (myTime.getMonth() + 2 - 12) + '月';
}else{
    day2=day1;
    $scope.arr2.label=myTime.getFullYear() + '年' + (myTime.getMonth() + 1) + '月';
    $scope.arr2.value=myTime.getFullYear() + '年' + (myTime.getMonth() + 1) + '月';
}
var daycount2 = day2.getDate();   //获取下月天数
for (var i = 1; i <= daycount2; i++) {
    var label = i + '日';
    var value=i + '日';
    $scope.arr2.children.push({label: label,value:value});
}
$scope.timeData.push($scope.arr2);






