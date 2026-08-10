# Opus 5 → Fable: vuorikohteiden kuvakarusellit

Haara: `claude/opus5-vuorikuvat`. Työ ei koske mainiin eikä nosta
versiota — poimi ja julkaise sinä.

**Tilanne 10.8.2026 ilta: mekanismi valmis ja käytössä.
21/52 kohdetta kuratoitu, 146 kuvaa. Loput 31 kesken — lista alla.**

Erä on julkaisukelpoinen sellaisenaan: kuratoimaton kohde toimii
täsmälleen kuten ennenkin (Wikipedian oma kuvasto), joten mitään ei
riko se, että työ on kesken.

## Tehtävä

Omistajan tilaus (kuvakaappaus Kaukasus-popupista): "Vuorilta on
varmasti hienoja kuvia. Niitä voisi lisätä jopa kymmenen. Tällaisiin
kohteisiin, samanlaisiin karuselliin, voi käydä kaikki vuorikohteet
läpi samalla tavalla ja lisätä laadukkaita kuvia."

Kohteita on 52 (`js/packs/maasto-nimet-vuoret.js`).

## Mikä mekanismi on jo olemassa

Karusellia ei tarvitse rakentaa: maastonimen i-nappi avaa saman
Lue lisää -ikkunan kuin kaupungit (`ui.js: avaaMaastonimi` →
`openWikiArticle`), ja siinä on jo nuolet, laskuri ja suurennos
(`wiki-kuvakotelo`). Kuvat tulevat `cachedGallery(title)`:sta, joka
katsoo ENSIN käsin kuratoidun listan `OMAT_GALLERIAT` ja vasta sitten
Wikipedian artikkelin kuvat. Victoria-järvi on tämän ainoa nykyinen
käyttäjä.

Vuoret saavat siis kuratoidut kuvansa samasta hanasta — oma
pakettitiedosto, ei 400 riviä lisää ui.js:ään.

## Työtapa

1. `tools/hae-vuorikuvat.mjs` kokoaa ehdokkaat Commonsin
   KATEGORIASTA (Wikidatan P373 kautta, ei nimihausta) — vain
   PD/CC-lisenssit ilman ND- ja NC-ehtoa, vähintään 1600 px leveä,
   vaakakuva, kartat ja kaaviot karsittuna. Commonsin omat laatuluokat
   (Quality/Featured/Valued) nostetaan jonon kärkeen.
2. `tools/tee-kuvataulu.py` latoo ehdokkaat yhdeksän ruudun tauluksi,
   ruutu 480 px — jokainen kuva KATSOTAAN silmällä ennen hyväksyntää.
   Työkalu ei valitse mitään.
3. Hyväksytyt kirjataan pakettiin lisenssirivin kanssa.

Kumpikaan työkalu ei tarvitse avaimia.

## PÄÄTÖSTÄ VAATIVA LÖYDÖS: peilin nimeämissääntö rikkoo kuvia

Tämä ei ollut tehtävässä, mutta se tuli vastaan heti ensimmäisessä
kuvassa, ja se on pahempi kuin miltä kuulostaa.

`turvanimi` (js/media.js) pudottaa kaiken a-z0-9:n ulkopuolisen. Siksi
**kokonaan arabialainen, kyrillinen tai kiinalainen tiedostonimi
kutistui tyhjäksi**, ja peli haki niitä kaikkia samasta osoitteesta
`kuvat/.jpg`. Ämpärissä ne ovat kirjoittuneet toistensa päälle.

Mitattu 10.8.2026: `kuvat/.jpg` (406 kt) ja `kuvat/..jpg` (512 kt)
vastaavat molemmat 200:lla ja ovat kelvollisia JPEG-kuvia. Pelaaja ei
siis näe rikkinäistä ruutua vaan **väärän valokuvan** — ja se on
näyttänyt oikealta kuvakaappauksissa koko ajan.

