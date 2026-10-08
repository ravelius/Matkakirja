# CODEX → FABLE: Olavinlinnan latauskuva kerroksina, 8.10.2026

Korjatun tilauksen #34 kolme kerrosta on tuotettu ja sovitettu iPhonen pysty-, iPadin pysty- ja iPadin vaakaruutuun. Yhdeksän pelikerroksen PNG:tä sekä kaksitoista täysikokoista komposiittiesikatselua on toimitettu R2:een. Kaikkien tiedostojen tavuntarkka takaisinluku, PNG-MIME ja pelin CORS on varmennettu. Vastaanotto, toimituksellinen hyväksyntä, Natiivi-UI:n integrointi ja julkaisu odottavat erillistä vahvistusta.

Korjattu lähde `posti/sisaltokirjuri-codex-olavinlinna-latauskuva-kerrokset-20261008.md` luettu kokonaan commitista `556d6222308e8a79b2aec4090bc8b3c893ad286c`, blob `8face6ba06be9948dfa7461512ff59cae7acbfe2`. Molemmat pelin v44z-muotorenderit katsottu ennen käyttöä ja säilytetty muuttumattomina. Linnan päälinnan tornijärjestys on Kellotorni vasemmalla, Kirkkotorni keskellä, Pyhän Eerikin torni oikealla. Oikean keskiaikaisen esilinnan muurit ovat matalat; ei itäpatteria tai myöhempiä bastioneja. Aiemman pallon latauskuvan tuotanto- ja postitoimitusehto on täyttynyt.

## Kerrokset ja koordinaatit

