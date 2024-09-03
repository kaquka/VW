// Función para obtener la fecha actual en formato dd/mm/yyyy
	function getCurrentDate() {
		const now = new Date();
		const day = String(now.getDate()).padStart(2, '0');
		const month = String(now.getMonth() + 1).padStart(2, '0');
		const year = now.getFullYear();
		return `${day}/${month}/${year}`;
	}

// Establece el placeholder con la fecha actual
document.getElementById('start-date').placeholder = getCurrentDate();
document.getElementById('end-date').placeholder = getCurrentDate();


// Aplica flatpickr al input con el id "datepicker"

function openTab(evt, tabName) {
            var i, tabcontent, tabbuttons;
            tabcontent = document.getElementsByClassName("tab-content");
            for (i = 0; i < tabcontent.length; i++) {
                tabcontent[i].style.display = "none";
                tabcontent[i].classList.remove("active");
            }
            tabbuttons = document.getElementsByClassName("tab-button");
            for (i = 0; i < tabbuttons.length; i++) {
                tabbuttons[i].classList.remove("active");
            }
            document.getElementById(tabName).style.display = "block";
            document.getElementById(tabName).classList.add("active");
            evt.currentTarget.classList.add("active");
        }

        // Función para manejar la paginación
        function paginate(tableId, data, pageSize, currentPage) {
            const tableBody = document.getElementById(tableId);
            tableBody.innerHTML = '';

            const start = (currentPage - 1) * pageSize;
            const end = start + pageSize;
            const pageData = data.slice(start, end);

            pageData.forEach(row => {
                const tr = document.createElement('tr');
                Object.values(row).forEach(value => {
                    const td = document.createElement('td');
                    td.textContent = value;
                    tr.appendChild(td);
                });
                tableBody.appendChild(tr);
            });
        }
		
		

        const facturasData = [
    {
        noDocumento: '001',
        serie: 'A',
        folio: '12345',
        fecha: '22/04/2024',
        rfcCliente: 'ABC123456789',
        razonSocial: 'Empresa XYZ',
        cliente: 'Juan Pérez',
        total: '$1000.00',
        moneda: 'MXN',
        referencia: 'Ref001',
        estatus: 'Pendiente',
        archivo: '#'
    },
    {
        noDocumento: '002',
        serie: 'B',
        folio: '12346',
        fecha: '22/04/2024',
        rfcCliente: 'DEF987654321',
        razonSocial: 'Empresa ABC',
        cliente: 'María García',
        total: '$2000.00',
        moneda: 'USD',
        referencia: 'Ref002',
        estatus: 'Pagado',
        archivo: '#'
    },
	{
        noDocumento: '002',
        serie: 'B',
        folio: '12346',
        fecha: '22/04/2024',
        rfcCliente: 'DEF987654321',
        razonSocial: 'Empresa ABC',
        cliente: 'María García',
        total: '$2000.00',
        moneda: 'USD',
        referencia: 'Ref002',
        estatus: 'Pagado',
        archivo: '#'
    },
	{
        noDocumento: '002',
        serie: 'B',
        folio: '12346',
        fecha: '22/04/2024',
        rfcCliente: 'DEF987654321',
        razonSocial: 'Empresa ABC',
        cliente: 'María García',
        total: '$2000.00',
        moneda: 'USD',
        referencia: 'Ref002',
        estatus: 'Pagado',
        archivo: '#'
    },
	{
        noDocumento: '002',
        serie: 'B',
        folio: '12346',
        fecha: '22/04/2024',
        rfcCliente: 'DEF987654321',
        razonSocial: 'Empresa ABC',
        cliente: 'María García',
        total: '$2000.00',
        moneda: 'USD',
        referencia: 'Ref002',
        estatus: 'Pagado',
        archivo: '#'
    }
];

const complementosData = [
    {
        noDocumento: '003',
        serie: 'C',
        folio: '12347',
        fecha: '22/04/2024',
        rfcCliente: 'GHI456123789',
        razonSocial: 'Empresa DEF',
        cliente: 'Carlos López',
        total: '$1500.00',
        moneda: 'MXN',
        referencia: 'Ref003',
        curp: 'LOPC850715HDFRZS07',
        estatus: 'Pendiente',
        archivo: '#'
    },
    {
        noDocumento: '004',
        serie: 'D',
        folio: '12348',
        fecha: '22/04/2024',
        rfcCliente: 'JKL123789456',
        razonSocial: 'Empresa GHI',
        cliente: 'Ana Martínez',
        total: '$2500.00',
        moneda: 'USD',
        referencia: 'Ref004',
        curp: 'MART930125MMCRRR04',
        estatus: 'Pagado',
        archivo: '#'
    }
];

        const pageSizeSelectorFacturas = document.getElementById('page-size-top');
        const pageSizeSelectorComplementos = document.getElementById('page-size-top-complementos');

        let currentPageFacturas = 1;
        let currentPageComplementos = 1;

        function updatePagination() {
            const pageSizeFacturas = parseInt(pageSizeSelectorFacturas.value);
            const pageSizeComplementos = parseInt(pageSizeSelectorComplementos.value);

            paginate('facturas-body', facturasData, pageSizeFacturas, currentPageFacturas);
            paginate('complementos-body', complementosData, pageSizeComplementos, currentPageComplementos);
        }

        pageSizeSelectorFacturas.addEventListener('change', () => {
            currentPageFacturas = 1;
            updatePagination();
        });

        pageSizeSelectorComplementos.addEventListener('change', () => {
            currentPageComplementos = 1;
            updatePagination();
        });

        document.getElementById('first-page-facturas').addEventListener('click', () => {
            currentPageFacturas = 1;
            updatePagination();
        });
        document.getElementById('prev-page-facturas').addEventListener('click', () => {
            if (currentPageFacturas > 1) {
                currentPageFacturas--;
                updatePagination();
            }
        });
        document.getElementById('next-page-facturas').addEventListener('click', () => {
            if (currentPageFacturas * parseInt(pageSizeSelectorFacturas.value) < facturasData.length) {
                currentPageFacturas++;
                updatePagination();
            }
        });
        document.getElementById('last-page-facturas').addEventListener('click', () => {
            currentPageFacturas = Math.ceil(facturasData.length / parseInt(pageSizeSelectorFacturas.value));
            updatePagination();
        });

        document.getElementById('first-page-complementos').addEventListener('click', () => {
            currentPageComplementos = 1;
            updatePagination();
        });
        document.getElementById('prev-page-complementos').addEventListener('click', () => {
            if (currentPageComplementos > 1) {
                currentPageComplementos--;
                updatePagination();
            }
        });
        document.getElementById('next-page-complementos').addEventListener('click', () => {
            if (currentPageComplementos * parseInt(pageSizeSelectorComplementos.value) < complementosData.length) {
                currentPageComplementos++;
                updatePagination();
            }
        });
        document.getElementById('last-page-complementos').addEventListener('click', () => {
            currentPageComplementos = Math.ceil(complementosData.length / parseInt(pageSizeSelectorComplementos.value));
            updatePagination();
        });

        // Inicializar la tabla con la primera página de datos
        updatePagination();