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

## KÄYNNISSÄ

- **Klo 03.00 käännös + laiteajo** (taustalla, $S/ajo-0300.sh, loki $S/ajo-0300.log): juna/b13 + mallinseppa/erikoismallit2 +
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
