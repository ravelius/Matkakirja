# Natiivi-UI:n luovutus 23.9.2026 (myöhäisilta)

Tämä jatkaa edellistä luovutusta `docs/raportit/viesti-natiivi-ui-luovutus-20260923.md`. Lue se ensin, koska siinä kerrotaan arkkitehtuuri, polut ja työtapa.

- Proto-git: `/Users/Shared/Claude/proto-3d/Matkakirja-proto`
- Oma worktree: `/Users/Shared/Claude/wt/proto-natiivi-ui`, nyt haarassa `natiivi-ui/galleriat`
- Käännöstarkistus: `./Peli-testit/unity-tarkistus.sh`, joka antoi 0 virhettä kaikilla alla olevilla haaroilla
- Testikomennot: `UI-testit/README.md`

## Masterissa (tällä kierroksella)

- **Linssit:** koukut kytketty ja heijastus poistettu. Ihmisen matkan aloituskortti saa Ken Burns -taustan.
- **Kartta:** Maakunnat-välilehti ja offline-tilapilleri.
- **Kortit ja näkymät:** mannerlento, minipulun kysymyskortti astronautin kuvanäkymään, matkalaukku, aloitus ja huipennus (Fablen kaanoniteksti), nostokortit (skandaali, hetki, eläintäky, kohde), aloituksen tekstit paketista (`ui-tekstit.json`).
- **Fonteista puuttuvat merkit:** American Typewriter ja Iowan eivät sisällä merkkejä ✕ ⤓ ◈ ▸ ⌄ ◀ ⏸ ▶ → ↑ ✎. Ne ovat nyt `Ikonit.*`-kuvakkeita, ja ✕:n tilalla on ×.
- **Astronautin sumu:** projekti on Linear-tilassa, ja UI Toolkit sekoittaa läpikuultavat kerrokset lineaarisesti. Sumun alfa korotetaan siksi potenssiin 2,2. Sama ilmiö koskee kaikkia läpikuultavia kerroksia. Natiiviseppä selvittää yleistä ratkaisua.
- **Vakauskorjaukset:**
  - `Rakenne.Vierita`: turvallinen ScrollTo. Chat kaatui virhepinoon, koska ajastettu vieritys osui jo poistettuun elementtiin.
  - `Rakenne.Lista`: `MiniJson.Taulukko` heittää poikkeuksen, jos kenttä puuttuu. Tuotannon v11:ssä `maat`-kokoelmasta puuttuu `tervehdykset`, ja se kaatoi koko UiSisallon jäsennyksen.
  - SuljeKaikki sulkee myös aloituksen, koska kerroksessa 45 ollut aloitus peitti huipennuksen.
  - `ui aloita pariisi` toimii, koska listan ulkopuolinen kaupunki aloittaa oletuslähdöstä.
  - Rosvo on poistettu UI:sta.
- **Fablen tarkastus:**
  - C4: KOKEET-osio näkyy vain kehittäjätilassa (`Asetukset.Kehittaja`: Development Build tai webin koodi SHA-256:na, versiorivi avaa koodi-ikkunan).
  - A6: Tutki-rivi poistettu.
  - A9: tähti poistettu.
  - C3: laukun VARUSTEET-osio (linssit).
  - Linssien kynnykset -kytkin.

## Merge-pyynnöt Natiivisepällä (pinottu, viimeisin sisältää edelliset)

1. `natiivi-ui/paljastus` @ 3f1cd06 sisältää `tapahtumakortti-pois` 819e7fd:n, `lehti` 7e9e745:n, `tarkastus`-haaran, `lahtokaupungit`-haaran ja kynnyskytkimen.
   - **Natiivi lehti** `UI/Lehti/` (Lehtinakyma, LehtiSisalto, Kuvasuurennos, `Lehti.uss`):
     - etusivu, aihesivut ja nostot, Menovinkit ja maaosasto
     - minitehtävä (`Kaupat.Minitehtava`), sisällys, sivunkääntö (liuku ja pyyhkäisy), kaiutin (`Puhe.Lue`)
     - Peliin se kytkeytyy vasta Pelikoodarin ILehtiNakyma-sopimuksella (haara `pelikoodari/lehti`). Kytke `PeliNakymat.Lehti` → `UiNakymat.Lehti`:
       - `Nayta` = `Nayta(LehtiLaji, omistaja, aihe, sivu)`
       - `Suljettu`/`Avautui`/`SivuNakyi`-eventit
       - `Minitehtava`-koukku → `TeeTeko`
       - `LehtiTila.TehtavaNappi` alapalkkiin ("Tapaa X" / "Etsi kätkö", pois = harmaa → `EtsiKatko`)
     - C7 ratkaistu webin mukaan: lehti aukeaa itsestään saapuessa (Pelikoodari).
   - **Tapahtumakortti** on poistettu UI:sta (C1).
   - **B4 aarteen paljastus** (`UI/Paljastus.cs`): pääaarre tummana ja paikallisaarre pergamentilla, tulosvaiheessa 2.
