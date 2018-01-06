var chart = chart || {};
(function (_self) {
	_self.bind = function () {
		_self.initData();
		_self.setTimeFunc();
	};
	_self.timers;
	//设置定时器，每隔5分钟刷新
	_self.setTimeFunc=function(str){
		_self.timers=setInterval(function(){
			_self.initTemplate('update');
		},5*60*1000);
	};
	_self.initData = function () {
		_self.initHos().then((res)=>{
			_self.initTemplate('init');
		});
		//搜索
		$('#analyse-search').off('click').on('click',function(){
			//关闭定时器
			clearInterval(_self.timers);
			_self.setTimeFunc();
			$('#order-mask-bg').css('display','block');
			$('#order-mask').css('display','block');
			_self.initTemplate('update');
		})
		$('.org_hos').on('change',_self.initBranch);
	};
	//管理工作台的三个chart
	//订单数据
	_self.initChart1=function(orderTypeN,orderTypeONE){
		let self = this;
        let dataStyle = {
            normal: {
                label: {
                    show: false
                },
                labelLine: {
                    show: false
                },
            }
        };
        let placeHolderStyle = {
            normal: {
                color: '#2BD6BD',
                label: {
                    show: false
                },
                labelLine: {
                    show: false
                }
            },
        };
        _self.chart01 = echarts.init(document.getElementById('chartpic1'));
        _self.chart01.setOption({
            title: {
//              text: parseInt(orderTypeN + orderTypeONE)<10?'  '+parseInt(orderTypeN + orderTypeONE)+'单':parseInt(orderTypeN + orderTypeONE)+'单',
                text:parseInt(orderTypeN + orderTypeONE)+'单',
                x: 'center',
            	y: 'center',
                textStyle: {
                    fontWeight: 'normal',
                    color: "#000",
                    fontSize: 40
                }
            },
            backgroundColor: '#fff',
            color: ['#FCAB53','#2BD6BD'],
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
            	show:false,
              	orient: 'vertical',
		        bottom: '10%',
		        data:['普陪订单'+'　　'+orderTypeN+'单','专陪订单'+'　　'+orderTypeONE+'单'],
		        textStyle:{
		            fontSize:18
		        },
		        selectedMode:false,
            },
            series: [{
                name: '订单数据',
                type: 'pie',
                clockWise: true,
                center: ['50%', '50%'],
                radius: ['70%','80%'],
                itemStyle: dataStyle,
                hoverAnimation: false,
                startAngle:180,
                data: [{
                    value: orderTypeN,
                    name: '普陪订单'+'　　'+orderTypeN+'单',

                }, {
                    value: orderTypeONE,
                    name: '专陪订单'+'　　'+orderTypeONE+'单',
                    itemStyle: placeHolderStyle
                }

                ]
            },
            ]
        })
	}
	_self.chart01='';
	_self.chart02='';
	_self.chart03='';
	//管理员数据
	_self.initChart2=function(hgN,hgONE){
		let self = this;
        let dataStyle = {
            normal: {
                label: {
                    show: false
                },
                labelLine: {
                    show: false
                },
            }
        };
        let placeHolderStyle = {
            normal: {
                color: '#2BD6BD',
                label: {
                    show: false
                },
                labelLine: {
                    show: false
                }
            },
        };
        _self.chart02 = echarts.init(document.getElementById('chartpic2'));
        _self.chart02.setOption({
            title: {
                text: parseInt(hgN+hgONE) +'人',
                x: 'center',
            	y: 'center',
                textStyle: {
                    fontWeight: 'normal',
                    color: "#000",
                    fontSize: 40
                }
            },
            backgroundColor: '#fff',
            color: ['#FCAB53','#2BD6BD'],
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
            	show:false,
              	orient: 'vertical',
		        bottom: '10%',
		        data:['普陪护理员'+'　　'+hgN+'人','专陪护理员'+'　　'+hgONE+'人'],
		        textStyle:{
		            fontSize:18
		        },
		        selectedMode:false,
            },
            series: [{
                name: '护理员数据',
                type: 'pie',
                clockWise: true,
                center: ['50%', '50%'],
                radius: ['70%','80%'],
                itemStyle: dataStyle,
                hoverAnimation: false,
                startAngle:180,
                data: [{
                    value: hgN,
                    name: '普陪护理员'+'　　'+hgN+'人',

                }, {
                    value: hgONE,
                    name: '专陪护理员'+'　　'+hgONE+'人',
                    itemStyle: placeHolderStyle
                }

                ]
            },
            ]
        })
	}
	//评价详情
	_self.initChart3=function(one,two,three,four,five){
		let self = this;
        let dataStyle = {
            normal: {
                label: {
                    show: false
                },
                labelLine: {
                    show: false
                },
            }
        };
        let placeHolderStyle1 = {
            normal: {
                color: '#FFCCFF',
                label: {
                    show: false
                },
                labelLine: {
                    show: false
                }
            },
        };
        let placeHolderStyle2 = {
            normal: {
                color: '#2BD6BD',
                label: {
                    show: false
                },
                labelLine: {
                    show: false
                }
            },
        };
        let placeHolderStyle3 = {
            normal: {
                color: '#9900FF',
                label: {
                    show: false
                },
                labelLine: {
                    show: false
                }
            },
        };
        let placeHolderStyle4 = {
            normal: {
                color: '#169BD5',
                label: {
                    show: false
                },
                labelLine: {
                    show: false
                }
            },
        };
       	_self.chart03 = echarts.init(document.getElementById('chartpic3'));
        _self.chart03.setOption({
        	 tooltip : {
		        // trigger: 'axis'
		    },
		    xAxis : [
		        {
		            type : 'category',
		            data : ['5分','4分','3分','2分','1分'],
		            axisLabel: {
		                textStyle: {
		                    color: "#666",
		                    fontSize: 20,
		                }
		            },
		        }
		    ],
		    yAxis : [
		        {
		        	show:false,
		            type : 'value'
		        }
		    ],
		    label: {
	            normal: {
	                show: true,
	                position: 'top',
	                formatter: '{c}'+'条'
	            }
	        },
		    series : [
		        {
		            name:'服务评价详情',
		            type:'bar',
		            barWidth: '30%',
		            data:[five, four, three, two, one],
		           itemStyle: {
		                normal: {
		                    color: function(params) {
		                        // build a color map as your need.
		                        var colorList = [
		                          '#FCAB53','#2BD6BD','#D667CD','#8C88FF','#6563A4',
		                        ];
		                        return colorList[params.dataIndex]
		                    }
		                }
		            }
		        }
		    ]
        })
	}
	//init财务管理列表
	_self.initWorkData='';//init的数据
	_self.initHos=function(){
		let dtd = $.Deferred();
		let httpUtilObj = new HttpUtil();
		let data={
			orgId:0,
			branchId:0,
		};
		httpUtilObj.ajax({
			url: '/adminjson/SAASGetTurnkeyInfo',
			params: data
		}).then((res)=>{//org_hos--
			if(res.body.noData==1){
				$('#order-mask-bg').css('display','none');
				$('#order-mask').css('display','none');
				$('.workmanage-box').css('display','none');
				$('.workmanage-noLimit').css({
					'display':'block',
					'padding':'0',
				});
				$('#ttt_body').css({
					'padding':'0',
				});
				return false;
			}
			$('#ttt_body').css({
					'padding':'8px 0',
				})
			$('.workmanage-box').css('display','block');
			$('.workmanage-noLimit').css('display','none');
			_self.initWorkData=res.body;
			let hosBranchData=res.body.rightJson;
			$('#order-mask-bg').css('display','none');
			$('#order-mask').css('display','none');
			$('.org_comment').attr('orgid',data.orgId);
			$('.org_comment').attr('branchid',data.branchId);
			if(hosBranchData.isAll==0){//0-都可以  1-机构
				$('.row.service-type').css('display','block');
				$('.row.service-type .data-analyse').css('display','block');
			}else{
				if(hosBranchData.isAll==3){
					$('.row.service-type').css('display','none');
				}else{
					$('.row.service-type').css('display','block');
				}
				$('.row.service-type .data-analyse').css('display','none');
			}
			let org_data=hosBranchData.orgList;
			_self.branchList=hosBranchData.branchMap;
			$('.org_hos').empty();
			if(org_data.length>1){
				$('.org_hos').append(`<option id="0">所有项目点</option>`);
			}
			org_data.forEach((item,index)=>{
				let optionNode='';
				optionNode=`
					<option id="${item.id}">${item.orgName}</option>
				`;
				$('.org_hos').append(optionNode);
			});
			_self.initBranch().then((res)=>{
				dtd.resolve();
				return dtd.promise();
			})
		},(res)=>{
			$('#order-mask-bg').css('display','none');
			$('#order-mask').css('display','none');
		})
		return dtd.promise();
	};
	_self.branchList=[];//work的branch数据集
	_self.initBranch=function(){//org_branch
		//关闭定时器
		clearInterval(_self.timers);
		_self.setTimeFunc();
		let dtd = $.Deferred();
		let data=_self.branchList[$('.org_hos option:selected').attr('id')];
		$('.org_branch').empty();
		if(data==undefined||!data.length||_self.isEmpty(_self.branchList)||$('.org_hos option:selected').attr('id')==0){
			$('.org_branch').addClass('org_hide');
			dtd.resolve();
			return dtd.promise();
		}
		$('.org_branch').removeClass('org_hide');
		if(data.length>1){
			$('.org_branch').append(`<option id="0">所有科室</option>`);
		}
		data.forEach((item,index)=>{
			let optionNode='';
			optionNode=`
				<option id="${item.id}">${item.branchName}</option>
			`;
			$('.org_branch').append(optionNode);
		});
		dtd.resolve();
		return dtd.promise();
	};
	_self.isEmpty=function(obj) {
		for (var name in obj) {
			return false;
		}
		return true;
	}
	//更新表格
	_self.initTemplate = function (str) {
		let httpUtilObj = new HttpUtil();
		let data={
			orgId:$('.org_hos option:selected').attr('id')||0,
			branchId:$('.org_branch  option:selected').attr('id')||0,
		};
		httpUtilObj.ajax({
			url: '/adminjson/SAASGetTurnkeyInfo',
			params: data
		}).then((res)=>{
			$('#order-mask-bg').css('display','none');
			$('#order-mask').css('display','none');
			_self.refreshTemplate(res.body);
			$('.org_comment').attr('orgid',data.orgId);
			$('.org_comment').attr('branchid',data.branchId);
		})
	};
	_self.refreshTemplate=function(data){
		//bind事件
		_self.refreshBind();
		//汇总数据
		_self.allSum(data);
		//orderTypeN-普陪 orderTypeONE-专陪
		//订单数量
		$('.pic1 dl dd:nth-child(1) span em').html(data.orderTypeN);
		$('.pic1 dl dd:nth-child(2) span em').html(data.orderTypeONE);
		//护理员数据
		$('.pic2 dl dd:nth-child(1) span em').html(data.hgN);
		$('.pic2 dl dd:nth-child(2) span em').html(data.hgONE);
		//评论总数
		$('.pic3 dl dd:nth-child(1) span em').html(data.praiseCount);
		$('.pic3 dl dd:nth-child(2) span em').html(data.averagePraiseScore);
		//饼图
		_self.initChart1(data.orderTypeN,data.orderTypeONE);//初始化饼图
		_self.initChart2(data.hgN,data.hgONE);//初始化饼图
		_self.initChart3(data.oneNumber,data.twoNumber,data.threeNumber,data.fourNumber,data.fiveNumber);//初始化饼图
		setTimeout(function (){
        	window.onresize = function(){
			    _self.chart01.resize();
			    _self.chart02.resize();
			    _self.chart03.resize();
			};
        },200);
	}
	_self.allSum=function(data){
		let pNode=$('.sum-content ul li p');
		pNode.eq(0).html(data.orderCount);
		pNode.eq(1).html(data.orderAdd);
		pNode.eq(2).html(data.orderUnderway);
		pNode.eq(3).html(data.orderEnd);
		pNode.eq(4).html(data.hgNumber);
		pNode.eq(5).html(data.hgUnderwayNumber);
		pNode.eq(6).html(data.averagePraiseScore);
	}
	_self.refreshBind = function (count) {
		//pop提示
		$('.popover-rel').popover({
			'trigger':'hover',
		});
		//进入机构评价/科室评价
		$('.org_comment').off('click').on('click',function(){
			let title="";
			let order_link="";
			let data = {
    			orgId:$(this).attr('orgId'),
    			branchId:$(this).attr('branchId'),
			};
			if(data.branchId==0){
				order_link="templates/org_comment.html";
				title = "机构评价";
			}else{
				order_link="templates/branch_comment.html";
				title = "科室评价";
			}
    		top.tm.addTab(title,order_link,data);
		})
	};
	_self.bind();
})(chart)
