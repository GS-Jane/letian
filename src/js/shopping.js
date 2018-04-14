;
require(['config'],function(){
    require(['jquery'],function($){
        jQuery(function($){
            //头部引入
            $('#head').load('../html/head.html');
            //尾部引入
            $('#foot').load('../html/foot.html');

            //把加入到数据库的商品显示在页面
                $.ajax({
                    url:'../api/shopping.php',
                    dataType:'json',
                    success:function(data){
                        let res = data.map(function(item){
                            // test(item.id);
                           
                            return`
                                    <tr data-id="${item.id}">
                                        <td class="tboy1"><input type="checkbox" class="choice"/></td>
                                        <td class="tboy2">
                                            <img src="${item.imgs}"  />
                                            <p><span class="san">三小时前</span> <span class="cx">畅销</span></p>
                                            <p><span class="ys">${item.name} </span><span class="ys1">${item.shorthand}</span></p>
                                            <p class="h1">${item.englishname}</p>
                                            <p class="hw">[이으진생데스까르고]</p>
                                            <p class="bk">不可用购物车优惠券</p>
                                        </td>
                                        <td class="xsj">
                                             $<span class="xsj_s">${item.price}</span>
                                        </td>
                                        <td class="qty">
                                            <div>
                                                <a href="avascript:0;" class="jian">-</a>
                                                <input type="text" value="${item.qty}" class="qty_txt"/>
                                                <a href="avascript:0;" class="jia">+</a>
                                            </div>
                                        </td>
                                        <td class="xj col2_xj">${item.price*item.qty}</td>
                                        <td class="xz">
                                            <a href="avascript:0;" class="lj">立即购买</a>
                                            <a href="avascript:0;" class="bl">保留在购物车</a>
                                            <a href="avascript:0;" class="sc">删除</a>
                                        </td>
                                    </tr>`
                            
                        }).join('');                   
                        $('.tboy').append(res);
                    }

                });
            
            // var test = function(data){
            //     console.log(data);
            // }

                
           
            // $('.tboy').on('click','.choice',function(){
            //     var $tr = $(this).closest('tr');
            //     let $price = $tr.find('.xsj_s').text();
            //     // console.log($price)
            //     let total = 0;
            //     let $qtys = $tr.find('.qty_txt').val();
            //     total += $price*$qtys;
            //     $('.zong').text('总计：'+total.toFixed(2))
            // })

            //点击增加
            $('.tboy').on('click','.jia',function(){
                var $tr = $(this).closest('tr');


                let $id = $tr.attr('data-id');
                let $price = $tr.find('.xsj_s').text();
                 // console.log($tr.find('.xsj_s').text());
                let total = 0;
                // console.log($id);
                // console.log($('.qty_txt')[0].value)
                // let $qtys = $('.qty_txt')[0].value*1+1;
                let $qtys = $tr.find('.qty_txt').val()*1+1;
                    $tr.find('.qty_txt').val($qtys);
                    // console.log($qtys)
                    total += $price*$qtys;
                    $tr.find('.xj').text(total.toFixed(2))
                     // console.log($tr.find('.xj').text(total.toFixed(2)));
                $.ajax({
                    url:'../api/change.php',
                    type:'get',
                    data:{
                        id:$id,
                        qty:$qtys
                    },
                    success:function(data){
                        // console.log(data)
                    }
                })   
                
            })

            //点击减少
            $('.tboy').on('click','.jian',function(){
                var $tr = $(this).closest('tr');

                let $id = $tr.attr('data-id')
                let $price = $tr.find('.xsj_s').text();
                 let total = 0;
                // console.log($id);
                // console.log($('.qty_txt')[0].value)
                // let $qtys = $('.qty_txt')[0].value*1+1;
              
                let $qtys = $tr.find('.qty_txt').val()*1-1;
                total += $price*$qtys;

                $tr.find('.xj').text(total.toFixed(2));
                    //判断当前的减少的数量少于1，则等于1
                    if(!$qtys<1){
                        
                            $.ajax({
                                url:'../api/change.php',
                                type:'get',
                                data:{
                                    id:$id,
                                    qty:$qtys
                                },
                                success:function(data){
                                    // console.log(data)

                                }

                            })
                            $tr.find('.qty_txt').val($qtys);  
                            
                    }
                    // console.log($qtys)
                   
            })

            // 全选按钮状态
            // 判断复选框数量与勾选的数量是否相等
                function checkAll(){
                    $checkbox = $('.tboy :checkbox');
                    $checked = $('.tboy :checked');
                    $('#check_all').prop('checked',$checkbox.length === $checked.length);
                }
            
            //点击任意位置勾选当前行，计算价格
                // var $zongji = 0;
                let $xiaoji = 0;
                let $zongj = 0;
            $('.tboy').on('click','.tboy1 input',function(e){
                    // console.log(this,e.target)
                   $(this).toggleClass('selected').find(':checkbox')
                   .prop('checked',$(this).hasClass('selected'));
                    // let $xiaoji = 0;
                    // 获取当前的tr，
                    let $tr = $(this).closest('tr');
                    //获取当前的价格
                    let $xiaoji = $tr.find('.xj').text()*1;
                    // console.log($xiaoji)
                    // console.log($zongj)
                    // 判断input是否勾选
                    if($(this)[0].checked){
                        // console.log($zongj)
                        $zongj += $xiaoji*1;
                        // console.log($zongj);
                        $zongj=$zongj.toFixed(2)*1;
                        // console.log($zongj);
                        $('.zong').text('总计:'+$zongj);
                        // console.log($zongj.toFixed(2))
                        // $xiaoji = 0;
                        // $zongji=0;
                    }else{
                        // console.log($zongj)
                        $zongj -= $xiaoji*1;
                        $zongj=$zongj.toFixed(2)*1;
                        // console.log($xiaoji)
                        $('.zong').text('总计:'+$zongj);
                        // $xiaoji = 0;
                        // $zongji=0;
                    }
                    // if($('.choice').is(':checked')){console.log(666)
                    //     var $tr = $(this).closest('tr');
                    //     let $price = $tr.find('.xsj_s').text();
                    //     // console.log($price)
                    //     let total = 0;
                    //     let $qtys = $tr.find('.qty_txt').val();
                    //     total += $price*$qtys;
                    //     $('.zong').text('总计：'+total.toFixed(2))
                        
                    // }else{console.log(111)
                    //     $('.zong').text('总计:0.00' )
                    // }
                    
                    checkAll();
            })
                
            //全选，计算价格
            $('#check_all').on('click',function(){
                $xiaoji = 0;
                $zongj = 0;
                $('.tboy tr').toggleClass('selected').find(':checkbox').prop('checked',this.checked);
                    // let $tr = $('.tboy1').closest('tr');
                
                    let xjs = $('.xj'); 
                    //遍历循环得到每个tr的价格
                    for(let i=0;i<xjs.length;i++){
                        
                        let $xj = xjs[i].innerText*1;
                        
                        $xiaoji += $xj;
                    }
                    //判断input是否勾选
                    if($(this)[0].checked){
                        $zongj = $xiaoji*1;
                        $('.zong').text('总计:'+$zongj.toFixed(2))
                         
                    }else{
                       
                        $('.zong').text('总计:0' );
                          // location.href="../html/shopping.html";
                    }
                console.log($zongj)
            })

            let del = 'del';
            //删除商品
            $('.tboy').on('click','.sc',function(){
                var $tr = $(this).closest('tr');
                let $id = $tr.attr('data-id');
                console.log($id)
                $.ajax({
                    url:'../api/delete.php',
                    type:'get',
                    data:{
                        id:$id,
                        del:'del'
                    },
                    success:function(data){
                        // console.log(data)
                        $tr.remove()

                    }

                })

            })

            //清空购物车
            $('.qing').on('click',function(){console.log(111)
                $.ajax({
                    url:'../api/delete.php',
                    type:'get',
                    data:{
                        
                        del:''
                    },
                    success:function(data){
                        // console.log(data)
                        $('.tboy').remove()

                    }

                })
            })
        })
    })
})