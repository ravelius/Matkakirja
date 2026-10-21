# B Tekotavat: UI (natiivi)

*(Natiivi-UI 21.10.2026, Raamattu 4.21 STUDIOJAKO (omistaja 21.10.2026 klo 18.02). Käytännön tekotapa napille, paneelille, kortille
ja ikkunalle natiivissa pelissä (proto-git, Unity UI Toolkit). Laatutaso: A Suunta; tuotetyypin kooste: C Reseptit; vaiheet, portit
ja luvat vain D Tuotannonohjauksessa. Kooste juna 209:n yhteisistä osista ja 1.–21.10. opeista; uusia sääntöjä ei ole. Raamattu
voittaa ristiriidassa: 2.70 linssien ja 2.201 pelien yhteiset säännöt, 4.1 UI-POHJAT, 4.2 KORTTI, 4.14 liike.)*

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
- **Osuma-ala aina ≥ 44 pt** (`nappi.osuma`); pieni kuvake saa isomman kosketusalan, ei isompaa piirrosta.
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
