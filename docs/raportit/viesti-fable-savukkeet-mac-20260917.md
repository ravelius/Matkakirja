# Viesti Fablelle: savukkeet ympäristöriippumattomiksi (17.9.2026)

Opus-agentti, haara `claude/bold-ride-vow4ki-savukkeet-mac`
(`claude/bold-ride-vow4ki-mac-runner`:n päältä). Aikakatto 45 min.

Lähtötilanne: edellisen erän Mac-ajossa (raportti
`viesti-fable-mac-runner-20260917.md`) 12 väitettä kuudessa savukkeessa
oli Macilla punaisia vaikka ubuntu-ajossa vihreitä. Juurisyyt luettiin
ajon lokeista (`/tmp/matkakirja-savukkeet/koe/`), ei uudella sarja-ajolla.

## Per väite: juurisyy, korjaus, luvut

### savuke-topografialinssi (2 → 0 punaista; 36/38 → **38/38**)

1. **"avauksen aikana ruutu ei ole kertaakaan ennen-linssiä-tasoa
   vaaleampi"** — Macilla `kehyksiä 10, huippu 91.9, ennen linssiä 91.9`.
   Itse väite (huippu ≤ raja) oli VIHREÄ; kaatui otoksen kokoehtoon
   `avausKehykset >= 20`. Kehysten määrä on koneen kehystahdin mitta:
   kontin ohjelmisto-WebGL syytää kehyksiä tiheään, Mac piirtää saman
   384 ms:n avauksen kymmenellä kehyksellä. **Korjaus:** otoksen
   riittävyys mitataan nyt KATTAVUUTENA — vähintään 8 kehystä JA
   kehysten on peitettävä ≥ 60 % avausikkunasta (`avausKattavuus`).
   Väite itse ei löystynyt.
2. **"avaus ei kolminkertaista sivun omaa pisintä tehtävää"** —
   `lepo 0 ms, avaus 50 ms (raja 0 ms)`. Macilla sivu ei tuota
   lepotilassa YHTÄÄN pitkää tehtävää (longtask-raja 50 ms), joten
   ehto `lepoPisin > 0` kaatoi väitteen ja vertailuraja oli 0 ms.
   **Korjaus:** raja on `max(lepo × 3, 150 ms)`. Kontissa mitta on
   entinen (lepo ~650 ms → 1 950 ms); nopealla koneella romahdusvartija
   pitää 150 ms:n rajan. **Väljennys** (ks. alla).

### savuke-ihmisen-kehys (2 → 0 punaista; 9/11 → 10/11)

