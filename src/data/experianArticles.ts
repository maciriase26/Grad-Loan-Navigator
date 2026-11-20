export interface ExperianArticleSection {
  titleEn: string;
  titleEs: string;
  paragraphsEn: string[];
  paragraphsEs: string[];
  bulletsEn?: string[];
  bulletsEs?: string[];
}

export interface ExperianArticleData {
  id: string;
  slug: string;
  titleEn: string;
  titleEs: string;
  tagEn: string;
  tagEs: string;
  descEn: string;
  descEs: string;
  readTime: string;
  authorEn: string;
  authorEs: string;
  sourceUrl: string;
  publishDateEn: string;
  publishDateEs: string;
  quickAnswerEn: string;
  quickAnswerEs: string;
  sections: ExperianArticleSection[];
  bottomLineEn: string;
  bottomLineEs: string;
}

export const EXPERIAN_ARTICLES: ExperianArticleData[] = [
  {
    id: "types",
    slug: "what-are-the-different-types-of-student-loans",
    titleEn: "Types of Student Loans and How to Choose One",
    titleEs: "Tipos de Préstamos Estudiantiles y Cómo Elegir Uno",
    tagEn: "Ask Experian · Official Guide",
    tagEs: "Ask Experian · Guía Oficial",
    descEn:
      "A comprehensive breakdown of federal direct subsidized, unsubsidized, PLUS, and private loan options.",
    descEs:
      "Un desglose completo de préstamos federales directos subsidiados, no subsidiados, PLUS y opciones privadas.",
    readTime: "6 min read",
    authorEn: "Ask Experian Editorial Team · Experian",
    authorEs: "Equipo Editorial de Ask Experian · Experian",
    sourceUrl:
      "https://www.experian.com/blogs/ask-experian/what-are-the-different-types-of-student-loans/",
    publishDateEn: "Updated 2026 · Syndicated with Permission",
    publishDateEs: "Actualizado 2026 · Distribuido con Autorización",
    quickAnswerEn:
      "The two main categories of student loans are federal student loans (funded and administered by the U.S. government) and private student loans (issued by banks, credit unions, and online lenders). In general, you should max out scholarships, grants, and federal subsidized loans before considering unsubsidized or private loan options, as federal loans offer income-driven repayment and forgiveness programs.",
    quickAnswerEs:
      "Las dos categorías principales de préstamos estudiantiles son los préstamos federales (financiados y administrados por el gobierno de EE. UU.) y los préstamos privados (emitidos por bancos, cooperativas de crédito y prestamistas en línea). En general, debes agotar becas, subsidios y préstamos federales subsidiados antes de considerar préstamos privados o no subsidiados, ya que los préstamos federales ofrecen planes basados en ingresos y programas de perdón.",
    sections: [
      {
        titleEn: "The Main Types of Student Loans",
        titleEs: "Los Tipos Principales de Préstamos Estudiantiles",
        paragraphsEn: [
          "Paying for higher education typically requires combining multiple funding sources. When savings, scholarships, and grants do not cover the full cost of attendance, student loans help bridge the gap. Knowing the differences between loan types helps you avoid paying unnecessary interest over the life of your debt.",
          "Federal student loans are created and funded by the federal government under Title IV of the Higher Education Act. Private student loans are issued by commercial financial institutions and are subject to state banking regulations and lender-specific underwriting.",
        ],
        paragraphsEs: [
          "Costear la educación superior suele requerir la combinación de varias fuentes de financiamiento. Cuando los ahorros, becas y subsidios no cubren el costo total de asistencia, los préstamos estudiantiles ayudan a cerrar la brecha. Conocer las diferencias entre los tipos de préstamos te ayuda a evitar el pago de intereses innecesarios a lo largo de tu deuda.",
          "Los préstamos estudiantiles federales son creados y financiados por el gobierno federal bajo el Título IV de la Ley de Educación Superior. Los préstamos estudiantiles privados son emitidos por instituciones financieras comerciales y están sujetos a regulaciones bancarias estatales y políticas de crédito de cada entidad.",
        ],
        bulletsEn: [
          "Federal Direct Subsidized Loans: Need-based; government covers interest while enrolled in school at least half-time.",
          "Federal Direct Unsubsidized Loans: Non-need-based; interest accrues immediately from the disbursement date.",
          "Federal Direct PLUS Loans: For parents of undergraduates or graduate students; higher interest rates and origination fees.",
          "Private Student Loans: Credit-based loans from private lenders with fixed or variable interest rates.",
        ],
        bulletsEs: [
          "Préstamos Federales Directos Subsidiados: Basados en necesidad económica; el gobierno paga el interés mientras estudies al menos a medio tiempo.",
          "Préstamos Federales Directos No Subsidiados: No requieren necesidad económica; los intereses se acumulan desde la fecha de desembolso.",
          "Préstamos Federales Directos PLUS: Para padres de pregrado o estudiantes de posgrado; tasas y cargos de originación más altos.",
          "Préstamos Estudiantiles Privados: Basados en historial crediticio emitidos por bancos o prestamistas con tasas fijas o variables.",
        ],
      },
      {
        titleEn: "Types of Federal Student Loans",
        titleEs: "Tipos de Préstamos Estudiantiles Federales",
        paragraphsEn: [
          "Federal loans carry standardized statutory terms set by Congress each year. They do not require a credit check or a cosigner (with the exception of PLUS loans, which perform an adverse credit history check).",
          "Direct Subsidized Loans offer the most generous terms because the U.S. Department of Education pays the interest while you are enrolled at least half-time and during your six-month post-graduation grace period. Direct Unsubsidized Loans are available to both undergraduate and graduate students regardless of financial need, but interest accrues continuously throughout your enrollment.",
        ],
        paragraphsEs: [
          "Los préstamos federales cuentan con términos estandarizados por ley establecidos anualmente por el Congreso. No requieren verificación de puntaje crediticio ni codeudor (salvo los préstamos PLUS, que verifican que no exista historial crediticio adverso).",
          "Los Préstamos Directos Subsidiados ofrecen las condiciones más ventajosas porque el Departamento de Educación de EE. UU. cubre los intereses mientras estés matriculado al menos a medio tiempo y durante el período de gracia de seis meses tras graduarte. Los Préstamos Directos No Subsidiados están disponibles para pregrado y posgrado independientemente de la necesidad económica, pero el interés se acumula continuamente.",
        ],
      },
      {
        titleEn: "Types of Private Student Loans",
        titleEs: "Tipos de Préstamos Estudiantiles Privados",
        paragraphsEn: [
          "Private student loans can help fill funding shortfalls when federal borrowing caps are reached. Unlike federal student loans, private lenders assess your creditworthiness, annual income, and debt-to-income ratio (DTI) to determine your interest rate and borrowing limit.",
          "Because many undergraduate students have limited credit histories, over 90% of undergraduate private student loans require a creditworthy cosigner. Adding a strong cosigner can help secure a significantly lower interest rate and improve chances of approval.",
        ],
        paragraphsEs: [
          "Los préstamos estudiantiles privados pueden ayudar a cubrir vacíos de financiamiento cuando se alcanzan los topes federales. A diferencia de los préstamos federales, los prestamistas privados evalúan tu solvencia crediticia, ingresos anuales y relación deuda-ingreso (DTI) para determinar tu tasa de interés y límite de endeudamiento.",
          "Debido a que muchos estudiantes de pregrado tienen un historial crediticio limitado, más del 90% de los préstamos privados de pregrado requieren un codeudor con buen crédito. Contar con un aval sólido puede reducir drásticamente la tasa de interés y aumentar las probabilidades de aprobación.",
        ],
      },
      {
        titleEn: "How to Choose the Right Student Loan",
        titleEs: "Cómo Elegir el Préstamo Estudiantil Adecuado",
        paragraphsEn: [
          "Follow the borrowing hierarchy: start by exhausting gift aid (scholarships and grants), then take full advantage of federal subsidized loans, followed by unsubsidized federal loans. If a gap still remains, carefully compare APRs from multiple private lenders.",
          "A prudent benchmark is to avoid borrowing more across all four years than your expected starting annual salary after graduation. This rule of thumb helps ensure your monthly payments remain manageable.",
        ],
        paragraphsEs: [
          "Sigue el orden estratégico de endeudamiento: comienza agotando las ayudas no reembolsables (becas y subsidios), luego aprovecha al máximo los préstamos federales subsidiados y continúa con los no subsidiados. Si aún queda una brecha, compara minuciosamente las APR de varios prestamistas privados.",
          "Una regla prudente es evitar endeudarse en total más de lo que estimas ganar en tu salario inicial del primer año laboral tras graduarte. Esta guía asegura que los pagos mensuales se mantengan manejables.",
        ],
      },
    ],
    bottomLineEn:
      "Max out federal student loans first to lock in fixed interest rates and income-driven repayment safety nets. Turn to private student loans only to cover remaining gaps, and compare multiple lender APRs with a strong cosigner.",
    bottomLineEs:
      "Aprovecha primero al máximo los préstamos federales para asegurar tasas fijas y protecciones basadas en ingresos. Recurre a préstamos privados solo para cubrir brechas restantes y compara las APR de varios prestamistas junto a un buen codeudor.",
  },
  {
    id: "repayment",
    slug: "student-loan-repayment",
    titleEn: "Student Loan Repayment: Everything You Need to Know",
    titleEs: "Pago de Préstamos Estudiantiles: Todo lo que Necesitas Saber",
    tagEn: "Ask Experian · Official Guide",
    tagEs: "Ask Experian · Guía Oficial",
    descEn:
      "Understand repayment plans, interest accrual, income-driven strategies, and loan consolidation.",
    descEs:
      "Comprende los planes de pago, la acumulación de intereses, las estrategias basadas en ingresos y la consolidación.",
    readTime: "7 min read",
    authorEn: "Ask Experian Editorial Team · Experian",
    authorEs: "Equipo Editorial de Ask Experian · Experian",
    sourceUrl:
      "https://www.experian.com/blogs/ask-experian/student-loan-repayment/",
    publishDateEn: "Updated 2026 · Syndicated with Permission",
    publishDateEs: "Actualizado 2026 · Distribuido con Autorización",
    quickAnswerEn:
      "Federal student loan repayment begins after a six-month grace period following graduation or dropping below half-time enrollment. You can choose from standard, graduated, extended, or income-driven repayment (IDR) plans. Setting up auto-debit typically reduces your interest rate by 0.25%, and making on-time payments consistently strengthens your FICO® credit score.",
    quickAnswerEs:
      "El pago de los préstamos estudiantiles federales comienza tras un período de gracia de seis meses después de graduarte o reducir tu matrícula a menos de medio tiempo. Puedes elegir entre planes estándar, graduados, extendidos o basados en ingresos (IDR). Activar el débito automático generalmente reduce tu tasa de interés en un 0.25% y realizar pagos puntuales fortalece tu puntaje FICO®.",
    sections: [
      {
        titleEn: "Federal Student Loan Repayment Options",
        titleEs: "Opciones de Pago de Préstamos Federales",
        paragraphsEn: [
          "The default repayment schedule for federal loans is the Standard Repayment Plan, which divides your balance into equal monthly payments over 10 years (up to 30 years for consolidated loans). This plan results in paying the least total interest over time.",
          "If standard payments are too high for your starting income, the federal government offers several alternative repayment options designed to prevent delinquency and default.",
        ],
        paragraphsEs: [
          "El esquema predeterminado para préstamos federales es el Plan de Pago Estándar, que divide tu saldo en cuotas mensuales iguales a 10 años (hasta 30 años en préstamos consolidados). Este plan minimiza el interés total pagado a lo largo del tiempo.",
          "Si las cuotas estándar resultan elevadas para tu sueldo inicial, el gobierno federal ofrece opciones alternativas diseñadas para evitar la morosidad y el incumplimiento.",
        ],
        bulletsEn: [
          "Standard Repayment Plan: Fixed payments over 10 years; lowest total cost in interest.",
          "Graduated Repayment Plan: Payments start lower and increase every two years over 10 years as your earnings rise.",
          "Extended Repayment Plan: Extends repayment up to 25 years for borrowers with over $30,000 in federal debt.",
          "Income-Driven Repayment (IDR): Calculates monthly payments as a percentage of your discretionary income and family size.",
        ],
        bulletsEs: [
          "Plan de Pago Estándar: Pagos fijos a 10 años; menor costo total en intereses acumulados.",
          "Plan de Pago Graduado: Las cuotas comienzan bajas y aumentan cada dos años a 10 años a medida que crecen tus ingresos.",
          "Plan de Pago Extendido: Prolonga el plazo hasta 25 años para prestatarios con más de $30,000 en deuda federal.",
          "Pago Basado en Ingresos (IDR): Calcula la cuota mensual como un porcentaje de tu ingreso discrecional y tamaño familiar.",
        ],
      },
      {
        titleEn: "How Repayment Affects Your Credit Score",
        titleEs: "Cómo Afecta el Pago de Préstamos a tu Puntaje de Crédito",
        paragraphsEn: [
          "Student loan payments are reported monthly to the three nationwide credit bureaus: Experian, TransUnion, and Equifax. Your payment history accounts for 35% of your FICO® Score, making on-time student loan payments one of the most effective ways to establish a positive credit profile.",
          "Conversely, payments past due by 90 days or more on federal loans are reported as delinquent and will significantly lower your credit score. Setting up automatic bank drafts prevents missed due dates and qualifies you for a statutory 0.25% interest rate discount.",
        ],
        paragraphsEs: [
          "Los pagos de préstamos estudiantiles se reportan mensualmente a las tres agencias de crédito principales: Experian, TransUnion y Equifax. Tu historial de pagos representa el 35% de tu puntaje FICO®, convirtiendo los pagos a tiempo en una de las mejores formas de consolidar crédito.",
          "Por el contrario, los pagos atrasados por 90 días o más en préstamos federales se reportan como morosos y reducen sustancialmente tu puntaje crediticio. Configurar el débito automático previene olvidos y otorga un descuento legal del 0.25% en la tasa de interés.",
        ],
      },
      {
        titleEn: "Refinancing vs. Federal Loan Consolidation",
        titleEs: "Refinanciación vs. Consolidación Federal",
        paragraphsEn: [
          "Federal Direct Consolidation combines multiple federal student loans into a single loan with a weighted-average interest rate rounded up to the nearest one-eighth of a percent. Consolidation simplifies your billing into one monthly payment and preserves federal borrower protections.",
          "Private refinancing, on the other hand, replaces your existing federal or private loans with a brand-new loan from a private lender at a potentially lower interest rate. However, refinancing federal loans into a private loan permanently forfeits federal protections, including income-driven plans and Public Service Loan Forgiveness (PSLF).",
        ],
        paragraphsEs: [
          "La Consolidación Directa Federal combina varios préstamos federales en un único préstamo con una tasa ponderada redondeada al octavo de porcentaje superior más cercano. Simplifica la factura en un único pago y conserva intactas las protecciones federales.",
          "La refinanciación privada, por otro lado, sustituye tus préstamos actuales por un nuevo préstamo privado a una tasa de interés potencialmente menor. No obstante, refinanciar préstamos federales a privados anula para siempre beneficios como los planes basados en ingresos y el Perdón de Préstamos por Servicio Público (PSLF).",
        ],
      },
    ],
    bottomLineEn:
      "Stay in contact with your loan servicer, sign up for auto-debit to save 0.25% on interest, and explore income-driven plans before considering private refinancing of federal debt.",
    bottomLineEs:
      "Mantén contacto con tu administrador de préstamos, activa el débito automático para ahorrar 0.25% de interés y evalúa planes basados en ingresos antes de refinanciar deuda federal con prestamistas privados.",
  },
  {
    id: "how_to_get",
    slug: "how-to-get-a-student-loan",
    titleEn: "How to Get a Student Loan",
    titleEs: "Cómo Obtener un Préstamo Estudiantil",
    tagEn: "Ask Experian · Official Guide",
    tagEs: "Ask Experian · Guía Oficial",
    descEn:
      "Step-by-step guide on filling out FAFSA, evaluating financial aid packages, and applying for loans.",
    descEs:
      "Guía paso a paso sobre cómo completar la FAFSA, evaluar paquetes de ayuda financiera y solicitar préstamos.",
    readTime: "6 min read",
    authorEn: "Ask Experian Editorial Team · Experian",
    authorEs: "Equipo Editorial de Ask Experian · Experian",
    sourceUrl:
      "https://www.experian.com/blogs/ask-experian/how-to-get-a-student-loan/",
    publishDateEn: "Updated 2026 · Syndicated with Permission",
    publishDateEs: "Actualizado 2026 · Distribuido con Autorización",
    quickAnswerEn:
      "To obtain federal student loans, you must submit the Free Application for Federal Student Aid (FAFSA). Your college financial aid office then issues an aid offer detailing your grant, work-study, and loan eligibility. For private loans, you apply directly with lenders, undergo a credit check, and often add a cosigner to secure competitive rates.",
    quickAnswerEs:
      "Para obtener préstamos federales, debes enviar la Solicitud Gratuita de Ayuda Federal para Estudiantes (FAFSA). La oficina de ayuda financiera de tu universidad te enviará una oferta detallando subsidios, trabajo-estudio y préstamos. Para préstamos privados, solicitas directamente con las entidades financieras mediante verificación de crédito y comúnmente con un codeudor.",
    sections: [
      {
        titleEn: "Step 1: Complete and Submit the FAFSA",
        titleEs: "Paso 1: Completa y Envía la FAFSA",
        paragraphsEn: [
          "The FAFSA is the universal gateway to federal student loans, Pell Grants, federal work-study, and most institutional scholarships. You and your contributors (parents or spouse) create an FSA ID at StudentAid.gov and provide federal tax information securely via the IRS Direct Data Exchange.",
          "Submitting the FAFSA as early as possible after it opens ensures you do not miss state or institutional aid deadlines that operate on a first-come, first-served basis.",
        ],
        paragraphsEs: [
          "La FAFSA es la puerta de entrada universal a préstamos federales, Becas Pell, trabajo-estudio y becas institucionales. Tú y tus contribuyentes (padres o cónyuge) crean un FSA ID en StudentAid.gov y vinculan los datos tributarios federales mediante el intercambio de datos del IRS.",
          "Enviar la FAFSA lo antes posible tras su apertura garantiza que no pierdas plazos de ayuda estatal o universitaria que se asignan por orden de llegada.",
        ],
      },
      {
        titleEn: "Step 2: Review Your Financial Aid Offer",
        titleEs: "Paso 2: Revisa tu Oferta de Ayuda Financiera",
        paragraphsEn: [
          "Once accepted by colleges, each financial aid office calculates your Cost of Attendance (COA) minus your Student Aid Index (SAI) to build your financial aid package.",
          "Accept aid in the correct priority order: accept gift aid (scholarships and grants) first, followed by work-study, then subsidized federal loans. You do not have to accept the full loan amount offered; borrow only what is required to pay for tuition and verified living expenses.",
        ],
        paragraphsEs: [
          "Tras ser admitido, la oficina de ayuda de cada universidad calcula tu Costo de Asistencia (COA) menos tu Índice de Ayuda Estudiantil (SAI) para armar tu paquete de financiamiento.",
          "Acepta la ayuda en orden de prioridad: primero becas y subsidios (que no se devuelven), luego trabajo-estudio y después préstamos federales subsidiados. No tienes que aceptar todo el préstamo ofrecido; solicita únicamente lo necesario para matrícula y gastos indispensables.",
        ],
      },
      {
        titleEn: "Step 3: Complete Entrance Counseling and the MPN",
        titleEs: "Paso 3: Asesoramiento de Entrada y Firma del Pagaré (MPN)",
        paragraphsEn: [
          "First-time federal borrowers must complete online Entrance Counseling to ensure they understand loan terms, interest accumulation, and repayment responsibilities.",
          "You must also sign the Master Promissory Note (MPN), a legally binding document in which you promise to repay your loans plus accrued interest and applicable fees to the federal government.",
        ],
        paragraphsEs: [
          "Los prestatarios federales por primera vez deben completar el Asesoramiento de Entrada en línea para comprender tasas, acumulación de intereses y responsabilidades de pago.",
          "También debes firmar el Pagaré Maestro (MPN), un documento legalmente vinculante mediante el cual te comprometes a devolver los fondos más intereses y tarifas correspondientes.",
        ],
      },
      {
        titleEn: "Step 4: Applying for Private Student Loans (If Needed)",
        titleEs: "Paso 4: Solicitar Préstamos Privados (Si son Necesarios)",
        paragraphsEn: [
          "If a funding gap remains after exhausting all federal loan allowances, you can research private lenders. Check whether lenders offer rate prequalification with a soft credit pull that will not impact your credit score.",
          "When you submit formal applications, multiple hard credit inquiries made within a 14-to-30-day shopping window are generally treated as a single inquiry by modern credit scoring models.",
        ],
        paragraphsEs: [
          "Si persiste una brecha tras agotar los préstamos federales, investiga prestamistas privados. Verifica si ofrecen precalificación con consulta suave de crédito para no afectar tu puntaje.",
          "Al solicitar formalmente, múltiples consultas duras de crédito realizadas dentro de un período de compras de 14 a 30 días se computan como una sola consulta en los modelos de calificación modernos.",
        ],
      },
    ],
    bottomLineEn:
      "File your FAFSA early, accept gift aid and federal subsidized loans before turning to other borrowing, and check multiple private lender APRs with prequalification tools.",
    bottomLineEs:
      "Envía la FAFSA con anticipación, acepta subsidios y préstamos federales subsidiados antes que otras opciones, y compara las APR privadas con herramientas de precalificación.",
  },
  {
    id: "how_they_work",
    slug: "how-do-student-loans-work",
    titleEn: "How Do Student Loans Work?",
    titleEs: "¿Cómo Funcionan los Préstamos Estudiantiles?",
    tagEn: "Ask Experian · Official Guide",
    tagEs: "Ask Experian · Guía Oficial",
    descEn:
      "Everything about principal balances, daily compounding interest formulas, grace periods, and servicer management.",
    descEs:
      "Todo sobre saldos principales, fórmulas de interés diario, períodos de gracia y gestión de administradores de préstamos.",
    readTime: "8 min read",
    authorEn: "Ask Experian Editorial Team · Experian",
    authorEs: "Equipo Editorial de Ask Experian · Experian",
    sourceUrl:
      "https://www.experian.com/blogs/ask-experian/how-do-student-loans-work/",
    publishDateEn: "Updated 2026 · Syndicated with Permission",
    publishDateEs: "Actualizado 2026 · Distribuido con Autorización",
    quickAnswerEn:
      "Student loans are installment loans specifically designed to finance higher education costs. You borrow a principal sum that is disbursed directly to your school for tuition, with excess funds refunded to you for living expenses. In exchange, you agree to repay the principal plus accrued interest over a designated multi-year amortization schedule.",
    quickAnswerEs:
      "Los préstamos estudiantiles son préstamos a plazos diseñados para financiar la educación superior. Pides prestado un capital desembolsado directamente a tu universidad para matrícula, y el excedente se te entrega para gastos de manutención. A cambio, te comprometes a devolver el capital más los intereses acumulados según un calendario de amortización a varios años.",
    sections: [
      {
        titleEn: "How Student Loan Interest Accrues",
        titleEs: "Cómo se Acumulan los Intereses en los Préstamos",
        paragraphsEn: [
          "Student loan interest is typically calculated daily using a simple interest formula: your outstanding principal balance is multiplied by your annual interest rate and divided by 365.25 days.",
          "Daily Interest = (Unpaid Principal Balance × Interest Rate) ÷ 365.25. On subsidized loans, the government pays this daily amount while you are enrolled in school. On unsubsidized and private loans, this interest accumulates continuously.",
        ],
        paragraphsEs: [
          "El interés se calcula diariamente mediante una fórmula simple: tu saldo de capital insoluto se multiplica por la tasa anual y se divide entre 365.25 días.",
          "Interés Diario = (Saldo de Capital Pendiente × Tasa de Interés) ÷ 365.25. En los préstamos subsidiados, el gobierno paga este monto mientras estés estudiando. En los no subsidiados y privados, se acumula continuamente.",
        ],
      },
      {
        titleEn: "Interest Capitalization Explained",
        titleEs: "Qué es la Capitalización de Intereses",
        paragraphsEn: [
          "Interest capitalization occurs when accrued, unpaid interest is added to your original principal balance. From that point forward, interest begins accruing on your new, higher balance—meaning you pay interest on interest.",
          "Capitalization typically happens when your grace period ends, or when you exit certain forbearance or deferment statuses. Making interest-only payments while in school prevents capitalization and saves hundreds or thousands over the loan life.",
        ],
        paragraphsEs: [
          "La capitalización de intereses ocurre cuando los intereses acumulados y no pagados se suman al capital original. A partir de ese momento, los intereses se calculan sobre el saldo total mayor, lo que implica pagar intereses sobre intereses.",
          "La capitalización suele ocurrir al terminar el período de gracia o al salir de ciertos aplazamientos. Pagar los intereses mensuales mientras estudias evita esta capitalización y ahorra cientos o miles de dólares.",
        ],
      },
      {
        titleEn: "Grace Periods and Loan Servicing",
        titleEs: "Períodos de Gracia y Administradores de Préstamos",
        paragraphsEn: [
          "Most federal loans offer a six-month grace period after you graduate, leave school, or drop below half-time enrollment before your first payment becomes due. Private lenders may offer similar grace periods, though terms vary.",
          "The federal government assigns your loan to an official loan servicer (such as MOHELA, Nelnet, or Aidvantage). Your servicer is your primary contact for processing payments, changing repayment plans, or certifying forgiveness paperwork.",
        ],
        paragraphsEs: [
          "La mayoría de los préstamos federales otorgan un período de gracia de seis meses tras graduarte o reducir tu carga académica a menos de medio tiempo antes de exigir la primera cuota. Los prestamistas privados también ofrecen períodos de gracia, aunque sus términos varían.",
          "El gobierno federal asigna tu préstamo a un administrador oficial (como MOHELA, Nelnet o Aidvantage). Este administrador es tu contacto principal para procesar pagos, cambiar planes de pago o certificar documentos de perdón.",
        ],
      },
    ],
    bottomLineEn:
      "Understanding how daily interest accrues and how capitalization works gives you control over your debt. Making small interest payments while enrolled prevents balance growth and protects your credit health.",
    bottomLineEs:
      "Entender la acumulación diaria de intereses y la capitalización te da el control de tu deuda. Pagar pequeños montos de interés mientras estudias evita el aumento de la deuda y protege tu salud crediticia.",
  },
];

