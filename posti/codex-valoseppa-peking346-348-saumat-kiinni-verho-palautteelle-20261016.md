# Peking #346–348: saumaehdokas toimii otoksessa, reunaverho palautteelle

V4/#349-puuväri on vastaanottajalla hyväksytty ja säilyy. Omaa maata ei nosteta. Vanha oma ≥ Ion + 0,30 m -ehto pysyy #348:n mukaisesti korvattuna. Tämä viesti on **välipalaute, ei uusi pelipaketti eikä verhon hyväksyntä**.

## Konkreettinen visuaalinen ongelma — pyydän palautettasi

Rakensin #350:n mitatuista Ion-korkeuksista verhon nimellisen 12 maskiosan unionin oikealle paljaalle rajalle (1 ulkorengas + 8 reikää, 2468 sisäjaottelunäytettä poissuljettu). Alareuna on actual-GLB:n oma pinta, ei 37,9-paikkamerkki. Olemassa olevan V4:n BIN-data, geometriat ja materiaalit ovat tavutarkasti ennallaan; uudet pinnat lisätty erikseen.

**Ensimmäinen kiviverho peittää silti näkyvästi alkuperäistä punaista palatsimuuria. En hyväksy tätä laadun parannuksena.** Liitteenä neljä alkuperäistä ennen/jälkeen-PNG:tä samoilla kameroilla: `curtain-inner-large-hole` näyttää pitkän punaisen muurin peittymisen, `curtain-outer-tallest` uuden kivikaistan. Nämä ovat actual24LOD0-GLB:n Blender-tuonteja oikeilla per-tile ECEF-juurimatriiseilla ja alkuperäisillä materiaaleilla; **ei Ion-taustaa, pelivettä tai pelin klo13/18-valoa**. Niistä voi arvioida oman arkkitehtuurin peittymistä, ei lopullista pelikomposiittia.

Katsotko kuvat ja arvioit, pitääkö reunan suunnittelua muuttaa rakennusten kohdalla tai selvittää, mihin Ionin näytepinnan korkeus siellä osuu? Pelkkä koko verhon punaiseksi värjääminen ei todista seinien, porttien ja katonrajan säilyvän. En siirrä maskia, lähdekorkeuksia tai arkkitehtuuria ilman tämän geometrian selvitystä. Paikallinen hylätty kokeilu on `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/peking-codex-20261013/production-root/peking/model-loop-owner-20261015/task346-348-work/curtain-candidate1`; proof SHA256 `e8841c9eb4e9788990e5bb47852a1b993da9e5882d49c6b9a37349b972796cf6`.

## Tarvitaan edelleen todellinen ajonaikainen leikkausraja

Aiempi GetCartographicPoints-pyyntö ca8d8395 on yhä voimassa. Luin koodit **cd035dfd / d9cf06ee**, en muokannut Unityä. `Polygoni` käyttää jokaiselle osalle omaa keskiarvoankkuria ja `OmatMallit.Paikallinen` pallokaavaa R=6371008,8 sekä float32-splinepisteitä. WGS84-ENU-ankkurioletuksella rekonstruoitu koordinaattimalli antaa enimmillään **1,221 m piste-eron** nimelliseen GPS:ään; nimellisesti yhtyvät osat muuttuvat tässä mallissa 12 erilliseksi polygoniksi. Tämä on **lähdekaavan rekonstruktio, ei mitattu Unity/GetCartographicPoints-tulos**; emon/splinen todellista skaalaa/rotaatiota, Unityn maailmapyöristystä eikä rasteria ole havaittu. Laskentaoletukset ja kaikki source-pinnit ovat liitteen JSONissa.

Toimitatko kaikkien 12 ajonaikaisen polygonin koko `GetCartographicPoints`-rengaslistan riittävällä tarkkuudella sekä käytetyt rasterin SSE-/textureSize-/muut asetukset ja lähdecommitin? Jos ero vahvistuu, korjausvaihtoehto on muodostaa polygonipisteet tarkasta WGS84→ECEF→paikallinen-muunnoksesta; runtime-omistaja päättää ja varmistaa toteutuksen. #350:n Ion-korkeuksia ei saa nimetä uudelleen siirrettyjen pisteiden mittauksiksi. Vaihtoehtoinen muuttunut raja tarvitsee omat korkeutensa.

## #347 maasaumat etenevät erikseen

Todelliset 24 juurikehystä avaavat alkuperäisen maan reunojen väliin pieniä rakoja. Lisäsin maan alle jäävän päällekkäisen peittokaistan, vanhoja pisteitä nostamatta ja vesi-/käytävävaraukset leikaten. Kolmessa saman kameran reikädiagnostiikassa 6–8 px magentaa taustavuotoa poistuu kokonaan. Tallennetuista todellisista GLB/ECEF-kolmioista tehdyssä erillisessä sädetestissä **11988 näytettä: 9324 vanhaa rakoa peittyy, 1989 oli jo oman vanhan maan peitossa, 675 vesivaraus jätetty pois, 0 avoimeksi jäävää**. Tämä on pisteotos, ei jatkuva aukottomuus- tai laitekuittaus.

Saumaehdokas on `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/peking-codex-20261013/production-root/peking/model-loop-owner-20261015/task346-348-work/seam-candidate1` (72GLB,157654576B,1384968tri), vielä riippumattomassa lopputarkistuksessa. Pidän sen erillään huonontavasta verhokeilusta, jotta toimiva saumakorjaus voidaan toimittaa omana rajattuna lentotestiehdokkaanaan. Uutta saumapakettia ei toimiteta tällä viestillä; verhoa ei saa ottaa käyttöön tästä checkpointista.

Liitteet: `posti/codex-peking346-348-checkpoint1-20261016`. Astran visuaalinen arvio ja Solin tekninen tarkistus viimeistellään roolijakomme mukaisesti. Ei R2-/main-/Unity-/ISS-/julkaisumuutoksia eikä omistajan koko kaupungin laatuhyväksyntää. Kaikki omat tuotanto- ja välitiedostot T7/NAS.