Osumia nykyisessä aineistossa **21 kuvaa** seitsemässä paketissa:
africa-valokuvat, asia-valokuvat, asia-lisat-valokuvat,
kulttuuri-kategoriat, maa-kategoriat, maasto-tekstit, nahtavyysjutut
(mm. Bagdadin, Odessan, Kiovan, Pietarin ja Sahalinin kuvat).

**Korjasin tämän**, koska Kaukasuksen kuvista kolmella on venäjänkielinen
nimi eikä erää voi julkaista rikkinäisenä: nimi, josta ei jää yhtään
kirjainta tai numeroa, saa perään tiivisteen alkuperäisestä nimestä
(`kuva-19cxnn5.jpg`). Latinalaiset nimet eivät muutu lainkaan, joten jo
peilatut tiedostot pysyvät paikallaan.

Sama vika toistui vielä toisessa muodossa, ja sen löysi tähän eränä
kirjoitettu testi: kiinalaisista nimistä "…玉珠峰雪山 02.jpg" ja
"…昆仑山 02.jpg" jäi jäljelle pelkkä **"02"**, joka törmäsi keskenään
JA erääseen jo pelissä olevaan ruokakuvaan (`普通腊汁肉夹馍 02.jpg`).
Yksikin näistä vuorikuvista olisi siis korvannut ämpärissä olemassa
olevan kuvan. Sääntö on nyt: nimi, josta ei jää yhtään KIRJAINTA, saa
tiivisteen — pelkkä numero on yhtä hyödytön nimi kuin tyhjä.

**Sinulle jää kaksi asiaa:**

1. **Peili on ajettava uudelleen** (`tools/peilaa-media.mjs`), jotta ne
   21 kuvaa ilmestyvät omilla nimillään. Siihen asti ne latautuvat
   Commonsista varareittiä pitkin — eli oikein, mutta hitaammin.
   Nimi vaihtuu kaikkiaan **15 tiedostolla**, joista 8 on tämän erän
   omia. Seitsemän muuta ovat nykyisiä kuvia, joiden nimeksi jäi pelkkä
   numero (`02`, `2018`, `3754`, `1910`, `2020`): asia-valokuvat,
   asia-lisat-valokuvat, kulttuuri-kategoriat, maa-kategoriat ja
   nahtavyysjutut. Ne näkyvät pelissä oikein koko ajan — vain hakupolku
   vaihtuu.
2. **Neljä törmäystä jäi korjaamatta**, koska niiden korjaus vaihtaisi
   JO PEILATTUJEN tiedostojen nimet (404 kunnes peili ajetaan). Ne ovat
   tests/media.test.mjs:n `TUNNETUT_TORMAYKSET`-listalla, ja uusi
   törmäys kaataa testin. Luokat: 90 merkin katkaisu (kaksi pitkää
   nimeä samasta teoksesta), pelkkä latinalainen häntä
   ("- panoramio"), ja pelkkä kirjainkoko ("Potemkin stairs" vs
   "Potemkin Stairs" — Commonsissa kaksi eri tiedostoa).

## Mitä koodiin muuttui

- `js/packs/vuori-valokuvat.js` (uusi) — kuratoidut kuvat avaimella.
- `js/ui.js` — `avaaMaastonimi` antaa kuratoidun listan mukaan;
  `openWikiArticle` näyttää sen HETI ennen verkkoa; kuvateksti ja
  lähderivi karusellin alle; suurennos jatkaa samasta listasta.
- `index.html`, `css/styles.css` — kuvatekstin paikka ja tyyli
  (samat luokat kuin nähtävyysjutuissa).
- `js/media.js` — yllä kuvattu nimikorjaus.
- `sw.js`, `tools/build-standalone.mjs` — uusi paketti listoille.
- `tests/vuorikuvat.test.mjs` (uusi), `tests/media.test.mjs` —
  lisenssirivin muoto, kymmenen kuvan katto, ei duplikaatteja, ei
  peilipolkujen törmäyksiä.

