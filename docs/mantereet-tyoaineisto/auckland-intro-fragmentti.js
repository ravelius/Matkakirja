// AUCKLANDIN INTRO-LOHKO — liitettäväksi js/packs/oceania-artikkelit.js:ään
//
// Tämä EI ole ajettava paketti vaan työaineisto: Aucklandin lehden
// kirjoittaja (opus, 23.8.2026) ei saanut luoda oceania-artikkelit.js:ää,
// koska rinnakkainen Sydney-agentti perustaa sen. Fable liittää alla
// olevan lohkon sellaisenaan OCEANIA_ARTIKKELIT-taulun sisään.
//
// Avain on wiki-otsikko, sama jolla cachedSummary hakee:
// js/packs/oceania.js antaa Aucklandille wiki-nimen 'Auckland'.
//
// Kentät (malli: js/packs/northamerica-artikkelit.js):
//   intro  — lehden ETUSIVUN LEIPÄTEKSTI, 7–10 virkettä, n. 700–1100
//            merkkiä, 2–3 kappaletta '\n\n'-rajalla, 1–3 maltillista
//            **lihavointia**. Renderöijä tekee kappaleet ja boldit.
//   teksti — kolme kappaletta, 600–1100 merkkiä: missä ollaan, mitä on
//            tapahtunut, millaista täällä on nyt (Lue lisää -dialogi).
//
// Jokainen väite tulee samasta erästä kuin lehden tekstit
// (js/packs/kulttuuri-kategoriat.js, avain auckland) ja on tarkistettu
// en-Wikipedian raakateksteistä 23.8.2026 — uusia lähdehakuja ei
// tarvittu. Sisältölinjaus on spec-mantereet.md:n Oseania-kohta:
// maorikulttuuri elävänä ja te reo -nimet mukana, siirtomaahistoria
// tapahtumina neutraalisti, ei nykypolitiikkaa. Anakronismivahti:
// Harbour Bridge (1959) ja Sky Tower (1997) eivät esiinny tekstissä.

  Auckland: {
    intro: 'Auckland on Uuden-Seelannin suurin kaupunki, ja siinä asuu noin '
      + 'kolmasosa koko maan väestöstä. Se on rakennettu kapealle '
      + 'kannakselle kahden sataman väliin: pohjoisessa Waitematā avautuu '
      + 'Hauraki-lahdelle ja Tyynellemerelle, etelässä Manukau '
      + 'Tasmaninmerelle. Kannaksen alla on **Aucklandin '
      + 'tulivuorikenttä, jolla on purkautunut ainakin 53 tulivuorta** '
      + 'viimeisten 193 000 vuoden aikana.'
      + '\n\n'
      + 'Maorit asettuivat kannakselle noin 1350, ja sen maorinimi on '
      + 'Tāmaki Makaurau, "Tāmaki jota moni halusi". Linnoitettuja pā-kyliä '
      + 'nousi tulivuorenhuipuille. Ngāti Whātua Ōrākein ylipäällikkö '
      + 'Āpihai Te Kawau allekirjoitti Waitangin sopimuksen maaliskuussa '
      + '1840 ja lahjoitti pian sen jälkeen maata Waitematān rannalta '
      + 'kuvernööri William Hobsonille uuden pääkaupungin paikaksi. '
      + 'Kaupunki perustettiin 18. syyskuuta 1840.'
      + '\n\n'
      + 'Auckland oli Uuden-Seelannin pääkaupunki 1841–1865, kunnes '
      + 'hallinto siirtyi Eteläsaarta lähemmäksi Wellingtoniin. **Isoisän '
      + 'saapuessa 1873 menetyksestä oli kulunut kahdeksan vuotta**, mutta '
      + 'kaupunki kasvoi yhä satamansa varassa: kauri-pihka oli sen '
      + 'tärkein vientitavara vuosisadan jälkipuoliskon.',
    teksti: 'Auckland sijaitsee Uuden-Seelannin Pohjoissaaren yläosassa '
      + 'kapealla kannaksella, joka on Māngere Inletin ja Tāmaki-joen '
      + 'kohdalla alle kahden kilometrin levyinen. Kaupunkia ympäröivät '
      + 'sademetsän peittämät kukkulat, lännessä Waitākeren ja kaakossa '
      + 'Hunuan vuoret, ja idässä ovat Hauraki-lahden saaret.'
      + '\n\n'
      + 'Kannaksesta käytiin kauan kamppailua sen hyvän maan takia: '
      + '1700-luvun alussa aluetta hallitsi Te Waiohua -heimoliitto ja '
      + '1740-luvulta lähtien Ngāti Whātua Ōrākei. Britit perustivat '
      + 'kaupungin 1840 ja tekivät siitä pääkaupungin 1841. 1860-luvun '
      + 'alussa kaupunkiin sijoitettiin 12 000 imperiumin sotilasta ja '
      + 'etelään rakennettiin Great South Road; väkiluku kasvoi 1 500:sta '
      + 'vuonna 1841 yli 12 000:een vuonna 1864.'
      + '\n\n'
      + 'Nykyään Auckland on maan talouden keskus, ja sen satama käsitteli '
      + 'vuonna 2015 kolmanneksen koko maan konttiliikenteestä. Kaupunkia '
      + 'sanotaan purjeiden kaupungiksi: veneitä on rekisteröity 135 000 ja '
      + 'noin joka kolmas kotitalous omistaa sellaisen. Ilmasto on lauhkea '
      + 'ja merellinen, ja Auckland on Uuden-Seelannin lämpimin suuri '
      + 'keskus.',
  },
