# Natiivi-UI: luovutus 17.10.2026 klo 23.30 (Postivahti: kova raja 45 %)

Natiivi-UI (Opus) → seuraava Natiivi-UI-sessio. Korvaa -1827:n jonon. Aiempien luovutusten "Opit" ovat yhä voimassa.
Viestit send_messagella session id:llä (/Users/Shared/Claude/osoitekirja.md). PT:lle enintään 3 riviä.
Simu VAIN Julkaisijan SIMU NYT -viestistä, SIMU VAPAA perään. Uusi käännösodottaja ilmoitetaan Julkaisijalle ETUKÄTEEN.
Laitteet: iPhone 123B4B25-36B7-4A76-B677-905621CD8F5A, iPad F7513985-C8BC-4E97-8D29-9C9BD420E962.
Ajoskriptit: /Users/Shared/Claude/proto-3d/tyokalut/natiivi-ui-ajot/ (sk-*, ajo-*) ja ketjut-20261016/ (*-kaannos.zsh <sha>, *-simu.zsh).

## OMISTAJAN PÄÄTÖKSET JA PYYNNÖT (PT:n kautta, sanatarkasti)
- **19.09** ISS-ohjauspöytä "Kyllä, junaan (Suositus)" → TEHTY: junassa 200 (NS runko 62853a8b8, sis. cad209a73 + PK 43439f3b5 + bce4b199d).
  Tyylikirja LAITEPÖYTÄ-pohja web #4819 mergetty 0fddbe3eb.
- **22.52** "kun maakunnan selitteen avaa "lue lisää" niin se pitää aueta suoraan täyteen artikkeliin ilman "lisää" nappia kuten nyt."
- **23.00** (VAIN LUONNOS) "ISS ohjaamoon täytyy tehdä hammasratas nappi ohjaamon oikealla puolelle, josta aukeaa vuorokauden aika yms. säädöt.
  ja otetaan ne pois kohdevalikosta, johon jää silloin pelkät nostot sekä eri kohteet. ne voisivat näkyä lisäksi kokonaan ilman ikkunaa.
  nostot olisivat isompina ja nostot asteen pienempinä niiden alla. niitä voisi kelata ruudulla sormella. näkymä saa olla silloin
  pehmennetty ja tummennettu." (KK:n suositus PT:n viestissä: hammasratas pöydän oikeaan reunaan → harmaa lasipaneeli: vuorokaudenaika,
  vuodenaika, LIVE, NIMET; kohdevalikko ilman paneelia, näkymä YHDESTÄ sumennetusta pysäytyskuvasta, ylinnä ISS nyt | Oma sijainti,
  nostot isoina (iPhone 2 riviä, iPad 3), kohteet pienempinä kategoria per rivi, ‹ Kategoriat pois, tyhjän napautus sulkee.)
- **23.02** "kaikissa linsseissä, esim. kipissä nappulat kuten hampurilainen ja pause saisi häipyä lähes näkymättömiin ja tulla esille kun
  pelaaja napauttaa ruutua ja taas häipyä noin 5sek päästä, jotta ne eivät häiritse peliä. sama ISS:ssä. ohjaamon painaallukset eivät tuo
  niitä näkyviin eikä selkeät muut painallukset. nappeja voi myös suoraan painaa kun ne ovat himmennettyjä ja ne toimivat silloin suoraan."
- **23.10** napit esiin tuova napautus EI ole koskaan käsky millekään muulle; himmeän napin oma painallus toimii suoraan.
- **23.16** "kun pause nappi on himmennetty … napautus missä vain ruudulla jossa ei ole muuta nappia tuo vain himmennetyt napit näkyviin mutta
  ei tee muuta. uusi napautus napit näkyvillä sitten zoomaa tai astuu eteenpäin yms. miten toiminto on vain suunniteltu"
- **23.21** julkaisu → juna 201 lukitaan 00.30; maakunta junaan 201, jos sha + kuvapari PT:lle 00.15 mennessä; häivytys ja hammasratas EIVÄT.

## TILA 23.30 (järjestys PT 23.2x)
1. **Maakunnan Lue lisää (juna 201):** haara natiivi-ui/maakunta-suoraan-201 kärki **fef47c0aa** (pohja juna-200 ed0654c54):
   Nostokortti.MaakuntaSuoraan (maakunnan nosto suoraan Vaihe2 ja laajennettuna; muut nostot ennallaan), `ui maakuntasuoraan 0|1`.
   Simu 65cb17d60 (41594c430, todistus-maakunta-*-201c-2322/2327, 0 poikkeusta): Lue lisää → suoraan artikkeli ilman LISÄÄ-nappia OK,
   mutta pikkukuvasta avattuna 45 % "(laajenna)" → fef47c0aa laajentaa. KETJU KÄYNNISSÄ 23.33 (ketjut-20261016/maakunta-astro-kehys-2333.zsh):
   fef47c0aa → maakunta-201-app, sitten 00228d16d → lasipohja-201-app, sitten ec5819d17 → kehyshaivytys-201b-app.
   **TEHTY 23.54:** simu f784c0532 (todistus-maakunta-{iphone-…-2345, ipad-…-2349}, 0 poikkeusta): iPhone Lue lisää + pikkukuva suoraan
   laajennettuun artikkeliin; iPadilla pikkukuva OK, Lue lisää -QA-napautus osui tekstin ohi. Pari _tyo/natiivi-ui/maakunta-201-simu-2353/ → PT 23.54.
   ENSIN: PT:n hyväksyntä → fef47c0aa (haara natiivi-ui/maakunta-suoraan-201) NS:lle junaan 201 (lukitus 00.30; muuten juna 202).
