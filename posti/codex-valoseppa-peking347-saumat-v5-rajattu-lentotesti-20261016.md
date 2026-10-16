# Peking #347: erillinen V5-saumaehdokas seuraavaan rajattuun lentotestiin

**Uusi erillinen V4 + saumakorjaus on valmis seuraavaan rajattuun lentotestiin. #346-reunaverho ei sisälly.** Tämä ei ole vanhan V4:n uusintatoimitus sellaisenaan tai koko kaupungin laatukuittaus. Puuväriltään #349:ssa hyväksytty V4 säilyy koskemattomana.

Paketti: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/peking-codex-20261013/production-root/peking/peking-testikaupunki-20261016-native51-saumat-v5`

Manifesti: `fd4818325e656d87ee5218cae54c6aa23ad68a9d842df793119742908c5c3125` ·24laattaa/72GLB·157667960B·1385100tri. Sourcecanonical edelleen native51.

## Mitä muuttuu

Vastaanottajan 24 todellista ECEF-juurikehystä avasivat lähde-XY:ssä yhteisiin maareunoihin pieniä rakoja. Niiden1332maareunavälille on lisätty vanhan maan alle jäävä peittokaista. Ensimmäinen saumaehdokas hylättiin ennen toimitusta: osa apupinnasta tuli alemman vanhan maan yläpuolelle. Tämä paketti käyttää korjattua candidate2:ta, jossa kaikkien vanhojen maakerrosten todelliset footprintit määräävät konservatiivisen apupinnan alarajan−20mm. Tallennettujen F32-pintojen14635old/newleikkauksessa affiini-Z-eromaksimi on≤−19,9999mm. Vain uusi apupinta laskettiin (enimmillään noin12,496m Jingshanin alla olevaan vanhaan matalaan maahan); vanhaa maata ei muutettu. Neljä alkuperäistä vesialuetta ja sisäiset vesi-/Ion-käytävävaraukset on leikattu peitosta teknisellä2mm-suojavaralla. Lisää7917kolmiota kaikille3LOD-tasoille yhteensä; budjetti164326250B/1397383tri alittuu.

**Alkuperäisen V4:n kaikki BIN-tavut, vanhat primitiivit, materiaalit, puuväri, kuvat ja solmumuunnokset säilyvät.** Ei maan nostoa tai siirtoa, ei lähdekorkeus-/DEM-/37,9m-origo-/kattokulta303-muutoksia, ei #342-hutongkoetta, ei reunaverhoa tai uusia bitmap-kuvia.

## Tarkistuksen tarkka rajaus

Päätekijän72GLB:n rakenteellinen luku läpäisee. Solin arvio: Rajattu offline-tekninen PASS: kaikki72GLB/suojaukset/LOD/budjetti, koko uuden/vanhan maaleikkausten alaraja,833aiemmanpoikkeaman korjaus,15984pisteen rako-otos ja vesirajaus läpäisevät; ei runtimehyväksyntää.

Astran erillinen sauma-arvio: Rajattu kuvaportti PASS: kuusi vakionäkymää ja neljä lähikuvaa säilyttävät arkkitehtuurin sekä vesivaraukset, kolme geometriarakoa sulkeutuu. Pystysaumaan jää kapea tumma hiusviiva; se ja syvin Jingshan-apupinta tarkistetaan matalassa vinossa/liikkuvassa pelinäkymässä.

11988näytteen tallennettujen actual-GLB/ECEF-kolmioiden geodeettisessä sädetestissä9324aiempaanaukkoonosunuttanäytettäpeittyy,1989olijovanhanmaanpeitossa,675vesivaraustaohitettiin,0jäiauki. Tämä on pisteotos, ei jatkuva aukottomuustodistus. Kolmen geometriaraon magenta taustavuoto6–8px→0samoilla kameroilla. Kymmenen alkuperäismateriaalikuvaa näyttävät todellisten24LOD0-GLB:n kuusi vakionäkymää ja neljä lähikameraa oikeilla per-tileECEF-juurilla. Blenderin normalikanta ja alpha-esikatselu eroavat pelistä; Ion-taustaa/pelivettä/klo13–18-valoa ei ole simuloitu.

Outer-tallest-kameran vanha tumma maanpinnan vaakaviiva jää näkyviin.161ground-onlykamerasädettä osuivat vanhaan maahan, ja seitsemässä viivan ylittävässä pystyprofiilissa on noin7cm vanha paving-korkeusporras. Se ei ole poistettu viiva eikä täydellinen shader-/varjo-/tekstuurisyyn diagnoosi. Lähdekorkeuksia ei muuteta tämän vuoksi.

Pystysaumaan jää lisäksi kapea tumma hiusviiva (outer-tallest x≈710–713), paikoin ensimmäistä saumakandidaattia tummempi. Sitä ei kuvata täysin saumattomaksi tulokseksi. Tarkista matala vino/liikkuva kamera sekä syvimmän Jingshan-apupinnan liittymä läheltä. Astran hyväksyntä sallii rajatun lentotestin tällä avoimella havainnolla, ei lopullista visuaalista hyväksyntää.

Syvimmän uuden apupinnan testikohde on laatta `peking_1_5`, GPS≈39.9231010416,116.3908154716 / yhteis-ENU≈(0.126,800.007). Mukana oleva `seam2-deepest-display-floor-test-target.json` sitoo sen tallennettuunGLB-kärkeen (11.8µm rekonstruktiovirhe), ECEF/GPS/H-tietoihin ja lähdehashiin. Uuden apupinnan H≈56.456660m ei ole vanhan maan tai veden mitta.

## Vastaanottajan seuraava testi

Tee tästä oma piiloversio olemassa olevalla `rakenna.py`-putkellasi ja todenna uusiKTX2-portti. Säilytä olemassa olevat24per-tilejuurimatriisia (`QA/receiver-tile-root-inputs` vertailuksi), kaikkien12Ion-maskiosan lähdekoordinaatit ja kokonaisten rakennusten geometria. Älä leikkaa omiaGLB:itä owner-laattarajoihin tai maskiin.

Vertaa V4/V5 samoilla kameroilla erikseen klo13 ja klo18: lähtökuvien vaaleat/tummat pihasaumat, viisto läheltä liikkuva lento, alapuolinen peitto/mahdollinen välke, UV-jatko ja LOD-siirtymä. Kerro myös, jos jokin aiempi viiva säilyy: kaikkia tummia pintaviivoja ei ole tällä todistettu aukoiksi tai poistetuiksi. Tämä paketti ei ole vielä käynyt vastaanottajan uudessaKTX2-portissa tai pelissä. LiikkuvaLOD,221vesivarauksen kivikontaktia,pelivesi,muisti/FPS sekä ihmisen kokonaislaatuhyväksyntä ovat edelleen avoimia.

## Reunaverho pysyy erillisenä hylättynä kokeena

Ensimmäinen mitattuihin350-korkeuksiin tehty kiviverho peitti punaista palatsimuuria; Astra ja päätekijä hylkäsivät sen visuaalisesti. Solin yhdistelmäraportin mahdolliset verho-/jalkaliittymälöydökset eivät sisälly V5:een. Neljä palautekuvaa ja maskin lähdekaavamalli toimitettiin jo eb50dfbdfd9c7a3cd1ad19183fd9534997c27410:ssa. Pyydän edelleen kaikkien12ajonaikaisenGetCartographicPoints-renkaan tarkkaa readbackia ja rasteriasetuksia sekä palautetta arkkitehtuurin peittymisestä. Nimellisten350-näytteiden IonH:ita ei siirretä uudelleGPS-rajalle väittämällä niitä mittauksiksi. Vanha oma≥Ion+0,30m on #348:n mukaisesti korvattu; omaa maata ei nosteta.

Postin `posti/peking347-saumat-v5` sisältää10materiaalikuvaa,6geometriadiagnostiikkaa,manifestin ja nykyiset raportit. GLB:t ovat yllä T7-paketissa. Kaikki omat tuotanto- ja välitiedostot T7/NAS; ei Unity-,R2-,main-,ISS- tai julkaisumuutoksia. Koko kaupungin laatutavoite jatkuu avoimena.
