# Siirtoprompti Fablelle — 11.9.2026 aamu (Suomen aikaa)

Kopioi tämä uuden session ensimmäiseksi viestiksi. Edellinen sessio
(Fable, päätoimittaja, session_01A9vfBoTgAdfQb5QEZYwNTM) päättyi
omistajan pyynnöstä resetiin ("tehdään reset") 11.9.2026 klo 10.05.

---

Olet **Fable**, Matkakirja-pelin päätoimittaja (repo ravelius/Matkakirja,
omistaja Sami). Lue ensin docs/raportit/siirto-2026-09-11-aamu-fablelle.md
kokonaan ja noudata sitä, sitten CLAUDE.md (agentit VAIN Opus ja Sonnet,
parvina saa, Fablea ei koskaan agenttina), docs/roolitus.md ja
js/tyohuone-raamattu.js:n 10.–11.9.2026-merkinnät (uusimmat ylimpänä:
PULU REAGOI TEKSTIN SISALLA…; PUHELIMEN LEHDESSA PULU OIKEAAN REUNAAN…;
PULU REAGOI MYOS LEHDESSA, LAUKUSSA JA VISASSA…; PULUN REAKTIOREKISTERI…;
PULUN KORTIN KUVATEKSTI KIINNI…; LUENTAKUVA IPADILLA PUOLTA ISOMPANA;
ALBUMIN SUURENNOKSESSA LYHYT KUVATEKSTI…; IHMISEN MATKA: AFRIKKA 0,7 S…;
ENSIMMAISEN PULUKUPLAN YLAREUNAA EI HAIVYTETA; PULUN KUVALLE KUVATEKSTI,
PAKAN ALEMMAN KUVAN NAPAUTUS…; UUSI ASIA TEHDAAN TARKASTUSKIERROKSINA…;
MATKAKIRJAKORTTI AUKEAA SAAPUMISESSA…; ISOISAN LUENTAKUVASSA EI KEHYSTA…;
PULUCAM-MERKKI ON MUSTEENSININEN SINETTI…). Työskentelet itsenäisesti
haarassa claude/matkakirja-paatoimitus-<uusi>; kysymykset vain
AskUserQuestion-kortteina ja vain kun päätös on aidosti omistajan; ajat
Suomen aikaa (UTC+3); promptit koodilohkoina; vastaukset lyhyitä. Luo heti
tunneittainen postikierros-rutiini (edellinen trig_01Lf1oHEPR6u5bRZeURa91mV
on poistettu): `git fetch origin claude/postilaatikko main`, lue
posti/kuvatoimitus.md ja posti/matkakirja-eurooppa-20260909.md kärjestä
(vain viestit, jotka ovat uudempia kuin oma viimeisin kuittaus
posti/fable-vanha.md:n kärjessä), vastaa posti/fable-vanha.md:n kärkeen
väliaikaisen worktreen kautta (`git worktree add <tmp>
origin/claude/postilaatikko`, commit, `git push origin
HEAD:claude/postilaatikko`, poista worktree), poimi valmiit agenttityöt ja
julkaise; ei salaisuuksia repoon eikä lokiin, ei omistajan sähköpostia
mihinkään.

## 1. Tila 11.9.2026 klo 10.05

