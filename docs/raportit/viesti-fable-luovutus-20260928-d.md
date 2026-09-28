# Päätoimittajan (ent. Fable) luovutus 28.9.2026 klo 23.51 (konteksti 62 %)

Sessio local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31 "Päätoimittaja (Opus, xhigh)". Kaikki päätökset lokissa
docs/raamattu-loki/paatokset-2026-09.md 28.9. klo 19.37 → 23.50 (grep "28.9.2026"). Edellinen luovutus -20260928-c.

## 1. Roolisessiot (ÄLÄ luo uusia) — mallit muuttuivat tänä iltana

| Rooli | Session id | Malli | Kärki nyt |
|---|---|---|---|
| Postivahti | local_0a4f4c68-d24d-4b1f-83d7-d3c098cec96b | Sonnet 5.5 (200 k), medium | kierto 10 min; nollaa 70 %:ssa 200 k:sta |
| Julkaisija | local_24e63224-112c-449a-b6a3-e10e4ed43f4b | Opus 5.5, high (Sonnet-koe peruttu) | 1.0.40 VIE PIDOSSA (ks. kohta 2); web-juna; #3585 luonnos |
| Karttaseppä | local_16f80454-5b30-4180-ae9b-8c6d1edb6779 | Opus | pallon vienti yöllä (5–8 h) → ?pyramidi=2026-09-27; #3574 silmukkakorjaus junassa |
| Natiiviseppä | local_fcc10552-5810-49bf-b0cf-188456f1231c | Opus max | 1.0.40 uusintakäännös kosketuskorjauksella; 1.0.41-juna; maan kuultaminen Cupola-UI:n läpi (1.0.41) |
| Pelikoodari | local_11aca9cd-eda6-4db9-9019-8a153c8b8795 | Opus | radiolinssin äänet (Sonnet-ali-agentti); astro-taulu 1ea1b4510 PR #3576:n jälkeen |
| Linssiseppä | local_7a457b99-7ecd-4634-93a0-0c02b53e8d24 | Opus max (nollattu 22.3x) | Cupola 3 (omistaja OK) + "tummenna ja pehmennä" 93b38da3, cl19 laitepari ~00.30 → merge-pyyntö 1.0.41 |
| Linssiseppä 2 | local_e675f86d-210c-416b-8d83-926194307a44 | Opus high (nollattu 22.2x) | ISS-kyyti-säätimet 54cb193a uusintakuvat → 1.0.41; SITTEN radiolinssin uudistus |
| Natiivi-UI | local_c6d63773-0270-4873-96f8-63c66cf52794 | Opus (nollattu 22.2x) | KÄRKI: natiivi-ui/kosketus-valimuisti 869852a1 → 1.0.40; sitten nimiöt v2b, maakuntatila |
| Siirtoseppä | local_6cef0cb2-ae2e-4677-b85c-2eeb192f10c4 | Opus | web maakuntanosto 86fad80d1 PR; ISS-realismi web, Cupola 3 -kuvat §5, terävät pilvet |
| Sisältökirjuri | local_b9ca71c7-3458-4e1d-aa21-f6c97e27c708 | Sonnet 5.5 (200 k), high (nollattu 22.2x) | E11 linssikatalogi #3584 + Olavinlinna-kuva; maakunta-PR:t (#3549 odottaa rebasea) |
| Laitetestaaja | local_36a45147-8407-4cfb-bbdb-c20d5f684735 | Sonnet 5.5 (200 k), high (nollattu 22.2x) | iPad-stressi uudelleen 1.0.40:lle (kaiutin/kuva/mini-hampurilainen) |

Mallivaihto: set_session_model tuntee vain claude-sonnet-5 (vanha); Sonnet 5.5 vain omistajan valikosta. Sonnet 5.5
= 200 k konteksti (roolin pohjakuorma ~85 k).

## 2. KÄRKI: 1.0.40

