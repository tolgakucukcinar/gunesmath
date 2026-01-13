import { BookOpen, Calculator, PieChart, BarChart, Triangle, Ruler, Hash, MoreHorizontal, Sun, MapPin, Maximize, Minimize, Move, Circle, Square, MousePointer2 } from 'lucide-react';

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
  type: 'text' | 'image' | 'interactive' | 'example' | 'visual';
  content: string;
  imageUrl?: string;
  visualType?: string;
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
  // 1. TEMA: GEOMETRİK ŞEKİLLER
  {
    id: 'geometric-shapes',
    title: 'Geometrik Şekiller',
    icon: 'Triangle',
    color: 'bg-lego-red',
    subTopics: [
      {
        id: 'basic-concepts',
        title: 'Temel Kavramlar: Nokta, Doğru, Işın',
        description: 'Geometrinin alfabesini öğrenelim: Noktalar, sonsuz çizgiler ve ışınlar!',
        cards: [
          {
            id: 'c1',
            type: 'visual',
            visualType: 'point',
            content: '🎈 **Nokta ile Başlayalım!**\n\nNokta, geometrinin en küçük yapıtaşıdır. Kaleminin ucunu kağıda dokundurduğunda bıraktığın o minik iz var ya? İşte o bir noktadır! Boyutu, eni, boyu yoktur. Sadece **YER** belirtir.'
          },
          {
            id: 'c2',
            type: 'visual',
            visualType: 'line',
            content: '📏 **Doğru Nedir?**\n\nBir lastik düşün, ama bu lastik o kadar sihirli ki, iki ucundan da tutup sonsuza kadar uzatabiliyorsun! Hiç bitmiyor, hiç durmuyor. İşte buna **Doğru** diyoruz. İki ucu da özgürdür, sonsuza gider.'
          },
          {
            id: 'c3-visual',
            type: 'visual',
            visualType: 'segment',
            content: '✂️ **Doğru Parçası**\n\nBir doğrudan "makasla" bir parça kesersen ne olur? İki ucu da belli, sınırlı bir parça olur. Buna **Doğru Parçası** denir. Boyunu cetvelle ölçebilirsin.'
          },
          {
            id: 'c4',
            type: 'visual',
            visualType: 'ray',
            content: '☀️ **Işın: Güneş\'ten Sana Gelen Hediye**\n\nIşın, bir noktadan başlar ve diğer ucundan sonsuza kadar gider. Tıpkı Güneş ışınları veya lazer gibi! Başlangıcı belli, sonu yok.'
          },
          {
            id: 'c5',
            type: 'visual',
            visualType: 'parallel',
            content: '🛤️ **Paralel Doğrular**\n\nTren rayları gibi, sonsuza kadar yan yana giden ama asla birbirine değmeyen, küs doğrulara **Paralel Doğrular** denir.'
          }
        ],
        quiz: [
          { id: 'q1', question: 'Aşağıdakilerden hangisi bir "Işın" modelidir?', options: ['İki ucu açılmış kurşun kalem', 'Ucu açılmamış kurşun kalem', 'Lazer ışığı'], correctIndex: 2, explanation: 'Lazer bir kaynaktan çıkar ve sonsuza ilerler.' },
          { id: 'q2', question: 'İki ucu da sınırlı (kapalı) olan çizgi modeline ne denir?', options: ['Doğru', 'Işın', 'Doğru Parçası'], correctIndex: 2, explanation: 'İki ucu da kapalıysa bir parçadır yani Doğru Parçasıdır.' },
          { id: 'q3', question: 'Gökyüzündeki yıldızlar geometride neyi temsil eder?', options: ['Üçgen', 'Kare', 'Nokta'], correctIndex: 2, explanation: 'Boyutsuz yer belirteçleri olarak Nokta modelidir.' },
          { id: 'q4', question: '[KL] sembolü neyi ifade eder?', options: ['KL Doğrusu', 'KL Işını', 'KL Doğru Parçası'], correctIndex: 2, explanation: 'Köşeli parantezler her iki tarafın da kapalı/sınırlı olduğunu gösterir.' },
          { id: 'q5', question: 'Bir A noktasından kaç tane doğru geçebilir?', options: ['Sadece 1 tane', 'Sonsuz tane', 'Hiç geçmez'], correctIndex: 1, explanation: 'Bir noktadan her yöne giden sonsuz sayıda doğru çizebilirsin!' },
          { id: 'q6', question: 'Tren rayları (ufukta birleşiyormuş gibi görünse de) aslında neye örnektir?', options: ['Paralel Doğrular', 'Kesişen Doğrular', 'Dik Doğrular'], correctIndex: 0, explanation: 'Hiçbir zaman kesişmeyen doğrular Paralel doğrulardır.' }
        ]
      },
      {
        id: 'circle',
        title: 'Çember ve Daire',
        description: 'Yuvarlak şekillerin sırrı: Merkez, yarıçap ve çap.',
        cards: [
          {
            id: 'circle-1',
            type: 'visual',
            visualType: 'circle',
            content: '⭕ **Çember Nedir?**\n\nSabit bir noktaya (Merkez) eşit uzaklıktaki noktaların oluşturduğu, içi boş yuvarlak çizgiye **Çember** denir. Simit, yüzük, basketbol potası çemberi birer örnektir.'
          },
          {
            id: 'circle-2',
            type: 'visual',
            visualType: 'circle-radius',
            content: 'radius **Yarıçap (r)**\n\nMerkezden çemberin kenarına giden çizgiye yarıçap denir. Küçük "r" harfi ile gösterilir. Bu mesafe her yerde eşittir!'
          },
          {
            id: 'circle-3',
            type: 'visual',
            visualType: 'circle-diameter',
            content: '📏 **Çap (R)**\n\nMerkezden geçerek çemberin iki ucunu birleştiren en uzun çizgiye Çap denir. Çap, iki tane yarıçapa eşittir. (R = 2 x r)'
          },
          {
            id: 'circle-4',
            type: 'example',
            content: 'Çember mi Daire mi?',
            example: {
              id: 'ex-circle',
              problem: 'Bozuk para bir çember midir yoksa daire midir?',
              solution: 'Daire.',
              stepByStep: [
                'Çemberin sadece "çerçevesi" vardır, içi boştur.',
                'Dairenin ise içi doludur.',
                'Para, tabak gibi içi dolu nesneler Daire modelidir.'
              ]
            }
          }
        ],
        quiz: [
          { id: 'q-c1', question: 'Çemberin merkezi ile kenarı arasındaki mesafeye ne denir?', options: ['Çap', 'Kiriş', 'Yarıçap'], correctIndex: 2, explanation: 'Merkezden kenara giden çizgi Yarıçaptır.' },
          { id: 'q-c2', question: 'Bir çemberin yarıçapı 5 cm ise, çapı kaç cm\'dir?', options: ['5 cm', '10 cm', '2.5 cm'], correctIndex: 1, explanation: 'Çap, yarıçapın iki katıdır. 5 x 2 = 10.' },
          { id: 'q-c3', question: 'Aşağıdakilerden hangisi bir çember modelidir?', options: ['Madeni Para', 'Simit', 'Pizza'], correctIndex: 1, explanation: 'İçi boş olduğu için Simit en iyi çember örneğidir.' }
        ]
      },
      {
        id: 'angles',
        title: 'Açıları Ölçme ve Çizme',
        description: 'Dik, Dar, Geniş... Açıların dünyasına yolculuk.',
        cards: [
          {
            id: 'c1',
            type: 'text',
            content: '📐 **Açı Nedir?**\n\nİki ışının başlangıç noktalarında birleşmesiyle oluşan açıklığa **Açı** denir. Bir makasın ağzını açtığını düşün. Makasın kolları arasındaki açıklık bir açıdır! Kollar ne kadar açılırsa, açı o kadar büyür.'
          },
          {
            id: 'c2',
            type: 'visual',
            visualType: 'angle-right',
            content: '90 Derece bizim kahramanımızdır! **Dik Açı** diyoruz. Duvarın yerle birleştiği köşe, kitabının köşesi hep 90 derecedir. Dimdik durur!'
          },
          {
            id: 'c3',
            type: 'visual',
            visualType: 'angle-acute',
            content: '🔍 **Dar Açı**\n\n90 dereceden küçük, "sivri" uçlu, utangaç açılardır. "V" işareti buna güzel bir örnektir.'
          },
          {
            id: 'c4',
            type: 'visual',
            visualType: 'angle-obtuse',
            content: '🧘 **Geniş Açı**\n\n90 dereceden büyük, kolları "kocaman" açılmış, rahatına düşkün açılardır. Şezlongun arkaya yaslanmış hali gibidir.'
          }
        ],
        quiz: [
          { id: 'q1', question: 'Ölçüsü 90 derece olan açıya ne denir?', options: ['Dar Açı', 'Geniş Açı', 'Dik Açı'], correctIndex: 2, explanation: '90 derece kraldır, dik durur, Dik Açıdır!' },
          { id: 'q2', question: 'Aşağıdakilerden hangisi bir Geniş Açı ölçüsü olabilir?', options: ['45 derece', '89 derece', '120 derece'], correctIndex: 2, explanation: 'Geniş açı 90 dereceden büyük olmalıdır.' },
          { id: 'q3', question: 'Saat tam 6:00 olduğunda akrep ve yelkovan nasıl bir açı oluşturur?', options: ['Dik Açı', 'Doğru Açı (180°)', 'Dar Açı'], correctIndex: 1, explanation: 'Biri en tepede, biri en altta. Dümdüz bir çizgi olur. Buna Doğru Açı denir.' },
          { id: 'q4', question: 'Bir karenin kaç tane dik açısı vardır?', options: ['2', '3', '4'], correctIndex: 2, explanation: 'Karenin tüm köşeleri (4 adet) dik açıdır.' },
          { id: 'q5', question: 'Ölçüsü 1 derece ile 89 derece arasında olan açılara ne denir?', options: ['Dar Açı', 'Dik Açı', 'Geniş Açı'], correctIndex: 0, explanation: '90\'dan küçük oldukları için "Dar" alana sıkışmışlardır.' }
        ]
      },
      {
        id: 'polygons',
        title: 'Çokgenler Dünyası',
        description: 'Üçgenler, dörtgenler ve gizli özellikleri.',
        cards: [
          {
            id: 'c1',
            type: 'visual',
            visualType: 'triangle-equilateral',
            content: '🔷 **Çokgen Ne Demek?**\n\n"Çok" ve "Gen" (Kenar) kelimelerinin birleşimidir. Yani "Çok Kenarlı" demek. En az 3 kenarı olan, kapalı ve düz çizgilerden oluşan şekillerdir. Yuvarlak hatları sevmezler!'
          },
          {
            id: 'c2',
            type: 'text',
            content: 'Üçgenlerin Gizli Dünyası: Kenarlarına göre üçe ayrılırlar.\n\n1.  **Eşkenar Üçgen:** Herkes eşit! Tüm kenar uzunlukları aynı.\n2.  **İkizkenar Üçgen:** İki kenarı eşit, biri farklı. İkiz kardeşler gibi!\n3.  **Çeşitkenar Üçgen:** Her kafadan bir ses çıkıyor, tüm kenar uzunlukları farklı.'
          },
          {
            id: 'c3',
            type: 'example',
            content: 'Üçgen Dedektifliği',
            example: {
              id: 'ex1',
              problem: 'Kenar uzunlukları 5cm, 5cm ve 8cm olan bir üçgen hangi türdür?',
              solution: 'İkizkenar Üçgen',
              stepByStep: [
                'Kenarlara bakıyoruz: 5, 5, 8.',
                'İki tane 5 var, yani iki kenar eşit.',
                'İki kenar eşitse bu bir İkizkenar Üçgendir.'
              ]
            }
          }
        ],
        quiz: [
          { id: 'q1', question: 'En az kaç kenarı olan bir çokgen çizebiliriz?', options: ['2', '3', '4'], correctIndex: 1, explanation: '2 çubukla kapalı bir şekil yapamazsın, en az 3 çubuk (kenar) gerekir. O da Üçgendir.' },
          { id: 'q2', question: 'Tüm kenarları birbirine eşit olan üçgene ne denir?', options: ['Çeşitkenar', 'İkizkenar', 'Eşkenar'], correctIndex: 2, explanation: 'Adı üstünde, kenarları "Eş".' },
          { id: 'q3', question: 'Aşağıdakilerden hangisi bir çokgen DEĞİLDİR?', options: ['Üçgen', 'Kare', 'Daire'], correctIndex: 2, explanation: 'Dairenin kenarları düz çizgilerden oluşmaz, yuvarlaktır. Bu yüzden çokgen değildir.' },
          { id: 'q4', question: 'Bir dörtgenin kaç köşegeni vardır?', options: ['1', '2', '4'], correctIndex: 1, explanation: 'Karşılıklı köşeleri birleştiren çizgiler köşegendir. Dörtgende 2 tane çizebilirsin.' },
          { id: 'q5', question: 'İç açıları toplamı 180 derece olan şekil hangisidir?', options: ['Kare', 'Üçgen', 'Beşgen'], correctIndex: 1, explanation: 'Bu matematiksel bir kanundur: Tüm üçgenlerin iç açıları toplamı 180 derecedir.' },
          { id: 'q6', question: 'Aşağıdaki harflerden hangisi bir "Geniş Açı" modeline benzer?', options: ['L', 'V', 'K'], correctIndex: 2, explanation: 'K harfinin kolları (fontuna göre değişse de) genellikle geniştir.' }
        ]
      }
    ]
  },

  // 2. TEMA: DOĞAL SAYILAR VE İŞLEMLER
  {
    id: 'natural-numbers',
    title: 'Doğal Sayılar ve İşlemler',
    icon: 'Hash',
    color: 'bg-lego-blue',
    subTopics: [
      {
        id: 'millions',
        title: 'Milyonlar Dünyası',
        description: 'Çok basamaklı sayıları okuma ve yazma sanatını öğreniyoruz.',
        cards: [
          {
            id: 'c-n1',
            type: 'text',
            content: '🔢 **Sayıların Gücü Adına!**\n\nMilyon ne kadar büyük? 1 Milyon tane boncuğu yan yana dizersen kilometrelerce yol olur! Sayıları okurken onları "bölüklerine" ayırırız. Her 3 rakam bir ailedir.'
          },
          {
            id: 'c-n2',
            type: 'text',
            content: '🏘️ **Bölükler Şehri**\n\n*   **Birler Bölüğü:** En sağdaki üçlü (Birler, Onlar, Yüzler)\n*   **Binler Bölüğü:** Ortadaki üçlü (Binler, On Binler, Yüz Binler)\n*   **Milyonlar Bölüğü:** En soldaki krallık! (Milyonlar...)'
          },
          {
            id: 'c-n3',
            type: 'example',
            content: 'Sayı Okuma Pratiği',
            example: {
              id: 'ex-millions',
              problem: '12.045.603 sayısı nasıl okunur?',
              solution: 'On iki milyon kırk beş bin altı yüz üç',
              stepByStep: [
                '12 (Milyonlar Bölüğü): "On iki milyon"',
                '045 (Binler Bölüğü): Sıfırı okuma, "Kırk beş bin"',
                '603 (Birler Bölüğü): "Altı yüz üç"'
              ]
            }
          }
        ],
        quiz: [
          { id: 'q-n1', question: 'Milyonlar bölüğünde 5, binler bölüğünde 0 ve birler bölüğünde 12 olan sayı hangisidir?', options: ['5.000.012', '5.100.012', '5.012.000'], correctIndex: 0, explanation: 'Binler bölüğü bomboş (000), birler bölüğünde ise sadece 12 var.' },
          { id: 'q-n2', question: '7 basamaklı en küçük doğal sayı kaçtır?', options: ['1.000.000', '9.999.999', '1.000.001'], correctIndex: 0, explanation: '1\'in yanına 6 tane sıfır koyarsak 1 Milyon olur.' }
        ]
      },
      {
        id: 'operations',
        title: 'Zihinden İşlemler',
        description: 'Sayıları parçalayarak hızlıca toplama ve çıkarma.',
        cards: [
          { id: 'c-op1', type: 'text', content: '🧠 **Zihin Jimnastiği**\n\nSayıları kafamızda parçalayıp birleştirmek bir süper güçtür! 48 + 25 işlemini yaparken 48\'e önce 2 ekleyip 50 yap, sonra kalanı ekle.' }
        ],
        quiz: [
          { id: 'q-op1', question: '59 + 32 işlemini en kolay nasıl yaparsın?', options: ['59+1+31 (60+31)', '50+30+9+2', 'Hepsi'], correctIndex: 2, explanation: 'Matematikte doğru yola giden her yöntem kabuldür!' }
        ]
      }
    ]
  },

  // 3. TEMA: GEOMETRİK NİCELİKLER
  {
    id: 'geometric-measurements',
    title: 'Geometrik Nicelikler',
    icon: 'Ruler',
    color: 'bg-lego-green',
    subTopics: [
      {
        id: 'perimeter',
        title: 'Çevre Uzunluğu',
        description: 'Lego plakasının etrafında bir tur atalım!',
        cards: [
          {
            id: 'c-gm1',
            type: 'text',
            content: '🏃 **Çevre Nedir?**\n\nBir şeklin kenarlarının toplam uzunluğuna çevre denir. Düşün ki elinde sonsuz uzunlukta bir Lego şeridi var. Kare şeklindeki bir plakanın etrafını bu şeritle sarmak istiyorsun. Ne kadar şerit harcarsın? İşte bu **Çevre**dir!'
          },
          {
            id: 'c-gm2',
            type: 'example',
            content: 'Örnek: Lego Bahçesi',
            example: {
              id: 'ex-perim',
              problem: 'Kısa kenarı 5 birim, uzun kenarı 10 birim olan dikdörtgen şeklindeki bir Lego bahçesinin çevresi kaç birimdir?',
              solution: '30 birim',
              stepByStep: [
                'Dikdörtgenin karşılıklı kenarları eşittir.',
                '2 tane kısa kenar: 5 + 5 = 10 birim.',
                '2 tane uzun kenar: 10 + 10 = 20 birim.',
                'Toplam Çevre: 10 + 20 = 30 birim.'
              ]
            }
          }
        ],
        quiz: [
          { id: 'q-gm1', question: 'Bir kenarı 4 düğme (stud) olan kare şeklindeki bir Lego parçasının çevresi kaç düğmedir?', options: ['12', '16', '8'], correctIndex: 1, explanation: 'Karenin 4 kenarı da eşittir. 4 kenar x 4 düğme = 16 düğme.' }
        ]
      },
      {
        id: 'area',
        title: 'Alan Kaplama (Yüzey)',
        description: 'Lego plakasının üstünde kaç tane düğme var?',
        cards: [
          {
            id: 'c-gm3-vis',
            type: 'visual',
            visualType: 'grid-area',
            content: '🟩 **Alan Nedir?**\n\nÇevre sadece kenarlardı, Alan ise şeklin **İÇİDİR**. Bir Lego plakasının yüzeyini kaplamak için kaç tane 1x1\'lik minik kare parçaya ihtiyacın var? Veya plakanın üzerinde toplam kaç tane düğme (stud) var? İşte bu **ALAN** bilgisidir.'
          },
          {
            id: 'c-gm4',
            type: 'example',
            content: 'Alan Hesaplama',
            example: {
              id: 'ex-area',
              problem: 'Eni 4 birim, boyu 6 birim olan bir dikdörtgenin alanı nedir?',
              solution: '24 birim kare',
              stepByStep: [
                'Alanı bulmak için kenarları çarparız.',
                'Kısa Kenar x Uzun Kenar',
                '4 x 6 = 24.',
                'Demek ki bu şeklin içine 24 tane minik kare sığarmış!'
              ]
            }
          }
        ],
        quiz: [
          { id: 'q-gm2', question: 'Dikdörtgen şeklindeki bir havuzun alanını nasıl bulursun?', options: ['Kenarları toplarım', 'Kısa ve uzun kenarı çarparım', 'Sadece uzun kenarı ölçerim'], correctIndex: 1, explanation: 'Alan = Kısa Kenar x Uzun Kenar. Sanki satır ve sütunlardaki kareleri saymak gibi!' }
        ]
      }
    ]
  },

  // 4. TEMA: KESİRLER
  {
    id: 'fractions',
    title: 'Kesirler',
    icon: 'PieChart',
    color: 'bg-lego-yellow',
    subTopics: [
      {
        id: 'fraction-rep',
        title: 'Kesirleri Tanıyalım',
        description: 'Lego parçalarını bölüyoruz: Yarım, Çeyrek ve Bütün.',
        cards: [
          {
            id: 'c-fr1',
            type: 'visual',
            visualType: 'fraction-half',
            content: '🧱 **Bütün ve Yarım**\n\n8 düğmeli (stud) büyük bir Lego parçası düşün. Bu **BÜTÜN**dür. Eğer bunu tam ortadan ikiye ayırırsan, elinde 4 düğmeli iki parça olur. İşte her biri **YARIM**dır (1/2).'
          },
          {
            id: 'c-fr2',
            type: 'visual',
            visualType: 'fraction-quarter',
            content: '🧩 **Çeyrek (1/4)**\n\nO yarım parçayı da tekrar ikiye bölersen ne olur? 2 düğmeli minik parçalar elde edersin. Bütünün dörtte biri olduğu için buna **ÇEYREK** (1/4) denir.'
          },
          {
            id: 'c-fr3',
            type: 'text',
            content: '🤔 **Pay ve Payda Nedir?**\n\nKesir çizgisi bir apartman gibidir!\n\n*   **PAYDA (Alt Kat):** Bütünün KAÇ eşit parçaya bölündüğünü söyler. "Pastayı 8 dilime böldük."\n*   **PAY (Üst Kat):** O parçalardan KAÇ tanesini aldığımızı söyler. "Ben 3 dilim yedim."\n*   Sonuç: 3/8 (Sekizde üç).'
          },
          {
            id: 'c-fr4',
            type: 'text',
            content: '⚖️ **Basit ve Bileşik Kesir**\n\n*   **Basit Kesir:** Üstü küçük, altı büyük (3/5). Dengede durur, hafiftir.\n*   **Bileşik Kesir:** Üstü büyük veya eşit (7/5). Kafası büyüktür, bütünden fazladır!'
          }
        ],
        quiz: [
          { id: 'q-fr1', question: 'Paydası 4, Payı 3 olan kesir hangisidir?', options: ['4/3', '3/4', '34'], correctIndex: 1, explanation: 'Pay (3) üste, Payda (4) alta yazılır. Yani 3/4.' },
          { id: 'q-fr2', question: 'Bir bütünü 8 parçaya böldük ve 5 parçasını aldık. Bu kesir nedir?', options: ['5/8', '8/5', '1/8'], correctIndex: 0, explanation: 'Bölünen sayı (8) paydaya, alınan sayı (5) paya yazılır.' },
          { id: 'q-fr3', question: 'Aşağıdakilerden hangisi "Yarım"ı ifade eder?', options: ['1/4', '4/8', '1/3'], correctIndex: 1, explanation: '4 sayısı 8\'in tam yarısıdır! Sadeleştirirsek 1/2 olur.' }
        ]
      }
    ]
  },

  // 5. TEMA: İSTATİSTİKSEL ARAŞTIRMA
  {
    id: 'statistics',
    title: 'İstatistiksel Araştırma',
    icon: 'BarChart',
    color: 'bg-lego-red',
    subTopics: [
      {
        id: 'data-process',
        title: 'Veri Dedektifliği',
        description: 'Lego kuleleriyle grafik yapalım!',
        cards: [
          {
            id: 'c-st1',
            type: 'text',
            content: '📊 **Veri Toplama**\n\nBir dedektif gibi bilgi toplayacağız! Arkadaşlarına şu soruyu sorduğunu düşün: "En sevdiğin Lego rengi hangisi?" Kırmızı mı, Mavi mi, Sarı mı? İşte bu bir **Araştırma Sorusu**dur.'
          },
          {
            id: 'c-st2',
            type: 'visual',
            visualType: 'bar-chart',
            content: '📈 **Sütun Grafiği: Lego Kuleleri**\n\nTopladığımız cevapları nasıl göstereceğiz? Her cevap için üst üste bir Lego parçası koyduğumuzu hayal et. Kırmızıyı sevenler için Kırmızı Kule, maviyi sevenler için Mavi Kule... En yüksek kule (sütun), en çok sevilen renktir!'
          },
          {
            id: 'c-st3',
            type: 'example',
            content: 'Tablo Okuma',
            example: {
              id: 'ex-table',
              problem: 'Sınıfta 5 kişi Futbol, 3 kişi Basketbol, 8 kişi Voleybol seviyor. En popüler spor hangisi?',
              solution: 'Voleybol',
              stepByStep: [
                'Futbol Kulesi: 5 katlı',
                'Basketbol Kulesi: 3 katlı',
                'Voleybol Kulesi: 8 katlı',
                'En yüksek kule Voleybol olduğu için en popüler odur.'
              ]
            }
          }
        ],
        quiz: [
          { id: 'q-st1', question: 'Hangisi bir araştırma sorusu olabilir?', options: ['Senin adın ne?', 'Okulumuzdaki öğrencilerin en sevdiği ders hangisidir?', 'Bugün günlerden ne?'], correctIndex: 1, explanation: 'Araştırma sorusu birden çok kişiye sorulur ve farklı cevaplar alınır. Tek bir kişinin adı veya bugünün tarihi araştırma değildir.' },
          { id: 'q-st2', question: 'Sıklık tablosunda "çetele" tutmak ne demektir?', options: ['Resim çizmek', 'Her sayı için bir çizgi (/) çekmek', 'Sayıları silmek'], correctIndex: 1, explanation: 'Çetele tablosunda sayıları beşerli çizgiler halinde gruplarız.' }
        ]
      }
    ]
  },

  // 6. TEMA: CEBİRSEL DÜŞÜNME
  {
    id: 'algebraic-thinking',
    title: 'Cebirsel Düşünme',
    icon: 'Calculator',
    color: 'bg-indigo-500',
    subTopics: [
      {
        id: 'patterns',
        title: 'Sihirli Örüntüler',
        description: 'Kırmızı, Mavi, Kırmızı, Mavi... Sırada ne var?',
        cards: [
          {
            id: 'c-alg1',
            type: 'text',
            content: '🔄 **Örüntü Nedir?**\n\nBelli bir kurala göre dizilmiş şekil veya sayılara **Örüntü** denir. Tıpkı bir Lego duvarı örerken renkleri sırayla dizmek gibi: Kırmızı, Sarı, Kırmızı, Sarı... Kuralı bulursan sıradaki parçayı bilirsin!'
          },
          {
            id: 'c-alg2',
            type: 'example',
            content: 'Sayı Örüntüsü',
            example: {
              id: 'ex-pattern',
              problem: '4, 8, 12, 16, ? ... Soru işareti yerine hangi sayı gelmeli?',
              solution: '20',
              stepByStep: [
                'Önce artış miktarına bakalım.',
                '4\'ten 8\'e -> +4 artmış.',
                '8\'den 12\'ye -> +4 artmış.',
                'Kural: Dörder dörder saymak (+4).',
                '16 + 4 = 20.'
              ]
            }
          }
        ],
        quiz: [
          { id: 'q-alg1', question: '10, 20, 30, 40... örüntüsünün kuralı nedir?', options: ['5 artar', '10 artar', '2 katına çıkar'], correctIndex: 1, explanation: 'Her adımda sayıya 10 ekleniyor.' },
          { id: 'q-alg2', question: 'Bir örüntüde "terim" ne demektir?', options: ['Örüntüdeki her bir sayı veya şekil', 'Örüntünün sonu', 'Örüntünün kuralı'], correctIndex: 0, explanation: 'Örüntüyü oluşturan her elemana (sayıya) terim denir.' }
        ]
      }
    ]
  },

  // 7. TEMA: OLASILIK
  {
    id: 'probability',
    title: 'Veriden Olasılığa',
    icon: 'MoreHorizontal',
    color: 'bg-teal-400',
    subTopics: [
      {
        id: 'chance',
        title: 'Şans Mı Kesin Mi?',
        description: 'Lego kutusundan hangi renk çıkacak?',
        cards: [
          {
            id: 'c-pr1',
            type: 'visual',
            visualType: 'probability-spinner',
            content: '🎲 **Şans ve Olasılık**\n\nGözlerin kapalıyken elini bir Lego kutusuna daldırdın. Kutuda 100 tane Mavi parça, 1 tane Kırmızı parça var. Eline hangisinin gelme şansı daha yüksektir? Tabii ki Mavi! Buna **Olasılık** diyoruz.'
          },
          {
            id: 'c-pr2',
            type: 'text',
            content: 'Olasılık Dili:\n\n*   **İmkansız Olay:** Bir Lego kutusundan canlı bir fil çıkması (%0).\n*   **Kesin Olay:** Havaya attığın Lego parçasının yere düşmesi (%100).\n*   **Eşit Olasılık:** Yazı-Tura atarken ikisinin de şansı eşittir (%50-%50).'
          }
        ],
        quiz: [
          { id: 'q-pr1', question: 'İçinde sadece SARI toplar olan bir kutudan MAVİ top çekme olasılığı nedir?', options: ['Kesin', 'Olası', 'İmkansız'], correctIndex: 2, explanation: 'Kutuda mavi yok ki! Bu imkansız bir olaydır.' },
          { id: 'q-pr2', question: 'Bugün hava güneşli. Yarın yağmur yağma olasılığı nedir?', options: ['İmkansız', 'Olası', 'Kesin'], correctIndex: 1, explanation: 'Hava durumu değişebilir, yağabilir de yağmayabilir de. Bu "Olası" bir durumdur.' }
        ]
      }
    ]
  }
];

export const IconMap: any = {
  Triangle,
  Hash,
  Ruler,
  PieChart,
  BarChart,
  Calculator,
  MoreHorizontal,
  BookOpen,
  Sun,
  MapPin,
  Maximize,
  Minimize,
  Move,
  Circle,
  Square,
  MousePointer2
};
