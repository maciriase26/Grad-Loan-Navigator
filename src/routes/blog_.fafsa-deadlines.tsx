import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { useI18n } from "@/i18n";

const TITLE = "2027–2028 FAFSA: When Is Your Graduate School’s Deadline? — Grad Loan Navigator";
const DESCRIPTION =
  "Upcoming 2027–2028 FAFSA priority deadlines, school codes, assistantship policies, and financial aid rules for 10 notable graduate universities. Analysis by Peter Foulke.";
const URL = "https://www.graduationnavigator.com/blog/fafsa-deadlines";

export const Route = createFileRoute("/blog_/fafsa-deadlines")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "article" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: FafsaDeadlinesArticlePage,
});

/* ---------- Inline Icons ---------- */
function AlertTriangleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="18"
      height="18"
      aria-hidden="true"
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="18"
      height="18"
      style={{ color: "var(--teal)" }}
      aria-hidden="true"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="16"
      height="16"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="16"
      height="16"
      style={{ color: "var(--teal)", flexShrink: 0, marginTop: "2px" }}
      aria-hidden="true"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="15"
      height="15"
      aria-hidden="true"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="13"
      height="13"
      aria-hidden="true"
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="13"
      height="13"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function LightbulbIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="18"
      height="18"
      style={{ color: "var(--teal)" }}
      aria-hidden="true"
    >
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </svg>
  );
}

/* ---------- University Data Structure ---------- */
interface UniversityDeadlines {
  id: string;
  name: string;
  nameEs: string;
  shortName: string;
  category: "Public" | "Private";
  institutionBadge: string;
  institutionBadgeEs: string;
  code: string;
  isCodeVarying?: boolean;
  priorityDeadline: string;
  priorityDeadlineEs: string;
  deadlineSort: string;
  leadDesc: string;
  leadDescEs: string;
  deadlineDetails: string;
  deadlineDetailsEs: string;
  additionalInfo: string;
  additionalInfoEs: string;
  keyPoints: string[];
  keyPointsEs: string[];
}

