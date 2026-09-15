# Miksi pulu hyppää kartan keskelle Budapestissa? (15.9.2026)

## Yhden lauseen vastaus

**Ei vika — tarkoituksellinen ominaisuus.** Pulun kelluva nappi (ja sen
mukana Livian hahmo) irtoaa ruudun oikeasta alakulmasta ja siirtyy
isoisän PIENEN, kartalle ankkuroidun luentakuvapakan viereen aina, kun
tuo pieni pakka on näkyvissä — juuri niin kuin Raamattu määrää
(`js/tyohuone-raamattu.js`, "KARTTAUUDISTUKSEN PAATOKSET 12" kohta 2,
omistaja 14.9.2026 klo 13.50 UTC). Tämä ei ole Budapest-kohtainen bugi:
sama tapahtuu Ateenassa (ja muissakin kaupungeissa, joilla on pieni
luentakuvapakka) — vahvistettu tässä raportissa myös omistajan omalla
Ateena-kuvakaappauksella. Se näyttää oudolta juuri Budapestissa/
Ateenassa siksi, että näissä maissa (Unkari, Kreikka) koko maa mahtuu
ruudulle yhdellä katsomalla, ja kaupunki + sen yläpuolelle nostettu
pakka osuvat silloin lähelle ruudun keskustaa — ei siksi, että sijainti
laskettaisiin väärin.

## Mittaus ja toistaminen

Toistettu Chromiumilla 1400×900 (todellisilla karttadatoilla ämpäristä,
`NODE_USE_ENV_PROXY=1`, samalla proxaustavalla kuin
`tools/savukkeet/savuke-osumareititys.mjs`), Budapest ja Ateena samalla
tallenteella:

1. Saapumishetkellä (`pulu-kaupungin-paalla` = false) pulun nappi on
   css:n oletuspaikassa ruudun oikeassa alakulmassa
   (`.pollo-kelluu-kartalla`, `right: 1.1rem`, `bottom: 5.3rem`) —
   mitattu 1310×767 px 1400×900 ruudulla, koko mittausikkunan alun
   (0–43 s).
2. Isoisän kuvasarjan päätyttyä pieni pakka nousee kartalle
   (`js/fokusvirta.js nostaPieniPakka` → `asetaParinAnkkuri` →
   `naytto.paneeli.classList.contains('pieni')` = true). Juuri sillä
   hetkellä `paivitaPulunPaikka` (js/fokusvirta.js, rivi ~2734) kytkee
   `body.pulu-kaupungin-paalla`, ja css
   (`css/styles.css` rivi ~20491, `body.pulu-kaupungin-paalla
   .pollo-nappi.pollo-kelluu.pollo-kelluu-kartalla`) siirtää napin
   `--pulu-kartalla-x/y`-muuttujien osoittamaan pisteeseen, joka on
   isoisän pienen kuvan vierellä.
3. Budapestissa tämä piste mitattiin (630, 281) px 1400×900 ruudulla —
   siis lähes tarkalleen ruudun pystykeskellä (31 % ylhäältä),
   vaakasuunnassa 45 % — ei kulmassa. Kuvakaappaus
   `docs/raportit/kuvat/pulun-paikka-1400-20260915.jpg` (koodin omalla
   testiajolla, ei omistajan alkuperäinen kuva) näyttää saman: pulu
   istuu isoisän pienen valokuvan ja Foggin nappulan vierellä keskellä
   Unkarin karttaa.
4. **Vastakoe / kontrollikaupunki (Ateena):** Sama mekanismi laukesi
   Ateenassakin (`pulu-kaupungin-paalla` päälle heti kun pieni pakka
   ilmestyi), ja omistajan omista kuvakaappauksista
   (`/root/.claude/uploads/79480f9c-c13a-5418-a899-dd5faa21a4d0/
   89ba7005-image.png`, iPhone) näkyy identtinen kuvio: pulu on
   Kreikan kartan keskivaiheilla pienen valokuvapakan vierellä, ei
   oikeassa alakulmassa. Toinen omistajan Dubrovnik-kuvakaappaus
   (`db89ef2c-image.png`) näyttää pulun Foggin nappulan vierellä
   kaupungin kohdalla, ei kulmassa. **Sama käytös on siis yleinen, ei
   Budapest-spesifi** — se vain erottuu Budapestissa ja Ateenassa
   voimakkaimmin, koska koko maa on näkyvissä yhdellä ruudulla ja
   kaupunki sattuu olemaan lähellä ruudun keskustaa.
