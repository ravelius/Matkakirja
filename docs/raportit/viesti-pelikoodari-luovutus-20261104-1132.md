# Pelikoodari: luovutus 4.11.2026 klo 11.32 – tarkastelutila aloittamatta, rakenne valmis; ☰ ja viivat JU:lla

Korvaa -1042:n kokonaan. Syy: konteksti 26 % (7.37). Polut kansiossa /Users/Shared/Claude/proto-3d/. Mittaustulokset `lokit/pk-muistipiikki-219/TULOS.md`, lue 11.24 alkaen. **Merkitse jokaiseen tulokseen runko.**

## Työ nyt: OMISTAJAN PÄÄTÖS 11.26, juoksupelin tarkastelutila, osa A
Lue koko suunnitelma: `/Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261104-juoksupeli-tarkastelutila.md`. KK 11.3x: ensin pelikamera, kierros, väreily ja puuttuvat pinnat, heti perään kuljettavuus. Uudet paikkakohtaiset seinä-, katto-, kamera- ja kuljettavuuskorjaukset odottavat lähtötilannetta, ellei PT pidä jotain junan esteenä. Mac-ajon tulos ja kuvien polut KK:lle (local_d5f31591); iPad-ajo JU:n vuorolla. Esikatseluvuoro pyydetään JU:lta. Työlistan rivi "Juoksupelin tarkastelutila" on lisätty.

**Tilanne:** koodia ei ole kirjoitettu. Koodista löytyvät KK:lle kerrottu (rivi jonossa 11.3x). Haaraa tai työkopiota ei ole: tee `pelikoodari/tarkastelu-219` rungosta c4a5bfafb omaan worktreehen `/Users/Shared/Claude/wt/proto-pelikoodari-tarkastelu`. `wt/proto-pelikoodari-juna-koe` jää -syy-kokeelle.

### Valmista koodissa (c4a5bfafb)
- `ui juoksupeli valo sijoita x z suunta [lattia]` (`JuoksuV4Maailma.Sijoita`, cs 264): Puyi pohjan koordinaattiin, pelikamera säännöillään, katot Puyin paikasta. `sijoita 0` pois.
- `valo jaady 1|0` (`Valo.cs` 510): timeScale 0 ja `Jaadytetty`, dt 0. `valo testikamera K T A F` (`Valo.cs` 215, 492, 555): kamera siirretään vain piirron ajaksi `beginCameraRendering`-koukussa ja palautetaan `Jalkeen`-koukussa. **Tämä on malli vapaalle kameralle ja väreilyn liikkeelle.**
- `HuojuntaPois` (Valo.cs 214): ilman sitä kuvat erosivat ajojen välillä 8–40/255. Pakollinen toistettavuudelle.
- `mika x y` nimeää piirtäjät; kolmio vain, jos `palatsi kopiot 1` (seuraavalla avauksella). Rajalaatikkolista toimii ilman kopioita. Käytä pahimman pikselin nimeämiseen, jolloin "vihreät boordit" saa nimen koneelta.
- `taivas 0`; `valo jalki 0`; `palvelijat`; `botti 0`, `opetus 0`, `avaus 0`, `taso 1`, `v4`. Verkko: `maailma.Verkko.Solmut` (X, Z, N[4]; `Auki(i, s)`), `Pohja.Rakennukset`, `Pohja.Muurit`, `Pohja.Paikat`; koordinaatit `pal.Pohjaan`, `pal.Maailmaan`.
- LOD: `PaivitaPalatsi` (Palatsi.cs 1231) valitsee `KuvausKamera ?? KameraPaikka ?? puyi`; siirtymä edistyy vain, kun dt > 0 (`LodSiirtymaS` 0,4 s). Vapaalla kameralla aseta `KuvausKamera`.
- Testinäkymä: `UI/Testinakyma.cs`, osio Suorat aloitukset (suunnitelma 20261103-testien-suorat-aloitukset.md). Omat renderöintivaiheet: mallit `Kartta/ElavaKerros.cs` 411 ja `Kartta/Lasitausta.cs` (`EnqueuePass` + `RecordRenderGraph`).
- `JuoksuMaailma.shader` on `Cull Off` ja fragmentissa on jo `bool etu : SV_IsFrontFace` (rivi 250). `JuoksuLattia.shader` samoin (495).

