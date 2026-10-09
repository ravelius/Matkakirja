# Julkaisijan luovutus 9.10.2026 ilta (~20.55, PT:n nollauskäsky, konteksti 70 %)

Juokseva loki: `/Users/Shared/Claude/julkaisija-tyokalut/tf-jono-20261002.txt` (tail -80). Pitolista: `julkaisija-tyokalut/pidossa.txt`
(lopussa 9.10. linjat). Kaikki alla oleva on myös lokissa aikaleimoin.

## 1. Simu- ja käännösjono juuri nyt (jatka tästä)

LS1:n Vasa + sk-kulmat-pariisi valmis 20.56. Nollaushetkellä (20.57) annettu ja roolien kesken suoraan sovittu jatko:

1. **NUI asettelutesti #5** (0cbe4b5ea, ~1 min, lukko, ei simua): KÄÄNNÖS NYT annettu 20.57.
2. **LS1 Steam Audio -laitekäännös** (KÄÄNNÖS NYT annettu 20.57, odottaa lukkoa; LS1 ilmoittaa SUORAAN Natiivisepälle): LS1 ajaa `laite-sha.sh natiiviseppa/juna-173` itse Natiivisepän päächeckoutissa (Natiiviseppä
   hyväksyi), lukko ~20–25 min. Sitten LS1:n **iPad Pro 13 (00008103)** -mittaus ~20 min (pallo Pariisi, steamaudio 0/1 ABAB;
   omistajan iPad-lupa 30.9., PT:n erä). iPad-mittaus saa pyöriä Natiivisepän sim-ABAB:n rinnalla. LS1 ilmoittaa "iPad vapaa"
   → kerro Natiivisepälle (hän tarvitsee iPadin 6.3 vs 6.7 -laite-ABAB:iin).
3. **Natiiviseppä Unity 6.7 -koe (omistaja/PT)** ~21.20: 6.3 A-puoli on jo käännetty (3f1d54d1b, 19.50). 6.7-käännös T7:llä omana
   prosessina nice 15 (EI käännöslukkoa) + sim-ABAB natiiviseppa-iPhone CDA479DE ~60 min koneella YKSIN (ei muita simuja eikä
   käännöksiä mittauksen aikana; junan käännös silti edelle). 6.7 ei mene TF:ään.

Muita jonossa ei ollut nollaushetkellä.

## 2. Simusäännöt ma 12.10. asti (PT/omistaja 9.10., pidossa.txt)

- Roolien sovelluskäännökset/simuajot vain: (a) liikkuvien kohtausten kuva-arkit ("kuin elokuva"), (b) editorin datavienti,
  (c) omistajan pyytämät kuvat, (d) PT:n erikseen pyytämät kuvaparit/todennukset. Pelkät tarkistusajot/stillit/kokeet EI → pelkkä
  käännös tai automaattitesti. Kysy roolilta "onko PT pyytänyt", jos epäselvä (LS2 ja Siirtoseppä vastaavat rehellisesti).
- Toinen rinnakkainen simu: `memory_pressure | tail -1` "free percentage" ≥ 35 % eikä swap kasva; alle 25 % → toinen kiinni.
  (Swap jumissa ~22 Gt, älä käytä swap-ehtoa.)
- Kuormaherkät kuva-arkit/stillit/latausajastukset: EI käännöstä rinnalla. Kokoa käännökset peräkkäin (roolin "tauko"-väliin),
  sitten simut rinnakkain. Tämä toimi koko illan.
- Kone vapaa rooleille ti 13.10. aamuun: GUI-automaatio ilman joutoaikaa, GPU-ajot täydellä teholla; ti aamuun GUI-ajot pois,
  Unreal kiinni. Nice 15, paistot yksi kerrallaan, junan käännös aina edelle.

## 3. Juna 173 ja TF

