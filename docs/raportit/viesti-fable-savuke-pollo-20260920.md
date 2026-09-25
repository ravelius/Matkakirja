# Opus → Fable: savuke-pollon vanhat punaiset

20.9.2026 klo 07.20. Haara `opus-local-savuke-pollo` (pohja
origin/v1972-prep, a308c6bd). Ei versionostoa, ei PR:ää.

Tilaus: seitsemän vanhaa punaista — matkustusnappien kolme väitettä ja
nähtävyyslinkin kuvapopup (kuvia 0) sekä siitä seurannut kaatuminen;
*"jos kuvapopupin 0 kuvaa on tuotevika eikä mittarin, korjaa tuote"*.

## 1. Matkustusnapit — VANHENTUNUT MITTARI (3 + 1 punaista)

Molemmat säännöt olivat muuttuneet omistajan päätöksellä, eikä savuke
ollut seurannut perässä:

| mitta | oli | on |
|---|---|---|
| `fokusnäkymässä rivi on alussa tyhjä` | 25.8.2026 laattaportti | Liiku on pysyvä (omistaja 13.9.2026, `liikuNappiNakyvissa`) |
| `liu'ussa on kolme matkustusnappia` | 12.8.2026 kolme nappia | neljä: liftaus, bussi, laiva, lento (omistaja 13.9.2026) |
| `napit ovat jalan, laiva ja lento` | jalan | liftaus (sama `land`-tunnus, uusi nimi) |
| `liu'un napit eivät ahtaudu 900 pikselissä` | kolme nappia | neljä (sama syy; paljastui vasta kun ajo pääsi eteenpäin) |

Tuotteeseen ei koskettu. Mitat kirjoitettiin nykylinjauksen mukaisiksi,
perustelu ja päivämäärä mukana kommentissa.

## 2. Kuvapopup — TUOTEVIKA, KORJATTU

**Juurisyy, mitattu.** Lisäsin savukkeeseen elinkaarivahdin ja
väliaikaisen pinojäljityksen. Tulos:

```
elinkaari: "syntyi>poistui"
close  <- Pollo.suljeKuvapopup (js/pollo.js:4990)
       <- Pollo.sulje (js/pollo.js:4751)
       <- js/pollo.js:4402   (seuraaNakymaa → seuraaLivianDialogeja)
```

Pulun oma kuvakortti on `<dialog>`, joka avataan `showModal()`illa.
Livian dialogivahti (js/livia-dialogitila.js) laski sen pinoon vieraana
ikkunana, `seuraaNakymaa` tulkitsi sen näkymän vaihdokseksi ja sulki
koko chatin — ja `sulje` vei kuvakortin mukanaan. **Kortti siis välähti
ja katosi samassa napautuksessa, joka sen avasi.** Vika koski pelaajaa,
ei vain savuketta.

**Korjaus.** `js/livia-dialogitila.js`: uusi `data-livia-oma`-attribuutti
ja vienti `merkitseLivianOmaDialogi`; sillä merkityt dialogit eivät kuulu
dialogipinoon. `js/pollo.js` merkitsee molemmat omat kuvakorttinsa
(nähtävyyskuva ja wikikuva).

Mitattu jälkeen:

```
OK  nähtävyyslinkki avaa kevyen kuvapopupin —
    {"elinkaari":"syntyi","auki":true,"kuvia":1,...}
OK  popupissa on jutun oma kuvateksti
OK  popupissa on Avaa juttu -nappi
OK  popup ei vielä avaa koko juttua eikä sulje chattia
OK  Avaa juttu vie nähtävyysjuttuun
```

## 3. Savuke ei enää kaadu punaiseen

`.pollo-kuvatausta` oli null → `dispatchEvent` heitti ja koko ajo
päättyi siihen. Nyt puuttuva kortti on oma mittansa (`kuvapopup oli auki
sulkukoetta varten`), ja ajo jatkuu. Lisäksi punainen kertoo nyt itse,
mihin linkki osoitti (`linkkiTitle`) ja syntyikö kortti lainkaan
(`elinkaari`) — juuri ne kaksi tietoa, joita tämän vian jäljitys vaati.

## Vartiot

- `tests/livia-dialogitila.test.mjs`: uusi testi — pulun oma kortti ei
  nouse dialogipinoon eikä ilmoita näkymän vaihdoksesta, ja merkitsijä
  asettaa juuri sen attribuutin, jota vahti katsoo.
- `node --test tests/*.test.mjs`: **3 739 testiä, 0 punaista**.
- `tools/savuke-pollo.mjs`: 229 OK.

## LÖYDÖS: 16 punaista, joita ei ole koskaan ennen ajettu

Koska ajo kaatui aiemmin kuvapopupiin, savukkeen loppuosa EI ole
ajautunut kertaakaan. Nyt se ajautuu — ja siellä on 16 punaista, jotka
eivät liity tähän erään enkä koskenut niihin:

1. **Sumennus jää kartalle** (6 kpl): `kartalla ei ole sumennusta kun
   mikään ei ole auki — saapumistraileri`, `blur(6px) saturate(0.85)`
   jää päälle dialogin sulkeuduttua, pöllöpaneelin auetessa ja sulkeutuessa
   sekä päivityksen jälkeen. Tämä on syytä katsoa ensin: se on pelaajalle
   näkyvä, ja saapumistraileri on tuore (v1970).
2. **Paneelin mitat puhelimella ja tabletilla** (4 kpl): reunavälit eivät
   ole yhtä suuret (vasen 12 / oikea 54), kartta ei näy sivuilta.
3. **Alanappirivi on kapea puhelimella** (345 / 390 px) ja
   **kartan bittikartta on näkymän tarkkuudessa — null**.
4. **Liikkumisvaihe** (1 kpl): valittavat kohteet eivät korostu kartalla.
5. **Vihjekupla** (4 kpl): kupla ei ilmesty hiljaisuuden jälkeen.

Ajo päättyy edelleen poikkeukseen (`getComputedStyle`, savuke-pollo.mjs
rivi 3607) — sekin on seurausta siitä, että jokin näistä punaisista
jättää elementin syntymättä. En korjannut näitä: ne ovat oma eränsä, ja
arvaus olisi peittänyt oikean vian.
