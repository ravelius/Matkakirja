# Linnanrakentajan luovutus 13.10.2026 päivä (Suomen aika ~11.4x) — OLAVINLINNA TAUOLLA

Luovuttaja: Linnanrakentaja (Opus, high), tili sama. Vastaanottaja: seuraava Linnanrakentaja-sessio (PT antaa uuden erän).
Edellinen: `docs/raportit/viesti-linnanrakentaja-luovutus-20261012-ilta.md` (JATKO-osiot loppuun asti = tämän vuoron yksityiskohdat).

## 1. Lue ensin
1. `CLAUDE.md`, Raamatun Ydinajatus kohta 2 "TYÖTAPA JA SESSIOT" (`grep -n "TYÖTAPA JA SESSIOT" js/tyohuone-raamattu.js`, toinen osuma).
2. Tämä tiedosto kokonaan. Yksityiskohdat edellisen luovutuksen lopusta (JATKO 21.5x → "OLAVINLINNA TAUOLLE").
3. Raamattu: AIKA, VAIN EUROOPPA, AGENTIT VAIN OPUS JA SONNET.

## 2. Tila
- **OLAVINLINNA ON TAUOLLA** (omistaja 13.10. klo 09.2x PT:n kautta). Tehtiin vain viiden tilan viimeistely peliin: keittiö, porttikäytävä,
  pikkupiha, linnantupa, voudin sali. EI uusia tiloja ennen PT:n uutta erää.
- main = e87831e81 (#4552, PT:n luovutus). Linnanrakentajan työhaara `linnanrakentaja-tyo-20260929` pushattu (vain docs). Vientihaara
  `linnanrakentaja-linna-v45k` (worktree `/Users/Shared/Claude/wt/linnanrakentaja-linna-v45k`) pushattu, HEAD 960600464 (blender.json v49a).
- Olavinlinnan paketit (vie-blender, tunnus 1499 | NYKY):

| Versio | 1499 | NYKY | Sisältö |
|---|---|---|---|
| v48t | 5b4fd306e6cab22c | eb72af39ec51de63 | #4417 kohdat 1–2: kappeli kalkki, ristit, sivualttari; soihdut → ihralamput |
| v48v | ea94444a853a79bb | a130a778d62de2e4 | uudet asut (juna 186) |
| v48w | 13bb80efd91aa352 | 6fd5e5830b503ecc | kierreportaiden lamput |
| v48x | 736d361c9d99f85d | fd05d7a3c22ecdee | lyhtytolppa pois, vesiportin katto, harjatrimmaus (botti 90) |
| v48z | f8dc4a8cddbb4245 | e63eed0f1149d99a | 6 tilaa uudelleen leivottuna KUORELLA (botti 86) — botti 17/17, PT kuittasi juna 186 |
| **v49a** | **b8b9489b12ee5576** | **7264551e1a39e864** | v48z + kappelin holvin musta viuhka pois (kappeli-kavely.glb UV1) — LS2 holvikuva OK; PT: korvaa v48z:n junassa 186 kun botti 17/17 |

- **Viisi huonetta natiivin "tila"-malleina (LS2:n koehuonehaara, EI junassa vielä; PT:n päätös b):** lopulliset kansiot `_valmiit/`:

| Tila (id) | Versio / kansio | Kolmiot huippu / kevyt | Tila |
|---|---|---|---|
| keittio-g102 | `olavinlinna-keittio-koehuone-v1/` juuri + `v3f/ajo1` (+ liite v3d sijoittelussa) | ~150 k / ~40 k | kuitattu v9d |
| porttikaytava-t102 | `olavinlinna-porttikaytava-v1/ajo6c` (irr × 0,35, valo:-voimat 0,35) | 59,6 k / 10,2 k | taso OK (pk2 0,012) |
| pikkupiha | `olavinlinna-pikkupiha-v1/ajo10` (11.41 lopullinen: lattiasauma + kaaren rako + harjanne; leikkaus -v1.json) | 62,9 k / 11,0 k | LS2:n simuajo kesken |
| linnantupa | `olavinlinna-palatsi-v1/linnantupa/ajo10` | 78,6 k / 16,2 k | LS2:n simuajo kesken (rajaa_tilat bdd88fdaf) |
| voudin-sali | `olavinlinna-palatsi-v1/voudin-sali/ajo13` (irr 0,707, valo:-voimat × 0,5, vaakuna tilan pinnassa) | 70,7 k / 11,3 k | sama |

## 3. Pushatut haarat / avoimet PR:t
- `linnanrakentaja-tyo-20260929` (docs: luovutukset, suunnitelmat) — ei PR:ää, PT/Julkaisija mergeää docs-PR:nä tarvittaessa.
- `linnanrakentaja-linna-v45k` — blender.json-commitit v48t…v49a (vie-dioraama). Junakytkennän tekee Siirtoseppä/NS (v49a).
- LS2:n koehuonehaara (natiivi: tila-mallit, rajaa_tilat bdd88fdaf, sisätilarajaus 19449982b, rekvisiitat 7b88c2751) — LS2:n vastuulla.

## 4. Kesken — tee nämä ensin (vain jos PT pyytää; muuten lepo)
1. **LS2:n viimeinen simuajo** (tupa ajo10, sali ajo13, pikkupiha ajo10): jos jotain jää, korjaus samaan tilakansioon uutena ajona.
   Agentit (palatsi- ja pikkupiha-agentti) ovat tämän session ali-agentteja — nollauksen jälkeen ne katoavat; uusi agentti lukee
   kunkin kansion LUEMINUT.md:n (ajohistoria + kameran paikat).
2. **Ketju PT:n mukaan:** LS2:n pelikuvat → PT:n kuittaus → Siirtosepän botti 17/17 (uudet lattiaesineet törmäyslaatikoin, kuilun
   verhous 2–2,5 cm kävelyn yllä) → NS:n juna muistiajoineen.
3. **Vientipaketti ämpäriin** (kun PT kuittaa viisi tilaa): `python -I /Users/Shared/Claude/proto-3d/_valmiit/olavinlinna-kavely-v1/lahde/tyokalut-lr/kokoa_huoneet_vienti.py /Users/Shared/Claude/proto-3d/_valmiit/olavinlinna-huoneet-vienti-<pvm> keittio-g102=v3f-ajo1=KEITTIO porttikaytava-t102=ajo6c=<kansio> pikkupiha=<ajo>=<kansio> linnantupa=ajo10=<kansio> voudin-sali=ajo13=<kansio>`
   → `/Users/Shared/Claude/julkaisija-tyokalut/vie-paketti.sh --kuiva <paketti>` → Julkaisija vie. Polku `dioraama/olavinlinna/huoneet/<tila-id>/<versio>/`
   (LS2 hyväksyi; vain astcm + json + glb, png vain keittiön savuverho-v2). Koe 902 tiedostoa / 314 Mt OK (scratchpad).
4. **Erä 4 (Tott-kammio A 101 + kirkkotornin portaat) KESKEYTETTY** tauon vuoksi: `_valmiit/olavinlinna-tott-kammio-v1/` (agentti pysähtyi
   API-rajaan kesken; tila sen lahde/- ja ajo-kansioissa; ei toimitettu). #4417 kohta 4 (takka Tott–Sture-kilvin, 4 ovea, 2 ampuma-aukkoa,
   kiveys, palkkikatto). Jatko vain PT:n uudella erällä.
