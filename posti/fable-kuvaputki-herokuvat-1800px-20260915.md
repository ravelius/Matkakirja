## 2026-09-15 — FABLE → KUVAPUTKI: herokuvat skaalattuna 1800 px pitkälle sivulle

Fable-koordinaatioagentti.

### Omistajan päätös (15.9.2026)

Omistaja päätti sanatarkasti: "pidetaan 1800px, jotta nayttaa isollakin naytolla viela hyvalta". Tästä lähtien pelin käyttämät Commons-valokuvat toimitetaan ämpäriin **skaalattuina, pitkä sivu 1800 px**, laadukkaana JPEG:nä (tavoite 200–450 kt). Alkuperäinen (täysikokoinen) tiedosto jää ämpäriin lähteeksi — sitä ei poisteta eikä korvata.

Pyydän myös, että **kuvaputken oletustoimituskoko on jatkossa 1800 px** (myös tulevat maat/lehdet), ellei toisin erikseen sovita.

### Tehtävä: Ranskan 7 herokuvaa uusiksi 1800 px -versioiksi

Lähde: `posti/kuvatoimitus-ranska7-20260914.json` (7/7 kuvaa, kaupungit lyon, bordeaux, lille, strasbourg, nizza, toulouse, nantes). Tarkista tarkat nykyiset osoitteet/tiedostonimet suoraan tästä manifestista — ne ovat muotoa:

`https://media.matkakirja.app/matkakirja/kaupunkilehdet/ranska/hero-{cityId}-historiallinen-r20260914-v1.jpg`

Skaalaa kukin näistä 7:stä versioksi, jonka pitkä sivu on 1800 px, kuvasuhde säilyttäen (ei rajausta, ei vääristystä), ja tallenna samaan polkuun ämpärissä uudella tiedostonimellä:

`hero-{cityId}-historiallinen-r20260915-v2-1800.jpg`

Krediitit, lisenssitiedot ja caption-tekstit pysyvät ennallaan (ne ovat pelin puolella, ei kuvatiedostossa) — vain kuvatiedosto skaalataan.

**Huomio Bordeaux:** Bordeaux'n alkuperäinen on 1024 × 758, joka on jo pienempi kuin 1800 px pitkällä sivulla. Sitä EI suurenneta — jätetään Bordeaux sellaisenaan (voi jättää version tekemättä tai kopioida alkuperäinen samalla -r20260915-v2-1800.jpg-nimellä ilman skaalausta, kuvaputken oman käytännön mukaan — kunhan tiedosto on olemassa uudessa polussa niin peli-integraatio toimii yhtenäisesti).

### Toimitus

Kirjoita uusi manifesti `posti/kuvatoimitus-ranska7-1800-20260915.json` samalla rakenteella kuin `posti/kuvatoimitus-ranska7-20260914.json` (osoite, r2Key, sha256, bytes, width, height per kuva — captionit ja source-kentät voi periä suoraan vanhasta manifestista muuttumattomina, jos rakenne sen sallii), sekä kuittaus `posti/fable-vanha.md`:n kärkeen (oma otsikkonsa, kuvaputken agentin nimellä/aikaleimalla).

### Peliin integrointi

Peliin integroinnin (herokuva-osoitteiden vaihto `js/packs/nakyvat-kaupungit-fra.js`:ssä uuteen -r20260915-v2-1800.jpg-polkuun) tekee Fablen agentti tämän uuden manifestin perusteella — kuvaputken ei tarvitse koskea peliin, riittää ämpäri + manifesti + kuittaus.
