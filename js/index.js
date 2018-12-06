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

class indexSwiper {
    constructor(props) {
        this.swiper = document.querySelector(props.target);// 载体
        this.removedTarget = document.querySelector(props.remove);// 需要移除的位置
        this.callBack = props.callBack;
        this.cubeNum = props.cubeNum || 50;
        this.itemWidth = this.swiper.offsetWidth / this.cubeNum;
        this.itemHeight = this.swiper.offsetHeight;
    }
    createItem() {
        for (var i = 0; i < cubeNum; i++) {
            var childItem = document.createElement('div');
            childItem.className = 'cube-item';
            childItem.style.backgroundColor = `rgb(95, 92, 104)`;
            childItem.style.width = `${this.itemWidth}px`;
            childItem.style.height = `${this.itemHeight}px`;
            childItem.style.zIndex = (i > this.cubeNum / 2 ? this.cubeNum - i - 1 : i);
            createSpan(childItem, i);
            $('.slide').appendChild(childItem);
        }
    }
    // 创建div里面的span标签
    createSpan(cubeItem, index) {
        for (var i = 0; i < 4; i++) {
            let span = document.createElement('span');
            var isBefore = i < 2;
            span.style.width = `${isBefore ? this.itemWidth : this.itemHeight}px`;
            span.style.height = `${this.itemHeight}px`;
            span.style.backgroundSize = `${this.cubeNum * 100}%`
            if (isBefore) {
                span.style.backgroundPosition = `-${index * this.itemWidth}px 0`;
            } else {// 左右两个背景颜色设置
                span.style.backgroundColor = '#333';
            }
            if (i == 0) {// top
                span.style.webkitTransformOrigin = span.style.transformOrigin = 'top';
                span.style.webkitTransform = span.style.transform = `translateZ(-${this.itemHeight}px) rotateX(90deg)`;
            }
            if (i == 1) {// front
                span.style.backgroundImage = `url(${this.imageList[this.pageNum]})`;
            }
            if (i == 2) {// bottom
                span.style.webkitTransformOrigin = span.style.transformOrigin = 'bottom';
                span.style.webkitTransform = span.style.transform = `translateZ(-${this.itemHeight}px) rotateX(-90deg)`;
            }
            if (i == 3) {// left
                span.style.webkitTransformOrigin = span.style.transformOrigin = 'left';
                span.style.webkitTransform = span.style.transform = 'rotateY(90deg)';
            }
            if (i == 4) {// right
                span.style.webkitTransformOrigin = span.style.transformOrigin = 'left';
                span.style.webkitTransform = span.style.transform = `translateX(${this.itemWidth}px) rotateY(90deg)`;
            }
            cubeItem.appendChild(span);
        }
    }
    animate(direction) {
        if (!this.status) {// 判断是否可轮播
            return;
        }
        this.status = false;// 动画结束前不可轮播
        const cubeItem = this.swiper.querySelectorAll('.cube-item');
        for (var i = 0, len = cubeItem.length; i < len; i++) {
            ((index) => {
                let itemSpans = cubeItem[index].querySelectorAll('span');
                cubeItem[index].style.transition = '0.8s -webkit-transform ease';
                cubeItem[index].style.transformOrigin = `50% 50% -${this.itemHeight / 2}px`;
                if (direction == 'up') {// 根据方向放置即将显示的图片
                    itemSpans[0].style.backgroundImage = `url(${this.imageList[this.pageNum]})`;
                } else {
                    itemSpans[2].style.backgroundImage = `url(${this.imageList[this.pageNum]})`;
                }
                setTimeout(() => {
                    cubeItem[index].style.transform = direction == 'up' ? 'translateZ(0) rotateX(-90deg)' : 'translateZ(0) rotateX(90deg)';// 根据方向旋转
                    cubeItem[index].addEventListener('webkitTransitionEnd', () => {// 每个块旋转结束后重置这个块
                        cubeItem[index].style.transition = 'none';
                        cubeItem[index].style.transform = 'translateZ(0px) rotateX(0deg)';
                        itemSpans[1].style.backgroundImage = `url(${this.imageList[this.pageNum]})`;
                        if (index == this.number - 1) {// 如果是最后一个块设置可轮播
                            this.status = true;
                        }
                    })
                }, index * 60);
            })(i)
        }
    }
    pageUp() {
        this.pageNum += 1;
        if (this.pageNum == this.imageList.length) {
            this.pageNum = 0;
        }
        this.animate('up');
    }
    pageDown() {
        this.pageNum -= 1;
        if (this.pageNum < 0) {
            this.pageNum = this.imageList.length - 1;
        }
        this.animate('down');
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
