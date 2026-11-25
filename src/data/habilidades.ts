// Habilidades técnicas de content/perfil.md.
// Para sumar una habilidad, agregarla a la categoría; si es destacada (★),
// sumarla también a `destacados`.
import {
  siDocker,
  siGithubactions,
  siGooglesheets,
  siMysql,
  siN8n,
  siNumpy,
  siPandas,
  siPostgresql,
  siPython,
  siSupabase,
  type SimpleIcon,
} from 'simple-icons';

export type Categoria = { nombre: string; items: string[] };

export const categorias: Categoria[] = [
  { nombre: 'Lenguajes', items: ['Python', 'SQL', 'Java', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Bash'] },
  {
    nombre: 'Datos y análisis',
    items: ['pandas', 'NumPy', 'Análisis exploratorio de datos', 'Estadística', 'Series de tiempo (SARIMA, Holt-Winters, LSTM)', 'K-Means'],
  },
  { nombre: 'BI y visualización', items: ['Looker Studio', 'Power BI', 'Excel avanzado', 'Google Sheets'] },
  { nombre: 'Bases de datos', items: ['PostgreSQL', 'MySQL', 'Supabase', 'MongoDB', 'SQLite', 'Cloudflare D1', 'PostGIS'] },
  { nombre: 'Automatización y DevOps', items: ['n8n', 'GitHub Actions', 'Docker', 'Jenkins', 'Celery', 'Redis'] },
  {
    nombre: 'Frameworks',
    items: ['React', 'Next.js', 'Node.js', 'Express.js', 'NestJS', 'Django REST Framework', 'Tailwind CSS', 'Material-UI', 'Leaflet.js'],
  },
  { nombre: 'Cloud', items: ['Google Cloud', 'Cloudflare Workers', 'Wrangler CLI', 'Render', 'Vercel'] },
  { nombre: 'Control de versiones', items: ['Git', 'GitHub', 'GitLab'] },
  { nombre: 'Herramientas', items: ['VS Code', 'IntelliJ IDEA', 'Jira', 'Postman', 'pgAdmin'] },
  {
    nombre: 'IA y visión por computadora',
    items: [
      'Machine Learning',
      'Visión por Computadora',
      'YOLOv8',
      'PyTorch',
      'OpenCV',
      'DeepSort',
      'RAG',
      'Embeddings semánticos',
      'MCP (Model Context Protocol)',
      'Cloudflare Workers AI',
      'Gemini API',
      'API de Anthropic (Claude)',
    ],
  },
];

/**
 * Logos destacados (★). `icono`: logo oficial de simple-icons.
 * `generico`: no hay logo oficial en simple-icons (SQL, Looker Studio, Power BI);
 * se usa un ícono genérico. Para Power BI, si existe public/icons/powerbi.svg
 * se usa ese archivo oficial.
 */
export type Destacado =
  | { nombre: string; icono: SimpleIcon }
  | { nombre: string; generico: 'base-de-datos' | 'tablero' | 'barras'; archivoOficial?: string };

export const destacados: Destacado[] = [
  { nombre: 'Python', icono: siPython },
  { nombre: 'SQL', generico: 'base-de-datos' },
  { nombre: 'pandas', icono: siPandas },
  { nombre: 'NumPy', icono: siNumpy },
  { nombre: 'Looker Studio', generico: 'tablero' },
  { nombre: 'Power BI', generico: 'barras', archivoOficial: 'icons/powerbi.svg' },
  { nombre: 'Google Sheets', icono: siGooglesheets },
  { nombre: 'PostgreSQL', icono: siPostgresql },
  { nombre: 'MySQL', icono: siMysql },
  { nombre: 'Supabase', icono: siSupabase },
  { nombre: 'n8n', icono: siN8n },
  { nombre: 'GitHub Actions', icono: siGithubactions },
  { nombre: 'Docker', icono: siDocker },
];

export const metodologias: string[] = [
  'UML (casos de uso, diagramas de clases, secuencia)',
  'Análisis de requisitos funcionales y no funcionales',
  'Análisis de procesos de negocio',
  'Metodologías ágiles (Scrum) y en cascada',
  'Diseño de APIs RESTful e idempotencia',
  'Diseño de transacciones ACID y manejo de concurrencia',
  'Trazabilidad de requerimientos y casos de prueba',
  'Calidad y trazabilidad de datos (ETL, control de duplicados, versionado)',
  'Documentación funcional y técnica',
];
