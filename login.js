document.addEventListener('DOMContentLoaded', () => {
    
    // ===========================================
    // 1. Lógica de Inicialización (Lectura de URL)
    // ===========================================
    const urlParams = new URLSearchParams(window.location.search);
    const action = urlParams.get('action');

    // Valores por defecto: Estudiante y Login
    let initialRol = 'estudiante'; 
    let initialTab = 'login';      

    // Verifica el parámetro de la URL para inicializar el formulario correcto
    if (action === 'register_empresa') {
        initialRol = 'empresa';
        initialTab = 'register';
    } else if (action === 'register_estudiante') {
        initialRol = 'estudiante';
        initialTab = 'register';
    }


    // ===========================================
    // 2. Lógica de Login y Registro (Pestañas y Roles)
    // ===========================================
    const rolButtons = document.querySelectorAll('.btn-rol');
    const tabButtons = document.querySelectorAll('.btn-tab');
    const allForms = document.querySelectorAll('.login-form');

    /**
     * Muestra el formulario correcto según el rol y la pestaña activa.
     * @param {string} rol - 'estudiante' o 'empresa'.
     * @param {string} tab - 'login' o 'register'.
     */
    const mostrarFormulario = (rol, tab) => {
        allForms.forEach(form => {
            const formRol = form.getAttribute('data-rol');
            const formTab = form.getAttribute('data-tab');

            if (formRol === rol && formTab === tab) {
                form.classList.add('active');
            } else {
                form.classList.remove('active');
            }
        });
    };

    /**
     * Actualiza la clase 'active' en los botones de la interfaz (Visual).
     */
    const updateInterface = (rol, tab) => {
        // Actualiza botones de Rol
        rolButtons.forEach(b => {
            b.classList.remove('active');
            if (b.getAttribute('data-rol') === rol) {
                b.classList.add('active');
            }
        });
        // Actualiza botones de Tab
        tabButtons.forEach(b => {
            b.classList.remove('active');
            if (b.getAttribute('data-tab') === tab) {
                b.classList.add('active');
            }
        });
    }

    // Manejo de eventos de clic para el cambio de Rol
    rolButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const nuevoRol = btn.getAttribute('data-rol');
            const activeTab = document.querySelector('.btn-tab.active').getAttribute('data-tab');
            updateInterface(nuevoRol, activeTab);
            mostrarFormulario(nuevoRol, activeTab);
        });
    });

    // Manejo de eventos de clic para el cambio de Pestaña (Login/Register)
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const nuevaTab = btn.getAttribute('data-tab');
            const activeRol = document.querySelector('.btn-rol.active').getAttribute('data-rol');
            updateInterface(activeRol, nuevaTab);
            mostrarFormulario(activeRol, nuevaTab);
        });
    });

    // 3. Inicialización del Login/Registro al Cargar la Página
    updateInterface(initialRol, initialTab);
    mostrarFormulario(initialRol, initialTab);


    // ===========================================
    // 4. LÓGICA DE ENVÍO DE FORMULARIOS (Simulación de Redirección y Pago)
    // ===========================================
    allForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Evita la recarga (Envío real)
            
            // Obtener el rol actual para determinar la redirección
            const formRol = form.getAttribute('data-rol');
            const formTab = form.getAttribute('data-tab');
            
            // Simulación de validación (debería ser un chequeo al backend)
            console.log(`Simulando envío de ${formTab} para ${formRol}...`);

            if (formRol === 'empresa' && formTab === 'register') {
                // Flujo de Registro de Empresa -> Redirige al Pago
                console.log("Registro de empresa exitoso. Redirigiendo a la pasarela de pago.");
                window.location.href = 'pago_plan_pro.html';

            } else if (formRol === 'empresa' && formTab === 'login') {
                // Flujo de Login de Empresa (Asume que va a pagar/suscribirse al iniciar)
                console.log("Login de empresa exitoso. Redirigiendo al Dashboard o Pasarela de Pago.");
                window.location.href = 'pago_plan_pro.html'; // Redirección a pago para simular suscripción

            } else {
                // Flujo por defecto (Estudiante: Login o Registro) -> Redirige a Ofertas
                console.log("Acceso de estudiante exitoso. Redirigiendo a ofertas.html");
                window.location.href = 'ofertas.html'; 
            }
        });
    });


    // ===========================================
    // 5. LÓGICA DE RECURSOS (Filtros Dinámicos)
    // ===========================================
    const categoriaBtns = document.querySelectorAll('.btn-categoria');
    const recursosCards = document.querySelectorAll('.recurso-card');

    function filtrarRecursos(filtro) {
        recursosCards.forEach(card => {
            const categoriaCard = card.getAttribute('data-category');
            if (filtro === 'all' || categoriaCard === filtro) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    categoriaBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const filtro = btn.getAttribute('data-category');
            categoriaBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filtrarRecursos(filtro);
        });
    });

    if (recursosCards.length > 0) {
        filtrarRecursos('all'); 
    }
});