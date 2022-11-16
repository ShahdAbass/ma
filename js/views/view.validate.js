(function($) {

    'use strict';


    $.validator.setDefaults({
        highlight: function(element) {
            $(element).closest('.form-group').removeClass('has-success');
            $(element).removeClass('is-valid').removeClass('valid');
            $(element).closest('.form-group').addClass('has-danger');
            $(element).addClass('is-invalid');
        },
        unhighlight: function(element) {
            $(element).closest('.form-group').removeClass('has-danger');
            $(element).removeClass('is-invalid');
            $(element).closest('.form-group').addClass('has-success');
            $(element).addClass('is-valid').addClass('valid');
        },
        errorElement: 'label',
        errorClass: 'error',
        errorPlacement: function(error, element) {
            if (element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
    });
    $.validator.addMethod("noSpace", function(value, element) {
        if ($(element).attr('required')) {
            return value.search(/[a-zA-Z0-9À-žа-яА-ЯёЁα-ωΑ-Ω\s\u0621-\u064A\u0660-\u0669 ]/i) == 0;
        }

        return true;
    }, 'Please fill this empty field.');

    /*
	Assign Custom Rules on Fields
	*/
    $.validator.addClassRules({
        'form-control': {
            noSpace: true
        }
    });

    $('.form').each(function() {
        $(this).submit(function(e) {
            var isValid = true;
            $('input[type=text]').each(function() {
                if (isValid) {
                    isValid = $(this).valid();
                } else {
                    $(this).valid(); //to avoid setting true once any control is invalid
                }
            });
            if (!isValid) {
                e.preventDefault();
            }
        });

        $(this).validate();
    });






}).apply(this, [jQuery]);