;
require(['config'],function(){
    require(['jquery','gscarousel'],function($,ca){
        jQuery(function($){
            //头部引入
            $('#head').load('../html/head.html');
            //尾部引入
            $('#foot').load('../html/foot.html');
            //轮播图
            $('.box').gsCarousel({
                imgs:['img/bn1.jpg','img/bn2.jpg','img/bn3.jpg','img/bn4.jpg'],
            }).show()


            //数据生成商品列表
            var main_m = document.querySelector('.main_m ');
            let arr_status = [200,304];
                
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function(){
                if(xhr.readyState === 4 && arr_status.indexOf(xhr.status)>=0){
                    let res = JSON.parse(xhr.responseText);
                    main_m.innerHTML = res.map(item=>{
                        return `
                                <li class="splb" data-id="${item.id}">
                                    <a href="javascript:0;">
                                        <img src="${item.imgs}" />
                                        <p class="p1">${item.name}</p>
                                        <p class="p2">${item.shorthand}</p>
                                        <p class="p3">${item.englishname}</p>
                                        <p class="p4"><span>${item.price}</span> ${item.prices}</p>
                                    </a>
                                </li>`
                    }).join('');
                }
            }
            xhr.open('get','../api/index.php',true);
            xhr.send();
            //点击传送ID,跳转详情页
            $('.main_m').on('click','li',function(){
                var $sp = $(this).attr('data-id');
                location.href = 'html/details.html?id=' + $sp;   
            })
        })   
    })
});