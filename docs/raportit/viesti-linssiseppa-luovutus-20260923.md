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
| `linssiseppa/astronautti` | daf5e93 | Kaikki edellinen + aikajana (asteikko, kello, kamera), ihmisen matka (esitys, virrat, vanat, valot, tähdet, kertojan ääni), astronautin kamera (pisteet, ISS, pilvet), keksinnöt (pysäkkiajo, valot) | Natiivisepän koekäännös: kaikki viisi varjostinta kääntyvät Metalille ilman virheitä, sim-vienti ok. **Merge-pyyntö koko haarasta lähetetty klo 18.10**; laitteella ei vielä ajettu. Testit 116/116 |
| `linssiseppa/vesistot` | (ei vielä commitia) | Vesistölinssi: joet Viiva-materiaalilla, järvet Tasavari-varjostimella, nimet, rekisteröinti | Opus-agentti kesken klo 18.05 (tiedostot työpuussa). Jatkaja: tarkista `git log` ja `kaanna.sh`; jos agentti ei commitoinut, viimeistele ja commitoi, yhdistä `linssiseppa/astronautti`-haaraan ja poista worktree (`git worktree remove`) |

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
- **Siirtoseppä (nippu 4):** linssiaineistoon keksintöjen luentojen rungot ja juuri sekä linssien
  musiikkiraitojen osoitteet (pyydetty 23.9. klo 18).
- **Pelikoodari:** kertojan mykistys (EsityksenAani.Mykistetty), musiikin pito
  (LinssiOhjain.MusiikkiKasittelija), omistus (Linssirekisteri.Saatavilla; kynnykset
  Linssirekisteri.Avauskynnykset).

## Päätökset

- Fable 23.9.: topografia saa radion 1400 tp:n kynnyksen (natiivi: ihmisen matka 400, keksinnöt 800,
  topografia 1400, astronautti 2200; muut vain kehittäjätilassa). Radio ei natiiviin.
- Fable 23.9.: poikkeamat hyväksytty väliaikaisesti, omistaja päättää iPadilla: astronautin reliefi
  täysvärinen (web kylläisyys 0,8), ei automaattikiertoa.

## Seuraavat työt

1. Vesistöt valmiiksi ja yhdistys (ks. taulukko).
2. Laitehavainnot (Natiiviseppä/Laitetestaaja) ihmisen matkasta, astronautista ja keksinnöistä.
3. Vertailu ja maatiedot, kun MaaTila on masterissa (linssit ovat karttatiloja; maalehti ja käyrät Natiivi-UI).
4. Ihmisen matkan tutkimusvaihe (viisi virtanappia, nostokortit) ja muisti; keksintöjen luennat, kun
   paketti tuo rungot.

## Raportit (pelin repo, docs/raportit/)

`natiivi-linssit-inventaario-20260923.md`, `natiivi-aikajana-kuvaus-20260923.md` (aikajana + ihmisen
matkan esitys), `natiivi-astronautti-kuvaus-20260923.md`. Muisti: `linssiseppa-tila-20260923`.
