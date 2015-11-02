$(document).ready(function () {

    if ($(".accordeon__trigger").length) Accordeon.init();
    if ($("#slider-range").length) Slider.init();
    if ($(".products__rating").length) RatingWidget.init();
    if ($('.sort__select-elem').length){
            $('.sort__select-elem').select2({
                minimumResultsForSearch: Infinity
            })
    }

    if ($(".sort__view").length) ViewStateChange.init();

    $(".accordeon__reset-filter").on("click", function(t) {
        t.preventDefault();
        var i = $(this),
            e = i.closest(".accordeon__item"),
            n = e.find("input:checkbox");
        n.each(function() {
            $(this).removeProp("checked")
        })
    })

    if ($(".products__slideshow").length) Slideshow.init();
    $(".attension__text").columnize({
        columns: 2,
        lastNeverTallest: true


    })
});
//---------------------------------------------------------------------
var Slideshow = function() {
    var t = function(t) {
        var i = t.closest(".products__slideshow"),
            e = t.find("img").attr("src"),
            n = i.find(".products__slideshow-img");
        t.closest(".products__slideshow-item").addClass("active").siblings().removeClass("active"), n.fadeOut(function() {
            $(this).attr("src", e).fadeIn()
        })
    };
    return {
        init: function() {
            $(".products__slideshow-link").on("click", function(i) {
                i.preventDefault();
                var e = $(this);
                t(e)
            })
        }
    }
}();



var ViewStateChange = function() {
    var t = "",
        i = function(i) {
            var n = i.closest(".sort__view-item"),
                s = n.data("view"),
                r = $("#products-list"),
                a = "products__list_",
                l = a + s;
            "" == t && (t = r.attr("class")), e(i), r.attr("class", t + " " + l)
        },
        e = function(t) {
            t.closest(".sort__view-item").addClass("active").siblings().removeClass("active")
        };
    return {
        init: function() {
            $(".sort__view-link").on("click", function(t) {
                t.preventDefault(), i($(this))
            })
        }
    }
}();



var Accordeon = (function () {
    var init = function () {
        $('.accordeon__trigger').on('click', function (e) {
            e.preventDefault();
            console.log('click');
            var $this = $(this);
            item = $this.closest('.accordeon__item'),
                list = $this.closest('.accordeon__list'),
                items = list.find('.accordeon__item'),
                content = item.find('.accordeon__inner'),
                otherContent = list.find('.accordeon__inner'),
                duration = 300;
            if (!item.hasClass('active'))//Если свёрнуто
            {
                $this.removeClass('arrow-down');
                item.addClass('active');
                content.stop(true, true).slideDown(duration);//развернуть
            }
            else {//Если развёрнуто
                content.stop(true, true).slideUp(duration);//свернуть
                $this.addClass('arrow-down');
                item.removeClass('active');
            }
        });
    };
    return {
        init: init
    }
})();

var Slider = (function () {
    var init = function () {
        $("#slider-range").slider({
            range: true,
            min: 0,
            max: 30000,
            values: [990, 13000],
            slide: function (event, ui) {
                //$( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
                $(".accordeon__from-input").val(ui.values[0]);
                $(".accordeon__to-input").val(ui.values[1]);
            }
        });
        $("#amount").val("$" + $("#slider-range").slider("values", 0) +
            " - $" + $("#slider-range").slider("values", 1));
    };

    return {
        init: init
    }

})();


var RatingWidget = function() {
    var t = function(t) {
            for (var i = [], e = 0; 5 > e; e++) {
                var n = t > e ? "products__rating-stars-item products__rating-stars-item_filled" : "products__rating-stars-item",
                    s = $("<li>", {
                        "class": n
                    });
                i.push(s)
            }
            return i
        },
        i = function(i, e) {
            var n = $("<ul>", {
                    "class": "products__rating-stars",
                    html: t(i)
                }),
                s = $("<div>", {
                    "class": "products__rating-amount",
                    text: i
                });
            e.append([n, s])
        };
    return {
        init: function() {
            $(".products__rating").each(function() {
                var t = $(this),
                    e = parseInt(t.data("rating"));
                i(e, t)
            })
        }
    }
}();