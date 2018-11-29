var $ = function (s) {// 设置querySelector
    return document.querySelectorAll(s).length > 1 ? document.querySelectorAll(s) : document.querySelector(s);
};
// window.onload = () => {
//     setTimeout(() => {
//         var loadingContent = $('.loading-content');
//         loadingContent.style.transform = 'scale(0)';
//         loadingContent.addEventListener('webkitTransitionEnd', function () {
//             loadingContent.remove();
//             $('.slide').style.display = 'flex';
//             createItem();
//             animate();
//         })
//     }, 1000);
// }

// 加载动画
// var percent = 0;
// var images = $('img');
// Array.from({ length: images.length }).map((item, index) => {
//     images[index].onload = function () {
//         percent += parseInt((1 / images.length) * 100);
//         $('.loading-content div').style.height = `${percent}%`;
//     }
// })

// var cubeNum = 50;// 分裂个数
// var itemWidth = $('.loading').offsetWidth / cubeNum;// 单个宽度
// var itemHeight = $('.loading').offsetHeight;// 单个高度
// 创建div
function createItem() {
    for (var i = 0; i < cubeNum; i++) {
        var childItem = document.createElement('div');
        childItem.className = 'cube-item';
        childItem.style.backgroundColor = `rgb(95, 92, 104)`;
        childItem.style.width = `${itemWidth}px`;
        childItem.style.height = `${itemHeight}px`;
        childItem.style.zIndex = (i > cubeNum / 2 ? cubeNum - i - 1 : i);
        createSpan(childItem, i);
        $('.slide').appendChild(childItem);
    }
}
// 创建div里面的span标签
function createSpan(cubeItem, index) {
    for (var i = 0; i < 4; i++) {
        let span = document.createElement('span');
        var isBefore = i < 2;
        span.style.width = `${isBefore ? itemWidth : itemHeight}px`;
        span.style.height = `${itemHeight}px`;
        span.style.backgroundSize = `${cubeNum * 100}%`
        if (isBefore) {
            span.style.backgroundPosition = `-${index * itemWidth}px 0`;
        } else {// 左右两个背景颜色设置
            span.style.backgroundColor = '#333';
        }
        if (i == 0) {// top
            span.style.webkitTransformOrigin = span.style.transformOrigin = 'top';
            span.style.webkitTransform = span.style.transform = `translateZ(-${itemHeight}px) rotateX(90deg)`;
            span.style.backgroundImage = `url(img/banner1.jpg)`;
        }
        if (i == 2) {// left
            span.style.webkitTransformOrigin = span.style.transformOrigin = 'left';
            span.style.webkitTransform = span.style.transform = 'rotateY(90deg)';
        }
        if (i == 3) {// right
            span.style.webkitTransformOrigin = span.style.transformOrigin = 'left';
            span.style.webkitTransform = span.style.transform = `translateX(${itemWidth}px) rotateY(90deg)`;
        }
        cubeItem.appendChild(span);
    }
}

function animate() {
    const cubeItem = $('.slide').querySelectorAll('.cube-item');
    for (var i = 0, len = cubeItem.length; i < len; i++) {
        ((index) => {
            let itemSpans = cubeItem[index].querySelectorAll('span');
            cubeItem[index].style.transition = '0.8s -webkit-transform ease';
            cubeItem[index].style.transformOrigin = `50% 50% -${itemHeight / 2}px`;
            itemSpans[0].style.backgroundImage = `url(img/banner1.jpg)`;
            setTimeout(() => {
                cubeItem[index].style.transform = 'translateZ(0) rotateX(-90deg)';
                cubeItem[index].addEventListener('webkitTransitionEnd', () => {// 每个块旋转结束后重置这个块
                    cubeItem[index].style.transition = 'none';
                    cubeItem[index].style.transform = 'translateZ(0px) rotateX(0deg)';
                    itemSpans[1].style.backgroundImage = `url(img/banner1.jpg)`;
                    if (index == cubeNum - 1) {// 如果是最后一个块设置可轮播
                        $('.loading').remove();
                        window.scrollTo(0, 0);
                    }
                })
            }, index * 60);
        })(i)
    }
}

$('.classify-icon').addEventListener('click', function () {// 显示分类
    this.style.opacity = 0;
    $('.classify-cont').style.transform = 'translateX(0)';
    $('.classify-wrap').style.width = '100%';
    setTimeout(() => {
        this.style.display = 'none';
    }, 1500);
})

$('.classify-close').addEventListener('click', function () {// 隐藏分类
    $('.classify-icon').style.display = 'block';
    $('.classify-cont').style.transform = 'translateX(-700px)';
    $('.classify-wrap').style.width = '0';
    setTimeout(() => {
        $('.classify-icon').style.opacity = 1;
    });
})
