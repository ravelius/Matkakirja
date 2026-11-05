# Natiivisepän luovutus 5.11.2026 klo 07.12 (konteksti 26 %, pehmeä raja, 7.37)

Korvaa luovutuksen -2243. Id:t: /Users/Shared/Claude/osoitekirja.md. Cron Unity-beeta: luo uudelleen ("4 9 * * *", muisti unity67-paivitysseuranta). Vuoro aina JU:lta.
Luovutushaara natiiviseppa-luovutus-2052 (PR 6215), työpuu /Users/Shared/Claude/wt/natiiviseppa-luovutus-2052. Python, jossa numpy ja PIL: /opt/homebrew/bin/python3 (numpy ei löydy -I-valitsimella).

## LISÄYS 5.11. 12.0x: LUE ENSIMMÄISENÄ, nämä ovat auki
**1) Pariisin aloituslento, osa B (Raamattu 2.210):** kamera, palat ja korkeusraja ennen kaaren lukitsemista; NUI hoitaa ajoituksen; D2:n kartan siirto tarvittaessa. Suunnitelma /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261105-pariisin-aloituslento.md. Ei iPad-ajoja eikä muistimittausta ennen valmista (2.207, 2.209).
- **Pohja julkaisija/pariisi-219 99035b765** (kääntyy, JU; runko 0a353e6d0 + ebc8ce01e + 694e1783a + e4180ac69; Striimi päällä, Pariisin piirros pois). PT: VS 9afad1ef6 ei tule mukaan, koska se toisi Euroopan korjaukset oletuksena. Osa B tämän päälle.
- Laskelma ja toteutusehdotus: /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/aloituslento/osa-b.md (korkeus noin 6,6–7,9 km suoralla katseella, ei ajettu). Kaarta ei ole lukittu.
- Odottaa: JU:n Mac-vuoro kuviin (pyydetty). Kuvista kaaren korkeus, kallistus ja se, näkyvätkö talot. Sitten koodi omaan haaraan.

**2) T7 → NAS 2. erä, osa 2 (Karttaseppä, 36 kohdetta, 328,7 Gi):** kopiointi alkoi 11.31 (kopioi.py /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/t7-nas-2era/, lukko /tmp/matkakirja-t7-nas-2era.lukko). Luettelo docs/raportit/t7-nas-2era-osa2-luettelo-20261105.txt tässä haarassa.
- Tarkista ensin, onko ajo käynnissä: jos lukko on olemassa, odota. Jos ei ole ja tasmays.json:n kohteita ei ole 36 tai ok ei ole true: aja `nice -n 15 python3 -I .../t7-nas-2era/kopioi.py` taustalle; se jatkaa turvallisesti.
- Täsmäyksen jälkeen pyydä PT:ltä poistolupa rivillä: kohteet, tiedostot, Gi, erot. Mitään ei poisteta ennen sitä. Poistotyökalu: kopioi osa1/poista.py osa2:een ja vaihda luettelo, lähteiden määrä 36, SALLITUT Matkakirja-karttaseppaan ja poikkeukset pois; korjattu tyhjän kansion vertailu on jo siinä. Osa 1:n tiedot: osa1/.
- Osa 1 valmis: 2493 lähdettä ja 2400 linkkiä poistettu, T7 138 → 330 Gi. Jäivät T7:lle (PT): _valmiit/olavinlinna-blender-v26 ja proto-lokit/olavinlinna-tila.txt linkkeineen.
- Eivät kuulu erään (PT): tunnistamaton 100,8 Gi ja Soniss 130,6 Gi, ei ratkaista tänään.

## LISÄYS 5.11. 11.00: korvaa alla olevat TYÖ 2:n ja "ei kosketa" -kohdat
**Tämä sessio on Natiiviseppä, vaikka kansio on Matkakirja-3d-selvittaja** (osoitekirja). Omistaja 10.38, 10.52 ja 10.55 (Raamattu 2.208 ja 2.209):
- SEIS, kunnes juoksupeli ja Pariisi ovat valmiit: muistin kevennys, testinäkymän ja muistivahdin jatkotyöt, elävä kartta, maakuntarajat ja mäet, nostot ja zoomaus muihin kaupunkeihin. Juoksupelissä ja Pariisin kartassa ei iPad-ajoja, muistimittauksia eikä toistosarjoja.
- JATKUU: levytilan vapautus (T7 → NAS 2. erä roolien vahvistusten mukaan) ja 12.0x:n lisäyksen aloituslento. PT 11.1x: Pariisin kartta on VS:llä, zoom ja reunat eivät ole enää minun työni. Tunnistamaton 100,8 Gi (ehdokkaat-ei-tunnistettu.tsv) ja Soniss 130,6 Gi jäävät paikoilleen, tilaa on riittävästi, ei ratkaista tänään.
Keskeneräisen tila:
- ASTC-koe 9ca48d7a2 (natiiviseppa/normaali-astc-koe) on pushattu. JU pysäytti ajon 10.43: ei tuloksia eikä kuvapareja, ei käynnistetä uudelleen. Tuotantoreittiä ei toteuteta.
- Pariisin zoom ja reunat 3ab522752 ovat iPad-ajossa 3332c8e15 (häivytys 0,30–0,15 ok). KK:n 4.11. 02.50 lista (haamut 0,13:lla, tummat läiskät, länsiraja, nimet) on kerrottu VS:lle; en tee näille mitään.
- wt-siivous 11.00: 21 worktreetä pois (puhtaat ja pushatut, ilman --forcea), myös proto-natiiviseppa-muistikuva, -ehdokas ja -pariisi; haarat tallella. Jäljellä -tyokalut (jaettu polku, ALA-POISTA) sekä T7:n Unity-linkit. Vanhat skriptit juna190, juna199 ja juna213 viittaavat -ehdokas-polkuun.
- 2. erän kartoitus: /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/t7-nas-2era/.

