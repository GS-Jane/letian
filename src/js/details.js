;
require(['config'],function(){
    require(['jquery','gdszoom'],function($,ca){
        jQuery(function($){
            //头部引入
            $('#head').load('../html/head.html');
            //尾部引入
            $('#foot').load('../html/foot.html');

            //放大镜效果
            $('.main_img').gdsZoom({
                position:'right'
            });
            
            $('.smallList').on('click','img',function(){
                    $('.main_img img').attr({
                        src:this.src,
                        'data-big':this.dataset.big || this.src
                    })
            });

            //数据参数获取显示在详情页
            var params = location.search;console.log(params)
            params = params.substring(1).split('=')[1];

            $.ajax({
                url:'../api/details.php',
                type:'get',
                data:{
                    id:params
                },
                success:function(data){
                    var data = JSON.parse(data);
                    data.forEach(function(item,idx){
                        $('.ys1')[0].innerText = item.name;
                        $('.ys2')[0].innerText = item.shorthand;
                        $('.ys_h1')[0].innerText = item.englishname;
                        $('.price_2')[0].innerText = item.price;
                        $('.price_3')[0].innerText = item.prices;
                        $('.m_img')[0].src = '../'+item.imgs;
                        $('.m_imgs')[0].src = '../'+item.imgs;
                        $('.m_img').attr('data-big','../'+item.imgs);
                    })
                }

            })

        })
    })
})