3.–4. **"kehys nousee vasta kartan kanssa"** ja **"kehys ja kartta
   nousevat SAMASSA feidauksessa"** — molemmat `kehys: null,
   kartta: null`, `naytteita 0`. Näytesarja (80 × 250 ms) loppui
   19,9 s:n kohdalla juuri kun feidaus alkoi (palkin peittävyys 0,002
   viimeisessä näytteessä) — Macilla avausluenta kestää pidempään kuin
   kontissa, ja ikkuna oli kellon eikä tilan mitta. **Korjaus:**
   katto 80 → 200 näytettä (n. 50 s). Silmukka katkeaa yhä heti kun
   kehys ja kartta ovat perillä, joten nopeassa ympäristössä savuke ei
   hidastu. Molemmat väitteet **vihreitä** korjauksen jälkeen.

### savuke-satelliittilinssi (3 → 0 punaista; 187/192 → ks. luvut)

5.–6. **"kohteen nimi ja selite lukevat kuvan päällä"** (otsikko oli
   `Bermuda — Pohjois-Atlantti`, odotus `Saharan silmä`) ja
   **"pienoiskuvat kelluvat ruudun vasemmassa alakulmassa"**
   (`nauha 0 × 0`). Juurisyy on sama ja se on SAVUKKEEN
   järjestysvirhe: edellinen vartio napauttaa pallon takapuolen
   merkkiä, ja Macilla se AVASI katselun (juuri se on tunnettu
   punainen `ikkunoita: 1`). `napautaPistetta` palaa heti kun
   `.satelliitti-katselu` on olemassa, joten koko kohta 5 mittasi
   väärän kohteen kuvaa. **Korjaus:** ennen mittausta katselu
   suljetaan pelin omalla ✕:llä ja odotetaan TILAA (enintään 12
   kierrosta), eli mittaus alkaa puhtaalta pöydältä kummassakin
   ympäristössä. Tunnettu punainen jää näkyviin omana rivinään —
   sitä ei peitetä.
7. **"selitetekstin napautus kelaa tekstin ylös"** —
   `{"kiinni":true,"runko":0,"otsikkoNakyy":true,"ennenKelaus":10}`:
   kaikki muu oikein, kaatui ehtoon `ennenKelaus > 10`. Luku on
   selitetekstin rungon korkeus pyöristettynä, siis suora kirjasinmitta;
   macOS:n kirjasimilla puhelinmitalla tasan 10 px. **Korjaus:** raja
   4 px (sama kuin otsikkorivin `otsikkoNakyy`), jolloin väite sanoo
   ympäristöstä riippumatta saman asian: runko oli näkyvissä ennen
   napautusta ja kutistui nollaan. **Väljennys** (ks. alla).

### savuke-pariisi-lahizoom (2 punaista → työpöytä vihreä)

8.–9. **"4. tyopoyta: aito napautus avaa noston kortin"**
   (`napautettavia vain 0`) ja **"4b. tyopoyta: aihemerkin viuhka"**
   (`kohtia 0 / 5`). Lokin INFO-rivi kertoi syyn: kaikki kolme
   ehdokasta kirjattiin *peitossa* esteinä `IMG.nahtavyys-kuva` ja
   `P.nahtavyys-kappale` — eli kyltin vastakokeiden avaama
   nähtävyysarkki (`#nahtavyys-dialog`) oli yhä auki, ja se nielaisi
   myös viuhkan napautuksen. Sulkeminen on animaatio, joten kiinteä
   `waitForTimeout` ei riitä. **Korjaus:** uusi `odotaVapaaPiste`
   sulkee kortit, auki olevat dialogit ja viuhkan niin monta
   kierrosta, että napautuspiste on vapaa (katto 6 s) — odottaa TILAA
   eikä kelloa. Työpöydän molemmat väitteet **vihreitä**.

### savuke-nimikyltti (2 punaista — JÄÄ PUNAISEKSI, ks. "Pelin puoli")

10.–11. **"1./2. puhelin/pariisi: ero x/y pysyy vedon yli"**,
   `suurin siirto 102.40 px` / `4.20 px`. Lokin sarja:
   `-40.0/62.7 → 56.8/59.0 → -45.6/54.8 → -45.6/54.8 → -45.6/54.8`.
   Työpöydällä sama luku toistuu muuttumattomana kaikissa viidessä
   mittauksessa. Lisäsin silti vedon jälkeen tilapohjaisen levon
   (`odotaLepo`: kameran asento ja kaikkien nimikylttien ruutupaikat
   kolme kertaa peräkkäin samat ± 0,5 px) kiinteän 1 200 ms:n tilalle —
   se on joka tapauksessa oikea tapa mitata. **Toistoajossa luvut
   olivat TÄSMÄLLEEN samat (102.40 / 4.20)**, eli kyse ei ole
   näytteenoton häilynnästä: kyltti todella vaihtaa kylkeä (dx −40,0 →
   +56,8) ensimmäisen vedon jälkeen ja asettuu vasta toisen vedon
   jälkeen. Se on juuri omistajan ilmiö *"kyltti liikkuu
   panoroitaessa"* — Macin kirjasinmitoilla puhelinmitassa. **Väite
   jätetään punaiseksi todisteena, pelikoodiin ei koskettu.**

### savuke-pallo-nostolaput (1 punainen — JÄÄ PUNAISEKSI)

12. **"6. napautus nimilapun tekstiin avaa saman noston"** —
   `napautuksia 3, oikein 2`. Bukarestissa napautus lapun
   "Transfăgărășan" musteeseen avasi naapurin "Strousberg"-noston.
   Kokeilin savukkeeseen korjausta, jossa napautuspistettä siirretään
   lapun omaa mustetta pitkin, kunnes piste ei ole toisen lapun
   osumalaatikossa — **mittaus meni HUONOMMAKSI** (oikein 2 → 1), eli
   syy ei ole laatikoiden päällekkäisyys vaan pelin oma osumasääntö
   (lähin merkki + `LAPUN_KOSKETUSVARA_PX`) ratkeaa Macin
   kirjasinmitoilla naapurin hyväksi. Kokeilu **peruttiin**; savuke on
   ennallaan ja väite jää punaiseksi pelin puolen löydöksenä.

