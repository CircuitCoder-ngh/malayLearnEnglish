// Grammar lessons for Malay speakers learning English. Explanations are in Malay; examples are English with a Malay translation.
// Text markup, usable in every string except the example pairs: *word* = an ENGLISH word or phrase (highlighted, and spoken by an
// English voice when tapped; never wrap Malay in single asterisks), **text** = bold emphasis, for either language.
// English quiz options are all marked, right and wrong alike. In running text, incorrect English is shown in plain "quotes" instead,
// so that only correct English is highlighted and spoken.
// Each section, rendered in this order: { h: heading, p: [paragraphs], table: { head, rows }, ex: [[english, malay], ...] (plain text, no markup; the English is spoken), after: [paragraphs], tip }
// Quiz item: { q, opts, a: index of the right option, why }

export const LESSONS = [
  {
    id: 'sounds',
    title: 'Bunyi dan ejaan',
    blurb: 'Dalam bahasa Inggeris, ejaan dan sebutan tidak selalu sepadan. Kenali bunyi yang paling kerap menyukarkan penutur bahasa Melayu.',
    sections: [
      {
        h: 'Ejaan bukan panduan sebutan',
        p: [
          'Bahasa Melayu dieja seperti yang disebut: setiap huruf hampir selalu mempunyai satu bunyi sahaja. Bahasa Inggeris tidak begitu. Huruf yang sama boleh berbunyi berlainan, dan bunyi yang sama boleh dieja dengan pelbagai cara.',
        ],
        ex: [
          ['food, good, blood', 'makanan, baik, darah (tiga bunyi "oo" yang berbeza)'],
          ['meet, meat', 'berjumpa, daging (ejaan berbeza, bunyi sama)'],
          ['though, through, enough', 'walaupun, melalui, cukup (tiga bunyi "ough" yang berbeza)'],
        ],
        after: [
          'Oleh itu, jangan teka sebutan daripada ejaan. Tekan butang pembesar suara pada setiap perkataan baharu, dengar, dan ajuk bunyinya.',
        ],
      },
      {
        h: 'Bunyi "th", "v" dan "w"',
        p: [
          'Bunyi "th" tiada dalam bahasa Melayu, jadi kita cenderung menggantikannya dengan "t" atau "d". Bunyi "v" dan "w" pula sering tertukar.',
        ],
        table: {
          head: ['Bunyi', 'Cara menyebut', 'Contoh'],
          rows: [
            ['th (tidak bersuara)', 'Letakkan hujung lidah di antara gigi dan hembus angin. Bukan "t".', '*think*, *three*, *thank*'],
            ['th (bersuara)', 'Kedudukan lidah yang sama, tetapi dengan suara. Bukan "d".', '*this*, *that*, *mother*'],
            ['v', 'Gigi atas menyentuh bibir bawah, dengan suara.', '*very*, *van*, *seven*'],
            ['w', 'Bibir dibundarkan; gigi tidak menyentuh bibir.', '*we*, *want*, *water*'],
          ],
        },
        ex: [
          ['three, tree', 'tiga, pokok'],
          ['they, day', 'mereka, hari'],
          ['vest, west', 'baju ves, barat'],
          ['vet, wet', 'doktor haiwan, basah'],
        ],
      },
      {
        h: 'Konsonan di hujung perkataan',
        p: [
          'Perkataan Melayu jarang berakhir dengan dua atau tiga konsonan berturut-turut, jadi kita mudah "menelan" bunyi terakhir. Dalam bahasa Inggeris, bunyi akhir itu membawa makna: -s menandakan jamak atau kala kini, dan -ed menandakan kala lampau.',
        ],
        ex: [
          ['cat, cats', 'seekor kucing, beberapa ekor kucing'],
          ['I work. He works.', 'Saya bekerja. Dia bekerja.'],
          ['walk, walked', 'berjalan, telah berjalan'],
          ['desk, test, hand, milk', 'meja tulis, ujian, tangan, susu'],
          ['back, bag', 'belakang, beg'],
        ],
        after: [
          'Sebut setiap konsonan akhir dengan jelas: *test* bukan "tes", *hand* bukan "hen", dan *walked* berakhir dengan bunyi "kt".',
          'Huruf k di hujung perkataan dilepaskan dengan jelas, bukan disekat di kerongkong seperti "k" dalam "tidak". Huruf b, d dan g di hujung pula disebut bersuara, jadi *bag* tidak sama dengan *back*.',
        ],
      },
      {
        h: 'Vokal panjang dan pendek',
        p: [
          'Bahasa Melayu tidak membezakan vokal panjang dan vokal pendek. Dalam bahasa Inggeris, perbezaan ini mengubah makna.',
        ],
        table: {
          head: ['Vokal pendek', 'Vokal panjang'],
          rows: [
            ['*ship* (kapal)', '*sheep* (biri-biri)'],
            ['*sit* (duduk)', '*seat* (tempat duduk)'],
            ['*it* (ia)', '*eat* (makan)'],
            ['*live* (tinggal)', '*leave* (bertolak, meninggalkan)'],
            ['*full* (penuh)', '*fool* (orang bodoh)'],
          ],
        },
        after: [
          'Untuk vokal panjang, tarik bunyi itu lebih lama: *sheep* seperti "shiip", *fool* seperti "fuul".',
        ],
      },
      {
        h: 'Huruf senyap',
        p: ['Sesetengah huruf ditulis tetapi tidak disebut langsung.'],
        table: {
          head: ['Huruf senyap', 'Contoh'],
          rows: [
            ['k sebelum n', '*know*, *knife*, *knee*'],
            ['w sebelum r', '*write*, *wrong*'],
            ['h', '*hour*, *honest*'],
            ['b selepas m', '*climb*, *comb*, *thumb*'],
            ['l', '*talk*, *walk*, *half*, *could*'],
            ['gh', '*night*, *right*, *daughter*'],
            ['t', '*listen*, *castle*'],
          ],
        },
      },
      {
        h: 'Tekanan suku kata',
        p: [
          'Dalam bahasa Melayu, semua suku kata disebut hampir sama rata. Dalam bahasa Inggeris, satu suku kata dalam setiap perkataan disebut lebih kuat dan lebih panjang. Suku kata yang lain menjadi lemah, sering kali seperti bunyi e pepet dalam "emak".',
        ],
        table: {
          head: ['Perkataan', 'Sebutan (huruf "e" di sini ialah e pepet)'],
          rows: [
            ['*banana*', 'be-**NA**-ne'],
            ['*computer*', 'kem-**PIU**-te'],
            ['*doctor*', '**DOK**-te'],
            ['*about*', 'e-**BAUT**'],
            ['*hotel*', 'hou-**TEL**'],
            ['*tomorrow*', 'te-**MO**-rou'],
            ['*important*', 'im-**PO**-tent'],
          ],
        },
        tip: 'Tekanan yang salah lebih menyukarkan pendengar daripada bunyi yang kurang tepat. Setiap kali belajar perkataan baharu, dengar dan perhatikan suku kata mana yang kuat.',
      },
    ],
    quiz: [
      { q: 'Dalam perkataan manakah huruf "k" tidak disebut?', opts: ['*keep*', '*knife*', '*like*', '*book*'], a: 1, why: 'Huruf k sebelum n senyap: *knife* disebut "naif".' },
      { q: 'Bagaimanakah menyebut "th" dalam *think*?', opts: ['Seperti "t" dalam "tiga"', 'Seperti "d" dalam "dua"', 'Hujung lidah di antara gigi sambil menghembus angin', 'Seperti "s" dalam "satu"'], a: 2, why: 'Bunyi "th" dibuat dengan hujung lidah di antara gigi, bukan dengan "t", "d" atau "s".' },
      { q: 'Perkataan manakah bermaksud "biri-biri" dan disebut dengan vokal panjang?', opts: ['*ship*', '*chip*', '*shop*', '*sheep*'], a: 3, why: '*sheep* mempunyai vokal panjang ("shiip"); *ship* dengan vokal pendek bermaksud kapal.' },
      { q: 'Apakah beza sebutan *walk* dan *walked*?', opts: ['*walked* berakhir dengan bunyi "t" tambahan: "wokt"', 'Tiada beza: "-ed" senyap', '*walked* mempunyai satu suku kata tambahan: "wok-ked"', '*walked* disebut dengan vokal yang lebih panjang'], a: 0, why: 'Akhiran -ed mesti disebut; selepas "k" bunyinya ialah "t", tanpa suku kata tambahan.' },
      { q: 'Suku kata manakah yang ditekankan dalam *banana*?', opts: ['Yang pertama: BA-na-na', 'Yang kedua: ba-NA-na', 'Yang ketiga: ba-na-NA', 'Semuanya sama rata'], a: 1, why: 'Tekanan jatuh pada suku kata kedua, dan dua suku kata yang lain menjadi lemah.' },
    ],
  },
  {
    id: 'be',
    title: 'Ayat asas dan *am / is / are*',
    blurb: 'Susunan ayat sama seperti bahasa Melayu, tetapi bahasa Inggeris memerlukan kata kerja *be* di tempat yang bahasa Melayu biarkan kosong.',
    sections: [
      {
        h: 'Susunan yang sama: subjek, kata kerja, objek',
        p: ['Berita baik dahulu: susunan ayat asas bahasa Inggeris sama dengan bahasa Melayu, iaitu subjek, kata kerja, objek.'],
        ex: [
          ['I eat rice.', 'Saya makan nasi.'],
          ['She likes coffee.', 'Dia suka kopi.'],
          ['They learn English.', 'Mereka belajar bahasa Inggeris.'],
        ],
      },
      {
        h: 'Kata kerja *be*: *am*, *is*, *are*',
        p: [
          'Dalam bahasa Melayu, kita boleh berkata "Saya guru" atau "Dia penat" tanpa sebarang kata kerja. Dalam bahasa Inggeris, setiap ayat mesti ada kata kerja. Jika tiada kata kerja lain, gunakan kata kerja *be*, yang berubah mengikut subjek.',
        ],
        table: {
          head: ['Subjek', 'Bentuk *be*', 'Contoh'],
          rows: [
            ['*I*', '*am*', '*I am a teacher.*'],
            ['*he*, *she*, *it*, atau satu orang / benda', '*is*', '*She is tired.*'],
            ['*you*, *we*, *they*, atau lebih daripada satu', '*are*', '*They are at home.*'],
          ],
        },
        ex: [
          ['I am a teacher.', 'Saya guru.'],
          ['He is tired.', 'Dia penat.'],
          ['That house is big.', 'Rumah itu besar.'],
          ['We are in the office.', 'Kami di pejabat.'],
          ['My parents are from Johor.', 'Ibu bapa saya dari Johor.'],
        ],
        after: [
          'Anggap *am*, *is* dan *are* seperti "ialah" atau "adalah", tetapi **wajib**. Ayat seperti "She tired" atau "I teacher" tidak betul.',
          'Perkataan kecil *a* dalam *a teacher* diterangkan dalam pelajaran seterusnya.',
        ],
        tip: 'Sebaliknya, jangan tambah *be* jika ayat sudah ada kata kerja lain: *I work here*, bukan "I am work here".',
      },
      {
        h: 'Penafian dan soalan',
        p: ['Untuk menafikan, letakkan *not* selepas *be*. Untuk bertanya, pindahkan *be* ke hadapan subjek.'],
        ex: [
          ['I am not hungry.', 'Saya tidak lapar.'],
          ['He is not a doctor.', 'Dia bukan doktor.'],
          ['Are you ready?', 'Awak sudah sedia?'],
          ['Is this your bag?', 'Ini beg awak?'],
          ['Where are they?', 'Di mana mereka?'],
        ],
        after: [
          'Perhatikan bahawa "tidak" dan "bukan" kedua-duanya menjadi *not*.',
          "Dalam pertuturan, bentuk ini biasanya dipendekkan: *I'm*, *she's*, *they're*, *isn't*, *aren't*. Lihat pelajaran terakhir.",
        ],
      },
      {
        h: '"Ada" = *there is* / *there are*',
        p: [
          'Untuk menyatakan sesuatu wujud di sesuatu tempat, bahasa Melayu menggunakan "ada". Bahasa Inggeris menggunakan *there is* (untuk satu benda, atau benda yang tidak boleh dikira) dan *there are* (untuk lebih daripada satu).',
        ],
        ex: [
          ['There is a cat under the table.', 'Ada seekor kucing di bawah meja.'],
          ['There are three shops near my house.', 'Ada tiga buah kedai berhampiran rumah saya.'],
          ['Is there a toilet here?', 'Ada tandas di sini?'],
          ['There is no milk in the fridge.', 'Tiada susu di dalam peti sejuk.'],
        ],
        after: [
          '"Ada" yang bermaksud "mempunyai" ialah *have* atau *has*, bukan *there is*: *I have a car* (Saya ada kereta), *She has two children* (Dia ada dua orang anak).',
        ],
      },
    ],
    quiz: [
      { q: 'Pilih ayat yang betul untuk "Dia penat."', opts: ['*She tired.*', '*She are tired.*', '*She is tired.*', '*She am tired.*'], a: 2, why: 'Ayat mesti ada kata kerja, dan untuk *she* bentuknya ialah *is*.' },
      { q: 'Lengkapkan: We ___ students.', opts: ['*are*', '*is*', '*am*', '*be*'], a: 0, why: '*we*, *you* dan *they* mengambil *are*.' },
      { q: 'Bagaimanakah mengatakan "Ada dua buah kereta di luar"?', opts: ['*There is two cars outside.*', '*Have two cars outside.*', '*They are two cars outside.*', '*There are two cars outside.*'], a: 3, why: 'Untuk "ada" dengan lebih daripada satu benda, gunakan *there are*.' },
      { q: 'Pilih soalan yang betul.', opts: ['*Is hungry you?*', '*Are you hungry?*', '*You hungry are?*', '*Do you are hungry?*'], a: 1, why: 'Dalam soalan, *be* berpindah ke hadapan subjek: *Are you ...?*' },
      { q: 'Ayat manakah yang **salah**?', opts: ['*I am a nurse.*', '*He is at home.*', '*I am work in a bank.*', '*They are not here.*'], a: 2, why: 'Jika sudah ada kata kerja biasa (*work*), jangan tambah *am*: *I work in a bank.*' },
    ],
  },
  {
    id: 'articles',
    title: '*a*, *an*, *the*',
    blurb: 'Bahasa Melayu tiada perkataan seperti *a* dan *the*. Pelajari bila kata nama memerlukan *a*, *an*, *the*, atau tiada apa-apa.',
    sections: [
      {
        h: 'Mengapa perlu?',
        p: [
          'Dalam bahasa Melayu, "Saya beli buku" sudah lengkap. Dalam bahasa Inggeris, kata nama tunggal yang boleh dikira hampir tidak boleh berdiri sendiri: mesti ada *a*, *an*, *the*, atau perkataan seperti *my* dan *this* di hadapannya.',
          'Perkataan kecil *a*, *an* dan *the* dipanggil **articles**. Ayat "I bought book" tidak betul; mesti *I bought a book* atau *I bought the book*.',
        ],
      },
      {
        h: '*a / an*: satu, belum ditentukan',
        p: [
          'Gunakan *a* atau *an* apabila menyebut satu benda buat kali pertama, atau satu benda yang mana-mana pun. Maksudnya hampir sama dengan "se-" dalam "sebuah", "seorang" dan "seekor".',
        ],
        ex: [
          ['I have a car.', 'Saya ada sebuah kereta.'],
          ['She is a doctor.', 'Dia seorang doktor.'],
          ['I need a pen.', 'Saya perlukan sebatang pen.'],
          ['He ate an apple.', 'Dia makan sebiji epal.'],
        ],
        after: ['Pekerjaan sentiasa memerlukan *a* atau *an*: *My father is a driver*, bukan "My father is driver".'],
      },
      {
        h: '*a* atau *an*? Ikut bunyi, bukan huruf',
        p: ['Gunakan *an* sebelum **bunyi** vokal dan *a* sebelum bunyi konsonan. Yang penting ialah bunyi pertama perkataan itu, bukan ejaannya.'],
        table: {
          head: ['', 'Contoh', 'Sebab'],
          rows: [
            ['*a*', '*a book*, *a car*, *a house*', 'bermula dengan bunyi konsonan'],
            ['*an*', '*an egg*, *an orange*, *an umbrella*', 'bermula dengan bunyi vokal'],
            ['*an*', '*an hour*, *an honest man*', 'huruf h senyap, jadi bunyi pertama ialah vokal'],
            ['*a*', '*a university*, *a uniform*', 'bermula dengan bunyi "yu", iaitu bunyi konsonan'],
          ],
        },
      },
      {
        h: '*the*: yang itu, yang kita berdua tahu',
        p: [
          'Gunakan *the* apabila pendengar tahu benda mana yang dimaksudkan: sudah disebut tadi, hanya ada satu, atau jelas daripada keadaan. Ia sering sepadan dengan "itu" atau "tersebut".',
          '*The* boleh digunakan dengan kata nama tunggal, jamak, dan yang tidak boleh dikira.',
        ],
        ex: [
          ['I bought a shirt. The shirt is blue.', 'Saya beli sehelai baju. Baju itu berwarna biru.'],
          ['Please close the door.', 'Tolong tutup pintu.'],
          ['The sun is hot today.', 'Matahari panas hari ini.'],
          ['Where are the keys?', 'Di mana kunci itu?'],
        ],
      },
      {
        h: 'Tanpa *a* atau *the*',
        p: ['Jangan guna apa-apa apabila bercakap **secara umum** tentang kata nama jamak atau kata nama yang tidak boleh dikira, dan sebelum kebanyakan nama khas.'],
        ex: [
          ['I like cats.', 'Saya suka kucing. (kucing secara umum)'],
          ['Water is important.', 'Air itu penting.'],
          ['She lives in Penang.', 'Dia tinggal di Pulau Pinang.'],
          ['We have dinner at eight.', 'Kami makan malam pada pukul lapan.'],
          ['He goes to school by bus.', 'Dia pergi ke sekolah dengan bas.'],
        ],
        after: ['Bandingkan: *I like cats* (semua kucing) tetapi *I like the cats next door* (kucing jiran sebelah, iaitu kucing yang tertentu).'],
        tip: 'Tanya diri sendiri: "Adakah pendengar tahu yang mana satu?" Jika ya, gunakan *the*. Jika tidak, dan bendanya satu sahaja, gunakan *a* atau *an*.',
      },
    ],
    quiz: [
      { q: 'Yang manakah betul?', opts: ['*a egg*', '*an book*', '*an hour*', '*a orange*'], a: 2, why: 'Huruf h dalam *hour* senyap, jadi perkataan itu bermula dengan bunyi vokal dan mengambil *an*.' },
      { q: 'Pilih ayat yang betul untuk "Ayah saya seorang pemandu."', opts: ['*My father is driver.*', '*My father is a driver.*', '*My father is an driver.*', '*My father a driver.*'], a: 1, why: 'Pekerjaan memerlukan *a* atau *an*, dan *driver* bermula dengan bunyi konsonan.' },
      { q: 'Lengkapkan: I saw a dog and a cat. ___ dog was black.', opts: ['*The*', '*A*', '*An*', '(tiada apa-apa)'], a: 0, why: 'Anjing itu sudah disebut tadi, jadi pendengar tahu yang mana satu: *the*.' },
      { q: 'Ayat manakah betul apabila bercakap tentang kucing secara umum?', opts: ['*I like the cat.*', '*I like a cats.*', '*I like cat.*', '*I like cats.*'], a: 3, why: 'Untuk makna umum, gunakan kata nama jamak tanpa *a* atau *the*.' },
      { q: 'Mengapakah kita berkata *a university*, bukan "an university"?', opts: ['Kerana perkataan itu panjang', 'Kerana ia bermula dengan bunyi "yu", iaitu bunyi konsonan', 'Kerana "u" bukan huruf vokal', 'Kerana ia kata nama khas'], a: 1, why: 'Pilihan antara *a* dan *an* bergantung pada bunyi pertama, bukan huruf pertama.' },
    ],
  },
  {
    id: 'plurals',
    title: 'Jamak dan kata nama boleh dikira',
    blurb: 'Bahasa Inggeris menanda jamak dengan -s, bukan dengan mengulang perkataan. Ada juga kata nama yang tidak boleh dikira langsung.',
    sections: [
      {
        h: 'Tambah -s, jangan ulang',
        p: [
          'Dalam bahasa Melayu, perkataan "buku" tidak berubah dalam "dua buah buku", dan jamak boleh ditunjukkan dengan kata ganda: "buku-buku". Dalam bahasa Inggeris, kata nama **mesti** bertukar kepada bentuk jamak (**plural**) apabila bilangannya lebih daripada satu, walaupun sudah ada nombor di hadapannya.',
          'Tiada kata ganda, dan tiada penjodoh bilangan seperti "buah", "orang" atau "ekor".',
        ],
        ex: [
          ['one book, two books', 'sebuah buku, dua buah buku'],
          ['books', 'buku-buku'],
          ['three cats', 'tiga ekor kucing'],
          ['many students', 'ramai pelajar'],
          ['My friends are here.', 'Kawan-kawan saya ada di sini.'],
        ],
      },
      {
        h: 'Ejaan -s dan -es',
        table: {
          head: ['Hujung perkataan', 'Peraturan', 'Contoh'],
          rows: [
            ['kebanyakan kata nama', 'tambah -s', '*car → cars*, *house → houses*'],
            ['-s, -ss, -sh, -ch, -x', 'tambah -es', '*bus → buses*, *box → boxes*, *watch → watches*'],
            ['konsonan + y', 'y menjadi -ies', '*baby → babies*, *city → cities*'],
            ['vokal + y', 'tambah -s sahaja', '*day → days*, *boy → boys*'],
            ['-f atau -fe', 'sering menjadi -ves', '*knife → knives*, *leaf → leaves*'],
            ['-o (sesetengah perkataan)', 'tambah -es', '*potato → potatoes*, *tomato → tomatoes*'],
          ],
        },
        after: ['Ingat untuk menyebut bunyi akhir itu: *books* berakhir dengan bunyi "s", *cars* dengan bunyi "z", dan *buses* serta *boxes* mendapat satu suku kata tambahan ("iz").'],
      },
      {
        h: 'Jamak tidak sekata',
        p: ['Beberapa kata nama yang sangat biasa tidak mengambil -s. Bentuk ini perlu dihafal.'],
        table: {
          head: ['Tunggal', 'Jamak', 'Maksud'],
          rows: [
            ['*man*', '*men*', 'lelaki'],
            ['*woman*', '*women*', 'wanita'],
            ['*child*', '*children*', 'kanak-kanak, anak'],
            ['*person*', '*people*', 'orang'],
            ['*foot*', '*feet*', 'kaki'],
            ['*tooth*', '*teeth*', 'gigi'],
            ['*mouse*', '*mice*', 'tikus'],
            ['*fish*', '*fish*', 'ikan'],
            ['*sheep*', '*sheep*', 'biri-biri'],
          ],
        },
      },
      {
        h: 'Boleh dikira dan tidak boleh dikira',
        p: [
          'Sesetengah kata nama dianggap sebagai bahan atau jumlah, bukan benda yang boleh dikira satu demi satu. Kata nama ini (**uncountable nouns**) tiada bentuk jamak dan tidak boleh mengambil *a*, *an* atau nombor.',
          'Yang biasa: *water*, *rice*, *bread*, *sugar*, *money*, *time*, *information*, *advice*, *furniture*, *homework*, *news*.',
        ],
        ex: [
          ['I need some information.', 'Saya perlukan sedikit maklumat.'],
          ['She gave me good advice.', 'Dia memberi saya nasihat yang baik.'],
          ['We bought new furniture.', 'Kami membeli perabot baharu.'],
          ['a glass of water', 'segelas air'],
          ['two plates of rice', 'dua pinggan nasi'],
        ],
        after: [
          'Untuk mengira, gunakan bekas atau unit, sama seperti "segelas" atau "sepinggan": *a cup of tea*, *a piece of paper*, *two bottles of water*.',
          'Jangan sebut "informations", "advices", "furnitures" atau "a money".',
        ],
      },
      {
        h: '*much / many*, *a little / a few*',
        p: ['Bahasa Melayu menggunakan "banyak" dan "sedikit" untuk semua kata nama. Bahasa Inggeris memilih perkataan mengikut jenis kata nama.'],
        table: {
          head: ['Maksud', 'Boleh dikira (jamak)', 'Tidak boleh dikira'],
          rows: [
            ['banyak', '*many books*', '*much water*'],
            ['banyak (untuk kedua-duanya)', '*a lot of books*', '*a lot of water*'],
            ['beberapa / sedikit', '*a few friends*', '*a little money*'],
            ['sedikit, sebilangan', '*some eggs*', '*some sugar*'],
            ['berapa?', '*How many people?*', '*How much rice?*'],
          ],
        },
        ex: [
          ['How many children do you have?', 'Awak ada berapa orang anak?'],
          ['How much is this?', 'Berapa harga ini?'],
          ["I don't have much time.", 'Saya tidak ada banyak masa.'],
          ['There are a few shops here.', 'Ada beberapa buah kedai di sini.'],
        ],
        tip: 'Jika ragu-ragu, *a lot of* selamat untuk kedua-dua jenis: *a lot of people*, *a lot of money*.',
      },
    ],
    quiz: [
      { q: 'Bagaimanakah mengatakan "tiga buah kotak"?', opts: ['*three box*', '*three boxs*', '*three boxes*', '*three box-box*'], a: 2, why: 'Kata nama mesti jamak selepas nombor, dan selepas -x kita tambah -es.' },
      { q: 'Apakah bentuk jamak *child*?', opts: ['*childs*', '*children*', '*childrens*', '*childes*'], a: 1, why: '*child* ialah kata nama tidak sekata: jamaknya *children*.' },
      { q: 'Pilih ayat yang betul.', opts: ['*She gave me some advice.*', '*She gave me an advice.*', '*She gave me many advices.*', '*She gave me two advices.*'], a: 0, why: '*advice* tidak boleh dikira, jadi tiada *an*, tiada nombor dan tiada -s.' },
      { q: 'Lengkapkan: How ___ money do you have?', opts: ['*many*', '*few*', '*a lot*', '*much*'], a: 3, why: '*money* tidak boleh dikira, jadi soalannya *How much*.' },
      { q: 'Lengkapkan: I have ___ friends in Ipoh.', opts: ['*a little*', '*a few*', '*much*', '*a*'], a: 1, why: '*friends* boleh dikira dan jamak, jadi "beberapa" ialah *a few*.' },
    ],
  },
  {
    id: 'pronouns',
    title: 'Kata ganti nama',
    blurb: 'Satu "dia" menjadi *he*, *she* atau *it*, dan setiap kata ganti nama berubah bentuk mengikut tugasnya dalam ayat.',
    sections: [
      {
        h: '"Dia" ada tiga: *he*, *she*, *it*',
        p: ['Bahasa Melayu menggunakan "dia" untuk lelaki dan perempuan, dan "ia" untuk benda. Bahasa Inggeris membezakan ketiga-tiganya dengan ketat.'],
        table: {
          head: ['Bahasa Inggeris', 'Digunakan untuk', 'Contoh'],
          rows: [
            ['*he*', 'seorang lelaki', '*He is my brother.*'],
            ['*she*', 'seorang perempuan', '*She is my sister.*'],
            ['*it*', 'benda, haiwan, perkara', '*It is a new phone.*'],
            ['*they*', 'lebih daripada satu, orang atau benda', '*They are my friends.*'],
          ],
        },
        ex: [
          ['This is Ali. He is my friend.', 'Ini Ali. Dia kawan saya.'],
          ['This is Aminah. She is a nurse.', 'Ini Aminah. Dia jururawat.'],
          ['I like this bag. It is cheap.', 'Saya suka beg ini. Ia murah.'],
          ['It is raining.', 'Hujan sedang turun.'],
          ["It is three o'clock.", 'Sekarang pukul tiga.'],
        ],
        after: ['Ayat bahasa Inggeris mesti ada subjek. Untuk cuaca, masa dan jarak, gunakan *it* walaupun bahasa Melayu tidak memerlukan apa-apa: *It is hot today* (Panas hari ini).'],
      },
      {
        h: 'Empat bentuk bagi setiap kata ganti nama',
        p: [
          'Dalam bahasa Melayu, "saya" kekal "saya" di mana-mana: "Saya nampak dia", "Dia nampak saya", "buku saya". Dalam bahasa Inggeris, kata ganti nama (**pronoun**) berubah bentuk mengikut tugasnya: sebagai subjek, sebagai objek, atau sebagai pemilik.',
        ],
        table: {
          head: ['Bahasa Melayu', 'Subjek', 'Objek', 'Milik + kata nama', 'Milik (berdiri sendiri)'],
          rows: [
            ['saya, aku', '*I*', '*me*', '*my*', '*mine*'],
            ['awak, kamu, anda', '*you*', '*you*', '*your*', '*yours*'],
            ['dia (lelaki)', '*he*', '*him*', '*his*', '*his*'],
            ['dia (perempuan)', '*she*', '*her*', '*her*', '*hers*'],
            ['ia', '*it*', '*it*', '*its*', '–'],
            ['kita, kami', '*we*', '*us*', '*our*', '*ours*'],
            ['mereka', '*they*', '*them*', '*their*', '*theirs*'],
          ],
        },
        ex: [
          ['I know him.', 'Saya kenal dia.'],
          ['He knows me.', 'Dia kenal saya.'],
          ['She called us yesterday.', 'Dia menelefon kami semalam.'],
          ['Give it to them.', 'Berikan kepada mereka.'],
          ['Can you help me?', 'Boleh awak tolong saya?'],
        ],
      },
      {
        h: 'Pemilik datang dahulu',
        p: [
          'Dalam bahasa Melayu, pemilik datang selepas kata nama: "buku saya". Dalam bahasa Inggeris, *my*, *your*, *his* dan yang lain datang **sebelum** kata nama. Bentuk *mine*, *yours* dan *hers* pula berdiri sendiri tanpa kata nama.',
        ],
        ex: [
          ['my book', 'buku saya'],
          ['her mother', 'ibu dia'],
          ['our house', 'rumah kami / rumah kita'],
          ['This book is mine.', 'Buku ini saya punya.'],
          ['Is this pen yours?', 'Pen ini awak punya?'],
          ["Ali's car", 'kereta Ali'],
        ],
        after: ["Untuk nama orang, tambah 's pada pemilik, dan pemilik tetap datang dahulu: *Ali's car* (kereta Ali), *my mother's phone* (telefon ibu saya)."],
      },
      {
        h: '*we* dan *you*: lebih mudah daripada bahasa Melayu',
        p: [
          '"Kita" (termasuk pendengar) dan "kami" (tidak termasuk pendengar) kedua-duanya *we*.',
          '*You* digunakan untuk semua orang: awak, kamu, anda, encik, puan, cikgu, sama ada seorang atau ramai. Tiada bentuk hormat yang berasingan; kesopanan ditunjukkan dengan perkataan seperti *please*, *sir* atau *madam*.',
        ],
        ex: [
          ['We are going to the market. Do you want to come?', 'Kami hendak ke pasar. Awak mahu ikut?'],
          ["We are late. Let's go!", 'Kita sudah lewat. Jom pergi!'],
          ['How are you, sir?', 'Encik apa khabar?'],
          ['Are you all ready?', 'Kamu semua sudah sedia?'],
        ],
        tip: '*I* sentiasa ditulis dengan huruf besar, walaupun di tengah ayat.',
      },
    ],
    quiz: [
      { q: 'Lengkapkan: This is Puan Siti. ___ is my teacher.', opts: ['*He*', '*It*', '*Her*', '*She*'], a: 3, why: 'Untuk seorang perempuan sebagai subjek, gunakan *she*.' },
      { q: 'Lengkapkan: Ali called ___ last night. (saya)', opts: ['*me*', '*I*', '*my*', '*mine*'], a: 0, why: 'Selepas kata kerja, "saya" ialah objek: *me*.' },
      { q: 'Bagaimanakah mengatakan "rumah mereka"?', opts: ['*house they*', '*them house*', '*their house*', '*house theirs*'], a: 2, why: 'Bentuk milik *their* datang sebelum kata nama.' },
      { q: 'Lengkapkan: That bag is not yours. It is ___.', opts: ['*my*', '*mine*', '*me*', '*I*'], a: 1, why: 'Tanpa kata nama selepasnya, gunakan bentuk yang berdiri sendiri: *mine*.' },
      { q: '"Kami" dan "kita" dalam bahasa Inggeris ialah:', opts: ['*we* dan *they*', '*our* dan *us*', '*we* untuk kedua-duanya', '*us* dan *we*'], a: 2, why: 'Bahasa Inggeris tidak membezakan "kami" dan "kita"; kedua-duanya *we*.' },
    ],
  },
  {
    id: 'present-simple',
    title: 'Present simple',
    blurb: 'Kala kini untuk tabiat dan fakta. Jangan lupa -s untuk *he*, *she* dan *it*, serta *do / does* dalam soalan dan penafian.',
    sections: [
      {
        h: 'Untuk tabiat dan fakta',
        p: [
          'Gunakan **present simple** (kala kini) untuk perkara yang berlaku selalu, berulang-ulang, atau sentiasa benar. Seperti dalam bahasa Melayu, kata kerja hampir tidak berubah, kecuali satu perkara di bawah.',
        ],
        ex: [
          ['I work in a bank.', 'Saya bekerja di bank.'],
          ['We live in Kuala Lumpur.', 'Kami tinggal di Kuala Lumpur.'],
          ['They play football every Saturday.', 'Mereka bermain bola sepak setiap hari Sabtu.'],
          ['The sun rises in the east.', 'Matahari terbit di timur.'],
        ],
      },
      {
        h: '*he / she / it*: tambah -s',
        p: [
          'Apabila subjeknya *he*, *she*, *it*, atau satu orang atau benda (*my mother*, *Ali*, *the shop*), kata kerja mendapat **-s**. Inilah kesilapan yang paling biasa, kerana bahasa Melayu tiada perkara seumpamanya.',
        ],
        table: {
          head: ['Peraturan', 'Contoh'],
          rows: [
            ['kebanyakan kata kerja: tambah -s', '*work → works*, *live → lives*, *eat → eats*'],
            ['selepas -s, -sh, -ch, -x, -o: tambah -es', '*watch → watches*, *wash → washes*, *go → goes*, *do → does*'],
            ['konsonan + y: y menjadi -ies', '*study → studies*, *try → tries*'],
            ['tidak sekata', '*have → has*'],
          ],
        },
        ex: [
          ['He works in a hospital.', 'Dia bekerja di hospital.'],
          ['She goes to school by bus.', 'Dia pergi ke sekolah dengan bas.'],
          ['My mother cooks every day.', 'Ibu saya memasak setiap hari.'],
          ['The shop opens at nine.', 'Kedai itu dibuka pada pukul sembilan.'],
          ['Ali has two sisters.', 'Ali ada dua orang adik-beradik perempuan.'],
        ],
      },
      {
        h: "Penafian: *don't / doesn't*",
        p: [
          "Untuk \"tidak\", jangan letak *not* terus pada kata kerja. Gunakan kata kerja bantu *do*: *do not* (*don't*) atau, untuk *he / she / it*, *does not* (*doesn't*). Selepas itu, kata kerja kembali kepada bentuk asas, **tanpa -s**.",
        ],
        ex: [
          ["I don't eat meat.", 'Saya tidak makan daging.'],
          ["She doesn't like coffee.", 'Dia tidak suka kopi.'],
          ["We don't work on Sundays.", 'Kami tidak bekerja pada hari Ahad.'],
          ["He doesn't have a car.", 'Dia tidak ada kereta.'],
        ],
        after: [`Akhiran -s sudah "berpindah" ke *does*, jadi jangan ulang: *She doesn't like*, bukan "She doesn't likes".`],
      },
      {
        h: 'Soalan: *Do ...?* *Does ...?*',
        p: ['Untuk bertanya, letakkan *do* atau *does* di hadapan subjek. Kata kerja utama kekal dalam bentuk asas.'],
        ex: [
          ['Do you speak English?', 'Awak boleh bercakap bahasa Inggeris?'],
          ['Does he live here?', 'Adakah dia tinggal di sini?'],
          ['Where do you work?', 'Awak bekerja di mana?'],
          ['What does she do?', 'Apakah pekerjaan dia?'],
          ["Do you like durian? Yes, I do.", 'Awak suka durian? Ya, suka.'],
        ],
      },
      {
        h: 'Berapa kerap?',
        p: ['Kata keterangan kekerapan (**adverbs of frequency**) biasanya diletakkan **sebelum** kata kerja utama, tetapi **selepas** *am*, *is* dan *are*.'],
        table: {
          head: ['Bahasa Inggeris', 'Maksud'],
          rows: [
            ['*always*', 'selalu, sentiasa'],
            ['*usually*', 'biasanya'],
            ['*often*', 'kerap'],
            ['*sometimes*', 'kadang-kadang'],
            ['*rarely*', 'jarang'],
            ['*never*', 'tidak pernah'],
          ],
        },
        ex: [
          ['I always drink tea in the morning.', 'Saya selalu minum teh pada waktu pagi.'],
          ['He never eats breakfast.', 'Dia tidak pernah bersarapan.'],
          ['We sometimes go to the beach.', 'Kami kadang-kadang pergi ke pantai.'],
          ['She is often late.', 'Dia kerap lewat.'],
        ],
      },
    ],
    quiz: [
      { q: 'Lengkapkan: My brother ___ in Penang.', opts: ['*live*', '*lives*', '*living*', '*is live*'], a: 1, why: '*my brother* sama seperti *he*, jadi kata kerja mendapat -s.' },
      { q: 'Lengkapkan: She ___ like fish.', opts: ["*don't*", "*isn't*", "*doesn't*", '*not*'], a: 2, why: "Penafian untuk *he / she / it* ialah *doesn't* + bentuk asas." },
      { q: 'Pilih soalan yang betul.', opts: ['*Does he works here?*', '*Do he work here?*', '*He does work here?*', '*Does he work here?*'], a: 3, why: '*Does* di hadapan subjek, dan kata kerja utama tanpa -s.' },
      { q: 'Pilih ayat yang betul.', opts: ['*I always get up at six.*', '*I get always up at six.*', '*Always I am get up at six.*', '*I get up at always six.*'], a: 0, why: 'Kata keterangan kekerapan diletakkan sebelum kata kerja utama.' },
      { q: 'Apakah bentuk *he / she / it* bagi *study*?', opts: ['*studys*', '*studyes*', '*studies*', '*studis*'], a: 2, why: 'Selepas konsonan, y bertukar menjadi -ies.' },
    ],
  },
  {
    id: 'present-continuous',
    title: 'Present continuous',
    blurb: 'Untuk "sedang": *am / is / are* + kata kerja berakhiran -ing.',
    sections: [
      {
        h: '"Sedang" = *be* + -ing',
        p: [
          'Untuk perbuatan yang sedang berlaku sekarang, bahasa Melayu menambah "sedang" atau "tengah". Bahasa Inggeris menggunakan **present continuous**: *am*, *is* atau *are* + kata kerja + **-ing**. Kedua-dua bahagian wajib ada.',
        ],
        table: {
          head: ['Subjek', '*be*', 'Kata kerja + -ing'],
          rows: [
            ['*I*', '*am*', '*working*'],
            ['*he*, *she*, *it*', '*is*', '*working*'],
            ['*you*, *we*, *they*', '*are*', '*working*'],
          ],
        },
        ex: [
          ['I am reading a book.', 'Saya sedang membaca buku.'],
          ['She is cooking dinner.', 'Dia sedang memasak makan malam.'],
          ['They are waiting for the bus.', 'Mereka sedang menunggu bas.'],
          ['It is raining now.', 'Sekarang sedang hujan.'],
        ],
        after: ['Dua kesilapan biasa: tertinggal *be* ("She cooking") atau tertinggal -ing ("She is cook"). Yang betul hanya *She is cooking*.'],
      },
      {
        h: 'Ejaan -ing',
        table: {
          head: ['Kata kerja', 'Peraturan', 'Contoh'],
          rows: [
            ['kebanyakan', 'tambah -ing', '*eat → eating*, *read → reading*, *cook → cooking*'],
            ['berakhir dengan -e', 'buang e, tambah -ing', '*write → writing*, *make → making*, *come → coming*'],
            ['satu suku kata, berakhir dengan satu vokal + satu konsonan', 'gandakan konsonan akhir', '*sit → sitting*, *run → running*, *swim → swimming*'],
            ['berakhir dengan -ie', 'ie menjadi y', '*lie → lying*, *die → dying*'],
          ],
        },
      },
      {
        h: 'Soalan dan penafian',
        p: ['Kerana sudah ada *be*, tidak perlu *do*. Untuk penafian, tambah *not* selepas *be*; untuk soalan, pindahkan *be* ke hadapan subjek.'],
        ex: [
          ["He isn't working today.", 'Dia tidak bekerja hari ini.'],
          ["I'm not sleeping.", 'Saya bukan sedang tidur.'],
          ['Are you listening?', 'Awak sedang dengar?'],
          ['What are you doing?', 'Awak sedang buat apa?'],
          ['Where is she going?', 'Dia hendak ke mana?'],
        ],
      },
      {
        h: 'Present simple atau present continuous?',
        p: ['Present simple untuk kebiasaan; present continuous untuk apa yang berlaku sekarang atau buat sementara waktu.'],
        table: {
          head: ['Present simple (selalu)', 'Present continuous (sekarang)'],
          rows: [
            ['*I drink coffee every morning.*', '*I am drinking coffee now.*'],
            ['*She works in a bank.*', '*She is working from home this week.*'],
            ['*He wears glasses.*', '*He is wearing a red shirt today.*'],
          ],
        },
        after: [
          'Kata kunci present simple: *every day*, *always*, *usually*. Kata kunci present continuous: *now*, *right now*, *at the moment*, *today*, *this week*.',
        ],
        tip: 'Beberapa kata kerja tentang perasaan dan fikiran jarang mengambil -ing, walaupun maksudnya "sekarang": *I know*, *I want*, *I like*, *I understand*, *I need*. Katakan *I want a drink*, bukan "I am wanting a drink".',
      },
    ],
    quiz: [
      { q: 'Bagaimanakah mengatakan "Dia sedang tidur"?', opts: ['*He sleeping.*', '*He is sleep.*', '*He is sleeping.*', '*He does sleeping.*'], a: 2, why: 'Present continuous memerlukan kedua-duanya: *is* dan -ing.' },
      { q: 'Apakah bentuk -ing bagi *write*?', opts: ['*writing*', '*writeing*', '*writting*', '*writen*'], a: 0, why: 'Huruf e di hujung dibuang sebelum -ing, dan t tidak digandakan.' },
      { q: 'Apakah bentuk -ing bagi *run*?', opts: ['*runing*', '*runeing*', '*runs*', '*running*'], a: 3, why: 'Satu suku kata dengan satu vokal + satu konsonan: konsonan akhir digandakan.' },
      { q: 'Lengkapkan: Listen! Someone ___ at the door.', opts: ['*knock*', '*is knocking*', '*knocks*', '*are knocking*'], a: 1, why: 'Perbuatan itu sedang berlaku sekarang, dan *someone* mengambil *is*.' },
      { q: 'Ayat manakah menyatakan satu tabiat, bukan perbuatan yang sedang berlaku?', opts: ['*I am drinking tea.*', '*She is reading now.*', '*I drink tea every morning.*', '*They are playing outside.*'], a: 2, why: 'Present simple dengan *every morning* menunjukkan kebiasaan.' },
    ],
  },
  {
    id: 'past-simple',
    title: 'Past simple',
    blurb: 'Bahasa Melayu menambah "sudah", "tadi" atau "semalam". Bahasa Inggeris mengubah kata kerja itu sendiri.',
    sections: [
      {
        h: 'Kata kerja mesti berubah',
        p: [
          'Dalam bahasa Melayu, "Saya makan" boleh bermaksud sekarang atau semalam; perkataan seperti "tadi", "semalam" atau "sudah" yang menjelaskan masanya. Dalam bahasa Inggeris, untuk perkara yang sudah selesai pada masa lalu, kata kerja mesti bertukar kepada **past simple** (kala lampau), walaupun ayat itu sudah ada *yesterday*.',
        ],
        ex: [
          ['I worked yesterday.', 'Saya bekerja semalam.'],
          ['She called me this morning.', 'Dia menelefon saya pagi tadi.'],
          ['We watched a film last night.', 'Kami menonton filem malam tadi.'],
          ['They lived in Melaka in 2010.', 'Mereka tinggal di Melaka pada tahun 2010.'],
          ['I was tired. We were at home.', 'Saya penat tadi. Kami berada di rumah.'],
        ],
        after: [
          'Berita baik: bentuknya sama untuk semua subjek (*I worked*, *she worked*, *they worked*). Hanya *be* ada dua bentuk: *was* (untuk *I*, *he*, *she*, *it*) dan *were* (untuk *you*, *we*, *they*).',
        ],
      },
      {
        h: 'Kata kerja sekata: tambah -ed',
        table: {
          head: ['Kata kerja', 'Peraturan', 'Contoh'],
          rows: [
            ['kebanyakan', 'tambah -ed', '*work → worked*, *play → played*'],
            ['berakhir dengan -e', 'tambah -d', '*live → lived*, *like → liked*'],
            ['konsonan + y', 'y menjadi -ied', '*study → studied*, *try → tried*'],
            ['satu suku kata, berakhir dengan satu vokal + satu konsonan', 'gandakan konsonan akhir', '*stop → stopped*, *plan → planned*'],
          ],
        },
      },
      {
        h: 'Tiga sebutan -ed',
        p: ['Akhiran -ed jarang disebut "ed". Sebutannya bergantung pada bunyi sebelumnya.'],
        table: {
          head: ['Sebutan', 'Bila', 'Contoh'],
          rows: [
            ['"t"', 'selepas bunyi tidak bersuara: p, k, f, s, sh, ch', '*worked*, *stopped*, *watched*, *washed*'],
            ['"d"', 'selepas bunyi bersuara dan vokal', '*played*, *lived*, *called*, *opened*'],
            ['"id" (suku kata tambahan)', 'hanya selepas bunyi t atau d', '*wanted*, *needed*, *started*, *decided*'],
          ],
        },
        tip: 'Jangan tambah suku kata jika tidak perlu: *worked* hanya satu suku kata dan berakhir dengan bunyi "kt", bukan "wor-ked".',
      },
      {
        h: 'Kata kerja tidak sekata',
        p: ['Kata kerja yang paling kerap digunakan mempunyai bentuk lampau tersendiri. Hafal sedikit demi sedikit; yang berikut paling penting.'],
        table: {
          head: ['Bentuk asas', 'Lampau', 'Maksud'],
          rows: [
            ['*be*', '*was*, *were*', 'ialah, berada'],
            ['*have*', '*had*', 'ada, mempunyai'],
            ['*do*', '*did*', 'buat'],
            ['*go*', '*went*', 'pergi'],
            ['*come*', '*came*', 'datang'],
            ['*get*', '*got*', 'dapat'],
            ['*make*', '*made*', 'membuat'],
            ['*say*', '*said*', 'berkata'],
            ['*tell*', '*told*', 'memberitahu'],
            ['*see*', '*saw*', 'nampak, melihat'],
            ['*take*', '*took*', 'ambil'],
            ['*give*', '*gave*', 'beri'],
            ['*know*', '*knew*', 'tahu, kenal'],
            ['*think*', '*thought*', 'fikir'],
            ['*eat*', '*ate*', 'makan'],
            ['*drink*', '*drank*', 'minum'],
            ['*buy*', '*bought*', 'beli'],
            ['*find*', '*found*', 'jumpa, menemui'],
            ['*leave*', '*left*', 'bertolak, meninggalkan'],
            ['*put*', '*put*', 'letak'],
          ],
        },
      },
      {
        h: 'Soalan dan penafian: *did* + bentuk asas',
        p: [
          "Sama seperti *do* dan *does*, kala lampau menggunakan *did* untuk soalan dan *did not* (*didn't*) untuk penafian. Kerana *did* sudah menunjukkan masa lampau, kata kerja utama kembali kepada **bentuk asas**.",
        ],
        ex: [
          ["I didn't go to work yesterday.", 'Saya tidak pergi kerja semalam.'],
          ["He didn't call me.", 'Dia tidak menelefon saya.'],
          ['Did you eat?', 'Awak sudah makan?'],
          ['Where did she go?', 'Dia pergi ke mana?'],
          ['What did you buy?', 'Awak beli apa?'],
          ["Was it expensive? No, it wasn't.", 'Mahalkah? Tidak.'],
        ],
        after: [`Bukan "I didn't went" atau "Did you ate?". Dengan *was* dan *were* pula, jangan guna *did*: *Were you at home?*`],
      },
    ],
    quiz: [
      { q: 'Lengkapkan: Yesterday I ___ to the market.', opts: ['*go*', '*goed*', '*went*', '*gone*'], a: 2, why: 'Bentuk lampau *go* ialah *went*; *gone* ialah past participle.' },
      { q: 'Pilih ayat yang betul.', opts: ["*She didn't came.*", "*She didn't come.*", '*She not came.*', "*She doesn't came.*"], a: 1, why: "Selepas *didn't*, kata kerja dalam bentuk asas." },
      { q: 'Bagaimanakah -ed disebut dalam *wanted*?', opts: ['"t"', '"d"', 'senyap', '"id", sebagai suku kata tambahan'], a: 3, why: 'Selepas bunyi t atau d, -ed disebut "id".' },
      { q: 'Apakah bentuk lampau *buy*?', opts: ['*bought*', '*buyed*', '*brought*', '*buied*'], a: 0, why: '*buy* tidak sekata: *bought*. (*brought* ialah bentuk lampau *bring*, membawa.)' },
      { q: 'Pilih soalan yang betul.', opts: ['*Did you saw him?*', '*You did see him?*', '*Did you see him?*', '*Do you saw him?*'], a: 2, why: '*Did* + subjek + bentuk asas.' },
    ],
  },
  {
    id: 'future',
    title: 'Masa depan',
    blurb: '"Akan" boleh menjadi *will*, *be going to*, atau present continuous. Pilihannya bergantung pada sama ada perkara itu sudah dirancang.',
    sections: [
      {
        h: '*will* + bentuk asas',
        p: [
          '*Will* paling hampir dengan "akan". Bentuknya sama untuk semua subjek, dan kata kerja selepasnya sentiasa dalam bentuk asas. Gunakannya untuk keputusan yang dibuat pada saat bercakap, janji, tawaran dan ramalan.',
        ],
        ex: [
          ["I'll help you.", 'Saya akan tolong awak.'],
          ["Wait, I'll open the door.", 'Tunggu, saya bukakan pintu.'],
          ["I'll call you tonight.", 'Saya akan telefon awak malam ini.'],
          ['I think it will rain tomorrow.', 'Saya rasa esok akan hujan.'],
          ['She will be twenty next year.', 'Dia akan berumur dua puluh tahun pada tahun depan.'],
        ],
        after: ["Dalam pertuturan, *will* hampir selalu dipendekkan: *I'll*, *you'll*, *she'll*, *we'll*, *they'll*."],
      },
      {
        h: '*be going to*: sudah berniat',
        p: [
          'Gunakan *am*, *is* atau *are* + *going to* + bentuk asas untuk rancangan yang sudah diputuskan sebelum bercakap, serupa dengan "hendak" atau "nak". Bentuk ini juga digunakan untuk ramalan berdasarkan apa yang kita nampak sekarang.',
        ],
        ex: [
          ["I'm going to buy a new phone.", 'Saya hendak beli telefon baharu.'],
          ['She is going to study in Australia.', 'Dia akan belajar di Australia.'],
          ['We are going to visit my grandmother this weekend.', 'Kami akan melawat nenek saya hujung minggu ini.'],
          ["Look at those clouds. It's going to rain.", 'Tengok awan itu. Hari hendak hujan.'],
        ],
      },
      {
        h: 'Present continuous untuk temu janji',
        p: ['Untuk perkara yang sudah diatur dengan masa atau tempat yang tetap, seperti temu janji atau perjalanan yang tiketnya sudah dibeli, penutur bahasa Inggeris sering menggunakan present continuous bersama perkataan masa.'],
        ex: [
          ["I'm meeting Sara at three.", 'Saya akan berjumpa Sara pada pukul tiga.'],
          ['We are flying to Kuching on Friday.', 'Kami akan terbang ke Kuching pada hari Jumaat.'],
          ["He's starting a new job next week.", 'Dia akan mula kerja baharu minggu depan.'],
          ['What are you doing tonight?', 'Awak buat apa malam ini?'],
        ],
      },
      {
        h: 'Penafian dan soalan',
        p: ["Bentuk nafi *will* ialah *will not*, hampir selalu dipendekkan kepada *won't*. Untuk soalan, pindahkan *will* (atau *am*, *is*, *are*) ke hadapan subjek."],
        ex: [
          ["I won't be late.", 'Saya tidak akan lewat.'],
          ["She won't come tomorrow.", 'Dia tidak akan datang esok.'],
          ['Will you be at home tonight?', 'Awak ada di rumah malam ini?'],
          ["I'm not going to tell him.", 'Saya tidak akan beritahu dia.'],
          ['Are you going to cook?', 'Awak hendak masak?'],
        ],
      },
      {
        h: 'Ringkasan',
        table: {
          head: ['Bentuk', 'Bila digunakan', 'Contoh'],
          rows: [
            ['*will*', 'keputusan spontan, janji, tawaran, ramalan', "*I'll carry that for you.*"],
            ['*be going to*', 'niat atau rancangan yang sudah dibuat', "*I'm going to learn to drive.*"],
            ['present continuous', 'temu janji yang sudah diatur', "*I'm seeing the dentist at ten.*"],
          ],
        },
        tip: 'Selepas *when*, *if*, *before* dan *after*, gunakan kala kini walaupun maksudnya masa depan: *I will call you when I arrive*, bukan "when I will arrive".',
      },
    ],
    quiz: [
      { q: 'Lengkapkan: She will ___ tomorrow.', opts: ['*comes*', '*come*', '*coming*', '*to come*'], a: 1, why: 'Selepas *will*, kata kerja sentiasa dalam bentuk asas.' },
      { q: 'Apakah bentuk pendek *will not*?', opts: ["*won't*", "*willn't*", "*wan't*", "*don't*"], a: 0, why: "*will not* dipendekkan menjadi *won't*." },
      { q: 'Telefon berbunyi dan awak membuat keputusan pada saat itu juga. Apakah yang awak katakan?', opts: ["*I'm answer it.*", '*I going to answer it.*', "*I'll answer it.*", '*I answering it.*'], a: 2, why: 'Untuk keputusan yang dibuat pada saat bercakap, gunakan *will*.' },
      { q: 'Lengkapkan: Look at the sky! It ___ rain.', opts: ['*is going to*', '*going to*', '*will to*', '*is going*'], a: 0, why: 'Ramalan berdasarkan apa yang kita nampak: *is going to* + bentuk asas.' },
      { q: 'Pilih ayat yang betul.', opts: ['*I will call you when I will arrive.*', '*I will to call you when I arrive.*', '*I call you when I will arrive.*', '*I will call you when I arrive.*'], a: 3, why: 'Selepas *when*, gunakan kala kini walaupun maksudnya masa depan.' },
    ],
  },
  {
    id: 'present-perfect',
    title: 'Present perfect',
    blurb: '*have / has* + past participle untuk "sudah", "pernah" dan "belum": masa lalu yang masih berkait dengan sekarang.',
    sections: [
      {
        h: 'Bentuk: *have / has* + past participle',
        p: [
          '**Present perfect** dibina daripada *have* (atau *has* untuk *he / she / it*) + **past participle**, iaitu bentuk ketiga kata kerja. Bagi kata kerja sekata, bentuk ini sama dengan bentuk lampau (-ed). Bagi kata kerja tidak sekata, ia perlu dihafal.',
        ],
        table: {
          head: ['Bentuk asas', 'Lampau', 'Past participle'],
          rows: [
            ['*work*', '*worked*', '*worked*'],
            ['*be*', '*was*, *were*', '*been*'],
            ['*do*', '*did*', '*done*'],
            ['*go*', '*went*', '*gone*'],
            ['*come*', '*came*', '*come*'],
            ['*see*', '*saw*', '*seen*'],
            ['*eat*', '*ate*', '*eaten*'],
            ['*take*', '*took*', '*taken*'],
            ['*give*', '*gave*', '*given*'],
            ['*write*', '*wrote*', '*written*'],
            ['*buy*', '*bought*', '*bought*'],
            ['*have*', '*had*', '*had*'],
          ],
        },
        ex: [
          ['I have finished my work.', 'Saya sudah siapkan kerja saya.'],
          ['She has lost her keys.', 'Dia telah kehilangan kuncinya.'],
          ["We haven't eaten.", 'Kami belum makan.'],
          ['Have you seen this film?', 'Awak pernah tonton filem ini?'],
        ],
      },
      {
        h: '"Sudah", "pernah", "belum"',
        p: [
          'Present perfect menghubungkan masa lalu dengan sekarang. Kita tidak menyebut **bila** perkara itu berlaku; yang penting ialah kesannya sekarang, atau pengalaman itu sendiri.',
        ],
        table: {
          head: ['Bahasa Melayu', 'Bahasa Inggeris', 'Kedudukan'],
          rows: [
            ['sudah', '*already*', 'antara *have* dan past participle'],
            ['baru sahaja', '*just*', 'antara *have* dan past participle'],
            ['pernah (dalam soalan)', '*ever*', 'sebelum past participle'],
            ['tidak pernah', '*never*', 'antara *have* dan past participle'],
            ['belum', '*not* ... *yet*', '*yet* di hujung ayat'],
          ],
        },
        ex: [
          ['I have already eaten.', 'Saya sudah makan.'],
          ['He has just arrived.', 'Dia baru sahaja sampai.'],
          ['Have you ever been to Sabah?', 'Awak pernah ke Sabah?'],
          ['I have never seen snow.', 'Saya tidak pernah melihat salji.'],
          ["The bus hasn't come yet.", 'Bas belum sampai lagi.'],
        ],
        after: ['*She has been to Japan* bermaksud dia pernah ke Jepun dan sudah pulang. *She has gone to Japan* bermaksud dia sudah pergi dan masih di sana.'],
      },
      {
        h: '*since* dan *for*: dari dahulu hingga sekarang',
        p: [
          'Untuk keadaan yang bermula pada masa lalu dan **masih berterusan**, bahasa Melayu menggunakan "sudah" atau "sejak" tanpa mengubah kata kerja. Bahasa Inggeris menggunakan present perfect, bukan kala kini.',
          '*Since* diikuti titik permulaan; *for* diikuti tempoh.',
        ],
        ex: [
          ['I have lived here since 2015.', 'Saya tinggal di sini sejak 2015.'],
          ['She has worked here for three years.', 'Dia sudah tiga tahun bekerja di sini.'],
          ['We have known each other for a long time.', 'Kami sudah lama kenal.'],
          ['How long have you been here?', 'Sudah berapa lama awak di sini?'],
        ],
        after: ['Jangan kata "I live here since 2015".'],
      },
      {
        h: 'Present perfect atau past simple?',
        p: [
          'Jika masa yang sudah berlalu disebut atau jelas (*yesterday*, *last week*, *in 2019*, *two days ago*), gunakan **past simple**. Jika masanya tidak disebut dan yang penting ialah keadaan sekarang, gunakan present perfect.',
        ],
        table: {
          head: ['Present perfect (masa tidak disebut)', 'Past simple (masa sudah berlalu)'],
          rows: [
            ['*I have seen that film.*', '*I saw that film last week.*'],
            ['*She has been to Japan.*', '*She went to Japan in 2019.*'],
            ['*Have you eaten?*', '*What did you eat last night?*'],
            ['*I have lost my phone.*', '*I lost my phone yesterday.*'],
          ],
        },
        tip: 'Peraturan mudah: jika ada perkataan yang menjawab "bila?" tentang masa yang sudah berlalu, jangan guna *have*. Katakan *I saw him yesterday*, bukan "I have seen him yesterday".',
      },
    ],
    quiz: [
      { q: 'Lengkapkan: She ___ finished her homework.', opts: ['*have*', '*has*', '*is*', '*did*'], a: 1, why: 'Untuk *he / she / it*, gunakan *has* + past participle.' },
      { q: 'Apakah past participle bagi *eat*?', opts: ['*ate*', '*eated*', '*eaten*', '*eating*'], a: 2, why: '*eat*, *ate*, *eaten*: bentuk ketiga ialah *eaten*.' },
      { q: 'Pilih ayat yang betul.', opts: ['*I have seen him yesterday.*', '*I seen him yesterday.*', '*I have saw him yesterday.*', '*I saw him yesterday.*'], a: 3, why: '*yesterday* ialah masa yang sudah berlalu, jadi gunakan past simple.' },
      { q: 'Lengkapkan: I have lived here ___ 2015.', opts: ['*since*', '*for*', '*ago*', '*in*'], a: 0, why: '*since* diikuti titik permulaan; *for* diikuti tempoh seperti *ten years*.' },
      { q: 'Bagaimanakah mengatakan "Saya belum makan"?', opts: ["*I didn't eaten yet.*", "*I haven't eaten yet.*", '*I have never eat.*', '*I not yet eat.*'], a: 1, why: "\"Belum\" ialah *haven't* + past participle + *yet*." },
    ],
  },
  {
    id: 'questions-negatives',
    title: 'Soalan dan penafian',
    blurb: 'Satu *not* menggantikan tidak, bukan, jangan dan belum, dan soalan dibentuk dengan mengubah susunan kata.',
    sections: [
      {
        h: 'Satu *not* untuk semua',
        p: [
          'Bahasa Melayu memilih antara "tidak", "bukan", "jangan" dan "belum". Bahasa Inggeris hanya ada *not*, tetapi ia mesti melekat pada **kata kerja bantu**: *be*, *do*, *have*, *will*, *can* dan seumpamanya. Jika ayat tiada kata kerja bantu, tambah *do*, *does* atau *did*.',
        ],
        table: {
          head: ['Bahasa Melayu', 'Bahasa Inggeris'],
          rows: [
            ['tidak + kata kerja', "*don't*, *doesn't*, *didn't* + bentuk asas"],
            ['tidak + kata sifat', "*am not*, *isn't*, *aren't*"],
            ['bukan', "*am not*, *isn't*, *aren't*"],
            ['jangan', "*don't* + bentuk asas"],
            ['belum', "*haven't* atau *hasn't* + past participle + *yet*"],
            ['tidak boleh, tidak akan', "*can't*, *won't*"],
          ],
        },
        ex: [
          ["I don't know.", 'Saya tidak tahu.'],
          ["He isn't tired.", 'Dia tidak penat.'],
          ["She isn't my sister.", 'Dia bukan kakak saya.'],
          ["Don't touch that!", 'Jangan sentuh itu!'],
          ["He hasn't arrived yet.", 'Dia belum sampai.'],
          ["I can't swim.", 'Saya tidak boleh berenang.'],
        ],
        tip: `Elakkan dua penafian dalam satu ayat: *I don't have anything* atau *I have nothing*, bukan "I don't have nothing".`,
      },
      {
        h: 'Soalan ya / tidak: kata kerja bantu di hadapan',
        p: [
          'Dalam bahasa Melayu, soalan boleh dibuat dengan nada suara, "-kah" atau "adakah" tanpa mengubah susunan ayat. Dalam bahasa Inggeris, kata kerja bantu berpindah ke **hadapan subjek**. Jika tiada kata kerja bantu, gunakan *do*, *does* atau *did*.',
        ],
        table: {
          head: ['Ayat penyata', 'Soalan'],
          rows: [
            ['*She is a teacher.*', '*Is she a teacher?*'],
            ['*They can swim.*', '*Can they swim?*'],
            ['*He has finished.*', '*Has he finished?*'],
            ['*You like durian.*', '*Do you like durian?*'],
            ['*He lives here.*', '*Does he live here?*'],
            ['*They came.*', '*Did they come?*'],
          ],
        },
      },
      {
        h: 'Kata tanya di depan sekali',
        p: [
          'Dalam bahasa Melayu, kata tanya boleh berada di hujung ayat: "Awak tinggal di mana?" Dalam bahasa Inggeris, kata tanya **mesti di hadapan**, diikuti kata kerja bantu, kemudian subjek: kata tanya + kata kerja bantu + subjek + kata kerja.',
        ],
        table: {
          head: ['Kata tanya', 'Maksud', 'Contoh'],
          rows: [
            ['*what*', 'apa', '*What do you want?*'],
            ['*who*', 'siapa', '*Who is that?*'],
            ['*where*', 'di mana, ke mana', '*Where do you live?*'],
            ['*when*', 'bila', '*When did he arrive?*'],
            ['*why*', 'kenapa, mengapa', '*Why are you laughing?*'],
            ['*how*', 'bagaimana, macam mana', '*How do you spell it?*'],
            ['*how much*', 'berapa (harga, atau jumlah yang tidak boleh dikira)', '*How much is this?*'],
            ['*how many*', 'berapa (bilangan)', '*How many people are coming?*'],
            ['*which*', 'yang mana', '*Which one do you want?*'],
          ],
        },
        ex: [
          ['Where do you live?', 'Awak tinggal di mana?'],
          ['What did she say?', 'Dia kata apa?'],
          ['How much is this shirt?', 'Berapa harga baju ini?'],
          ['Who told you?', 'Siapa beritahu awak?'],
        ],
        after: ['Apabila *who* atau *what* ialah subjek soalan, tidak perlu *do*: *Who told you?*, *What happened?*'],
      },
      {
        h: 'Jawapan pendek',
        p: ['Menjawab dengan *Yes* atau *No* sahaja boleh kedengaran kasar. Biasanya jawapan itu disambung dengan subjek dan kata kerja bantu yang sama seperti dalam soalan.'],
        ex: [
          ['Are you hungry? Yes, I am.', 'Awak lapar? Ya.'],
          ["Do you smoke? No, I don't.", 'Awak merokok? Tidak.'],
          ['Can she drive? Yes, she can.', 'Dia boleh memandu? Boleh.'],
          ["Did they come? No, they didn't.", 'Mereka datang? Tidak.'],
          ['Have you eaten? Yes, I have.', 'Sudah makan? Sudah.'],
        ],
        after: ['Ini serupa dengan cara bahasa Melayu menjawab dengan mengulang kata kunci ("Boleh?" "Boleh."), cuma yang diulang ialah kata kerja bantu.'],
      },
      {
        h: 'Question tags: "kan?"',
        p: [
          'Untuk "kan?" atau "bukan?" di hujung ayat, bahasa Inggeris menggunakan **question tag**: kata kerja bantu yang sama + kata ganti nama. Ayat positif mendapat tag negatif, dan ayat negatif mendapat tag positif.',
        ],
        ex: [
          ["It's hot today, isn't it?", 'Panas hari ini, kan?'],
          ["You like coffee, don't you?", 'Awak suka kopi, kan?'],
          ["They went home, didn't they?", 'Mereka sudah balik, kan?'],
          ["She can't come, can she?", 'Dia tidak boleh datang, kan?'],
        ],
        tip: "Di Malaysia, ramai orang menggunakan *isn't it?* untuk semua ayat. Dalam bahasa Inggeris baku, tag mesti sepadan dengan kata kerja bantu dan subjek ayat itu.",
      },
    ],
    quiz: [
      { q: 'Bagaimanakah mengatakan "Jangan bimbang"?', opts: ['*Not worry.*', '*No worry.*', "*Don't worry.*", "*Doesn't worry.*"], a: 2, why: "\"Jangan\" ialah *don't* + bentuk asas." },
      { q: 'Pilih soalan yang betul untuk "Awak tinggal di mana?"', opts: ['*Where do you live?*', '*You live where?*', '*Where you live?*', '*Where does you live?*'], a: 0, why: 'Kata tanya di hadapan, kemudian *do*, kemudian subjek.' },
      { q: 'Lengkapkan: ___ people are coming? (Berapa orang)', opts: ['*How much*', '*How*', '*What*', '*How many*'], a: 3, why: '*people* boleh dikira, jadi gunakan *How many*.' },
      { q: 'Soalan: *Can you swim?* Pilih jawapan pendek yang betul.', opts: ['*Yes, I do.*', '*Yes, I can.*', '*Yes, I am.*', '*Yes, I swim can.*'], a: 1, why: 'Jawapan pendek mengulang kata kerja bantu dalam soalan: *can*.' },
      { q: "Lengkapkan: It's cold, ___?", opts: ["*doesn't it*", "*don't you*", "*isn't it*", "*aren't you*"], a: 2, why: "Ayat positif dengan *is* mendapat tag negatif *isn't it*." },
    ],
  },
  {
    id: 'adjectives',
    title: 'Kata sifat dan perbandingan',
    blurb: 'Kata sifat datang sebelum kata nama, dan "lebih" serta "paling" menjadi -er / *more* dan -est / *most*.',
    sections: [
      {
        h: 'Kata sifat sebelum kata nama',
        p: [
          'Inilah perbezaan susunan yang paling ketara. Dalam bahasa Melayu, kata sifat atau kata adjektif (**adjective**) datang selepas kata nama: "rumah besar". Dalam bahasa Inggeris, ia datang **sebelum** kata nama. Kata sifat tidak berubah untuk jamak.',
        ],
        ex: [
          ['a big house', 'sebuah rumah besar'],
          ['a red car', 'sebuah kereta merah'],
          ['new shoes', 'kasut baharu'],
          ['my old friend', 'kawan lama saya'],
          ['two small black cats', 'dua ekor kucing hitam yang kecil'],
          ['The house is big.', 'Rumah itu besar.'],
        ],
        after: [
          'Selepas *be*, kata sifat datang di hujung seperti dalam bahasa Melayu, tetapi jangan lupa *is* atau *are*: *The house is big*.',
          'Kata nama yang menerangkan kata nama lain juga datang dahulu: "kedai kopi" ialah *coffee shop*, dan "stesen bas" ialah *bus station*.',
        ],
      },
      {
        h: 'Lebih dan paling',
        p: [
          'Untuk "lebih ... daripada", gunakan bentuk **comparative** + *than*. Untuk "paling" atau "ter-", gunakan bentuk **superlative** dengan *the* di hadapannya. Kata sifat pendek mengambil -er dan -est; kata sifat panjang mengambil *more* dan *most*.',
        ],
        table: {
          head: ['Jenis kata sifat', 'Lebih (comparative)', 'Paling (superlative)'],
          rows: [
            ['satu suku kata: *tall*, *cheap*', '*taller*, *cheaper*', '*the tallest*, *the cheapest*'],
            ['berakhir dengan -e: *nice*, *large*', '*nicer*, *larger*', '*the nicest*, *the largest*'],
            ['satu vokal + satu konsonan: *big*, *hot*', '*bigger*, *hotter*', '*the biggest*, *the hottest*'],
            ['berakhir dengan -y: *easy*, *happy*', '*easier*, *happier*', '*the easiest*, *the happiest*'],
            ['kebanyakan yang lebih panjang: *expensive*, *beautiful*', '*more expensive*, *more beautiful*', '*the most expensive*, *the most beautiful*'],
            ['tidak sekata: *good*', '*better*', '*the best*'],
            ['tidak sekata: *bad*', '*worse*', '*the worst*'],
            ['tidak sekata: *far*', '*further*', '*the furthest*'],
          ],
        },
        ex: [
          ['My brother is taller than me.', 'Abang saya lebih tinggi daripada saya.'],
          ['This phone is more expensive than that one.', 'Telefon ini lebih mahal daripada yang itu.'],
          ['Your English is better than mine.', 'Bahasa Inggeris awak lebih baik daripada bahasa Inggeris saya.'],
          ['She is the tallest girl in the class.', 'Dia murid perempuan yang paling tinggi di dalam kelas.'],
          ['This is the most expensive hotel in the city.', 'Ini hotel yang paling mahal di bandar raya ini.'],
          ['He is my best friend.', 'Dia kawan karib saya.'],
        ],
        after: [
          '"Daripada" dalam perbandingan ialah *than*, bukan *from*.',
          'Jangan guna kedua-dua cara sekali gus: "more cheaper" dan "more better" tidak betul.',
        ],
      },
      {
        h: 'Sama: *as ... as*',
        p: ['Untuk "sama ... dengan" atau "se-", gunakan *as* + kata sifat + *as*. Bentuk nafinya, *not as* ... *as*, bermaksud "tidak se-".'],
        ex: [
          ['Ali is as tall as his father.', 'Ali sama tinggi dengan ayahnya.'],
          ['My car is as old as yours.', 'Kereta saya sama lama dengan kereta awak.'],
          ['This bag is not as expensive as that one.', 'Beg ini tidak semahal yang itu.'],
        ],
      },
      {
        h: '*very*, *too*, *enough*',
        p: ['Dalam pertuturan bahasa Melayu, "sangat" dan "terlalu" kadang-kadang bertukar ganti. Dalam bahasa Inggeris, *very* dan *too* tidak sama maksudnya.'],
        table: {
          head: ['Perkataan', 'Maksud', 'Kedudukan'],
          rows: [
            ['*very*', 'sangat (hanya menguatkan)', 'sebelum kata sifat'],
            ['*too*', 'terlalu (melebihi had, ada masalah)', 'sebelum kata sifat'],
            ['*enough*', 'cukup', '**selepas** kata sifat, tetapi sebelum kata nama'],
          ],
        },
        ex: [
          ['The tea is very hot.', 'Teh itu sangat panas.'],
          ["The tea is too hot. I can't drink it.", 'Teh itu terlalu panas. Saya tidak boleh minum.'],
          ['This shirt is too small for me.', 'Baju ini terlalu kecil untuk saya.'],
          ['He is old enough to drive.', 'Dia sudah cukup umur untuk memandu.'],
          ['We have enough time.', 'Kita ada cukup masa.'],
        ],
        tip: '*Too* membawa maksud negatif. Untuk memuji, katakan *The food is very good*, bukan "The food is too good".',
      },
    ],
    quiz: [
      { q: 'Bagaimanakah mengatakan "sebuah kereta baharu"?', opts: ['*a car new*', '*a new car*', '*car a new*', '*new a car*'], a: 1, why: 'Kata sifat datang sebelum kata nama.' },
      { q: 'Lengkapkan: This shop is ___ than that one.', opts: ['*more cheap*', '*cheapest*', '*more cheaper*', '*cheaper*'], a: 3, why: 'Kata sifat pendek mengambil -er, tanpa *more*.' },
      { q: 'Apakah bentuk comparative bagi *good*?', opts: ['*better*', '*gooder*', '*more good*', '*best*'], a: 0, why: '*good* tidak sekata: *better* (lebih baik), *the best* (paling baik).' },
      { q: 'Lengkapkan: She is the ___ student in the class.', opts: ['*more intelligent*', '*intelligentest*', '*most intelligent*', '*most intelligenter*'], a: 2, why: 'Kata sifat panjang mengambil *the most* untuk "paling".' },
      { q: 'Pilih ayat yang betul.', opts: ['*He is enough tall.*', '*He is tall enough.*', '*He is too tall enough.*', '*He enough is tall.*'], a: 1, why: '*enough* diletakkan selepas kata sifat.' },
    ],
  },
  {
    id: 'prepositions',
    title: 'Kata sendi',
    blurb: '"Di" dan "pada" berpecah kepada *in*, *on* dan *at*. Pelajari coraknya untuk masa dan tempat, serta gabungan tetap yang biasa.',
    sections: [
      {
        h: '*in*, *on*, *at* untuk masa',
        p: [
          'Bahasa Melayu menggunakan "pada" untuk hampir semua masa. Bahasa Inggeris memilih kata sendi nama (**preposition**) mengikut jenis masa: *in* untuk tempoh yang panjang, *on* untuk hari dan tarikh, *at* untuk waktu yang tepat.',
        ],
        table: {
          head: ['Kata sendi', 'Digunakan untuk', 'Contoh'],
          rows: [
            ['*in*', 'bulan, tahun, musim, bahagian hari', '*in May*, *in 2020*, *in the morning*, *in the evening*'],
            ['*on*', 'hari dan tarikh', '*on Monday*, *on 31 August*, *on my birthday*'],
            ['*at*', 'waktu jam dan titik masa', "*at seven o'clock*, *at noon*, *at night*, *at the weekend*"],
          ],
        },
        ex: [
          ['The class starts at nine.', 'Kelas bermula pada pukul sembilan.'],
          ['I was born in 1998.', 'Saya lahir pada tahun 1998.'],
          ["We don't work on Sundays.", 'Kami tidak bekerja pada hari Ahad.'],
          ['She gets up early in the morning.', 'Dia bangun awal pada waktu pagi.'],
          ['See you on Friday at three.', 'Jumpa pada hari Jumaat pukul tiga.'],
        ],
        after: ['Tiada kata sendi sebelum *today*, *tomorrow*, *yesterday*, *this*, *next*, *last* dan *every*: *See you next week*, bukan "on next week".'],
      },
      {
        h: '*in*, *on*, *at* untuk tempat',
        p: ['"Di" juga berpecah tiga: *in* untuk di dalam sesuatu ruang atau kawasan, *on* untuk di atas permukaan, dan *at* untuk satu titik atau lokasi.'],
        table: {
          head: ['Kata sendi', 'Digunakan untuk', 'Contoh'],
          rows: [
            ['*in*', 'di dalam ruang, bandar, negara', '*in the room*, *in my bag*, *in Ipoh*, *in Malaysia*'],
            ['*on*', 'di atas permukaan, tingkat bangunan', '*on the table*, *on the wall*, *on the second floor*'],
            ['*at*', 'titik atau tempat tertentu', '*at the door*, *at the bus stop*, *at home*, *at work*, *at school*'],
          ],
        },
        ex: [
          ['My keys are in my bag.', 'Kunci saya ada di dalam beg.'],
          ['Your phone is on the table.', 'Telefon awak ada di atas meja.'],
          ['She is at the office.', 'Dia di pejabat.'],
          ['He lives in Johor Bahru.', 'Dia tinggal di Johor Bahru.'],
          ["Let's meet at the station.", 'Mari berjumpa di stesen.'],
          ['I am on the bus.', 'Saya di dalam bas.'],
        ],
        after: ['Untuk kenderaan awam yang kita boleh berjalan di dalamnya, gunakan *on*: *on the bus*, *on the train*, *on the plane*. Untuk kereta dan teksi, gunakan *in*: *in the car*.'],
      },
      {
        h: 'Arah: *to*, *from*, *into*',
        p: ['"Ke" dan "kepada" ialah *to*, "dari" dan "daripada" ialah *from*, dan "ke dalam" ialah *into*.'],
        ex: [
          ['I go to work by train.', 'Saya pergi kerja dengan kereta api.'],
          ['She is from Kelantan.', 'Dia berasal dari Kelantan.'],
          ['We walked from the hotel to the beach.', 'Kami berjalan dari hotel ke pantai.'],
          ['I got a letter from my friend.', 'Saya menerima surat daripada kawan saya.'],
          ['He put the money into his pocket.', 'Dia memasukkan wang ke dalam poketnya.'],
          ['The shop is open from nine to five.', 'Kedai dibuka dari pukul sembilan hingga pukul lima.'],
        ],
        after: ['Tiada *to* sebelum *home*, *here* dan *there*: *go home*, *come here*, *go there*.'],
      },
      {
        h: 'Gabungan tetap',
        p: ['Banyak kata kerja dan kata sifat mempunyai kata sendi "pasangan" yang tetap. Kata sendi itu sering tidak sama dengan terjemahan bahasa Melayu, jadi hafal setiap gabungan sebagai satu unit.'],
        table: {
          head: ['Gabungan', 'Maksud', 'Contoh'],
          rows: [
            ['*listen to*', 'mendengar', '*I listen to music.*'],
            ['*wait for*', 'menunggu', '*Wait for me!*'],
            ['*look at*', 'melihat, memandang', '*Look at this photo.*'],
            ['*look for*', 'mencari', '*I am looking for my keys.*'],
            ['*talk to*', 'bercakap dengan', '*Can I talk to you?*'],
            ['*depend on*', 'bergantung pada', '*It depends on the weather.*'],
            ['*good at*', 'pandai dalam', '*She is good at maths.*'],
            ['*afraid of*', 'takut akan', '*He is afraid of dogs.*'],
            ['*interested in*', 'berminat dengan', '*I am interested in history.*'],
            ['*married to*', 'berkahwin dengan', '*She is married to a doctor.*'],
          ],
        },
        tip: 'Sebaliknya, beberapa kata kerja tidak mengambil kata sendi dalam bahasa Inggeris: *discuss the problem* (bukan "discuss about"), *enter the room* (bukan "enter into").',
      },
    ],
    quiz: [
      { q: 'Lengkapkan: The meeting is ___ Monday.', opts: ['*in*', '*at*', '*on*', '*to*'], a: 2, why: 'Hari dan tarikh mengambil *on*.' },
      { q: "Lengkapkan: I get up ___ six o'clock.", opts: ['*at*', '*on*', '*in*', '*for*'], a: 0, why: 'Waktu jam mengambil *at*.' },
      { q: 'Lengkapkan: She was born ___ 2001.', opts: ['*on*', '*at*', '*from*', '*in*'], a: 3, why: 'Tahun dan bulan mengambil *in*.' },
      { q: 'Lengkapkan: Please wait ___ me.', opts: ['*to*', '*for*', '*at*', '*of*'], a: 1, why: '"Menunggu seseorang" ialah *wait for*.' },
      { q: 'Lengkapkan: My sister is afraid ___ cats.', opts: ['*with*', '*from*', '*of*', '*at*'], a: 2, why: 'Gabungan tetapnya ialah *afraid of*.' },
    ],
  },
  {
    id: 'modals',
    title: 'Kata kerja modal',
    blurb: '*can*, *must*, *should* dan rakan-rakannya untuk "boleh", "mesti", "patut" dan "mungkin", serta cara meminta dengan sopan.',
    sections: [
      {
        h: 'Peraturan yang sama untuk semua',
        p: [
          'Kata kerja modal (**modal verbs**) berfungsi seperti "boleh", "mesti" dan "patut": ia datang sebelum kata kerja utama. Ada tiga peraturan mudah.',
          '**1.** Selepas modal, kata kerja dalam bentuk asas, tanpa *to*: *I can swim*.',
          '**2.** Modal tidak pernah mengambil -s: *she can*, bukan "she cans".',
          '**3.** Soalan dan penafian dibuat tanpa *do*: *Can you swim?*, *I cannot swim*.',
        ],
        ex: [
          ['She can speak three languages.', 'Dia boleh bertutur dalam tiga bahasa.'],
          ['You must wear a helmet.', 'Awak mesti memakai topi keledar.'],
          ['We should go now.', 'Kita patut pergi sekarang.'],
          ["I can't hear you.", 'Saya tidak dapat dengar awak.'],
        ],
      },
      {
        h: 'Maksud setiap modal',
        table: {
          head: ['Modal', 'Maksud', 'Contoh'],
          rows: [
            ['*can*', 'boleh, pandai, dapat', '*I can drive.*'],
            ['*could*', 'boleh (pada masa dahulu); boleh (lebih sopan)', '*I could swim when I was five.*'],
            ['*must*', 'mesti, wajib', '*You must stop here.*'],
            ['*have to*', 'perlu, kena, terpaksa', '*I have to work tomorrow.*'],
            ['*should*', 'patut, sepatutnya', '*You should see a doctor.*'],
            ['*may*', 'mungkin; boleh (izin, formal)', '*It may rain later.*'],
            ['*might*', 'mungkin (kurang pasti)', '*She might be late.*'],
            ['*would*', 'akan (bersyarat); mahu (sopan)', '*I would like some tea.*'],
          ],
        },
        after: ['*Have to* bukan modal sebenar, jadi ia berubah seperti kata kerja biasa: *she has to*, *Do you have to go?*, *I had to wait*.'],
      },
      {
        h: "*mustn't* dan *don't have to*",
        p: [
          "Dua bentuk nafi ini sangat berbeza maksudnya. *Must not* (*mustn't*) ialah larangan: \"tidak boleh\", \"dilarang\". *Don't have to* bermaksud \"tidak perlu\": boleh buat, tetapi tidak wajib.",
        ],
        ex: [
          ["You mustn't park here.", 'Awak tidak boleh meletakkan kereta di sini.'],
          ["You don't have to pay. It's free.", 'Awak tidak perlu bayar. Ia percuma.'],
          ["You shouldn't eat so much sugar.", 'Awak tidak patut makan gula sebanyak itu.'],
          ["He can't come today.", 'Dia tidak dapat datang hari ini.'],
          ['It might not rain.', 'Mungkin tidak hujan.'],
        ],
      },
      {
        h: 'Meminta dan menawarkan dengan sopan',
        p: ['Bahasa Melayu menunjukkan kesopanan dengan "tolong", "boleh" dan "sila". Bahasa Inggeris menggunakan modal: *could* dan *would* lebih sopan daripada *can* dan *want*.'],
        table: {
          head: ['Tujuan', 'Corak', 'Contoh'],
          rows: [
            ['meminta bantuan', '*Can you ...?*, *Could you ...?*', '*Could you help me, please?*'],
            ['meminta izin', '*Can I ...?*, *May I ...?*', '*May I come in?*'],
            ['meminta sesuatu', "*I would like ...*, *I'd like ...*", "*I'd like a cup of coffee, please.*"],
            ['menawarkan sesuatu', '*Would you like ...?*', '*Would you like some tea?*'],
            ['menawarkan bantuan', '*Can I ...?*, *Shall I ...?*', '*Shall I open the window?*'],
          ],
        },
        ex: [
          ['Could you open the window, please?', 'Boleh tolong bukakan tingkap?'],
          ['May I use your phone?', 'Boleh saya guna telefon awak?'],
          ['Would you like something to drink?', 'Awak mahu minum apa-apa?'],
          ["I'd like a glass of water, please.", 'Tolong beri saya segelas air.'],
          ['Can I help you?', 'Boleh saya bantu?'],
        ],
        tip: "*I want* betul dari segi tatabahasa, tetapi boleh kedengaran kasar di kedai atau restoran. *I'd like* dan *please* jauh lebih sopan.",
      },
    ],
    quiz: [
      { q: 'Pilih ayat yang betul.', opts: ['*She cans swim.*', '*She can swims.*', '*She can to swim.*', '*She can swim.*'], a: 3, why: 'Modal tidak mengambil -s, dan kata kerja selepasnya dalam bentuk asas tanpa *to*.' },
      { q: "Apakah maksud *You don't have to come*?", opts: ['Awak tidak perlu datang.', 'Awak dilarang datang.', 'Awak tidak dapat datang.', 'Awak tidak patut datang.'], a: 0, why: "*don't have to* bermaksud tidak wajib; larangan ialah *mustn't*." },
      { q: 'Yang manakah paling sopan untuk meminta bantuan?', opts: ['*Help me.*', '*You help me.*', '*Could you help me, please?*', '*I want you help me.*'], a: 2, why: '*Could you ...?* bersama *please* ialah cara yang sopan untuk meminta.' },
      { q: 'Lengkapkan: You look ill. You ___ see a doctor.', opts: ['*would*', '*should*', '*may to*', '*can to*'], a: 1, why: 'Untuk nasihat ("patut"), gunakan *should* + bentuk asas.' },
      { q: 'Lengkapkan: He ___ work on Saturdays. (dia perlu)', opts: ['*have to*', '*must to*', '*has to*', '*musts*'], a: 2, why: '*have to* berubah seperti kata kerja biasa: untuk *he*, bentuknya *has to*.' },
    ],
  },
  {
    id: 'spoken',
    title: 'Bahasa Inggeris harian',
    blurb: "Bentuk pendek seperti *I'm* dan *don't*, bentuk santai seperti *gonna*, dan satu perbualan harian.",
    sections: [
      {
        h: 'Bentuk pendek (contractions)',
        p: [
          'Dalam pertuturan dan tulisan tidak rasmi, penutur bahasa Inggeris hampir selalu memendekkan kata kerja bantu. Tanda apostrof (**apostrophe**) menggantikan huruf yang dibuang. Dalam perbualan biasa, bentuk penuh boleh kedengaran kaku atau terlalu tegas.',
        ],
        table: {
          head: ['Bentuk penuh', 'Bentuk pendek', 'Contoh'],
          rows: [
            ['*I am*', "*I'm*", "*I'm tired.*"],
            ['*you are*, *we are*, *they are*', "*you're*, *we're*, *they're*", "*They're late.*"],
            ['*he is*, *she is*, *it is*', "*he's*, *she's*, *it's*", "*It's cold.*"],
            ['*I will*', "*I'll*", "*I'll call you.*"],
            ['*I have*', "*I've*", "*I've finished.*"],
            ['*I would*', "*I'd*", "*I'd like some tea.*"],
            ['*do not*, *does not*, *did not*', "*don't*, *doesn't*, *didn't*", "*I don't know.*"],
            ['*is not*, *are not*', "*isn't*, *aren't*", "*She isn't here.*"],
            ['*cannot*', "*can't*", "*I can't come.*"],
            ['*will not*', "*won't*", "*It won't rain.*"],
            ['*let us*', "*let's*", "*Let's go.*"],
          ],
        },
      },
      {
        h: "'s boleh bermaksud *is* atau *has*",
        p: ["*He's* boleh jadi *he is* atau *he has*. Lihat perkataan selepasnya: jika past participle, maksudnya *has*. Selepas nama atau kata nama, 's juga boleh menunjukkan milik."],
        ex: [
          ["He's a teacher.", 'Dia seorang guru. (he is)'],
          ["He's working.", 'Dia sedang bekerja. (he is)'],
          ["He's gone home.", 'Dia sudah balik. (he has)'],
          ["She's finished her work.", 'Dia sudah siapkan kerjanya. (she has)'],
          ["Ali's car is new.", 'Kereta Ali baharu. (milik)'],
        ],
      },
      {
        h: "*its* dan *it's*",
        p: ["Dua perkataan ini sama sebutannya tetapi berbeza maksudnya, dan penutur asli pun sering tersilap. *It's* ialah bentuk pendek *it is* atau *it has*. *Its*, tanpa apostrof, menunjukkan milik, seperti \"-nya\"."],
        ex: [
          ["It's very hot today.", 'Hari ini sangat panas.'],
          ['The cat is eating its food.', 'Kucing itu sedang makan makanannya.'],
          ['The company changed its name.', 'Syarikat itu menukar namanya.'],
        ],
        tip: "Ujian mudah: jika boleh diganti dengan *it is* atau *it has*, tulis *it's*. Jika tidak, tulis *its*. Begitu juga *you're* (*you are*) dan *your* (milik), serta *they're* (*they are*) dan *their* (milik).",
      },
      {
        h: 'Bentuk santai dalam pertuturan dan filem',
        p: [
          'Dalam filem, lagu dan perbualan pantas, awak akan mendengar bentuk yang lebih ringkas lagi. Kenali bentuk ini supaya faham, tetapi ia **tidak rasmi**: jangan guna dalam peperiksaan, e-mel kerja atau surat rasmi.',
        ],
        table: {
          head: ['Bentuk santai', 'Bentuk baku', 'Contoh'],
          rows: [
            ['*gonna*', '*going to*', "*I'm gonna be late.*"],
            ['*wanna*', '*want to*', '*Do you wanna come?*'],
            ['*gotta*', '*have got to* (mesti)', "*I've gotta go.*"],
            ['*kinda*', '*kind of* (agak)', "*I'm kinda tired.*"],
            ['*dunno*', "*don't know*", '*I dunno.*'],
            ['*yeah*', '*yes*', '*Yeah, sure.*'],
          ],
        },
        after: [`*Gonna* masih memerlukan *be*: *I'm gonna*, bukan "I gonna". *Wanna* pula tidak digunakan dengan *he / she / it*: katakan *He wants to*.`],
      },
      {
        h: 'Perbualan harian',
        p: ['Dua orang kawan berjumpa selepas kerja dan bercakap bergilir-gilir. Perhatikan bentuk pendek dalam hampir setiap ayat.'],
        ex: [
          ["Hi, Mei! How's it going?", 'Hai, Mei! Apa khabar?'],
          ["Not bad, thanks. I'm a bit tired. And you?", 'Boleh tahan, terima kasih. Saya penat sedikit. Awak pula?'],
          ["I'm fine. Have you eaten yet?", 'Saya baik. Awak sudah makan?'],
          ["No, I haven't. I'm starving!", 'Belum. Saya lapar sangat!'],
          ["Let's get something to eat. There's a new place near the station.", 'Jom cari makan. Ada tempat baharu dekat stesen.'],
          ['Sounds good. Is it expensive?', 'Bagus juga. Mahalkah?'],
          ["No, it isn't. And the food's great.", 'Tidak. Makanannya pun sedap.'],
          ["OK. I'll just get my bag.", 'Baiklah. Saya ambil beg saya sekejap.'],
          ["No rush. I'll wait for you outside.", 'Tak perlu tergesa-gesa. Saya tunggu awak di luar.'],
          ['Thanks. See you in a minute!', 'Terima kasih. Jumpa sekejap lagi!'],
        ],
        after: ["Ungkapan berguna: *How's it going?* (Apa khabar?, santai), *Not bad* (Boleh tahan), *Sounds good* (Bagus juga), *No rush* (Tak perlu tergesa-gesa), *See you!* (Jumpa lagi!)."],
      },
    ],
    quiz: [
      { q: "Apakah bentuk penuh *won't*?", opts: ['*would not*', '*was not*', '*will not*', '*want not*'], a: 2, why: "*won't* ialah bentuk pendek *will not*." },
      { q: "Dalam ayat *He's gone home*, apakah maksud *He's*?", opts: ['*He is*', '*He has*', '*He was*', '*His*'], a: 1, why: 'Selepasnya ada past participle (*gone*), jadi maksudnya *he has*.' },
      { q: 'Pilih ayat yang betul.', opts: ['*Its raining.*', "*The dog wagged it's tail.*", '*Its a nice day.*', '*The dog wagged its tail.*'], a: 3, why: "*its* tanpa apostrof menunjukkan milik; *it's* bermaksud *it is* atau *it has*." },
      { q: 'Apakah bentuk baku bagi *gonna*?', opts: ['*going to*', '*got to*', '*gone to*', '*go and*'], a: 0, why: '*gonna* ialah sebutan santai bagi *going to*.' },
      { q: 'Di manakah *wanna* dan *gonna* sesuai digunakan?', opts: ['Dalam surat permohonan kerja', 'Dalam perbualan santai dengan kawan', 'Dalam karangan peperiksaan', 'Dalam e-mel rasmi kepada majikan'], a: 1, why: 'Bentuk ini tidak rasmi dan hanya sesuai untuk perbualan santai.' },
    ],
  },
];
