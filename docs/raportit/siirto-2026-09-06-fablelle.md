# Siirtoprompti Fablelle — 6.9.2026 klo 13.30 (Suomen aikaa)

Kopioi tämä uuden session ensimmäiseksi viestiksi. Edellinen sessio (Fable,
päätoimittaja) pysäytettiin, kun tilin session-raja täyttyi (raja nollautuu
klo 15.40 Suomen aikaa). Kaikki agentit pysäytettiin omistajan käskystä.

---

Olet **Fable**, Matkakirja-pelin päätoimittaja (repo ravelius/Matkakirja,
omistaja Sami). Lue ensin CLAUDE.md, docs/roolitus.md ja
js/tyohuone-raamattu.js (uusimmat merkinnät 6.9.2026: AIKAJANAN
AVAUSLAATIKKO, AIKAJANAN AJO, IHMISEN MATKA ON VARIVIRTOJA, PALLO LEVOSSA
YHTA TERAVA KUIN TASOKARTTA, LINSSIN SELITE LAUKUSSA ON YKSI RIVI,
KIRJOITUSKONE EI HYPI, MAAILMA VALMIIKSI PAITSI TEKSTIT JA AARREKAARI,
PULUN AANI VAIN ATEENA JA SOFIA ENSIN). Työskentelet itsenäisesti
omistajan ohjeilla; kysymykset omistajalle AskUserQuestion-kortteina;
ajat omistajalle Suomen aikaa (UTC+3).

## 1. Tila

- **main = v1636** (PR #2104). Työhaara `claude/matkakirja-lehdet-nqf159`
  on mainin päällä ja PUSHATTU; siinä on julkaisematta **v1637:n aines**:
  - docs/moduulit/ihmisen-matka-virrat.md (fablemaxin suunnitelma,
    Raamatun karttarivi mukana)
  - "Aikajanan ajo: kaari, kasvava viiva, viliseva kello" (kamera
    lähemmäs 560 yks, ennakko 0,8, viiva piirtyy katkoviivalla, kello
    vuoden tarkkuudella; koskee myös Keksinnöt-linssiä)
  - Maalehdet FJI/PNG/SLB ja URY/PRY/VEN (tests/maatiedot.test.mjs
    VIELA_ILMAN_TUNNUSLUKUJA = näiden kuusi → tunnusluvut tehtävä
    tools/kirjoita-maatiedot.mjs:llä)
  - Raamattu-merkinnät + tools/parvi/ (parven ohjeet, poimintaskriptit,
    kertynyt miniatyyritilaus).
  → Julkaise ensin v1637 julkaisukaavalla (kohta 3).
- Kuvaputkelle postitettu 24 eläintäkytilausta (posti b917d738); kuvaputki
  kuittasi (5cfda791) ja pyysi **kolme täsmennystä**: SDN arruikatsa
  (sarvet: kaksi taaksekaartuvaa, prompti korjataan), **SLE simpanssi:
  keihäänteko on Fongolista Senegalista → vastaa kuvaputkelle: kuvaan
  hedelmää tutkiva simpanssi, tekstiin Fongoli-paikannus; SLE-kuva odottaa
  vastausta**, PAN kultasammakko (Smithsonian 2/2026 palautuskokeilut →
  päivitä elaintakyt.js:n PAN-teksti varovaisesti). Vastaa postiin
  (haara claude/postilaatikko, posti/fable-vanha.md uusin ylös) ja tee
  tekstikorjaukset.
- **Miniatyyritilaus kuvaputkelle POSTITTAMATTA**:
  tools/parvi/miniatyyri-tilaus-kertyma-2026-09-06.md (Porto Alegre,
  Honiara 5, Port Vila 5, Denver 8, Houston 8). Postita se.
- Pallo/terävyys: omistajan vastaus "kartta oli ennen palloa paljon
  terävämpi … kun liike on pysäytetty, kuva pitäisi renderöityä samalla
  tarkkuudella kuin 2d kartassa. saatko parannettua koodia?" →
  fablemax-agentti ehti vain alkaa. Brief: lepokerros (näkyvän alueen
  tekstuuri litteän pyramidin z8-laatoista, 480 px/aste, tiheä
  lat/lng-verkko UV Miller-koordinaateissa, häivytys levossa; varakeino
  pallon Z9 litteästä z8:sta korjaamalla tools/tee-pallolaatat.mjs).
  Raamattu-merkintä on jo. Käynnistä uudestaan fablemaxilla.
- Etusivu: omistaja 6.9. iltapäivä: **"näkyy vielä vähän suoraa rajaa
  tekstin vaaleassa taustassa"** (työpöytäkuva: avaustekstin palstan
  vaalea harso päättyy suoraan reunaan pallon päällä). Pehmennä
  .intro-arkin/tekstipalstan harson reunat (ja reittikuvan maskiaukko,
  js/etusivupallo.js julisteenMaski) liukuviksi. Kirjaa Raamattuun.
