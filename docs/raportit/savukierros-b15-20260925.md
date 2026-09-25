# Savukierros: build 15 (juna/b13 @ 4a813e60, sisältää c7091b7c), iPhone 18 Pro + iPad Pro 13"

Fablen pyytämä kierros (25.9.2026, 17.3x–17.5x). PASS-commit: **4a813e60**.
Laitteet 1572C658 (iPhone, 402×874 pt) ja 3B4CDACB (iPad, 1032×1376 pt).
Käännösvahti jäi jumiin 17:17–17:27 (ks. erillinen viesti Natiivisepälle/
Fablelle), korjaantui itsestään — ei liity tähän raporttiin.

## PASS (ydinkulku, iPhone)

1. **Uusi matka → aloitusportti:** "Uusi matka" käynnistää aloitusportin
   Heathrow/Lontoo-taustatarinalla ilman viivettä. Kuva 1.
2. **Valitse kaupunki kartalta:** globaali kartta näyttää Lontoon nastalla ja
   neljä valittavaa kaupunkia (Moskova, Istanbul, Ateena, Kairo) korostettuina;
   napautus Ateenaan kartalta toimi suoraan. Kuva 2.
3. **Lento:** kone nousee, "Ohita" näkyy koko lennon ajan. Kuva 3.
4. **Perillä Ateenassa, nosto:** matkakirjakortti "Ateena, elokuussa 1873"
   avautuu automaattisesti heti saapumisen jälkeen, postikortti (kahvipöytä-
   kuva) näkyy auki. Kuva 4. Napautus kuvaan vaihtaa seuraavaan postikortti-
   kuvaan pinosta (puutarhakuva). Kuva 5.
5. **Matkakirja auki** (`ui matkakirja auki`): päiväkirjateksti + KOLME
   pienoiskuvaa rivissä alareunassa (iPhone). Kuva 6.
6. **Radio:** `linssi radio` → `auki: radio`, viritys → Lukittuu → Soi DZA
   "Algérie Chaine 1". `linssi pois` → kamera palasi siististi.
7. **Avaruuslinssi:** `linssi satelliitti` → `auki: satelliitti`, maapallo
   oikein ilman artefakteja. Kuva 7.
8. **Liikkuminen alkaa oikein:** `kulkutapa liftaus` + `ui liiku` avaa
   reittivalinnan; `peli-tila.json.siirtoKohteet` antaa oikean kohdeavaimen
   (HUOM: ei aina suoraan `c:sofia` — ks. löydös 1 alla); `siirto <avain>`
   vie Matkalla→Traileri→Kartta-tiloihin. Kuva 8.

## PASS (iPad)

9. **Matkakirja auki iPadilla:** sama Ateena-teksti, mutta VAIN YKSI
   pienoiskuva näkyy leveämmässä paneelissa (isompi, ei rivissä kolmea
   pientä kuten iPhonella) — vastaa löydöksen 90 "isoisän kuvat isommiksi"
   -tavoitetta ainakin osittain: iPad näyttää kuvat yksi kerrallaan
   suurempana rivin sijaan. Kuva 9. Ei tarkistettu erillistä
   suurennos/koko ruutu -tilaa (ks. löydös 2 alla).

## Löydökset ja avoimet kohdat

1. **`siirto`-kohdeavain ei ole aina `c:<kaupunki>`.** Ensimmäisellä
   `ui liiku`-kutsulla `siirtoKohteet` antoi kaupunkiavaimen (`c:sofia` toimi
   build 14:ssä), mutta toisella kierroksella (sama Ateena-lähtö, eri
   noppatulos) avain oli reittietappi `e:sofia|ateena:3` — pelkkä `sofia`/
   `c:sofia` ei silloin kelvannut, vaan oli käytettävä `peli-tila.json`:n
   `siirtoKohteet[0].avain`-arvoa sellaisenaan. Tämä on odotettu pelimekaniikka
   (etapit pitkillä reiteillä), ei bugi — mutta jatkokierroksilla lue avain
   aina tiedostosta äläkä oleta muotoa.
2. **En löytänyt "koko ruutu" (94) / "nostokuvan suurennos" (102) -nappia
   UI-puusta.** Postikortin/matkakirjan kuvaelementit eivät näkyneet
   `ui puu`-dumpissa lainkaan (todennäköisesti erillinen ei-UI-Toolkit-kerros),
   joten kosketuskoordinaatit piti arvata ruudulta. Napautus kuvaan vaihtoi
   pinon seuraavaan kuvaan (kuva 5) mutta ei avannut mitään "koko ruutu"
   -tilaa havaittavasti. En osaa vahvistaa onko ominaisuus jo build 15:ssä vai
   ei — reititetty Pelikoodarille/Natiivi-UI:lle tarkennettavaksi (mistä
   napista/gesturesta 94 ja 102 tarkalleen avautuvat).
3. **Löydös 100 (kartun radionappi) ei löytynyt tälläkään kierroksella** —
   ei ehditty erikseen etsiä maakyltin (kartuscha) yhteydestä, koska
   aikaisemmalla 020fe9ed-kierroksella `mk-kartuscha__nimi`/`__alarivi` ei
   sisältänyt radioelementtiä ollenkaan. Ei uutta tietoa build 15:stä tälle.
4. **Minipulu (96b) ei tarkistettu erikseen** — pulu-hahmo näkyy jatkuvasti
   ruudun oikeassa alakulmassa kaikissa kuvissa (kuvat 1–9), mutta en
   varmistanut onko juuri tämä "minipulu 96b" -löydöksen kohde vai jokin muu
   pienempi versio.
5. **Löydös 93 (karttanosto nimiöstä) ja 104 (nostokortti heti) — ei
   uudelleentestattu build 15:llä**, aiempi havainto 020fe9ed:llä oli: 93 ei
   toiminut (nimiön napautus ei avannut nostoa), 104 näytti jo toimivan
   (kortti täysin auki heti napautuksesta, ei viivettä).

## Yhteenveto Fablen pyytämästä ydinkulusta

Kylmä käynnistys → aloitusnäyttö → valinta kartalta → lento (Ohita) →
Ateena (nosto avautuu automaattisesti) → matkakirja (3 kuvaa iPhonella,
1 suurempi kuva iPadilla) → radio → avaruuslinssi → liikkeen aloitus:
**KAIKKI PASS**. "Koko ruutu" (94) ja "suurennos" (102) -tarkennukset ja
löydös 100 jäivät avoimeksi ajanpuutteen ja UI-elementtien löytymättömyyden
vuoksi — ei havaittu selvää regressiota, mutta ei myöskään vahvistettu
korjatuksi.

## Kuvat

`docs/raportit/kaappaukset/savukierros-b15-20260925/`
1-uusi-matka-aloitusportti, 2-valitse-kaupunki-kartalta, 3-lento,
4-perilla-ateenassa-nosto, 5-postikortti-toinen-kuva,
6-matkakirja-auki-kolme-kuvaa, 7-avaruuslinssi, 8-liikkeella-valietappi,
9-ipad-matkakirja-yksi-kuva.

Molemmat laitteet sammutettu kierroksen jälkeen.
