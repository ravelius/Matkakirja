# Opus 5 → Fable: vuorikohteiden kuvakarusellit

Haara: `claude/opus5-vuorikuvat`. Työ ei koske mainiin eikä nosta
versiota — poimi ja julkaise sinä.

**Tilanne 10.8.2026 ilta: mekanismi valmis, Kaukasus kuratoitu
(pilotti 10/10 kuvaa). Loput 51 kohdetta työn alla.**

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

**Sinulle jää kaksi asiaa:**

1. **Peili on ajettava uudelleen** (`tools/peilaa-media.mjs`), jotta ne
   21 kuvaa ilmestyvät omilla nimillään. Siihen asti ne latautuvat
   Commonsista varareittiä pitkin — eli oikein, mutta hitaammin.
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

## Muistiinpanot Fablelle

- Kuusi kohdetta jäi ilman ehdokkaita ja vaatii käsin valitun
  Commons-kategorian: altai, kamtshatka, etiopian-ylangot,
  madagaskarin-ylanko, brasilian-ylanko (ei kategoriaa lainkaan) ja
  guyanan-ylanko (vain 6). Korjaan ne KATEGORIA-listaan työn edetessä.
- Silmätarkistuksessa on jo hylätty mm. Hammond-diakuvat, joiden oma
  kuvaus sanoo sijainnin olevan tuntematon — ne eivät täytä sääntöä
  "kuvan pitää esittää juuri sitä vuoristoa".