### Ehdotettu rakenne (omani, ei kokeiltu)
1. **Koukku:** `JuoksupeliNakyma.PaivitaRuutu`: kun maailma on näkyvissä, lämmitetty ja latauskuva pois, `if (tarkastelu != null) { saanto.Piirra(maailma, tarkastelu.Ruutu(vm)); return; }` ennen `Nakyvissa`-porttia ja avausta. Ei `saanto.Askel`-kutsua, joten ei ajastinta eikä häviötä. Normaalipelissä vain null-tarkistus. Uusi tiedosto `Scripts/Juoksupeli/JuoksuTarkastelu.cs` ja partial `JuoksuV4Maailma.Tarkastelu.cs` yksityisiin kenttiin: `esteet` ja `takaAjaja` piiloon `Piirra`:n jälkeen joka ruutu (Paivita asettaa `esteet`:n takaisin, ja `Nakyvissa` riippuu siitä, siksi portin ohitus), `alustettu = false` hyppyyn.
2. **Pisteen kulku, ruutuihin sidottuna eikä kelloon:** sijoita → `alustettu = false` → 30 ruutua dt 1/30 (kamera ja LOD asettuvat samoin Macilla ja iPadilla) → timeScale 0, dt 0 → mittaukset. Tarkista, ettei sijoitus jää LOD-siirtymään.
3. **Väreily:** 4 ruutua paikallaan ja 6 ruutua hitaasti kääntäen koukussa, 0,5 kuvapistettä per ruutu (yaw = 0,5 × vaakakenttä / leveys). Kääntö pitää kuvapistenopeuden samana syvyydestä riippumatta, siirto ei. Mittari **toinen aikaderivaatta** |f(i−1) − 2f(i) + f(i+1)| kirkkaudesta: tasainen alle 1 kuvapisteen liike antaa pienen arvon, väreily suuren, joten liikkuva reuna ei hälytä. Luvut: kynnyksen ylittävien osuus, ruudukon (esim. 16 × 12) pahin solu ja sen keskipiste.
4. **Pinnat:** erillinen mittausruutu väreilyn jälkeen: globaali `_JuoksuTarkastelu`: `if (!etu && _JuoksuTarkastelu > 0.5) return kirkas väri` JuoksuMaailma- ja Lattia-varjostimen fragmentissa häivytysten ja clipien jälkeen, jolloin se noudattaa kaikkia pelin katto- ja seinäsääntöjä. Tämä koskee pelin varjostinta (yksi haara): mittaa muisti ja kuva ennen ja jälkeen. `taivas 0`, taustaväri magenta ja `jalki 0` samassa ruudussa; magentan osuus horisontin alapuolella = tyhjä. Lisäksi musta (kaikki kanavat ≤ 4), koska musta maa on ollut tämän rungon vika. Kirkas väri pitää tunnistaa sävyn perusteella, koska jälkikäsittely muuttaa arvoa.
5. **Kaappaus:** oma vaihe `AfterRenderingPostProcessing`: blit `activeColorTexture` → RGBA8 RT, `AsyncGPUReadback`, seuraava askel vasta tuloksen jälkeen, joten ruutuja ei pudoteta. Pelkkä 3D, ei UI:ta. Batch-ajossa ei ole näyttöä, joten ScreenCapture ei käy. **Avoin:** tuleeko kuva ennen ylöspäin skaalausta (skaala 0,8 isolla iPadilla); kirjaa tuloksiin.
6. **Pahimmat kuvat:** kierroksen jälkeen 20 pahimman pisteen uusi käynti: PNG ja `mika` pahimmassa solussa. iPadin siirto on noin 7 Mt ja 4 s/kuva, joten kuvia vain näistä.
7. **Kierros:** kuljettavat solmut harvalla ruudukolla (aloita 40 m, arvioi aika), 4 suuntaa, pelikamera; lisäksi `Pohja.Rakennukset`: 4 sivua ja ylhäältä vapaalla kameralla; lisäksi havainnekohdat 01–07 + 03b (`tyokalut/havainne/editori.sh`). Lista lajitellaan, sama joka ajossa. Määrää enimmäismäärä, mittaa Macilla piste/s.
8. **Vapaa kamera:** komento `ui juoksupeli tarkastelu kamera x y z yaw pitch` ajoihin, kosketus omistajalle (yksi sormi kääntää, kaksi siirtää), Testinäkymän rivi. Puyi piiloon.
9. **Tuloste:** Documents/tarkastelu/tulos.jsonl + kuvat; `tyokalut/tarkastelu.sh` (Mac esikatselu.sh, iPad JU) → `lokit/tarkastelu-<sha>/yhteenveto.md`, 20 pahinta koordinaatteineen, vertailu edelliseen, viimeinen rivi OK tai VIKA (7.48).
10. **Kuljettavuus sen jälkeen:** ylhäältä kartta solmuista ja `JuoksuPalatsiEsto`sta, täyttö lähtösolmusta. Ristiriidat: solmu rakennuksen sisällä, kamera seinän sisällä (`DroneNosto`), Puyi ei näy.

