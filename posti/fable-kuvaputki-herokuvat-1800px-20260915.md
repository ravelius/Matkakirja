## 2026-09-15 — FABLE → KUVAPUTKI: vain yli 1800 px:n herokuvat skaalataan 1800 px:iin

Fable-koordinaatioagentti.

### Omistajan päätös (15.9.2026, tarkennettu)

Omistaja päätti sanatarkasti: "pidetaan 1800px, jotta nayttaa isollakin naytolla viela hyvalta", ja tarkensi samana päivänä: "Muutetaan vain ne todella suuret kuvat 1800 pikseliin. Muihin ei varmaankaan tarvitse koskea."

Sääntö on siis: **pelin käyttämistä Commons-valokuvista skaalataan ämpäriin vain ne, joiden pitkä sivu ylittää 1800 px** — pitkä sivu 1800 px:iin, kuvasuhde säilyttäen, laadukkaana JPEG:nä (tavoite 200–450 kt). Alkuperäinen (täysikokoinen) tiedosto jää ämpäriin lähteeksi. Kuvat, joiden pitkä sivu on jo 1800 px tai alle, **jätetään sellaisenaan** — niitä ei skaalata eikä toimiteta uudelleen.

Pyydän, että tämä on jatkossa **kuvaputken oletussääntö kaikessa toimituksessa** (myös tulevat maat/lehdet): toimituksessa skaalataan vain yli 1800 px:n kuvat 1800 px:iin, muut kuvat toimitetaan sellaisinaan ilman skaalausta.

### Tehtävä: Ranskan 7 herokuvasta 6 skaalattavaksi, 1 jätetään koskematta

Lähde: `posti/kuvatoimitus-ranska7-20260914.json`. Mitat manifestista (pitkä sivu):

| cityId | pitkä sivu (px) | toimenpide |
|---|---|---|
| lyon | 3336 | skaalaa 1800 px:iin |
| lille | 3293 | skaalaa 1800 px:iin |
| strasbourg | 3509 | skaalaa 1800 px:iin |
| nizza | 3249 | skaalaa 1800 px:iin |
| toulouse | 3298 | skaalaa 1800 px:iin |
| nantes | 3507 | skaalaa 1800 px:iin |
| bordeaux | 1024 | **jätetään sellaisenaan — EI skaalata, EI uudelleentoimitusta** |

Tarkista tarkat nykyiset osoitteet/tiedostonimet suoraan manifestista — ne ovat muotoa:

`https://media.matkakirja.app/matkakirja/kaupunkilehdet/ranska/hero-{cityId}-historiallinen-r20260914-v1.jpg`

Skaalaa näistä ne 6 kaupunkia (lyon, lille, strasbourg, nizza, toulouse, nantes), joiden pitkä sivu ylittää 1800 px, versioiksi joiden pitkä sivu on 1800 px, kuvasuhde säilyttäen (ei rajausta, ei vääristystä), ja tallenna samaan polkuun ämpärissä uudella tiedostonimellä:

`hero-{cityId}-historiallinen-r20260915-v2-1800.jpg`

Krediitit, lisenssitiedot ja caption-tekstit pysyvät ennallaan (ne ovat pelin puolella, ei kuvatiedostossa) — vain kuvatiedosto skaalataan.

**Bordeaux ei kuulu tähän toimitukseen.** Sen alkuperäinen (1024 × 758) on jo alle 1800 px, jää sellaisenaan käyttöön nykyisellä osoitteellaan (`hero-bordeaux-historiallinen-r20260914-v1.jpg`) — ei uutta versiota, ei uutta tiedostoa, ei uudelleentoimitusta.

### Toimitus

Kirjoita uusi manifesti `posti/kuvatoimitus-ranska7-1800-20260915.json`, joka kattaa **kaikki 7 kaupunkia** samalla rakenteella kuin `posti/kuvatoimitus-ranska7-20260914.json` (osoite, r2Key, sha256, bytes, width, height per kuva; captionit ja source-kentät voi periä suoraan vanhasta manifestista muuttumattomina), mutta:
- lyon, lille, strasbourg, nizza, toulouse, nantes: uudet -r20260915-v2-1800.jpg-tiedot (uusi sha256, bytes, width=pitkä sivu 1800 tai height=1800 riippuen suunnasta)
- bordeaux: samat tiedot kuin vanhassa manifestissa (osoite, sha256, bytes, 1024×758) — merkitse selvästi esim. `"scaled": false, "reason": "already ≤1800px, kept as-is"`

Lisää myös kuittaus `posti/fable-vanha.md`:n kärkeen (oma otsikkonsa, kuvaputken agentin nimellä/aikaleimalla).

### Peliin integrointi

Peliin integroinnin (herokuva-osoitteiden vaihto `js/packs/nakyvat-kaupungit-fra.js`:ssä 6:lle skaalatulle kaupungille uuteen -r20260915-v2-1800.jpg-polkuun; Bordeaux pysyy nykyisellä osoitteellaan) tekee Fablen agentti tämän uuden manifestin perusteella — kuvaputken ei tarvitse koskea peliin, riittää ämpäri + manifesti + kuittaus.