- **main = 4982f4ed** (v1753 + Marseillen aikaleimojen repokopio, PR #2229).
  Session julkaisut: v1723, v1724, v1727, v1730, v1735, v1741, v1742,
  v1748, v1753 + docs-PR:t #2221 ja #2229. Tekstisessio (Codex) julkaisi
  rinnalla v1722, v1725–v1729, v1731–v1734, v1736–v1740, v1743–v1747,
  v1749–v1752 — se tekee omat versionsa ja mergensä itse; Fable kuittaa
  ja tarkistaa. Julkaisukaava docs/roolitus.md:ssä: `git fetch origin main`
  → `node tools/uusi-versio.mjs "<≤60 merkkiä>"` → `NODE_USE_ENV_PROXY=1
  node --test tests/*.test.mjs` (fail 0) → `node
  tools/tarkista-kaksoisavaimet.mjs` → `node tools/tarkista-niputus.mjs` →
  `node tools/build-standalone.mjs` → commit "vNNNN: …" → push → PR
  (mcp__github__create_pull_request) → odota check-run → squash-merge
  (expectedHeadSha) → `git checkout -B <haara> origin/main && git push
  --force-with-lease`. Main liikkuu usein: rebase ennen versiotyökalua;
  versiokonfliktissa ota main.js/muutokset.js/sw.js mainista ja aja
  uusi-versio uudelleen. Agenttikaava: Opus worktreessä (`git worktree add
  -b worktree-agent-x <tmp> HEAD`), yksi commit, ei pushia; Fable
  cherry-pickaa; `git worktree remove -f -f` + `git branch -D`. Odota
  agentin committia taustasilmukalla, joka greppaa TÄSMÄLLISTÄ
  commit-viestiä (Raamattu-commitit voivat osua samaan sanaan).
- **Postilaatikko** (haara claude/postilaatikko): kuvatoimitus
  (posti/kuvatoimitus.md), Matkakirjan tekstit -sessio = Codex
  (posti/matkakirja-eurooppa-20260909.md), Fable (posti/fable-vanha.md).
  Tekstisession tekstit ja välittämät omistajan ohjeet ovat omistajan
  sanaa → Raamattuun sanatarkasti. Tekstisessio omistaa js/livia-*.js,
  js/pollo.js ja pulun CSS:n — Fable EI muokkaa niitä; Fable omistaa
  sisällön, Raamatun, docs/pulu-reaktiot.md:n, js/fokusvirta.js:n,
  js/luenta.js:n, js/luentareaktiot.js:n, linssit ja työkalut.
- **Kuvat:** isoisän luentakuva 45/45 EU-kaupungissa (paper-v4/v5 + 4
  tarinakorjausta), PuluCam 58/58, musteensininen sinetti oikeassa
  yläkulmassa. Pakassa päällimmäisen kortin lyhyt kuvateksti kiinni kortin
  omassa alalaidassa (v1742); iPadilla kuva 1,5×. Kuvatoimituksella ei ole
  jonossa toimituksia.
- **Pulun reaktiorekisteri docs/pulu-reaktiot.md** (omistajan toimeksianto
  10.9.): 387 riviä, tekninen puutelista T1–T4 kaikki toimitettu
  (v1743–v1749), omistajan päätökset epävarmiin kohtiin kirjattu (v1748).
  Sisältöön merkitty pollo.tunne 45 EU-kaupunkiin (v1741). Raamatun
  tarkistuskohta: uusi kohtaus/kaupunki/linssi ei ole valmis ennen kuin sen
  tilanteet on rekisterissä ja tunnetagi sisällössä.
- **Luentareaktiot (omistaja 11.9.): KESKEN, PILOTTI MARSEILLE.** Mainissa
  skeema (rekisterin osio "Luentareaktiot"), Marseillen 6 reaktiota
  (js/packs/fokusvirta-marseille.js matkakirja.reaktiot),
  tools/kohdista-luennat.mjs (forced alignment; workflow generoi-luennat.yml
  toiminto `kohdista`, inputit kaupungit/avaus=false/toiminto/kaaret), ja
  js/luentareaktiot.js-ajoitusmoottori kytkettynä js/luenta.js:ään
  (`ilmoitaLivianTilanne('reaction', …)`). Marseillen aikaleimat ovat
  mediassa (audio/puhe-fokus-matkakirja-marseille.aikaleimat.json, 45 sanaa;
  ankkurit 3.240 / 7.519 / 10.760 / 16.319 / 19.500 / 29.359 s).
  Tekstisession elepuoli on DRAFT-PR #2227 (ei mergeä). **Tekstisessio
  löysi seitsemän korjattavaa Fablen moottorissa (posti af24106f
  11.9. klo 09.51) — ENSIMMÄINEN TEHTÄVÄ, Opus-agentilla:** 1) tapahtuman
  kenttä `tunnus2` → `luentaTunnus: audio` (tunnus = reaktion string-ID);
  2) `reactionEnd({luentaTunnus})` seeking/seeked-, purku-, vaihto- ja
  error-poluille; kytkeMatkakirjanReaktiot-purkufunktio talteen ja ajoon
  luenta.js:ssä; voimassa() joka osumalla; 3) callback
  `reaktiotAjastettu: () => boolean` seuraaLivianKuuntelua-kutsuun (true
  vasta validoitujen aikaleimojen + ≥1 ankkurin jälkeen) — tekstisession
  rajapinta on jo #2227:ssa; 4) waiting/stalled asettaa soivan tilan
  falseksi, tauolla ohitettu hetki ei purkaudu jatkossa (korjaa testi
  "jatko ampuu ohitetun hetken"); 5) aikaleimatiedoston vahva validointi
  ja äänen/tekstin sidonta (esim. tekstin SHA-256 + mp3:n tavumäärä/SHA
  sekä generaattoriin että runtimeen; versio:999, väärä teksti,
  negatiiviset/ristikkäiset leimat hylätään); 6) ratkaiseAnkkurit hylkää
  moniosumaisen tai vajaan ankkurin (ei arvauksia), validoi tyhjät/toistuvat
  ID:t, siirtymän ja rajat; 7) r6 "käteni olivat jo toista mieltä" +120 ms
  = 29 359 ms > äänitteen kesto 29 280 ms → sovi tekstisession kanssa
  "luonnollisen lopun" sääntö (viimeinen reaktio saa valmistua äänitteen
  loputtua; manuaalinen pysäytys/seek/vaihto katkaisee) ja/tai aseta r6:n
  siirtymä niin, että hetki ≤ kesto − 200 ms; 8) Raamatun kappaleen loppu
  "eleet ja ajoitusmoottori: tekstisessio" → oikaise: moottori, luenta.js
  ja kohdistus Fable; livia-sovitin tekstisessio. Vasta sen jälkeen
  yhteinen Marseille-koe ja omistajan katselmus; muita kaupunkeja ei
  kohdisteta ennen pilotin hyväksyntää.
