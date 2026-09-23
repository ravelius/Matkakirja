# Linssisepän luovutus 23.9.2026 klo 18.05

*Linssiseppä (Opus) porttaa web-linssit natiiviin (Unity 6.3 + Cesium). Tämä on jatkajan
aloituspiste. Lue ensin tämä dokumentti, sitten tarvittaessa raportit (lopussa).*

## Työtilat

- Proto: `/Users/Shared/Claude/proto-3d/Matkakirja-proto` (master = Natiiviseppä, vain hän kääntää Unityn).
- Oma worktree: `/Users/Shared/Claude/wt/proto-linssiseppa` (haara `linssiseppa/astronautti`).
- Vesistöagentin worktree: `/Users/Shared/Claude/wt/proto-linssiseppa-vesistot` (haara `linssiseppa/vesistot`).
- Pelin repo: `/Users/Shared/Claude/Matkakirja-linssiseppa`, haara `linssiseppa-tyo-20260923` (raportit, pushattu).
- Testit: `Linssit-testit/kaanna.sh` (puhdas C#, kultaiset arvot Nodella web-koodista, `Linssit-testit/kultaiset/tee-*.mjs`)
  ja `Linssit-testit/unity-tarkistus.sh` (käännös ilman editoria; pohjana Pelikoodarin Peli-testit-skripti).

## Haarat ja merge-pyynnöt (proto-3d)

| Haara | Commit | Sisältö | Tila |
|---|---|---|---|
| `linssiseppa/linssirunko` | f24645e | Linssisopimus, rekisteri, odotuspeite, topografia, LinssiOhjain (Unity), KarttaKerrokset-sovitin | **Mergetty masteriin 0244858** (Natiiviseppä 23.9. klo 18) |
| `linssiseppa/astronautti` | daf5e93 | Kaikki edellinen + aikajana (asteikko, kello, kamera), ihmisen matka (esitys, virrat, vanat, valot, tähdet, kertojan ääni), astronautin kamera (pisteet, ISS, pilvet), keksinnöt (pysäkkiajo, valot) | Natiivisepän koekäännös: kaikki viisi varjostinta kääntyvät Metalille ilman virheitä, sim-vienti ok. **Mergetty masteriin 4b7e600**; Natiiviseppä ajaa iPadilla ja lähettää linssi-loki.txt:n jatkajalle. Testit 116/116 |
| `linssiseppa/vesistot` | 0062796 | Vesistölinssi (topografian päällä): 169 uomaa ja 84 penkkaa Viiva-materiaalilla, 38 järveä Tasavari-varjostimella (korvanleikkaus ajossa, 20 ms), 20 nimeä, rekisteröinti; kultaiset webistä, testit 128/128, unity-tarkistus 0 | Valmis, worktree poistettu. Pohjana astronautti 7a86c81. **Master yhdistetty ja merge-pyyntö Natiivisepälle lähetetty 23.9. ilta** (Tasavari.shader ei vielä käännetty; nosto järvet 19 km, joet 25 km webin arvoista — tarkista laitteella) |
| `linssiseppa/maat` | c53b6b2 | Vertailu ja maatiedot: MaatAineisto (maarajat.json + maat.json, ISO3), MaaOsuma (parillisuussääntö, päivämääräraja, toleranssi 0,5° napautukselle; Natiiviseppä käyttää napautukseen ja Sumu.PaljastaMaahan), VertailuLinssi (Suomi valmiina, max 4, himmeä täysi lista), MaatiedotLinssi (kaksivaiheinen: valinta → kyltti → lehti), MaidenNimetKerros (Unity); kultaiset tee-maat.mjs, testit 144/144, unity-tarkistus 0 | Mergetty masteriin 8deba7a. Kytkentä (LinssiOhjain.MaatSovitin, testikomennot `maa <ISO3>`, `vertaa`, `lehti`) haarassa `linssiseppa/maat-kytkenta` 7456adc, merge-pyyntö lähetetty. Maatila masterissa f691d15 (sovittu 23.9.: ISO3, Korosta(iso3, täyttö, reuna), MaaPerussavy, KorostusPois(iso3\|kaikki); tulossa TestFlightin jälkeen). UI-koukut lähetetty Natiivi-UI:lle |
| `linssiseppa/luennat` | b7836c3 | Keksintöjen pysäkkiluennat (KeksintoLuennat linssiaineistosta, ILuentaSoitin, Unity LuentaSoitin; esittely, pysäkit, välinäytös 1873; kultaiset tee-luennat.mjs), laitetestikomennot (`keksinnot …`, `esitys …`, `kamera lat lon km`, `tila`), iPad-korjaukset: vanat ilman rantamaskia, ei ISO3-maanimiä, NimiKortti piiloon linssin ajaksi. Ihmisen matkan kultaiset tarkistettu v11:tä ja nykyistä webiä vasten: ei eroja. Testit 152/152 | Merge-pyyntö Natiivisepälle 23.9. ilta |
| `linssiseppa/astro-korjaus`, `linssiseppa/kaukoraja` | 2bde8bd, 8d3e523 | Astronautin pilvikuori (SetPixelData mip-ketjun tilalle) ja tähtitaivas (PalloKierto.KaukorajaVahintaan); laitetesti.sh (koepaketin linssitiedostot laitteen välimuistiin osoittimen polkuun, kuvasarjat devicectl:llä). iPad ee68957: astronautti pilvineen ja tähtineen, keksinnöt luentoineen OK | Mergetty (957f732, ee68957) |

Laitetesti ilman UI:ta: `Documents/linssi-komento.txt` → `linssi topografia | ihmisen-matka | satelliitti |
keksinnot | vesistot | pois`, loki `Documents/linssi-loki.txt`.

## Odottaa muilta

- **Natiiviseppä:** linssiseppa/astronautti-haaran merge ja ensimmäiset laitehavainnot. Tulossa
  RAJAPINTAAN: MaaTila(bool), MaaNapautettu(iso2), Korosta/KorostusPois (vertailu, maatiedot).
- **Karttaseppä:** reliefisarja `media.matkakirja.app/matkakirja/reliefipyramidi/20260920/pallo/{z}/{x}/{y}.jpg`
  (PR #2950, ajo polton 23a jälkeen; oli 404 klo 18). Päivämäärärajan kaistale (lon −180…−175) paikataan
  myöhemmin; uusi kansio → vaihda `Topografia.ReliefiSarja`.
- **Natiivi-UI (erän 3 jälkeen):** linssivalitsin (LinssiOhjain.Rekisteri), odotuspeite
  (LinssiOhjain.PeiteKasittelija), selitekortti, astronautin koukut (AstronauttiKerros.Avaus-, Kuva-,
  SumuKasittelija), ihmisen matkan koukut (IhmisenMatkaKerros.*Kasittelija: musta, valot, jakso, kello,
  kuva, pulu, tunne, loppu), keksintöjen koukut (KeksinnotKerros.*Kasittelija, EsittelyUIssa).
- **Siirtoseppä: VALMIS koepaketissa v9** (`/Users/Shared/Claude/sisalto-koe/v9`): linssiaineiston rivi
  `linssiluennat` = {keksinnot | ihmisen-matka: {juuri, pysakit: [{vuosi, otsikko, runko, url}],
  puheet: [{avain, runko, url}]}} (keksinnöt 26 + esittely + valinaytos-1873; ihmisen matka 20 +
  esittely + loppu). Musiikki: aanitaulut `siirtyma:keksinnot` ja `siirtyma:ihmisen-matka` (data.ampari).
  Topografian ja satelliitin LINSSI-metatiedot ovat moduuleissa, joten kovakoodatut tiedot voi korvata niillä.
- **Pelikoodari:** kertojan mykistys (EsityksenAani.Mykistetty), musiikin pito
  (LinssiOhjain.MusiikkiKasittelija), omistus (Linssirekisteri.Saatavilla; kynnykset
  Linssirekisteri.Avauskynnykset).

## Päätökset

- Fable 23.9.: topografia saa radion 1400 tp:n kynnyksen (natiivi: ihmisen matka 400, keksinnöt 800,
  topografia 1400, astronautti 2200; muut vain kehittäjätilassa). Radio ei natiiviin.
- Fable 23.9.: poikkeamat hyväksytty väliaikaisesti, omistaja päättää iPadilla: astronautin reliefi
  täysvärinen (web kylläisyys 0,8), ei automaattikiertoa.

## Seuraavat työt

1. Vesistöjen merge ja laitehavainnot (ks. taulukko).
2. Laitehavainnot (Natiiviseppä/Laitetestaaja) ihmisen matkasta, astronautista ja keksinnöistä.
3. Vertailu ja maatiedot: kytketty (linssiseppa/maat-kytkenta); jäljellä laitehavainnot ja Natiivi-UI:n palkki, kyltti, lehti ja käyrät. ISO2 kaikille maille: PR #2960, koepaketti v11.
4. Keksintöjen pysäkkiluennat: VALMIS (linssiseppa/luennat). Musiikki aanitauluista Pelikoodarin kautta.
   HUOM: iPad lukee julkaistun paketin v2, jossa ei ole linssiaineistoa eikä maat.jsonia → luennat,
   kertoja, rantamaski, maanimet ja maalehdet puuttuvat laitteelta, kunnes paketti ≥ v11 julkaistaan.
5. Ihmisen matkan tutkimusvaihe (viisi virtanappia, nostokortit) ja muisti.

## Raportit (pelin repo, docs/raportit/)

`natiivi-linssit-inventaario-20260923.md`, `natiivi-aikajana-kuvaus-20260923.md` (aikajana + ihmisen
matkan esitys), `natiivi-astronautti-kuvaus-20260923.md`. Muisti: `linssiseppa-tila-20260923`.
