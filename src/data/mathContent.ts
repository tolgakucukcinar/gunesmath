export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Example {
  id: string;
  problem: string;
  solution: string;
  stepByStep: string[];
}

export interface LessonCard {
  id: string;
  type: 'text' | 'image' | 'interactive' | 'example';
  content: string; 
  imageUrl?: string;
  example?: Example;
}

export interface SubTopic {
  id: string;
  title: string;
  description: string;
  cards: LessonCard[];
  quiz: QuizQuestion[];
}

export interface Topic {
  id: string;
  title: string;
  icon: string;
  color: string;
  subTopics: SubTopic[];
}

export const MATH_CONTENT: Topic[] = [
  {
    id: 'natural-numbers',
    title: 'Doğal Sayılar',
    icon: 'Hash',
    color: 'bg-orange-500',
    subTopics: [
      {
        id: 'millions',
        title: 'Milyonlar',
        description: '7, 8 ve 9 basamaklı sayıları okuma ve yazma.',
        cards: [
            { 
              id: 'c1', 
              type: 'text', 
              content: '👋 Hoş geldin! Sayıların büyülü dünyasına giriş yapıyoruz. Bugün **Milyonlar** ile tanışacağız.' 
            },
            { 
              id: 'c2', 
              type: 'text', 
              content: 'Sayıları okumak bazen zor gelebilir ama bir sırrımız var: **Bölükler!** Sayıları sağdan sola doğru üçerli gruplara ayırırız.' 
            },
            {
              id: 'c3',
              type: 'example',
              content: 'Hadi bir örneği inceleyelim:',
              example: {
                id: 'ex1',
                problem: '12.345.678 sayısı nasıl okunur?',
                solution: 'On iki milyon üç yüz kırk beş bin altı yüz yetmiş sekiz',
                stepByStep: [
                  'En sağdaki 3 rakam (678) -> Birler Bölüğü',
                  'Ortadaki 3 rakam (345) -> Binler Bölüğü',
                  'En soldaki kısım (12) -> Milyonlar Bölüğü',
                  'Okurken önce sayıyı söyleriz, sonra bölüğün ismini ekleriz!'
                ]
              }
            }
        ],
        quiz: [
            { id: 'q1', question: '78.102.005 sayısının okunuşu nedir?', options: ['Yetmiş sekiz milyon yüz iki bin beş', 'Yedi yüz seksen milyon yüz iki bin beş', 'Yetmiş sekiz milyon on iki bin beş'], correctIndex: 0, explanation: 'Milyonlar bölüğünde 78 var. Binler bölüğünde 102 var. Birler bölüğünde sadece 5 var (005).' },
            { id: 'q2', question: 'Birler bölüğü 045, binler bölüğü 100 ve milyonlar bölüğü 7 olan sayı hangisidir?', options: ['7.100.045', '7.045.100', '100.045.007'], correctIndex: 0, explanation: 'Milyonlar (7) en başa, sonra binler (100), en sona birler (045) gelir. Sonuç: 7.100.045' }
        ]
      }
    ]
  },
  {
    id: 'operations',
    title: 'Doğal Sayılarla İşlemler',
    icon: 'Calculator',
    color: 'bg-red-500',
    subTopics: [
        {
            id: 'addition-subtraction',
            title: 'Toplama ve Çıkarma',
            description: 'Eldeli toplama ve onluk bozarak çıkarma.',
            cards: [
              { id: 'c1', type: 'text', content: 'Toplama işlemine her zaman **birler basamağından** (en sağdan) başlarız.' },
              { id: 'c2', type: 'text', content: 'Eğer toplam 9\'dan büyükse, **Elde** var demektir! Bu eldeyi bir sonraki basamağa eklemeyi unutma.' }
            ],
            quiz: [{ id: 'q1', question: '125 + 275 = ?', options: ['300', '400', '390'], correctIndex: 1, explanation: '5+5=10 (elde var 1), 2+7=9 (eldeyle 10), 1+2=3 (eldeyle 4). Sonuç 400.' }]
        }
    ]
  },
  {
    id: 'fractions',
    title: 'Kesirler',
    icon: 'PieChart',
    color: 'bg-blue-500',
    subTopics: [
      {
        id: 'basic-fractions',
        title: 'Kesirleri Tanıyalım',
        description: 'Basit kesirler, bileşik kesirler ve tam sayılı kesirler nedir?',
        cards: [
          {
            id: 'c1',
            type: 'text',
            content: '👋 Merhaba! Bugün **Kesirler** dünyasına dalıyoruz. Bir pastayı düşün. Eğer pastayı hiç kesmezsen, bu bir "Bütün"dür (1).'
          },
          {
            id: 'c2',
            type: 'text',
            content: '🍰 Pastayı 4 eş parçaya böldüğünü hayal et. Bu parçalardan birini alırsan, pastanın **dörtte birini (1/4)** almış olursun. Payda (alttaki sayı) kaç parçaya böldüğümüzü, Pay (üstteki sayı) kaç parça aldığımızı gösterir.'
          },
          {
            id: 'c3',
            type: 'example',
            content: 'Örnekler üzerinden gidelim:',
            example: {
              id: 'ex1',
              problem: 'Bir elmayı 2 eş parçaya böldük. Her parça nedir?',
              solution: '1/2 (Yarım)',
              stepByStep: [
                'Elma bütün halde (1).',
                'İkiye böldük (/2).',
                'Sonuç: 1/2'
              ]
            }
          },
          {
            id: 'c4',
            type: 'text',
            content: '📌 **Basit Kesir:** Payı paydasından küçük olan kesirdir. Örnek: 1/2, 3/4. Bunlar her zaman 1 bütünden küçüktür.'
          }
        ],
        quiz: [
          {
            id: 'q1',
            question: 'Aşağıdakilerden hangisi basit kesirdir?',
            options: ['5/2', '1/1', '3/4', '7/3'],
            correctIndex: 2,
            explanation: '3 sayısı 4\'ten küçüktür (Pay < Payda), bu yüzden 3/4 basit kesirdir.'
          },
          {
            id: 'q2',
            question: 'Bir pastayı 8 dilime böldün ve 3 dilimini yedin. Ne kadar yedin?',
            options: ['3/8', '8/3', '5/8', '1/8'],
            correctIndex: 0,
            explanation: '3 parça yedin (Pay), toplam 8 parça vardı (Payda). Cevap 3/8.'
          }
        ]
      },
      {
        id: 'fraction-addition',
        title: 'Kesirlerle Toplama',
        description: 'Paydaları eşit kesirleri nasıl toplarız?',
        cards: [
          {
            id: 'c1',
            type: 'text',
            content: '➕ Kesirleri toplarken en önemli kural: **Paydalar eşit olmalı!** Eğer paydalar eşitse, sadece payları toplarız.'
          },
          {
            id: 'c2',
            type: 'example',
            content: 'Hadi toplayalım:',
            example: {
                id: 'ex2',
                problem: '2/7 + 3/7 = ?',
                solution: '5/7',
                stepByStep: [
                  'Paydalar aynı mı? Evet (7).',
                  'Payları topla: 2 + 3 = 5.',
                  'Ortak paydayı aynen yaz.',
                  'Sonuç: 5/7'
                ]
            }
          }
        ],
        quiz: [
          {
            id: 'q1',
            question: '1/5 + 2/5 işleminin sonucu nedir?',
            options: ['3/10', '3/5', '2/5', '1/5'],
            correctIndex: 1,
            explanation: 'Paydalar eşit (5). Payları topluyoruz: 1+2=3. Sonuç 3/5.'
          }
        ]
      }
    ]
  },
  {
    id: 'decimals',
    title: 'Ondalık Gösterim',
    icon: 'MoreHorizontal',
    color: 'bg-green-500',
    subTopics: [
      {
        id: 'decimal-intro',
        title: 'Virgüllü Sayılar',
        description: 'Ondalık sayılarla tanışalım.',
        cards: [
          { id: 'c1', type: 'text', content: 'Bir sayıyı 10, 100 veya 1000 parçaya böldüğümüzde virgüllü (ondalık) gösterebiliriz. Örneğin 1/10 = 0,1.' }
        ],
        quiz: []
      }
    ]
  },
  {
    id: 'percentages',
    title: 'Yüzdeler',
    icon: 'Percent',
    color: 'bg-purple-500',
    subTopics: [
        {
            id: 'percent-intro',
            title: 'Yüzde Kavramı',
            description: 'Bir bütünü 100 eş parçaya bölmek.',
            cards: [{ id: 'c1', type: 'text', content: 'Paydası 100 olan kesirleri % sembolü ile gösteririz. 50/100 = %50 (Yüzde elli).' }],
            quiz: []
        }
    ]
  },
  {
    id: 'geometry',
    title: 'Geometri',
    icon: 'Triangle',
    color: 'bg-indigo-500',
    subTopics: [
        {
            id: 'basic-geo',
            title: 'Temel Kavramlar',
            description: 'Nokta, doğru, doğru parçası ve ışın.',
            cards: [{ id: 'c1', type: 'text', content: 'Nokta kalemin kağıda bıraktığı izdir. Büyük harfle isimlendirilir. Doğru ise iki ucu sonsuza giden çizgi modelidir.' }],
            quiz: []
        },
        {
            id: 'triangles',
            title: 'Üçgenler',
            description: 'Üçgen çeşitleri ve özellikleri.',
            cards: [{ id: 'c1', type: 'text', content: 'Üçgenin 3 kenarı ve 3 köşesi vardır. İç açıları toplamı her zaman 180 derecedir.' }],
            quiz: []
        }
    ]
  },
  {
    id: 'measurement',
    title: 'Ölçme',
    icon: 'Ruler',
    color: 'bg-teal-500',
    subTopics: [
        {
            id: 'length',
            title: 'Uzunluk Ölçme',
            description: 'Metre, santimetre ve dönüşümler.',
            cards: [{ id: 'c1', type: 'text', content: 'Temel uzunluk ölçü birimi metredir (m). 1 metre = 100 santimetredir (cm).' }],
            quiz: []
        },
        {
            id: 'time',
            title: 'Zaman Ölçme',
            description: 'Saat, dakika, saniye.',
            cards: [{ id: 'c1', type: 'text', content: '1 saat = 60 dakikadır. 1 dakika = 60 saniyedir.' }],
            quiz: []
        }
    ]
  },
  {
    id: 'data',
    title: 'Veri İşleme',
    icon: 'BarChart',
    color: 'bg-pink-500',
    subTopics: [
        {
            id: 'graphs',
            title: 'Sıklık Tablosu ve Grafikler',
            description: 'Verileri toplama ve yorumlama.',
            cards: [{ id: 'c1', type: 'text', content: 'Verileri düzenli görmek için sıklık tablosu veya sütun grafiği kullanırız.' }],
            quiz: []
        }
    ]
  }
];
