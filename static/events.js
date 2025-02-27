document.addEventListener("DOMContentLoaded", () => {
    const eventsTableBody = document.getElementById("events-table-body");
    const searchInput = document.getElementById("search-input");
    const statusFilter = document.getElementById("status-filter");
    const addEventForm = document.getElementById("add-event-form");

    const addEventButton = document.getElementById("add-event-button");
    const addEventModal = document.getElementById("add-event-modal");
    const closeModalButton = document.getElementById("close-modal");
    const exportButton = document.getElementById("export-button");

    let eventsList = JSON.parse(localStorage.getItem("eventsList")) || [];

    // Función para renderizar eventos
    function renderEvents() {
        eventsTableBody.innerHTML = "";

        if (eventsList.length === 0) {
            eventsTableBody.innerHTML = `<tr><td colspan="7">No hay eventos registrados.</td></tr>`;
            return;
        }

        eventsList.forEach((event, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${event.id}</td>
                <td>${event.name}</td>
                <td>${event.client}</td>
                <td>${event.date}</td>
                <td>${event.location}</td>
                <td>${event.status}</td>
                <td>
                    <button class="delete-btn" data-index="${index}">🗑 Eliminar</button>
                </td>
            `;
            eventsTableBody.appendChild(row);
        });

        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", (e) => {
                const index = e.target.dataset.index;
                eventsList.splice(index, 1);
                localStorage.setItem("eventsList", JSON.stringify(eventsList));
                renderEvents();
            });
        });
    }

    // Función para agregar un evento
    addEventForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const id = `EV${Date.now()}`;
        const name = document.getElementById("event-name").value;
        const client = document.getElementById("event-client").value;
        const date = document.getElementById("event-date").value;
        const location = document.getElementById("event-location").value;
        const status = document.getElementById("event-status").value;

        eventsList.push({ id, name, client, date, location, status });
        localStorage.setItem("eventsList", JSON.stringify(eventsList));
        renderEvents();
        addEventForm.reset();
        addEventModal.style.display = "none";
    });

    // Función para abrir el modal
    addEventButton.addEventListener("click", () => {
        addEventModal.style.display = "block";
    });

    // Función para cerrar el modal
    closeModalButton.addEventListener("click", () => {
        addEventModal.style.display = "none";
    });

    // Exportar a Excel
    exportButton.addEventListener("click", () => {
        if (eventsList.length === 0) {
            alert("No hay eventos para exportar.");
            return;
        }

        const ws = XLSX.utils.json_to_sheet(eventsList);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Eventos");
        XLSX.writeFile(wb, "Eventos_Rigging.xlsx");
    });

    // Renderizar eventos al cargar la página
    renderEvents();
});
