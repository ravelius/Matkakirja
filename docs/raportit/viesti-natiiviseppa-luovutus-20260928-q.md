# Natiivisepän luovutus 28.9.2026 (q), klo 09.1x EEST

Luovuttaja: Natiiviseppä (Opus 5.5, Macin käyttäjä koodaus). Syy: konteksti ~70 % (Fablen pyyntö). Edellinen: -p.md (sen
kohdat ovat voimassa, ellei tässä toisin sanota).

## Lue ensin

1. CLAUDE.md ja Raamatun Ydinajatus kohta 2 (TYÖTAPA JA SESSIOT, JUMI → FABLE).
2. Tämä raportti. Aloituslennon raportti: docs/raportit/aloituslento-v3-20260928.md.
3. Muisti: natiiviseppa-oma-simulaattori (vain FBBD41D7), kaannokset-erina-polton-aikana, testikaannos-ei-junan-edelle.

## Käytäntö tänään (päiväsääntö)

- Yöpoltto valmistui 07.17, joten voimassa on päiväsääntö: käännökset yksi kerrallaan, enintään 2 simulaattoria koko Macilla.
- **Julkaisija jakaa käännös- ja simulaattorivuorot** (paikat A ja B). Kysy vuoro Julkaisijalta, sano "käännös valmis", ja
  ilmoita, kun FBBD41D7 on sammutettu.
- Kone oli 08.50–09.05 raskaassa kuormassa (kuormitus 70–265: PR-CI:n Testit ja Savukkeet samalla Macilla, pallopoltto vain
  2 ydintä); junakäännös kesti 35 min ja IL2CPP sai ~7 % CPU:ta. Varaa käännöksille aikaa, kun CI ajaa.
- Junakatko on purettu. **Jokainen juna/b13-commit laukaisee junakäännöksen**, myös sisällöltään tyhjä masterin merge
  (tein sellaisen 07.4x → turha 6 min käännös). Mergeä master junaan vasta seuraavan sisältömergen yhteydessä.

## ALOITUSLENTO (kärki, omistajan OK:ta odotetaan)

Haara proto **natiiviseppa/aloitusrata**, worktree wt/proto-natiiviseppa-offline-media. Ei junassa, vaan merge 1.0.35-junaan
vasta omistajan OK:n jälkeen.
- **v3** d2fe17dc: kone kaukaa pieni (siipiväli maailmassa 5 km, ruudulla vähintään 2,5 %), kosketus 490 km:stä, usvaraja
  250 km (Aurinko.UsvaVahintaanM), ohituksen kallistus 76°.
- **v3b/v3c** 421ad7f3 → 98e3f4a3: ohitus maan päällä (AloituslennonRata.OhitusMaalla, laskettu maapolygoneista
  skriptillä proto-3d/lokit/aloituslento-33/v3b/ohitus_maalla.py; Ateena 0,47 = Veneto), kiri ja ylilento SSE 40:llä
  (LiikeLaatat.LentoKarkeaSse), saapumisen esilataus (ennakkokamera [1] ~200 km:n näkymään odotuksesta, käytävään kohteen
  Z7–Z9 ±2). Tulos: saapuminen terävä.
