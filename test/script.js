const ctx = document.getElementById('doughnutChart').getContext('2d');

const totalAmount = 1000; // Monto total a pagar
const initialPayment = 300; // Pago inicial
const finalPayment = 500; // Pago final
const remainingAmount = totalAmount - (initialPayment + finalPayment);

const chart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Pago Inicial', 'Pago Final', 'Monto Restante'],
        datasets: [{
            data: [initialPayment, finalPayment, remainingAmount],
            backgroundColor: ['#4caf50', '#2196f3', '#9e9e9e'], // Colores para los pagos y el fondo
            borderWidth: 0
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const label = context.label || '';
                        if (label) {
                            return `${label}: $${context.raw}`;
                        }
                        return '';
                    }
                }
            }
        },
        cutout: '80%', // Ajusta el tamaño del agujero central de la dona
        rotation: -90, // Rota el gráfico para empezar desde la parte superior
        circumference: 360 // Mantiene el gráfico completo
    }
});
