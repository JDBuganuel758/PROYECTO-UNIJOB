document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar el formulario de filtros y el listado de ofertas
    const filtroForm = document.querySelector('.filtro-card');
    const ofertaListado = document.querySelector('.resultados-listado');
    const ofertaCards = document.querySelectorAll('.oferta-card'); // Lista actual de ofertas

    // NOTA: Para un proyecto real, estas ofertas se cargarían dinámicamente desde un backend.
    // Aquí solo simularemos la funcionalidad de escucha.

    // 1. FUNCIÓN PRINCIPAL DE FILTRADO (Simulación)
    function aplicarFiltros(event) {
        // En un entorno real, aquí enviarías una solicitud AJAX al servidor
        // con los valores de los inputs. Aquí, solo mostraremos una alerta.

        let filtrosActivos = {};
        
        // Recoger todos los valores del formulario
        const inputs = filtroForm.querySelectorAll('input, select');
        inputs.forEach(input => {
            if (input.type === 'checkbox' && input.checked) {
                // Para checkboxes, guardamos los valores marcados
                if (!filtrosActivos[input.name]) {
                    filtrosActivos[input.name] = [];
                }
                filtrosActivos[input.name].push(input.value);
            } else if (input.type !== 'checkbox' && input.value) {
                // Para inputs de texto y selects
                filtrosActivos[input.name || input.className] = input.value;
            }
        });

        // Crear mensaje de simulación
        let mensaje = "Buscando ofertas con los siguientes criterios:\n";
        for (const key in filtrosActivos) {
            mensaje += `- ${key}: ${filtrosActivos[key]}\n`;
        }

        if (Object.keys(filtrosActivos).length === 0) {
            mensaje = "No se aplicaron filtros. Mostrando todas las ofertas.";
        }

        // Simular la acción (en un entorno real, esta parte se reemplazaría por la manipulación del DOM)
        console.log(mensaje);
        // alert(mensaje); 
        
        // Para simular el resultado visual, simplemente ocultamos las tarjetas
        ofertaCards.forEach(card => {
             // Simulación: Oculta aleatoriamente para demostrar que el código de escucha funciona
             card.style.opacity = Math.random() > 0.4 ? 1 : 0.2; 
        });
    }

    // 2. ESCUCHADORES DE EVENTOS
    
    // Escuchar el botón de Búsqueda
    const btnBuscar = filtroForm.querySelector('.btn-buscar');
    if (btnBuscar) {
        btnBuscar.addEventListener('click', (e) => {
            e.preventDefault(); // Evita que el formulario recargue la página
            aplicarFiltros(e);
        });
    }
    
    // Escuchar cambios en los SELECTS y CHECKBOXES (filtrado instantáneo)
    filtroForm.addEventListener('change', aplicarFiltros);

    // Escuchar el botón Limpiar Filtros
    const btnLimpiar = filtroForm.querySelector('.btn-limpiar');
    if (btnLimpiar) {
        btnLimpiar.addEventListener('click', (e) => {
            e.preventDefault();
            // Limpiar todos los inputs del formulario
            filtroForm.reset(); 
            // Restablecer la visualización de las ofertas (en la simulación, restaurar la opacidad)
            ofertaCards.forEach(card => {
                card.style.opacity = 1;
            });
            console.log("Filtros limpiados. Mostrando todas las ofertas.");
        });
    }

    console.log("Módulo de filtros de ofertas cargado.");
});