export interface Testimonial {
  id: string;
  author: string;
  rating: 4 | 5;
  text: {
    pl: string;
    en: string;
    uk: string;
  };
  date: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    author: 'Marek Kowalski',
    rating: 5,
    text: {
      pl: 'Przetarcie na wymiar zrealizowane w ciągu jednego dnia. Deski wyszły dokładnie takie, jak zamawiałem — żadnych odchyłek. Polecam każdemu, kto potrzebuje precyzyjnego cięcia.',
      en: 'Custom cutting completed within a single day. The boards came out exactly as ordered — no deviations. I recommend it to anyone who needs precise cutting.',
      uk: 'Прорізання на замовлення виконано за один день. Дошки вийшли точно такими, як я замовляв — жодних відхилень. Рекомендую всім, хто потребує точного різання.',
    },
    date: '2024-11-03',
  },
  {
    id: 't2',
    author: 'Agnieszka Nowak',
    rating: 5,
    text: {
      pl: 'Kupiłam drewno szwedzkie C24 na więźbę dachową. Jakość wyraźnie lepsza niż w marketach budowlanych — proste, suche, certyfikowane. Ekipa dekarzy była pod wrażeniem.',
      en: 'I bought Swedish C24 timber for roof trusses. The quality is noticeably better than at building supply stores — straight, dry, certified. The roofing crew was impressed.',
      uk: 'Купила шведську деревину C24 для кроквяної конструкції даху. Якість значно краща, ніж у будівельних магазинах — рівна, суха, сертифікована. Бригада покрівельників була вражена.',
    },
    date: '2024-10-17',
  },
  {
    id: 't3',
    author: 'Tomasz Wiśniewski',
    rating: 5,
    text: {
      pl: 'Obsługa naprawdę pomocna — pan Andrzej doradził mi odpowiedni przekrój do podłogi i wyjaśnił różnicę między drewnem krajowym a szwedzkim. Zamówienie dostarczone na czas.',
      en: 'The staff was genuinely helpful — Mr. Andrzej advised me on the right cross-section for flooring and explained the difference between domestic and Swedish timber. Order delivered on time.',
      uk: 'Персонал справді корисний — пан Анджей порадив мені правильний переріз для підлоги та пояснив різницю між вітчизняною та шведською деревиною. Замовлення доставлено вчасно.',
    },
    date: '2024-09-28',
  },
  {
    id: 't4',
    author: 'Piotr Zieliński',
    rating: 4,
    text: {
      pl: 'Impregnacja próżniowa ciśnieniowa zrealizowana sprawnie. Drewno dobrze nasączone, kolor równomierny. Termin dostawy dotrzymany. Cena uczciwa za jakość jaką dostałem.',
      en: 'Vacuum pressure impregnation carried out efficiently. The wood is well saturated, even colour. Delivery deadline met. Fair price for the quality received.',
      uk: 'Вакуумно-тискова просочення виконано швидко. Деревина добре просочена, колір рівномірний. Термін доставки дотримано. Справедлива ціна за отриману якість.',
    },
    date: '2024-09-05',
  },
  {
    id: 't5',
    author: 'Katarzyna Lewandowska',
    rating: 5,
    text: {
      pl: 'Drewno dostarczone prosto na budowę w powiecie płońskim. Nie musiałam organizować transportu. Belki C24 na strop — wszystko zgodne z projektem, bez problemów z akceptacją inspektora.',
      en: 'Timber delivered directly to the construction site in Płońsk County. I did not have to arrange transport myself. C24 beams for the ceiling — everything matched the design, no problems with inspector approval.',
      uk: 'Деревину доставили прямо на будівельний майданчик у Плонськом повіті. Не довелося самостійно організовувати транспорт. Балки C24 для перекриття — усе відповідало проекту, жодних проблем із прийманням інспектора.',
    },
    date: '2024-08-14',
  },
];
