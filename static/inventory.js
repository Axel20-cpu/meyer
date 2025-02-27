document.addEventListener("DOMContentLoaded", () => {
    // Elementos del DOM
    const addEquipmentButton = document.getElementById("add-equipment-button");
    const addEquipmentModal = document.getElementById("add-equipment-modal");
    const closeModalButton = document.getElementById("close-modal");
    const addEquipmentForm = document.getElementById("add-equipment-form");
    const equipmentTableBody = document.getElementById("equipment-table-body");
    const exportButton = document.getElementById("export-button");
    const scanButton = document.getElementById("scan-button"); // Botón de escaneo

    // Obtener lista de equipos de localStorage
    let equipmentList = JSON.parse(localStorage.getItem("equipmentList")) || [];

    // Función para renderizar la lista de equipos
    function renderEquipmentList() {
        equipmentTableBody.innerHTML = "";

        if (equipmentList.length === 0) {
            equipmentTableBody.innerHTML = `<tr><td colspan="5">No hay equipos registrados.</td></tr>`;
            return;
        }

        equipmentList.forEach((equipment, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${equipment.id}</td>
                <td>${equipment.name}</td>
                <td>${equipment.category}</td>
                <td>${equipment.status}</td>
                <td>
                    <button class="delete-btn" data-index="${index}">🗑 Eliminar</button>
                </td>
            `;
            equipmentTableBody.appendChild(row);
        });

        // Agregar funcionalidad de eliminación
        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", (e) => {
                const index = e.target.dataset.index;
                equipmentList.splice(index, 1);
                localStorage.setItem("equipmentList", JSON.stringify(equipmentList));
                renderEquipmentList();
            });
        });
    }

    // Evento para abrir el modal
    if (addEquipmentButton) {
        addEquipmentButton.addEventListener("click", () => {
            addEquipmentModal.style.display = "block";
        });
    }

    // Evento para cerrar el modal
    if (closeModalButton) {
        closeModalButton.addEventListener("click", () => {
            addEquipmentModal.style.display = "none";
        });
    }

    // Evento para agregar un nuevo equipo
    if (addEquipmentForm) {
        addEquipmentForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const id = `EQ${Date.now()}`;
            const name = document.getElementById("equipment-name").value;
            const category = document.getElementById("equipment-category").value;
            const status = document.getElementById("equipment-status").value;

            equipmentList.push({ id, name, category, status });
            localStorage.setItem("equipmentList", JSON.stringify(equipmentList));
            renderEquipmentList();
            addEquipmentForm.reset();
            addEquipmentModal.style.display = "none";
        });
    }

    // Evento para exportar a Excel
    if (exportButton) {
        exportButton.addEventListener("click", () => {
            if (equipmentList.length === 0) {
                alert("No hay equipos para exportar.");
                return;
            }

            const ws = XLSX.utils.json_to_sheet(equipmentList);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Inventario");
            XLSX.writeFile(wb, "Inventario_Rigging.xlsx");
        });
    }

    // Evento para el botón de escaneo de código
    if (scanButton) {
        scanButton.addEventListener("click", () => {
            alert("Funcionalidad de escaneo QR/Barras en desarrollo...");
        });
    }

    // Renderizar la lista de equipos al cargar la página
    renderEquipmentList();
});