- BUILD 40 = proto master 5aba3dbc (juna 8de5b3df, käännös 60f69fe4): savukkeet PASS, iPhone PASS.
- Laitetestaajan iPad-stressi (3B4CDACB): KAIUTIN sulki nostokortin ~6/7 → VIE PIDOSSA (TF-ajo 36481495098 peruttu,
  mitään ei ladattu; build-numero 202609281959 ja muutosrivi #3582 jäävät).
- Juurisyy (Natiivi-UI:n Sonnet-ali-agentti ~10 min): UI Toolkitin Panel.Pick palauttaa kosketukselle välimuistin
  elementin, kun piste on sama pikseli; asettelun muutos ei mitätöi kosketuspointerien välimuistia.
- Korjaus natiivi-ui/kosketus-valimuisti 869852a1: käännös ~00.00–00.10, iPad 503000D1 -stressi ~00.35, merge-pyyntö
  Natiivisepälle ~00.40 → uusi 1.0.40-käännös → Laitetestaajan iPad-stressi (tavoite 0/60) → Päätoimittaja antaa
  Julkaisijalle UUDEN VIE:n. Jos ei valmis klo 02.00: erillinen päätös (vaihtoehto viedä 60f69fe4 ilman).
- Kerro omistajalle heti, kun 1.0.40 on sisäisessä ryhmässä (omistaja odottaa luennan korjauksia).

## 3. Omistajan avoimet

- **#3585 Pulun tagikorjaus** ([softly]/[whispers] pois, 50 repliikkiä) LUONNOKSENA: omistaja kuuntelee pitkän koosteen
  (lähetetty: scratchpad pulu-uudet-tagit-kaikki.mp3, 48 kpl, 10 min 55 s; lähde wt/pelikoodari-pulu-v4-kaikki/media/pulu).
  OK → `gh pr ready 3585` + Julkaisijalle kärkeen.
- **#3581 Pulun v4-äänet** junassa: omistaja sanoi "sano heti kun uudet pulun äänet ovat pelissä" → Julkaisija ilmoittaa.
- **Isoisän ääni:** "Älä hoppuile, ei vielä mitään generointia" — ei isoisän generointia ilman lupaa.
- **Isoisän luennan alku / kaupungin nimi:** simulaattorissa alkaa oikein; kysytty omistajalta Bluetooth-kuulokkeita
  (ei vastausta).
- **Pyramidi 2026-09-27:** pallon vienti yöllä → aamulla kortti osoittimen vaihdosta.
- **Radiolinssi:** ks. loki 23.47 (Linssiseppä 2 + Codex-radio ccb70fab9 + Pelikoodarin äänet); linssit koko maailmaan.

- **ELÄVÄ LINNA (poikkileikkauslinssi 3D:nä, loki 23.53):** omistaja haluaa "jumalattoman hienon näköisen ja
  monistettavan konseptin". Päätoimittajan suositus annettu (dioraama + maalatut hahmot, Pulu ja opetustaulut, henkilöiden
  repliikit, äänet, etsintä, aikaliukusäädin nykyiseen oopperalinnaan, henkilökortit; pystyleike KEITTIÖSTÄ ensin; uusi
  oma rooli Opus + Sonnet-ali-agentit). SEURAAVAKSI: kortti omistajalle aloitusluvasta ja uuden roolisession luonnista
  (muistio sessioiden-luonti-appia-ohjaamalla.md).

## 4. Codex-tilaukset (posti/, vastaukset codex-fable-*)

ISS-säätöpaneeli 292279232 (odottaa) · Cupola 3 (TOIMITETTU, kytketty) · avaruuskävely-konsepti f83a45e01 (odottaa)
· poikkileikkaus Olavinlinna (TOIMITETTU c02d4aebe; Codex pyysi kuittausta + omistajan arviota → kuittaa postiin)
· uusi radio ccb70fab9 (odottaa) · Pulun tekstit (vastattu 7ba726d04).

## 5. Tänään illalla päätetty (lokissa)

Sonnet rajattuihin tehtäviin ali-agenttina (Raamattu #3527-haara a11096ac1); VAIN EUROOPPA ei koske linssejä
(d5cac7f3e); Pulu Sonnet 5.5 tuotannossa (#3580, between_tools); yötauko vain raskaan yöpolton aikana; TF-avaussivut
pois (Testattavaa tyhjä, feedbackEnabled=false) + muutosrivi ennen TF-ryhmää; Pulun tagit ilman [softly]/[whispers];
aloituslento v3f4 "pidetään toistaiseksi"; Cupola 3 pyöreä ikkuna OK; maakuntatilan muutokset natiiviin;
avaruuskävelyn konseptikuvat; poikkileikkauslinssi E11.

## 6. Opit

- BSD find: `-newermt '-48 hours'` ei toimi → käytä `-mmin`. Levysiivous tänään 67 → 94 Gi (lokit, .app, worktreet 33 → 13).
- Käännöspalvelun CompilationCache ~40 Gt → Julkaisija tyhjentää 1.0.40:n viennin jälkeen.
- Aikarajalliset /tmp-liput (kuormaraja) jäivät päälle ja estivät asennuksen → poistettu, Julkaisija poistaa jatkossa ajallaan.
- Testiautomaatio napauttaa samaan pikseliin → toistaa UITK-välimuistivian; hyvä regressiotesti.