- Ihmisen matka: omistaja **"Suunnitellaan yhdessä ennen toteutusta"**.
  Käy docs/moduulit/ihmisen-matka-virrat.md luku 10 (14 kysymystä)
  omistajan kanssa läpi kortteina 2–3 kysymystä kerrallaan (kiireellisimmät
  10.1–10.2 värit ja vanhan alueen näkyvyys, 10.6 reittiviiva pois, 10.7
  neandertalilaiset, 10.9 tasokartta vai pallo, 10.11 Siperia, 10.13
  porttien reunat). Koodia ei kirjoiteta ennen päätöksiä. Laskukoe on
  vain scratchpadissa (kadonnut) — suunnitelman luku 7 sisältää
  mittaukset.
- Pulun ääni: omistaja kuuntelee ehdokkaita (Scruffy Duck
  8VJBrRk4O7tFoB5kqxa6 suositus; Laura FGY2WhTYpPnrIDTdsKH5; Heather
  plP9aw1rizYgjFfuvLQ7; Callum N2lVS1w4EtoT3dr4eOWO; Amy
  Unp9nyU4uB72q2KkxYJM; Rusty Malone 507tTFX0IPtqFzGd1CAL). Valinnan
  jälkeen generoidaan VAIN avaus + Ateena + Sofia (lyhennä Sofian
  LIVIAN_SAAPUMISET js/fokusvirta.js ensin); linssien kommentit vasta
  yhteisen päätöksen jälkeen. Työkalu generoi-pulu.yml.
- Cloudflare: sahke-worker.yml deploy epäonnistuu, kunnes omistaja lisää
  tokeniin Account · D1 · Edit. Muistuta kerran.
- TestFlight: sertit siivottu (ios-sertit-siivous.yml), ajo onnistui.

## 2. Maailman jatkaminen parvilla (omistaja: käytä agenttiparvia)

Nostot valmiit (103/112; loput tekniset poikkeukset). Jäljellä:
- **Maalehdet (44):** AFG AGO BOL CMR COD DZA ETH GHA GRL GTM HKG KAZ KEN
  LBR LBY LKA MAR MDG MLI MMR MNG MOZ NAM NGA NIC NPL PAN SDN SDS SEN SGP
  SHN SLE SOM TCD TLS TUN TWN TZA UGA UZB VUT ZAF ZWE (HKG/SGP/SHN
  kaupunkivaltioita — harkitse).
- **Kaupunkilehdet (103):** ks. tools/parvi/ + `node -e` -lasku alla;
  alkuun oikeat kaupungit (kapkaupunki nairobi marrakech dakar lagos
  addisabeba miami halifax anchorage winnipeg stjohns guatemala managua
  monterrey merida santacruz salta puertomontt puntaarenas dili …), alue-
  tyypit (sahara, kongo, ahaggar, appalakit …) myöhemmin.
- **Kohdekartat (38):** vancouver toronto chicago losangeles neworleans
  havanna mexico caracas bogota quito manaus salvador lima saopaulo
  valparaiso perth melbourne brisbane darwin adelaide hobart portmoresby
  wellington christchurch montevideo + Euroopan alueet (alpit sisilia
  kreeta bergen lappi islanti kapadokia siinai rubalkhali kamtsatka
  sahalin sumatra borneo).
- Vajelaskuri: `node tools/laske-karttanostot.mjs`; lehtivajeet lasketaan
  vertaamalla MAAILMANKARTTA.map.cityCountry ↔ MAA_KATEGORIAT /
  KULTTUURI_KATEGORIAT / KAUPUNKIKARTAT.
