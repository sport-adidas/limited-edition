

/**
*
* Обязательные поля для заполнения вручную
*
**/

var prodPrice  = 699, // цена товара при создании заказа
    productId  = 119745, // id товара в системе 
    $thankUrl  = 'http://example.com/thankyoupage'; // урл вашей страницы спасибо


/**
*   Настройки для передачи заказов по формату CPA
*   Дефолтное значение false, что означает заказ передается как обычный 'по выкупу''
**/

var isCPA = false;

/**
*   Если вы хотите передавать заказ по формату СРА, раскомментируйте код ниже 
*   и вместо '1' вставьте значение конкретного товара на сттанице офферов из столбца 'ID для апи' https://prnt.sc/v2egm3
*
**/

/**
isCPA = {
    id: 1,
}
**/

/**
*
* Необязательные поля для заполнения вручную
*
**/

var streamId        = 0, // id потока в системе (заказ будет привязываться к конретному потоку. полезно при настройке постбека)
    processedByMe   = false, // для передачи отделения записываем объект {'warehouse' : 'XXXX-XXXX'}, где XXXX-XXXX - хеш отделения, который отдается новой почтой, например, 661346c1-3796-11ea-8461-0025b502a04e
    comment         = ''; // комментарий в заказе


$(document).ready(function() {

    $('form').on('submit', function(e) {
        e.preventDefault();

        var currentLocation = window.location.href,
            $form           = $(this);

        $.ajax({
            type: 'POST',
            url: 'http://courier.darkleads.pro/data/exchange/extpartner/addorderapi.php',
            data: {
                'api_key': '?AkS%E7aqDJ?#FE6&#r3',
                'product_id': productId,
    			'stream_id': streamId,
                'phone': $form.find('#phone').val(),
                'name': $form.find('#name').val(),
                'price': prodPrice,
                'comment': comment,
                'source': currentLocation,
    			'processedByMe': processedByMe,
                'is_cpa': isCPA,
            },
            jsonp: 'callback',
            success: function(response){   

                // Обработка успешного размещения заказа
                window.location.href = $thankUrl; 

            },
            error: function(error){ 

                // Обработка ошибки размещения заказа
                console.log(error);

            },
            dataType: 'jsonp'
        });
    });
});