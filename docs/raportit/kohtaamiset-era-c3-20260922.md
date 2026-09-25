# Kohtaamiset erä C3: seuraavat 6 kaupunkia eniten nostoja ilman kohtaamista (2026-09-22)

Sisältökirjuri (Sonnet), jatkoa erille C1 ja C2. Kuusi seuraavaa kaupunkia
nostomäärän mukaan (js/packs/maakartat.js KAUPUNKIKARTAT), kirjoitettu
Sonnet-parvella (kuusi rinnakkaista agenttia, yksi per kaupunki):

| Kaupunki | Nostoja | Huomio |
| --- | ---: | --- |
| Bukarest | 10 | Kaaren Ana (kellonsoittaja) ja hänen kuvansa (freskokonservointi, sama Ana kuvatuotannossa tarkentuneena) ovat varattuja kaarelle — uusi hahmo katusoittaja Radu, Ateneum-konserttitalon portailla. Uusi kuva tarpeen. |
| Oslo | 10 | Kaaren Liv (maisemakuvaaja, pellot/Gjellestadin laiva) ja hänen kuvansa varattuja kaarelle — uusi hahmo kirjapainaja Halvor, kaupungin letterpress-painamossa. Isoisä-koukku: kaupunki oli vielä "Christiania" 1873. Uusi kuva tarpeen. |
| Tampere | 10 | Ei kaarta, ei olemassa olevaa kuvaa — täysin puhdas kaupunki. Uusi hahmo junailija Aatu, rautatieasemalla. Isoisä-koukku: rata Tampereelle avattiin vasta 1876, kolme vuotta isoisän matkan jälkeen. Uusi kuva tarpeen. |
| Dublin | 9 | Kaaren Molly (sillanvartija, Ha'penny Bridge) ja MOLEMMAT olemassa olevat Molly-kuvat (yksi arkistoitu, yksi aktiivinen/kaarelle varattu) eivät kelpaa — uusi hahmo putkiasentaja Niamh, vesijohtokaivannossa. Alkuperäinen raitiovaunu-teema vaihdettu, koska törmäsi Lissabonin (C2) samaan kuvioon. Uusi kuva tarpeen. |
| Granada | 9 | Kaaren Inés (puutarhuri, Generalife) ja hänen kuvansa varattuja kaarelle — uusi hahmo flamencoemäntä Pastora, Sacromonten luolakylässä. Isoisä-koukku: Espanjan ensimmäinen tasavalta (11.2.1873–29.12.1874). Uusi kuva tarpeen. |
| Pietari | 9 | Kaaren Polina (sellisti, Vitebskin asema, yö/sillat) ja hänen kuvansa varattuja kaarelle — uusi hahmo puutarhuri Larisa, Aleksandrinskan (nyk. Ostrovskin) aukiolla päiväsaikaan. Isoisä-koukku: Katariina II:n patsas paljastettiin täsmälleen 24.11.1873. Uusi kuva tarpeen. |

Rakenne sama kuin erät C1 ja C2. Ei vielä kirjoitettu js/packs/kohtaamiset.js:ään
— tarkastukseesi ensin.

## Läpikäyvät huomiot

1. Kaikki kuusi kaupunkia ovat tarinakaarikaupunkeja PAITSI Tampere. Jokaisessa
   viidessä kaarikaupungissa agentti tunnisti itsenäisesti kaaren varatun hahmon
   ja kuvan (js/tyohuone-kehitys-data.js KAARI_PAKETIT) ja kirjoitti tarkoituksella
   eri hahmon, ammatin, paikan ja motiivin — sama sääntö kuin Rooma/Ateena
   aiemmissa erissä.
2. Dublin-agentti havaitsi ja korjasi itse kaksi ristiriitaa: (a) kaksi eri
   Molly-kuvaa (yksi arkistoitu, yksi aktiivinen), joista kumpikaan ei silti
   kelpaisi koska hahmo on joka tapauksessa varattu; (b) oma ensimmäinen
   luonnos (raitiovaunu-teema) olisi toistanut Lissabonin (C2) saman kuvion —
   vaihdettu vesijohtoteemaan.
3. Kaikki inline-luentatagit tarkistettu englanniksi (ElevenLabs-sanasto), ei
   suomenkielisiä LIVIAN_TUNTEET-sanoja sekaan. Luennoissa vain roolit
   'kertoja' ja 'hahmo' — ei kertaakaan 'pelaaja'-riviä (nuori Fogg ei puhu,
   docs/tarina.md 21.9.2026).
4. tunneLoyto/tunneTyhja/tunneVaarin täsmälleen rekisterin pakolliset arvot
   kaikissa kuudessa (ilo 0,7 / miettiva 0,45 / hämmentynyt 0,4).
   tunneTervehdys on kaikissa kuudessa 'utelias' 0,5 (rekisterin oletus).
5. Kaikki merkkimäärät alle rajojen (tervehdys ≤280, loyto/tyhja/vaarin ≤130).
   Kolmessa (Bukarest, Dublin, Granada/Pietari lähellä rajaa) tervehdysLuentan
   hahmo-repliikki ylittää ohjeellisen ~140 merkin tavoitteen — sama poikkeama
   kuin C2:n Iason-rivillä (193 merkkiä): sanasta sanaan -sääntö on sitova,
   ~140 on vain tavoite.
6. Kaikilla kuudella on tarkistettu, lähteillä varustettu 1873-fakta. Kaikki
   kuusi tarvitsevat UUDEN kuvan Codexilta (ei yhtään valmista kuvaa
   käytettävissä) — tilausbriiffit valmiina jokaisen kaupungin omassa
   raportissa.
7. Yksikään uusi hahmo, paikka tai teema ei toista mitään C1:n, C2:n eikä
   tämän erän muiden kaupunkien hahmoa/teemaa (agentit tarkistivat tämän
   itse, ja koonti vahvisti: ei päällekkäisyyksiä).

---

# Kohtaaminen erä C3: Bukarest

Sisältökirjuri (Sonnet), 22.9.2026. Sisällöntuotantoa `docs/raportit/`-tiedostoon
Fablen tarkastettavaksi — `js/packs/kohtaamiset.js`, `js/kohtaamiskuvat-data.js`
ja `js/tyohuone-kehitys-data.js` EIVÄT ole muokattu.

## RISTIRIITATARKISTUS ENSIN

Bukarestilla on jo tarinakaari (`js/tyohuone-kehitys-data.js`, `KAARI_PAKETIT.kohteet`,
id `bukarest`). Kaaren oma `henkilo`-kenttä (rivi 1598-1599):

> "Kellonsoittaja Ana soittaa paimenen kirkon kelloa, jonka köyttä hänen
> sukunsa on vetänyt neljässä polvessa."

Kaaren kohtaaminen tapahtuu kellotornin portailla (`otsikko: 'Bukarest —
paimenen kirkonkello'`), paikkana paimenen (Bucurin) kirkko, ja kaaren oma
`kuva`-kenttä osoittaa jo staattiseen `assets/kohtaamiset/kohtaaminen-bukarest.jpg`
-tiedostoon (eri järjestelmä kuin alla käsitelty kohtaamiskuvakatalogi).

`js/kohtaamiskuvat-data.js` sisältää yhden Bukarest-rivin: id
`bukarest-ana-freskokonservointi` (rivi 460-471), hahmo **Ana**, tila
`tarkistettu`, ei `aktiivinen: false` -lippua. Kuvaus: Ana pysäyttää
siveltimensä konservoidessaan **isoäitinsä kirkon freskoja** (paikka
**Sfânta Ecaterina** -kirkko, lähde Ziarul Lumina, rivi 371-372) — eri
paikka ja eri ammatti kuin kaaren "kellonsoittaja paimenen kirkolla".

**Selvitin, onko tämä sama Ana eri kuvakonseptilla vai dokumentaatiovirhe
(kuten Budapestin "Réka" osoittautui C2:ssa vääräksi).** Kolme havaintoa
ratkaisee asian:

1. `tests/kohtaamiskuvat.test.mjs` testi "jokainen kohtaamiskuva osuu
   tarinakaaren kohteeseen ja sen hahmoon" (rivi ~100) vaatii, että
   `kuva.hahmo` esiintyy tekstissä `${kaari.henkilo} ${kaari.nimi ?? ''}`.
   Ana esiintyy kaaren `henkilo`-tekstissä ("Kellonsoittaja **Ana**
   soittaa..."), joten testi kytkee `bukarest-ana-freskokonservointi`-kuvan
   nimenomaan KAAREN Anaan — kuva menee automaattisesti kaaren omalle
   kohtaamiskortille (`kohtaamiskuvaKohteelle('bukarest')`), ei mihinkään
   myöhempään tavalliseen visaan.
2. `docs/kuvatuotanto-kohtaamiset.md` sallii nimenomaisesti ammatin ja
   paikan muuttua kuvatuotannossa: *"Hahmon ammatti, ikä, suhde toiseen
   henkilöön, kohtaamispaikka ja esittelyteksti saavat muuttua kuvan ja
   nykyhetken kohtaamisen parantamiseksi. Kysymyksen fakta ja oikea
   vastaus säilyvät."* Freskokonservointi on siis tulkittava kuvaputken
   TARKENTAMAKSI versioksi samasta Anasta (nimi ja kaupunki säilyivät),
   ei uudeksi rinnakkaiseksi hahmoksi.
3. Toisin kuin Budapestin Réka-tapauksessa, mistään dokumentista ei löydy
   erillistä, RISTIRIITAISTA kolmatta Ana-mainintaa — vain nämä kaksi
   lähdettä, jotka sopivat yhteen testin logiikan kautta.

**Johtopäätös: EI dokumentaatiovirhe.** `bukarest-ana-freskokonservointi`
on kaaren oman Anan hyväksytty, kuvatuotannossa tarkentunut kuva
(ammatti vaihtui kellonsoittajasta freskokonservaattoriksi, kirkko
paimenen kirkosta Sfânta Ecaterinaan) ja se on JO VARATTU kaaren
ensimmäiselle visalle. Se ei ole käytettävissä tälle riville, ja koska
kaaren hahmo on Ana, tämän rivin hahmo EI SAA olla Ana eikä työskennellä
kellonsoitto- tai freskonkonservointitehtävissä — sama sääntö kuin
Roomassa (kaari: Enzo suihkulähteellä / tavallinen visa: Fabrizio,
ei suihkulähdettä) ja Ateenassa C2:ssa (kaari: Dafni Akropoliksella /
tavallinen visa: Iason stadionilla).

Kirjoitin siis kokonaan uuden hahmon, uuden ammatin ja uuden paikan —
ei kirkkoa, ei kelloa, ei freskoa.

## Bukarest — katusoittaja Radu

**hahmo:** "katusoittaja Radu"
**nappi:** "Tapaa Radu"
**frame:** "Radu laskee viulun sylistään ja kysyy"

**tervehdys** (271 merkkiä, raja 280):
"Radu laskee viulun sylistään, kun Ateneumin ovet sammuvat viimeisen
kerran illaksi: \"Isoisäsi aikaan tätä taloa ei ollut edes suunniteltu —
keräsivät leun kerrallaan. Näytä että tunnet maailmaa kuten piirtäjä —
niin soitan kappaleen, jota he eivät vielä osanneet toivoa.\""

**tervehdysLuenta** (sama teksti sanasta sanaan, tagit ja ajatusviiva
lisätty, roolit vain kertoja/hahmo):
```js
[
  { rooli: 'kertoja', teksti: 'Radu laskee viulun sylistään, kun '
    + 'Ateneumin ovet sammuvat viimeisen kerran illaksi:' },
  { rooli: 'hahmo', teksti: '[curious] "Isoisäsi aikaan tätä taloa ei '
    + 'ollut edes suunniteltu — keräsivät leun kerrallaan. [warmly] '
    + 'Näytä että tunnet maailmaa kuten piirtäjä — niin soitan '
    + 'kappaleen, jota he eivät vielä osanneet toivoa."' },
]
```
(Huom: kokonaispituus ylittää ohjeellisen ~140 merkin suosituksen,
samoin kuin C2:n Iason-esimerkki (193 merkkiä) teki — sanasta sanaan
-sääntö on sitova talon sääntö, ~140 on vain tavoite, joten valitsin
täsmäävän tekstin ohjeellisen pituuden sijaan.)

**loyto** (128 merkkiä, raja 130):
"Radu avaa rasian viulunkotelon päällä koskematta kieliin: \"Löysit sen
ennen minua. Tämän kadun kolot kaikuvat isoisäsi askelia.\""

**loytoLuenta:**
```js
[
  { rooli: 'kertoja', teksti: 'Radu avaa rasian viulunkotelon päällä '
    + 'koskematta kieliin:' },
  { rooli: 'hahmo', teksti: '[softly] "Löysit sen ennen minua. [warmly] '
    + 'Tämän kadun kolot kaikuvat isoisäsi askelia."' },
]
```

**tyhja** (112 merkkiä, raja 130):
"Radu koputtaa penkin alle katsomatta: \"Tyhjä. Täällä käy iltaisin
enemmän väkeä kuin luulisi — joku ehti ensin.\""

**vaarin** (104 merkkiä, raja 130):
"Radu virittää kieltä kuuntelematta vastausta: \"Ei vielä. Sävelkin
löytyy vasta kolmannella yrityksellä.\""

**tunnetagit:**
```js
tunneTervehdys: { tunne: 'utelias', voimakkuus: 0.5 }  // Radu kiinnostuu vanhasta kirjasta kesken soiton tauon, ei vielä lämmin — sama rekisterin oletus kuin Leilalla/Iasonilla/Dubrovnikilla
tunneLoyto: { tunne: 'ilo', voimakkuus: 0.7 }
tunneTyhja: { tunne: 'miettiva', voimakkuus: 0.45 }
tunneVaarin: { tunne: 'hammentynyt', voimakkuus: 0.4 }
```

## 1873-fakta ja lähde

Bukarestin Ateneum (Ateneul Român, kaupungin tunnetuin konserttitalo
tänään) EI ollut olemassa isoisän matkan aikaan. Ateneum-seura käynnisti
rakennushankkeen virallisesti 25.2.1873 — samana vuonna kuin isoisän
matka — mutta rahaa ei ollut: seura joutui myöhemmin turvautumaan
koko kansan kattaneeseen "Dați un leu pentru Ateneu!" ("Anna leu
Ateneumille!") -keräykseen. Peruskivi muurattiin vasta 26.10.1886, ja
rakennus vihittiin käyttöön 1888 (työt jatkuivat 1897 asti). Vuonna
1873 paikalla ei siis ollut mitään rakennusta — vain hanke ja tyhjä
tontti. Tervehdys viittaa tähän epäsuorasti ("tätä taloa ei ollut edes
suunniteltu — keräsivät leun kerrallaan") paljastamatta mitään
vastausta, koska tällä rivillä ei ole erillistä tietovisakysymystä
(js/packs/kohtaamiset.js-skeemassa ei ole kysymys-kenttää; kysymykset
tulevat pelimoottorin ASKERS-koneistosta).

Lähteet (tarkistettu 22.9.2026):
- [Romanian Athenaeum – Wikipedia](https://en.wikipedia.org/wiki/Romanian_Athenaeum)
  (seura perustettu 1865, peruskivi 26.10.1886, avattu 1888, työt
  jatkuivat 1897 asti, "Dați un leu pentru Ateneu!" -keräys)
- [History special: Albert Galleron, the French architect of the
  Romanian Athenaeum – Romania Insider](https://www.romania-insider.com/history-albert-galleron-romanian-athenaeum)
  (hankkeen virallinen käynnistys 25.2.1873)

Sivuhuomio samasta hausta: Calea Victoriei, Bukarestin nykyinen
pääkatu, kantoi vielä 1873 vanhaa nimeään Podul Mogoșoaiei — nykyinen
nimi tuli vasta 1878 itsenäisyyssodan voittoparaatin jälkeen
([Calea Victoriei – Wikipedia](https://en.wikipedia.org/wiki/Calea_Victoriei)).
Tätä ei käytetty rivillä, mutta merkitään talteen mahdollista
myöhempää käyttöä varten (esim. saapumisteksti tai lehtijuttu).

## Olemassa olevat Bukarest-kuvakonseptit (ristiriitatarkistus)

- **Ana, freskokonservaattori, Sfânta Ecaterina -kirkko** —
  `js/kohtaamiskuvat-data.js` id `bukarest-ana-freskokonservointi`,
  tila `tarkistettu`, aktiivinen. **Käytössä jo** Bukarestin
  tarinakaaren omassa kohtaamisessa (kellonsoittaja Ana, `KAARI_PAKETIT`
  id `bukarest`) — ks. ristiriitatarkistus yllä. Ei käytettävissä
  tälle riville.
- Kaaren omalla `kuva`-kentällä (`assets/kohtaamiset/kohtaaminen-
  bukarest.jpg`) on lisäksi oma, erillinen staattinen kuva-asetus —
  eri järjestelmä kuin yllä oleva henkilökuvakatalogi, ei koske Radua.
- Ei valmista kuvaa katusoittaja Radulle — hahmo on kokonaan uusi
  tälle riville.

## Kuvatarve: uusi tilaus Codexille

Kumpikaan olemassa oleva kuva ei sovi (Ana on varattu kaaren omaan
kohtaamiseen, eri paikka ja ammatti). Lyhyt tilausbriiffi Fablen
tarkastettavaksi:

> **Bukarest — katusoittaja Radu.** Romanialainen mies, noin 55–65-
> vuotias, laiha ja ryhdikäs, pitkä harmaa/valkoinen parta tai
> siisti sänki, syvät nauru-/ilmeviivat. Yllään tumma vanha
> villatakki tai liivi paidan päällä, kaulahuivi, sormihansikkaat
> joissa sormenpäät auki (viulunsoittoa varten). Paikka: Bukarestin
> Ateneum-konserttitalon (Ateneul Român) porras-/pylväsjulkisivu
> illalla, valot sisältä vielä hehkuen mutta viimeiset kuulijat juuri
> poistumassa — rakennus selvästi tunnistettavissa mutta ei
> pääosassa. Kesken aidon tekemisen: istuu kolmannella tai
> neljännellä portaalla, viulu ja jousi juuri laskeutumassa sylistä
> tai polvelle, avoin viulukotelo vieressä muutamalla kolikolla,
> katse kääntyy suoraan kameraan/pelaajaan yllättyneen mutta
> utelian huvittuneena. Kaksi aikakerrosta: nykyiset kadunlaulajan
> kolikot/kolikkolaukku ja vanha, kulahtanut viulu vastapainona
> pylväikön klassiselle arkkitehtuurille. Rajaus enintään
> puolivartalo. Valo: iltahämärä, lämpimät ikkunavalot rakennuksesta
> ja katulyhdyn kylmempi valo vastavalona, pitkät varjot portailla.
> Ei kuvatekstiä, logoa eikä vesileimaa. **Ei näytetä:** rasian/kätkön
> sisältöä, mitään tekstiä nuoteissa tai kolikoissa, eikä Ateneumin
> rakennusvuotta tai muuta kysymyksen vastaukseen viittaavaa
> yksityiskohtaa (rakennus näkyy vain yleisenä maamerkkinä, ei
> kylttinä tai vuosilukuna).

Rakenne, mitat, luentasäännöt ja tunnetagien pakkokentät tarkistettu
malleista `js/packs/kohtaamiset.js` (lontoo, dubrovnik, kairo) ja
C2-raportin Ateena/Budapest-osioista. Pelaaja ei puhu missään
repliikissä (docs/tarina.md 21.9.2026 -sääntö).

---

# Kohtaaminen erä C3: Oslo

Sisältökirjuri (Sonnet), 22.9.2026. Sisällöntuotantoa `docs/raportit/`-
tiedostoon Fablen/Sisältökirjurin tarkastettavaksi — `js/packs/
kohtaamiset.js`-tiedostoa, `js/kohtaamiskuvat-data.js`-tiedostoa eikä
`js/tyohuone-kehitys-data.js`-tiedostoa ei ole muokattu.

## RISTIRIITATARKISTUS ENSIN (tehty ennen tekstiä)

Oslo on tarinakaarikaupunki (`js/tyohuone-kehitys-data.js`
`KAARI_PAKETIT`, id `oslo`, rivi ~2155), ja kaarella on jo oma
kohtaamishenkilö ja jo hyväksytty kuva:

1. **Kaaren `henkilo`-kenttä** (rivi 2242): *"Maisemakuvaaja Liv
   kiertää Gjellestadin peltoja ja Oslon harjuja ja tuntee
   maastonmuodot, joita kartta ei näytä."* Kaaren oma `kohtaaminen`-
   teksti (rivi 2244) tapahtuu pellon laidalla: Liv laskee kameransa,
   koira nykäisee talutushihnaa, ja hän kysyy kysymyksen ennen
   rajapyykille kävelyä. Aihepiiri: maisemakuvaus, pellot, harjut,
   Gjellestadin viikinkilaiva mullan alla.
2. **`js/kohtaamiskuvat-data.js` id `oslo-liv-992a171d5df6`**
   (rivi 696), hahmo `Liv`, tila `tarkistettu`, ei
   `aktiivinen: false` -lippua eli aktiivinen. Kuvan `alt`/`kuvateksti`
   (rivi 714): Liv aurinkoisella polulla, koiran talutushihna
   toisessa kädessä, kamera olkahihnassa, tausta vuono ja kaupunki.
   Tiedoston oma kommentti (rivi 702) sanoo suoraan: *"PELIIN
   12.9.2026: kaari nimeää Oslossa maisemakuvaaja Livin."* Tämä on
   siis sama Liv kuin kaaren `henkilo`-kentässä — yksi hahmo, yksi
   kuva, jo käytössä kaaren omassa kohtaamisessa.
3. **`js/packs/kohtaamiset.js`:ssä ei ole vielä `oslo`-riviä lainkaan**
   (grep `oslo` tiedostosta ei löydä osumaa) — tehtävä on siis
   kirjoittaa kaupungin ensimmäinen tavallisen visan avaus, ei
   korvata mitään.
4. Tiedoston oma rakennesääntö (rivit 1–68, erityisesti "kaarikaupungissa
   VISAKORTIN avaustekstin omistaa KAARI_PAKETIT:in oma kohtaaminen
   ENSIMMÄISELLÄ visalla") ja jo olemassa oleva esimerkki Roomasta
   (kaari: Enzo suihkulähteellä / tavallinen visa: mopokorjaaja
   Fabrizio) vahvistavat: tämän rivin hahmon on oltava kaaren Livistä
   ERI hahmo, eri ammatti, eri paikka — eikä se saa toistaa peltoja,
   harjuja eikä viikinkilaivaa, koska ne ovat jo kaaren omia.

**Johtopäätös:** Liv ja hänen kuvansa ovat varattuja kaaren
kohtaamiseen eikä niitä käytetä tällä rivillä. Kirjoitin kokonaan
uuden hahmon, latojan/kirjapainajan Halvorin, kaupunkiin (ei pellolle)
sijoittuvalla ammatilla ja aiheella, joka ei kosketa maisemakuvausta,
peltoja, harjuja eikä Gjellestadin laivaa.

## Oslo — kirjapainaja Halvor

**hahmo:** "kirjapainaja Halvor"
**nappi:** "Tapaa Halvor"
**frame:** "Halvor nostaa katseensa vanhasta ladontakoneesta ja kysyy"

**tervehdys:** "Halvor pyörittää lyijykirjainta sormissaan: \"Tämä laatikko on ladottu vielä C:llä — Christiania. Kukaan ei enää käytä sitä nimeä painossa. Näytä että tunnet maailmaa kuten piirtäjä — niin kerron, mistä laatikko oikein tuli.\"" (224 merkkiä, raja 280)

**tervehdysLuenta:**
```js
[
  { rooli: 'kertoja', teksti: 'Halvor pyörittää lyijykirjainta '
    + 'sormissaan:' },
  { rooli: 'hahmo', teksti: '[curious] "Tämä laatikko on ladottu vielä '
    + 'C:llä — Christiania. Kukaan ei enää käytä sitä nimeä painossa. '
    + '[warmly] Näytä että tunnet maailmaa kuten piirtäjä — niin '
    + 'kerron, mistä laatikko oikein tuli."' },
]
```

**loyto:** "Halvor nostaa rasian pöydän alta, sormet mustina musteesta: \"Tämä on maannut täällä kauemmin kuin olen ladonnut yhtään lehteä.\"" (127 merkkiä, raja 130)

**loytoLuenta:**
```js
[
  { rooli: 'kertoja', teksti: 'Halvor nostaa rasian pöydän alta, sormet '
    + 'mustina musteesta:' },
  { rooli: 'hahmo', teksti: '[softly] "Tämä on maannut täällä kauemmin '
    + 'kuin olen ladonnut yhtään lehteä."' },
]
```

**tyhja:** "Halvor pyyhkii kätensä rätillä: \"Tyhjä. Painoa on siivottu niin monta kertaa, ettei mikään pysy hyllyssä vuosikymmentä.\"" (120 merkkiä, raja 130)

**vaarin:** "Halvor asettaa kirjaimen takaisin laatikkoon: \"Ei vielä. Latojakin erehtyy täällä joka päivä — kokeile toista riviä.\"" (117 merkkiä, raja 130)

**tunnetagit:**
```js
tunneTervehdys: { tunne: 'utelias', voimakkuus: 0.5 }  // Halvor kiinnostuu
  // kirjan sanamuodosta heti (vanha kirjoitusasu), ei vielä lämmin —
  // sama rekisterin oletuspoikkeus kuin Leilalla/Iasonilla/Mártalla
tunneLoyto: { tunne: 'ilo', voimakkuus: 0.7 }      // pakollinen arvo, ei poikkeamaa
tunneTyhja: { tunne: 'miettiva', voimakkuus: 0.45 } // pakollinen arvo, ei poikkeamaa
tunneVaarin: { tunne: 'hammentynyt', voimakkuus: 0.4 } // pakollinen arvo, ei poikkeamaa
```

**1873-fakta ja lähde:** Isoisän matkavuonna 1873 kaupunki kirjoitettiin
vielä *Christiania* — Ch-alkuinen kirjoitusasu vaihtui *Kristiania*-
muotoon vasta vuoden 1877 valtakunnallisessa oikeinkirjoitusuudistuksessa
(silloin myös Christiansand → Kristiansand, Christiansund → Kristiansund).
Kunnallishallinto omaksui K-muodon vasta 1897, ja nykyinen nimi Oslo
otettiin käyttöön vasta 1.1.1925. Isoisän päiväkirjan "Christiania" on
siis täysin aikalaisoikea — eikä vielä "Kristiania" saati "Oslo". Tämä on
Halvorin repliikin ydin: hänen vanha lyijykirjainlaatikkonsa on ladottu
C:llä, ajalta ennen 1877. Lähteet (tarkistettu 22.9.2026, WebSearch):
[History of Oslo's name – Wikipedia](https://en.wikipedia.org/wiki/History_of_Oslo%27s_name),
[Life in Norway: The History of Oslo](https://www.lifeinnorway.net/history-of-oslo/).
(Sivuhuomio, ei käytetty tekstissä mutta tukee ympäristöä: nykyinen
Stortingin rakennus Karl Johans gatella valmistui 5.3.1866, eli oli jo
paikallaan isoisän vieraillessa 1873 — [Storting building – Wikipedia]
(https://en.wikipedia.org/wiki/Storting_building).)

**Olemassa olevat Oslo-kuvakonseptit (ristiriitatarkistus):**
- `oslo-liv-992a171d5df6` (`js/kohtaamiskuvat-data.js` rivi 696) —
  maisemakuvaaja Liv, aurinkoinen polku, koiran talutushihna, kamera,
  vuono taustalla. **Varattu kaaren omaan kohtaamiseen**, ei käytettävissä
  tälle riville.
- `docs/kuvatuotanto-kohtaamiset.md`:ssä ei ole yhtään Oslo-riviä (grep
  ei löydä osumaa "Oslo"-sanalle taulukosta).
- Ei olemassa olevaa kuvaa kirjapainaja Halvorille — hahmo on uusi.

**Kuva: tarvitaan uusi tilaus.** Lyhyt briiffi Codexille (mallina C2-
erän Ateena/Iason-tilaus):

> **Oslo — kirjapainaja Halvor.** Norjalainen mies, noin 45–55-vuotias,
> harmaantuva parransänki tai lyhyt parta, työhiontainen mutta tarkka
> olemus. Yllään tummansininen tai ruskea nahkaesiliina rullattujen
> paitahihojen päällä, sormet ja kämmenet painomusteen tummentamat.
> Paikka: pieni, moderni letterpress-käsipainamo/ladontatyöpaja Oslon
> keskustassa — avoin tiilipinta tai vanha valurautainen koneisto
> taustalla, seinällä puisia ladontalaatikoita täynnä lyijykirjaimia,
> ikkunasta hämärästi erottuva Karl Johans gaten katukuva. Kesken aidon
> tekemisen: seisoo tai nojaa ladontapöytää vasten, pitää yhtä lyijy-
> kirjainta peukalon ja etusormen välissä valoa vasten, katse käännetty
> suoraan tulijaan, ilme utelias ja hieman huvittunut. Rajaus enintään
> puolivartalo. Valo: työpajan lämmin sisävalo (volframi/hehkulamppu)
> sekoittuu ikkunasta tulevaan harmaaseen päivänvaloon, pehmeät varjot.
> Ei kuvatekstiä, logoa eikä vesileimaa. **Ei näytetä:** yksittäisen
> lyijykirjaimen kirjainmuotoa tarkasti luettavana (ettei kuva paljasta
> "C"-kirjainta etukäteen), laatikon/kätkön sisältöä, eikä mitään
> peltoa, harjua, vuonoa tai koiraa (ne kuuluvat kaaren Livin kuvaan,
> eivät tähän).

Rakenne, mitat, luentasäännöt ja tunnetagien pakkokentät tarkistettu
malleista `js/packs/kohtaamiset.js` (lontoo, dubrovnik, kairo) ja
kaksi ääntä -säännöstä `docs/tarina.md` rivi 55 ("Nuori Fogg on
pelaaja, ei ääni. Hänellä ei ole omia repliikkejä…") — luennoissa ei
ole `pelaaja`-riviä.

---

# Kohtaaminen erä C3: Tampere

Sisältökirjuri (Sonnet), 22.9.2026. Sisällöntuotantoa `docs/raportit/`-tiedostoon
Fablen/Sisältökirjurin tarkastettavaksi — EI muokattu `js/packs/kohtaamiset.js`-,
`js/kohtaamiskuvat-data.js`-, `js/tyohuone-kehitys-data.js`- eikä
`docs/kuvatuotanto-kohtaamiset.md`-tiedostoja.

## RISTIRIITATARKISTUS ENSIN

```
grep -i "Tampere" js/tyohuone-kehitys-data.js js/kohtaamiskuvat-data.js docs/kuvatuotanto-kohtaamiset.md
```

Ei yhtään osumaa kolmesta tiedostosta (grep exit-koodi 1 = ei löytynyt).
Tampere on siis puhdas kaupunki tälle tehtävälle:

- Ei tarinakaarta `js/tyohuone-kehitys-data.js`:n `KAARI_PAKETIT`-paketissa
  → ei kaaren omaa kohtaamista, jota tämä rivi voisi tuplata.
- Ei olemassa olevaa kohtaamiskuvaa/hahmokonseptia
  `js/kohtaamiskuvat-data.js`:ssä → uusi hahmo tarvitsee kokonaan uuden kuvan.
- Ei riviä `docs/kuvatuotanto-kohtaamiset.md`:ssä → ei tuotantotilaa
  tarkistettavana, ei ristiriitaa kirjattavaksi.

Ei siis kolmivaiheista ristiriitaa kuten Ateenassa (C2) — tavallinen "uusi
hahmo tyhjälle riville" -tapaus.

## Tampere — junailija Aatu

**hahmo:** `junailija Aatu`
**nappi:** `Tapaa Aatu`
**frame:** `Aatu pitää kättä junan ovella ja kysyy`

**tervehdys** (246 merkkiä, raja ~280):
> Aatu pitää kättä junan ovella ja vilkaisee kirjaasi: "Isoisäsi matkan aikaan
> tätä asemaa ei ollut olemassakaan — rata avattiin vasta kolme vuotta
> myöhemmin. Näytä että tunnet maailmaa kuten piirtäjä — niin kerron, mistä
> hän oikeasti pääsi tänne."

**tervehdysLuenta:**
```js
[
  { rooli: 'kertoja', teksti: 'Aatu pitää kättä junan ovella ja vilkaisee '
    + 'kirjaasi:' },
  { rooli: 'hahmo', teksti: '[curious] "Isoisäsi matkan aikaan tätä asemaa '
    + 'ei ollut olemassakaan — rata avattiin vasta kolme vuotta '
    + 'myöhemmin. [warmly] Näytä että tunnet maailmaa kuten piirtäjä — '
    + 'niin kerron, mistä hän oikeasti pääsi tänne."' },
]
```

**loyto** (122 merkkiä, raja ~130):
> Aatu kaivaa rasian aseman vanhasta kaapista: "Tämä on lojunut täällä
> kauemmin kuin rautatie itse. Nyt se löysi omistajan."

**loytoLuenta:**
```js
[
  { rooli: 'kertoja', teksti: 'Aatu kaivaa rasian aseman vanhasta '
    + 'kaapista:' },
  { rooli: 'hahmo', teksti: '[curious] "Tämä on lojunut täällä kauemmin '
    + 'kuin rautatie itse. [excited] Nyt se löysi omistajan."' },
]
```
(Ei `pelaaja`-riviä — docs/tarina.md 21.9.2026: nuori Fogg ei puhu missään
kohtaamisessa.)

**tyhja** (98 merkkiä, raja ~130):
> Aatu avaa tyhjän kaapin: "Tyhjä. Asemaa on remontoitu niin monesti, ettei
> mikään pysy paikallaan."

**vaarin** (80 merkkiä, raja ~130):
> Aatu vilkaisee kelloa: "Ei vielä. Juna ei lähde ilman minua — sinulla on
> aikaa."

**tunnetagit:**
```js
tunneTervehdys: { tunne: 'utelias', voimakkuus: 0.5 }  // Aatu kiinnostuu kirjasta työn lomassa juuri ennen junan lähtöä — ei vielä lämmin, rekisterin oletusarvo
tunneLoyto: { tunne: 'ilo', voimakkuus: 0.7 }
tunneTyhja: { tunne: 'miettiva', voimakkuus: 0.45 }
tunneVaarin: { tunne: 'hammentynyt', voimakkuus: 0.4 }
```
(Loyto/Tyhja/Vaarin täsmälleen rekisterin pakolliset arvot, ei poikkeamia.)

**1873-fakta ja lähde:** Kun isoisä matkusti Tampereelle vuonna 1873, kaupunkiin
ei päässyt junalla — rautatie Tampereelle (Hämeenlinna–Tampere-rata, osa
Riihimäki–Tampere-rataa) avattiin vasta **1876**, kolme vuotta isoisän matkan
jälkeen, ja silloin rakennettiin myös Tampereen ensimmäinen, puinen
asemarakennus. Isoisän olisi siis pitänyt matkustaa maa- tai vesiteitse,
esimerkiksi hevoskyydillä Hämeenlinnasta. Lähteet (tarkistettu 22.9.2026):
[Tampere Central Station – Wikipedia](https://en.wikipedia.org/wiki/Tampere_Central_Station)
("the first, wooden station building... was built in 1876 to service
traffic in the recently completed track Turku-Tampere-Hämeenlinna";
"Tampere was originally the northern terminus of the Hämeenlinna-Tampere
railway, opened in 1876"), [Riihimäki–Tampere railway – Wikipedia]
(https://en.wikipedia.org/wiki/Riihim%C3%A4ki%E2%80%93Tampere_railway)
("the line between Riihimäki and Hämeenlinna was opened in 1862... and
the line between Riihimäki and Tampere in 1876").

Kulma on tarkoituksella jotain, mitä kaupunkilehti tuskin kattaa: Tampere
tunnetaan lehdissä yleensä Finlaysonin tehtaasta ja Tammerkoskesta
(teollisuuskaupunki) — tämä kohtaaminen kääntää saman aikakauden faktan
liikennehistorian kautta ja antaa hahmolle ammatin (junailija), hetken
(juna lähdössä, ovi kädessä) ja mielipiteen (kertoo mielellään, miten
matkustajat oikeasti pääsivät perille ennen rataa) ilman että se toistaa
maamerkkilistaa.

**Kuvatarve:** Hahmo on täysin uusi, ei olemassa olevaa kuvaa tai
hahmokonseptia (ks. ristiriitatarkistus yllä) → tarvitaan uusi tilaus.
Tilausbriiffi Codexille:

> **Tampere — junailija Aatu.** Suomalainen mies, noin 45–55-vuotias,
> tanakka mutta ei lihaksikas vartalo, lyhyt harmaantuva parransänki,
> punakka kasvonväri ulkotyöstä. Yllään VR:n junailijan univormu (tummansininen
> takki tai liivi, valkoinen tai vaaleansininen paita, lippalakki tai
> virkalakki, kaulassa mahdollisesti pilli tai lippulätkä kädessä). Paikka:
> Tampereen rautatieaseman laituri, juna vieressä ovi auki, taustalla
> aseman kattorakenteet/laiturikatos ja vaaleanpunertava tai punatiilinen
> asemarakennus tunnistettavasti. Kesken aidon tekemisen: seisoo junan
> oven vieressä, toinen käsi ovenkahvassa pysäyttämässä sulkeutumista, on
> juuri kääntänyt katseensa matkustajan (kameran) kirjaan, ilme utelias ja
> hieman kiireinen — työ ei ole kokonaan unohtunut. Kaksi aikakerrosta: nykyinen
> juna ja moderni univormu lähikuvassa, taustalla hämärästi vanhan tyylinen
> asemakello tai historiallinen kylttimäinen yksityiskohta muistuttamassa
> rautatiehistoriasta. Rajaus enintään puolivartalo. Ei kuvatekstiä, logoa
> eikä vesileimaa; rasian/kätkön sisältöä tai tarkkaa sijaintia (vanha kaappi
> asemarakennuksen sisällä) ei näytetä. Valo: myöhäisiltapäivä, pilvinen tai
> puolipilvinen syyssää, tasainen pehmeä valo laiturilla, ei dramaattisia
> varjoja.

Rakenne, mitat, luentasäännöt ja tunnetagien pakkokentät tarkistettu malleista
`js/packs/kohtaamiset.js` (lontoo, dubrovnik, odessa, kairo) ja C2-erän
Ateena/Budapest-riveistä (`docs/raportit/kohtaamiset-era-c2-20260922.md`).
Kahden äänen sääntö (pelaaja ei puhu) tarkistettu `docs/tarina.md`:n
21.9.2026-linjauksesta.

---

# Kohtaaminen erä C3: Dublin

Sisältökirjuri-sessio, 22.9.2026. Sisällöntuotantoa `docs/raportit/`-tiedostoon
Fablen tarkastettavaksi — `js/packs/kohtaamiset.js`-tiedostoa **ei** ole
muokattu, samoin kuin `js/kohtaamiskuvat-data.js`- ja
`js/tyohuone-kehitys-data.js`-tiedostoja ei ole muokattu.

## RISTIRIITATARKISTUS ENSIN (tehty ennen tekstiä)

Dublinilla on jo tarinakaari, ja kaaren oma henkilö on **varattu**:

1. `js/tyohuone-kehitys-data.js` (KAARI_PAKETIT, id `'dublin'`, rivit
   833–881): kaaren `henkilo`-kenttä on *"Sillanvartija Molly kerää
   puolen pennin lantit samaan nahkakukkaroon kuin isoisoisänsä
   aikanaan"* ja kaaren oma `kohtaaminen`-kenttä ("Sillan korvassa Molly
   punnitsee lanttia sormissaan…") sekä `aarre`-kenttä ("Molly käänsi
   lanttia valossa…") ovat kokonaan Ha'penny Bridge- ja
   lantti-teemaisia. Tämä on kaupungin **kaari**kohtaaminen, ja
   `js/packs/kohtaamiset.js`:n oma rakennesääntö (rivit 140–155,
   Rooma-rivin kommentti rivillä ~441) sanoo, että kaarikaupungissa
   kaaren kohtaaminen omistaa visakortin ENSIMMÄISEN avaustekstin —
   tämän raportin rivi on kaupungin **myöhempien tavallisten visojen**
   avaus ja tarvitsee siis ERI hahmon.

2. `js/kohtaamiskuvat-data.js` sisältää **kaksi** Dublin/Molly-riviä,
   ei yhtä:
   - `dublin-molly-kassa` (rivit 30–41): hahmo Molly, ruokakaupan kassa,
     omena vierimässä — **tila `'arkisto'`**. Tehtävänannon oma huomio
     piti paikkansa: arkisto tarkoittaa tässä hylättyä/vanhentunutta
     konseptia, ei nykyistä aktiivista kuvaa.
   - `dublin-molly-hapenny` (rivit 382–393): hahmo Molly, Ha'penny
     Bridge, märkä lantti sormissa — **tila `'tarkistettu'`** (aktiivinen
     oletuksena). Tämän kuvan `kuvateksti` ("Molly punnitsee märkää
     lanttia sormissaan…") ja `hetki`-kenttä vastaavat sanasta sanaan
     kaaren omaa kohtaamistekstiä sillalla — tämä ON kaaren hyväksytty
     kuva, jo käytössä/varattu kaarikohtaamiseen.

3. `docs/kuvatuotanto-kohtaamiset.md` rivi 92 ("Dublin | Molly kurottaa
   nauraen kassahihnalla vierivän omenan perään | Runsas
   kauppaympäristö; lauttasoutajia ei näytetä | Täysikokotarkistettu;
   hyväksyntä avoin") kuvaa **kassa**-konseptin (sama kuin
   `dublin-molly-kassa`) mutta merkitsee sen tilaksi "Täysikokotarkistettu;
   hyväksyntä avoin" — tämä on **ristiriidassa** datan `tila: 'arkisto'`
   -kentän kanssa. Dokumentti on ilmeisesti jäänyt vanhaksi kirjuripäivän
   tilamerkinnäksi eikä ole päivittynyt sen jälkeen, kun kuva
   arkistoitiin `js/kohtaamiskuvat-data.js`:ssä (koodi on tuoreempi ja
   koneellisesti valvottu lähde, ks. tests/kohtaamiskuvat.test.mjs —
   dokumentti ei ole). Kummassakaan tulkinnassa kassa-kuva ei silti
   kelpaisi tälle riville, koska hahmo on joka tapauksessa Molly.

**Johtopäätös:** riippumatta kuvan tilasta, molemmat olemassa olevat
Dublin-kuvat ovat hahmoa Molly, joka on kaaren oma, varattu hahmo.
Sääntö 2 (ei kahta kohtaamishenkilöä samassa roolissa kaupungissa)
tarkoittaa, ettei Mollya — missään versiossa — voi käyttää tällä
rivillä, eikä myöskään Ha'penny Bridge -aihetta (lantit, sillan
maksu). Kirjoitin siis kokonaan uuden hahmon, ammatin, paikan ja
motiivin, ja koska kumpikaan valmis kuva ei kelpaa, myös kuva pitää
tilata uutena.

**Huomio myös yhdestä toisesta törmäyksestä:** ensimmäinen luonnokseni
käytti hevosraitiovaunu-teemaa (Dublinin ensimmäinen raitiolinja avattiin
1.2.1872, ks. tutkimus alla), mutta `js/packs/kohtaamiset.js`:n
`lissabon`-rivi (jo tiedostossa, erä C2) käyttää täsmälleen samaa
kuviota — "isoisän aikaan käveltiin vielä, raitiovaunu ei ollut vielä
avattu" (Lissabonin hevosraitiolinja avattiin 17.11.1873, kaanon
sijoittaa käynnin lokakuuhun 1873, siis juuri ennen avaamista). Kahta
peräkkäistä kaupunkia samalla "raitiovaunu tuli juuri/ei vielä" -jutulla
olisi toisteista, joten vaihdoin Dublinin kulman kokonaan toiseen
aiheeseen (vesijohto, ei liikenne) — ks. perustelu alla.

## Dublin — putkiasentaja Niamh

**hahmo:** `'putkiasentaja Niamh'`

**nappi:** `'Tapaa Niamh'`

**frame:** `'Niamh nousee kaivannosta ja kysyy'`

**tervehdys:** `'Niamh nousee avonaisesta kaivannosta ja pyyhkii kädet housuihinsa: "Isoisäsi aikaan putki oli uusi — kanavavesi vaihtui Wicklow’n vuorten veteen 1860-luvulla. Näytä että tunnet maailmaa kuten piirtäjä — niin kerron, mistä se tulee."'`
(232 merkkiä, raja 280)

**tervehdysLuenta:**
```js
[
  { rooli: 'kertoja', teksti: 'Niamh nousee avonaisesta kaivannosta ja '
    + 'pyyhkii kädet housuihinsa:' },
  { rooli: 'hahmo', teksti: '[curious] "Isoisäsi aikaan putki oli uusi '
    + '— kanavavesi vaihtui Wicklow’n vuorten veteen 1860-luvulla. '
    + '[warmly] Näytä että tunnet maailmaa kuten piirtäjä — niin '
    + 'kerron, mistä se tulee."' },
]
```
(hahmon repliikki 184 merkkiä mukaan lukien tagit — hieman yli
ohjeellisen ~140:n, samaa suuruusluokkaa kuin tuotannossa jo oleva
Ateenan Iason-rivi, 169 merkkiä; lyhyempää versiota kokeiltiin, mutta
1860-luku-fakta ei mahtunut ymmärrettävästi lyhyemmäksi ilman että
katosi olennainen kontrasti)

**loyto:** `'Niamh nostaa rasian putkikaivannon reunalta: "Tämä on maannut syvemmällä kuin yksikään putki, jota olen vaihtanut."'`
(115 merkkiä, raja 130)

**loytoLuenta:**
```js
[
  { rooli: 'kertoja', teksti: 'Niamh nostaa rasian putkikaivannon '
    + 'reunalta:' },
  { rooli: 'hahmo', teksti: '[surprised] "Tämä on maannut syvemmällä '
    + 'kuin yksikään putki, jota olen vaihtanut."' },
]
```

**tyhja:** `'Niamh kolauttaa kaivannon seinää lapiolla: "Tyhjä. Tätä katua on kaivettu auki niin monesti, ettei mikään pysy paikallaan."'`
(123 merkkiä, raja 130)

**vaarin:** `'Niamh nojaa lapioon ja pyyhkii otsaansa: "Ei vielä. Kaivanto odottaa huomennakin — putket eivät ole minnekään menossa."'`
(119 merkkiä, raja 130)

**tunnetagit:**
```js
tunneTervehdys: { tunne: 'utelias', voimakkuus: 0.5 },  // Niamh on työn touhussa ja
  // kiinnostunut kirjasta ohimennen — sama rekisterin oletus kuin
  // Leilalla/Iasonilla/Ilarialla, ei erityisen lämmin heti alusta
tunneLoyto: { tunne: 'ilo', voimakkuus: 0.7 },
tunneTyhja: { tunne: 'miettiva', voimakkuus: 0.45 },
tunneVaarin: { tunne: 'hammentynyt', voimakkuus: 0.4 },
```

**Kaksi ääntä -tarkistus:** tervehdysLuenta ja loytoLuenta käyttävät
vain rooleja `'kertoja'` ja `'hahmo'` — ei `'pelaaja'`-riviä (docs/tarina.md
21.9.2026, sitova: nuori Fogg ei puhu). Inline-tagit ([curious],
[warmly], [surprised]) ovat englanniksi (ElevenLabs-sanasto). Luennan
sanat vastaavat ruudun tervehdys/loyto-tekstiä sanasta sanaan, poikkeuksena
vain tagit ja ajatusviiva.

**Perustelu hahmolle ja paikalle:** Molly ja Ha'penny Bridge ovat
varattuja kaarelle (ks. ristiriitatarkistus). Niamh on täysin eri
hahmo, eri ammatti (vesihuoltoasentaja, ei sillanvartija), eri paikka
(katukaivanto/vesijohtolinja, ei silta) ja eri esine (vanha rautaputki,
ei lantti) — sama etäisyysperiaate kuin Roomassa (Enzo/suihkulähde vs.
Fabrizio/mopo) ja nyt myös Lissabonissa vs. tämä rivi (raitiovaunu-aihe
vaihdettu vesijohtoon törmäyksen välttämiseksi, ks. yllä).

## 1873-fakta ja lähteet

Dublinin ensimmäinen puhtaan veden hanke, Vartry-vesijärjestelmä, tuotiin
kaupunkiin Wicklow'n vuorilta 1860-luvulla ja korvasi aiemman, likaisen
kanavaveden — ennen sitä kaupunki oli riippuvainen kanavista ja kaivoista,
jotka levittivät koleraa ja lavantautia. Isoisän matkan aikaan 1873 tämä
järjestelmä oli siis vielä suhteellisen tuore parannus, ei vanha itsestäänselvyys.
Tarkkoja päivämääriä eri lähteet antavat hieman toisistaan poikkeavina
(parlamentin lupa 1861, alempi allas valmis 1863, pato/koko hanke
valmis vasta 1868 riippuen lähteestä) — siksi tervehdyksessä käytetään
varovaisesti yleistä "1860-luvulla" eikä väitetä yksittäistä vuotta,
samalla periaatteella kuin C2-erän Kööpenhamina-raportissa.

Lähteet (tarkistettu 22.9.2026):
- [Vartry Reservoir – Wikipedia](https://en.wikipedia.org/wiki/Vartry_Reservoir):
  "Between 1862 and 1868 the lower reservoir was formed by constructing
  an earthen dam across the valley of the River Vartry... The scheme
  was formally opened on 30 June 1863."
- [Vartry Catchment – East Wicklow Rivers Trust](https://www.wicklowrivers.ie/varty-catchment):
  "In 1861 Parliament passed the Dublin Waterworks Act creating the
  project to dam the River Vartry in Roundwood to form the Vartry
  Reservoir. This was completed in 1865 and was the first clean source
  of water for Dublin, replacing the canal water."

(Huom: en käyttänyt hakukoneen ehdottamaa väitettä "Dublin oli
ensimmäinen suodatetun veden kaupunki Pohjois-Euroopassa" — en löytänyt
sille alkuperäistä, tarkistettavissa olevaa lähdettä kahdesta
yrityksestä huolimatta [coastal.ie palautti 404, muut sivut eivät
toistaneet väitettä], joten jätin sen pois pelitekstistä sääntö 8:n
mukaisesti.)

## Olemassa olevat Dublin-kuvakonseptit (ristiriitatarkistus)

- `dublin-molly-kassa` — hahmo Molly, ruokakaupan kassa, tila
  `'arkisto'` (dokumentti `docs/kuvatuotanto-kohtaamiset.md` rivi 92
  väittää "Täysikokotarkistettu", mutta data on tuoreempi/koneellisesti
  valvottu totuus → ristiriita, ei kelpaa joka tapauksessa koska hahmo
  on Molly).
- `dublin-molly-hapenny` — hahmo Molly, Ha'penny Bridge, tila
  `'tarkistettu'`, **jo käytössä** kaaren omassa kohtaamisessa (kuvateksti
  vastaa kaaren tekstiä sanasta sanaan).
- Ei olemassa olevaa kuvaa putkiasentaja Niamh -hahmolle — hahmo on
  uusi tälle riville.

## Kuvatilaus Codexille

Kumpikaan valmis Dublin-kuva ei sovi (molemmat ovat varattua Mollya).
Uusi kuva tarvitaan kokonaan. Briiffi Fablen tarkastettavaksi:

> **Dublin — putkiasentaja Niamh.** Irlantilainen nainen, n. 30–40-vuotias,
> käytännölliset työvaatteet: huomioväriliivi tummansinisen/harmaan
> työhaalarin päällä, kypärä työnnetty niskaan tai pidetty kädessä,
> hiukset sidottu taakse. Kädet ja kasvot hieman likaiset aidon työn
> jäljiltä. Paikka: avattu katukaivanto/kuoppa Dublinin katukivetyksessä,
> taustalla tunnistettava Dublinin katukuva (esim. O'Connell Streetin
> suuntaan viittaava punatiilinen/kivinen 1800-luvun julkisivurivistö,
> ei tarvitse olla täysin tarkka kopio yksittäisestä rakennuksesta).
> Kesken aidon tekemisen: Niamh on juuri nousemassa kaivannosta,
> toinen käsi kaivannon reunalla, toisessa kädessä tai vieressä vanha,
> ruosteinen valurautainen vesiputken pätkä nostettuna esiin — vieressä
> nykyaikaiset työkalut (mittari, muovinen merkkilippu, kannettava
> valo) kontrastina. Kaksi aikakerrosta samassa kuvassa: vanha,
> selvästi 1800-luvun valurautaputki lähikuvassa ja moderni
> työvälineistö/kaivannon reunuskaiteet taustalla. Ilme: kääntää
> katseensa suoraan kameraan/pelaajaan, utelias puolihymy, kesken
> liikkeen (ei poseeraava). Valo/sää: harmaa, pilvinen irlantilainen
> päivänvalo, kadun kivetys hieman kostea sateen jäljiltä (ei sadetta
> itse kuvassa). Rajaus enintään puolivartalo, kaivanto ja katutaso
> näkyvissä. Ei näytetä: rasian/kätkön sisältöä tai tarkkaa sijaintia,
> ei tekstiä/logoja/vesileimoja, ei Ha'penny Bridgeä eikä mitään
> viittausta Molly-hahmoon tai lantteihin.

Rakenne, mitat, luentasäännöt ja tunnetagien pakkokentät tarkistettu
malleista `js/packs/kohtaamiset.js` (lontoo, dubrovnik, lissabon) ja
`docs/raportit/kohtaamiset-era-c2-20260922.md` (Ateena/København-osiot).
Kaksi ääntä -sääntö docs/tarina.md:n mukaisesti (pelaaja ei puhu).

---

# Kohtaaminen erä C3: Granada

Sisältökirjuri (Sonnet), 22.9.2026. Sisällöntuotantoa
`docs/raportit/`-tiedostoon Fablen/Sisältökirjurin tarkastettavaksi —
`js/packs/kohtaamiset.js`-tiedostoa EI ole muokattu, eikä myöskään
`js/tyohuone-kehitys-data.js`- tai `js/kohtaamiskuvat-data.js`-tiedostoja.

## RISTIRIITATARKISTUS ENSIN

Granada EI ole tavallinen kaupunki vaan tarinakaarikaupunki, kuten
Rooma ja Ateena.

1. **Kaaren oma kohtaaminen on jo olemassa**
   (`js/tyohuone-kehitys-data.js`, `KAARI_PAKETIT`, id `'granada'`,
   rivit 960–1024). Kaaren `henkilo`-kenttä: *"Puutarhuri Inés hoitaa
   Generalifen puutarhoja ja tuntee kastelureitit paremmin kuin niiden
   piirustukset."* Kaaren `kohtaaminen`-kenttä sijoittaa Inésin
   Generalifen puutarhaan, kärry täynnä leikkuuoksia, ja kaaren
   `kysymys` käyttää jo Alhambran nimen merkitystä ("al-hamra" =
   punainen) faktana. Kaaren `aarre`-kenttä: rasia löytyy kourun
   varresta muurin kyljestä, puutarhan omalla alueella.
2. **Kuva on jo käytössä ja varattu kaarelle.**
   `js/kohtaamiskuvat-data.js` rivit 681–694: id
   `granada-ines-e4ab59a7e815`, hahmo `Inés`, tila `tarkistettu`, ei
   `aktiivinen: false` -lippua eli aktiivinen oletuksena. Kuvaus:
   Inés pysähtyy puutarhakärryn äärelle, leikatut oksat kärryssä,
   Generalifen kanava-allas suihkuineen taustalla. Tiedoston oma
   kommentti (rivit 670–680) vahvistaa: kuva otettiin käyttöön
   12.9.2026 nimenomaan siksi, että kaari nimeää Granadassa Inésin —
   "kortilla on sama ihminen, joka kysymyksen esittää".
3. **`docs/kuvatuotanto-kohtaamiset.md`** ei sisällä yhtään
   Granada-riviä (grep tyhjä) — ei siis kolmatta, ristiriitaista
   dokumentaatiokuvausta tarkistettavana.

**Johtopäätös:** samalla logiikalla kuin Rooma (kaari: Enzo
suihkulähteellä / tavallinen visa: mopokorjaaja Fabrizio) ja Ateena
(kaari: marmorikonservaattori Dafni / tavallinen visa:
juoksuvalmentaja Iason), tämä rivi tarvitsee KOKONAAN UUDEN hahmon,
ammatin, paikan ja motiivin — ei Inés, ei Generalife, ei kastelu-
kourut, ei Alhambran nimen etymologia (se on jo kaaren oma kysymys).
Valitsin paikaksi Sacromonten flamenco-luolat, kaupunginosan jota
lehti tai kaari ei käsittele, ja hahmoksi luolaravintolan/-zambran
emännän.

## Granada — flamencoemäntä Pastora

**hahmo:** `flamencoemäntä Pastora`
**nappi:** `Tapaa Pastora`
**frame:** `Pastora pysäyttää harjan kesken lakaisun ja kysyy`

**tervehdys** (268 merkkiä, raja 280):
> "Pastora lakaisee luolan kynnystä ja pysäyttää harjan: 'Isoisäsi
> vuonna Espanjassa oli tasavalta alle kaksi vuotta — mutta zambra
> soi täällä joka ilta silloinkin. Näytä että tunnet maailmaa kuten
> piirtäjä — niin päästän sinut kuulemaan, mitä hän ei osannut
> kirjoittaa.'"

```js
tervehdys: 'Pastora lakaisee luolan kynnystä ja pysäyttää harjan: '
  + '"Isoisäsi vuonna Espanjassa oli tasavalta alle kaksi vuotta — '
  + 'mutta zambra soi täällä joka ilta silloinkin. Näytä että tunnet '
  + 'maailmaa kuten piirtäjä — niin päästän sinut kuulemaan, mitä hän '
  + 'ei osannut kirjoittaa."',
```

**tervehdysLuenta:**
```js
tervehdysLuenta: [
  { rooli: 'kertoja', teksti: 'Pastora lakaisee luolan kynnystä ja '
    + 'pysäyttää harjan:' },
  { rooli: 'hahmo', teksti: '[curious] "Isoisäsi vuonna Espanjassa oli '
    + 'tasavalta alle kaksi vuotta — mutta zambra soi täällä joka ilta '
    + 'silloinkin. [warmly] Näytä että tunnet maailmaa kuten piirtäjä '
    + '— niin päästän sinut kuulemaan, mitä hän ei osannut '
    + 'kirjoittaa."' },
],
```

**loyto** (124 merkkiä, raja 130):
```js
loyto: 'Pastora nostaa rasian kitarakotelon alta: "Tämä on täällä '
  + 'pidempään kuin zambrani. Isoäitini olisi tanssinut tälle '
  + 'illalle."',
```

**loytoLuenta:**
```js
loytoLuenta: [
  { rooli: 'kertoja', teksti: 'Pastora nostaa rasian kitarakotelon '
    + 'alta:' },
  { rooli: 'hahmo', teksti: '[softly] "Tämä on täällä pidempään kuin '
    + 'zambrani. [warmly] Isoäitini olisi tanssinut tälle illalle."' },
],
```

**tyhja** (109 merkkiä, raja 130):
```js
tyhja: 'Pastora koputtaa kalkittua seinää: "Tyhjä. Nämä seinät on '
  + 'maalattu niin monesti, ettei mikään pysy piilossa."',
```

**vaarin** (96 merkkiä, raja 130):
```js
vaarin: 'Pastora pudistaa päätään hymyillen: "Ei vielä. Kuuntele '
  + 'kitaraa vielä hetki ja mieti uudestaan."',
```

**tunnetagit:**
```js
tunneTervehdys: { tunne: 'utelias', voimakkuus: 0.5 }, // rekisterin
  // oletus: Pastora testaa tulijaa historiafaktalla kesken lakaisun,
  // ei vielä lämmin eikä haastava — sama poikkeamaton oletus kuin
  // Ilarialla/Iasonilla
tunneLoyto: { tunne: 'ilo', voimakkuus: 0.7 },
tunneTyhja: { tunne: 'miettiva', voimakkuus: 0.45 },
tunneVaarin: { tunne: 'hammentynyt', voimakkuus: 0.4 },
```

Ei `pelaaja`-rivejä kummassakaan luennassa (docs/tarina.md
21.9.2026 -sääntö: nuori Fogg ei puhu missään kohtaamisessa).
Luennat vastaavat ruututekstiä sanasta sanaan, muutoksina vain
inline-tunnetagit ([curious], [warmly], [softly] — ElevenLabs-
sanasto englanniksi) ja kertoja/hahmo-jako kaksoispisteen kohdalta.

### 1873-fakta ja lähde

11.2.1873 Espanjan ensimmäinen tasavalta (Primera República
Española) julistettiin sen jälkeen, kun kuningas Amadeo I luopui
kruunusta 10.2.1873. Tasavalta kesti vain 29.12.1874 asti — alle
kaksi vuotta, ja sen aikana oli neljä eri presidenttiä. Tämä osuu
täsmälleen isoisän matkavuoteen 1873: kun isoisä kulki Granadassa,
Espanja oli tuoreen ja epävakaan tasavallan alla, mikä antaa
luontevan, kaaresta riippumattoman historiakontrastin Pastoran
repliikkiin ("tasavalta alle kaksi vuotta — mutta zambra soi täällä
joka ilta silloinkin"). Fakta on eri aihe kuin kaaren oma kysymys
(Alhambran nimen merkitys), joten päällekkäisyyttä ei synny.

Lähde (tarkistettu WebSearch-haulla 22.9.2026): [First Spanish
Republic – Wikipedia](https://en.wikipedia.org/wiki/First_Spanish_Republic)
(Amadeon luopuminen 10.2.1873, tasavallan julistus 11.2.1873,
päättyminen 29.12.1874).

Sacromonten zambra-perinteen taustaksi (ei suoraan tekstissä
faktaväitteenä, mutta hahmon ammatin uskottavuuden tueksi): luola-
asutus ja zambra-tanssiperinne ovat 1500-luvulta, ja 1800-luvun
romanttiset matkailijat (esim. Washington Irving) tekivät perinteen
tunnetuksi laajemmin — sama vuosisata kuin isoisän oma matka. Lähde:
[Sacromonte – Wikipedia](https://en.wikipedia.org/wiki/Sacromonte),
["Zambras" in the caves of Sacromonte – Andalucia.org](https://en.andalucia.org/blog/post/zambras-in-the-caves-of-sacromonte/).

### Olemassa olevat Granada-kuvakonseptit (ristiriitatarkistus)

- `granada-ines-e4ab59a7e815` — hahmo Inés, puutarhakärry,
  Generalifen kanava-allas, tila `tarkistettu`, aktiivinen.
  **Varattu kaaren omaan kohtaamiseen** (ks. yllä) — ei käytetä
  tällä rivillä.
- Ei muita Granada-rivejä `js/kohtaamiskuvat-data.js`:ssä eikä
  `docs/kuvatuotanto-kohtaamiset.md`:ssä.
- Ei siis valmista kuvaa Pastoralle — hahmo on kokonaan uusi tälle
  riville, ja tarvitaan uusi kuvatilaus.

### Kuvatilaus Codexille

**Granada — flamencoemäntä Pastora.** Nainen, noin 50–60-vuotias,
andalusialais-romani-ulkonäkö, tumma harjaantunut iho, tumma tukka
sidottu löyhälle nutturalle jossa yksi punainen neilikka. Yllään
värikäs, kulunut puuvillamekko tai esiliina käytännön askareisiin —
EI täyttä flamencopukua (esiintymisaika on vasta illalla), hihat
käärittynä, käsivarsissa hopeisia rannerenkaita. Paikka: Sacromonten
valkoiseksi kalkitun luolatalon (cueva) kynnys, seinällä värikkäitä
maalattuja keramiikkalautasia ja pelargoneja ruukuissa, rinteellä
kaktusviikunapensaita (chumberas); taustalla laakson toisella
puolella siintää Alhambran punertavat muurit iltapäivän valossa (ei
lähikuvana, vain tunnistettava horisontissa). Kesken aidon tekemisen:
lakaisee luolan kynnystä harjalla, pysähtyy kesken liikkeen ja
kääntää katseensa suoraan kameraan, harja vielä kädessä, painonsiirto
kesken askeleen. Kaksi aikakerrosta: nykyaikainen kannettava
kaiutin ja varausvihko/kännykkä esiliinan taskussa vs. vanha kitara
nojaamassa seinään, haalistunut flamencojuliste ja vuosikymmenten
käytössä kulunut käsintehty luuta. Ilme: utelias, hieman haastava
puolihymy — testaa tulijaa ennen kuin päästää sisään. Valo:
myöhäisiltapäivän lämmin, viisto valo, pitkät varjot luolan
kynnyksellä, ei vielä sytytettyjä iltavaloja. Rajaus enintään
puolivartalo. EI NÄYTETÄ: kitarakotelon sisältöä tai rasian
tarkkaa piilopaikkaa, ei kuvatekstiä eikä logoa, ei muita
kasvoja/turisteja kuvassa.

Rakenne, mitat, luentasäännöt ja tunnetagien pakkokentät tarkistettu
malleista `js/packs/kohtaamiset.js` (rivit 1–68 rakenneselite, sekä
esimerkit `lontoo`, `dubrovnik`, `odessa`) ja C2-erän raportista
(`docs/raportit/kohtaamiset-era-c2-20260922.md`, Ateena/Iason ja
Firenze/Ilaria-osiot). Vahvistettu, ettei Pastora-hahmo, Sacromonte
tai Espanjan ensimmäinen tasavalta esiinny missään muualla pelin
Granada-sisällössä.

---

# Kohtaaminen erä C3: Pietari

Sisältökirjuri, 22.9.2026. Sisällöntuotantoa `docs/raportit/`-tiedostoon
Fablen/Sisältökirjurin tarkastettavaksi — `js/packs/kohtaamiset.js`,
`js/kohtaamiskuvat-data.js` ja `js/tyohuone-kehitys-data.js` EI ole
muokattu.

## RISTIRIITATARKISTUS ENSIN

**Kaaren Polina on varattu.** `js/tyohuone-kehitys-data.js`
(`KAARI_PAKETIT`, id `'pietari'`, otsikko "Pietari — yö väärällä
rannalla") nimeää henkilöksi "Sellisti Polina", joka kohtaa matkaajan
Vitebskin aseman hallissa ja jonka koko tarina kiertyy Nevan
avattavien siltojen ja yön ympärille (rivit 1822–1924). Kaaren oma
`kohtaaminen`-kenttä omistaa visakortin ENSIMMÄISEN avaustekstin
Pietarissa (sama sääntö kuin Rooma/Enzo, Ateena/Dafni, Sofia/Nadia) —
tätä ei siis saa toistaa tällä rivillä.

**Polinalle on jo hyväksytty tuotantokuva.** `js/kohtaamiskuvat-
data.js`, id `pietari-polina-6188e4c488db`, tila `tarkistettu`,
paikka Vitebskin aseman jugend-halli, teema yö/sillat. Tämä kuva on
kaaren oma eikä sovi tälle riville samasta syystä kuin teksti.

**Ei muita Pietari-kuvakonsepteja.** `docs/kuvatuotanto-kohtaamiset.md`
ei mainitse Pietaria lainkaan (grep tyhjä). `js/packs/kohtaamiset.js`:ssä
ei ollut ennestään `pietari`-riviä (grep tyhjä) — kaupungilla ei siis
ole vielä myöhempien tavallisten visojen avaustekstiä lainkaan.

**mykistetyt-kenttä:** kaaren `pietari`-objektin `mykistetyt: ['kohtaaminen',
'aarre']` (rivi 1830) on äänituotannon lippu, ei sisältölippu — tiedoston
oma kommentti rivillä 236 selittää: "Kohtaamisen luenta generoidaan
uudestaan (mykistetyt)". Se tarkoittaa, että näiden kahden kentän
ElevenLabs-ääni on vanhentunut/puuttuu ja generoidaan myöhemmin
uudestaan (todennäköisesti Polina-hahmon 12.9.2026 vaihdoksen takia).
Ei vaikuta tähän raporttiin eikä koske kirjoittamaani riviä, koska
kysymys on kaaren kentistä, ei myöhempien visojen kentistä.

**Johtopäätös:** koska Polina ja Vitebskin asema (yö, sillat) on
varattu kaarelle, kirjoitin KOKONAAN UUDEN hahmon, ammatin, paikan ja
motiivin — päiväsaikaan, ei Nevan sillan tai kanavan äärellä vaan
Nevski prospektin varrella olevalla Aleksandrinskan aukiolla
(nyk. Ostrovskin aukio), Katariina II:n patsaan juurella. Sama logiikka
kuin Rooma (Enzo suihkulähteellä / Fabrizio mopokorjaamo) ja Ateena
(Dafni Akropoliksella / Iason stadionilla).

## Pietari — puutarhuri Larisa

**hahmo:** "puutarhuri Larisa"
**nappi:** "Tapaa Larisa"
**frame:** "Larisa nousee ruusupenkereeltä patsaan juurella ja kysyy"

**tervehdys (272 merkkiä, raja 280):**
"Larisa nousee ruusupenkereeltä patsaan juurella ja pyyhkii mullan
käsistään: \"Keisarinna sai jalustansa vasta tänä syksynä — koko
puisto ympärillä on yhtä tuore kuin pensaani. Näytä että tunnet
maailmaa kuten piirtäjä — niin kerron, mikä ruusuista ei kestä ensi
pakkasta.\""

**tervehdysLuenta:**
```
[
  { rooli: 'kertoja', teksti: 'Larisa nousee ruusupenkereeltä patsaan '
    + 'juurella ja pyyhkii mullan käsistään:' },
  { rooli: 'hahmo', teksti: '[curious] "Keisarinna sai jalustansa '
    + 'vasta tänä syksynä — koko puisto ympärillä on yhtä tuore kuin '
    + 'pensaani. [warmly] Näytä että tunnet maailmaa kuten piirtäjä — '
    + 'niin kerron, mikä ruusuista ei kestä ensi pakkasta."' },
]
```

**loyto (124 merkkiä, raja 130):**
"Larisa kaivaa rasian penkereen juuresta: \"Arvasin, ettei pensas
kasvanut vinoon ilman syytä. Hyvä, etten repinyt sitä pois.\""

**loytoLuenta:**
```
[
  { rooli: 'kertoja', teksti: 'Larisa kaivaa rasian penkereen '
    + 'juuresta:' },
  { rooli: 'hahmo', teksti: '[softly] "Arvasin, ettei pensas kasvanut '
    + 'vinoon ilman syytä. [amused] Hyvä, etten repinyt sitä pois."' },
]
```

**tyhja (127 merkkiä, raja 130):**
"Larisa pudistaa multaa penkereeltä: \"Tyhjä. Puutarha kaivetaan
täällä joka kevät uusiksi — mikään ei pysy paikoillaan pitkään.\""

**vaarin (97 merkkiä, raja 130):**
"Larisa nojaa lapioon: \"Ei vielä. Ruusut eivät kerro salaisuuksiaan
kiireiselle — palaa huomenna.\""

**tunnetagit:**
```
tunneTervehdys: { tunne: 'utelias', voimakkuus: 0.5 }  // rekisterin oletus — Larisa toteaa faktan patsaasta ja esittää pyynnön rauhallisen asiallisesti, mullat käsissään, ei vielä lämmin eikä haastava (sama tapaus kuin Lissabonin Inês)
tunneLoyto: { tunne: 'ilo', voimakkuus: 0.7 }
tunneTyhja: { tunne: 'miettiva', voimakkuus: 0.45 }
tunneVaarin: { tunne: 'hammentynyt', voimakkuus: 0.4 }
```

**1873-fakta ja lähde:** Katariina II:n muistopatsas paljastettiin
Aleksandrinskan aukiolla (nyk. Ostrovskin aukio) Nevski prospektin
varrella, Aleksandrinski-teatterin edessä, 24.11.1873 (6.12.1873
uuden ajanlaskun mukaan) — hallitsijaperheen läsnä ollessa.
Suunnittelijana oli Mihail Mikeshin, patsaan veisti M. Tšižov ja
jalustan ympärillä olevat 1700-luvun hahmot (mm. Suvorov, Potjomkin,
Deržavin) A. Opekushin. Isoisän matkavuosi 1873 osuu siis täsmälleen
patsaan paljastusvuoteen — jos isoisä kulki Nevski prospektilla
loppuvuodesta 1873, aukio oli joko juuri valmistunut tai vielä
rakenteilla. Lähteet (tarkistettu 22.9.2026):
[Ostrovsky Square – Wikipedia](https://en.wikipedia.org/wiki/Ostrovsky_Square),
[Presidential Library: Anniversary of the grand opening of the
Monument to Catherine II](https://www.prlib.ru/en/history/619787).

Huom: puiston ruusupenkereet ja Larisan ammatti ovat pelin fiktiota
(uskottava yksityiskohta uudelle, nyk. Katariinanpuistoksi kutsutulle
aukiolle) — vain patsaan paljastuspäivä on tarkistettu historiallinen
fakta, eikä ruusuistutusten tarkkaa ajankohtaa väitetä todeksi.

**Olemassa olevat Pietari-kuvakonseptit (ristiriitatarkistus):**
- `pietari-polina-6188e4c488db` (`js/kohtaamiskuvat-data.js`, tila
  `tarkistettu`) — sellisti Polina, Vitebskin asema, yö/sillat-teema.
  **Varattu kaarelle**, ei sovi tähän riviin.
- Ei muita kuvakonsepteja: `docs/kuvatuotanto-kohtaamiset.md` ei
  mainitse Pietaria, eikä `js/kohtaamiskuvat-data.js`:ssä ole muita
  Pietari-rivejä.
- Larisalle ei ole valmista kuvaa — hahmo on kokonaan uusi.

**Kuvatarve: KYLLÄ, uusi kuvatilaus tarvitaan.**

**Kuvatilaus Codexille — Pietari, puutarhuri Larisa:**

> Nainen, noin 40–55-vuotias, venäläinen puutarhuri. Vahvarakenteinen,
> harmaantuvat hiukset kiedottu huivin alle, punakat posket
> ulkotyöstä, kädet käytännölliset ja likaiset mullasta. Yllään paksu
> villatakki tai röijy karkean puuvillapaidan päällä, esiliina
> vyötäröllä, puutarhakäsineet toisessa kädessä (vasta riisutut).
> Paikka: aukio Nevski prospektin varrella, taustalla Katariina II:n
> pronssipatsas korkealla graniittijalustalla — jalustan ympärillä
> erottuvat 1700-luvun asuiset pienoishahmot — sekä Aleksandrinski-
> teatterin klassistinen julkisivu pylväineen kauempana. Kesken aitoa
> tekemistä: polvillaan tai kyykyssä äskettäin istutetun ruusupenkereen
> vieressä, toinen käsi vielä mullassa, lapio pystyssä maassa, katse
> nousee suoraan kameraan kesken työn. Kaksi aikakerrosta: penkereen
> reunalla moderni kastelukannu tai muovinen taimilaatikko, kun taas
> patsas ja teatterin julkisivu ovat 1870-luvun uutta, kiiltävän
> tuoretta arkkitehtuuria (ei patinoitunutta, ei sammaloitunutta — aukio
> on vasta valmistunut). Ilme: rauhallisen utelias, hieman huvittunut
> keskeytyksestä, ei vielä lämmin hymy. Valo: syksyinen, viileän kirkas
> iltapäivävalo, matalat varjot ruusupenkereellä, muutama pudonnut
> lehti maassa. Rajaus enintään puolivartalo. Ei kuvatekstiä, logoa
> eikä vesileimaa; rasian tai kätkön tarkkaa sijaintia ei näytetä; ei
> Nevan siltoja eikä yötaivasta kuvassa (ne on varattu kaaren omalle
> Polina-kuvalle).

Rakenne, mitat, luentasäännöt ja tunnetagien pakkokentät tarkistettu
malleista `js/packs/kohtaamiset.js` (lontoo, dubrovnik, odessa) ja
`docs/raportit/kohtaamiset-era-c2-20260922.md` (Ateena/Iason,
Firenze/Ilaria). Kahden äänen sääntö (nuori Fogg ei puhu missään
kohtaamisessa, `docs/tarina.md` 21.9.2026) tarkistettu — luennoissa
vain roolit `kertoja` ja `hahmo`.

---

valmis