## TYÖ 1: T7 → NAS 1. erä VALMIS 5.11. 10.0x, ei jatkotoimia (lisäys tähän luovutukseen)
1424 kohdetta (121,1 Gi, 71 392 tiedostoa) NAS:lla Matkakirja-arkisto/lokit/, täsmäys kaikista tiedostoista ja koista + 300 tiedoston sha256, 0 eroa. Lähteet ja 518 linkkiä poistettu luettelosta (docs/raportit/t7-nas-1era-luettelo-20261105.txt). Raporttien kuvaviitteitä 0. Työkalut, tasmays.json ja poistot.txt: /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/t7-nas-1era/.
Jäi T7:lle: arkisto/lokit/eheysvartija (32 kt; sama nimi NAS:lla, eri sisältö) ja arkisto/valoseppa (VS vahvistaa ensin). Rivi PT:lle lähetetty.

PT:n alkuperäinen nimeäminen:
**PT sanasta sanaan (5.11.):**
"PT: 12.9:n ja 12.19:n mukainen nimeäminen, T7 → NAS 1. erä (kartoitus: proto-3d/_tyo/natiiviseppa/t7-nas-kartoitus-20261105.md). Tee seuraavalla vuorollasi; jos nollaat nyt, kirjaa tämä luovutukseen sanasta sanaan.
NIMETYT, noin 123 Gi: koodaus/proto-lokit-arkisto yli 14 vrk (96 Gi, 998 kansiota), proto-3d-lokit-arkisto (14 Gi), arkisto/lokit (13 Gi). EI nyt: arkisto/valoseppa (17 Gi), jonka VS vahvistaa ensin. Muut ehdokkaat kuuluvat omistaville rooleille, eivätkä ne ole tässä erässä.
JÄRJESTYS: 1) Tee nimiluettelo kansioista ja niihin osoittavista proto-3d-linkeistä committiin. 2) Pienennä ja kopioi raporttien viittaamat kuvat docs/raportit/kuvat/-kansioon. 3) Kopioi NAS:lle Matkakirja-arkisto/lokit/-kansioon ja vertaa tiedostot ja koot, ei päällekkäin yöajon siirra_t7.py:n kanssa. 4) Vasta täsmäyksen jälkeen poista luettelon lähteet ja luettelon linkit (vain luettelosta, ei kuviolla); tähän saat PT:n luvan, muuta et poista oman työtilasi ulkopuolelta. Eroista seis ja rivi minulle. Lopuksi rivi: vapaana ennen ja jälkeen."

Lähtötila 5.11. 07.1x: T7 62 Gi vapaana (99 %), NAS 5,6 Ti (90 %, NFS /Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/). Mitään ei ole siirretty.
Huomioita: 998 kansiota on mitattu kansion muutosajasta 14–30 vrk; luettelo jäädytetään kerran, koska kansiot vanhenevat rajan yli. Linkit: proto-3d/lokit, _tyo, _valmiit ja juuri, yksi taso; tarkista syvemmät ennen luetteloa. Pitkä kopiointi taustalle omaan prosessiryhmään (12.9), nice 15.
Kartoitustiedosto ja muut ehdokkaat: t7-nas-kartoitus-20261105.md. Muista erät eivät kuulu tähän.

## TYÖ 2: muistin kevennys kohta 2, juoksupeli (omistaja 20.15; suunnitelma /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261104-muistin-kevennys.md)
Tavoite: peli ei kaadu eikä näytä huonommalta, ja uudelle sisällölle on tilaa. Raja 4080 Mt pysyy. Ei junaan ilman omistajan pyyntöä. **PT: "säästö mitataan iPadilla ennen kuin sitä kutsutaan säästöksi."**
Kaikki tiedot: /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/muistikuva/kohta2-astc/tulos.md. Kohdan 0 tulos: ../tulos.md.

### Tilanne: koe odottaa iPadia
- Koe **9ca48d7a2** natiiviseppa/normaali-astc-koe (d9cde0f50 + 1, proto, työpuu /Users/Shared/Claude/wt/proto-natiiviseppa-muistikuva). JU:n iPad-jonossa.
- PT 06.5x: koe odottaa iPadin konsolia (error 22). **Omistaja 06.52 uudelleenkäynnistyksestä: "Ei nyt".** iPadia ei käynnistetä ilman omistajaa.
- Odotettavissa JU:lta: kansio lokit/natiiviseppa-normaali-astc-9ca48d7a2, AJETTU-rivit ja konsolin kuvajako-rivit (normaaliastc tila, astc N, puuttuu M).

