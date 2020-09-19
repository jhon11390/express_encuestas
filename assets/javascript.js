$(document).ready(function(){
	$('#add_field').click (function(e) {
		e.preventDefault();     //prevenir novos clicks
			$('#addoption3').append('<div class="input-group">\
				<input type="text" name="option3" class="form-control" id="option3" placeholder="Opcion 3">\
				<div class="input-group-append"><a href="#" class="remover_campo btn btn-primary"><i class="fas fa-trash-alt"></i></a></div>\
				</div>');
		$(this).hide();
	});

	$('#addoption3').on("click",".remover_campo",function(e) {
		e.preventDefault();
		$(this).parent('div').parent('div').remove();
		$("#add_field").show();
	});
})
