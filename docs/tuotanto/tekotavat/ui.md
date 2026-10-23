# B Tekotavat: UI (natiivi)

*(Natiivi-UI 21.10.2026, Raamattu 4.21 STUDIOJAKO (omistaja 21.10.2026 klo 18.02). Käytännön tekotapa napille, paneelille, kortille
ja ikkunalle natiivissa pelissä (proto-git, Unity UI Toolkit). Laatutaso: A Suunta; tuotetyypin kooste: C Reseptit; vaiheet, portit
ja luvat vain D Tuotannonohjauksessa. Kooste juna 209:n yhteisistä osista ja 1.–21.10. opeista; uusia sääntöjä ei ole. Raamattu
voittaa ristiriidassa: 2.70 linssien ja 2.201 pelien yhteiset säännöt, 4.1 UI-POHJAT, 4.2 KORTTI, 4.14 liike.)*

## 0. Periaatteet: mitattavat ja näytettävät

*(Omistaja 21.10.2026 klo 18.16: "Kyllä, mutta täytyy määritellä vielä tarkemmin." Jokainen periaate on luku tai ehto, joka
mitataan koneellisesti tai näytetään kuvalla. Sarake "Päätös": Raamatun tai tyylikirjan jo päättämä, tai omistajan
korttivastaus (K2, K3, K6, K7 ja K9: omistaja 21.10.2026 klo 19.43–19.45, kaikki "Kyllä (Suositus)").)*

| # | Periaate | Mitta | Miten mitataan tai näytetään | Päätös |
|---|---|---|---|---|
| P1 | Taustan tummennus kertoo panoksesta | aste 0 selailu: ei tummennusta (kohdekortti, minipopup, paneelit); aste 1 harkinta: kevyt tummennus ja sumennus (varmistukset, `ModaaliTaso`); aste 2 panos: reunoilta kuultava tumma sumennus (tehtäväkortti, aarrepaljastus, kysymys) | merge-pyynnön rivi "Pohja: …, aste n"; kuva kustakin uudesta pinnasta | päätetty (4.9) |
| P2 | Ohinapautus | paneeli ja nosto sulkeutuvat ohinapautuksesta; valintaa vaativa kortti ei sulkeudu, vaan vain sen napeista | skenaario: `tap` kortin ulkopuolelle → lokista auki/kiinni | päätetty (K2, omistaja 21.10. 19.43; 4.10) |
| P3 | Kortin korkeus | kortti enintään 86 % turva-alueen korkeudesta; ylimenevä sisältö vierii, napit pysyvät näkyvissä | ui-puu: kortin `worldBound.height` / turva-alueen korkeus ≤ 0,86 iPhone pysty, iPhone vaaka ja iPad | päätetty (K3, omistaja 21.10. 19.43) |
| P4 | Peitto | asteen 0 selailupinta (kohdekortti, minipopup, paneelit) peittää enintään 45 % ruudusta (`mitat.peitto.max`) ja on kohteen vieressä; modaali (aste 1–2) mitataan P3:lla (PT 23.10., 4.4:n ja K3:n tulkinta), ei koko leveyden arkkina; poikkeus ISS-kohdevalikko (PYSÄYTYSKUVA) | ui-puu: pinta-ala / ruudun pinta-ala | päätetty (4.4) |
| P5 | Avaus- ja sulkuajat | avaus 220 ms, sulku 200 ms (avaajan suunnasta kasvaen ja häivyttäen, sulku samaa reittiä), ease-in-out, mikään UI-siirtymä ei yli 250 ms; vähennetty liike = pelkkä häivytys | pohjavahti (USS `transition-duration`), `Tyylikirja.Kesto` koodissa | päätetty (4.14, 4.15) |
| P6 | Napin koko | tekstinappi 38 pt (`mitat.nappi.korkeus`, omistaja 6.10.), kuvakenappi 40 pt (`mitat.nappi.ohjaus`); samassa rivissä yksi koko | ui-puu: rivin nappien korkeudet samat | päätetty |
| P7 | Kosketusala | jokaisen napautettavan osuma-ala vähintään 44 × 44 pt (`mitat.nappi.osuma`), myös pienen kuvakkeen | ui-puu: napautettavien `worldBound` ≥ 44 pt kumpaankin suuntaan | päätetty (K6, omistaja 21.10. 19.43) |
| P8 | Reunaväli | nappi tai teksti vähintään 8 pt (`mitat.vali.s`) turva-alueen sisäpuolella (vrt. 4.4 UI-SPEKSI "reunus 8 pt") | ui-puu: etäisyys turva-alueen reunaan ≥ 8 pt | päätetty (K7, omistaja 21.10. 19.43) |
| P9 | Kelluvat eivät peitä | Pulu, kuplat ja kertojan kaistale eivät koskaan ole napin tai kortin painikkeiden päällä | ui-puu: kelluvan ja napin `worldBound`-leikkaus = 0 | päätetty (4.1, 2.70) |
| P10 | Teksti ei leikkaudu | teksti rivittyy tai lista vierii; lyhennys "…" vain kuvarivin nimessä (esim. aikajanan muotokuvat), ei napeissa eikä otsikoissa | ui-puu: tekstin mitattu leveys ≤ elementin leveys; kuva pisimmästä nimestä | päätetty (K9, omistaja 21.10. 19.45) |
| P11 | Sulkeutuminen mukana | kun linssi vaihtuu tai peli loppuu, kaikki sen avaamat ikkunat sulkeutuvat samassa ruudussa ja syötelukko vapautuu | skenaario: avaa ikkuna → `linssi linssi pois` → ui-puussa ei ikkunaa, napautus toimii | päätetty (2.70) |
| P12 | Poistu | Poistu on aina ☰:n alin rivi; erillistä ✕:ää ei ole | ui-puu: ☰:n viimeinen rivi = Poistu | päätetty (2.70, 2.201) |

