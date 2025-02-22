document.getElementById('startScanner').addEventListener('click', function() {
    // Inicializar QuaggaJS
    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.querySelector('#scanner'),
            constraints: {
                width: 480,
                height: 320,
                facingMode: "environment" // Usar la cámara trasera
            }
        },
        decoder: {
            readers: ["ean_reader", "upc_reader", "code_39_reader", "code_128_reader"]
        }
    }, function(err) {
        if (err) {
            console.error(err);
            return;
        }
        console.log("Inicialización exitosa. Escaneando...");
        Quagga.start();
    });

    // Detectar códigos de barras
    Quagga.onDetected(function(result) {
        const code = result.codeResult.code;
        const listItem = document.createElement('li');
        listItem.textContent = code;
        document.getElementById('scannedCodes').appendChild(listItem);
    });
});