### Kun tulokset tulevat
1. Tarkista kuvajako-rivi: puuttuu 0, tila 2 todella päällä. Laske huippu, viimeiset 60 s ja latausaika (LentoAlkaa) astc- ja pois-ajoista. Vertailu d9cde0f50: huippu 4003, viimeiset 60 s 3636 Mt.
2. Katso parit täysikoossa. Kamerakohdat on poimittu LAV:n ajoista, eikä ole varmaa, että normaalikartallisia pintoja on lähellä; jos ei ole, uudet kohdat.
3. Luvut ja parit PT:lle (muisti kuvaparit-pt-lle-kk-lle-vain-pyydetyt).

### Tuotantoreitti: suunnitelma valmis, EI toteuteta ennen kokeen tulosta
kohta2-astc/tuotantoreitti.md. **PT 5.11.: "suunta ok, päätös vasta, kun koe on näyttänyt säästön ja kuvat; 70 Mt:n lisä menee silloin KK:lle omistajan puolesta. Reittiä ei toteuteta sitä ennen."**
Ydin: glb:t ennallaan; normaalit tiedostoina juoksupeli/maailma-v4/normaali-astc/<sha16>.astcm + hakemisto-v<N>.json; luku pelin olemassa olevalla DioraamaAstc:llä (ei kokeen omaa muotoa); paikallinen file://-muistiajo ennen vientiä. Kooderivertailu TextureConverteria vasten on tekemättä (vaihe 1, ei laitetta), PT:n sanan mukaan odottaa.

### Tiedossa olevaa, ei tarvitse selvittää uudelleen
- CDN: esto.bin (application/octet-stream) ilman pakkausta, pohja.json brotlilla. ASTC 52 kuvaa 47,3 Mt, gzip 23,3 Mt, PNG-lähteet 19,5 Mt.
- ImageIOn laatua ei saa ylös (pahin p99 14°); Unityn astcenc thorough 6,1°, Macilla mip 0. Kahden kanavan normaali ei auttanut, ja se vaatisi varjostinmuutoksen.
- PuraAstc ohittaa alfan eikä rajaa kokoa, joten se ei käy kalottiin. **Omistaja 22.41: Napakalotti odottaa Pariisin loppumittausta.**
- Kokeen lähdekuvat ja välitiedostot: /Volumes/T7 4TB/Claude-arkisto/natiiviseppa-scratchpadit-20261104/c0f58636-1770-4485-9ac5-bc8935e14d70/scratchpad/normaalit/.
- **Taivas:** lippu `valo taivaspakkaus 1` (JuoksuV4Maailma.TaivasPalat.cs:170), porrastusriski (PT/PK 27.10.). Pari ennen oletuksen vaihtoa.
- JuoksuV4Maailma.cs: PK tekee kohtaa 1 riveillä noin 2623–2633 ja 3051, haara pelikoodari/muurin-runko-219. Ei osu kokeeseen.
- Kuvat 859 + 752 Mt lokit/natiiviseppa-muistikuva-303a71dfb: voi poistaa, kun kohta 2 on valmis.

## Tehty tässä vuorossa
90 vanhaa scratchpadia (483 Mt) siirretty tarkistettuina T7:lle: Claude-arkisto/natiiviseppa-scratchpadit-20261104. Lähteet pois. Pysyvästi ei poistettu mitään; kopion saa poistaa PT tai omistaja. PT:lle kerrottu. Kaksi vanhaa skriptiä (_tyo/natiiviseppa/aluekuva-koko/sauma-terava-sumea.py, muistihuippu/vuoro-1708.zsh) ja JU:n luovutus 3.11. viittaavat vanhoihin polkuihin.

## Työ, ei kosketa ilman sanaa
- **Maakuntarajat b2101b95e (natiiviseppa/maakuntarajat-katko):** PT 21.0x: ei korjausta nyt, päätelmä jää tiedostoon, kunnes striimin versio on päätetty. _tyo/natiiviseppa/maakuntarajat/tulos.md, loppu.
- **Kallistus f0e256d9b (tasainen-striimi-3):** ei uusia ajoja, KK päättää. _tyo/natiiviseppa/striimi-sauma/tulos.md.
- **h-z13-sauma:** veden väriloikka z ≤ 11 | z ≥ 12 (ElavaTyyli.cs:490, :564). Ei korjausta ilman sanaa.
- **p-z15:** d9cde0f50 on runko ilman 694e1783a:ta ja e4180ac69:ää, ei kylmä tila. Vaakaraja ja taivaan portaat auki.
- **Versioriski:** VS:n yhdistelmä tarvitsee version > e20. Yhdistelmää tasainen-striimi-3 + maakuntarajat-katko ei ole tehty.
