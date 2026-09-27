# Linssisepän luovutus 27.9.2026 (k) — Linssiseppä (Opus, max) = myös Mallinseppä

*Sessio 74aa735c (nollattu 02.2x, id ennallaan). Edellinen -j.md (jono ja omistajan päätökset 01.4x). Fable
local_5df52e10-10e4-4b72-9554-0049db300dfe, Natiiviseppä local_674b9ec4-e2f3-48e9-a810-a129f20a4f03, Karttaseppä
local_eec7f158-d9f3-4b93-9368-c50935bd19ab. Scratchpad S=/private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-linssiseppa/74aa735c-cd53-4417-8c06-91819a4a5f3a/scratchpad
(kaanna-jono.sh ja ajo-mallit.sh ottavat S:n ympäristöstä, oletus tämä polku).*

## TEHTY (jono -j:n mukaan)

1. **Kaari/vuori A/B tiukat rajaukset** → Fablelle 02.2x: mallinseppa-toimitus-20260927/kaari-ab-thermopylai.png,
   kaari-ab-sounion.png (A | B, 0/27/55°, ×6), vuori-b-tiukka.png (×7). Työkalu tyokalut/linssiseppa-ajot/koosta_tiukka.py.
   Suositus kaareen B. Vuoren A:ta ei ollut laitteella (vanha pohja) → A/B/C samassa käännöksessä (alla).
2. **Meri v3 rajaukset** → Fablelle 02.2x: meri-v3-rajattu.png + meri-valas-v3-rajattu.mp4 (koosta_meri.py).
3. **Merge-pyyntö Natiivisepälle 02.3x:** mallinseppa/pohja 2b8f6dcd (MSM, Stonehenge, Colosseum; unity-tarkistus 0,
   Linssit-testit 347/347, merge-tree juna/b13 ja master puhdas). Kysytty: riittääkö yksi haara. 0,006-nosto jää
   (maastokorkeus asettaa vain juuren ankkurin korkeudelle, maasto vaihtelee mallin alla).
4. **Erikoismallit erä 2** (proto mallinseppa/erikoismallit2 36238c99 = pohja + Kinderdijk, Brandenburgin portti,
   Segovian akvedukti + liikeydin ErikoisLiike2.cs): speksit docs/raportit/erikoismallit/{kinderdijk,brandenburgin-portti,
   segovian-akvedukti}.md (55667089c), elämänideat Fablelle 02.4x. Esikatselut proto-3d/lokit/mallinseppa-esikatselu/kuvat-era2/.
   Brandenburgin portin julkisivu käännetty etelään (kamera katsoo etelästä), Kaupunki = "berliini".
5. **A/B/C-kokeiluhaara** mallinseppa/kategoriat3d-abc dfce4ec3 (EI mergeen): `symbolit kategoriavari a|b|c`
   (c = ramppi + vuoren lumi kärkivärinä). Ajo-vaihe 6 ajo-mallit.sh:ssa (lahi-<paikka>-<koko>-<kulma>-<a|b|c>.png).

## TULOS 03.1x (käännös b95f65aa, kuvat proto-3d/lokit/mallinseppa-laite-20260927-d/)

- A/B reilusti samasta ajosta: mallinseppa-toimitus-20260927/kategoriat-ab-<paikka>-75.png (koosta_abc.py, VARIANTIT=ab).
  C = B tässä ajossa (bugi: Rakentaja tallentaa värit lineaarisina) → korjattu 33b682ef.
- Erä 2: brandenburgin-portti-v1.png + video, segovian-akvedukti-v1.png + video (koosta_era2.py). Kinderdijk EI näy
  laitteella: pienissä maissa kamera pysähtyy MinKorkeus ~311 km:iin (NLD saapuminen 404 km → ZoomKerroin ≤ 1,3 < 2,5) →
  löydös Natiivisepälle 03.1x. Korjaukset 01810d0c: Segovia korkeammaksi (4,4), myllyt isommiksi, vaunut 1,5×.
