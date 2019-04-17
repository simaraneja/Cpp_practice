    var element = document.createElement('div');
    element.innerHTML = '<input type="file">';
    var fileInput = element.firstChild;

    fileInput.addEventListener('change', function() {
        var file = fileInput.files[0];

        if (file.name.match(/\.(txt|json)$/)) {
            var reader = new FileReader();

            reader.onload = function() {
                console.log(reader.result);
            };

            reader.readAsText(file);
        } else {
            alert("File not supported, .txt or .json files only");
        }
    });

    fileInput.click();