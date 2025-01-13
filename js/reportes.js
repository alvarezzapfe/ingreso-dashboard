// reportes.js

// Función para alternar las opciones de un reporte
function toggleOptions(id) {
  const element = document.getElementById(id);
  element.classList.toggle("ocultar");
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
