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
                        return`
                                <tr data-id="${item.id}">
                                    <td class="tboy1"><input type="checkbox" /></td>
                                    <td class="tboy2">
                                        <img src="${item.imgs}"  />
                                        <p><span class="san">三小时前</span> <span class="cx">畅销</span></p>
                                        <p><span class="ys">${item.name} </span><span class="ys1">${item.shorthand}</span></p>
                                        <p class="h1">${item.englishname}</p>
                                        <p class="hw">[이으진생데스까르고]</p>
                                        <p class="bk">不可用购物车优惠券</p>
                                    </td>
                                    <td class="xsj">
                                        ${item.price}
                                    </td>
                                    <td class="qty">
                                        <div>
                                            <a href="avascript:0;" class="jian">-</a>
                                            <input type="text" value="${item.qty}" class="qty_txt"/>
                                            <a href="avascript:0;" class="jia">+</a>
                                        </div>
                                    </td>
                                    <td class="gmj">
                                        ${item.price}
                                    </td>
                                    <td class="xz">
                                        <a href="#" class="lj">立即购买</a>
                                        <a href="#" class="bl">保留在购物车</a>
                                        <a href="#" class="sc">删除</a>
                                    </td>
                                </tr>`
                        
                    }).join('');
                    $('.tboy').append(res);
                }
            });
            
            //点击增加
            $('.tboy').on('click','.jia',function(){
                var $aa = $(this).closest('tr');

                let $id = $aa.attr('data-id')

                // console.log($id);
                // console.log($('.qty_txt')[0].value)
                // let $qtys = $('.qty_txt')[0].value*1+1;
                let $qtys = $aa.find('.qty_txt').val()*1+1;
                    $aa.find('.qty_txt').val($qtys);
                    // console.log($qtys)
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

                // console.log($id);
                // console.log($('.qty_txt')[0].value)
                // let $qtys = $('.qty_txt')[0].value*1+1;
              
                let $qtys = $tr.find('.qty_txt').val()*1-1;
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


        })
    })
})