document.addEventListener('DOMContentLoaded', () => {
    // 1. Obtener todos los botones de categoría y todas las tarjetas de recurso
    const categoriaBtns = document.querySelectorAll('.btn-categoria');
    const recursosCards = document.querySelectorAll('.recurso-card');

    // Mapear los botones a sus categorías correspondientes (usando data-category)
    const categoriaMap = {
        'Todo': 'all',
        'CV y Entrevistas': 'cv',
        'Habilidades Blandas': 'habilidades',
        'Tecnología y Herramientas': 'tecnologia',
        'Prácticas y Becas': 'practicas'
    };

    /**
     * Función principal para filtrar los recursos.
     * @param {string} filtro - La categoría a mostrar ('cv', 'habilidades', 'all', etc.).
     */
    function filtrarRecursos(filtro) {
        recursosCards.forEach(card => {
            const categoriaCard = card.getAttribute('data-category');

            // Mostrar si el filtro es 'all' o si la categoría de la tarjeta coincide con el filtro
            if (filtro === 'all' || categoriaCard === filtro) {
                card.style.display = 'block'; // Mostrar la tarjeta
            } else {
                card.style.display = 'none'; // Ocultar la tarjeta
            }
        });
    }

    // 2. Añadir Event Listener a cada botón de categoría
    categoriaBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault(); // Previene la navegación de la etiqueta <a>

            // 3. Obtener el texto del botón y buscar el filtro clave
            const nombreCategoria = btn.textContent;
            let filtro = categoriaMap[nombreCategoria] || 'all'; // Default a 'all' si no se encuentra

            // Si es el botón 'Todo', el filtro es 'all'
            if (nombreCategoria === 'Todo') {
                filtro = 'all';
            } else {
                // Para las categorías que no tienen un 'data-category' asignado en el HTML
                // necesitamos tomar el valor del mapa.
                // Si ya hubieras puesto data-category en el HTML de los botones, sería más fácil.
                // Aquí usamos el mapa para obtener el filtro.
                filtro = categoriaMap[nombreCategoria];
            }
            
            // 4. Actualizar la clase 'active' para el estilo visual
            categoriaBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // 5. Aplicar el filtrado
            filtrarRecursos(filtro);
        });
    });

    // Asegurar que al cargar la página, se muestre la categoría "Todo" por defecto
    filtrarRecursos('all'); 
});