$(document).ready(function() {
  // Тень хэдера
  const header = document.querySelector('.main-header');
  window.addEventListener('scroll', () => {
    // Тень хэдера
    if (window.scrollY) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Маска для телефона
  $.fn.setCursorPosition = function(pos) {
    if ($(this).get(0).setSelectionRange) {
      $(this).get(0).setSelectionRange(pos, pos);
    } else if ($(this).get(0).createTextRange) {
      var range = $(this).get(0).createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  };
  $.mask.definitions['~'] = '[49]';
  $("input[type='tel']").click(function() {
    $(this).setCursorPosition(2);
  }).mask("8(~99)999-99-99", {
    placeholder: "*"
  });

  // Компесатор для шапки при открытии модалки
  const modals = document.querySelectorAll('.modal');
  modals.forEach((modal) => {
    modal.addEventListener('show.bs.modal', () => {
      header.classList.add('scroll-compensate');
    });
    modal.addEventListener('hidden.bs.modal', () => {
      header.classList.remove('scroll-compensate');
    });
  });

  // Скролл до низа страницы при развернутом дисклеймере
  $(".disclaimer-btn").click(function() {
    $("html, body").animate({
      scrollTop: $(document).height()
    }, 350);
    return false;
  });

  let creditModal = new bootstrap.Modal(document.getElementById('creditModal'), {});
  let offerModal = new bootstrap.Modal(document.getElementById('offerModal'), {});
  let tradeinModal = new bootstrap.Modal(document.getElementById('tradeinModal'), {});
  let callbackModal = new bootstrap.Modal(document.getElementById('callbackModal'), {});
  let thanksModal = new bootstrap.Modal(document.getElementById('thanksModal'), {});
  let alreadyModal = new bootstrap.Modal(document.getElementById('alreadyModal'), {});
  const contentModals = [creditModal, offerModal, tradeinModal, callbackModal];

  // Отправка формы 
  $("form").on("submit", function(event) {
    const form = $(this);
    event.preventDefault();
    const allow = document.cookie.match(/Allow=(.+?)(;|$)/);
    if ($(this).find('input[type="tel"]').val().length > 0 && !allow) {
      $.ajax({
        url: "/send.php",
        type: "POST",
        data: $(this).serialize(),
        dataType: "json",
        cache: false,
        success: function(object) {
          if (object.success == true) {
            console.log("ok");
            contentModals.forEach((modal) => {
              modal.hide();
            });
            thanksModal.show();
            $("form").trigger("reset");
            ym(87931867,'reachGoal','lead');
          }
        },
      });
    } else {
      console.log('already');
      contentModals.forEach((modal) => {
        modal.hide();
      });
      alreadyModal.show();
      $("form").trigger("reset");
      return false;
    }
  });
});