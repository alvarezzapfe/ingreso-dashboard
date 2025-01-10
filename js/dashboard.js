// Cambiar de sección al hacer clic en el menú lateral
document.addEventListener("DOMContentLoaded", () => {
  showSection("dashboard"); // Asegura que el Dashboard sea la sección activa al cargar
});

function showSection(sectionId) {
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => section.classList.remove("active"));

  const activeSection = document.getElementById(sectionId);
  activeSection.classList.add("active");
}

// Función para abrir/cerrar las opciones del menú superior
function toggleMenu() {
  const menuOptions = document.getElementById("menuOptions");
  menuOptions.style.display =
    menuOptions.style.display === "block" ? "none" : "block";
}

// Función para cambiar entre pestañas
function showInfoTab(tabId) {
  const tabs = document.querySelectorAll(".info-tab");
  tabs.forEach((tab) => tab.classList.remove("active"));

  const activeTab = document.getElementById(tabId);
  activeTab.classList.add("active");
}

// Gráfica de credito seccion dashboard

document.getElementById("fileInput").addEventListener("change", handleFile);

function handleFile(event, resultId) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = function (e) {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    console.log("JSON result:", json);
    displayJSON(json, resultId);
  };
  reader.readAsArrayBuffer(file);
}

function displayJSON(json, resultId) {
  const resultDiv = document.getElementById(resultId);
  resultDiv.textContent = JSON.stringify(json, null, 2);
}

function toggleOptions(id) {
  const element = document.getElementById(id);
  element.classList.toggle("ocultar");
}

// Funciones para transformar y descargar archivos
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
    document.getElementById(resultId).textContent = JSON.stringify(
      json,
      null,
      2
    );
  };
  reader.readAsArrayBuffer(file);
}

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
