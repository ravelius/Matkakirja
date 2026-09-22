# Kohtaaminen: Istanbul — luonnos Fablen tarkastettavaksi

Tehtävänanto: kirjoita yksi uusi kohtaaminen Istanbulille
`js/packs/kohtaamiset.js`-rakenteen mukaisesti (rakenne: hahmo, nappi,
frame, tervehdys, tervehdysLuenta, loyto, loytoLuenta, tyhja, vaarin,
neljä tunnetagia). Tätä raporttia EI ole viety kohtaamiset.js:ään —
odottaa hyväksyntää.

Huom Istanbulista jo olemassa olevasta materiaalista, jotta tämä ei
mene päällekkäin: `js/kohtaamiskuvat-data.js` sisältää jo hahmon
"Emine" (konservointi-insinööri, roikkuu ylösalaisin Yerekapanin/
Basilica Cisternin pylväiden välissä) — tämä on kytketty
tarinakaaren "Sulttaanin timantti" -minilautaan
(docs/isoisan-raamattu.md rivi 569), EI tavalliseen
kohtaamiset.js-visaan. Istanbulilla ei ollut ennestään riviä
kohtaamiset.js:ssä, joten alla on kokonaan uusi hahmo ja paikka
(ei Emine, ei kisterni, ei Hagia Sofia/Sininen moskeija).

## Istanbul — raitiovaunuseppä Kemal

**hahmo:** "raitiovaunuseppä Kemal"

**nappi:** "Tapaa Kemal"

**frame:** "Kemal nostaa katseensa vaunun penkistä ja kysyy"

**tervehdys:** "Kemal pyyhkii lakkaa penkiltä ennen iltavuoroa: \"Isoisäsi näki hevosvaunun uutena tammikuussa 1873. Tämä on sen kaukainen perillinen. Näytä että tunnet maailmaa kuten hän — niin kerron mitä kellon sisään jäi.\"" (209 merkkiä)

**tervehdysLuenta:**
```
[
  { rooli: 'kertoja', teksti: 'Kemal pyyhkii lakkaa penkiltä ennen iltavuoroa:' },
  { rooli: 'hahmo', teksti: '[miettiva] "Isoisäsi näki hevosvaunun uutena tammikuussa 1873. Tämä on sen kaukainen perillinen. [lammin] Näytä että tunnet maailmaa kuten hän — niin kerron mitä kellon sisään jäi."' },
]
```
(sanasta sanaan sama kuin tervehdys, tunnetageja lukuun ottamatta; ei
pelaajan repliikkiä — docs/tarina.md 21.9.2026: nuori Fogg ei puhu)

**loyto:** "Kemal kolkuttaa kellon kylkeä ja irrottaa rasian sisältä: \"Tämä on kolissut vuosia. Kukaan ei osannut sanoa miksi.\"" (115 merkkiä)

**loytoLuenta:**
```
[
  { rooli: 'kertoja', teksti: 'Kemal kolkuttaa kellon kylkeä ja irrottaa rasian sisältä:' },
  { rooli: 'hahmo', teksti: '[utelias] "Tämä on kolissut vuosia. [miettiva] Kukaan ei osannut sanoa miksi."' },
]
```

**tyhja:** "Kemal avaa penkin alla olevan lokeron: \"Tyhjä. Tämä vaunu on purettu ja koottu niin monta kertaa, että kätköt katoavat.\"" (120 merkkiä)

**vaarin:** "Kemal palaa viilaamaan penkkiä: \"Ei tänään. Lakka kuivuu hitaasti, ja niin kuivuu tietokin.\"" (92 merkkiä)

**tunnetagit:**
```
tunneTervehdys: { tunne: 'lammin', voimakkuus: 0.55 }
  // perustelu: isoisän muisto (hevosvaunu 1873) kudotaan suoraan
  // tervehdykseen, samaan tapaan kuin Berliinin posetiivari Otto
  // (tunneTervehdys: lammin 0.6) — lämpimin tervehdystyyppi
  // rekisterissä, koska kohtaaminen nojaa isoisän muistoon eikä
  // pelkkään uteliaisuuteen.
tunneLoyto: { tunne: 'ilo', voimakkuus: 0.7 }
  // perustelu: rekisterin oletus (docs/pulu-reaktiot.md E2) — löytö
  // on pelin suuri hetki kaikissa kaupungeissa.
tunneTyhja: { tunne: 'miettiva', voimakkuus: 0.45 }
  // perustelu: rekisterin oletus — "Tyhjä…" jää pohtimaan syytä
  // (vaunun purku/kokoonpano) eikä moiti pelaajaa.
tunneVaarin: { tunne: 'hammentynyt', voimakkuus: 0.4 }
  // perustelu: rekisterin oletus — lohduttava "Ei tänään" ilman
  // moitetta, sama sävy kuin muissa kaupungeissa.
```