const UNIVERSITIES: UniversityDeadlines[] = [
  {
    id: "um",
    name: "The University of Montana",
    nameEs: "The University of Montana (Universidad de Montana)",
    shortName: "UM",
    category: "Public",
    institutionBadge: "Public · ~11,000 Students",
    institutionBadgeEs: "Pública · ~11,000 Estudiantes",
    code: "002536",
    priorityDeadline: "December 1, 2026",
    priorityDeadlineEs: "1 de diciembre de 2026",
    deadlineSort: "2026-12-01",
    leadDesc:
      "With just over 11,000 students, The University of Montana (UM) provides a more intimate university experience with strong graduate programs in fields such as forestry, wildlife biology, and environmental science.",
    leadDescEs:
      "Con poco más de 11,000 estudiantes, The University of Montana (UM) ofrece una experiencia universitaria más cercana, con destacados programas de posgrado en áreas como silvicultura, biología de la fauna silvestre y ciencias ambientales.",
    deadlineDetails:
      "UM's FAFSA priority deadline is December 1, 2026. This is the earliest priority deadline among the universities reviewed.",
    deadlineDetailsEs:
      "La fecha límite prioritaria de FAFSA de UM es el 1 de diciembre de 2026. Es la fecha más temprana entre las universidades analizadas.",
    additionalInfo:
      "In addition to submitting the FAFSA, prospective students can apply for hundreds of institutional scholarships through UM's centralized Scholarship Portal.",
    additionalInfoEs:
      "Además de enviar el FAFSA, los futuros estudiantes pueden solicitar cientos de becas institucionales a través del Portal Centralizado de Becas de UM.",
    keyPoints: [
      "Priority filing deadline: December 1, 2026",
      "Centralized Scholarship Portal with hundreds of institutional awards",
      "Renowned programs in forestry, wildlife biology & environmental science",
    ],
    keyPointsEs: [
      "Fecha límite prioritaria: 1 de diciembre de 2026",
      "Portal Centralizado de Becas con cientos de reconocimientos institucionales",
      "Programas destacados en silvicultura, biología silvestre y ciencias ambientales",
    ],
  },
  {
    id: "uncw",
    name: "The University of North Carolina Wilmington",
    nameEs: "The University of North Carolina Wilmington (UNCW)",
    shortName: "UNCW",
    category: "Public",
    institutionBadge: "R2 Public Research · Coastal North Carolina",
    institutionBadgeEs: "Investigación Pública R2 · Costa de Carolina del Norte",
    code: "002984",
    priorityDeadline: "Jan 1, 2027 (Priority) / Mar 1, 2027 (Recommended)",
    priorityDeadlineEs: "1 de ene, 2027 (Prioritaria) / 1 de mar, 2027 (Recomendada)",
    deadlineSort: "2027-01-01",
    leadDesc:
      "The University of North Carolina Wilmington (UNCW) is an R2 public research university located in the coastal region of North Carolina. Despite its relatively small size UNCW offers substantial research opportunities in fields such as marine science, education and healthcare.",
    leadDescEs:
      "The University of North Carolina Wilmington (UNCW) es una universidad pública de investigación R2 situada en la región costera de Carolina del Norte. A pesar de su tamaño moderado, ofrece amplias oportunidades de investigación en ciencias marinas, educación y salud.",
    deadlineDetails:
      "UNCW's 2027–28 FAFSA guidance lists March 1 as the recommended filing deadline. However, its financial aid guide recommends January 1, 2027, for priority consideration for applicable state and institutional aid.",
    deadlineDetailsEs:
      "La guía de FAFSA 2027–28 de UNCW indica el 1 de marzo como fecha de presentación recomendada. No obstante, recomienda el 1 de enero de 2027 para consideración prioritaria de ayuda estatal e institucional.",
    additionalInfo:
      "In addition to the FAFSA, prospective students should submit UNCW's separate university scholarship application that offers institutional aid opportunities.",
    additionalInfoEs:
      "Además del FAFSA, los estudiantes deben presentar la solicitud de beca universitaria independiente de UNCW, que ofrece oportunidades de ayuda institucional.",
    keyPoints: [
      "January 1, 2027: Priority date for state & institutional aid",
      "March 1, 2027: Recommended overall filing deadline",
      "Separate university scholarship application required for institutional aid",
    ],
    keyPointsEs: [
      "1 de enero de 2027: Fecha prioritaria para ayuda estatal e institucional",
      "1 de marzo de 2027: Fecha general recomendada de envío",
      "Se requiere solicitud de beca institucional independiente de UNCW",
    ],
  },
  {
    id: "asu",
    name: "Arizona State University",
    nameEs: "Arizona State University (ASU)",
    shortName: "ASU",
    category: "Public",
    institutionBadge: "Public Research · 450+ Graduate Programs",
    institutionBadgeEs: "Investigación Pública · +450 Programas de Posgrado",
    code: "001081",
    priorityDeadline: "Jan 15, 2027 (FAFSA) / Feb 1, 2027 (Univ. Grant)",
    priorityDeadlineEs: "15 de ene, 2027 (FAFSA) / 1 de feb, 2027 (Subvención Univ.)",
    deadlineSort: "2027-01-15",
    leadDesc:
      "Arizona State University (ASU) offers over 450 graduate programs with extensive online learning opportunities making the university especially attractive for prospective students who value flexibility in their graduate education.",
    leadDescEs:
      "Arizona State University (ASU) ofrece más de 450 programas de posgrado con amplias opciones de aprendizaje en línea, lo que la hace sumamente atractiva para quienes valoran la flexibilidad en sus estudios.",
    deadlineDetails:
      "ASU encourages prospective students to submit the FAFSA by January 15, 2027, to ensure optimal financial aid packaging.",
    deadlineDetailsEs:
      "ASU alienta a los estudiantes a presentar el FAFSA antes del 15 de enero de 2027 para garantizar una asignación óptima de ayuda.",
    additionalInfo:
      "ASU offers eligible on-campus master's and Ph.D. students a University Grant to account for unmet financial need. Students must submit their FAFSA by February 1, 2027, to receive this aid.",
    additionalInfoEs:
      "ASU ofrece a estudiantes elegibles de maestría y doctorado en campus una Subvención Universitaria para cubrir necesidades financieras insatisfechas. Deben enviar el FAFSA antes del 1 de febrero de 2027.",
    keyPoints: [
      "January 15, 2027: Encouraged submission date",
      "February 1, 2027: Strict cutoff for eligible University Grants",
      "University Grant covers unmet financial need for master's & Ph.D. students",
    ],
    keyPointsEs: [
      "15 de enero de 2027: Fecha recomendada de envío",
      "1 de febrero de 2027: Plazo estricto para Subvención Universitaria",
      "La subvención cubre necesidades no cubiertas para alumnos de maestría y doctorado",
    ],
  },
  {
    id: "osu",
    name: "The Ohio State University",
    nameEs: "The Ohio State University (OSU)",
    shortName: "OSU",
    category: "Public",
    institutionBadge: "Public R1 · Major Employer in Ohio",
    institutionBadgeEs: "Pública R1 · Gran Empleador de Ohio",
    code: "003090",
    priorityDeadline: "February 1, 2027",
    priorityDeadlineEs: "1 de febrero de 2027",
    deadlineSort: "2027-02-01",
    leadDesc:
      "The Ohio State University (OSU) is one of the largest employers in the state of Ohio, offering graduate students opportunities to gain professional experience through teaching, research, and administrative work.",
    leadDescEs:
      "The Ohio State University (OSU) es uno de los mayores empleadores de Ohio, ofreciendo a los estudiantes de posgrado oportunidades de adquirir experiencia a través de docencia, investigación y trabajo administrativo.",
    deadlineDetails:
      "OSU's FAFSA priority deadline is February 1, 2027. Submitting by this date maximizes access to campus-based funds.",
    deadlineDetailsEs:
      "La fecha prioritaria de FAFSA de OSU es el 1 de febrero de 2027. Enviar antes de esta fecha maximiza el acceso a fondos del campus.",
    additionalInfo:
      "In addition to the FAFSA, OSU urges prospective students to complete 'ScholarshipUniverse', an internal matching system that connects students with thousands of departmental and external scholarship opportunities.",
    additionalInfoEs:
      "Además del FAFSA, OSU insta a los postulantes a completar 'ScholarshipUniverse', un sistema que conecta a los estudiantes con miles de oportunidades de becas departamentales y externas.",
    keyPoints: [
      "FAFSA priority deadline: February 1, 2027",
      "Prospective students urged to complete ScholarshipUniverse portal",
      "Extensive teaching, research, and administrative graduate appointments",
    ],
    keyPointsEs: [
      "Fecha límite prioritaria: 1 de febrero de 2027",
      "Se insta a los postulantes a completar el portal ScholarshipUniverse",
      "Amplias oportunidades de docencia, investigación y nombramientos administrativos",
    ],
  },
  {
    id: "uw",
    name: "The University of Washington",
    nameEs: "The University of Washington (UW)",
    shortName: "UW",
    category: "Public",
    institutionBadge: "Premier Public R1 · Pacific Northwest Flagship",
    institutionBadgeEs: "Pública R1 Destacada · Insignia del Noroeste del Pacífico",
    code: "003798",
    priorityDeadline: "February 1, 2027",
    priorityDeadlineEs: "1 de febrero de 2027",
    deadlineSort: "2027-02-01",
    leadDesc:
      "The University of Washington (UW) is a premier public university in the Pacific Northwest offering exceptionally strong programs in computer science, medicine, public health, and engineering.",
    leadDescEs:
      "The University of Washington (UW) es una universidad pública de primer nivel en el Noroeste del Pacífico, con programas sobresalientes en ciencias de la computación, medicina, salud pública e ingeniería.",
    deadlineDetails:
      "UW's FAFSA priority deadline is February 1, 2027. Meeting this priority cutoff guarantees consideration for limited state and institutional need grants.",
    deadlineDetailsEs:
      "La fecha límite prioritaria de UW es el 1 de febrero de 2027. Cumplir este plazo asegura consideración para subvenciones estatales e institucionales de fondos limitados.",
    additionalInfo:
      "Prospective students who cannot complete the FAFSA due to immigration status can submit the Washington Application for State Financial Aid (WASFA), which provides an alternative pathway to state financial aid.",
    additionalInfoEs:
      "Los estudiantes que no puedan completar el FAFSA debido a su estatus migratorio pueden presentar el WASFA (Washington Application for State Financial Aid), una vía alternativa para ayuda estatal.",
    keyPoints: [
      "FAFSA priority deadline: February 1, 2027",
      "Alternative WASFA pathway available for non-FAFSA eligible students",
      "Nationally elite graduate programs in CS, medicine, and engineering",
    ],
    keyPointsEs: [
      "Fecha límite prioritaria: 1 de febrero de 2027",
      "Vía alternativa WASFA disponible para alumnos no elegibles para FAFSA",
      "Programas de élite nacional en computación, medicina e ingeniería",
    ],
  },
  {
    id: "harvard",
    name: "Harvard University",
    nameEs: "Universidad de Harvard",
    shortName: "Harvard",
    category: "Private",
    institutionBadge: "Ivy League · 12 Separate Graduate Schools",
    institutionBadgeEs: "Ivy League · 12 Escuelas de Posgrado Independientes",
    code: "Varies by school",
    isCodeVarying: true,
    priorityDeadline: "Varies by school (e.g., Feb 8 & Feb 12, 2027)",
    priorityDeadlineEs: "Varía según escuela (ej. 8 y 12 de feb, 2027)",
    deadlineSort: "2027-02-08",
    leadDesc:
      "Harvard University offers graduate degrees through 12 separate schools. Financial aid is also administered separately through each school, meaning prospective students should pay careful attention to deadlines for their specific intended program.",
    leadDescEs:
      "La Universidad de Harvard ofrece títulos de posgrado a través de 12 escuelas independientes. La ayuda financiera se administra por separado en cada una, por lo que los alumnos deben prestar atención a su programa específico.",
    deadlineDetails:
      "Deadlines vary across Harvard's graduate degree-granting schools. For example, the Graduate School of Design's financial aid deadline is February 8, 2027, and the Graduate School of Education deadline is February 12, 2027. Students must verify their target program website.",
    deadlineDetailsEs:
      "Las fechas varían entre las escuelas de Harvard. Por ejemplo, la Graduate School of Design vence el 8 de febrero de 2027, y la Graduate School of Education el 12 de febrero de 2027.",
    additionalInfo:
      "Several schools including Griffin Graduate School of Arts and Sciences and the Graduate School of Education offer fellowships and assistantships that could include tuition waivers and stipends for living expenses and health insurance.",
    additionalInfoEs:
      "Varias escuelas, incluidas la Griffin GSAS y la Escuela de Educación, ofrecen becas y ayudantías con exención de matrícula, estipendios para manutención y seguro médico.",
    keyPoints: [
      "12 autonomous schools with decentralized financial aid processing",
      "Graduate School of Design deadline: February 8, 2027",
      "Graduate School of Education deadline: February 12, 2027",
      "Comprehensive fellowships include living stipends and health insurance",
    ],
    keyPointsEs: [
      "12 escuelas autónomas con gestión de ayuda descentralizada",
      "Fecha Graduate School of Design: 8 de febrero de 2027",
      "Fecha Graduate School of Education: 12 de febrero de 2027",
      "Becas completas que incluyen estipendios de manutención y seguro médico",
    ],
  },
  {
    id: "du",
    name: "The University of Denver",
    nameEs: "The University of Denver (Universidad de Denver)",
    shortName: "DU",
    category: "Private",
    institutionBadge: "Private University · Rocky Mountain Region",
    institutionBadgeEs: "Universidad Privada · Región de las Montañas Rocosas",
    code: "001371",
    priorityDeadline: "March 1, 2027",
    priorityDeadlineEs: "1 de marzo de 2027",
    deadlineSort: "2027-03-01",
    leadDesc:
      "The University of Denver (DU) is a smaller private institution that offers students strong programs in social work, psychology, and international studies. It also offers a deep professional network in Colorado and the broader Rocky Mountain region.",
    leadDescEs:
      "The University of Denver (DU) es una institución privada que ofrece sólidos programas en trabajo social, psicología y estudios internacionales, con una extensa red profesional en Colorado y las Montañas Rocosas.",
    deadlineDetails:
      "Incoming students should submit the FAFSA by March 1, 2027. Timely submission ensures full consideration for institutional awards.",
    deadlineDetailsEs:
      "Los estudiantes entrantes deben presentar el FAFSA antes del 1 de marzo de 2027 para garantizar consideración total para fondos institucionales.",
    additionalInfo:
      "DU applicants are automatically considered for program- and department-specific scholarships. However, prospective students should still submit the FAFSA to maximize their total awarded financial aid package.",
    additionalInfoEs:
      "Los postulantes de DU son considerados automáticamente para becas de programas y departamentos, pero deben enviar el FAFSA para maximizar su paquete total.",
    keyPoints: [
      "Incoming graduate student deadline: March 1, 2027",
      "Automatic consideration for departmental and program scholarships",
      "FAFSA required to unlock full institutional and federal borrowing packages",
    ],
    keyPointsEs: [
      "Fecha límite para nuevos alumnos de posgrado: 1 de marzo de 2027",
      "Consideración automática para becas departamentales y de programa",
      "FAFSA necesario para acceder al paquete completo institucional y federal",
    ],
  },
  {
    id: "bu",
    name: "Boston University",
    nameEs: "Boston University (BU)",
    shortName: "BU",
    category: "Private",
    institutionBadge: "R1 Private Research · Top-Ranked Health Programs",
    institutionBadgeEs: "Investigación Privada R1 · Destacada en Ciencias de la Salud",
    code: "002130",
    priorityDeadline: "Varies by school (e.g., April 1, 2027)",
    priorityDeadlineEs: "Varía según escuela (ej. 1 de abril de 2027)",
    deadlineSort: "2027-04-01",
    leadDesc:
      "Boston University (BU) is an R1 private research university with nationally rated graduate programs including No. 1 in occupational therapy, No. 2 in health care law, and No. 9 in public health.",
    leadDescEs:
      "Boston University (BU) es una universidad privada de investigación R1 con programas de posgrado reconocidos a nivel nacional, incluyendo el n.° 1 en terapia ocupacional, n.° 2 en derecho sanitario y n.° 9 en salud pública.",
    deadlineDetails:
      "Deadlines vary by graduate school across BU. For instance, BU's Graduate Medical Sciences recommends students submit the FAFSA by April 1, 2027. Students should check their specific school's calendar.",
    deadlineDetailsEs:
      "Las fechas varían por escuela en BU. Por ejemplo, Ciencias Médicas de Posgrado recomienda enviar el FAFSA antes del 1 de abril de 2027.",
    additionalInfo:
      "Some BU graduate schools, such as the School of Medicine, require prospective students to submit both the FAFSA and CSS Profile, while others, including the School of Public Health and Henry M. Goldman School of Dental Medicine, require only the FAFSA submission.",
    additionalInfoEs:
      "Algunas escuelas, como la Facultad de Medicina, exigen tanto el FAFSA como el CSS Profile, mientras que Salud Pública y Odontología requieren únicamente el FAFSA.",
    keyPoints: [
      "Graduate Medical Sciences recommended deadline: April 1, 2027",
      "School of Medicine requires both FAFSA and the CSS Profile",
      "School of Public Health and Dental Medicine require FAFSA only",
    ],
    keyPointsEs: [
      "Fecha recomendada en Ciencias Médicas: 1 de abril de 2027",
      "Facultad de Medicina requiere tanto el FAFSA como el CSS Profile",
      "Salud Pública y Odontología requieren únicamente el envío del FAFSA",
    ],
  },
  {
    id: "gsu",
    name: "Georgia State University",
    nameEs: "Georgia State University (GSU)",
    shortName: "GSU",
    category: "Public",
    institutionBadge: "Major Urban Public R1 · Atlanta Metro",
    institutionBadgeEs: "Pública R1 Urbana · Área Metropolitana de Atlanta",
    code: "001574",
    priorityDeadline: "April 1, 2027 (Submit 6–8 weeks early)",
    priorityDeadlineEs: "1 de abril, 2027 (Enviar 6–8 semanas antes)",
    deadlineSort: "2027-04-01",
    leadDesc:
      "Georgia State University (GSU) offers graduate students strong programs in public health, business, law, and education. It also has an extensive network in Atlanta, one of the largest cities in the South, and the broader state of Georgia.",
    leadDescEs:
      "Georgia State University (GSU) ofrece a estudiantes de posgrado sólidos programas en salud pública, negocios, derecho y educación, junto a una extensa red en Atlanta y todo Georgia.",
    deadlineDetails:
      "GSU's fall financial aid priority processing deadline is April 1, 2027. Filing before this date ensures funds are processed before initial tuition bills generate.",
    deadlineDetailsEs:
      "La fecha límite de procesamiento prioritario de ayuda para otoño de GSU es el 1 de abril de 2027. Presentar antes garantiza que los fondos se procesen a tiempo.",
    additionalInfo:
      "GSU explicitly suggests prospective students submit the FAFSA 6–8 weeks before the priority deadline of April 1 to allow sufficient time for administrative processing, submission of additional documents, and financial aid verification.",
    additionalInfoEs:
      "GSU sugiere expresamente enviar el FAFSA entre 6 y 8 semanas antes del 1 de abril para permitir la tramitación administrativa, entrega de documentos y verificación de ayuda.",
    keyPoints: [
      "Fall priority processing deadline: April 1, 2027",
      "6–8 week buffer recommended prior to April 1 for verification",
      "Broad regional network in public health, business, law & education",
    ],
    keyPointsEs: [
      "Fecha límite prioritaria de otoño: 1 de abril de 2027",
      "Margen recomendado de 6 a 8 semanas antes del 1 de abril para verificación",
      "Amplia red regional en salud pública, administración, derecho y educación",
    ],
  },
  {
    id: "uf",
    name: "The University of Florida",
    nameEs: "The University of Florida (UF)",
    shortName: "UF",
    category: "Public",
    institutionBadge: "Public Flagship · ~57,000 Students",
    institutionBadgeEs: "Pública Insignia · ~57,000 Estudiantes",
    code: "001535",
    priorityDeadline: "No set deadline — Submit as early as possible",
    priorityDeadlineEs: "Sin fecha fija — Enviar lo antes posible",
    deadlineSort: "2027-09-01",
    leadDesc:
      "With a student body numbering roughly 57,000, The University of Florida (UF) is one of the largest public universities in the country. UF offers extensive research opportunities and a wide range of graduate and professional programs.",
    leadDescEs:
      "Con una comunidad estudiantil cercana a los 57,000 alumnos, The University of Florida (UF) es una de las mayores universidades públicas del país, ofreciendo amplias investigaciones y programas profesionales.",
    deadlineDetails:
      "There is no set deadline for the 2027–2028 academic year, but UF strongly suggests submitting as early as possible once the application opens to ensure prompt aid disbursement.",
    deadlineDetailsEs:
      "No hay una fecha límite fija para el año 2027–2028, pero UF sugiere enfáticamente presentar el formulario tan pronto como esté disponible para agilizar los desembolsos.",
    additionalInfo:
      "UF offers graduate assistantships that could include tuition waivers and stipends. Prospective students should refer to individual department funding practices, as these awards are granted independently of the FAFSA process.",
    additionalInfoEs:
      "UF ofrece ayudantías de posgrado que pueden incluir exenciones de matrícula y estipendios. Estos fondos se conceden de forma independiente del FAFSA a nivel departamental.",
    keyPoints: [
      "No set deadline for 2027–2028 (early submission strongly advised)",
      "Graduate assistantships include full tuition waivers and stipends",
      "Departmental funding decisions made independently of FAFSA filing",
    ],
    keyPointsEs: [
      "Sin fecha fija para 2027–2028 (se recomienda enviar con anticipación)",
      "Las ayudantías de posgrado incluyen exención total de matrícula y estipendios",
      "Decisiones de financiamiento departamental independientes del trámite FAFSA",
    ],
  },
];

