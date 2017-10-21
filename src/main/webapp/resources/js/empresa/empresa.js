jQuery(function ($) {
    onKeyDownAddMasks();
    setLocationCoordinates();
    onBlurGetAddressWithCEP();
});

function onKeyDownAddMasks() {
    var $cnpj = $("input[id*='cnpj']");
    $cnpj.keydown(function () {
        $cnpj.mask("99.999.999/9999-99");
    });
}

function setLocationCoordinates() {

    var geocoder = new google.maps.Geocoder();
    var $numero = $("input[id*='numero']");
    var $logradouro = $("input[id*='logradouro']");
    var $bairro = $("input[id*='bairro']");
    var $municipio = $("input[id*='municipio']");
    var $latitude = $("input[id*='latitude']");
    var $longitude = $("input[id*='longitude']");

    $('.coordinate').blur(function () {
        var numero = $numero.val();
        var logradouro = $logradouro.val();
        var bairro = $bairro.val();
        var municipio = $municipio.val();

        if (numero !== "" && logradouro !== "" && bairro !== "" && municipio !== "") {
            var endereco = numero + " " + logradouro + ", " + bairro + ", " + municipio;
            var lat = -43.96;
            var lng = -43.96;

            geocoder.geocode({'address': endereco}, function (r, s) {
                lat = r[0].geometry.location.lat();
                lng = r[0].geometry.location.lng();
                $latitude.val(lat);
                $longitude.val(lng);
            });
        }
    });
};

function onBlurGetAddressWithCEP() {
    var $cep = $("input[id*='cep']");
    var $logradouro = $("input[id*='logradouro']");
    var $bairro = $("input[id*='bairro']");
    var $municipio = $("input[id*='municipio']");
    var $estado = $("input[id*='estado']");

    $($cep).blur(function () {
        var cep = $(this).val().replace(/\D/g, '');

        if (cep !== "") {
            $.ajax({
                url: "//viacep.com.br/ws/" + cep + "/json/?callback=?",
                dataType: 'json',
                timeout: 1000,
                success: function (dados) {
                    $($logradouro).val(dados.logradouro).focus();
                    $($bairro).val(dados.bairro).focus();
                    $($municipio).val(dados.localidade).focus();
                    $($estado).val(dados.uf).focus();
                },
                error: function () {
                    $cep.addClass('invalid');
                    $($logradouro).val("").focusout();
                    $($bairro).val("").focusout();
                    $($municipio).val("").focusout();
                    $($estado).val("").focusout();
                }
            });
        }
    })

}