2. Uudet tiedostot tarvitsevat .metat: `UI/Lehti/`, `Lehti.uss` (lisätty `Matkakirja.tss`:ään) ja `UI/Paljastus.cs`.

## Kesken

`natiivi-ui/galleriat` @ 7aab9a7 (WIP, ei merge-pyyntöä): `UI/Galleriat.cs` (Julistegalleria, Tietajagalleria), `UiSisalto.Julisteet` ja `KaupunkiTiedot.Manner`. Puuttuu vielä:

- kytkentä laukkuun: julisterivi "n/m »" → `Julistegalleria.Avaa(laukku.Julisteet.Select(j => j.Avain))` ja tietäjärivin "i"-nappi → `Tietajagalleria.Avaa(pisteet)`
- uudet oliot `UiNakymat`iin ja `SuljeKaikki`in
- USS-luokat: `mk-galleria*`, `mk-tietaja*`
- testikomento ja README

## Seuraavaksi (Fablen järjestys)

1. **Nähtävyydet ja turistiopas.** Fablen mukaan nämä menevät B4:n edelle, koska ne ovat lehden ydin. Speksi on valmis tiedostossa `docs/raportit/natiivi-ui-nahtavyydet-opas-speksi-20260923.md` (kulku, arkki, kohdekartta UITK:lla, opas, Pelikoodarin `KaupunkiToiminnot.Nahtavyydet`/`Opas`, puuttuvat datat Siirtosepälle):
   - web: `js/nahtavyydet.js`, `js/opas.js`, `js/kaupunkinosto.js`
   - data: kokoelma `nahtavyydet` (1520 alkiota)
   - kaupunkikorttiin rivit "Nähtävyydet" ja "Turistiopas"
2. Galleriat valmiiksi (yllä).
3. **Radion kuori** (`radiosoitin.js` ja `pistenaytto.js`) ja kartuschan radiomerkki.
   - Linssiseppä tekee RadioLinssin. Sovittu rajapinta: `TilaMuuttui(RadioTila{Asema, Nimi, Maa, Kaupunki, Vaihe, Taajuus, Nayttoteksti})`, `Asemat`, `MaanAsema(iso3)`, `Viritä`, `Keskeytä`, `Taajuus`.
   - Siirtosepän luokat: sallittu (soita), linkki (nappi "Avaa aseman sivu") ja kielletty (vain `varaAani`). Aseman nimen saa näyttää, logoja ei.
4. **Noppa** näkyvänä (B16, P45) ja **pieni liike** (B12) UITK-kerroksena:
   - Natiivisepän `PalloKierto.LepoMuuttui` ja kellonaika Matkan vuorokaudenajasta.
   - Tarkista `js/pallolauta/liike.js`: jos se lukee laitteen kelloa, noudata sitä.
5. **Musiikki ja tehosteet.** Pelikoodarin `PeliOhjain.Aani(string)` (webin `sfx`-tunnukset) ja `LentoAani` ovat valmiina. Äänimoottori tehdään `Aanet`-luokkaan.

## Nappi-inventaarion seuraavat 10 riviä

Lähde: `docs/raportit/nappi-inventaario-natiivi-20260923.md`. Fable pyytää ilmoituksen aina, kun kymmenen riviä on tehty.

1. Kaupunkiliuska/-kortti: rivit "Nähtävyydet" ja "Turistiopas" → nähtävyysarkki, kohdekartta ja opas (osiot 7 ja 9).
2. Julisterivi "n/m »" → julistegalleria (osio 14). Kesken WIP:ssä.
3. Tietäjärivin "i" → Tietäjän tie (osio 14). Kesken WIP:ssä.
4. Aarnin luettelon "i"-seloste (osio 14).
5. Logo → tekijätiedot ja lähteet (osio 2).
6. Kysymyksen kuvan ja lipun napautus → suurennos (osio 10). Käytä `Kuvasuurennos`-luokkaa.
7. Kohtaamiskuvan napautus → suurennos pitkällä selitteellä (osio 10).
8. Nostokortin suurennoksen selaus ‹ › (osio 13). Vaihda Nostokortin oma suurennos `Kuvasuurennos`-luokkaan.
9. Luentakuvasarjan suurennoksen selaus (osio 11).
10. Pulun chat: vastauksen kuva → "Näytä kuva isompana" ja "Avaa juttu" (osio 15).

## Muuta

- Laitetestaajan kuvat: `proto-3d/lokit/natiivi-ui-kuvasarja-20260923/`. Sarjojen alkuun `ui aloita pariisi`.
- Siirtoseppä kokoaa lehden puuttuvat datat skeemaan 1.13: sää, uutiset, radio, kulttuurivisat, maakartat ja intro. `LehtiSisalto` lukee jo `aiheet`-kentän päätasolta, jos se on olemassa.
- Raportit: `natiivi-ui-erot-webiin-20260923.md` ja `nappi-inventaario-natiivi-20260923.md`.
