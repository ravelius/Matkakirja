# Horatio–Livia: Euroopan 45 kaupungin työjono

Päivä: 12.9.2026  
Pohja: `origin/main` / `dd7154a3902ff49cc93ffb36380700bbd713ba98`  
Pilotin sisältörevision tunniste: `eu-hl-pilot-20260912-r1`

## Portti ennen monistusta

Neljä pilottia — Marseille, Ateena, Sarajevo ja Venetsia — hyväksytään
yhtenä kokonaisuutena. Laaja tekstimonistus alkaa vasta, kun Fable on
hyväksynyt tekstiparin ja animaatiovetäjä on vahvistanut cue-formaatin
runtime-kelpoiseksi. Uuden äänen puuttuminen ei estä luonnostelua, mutta
estää integraation ja julkaisun. Yhtäkään uutta tekstiä ei julkaista vanhan
erisisältöisen äänen tai aikaleimasidonnan kanssa.

## Jokaisen kaupungin toimitus

1. Lue koko nykyinen `matkakirja.teksti`, `matkakirja.luenta`,
   `matkakirja.reaktiot`, `pollo.kommentti`, I1/I2 ja kaikki PuluCam-kuvat.
2. Kirjaa muistettava ajatus, Horation 1873-kohtaus ja Livian uusi
   nykyhavainto samaan kaupunkikorttiin.
3. Tiivistä Horation toistoa noin kahden virkkeen verran vain, jos oivallus,
   mittauksen merkitys ja selkeys säilyvät. Älä tavoittele numeroa tekstin
   kustannuksella.
4. Lisää Livialle tavallisesti yksi luonteva virke, mutta pidä nykyisen yhden
   kuplan todellinen tekninen raja enintään 125 merkissä. Nykyhavainto ja
   persoona ovat tärkeämpiä kuin vitsi.
5. Pelaajateksti ja tagiton TTS-sisältö ovat samasanaiset. Lisää erillinen
   v3-tuotantoehdotus ja semanttiset cue-ankkurit. Älä anna millisekunteja
   ennen lopullista ääntä.
6. Lyhyt kuvateksti noin yksi lause; pitkä enintään kaksi sisältölausetta ja
   lähde/tekijä/lisenssi vain pitkään. Lopullinen teksti vasta kuvan katselusta.
7. Aja vähintään sisältövartio, pack-rakennetesti, Pulu-kuplaraja ja
   reaktioankkurien yksikäsitteisyys. Ääntiiviisteen ja alignmentin pitää
   hylätä vanha sisältö ennen uutta tuotantoajoa.

## Tiedosto-omistetut erät

Erät eivät koske toistensa `js/packs/fokusvirta-*.js`-tiedostoihin. Kevyt
agentti saa tehdä yhden erän fakta- tai kattavuusluonnoksen, mutta
tekstivetäjä kirjoittaa ja arvioi Horatio–Livia-parin lopullisena yhtenä
äänenä. Erät avataan vasta pilotin portin jälkeen.

### P0 — yhteinen pilotti, 4/45

Omistaja: nykyinen tekstivetäjä. Tila: luonnos ja cue-kortti tehty, ääni,
animaatiointegraatio, kuvakatselmus ja Fable-hyväksyntä kesken.

- `fokusvirta-marseille.js`
- `fokusvirta-ateena.js`
- `fokusvirta-sarajevo.js`
- `fokusvirta-venetsia.js`

### E1 — Iberia ja länsi, 7 kaupunkia

- `fokusvirta-madrid.js`
- `fokusvirta-barcelona.js`
- `fokusvirta-granada.js`
- `fokusvirta-sevilla.js`
- `fokusvirta-lissabon.js`
- `fokusvirta-pariisi.js`
- `fokusvirta-amsterdam.js`

Riski-/jatkuvuusnostot: Madridin vuoden 1873 tasavalta ja Las Meninas;
Pariisin keskeneräinen ooppera; Granadan aiempi kaanonkorjaus; Amsterdamin
I1/I2/P1/P2:n toistuva ikkunanosto.

### E2 — Britteinsaaret ja Pohjanmeri, 6 kaupunkia

- `fokusvirta-lontoo.js`
- `fokusvirta-dublin.js`
- `fokusvirta-edinburgh.js`
- `fokusvirta-bergen.js`
- `fokusvirta-oslo.js`
- `fokusvirta-kobenhavn.js`