### 0.1 Rajat numeroina

*(Natiivi-UI 23.10.2026, PT:n tilaus Raamattu 4.21 "tarkennetaan mitattaviksi". Ei uusia linjauksia: luvut ovat tyylikirjasta
(`tyylikirja/tyylikirja.json`) ja yllä olevista päätöksistä. Yksikkö pt = UI Toolkitin yksikkö = webin px. Merkintä
"N pt (`polku`)" on tyylikirjan arvo; `tests/ui-periaatteet.test.mjs` tarkistaa, että luku täsmää tyylikirjaan.)*

**Laitteet, joilla mitataan (todistusajon simulaattorit).** Turva-alue luetaan ajossa (`UiKerros.Hae().Reunat`), ei vakiona.

| Muoto | Ruutu | Leveysluokka (`Pohja.Leveys`, turva-alueen leveys) | Erityistä |
|---|---|---|---|
| iPhone pysty | 402 × 874 pt | KAPEA (< 600 pt (`mitat.leveys.kapea`)) | nostokortti alareunaan; yläreunassa Dynamic Island |
| iPhone vaaka | 874 × 402 pt | KESKI (600–939 pt) | MATALA: korkeus < 500 pt → kaksi saraketta (`mk-kysymys--matala`), lauta + palsta (`PelinAsettelu`) |
| iPad pysty ja vaaka | 1032 × 1376 pt | LEVEÄ (≥ 940 pt (`mitat.leveys.levea`)) | kirjasinportaat leipä…arkki + 2 pt (`typografia.leveaLisa`); sivukortti oikeaan reunaan |

**Mitat (pt).**
- Tekstinappi 38 pt (`mitat.nappi.korkeus`); kuvakenappi (OHJAUSNAPPI) 40 pt (`mitat.nappi.ohjaus`), kuvake 22 pt
  (`mitat.nappi.ohjaus-kuvake`); iso 56 pt (`mitat.nappi.ohjaus-iso`); laukaisin 64 pt (`mitat.nappi.laukaisin`). Samassa rivissä
  korkeuksien ero 0 pt (P6).
- Välit: xs 4 pt (`mitat.vali.xs`), s 8 pt (`mitat.vali.s`), m 12 pt (`mitat.vali.m`), l 16 pt (`mitat.vali.l`), xl 24 pt
  (`mitat.vali.xl`). Reunaväli turva-alueeseen ≥ 8 pt (P8).
- Leveydet: kortti 420 pt (`mitat.leveys.kortti`), paneeli 350 pt (`mitat.leveys.paneeli`), sivukortti 400 pt
  (`mitat.leveys.sivukortti`), minipopup 320 pt (`mitat.leveys.minipopup`); aina enintään turva-alueen leveys − 2 × 8 pt.
