---
titulo: "Pipeline de Datos End-to-End"
contexto: "Metalúrgica Cesca · Vinculación UTN San Francisco"
rol: "Data Engineer & Analista de Datos"
periodo: "2024 – 2025"
estado: "finalizado"
orden: 1
resumen: "Pipeline ETL que toma archivos operativos desordenados de clientes, facturación y deudores y los convierte en información estructurada para el análisis gerencial, con dashboards de KPIs y segmentación de clientes."
repo: ""   # URL del repositorio en GitHub (vacío = no se muestra el ícono)
tags: ["Python", "n8n", "Docker", "Google Sheets API", "Google Drive API", "Looker Studio", "K-Means"]
# Imágenes en public/proyectos/pipeline-metalurgica-cesca/
imagenes:
  - src: "flujo-pipeline.jpg"
    alt: "Flujo de n8n del pipeline: análisis de duplicados, limpieza de archivos con scripts de Python, carga en Google Sheets y eliminación de los archivos locales"
    caption: "Flujo del pipeline en n8n"
  - src: "panel-inicial.jpg"
    alt: "Pantalla inicial del Panel Ejecutivo de Gestión de Metalúrgica Cesca con accesos a montos y cantidades facturadas, clientes, evolución de ventas, comprobantes por localidad, mapa de calor y estado de clientes"
    caption: "Panel ejecutivo: selección del área de análisis"
  - src: "estadisticas.jpg"
    alt: "Tablero de monto de productos facturados con filtros, indicadores y el top 20 de productos por monto vendido, con los valores difuminados"
    caption: "Tablero de productos facturados (valores ocultos)"
# tipo: docs | repo | paper | demo | video | presentacion | api | otro
# - { tipo: "docs", label: "Documentación Técnica", url: "https://..." }
links: []
---

## Desafíos técnicos

- Procesar archivos operativos heterogéneos y desordenados, sin un formato estable.
- Evitar registros duplicados y mantener la trazabilidad de cada dato procesado.
- Automatizar el flujo de punta a punta para que la empresa no dependa de tareas manuales.
- Dejar una solución que el equipo de la empresa pueda usar y mantener.

## Solución implementada

- Orquestación con n8n desplegado en Docker, con detección automática de archivos nuevos.
- Limpieza y normalización de datos con scripts en Python, control de duplicados y trazabilidad del proceso.
- Carga y versionado de los datos en Google Sheets y Google Drive vía APIs, organizados por clientes, facturación y deudores.
- Dashboards en Looker Studio con KPIs para decisiones comerciales.
- Segmentación de clientes con K-Means como capa de analítica avanzada.

## Impacto

La empresa pasó de archivos operativos dispersos a información estructurada y actualizada automáticamente, con tableros listos para el análisis gerencial y la toma de decisiones comerciales.

## Metodología

Proyecto de vinculación entre la universidad y la empresa. Se entregó un manual de uso para el equipo de la empresa y documentación técnica para mantenimiento y escalabilidad.
