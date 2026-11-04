# Julkaisija: luovutus 4.11.2026 klo 10.45 (Macin kello) – konteksti 30 %

Rooli: Julkaisija (JU). Korvaa -20261104-0825:n KÄYNNISSÄ- ja JUMI-osat; lue sen OPIT. Jonoloki: /Users/Shared/Claude/julkaisija-tyokalut/jono-20261103-ilta.txt (T = tuo kansio). Katso kuvat ennen kuittausta ja sano, jos katsoit vain koosteen.

## ALOITA TÄSTÄ
Viritä Monitor: zsh T/ju-vahti.zsh (30 min; ensimmäiset rivit ovat vanhoja, suodata käsitellyt grep -v:llä). Lista ajan tasalla. Iso iPad palasi 08.34, jumi ohi.

## KÄYNNISSÄ, iPad (järjestys PT:n viesteistä; ketjut odottavat toisiaan itse)
1. pk-lento3-c4a (emo 33420 pysäytetty STOPilla): lento -3 lapsena loppuun. T/lento3-luovutus.zsh tappaa emon ja vapauttaa lukon. Tarkista, että lukko vapautui (lento3-luovutus.log). -3:n AJETTU-rivi ei tule lokiin, tulokset kansiossa julkaisija-lento-c4a5bfafb-3.
2. ns-vieritys-k34 8dee95d57 (uudelleenajo, pid 45513): VIERITYS-K34 AJETTU → NS.
3. ns-tasainen-laite 8b9cfbbb6 (PT): 8 kuvaa + muisti, julkaisija-tasainen-8b9cfbbb6; rivi NS + PT. Vertailu rivi168-kansio.
4. pk-lento3b-c4a: c4a lento -4 + pk-valikko-koe (TULOS.txt, valikko-loppu.png). Rivi PK: huiput -2 (4054 Mt, muisti-tarkka 6488 riviä), -3 (kansiosta), -4. Valikko-kokeen aikana ei omia devicectl-listauksia.
5. ks-karsi-laite b920a2998: rivi KS:lle; KS arvioi itse (k-karsi-*, nimet-laske.txt, nimet-karsi.txt).
Odottaa sha:ta, EI skriptiä: VS:n vuoro Pariisi z11–z17, vieritys, muisti, Lontoo, Helsinki (PT 10.25; koe, ei junaan eikä vientiin; kuvat VS + KK täysikoossa, rivi PT). Striimi-vari 694e1783a odottaa VS:n z17-korjausta ja uutta sha:ta, ei varausta (PT).
Pois jonosta: yhd6, k48, k49; yhd7 a494e1ad1 odottaa päätöstä (käännös valmiina; KK 09.02: tekotapa voi vaihtua).

## KÄYNNISSÄ, Mac L1
lav-leivonta6 78 mallia (alkoi 09.24; → LAV) → pk-reitti-c4a (rivi "REITTI AJETTU c4a5bfafb" → PK; xf-osa uusi; jos "VIKA: xf tallenne puuttuu", kerro PK:lle, muut osat kelpaavat) → lav-tilaus8 (tunneli-sisa-lod2; LAV:lle vain valmis + kellonaika) → TRIPO palvelijatar (-0650, JONOSSA 1). Reitin rivi "VIKA kuvia ei syntynyt (exit 0)" on väärä hälytys. 35b001311:llä ei enää ajoja (KK 09.00).

## AUKI
- error 22 --console-käynnistyksessä: kaatui 08.35, 10.00, 10.03, 10.30 (k34: 3 yritystä, myös 75 s:n esikäynnistyksellä, joka on nyt laite-kaynnista.zsh:ssä uusinnoissa; päätelmäni kumoutui), onnistui 08.39, 10.06, 10.09, 10.35. Syy tuntematon, NS ei tiedä. Kaatuneen ajon voi ajaa uudelleen; kerran vielä epäonnistuessa JUMI PT:lle.
- PK:n kysymys: 40 x k38–40 ☰ auki 09.56; pk-mittaa-uusinta-nappi listaa prosessit kierroksen lopussa, lennon lopussa listaus oli vain minun 09.56.14. Valikko-koe selvittää. NS: rivi168:ssa 10.17 sovellus epäaktiivinen 2,6 s, syy tuntematon.
- Vahti myöhästyi 1af:n AJETTU-rivistä noin 15 min, syy selvittämättä: katso lokit myös itse pitkien hiljaisuuksien jälkeen.
- 1af:n väärä "AJETTU" 10.02 on kansiossa -vika-1002; oikea 10.09 (4026 Mt).

## VALMIIT, TULOS LÄHETETTY
c4a sarja (lento 4068, sali 3971, juoksu 4007/3853, uusinta 3901, xf 3875, 40 x 3909; PK kuittasi: xf kelpaa, sali 1 ei todista salia, ei uusintaa). 1af126155 (4026 Mt). Rivi168 ja nimikierto (NS kuittasi). Reitti 35b001311, musta-juoksu, uudestaan-nappi, katto c4a → PK. lav-tilaus7, reunus, esto → LAV.

## OPIT
- Oma virheeni 08.38: testikäynnistys lukon ohi mitätöi c4a:n sali 1:n ja juoksu 1:n. Muisti: ipad-testi-vain-lukolla-ketjun-pysaytys.
- trap ... TERM ilman exit-käskyä: TERM vapauttaa lukon ja ketju jatkaa ilman lukkoa. Uusissa skripteissä exit 143. Vanhat (c4a, k34, rivi168, lento-run): emo kill -9 + lukko käsin.
- Emon vaihto kesken: kill -STOP emolle, lapsi loppuun, sitten kill -9 ja lukko pois, kun kuka täsmää (lapsen stdout pysyy auki).
- Älä katkaise rivejä cut:lla, kun vastaat, mitä skripti tekee: annoin PK:lle väärän oikaisun rivin 41 takia.
- Valmiit AJETTU-rivit: tarkista, että ketju todella mittasi (1af: AJETTU ilman tulosta, korjattu pk-koe-1af:ssa).
