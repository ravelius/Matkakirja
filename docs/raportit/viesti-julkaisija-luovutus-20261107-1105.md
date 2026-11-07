# Julkaisija: luovutus 7.11.2026 klo 11.05

Rooli: JU. T = /Users/Shared/Claude/julkaisija-tyokalut, P = /Users/Shared/Claude/proto-3d, jonoloki T/jono-20261103-ilta.txt. Korvaa -1000, mutta sen OPIT ja MALLIT sekä -0450:n ja -0750:n OPIT ja YÖN SÄÄNNÖT ovat voimassa. Id:t: osoitekirja.

## ALOITA: jonolokin häntä, ps ja Monitor (tail -n 0 -F, grep 'AJO |VIKA|runko takaisin|ALKOI|SEIS', 30 min)
Kaikki alla on irrotettu nohupilla, joten ne selviävät nollauksesta; tarkista silti pid:t. Kuolleesta iPad-ajosta: runko ja kytkin ensin, oma vanha lukko pois, rivi tilaajalle ja PT:lle, ei uusintaa ilman sanaa.

## KÄYNNISSÄ JA JONOSSA (kuittaus tilaajalle jokaisesta; tarkista kuvat ja md5, älä arvioi)
L2-jono:
- NUI lahtokysymys 4 ajettu 11.02, 5 käynnissä: T/nui-lahto45-jonossa.zsh, lokit natiivi-ui-lahtokysymys-{4-maksu,5-raketti}-cbae3153f. EI VIELÄ KUITATTU NUI:lle: kansiot, loki.txt-polut, sha.
- NUI lahtokysymys 6: T/nui-lahto6-jonossa.zsh pid 79750: simukäännös master + cbae3153f L2, sitten iPad-simu (todistusajo --laite ipad). Kerro NUI:lle todellinen sha ja että ajo oli simu, koska oikean iPadin kosketustyökalua ei ole.
- NS vara a89993465: T/ns-vara-jonossa.zsh pid 91199, 3 Mac-ajoa, lokit natiiviseppa-vara-{verrokki,estetty,kytkin}. Kuittaus NS:lle.
L1:
- VS kivisivu14 dc4b1c69c laitekäännös, ks. iPad.
iPad-jono (järjestys pidien varassa):
1. PK i4 cbfb96542 käynnissä: T/pk-i3-i4-jonossa.zsh pid 69901 + pk-lontoo-i4-ajo.zsh, loki T/pk-lontoo-i4.log, kansio lokit/pelikoodari-lontoo-i4-cbfb96542. Kuittaus PK:lle, lukemia ei tulkita.
2. NUI iPad 4 ja 5 cbae3153f: T/nui-ipad-ajot.zsh pid 84586, kansiot natiivi-ui-lahtokysymys-{4,5}-ipad-cbae3153f. Kuittaus NUI:lle.
3. NS lz1-2, lz3-2 dd3a2e10f: T/ns-ipad2-ajot.zsh pid 88232, kansiot natiiviseppa-lahizoomi-ipad/lz1-2, lz3-2. Tarkistaa palat, seis myös "talot tila: palat 0". Kuittaus NS:lle.
4. VS kivisivu14: T/vs-kivisivu14-ipad.zsh pid 6894, vahti pois vain tässä, kansio linssiseppa2-kivisivu14-ipad-dc4b1c69c. Kuittaus VS:lle: huippu muisti-tarkka.logista, kaatuminen, kuvat.

## KUITATTU TÄLLÄ VUOROLLA
KS sade uusinta (PT:n sana), KS muisti 5488bdd8b (vahti laukesi, 0/3, tulos), NS Mac lähizoomi 4/4, NS esittely, NS lz1 ja lz3 (ilman taloja, NS:n skenaariovika), PK i1, i2, i3, VS kivisivu10-13, LAV testit ja v115pala2, NUI lahtokysymys-3.
Perutut: NS pallo Mac ja pallo-google (omistaja 10.49), KS 876f7fd14.
PT:n päätös: koejuuri-kivisivu2 ja koejuuri-v115pala jäävät iPadille seuraavaan sovelluksen poistoon, ei erillistä poistoa.

## LEVY
31 Gi 11.00. Yli 12 h lokit T7:lle 10.55 (T/siirto-12h-20261107.py) ja julkaisija-kivet-juuri 11.00 (T/siirto-kivet-juuri.py), linkit jäävät. PT: älä poista mitään; alle 30 Gi rivi PT:lle.

## OPIT TÄLTÄ VUOROLTA
- Lue iPad-skenaario ennen ajoa: paljas `kuva X` ei tallenna kuvaa (tarvitaan `komento kuva X`), `oleta-uusi` ohitetaan, ja peräkkäiset samantyyppiset rivit (komento, ui, peli) voivat kirjoittaa toistensa päälle: väliin odota 3. Kerro tilaajalle, korjaus heille.
- Älä muokkaa käynnissä olevaa zsh-skriptiä. Odottavan voi kaataa (kill oma pid, ennen trapia) ja käynnistää uudelleen; ajossa olevan lopetus omalla vahdilla, joka lähettää TERMin tulosrivin jälkeen (T/ns-ketju-lz3-loppu.zsh).
- Muistivahdin VIKA-grep: 'VIKA muisti', ei 'muistivahti.*VIKA' (osuu otsikkoriville VIKA-raja).
- Kuolleen ajon kansio pitää siirtää ennen uusintaa: vanha konsoli.txt:n App terminated laukaisisi seis-ehdon heti.
- Kuvattoman skenaarion jonorivi "VIKA" (kivisivu11) ei ole vika: tee video T/../tallenne-video.sh:lla. "videoita 37" oli laskuvirhe, käytä find.
- proto-kaanna.sh yhdistää masteriin: simukäännöksen sha on eri kuin tilattu, kerro tilaajalle.
- Turvatarkistus esti rmdir-rivin yhdistelmäkomennossa. Tyhjä kansio lokit/karttaseppa-talot-muisti-b8-876f7fd14 jäi paikalleen, harmiton; ei uutta yritystä.