2. **Lasipohja-erä (juna 201, PT hyväksyi selitekortin ja Maapallon vuoden 21.2x):** natiivi-ui/lasipohja-201 kärki **00228d16d**
   (astrokuvan selite täysin peittävällä Tyylikirja.Lcd.Pinta). 87945e5ca:n (LasiAvaruus 90 %) pari _tyo/natiivi-ui/lasipohja-201-astro-2322/
   hylätty itse: täysikokoisena päiväkirjakortin teksti kuulsi kortin alaosassa. Käännös 00228d16d → lasipohja-201-app alkoi 23.43.
   ENSIN (luovutuksen jälkeen): kaannos.out = KÄÄNNETTY … 00228d16d → Julkaisijalta SIMU NYT → `zsh ketjut-20261016/lasipohja-201b-simu.zsh`
   (vain astro, ~8 min) → katso K2/K3 TÄYSIKOKOISINA (ei läpikuultoa) → pari kuten lasipohja-201-astro-2322 uuteen kansioon → PT →
   hyväksynnän jälkeen koko natiivi-ui/lasipohja-201 NS:lle (juna 201, jos ehtii 00.30; muuten 202).
3. **Kehysnappien häivytys (juna 202, video ensin):** natiivi-ui/kehyshaivytys-201 **ec5819d17**: ydin Linssit/Ydin/KehysHaivytys.cs (testit
   Linssit-testit KehysHaivytysTestit 8/8: himmeä + lattia → ei kävelyä, näkyvä → kävely, tupla, veto, nipistys, napit), UI/Linssit/KehysNapit.cs
   (linssikerrosten mk-ohjausryhma, mk-linssiSulje, Merkki mk-kehysnappi = oppaan esitysrivi; luokka mk-kehys--himmea ohjausnappi.uss
   0,2 / tyylikirjan kestot), nieleminen SyoteLukko.NapautuksenNielija (opas MikaTama, TehtavaKohdeNapautus, DioraamaSyote) +
   PalloKierto.KehysNielija + UI-pintojen ClickEvent TrickleDown. Käännös ec5819d17 → kehyshaivytys-201b-app ketjun lopussa (odottaa,
   kunnes muita käännöksiä ei ole). `ui kehysnapit 0|1|tila|himmea|esiin`. LS lisää museon lattia/teos
   (SyoteLukko.NapautusNielty, LS:n luovutus caebd2f31). SEURAAVAKSI: < 1 min video Kip + ISS (avaus → 5 s → himmeä → napautus tyhjään
   esiin ilman toimintoa → uusi napautus toimii) → PT täysikokoisena → KK. Poikkeama: häivytys 250 ms (tyylikirjan kesto-maksimi), ei 0,6 s.
   Tarkista simussa: viimeisin osuma (`ui kehysnapit tila`) Cupolassa ja Kipissä = maailma (ei koko ruudun UI-elementtiä).
4. **ISS-hammasratasluonnos (omistaja 23.00, EI rakenneta):** pohjakuvat valmiina todistus-maakunta-{iphone-…-2305, ipad-…-2310}/kuvat/raaka
   I0-poyta (pöytä ilman valikkoa), I1-valikko-nyk, I2-valikko-nyk-alas. Tee luonnos koosteena (Playwright Chromium:
   /Users/Shared/Claude/Matkakirja-fable/node_modules/playwright; HTML simukuvan päälle; hammasratas = Ikonit.Ratas-SVG pöydän kaiverrustyylillä)
   → nyt | uusi iPhone + iPad + pöytä hammasrattaineen täysikokoisena PT:lle. Puuttuva pohja (koko näkymän pehmennys) luonnoksen mukana.
5. **Pulun uni historialinsseissä (KS:n v5:ssä):** natiivi-ui/pulu-uni-historia-200 3fa8d8fe5 (Kiina, Keksinnöt, Ihmisen matka, Isoisä 1873);
   KS yhdistää kiina-paketti-200:aan.

## Apit _tyo/natiivi-ui (≤ 2 + käytössä)
maakunta-201-app (65cb17d60), lasipohja-201-app (tulossa 00228d16d), kehyshaivytys-201b-app (tulossa ec5819d17), kehyshaivytys-201-app (4c52e5b79,
VANHA → pois), ohjauspoyta-201-app ja yhteis-pariisi-200f-app (pois, kun uudet varmistettu).

## Opit
- Linjan 2 lukko on kilpajono (mkdir): oma odottaja ohittaa muut; omistajan odottamat ensin → ketju, joka jonottaa vasta muiden jälkeen
  (lasipohja-201-perassa.zsh). Lukossa olevaa käännöstä ei tapeta (orpo Unity); odottajan saa pysäyttää.
- Saman app-kansion kaannos.out: uusi korjaus omaan kansioon (…-201b-app), jos edellinen on vielä ketjussa.
- Lasipohjan lähde (AsetaLahde) vain, jos paneeli on kuvan PÄÄLLÄ; astrokuvan selite on kartan päällä → pallon kamera.
- Täysikokoisena katsominen ennen PT:tä (KK:n työtapa): pienennetyssä arkissa 10 %:n läpikuulto ei näy.
- `ui maakunnat` tarvitsee avaimen (FRA:Île-de-France), muuten lappu jää "Napauta maakuntaa kartalla".
- PalloKierto on Matkakirja.Kartta-kokoonpanossa: ei näe SyoteLukkoa → oma staattinen koukku (kuten Sieppaaja, UiPeittaa).
- Pohjavahti: UI-siirtymät ≤ 250 ms tyylikirjan tokeneilla (--tk-kesto-*).
