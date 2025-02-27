document.addEventListener("DOMContentLoaded", () => {
    // Simulación de datos
    const inventoryData = {
        available: 42,
        maintenance: 5
    };

    const eventData = {
        active: 3
    };

    const clientsData = {
        total: 25
    };

    // Actualizar estadísticas
    document.getElementById("available-equipments").textContent = inventoryData.available;
    document.getElementById("maintenance-equipments").textContent = inventoryData.maintenance;
    document.getElementById("active-events").textContent = eventData.active;
    document.getElementById("clients-count").textContent = clientsData.total;

    // Gráficos con Chart.js
    new Chart(document.getElementById("equipmentChart"), {
        type: "doughnut",
        data: {
            labels: ["Disponibles", "En Mantenimiento"],
            datasets: [{
                data: [inventoryData.available, inventoryData.maintenance],
                backgroundColor: ["#00ff00", "#ff0000"]
            }]
        }
    });

    new Chart(document.getElementById("eventsChart"), {
        type: "bar",
        data: {
            labels: ["Eventos Activos"],
            datasets: [{
                data: [eventData.active],
                backgroundColor: "#00ff00"
            }]
        }
    });
});
