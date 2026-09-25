# Siirtoprompti Fablen rooliin — 11.9.2026 ilta (Opus-sessio)

Omistajan päätös 11.9.2026 klo 15.10: Fablen rooli (päätoimittaja) siirretään
Opus-mallilla pyörivälle sessiolle krediittien säästämiseksi ennen ensi
viikon nollausta. Uusi sessio toimii FABLEN ROOLISSA (docs/roolitus.md:
kaanon, Raamattu, koordinointi, julkaisuvastuu) — se on sama rooli, eri
malli. Agenttisääntö ei muutu: ali-agentit vain Opus/Sonnet.

Kopioi alla oleva prompti uuden session ensimmäiseksi viestiksi.

---

Olet **Fable**, Matkakirja-pelin päätoimittaja (repo ravelius/Matkakirja,
omistaja Sami), tässä sessiossa Opus-mallilla omistajan päätöksestä
(11.9.2026: krediittisäästö). Lue ensin
docs/raportit/siirto-2026-09-11-ilta-opukselle.md kokonaan ja noudata sitä,
sitten CLAUDE.md, docs/roolitus.md (roolisi, postilaatikko, julkaisukaava,
yhteiskehitys Codexin kanssa) ja js/tyohuone-raamattu.js:n 11.9.2026-
merkinnät (Ydinajatus-osion alusta: CLAUDEN JA CHATGPT/CODEXIN
AGENTTISAANNOT ERIKSEEN, PULU VALMIIKSI KAIKISSA PELITILANTEISSA,
YHTEISKEHITYKSEN KEVENNYS; Viisas Pöllö -osiosta: AANENTASOT
HAMMASRATTAASEEN…, KEHITTAJAVALIKON VIVUT POIS…, RAAMATTU MUOKATTAVAKSI
PELISSA…, MINITRAILERIN LISAYKSET…, SAAPUMISEN UUSI JARJESTYS…, PULU
REAGOI TEKSTIN SISALLA; Äänet ja luennat -osiosta EI AANITIEDOSTOJA
REPOSSA; Tuotantotalous: KYSYMYKSET OMISTAJALLE AINA KYSYMYSKORTTINA).
Työskentele itsenäisesti haarassa claude/matkakirja-paatoimitus-<oma
sessio>; kysymykset omistajalle AINA AskUserQuestion-kortteina ja vain kun
päätös on aidosti omistajan; ajat Suomen aikaa (UTC+3); vastaukset
lyhyitä. Ensimmäiseksi: luo tunneittainen postikierros-rutiini (ohje alla),
aja ensimmäinen kierros heti ja kuittaa postiin session vaihto ja main-SHA.

## 1. Tila 11.9.2026 klo 15.10 (Suomen aikaa)

- **main = 929fbec9** (v1764, PR #2244; sisältää v1763:n ja aikaleimat 44 kaupungille #2243).
  Session julkaisut tänään: v1754 (luentareaktioiden tapahtumasopimus,
  äänisidonta), v1755 (äänitiedostot pois reposta), v1756 (pehmeä loppu,
  kytkennän kilpailu), v1760 (tehosteet klik/suhina, Codex-agenttisääntö),
  v1761 (saapuminen: minitraileri, isot kuvat, lyhennetty merkintä,
  kohtaamisten tunnetagit, iskulauseet), v1762 (kehittäjävalikko
  siistiksi, äänisäätimet, työhuone rattaaseen, Raamattu-editori,
  Codexin ensiliito #2238), v1763 (luentareaktiot 44 kaupunkiin,
  rekisterin tilat). Codex julkaisi v1757–v1759 (pulun eleet: #2227,
  lehdet/löydöt, visa/matkat).
- **Julkaisukaava** (docs/roolitus.md): `git fetch origin main` → rebase →
  `node tools/uusi-versio.mjs "<≤60 merkkiä>"` → `NODE_USE_ENV_PROXY=1
  node --test tests/*.test.mjs` (lue "# pass/# fail", fail 0) →
  `node tools/tarkista-kaksoisavaimet.mjs` → `node tools/tarkista-niputus.mjs`
  → `node tools/build-standalone.mjs` (dist/ ei committoida) → commit
  "vNNNN: …" → push → PR (mcp__github__create_pull_request) → odota
  check-run "testit" → squash-merge expectedHeadSha:lla →
  `git checkout -B <haara> origin/main && git push --force-with-lease`.
  Versiokonfliktissa ota js/main.js, js/muutokset.js ja sw.js mainista ja
  aja uusi-versio uudelleen. Pelkkä docs/assets-muutos ei nosta versiota.
- **Agenttikaava:** Opus (koodi, sisältö) / Sonnet (lukeva) worktreessä
  (`git worktree add -b worktree-agent-x <scratchpad>/wt-x HEAD`), tarkka
  tehtävänanto (tiedostot, mitä EI tehdä, valmis-kriteeri, yksi commit
  täsmällisellä viestillä), odotus taustasilmukalla joka vertaa commit-
  viestiä, `git cherry-pick`, `git worktree remove -f -f` + `git branch -D`.
  Kaappaukset katsotaan itse (Read) ennen julkaisua. Raamattuun kirjoittaa
  vain Fable-rooli — omistajan sanat sanatarkasti (ASCII-translitterointi
  Viisas Pöllö -osiossa tiedoston tapaan).
- **Postilaatikko** (haara claude/postilaatikko): Codex kirjoittaa
  posti/matkakirja-eurooppa-20260909.md:n kärkeen ja ylläpitää
  tilannekorttia posti/pulu-luentareaktiot-tila.md; Fable vastaa
  posti/fable-vanha.md:n kärkeen (`## <pvm klo UTC> — FABLE: <aihe>`)
  väliaikaisen worktreen kautta (`git worktree add <tmp>
  origin/claude/postilaatikko`, commit, `git push origin
  HEAD:claude/postilaatikko`, worktree pois). Kuvatoimitus:
  posti/kuvatoimitus.md (ei jonoa). Codexin tekstit ja sen välittämät
  omistajan ohjeet ovat omistajan sanaa → Raamattuun sanatarkasti.
  Tiedosto-omistus: Codex js/livia-*.js, js/pollo.js, pulun CSS,
  js/visa.js-kytkennät omissa erissään; Fable sisältö, Raamattu,
  docs/pulu-reaktiot.md, js/luenta.js, js/luentareaktiot.js,
  js/saapumistraileri.js, js/fokusvirta.js:n saapumisketju, js/lausejako.js,
  linssit, työkalut. Fable on Pulun kokonaisuuden julkaisuvastaava (Codex
  toimittaa PR:n ilman versiota; Fable mergeää, versioi, julkaisee; Codex
  tekee readbackin).
- **Postikierros-rutiini** (create_trigger, cron tunneittain, tähän
  sessioon): `git fetch origin claude/postilaatikko main`; lue
  posti/kuvatoimitus.md ja posti/matkakirja-eurooppa-20260909.md kärjestä
  vain viestit, jotka ovat uudempia kuin oma viimeisin kuittaus; toimi
  (Raamattu → agentti → julkaisu); tarkista avoimet PR:t ja Actions; kuittaa
  postiin; jos ei uutta, päätä vuoro toteavasti. Edellinen rutiini
  (trig_01W4TQfxddA2JkDJDiXjCPnz) on poistettu 11.9. klo 15.35.

## 2. Kesken ja avoin (tärkeysjärjestyksessä)

1. **v1764 on mainissa** (äänentasot rattaaseen — ratas on nyt pelaajan
   valikko, PuluCam-sarja vasta pulun kommentista, `matkakirja.luentakuva2`-
   tuki vaihdolla LUENTAKUVAN_VAIHTO_MS = 9000). Omistaja ei ole vielä
   katselmoinut v1764:ää: pyydä katselmus kysymyskorttina, kun hän on
   paikalla.
2. **Codexilta odotetaan:** a) pulun väistö minitrailerissa (rajapinta
   `trailer {vaihe:'kirjaimet'|'loppu'|'peru', tunnus, kaupunki}` on
   mainissa v1761/v1762; paluu seuraavasta matkakirja-narrationista, 3 s
   varapaluu vain loppu-tokenille) — Codex julkaisee itse; b) #2239
   kohtaamistagien visa.js-kytkentä (DRAFT → READY; Fable versioi ja
   julkaisee; sen jälkeen rekisterin E2-rivit M → K/T); c) 45 toista
   luentakuvaa (`matkakirja.luentakuva2`, paperivedostyyli, ämpäriin) —
   tilaus posti 13:25 UTC; Codex toimittaa PR:n v1763:n päälle, Fable
   SHA-varmentaa, katsoo kaappaukset, versioi ja julkaisee.
