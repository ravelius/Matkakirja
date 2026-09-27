# Savukierros TF 1.0.32 (Laitetestaaja, 27.9.2026 klo 20.2x)

Juna/b13 4be1a696, käännös 34963081, .app juna-4be1a696. Ancestor-tarkistus OK
(`merge-base --is-ancestor 4be1a696 34963081`). iPhone 18 Pro (1572C658), uusi peli Pariisiin.
**0 poikkeusta** koko kierroksen ajan (Debug.Log-konsoli koko ajan päällä).

## Tulokset

1. **Kartta ei tarkennu vierityksen jälkeen: PASS.** `maasto liike tila` ennen ja jälkeen
   kameran siirron (`aja`): SSE pois, pohja-SSE kiinteä 20, vaihtoja 0 molemmilla mittauksilla.
2. **Kontrasti/mustan nosto oletuksena: PASS.** `pohja savy` (ei parametreja) →
   "pohjan sävy: kontrasti 0, mustan nosto 0.00 (oletus)".
3. **UI-listojen vieritys: spot-check PASS, ei syvä.** `ui lehti pariisi` avautui virheittä.
   120 Hz -väite ei todennettavissa simulaattorilla (vain laitteella, kuten yläpalkin vetotesti).
4. **Elämäpalkki 3 punaista + 5 oranssia: PASS** (kuva, `koetila rahaton 4`). **Offline-pilleri
   näkyy levossa: PASS** — vahvistettu KAHDESTI: testilipulla (`ui offline verkoton`, pilleri
   "Ei verkkoa · ei ladattuja maita" pysyi näkyvissä koskematta ruutuun) JA aidolla lataus-
   tapahtumalla (kohta 7, "Ladataan 2 maata · X %" -pilleri pysyi näkyvissä koko latauksen ajan
   levossa). Natiivi-UI:n korjaus (offline-pilleri-levossa 50a83b9e) toimii.
5. **Livian avaus kerran: PASS.** `ui livia avaus` avasi esittelykuplat ("Minä olen Livia...").
   Sarja loppui itsestään (~15-20 s). Toinen `ui livia avaus` -kutsu EI avannut sarjaa uudelleen
   (ei uutta kuplaa ruudulla) — kerran-per-laite-lippu toimii. "Ohita"-nappia ei tarvittu erikseen,
   sarja päättyi itsestään ennen kuin ehdin etsiä sitä.
6. **Meren laatutaso erä 2: spot-check, ei syvä visuaalinen vertailu.** `elava elementit` (HUOM:
   `meri 1`-kytkin komento.txt:hen antoi "tuntematon" — toimi vain linssi-komento.txt:ssä samoin
   kuin aiemmin havaittu sudenkuoppa) näytti FRA:n meripedot virheittä (valas 2655/2709/2871
   kolmiota kauko-LOD:ssa, ei poikkeuksia). Ei tehty ennen/jälkeen-kolmiovertailua erän 1 vs 2
   välillä ajanpuutteen vuoksi — jos tarkka laatuero pitää todistaa, kysy erikseen.
7. **OFFLINE-lataus tuotantoskeemalla 1.51: PASS, ei virheitä.** `alue lataa MLT` (komento.txt,
   EI peli-komento.txt — väärä konsoli antoi "tuntematon komento" ensin) →
   `alue tila`: **maailma Valmis 12804/12804 tiedostoa, 15,6 Mt, 0 virhettä, 206 s**;
   **MLT Valmis 114/114 tiedostoa, 23,0 Mt, 0 virhettä, 2 s**. Kartta toimi normaalisti molempien
   latausten jälkeen, ei rikkoutumista. Siirtosepän mediaKuvat-testi tulossa myöhemmin — ei
   testattu tässä kierroksessa.

## Yhteenveto Natiivisepälle: **PASS** (7/7, ei näkyviä löydöksiä). Kohdat 3 ja 6 vain spot-check
(ei syvää todennusta, ajanpuutteen ja laitejärjeen vuoksi) — kerro jos tarvitset niihin tarkemman
kierroksen.
