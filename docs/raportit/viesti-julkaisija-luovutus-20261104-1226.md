# Julkaisija: luovutus 4.11.2026 klo 12.26 (Macin kello) – konteksti 28 %

Rooli: Julkaisija (JU). Korvaa -20261104-1045:n KÄYNNISSÄ- ja AUKI-osat; lue sen OPIT. Jonoloki: /Users/Shared/Claude/julkaisija-tyokalut/jono-20261103-ilta.txt (T = tuo kansio), viimeiset rivit ovat ajan tasalla. Katso kuvat ennen kuittausta ja sano, jos katsoit vain osan.

## ALOITA TÄSTÄ
Viritä Monitor: zsh T/ju-vahti.zsh (30 min; lista ajan tasalla, ensimmäiset rivit vanhoja). Listamuutos tulee voimaan vasta uudelleenvirityksellä.

## KÄYNNISSÄ, iPad (ketjut odottavat toisiaan)
1. pk-syy-e65 e65d4a4ef (pid 76391, alkoi 12.18): uusinta-nappi 1 40. Rivi "pk-syy AJETTU" → PK kansion kanssa; PK tulkitsee `valikko avattu` -rivit.
2. vs-muisti-ketju (T/vs-muisti-ketju.log): sk-muisti-z10 ensin 7f64cd657 (käännös valmis), sitten kerran c4a5bfafb. Kansiot lokit/julkaisija-muisti-z10-<sha>. Tulos VS + PT: pysyikö alle 4080 Mt.

Ehdollinen: kun 7f64cd657 pysyy alle 4080 Mt, PT sallii sk-striimi-loput (_tyo/linssiseppa2/pariisi-tyyli/striimi, Lontoo/Helsinki/Innsbruck; kansio julkaisija-striimi-loput-<sha>, skripti ei vielä tehty, mallina T/vs-muisti-z10.zsh). Ennen sitä ei ajeta.

## KÄYNNISSÄ, Mac
L1: lav-leivonta6 78 mallia (alkoi 09.24; → LAV) → pk-reitti-c4a (REITTI AJETTU → PK) → lav-tilaus8 (→ LAV: valmis + kello) → pk-viivat (VIIVAT AJETTU → PK) → TRIPO palvelijatar (-0650, jonossa 1). L2: PK:lle annettu esikatseluvuoro d3b0ddad9 (ajaa itse, rivi kun valmis).

## MUISTISSA, EI AJOA NYT
- PT: kun striimi-varista ja Karsista tehdään yhdistelmä, ajoon mukaan _tyo/karttaseppa/sk-karsi-koe-2.txt; tulos KS.
- NUI: seuraavaan yhdistelmä- tai kuva-ajoon `ui tarina viimeinen-keisari` (10 s auki) + muistivahti 4080 Mt; rivi PT + NUI: huippu ja kansio. Ei z10-kokeisiin.
- PT/KK 11.3x: kartan iPad-ajot vain striimi-varin pohjalta tai PT:n/KK:n perustelemana; vanhan piirroksen ajot pois. yhd7 a494e1ad1 ei ajoon, käännöksen saa siivota tilan tarvitessa. Vieritys-tasainen peruttu.

## AUKI
- error 22 --console-käynnistyksessä: juurisyy tuntematon, PT tietää. Tänään 06.59, 08.35, 10.00, 10.03, 10.30, 11.33, 11.41. Sarjat ovat 3/3 eivätkä sekoitu. Diag 11.38 (lokit/julkaisija-error22-diag-1137): rungolla kaikki muunnelmat ok. 11.41 ja 11.43 sama --console heti kaatuneen perään meni läpi e4180:llä, mutta 11.46 esisarjakin meni läpi ensi yrityksellä: päätelmä "vika esisarjassa" kumoutui, oikaisu PT:lle. laite-kaynnista.zsh yrittää nyt kaatuneen perään ilman esisarjaa ja kirjaa "käynnistys ok ilman esikäynnistystä", koskaan vielä ajamatta kaatumista vasten: seuraa.
- Striimi e4180ac69: muisti VIKA z9 → z10, kuoli 5120 Mt 11.59; VS löysi syyn (siirtymäalueen kerroin 4, on myös junan rungossa), korjaus 7f64cd657.

## VALMIIT, TULOS LÄHETETTY
k34 8dee95d57 ja tasainen 8b9cfbbb6 (10/10, 3330 Mt) → NS. Lennot c4a -2/-3/-4 (4054/3931/3947 Mt) + valikko-koe (ei avannut ☰:ta) → PK. Karsi b920a2998 (3285 Mt) → KS. Striimi 9/17 kuvaa + vieritys 6/6 (3282 Mt) → VS, NS; KK:lle PT:n rivillä.

## OPIT
- kill -0 onnistuu zombiin: STOPilla pysäytetyn emon lapsi jää zombiksi, ja siihen odottava silmukka ei pääty (lento3-luovutus 10.45). Tapa emo.
- Ketjut, jotka odottavat toisen ketjun pid:tä: jos odotettava peruutetaan, lukosta tulee kilpailu. STOP seuraajalle tai uudelleenkäynnistys.
- Rungoissa ilman `koealue tila` -komentoa vierityksen VIKA-rivi on väärä hälytys ("tuntematon koealue tila").
- zsh lukee ajossa olevan skriptin vanhan inoden: sed -i tai os.replace ei muuta käynnissä olevaa ketjua, käynnistä uudelleen ennen ajoa.
- Kun rooli pyytää ajoa, tarkista PT:n linjat: VS:n pyyntö oli ristiriidassa kahden kanssa; kysy PT:ltä.
