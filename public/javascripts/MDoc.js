$(document).ready(function () {
	var converter1 = Markdown.getSanitizingConverter();
	var editor1 = new Markdown.Editor(converter1);
	editor1.run();

	$('#save').click(function() {
		var data = {
			text: $('#wmd-input').val()
		}
		$.post('/', data, function(text) {
			alert(text.result);
		});
	});


}	);
