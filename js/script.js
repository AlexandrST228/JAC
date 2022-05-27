$('.pop-up').hide(0);
$('.pop-up-container').hide(0);

$('.pop-up-button').click(function () {
   $('.pop-up-container').show(0);
   $('.pop-up').fadeIn(300);
   $('.pop-up-button').hide(0);
});
$('.pop-up span').click(function () {
   $('.pop-up-container').hide(0);
   $('.pop-up').hide(0);
   $('.pop-up-button').show(0);
});

function chpok(id) {
   elem = document.getElementById(id); //находим блок div по его id, который передали в функцию
   state = elem.style.display; //смотрим, включен ли сейчас элемент
   if (state == '') elem.style.display = 'block'; //если включен, то выключаем
   else elem.style.display = ''; //иначе - включаем
}