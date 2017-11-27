/**
 * Created by renmy on 17-11-27.
 */
//移动端上传图片并且可以手动旋转并且移动进行一个裁剪
//使用步骤如下
1.npm install photoclip;
2import PhotoClip from 'photoclip';
3 基本配置，下面为实际使用的一个例子;

        //test
        var pc = new PhotoClip('#clipArea', {
            size: [260,260],
            outputSize: 640,
            // adaptive: ['70','40'],
            file: '#file',
            view: '#view',
            ok: '#clipBtn',     
            style:{
                maskColor:'rgba(0,0,0,0.7)',
                // jpgFillColor:''
            },
            //img: 'img/mm.jpg',
            loadStart: function() {
                console.log('开始读取照片');
            },
            loadComplete: function() {
                console.log('照片读取完成',$scope);
                $scope.choosePhote = true;
                $scope.$apply();
            },
            done: function(dataURL) {
                console.log('base64裁剪完成,正在上传');
                $scope.saveImg(dataURL);
            },
            fail: function(msg) {
                alert(msg);
            }
        });

        $scope.saveImg = function (dataUrl) {
            $http({
                method: "POST",
                url: conf.yunApiPath + "/app/5988791a6b869f4e18d5c8d5/org/598878fc6b869f4e0f19fb47/yunFile/b64",
                data: {
                    base64DataUrl: dataUrl
                },
                headers: {
                    'Authorization': 'Bearer ' + loginService.getAccessToken()
                }
            }).then(function (resp) {
                    $scope.dataUrl = resp.data.data;
                    $scope.getImg($scope.dataUrl);
                    console.log(resp.data.data)

                }, function () {
                    //error
                }
            );
        };
        $scope.getImg = function (id) {
            $http({
                method: "GET",
                url: conf.yunApiPath + "/app/5988791a6b869f4e18d5c8d5/org/598878fc6b869f4e0f19fb47/yunFile/" + id,
                headers: {
                    'Authorization': 'Bearer ' + loginService.getAccessToken()
                }
            }).then(function (resp) {
                    $scope.data.img = resp.data.data.cdnUrls[0].url;
                    console.log('imgurl',$scope.data.img );
                    // $scope.realSave(resp.data.data.cdnUrls[0].url)
                    $scope.choosePhote = false;
                }, function () {
                    //error
                }
            );
        };
        //取消图片保存按钮
        $scope.cancelChoosePhote = function () {
            $scope.choosePhote = false;
        };
        //保存
        $scope.save=function () {
            console.log('saveimgurl',$scope.data.img );
            $http({
                method: "PUT",
                url: conf.apiPath + "/brandApp/"+$scope.brandAppId+"/shop/"+ $scope.storeId,
                headers: {
                    'Authorization': 'Bearer ' + loginService.getAccessToken(),
                    "brandApp-Id": $scope.brandAppId
                },
                data:{
                    name:$scope.data.name,
                    img:$scope.data.img,
                    adcNo:vm.adcNo,
                    address:$scope.data.detailAddr,
                    tel:$scope.data.tel
                },
            }).then(function (resp) {
                console.log(resp.data.data);
                if(resp.data.data=='success'){
                    $scope.getInfo();
                    $scope.changeStatus();
                }
            }, function (resp) {
                //error
            });
        };