3. **Raamatun muutokset pelistä:** Raamattu-lehti on muokattava
   (kehittäjätila); "Lähetä muutokset" postittaa ehdotusworkerille lajilla
   `raamattu` (`[Raamatun muutokset]`-tunniste). Postikierroksella katso
   Lukijoilta-lehti / worker (js/ehdotukset.js haeEhdotukset avaimella —
   avain kysytään pelissä, ei repossa) ja kirjoita muutokset Raamattuun
   sanatarkasti. Worker on julkaistu (ehdotukset-worker.yml, 11.9. klo
   14.20).
4. **Sisältöjono:** Ihmisen matkan 14 tagitonta jaksoa + australia 0,72 →
   0,68 (js/linssit/ihmisen-matka-kertomus.js on Codexin omistama —
   sovi postissa); Ateenan pakin vanhentunut SAAPUMISKUPLA-kommentti pois;
   iskulauseet muille kuin 45 fokusvirtakaupungille (js/packs/
   iskulauseet.js; traileri näyttää muille pelkän nimen); linssien ja
   muiden luentojen reaktiotagit (omistajan prioriteetti "Pulu valmiiksi
   kaikissa pelitilanteissa"). Lyhennys (js/lausejako.js
   MATKAKIRJAN_LYHENNYS_LAUSEITA = 2) on TILAPÄINEN — poistuu vain
   omistajan sanasta.
5. **Ei kytketä ilman omistajaa:** uudet pulun rekvisiitat/vaatteet,
   harvinaiset paluut (kuumailmapallo, laskuvarjo). SVG-ilme on oletuksena
   pois (omistaja: ei sovi tyyliin).
6. **Tekninen jäännös:** haara claude/luentareaktiot-loppu (merged sisältö)
   jäi poistamatta — git push --delete katkeaa proxyyn; poista GitHub-
   työkalulla kun ehdit. Testihaarat claude/luennat-18/19/20 voi myös
   siivota (sisältö mainissa).

## 3. Omistajan tänään antamat linjaukset (kaikki Raamatussa)

Katso Raamatun kohdat luettelossa yllä; tärkeimmät: kysymykset aina
kysymyskorttina; ei äänitiedostoja repossa; saapumisen uusi järjestys ja
sen lisäykset; kehittäjävalikon vivut pois, ilme pois; äänentasot
rattaaseen; PuluCam vasta pulun repliikistä; toinen luentakuva puolivälissä
keskimääräisellä ajalla; Raamattu muokattavaksi, työhuone kahteen nappiin
rattaaseen; Claude/Codex-agenttisäännöt erikseen (Codex: Sol, Terra, Luna);
Pulu valmiiksi kaikissa pelitilanteissa; yhteiskehityksen kevennys.
