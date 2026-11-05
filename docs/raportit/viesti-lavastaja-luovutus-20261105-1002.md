# Lavastajan luovutus 5.11.2026 10.02 — LUE TÄMÄ, sitten muuri/KORJAUS.md loppu

Korvaa -0940:n. Yhä auki vanhoista: uusi muuriosa tummempi, terassi-v1b, portaat, 弘义阁-palkki. Yötila: TF ja viennit vain omistajan pyynnöstä, JU:n kautta. Ei vientejä tehty. Y = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri/yleinen.

## 1. Levyt (PT 09.50: leivonta, sitten kuvapari)
KÄYNNISSÄ: Y/levyt/leivo_levyt.zsh, juuri katot-v125/koejuuri-levyt (= koejuuri-rungolle + v115_korjaa.py). 20 palaa, 2,5-3 min/pala, odottaa JU:n käännöslukkoa ja muita Blendereitä. Pid Y/levyt/leivo_levyt.pid (irti ohjelmasta), loki leivo_levyt.log, loppurivi LEIVONTA VALMIS, palat Y/levyt/leivottu. Jos kuoli: python3 -I Y/levyt/kaynnista_leivo.py jatkaa valmiista paloista. Tarkista ajossa myös, että kk-tausta-1-2:lla on valo_rgbm (katto_takaisin erota -vaihe).
SEURAAVAKSI: 1) Kuvapari koejuuri-levyt vs koejuuri-rungolle samalta kameralta, kohde kokonaan: 中正殿 (levy y 1,7), 四神祠, 碧螺亭, 储秀宫:n juova, katon kultapalat taivaalla, runko 980bb115c (mallit palat/irto/aja.zsh ja sk-*.txt), JU:n vuorolla; kuvat ensin PT:lle. 2) Tarkista reiät, valon muutos koko alueella (koko leivonta, ei rako_valoa) ja jääneet viat. Levy-koe ei ole kk2r:n päällä: kk2r on omalla juurellaan. Yhdistäminen ratkaistava ennen vientiä: kk2r korjaa samoja laattoja eri keinolla (ks. kohta 2). 3) LOD1/2 korjaamatta; katso, näkyykö levy niissä.
v115_korjaa.py jätti soluja ennalleen (jatetty_ettei_reikaa), joten kaikki väärät pinnat eivät poistu. Tuloste paloittain vain ajossa; poistot v115-korjattu/*-poistot.json.

## 2. Kk2r, 23 paria (Y/kk2r/kuvat-980)
Itse katsottu täysikoossa: terassi, alku, h04, h07, arkki 110yla, 110ala, 80yla, 80ala, m15yla, m15ala. Sonnet-agentti katsoi (en itse): h01, h02, h03, h03b, h05, h06, kaide-kauko, kaide-kauko-lod1, kaide-lahi, kaide-lahi-lod1, taihemen, taihemen-lod0, terassi-lod1. Arkki-ala/yla 6 paria agentti ei saanut auki, ne katsoin itse.
Tulos: selvä parannus. 80ala ja 80yla: irtolaatta ja sen kiilavarjot poissa; 110yla: laatat ja varjot poissa; 110ala: friisi näkyy nyt seinällä, verrokissa seinä peitti sen; m15yla: valkea aukio tasaantui, vaalea vyö pois (myös agentin kaide-lahi, kaide-kauko, h03b).
Tarkistamatta: 110ala friisin alareuna sahalaitainen (kk2r); m15yla oikealla terassi (x 1060-1280, y 190-300) on eri muotoinen; agentin rivit h05 pieni tumma laikku maljakon vieressä ja kaide-kauko valkoisia pilkkuja lattiassa. Ylempi tumma vyö: ei erikseen vahvistettu.
h07:n leijuvat puut EIVÄT johdu kk2r:stä: 4.11. ajossa ne olivat verrokissa, 980-ajossa kk2r:ssä, puukortit samat tiedostoissa. Latausjärjestys tai LOD ajossa, syy auki; vaikuttaa kukkulaan. Rivi PK:lle, jos toistuu.

## 3. Irto ja ovikohdat
PK:n kohdat eivät korjaudu levyillä: 房子26 ja 弘义阁 ennallaan, 房子11 y 0,37 234 → 186 m². Irto-työhön; 弘义阁 y 0,81 ja 房子11 y 0,31, y 0 lisättävä listaan harkiten (y 0 voi olla oikea maa). Räystäät useammalta kameralta: PT:n kohta 3, tekemättä (Y/palat/irto, -ylos katsomatta).

## Poikkeamat
glb_tiivista.py korjattu (valo*-kuva jää, jos UV1 on). Leivonta 20 palalle eikä 1-2:lle; PT:lle kerrottu 09.5x, sen vastausta ei ollut vielä tätä kirjoittaessa.