- **v3d** 1636c93a (omistajan palaute v3-kuviin Fablen kautta, sanatarkasti: "Ota Ateenassa tuo 3d pois lennosta. Näyttää
  oudolta", "kamera pitää olla selvästi kauempana ja kone pienemmäksi kun laskeutuminen", "loppu laskeutuminen kannattaa
  kuvata ylhäältä, nyt näyttää kun joku pommi iskisi"): maamerkkimalli ei näy aloituslennolla, saapuminen 350 km:stä,
  kosketus ~915 km:stä, kone laskussa 1,5–1,7 %, kallistus kosketukseen mennessä 15° (kamera 75° koneen yllä).
  Kartta-testit 347/347. **Käännös d939384f, 0 poikkeusta. Video proto-3d/lokit/aloituslento-33/v3d/aloituslento-v3d-tekstit.mp4,
  kuvaparit v3c | v3d v3d/kuvaparit/ (saapuminen 11,3 ja 12,3 s, kosketus 13,2 s, nousu 14,0 s). Lähetetty Fablelle 09.1x.**
- Kuvaus omalla FBBD41D7:lla (skriptit proto-3d/lokit/natiiviseppa-skriptit/sessio-p/): aloituslento-valmistele.sh →
  napautukset MCP-simulaattorityökalulla: Uusi matka (201, 690) → 20 s → Valitse aloituskaupunki (201, 605) → 6 s →
  aloituslento-nauhoita.sh taustalle → Ateena (271, 326). Kooste: aloituslento-kooste.sh <kansio> <F> 1.0 17.8.
  **F (lennon alku videossa) = napautus + 1,5 s, katso kehyseroista** (lokin aikaleima heittää 0,1–0,6 s).
  **Simulaattorin h264:ssä PTS ≠ DTS lopussa: lue aina `-fflags +igndts`** (muuten saapumiskortti välähtää kesken lennon).

## RAE ja PATINA (valmis, junassa)

proto natiiviseppa/rae-patina fd9c9d05, mergetty juna/b13:een (941020eb). Tileset-varjostimen RadioHamara:
_pohjaRae ja _pohjaPatina polton patina.mjs-kaavoilla, Pohjapatina.cs, viisi säädintä kehittäjävalikossa (Paavalikko) ja
komento `pohja patina [rae koko tahrat kellastuminen reuna]`. Oletus 0 = nykyinen kuva. Kuvaparit
proto-3d/lokit/rae-patina-20260928/kuvaparit/. Simulaattorissa ei GPU-eroa. iPhone-mittaus Laitetestaajalla
TF 1.0.35:stä (kehysajat, patina 0 vs 1 3 1 0.7 0.8). Fablelle lähetetty 08.3x.

## Jono (tässä järjestyksessä)

1. **v3d:n omistajan palaute** Fablen kautta. OK → aloitusrata 1.0.35-junaan (juna-merge.sh natiiviseppa/aloitusrata).
2. **Varalaattojen uusinta** proto natiiviseppa/varalaatta-uusinta-2 **1e65724f** (018d906f + vikakoe), worktree
   wt/proto-natiiviseppa-juna. Webin #3516:n natiivipari: uusintakierros 2 s ensimmäisestä varalaatasta, sitten 5 s ja
   15 s, sitten 20 s välein (Reikakorjaus.VaraUusintaViive, testattu), kiireinen palvelin lykkää enintään 20 s, neljä
   rinnakkain, etualalle paluu ja verkon palaaminen uusivat heti, 404 luovutetaan kuuden kierroksen jälkeen. **Vikatesti
   tekemättä:** `palvelin varavika 0.5 8` → aja uuteen alueeseen (esim. `aja 40 -4 8 1`) → kuva 2 s (pergamenttiruudut) ja
   20 s (korjautunut) + loki "varalaattaa korvattu" + `palvelin` (uusintakierroksia, paikattu). Lisäksi taustalle ja takaisin
   (simctl launch muu app → takaisin). Sama käännös voi sisältää Kinderdijkin (natiiviseppa/symbolit-erikoismalli 6cecf733,
   yhdistyy puhtaasti): Linssisepän tyokalut/linssiseppa-ajot/ajo-symbolit-alla.sh, mutta `symbolit alla jalka|laatikko`
   (ei 0|1), UDID=FBBD41D7. PASS → junaan.
3. **Offline-kuvat** proto natiiviseppa/offline-kuvat **4d4b41f6** (Siirtosepän E2E-löydös: Kuvat.LataaVuorossa jpg ja
   LataaWebp levy ?? mukana). Siirtoseppä todentaa sen yhdessä oman siirtoseppa/offline-kerrokset c260d593:n (skeema 1.56)
   kanssa. PASS minulle → junaan. Siirtoseppä pyytää myöhemmin kuittauksen offline-kerroksille ja skeemalle 1.56
   (tavuja.offline → levykoko + tavuja.siirto).
4. **Jokiversio**: Linssiseppä teki linssiseppa/joet-0928 582d149c (ElavaAineisto.JoetKansio → joet-2026-09-28, ämpärissä,
   omistaja hyväksyi viennin 08.25). Merge-pyyntö tulee laitekuvan kanssa → junaan.
5. **1.0.35-junan muut**: Natiivi-UI (ihmekuva f1714aaf + nimet-laskuri 5d79edd9; mitattu, LaatikotMuuttuivat ei laukea
   levossa), Linssiseppä (symbolit-lippu cd4911b1, mallinseppa/era5 d35e9f2c), Kinderdijk 6cecf733 (kohdan 2 ajon jälkeen).
   Merget juna-merge.sh:lla vasta merge-pyynnön ja kuvien jälkeen. Juna → BUILD-merkintä masteriin → Julkaisija TF 1.0.35.
6. Ensikäynnistyksen karttavika (fyysinen iPad Pro 13, sovi vuoro) ja 120 Hz -mittaus: ennallaan. Varalaattojen uusinta
   (kohta 2) on todennäköisin korjaus samaan perheeseen.

## Muut tämän vuoron asiat

- Siirtosepän #3523 (offline-maasto maailmasarjasta) kuitattu: Pallo.unity ja Alueet.maastoLayer ovat 2026-09-24-maailma,
  404 = valmis(0), ei haittaa vanhoille TF-buildeille.
- Linssisepän ISS-kyyti: FOV 80° kuitattu ehdoin (palauta avattaessa tallennettu arvo kaikilla poistumisteillä, liu'uta, älä koske
  projectionMatrixiin). Terminaattori ei ole jonossani, joten Linssiseppä tekee väliaikaisen yökuoren linssin kerrokseksi
  (auringon suunta Aurinko.AurinkoEcef).
- Karttasepän jokiviesti välitetty Linssisepälle (tehty, kohta 4).

## Aloitusviesti seuraavalle Natiivisepälle

```
Olet Natiiviseppä (Opus): Matkakirja-pelin natiivin (Unity, proto-git /Users/Shared/Claude/proto-3d/Matkakirja-proto) kamera,
laatat, merkit, käännökset ja proto-masterin omistaja. Checkout /Users/Shared/Claude/Matkakirja-3d-selvittaja, Macin käyttäjä koodaus.
Lue CLAUDE.md, Raamatun Ydinajatus kohta 2 ja luovutuksesi KOKONAAN: git fetch origin && git show
origin/selvittaja-3d-luovutus:docs/raportit/viesti-natiiviseppa-luovutus-20260928-q.md.
Kärki: aloituslennon v3d:n palaute (Fable), sitten varalaattojen vikatesti + Kinderdijk samalla käännöksellä, sitten 1.0.35-junan merget.
Käännös- ja simulaattorivuorot Julkaisijalta. Vain oma simulaattori FBBD41D7.
Viestit Fablelle vain valmis erä, jumi tai kysymys (≤ 8 riviä), Fablen session id local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31.
Agentit vain Opus/Sonnet. Aikaleimat date-komennolla.
```