5. Muut linnan jonot (tauon jälkeen): kappelin holvi yhdeksi kalkituksi ristiholviksi (nyt tilkkutäkki: tila + kappeli-kavely-rappaus +
   kuori), #4417 kohdat 5–10, pikkupihan yllä kuoren mustat palat, Tott-kammio, päiväleivonnat (porttikäytävä, palatsi), tuvan UV1-täyttö 45 %.

## 5. Odottaa omistajan päätöstä
- Ei mitään Linnanrakentajalle. (Linna tauolla omistajan päätöksellä; PT päättää jatkosta.)

## 6. Työtavat (muuttunut tässä vuorossa)
- **Leivontaliput (TÄRKEÄ):** tilojen `leivo_tila.py`-leivonta AINA alkuperäisin v44-asetuksin:
  `--leivo --leikkaa --naytteet 256 --kuori <v44>/ulkokuori/ulkokuori_normaali.glb --iso 8192`, hämärä lisäksi `--hamara --tavoite`.
  Ilman `--kuori` varjostajana on proseduraalinen massa → ulkopinnat mustiksi (botti 86). Malli: `tyokalut-lr/leivo_v48z.zsh`.
- **Valo:-solmut** valaisevat natiivissa VAIN reaaliaikaisia kohteita (esineet, hahmot), EIVÄT leivottuja tiloja. Tilan tason muutos =
  irradianssin kerroin (`yhdista.py --kerroin`, ei uutta leivontaa); valo:-voimat samalla kertoimella esineitä varten (`porttikaytava-v1/lahde/valovoima.py`).
- **Kuoren leikkausjson** nimellä `glb/<tila>-kuoren-leikkaus-v1.json` (natiivi hakee -v1:llä, DioraamaSovitin.cs:2903); uusi kenttä
  `rajaa_tilat: [...]` (LS2 bdd88fdaf) rajaa naapuritilan kolmiot huoneen leikkauksesta.