- **Juna 173 AUKI** (omistaja 17.2x): kerää kuittauksia, kunnes omistaja sanoo "nyt" (voi olla vielä tänään). PT kuittaa silloin
  lopullisen BUILD-SHA:n + muutoslokin → `muutosloki-api.sh 173 "<teksti>"` (max 3 lausetta / 280 merkkiä; lyhennä/yhdistä ja
  kerro PT:lle) → `tf-kaynnista.sh 173 <proto täysi SHA> <muutosloki merge SHA>`; lippu `tf173-ei-ulkoista` on asetettu.
  Natiivisepän runko PT:n mukaan nyt **06637df44** (aiemmat: 31058a5b2, 1d5614b7d, 3f1d54d1b…). Muutosloki kirjoitetaan uudelleen
  juuri ennen julkaisua (vanha luonnos pidossa.txt:ssä vanhentunut).
- TF:t tänään: 170 (10.09), 171 (10.4x, kaatumiskorjaus), 172 (14.1x, nimi "Matkakirja") — kaikki sisäisille. Mac TF 172 käynnistyi
  14.02 (37921284135, Natiivisepän odottaja). Mac TF 170 jäi tekemättä (171 korvaa).
- Junan 174 sisältöjä kertyy jo (Siirtosepän koe-174h-haarat, NUI asettelutesti-174, LS2 utu-välimuisti/varjot-173).

## 4. Osoittimet (kartta/omat-mallit/)

| osoitin | lukijat | nyt |
|---|---|---|
| uusin.json | vanhat appit ≤169 | v2/mallit-giza.json (älä koske) |
| uusin-2.json | junat 170–172 | **v6b** (pysyy) |
| uusin-3.json | junat 173+ | **v6h** (omistaja hyväksyi 18.3x; vaihdettu 18.5x) |

Ämpärissä myös v6c, v6e, v7, v8 (ei osoittimissa). Vaihto: `osoitin-omat-mallit.sh <versio> [2|3]` (esim. `6h 3`), vain kun
kukaan ei aja pallosisältöä simulla/iPadilla.

## 5. Tämän illan viennit (kaikki 0 virhettä, ei avoimia)

luennat-v1 (6 903 + manifest viimeisenä), pallo-elava-v2, pallo-kaupunki-v1, sonniss-aanet-v4, pallo-soundly-v1, pallo-tuuli-soundly
v1/v2/v3, lyria-v2, kaupunkijakso-pariisi, esittely-tukholma-v3b, esittely-pariisi-v1d, pulu FRA (+ maat.json max-age=60 käsin),
omat mallit v6b/v6c/v6e/v6h/v7/v8, s2-eurooppa-talvi/v1, kaukomaa v1 / yo-v1 / v1p / yo-v1p, vesi-index-v5, ilmakeha-aerosoli-v1,
kuvat-2048 (9 308 + luettelo.json; NUI kytki).
Uusi työkalu: `julkaisija-tyokalut/vie-indeksi-viimeisena.zsh <paketti>` (index.json erilliseen pakettiin, 4 osaa, index viimeisenä).

## 6. Muuta

- PR:t tänään mergetty: #4265, #4267, #4270, #4271, #4272, #4274, #4275, #4276, #4277, #4280, #4287, #4288, #4295, #4302 (worker
  katse_suunta; pikatarkistus 172-appilla OK), #4305, #4306, #4308, #4310. Ei avoimia merge-odotuksia.
- NAS-arkistointi valmis 17.20 (`nas-arkistoi.zsh`): PT:n 94 T7-kopiota + vienti-arkisto + kuvat-2048 → NAS
  Matkakirja-arkisto/julkaisija/. 4 Pelikoodarin skriptien viittaamaa pakettia jäi T7:lle symlinkkeineen. 69 vientipakettia oli
  paikallisesti vajaita jo lähteessä (ämpäri ehjä) — ei toimia.
- wt/codex-pulu-vauhti-ilmeet: orpo kopio (omistaja samireivinen, koodaus ei voi poistaa; haara pushattu) → yösiivous/omistaja.
- Viestit Siirtosepälle menevät usein vain varakanavalla `mcp__ccd_session_mgmt__send_message` (session local_b50bb32e…).