Riski-/jatkuvuusnostot: Lontoon `me englantilaiset` ja Fogg-puhuttelu;
Edinburghin I1/I2-pyykkitoisto; Bergenin sateeseen riippuva P2; Oslon
Christiania–Oslo-aikataso.

### E3 — Keski-Eurooppa ja Alpit, 6 kaupunkia

- `fokusvirta-berliini.js`
- `fokusvirta-wien.js`
- `fokusvirta-praha.js`
- `fokusvirta-budapest.js`
- `fokusvirta-krakova.js`
- `fokusvirta-alpit.js`

Riski-/jatkuvuusnostot: Berliinin voitonpylvään vuoden 1873 kehys; Wienin
maailmannäyttely, pörssi ja Rotunde; Budapestin marraskuun yhdistyminen;
Krakovan aiempi kronologiakorjaus. Alppien mittauksella pitää olla selkeä
merkitys eikä vain hahmotemppu.

### E4 — Pohjola ja Baltia, 8 kaupunkia

- `fokusvirta-tukholma.js`
- `fokusvirta-helsinki.js`
- `fokusvirta-tampere.js`
- `fokusvirta-tallinna.js`
- `fokusvirta-riika.js`
- `fokusvirta-vilna.js`
- `fokusvirta-tromssa.js`
- `fokusvirta-lappi.js`

Riski-/jatkuvuusnostot: Tukholman kruunajaiskehys, Riian vuoden 1873
laulujuhlat, Tallinnan Reval-aikataso, Tromssan I1/P1-toisto ja Lapin
Ivalojoen kulta. Riian I1/I2 tarvitsee eri muistettavat kuvahavainnot.

### E5 — Italia, saaret ja Adrianmeri, 6 kaupunkia

- `fokusvirta-rooma.js`
- `fokusvirta-firenze.js`
- `fokusvirta-kreeta.js`
- `fokusvirta-sisilia.js`
- `fokusvirta-dubrovnik.js`
- `fokusvirta-islanti.js`

Riski-/jatkuvuusnostot: Firenzen Davidin vuoden 1873 siirto ja suora
Fogg-puhuttelu; Kreetan hallintokerrokset; Dubrovnikin kolme Pulu-kuvaa
säilyvät; Islannin mittaus tarvitsee ymmärrettävän havainnon.

### E6 — Balkan ja itä, 8 kaupunkia

- `fokusvirta-sofia.js`
- `fokusvirta-istanbul.js`
- `fokusvirta-bukarest.js`
- `fokusvirta-kiova.js`
- `fokusvirta-odessa.js`
- `fokusvirta-varsova.js`
- `fokusvirta-moskova.js`
- `fokusvirta-pietari.js`

Riski-/jatkuvuusnostot: Sofian pääkaupunki- ja aikataso, Istanbulin Tünel,
Varsovan 1873-raja ja jälleenrakennus, Pietarin nimenvaihdokset sekä
Kiovan/Odessan sodan nykytilan nopeasti vanhenevat ilmaukset. Näiden
nykyfaktat tarkistetaan juuri ennen hyväksyntää ja uudelleen ennen julkaisua.

## Kattavuus ja kuvajono

- 45/45 kaupungilla on fokusvirtapakki ja kaksi Horation kuvaa.
- Lähtöauditissa on 58 PuluCam-kuvaa: 36 kaupungilta puuttuu P2.
- Budapestissa, Helsingissä, Bergenissä, Amsterdamissa, Oslossa, Tampereella
  ja Varsovassa on kaksi Pulu-kuvaa; Dubrovnikissa kolme ja Venetsiassa viisi.
- Kuvavetäjä varmisti saman kattavuuden tuoreesta mainista ja aloitti vain
  Marseillen P2:n. Ensimmäinen ehdokas hylättiin virheellisen satamageometrian
  vuoksi; kokonaan uusi versio tehdään, vanha säilyy.

## Valmistumisen näyttö

Jokaisesta erästä toimitetaan: tiedostolista, ennen/jälkeen-tekstit ja mitat,
faktalähteet, kuvien tunnisteet ja visuaalinen hyväksyntä, TTS-tagien
kuuntelutulos, ääni- ja tekstihashit, forced-alignmentin tulos, cue-QA,
testien pass/fail-rivit, Fable-kuittaus, CI, julkaisuversio ja oikean pelin
kaupunki-/tilakohtainen tarkistus. Vaiheita ei niputeta sanaksi "valmis".

