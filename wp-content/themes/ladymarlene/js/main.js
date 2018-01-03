$(document).ready(function(){
	
	function madalbox() {
		$('.modalbox').fancybox();
	}
	
	madalbox();
	
	/*$('.gallery').fancybox({						
		"padding" : 10	
	});*/
	
	$('.b5_gallery_item').each(function(){
		var $this = $(this);
		var $btn = $this.find('a.gallery', this);
		var $modal = $this.find('.b5_gallery_big .b5_gallery_big_content', this);
		
		$btn.click(function(){
			$.fancybox($modal);
			madalbox();
			cookiesForm();
			return false;
		});
	});
	
	function inputStyle() {
	
		$('input[name="phone"]').mask('+7 (999) 999-99-99');
		
		$('input[type="text"], textarea').focus(function()
		{
			var place = $(this).attr('placeholder');
			$(this).removeAttr('placeholder');

			$('input[type="text"], textarea').blur(function(){
				$(this).attr('placeholder', place);
			}); 
		});
		
		$('input[type="text"], textarea').focus(function(){
			$(this).removeClass('error');
		});
	
	}
	
	inputStyle();
	
	$('.choice_item a').click(function(){
		$.fancybox.close();
	});
	
	$('.mob_menu').click(function(){
		$('.top_menu ul').slideToggle();
	});
	
	
	$('.top_menu ul li a[href^="#"], .f_menu ul li a[href^="#"], .choice_list a[href^="#"]').click(function(){
		var target = $(this).attr('href');
		$('html, body').animate({scrollTop: $(target).offset().top-0}, 1000);
		return false; 
	}); 
	
	$('.b3_right').each(function(){
		$(this).find("#carousel").owlCarousel({
			autoPlay: false,
			items : 4,
			lazyLoad : true,
			navigation : true,
			pagination : false,
			rewindNav : false,
			itemsDesktop : [1150,3],
		    itemsDesktopSmall : [1000,3],
		    itemsTablet: [800,2],
		    itemsMobile : [600,1]
		});
	});
	
	function cookiesForm() {
		var $nameCookies       = $.cookie('name');
		var $phoneCookies      = $.cookie('phone');
		var $emailCookies      = $.cookie('email');
		var $adresCookies      = $.cookie('adres');
		var $gravirovkaCookies = $.cookie('gravirovka');
		
		if($nameCookies){
			$('input[name="name"]').val($nameCookies);
		}
		
		if($phoneCookies){
			$('input[name="phone"]').val($phoneCookies);
		}
		
		if($emailCookies){
			$('input[name="email"]').val($emailCookies);
		}
		
		if($adresCookies){
			$('textarea[name="adres"]').val($adresCookies);
		}
		
		if($gravirovkaCookies){
			$('textarea[name="gravirovka"]').val($gravirovkaCookies);
		}
		
	}
	
	// start script glasses
	
	$('.glasses .b3_right_carousel_item').each(function(){
		var $this = $(this);
		var $btn = $this.find('.b3_right_carousel_button a', this);
		var $subCarousel = $this.find('.b3_right_carousel_sub').html();
		var $img = $this.find('.b3_right_carousel_img img').attr('src');
		var $price = $this.find('.b3_right_carousel_price span').html();
		var $imgLeft = $this.find('.b3_right_carousel_left_img img').attr('src');
		
		$btn.click(function(){
			var $subCarouselCopy = '<div id="carousel_glasses" class="b3_right_carousel owl-carousel">'+ $subCarousel +'</div>';
			$('.glasses #carousel').hide();
			$('.glasses').append($subCarouselCopy);
			$('.glasses .b3_right_title').html('Выберите гравировку:');
			$('input[name="product"]').val($img);
			$('input[name="price1"]').val($price);
			$('#glasses .b3_left img').attr('src',$imgLeft);
			$('#glasses .b3_right_back').fadeIn();
			
			
			$("#carousel_glasses").owlCarousel({
				autoPlay: false,
				items : 4,
				lazyLoad : true,
				navigation : true,
				pagination : false,
				rewindNav : false,
				itemsDesktop : [1150,3],
				itemsDesktopSmall : [1000,3],
				itemsTablet: [800,2],
				itemsMobile : [600,1]
			});
			form1Block3();
			form1block3Back1();
			return false;
		});
		
	});
	
	function form1block3Back1() {
		$('#glasses .back_step1').click(function(){
			$('#carousel_glasses, #glasses .b3_form, #glasses .b3_good').remove();
			$('.glasses #carousel, .glasses .b3_right_title, #glasses .b3_right_text').show();
			$('.glasses .b3_right_title').html('Выберите ваш бокал:');
			$('#glasses .b3_left img').attr('src','/img/01.jpg');
			$('#glasses .b3_right_back').fadeOut();
			return false;
		});
	}
	
	function form1Block3() {
		$('#carousel_glasses .b3_right_carousel_item').each(function(){
			var $this = $(this);
			var $btn = $this.find('.b3_right_carousel_button a', this);
			var $img = $this.find('.b3_right_carousel_img img').attr('src');
			var $price = $this.find('.b3_right_carousel_price span').html();
			var $imgLeft = $this.find('.b3_right_carousel_left_img img').attr('src');
			$('input[name="engraving"]').val($img);
			$('input[name="price2"]').val($price);
			var $form = $('.form_block3').html();
			
			
			$btn.click(function(){
				$('#glasses .b3_right_text').hide();
				$('.glasses .b3_right_title').html('Осталось совсем немного');
				$('#carousel_glasses').hide();
				$('#glasses .b3_left img').attr('src',$imgLeft);
				$('.glasses').append($form);
				var $price1 = $('#glasses input[name="price1"]').val();
				var $price2 = $('#glasses input[name="price2"]').val();
				var $price3 = Number($price1) + Number($price2);
				$('#glasses .form_price_all span').html($price3);
				
				cookiesForm();
				inputStyle();
				form1Send();
				return false;
			});
		});
	}
	
	function form1Send() {
		
		$("#glasses #contact1").submit(function() { return false; });
		$("#glasses #send1").on("click", function(){
			var nameval    = $("#glasses #name1").val();
			var phoneval   = $("#glasses #phone1").val();
			var mailval    = $("#glasses #email1").val();
			var adresval   = $("#glasses #adres1").val();
			var gravirovkaval = $("#glasses #gravirovka1").val();
			$.cookie('name',nameval);
			$.cookie('phone',phoneval);
			$.cookie('email',mailval);
			$.cookie('adres',adresval);
			$.cookie('gravirovka',gravirovkaval);
			var namelen    = nameval.length;
			var phonelen   = phoneval.length;
			var mailvalid  = validateEmail(mailval);
			var adreslen   = adresval.length;
			
   
			if(namelen < 3) {
				$("#glasses #name1").addClass("error");
			}
			else if(namelen > 2){
				$("#glasses #name1").removeClass("error");
			}
			
			if(phonelen < 10) {
				$("#glasses #phone1").addClass("error");
			}
			else if(phonelen > 9){
				$("#glasses #phone1").removeClass("error");
			}
			
			if(mailvalid == false) {
				$("#glasses #email1").addClass("error");
			}
			else if(mailvalid == true){
				$("#glasses #email1").removeClass("error");
			}
			
			if(adreslen < 6) {
				$("#glasses #adres1").addClass("error");
			}
			else if(adreslen > 5){
				$("#glasses #adres1").removeClass("error");
			}
			
   
				if(phonelen >= 10 && namelen >= 3 && mailvalid == true && adreslen >= 5) {

$('#glasses .b3_right_back, .glasses .b3_right_title').hide();
$('.glasses .b3_form').hide();
var $good = $('.good_block1').html();
							$('.glasses').append($good);
form1block3Back1();
					$.ajax({
						url: '/calc.php',
						type: 'POST',
						data: $("#glasses #contact1").serialize(),
						success: function()
						{
							
						}
					})
				}
			return false;
		});	
		
	}
	
	// end script glasses
	
	// start script bottle
	
	$('.bottle .b3_right_carousel_item').each(function(){
		var $this = $(this);
		var $btn = $this.find('.b3_right_carousel_button a', this);
		var $subCarousel = $this.find('.b3_right_carousel_sub').html();
		var $img = $this.find('.b3_right_carousel_img img').attr('src');
		var $price = $this.find('.b3_right_carousel_price span').html();
		var $imgLeft = $this.find('.b3_right_carousel_left_img img').attr('src');
		
		$btn.click(function(){
			var $subCarouselCopy = '<div id="carousel_bottle" class="b3_right_carousel owl-carousel">'+ $subCarousel +'</div>';
			$('.bottle #carousel').hide();
			$('.bottle').append($subCarouselCopy);
			$('.bottle .b3_right_title').html('Выберите категорию гравировки:');
			$('input[name="product"]').val($img);
			$('input[name="price1"]').val($price);
			$('#bottle .b3_left img').attr('src',$imgLeft);
			$('#bottle .b3_right_back').fadeIn();
			
			
			$("#carousel_bottle").owlCarousel({
				autoPlay: false,
				items : 4,
				lazyLoad : true,
				navigation : true,
				pagination : false,
				rewindNav : false,
				itemsDesktop : [1150,3],
				itemsDesktopSmall : [1000,3],
				itemsTablet: [800,2],
				itemsMobile : [600,1]
			});
			form2Block3();
			form1block3Back2();
			return false;
		});
		
	});
	
	function form1block3Back2() {
		$('#bottle .back_step1').click(function(){
			$('#carousel_bottle, #bottle .b3_form, #bottle .b3_good, #carousel_bottle2').remove();
			$('.bottle #carousel, .bottle .b3_right_title, #bottle .b3_right_text').show();
			$('.bottle .b3_right_title').html('Выберите бутылку:');
			$('#bottle .b3_left img').attr('src','/img/02.jpg');
			$('#bottle .b3_right_back').fadeOut();
			return false;
		});
	}
	
	function form2Block3() {
		$('#carousel_bottle .b3_right_carousel_item').each(function(){
			var $this = $(this);
			var $btn = $this.find('.b3_right_carousel_button a', this);
			var $subCarousel = $this.find('.b3_right_carousel_sub').html();
			
			$btn.click(function(){
				var $subCarouselCopy = '<div id="carousel_bottle2" class="b3_right_carousel owl-carousel">'+ $subCarousel +'</div>';
				$('#carousel_bottle').hide();
				$('.bottle').append($subCarouselCopy);
				$('.bottle .b3_right_title').html('Выберите гравировку:');
				
				
				$("#carousel_bottle2").owlCarousel({
					autoPlay: false,
					items : 4,
					lazyLoad : true,
					navigation : true,
					pagination : false,
					rewindNav : false,
					itemsDesktop : [1150,3],
					itemsDesktopSmall : [1000,3],
					itemsTablet: [800,2],
					itemsMobile : [600,1]
				});
				form2Block4();
				form1block3Back2();
				return false;
			});
			
		});
	}
	
	function form2Block4() {
		$('#carousel_bottle2 .b3_right_carousel_item').each(function(){
			var $this = $(this);
			var $btn = $this.find('.b3_right_carousel_button a', this);
			var $img = $this.find('.b3_right_carousel_img img').attr('src');
			var $price = $this.find('.b3_right_carousel_price span').html();
			var $imgLeft = $this.find('.b3_right_carousel_left_img img').attr('src');
			$('input[name="engraving"]').val($img);
			$('input[name="price2"]').val($price);
			var $form = $('.form_block3').html();
			
			
			$btn.click(function(){
				$('#bottle .b3_right_text').hide();
				$('.bottle .b3_right_title').html('Осталось совсем немного');
				$('#carousel_bottle2').hide();
				$('#bottle .b3_left img').attr('src',$imgLeft);
				$('.bottle').append($form);
				var $price1 = $('#bottle input[name="price1"]').val();
				var $price2 = $('#bottle input[name="price2"]').val();
				var $price3 = Number($price1) + Number($price2);
				$('#bottle .form_price_all span').html($price3);
				
				cookiesForm();
				inputStyle();
				form2Send();
				return false;
			});
		});
	}
	
	function form2Send() {
		
		$("#bottle #contact1").submit(function() { return false; });
		$("#bottle #send1").on("click", function(){
			var nameval    = $("#bottle #name1").val();
			var phoneval   = $("#bottle #phone1").val();
			var mailval    = $("#bottle #email1").val();
			var adresval   = $("#bottle #adres1").val();
			var gravirovkaval = $("#bottle #gravirovka1").val();
			$.cookie('name',nameval);
			$.cookie('phone',phoneval);
			$.cookie('email',mailval);
			$.cookie('adres',adresval);
			$.cookie('gravirovka',gravirovkaval);
			var namelen    = nameval.length;
			var phonelen   = phoneval.length;
			var mailvalid  = validateEmail(mailval);
			var adreslen   = adresval.length;
			
   
			if(namelen < 3) {
				$("#bottle #name1").addClass("error");
			}
			else if(namelen > 2){
				$("#bottle #name1").removeClass("error");
			}
			
			if(phonelen < 10) {
				$("#bottle #phone1").addClass("error");
			}
			else if(phonelen > 9){
				$("#bottle #phone1").removeClass("error");
			}
			
			if(mailvalid == false) {
				$("#bottle #email1").addClass("error");
			}
			else if(mailvalid == true){
				$("#bottle #email1").removeClass("error");
			}
			
			if(adreslen < 6) {
				$("#bottle #adres1").addClass("error");
			}
			else if(adreslen > 5){
				$("#bottle #adres1").removeClass("error");
			}
			
   
				if(phonelen >= 10 && namelen >= 3 && mailvalid == true && adreslen >= 5) {
$('#bottle .b3_right_back, .bottle .b3_right_title').hide();
							$('.bottle .b3_form').hide();
							var $good = $('.good_block2').html();
							$('.bottle').append($good);
							form1block3Back2();
		$.ajax({
						url: '/calc.php',
						type: 'POST',
						data: $("#bottle #contact1").serialize(),
						success: function()
						{
							
						}
					})
				}
			return false;
		});	
		
	}
	
	// end script bottle
	
	// start script locks
	
	$('.locks .b3_right_carousel_item').each(function(){
		var $this = $(this);
		var $btn = $this.find('.b3_right_carousel_button a', this);
		var $subCarousel = $this.find('.b3_right_carousel_sub').html();
		var $img = $this.find('.b3_right_carousel_img img').attr('src');
		var $price = $this.find('.b3_right_carousel_price span').html();
		var $imgLeft = $this.find('.b3_right_carousel_left_img img').attr('src');
		
		$btn.click(function(){
			var $subCarouselCopy = '<div id="carousel_locks" class="b3_right_carousel owl-carousel">'+ $subCarousel +'</div>';
			$('.locks #carousel').hide();
			$('.locks').append($subCarouselCopy);
			$('.locks .b3_right_title').html('Выберите гравировку:');
			$('input[name="product"]').val($img);
			$('input[name="price1"]').val($price);
			$('#locks .b3_left img').attr('src',$imgLeft);
			$('#locks .b3_right_back').fadeIn();
			
			
			$("#carousel_locks").owlCarousel({
				autoPlay: false,
				items : 4,
				lazyLoad : true,
				navigation : true,
				pagination : false,
				rewindNav : false,
				itemsDesktop : [1150,3],
				itemsDesktopSmall : [1000,3],
				itemsTablet: [800,2],
				itemsMobile : [600,1]
			});
			form3Block3();
			form3block3Back1();
			return false;
		});
		
	});
	
	function form3block3Back1() {
		$('#locks .back_step1').click(function(){
			$('#carousel_locks, #locks .b3_form, #locks .b3_good').remove();
			$('.locks #carousel, .locks .b3_right_title, #locks .b3_right_text').show();
			$('.locks .b3_right_title').html('Выберите ваш замочек:');
			$('#locks .b3_left img').attr('src','/img/03.jpg');
			$('#locks .b3_right_back').fadeOut();
			return false;
		});
	}
	
	function form3Block3() {
		$('#carousel_locks .b3_right_carousel_item').each(function(){
			var $this = $(this);
			var $btn = $this.find('.b3_right_carousel_button a', this);
			var $img = $this.find('.b3_right_carousel_img img').attr('src');
			var $price = $this.find('.b3_right_carousel_price span').html();
			var $imgLeft = $this.find('.b3_right_carousel_left_img img').attr('src');
			$('input[name="engraving"]').val($img);
			$('input[name="price2"]').val($price);
			var $form = $('.form_block3').html();
			
			
			$btn.click(function(){
				$('#locks .b3_right_text').hide();
				$('.locks .b3_right_title').html('Осталось совсем немного');
				$('#carousel_locks').hide();
				$('#locks .b3_left img').attr('src',$imgLeft);
				$('.locks').append($form);
				var $price1 = $('#locks input[name="price1"]').val();
				var $price2 = $('#locks input[name="price2"]').val();
				var $price3 = Number($price1) + Number($price2);
				$('#locks .form_price_all span').html($price3);
				
				cookiesForm();
				inputStyle();
				form3Send();
				return false;
			});
		});
	}
	
	function form3Send() {
		
		$("#locks #contact1").submit(function() { return false; });
		$("#locks #send1").on("click", function(){
			var nameval    = $("#locks #name1").val();
			var phoneval   = $("#locks #phone1").val();
			var mailval    = $("#locks #email1").val();
			var adresval   = $("#locks #adres1").val();
			var gravirovkaval = $("#locks #gravirovka1").val();
			$.cookie('name',nameval);
			$.cookie('phone',phoneval);
			$.cookie('email',mailval);
			$.cookie('adres',adresval);
			$.cookie('gravirovka',gravirovkaval);
			var namelen    = nameval.length;
			var phonelen   = phoneval.length;
			var mailvalid  = validateEmail(mailval);
			var adreslen   = adresval.length;
			
   
			if(namelen < 3) {
				$("#locks #name1").addClass("error");
			}
			else if(namelen > 2){
				$("#locks #name1").removeClass("error");
			}
			
			if(phonelen < 10) {
				$("#locks #phone1").addClass("error");
			}
			else if(phonelen > 9){
				$("#locks #phone1").removeClass("error");
			}
			
			if(mailvalid == false) {
				$("#locks #email1").addClass("error");
			}
			else if(mailvalid == true){
				$("#locks #email1").removeClass("error");
			}
			
			if(adreslen < 6) {
				$("#locks #adres1").addClass("error");
			}
			else if(adreslen > 5){
				$("#locks #adres1").removeClass("error");
			}
			
   
				if(phonelen >= 10 && namelen >= 3 && mailvalid == true && adreslen >= 5) {
$('#locks .b3_right_back, .locks .b3_right_title').hide();
							$('.locks .b3_form').hide();
							var $good = $('.good_block3').html();
							$('.locks').append($good);
							form3block3Back1();
					$.ajax({
						url: '/calc.php',
						type: 'POST',
						data: $("#locks #contact1").serialize(),
						success: function()
						{
							
						}
					})
				}
			return false;
		});	
		
	}
	
	// end script locks
	
  
	$("#b4_carousel").owlCarousel({
		autoPlay: false,
		items : 2,
		lazyLoad : true,
		navigation : true,
		pagination : false,
		rewindNav : false,
		itemsDesktop : [1150,2],
		itemsDesktopSmall : [1000,2],
		itemsTablet: [800,1],
		itemsMobile : [600,1]
	});
	
	$('.zakaz-popup').click(function(){

		$('.popup-form').css('top', $(window).scrollTop() + 70).show();
		$('.bg_popup').show();

		$('.bg_popup').click(function(){
			$('.popup-form').hide();
			$('.bg_popup').hide();
		});
		return false;
	});
	
	$('input[type="text"]').focus(function(){
		$(this).removeClass('error');
	});
	
	function validateEmail(email) { 
		var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return reg.test(email);
	}
	
	$("#contact2").submit(function() { return false; });
	$("#send2").on("click", function(){
		var nameval    = $("#name2").val();
		var phoneval   = $("#phone2").val();
		var mailval    = $("#email2").val();
		var adresval   = $("#adres2").val();
		var gravirovkaval = $("#gravirovka2").val();
		$.cookie('name',nameval);
		$.cookie('phone',phoneval);
		$.cookie('email',mailval);
		$.cookie('adres',adresval);
		$.cookie('gravirovka',gravirovkaval);
		var namelen    = nameval.length;
		var phonelen   = phoneval.length;
		var mailvalid  = validateEmail(mailval);
		var adreslen   = adresval.length;
		

		if(namelen < 3) {
			$("#name2").addClass("error");
		}
		else if(namelen > 2){
			$("#name2").removeClass("error");
		}
		
		if(phonelen < 10) {
			$("#phone2").addClass("error");
		}
		else if(phonelen > 9){
			$("#phone2").removeClass("error");
		}
		
		if(mailvalid == false) {
			$("#email2").addClass("error");
		}
		else if(mailvalid == true){
			$("#email2").removeClass("error");
		}
		
		if(adreslen < 6) {
			$("#adres2").addClass("error");
		}
		else if(adreslen > 5){
			$("#adres2").removeClass("error");
		}
		

			if(phonelen >= 10 && namelen >= 3 && mailvalid == true && adreslen >= 5) {
$.fancybox('#good');

				$.ajax({
					url: '/calc.php',
					type: 'POST',
					data: $("#contact2").serialize(),
					success: function()
					{
						
						setTimeout(function(){
							$.fancybox.close();
						}, 6000);
					}
				})
			}
		return false;
	});
			
		$("#contact1").submit(function() { return false; });
		$("#send1").on("click", function(){
			var nameval   = $("#name1").val();
			var phoneval  = $("#phone1").val();
			var mailval  = $("#mail1").val();
			var namelen   = nameval.length;
			var phonelen  = phoneval.length;
			var mailvalid = validateEmail(mailval);
			
   
			if(namelen < 2) {
				$("#name1").addClass("error");
			}
			else if(namelen > 2){
				$("#name1").removeClass("error");
			}
			
			if(phonelen < 10) {
				$("#phone1").addClass("error");
			}
			else if(phonelen > 10){
				$("#phone1").removeClass("error");
			}
			
			if(mailvalid == false) {
				$("#mail1").addClass("error");
			}
			else if(mailvalid == true){
				$("#mail1").removeClass("error");
			}
			
   
				if(phonelen >= 10 && namelen >= 3 && mailvalid == true) {
$.fancybox('<div class="popup-form" style="width: 450px; padding-top: 45px;"><div class="form-title">Ваше заявка успешно отправлена, я с Вами свяжусь, как только проверю почту</div></div>');
					$.ajax({
						url: 'calc.php',
						type: 'POST',
						data: $("#contact1").serialize(),
						success: function()
						{
							
							setTimeout(function(){
								$.fancybox.close();
							}, 6000);
						}
					})
				}
		});	
});

$(document).ready(function() {
    //Chrome Smooth Scroll
    try {
        $.browserSelector();
        if($("html").hasClass("chrome")) {
            $.smoothScroll();
        }
    } catch(err) {

    };
});