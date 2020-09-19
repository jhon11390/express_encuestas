
$(document).ready(function(){
	$('#addoption3').hide()
	$('#add_field').click (function(e) {
		e.preventDefault();
		$('#addoption3').show();
		$("#option3").attr("required", true);
		$(this).hide();
	});

	$('#button-addon2').click(function(e){
		e.preventDefault();
		$('#addoption3').hide();
		$("#option3").attr("required", false);
		$('#add_field').show();
	})

})
