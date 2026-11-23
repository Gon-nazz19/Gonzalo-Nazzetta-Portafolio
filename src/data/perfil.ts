// Contenido tipado de content/perfil.md (fuente única de verdad).
// Si cambia el texto allá, actualizarlo acá. Lo que esté vacío no se muestra.

export const datos = {
  nombre: 'Gonzalo Nicolás Nazzetta',
  nombreCorto: 'Gonzalo Nazzetta',
  titulo: 'Ingeniería y Análisis de Datos | Automatización de Procesos',
  bajada:
    'Estudiante de 5.° año de Ingeniería en Sistemas de Información – UTN Facultad Regional San Francisco',
  ubicacion: 'Freyre, Córdoba, Argentina',
  email: 'nazzettagonzalo@gmail.com',
  linkedin: 'https://www.linkedin.com/in/gonzalo-nazzetta-b58430222',
  github: 'https://github.com/Gon-nazz19',
  cv: 'cv/CV_Gonzalo_Nazzetta.pdf',
} as const;

export const sobreMi: string[] = [
  'Soy estudiante de 5.° año de Ingeniería en Sistemas de Información en la UTN Facultad Regional San Francisco y trabajo en datos y automatización de procesos.',
  'Desde 2026 trabajo en Estudio Rosso, donde desarrollé un portal web de gestión de clientes, automatizaciones con GitHub Actions y dashboards en Looker Studio. Antes desarrollé un pipeline de datos end-to-end para Metalúrgica Cesca con Python, n8n y Docker.',
  'En DataStatLab trabajé en análisis de datos y modelos estadísticos aplicados a datos reales, además del diseño de encuestas de relevamiento y la presentación de sus resultados. Soy Investigador Inicial en GISAI y coautor de un paper sobre predicción de producción fotovoltaica presentado en RPIC 2025.',
];

export type Kpi = { titulo: string; detalle: string; icono: 'paper' | 'investigacion' | 'analisis' | 'scout' };

export const kpis: Kpi[] = [
  { titulo: '1 paper publicado', detalle: 'RPIC 2025', icono: 'paper' },
  { titulo: 'Investigador Inicial', detalle: 'GISAI', icono: 'investigacion' },
  { titulo: 'Análisis de datos', detalle: 'DataStatLab', icono: 'analisis' },
  { titulo: 'Scout', detalle: 'desde 2016', icono: 'scout' },
];

export type Experiencia = {
  puesto: string;
  organizacion: string;
  periodo?: string;
  estado?: string;
  items: string[];
};

export const experiencia: Experiencia[] = [
  {
    puesto: 'Desarrollador de Automatización y Soluciones de Datos',
    organizacion: 'Estudio Rosso',
    periodo: 'May. 2026 – Actualidad',
    estado: 'en producción',
    items: [
      'Construí dashboards web y tableros en Google Looker Studio con KPIs para el seguimiento de la gestión.',
      'Diseñé flujos de datos con Excel y Google Sheets para la carga, organización, validación y seguimiento de la información operativa.',
      'Automaticé procesos y tareas programadas mediante GitHub Actions, reduciendo trabajo manual repetitivo.',
      'Desarrollé e implementé en producción un portal web de gestión de clientes sobre PostgreSQL (Supabase).',
      'Realizo el monitoreo y mantenimiento del portal (Supabase, Render, Cloudflare), con auditorías de configuración y backups semanales.',
    ],
  },
  {
    puesto: 'Investigador Inicial (Categoría G)',
    organizacion: 'GISAI, UTN San Francisco',
    periodo: '2024 – Actualidad',
    items: [
      'Investigación aplicada en inteligencia artificial y análisis de datos.',
      'Coautor y expositor del paper sobre predicción de producción fotovoltaica (RPIC 2025).',
    ],
  },
  {
    puesto: 'Miembro Investigador',
    organizacion: 'DataStatLab, UTN San Francisco',
    periodo: '2024 – 2026',
    items: [
      'Desarrollo de modelos estadísticos y de machine learning aplicados a datos reales.',
      'Diseño e implementación de encuestas para relevamiento de datos, gestionando la recolección, estructuración y presentación de resultados.',
    ],
  },
  {
    puesto: 'Docencia',
    organizacion: 'UTN San Francisco',
    items: [
      'Disertante en Cursos para la SECU (2025): diseño y dictado de cursos de sistemas e informática para estudiantes secundarios.',
      'Tutor de Álgebra y Geometría Analítica (2024).',
    ],
  },
];

export const publicacion = {
  titulo: 'Aplicación de Modelos Predictivos en la Estimación de Producción Fotovoltaica',
  evento:
    'XXI Reunión de Trabajo en Procesamiento de la Información y Control (RPIC 2025) — UTN Facultad Regional San Francisco.',
  descripcion:
    'Coautor y expositor. También presentado en el seminario interno Smart Grids and IA (UTN Facultad Regional Córdoba).',
  etiqueta: 'XXI RPIC 2025 · Paper publicado',
  url: '', // [COMPLETAR] link al paper; vacío = no se muestra el botón
};

export type Formacion = { titulo: string; institucion: string; periodo: string };

export const formacion: Formacion[] = [
  {
    titulo: 'Ingeniería en Sistemas de Información',
    institucion: 'UTN Facultad Regional San Francisco',
    periodo: '2022 – Actualidad',
  },
  { titulo: 'Bachiller en Economía', institucion: 'Freyre, Córdoba', periodo: '2016 – 2021' },
  {
    titulo: 'The Data Science Course: Complete Data Science Bootcamp',
    institucion: 'Udemy, 365 Careers',
    periodo: '2026 – en curso',
  },
];

export const idiomas = 'Español nativo · Inglés intermedio (lectura de documentación técnica)';
