/**
 * Trilingual FAQ data for the FAQPage JSON-LD schema.
 *
 * Contains 7 Q&A pairs covering ordering, delivery, timber grades,
 * custom cutting, Södra brand, opening hours, and price quotes.
 *
 * TODO: Ukrainian translations must be reviewed by a native speaker before
 * go-live — machine-translated content is penalised by Google.
 */

export type FaqItem = {
  question: Record<'pl' | 'en' | 'uk', string>;
  answer: Record<'pl' | 'en' | 'uk', string>;
};

export const FAQ_DATA: FaqItem[] = [
  // 1. How to place an order
  {
    question: {
      pl: 'Jak złożyć zamówienie na drewno?',
      en: 'How do I place an order for timber?',
      uk: 'Як зробити замовлення на деревину?',
    },
    answer: {
      pl: 'Zamówienie można złożyć telefonicznie pod numerem +48 504 251 535 lub przez formularz kontaktowy na naszej stronie. Odpowiadamy na zapytania w ciągu jednego dnia roboczego.',
      en: 'Orders can be placed by phone at +48 504 251 535 or via the contact form on our website. We respond to enquiries within one business day.',
      uk: 'Замовлення можна зробити по телефону +48 504 251 535 або через контактну форму на нашому сайті. Ми відповідаємо на запити протягом одного робочого дня.',
    },
  },

  // 2. Delivery options and range
  {
    question: {
      pl: 'Czy oferujecie dostawę drewna?',
      en: 'Do you offer timber delivery?',
      uk: 'Чи пропонуєте ви доставку деревини?',
    },
    answer: {
      pl: 'Tak, realizujemy dostawy na terenie Mazowsza i okolic. Koszty dostawy ustalane są indywidualnie w zależności od ilości i odległości. Możliwy jest również odbiór osobisty z tartaku w Płońsku.',
      en: 'Yes, we deliver throughout Mazovia and the surrounding regions. Delivery costs are agreed individually depending on quantity and distance. Self-collection from the sawmill in Płońsk is also available.',
      uk: 'Так, ми здійснюємо доставку по Мазовії та прилеглих регіонах. Вартість доставки узгоджується індивідуально залежно від кількості та відстані. Також можливо самовивезення з лісопильні в Плоньську.',
    },
  },

  // 3. What timber grades are available
  {
    question: {
      pl: 'Jakie klasy drewna są dostępne?',
      en: 'What timber grades are available?',
      uk: 'Які класи деревини доступні?',
    },
    answer: {
      pl: 'Oferujemy tarcicę iglastą (sosna, świerk) w klasach standardowych oraz szwedzkie drewno konstrukcyjne klasy wytrzymałości C24 według normy EN 338, certyfikowane przez Södra. Klasa C24 jest przeznaczona do konstrukcji nośnych.',
      en: 'We offer standard softwood (pine, spruce) and Swedish structural timber graded C24 to EN 338, certified by Södra. C24 grade is suitable for load-bearing structures.',
      uk: 'Ми пропонуємо стандартну хвойну деревину (сосна, ялина) та шведську конструктивну деревину класу C24 за нормою EN 338, сертифіковану Södra. Клас C24 призначений для несучих конструкцій.',
    },
  },

  // 4. Custom cutting dimensions
  {
    question: {
      pl: 'Czy tniecie drewno na wymiar?',
      en: 'Do you cut timber to custom dimensions?',
      uk: 'Чи ріжете ви деревину на замовлення?',
    },
    answer: {
      pl: 'Tak, nasza piła taśmowa TrakMet umożliwia cięcie belek, łat i desek na indywidualne wymiary. Prosimy o podanie wymiarów i ilości przy składaniu zamówienia.',
      en: 'Yes, our TrakMet band saw allows us to cut beams, battens, and boards to custom dimensions. Please provide the dimensions and quantities when placing your order.',
      uk: 'Так, наша стрічкова пила TrakMet дозволяє різати балки, рейки та дошки на індивідуальні розміри. Будь ласка, вкажіть розміри та кількість при оформленні замовлення.',
    },
  },

  // 5. What is Södra Swedish timber
  {
    question: {
      pl: 'Czym jest drewno szwedzkie Södra?',
      en: 'What is Södra Swedish timber?',
      uk: 'Що таке шведська деревина Södra?',
    },
    answer: {
      pl: 'Södra to wiodąca szwedzka spółdzielnia leśna produkująca drewno z certyfikowanych lasów zarządzanych zrównoważenie. Drewno Södra klasy C24 jest suszone komorowo, co zapewnia stabilność wymiarową i niską wilgotność (18%) niezbędną do stosowań konstrukcyjnych.',
      en: 'Södra is a leading Swedish forest cooperative producing timber from certified, sustainably managed forests. Södra C24 timber is kiln-dried to ensure dimensional stability and low moisture content (18%) required for structural applications.',
      uk: 'Södra — провідний шведський лісовий кооператив, що виробляє деревину із сертифікованих лісів зі сталим управлінням. Деревина Södra класу C24 висушена в камері для забезпечення розмірної стабільності та низької вологості (18%), необхідної для конструктивних застосувань.',
    },
  },

  // 6. Opening hours and location
  {
    question: {
      pl: 'Jakie są godziny otwarcia tartaku i gdzie się znajduje?',
      en: 'What are the sawmill opening hours and where is it located?',
      uk: 'Які години роботи лісопильні та де вона знаходиться?',
    },
    answer: {
      pl: 'Tartak czynny jest od poniedziałku do piątku w godzinach 8:00–17:00. Znajdujemy się przy ulicy Wyszogrodzkiej w Płońsku (kod pocztowy 09-100). Zapraszamy do odbioru osobistego.',
      en: 'The sawmill is open Monday to Friday from 08:00 to 17:00. We are located on Wyszogrodzka Street in Płońsk (postcode 09-100). You are welcome to collect in person.',
      uk: 'Лісопильня працює з понеділка по п\'ятницю з 08:00 до 17:00. Ми знаходимося на вулиці Вишогродській в Плоньську (індекс 09-100). Запрошуємо до самовивезення.',
    },
  },

  // 7. How to get a price quote
  {
    question: {
      pl: 'Jak uzyskać wycenę zamówienia?',
      en: 'How do I get a price quote?',
      uk: 'Як отримати цінову пропозицію?',
    },
    answer: {
      pl: 'Wycenę można uzyskać, wypełniając formularz zapytania na naszej stronie lub kontaktując się telefonicznie pod numerem +48 504 251 535. Prosimy o podanie gatunku drewna, wymiarów oraz ilości. Odpowiadamy na zapytania w ciągu 24 godzin.',
      en: 'You can get a quote by filling in the enquiry form on our website or by calling +48 504 251 535. Please provide the timber species, dimensions, and quantity. We respond to enquiries within 24 hours.',
      uk: 'Ви можете отримати пропозицію, заповнивши форму запиту на нашому сайті або зателефонувавши за номером +48 504 251 535. Будь ласка, вкажіть вид деревини, розміри та кількість. Ми відповідаємо на запити протягом 24 годин.',
    },
  },
];