- 12 symbolia: 8 valmiina haarassa mallinseppa/kategoriat3d-12 a9f2efbf (Tahti, Tiimalasi, Salama, Kiekko, Malja, Vaaka,
  Ratas, Ankkuri), esikatselut mallinseppa-toimitus-20260927/kategoriasymbolit-esikatselu-{1,2}.png. Agentti B (Tulivuori,
  Aallot, Tassu = pöllö, Kellotorni) kesken.

## TULOS 04.1x (käännös cb621b9b, kuvat proto-3d/lokit/mallinseppa-laite-20260927-e/)

- A/B/C samasta ajosta: mallinseppa-toimitus-20260927/kategoriat-abc-<paikka>-75.png; C toimii (vuoren lumi valkoinen).
  Suositus Fablelle: B + vuori C. Merge-haara valmiina: **mallinseppa/kategoriamallit-14 31e6cedf** (kaikki 14 symbolia,
  B + lumi C leivottuna, ei kokeilukomentoa, pohja ddd9b867, merge-tree juna/b13 ja pohja puhdas) → merge-pyyntö
  Natiivisepälle, kun omistaja vahvistaa värityksen (jos A tai pelkkä B: vain KategoriaApurit.cs:n väririvit).
- Kaikki symbolit kartalla: kategoriasymbolit-kartalla.png; lähikuvat kategoriasymbolit-esikatselu-{1,2,3}.png.
  Omistajan vahvistettavaksi lähetetty: kallistukset 20–35° (Ratas, Ankkuri, Salama, Aallot), kaiverretut mustemerkit
  (Tiimalasi, Salama), kapea Kellotorni, pöllö (enum Tassu).
- Erä 2 v2: segovian-akvedukti-v2.png, brandenburgin-portti-v2.png (+ videot). Proto mallinseppa/erikoismallit2 01810d0c.

## KÄYNNISSÄ

- **Klo 04 käännös + laiteajo** $S/ajo-0400.sh (alkaa, kun $S/go-0400 on olemassa, viimeistään 04.12): juna/b13 +
  mallinseppa/erikoismallit2 + mallinseppa/kategoriat3d-12 → VAIHEET 12679 (Brandenburg ja Segovia, A/B/C, symbolit kartalla)
  → lokit/mallinseppa-laite-20260927-e/.
- (tehty) **Klo 03.00 käännös + laiteajo** (taustalla, $S/ajo-0300.sh, loki $S/ajo-0300.log): juna/b13 + mallinseppa/erikoismallit2 +
  mallinseppa/kategoriat3d-abc → .app $S/mallit4-app → VAIHEET 1269 → kuvat proto-3d/lokit/mallinseppa-laite-20260927-d/.
  Sen jälkeen: koosteet (erikoismallit 3 kpl kuten koosta.py, A/B/C tiukat rajaukset koosta_tiukka.py:n tapaan) → Fablelle,
  rivi Karttasepälle "valmis".
- **12 kategoriasymbolia** kolmella Opus-agentilla omissa esikatseluympäristöissä proto-3d/tyokalut/kategoria-esikatselu-{a,b,c}/
  (a: Tahti, Tiimalasi, Salama, Kiekko; b: Tulivuori, Aallot, Tassu = pöllö kuten kuvamerkki, Kellotorni; c: Malja, Vaaka,
  Ratas, Ankkuri). Valmiit .cs-tiedostot kopioidaan kokeiluhaaraan Kartta/Kategoriamallit/, unity-tarkistus, käännös seuraavassa ikkunassa.

## SEURAAVAKSI

- Lento v3 (mallinseppa/tiger-moth 7b1bf9b9) odottaa Natiivisepän integraatiota → vastaa kysymyksiin.
- Kun omistaja valitsee A/B/C: leivo väritys KategoriaApurit.cs:ään (a = Hex, b = Ramppi, c = Ramppi + KvLumi/KvLumiVarjo
  Hex), poista kokeilukomento, merge-pyyntö kategoriamalleista Natiivisepälle.
