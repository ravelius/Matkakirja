// Tuotettu: node tools/tee-projekti-data.mjs (lähteet: docs/tilannekatsaus.md,
// pelin paketit ja työkalun KASIVAKIOT). Älä muokkaa käsin.
window.PROJEKTIDATA = {
 "tilanne": {
  "otsikko": "Matkakirja ja unohdettu aarre — tilannekatsaus",
  "paivitetty": "2026-09-27",
  "osiot": [
   {
    "avain": "yleiskuva",
    "otsikko": "Yleiskuva",
    "tila": "pelattavissa, kehitys jatkuu",
    "seuraavaksi": [
     "iOS-sovelluksen julkaisu App Storeen",
     "pelin sisäinen talous ja ensimmäiset minipelit",
     "lisää linssejä ja kohteita Euroopan ulkopuolelle"
    ],
    "kappaleet": [
     "Matkakirja ja unohdettu aarre on suomenkielinen seikkailupeli, jossa pelaaja oppii maailmasta matkustaessaan. Nuori Fogg seuraa isoisänsä vuoden 1873 matkapäiväkirjaa ja etsii kadonneen luettelon unohdettuja aarteita. Peli on tehty 13 vuotta täyttäneille ja aikuisille. Kartalla eletään nykyajassa, mutta ulkoasu on vanhan matkakirjan: pergamenttia, mustetta ja käsin piirretyn kartan tuntua. Peli toimii selaimessa jo nyt, ja iOS-sovellus on sisäisessä testauksessa. Peli on ilmainen mahdollisimman pitkälle; tulot tulevat lisätoiminnoista."
    ]
   },
   {
    "avain": "kartta",
    "otsikko": "Kartta ja maailma",
    "tila": "tuotannossa, laajenee",
    "seuraavaksi": [
     "tarkin karttataso myös iOS-sovelluksen pallonäkymään",
     "lisää erikoismalleja Keski- ja Itä-Euroopan kohteista",
     "alueiden lataus offline-käyttöön maanosittain"
    ],
    "kappaleet": [
     "Peli käyttää omaa, itse poltettua karttaa: pergamenttityylinen laattapyramidi kattaa koko maapallon ja tarkentuu kaupunkitasolle asti. Karttaan on piirretty rajat, joet, järvet ja meret sekä maaston korkeusvarjostus. iOS-sovelluksen testiversiossa maasto on aidosti kolmiulotteinen: kameraa voi kallistaa, vuoret nousevat, ja merkittäviä nähtävyyksiä kuvaavat pelille mallinnetut 3D-pienoismallit. Merellä liikkuu eläimiä ja laivoja, ja valmiiksi pelatun maan lippu liehuu kartalla. Kaikki kartta-aineisto on avointa tai itse tuotettua; kaupallisia karttapalveluja ei käytetä."
    ]
   },
   {
    "avain": "sisalto",
    "otsikko": "Sisältö ja oppiminen",
    "tila": "tuotannossa, laajenee",
    "seuraavaksi": [
     "nähtävyyskuvien tyylin yhtenäistäminen koko pelissä",
     "lehtien ja nostojen laajennus Euroopan ulkopuolelle",
     "luennan säätimet (nopeus, jatko samasta kohdasta) molempiin versioihin"
    ],
    "kappaleet": [
     "Jokaisesta kaupungista ja jo yli sadasta maasta on oma lehti, joka on kirjoitettu vuoden 1873 matkakirjan hengessä mutta nykytiedon varassa: historiaa, historian hetkiä, kadonneita ihmeitä, kulttuuria ja arkea. Kartalla nostot johdattavat nähtävyyksiin ja tarinoihin, ja jokaisella nostolla on oma kuvansa. Tekstit voi kuunnella: isoisän ääni lukee lehtiä, ja pelin oma opas, Pulu-kyyhky, vastaa pelaajan kysymyksiin. Valokuvat ja vanhat kuvat ovat vapaasti käytettäviä (public domain tai Creative Commons), ja nähtävyyksien kuvat ovat pelille tehtyjä havainnekuvia pelin omaan tyyliin. Kuvien lisenssit on inventoitu; tekijämerkinnät tulevat näkyviin peliin."
    ]
   },
   {
    "avain": "linssit",
    "otsikko": "Linssit",
    "tila": "osa pelissä, katalogi kasvaa",
    "seuraavaksi": [
     "yökartta ja uskontojen, tieteen ja löytöretkien aikajanat",
     "vain iOS-sovelluksessa toimivat 3D-linssit"
    ],
    "kappaleet": [
     "Linssit ovat karttakerroksia, jotka näyttävät maailman eri aiheen kautta: keksinnöt Euroopassa, ihmisen leviäminen maapallolle, astronauttien valokuvat avaruudesta, maailman radiot suorana, maiden vertailu ja maaston korkeudet. Linssikatalogissa on suunniteltuna noin 150 linssiä kuudella toteutustavalla, ja jokaisesta on kirjattu, mitä sen avulla oppii ja miten se liittyy peliin. Katso Linssit-välilehti."
    ]
   },
   {
    "avain": "pelit",
    "otsikko": "Pelit",
    "tila": "suunnitteilla, ensimmäiset 10 valittu",
    "seuraavaksi": [
     "ensimmäisten pelien toteutus",
     "pelistreak: palkinto peräkkäisinä päivinä pelaamisesta",
     "lentopeli (vapaa lento vanhalla kaksitasolla) ensi viikon suunnitelmissa"
    ],
    "kappaleet": [
     "Peliin tulee Euroopan perinteisiä pelejä, joita pelataan tietokonetta tai kaveria vastaan siinä maassa, josta peli on kotoisin: esimerkiksi mölkky Suomessa, kubb Ruotsissa, pétanque Ranskassa ja tavli Kreikassa. Pelikatalogissa on 117 peliä kahdeksasta maantieteellisestä osasta, ja kymmenelle ensimmäiselle on tehty pelisuunnitelma. Pelit ovat yhtä merkittävä osa kokonaisuutta kuin linssit. Katso Pelit-välilehti."
    ]
   },
   {
    "avain": "natiivi",
    "otsikko": "Natiivi iOS",
    "tila": "sisäisessä testauksessa",
    "seuraavaksi": [
     "pelin talous ja uusi aloitusnäkymä seuraavaan testiversioon",
     "suorituskyvyn viimeistely iPadille",
     "App Store -julkaisun valmistelu"
    ],
    "kappaleet": [
     "iOS-sovellus on rakennettu uudelleen natiivina, jotta kartta liikkuu sulavasti ja maasto voidaan näyttää kolmiulotteisena. Tavoite on täysi toimintojen vastaavuus selainpelin kanssa: kaikki pelin toiminnot, lehdet, linssit ja radiot toteutetaan sovellukseen natiivisti. Uusi testiversio on viime viikkoina julkaistu sisäiseen testaukseen lähes päivittäin, ja jokainen versio testataan laitteilla ennen jakelua."
    ]
   }
  ]
 },
 "luvut": {
  "kaupunkeja": 266,
  "kaupunkilehtia": 266,
  "juttuja": 1570,
  "maita": 117,
  "maalehtia": 117,
  "kohteita": 2794,
  "kohdeLajit": {
   "nahtavyydet": 1574,
   "maasto": 718,
   "elaimet": 109,
   "skandaalit": 254,
   "hetket": 49,
   "kulttuuri": 225
  },
  "kartta": {
   "syvinTaso": 10,
   "tasoja": 11,
   "z10Laatat": [
    298335,
    78211
   ],
   "z10Yhteensa": 376546,
   "z10Tuotannossa": "2026-09-27"
  },
  "versiot": {
   "web": 2328,
   "natiivi": "1.0.30",
   "natiiviPaivitetty": "2026-09-27"
  }
 }
};
