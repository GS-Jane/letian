;
require(['config'],function(){
    require(['jquery'],function($){
        jQuery(function($){
            //头部引入
            $('#head').load('../html/head.html');
            //尾部引入
            $('#foot').load('../html/foot.html');
            //数据生成商品列表
            // var $main_m = $('.main_m');
            var main_m = document.querySelector('.main_m');
            var $page = $('.page');

            let pageNo = 1;
            let qty = 8;

            function getajax(){
                $.ajax({
                    url:'../api/list.php',
                    type:'GET',
                    data:{
                        pageNo:pageNo,
                        qty:qty
                    },
                    success:function(data){
                       var total = JSON.parse(data).total;
                       var data = JSON.parse(data).data;
                       // console.log(total,data)
                       main_m.innerHTML = data.map(function(item,idx){
                            return `
                                    <li class="splb" data-id="${item.id}">
                                        <a href="javascript:0;">
                                            <img src="../${item.imgs}" />
                                            <p class="p1">${item.name}</p>
                                            <p class="p2">${item.shorthand}</p>
                                            <p class="p3">${item.englishname}</p>
                                            <p class="p4"><span>$${item.price}</span> ${item.prices}</p>
                                        </a>
                                    </li>`
                       }).join('');

                       //分页效果
                        let pageQty = Math.ceil(total/qty);
                        $page[0].innerText = '';
                        for(let i = 1;i<=pageQty;i++){
                            let span = document.createElement('span');
                            span.innerText = i;
                            if(i==pageNo){
                                // console.log(11)
                                span.className = 'active';
                            }
                            $page[0].appendChild(span);                   }
                        }
                })
            }
            getajax()
            //点击分页高亮
            $page.on('click','span',function(){
                pageNo = $(this).text();
                getajax()
            })

            //点击传送ID,跳转详情页
            $('.main_m').on('click','li',function(){
                var $sp = $(this).attr('data-id');
                location.href = 'details.html?id=' + $sp;   
            })
        })

    })
});