/* ---------- Copy Code Button Component ---------- */
function CopyCodeButton({ code, isEs }: { code: string; isEs: boolean }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (code.startsWith("Varies")) return;
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (code.startsWith("Varies")) {
    return (
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "12px",
          color: "var(--ink-soft)",
          background: "color-mix(in srgb, var(--ink) 6%, transparent)",
          padding: "3px 8px",
          borderRadius: "4px",
        }}
      >
        {isEs ? "Varía por programa" : "Program specific"}
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      title={isEs ? "Copiar código FAFSA" : "Copy FAFSA Code"}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        fontFamily: "var(--font-mono)",
        fontSize: "12.5px",
        fontWeight: 600,
        color: copied ? "var(--teal)" : "var(--ink)",
        background: copied ? "color-mix(in srgb, var(--teal) 14%, transparent)" : "var(--paper)",
        border: `1px solid ${copied ? "var(--teal)" : "var(--line)"}`,
        padding: "3px 9px",
        borderRadius: "6px",
        cursor: "pointer",
        transition: "all 0.15s ease",
      }}
    >
      <span>{code}</span>
      {copied ? <CheckIcon /> : <CopyIcon />}
      <span style={{ fontSize: "11px", textTransform: "uppercase" }}>
        {isEs ? (copied ? "Copiado" : "Copiar") : copied ? "Copied" : "Copy"}
      </span>
    </button>
  );
}