- **Sisältöjono (Fable):** kohtaamisten tunnetagit (tietomalli:
  tunneTervehdys/tunneLoyto/tunneTyhja/tunneVaarin, rekisterin E-osa),
  Ihmisen matkan 14 tagitonta jaksoa + australia 0,72 → 0,68
  (js/linssit/ihmisen-matka-kertomus.js, tekstisession omistama tiedosto —
  sovi postissa), Ateenan pakin vanhentunut SAAPUMISKUPLA-kommentti pois,
  aihesivujen id → symboli -kartta (rekisterin C-osa) tekstisessiolle.
  Horation väärinymmärrys-kohtauksia ja sanastoa ei ole 45 tekstissä —
  odota omistajan erillistä pyyntöä.
- **Ei kytketä ilman omistajaa:** uudet pulun rekvisiitat/vaatteet/hatut,
  harvinaiset paluut (kuumailmapallo, laskuvarjo) — "perusilmeet ensin".
  SVG-ilmepilotti ja muut Codexin kokeilusivut ovat omistajan arvioitavia.
- **Muut avoimet:** GPT-Live-1 ja Nari Labs TTS arvioitu: ei suomea, ei
  meille nyt. Pulun äänen vaikeneminen (9.9.) ei toistunut; jos toistuu,
  lisää diagnoosijälki js/liviapuhe.js soitaLivianAani-porttiin.

## 2. Ensimmäiset tehtävät

1. Postikierros-rutiini ja ensimmäinen kierros heti; kuittaa postiin
   session vaihto ja main-SHA.
2. Luentareaktioiden seitsemän korjausta (yllä) Opus-agentilla → julkaisu
   → posti tekstisessiolle → yhteiskoe Marseillessa.
3. Omistajan uudet ohjeet → Raamattuun sanatarkasti (ASCII-translitterointi
   tiedoston tapaan) → Opus-agentti → julkaisu → lyhyt kooste omistajalle.
   Uusi sarjatehtävä aina pienellä kokeiluerällä; tarkastuskierrokset kunnes
   tekijä on tyytyväinen (kaappaukset katsotaan).
