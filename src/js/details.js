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
            var params = location.search;
            // console.log(params)
            params = params.substring(1).split('=')[1];
                console.log(params)
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
                        // $('.qty_txt')[0].value = item.qty;
                    })
                }

            })

            //点击增加数量
            $('.qty2').on('click',function(){
                
                let $qty_txt = $('.qty_txt').val()*1;
                
                $qty_txt += 1;
                $('.qty_txt').val($qty_txt);

                // if($('.qty_txt').val()*1<=1){
                //     $('.qty_txt').val(1);

                // }
                
            })

            //点击数量减少
            $('.qty1').on('click',function(){
                
                let $qty_txt = $('.qty_txt').val()*1;
                
                $qty_txt -= 1;
                $('.qty_txt').val($qty_txt);

                if($('.qty_txt').val()*1<=1){
                    $('.qty_txt').val(1);

                }
                
            })

            //点击加入购物车
            $('.jia_ru').on('click',function(){
                let $img = $('.main_img').find('img')[0].src;
                let $ys1 = $('.ys1').text();
                let $ys2 = $('.ys2').text();
                let $ys_h1 = $('.ys_h1').text();
                let $price_2 = $('.price_2').text();
                
                let $qty_txt = $('.qty_txt').val();
                console.log($qty_txt)
                $.ajax({
                    url:'../api/addshopping.php',
                    data:{
                        c_id:params,
                        img:$img,
                        ys1:$ys1,
                        ys2:$ys2,
                        ys_h1:$ys_h1,
                        price_2:$price_2,
                        qty_txt:$qty_txt
                    },
                    dataType:'json',
                    success:function(data){
                        console.log(data)

                    }

                })

            })

        })
    })
})