**1873-fakta ja lähde:**

Istanbulin (silloisen Konstantinopolin) ensimmäinen hevosvetoinen
raitiovaunulinja avattiin 1871 (Tophanen juhla, Azapkapı–Beşiktaş),
Istanbul Tramway Companyn 1869 saaman konsession pohjalta. Verkko
laajeni nopeasti: Aksaray–Topkapı-linja avattiin liikenteelle
**14. tammikuuta 1873** — täsmälleen isoisän matkapäiväkirjan
vuonna. Ensimmäisenä vuonna hevosvaunut kuljettivat 4,5 miljoonaa
matkustajaa neljällä linjalla (Azapkapı–Galata, Aksaray–Yedikule,
Aksaray–Topkapı, Eminönü–Aksaray), 45 vaunua ja 430 hevosta.

Nykyinen "nostalginen raitiovaunu" İstiklal-kadulla on tästä
verkosta erillinen, myöhempi linja: punaiset sähkövaunut ajoivat
Beyoğlussa ensi kertaa 1914, liikenne lopetettiin 1961, ja linja
herätettiin henkiin matkailija-/paikallislinjana Taksim–Tünel-
välillä 29.1.1990. Kemalin repliikissä "kaukainen perillinen" viittaa
tähän jatkumoon (raitiovaunuperinne, ei sama linja tai tekniikka) —
tarkkuuden vuoksi tekstissä ei väitetä samaa linjaa, vain samaa
kaupungin raitiovaunuperinnettä.

Lähteet (en.wikipedia.org):
- "Trams in Istanbul (1871-1966)" — konsessio 1869, ensimmäinen linja
  1871, Aksaray–Topkapı 14.1.1873, matkustaja-/vaunumäärät.
- "Istanbul nostalgic tramways" — Beyoğlun punainen vaunu 1914–1961,
  elvytys Taksim–Tünel 1990.

**Kuvatilaus Codexille:**

Turkkilainen mies, n. 60–65-vuotias, harmaantuva lyhyt parta,
työkäsivarret paljaina käärityissä paidanhihoissa, tumma nahkaesiliina
tai -liivi paidan päällä, ei mitään aikakauden asuun viittaavaa
(nykyinen työvaatetus). Paikka: pieni konepaja/piha Tünelin
raitiovaunupäätepysäkin kupeessa — puulastuja, lakkapurkki, messinkinen
raitiovaunukello penkillä, vanhoja vaununosia seinillä. Kesken
tekeminen: hän kiillottaa tai lakkaa vaunun puupenkkiä siveltimellä/
rätillä, pysähtyy kesken vedon ja kääntää katseensa suoraan kameraan
(pelaajaan) — ei poseeraa. Kaksi aikakerrosta: ikkunan tai oviaukon
kautta näkyy hämärästi nykyinen punainen nostalginen raitiovaunu
(1990-elvytysvaunu, ei mitään tekstiä/logoa näkyviin) taustalla
ohikulkemassa, kun taas työpöydällä ja seinillä on vanhoja, patinoituneita
messinki- ja puuosia jotka viittaavat 1870-luvun hevosvaunuaikaan. Ilme:
utelias mutta hieman varautunut sivukatsahdus, joka lämpenee — sopii
tervehdyksen "lammin/miettiva" -sävyyn. Rasian/kellon sisältöä ei
näytetä (kätkövihje ei saa paljastua). Valo: myöhäisiltapäivän lämmin,
pölyinen valo kulkeutuu sisään ikkunasta viistosti; sää ei näy sisätilassa,
mutta ikkunan takana on selkeä, aurinkoinen Istanbulin iltapäivä. Rajaus
enintään puolivartalo, kuten muissa kohtaamiskuvissa; ei kuvansisäistä
tekstiä, logoa tai vesileimaa.

---

valmis