- Menetelmä: Opus-agentti Agent-työkalulla, `isolation: worktree`,
  taustalla, YKSI commit, ei pushia; brief = tools/parvi/maalehti-ohje.md,
  kaupunkilehti-ohje.md, kohdekartta-ohje.md (+ agentin-yhteiset-saannot.md).
  Enintään ~8 agenttia kerrallaan (Commons 429 ja tilin session-raja —
  19 rinnakkaista kaatoi session). Cherry-pick: tools/parvi/poimi-era.sh
  (nostoerät), liita-lisays.py <tiedosto> <base> <theirs>
  (kulttuuri-kategoriat, maa-kategoriat, worker.js, OHJE.md,
  piirra-kaupunkikartta), liita-loppuun.py <tiedosto> <commit>
  (elaintakyt, skandaalit, nahtavyysjutut), ratkaise-md.py (md-listat).
  Testilukumäärät (elaintakyt/skandaalit) ja VIELA_ILMAN_TUNNUSLUKUJA
  yhdistetään käsin. Skandaalivisan jakauma: oikea-indeksi ≤ 40 %.
  Worktree pois: `git worktree remove --force --force .claude/worktrees/
  agent-<id>; git branch -D worktree-agent-<id>`.
- Keskeytyneet agentit (ei committia, työ hukassa): maalehdet GTM/NIC/PAN,
  KEN/TZA/UGA, ETH/SDN/SDS, MAR/DZA/TUN, NGA/GHA/SEN, ZAF/ZWE/MOZ,
  AFG/UZB/KAZ, LKA/NPL/MMR; kaupunkilehdet Miami+Halifax,
  Kapkaupunki+Nairobi, Marrakech+Dakar; kohdekartat Vancouver/Toronto/
  Chicago ja Los Angeles/New Orleans/Havanna. Aloita nämä uudestaan.
- Omistajan sähköpostia EI käytetä missään (agentit panivat sen
  User-Agentiin — kielletty, ks. tools/parvi/agentin-yhteiset-saannot.md
  loppulisäys).

## 3. Julkaisukaava

`git fetch origin main` → `node tools/uusi-versio.mjs "rivi"` (≤ 60 ASCII)
→ `node --test tests/*.test.mjs` (fail 0) → tools/tarkista-{kaksoisavaimet,
niputus,savukkeet,nimiolimitys,nostopaikat}.mjs + tools/savukkeet/
savuke-maastokohteet.mjs (+ tarkista-karttapisteet.mjs <kaupunki> uusille
kartoille) → `node tools/build-standalone.mjs` (viimeinen rivi dist/… kt;
dist/ EI committoida) → commit (Co-Authored-By + Claude-Session -rivit)
→ push → PR (mcp__github__create_pull_request, runko päättyy 🤖-riviin ja
session-URL:iin) → CI: tools/parvi/tarkista-ci.sh → merge squash
(expectedHeadSha 40 merkkiä) → `git fetch origin main && git reset --hard
origin/main && git push -f`.

## 4. Muut avoimet asiat

- Säärivit puuttuvat (Open-Meteo 429 koko päivän): Dunedin, Suva, Porto
  Alegre, Asunción, Cairns, Panamá, Honiara, Port Vila, Denver, Houston →
  tools/hae-saanormaalit.mjs kun raja nollautuu.
- Kuuba ja Fidži ilman uutislähdettä (kirjattu koodiin).
- tools/savukkeet/savuke-aikajana.mjs reitittää `/r2\.dev\//` — media on
  media.matkakirja.app → korjaa kuvio (grep -rn "r2\.dev" tools/).
- js/packs/oceania-valokuvat.js honiara-lohko väittää "perustettu 1945" —
  lähde ei tue; tarkista.
- Eläintäky puuttuu teknisistä syistä: FJI, SLB, VUT (laudan maa-alue),
  SHN (outlines-taulusta puuttuu saari) → päätös: outlines vai testin
  poikkeus.
- Reittikuvat etusivulla haaleita (KOKO_OSUUS 0,14) — omistaja ei ole
  kommentoinut; Pariisin reittikuva ja Kalkutta kuvaputkella jonossa,
  varustekuvakkeet (keksinnot, ihmisen-matka) jonossa ensimmäisinä.
- Z9-laattasarja: ei tarvita, jos lepokerros toimii (kohta 1).
- Postikierros-rutiini (trig_01SB7J6WarGdjvZY9e7weUuv) fyrää tunneittain
  vanhaan sessioon — luo tarvittaessa uusi tähän sessioon ja poista vanha.
- Päivän raportti docs/raportit/ iltaan mennessä.
