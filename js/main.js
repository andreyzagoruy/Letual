(function ( $ ) {

  $.fn.leSlider = function () {

    return this.each(function () {

      var $self = $( this ),
          storage = {},
          DOM = {},
          scrollPosition,
          resizeTimer,
          isInited;

      var methods = {

        init : function () {

          isInited = false;
          methods.updateDOM();
          methods.createModal();
          methods.fillNavigation();
          methods.createSliderControls();
          methods.bindEvents();

        },

        bindEvents : function ( ) {

          $( window ).on('resize', function () {
            clearTimeout(resizeTimer);
            methods.onResize();
          });
          DOM.$modalContainer.on('mousemove', function () {
            methods.moveSlide( event );
          });
          DOM.$slideLinks.on('click', function ( event ) {
            event.preventDefault();
            methods.disableScroll();
            storage.$currentSlide = $( this );
            methods.loadSlide( storage.$currentSlide );
            methods.showModal();
            DOM.$modalSlide.load(function () {
              methods.moveSlide( event );
            });
          });
          DOM.$modalCloseButton.on('click', function () {
            methods.enableScroll();
            methods.hideModal();
          });

        },

        updateDOM : function () {

          if ( !isInited ) {
            DOM.$container = $self;
            DOM.$slideContainers = DOM.$container.find('> div');
            DOM.$slideLinks = DOM.$slideContainers.find('a');
            storage.windowHeight = window.innerHeight;
            isInited = true;
          } else {
            storage.windowHeight = window.innerHeight;
          }


        },

        onResize : function () {
          resizeTimer = setTimeout(function () {
            methods.updateDOM();
            methods.calculateSteps();
          }, 500);
        },

        createModal : function () {
          DOM.$modalContainer = $('<div>')
                                  .addClass('slider-modal')
                                  .appendTo('body');
          DOM.$modalCloseButton = $('<span>')
                                  .addClass('modal-close')
                                  .addClass('fa')
                                  .addClass('fa-times')
                                  .appendTo(DOM.$modalContainer);
          DOM.$slideViewport = $('<div>')
                                  .addClass('slide-viewport')
                                  .appendTo(DOM.$modalContainer);
          DOM.$modalSlide = $('<img>')
                                  .addClass('modal-slide')
                                  .appendTo(DOM.$slideViewport);
          DOM.$navigationContainer = $('<div>')
                                  .addClass('navigation-container')
                                  .appendTo(DOM.$modalContainer);
          DOM.$navigationViewport = $('<div>')
                                  .addClass('navigation-viewport')
                                  .appendTo(DOM.$navigationContainer);
        },

        hideModal : function () {
          DOM.$modalContainer.hide();
        },

        showModal : function () {
          DOM.$modalContainer.show();
        },

        disableScroll : function () {
          scrollPosition = $('body').scrollTop();
          $('body').addClass('slider-opened');
        },

        enableScroll : function () {
          $('body').removeClass('slider-opened').scrollTop(scrollPosition);
        },

        fillNavigation : function () {
          DOM.$slideContainers.clone().appendTo(DOM.$navigationViewport);
          DOM.$navigationSlides = DOM.$navigationViewport
                                    .children()
                                    .removeClass()
                                    .addClass('navigation-slide');
        },

        createSlider : function () {

        },

        createSliderControls : function () {
          DOM.$upButtonContainer = $('<div>')
                              .addClass('navigatin-control navigation-up-button')
                              .appendTo(DOM.$navigationContainer);
          DOM.$upButton = $('<span>')
                            .addClass('fa fa-chevron-up')
                            .appendTo(DOM.$upButtonContainer);
          DOM.$downButtonContainer = $('<div>')
                              .addClass('navigatin-control navigation-down-button')
                              .appendTo(DOM.$navigationContainer);
          DOM.$downButton = $('<span>')
                            .addClass('fa fa-chevron-down')
                            .appendTo(DOM.$downButtonContainer);
        },

        navigationUp : function () {

        },

        navigationDown : function () {

        },

        loadSlide : function ( slide ) {
          DOM.$modalSlide.attr('src', slide.attr('href'));
          DOM.$modalSlide.on('load', function () {
            methods.calculateSteps();
          });
        },

        calculateSteps : function () {
          storage.imageHeight = DOM.$modalSlide.height() + parseInt(DOM.$modalSlide.css('margin')) * 2;
          storage.step = ((storage.imageHeight - storage.windowHeight)/storage.windowHeight);
        },

        moveSlide : function ( event ) {
          DOM.$modalSlide.css('transform', 'translateY(-' + event.clientY * storage.step + 'px)');
        }

      };
      methods.init();
    });

  };

})(jQuery);

$('.img-block').leSlider();
