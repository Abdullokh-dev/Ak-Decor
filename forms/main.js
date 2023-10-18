$(document).ready(function() {
	$('form').on('submit', function(e){
		e.preventDefault();
	});
});
$(document).on("click", '.partner-form button:not(.partner-button_disable)', function () {

	if (!$(this).closest('.offcanvas-content').length) {

		let name = $(this).closest('.partner-form').find('input[name="name"]'),
			phone = $(this).closest('.partner-form').find('input[name="phone"]'),
			email = $(this).closest('.partner-form').find('input[name="email"]');
		
		$.ajax({
			url: "forms/partner.php",
			type: "post",
			data: {
				"name": name.val(),
				"phone": phone.val(),
				"email": email.val(),
			},
			dataType: "json",
			beforeSend() {

				$("#partner-form button").addClass("partner-button_disable");

			},
			success: function (data) {

				$("#partner-form button").removeClass("partner-button_disable");

				if (data["code"] == "error-fields") {

					if (name.val().trim() == "") {

						name.addClass("empty-field");

					}

					if (phone.val().trim() == "") {

						phone.addClass("empty-field");

					}

					if (email.val().trim() == "") {

						email.addClass("empty-field");

					}

				} else if (data["code"] == "error-email") {

					email.addClass("empty-field");

				} else if (data["code"] == "success") {

					name.val("");
					phone.val("");
					email.val("");

					$('#modalContainer').css({'display':'flex'});

				}

			}

		});

	}	

});

$(document).on("click", ".consultation-form button:not(.consultation-button_disable)", function () {

	let name = $(this).closest('.consultation-form').find('input[name="name"]'),
		phone = $(this).closest('.consultation-form').find('input[name="phone"]');
		

	$.ajax({
		url: "forms/consultation.php",
		type: "post",
		data: {
			"name": name.val(),
			"phone": phone.val(),
		},
		dataType: "json",
		beforeSend() {

			$("#consultation-form button").addClass("consultation-button_disable");

		},
		success: function (data) {

			$("#consultation-form button").removeClass("consultation-button_disable");

			if (data["code"] == "error-fields") {

				if (name.val().trim() == "") {

					name.addClass("empty-field");
					name.next().addClass('show');

				}

				if (phone.val().trim() == "") {

					phone.addClass("empty-field");
					phone.next().addClass('show');

				}

			} else if (data["code"] == "success") {

				name.val("");
				phone.val("");

				$('#modalContainer').css({'display':'flex'});

			}

		}

	});

});

$(document).on("click", ".offcanvas-content form button:not(.callback-button_disable)", function () {

	let name = $(this).closest('form').find('input[name="name"]'),
		phone = $(this).closest('form').find('input[name="phone"]');
		

	$.ajax({
		url: "forms/callback.php",
		type: "post",
		data: {
			"name": name.val(),
			"phone": phone.val(),
		},
		dataType: "json",
		beforeSend() {

			$(".offcanvas-content form button").addClass("callback-button_disable");

		},
		success: function (data) {

			$(".offcanvas-content form button").removeClass("callback-button_disable");

			if (data["code"] == "error-fields") {

				if (name.val().trim() == "") {

					name.addClass("empty-field");
					name.next().addClass('show');

				}

				if (phone.val().trim() == "") {

					phone.addClass("empty-field");
					phone.next().addClass('show');

				}

			} else if (data["code"] == "success") {

				name.val("");
				phone.val("");

				$('#modalContainer').css({'display':'flex'});

			}

		}

	});

});

$(document).on('focus', '.empty-field', function () {

	$(this).removeClass("empty-field");
	$(this).next().removeClass('show');

});