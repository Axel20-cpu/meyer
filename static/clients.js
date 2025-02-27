document.addEventListener("DOMContentLoaded", () => {
    // Elementos del DOM
    const addClientButton = document.getElementById("add-client-button");
    const addClientModal = document.getElementById("add-client-modal");
    const closeModalButton = document.getElementById("close-modal");
    const addClientForm = document.getElementById("add-client-form");
    const clientsTableBody = document.getElementById("clients-table-body");
    const exportButton = document.getElementById("export-button");

    // Obtener lista de clientes desde localStorage
    let clientsList = JSON.parse(localStorage.getItem("clientsList")) || [];

    // Función para renderizar la lista de clientes
    function renderClientsList() {
        clientsTableBody.innerHTML = "";

        if (clientsList.length === 0) {
            clientsTableBody.innerHTML = `<tr><td colspan="6">No hay clientes registrados.</td></tr>`;
            return;
        }

        clientsList.forEach((client, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${client.id}</td>
                <td>${client.name}</td>
                <td>${client.company}</td>
                <td>${client.email}</td>
                <td>${client.phone}</td>
                <td>
                    <button class="delete-btn" data-index="${index}">🗑 Eliminar</button>
                </td>
            `;
            clientsTableBody.appendChild(row);
        });

        // Agregar funcionalidad de eliminación
        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", (e) => {
                const index = e.target.dataset.index;
                clientsList.splice(index, 1);
                localStorage.setItem("clientsList", JSON.stringify(clientsList));
                renderClientsList();
            });
        });
    }

    // FUNCIONES PARA EL MODAL DE AGREGAR CLIENTE
    function openModal() {
        addClientModal.style.display = "block";
        document.body.style.overflow = "hidden"; // Evita el scroll de fondo
    }

    function closeModal() {
        addClientModal.style.display = "none";
        document.body.style.overflow = "auto"; // Restaura el scroll
        addClientForm.reset(); // Limpia el formulario al cerrar
    }

    // Evento para abrir el modal
    addClientButton.addEventListener("click", openModal);

    // Evento para cerrar el modal con el botón "Cancelar"
    closeModalButton.addEventListener("click", closeModal);

    // Cerrar el modal si se hace clic fuera del contenido
    window.addEventListener("click", (event) => {
        if (event.target === addClientModal) {
            closeModal();
        }
    });

    // Evento para agregar un nuevo cliente
    addClientForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Obtener valores del formulario
        const id = `CL${Date.now()}`;
        const name = document.getElementById("client-name").value.trim();
        const company = document.getElementById("client-company").value.trim();
        const email = document.getElementById("client-email").value.trim();
        const phone = document.getElementById("client-phone").value.trim();

        // Validaciones
        if (!name || !company || !email || !phone) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        // Agregar cliente a la lista
        clientsList.push({ id, name, company, email, phone });
        localStorage.setItem("clientsList", JSON.stringify(clientsList));

        // Actualizar la tabla y cerrar el modal
        renderClientsList();
        closeModal();
    });

    // Exportar a Excel
    exportButton.addEventListener("click", () => {
        if (clientsList.length === 0) {
            alert("No hay clientes para exportar.");
            return;
        }

        const ws = XLSX.utils.json_to_sheet(clientsList);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Clientes");
        XLSX.writeFile(wb, "Clientes_Rigging.xlsx");
    });

    // Renderizar la lista de clientes al cargar la página
    renderClientsList();
});
