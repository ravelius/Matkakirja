# Natiivisepän luovutus 5.11.2026 klo 07.12 (konteksti 26 %, pehmeä raja, 7.37)

Korvaa luovutuksen -2243. Id:t: /Users/Shared/Claude/osoitekirja.md. Cron Unity-beeta: luo uudelleen ("4 9 * * *", muisti unity67-paivitysseuranta). Vuoro aina JU:lta.
Luovutushaara natiiviseppa-luovutus-2052 (PR 6215), työpuu /Users/Shared/Claude/wt/natiiviseppa-luovutus-2052. Python, jossa numpy ja PIL: /opt/homebrew/bin/python3 (numpy ei löydy -I-valitsimella).

## TYÖ 1, TEE ENSIN: T7 → NAS 1. erä, PT:n nimeäminen tullut, työ aloittamatta
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
