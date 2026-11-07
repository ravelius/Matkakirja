# Julkaisija: luovutus 7.11.2026 klo 20.40 (korvaa -1803:n; sen ja -1700/-1628:n OPIT, SÄÄNNÖT ja YÖN SÄÄNNÖT voimassa)

Rooli: JU. T = /Users/Shared/Claude/julkaisija-tyokalut, P = /Users/Shared/Claude/proto-3d, jonoloki T/jono-20261103-ilta.txt.

## ALOITA: Monitor jonolokiin (tail -n 0 -F, grep 'AJO |VIKA|runko takaisin|ALKOI|SEIS|JONOSSA|PERUTTU|KORJAUS|vahtikytkin|skripti loppui|sarja loppui', 30 min), sitten ps pideistä ja tail jonolokista: mitä jäi kuittaamatta. Kaikki on nohupilla.

## JONO (kuittaus tilaajalle: kuvat, md5, samat kuvat nimeten, aika; älä arvioi)
- VS vyö-sarja pid 72442 (T/vs-vyo-eikons2-jonossa.zsh), iPad ilman konsolia, vahti päällä, jonorivit "VS vyo-eikons": 72e257a0b VALMIS 20.32 (2/2, huippu 4016, 1 VIKA-lähetys; kansio lokit/linssiseppa2-vyo-72e257a0b-eikons-2), 73c744f37 ajossa (-eikons-2), sitten 72e257a0b (-eikons-3). KOKO SARJA KUITTAAMATTA VS:lle: kuittaa yhdellä viestillä, kun "VS vyo-eikons sarja loppui". md5:t ja kuvien ajat mukaan. Jos sama sarja katkeaa vahtiin: ei uusintaa.
- NS pariisi-muisti 0b a04bdb753 pid 6474 (T/ns-pariisi-muisti-0b.zsh): kehityskäännös L1 ajossa, iPad-ajo 72442:n jälkeen, VAHTI POIS vain tässä (nykyinen ajo.zsh hoitaa), 30 min, loki T/ns-pariisi-muisti-0b.log, kansio lokit/natiiviseppa-pariisi-muisti-0 (vanha nimetään -0-vahti). Kuittaus NS:lle: AJETTU-rivi, kuvia, snapit, skriptin rivi "VAHTI palautettu: paalla". Jos rivi puuttuu, kääre lähettää kytkimen itse (jonorivi "vahtikytkin takaisin JU:n varmistus"): varmista listauksesta. NS kertoi 20.3x: ajo.zsh päivitetty, käännös ennallaan.
- NS katot koe11 901e4004b pid 24128, L1 alkoi 20.38, 3 kuvaa t11-uusi-*, lokit/natiiviseppa-katot-koe11. Kuittaus NS:lle kuten koe10: palat-rivit, palat 0 -rivit, lähin korkeus; älä arvioi.
- LAV s4d: Lavastaja ajaa itse aja-s4d.zsh 2 901e4004b; annoin ESIKATSELU NYT L2 klo 20.3x. LAV lähettää rivin, kun valmis. Ei vientiä, ei iPadia.

## ODOTTAA SANAA
- .appit lokit/julkaisija-laite-218-*: 7fc20c516 pois NUI:n sanalla. VS:n 72e257a0b, 73c744f37 ja 901e4004b sekä NS:n f1c6111a8, a04bdb753 säilyvät, kunnes tilaaja sanoo. 02a6cc1dd ja 84deb0978 jo poistettu VS:n sanalla.
- Juna 220: julkaisija/juna-220 = 901e4004b. OMISTAJA 19.52 (PT): julkaistaan vasta hänen pyynnöstään, ei vientiä TestFlightiin, ei PT:nkään rivillä. Junan iPhone-tarkistus (85° → 45° Pariisin yllä, hyppy kamerassa; rivi PT:lle ja NS:lle) ennallaan, ei erillistä ajoa ennen käännöstä.

## AAMU 8.11.: tarkista /Users/Shared/Claude/_levy/simu-yosiivous-20261108.log: ajo tapahtui ja "iPad-välimuisti" -rivi. Rivi PT:lle. Yöajon ajaa Claude-ajastus matkakirja-simu-yosiivous.

## VALMISTA TÄLLÄ VUOROLLA (kuitattu)
LAV saanto2, s2b, s3, s3-uusinta, s4, s4b; VS film11-verrokki (SEIS 4089), film11-pois, hyppy-korjaus, vyö-verrokki, vyö ilman konsolia (korjaus 73c, verrokki 901e; VS: uutta verrokkia ei tarvita), nappula-syy 901e/73c/72e; NS koe2-koe10, pariisi-muisti ajo 0 (ei tulosta: vahti-VIKA 4313 Mt) ja ajo 1 (8/8, 4037 Mt); KS pihapuut; NUI elämä 10; PK T7→NAS-siirto; PR 6486 mainissa fe02a7b24.
Levy: PT kuittasi raportin, EI LISÄSIIRTOJA T7:lle (96 %). Library-b7 ja app-jako linkkeinä, c1a30e11f natiivi-backupissa haarassa julkaisija/yhdistelma-218-c1a30e11f. Levy 165 Gi 20.38.

## OPIT
- iPad --console-käynnistys: error 22 (CoreDeviceError 10002) tuli korjauksella 6/6 ja verrokilla 1/2, syy ei selvinnyt; 90 s väli ja 5 min lepo eivät auttaneet. Ilman konsolia nousee: T/ipad-skenaario-eikons.zsh ja T/vs-vyo-eikons.zsh <sha> <kansio> <nimi> (merkit kellonajoin, lokit aikaleimoineen, jäämät VANHA-EI-TASTA-AJOSTA-, odotus 65 s). T/ipad-skenaario-f1.zsh yrittää nyt 3 kertaa (KAYNNISTYS_VALI, oletus 20 s) ja antaa VIKA eikä aja tyhjää.
- Vanha mallipohja: jos käynnistys ei onnistu, muisti-tarkka.log on EDELLISEN ajon jäämä: tarkista aika ennen huipun kuittausta.
- VIKA-lähetys ei tarkoita, että komento jäi lähtemättä: verrokin 1. kierto lähti VIKA-rivistä huolimatta (VS kehysajoista). Kuittaa fakta, älä päättele.
- Pidätys iPadille: tyhjä lukkokansio /tmp/matkakirja-ipad.lukko + kuka; odottava skripti pysyy until mkdir -silmukassa. Muista vapauttaa.
- Kääre, jossa ajossa on kaksi esikatselua, vapauttaa linjan välissä: toinen ajo voi livahtaa väliin, lukko sarjoittaa ne, ei vika.
- zsh: glob ilman osumaa keskeyttää for-silmukan koko komentorivin; käytä (N) tai erillistä komentoa. "$F:refs" -> ${F}.

## Nollaus: tämä luovutus + "LUOVUTUS VALMIS <sha>" Postivahdille.
