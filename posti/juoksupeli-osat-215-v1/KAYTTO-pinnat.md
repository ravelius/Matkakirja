# Juna 215 — pintakuvat B1–B3

Erä sisältää vain kolme tilattua väripintaa. Käytä yhtä yhteistä materiaalia kullekin pintalajille. 3D-osat A1–A6 toimitetaan erikseen Tripo-sessiosta.

## B1 — pääharjan keltainen koristenauha

`pinnat/1268-paaharja-keltainen.png`: 2048 × 512, RGB PNG, peittävä. Keltaisen lasitiiliharjan kohokuvion kuvallinen 2D-esitys. Väritila sRGB. Toisto U-suunnassa, V Clamp. Nauha ei sisällä chiwen-hahmoa eikä kattotiiliä. Sijoita olemassa olevaan harjaan sen todellisilla mitoilla; uusia fyysisiä mittoja ei päätelty sumeasta rajauksesta.

Toiston kuvio ja reunaviivat jatkuvat visuaalisesti. Generoidussa pigmentissä on pieni ero vasemman ja oikean reunan välillä: keskimääräinen RGB-ero 6,54/255; reunat eivät ole pikselitarkasti identtiset. Näyttö `esikatselu/B1-toisto-2x.png`. Nauhaa ei ole maalattu, saumattu kloonaamalla tai jälkikäteen varjostettu.

## B2 — kultainen keskiovi

`pinnat/1269-keskiovi-kulta.png`: 512 × 1024, RGB PNG, peittävä. Säilyttää 1070:n parioven kuvasuhteen ja jaon: kaksi yhtä leveää lehteä, yläosan ristikkokentät, alaosan paneelit ja vetimien korkeus. Uusi pinta sisältää kultaiset ristikkopalkit ja kultaiset alapaneelikoristeet punaisessa rungossa.

Väritila sRGB, koko oven UV-alue 0–1, Clamp molempiin suuntiin. Käytä 1070:n olemassa olevaa geometriaa ja UV-mitoitusta. Tämä on kultaisen keskioven erillinen variaatio; vanhaa punaisen oven 1070-tiedostoa ei korvata.

## B3 — Meridiaaniportin nimitaulu

`pinnat/1270-meridiaaniportin-nimitaulu.png`: 1024 × 1024, RGB PNG, peittävä. Sininen kenttä, kultainen kehys ja kaksi kultaista merkkiä pystyrivissä. Ylhäällä **午**, alhaalla perinteinen **門**. Ei lisäpikkutekstiä sumean havainteen perusteella. Kirjoitus on varmennettu museon ja riippumattoman valokuvaajan kuvista; tarkat lähteet erillisessä B3-raportissa.

Väritila sRGB, yksi materiaali, Clamp. Säilytä merkkien luonnolliset suhteet. Fyysiset mitat ja sijoitus otetaan olemassa olevasta nimitaulusta. Kehyksen sininen/kulta-väritys seuraa tilausta; todellisen museokuvan koristekehyksen punainen väri on dokumentoitu lähderaportissa.

## Valo, sävy ja jatkovaiheet

Kuvat ovat suoria 2D-väripintoja ilman ympäristön varjoja, suuntavaloa tai valaistuksen liukuväriä. Kuviota ja materiaalia kuvaavat pigmenttivaihtelut ja ohuet reunaviivat kuuluvat albedoon. Kiilto ja pelin valaistus asetetaan materiaalissa, eikä niitä tuoda kuvaan maalattuina heijastuksina. Erä ei sisällä normal-, height- tai roughness-karttoja.

Muut pinnat 1067–1071 ja kourutiilikatto säilyvät ennallaan; katon kultasävytys kuuluu Valosepälle. Vastaanottaja tarkistaa uudet pinnat täysikokoisina ja pelin samasta kamerasta, Pelikoodari toimittaa arvion PT:lle. Tiedostojen toimitus tai tuontitarkistuksen läpäisy ei tarkoita PT:n hyväksyntää, pelissä näkyvää kytkentää tai julkaisua.
