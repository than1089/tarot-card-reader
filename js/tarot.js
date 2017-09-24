jQuery(document).ready(function($){
	$('form#birthdate').submit(function(e){
		e.preventDefault();
		var error = false;
		$(this).find('.form-group').removeClass('has-danger');
		$(this).find('.form-control-feedback').remove();

		$(this).find('input[type=number]').each(function(){
			switch(this.id){
				case 'month':
					if (!this.value){
						$(this).parent().addClass('has-danger');
						$(this).parent().append('<div class="form-control-feedback">This field is required.</div>');
						error = true;
						break;
					}
					if (this.value.match(/[\D]/) || Number(this.value) > 12 || Number(this.value) < 1){
						$(this).parent().addClass('has-danger');
						$(this).parent().append('<div class="form-control-feedback">Invalid month.</div>');
						error = true;
					}
					break;
				case 'day':
					if (!this.value){
						$(this).parent().addClass('has-danger');
						$(this).parent().append('<div class="form-control-feedback">This field is required.</div>');
						error = true;
						break;
					}
					if (this.value.match(/[\D]/) || Number(this.value) > 31 || Number(this.value) < 1){
						$(this).parent().addClass('has-danger');
						$(this).parent().append('<div class="form-control-feedback">Invalid day.</div>');
						error = true;
					}
					break;
				case 'year':
					if (!this.value){
						$(this).parent().addClass('has-danger');
						$(this).parent().append('<div class="form-control-feedback">This field is required.</div>');
						error = true;
						break;
					}
					if (!this.value.match(/^\d{4}$/)){
						$(this).parent().addClass('has-danger');
						$(this).parent().append('<div class="form-control-feedback">Invalid year.</div>');
						error = true;
					}
					break;
			}
		});

		if (!error){
			var day   = Number($('#day').val());
			var month = Number($('#month').val());
			var year  = Number($('#year').val());

			var number = day+month+year;
			while (number > 21){
				number = String(number).split('').reduce(function(accumulator, currentValue) {
				    return Number(accumulator) + Number(currentValue);
				});
			}

			$('#card').animateCss({
				animationName: 'rollOut',
				callback: function () {
					$('#card').attr('src', 'img/'+tarots[number].img).animateCss({animationName: 'rollIn'});
				}
			});
		}

	});
})
$.fn.extend({
    animateCss: function (options) {
    	var settings = $.extend({}, {
    		animationName: 'bounce',
    		callback: function(){}
    	}, options );
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + settings.animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + settings.animationName);
            settings.callback();
        });
        return this;
    }
});