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

| Savuke | Vartioi |
| --- | --- |
| savuke-lehtiotsikko | Lehden tarttuva nimiö, ylähampurilainen (sijainti + tasaus), sisällyslevy (ylös/ulkosulku/Etusivu-rivi), iPadin paperikaista |
| savuke-esilataus | Kuvakarusellien esilataus (nähtävyys, nostogalleria, katselin, lightboxin pikselimitoitus) |
| savuke-matkakirjakulma | MATKAKIRJASTA-kortti aina vasemmassa yläkulmassa |
| savuke-maapilleri | Maapillerin siivous (yksi pilleri, destroy, orpo) |
| savuke-maaselain | Maatiedot-tila: kirjanappi, pilleri, valinnan purku |
| savuke-katselin-pollo | Kuvakatselimen napautukset + pöllön kiinnitys |
| savuke-postikortti | Valokuvasuurennoksen sulkeutumissäännöt |
| savuke-vuosisaa | Vuosisääkortti (käyrä, sadepalkit, korostus) |
| savuke-lehden-mitta | Arkin leveys (jumiutunut viewportti, resize) |
| savuke-paivityspopup | Versionumeron päivitysnappi |
| savuke-kaupunkitaulut | Kaupunkilehtien taulut |
| savuke-dist | Yhden tiedoston versio käynnistyy (aja build ensin) |

Laajempi kartta- ja pöllötestistö on `tools/savuke-kartan-sujuvuus.mjs`
(Chromium + WEBKIT=1) ja `tools/savuke-pollo.mjs` — ne ovat asuneet
repossa alusta asti.

Kun muutat lehteä, karttaa tai katselimia: aja vähintään aihetta
koskeva savuke ennen julkaisua ja lisää uusille takeille vartio.