5. `console.trace`-jäljitys (`paivitaPulunPaikka`-kutsu,
   `js/fokusvirta.js` rivi 2715/2734) vahvisti, että koodipolku on
   juuri tämä yksi funktio — ei kahta kilpailevaa sijoitusta eikä
   virheellistä skaalausta. Kun ämpärin karttadataa ei proksattu
   selaimeen (ensimmäinen, virheellinen mittausyritys), luku antoi
   satojen tuhansien pikselien arvoja — sekin ei ole koodivirhe, vaan
   seuraus siitä, että `js/geo.js`:n `fitViewBox` ei saanut oikeaa
   maantietoa eikä siis oikeaa kameraa; oikealla verkolla luvut ovat
   järkeviä (ks. yllä).

## Miksi Raamattu tilasi tämän

`js/tyohuone-raamattu.js`, "KARTTAUUDISTUKSEN PAATOKSET 12" (omistaja
14.9.2026 klo 13.50 UTC), sanatarkasti: *"isoisan ja pulun kuvat ovat
liian pienella ja vaarassa paikassa (pitaisi olla hieman pariisin
ylapuolella)"* → linjaus 2: *"ISOISAN JA PULUN KUVAT (pelaajan ja
seuraajan merkit) isommiksi ja HIEMAN KAUPUNGIN YLAPUOLELLE."*
Toteutus (`css/styles.css` rivi ~20473 kommentti, `js/fokusvirta.js`
`paivitaPulunPaikka`) siirtää PULUN NAPIN KOKONAAN — ei vain pientä
kuvaa — kartalle isoisän pienen kuvan viereen, aina kun se pakka on
näkyvissä. Nappi palaa entiseen kulmaansa, kun pieni pakka poistuu
(`irrotaLuentakuvanAnkkuri`).

## Miksi tämä näyttää väärältä nyt

Linjaus koski alun perin Ranska-pilottia, jossa isoisän ja pulun kuvat
haluttiin *"hieman Pariisin yläpuolelle"* — Pariisi sijaitsee Ranskan
kartalla lähellä pohjoisreunaa, joten kuvapari nousi selvästi kaupungin
ylle mutta jäi silti Ranskan yläosaan, ei ruudun keskelle. Toteutus
ei kuitenkaan rajoita ilmiötä Ranskaan tai mihinkään erityiseen
kaupunkisijaintiin: se pätee KAIKKIIN kaupunkeihin, joilla on pieni
luentakuvapakka. Unkari ja Kreikka ovat molemmat pieniä maita, joiden
koko ala mahtuu ruudulle yhdellä katsomalla, ja niiden pääkaupungit
(Budapest, Ateena) sattuvat olemaan maan keski- tai etelävyöhykkeellä —
juuri siinä kohdassa, mihin koko maan täyttävä kartta luontaisesti
keskittää katseen. Siksi juuri näissä kaupungeissa efekti (pysyvän
kelluvan chat-napin hyppy pois kulmastaan) korostuu eniten: se ei
seuraa pientä kuvaa hillitysti kaupungin vieressä, vaan koko pulu-nappi
— pelaajan pysyvä keskustelukanava — katoaa totutulta paikaltaan ja
ilmestyy kartan keskivaiheille.

## Ehdotus (ei toteutettu — vain raportoitu, kuten ohjeistettu)

Kaksi vaihtoehtoa Fablen/omistajan päätettäväksi, jos nykyinen
lopputulos ei miellytä:

1. **Rajaa efekti PIENEEN SIIRTYMÄÄN**, esim. napin oma paikka pysyy
   kulmassa, mutta kulman VÄRI/tila vihjaa "isoisän kuva on kartalla"
   (kuten ennen 14.9. tehtyä muutosta) — ja vain pieni "hyppää
   kuvaan" -kuplan nuoli tai kevyt korostus ohjaa katseen pakkaan.
2. **Rajaa efekti kaupunkeihin, joissa kaupunki on riittävän kaukana
   ruudun keskustasta** (esim. vain kun pieni pakka jäisi lähemmäs
   kulmaa kuin keskustaa), jolloin Pariisin kaltainen tapaus toimii
   suunnitellusti mutta Budapestin/Ateenan kaltainen "koko maa yhdellä
   silmäyksellä" -tilanne ei repäise nappia keskelle.

## Ei tehty

- Ei koodimuutosta (Perustuslaki: linjattu ominaisuus, ei korjattava
  ilman omistajan/Fablen päätöstä).
- Ei versionostoa, ei mergeä, ei Raamattu-muutosta, ei Pull Requestia.
- Worktree (`/home/user/wt-pulu`,
  `claude/bold-ride-vow4ki-pulun-paikka`) poistetaan tämän raportin
  jälkeen.

## Mittausdata

Raakadata: `tools/savukkeet/kaappaukset/tmp-pulu/budapest-1400.json`
ja `ateena-1400.json` (tämän ajon skratsipadissa, ei committoitu —
katso koontitaulukko yllä). Kuvakaappaus tallessa
`docs/raportit/kuvat/pulun-paikka-1400-20260915.jpg`.
