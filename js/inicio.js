
window.addEventListener('load', function () {

    const tipoDocumento = this.document.getElementById('tipoDocumento');
    const numeroDocumento = this.document.getElementById('numeroDocumento');
    const password = this.document.getElementById('password');
    const btnIngresar = this.document.getElementById('btnIngresar');
    const msgError = this.document.getElementById('mensaje');

    //implementar listener
    btnIngresar.addEventListener('click', function () {
        //validar campos de entrada
        if (tipoDocumento.value === null || tipoDocumento.value.trim() === '' ||
            numeroDocumento.value === null || numeroDocumento.value.trim() === '' ||
            password.value === null || password.value.trim() === '') {
            mostrarAlerta('Ingrese todos los datos necesarios', msgError);
            return;
        }
        ocultarAlerta(msgError);

        autenticar(tipoDocumento.value, numeroDocumento.value, password.value, msgError);
    });
});

function mostrarAlerta(mensaje, msgError) {
    msgError.innerHTML = mensaje;
    msgError.style.display = 'block';
}

function ocultarAlerta(msgError) {
    msgError.innerHTML = '';
    msgError.style.display = 'none';
}

async function autenticar(tipoDocumento, numeroDocumento, password, msgError) {
    const url = 'http://localhost:8082/login/autenticar-async';
    const data = {
        tipoDocumento: tipoDocumento,
        numeroDocumento: numeroDocumento,
        password: password
    };
    //console.log(data);
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            mostrarAlerta('Error: Problema en la autenticacion', msgError);
            throw new Error(`Error: ${response.statusText}`)
        }

        const result = await response.json();
        console.log('Respuesta del servidor', result);

        if (result.codigo == '00') {
            localStorage.setItem('result', JSON.stringify(result));
            window.location.replace('principal.html')
        } else {
            mostrarAlerta(result.mensaje, msgError);
        }


    } catch (error) {
        console.error('Error: Problema en el servicio', error)
        mostrarAlerta('Error: Problema en el servicio', msgError)
    }
}
