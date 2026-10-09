# ND ja KL: valokuvavertailu ja Google-tyylikoe (Linssiseppä 2, 9.10.2026)

Omistaja: "aivan erinäköinen kuin kaikki muut rakennukset ympärillä mitä Google on tehnyt". Kuvat:
[vertailu-valokuva-peli-nd-kl-20261009.jpg](vertailu-valokuva-peli-nd-kl-20261009.jpg) (valokuva | PBR juna 173 | Google-tyyli),
[tyylikoe-5-varianttia-20261009.jpg](tyylikoe-5-varianttia-20261009.jpg) (a PBR, b Google-tyyli, c pehmeämpi, d PBR + varjot, e Google + varjot).
App abef6bf30 (haara linssiseppa2/google-tyyli, asetukset omatyyli/omavarjot, oletus pois), ND v8, KL v2b, klo 13.
Valokuvat: Commons, Notre Dame Cathedral from the Tour Montparnasse (CC BY 2.0) ja Stockholms slott från luften (CC BY-SA 4.0).

## Erottuvat virheet (valokuvaan verrattuna)
**Notre-Dame**
1. Yksityiskohtien tiheys: oikeassa kirkossa on tukikaarien ja fiaalien metsä, ruusuikkunat, galleria ja patsaat. Mallissa ne ovat
   sileitä tasoja ja muutamia kaaria, joten kirkko näyttää yksinkertaistetulta laatikolta (suurin ero, ei korjaannu varjostimella).
2. Katot ovat valokuvassa auringossa VAALEANHARMAAT, lähes valkoiset (hapettunut lyijy), mallissa tumman siniharmaat. Oma aiempi
   ohjeeni (lyijy 100/105/112) oli väärä; oikea on noin 175/180/185.
3. Tornit näkyvät laatikoina kapein mustin rakoin. Oikeissa torneissa on syvät kaksoisaukot, joiden reunoissa on varjo ja valo.
4. Ympäristö: oikeasti kirkon vieressä on puita ja varjoa, mallissa avoin kirkas nurmi (v7:n oma pinta).
**Kuninkaanlinna**
1. Väri: valokuvassa harmaanbeige tai hiekka (2013-kuvassa lämmin okra), mallissa ROSA. Google-tyyli harmauttaa sen lähemmäs oikeaa.
2. Julkisivun syvyys: oikealla on pilasterit, räystäslistat, rustikoitu tumma sokkeli ja ikkunapuitteet varjoineen. Mallissa on tasainen seinä ja pieni ikkunaruudukko.
3. Katot ovat valokuvassa vaaleat ja kaltevat, mallissa tasainen vihreä levy ja mustat paneeliraidat.

## Google-tyylikoe: tulos
- KL: Google-tyyli (b) istuu ympäristöön selvästi paremmin kuin PBR (a), koska väri ja kontrasti ovat lähellä naapuritaloja.
- ND: b on harmaampi ja latteampi, eikä sävy yksin ratkaise geometrian puutetta (kohta 1).
- Varjot (d, e): EIVÄT NÄY. Oma aurinko ja 1500 m:n varjoetäisyys eivät tuottaneet varjoja Cesiumin laatoille. Juurisyy on selvittämättä
  (tilesetin renderöijien shadowCastingMode tai URP:n kaskadit).

## Suositus
1. ND:n puute on geometriassa ja tekstuurin yksityiskohdissa, joten varjostimella sitä ei saa Googlen tasolle. PT:n fotogrammetriamallireitti
   tai Googlen oma ND (jos sen laatat eivät ole telinevaiheesta) on todennäköisesti parempi kuin oman mallin hionta.
2. KL: väri harmaanbeigeksi tai okraksi, katot vaaleiksi ja kalteviksi (LR). Google-tyyli oletukseksi KL:lle, kun varjot toimivat.
3. Varjokokeen juurisyy selvitetään ennen kuin tyyli otetaan käyttöön.