**Todistus KK:lle (suunnitelma):** (1) vihreät boordit listan kärjessä, (2) tunnettu puuttuva pinta löytyy, (3) kaksi ajoa samalla versiolla lähes samat luvut, (4) normaalipelin muisti ei muutu.
**Varo:** muistin marginaali on pieni; tila ei saa ladata mitään normaalipelissä. Kuvat ja RT:t vain tilassa. Kiinteä ruutumäärä ei takaa, että etäiset osamallit ovat ladanneet: tarkista latausjonot.

## Odottaa JU:lta (kaikki pyydetty)
1. **☰-koe e65d4a4ef** (`pelikoodari/juna-218-koe2-kanavat-syy` = c4a5bfafb + syy ui-lokiin, tarkista.sh läpi, ei laiteajoa): `pk-mittaa-uusinta-nappi.zsh e65d4a4ef 1 40`. Lue `grep 'juoksupeli: valikko avattu' ui-loki.txt` ajon alusta eteenpäin (loki kertyy ajosta toiseen). **PT:n päätös:** fokus = suunniteltu käytös (2.201), testin häiriö, ei korjausta; kosketus = selvitä lähde. Jos avausta ei tule, syy jää auki (näkynyt 1 kerran 1 ajossa). Rivi PT:lle.
2. **Viivat:** `_tyo/pelikoodari/musta-lento/aja-viivat.zsh c4a5bfafb` (Mac, ei koeajettu): aika seis 9,6 ja 9,8 s, mika x 0,15 ja 0,75, y 0,63–0,73. Tulos `viivat-c4a5bfafb/mika.txt` ja tallenteen av-kuvat; rivi `VIIVAT AJETTU`. Etsi kuvasta viivan y ja lue sen kohdan KOLMIO. Jos viiva katoaa `palatsi kopiot 1`:llä, sekin on tulos. Rivi KK:lle ja PT:lle, kun syy selviää. Paikkakohtaista korjausta ei tehdä ennen lähtötilannetta (KK 11.3x), ellei PT toisin sano.
3. **Reittiajo** `REITTI AJETTU c4a5bfafb` (`peitto-reitti/aja-runko.zsh`): katso kuvat ja kirjaa TULOS.md:hen.

## Päätetty ja todettu (c4a5bfafb, iso iPad)
- **Muisti, PT 11.2x:** ensilento 4/4 alle rajan (4068, 4054, 3947, 3931 Mt, raja 4080, varoituksia 0, musta 0,00 % 48/48), ei korjausta nyt, 1af126155 pysyy poissa. **Uudet muistia lisäävät erät mitataan lukuihin ka 4000 ja huippu 4068.** Ero ajojen välillä on int + comp -osassa, gfx ja malloc lähes samat, syy auki.
- **☰-koe c4a:** 8 listausta 36,2–40,8 s lennosta, ei avannut (kuva katsottu), joten listaus ei selitä sitä säännöllisenä syynä.

## Muistiinpanot
- `TULOS.md` ei ole gitissä. Proton commitit samassa gitissä, kaikki worktreet näkevät ne.
- `tarkista.sh` ajetaan zsh:lla ja päivittää tyylikirjan kopion: palauta `git restore` kolmelle tiedostolle (Tyylikirja.uss, Tyylikirja.cs, tyylikirja.json).
- `MikaKolmio` lukee vain luettavat verkot. Linja: JU:n "ESIKATSELU NYT" ennen ajoa.
- zsh: `echo ==` ja `${(f)…}` kaatavat komentotarkistuksen; aja lyhyet komennot erikseen.
- Ids: PT local_8d8ebf72, JU local_2a7d6c96, KK local_d5f31591, Postivahti local_1f31f830.