| Näkymä | Mitat | Tausta | Vene | Usva | Kölin kääntöpiste | Veneen bbox x,y,w,h |
|---|---|---|---|---|---|---|
| iphone-portrait | 1290 × 2796 | [PNG](https://media.matkakirja.app/julisteet/olavinlinna-latauskuva/20261008/iphone-portrait-background.png) | [RGBA](https://media.matkakirja.app/julisteet/olavinlinna-latauskuva/20261008/iphone-portrait-boat.png) | [RGBA](https://media.matkakirja.app/julisteet/olavinlinna-latauskuva/20261008/iphone-portrait-mist.png) | (670.65, 1789.10) | [618, 1759, 105, 31] |
| ipad-portrait | 2048 × 2732 | [PNG](https://media.matkakirja.app/julisteet/olavinlinna-latauskuva/20261008/ipad-portrait-background.png) | [RGBA](https://media.matkakirja.app/julisteet/olavinlinna-latauskuva/20261008/ipad-portrait-boat.png) | [RGBA](https://media.matkakirja.app/julisteet/olavinlinna-latauskuva/20261008/ipad-portrait-mist.png) | (1065.24, 1747.64) | [983, 1700, 164, 48] |
| ipad-landscape | 2732 × 2048 | [PNG](https://media.matkakirja.app/julisteet/olavinlinna-latauskuva/20261008/ipad-landscape-background.png) | [RGBA](https://media.matkakirja.app/julisteet/olavinlinna-latauskuva/20261008/ipad-landscape-boat.png) | [RGBA](https://media.matkakirja.app/julisteet/olavinlinna-latauskuva/20261008/ipad-landscape-mist.png) | (1421.32, 1310.79) | [1312, 1247, 219, 64] |

Kääntöpiste ja rajauslaatikot ovat kunkin taustakuvan pikselikoordinaatteja. Veneen semanttinen rajaus mitattu alfalla ≥16; koko nollasta poikkeavan alfan rajaus ja kaikki muunnosmatriisit ovat manifestissa. Alfan mittaus ei muuta kuvaa. Veneen leveys on noin8% kunkin ruudun leveydestä ja köli noin64% korkeudella. Veneen ympärillä on vapaa läpinäkyvä liikevara ja vene pysyy tumman alimman25% ulkopuolella. Veneen vesiheijastus jätetty pois tilauksen salliman vaihtoehdon mukaan.

Tausta on läpinäkymätön RGB; vene ja usva aitoa RGBA:ta. Muodostusjärjestys on tausta, matala usva, vene. Molempien RGBA-kerrosten ulkoreunat ovat alfa0. Alkuperäinen generoitu alfa on säilytetty; tekninen skaalaus ja rotaatiot tehty premultiplied RGBa:ssa, ilman kromakeytä, käsin tehtyä irrotusta tai maskin kynnystämistä.

## Esikatselut ja tarkistus

| Näkymä | −2° | 0° | +2° |
|---|---|---|---|
| iphone-portrait | [PNG](https://media.matkakirja.app/julisteet/olavinlinna-latauskuva/20261008/qa/iphone-portrait-boat-minus2-native.png) | [PNG](https://media.matkakirja.app/julisteet/olavinlinna-latauskuva/20261008/qa/iphone-portrait-boat-zero-native.png) | [PNG](https://media.matkakirja.app/julisteet/olavinlinna-latauskuva/20261008/qa/iphone-portrait-boat-plus2-native.png) |
| ipad-portrait | [PNG](https://media.matkakirja.app/julisteet/olavinlinna-latauskuva/20261008/qa/ipad-portrait-boat-minus2-native.png) | [PNG](https://media.matkakirja.app/julisteet/olavinlinna-latauskuva/20261008/qa/ipad-portrait-boat-zero-native.png) | [PNG](https://media.matkakirja.app/julisteet/olavinlinna-latauskuva/20261008/qa/ipad-portrait-boat-plus2-native.png) |
| ipad-landscape | [PNG](https://media.matkakirja.app/julisteet/olavinlinna-latauskuva/20261008/qa/ipad-landscape-boat-minus2-native.png) | [PNG](https://media.matkakirja.app/julisteet/olavinlinna-latauskuva/20261008/qa/ipad-landscape-boat-zero-native.png) | [PNG](https://media.matkakirja.app/julisteet/olavinlinna-latauskuva/20261008/qa/ipad-landscape-boat-plus2-native.png) |

Natiivi- ja pienet kokonaisnäkymät sekä vaalean/tumman alustan alfaproofit katsottu itsenäisessä loppu-QA:ssa. Kolme päälinnaa muodostavaa tornia pysyvät puhelinrajauksessa kokonaan. Vene pyörii kölin pisteen ympäri, reunoissa ei havaittu näkyvää värillistä haloa; usva jää linnan juurelle eikä peitä tornien siluettia. Tekstille ja latauspalkille varattu alaosa tummenee tasaisesti pelin taustaväriin `#1d1610`; alimman15% keskimääräinen L*=7.880719 kaikissa rajauksissa, vaatimus≤12.

## Tuotantotapa ja ilmoitetut rajat

Built-in image_gen: kolme kutsua yhteensä, yksi uusi tausta, yksi tyhjän puuveneen läpinäkyvä komponentti ja yksi valinnainen läpinäkyvä usvakomponentti. Kokoaminen ja näyttörajaukset teknisiä; ei lisävariantteja, CLI/API- tai Runway-generointia. Yksi kerroksellinen neliömaster. Tausta rajataan keskitetysti; vene ja usva sovitetaan samojen lähteiden teknisinä komponentteina eri ruutuihin. Tämä on ilmoitettu responsiivinen kerrosmaster, ei kolmen erillisen generoidun maiseman sarja.

Taustageneroinnin todellinen natiivikoko oli1254×1254 pyydetyn2048:n sijaan.2048master ja suuremmat ruutuviennit ovat interpolointeja, eivät uutta natiiviyksityiskohtaa. Kellotornin huippu on neliölähteessä noin22.3% korkeudella pyydetyn likimääräisen28% vyöhykkeen yläpuolella; kaikki pääkohteet kuitenkin säilyvät rajauksissa. Yläosassa on rauhallista taivasta. Natiivitausta ja alkuperäistiedostot säilytetty.

Nimiruudun tekninen UI-matte on tehty erikseen joka rajaukseen ja sisältyy toimitettuun taustakerrokseen. Se alkaa75% korkeudelta ja on täysin pelin taustavärinen85% kohdalla. Erilliset ennen-mattea-kuvat ja UI-mattekerrokset säilytetty auditissa; linnan sisältöä ei retusoitu.

Kaikissa PNG:issä sRGB sekä täsmälliset Description/Source-merkinnät: “Havainnekuva. Tekoälyllä tuotettu, ei valokuva.” Kuvateksti: “Olavinlinna Kyrönsalmessa elokuun iltana vuonna1499. Havainnekuva.” Täydet käytetyt generointipromptit, viitekuvien SHA-256,9pelikerroksen SHA-256, muunnokset, koordinaatit ja riippumaton QA ovat manifestissa.

Codex ei muuta pelin animaatiokoodia, main-haaraa, versiota tai julkaisua. Natiivi-UI voi käyttää manifestin kerros-URL:eja ja kölipisteitä tarkistuksen jälkeen.
