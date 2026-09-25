# Pallon sulavuus, erä E4b: kameran ennuste nimiöille (Karttaseppä 21.9.2026)

Omistaja 21.9.: nimiöt "pomppivat" liikkeessä. Kirjasto asettaa CSS2D-
nimiöiden paikan samalla kameralla kuin WebGL-kuvan, mutta DOM-siirto ja
kangas sommitellaan laitteella eri kerroksissa, ja nimiö ehtii ruudulle
kehyksen jäljessä. Haara karttaseppa-ennuste (E3:n päällä).

## Toteutus (js/pallo.js)

- `ennustaKamera(edellinen, nykyinen)`: seuraavan kehyksen kamera viime
  kehysten liikkeestä — lineaarinen ekstrapolaatio lat/lng (sauma
  kierretään), korkeus logaritmisesti; kehysväli katkaistaan
  `ENNUSTE_KEHYS_MAX_MS` 34:ään, yli 250 ms tauko ja liike alle
  `ENNUSTE_KYNNYS` = ei ennustetta (levossa mikään ei värähtele).
- Kehyskoukun mitat saavat `mitat.ennuste = { dtMs, pov, nopeus }`
  (kaikki kytkePallonKehys-kuuntelijat; Pelikoodari lukee sen), ja
  viimeisin mitta on luettavissa `pallo.__viimeisinKehys`.
- `kytkePallonEnnuste(pallo, kotelo)`: scenen jokaisen CSS2DObjectin
  `onAfterRender`-koukku kirjoittaa elementin `transform`in uudestaan
  ennustetulla näkymämatriisilla heti kirjaston asettaman paikan jälkeen
  (sama kutsuketju, ei erillistä rAF:ia → järjestys kirjaston tickin
  kanssa on aina oikea). Näkyvyys jää kirjastolle. Kytkin `?ennuste=0`.
  Kytketty js/pallolauta/lauta.js:ssä kehyskoukun rinnalle.
- Mitta `pallo.__ennusteMittarit` ja mittarin kenttä `ennuste`:
  `liikeKaPx` = kameran liike kehystä kohti pikseleinä (= nimiön laahaus
  ilman ennustetta), `virheKaPx`/`virheMaxPx` = ennusteen jäännös,
  `siirtoja` = siirrettyjä elementtejä. Uusi vaihe **lento** (kirjaston
  kamera-ajo 1,5 s) mittaa sileän liikkeen.

## Mittaus (puhelin 390 × 844, 4×)

| vaihe | liike px/kehys (= laahaus ilman ennustetta) | ennusteen virhe ka / max |
|---|---|---|
| lento (kamera-ajo, sileä) | 3,46 | **1,11** / 10,3 (kiihdytys ja jarrutus) |
| zoom (rullan liuku) | 0,41 | 0,16 / 1,1 |
| panorointi (Playwrightin hiiri) | 1,06 | 1,04 / 1,8 |
| heitto (veto 0,4 s) | 4,48 | 4,38 / 7,6 |

Panoroinnissa ja heitossa ennuste ei auta MITTARISSA, koska Playwrightin
hiiri tulee epätasaisesti (joka toinen kehys ilman syötettä: kamera
seisoo, sitten hyppää kaksinkertaisesti) — liike ei ole ennustettavissa
kehyksestä toiseen. Se on myös aito havainto: syötteen tahdistus
kehyksiin on omaa nykimistä, joka laitteella on pienempi (kosketus tulee
näytön tahdissa) mutta ei nolla. Sileässä liikkeessä (kamera-ajo, liuku,
zoomin liuku) ennuste poistaa 2/3–3/4 laahauksesta.

## Avoimet

- Osuus `ENNUSTE_OSUUS` (1 = koko kehys) on säädettävissä; jos laitteella
  nimiöt näyttävät johtavan, 0,5.
- Syötteen tahdistus: vedon kamera voisi seurata sormea lyhyellä
  aikavakiolla (~1 kehys) rAF-silmukasta eikä suoraan tapahtumasta —
  poistaisi "kamera seisoo, sitten hyppää" -kehykset; harkitaan omistajan
  tuntumatestin jälkeen.
- Pelikoodari: kuoren kerroin ennustetusta korkeudesta ja
  sulavuusmittarin "ennustevirhe" (haara pelikoodari-ennustekoukku).