- Korkeus ja peitto: kortti ≤ 86 % turva-alueen korkeudesta (P3); kortti tai paneeli ≤ 45 % (`mitat.peitto.max`) ruudun alasta
  (P4); paneeli erikseen sovituissa ≤ 70 % (`mitat.peitto.paneeli`).
  Rajaus (PT 23.10.2026, 4.4:n ja K3:n tulkinta, ei uusi linjaus): modaaliin (aste 1–2) sovelletaan P3:a; P4 koskee vain asteen 0
  selailupintoja (kohdekortti, minipopup, paneelit), koska niiden takana kartan pitää näkyä. Modaali tummentaa taustan, joten peitto ei
  ole sen mittari.
- Kirjasinkoot: kapiteeli 12 pt (`typografia.kapiteeli.koko`), apuri 14 pt (`typografia.apuri.koko`), leipä 16 pt
  (`typografia.leipa.koko`), väliotsikko 18 pt (`typografia.valiotsikko.koko`), otsikko 21 pt (`typografia.otsikko.koko`), arkki
  26 pt (`typografia.arkki.koko`). Muu koko vain `/* fonttipoikkeus: syy */` -merkinnällä (pohjavahti).

**Kosketusalat.** Jokaisen napautettavan (Button, Toggle, Slider, TextField) osuma-ala ≥ 44 pt (`mitat.nappi.osuma`) kumpaankin
suuntaan (P7). Pieni kuvake saa laajennetun osuma-alan (`Kosketusnappi`-laajennus) ilman ulkoasumuutosta; piirretty koko pysyy
tyylikirjan mukaisena (Raamattu 1.14: näkyvää ulkoasua ei muuteta saavutettavuusohjeiden perusteella). Kahden osuma-alan
päällekkäisyys 0 pt; kelluva osa (Pulu, kupla, kertojan kaistale) ei leikkaa napin osuma-alaa (P9).

**Kontrasti ja luettavuus.** Numeerista kontrastisuhdetta (WCAG) ei käytetä (Raamattu 1.14). Mitattava ehto on kolme kohtaa:
1. tekstin ja taustan värit tulevat saman teeman tyylikirjaparista (`--tk-*`, `Tyylikirja.*`): kovakoodattuja värejä 0 uutta
   (pohjavahti);
2. teksti valokuvan tai 3D:n päällä käyttää `Latauskuva.Luettava` tai pohjan himmennystä (`himmennys.kevyt`, `.tumma`, `.kuva`);
3. ei ääriviivaa eikä hehkua pienen tekstin luettavuuden korjaamiseen (4.4).
Tarkistus: pohjavahti (kohta 1) ja täysikokoinen kuva vaaleimmalta ja tummimmalta taustalta (kohdat 2–3).

**Animaatioajat.** Avaus 220 ms (`liike.avaus`), sulku 200 ms (`liike.sulku`), liuku 240 ms (`liike.liuku`); mikään UI-siirtymä yli
250 ms (`liike.maksimi`). Käyrä USS:ssä ease-out-cubic (sisään), ease-in-out (pehmeä), ease-in (ulos); koodissa tarkka
cubic-bezier (`Ponnahdus`). Animaatio alkaa samassa ruudunpäivityksessä kuin napautus (4.15). Vähennetty liike: pelkkä häivytys
samalla kestolla. Jatkuva sisältö- tai ympäristöanimaatio ei ole siirtymä, ja se merkitään `/* ympäristöanimaatio … */`.

### 0.2 Tarkistustapa periaatteittain

"Automaattinen" = ajetaan aina (`tyokalut/tarkista.sh`, `npm test` tai mittari todistusajossa); "kuva" = täysikokoinen kuva iPhone
pysty, iPhone vaaka ja iPad; "skenaario" = todistusajon `oleta`-rivi lokista.