- **Natiivissa "tila piirtää sisätilan, kävelyosa ulkokuoren"** samalla id:llä (keittio-G102 → 37 ulkokolmiota jää) — kävelyosaa ei voi
  piilottaa ennen kuin verhous kattaa kaikki ulkopinnat.
- **LS2:n osuma-komento** (`poikki: osuma`) kertoo ruutupisteen mallin/alimeshin/materiaalin → käytä ennen hypoteeseja.
- Uudet työkalut `olavinlinna-kavely-v1/lahde/tyokalut-lr/`: leivo_v48z.zsh, kytke_v48z.py, vie_v48z.zsh, uv1_mustat_naapuriin.py,
  kytke_v49a.zsh, vie_v49a.zsh, kavely_paallekkaiset_pois.py, kavely_tilan_sisalta_pois.py, kokoa_huoneet_vienti.py; pikkupiha `lahde/pinta_nimeksi.py`.

## 7. Julkaisukaava (Olavinlinna-paketti)
`tools/dioraama/vie-blender.sh --lahde <v44|v44-nyky>` (worktree v45k) → commit blender.json → push → `gh workflow run vie-dioraama.yml
--ref linnanrakentaja-linna-v45k -f rakennus=olavinlinna -f kuiva=false -f osoitin=false` → TULOS-tunnus → Siirtoseppä kiinnittää.
Malli: `tyokalut-lr/vie_v49a.zsh`. Julkaisusäännöt: docs/roolitus.md.

## 8. Ympäristö
- Mac Studio, `/Users/Shared/Claude/`. **Levy 95 % täynnä (52 Gt vapaana 11.34)** — vanhoja ajo-kansioita EI poistettu (ei poistoja);
  PT:n/omistajan päätös siivouksesta. Blender 5.2.1 (faceit-lisäosan load_pre-virhe lokissa on harmiton).
- Yksi leivonta kerrallaan (`pgrep -f "leivo.py|leivo_tila.py"`), pitkät ajot perl setsid -irrotuksella.

## 9. Velat ja opetukset
Velat: (1) kappelin holvin tilkkutäkki, (2) pikkupihan yllä kuoren mustat palat, (3) päiväleivonnat porttikäytävä + palatsi,
(4) tuvan UV1-täyttö 45 % (detaljikerros), (5) Tott-kammio kesken, (6) keittiön vanhan kävelylaatikon katto ylhäältä (37 kolm.), (7) pikkupihan portin oikealla ≤ 3 cm seinäpullistuma (ohut vaakaviiva lähikuvassa; ~10 min leivonta).
Opetukset:
- Botti 86: oletin ensin valojen puutetta (v48w lisäsi lamppuja turhaan); oikea syy oli leivontaliput (massa vs. kuori). Vertaa aina
  uuden leivonnan komentoa alkuperäiseen (`proto-3d/tyokalut/linnanrakentaja-ajot/scratch-20261007/paistot.sh`).
- Kappelin viuhka: oletin reaaliaikaista varjoa (LS2:n koe kumosi), sitten päällekkäisiä holveja (osittain); oikea: kävelyosan
  rappauksen lakikolmioiden UV1 atlaksen tyhjässä → UV1 naapuriin (leikkaus olisi jättänyt reiän).
- Porttikäytävän "kirkas pieli": oletin valo:-solmua (ajo6c turha tilalle) — osuma-komento näytti keittiön vanhan kävelylaatikon.
- Kuilun musta aukko: ei verhouksen rako vaan naapuritilan keskushalli pielet → rajaa_tilat.

## 10. Aloitusviesti

```
Olet Linnanrakentaja (Opus, high) Matkakirja-pelissä (Olavinlinnan elävä linna, Poikkileikkaus-linssi).
Checkout /Users/Shared/Claude/Matkakirja-linnanrakentaja, haara linnanrakentaja-tyo-20260929. Aja git fetch origin.
Lue CLAUDE.md, Raamatun Ydinajatus kohta 2 ja docs/raportit/viesti-linnanrakentaja-luovutus-20261013-paiva.md KOKONAAN.
OLAVINLINNA ON TAUOLLA (omistaja 13.10.): älä aloita uusia tiloja. Odota PÄÄTOIMITTAJAN (Opus, max) uutta erää (viestit nimellä).
Jos PT pyytää viiden tilan vientipakettia: luovutuksen kohta 4.3. Leivontaliput: kohta 6 (AINA --kuori, ei massaa).
Agentit vain Opus/Sonnet; skriptit tiedostoihin; yksi leivonta kerrallaan; ei poistoja.
```
