$(document).ready(function () {
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
            content.stop(true, true).slideDown(duration);//show
        }
        else {//Если развёрнуто
            content.stop(true, true).slideUp(duration);//hide
            $this.addClass('arrow-down');
            item.removeClass('active');
        }
    });

    $(function () {
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
    });
});