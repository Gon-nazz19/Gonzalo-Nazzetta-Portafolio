---
titulo: "Detección Automática de Daños Viales con IA"
contexto: "Proyecto Final de Ingeniería · UTN San Francisco · Municipalidad de San Francisco"
rol: "Desarrollador"
periodo: "2026 – Actualidad"
estado: "en desarrollo"
orden: 1
resumen: "Sistema que procesa video de recorridos viales sincronizado con trazas GPS para detectar, clasificar y georreferenciar daños en las calles (baches y fisuras) con un modelo YOLOv8 entrenado con imágenes locales, y los muestra en una interfaz web con mapa interactivo, mapa de calor, KPIs y reportes PDF."
repo: ""
tags: ["Python", "YOLOv8", "OpenCV", "FastAPI", "Celery", "Redis", "PostgreSQL", "PostGIS", "React", "Leaflet.js", "Docker", "JWT"]
imagenes:
  - src: "deteccion-fisura-longitudinal.jpg"
    alt: "Grilla de nueve frames de calles de San Francisco con fisuras longitudinales marcadas por el modelo YOLOv8 en recuadros azules, con confianza de 82 % a 83 %"
    caption: "Detección de fisuras longitudinales (D00) · confianza 82–83 %"
  - src: "deteccion-piel-de-cocodrilo-1.jpg"
    alt: "Grilla de nueve frames de calles con zonas de fisuras tipo piel de cocodrilo marcadas en recuadros violetas y algunas fisuras longitudinales en azul, con confianza de 70 % a 84 %"
    caption: "Detección de piel de cocodrilo (D20) · confianza 70–84 %"
  - src: "deteccion-piel-de-cocodrilo-2.jpg"
    alt: "Grilla de nueve frames de calles con fisuras tipo piel de cocodrilo en recuadros violetas, fisuras longitudinales en azul y fisuras transversales en naranja, con confianza de 61 % a 69 %"
    caption: "Detección de piel de cocodrilo (D20) · confianza 61–69 %"
links: []
---

## Desafíos técnicos

- Detectar y clasificar cuatro tipos de daño (fisura longitudinal, fisura transversal, fisura tipo cocodrilo y bache) en video capturado desde un vehículo en movimiento.
- Adaptar un modelo entrenado con el dataset internacional RDD2022 a las condiciones de las calles de San Francisco.
- Sincronizar cada frame del video con su coordenada GPS y tolerar cortes de señal en la traza.
- Evitar registrar varias veces el mismo daño cuando los recorridos se superponen o se repiten.
- Ejecutar la inferencia sobre CPU, ya que el servidor de destino no cuenta con GPU.

## Solución implementada

- Pipeline de video diferido: carga de video .mp4 y traza GPX, parseo e interpolación de la traza GPS y sampleo de frames por distancia recorrida (intervalo configurable de 2 a 5 m) con OpenCV.
- Fine-tuning de YOLOv8 a partir de pesos entrenados sobre RDD2022, con un dataset local de imágenes de San Francisco etiquetado en las cuatro categorías.
- Georreferenciación de cada detección y deduplicación geoespacial con radio configurable (5 m por defecto), con soporte de recorridos acumulativos.
- API REST en FastAPI protegida con JWT, que delega el procesamiento a workers de Celery con Redis como broker.
- Persistencia en PostgreSQL con PostGIS para las consultas geoespaciales; arquitectura en contenedores con Docker y Docker Compose.
- Interfaz web en React con Leaflet.js: mapa interactivo con detalle de cada daño (categoría, confianza, coordenadas, fecha e imagen del frame), mapa de calor, filtros por categoría y fecha, KPIs por tipo de daño, historial de recorridos y reporte PDF por recorrido.

## Impacto

Le da a la Municipalidad de San Francisco un relevamiento automático y georreferenciado del estado de las calles, que reemplaza la inspección manual y permite priorizar reparaciones con información objetiva y trazable.
