// reportes.js

// Función para alternar las opciones de un reporte
function toggleOptions(id) {
  const element = document.getElementById(id);
  element.classList.toggle("ocultar");
}

// Configuracion Reportes regulatorios

// Actualizar un campo con entrada de texto
function actualizarCampo(id) {
  const input = document.getElementById(id);
  if (input.disabled) {
    input.disabled = false;
    input.focus();
  } else {
    input.disabled = true;
    alert(`Nuevo valor para ${id}: ${input.value}`);
  }
}

// Cambiar el mes del reporte
function cambiarMesReporte() {
  const mes = document.getElementById("mesReporte").value;
  alert(`Mes seleccionado: ${mes}`);
}

// Calcular fechas de inicio y fin de mes
function calcularFechas() {
  const mes = document.getElementById("mesReporte").value;
  const year = new Date().getFullYear();
  const meses = {
    Enero: 0,
    Febrero: 1,
    Marzo: 2,
    Abril: 3,
    Mayo: 4,
    Junio: 5,
    Julio: 6,
    Agosto: 7,
    Septiembre: 8,
    Octubre: 9,
    Noviembre: 10,
    Diciembre: 11,
  };

  const inicio = new Date(year, meses[mes], 1);
  const fin = new Date(year, meses[mes] + 1, 0);

  document.getElementById("fechaInicio").value = inicio
    .toISOString()
    .split("T")[0];
  document.getElementById("fechaFin").value = fin.toISOString().split("T")[0];

  alert(
    `Fechas calculadas:\nInicio: ${inicio.toISOString().split("T")[0]}\nFin: ${
      fin.toISOString().split("T")[0]
    }`
  );
}

// Función para transformar un archivo Excel a JSON
function transformar(fileInputId, resultId) {
  const fileInput = document.getElementById(fileInputId);
  const file = fileInput.files[0];
  if (!file) {
    alert("Por favor, selecciona un archivo.");
    return;
  }
  const reader = new FileReader();
  reader.onload = function (e) {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    const transformedData = json.map((row) => ({
      columna1: row[0],
      columna2: row[1],
    }));
    document.getElementById(resultId).textContent = JSON.stringify(
      transformedData,
      null,
      2
    );
  };
  reader.readAsArrayBuffer(file);
}

// Función para descargar JSON
function descargar(resultId) {
  const jsonContent = document.getElementById(resultId).textContent;
  if (!jsonContent) {
    alert("Primero transforma el archivo a JSON.");
    return;
  }
  const blob = new Blob([jsonContent], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${resultId}.json`;
  link.click();
}