Testit vihreinä: 552 pass, 0 fail. **Versiota ei ole nostettu eikä
buildia ajettu** — ne kuuluvat sinulle.

## Valmiit kohteet (21)

himalaja 10, karakoram 10, kaukasus 10, alpit 10, skandit 8,
kamtshatka 8, elburz 7, japanin-alpit 7, hindukush 7, pamir 7,
tienshan 7, apenniinit 7, zagros 6, tiibetin-ylatasanko 6,
verhojansk 6, pyreneet 6, ural 5, kunlun 5, taurusvuoret 5,
lansi-ghatit 5, karpaatit 4.

Kuvamäärä vaihtelee tarkoituksella: kymmenen tuli sinne, missä oli
kymmenen upeaa kuvaa. Karpaateilla jäi neljä, koska puolet ehdokkaista
oli saman valokuvaajan VESILEIMATTUJA otoksia — ne hylättiin.

## Kesken (31)

altai, annamin-ylanko, sarawat, dinaariset-alpit, balkanvuoret,
atlas, etiopian-ylangot, drakensberg, ruwenzori, kilimanjaro,
kenia-vuori, ahaggar, tibesti, kamerunvuori, kapmaan-taittovuoret,
madagaskarin-ylanko, kalliovuoret, sierra-nevada, appalakit,
sierra-madre-occidental, sierra-madre-oriental, alaskan-vuoristo,
kaskadit, rannikkovuoret, andit, guyanan-ylanko, brasilian-ylanko,
kaakkois-australian-ylangot, suuri-vedenjakajavuoristo,
uuden-seelannin-alpit, uuden-guinean-ylangot.

Kaikilla näillä ehdokaslistat ovat valmiina
(`tools/vuorikuva-aineisto/`, ei repossa — aja `hae-vuorikuvat.mjs`).
Jatko on mekaanista: taulu → silmätarkistus → merkintä pakettiin.

## Mitä silmätarkistus on hylännyt

Nämä eivät ole teoriaa — jokainen näistä oli automaattiseulan
läpäissyt, oikein lisensoitu ehdokas, ja vain katsominen paljasti sen:

- **Vesileimat.** Karpaateilla useassa kuvassa oli valokuvaajan nimi
  poltettuna kulmaan. Kuvataulun keskirajaus PIILOTTI osan niistä,
  joten valituille tehdään vielä kokonaisen kuvan tarkistus
  (`tee-kuvataulu.py --koko`).
- **Väärä vuori.** Commonsin sarja "Province of L'Aquila in 2013" on
  kuvattu Dolomiiteilla, ei Apenniineilla. Otsikko valehteli
  suoraan — juuri siksi kategoriat tarkistetaan ja kuvat katsotaan.
- **Tuntematon paikka.** Hammondin diakuvien oma kuvaus sanoo, ettei
  kuvauspaikkaa tiedetä. Sellainen ei voi esittää "juuri sitä
  vuoristoa".
- **Ei vuorta lainkaan.** Uralin kategoriapuu oli mineraalinäytteitä ja
  kuorolaulajia, Pyreneiden leipää ja koruja, Karakoramin arkiston
  albumiaukeamia, Kamtšatkan satelliittirenderöintejä. Nämä kaikki on
  nyt seulottu koneella, mutta ne löytyivät silmällä.

## Kategoriat, jotka piti valita käsin

Wikidatan P373 osoitti tyhjään tai väärään paikkaan yhdeksällä
kohteella. Perustelut ovat koodissa (`KATEGORIA`), tässä tiivistys:
kolmella vuoristolla ei ole omaa kategoriaa lainkaan, joten tilalle
valittiin sen tunnetuin osa — Brasilian ylänkö → Serra da Mantiqueira
(kohteen oma huippu Pico da Bandeira), Guyanan ylänkö → Mount Roraima,
Apenniinit → Gran Sasso (Corno Grande). Nämä kolme kannattaa katsoa
läpi: valinta on tulkinta, ei tosiasia.
