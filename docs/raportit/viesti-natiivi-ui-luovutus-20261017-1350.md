# Natiivi-UI: luovutus 17.10.2026 klo 13.50 (Postivahti: kova raja 37 %)

Natiivi-UI (Opus) → seuraava Natiivi-UI-sessio. Korvaa -1200:n jonon. Aiempien luovutusten "Opit" (-1200, -0930, -0625, -0320, -0140, -0105) ovat yhä voimassa.
Viestit lähetetään send_messagella session id:llä (osoitteet: /Users/Shared/Claude/osoitekirja.md). PT:lle enintään 3 riviä.
Simua käytetään VAIN Julkaisijan SIMU NYT -viestistä, ja SIMU VAPAA lähetetään perään. Uusi käännösodottaja ilmoitetaan Julkaisijalle ETUKÄTEEN.
Ajot: /Users/Shared/Claude/proto-3d/tyokalut/natiivi-ui-ajot/ (ajo-*.zsh, sk-*.txt, ketjut-20261016/*). Laitteet: iPhone 123B4B25-36B7-4A76-B677-905621CD8F5A, iPad F7513985-C8BC-4E97-8D29-9C9BD420E962.

## OMISTAJAN PÄÄTÖKSET (sanatarkasti, PT:n kautta)
- **13.27 lasigalleria:** "Kyllä, lasi linsseihin (Suositus)". Gallerian pohjaan lisätään lasipinta, jota käytetään linssien ja pelien sisällä; laukun julistegalleria pysyy paperilla. PT: lasiversio GALLERIA-pohjaan (Lasipohja), ISS:n Kuvat-galleria lasille, uusi pohjavariantti tyylikirjaan, arkkiin kuva lasigalleriasta (iPhone + iPad) ja todiste, että laukun galleria on yhä paperilla. Arkki PT:lle → KK ennen junaa.
- **13.30 kamerapöydän napit:** "Tee omat oikeat napit kameran ohjauspöydälle. Voit käyttää nykyistä pöytää pohjana mutta piirrä tarvittavat osat uusiksi."
  PT:n tavoite: napit SEURAA, LENTO, LAAJA, TELE, KAMERA ja laukaisin näyttävät oikean avaruusaseman laitteen napeilta, eivät päälle liimatuilta tarroilta. Napit ovat osa metallilevyä, ja nimet on kaiverrettu tai painettu levyyn. Valittu tila palaa napin sisältä. Painettaessa nappi painuu ja napsahtaa (olemassa oleva äänipohja). Esikuvana Cupolan robotiikkatyöasema. Nykyinen pöytä pohjana, tarvittavat osat uusiksi terävinä iPhonelle ja iPadille. Samat osat lentopöydän puolelle. Kirjaa tyylikirjaan pohjaksi muille laitepöydille. Jos osia generoidaan kuvina, tarkka määrä ensin PT:lle → KK:n kortille; ei generointia ennen lupaa; mieluiten koodilla tai vektoreina. Kuvapari nykyinen | uusi (iPhone + iPad) PT:lle → KK ennen junaa. **Kamerapöytä menee junaan vasta uusien nappien kanssa.**
- **JÄRJESTYS (PT 13.4x):** lasigalleria + arkki → napit → kuvapari KK:lle → junaan.

## TILA 13.50
- **Kehys-käärö valmis:** natiivi-ui/kaaro-rajat-200 **288035f99** (⊃471163876 + Kiinan karusellin nauhan korkeus ilman kuvaa → vaakakuvan alarulla oikein) on kuitattu NS:lle junaan 200 (PT). Web #4803 mergetty 0b2cb2bf9.
- **Kamerapöytäpaketti**, haara natiivi-ui/kamerapoyta-198 (kärki **26a3cbc9a**), PT:n löydökset tehty:
  1. dda86c6fd: etsimen alarivi Pulun valintarivin yläpuolelle (iPad "24 mm · NANCY").
  2. K1c:n valkoinen huntu EI ole välähdys: kyydin pinta vaihtuu kuvan pinnasta S2-maailmaan (AstronauttiKerros.PaivitaS2, Valosepän) ja laatat latautuvat sekunteja. Skenaariossa K1c-sarja +1/+3/+6 s kestolle. Kerro PT:lle arkin kanssa → Valoseppä (ehdotus: S2 häivytetään sisään myös kuvan pinnan poistuessa).
  3. ef96d0769: valintarivi väistää Pulua (Pulu.Hae().Lintu, rivi päättyy Pulun vasemmalle, Wrap).
  4. 6d034cc5e: GALLERIA-pohjan lasipinta: `.mk-galleria--lasi` Lasipohja.Luokissa, ISS-galleria `mk-galleria mk-galleria--lasi tk-teema-lasi-avaruus`; laukku paperilla. Web-PR **#4811** (tyylikirja GALLERIA teemat paperi/lasi/lasi-avaruus + styles.css-lohko), CI kesken → merge kaavan mukaan.
  5. 26a3cbc9a: **LAITENAPIT v1** (ks. alla).
- **Yhteishaara** natiivi-ui/yhteis-pariisi-200 (wt/proto-natiivi-ui-yhteis-pariisi-200) = juna 200 52a6f3c04 + kamerapöytä-198 + cupola-ohita-197 (+ PohjaLahde-korjaus 3d0280f0a; PK teki saman omaan haaraansa 64b347452) + kaaro-rajat-200. Ratkaistut ristiriidat: LinssiKomennot (kamerapoyta + ohitaesittely), IssLoppuvalinta (ohita + RiviRuudulla), Lasipohja (junan 200 aanentasot-pois + galleria--lasi).
  - App c **ffded4a57** (_tyo/natiivi-ui/yhteis-pariisi-200c-app) käännetty 13.37: kaikki paitsi laitenapit.
  - App d **3256e5f1d** (yhteis-pariisi-200d-app) käännöksessä (ketju yhteis-pariisi-200d-kaannos.zsh): + laitenapit.
- **Simuvuoro ~14.15** (Julkaisija, LS:n jälkeen, ~25 min): ajetaan d:llä (jos käännetty, muuten c):
  `zsh ajo-yhteis-pariisi-200.zsh <app> <udid> iphone|ipad` (sk-yhteis-pariisi-200.txt: L1 laukun galleria paperilla, O1, K1–K6 nykyisillä LCD-napeilla `laitenapit 0`, K6 lasigalleria, K1c-sarja) ja
  `zsh ajo-laitenapit-200.zsh <app> <udid> iphone|ipad` (sk-laitenapit-200.txt: N1 lentopöytä NYK/UUSI, N2 kamerapöytä NYK/UUSI, N3 SEURAA palaa). SIMU VAPAA perään.

## LAITENAPIT v1 (26a3cbc9a)
- Osat: Resources/IssOhjaamo/laitenappi-{pois,palaa}[-painettu].png (@3x 43 × 25 pt, 9-slice 8 pt, laitenappi.json), Blender CC0:
  `/Applications/Blender.app/Contents/MacOS/Blender -b --factory-startup --python tyokalut/ohjaamo-napit/napit.py -- <kansio>` (LAHTEET.txt kirjattu). Ei kuvageneraattoria → ei lupakorttia.
- Koodi: IssOhjaamo.Laitenapit.cs (KytkeLaitenappi: painallus → painettu-kuva + Aanet.Tehoste("clack"); PukeudaLaitenappi; A/B `ui linssi kamerapoyta laitenapit 0|1`), iss-ohjaamo.uss LAITENAPPI-lohko (nimi Mittari-kirjasimella, sammunut --tk-tumma-muste, palava --tk-lcd-pinta, painettu 1 px alas).
- **Poikkeama PT:n speksistä, kerro kuvaparin kanssa:** nimet ovat napin valolevyssä (ISS:n valaistut painonapit), eivät levyssä napin vieressä: objektiivirivillä (LAAJA/TELE, KAMERA) tilaa vain ~22 pt ylärivin ja punaisen napin välissä. Laukaisin (punainen kamera.png + kamera-painettu.png) on jo renderöity fyysinen nappi, ennallaan.
- Kamerapöydän levy näyttää yhä lentopöydän merkinnät (KIIHDYTYS/SIJAINTI); "pohja-kamera"-kuva tukeutuu koodissa, jos se tehdään (ei vielä).
- Pohja LAITENAPPI tyylikirjaan vasta, kun kuvapari on hyväksytty (web, kuten #4811).

## ENSIN
1. Julkaisijan SIMU NYT (~14.15) → molemmat ajot iPhone + iPad (yllä) → SIMU VAPAA. Katso arkit itse (K6 lasi, L1 paperi, N1–N3 napit terävinä, pressed ei kuvassa).
2. Arkki + kuvapari PT:lle (≤ 3 riviä, polut) → KK. Mainitse huntu → Valoseppä ja nimien paikka napin pinnassa.
3. Hyväksynnän jälkeen: tyylikirjaan LAITENAPPI, #4811 merge, kamerapöytäpaketti junaan (kamerapoyta-198 on vanhalla pohjalla: junaan yhdistäessä samat ristiriidat kuin yhteishaarassa; Lasipohjassa junan rivi voittaa + galleria--lasi).
4. Apit: _tyo/natiivi-ui:ssa vain c ja d (muut poistettu 13.4x). Kun d varmistettu, c pois.

## Opit
- Lukossa olevaa käännöstä ei vaihdeta: uusi korjaus omaan app-kansioon (…-200b/c/d-app), ettei kaksi ketjua kirjoita samaan kaannos.out:iin.
- Aja `zsh ./tyokalut/tarkista.sh` paikallisesti yhteishaarassa ennen jonoa (cupola-ohita-197 kaatui junan 200 äänipohjaan).
- Todistuksen "haara ei sisälly käännökseen" -PUUTE on odotettu, kun haaran kärki siirtyy käännöksen jälkeen.
- Blenderin lisäosa (faceit) sotkee lokin: aja `--factory-startup`.
