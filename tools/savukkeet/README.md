# Savukkeet — käyttöliittymän savutestit

Siirretty session scratchpadista repoon kapulanvaihdossa 14.8.2026,
jotta ne säilyvät sessioiden yli. Polut ovat suhteellisia repon
juureen (`import.meta.url`), joten ajo onnistuu mistä tahansa:

    node tools/savukkeet/savuke-lehtiotsikko.mjs

Jokainen savuke käynnistää oman paikallisen palvelimen ja Chromiumin
(`/opt/pw-browsers/chromium` — konttiympäristön vakiopolku, vaihda
tarvittaessa) ja tulostaa OK/FAIL-rivit; poistumiskoodi 0 = kaikki
läpi. `savuke-lehtiotsikko` kirjoittaa kuvakaappauksen hakemistoon
`/tmp/matkakirja-kaappaukset/` (luo se ensin: `mkdir -p`).

**Playwright haetaan kahdesta paikasta** (sama kaava kuin
`tools/kuvaa-etusivu.mjs`): ensin repon omasta `node_modules`-kansiosta
ja jos sitä ei ole, kontin globaalista asennuksesta
`/opt/node22/lib/node_modules/playwright`. Aiemmin savukkeet tuotiin
kiinteästä `../../node_modules`-polusta, ja koska repossa ei ole
`node_modules`-kansiota, ne kaatuivat uudessa sessiossa jo tuontiin
(`ERR_MODULE_NOT_FOUND`) ennen kuin ehtivät käynnistää mitään. Uutta
savuketta kirjoittaessa kopioi tuontilohko olemassa olevasta — älä
kirjoita `import ... from '../../node_modules/...'`.

| Savuke | Vartioi |
| --- | --- |
| savuke-lehtiotsikko | Lehden tarttuva nimiö, ylähampurilainen (sijainti + tasaus), sisällyslevy (ylös/ulkosulku/Etusivu-rivi), iPadin paperikaista |
| savuke-esilataus | Kuvakarusellien esilataus (nähtävyys, nostogalleria, katselin, lightboxin pikselimitoitus) |
| savuke-matkakirjakulma | MATKAKIRJASTA-kortti aina vasemmassa yläkulmassa |
| savuke-kartta-tila | Kartan geometria ei jää vanhaksi: lehden sulun sovitus, kesken jääneen nipistyksen hylkäys (jumivahti + yhden sormen kosketus) |
| savuke-maapilleri | Maapillerin siivous (yksi pilleri, destroy, orpo) |
| savuke-maaselain | Maatiedot-tila: kirjanappi, pilleri, valinnan purku |
| savuke-katselin-pollo | Kuvakatselimen napautukset + pöllön kiinnitys |
| savuke-postikortti | Valokuvasuurennoksen sulkeutumissäännöt |
| savuke-vuosisaa | Vuosisääkortti (käyrä, sadepalkit, korostus) |
| savuke-lehden-mitta | Arkin leveys (jumiutunut viewportti, resize) |
| savuke-paivityspopup | Versionumeron päivitysnappi |
| savuke-kehittajalehti | Kehittäjän liitteet: Raamattu, Tilannelehti ja Tilastot-lehden vetolaatikkotaulu |
| savuke-lippuikkuna | Lippuikkunan pikselit (ison lipun terävyys, tarkennettu vaakuna kortin sisällä) |
| savuke-fokusvirta | Fokusmoodin annosteluvirta Ateenassa: lehtilukko, kortti kartan päällä, vaiheet 1–6, minivisan palkkio, portti (≥1 täky) ja luovutus laattamekaniikalle |
| savuke-dist | Yhden tiedoston versio käynnistyy (aja build ensin) |
| savuke-mediakanava | Pelin äänet mediakanavassa (hiljainen ankkuri + audioSession, sanelun tauko) ja pelin oma mykistys myös striimatulla lukijaäänellä |
| savuke-fokuskartta | Fokusmoodin maakohtainen topografiapohja: puuttuva kuva ei riko mitään, olemassa oleva osuu JSONin rajaukseen, reitit sen päällä, kamera-ajo maan rajaukseen ja eleen keskeytys, väärän laudan rajaus hylätään |
| savuke-fokuskohteet | Fokuslehden klikattavat karttakohteet: merkit lehden päällä (myös kierron kopiokohdassa), ≥44 px osuma joka zoomilla, yleiskuvassa piilossa, pop-upin sisältö ja paikka, kohdekorostus, sulku rastista/Escistä/napautuksesta, fokusvirran pinta sulkee tietoruudun |

**Savukevartija** (`node tools/tarkista-savukkeet.mjs`, CI:ssä joka
PR:lle): vertaa kaikkien savukkeiden `ui.X`-kutsut ja -luvut UI:n
toteutukseen tekstitasolla ja kaatuu puuttuvista — savukkeet eivät
aja porteissa, joten siirretty metodi tai kenttä katkaisisi ne
muuten hiljaa. Kun lisäät savukkeeseen oman mittarikentän, kirjoita
se samassa tiedostossa (`ui.mittari = 0`) ennen lukua; lehtitilan
kenttiin viitataan `ui.lehtitila.X`-muodossa (kentät dokumentoitu
ui.js:n rakentimessa).

Laajempi kartta- ja pöllötestistö on `tools/savuke-kartan-sujuvuus.mjs`
(Chromium + WEBKIT=1) ja `tools/savuke-pollo.mjs` — ne ovat asuneet
repossa alusta asti.

Kun muutat lehteä, karttaa tai katselimia: aja vähintään aihetta
koskeva savuke ennen julkaisua ja lisää uusille takeille vartio.