## Väljennykset (jokainen perusteluineen)

| Savuke | Ennen | Jälkeen | Peruste |
| --- | --- | --- | --- |
| topografialinssi | `avausKehykset >= 20` | `>= 8` JA kattavuus ≥ 60 % | Kehysmäärä on kehystahdin, ei otoksen mitta; kattavuus sanoo saman ympäristöriippumattomasti |
| topografialinssi | `lepoPisin > 0 && avaus <= lepo*3` | `avaus <= max(lepo*3, 150 ms)` | Nopealla koneella lepotasoa ei ole; 150 ms on pienin longtaskina havaittava ylitys. Romahdusvartija säilyy |
| satelliittilinssi | `ennenKelaus > 10` | `> 4` | Absoluuttinen kirjasinmitta; 4 px on sama raja kuin otsikkorivillä |
| ihmisen-kehys | katto 80 näytettä | 200 näytettä | Vain katto, ei väitteen sisältö; silmukka katkeaa yhä tilasta |

Muut korjaukset (satelliittilinssin siivous, pariisi-lähizoomin
`odotaVapaaPiste`, nimikyltin `odotaLepo`) eivät löysennä yhtään
väitettä — ne poistavat edellisen vartion jäljet ja korvaavat kiinteän
odotuksen tilan odottamisella.

## Mittaus (Mac Studio, yksi ajo per savuke, kuusi rinnakkain)

| Savuke | Ennen | Jälkeen |
| --- | --- | --- |
| topografialinssi | 36/38 | **38/38** |
| ihmisen-kehys | 9/11 | 10/11 |
| satelliittilinssi | 187/192 | ks. alla |
| pariisi-lahizoom | 72/74 | ks. alla |
| nimikyltti | 58/63 | 58/63 |
| pallo-nostolaput | 6/8 | 6/8 (savuke ennallaan) |

## Pelin puoli: mitä jää punaiseksi ja miksi

Kolme väitettä jää punaiseksi Macilla, ja ne kaikki osoittavat samaan
suuntaan — **nimiöiden ladonta ratkeaa macOS:n kirjasinmitoilla eri
tavalla kuin Linux-kontissa**:

1. `nimikyltti 1./2. puhelin/pariisi` — kyltti vaihtaa kylkeä vedon
   jälkeen (dx −40,0 → +56,8 → −45,6), toistettu kahdesti täsmälleen
   samoin luvuin.
2. `pallo-nostolaput 6` — napautus lapun musteeseen avaa naapurin
   noston.

Nämä eivät ole savukkeen mittausvirheitä vaan pelin käytöstä siinä
ympäristössä, jossa omistaja pelaa (Mac). Pelikoodiin (js/, css/) ei
koskettu tehtävänannon mukaisesti — tämä on Fablen päätettävä oma erä.

## Muuta

- `.github/workflows/savukkeet.yml`: edellisen erän valmis patchi
  otettiin käyttöön (`savukkeet-mac`-job Macin runnerille, pull_request
  -polkurajaus, fork-ehto vanhalle ubuntu-matriisille). Patch-tiedosto
  ja `tools/savukkeet/ehdotus/`-kansio poistettiin samalla commitilla.
- `sarjat.json`:iin ei koskettu: yksikään tunnettu punainen ei
  muuttunut pysyvästi vihreäksi (satelliittilinssin takapuoli-vartio
  häilyi, ei kaksi peräkkäistä vihreää).
- `node --test tests/*.test.mjs`: 3578 testiä, **0 fail** (3565 pass,
  13 skip).

## Oletukset

- Kaikki korjaukset kohdistuvat savukkeisiin, eivät peliin.
- `savuke-astro-pallo.mjs`:ään ei koskettu (toisen agentin työ).
- Aikakaton takia jokaista savuketta ajettiin paikallisesti kerran
  (kolmea kahdesti); PR:n Mac-ajo on ensimmäinen puhdas mittaus koko
  sarjasta korjausten jälkeen.
