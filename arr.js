//在实际工作中，往往会遇到java返回的数据并不是自己想要的，这样就需要对返回的数据进行一个加工处理，先说下自己的需求，
// 是一个增加商品分类，类似于树状图的功能，包含左右滑动出现对应的新增，编辑，删除，在商品发布中可以选择对应的分类，一对多的关系。
// 举个例子，数据如下：
$scope.lists=[
    {id:111,parentId:null,name:'aaa'},
    {id:112,parentId:null,name:'bbb'},
    {id:113,parentId:111,name:'ccc'},
    {id:114,parentId:111,name:'ddd'},
    {id:115,parentId:112,name:'eee'},
    {id:116,parentId:null,name:'fff'},
];
//有parentId的为子级，并且parentid与父级的id相同，处理如下
$scope.subData=[];//定义数组接收删除的子级
for(var i=0;i<$scope.lists.length;i++){
    $scope.lists[i].checked=false;
    if($scope.lists[i].parentId){
        $scope.subData.push($scope.lists[i]);  //将子级保存在数组
        $scope.lists.splice(i,1);     //删除子级
        i--;   //i值减1是避免下一位数据没有遍历到;
    }
}
console.log('$scope.lists',$scope.lists)
for(var i=0;i<$scope.lists.length;i++){
    $scope.lists[i].subarr=[];      //定义接收子级的数组
    for(var j=0;j<$scope.subData.length;j++){
        if($scope.lists[i].id==$scope.subData[j].parentId){
            $scope.lists[i].subarr.push($scope.subData[j]);
        }
    }
}
$scope.items=$scope.lists;
console.log(' $scope.items', $scope.items);
// 思路：将拿到的数据遍历，添加一个checkd属性用来区分未选中，将parenId
// 值存在的将其添加到事先定义的一个数组subData中，然后将其在原数组中删除，有一点值得注意是，i--，如果不进行减1操作，会出现紧邻的一个数据不会遍历到，接着将父子数组进行比较，父数组元素的id与子数组元素的parentid匹配到就加入到对应的元素下的一个数组中，结果如下
$scope.items=[
    {   id:111,
        name:'aaa',
        subarr:[
            {id:113,parentId:111,name:'ccc'},
            {id:114,parentId:111,name:'ddd'},
        ],
        checked:false
    },
    {
        id:112,
        name:'bbb',
        subarr:[
            {id:115,parentId:112,name:'eee'}
        ],
        checked:false
    },
    {id:116,checked:false,name:'fff'},
];
//最后将选中的分类的id存到一个新的数组中，选中则加入，未选中，则从数组中删除
//定义数组接收选中分类id    classfiyId
$scope.classfiyId=[];
$scope.selectCheck=function (info) {
    info.checked=!info.checked;
    if(info.checked){
        $scope.classfiyId.push(info.id);
    }else{
        for(var i=0;i< $scope.classfiyId.length;i++){
            if(info.id==$scope.classfiyId[i]){
                $scope.classfiyId.splice(i,1);
                break;
            }
        }
    }
    console.log('$scope.classfiyId',$scope.classfiyId);
};
//ps（此时的删除是不用执行i--操作，这种情况属于删除唯一，找到就会删除,终止循环，上面的那一种情况属于删除符合条件的有可能多个，）



// 数组删除已知元素也可以简单写成两种，一种是定义函数进行元素删除，一种是为数组写一个删除方法
// 如下1 通过传入数组与要删除的元素
function removeByValue(arr, val) {
    for(var i=0; i<arr.length; i++) {
        if(arr[i] == val) {
            arr.splice(i, 1);
            break;
        }
    }
}
//2   数组调用方法
Array.prototype.removeByValue = function(val) {
    for(var i=0; i<this.length; i++) {
        if(this[i] == val) {
            this.splice(i, 1);
            break;
        }
    }
};