| # | Tarkistus | Automaattinen nyt | Helppo lisätä |
|---|---|---|---|
| P1 | merge-pyynnön rivi "Pohja: …, aste n" + kuva uudesta pinnasta | – | mittariin: himmennyksen väri = `himmennys.*` asteen mukaan |
| P2 | skenaario: `tap-kohta` kortin ulkopuolelle → lokissa kortti yhä auki (valintakortti) tai kiinni (paneeli) | – | todistusajon skenaarioon |
| P3 | mittari `ui periaatteet`: "P3 … (yli 86 % 0)" | mittari (`UiPeriaatteet.cs`, juna 210) | – |
| P4 | ui-puu: asteen 0 pinnan ala / ruudun ala ≤ 0,45; modaalit (`ModaaliTaso`, aste 1–2) rajataan pois (ne P3:ssa) | – | mittariin samaan silmukkaan (`worldBound`-ala, vain aste 0) |
| P5 | pohjavahti: `transition-duration` > 250 ms = virhe; tyylikirjatesti: liike ≤ maksimi | pohjavahti, `tests/tyylikirja.test.mjs` | mittariin: `resolvedStyle.transitionDuration` näkyvistä |
| P6 | ui-puu: saman rivin nappien korkeudet samat (ero 0 pt) | – | mittariin: sisarnappien `worldBound.height` |
| P7 | mittari: "P7 … (alle 44 pt 0)" | mittari | – |
| P8 | mittari: "P8 … (alle 8 pt reunasta 0)" | mittari | – |
| P9 | ui-puu: kelluvan ja napin osuma-alan leikkaus = 0 | – | mittariin: `Pulu`/kupla/kaistale × napit |
| P10 | mittari: "P10 … (leikkautuu 0)" + kuva pisimmästä nimestä | mittari | – |
| P11 | skenaario: avaa ikkuna → `linssi pois` → ui-puussa ei ikkunaa, `tap` toimii | – | todistusajon skenaarioon |
| P12 | ui-puu: ☰:n viimeinen rivi = Poistu, ei ✕-nappia | – | mittariin: `LinssiValikko`-rivit |
| Luvut | tämän luvun "N pt (`polku`)" = tyylikirja | `tests/ui-periaatteet.test.mjs` | – |

## 1. Mistä aloitat

1. **Tyylikirja on lähde.** `tyylikirja/tyylikirja.json` (pohjat, mitat, kirjasimet, liike, värit) ja selain `tools/tyylikirja.mjs`.
   Natiivin kopio päivittyy automaattisesti: `tyokalut/tyylikirja-paivita.sh` kirjoittaa `UI/Resources/MatkakirjaUI/Tyylikirja.uss`
   (USS-muuttujat `--tk-*`) ja `UI/Tyylikirja.cs` (`Tyylikirja.Vali`, `.Nappi`, `.Leveys`, `.Kesto`, `.Kirjain`, värit).
2. **Valitse pohja** (luku 2) ja **yhteinen osa** (luku 3). Uusi pinta kootaan niistä; jos osaa ei ole, se tehdään yhteiseksi kaikille,
   ei yhden näkymän omaksi (Raamattu 2.201 YHTEISET OSAT ENSIN). Puuttuva pohja: D.
