$(document).ready(function() {
    $(".has-sub").hover(function() {
            $(this).addClass('show');
        },
        function() {
            $(this).removeClass('show');
        }
    );
    // var pos = $('html,body').scrollTop(); // lấy ra vị trí scroll chuột

    window.addEventListener("scroll", function() {
        var pos = $('html,body').scrollTop(); // lấy ra vị trí scroll chuột
        var header = document.querySelector("header");
        // console.log(pos);
        if (pos > 0) {
            $('header').attr("top", "-70px");
        }
        if (pos > 300) {
            header.classList.add('sticky');
        }
        if (pos == 0) {
            $('header').attr("top", "0");
            header.classList.remove('sticky');
        }
    });


    $(window).scroll(function() {


        var pos = $('html,body').scrollTop(); // lấy ra vị trí scroll chuột
        if (pos > 300) {
            $('.back-top').addClass('show');
        } else {
            $('.back-top').removeClass('show');
        }

    });

    //  nút back top 
    $('.back-top').click(function() {
        $('html,body').animate({ scrollTop: 0 }, 1000);
    });

    //????
    $('.toggle').click(() => {
        $('.child').toggle('display');
        if ($('.toggle').hasClass('active')) {
            $('.toggle').removeClass('active');
        } else {
            $('.toggle').addClass('active');
        }

    });

    // tab-panel trang chi tiết
    $('.panel:first').show();
    $('.tab-link:first').addClass('active');

    $('.tab-link').click(function() {
        // var index = $('.tab-link').index(this);
        // tương đương ( lấy vị trí của đối tượng đang thực thi nó)
        var index = $(this).index();
        $('.tab-link').removeClass('active');
        $(this).addClass('active');
        $('.panel').hide();
        $('.panel').eq(index).show();
    });

    //hiện phí giao hàng
    $('.shipping-fee').click(() => {
        if ($('.form-shipping').hasClass('show')) {
            $('.form-shipping').removeClass('show');
        } else {
            $('.form-shipping').addClass('show');
        }
    });


});

// lọc giá 

$(".slider-range").slider({
    range: true,
    min: 1500000,
    max: 20000000,
    values: [1500000, 10000000],
    slide: function(event, ui) {
        $("input.from").val(ui.values[0]);
        $('span.from').text($("input.from").val());
        $("input.to").val(ui.values[1]);
        $('span.to').text($("input.to").val());
    }
});
$('span.from').text($(".slider-range").slider("values", 0));
$('span.to').text($(".slider-range").slider("values", 1));



//hiệu ứng lướt tới đâu hiện tới đó
const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => { //duyệt từng đối tượng
        // kiểm tra đối tượng có trong vùng nhìn thấy ?
        if (entry.isIntersecting) {
            // hoạt động cần thiết
            entry.target.setAttribute("data-animated", "true");

            appearOnScroll.unobserve(entry.target); //bắt buộc
        }
    });
}, {
    rootMargin: "0px -1px -200px -1px",
    threshold: 0,
}); // khoảng cách hiển thị đối tượng đó

// các phần tử cần áp dùng hiệu ứng 
var products = document.querySelectorAll(".col-animated");

products.forEach(product => {
    appearOnScroll.observe(product);
});


//thanh toán ---sticky sidebar---

const postDetails = document.querySelector(".product-list > form");
const postSidebar = document.querySelector(".cart-pay-inner");
const postSidebarContent = document.querySelector(".cart-pay-inner > div");

//1
const controller = new ScrollMagic.Controller();

//2
const scene = new ScrollMagic.Scene({
    triggerElement: postSidebar,
    triggerHook: 0,
    duration: getDuration
}).addTo(controller);
//hiệu ứng chỉ cho màn 1024px trở lên
//3
if (window.matchMedia("(min-width: 1024px)").matches) {
    scene.setPin(postSidebar, { pushFollowers: false });
    // $('.cart-pay-inner').css("top", "100px");
}

//4
window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 1024px)").matches) {
        scene.setPin(postSidebar, { pushFollowers: false });
    } else {
        scene.removePin(postSidebar, true);
    }
});

function getDuration() {
    return postDetails.offsetHeight - postSidebarContent.offsetHeight;
}

//sibar menu mobile
var btnMenu = $('header nav button.navbar-toggler');
var menuSidebarWrap = $('.mfp-wrap');
var menuSidebarContent = $('.mfp-content');
var btnFilterMobile = $('.filter-mobile-btn a');
var mainMenu = $('#main-menu');
var sidebarMobile = $('.mfp-content > .sidebar');

btnMenu.click(() => {
    mainMenu.css("display", "block");
    menuSidebarWrap.css("display", "block");
    menuSidebarContent.css("transform", "translateX(0px)");
    btnMenu.css("display", "none");
    sidebarMobile.css("display", "none");
});

btnFilterMobile.click(() => {
    mainMenu.css("display", "none");
    menuSidebarWrap.css("display", "block");
    sidebarMobile.css("display", "block");
    menuSidebarContent.css("transform", "translateX(0px)")
    btnMenu.css("display", "none");
});
var XClose = $('.mfp-close');

XClose.click(() => {
    menuSidebarWrap.css("display", "none");
    menuSidebarContent.css("transform", "translateX(-286px)")
    btnMenu.css("display", "block");
});

var bg = $('.mfp-container');
bg.click(() => {
    menuSidebarWrap.css("display", "none");
    menuSidebarContent.css("transform", "translateX(-286px)")
    btnMenu.css("display", "block");
});

// thêm bớt số lượng sản phẩm 


var add = $('.add-quantity');
var sub = $('.sub-quantity');

add.click(() => {
    var getVal = $('.input-number').val();
    var quantity = parseInt(getVal);
    if (quantity < 999) {
        var rs = ++quantity;

        $('.input-number').attr("value", rs); //set value trong input
        $('.input-number').val(rs); //set value hiển thị
    }

});

sub.click(() => {
    var getVal = $('.input-number').val();
    var quantity = parseInt(getVal);
    if (quantity > 1) {
        var rs = --quantity;
        $('.input-number').val(rs);
        $('.input-number').attr("value", rs);
    }

});