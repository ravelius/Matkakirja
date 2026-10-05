# Siirtosepän luovutus 5.10.2026 klo 06.1x (Opus 5.5, high) — tilinvaihto noin 07.15

Edellinen luovutus on `viesti-siirtoseppa-luovutus-20261002.md` (5.10. osiot 02.0x ja 05.2x). Tämä korvaa sen jonon.

## Juna 142 — KUITATTU, merge-pyynnöt Natiivisepällä

- **Mylly:** `siirtoseppa/mylly-142` @ **b2f9b0a1**, worktree `wt/proto-siirtoseppa-mylly`, masterin 9663df99 päällä.
  - ✕ → Poistu, JULISTE-otsikko, lippu piiloon, yksi Pelit-rivi.
  - `Aanet.RekisteroiTehoste(omaIsku)`.
  - `Pulu.Peita` → `StyleKeyword.Null`.
  - Vahvistus 1,6 ja lisä-äänet (siirto, mylly, voitto, häviö).
- **Linna:** `siirtoseppa/linna-palaute-142` @ **f531743e**, juna/b13:n päällä.
  - Kameran jousi ja orbit, käsipyöritys 360°.
  - Äänet: ryhmät, väistö, mitatut tasot, huoneäänet vain huoneessa.
  - Avainsanat, kuorivalinta hampurilaiseen, Laiturin leikkauskorjaus.
  - Aanisoitin: saumattomat linssisilmukat.
- **Avainsanadata:** Linnanrakentajan PR (peili 8f4eb611) sai OK:ni. Osoitin on omistajan päätös.
- **360°-veto:** Laitetestaaja todentaa (minulla ei ollut simulaattoripaneelin lupaa).

## Juna 143 — linna (haara `siirtoseppa/linna-143`, worktree `wt/proto-siirtoseppa-141`)

- **Commitit:**
  - **da00c9c6** sauman ristihäivytys 50 ms
  - **e1fdf532** Timeline (DioraamaTimeline + Kertoja-, Jakso- ja AvainsanaKlippi)
  - **b03ef429** Timeline oletuksena päällä (Päätoimittaja). A/B-todiste: lokit/siirtoseppa-linna-timeline, ero ≤ 1 ms, napautus identtinen.
  - **bdd5be5e** teardown-kilpa: DioraamaYmparisto ei pakkaa sulkeutuvan linnan tekstuureja; testikomento `poikki pakota-virhe N`.
  - Kärki **024a098d**.
- **TEHTY 06.13:** teardown todistettu (N 15–75, 0 NRE, lokit/siirtoseppa-linna-virhe).
- ~~**AVOIN, todiste:**~~ viiden N:n latausvirhe (`ajo-linna-virhe.sh`, `APP=lokit/siirtoseppa-linna143b-app` = 698bf6d6).
  - Simuvuoro on noin 06.25 Julkaisijalta.
  - Hyväksyntä: 0 NRE ja "poikki: latausvirhe" joka N:llä.
  - Tulos Päätoimittajalle.
- **TEHTY 06.32:** osoitin-A/B c116f02f vs **27022c94** (AO-B + 8k + tasoitus + avainsanat) kuvattu TF 142:n junan appilla, kuvat Päätoimittajalla; osoitin on omistajan aamupäätös.
- ~~**AVOIN, AO-B valittu:**~~ Linnanrakentaja tekee yhdistetyn peilin (AO-B + 8k + tasoitus).
  - Kuvaa se A:ta (c116f02f) vastaan: `ajo-linna-ao.sh`, vaihda B:n hash.
  - Kuvat Päätoimittajalle omistajan osoitinpäätöstä varten.
- **Odottaa omistajan latauslupaa** (aamun kortti): Cinemachine 3.1.7 + Splines 2.9.1 ja Steam Audio. Suunnitelma: `docs/raportit/linna-unity-suunnitelma-20261005.md`, vaiheet 1, 2b ja 6.
- **Odottaa Päätoimittajan hyväksyntää:** Linnanrakentajan kevennykset A (heijastus kevyellä kuorella) ja C (tilat pois vain yleisnäkymän levossa) (`docs/raportit/linna-kevennys-ehdotus-20261005.md`).
- **iPad-mittaus 00008103** Julkaisijan vuorolla, kun 143 on koottu:
  - fps (mediaani ja 1 %:n alin) junan 142 tasoon nähden
  - muisti
  - Brotli-purun kokonaisaika ja pääsäikeen piikit ensimmäisellä avauksella
  - Linnanrakentajan mittaukset `poikki vesi heijastus 0` ja `poikki kuori kevyt`
- **Muiden työt:**
  - Linssiseppä: tilt-shift ja Volume (vaihe 3). Huone/yleisnäkymä tulee `ViimeisinNakyma.KohdeTila`sta.
  - Natiiviseppä: Brotli (`natiiviseppa/zstd` acb4462a, katselmoitu ja hyväksytty).

## Juna 143 — Tavli (haara `siirtoseppa/tavli` @ **9169187b**, worktree `wt/proto-siirtoseppa-tavli`)

- **Suunnitelma:** `docs/raportit/tavli-suunnitelma-20261005.md` (HYVÄKSYTTY). Botin poikkeama on hyväksytty: helppo valitsee 35 %:n todennäköisyydellä satunnaisesti 8 parhaasta, normaali tekee 10 %:n todennäköisyydellä satunnaisen vuoron.
- **Tehty:**
  - Säännöt, botti ja Peli-testit (412/412).
  - UI Kafeneio-laudalla, 3D-nopat, äänet, Ateenan kohtaaminen, Pelit-rivi.
  - Osuma-ala ± 1 saraketta.
- **Simutodisteet:** `docs/raportit/kaappaukset/siirtoseppa-20261005/tavli-*`
  - oikea polku
  - osuma-ala oikeilla napautuksilla
  - heitto, siirto, lyönti, palkki, poisto ja voitto
- **EI TF:ään** ennen Sisältökirjurin tekstejä (paikkatekstit TODO). Sisältökirjuri aloittaa aamulla.
- **Linnanrakentajalta tulossa:** Bysantti- ja Ottomaani-laudat esikuvatarkistuksen jälkeen. Akustiikkaverkot v1 ovat `_valmiit/olavinlinna-akustiikka-v1/` (Steam Audio, vaihe 6).

## Skriptit ja todisteet

- **Skriptit:** `proto-3d/tyokalut/siirtoseppa-ajot/`
  - `ajo-linna-todennus.sh`, `-kappeli.sh`, `-ao.sh`, `-timeline.sh` ja `-virhe.sh`
  - `ajo-mylly-aani.sh` (kaveri + botti)
  - `ajo-tavli.sh` (rivin napautus 237 258 pt, osuma-ala 61 301 → 84 452)
  - `tallenne-yhdista.py`
- **Todisteet:** `docs/raportit/kaappaukset/siirtoseppa-20261005/` (ei committoitu).

**Huom:** levysiivous tyhjentää vanhoja lokit/*-app-kansioita (levy 97 %), joten käännä uudelleen tai käytä junan appia (lokit/juna-1.1.142-*).