3. **Vain tokenit.** Värit `var(--tk-*)` (USS) tai `Tyylikirja.*` (C#), koot ja välit `Tyylikirja.Vali/Nappi/Leveys`, kirjasimet
   `Kirjasimet.Aseta(e, Tyylikirja.Kirjain.*)`. Pohjavahti hylkää uudet kovakoodatut värit ja fonttikoot.

## 2. Pohjat (tyylikirjan `pohjat`)

| Pohja | Käyttö | Natiivissa |
|---|---|---|
| KORTTI | dialogit, tulokset, valinnat, vahvistus; paperi tai tumma (videopelit) | `Kortti(…, pohja: true)` + `KorttiRunko` |
| NOSTOKORTTI | kartan nostot, kuvanosto | `Nostokortti`, `mk-nosto--kuvanosto` |
| PANEELI (lasi) | sivupaneelit, valikot | `mk-linssivalikko--pohja`, `tk-teema-lasi` |
| OHJAUSNAPPI | kaikki kuvakenapit yhteen ryhmään oikeaan yläkulmaan | `Ohjausnappi.Nappi/Ryhma/Kytkin/Tauko` |
| LINSSIN OHJAIN, KEHYS-KÄÄRÖ | linssin kehys (historialinsseille kääre) | `LinssiValikko`, `KehysNapit` |
| LAITEPÖYTÄ, ISS-OHJAAMO | laitteen säätimet näkymän alareunassa | `IssOhjaamo`, `Kamerapoyta` |
| LAUTAPELI | lautapelien lauta ja paneeli | `PelinAsettelu`, `mk-peli__*` |
| GALLERIA, KUVANÄKYMÄ | kuvakokoelmat ja kuvan suurennus | `IssKuvagalleria`, `Kuvanakyma` |
| LATAUSKUVA, EDISTYMINEN | lataus ja sen nimi | `Latauskuva`, nimipohja `mk-astroavaus__otsikko/__nimi` |
| PYSÄYTYSKUVA | koko näkymän valikko ilman ikkunaa | `mk-pysaytyskuva` |
| KENTTÄ, MUOTOKUVARIVI, PINNATTU PALKKI, PULU, ERIKOISNOSTOT, LUKUARKKI | lomakkeet, henkilörivi, pinnattu luenta, Pulu, kartan erikoisnostot, lehti | ks. tyylikirja |

## 3. Yhteiset osat koodissa (juna 209)

| Osa | Tiedosto | Mitä tekee |
|---|---|---|
| `KorttiRunko` | `UI/KorttiRunko.cs` | kapiteeli · otsikko · apuri · teksti · korostus · lisäosa · napit (toissijainen vasemmalla, kultainen oikealla); `vierittyva` pitkälle sisällölle |
| `ModaaliTaso` | `UI/KorttiRunko.cs` | himmennys, ohisulku, syötelukko, avaus ja sulku tyylikirjan kestoilla |
| `ValikkoRivit` | `UI/ValikkoRivit.cs` | komento, kytkin PÄÄLLÄ/POIS, alanäkymä ›, takaisin ‹, viiva, väliotsikko |
| `LinssiValikko`, `RatasAlaosa` | `UI/Linssit/` | linssin ☰ (alin rivi Poistu) ja ⚙:n alaosa (Tekstitys, äänet) |
| `NapinAlle` | `UI/NapinAlle.cs` | pudotusvalikko avausnapin alle oikeaan reunaan |
| `KertojanNapit`, `Tekstityskaista` | `UI/Linssit/` | ▷/⏸, 🔈, T ja tekstitys virke kerrallaan |
| `PelinValikko`, `PelinTuloskortti`, `PelinValintakortti`, `PelinKorttitaso`, `PelinAsettelu` | `UI/Pelit/` | pelin ☰ taukoineen (`Taukoeleet`: Esc ja taustalle), tuloskortti, valintakortti, korttitaso, laudan asettelu |
| `Peukalokohta` | `UI/Pelit/Peukalokohta.cs` | juoksupelin peukalokohdat (normaali, rimpuilu) |
| `MuseoTaulu.UusiLasikortti` | `UI/Linssit/MuseoTaulu.Kortit.cs` | museon lasikortit |

## 4. Mitat ja osuma-alat (`mitat`)

- **Napit:** tekstinappi `nappi.korkeus` 38 pt, kuvakenappi OHJAUSNAPPI `nappi.ohjaus` 40 pt (kuvake 22), iso 56, laukaisin 64.
  Samassa rivissä ei eri kokoja.
- **Osuma-ala aina ≥ 44 pt** (`mitat.nappi.osuma`); pieni kuvake saa isomman kosketusalan, ei isompaa piirrosta.
- **Välit** `vali` xs 4 · s 8 · m 12 · l 16 · xl 24; ryhmän napit `vali.s`. **Kulmat** `kulma` nappi 10, kortti 12, pilleri 999.
- **Leveydet:** kortti 420, paneeli 350, sivukortti 400, minipopup 320; kapea raja 600, leveä 940 (`Pohja.Leveys`).
- **Peitto:** ruudusta enintään 45 % (paneeli 70 % erikseen sovituissa); kortit enintään 86 % ja muu vierii.
- **Teksti:** `kirjasimet` kapiteeli 12, apuri 14, leipä 16, väliotsikko 18, otsikko 21, arkki 26; poikkeus vain merkinnällä.

## 5. Asettelu: iPhone pysty, iPhone vaaka, iPad

1. **Turva-alue:** `UiKerros.Hae().Reunat(kerros)` (lovi, kotipalkki). Mikään nappi tai teksti ei mene sen yli.
2. **Kolme muotoa mitataan aina:** iPhone pysty (kapea), iPhone vaaka (matala, korkeus noin 400 pt), iPad.
3. **Matala vaaka** ei mahdu pystyyn suunniteltuun sarakkeeseen. Käytä olemassa olevia ratkaisuja: kaksi saraketta
   (`mk-kysymys--matala`), lauta koko korkeuteen ja palsta oikealle (`PelinAsettelu`), rivi omalle rivilleen palkin alle
   (aikajanan legenda), lista vieriväksi ja leveys turva-alueeseen (valikot).
4. **Ei leikkautuvaa tekstiä,** ei myöskään "suunniteltua ylivuotoa". Pisin nimi ja tyhjä tila (ei kuvaa, ei dataa) mitataan.
5. **Yläkulman ryhmä** (☰, ⚙, kertojan napit) ei peity; sisältö alkaa ☰-rivin alta (`PelinValikko.YlaVaraus`).

## 6. Kerrokset, avaus ja sulkeutuminen

- **Kerros** `UiKerros` (Valikot, Pelidialogit, linssien kerrokset); modaali `ModaaliTaso` lukitsee syötteen (`SyoteLukko`) ja
  vapauttaa sen sulkiessa.
- **Ohinapautus** sulkee paneelin ja kutsuu `UiKerros.OhiSulki()`, jottei sama napautus avaa karttaa (maakuntalappu).
- **Esc** `Nappaimisto.Rekisteroi(nimi, prioriteetti, auki, …, sulje)`; peleissä Esc ja taustalle siirtyminen avaavat ☰:n.
- **Sulkeutuminen mukana:** jokainen linssin tai pelin avaama ikkuna suljetaan, kun linssi vaihtuu tai peli loppuu (21.10.:
  ISS:n Kuvat-galleria jäi muiden päälle ja lukitsi syötteen). Poistu on ☰:n alin rivi; erillistä ✕:ää ei tehdä.
- **Kelluvat:** Pulu ei peitä painikkeita: uusi alareunan kortti lisätään `Pulu.Alareuna`-sääntöön (kortin yläpuolelle, jos mahtuu,
  muuten alapuolelle).

## 7. Teksti, kieli ja luettavuus

- Näkyvä teksti avaimesta `Kieli.T("ui.…")` (`UI/Resources/Tekstit/ui.fi.json`); kielivahti valvoo. Kehittäjätyökalun suora teksti
  merkitään `// kieli: ei (kehittäjätyökalu)`.
- Luettavuus kaikilla taustoilla `Latauskuva.Luettava`; nimet rivittyvät sanojen väliin (`Tietajagalleria.SovitaSana`).
- Puhe tekstitetään yhteisellä tekstityskaistaleella (Tekstitys-kytkin), ei näkymän omalla tekstillä.

## 8. Liike

- UI-siirtymät `liike`: avaus 220, sulku 200, liuku 240, enintään 250 ms; `Rakenne.Nayta` ponnauttaa kortin.
- Ei omaa Lerp- tai pehmennysliikettä: liikevahti. Jatkuva ympäristöanimaatio (syke, hehku) merkitään USS:ssä
  `/* ympäristöanimaatio … */`.

## 9. Tarkistus

1. `tyokalut/tarkista.sh`: Unity-käännöstarkistus, pohjavahti, liikevahti, kielivahti; 0 virhettä.
2. Todistusajo (`tyokalut/todistusajo/todistusajo.sh`) skenaariolla: `ui kehysnapit 0` alkuun (himmennetyt napit eivät ota
   napautusta), `ui kierto pysty|vaaka`, `tap-teksti`, `tap-kohta x y luokka#n`, `kuva`. Tarkista lokista, että kuvattava näkymä
   oikeasti aukesi (esim. museon salikortti vain salissa).
3. Kuvat täysikokoisina; kuvateksti kuvan ulkopuolella, haaran SHA; ennen ja jälkeen samasta rungosta (yhdistä juna haaraan ennen
   kuin käännät).

## 10. Tyypilliset virheet

- Oma nappi tai oma kortti yhteisen osan sijaan; sama rakenne kolmena kopiona (lautapelien valintakortti 21.10.).
- Eri kokoiset napit samassa rivissä (aikajanan palkki 30/36/40 → 40).
- Pystyyn mitoitettu sarake iPhone vaakana (kysymyksen D-vastaus vierityksen alla, lauta 190 pt).
- Kelluva elementti painikkeiden päällä (Pulu vastausnapin D päällä; opastuskupla laudan tai vuorokortin päällä).
- Ikkuna ei sulkeudu linssin mukana ja jättää syötelukon päälle.
- Ohinapautus ilman `OhiSulki`-merkkiä avaa samalla kartan.
- Kovakoodattu väri tai fonttikoko (pohjavahti) ja oma liike (liikevahti).
- Emojit kuvateksteissä renderöityvät laatikoiksi: kirjoita sana ("valikko"), ei merkkiä.

## 11. Esimerkit (juna 209, 21.10.2026)

Kuvasarja `/Users/Shared/Claude/proto-3d/lokit/kk-uusi-linssi-kuvasarja-20261021/`:
1. aikajanan palkin napit yhtä suuret, legenda kokonaan (iPhone vaaka);
2. valikkonappi 40 pt ja kortin tekstinapit 38 pt, Poistu valikon alimpana (iPad);
3. kysymyskortti kahdessa sarakkeessa matalalla ruudulla (iPhone vaaka);
4.–5. linssin avaama ikkuna (Kuvat-galleria) ja linssin sulku, joka sulkee myös ikkunan (iPad).
