export type ExperianVideoKey =
  | "aprVsInterestRate"
  | "highInterestDebt"
  | "checkCreditScore"
  | "debtAvalanche"
  | "establishCredit"
  | "ficoFiveFactors";

export interface BilingualText {
  en: string;
  es: string;
}

export interface BilingualList {
  en: string[];
  es: string[];
}

export interface ExperianVideoData {
  key: ExperianVideoKey;
  youtubeId: string;
  isShort?: boolean;
  pageUrl: string;
  uploadDate: string;
  duration: string;
  title: BilingualText;
  caption: BilingualText;
  summary: BilingualText;
  takeaways: BilingualList;
  transcript: BilingualList;
}

export const EXPERIAN_VIDEOS: Record<ExperianVideoKey, ExperianVideoData> = {
  aprVsInterestRate: {
    key: "aprVsInterestRate",
    youtubeId: "0G5fqiQvnjE",
    isShort: false,
    pageUrl: "https://www.graduationnavigator.com/blog/student-loan-interest-by-the-numbers",
    uploadDate: "2024-03-15T00:00:00Z",
    duration: "PT2M15S",
    title: {
      en: "What’s the Difference Between APR and Interest Rate?",
      es: "¿Cuál es la diferencia entre la APR y la tasa de interés?",
    },
    caption: {
      en: "When comparing federal loans (which charge origination fees) against private student loan offers, APR captures the true annual cost of borrowing—not just the headline rate.",
      es: "Al comparar préstamos federales (que cobran tarifas de originación) con ofertas de préstamos privados, la APR refleja el costo anual real del préstamo, no solo la tasa principal.",
    },
    summary: {
      en: "Experian explains how an interest rate reflects only the base percentage charged on your loan principal, while the Annual Percentage Rate (APR) rolls in origination fees and lender charges so borrowers can compare loan offers apples-to-apples.",
      es: "Experian explica cómo la tasa de interés refleja únicamente el porcentaje base cobrado sobre el capital del préstamo, mientras que la tasa de porcentaje anual (APR) incluye tarifas de originación y cargos del prestamista para comparar ofertas en igualdad de condiciones.",
    },
    takeaways: {
      en: [
        "Your interest rate is the base annual percentage charged on the principal you borrow, which determines your core monthly interest accrual.",
        "Your APR (Annual Percentage Rate) includes the interest rate plus mandatory lender fees—such as federal origination fees or closing costs—expressed as an annual percentage.",
        "Always compare APRs side by side when evaluating loan offers: a loan with a slightly lower interest rate can still cost more overall if it carries higher upfront fees.",
        "For credit cards without upfront origination fees, the interest rate and APR are generally the same; for installment and student loans, APR is the broader cost benchmark.",
      ],
      es: [
        "La tasa de interés es el porcentaje anual base que se cobra sobre el capital prestado y determina la acumulación mensual básica de intereses.",
        "La APR (Tasa de Porcentaje Anual) incluye la tasa de interés más las tarifas obligatorias del prestamista—como las tarifas federales de originación o costos de cierre—expresadas como porcentaje anual.",
        "Compara siempre las APR al evaluar ofertas: un préstamo con una tasa de interés ligeramente más baja puede resultar más costoso en total si incluye tarifas iniciales más altas.",
        "En las tarjetas de crédito sin tarifas iniciales de originación, la tasa de interés y la APR suelen ser iguales; en los préstamos a plazos y estudiantiles, la APR es la referencia más completa del costo.",
      ],
    },
    transcript: {
      en: [
        "When you shop for a loan, you will almost always see two percentages listed side by side: the interest rate and the APR, or Annual Percentage Rate. They sound similar, and both measure the cost of borrowing money, but they do not measure the exact same thing.",
        "The interest rate is the base percentage a lender charges you each year on the principal balance you borrow. It directly drives how much interest accrues on your loan and forms the foundation of your monthly payment.",
        "The APR gives you the bigger picture. In addition to the base interest rate, the APR factors in mandatory upfront charges required to take out the loan—such as origination fees, lender fees, or certain closing costs—and spreads those costs across the life of the loan as a single annualized percentage.",
        "Because federal student loans and some private loans carry origination or disbursement fees, the APR is often slightly higher than the advertised interest rate. On credit cards, where upfront origination fees typically do not apply, the interest rate and APR are generally identical.",
        "Whenever you compare two loan offers from different lenders, look closely at the APR alongside the interest rate and repayment term. A lower headline interest rate paired with steep fees can actually end up costing you more than a slightly higher rate with zero origination fees.",
      ],
      es: [
        "Cuando buscas un préstamo, casi siempre verás dos porcentajes uno al lado del otro: la tasa de interés y la APR, o Tasa de Porcentaje Anual. Suenan parecidos y ambos miden el costo de pedir dinero prestado, pero no miden exactamente lo mismo.",
        "La tasa de interés es el porcentaje base que un prestamista te cobra cada año sobre el saldo de capital que pides prestado. Determina directamente cuánto interés se acumula en tu préstamo y constituye la base de tu pago mensual.",
        "La APR te ofrece una visión más completa. Además de la tasa de interés base, la APR incorpora los cargos iniciales obligatorios necesarios para obtener el préstamo—como tarifas de originación, comisiones del prestamista o ciertos costos de cierre—y distribuye esos costos a lo largo de la vida del préstamo como un único porcentaje anualizado.",
        "Debido a que los préstamos estudiantiles federales y algunos préstamos privados incluyen tarifas de originación o desembolso, la APR suele ser ligeramente más alta que la tasa de interés anunciada. En las tarjetas de crédito, donde normalmente no hay tarifas de originación iniciales, la tasa de interés y la APR suelen ser idénticas.",
        "Cada vez que compares dos ofertas de préstamos de distintos prestamistas, revisa cuidadosamente la APR junto con la tasa de interés y el plazo de pago. Una tasa de interés anunciada más baja acompañada de tarifas elevadas puede terminar costándote más que una tasa ligeramente superior sin tarifas de originación.",
      ],
    },
  },

  highInterestDebt: {
    key: "highInterestDebt",
    youtubeId: "eFlHihjcMX8",
    isShort: true,
    pageUrl: "https://www.graduationnavigator.com/blog/student-loan-interest-rates-history",
    uploadDate: "2024-04-19T00:00:00Z",
    duration: "PT55S",
    title: {
      en: "Tip 19: What Is Considered High Interest Debt?",
      es: "Consejo 19: ¿Qué se considera deuda con intereses altos?",
    },
    caption: {
      en: "Experian flags debt at 8% APR or higher as high-interest—putting today’s 8.07% federal graduate unsubsidized loan rate right across that threshold.",
      es: "Experian señala las deudas con una APR del 8% o más como de intereses altos, lo que sitúa la tasa federal actual de posgrado no subsidiado del 8.07% justo por encima de ese umbral.",
    },
    summary: {
      en: "In this Experian Financial Literacy Short, Experian explains the common 8% APR benchmark for high-interest debt and why balances above that level eat into monthly cash flow and compound faster over time.",
      es: "En este Short de educación financiera de Experian, se explica el umbral habitual del 8% de APR para la deuda con intereses altos y por qué los saldos por encima de ese nivel reducen el flujo de efectivo mensual y se acumulan más rápido con el tiempo.",
    },
    takeaways: {
      en: [
        "As a general rule of thumb, any debt carrying an APR of 8% or higher is considered high-interest debt.",
        "At 8.07% for 2026–27, federal Direct Unsubsidized graduate loans sit just above the 8% high-interest benchmark—making early planning and repayment strategy critical.",
        "Higher rates mean a larger share of every monthly payment goes toward interest instead of reducing your principal balance.",
        "Prioritizing high-interest balances—or checking whether lower-rate aid, assistantships, or refinancing (when appropriate) can reduce borrowing costs—can save thousands over a 10-year term.",
      ],
      es: [
        "Como regla general, cualquier deuda con una APR del 8% o superior se considera deuda con intereses altos.",
        "Con un 8.07% para 2026–27, los préstamos federales Directos no subsidiados de posgrado superan ligeramente ese umbral del 8%, haciendo clave planificar el financiamiento y el pago.",
        "Las tasas más altas implican que una mayor parte de cada pago mensual se destina a intereses en lugar de reducir el capital.",
        "Priorizar los saldos con tasas más altas—o reducir el monto prestado mediante becas, ayudantías o estrategias de pago—puede ahorrar miles de dólares en un plazo de 10 años.",
      ],
    },
    transcript: {
      en: [
        "Tip 19: What is considered high-interest debt?",
        "As a general rule of thumb, any loan or credit account with an Annual Percentage Rate—or APR—of 8% or higher is typically considered high-interest debt.",
        "Credit cards are the most familiar example, often charging well into the double digits, though certain personal loans and higher-rate education loans can also cross that 8% mark.",
        "When debt sits above 8%, a bigger share of your monthly payment goes straight to interest charges rather than paying down your principal balance. Over time, that slows down your payoff progress and puts extra pressure on your monthly budget.",
        "Knowing which of your balances cross the high-interest threshold helps you decide where extra payments, lower-cost funding, or a targeted payoff strategy will make the biggest impact.",
      ],
      es: [
        "Consejo 19: ¿Qué se considera deuda con intereses altos?",
        "Como regla general, cualquier préstamo o cuenta de crédito con una Tasa de Porcentaje Anual—o APR—del 8% o más suele considerarse deuda con intereses altos.",
        "Las tarjetas de crédito son el ejemplo más conocido, a menudo con tasas de dos dígitos, aunque ciertos préstamos personales y préstamos educativos con tasas elevadas también pueden superar esa marca del 8%.",
        "Cuando una deuda supera el 8%, una mayor proporción de tu pago mensual se destina directamente a cubrir intereses en lugar de reducir el capital. Con el tiempo, eso frena tu avance y ejerce mayor presión sobre tu presupuesto mensual.",
        "Saber cuáles de tus saldos superan el umbral de intereses altos te ayuda a decidir dónde los pagos adicionales, un financiamiento de menor costo o una estrategia enfocada generarán el mayor impacto.",
      ],
    },
  },

  checkCreditScore: {
    key: "checkCreditScore",
    youtubeId: "b31Cx65gzAc",
    isShort: false,
    pageUrl: "https://www.graduationnavigator.com/blog/refinancing-student-loans",
    uploadDate: "2023-08-10T00:00:00Z",
    duration: "PT2M45S",
    title: {
      en: "How to Check Your Credit Score",
      es: "Cómo consultar tu puntaje de crédito",
    },
    caption: {
      en: "Before requesting private refinancing rate quotes, check your own credit score for free—checking it yourself is a soft inquiry that never hurts your score.",
      es: "Antes de solicitar cotizaciones de refinanciación privada, consulta tu puntaje de crédito gratis: revisarlo tú mismo es una consulta blanda que nunca afecta tu puntaje.",
    },
    summary: {
      en: "Experian walks through free, safe ways to check your credit score—directly through a credit bureau, your bank or card issuer, or a nonprofit counselor—and explains why FICO and VantageScore numbers can differ slightly.",
      es: "Experian detalla formas gratuitas y seguras de consultar tu puntaje de crédito—directamente en un buró de crédito, tu banco o emisor de tarjeta, o un asesor sin fines de lucro—y explica por qué los puntajes FICO y VantageScore pueden variar ligeramente.",
    },
    takeaways: {
      en: [
        "Checking your own credit score counts as a soft inquiry and has zero impact on your credit score.",
        "You can check your FICO® Score for free directly through Experian, through many credit card issuers and banks, or with a nonprofit credit counseling agency.",
        "Different sources may show different scoring models (such as FICO® Score 8 vs. VantageScore) or pull from different bureaus, so focus on the range and trend rather than expecting identical numbers everywhere.",
        "Reviewing your credit report alongside your score before refinancing lets you catch errors and see whether you qualify for top-tier private rates—or whether a cosigner could help.",
      ],
      es: [
        "Consultar tu propio puntaje de crédito cuenta como una consulta blanda y no tiene ningún impacto negativo en tu puntaje.",
        "Puedes consultar tu puntaje FICO® gratis directamente a través de Experian, mediante muchos bancos y emisores de tarjetas, o con una agencia de asesoría crediticia sin fines de lucro.",
        "Distintas fuentes pueden mostrar modelos diferentes (como FICO® Score 8 frente a VantageScore) o datos de distintos burós, por lo que conviene fijarse en el rango y la tendencia general.",
        "Revisar tu reporte y puntaje de crédito antes de refinanciar te permite detectar errores y saber si calificas para las mejores tasas privadas—o si un cofirmante podría ayudarte.",
      ],
    },
    transcript: {
      en: [
        "Knowing where your credit score stands is one of the smartest first steps before applying for a loan or refinancing existing debt—and checking your own score is free and will never hurt your credit.",
        "There are several reliable ways to check your score. First, you can create a free account directly with a major credit bureau like Experian to view your credit report alongside your FICO® Score 8 and track changes over time.",
        "Second, many credit card issuers, banks, and credit unions include free monthly credit score access right inside your online banking dashboard or mobile app.",
        "Third, free credit monitoring websites and accredited nonprofit credit counseling agencies can also help you review your score and understand what is driving it up or holding it back.",
        "Keep in mind that lenders use different scoring models—most commonly versions of FICO® or VantageScore—and may pull data from Experian, Equifax, or TransUnion. Because of that, the number you see on one app may differ slightly from the score a lender sees.",
        "Pair your score check with a quick review of your credit report for unfamiliar accounts or late-payment errors, and you will enter the prequalification process knowing exactly what rates to expect.",
      ],
      es: [
        "Conocer en qué punto se encuentra tu puntaje de crédito es uno de los primeros pasos más inteligentes antes de solicitar un préstamo o refinanciar una deuda existente—y consultarlo tú mismo es gratis y nunca perjudica tu crédito.",
        "Existen varias formas confiables de consultar tu puntaje. Primero, puedes crear una cuenta gratuita directamente con un buró de crédito principal como Experian para ver tu reporte crediticio junto con tu FICO® Score 8 y seguir su evolución.",
        "Segundo, muchos emisores de tarjetas de crédito, bancos y cooperativas de crédito incluyen acceso mensual gratuito a tu puntaje directamente en su banca en línea o aplicación móvil.",
        "Tercero, los sitios gratuitos de monitoreo de crédito y las agencias acreditadas de asesoría crediticia sin fines de lucro también pueden ayudarte a revisar tu puntaje y entender qué factores lo impulsan o lo frenan.",
        "Ten en cuenta que los prestamistas utilizan diferentes modelos de calificación—principalmente versiones de FICO® o VantageScore—y pueden consultar datos de Experian, Equifax o TransUnion. Por eso, el número que ves en una aplicación puede variar ligeramente del que ve un prestamista.",
        "Combina la revisión de tu puntaje con una lectura rápida de tu reporte de crédito para detectar cuentas desconocidas o errores en pagos atrasados, y así iniciarás la precalificación sabiendo exactamente qué tasas esperar.",
      ],
    },
  },

  debtAvalanche: {
    key: "debtAvalanche",
    youtubeId: "GG4ldn39wMc",
    isShort: false,
    pageUrl: "https://www.graduationnavigator.com/manage-loans",
    uploadDate: "2024-02-20T00:00:00Z",
    duration: "PT2M30S",
    title: {
      en: "The Debt Avalanche Method: How It Works and When to Use It",
      es: "El método de avalancha de deuda: cómo funciona y cuándo usarlo",
    },
    caption: {
      en: "If you hold multiple student loans at different rates, targeting the highest-interest balance first minimizes total interest paid over time.",
      es: "Si tienes varios préstamos estudiantiles con distintas tasas, atacar primero el saldo con el interés más alto minimiza el total de intereses pagados con el tiempo.",
    },
    summary: {
      en: "Experian explains how the debt avalanche method works—paying minimums on every loan while directing all extra cash to the highest-APR balance—and compares it with the debt snowball method.",
      es: "Experian explica cómo funciona el método de avalancha de deuda—cubrir los pagos mínimos en todos los préstamos mientras diriges todo el dinero extra al saldo con mayor APR—y lo compara con el método bola de nieve.",
    },
    takeaways: {
      en: [
        "Make the required minimum payment on every loan every month so every account stays current and protects your credit history.",
        "Put every extra dollar you can afford toward the loan with the highest interest rate (for example, a 9.07% PLUS loan or 8.07% unsubsidized grad loan before a 5% undergrad loan).",
        "Once that highest-rate loan is paid off, roll its entire payment into the loan with the next-highest interest rate—creating a compounding avalanche effect.",
        "Compared to the debt snowball method (smallest balance first), the debt avalanche saves the most money on total interest and gets you debt-free faster mathematically.",
      ],
      es: [
        "Realiza el pago mínimo obligatorio en cada préstamo todos los meses para mantener todas tus cuentas al día y proteger tu historial crediticio.",
        "Destina cada dólar adicional disponible al préstamo con la tasa de interés más alta (por ejemplo, un préstamo PLUS al 9.07% o un préstamo de posgrado al 8.07% antes que uno de pregrado al 5%).",
        "Cuando liquides ese préstamo de tasa más alta, suma todo ese pago al préstamo con la siguiente tasa más alta, generando un efecto avalancha compuesto.",
        "En comparación con el método bola de nieve (que prioriza el saldo más pequeño), la avalancha ahorra la mayor cantidad de intereses totales y te libera de deudas más rápido desde el punto de vista matemático.",
      ],
    },
    transcript: {
      en: [
        "If you are juggling several student loans or credit accounts at once, deciding where to put extra payments can save you thousands of dollars. One of the most cost-effective strategies is the debt avalanche method.",
        "Here is how it works. First, list all of your debts in order from the highest interest rate down to the lowest. Second, continue making at least the minimum monthly payment on every single account so you avoid late fees and keep your payment history spotless.",
        "Third, take whatever extra money fits comfortably in your budget each month and put all of it toward the single debt with the highest interest rate.",
        "As soon as that highest-rate balance reaches zero, take the full amount you were paying toward it—both its minimum payment and your extra contribution—and roll it directly onto the debt with the next-highest interest rate.",
        "Repeat that rollover until every balance is gone. Unlike the debt snowball method, which targets the smallest balance first for quick psychological wins, the debt avalanche targets the most expensive interest first, meaning you pay the least total interest over the life of your loans.",
        "The debt avalanche works best when you have steady cash flow above your minimums and want the mathematically fastest, lowest-cost path out of debt—especially when you have a mix of higher-rate and lower-rate loans.",
      ],
      es: [
        "Si estás manejando varios préstamos estudiantiles o cuentas de crédito al mismo tiempo, decidir dónde aplicar pagos adicionales puede ahorrarte miles de dólares. Una de las estrategias más eficientes es el método de avalancha de deuda.",
        "Así funciona. Primero, haz una lista de todas tus deudas ordenadas desde la tasa de interés más alta hasta la más baja. Segundo, continúa haciendo al menos el pago mínimo mensual en cada cuenta para evitar cargos por mora y mantener impecable tu historial de pagos.",
        "Tercero, toma cualquier monto extra que quepa cómodamente en tu presupuesto cada mes y aplícalo por completo a la deuda con la tasa de interés más alta.",
        "Tan pronto como ese saldo de tasa más alta llegue a cero, toma todo el dinero que pagabas en él—tanto el pago mínimo como tu aporte adicional—y súmalo directamente al préstamo con la siguiente tasa de interés más alta.",
        "Repite ese proceso hasta liquidar todos tus saldos. A diferencia del método bola de nieve, que ataca primero el saldo más pequeño para obtener victorias psicológicas rápidas, la avalancha elimina primero el interés más costoso, lo que significa pagar menos intereses totales durante la vida de tus préstamos.",
        "El método de avalancha funciona mejor cuando tienes un flujo de efectivo estable por encima de tus pagos mínimos y buscas el camino matemáticamente más rápido y económico para salir de deudas, especialmente cuando combinas préstamos de tasas altas y bajas.",
      ],
    },
  },

  establishCredit: {
    key: "establishCredit",
    youtubeId: "5Zw6ZeKKZRM",
    isShort: false,
    pageUrl: "https://www.graduationnavigator.com/blog/student-loan-types",
    uploadDate: "2024-01-18T00:00:00Z",
    duration: "PT2M40S",
    title: {
      en: "How to Establish Credit as a Young Person",
      es: "Cómo construir historial crediticio desde joven",
    },
    caption: {
      en: "Private student lenders base approval and interest rates heavily on credit history—building credit early can reduce borrowing costs or help you qualify without a cosigner.",
      es: "Los prestamistas privados basan la aprobación y las tasas de interés en el historial crediticio: construir crédito temprano puede reducir los costos o ayudarte a calificar sin cofirmante.",
    },
    summary: {
      en: "Experian outlines practical ways young adults and students with thin credit files can start building a credit history—from becoming an authorized user or opening a starter/secured card to paying everyday bills on time.",
      es: "Experian presenta formas prácticas para que jóvenes adultos y estudiantes con historial crediticio limitado comiencen a construir crédito—desde ser usuario autorizado o abrir una tarjeta garantizada hasta pagar puntualmente las cuentas cotidianas.",
    },
    takeaways: {
      en: [
        "Becoming an authorized user on a parent’s or trusted family member’s well-managed credit card can add positive payment history and account age to your file.",
        "A secured credit card (backed by a refundable security deposit) or a starter student credit card is designed for applicants with little or no prior credit history.",
        "Paying every balance on time and keeping your credit utilization low (well under 30% of your limit) builds strong score momentum quickly.",
        "Tools like Experian Boost® can help incorporate eligible on-time utility, phone, and streaming payments into your Experian credit file.",
      ],
      es: [
        "Convertirse en usuario autorizado en la tarjeta de crédito bien administrada de un padre o familiar de confianza puede aportar historial de pagos positivos y antigüedad a tu expediente.",
        "Una tarjeta de crédito garantizada (respaldada por un depósito reembolsable) o una tarjeta estudiantil inicial está diseñada para solicitantes con poco o ningún historial previo.",
        "Pagar cada saldo puntualmente y mantener baja la utilización del crédito (muy por debajo del 30% de tu límite) impulsa rápidamente tu puntaje.",
        "Herramientas como Experian Boost® pueden ayudar a incorporar pagos puntuales elegibles de servicios públicos, teléfono y plataformas de streaming en tu archivo de crédito de Experian.",
      ],
    },
    transcript: {
      en: [
        "Building credit from scratch can feel like a catch-22: lenders want to see a track record before approving you for good rates, but you need an account to build that track record in the first place.",
        "Fortunately, there are several straightforward ways to establish credit as a student or young adult. One of the easiest starting points is asking a parent or trusted family member with strong credit habits to add you as an authorized user on an existing credit card. If the card issuer reports authorized users to the credit bureaus, their on-time payment history can begin showing up on your report.",
        "Another common path is applying for a secured credit card or a student credit card. With a secured card, you put down a refundable cash deposit that usually serves as your credit limit. Use it for small, planned purchases and pay the statement balance in full every month.",
        "You can also explore credit-builder tools—such as credit-builder loans or services like Experian Boost—that allow eligible on-time phone, utility, and streaming bills to factor into your Experian credit file.",
        "Whichever path you start with, two habits matter most from day one: never miss a due date, and keep your balance low relative to your credit limit. Over time, those steady habits unlock stronger rates on private loans, apartments, and refinancing.",
      ],
      es: [
        "Construir crédito desde cero puede sentirse como un círculo vicioso: los prestamistas quieren ver un historial antes de aprobarte buenas tasas, pero necesitas una cuenta para crear ese historial.",
        "Afortunadamente, existen varias formas directas de establecer crédito como estudiante o adulto joven. Uno de los puntos de partida más sencillos es pedirle a un padre o familiar de confianza con buenos hábitos crediticios que te agregue como usuario autorizado en una tarjeta existente. Si el emisor reporta a los usuarios autorizados a los burós de crédito, su historial de pagos puntuales puede comenzar a aparecer en tu reporte.",
        "Otro camino común es solicitar una tarjeta de crédito garantizada o una tarjeta para estudiantes. Con una tarjeta garantizada, entregas un depósito reembolsable en efectivo que normalmente funciona como tu límite de crédito. Úsala para compras pequeñas planificadas y paga el saldo total del estado de cuenta cada mes.",
        "También puedes explorar herramientas diseñadas para crear historial—como préstamos para construir crédito o servicios como Experian Boost—que permiten incorporar pagos puntuales elegibles de teléfono, servicios públicos y streaming en tu archivo de crédito de Experian.",
        "Sea cual sea la opción con la que comiences, dos hábitos son los más importantes desde el primer día: nunca falles en una fecha de vencimiento y mantén un saldo bajo en relación con tu límite de crédito. Con el tiempo, esos hábitos constantes te abrirán la puerta a mejores tasas en préstamos privados, alquileres y refinanciación.",
      ],
    },
  },

  ficoFiveFactors: {
    key: "ficoFiveFactors",
    youtubeId: "o10zWQQQthk",
    isShort: false,
    pageUrl: "https://www.graduationnavigator.com/in-depth-analysis",
    uploadDate: "2023-06-12T00:00:00Z",
    duration: "PT2M10S",
    title: {
      en: "What Five Factors Determine My FICO® Score?",
      es: "¿Qué cinco factores determinan mi puntaje FICO®?",
    },
    caption: {
      en: "A quick visual breakdown of the five ingredients behind your FICO® Score before you dive into Experian’s downloadable credit guides below.",
      es: "Un desglose visual rápido de los cinco factores detrás de tu puntaje FICO® antes de explorar las guías descargables de crédito de Experian a continuación.",
    },
    summary: {
      en: "Experian Credit 101 Express breaks down the five components that determine a FICO® Score: payment history (35%), amounts owed / credit utilization (30%), length of credit history (15%), credit mix (10%), and new credit inquiries (10%).",
      es: "Experian Credit 101 Express explica los cinco componentes que determinan un puntaje FICO®: historial de pagos (35%), montos adeudados / utilización del crédito (30%), antigüedad del historial crediticio (15%), combinación de crédito (10%) y nuevas consultas de crédito (10%).",
    },
    takeaways: {
      en: [
        "Payment History (35%): Paying every bill and student loan on time is the single biggest driver of your FICO® Score.",
        "Amounts Owed / Credit Usage (30%): Keeping revolving credit card balances low compared to your total credit limits strongly supports a healthy score.",
        "Length of Credit History (15%): Older accounts and a longer average account age demonstrate proven credit experience.",
        "Credit Mix (10%) & New Credit (10%): Responsibly managing a mix of account types (such as installment student loans and revolving cards) helps, while spacing out hard credit applications limits short-term score dips.",
      ],
      es: [
        "Historial de pagos (35%): Pagar puntualmente cada factura y préstamo estudiantil es el factor con mayor peso en tu puntaje FICO®.",
        "Montos adeudados / Uso del crédito (30%): Mantener saldos bajos en tarjetas de crédito en relación con tus límites totales respalda sólidamente un puntaje saludable.",
        "Antigüedad del historial crediticio (15%): Cuentas más antiguas y un mayor promedio de antigüedad demuestran experiencia crediticia comprobada.",
        "Combinación de crédito (10%) y Nuevo crédito (10%): Administrar responsablemente distintos tipos de cuentas (como préstamos estudiantiles a plazos y tarjetas) ayuda, mientras espaciar las solicitudes nuevas limita caídas temporales.",
      ],
    },
    transcript: {
      en: [
        "Your FICO® Score plays a major role in the loan rates and financial products you qualify for—and understanding the five factors behind it takes the mystery out of how scores move.",
        "First, and most important, is payment history, which accounts for about 35% of your score. Consistently paying your credit cards, student loans, and other bills on time builds a strong track record, while missed or late payments can weigh heavily.",
        "Second is credit usage, or amounts owed, making up roughly 30%. Scoring models look closely at your credit utilization ratio—how much of your available revolving credit limit you are using at any given time. Keeping balances low relative to your limits helps keep this factor strong.",
        "Third is the length of your credit history, at about 15%. This reflects the age of your oldest account, your newest account, and the average age across all your accounts.",
        "Fourth is your credit mix, at about 10%, which considers whether you have experience managing different types of credit—such as revolving credit cards alongside installment loans like student or auto loans.",
        "Fifth is new credit and recent inquiries, also around 10%. Opening several new accounts or generating multiple hard inquiries in a short window can signal added risk to lenders. Focusing first on on-time payments and low credit utilization covers nearly two-thirds of the entire formula.",
      ],
      es: [
        "Tu puntaje FICO® cumple un papel fundamental en las tasas de préstamo y productos financieros a los que calificas, y entender los cinco factores que lo componen elimina el misterio sobre cómo cambia.",
        "El primero, y más importante, es el historial de pagos, que representa aproximadamente el 35% de tu puntaje. Pagar de manera constante tus tarjetas de crédito, préstamos estudiantiles y otras facturas a tiempo construye un historial sólido, mientras que los pagos atrasados pueden pesar mucho.",
        "El segundo es el uso del crédito, o montos adeudados, que equivale aproximadamente al 30%. Los modelos analizan de cerca tu índice de utilización de crédito—cuánto de tu límite de crédito revolvente disponible estás usando en un momento dado. Mantener saldos bajos en relación con tus límites fortalece este factor.",
        "El tercero es la antigüedad de tu historial crediticio, cerca del 15%. Esto refleja la edad de tu cuenta más antigua, la de tu cuenta más reciente y el promedio de antigüedad de todas tus cuentas.",
        "El cuarto es la combinación de crédito, alrededor del 10%, que evalúa si tienes experiencia administrando distintos tipos de crédito—como tarjetas revolventes junto con préstamos a plazos como préstamos estudiantiles o de auto.",
        "El quinto es el nuevo crédito y las consultas recientes, también cerca del 10%. Abrir varias cuentas nuevas o generar múltiples consultas duras en un período corto puede señalar un mayor riesgo para los prestamistas. Enfocarte primero en pagos puntuales y baja utilización cubre casi dos tercios de toda la fórmula.",
      ],
    },
  },
};

export function buildVideoObjectSchema(key: ExperianVideoKey) {
  const video = EXPERIAN_VIDEOS[key];
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.title.en,
    description: video.summary.en,
    thumbnailUrl: [
      `https://i.ytimg.com/vi/${video.youtubeId}/maxresdefault.jpg`,
      `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`,
    ],
    uploadDate: video.uploadDate,
    duration: video.duration,
    contentUrl: `https://www.youtube.com/watch?v=${video.youtubeId}`,
    embedUrl: `https://www.youtube-nocookie.com/embed/${video.youtubeId}`,
    inLanguage: "en-US",
    transcript: video.transcript.en.join(" "),
    publisher: {
      "@type": "Organization",
      name: "Experian",
      url: "https://www.experian.com",
    },
    isPartOf: {
      "@type": "WebPage",
      url: video.pageUrl,
    },
  };
}