/* ---------- Main Component Page ---------- */
function FafsaDeadlinesArticlePage() {
  const { t, lang } = useI18n();
  const isEs = lang === "es";

  const [filterCategory, setFilterCategory] = useState<"All" | "Public" | "Private">("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUniversities = UNIVERSITIES.filter((item) => {
    const matchesCategory = filterCategory === "All" || item.category === filterCategory;
    const query = searchTerm.toLowerCase().trim();
    const matchesSearch =
      query === "" ||
      item.name.toLowerCase().includes(query) ||
      item.nameEs.toLowerCase().includes(query) ||
      item.shortName.toLowerCase().includes(query) ||
      item.code.toLowerCase().includes(query) ||
      item.priorityDeadline.toLowerCase().includes(query) ||
      item.priorityDeadlineEs.toLowerCase().includes(query) ||
      item.leadDesc.toLowerCase().includes(query) ||
      item.leadDescEs.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <SiteHeader />

      <main style={{ paddingBottom: "64px" }}>
        {/* Hero Section */}
        <section className="wrap doc-hero">
          <div className="article-back" style={{ marginBottom: "16px" }}>
            <Link
              to="/blog"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              ← {t("blog.h1")}
            </Link>
          </div>
          <div className="eyebrow">{t("fafsa.eyebrow")}</div>
          <h1>{t("fafsa.h1")}</h1>
          <p className="sub">{t("fafsa.sub")}</p>
          <div className="updated">
            <span className="dot" />
            {t("fafsa.updated")}
          </div>

          {/* Why it matters callout */}
          <div className="refi-hero-callout">
            <div className="refi-hero-callout-icon">
              <AlertTriangleIcon />
            </div>
            <div className="refi-hero-callout-content">
              <h4>{t("fafsa.why.title")}</h4>
              <p>{t("fafsa.why.p")}</p>
            </div>
          </div>
        </section>

        {/* Section Jump Nav */}
        <div className="wrap pagenav">
          <a href="#overview">{t("fafsa.nav.overview")}</a>
          <a href="#timeline">{t("fafsa.nav.timeline")}</a>
          <a href="#schools">{t("fafsa.nav.schools")}</a>
          <a href="#rules">{t("fafsa.nav.rules")}</a>
          <a href="#bottom-line">{t("fafsa.nav.bottomline")}</a>
        </div>

        {/* Main Content Body */}
        <div className="wrap doc-content">
          {/* Stat Callout Banner */}
          <div className="rates-callout-zoom" style={{ marginBottom: "40px" }}>
            <div className="rates-callout-zoom-icon">
              <CalendarIcon />
            </div>
            <div className="rates-callout-zoom-content">
              <h3
                style={{
                  margin: "0 0 6px 0",
                  fontSize: "19px",
                  fontWeight: 700,
                }}
              >
                {t("fafsa.stat.banner")}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: "15px",
                  lineHeight: "1.6",
                  color: "var(--ink-soft)",
                }}
              >
                {isEs
                  ? "Las subvenciones institucionales, becas y exenciones de matrícula se asignan de fondos limitados. Aunque la ventana federal final permanece abierta más tiempo, los estudiantes que esperan al plazo federal a menudo encuentran los fondos institucionales agotados."
                  : "Institutional grant programs, fellowships, and university-funded tuition waivers are distributed from finite allocations. While the final federal FAFSA window stays open longer, students who wait until the federal deadline often find institutional aid pools completely depleted."}
              </p>
            </div>
          </div>

          {/* Section 1: Overview & Crucial Distinction */}
          <section className="doc-section" id="overview">
            <span className="section-num">{t("fafsa.part1")}</span>
            <h2>
              {isEs
                ? "Comprendiendo las Fechas Límite de Ayuda Financiera para Posgrados"
                : "Understanding Graduate Financial Aid Deadlines"}
            </h2>
            <p className="lead">
              {isEs ? (
                <>
                  Para los futuros estudiantes que ingresan a la escuela de posgrado en el otoño del{" "}
                  <strong>año académico 2027–2028</strong>, navegar las fechas límite de ayuda
                  financiera es muy diferente del proceso universitario de pregrado. Tres
                  distinciones clave rigen la ayuda para posgrados:
                </>
              ) : (
                <>
                  For prospective graduate students entering university in the fall of the{" "}
                  <strong>2027–2028 academic year</strong>, navigating financial aid deadlines is
                  very different from the undergraduate process. Three major distinctions govern
                  graduate aid:
                </>
              )}
            </p>

            <div className="rates-diff-grid" style={{ margin: "24px 0" }}>
              <div className="rates-diff-card">
                <div className="rates-diff-card-header">
                  <span className="rates-diff-tag">01</span>
                  <h3>
                    {isEs
                      ? "Plazo Federal vs. Fechas Prioritarias Universitarias"
                      : "Federal Deadline vs. School Priority Dates"}
                  </h3>
                </div>
                <p>
                  {isEs
                    ? "La fecha límite federal de FAFSA suele ser el 30 de junio del año siguiente. Sin embargo, las universidades establecen fechas límite prioritarias (a menudo entre diciembre y abril) para asignar becas del campus, descuentos de matrícula y fondos de trabajo y estudio. Perder la fecha prioritaria no te descalifica para préstamos federales sin subsidio, pero puede costarte miles en subvenciones gratuitas."
                    : "The federal FAFSA deadline is traditionally June 30 of the following year. However, universities set priority filing deadlines—often between December and April—to allocate limited campus grants, tuition discounts, and institutional work-study funds. Missing a school priority date does not disqualify you from federal unsubsidized loans, but it can cost you thousands in institutional grants."}
                </p>
              </div>

              <div className="rates-diff-card">
                <div className="rates-diff-card-header">
                  <span className="rates-diff-tag">02</span>
                  <h3>
                    {isEs
                      ? "Admisiones de Posgrado Descentralizadas"
                      : "Decentralized Graduate Admissions"}
                  </h3>
                </div>
                <p>
                  {isEs
                    ? "A diferencia de los estudios de pregrado donde una oficina central fija las fechas para todo el campus, la ayuda de posgrado suele administrarse a nivel de facultad o departamento. Instituciones como Harvard y Boston University tienen calendarios totalmente independientes para cada una de sus escuelas profesionales."
                    : "Unlike undergraduate admissions where one centralized office sets university-wide dates, graduate financial aid is frequently administered at the college or departmental level. Institutions like Harvard and Boston University have completely independent financial aid calendars for each professional school."}
                </p>
              </div>

              <div className="rates-diff-card" style={{ gridColumn: "1 / -1" }}>
                <div className="rates-diff-card-header">
                  <span className="rates-diff-tag">03</span>
                  <h3>
                    {isEs
                      ? "Requisitos de Múltiples Formularios (CSS Profile, WASFA y Portales)"
                      : "Multi-Application Requirements (CSS Profile, WASFA & Portals)"}
                  </h3>
                </div>
                <p>
                  {isEs
                    ? "El FAFSA rara vez es el único formulario necesario. Varias universidades destacadas exigen perfiles adicionales: la Facultad de Medicina de Boston University exige el CSS Profile junto al FAFSA; The Ohio State University utiliza ScholarshipUniverse; The University of Montana cuenta con un portal centralizado de becas; y University of Washington ofrece la vía alternativa WASFA para ayuda estatal."
                    : "FAFSA is rarely the only document you need. Several top institutions require supplemental forms: Boston University's School of Medicine mandates the CSS Profile alongside the FAFSA; The Ohio State University requires ScholarshipUniverse; The University of Montana maintains a centralized Scholarship Portal; and the University of Washington provides the WASFA pathway for state aid."}
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Master Deadline Schedule Table */}
          <section className="doc-section" id="timeline">
            <span className="section-num">{t("fafsa.part2")}</span>
            <h2>
              {isEs
                ? "Calendario General de Fechas Límite 2027–2028"
                : "Master 2027–2028 Deadline Schedule"}
            </h2>
            <p className="lead">
              {isEs
                ? "A continuación se detalla la comparación integral de fechas de presentación recomendadas y códigos escolares FAFSA en las 10 instituciones evaluadas, ordenadas cronológicamente:"
                : "Below is the comprehensive comparison of recommended filing dates and FAFSA school codes across the 10 reviewed institutions, arranged chronologically by priority deadline:"}
            </p>

            <div className="roi-table-wrap">
              <table className="roi-table">
                <thead>
                  <tr>
                    <th style={{ width: "30%" }}>{isEs ? "Universidad" : "University"}</th>
                    <th style={{ width: "16%" }}>{isEs ? "Código FAFSA" : "FAFSA Code"}</th>
                    <th style={{ width: "26%" }}>
                      {isEs ? "Fecha Recomendada" : "Recommended Deadline"}
                    </th>
                    <th style={{ width: "28%" }}>
                      {isEs ? "Clave de Ayuda Institucional" : "Institutional Funding Key"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {UNIVERSITIES.map((uni) => (
                    <tr key={uni.id}>
                      <td className="roi-school-name">
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "2px",
                          }}
                        >
                          <span>{isEs ? uni.nameEs : uni.name}</span>
                          <span
                            style={{
                              fontSize: "11px",
                              fontFamily: "var(--font-mono)",
                              color: "var(--ink-soft)",
                            }}
                          >
                            {isEs ? uni.institutionBadgeEs : uni.institutionBadge}
                          </span>
                        </div>
                      </td>
                      <td>
                        <CopyCodeButton code={uni.code} isEs={isEs} />
                      </td>
                      <td className="roi-highlight" style={{ fontSize: "13px" }}>
                        {isEs ? uni.priorityDeadlineEs : uni.priorityDeadline}
                      </td>
                      <td style={{ fontSize: "13px", color: "var(--ink-soft)" }}>
                        {isEs
                          ? uni.keyPointsEs[1] || uni.keyPointsEs[0]
                          : uni.keyPoints[1] || uni.keyPoints[0]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p
              style={{
                fontSize: "13px",
                color: "var(--ink-soft)",
                fontStyle: "italic",
                marginTop: "8px",
              }}
            >
              {isEs
                ? "Nota: Los códigos escolares FAFSA y las fechas departamentales reflejan las pautas publicadas a octubre de 2026. Confirma siempre con tu programa académico específico."
                : "Note: FAFSA school codes and departmental dates reflect published guidelines as of October 2026. Always confirm with your individual academic department."}
            </p>
          </section>

          {/* Section 3: 10 University Profiles */}
          <section className="doc-section" id="schools">
            <span className="section-num">{t("fafsa.part3")}</span>
            <h2>
              {isEs
                ? "Perfiles Detallados: 10 Universidades Destacadas"
                : "Detailed Profiles: 10 Notable Universities"}
            </h2>
            <p className="lead">
              {isEs
                ? "Explora en detalle los requisitos de fechas límite, códigos federales y estructuras de ayuda financiera de cada institución."
                : "Explore in-depth deadline requirements, federal school codes, and departmental aid structures for each institution."}
            </p>

            {/* Filter and Search Bar */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
                alignItems: "center",
                justifyContent: "space-between",
                margin: "24px 0 28px 0",
                padding: "16px 20px",
                background: "var(--card-paper)",
                borderRadius: "12px",
                border: "1px solid var(--line)",
              }}
            >
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "var(--ink-soft)",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {isEs ? "Filtrar:" : "Filter:"}
                </span>
                {(
                  [
                    {
                      key: "All",
                      label: isEs ? "Todas" : "All",
                    },
                    {
                      key: "Public",
                      label: isEs ? "Públicas" : "Public",
                    },
                    {
                      key: "Private",
                      label: isEs ? "Privadas" : "Private",
                    },
                  ] as const
                ).map((cat) => (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() => setFilterCategory(cat.key)}
                    style={{
                      padding: "6px 14px",
                      borderRadius: "6px",
                      border: "1px solid",
                      borderColor: filterCategory === cat.key ? "var(--teal)" : "var(--line)",
                      background:
                        filterCategory === cat.key
                          ? "color-mix(in srgb, var(--teal) 12%, transparent)"
                          : "var(--card)",
                      color: filterCategory === cat.key ? "var(--teal)" : "var(--ink)",
                      fontWeight: filterCategory === cat.key ? 700 : 500,
                      fontSize: "13px",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <div
                style={{
                  minWidth: "220px",
                  flex: "1 1 220px",
                  maxWidth: "340px",
                }}
              >
                <input
                  type="text"
                  placeholder={
                    isEs ? "Buscar universidad o código..." : "Search university or code..."
                  }
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px 14px",
                    fontSize: "13.5px",
                    borderRadius: "8px",
                    border: "1px solid var(--line)",
                    background: "var(--card)",
                    color: "var(--ink)",
                    outline: "none",
                  }}
                />
              </div>
            </div>

            {/* University Cards Grid */}
            <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
              {filteredUniversities.map((uni) => (
                <div
                  key={uni.id}
                  id={`school-${uni.id}`}
                  style={{
                    padding: "26px 28px",
                    borderRadius: "14px",
                    background: "var(--card-paper)",
                    border: "1px solid var(--line)",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.02)",
                    transition: "transform 0.15s ease, border-color 0.15s ease",
                  }}
                >
                  {/* Card Header */}
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: "12px",
                      marginBottom: "14px",
                      borderBottom: "1px solid var(--line)",
                      paddingBottom: "14px",
                    }}
                  >
                    <div>
                      <span
                        style={{
                          fontSize: "11px",
                          fontFamily: "var(--font-mono)",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          color: "var(--teal)",
                          display: "inline-block",
                          marginBottom: "4px",
                        }}
                      >
                        {isEs ? uni.institutionBadgeEs : uni.institutionBadge}
                      </span>
                      <h3
                        style={{
                          margin: 0,
                          fontSize: "22px",
                          fontFamily: "var(--font-display)",
                          color: "var(--ink)",
                        }}
                      >
                        {isEs ? uni.nameEs : uni.name}
                      </h3>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "12px",
                          fontFamily: "var(--font-mono)",
                          color: "var(--ink-soft)",
                        }}
                      >
                        {isEs ? "Código FAFSA:" : "FAFSA Code:"}
                      </span>
                      <CopyCodeButton code={uni.code} isEs={isEs} />
                    </div>
                  </div>

                  {/* Overview paragraph */}
                  <p
                    style={{
                      fontSize: "15px",
                      lineHeight: "1.65",
                      color: "var(--ink)",
                      marginBottom: "16px",
                    }}
                  >
                    {isEs ? uni.leadDescEs : uni.leadDesc}
                  </p>

                  {/* Deadline & Details Box */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                      gap: "16px",
                      background: "var(--card)",
                      padding: "18px 20px",
                      borderRadius: "10px",
                      border: "1px solid var(--line)",
                      marginBottom: "16px",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          marginBottom: "6px",
                        }}
                      >
                        <ClockIcon />
                        <strong
                          style={{
                            fontSize: "13.5px",
                            fontFamily: "var(--font-mono)",
                            color: "var(--ink)",
                            textTransform: "uppercase",
                            letterSpacing: "0.03em",
                          }}
                        >
                          {isEs ? "Fecha Límite FAFSA y Ayuda" : "FAFSA & Aid Deadline"}
                        </strong>
                      </div>
                      <p
                        style={{
                          margin: 0,
                          fontSize: "14px",
                          lineHeight: "1.6",
                          color: "var(--ink-soft)",
                        }}
                      >
                        {isEs ? uni.deadlineDetailsEs : uni.deadlineDetails}
                      </p>
                    </div>

                    <div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          marginBottom: "6px",
                        }}
                      >
                        <LightbulbIcon />
                        <strong
                          style={{
                            fontSize: "13.5px",
                            fontFamily: "var(--font-mono)",
                            color: "var(--ink)",
                            textTransform: "uppercase",
                            letterSpacing: "0.03em",
                          }}
                        >
                          {isEs ? "Información Adicional" : "Additional Information"}
                        </strong>
                      </div>
                      <p
                        style={{
                          margin: 0,
                          fontSize: "14px",
                          lineHeight: "1.6",
                          color: "var(--ink-soft)",
                        }}
                      >
                        {isEs ? uni.additionalInfoEs : uni.additionalInfo}
                      </p>
                    </div>
                  </div>

                  {/* Bullet Key Points */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                    }}
                  >
                    {(isEs ? uni.keyPointsEs : uni.keyPoints).map((point, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "8px",
                          fontSize: "14px",
                          lineHeight: "1.5",
                        }}
                      >
                        <CheckCircleIcon />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {filteredUniversities.length === 0 && (
                <div
                  style={{
                    padding: "36px",
                    textAlign: "center",
                    background: "var(--card-paper)",
                    borderRadius: "12px",
                    border: "1px solid var(--line)",
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      fontSize: "16px",
                      color: "var(--ink-soft)",
                    }}
                  >
                    {isEs
                      ? `No se encontraron universidades que coincidan con "${searchTerm}". Prueba borrando tu búsqueda.`
                      : `No universities found matching "${searchTerm}". Try clearing your search.`}
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Section 4: What You Should Keep in Mind */}
          <section className="doc-section" id="rules">
            <span className="section-num">{t("fafsa.part4")}</span>
            <h2>
              {isEs
                ? "Puntos Clave que Todo Estudiante de Posgrado Debe Considerar"
                : "What Every Graduate Borrower Should Keep in Mind"}
            </h2>
            <p className="lead">
              {isEs
                ? "Completar con éxito tu FAFSA de posgrado requiere más que solo rellenar cifras. Ten presentes estas 4 estrategias operativas:"
                : "Filing your graduate FAFSA successfully requires more than just submitting numbers. Keep these 4 operational strategies front of mind:"}
            </p>

            <div className="rates-diff-grid" style={{ margin: "24px 0" }}>
              <div className="rates-diff-card">
                <div className="rates-diff-card-header">
                  <span className="rates-diff-tag">01</span>
                  <h3>
                    {isEs
                      ? "Los Códigos Escolares Varían según el Programa Profesional"
                      : "School Codes Vary by Professional Program"}
                  </h3>
                </div>
                <p>
                  {isEs
                    ? "Aunque muchas universidades utilizan un único código escolar federal centralizado, instituciones multicolegiales como Harvard asignan códigos únicos a cada una de sus facultades de posgrado (Negocios, Derecho, Diseño, Educación). Enviar el código erróneo puede retrasar la concesión de tu ayuda durante semanas."
                    : "While many universities (such as UNCW, Ohio State, or Denver) utilize a single centralized federal school code, decentralized multi-college institutions like Harvard University assign unique codes for individual graduate schools (e.g., Business, Law, Design, Education). Submitting the wrong code can delay financial aid packaging by several weeks."}
                </p>
              </div>

              <div className="rates-diff-card">
                <div className="rates-diff-card-header">
                  <span className="rates-diff-tag">02</span>
                  <h3>
                    {isEs
                      ? "Las Ayudantías Funcionan Fuera del FAFSA"
                      : "Assistantships Operate Outside the FAFSA"}
                  </h3>
                </div>
                <p>
                  {isEs
                    ? "Las ayudantías de docencia (TA), de investigación (RA) y las becas departamentales a menudo incluyen exención total o parcial de matrícula y estipendios de manutención. En escuelas como la Universidad de Florida o Harvard Griffin GSAS, estos paquetes son asignados directamente por comités académicos con independencia de tu estado en FAFSA."
                    : "Graduate teaching assistantships (TA), research assistantships (RA), and department fellowships often include full or partial tuition waivers and living stipends. At schools like the University of Florida and Harvard's Griffin GSAS, these funding packages are awarded directly by faculty committees regardless of your FAFSA status."}
                </p>
              </div>

              <div className="rates-diff-card">
                <div className="rates-diff-card-header">
                  <span className="rates-diff-tag">03</span>
                  <h3>
                    {isEs
                      ? "Verifica los Requisitos de Doble Formulario (CSS Profile)"
                      : "Check for Dual-Profile Requirements (CSS Profile)"}
                  </h3>
                </div>
                <p>
                  {isEs
                    ? "No asumas que el FAFSA es tu única solicitud. Programas especializados, como la Facultad de Medicina de Boston University, exigen tanto el FAFSA como el CSS Profile del College Board para calcular las becas institucionales por necesidad económica."
                    : "Do not assume the FAFSA is your only financial aid application. Specialized graduate schools—notably Boston University's School of Medicine—require both the FAFSA and the College Board CSS Profile to calculate institutional need-based scholarships."}
                </p>
              </div>

              <div className="rates-diff-card">
                <div className="rates-diff-card-header">
                  <span className="rates-diff-tag">04</span>
                  <h3>
                    {isEs
                      ? "Prevé un Margen de 6 a 8 Semanas para la Verificación"
                      : "Allow a 6 to 8 Week Verification Window"}
                  </h3>
                </div>
                <p>
                  {isEs
                    ? "Como destaca Georgia State University, debes enviar el FAFSA entre 6 y 8 semanas antes de la fecha límite prioritaria. La verificación federal de FAFSA, el cruce con los registros del IRS y la revisión institucional suelen agregar demoras imprevistas."
                    : "As emphasized by Georgia State University, you should submit your FAFSA 6–8 weeks before the published priority date. Federal FAFSA verification, student tax record matching, and institutional document review frequently add unforeseen delays to your aid offer."}
                </p>
              </div>
            </div>

            {/* Action Box */}
            <div className="rates-action-box" style={{ marginTop: "28px" }}>
              <h4 style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <LightbulbIcon />
                {isEs
                  ? "Lista de Control para Presentar el FAFSA de Posgrado"
                  : "Graduate FAFSA Filing Checklist"}
              </h4>
              <ul
                style={{
                  margin: "10px 0 0 16px",
                  padding: 0,
                  fontSize: "14.5px",
                  lineHeight: "1.7",
                  color: "var(--ink-soft)",
                }}
              >
                <li>
                  <strong>
                    {isEs ? "Crea o verifica tu FSA ID:" : "Create or verify your FSA ID:"}
                  </strong>{" "}
                  {isEs
                    ? "Tanto tú como los contribuyentes requeridos deben tener cuentas verificadas en StudentAid.gov."
                    : "Both you and any contributors must have verified accounts at StudentAid.gov."}
                </li>
                <li>
                  <strong>
                    {isEs
                      ? "Obtén los códigos escolares exactos de tu programa:"
                      : "Obtain exact program school codes:"}
                  </strong>{" "}
                  {isEs
                    ? "Confirma los códigos con tu departamento de destino en lugar de asumir los códigos generales de pregrado."
                    : "Confirm school codes with your target department rather than relying solely on undergraduate codes."}
                </li>
                <li>
                  <strong>
                    {isEs
                      ? "Envía los datos fiscales de dos años anteriores:"
                      : "Submit prior-prior year tax data:"}
                  </strong>{" "}
                  {isEs
                    ? "Usa el Direct Data Exchange del IRS para agilizar la validación de ingresos."
                    : "Use the IRS Direct Data Exchange to streamline income validation."}
                </li>
                <li>
                  <strong>
                    {isEs
                      ? "Completa los portales de becas universitarias:"
                      : "Complete university scholarship portals:"}
                  </strong>{" "}
                  {isEs
                    ? "Llena portales internos como ScholarshipUniverse de OSU, el portal de UNCW o el de UM."
                    : "Fill out internal portals like OSU's ScholarshipUniverse, UNCW's portal, or UM's Scholarship Portal."}
                </li>
                <li>
                  <strong>
                    {isEs
                      ? "Sigue las fechas límite de ayudantías departamentales:"
                      : "Track department assistantship deadlines:"}
                  </strong>{" "}
                  {isEs
                    ? "Las fechas de ayudantías docentes o investigadoras a menudo cierran antes de los plazos financieros centrales."
                    : "Departmental funding deadlines frequently close earlier than university-wide financial aid deadlines."}
                </li>
              </ul>
            </div>
          </section>

          {/* Section 5: The Bottom Line */}
          <section className="doc-section" id="bottom-line">
            <span className="section-num">{isEs ? "La Conclusión" : "The Takeaway"}</span>
            <h2>{isEs ? "En Conclusión" : "The Bottom Line"}</h2>

            <div className="refi-bottom-card">
              <blockquote className="refi-bottom-quote">
                {isEs
                  ? "“En la escuela de posgrado, no cumplir con la fecha límite prioritaria de tu institución no solo significa perder préstamos federales: con frecuencia implica renunciar a subvenciones institucionales, exenciones de matrícula y paquetes de ayudantías que nunca se reponen.”"
                  : "“In graduate school, missing your institution's priority FAFSA deadline doesn't just mean missing federal loans — it frequently forfeits access to institutional grants, tuition waivers, and assistantship packages that never get replenished.”"}
              </blockquote>
            </div>

            {/* CTA Strip */}
            <div className="cta-strip" style={{ marginTop: "32px" }}>
              <div>
                <h2>
                  {isEs
                    ? "Planifica tu estrategia de financiamiento para el posgrado"
                    : "Plan your graduate school borrowing strategy"}
                </h2>
                <p>
                  {isEs
                    ? "Calcula tu brecha de fondos, consulta los límites de endeudamiento y evalúa planes de pago antes de comprometerte."
                    : "Estimate your funding gap, check degree borrowing limits, and evaluate loan repayment plans before committing."}
                </p>
              </div>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <Link
                  to="/pay-for-school"
                  className="btn-primary"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span>{isEs ? "Guía para Pagar la Escuela" : "Pay for School Guide"}</span>
                  <ArrowRightIcon />
                </Link>
                <Link
                  to="/chart-your-path"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 18px",
                    borderRadius: "8px",
                    border: "1px solid var(--line)",
                    background: "var(--card)",
                    color: "var(--ink)",
                    fontWeight: 600,
                    fontSize: "14px",
                    textDecoration: "none",
                  }}
                >
                  <span>{isEs ? "Calculadora de Préstamos" : "Borrowing Calculator"}</span>
                  <ArrowRightIcon />
                </Link>
              </div>
            </div>

            {/* Sources Footnote */}
            <div className="refi-sources" style={{ marginTop: "36px" }}>
              <p>
                <strong>{isEs ? "Fuentes:" : "Sources:"}</strong>{" "}
                {isEs
                  ? "Departamento de Educación de EE. UU. (Federal Student Aid), Oficina de Ayuda Financiera y Becas de la Universidad de Florida, Escuelas de Posgrado de la Universidad de Harvard, Servicios Financieros Estudiantiles de Boston University, Servicios de Becas y Ayuda Financiera de Arizona State University, Ayuda Financiera Estudiantil de The Ohio State University, Ayuda Financiera de la Universidad de Denver, Oficina de Becas y Ayuda Financiera de University of North Carolina Wilmington, Oficina de Ayuda Financiera Estudiantil de University of Washington, Servicios Financieros Estudiantiles de la Universidad de Montana, y Servicios Financieros Estudiantiles de Georgia State University. Revisado a 5 de octubre de 2026."
                  : "U.S. Department of Education (Federal Student Aid), University of Florida Office of Student Financial Aid and Scholarships, Harvard University Graduate Schools, Boston University Student Financial Services, Arizona State University Financial Aid and Scholarship Services, The Ohio State University Student Financial Aid, University of Denver Financial Aid, University of North Carolina Wilmington Office of Scholarships & Financial Aid, University of Washington Office of Student Financial Aid, University of Montana Student Financial Services, and Georgia State University Student Financial Services. Reviewed as of October 5, 2026."}
              </p>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
      <ChatWidget />
    </>
  );
}
