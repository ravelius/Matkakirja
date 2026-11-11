# Natiivi-UI: luovutus 11.11.2026 klo 22.52 (kontekstivahti 26 %; jatkaa -2217:ää 058a143d8 ja -2155:tä c91efb27b)

PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, KK local_d5f31591-21fa-4cb0-bab3-bcd3435d075a,
Postivahti local_1f31f830-9df5-41c1-8992-172e100af57f, NS local_0f7f169f-2ceb-43d2-8fb4-223dda2c0870.
Worktreet ja työkalut kuten -2155: junan haara /Users/Shared/Claude/wt/nui-a-kortti (natiivi-ui/intro-nimet-kortti), pulun haara
/Users/Shared/Claude/wt/proto-nui-pallo (natiivi-ui/intro-nimet); tarkistus `sh Peli-testit/unity-tarkistus.sh </dev/null`.
UUSI TYÖKALU /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/tyokalut/pino.py: kuvakaappaus → lähin TALLENTEEN ruutu → kuvan keskikaista
lokin lepo-rivistä, pinona (`OUT=x.png python3 -I pino.py <ajokansio> <tallenne>:<kuva.png>:<N>[:<VALI>] …`; VALI 0 Pariisi, 1 Lontoo).

## TEHTY 22.17–22.52 (kaikki KK:n hyväksymiä)
1. INTRON NIMIRIVIT (KK 22.19: pitkä nimi mustana) → e6e0a7eb8: kirjainkoko 0,07 × kuvan leveys kaikissa, rivi > 90 % → nimi / vuodet kahdelle
   riville, reuna + varjo kirjainkoon mukaan (SaapumisKuvat.LisaaIntroNimi), `ui traileri ohita` (Saapumistraileri.TestiNapauta).
   intro-nimet-6 + ohitus-nimet-1 katsottu, KK 22.39 HYVÄKSYTTY (pino lokit/nui-intro-nimet-6-e6e0a7eb8/kk/nimirivit-8-pino.png).
2. ISOISÄN TAITTO (taitto-1 hylätty itse: alaosa näkyi ennen jakoa) → 9b40700f3 (pulku) / junassa 37ca27dbd. taitto-2 KK 22.44 HYVÄKSYTTY.
3. JUNAN HAARA natiivi-ui/intro-nimet-kortti = 37ca27dbd (e6e0a7eb8 + taittokorjaus). PT:n pt-ok kirjoitettu; ohitus-nimet-1 puhdas
   (d2-ohitettu.png) → PT:lle ja KK:lle ilmoitettu 22.5x. JU: MR83 = 224.88. VALMIS NUI:n osalta.
4. PETIT PALAIS -5 (a0c49d779): KK 22.51 HYVÄKSYTTY, junasana PT:lle. KK:N EHTO ennen omistajalle kertomista: pelaajan polku junan Mac-ajossa →
   sk-petit-palais-juna-1.txt (ilman kehittäjän juurta) annettu JU:lle. ODOTA tulos: "merkkejä 26" + "Petit Palais esitellään" → KK:lle rivi.
   Jos "merkkejä 25": PP:n juttu ei ole julkaistussa sisällössä → PT:lle (sisällön vienti), ei NUI:n koodivika.
5. NS:lle luennan viive (2,1 s) kirjattavaksi hänen riviinsä (KK 22.19).

## SEURAAVA (järjestys)
A. VAKIOAJO 210c842ad JU:lla käynnissä 22.47 → "VAKIO PUUTE" -rivit, korjaa (Pariisissa 14 kohdetta). (3D-tähden tarkistusta EI tarvita, ks. B.)
B. ~~PERUTTU~~ — KK 22.53: ÄLÄ TOTEUTA. Omistaja 10.11. 06.0x halusi tähden pysyvän kierrossa paikallaan esineenä kartalla;
   lähikuvan iso tähti on sen seuraus, ei vika. Muiden merkkien häivytystä esittelyn ajaksi ei tehdä ilman omistajan sanaa. (Alkuperäinen:)
   KK 22.51 ERILLINEN LÖYDÖS (luvattu KK:lle 22.5x): esittelyn lähikuvassa viereisen KADONNEEN rakennuksen 3D-TÄHTI (Palais de l'Industrie,
   PiirrosKerros.Tahdet.cs: 48 m:n taulu, b630c2ef7 juna 224:ssä 10.11. alkaen = omistajan versiossa) kasvaa ~15 %:iin ruudusta ja kulkee
   Liiku-sauvan alta (petit-palais-5: 14-petit-palais-3-90.png oikea ala, tallenne ~9 s ja ~33 s). KK:N LINJA: esittelyn ajaksi MUIDEN kohteiden
   merkit häivytetään pois, palaavat esittelyn loputtua. Toteutus: NostotKartalla.JulkaiseTahdet3D tyhjä lista esittelyn ajaksi (paitsi
   esiteltävän oma tähti) + muiden merkkien (UI-kyltit) häivytys; esittelyn tila NahtavyysEsittely (tila-kenttä on private → lisää julkinen
   "käynnissä + id"). Tee TARINAMERKKIEN TOISEN KIERROKSEN yhteydessä (KK:n sana; tarkista mikä se on: PT:n päätösloki 10.11. 21.12/21.27
   "tarinamerkit yksinkertaisiksi") ja näytä PARI (ennen/jälkeen samasta esittelyn hetkestä) KK:lle.
C. aarrekysymys-1 (79f883671) JU:n jonossa vakioajon jälkeen → katso -2217 kohta 3 → KK.

## LISÄYS 22.5x
- PT/KK 22.53: junan 224.88 Mac-ajoon isoisän kortti taitettuna → sk-taitto-juna-1.txt (ilman fokusvirrat-juurta) JU:lle → lokit/nui-taitto-juna-1-<sha>.
  Katso t1–t3 → KK. Jos "kuva taitettu" ei tule: linkkiversion Pariisin merkinnällä ei sivukuvaa → PT.
- JU: petit-palais-juna-1 alkaa, kun MR84 (224.89, a0c49d779) on junassa → lokit/nui-petit-palais-juna-1-<sha>.
