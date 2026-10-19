# Linssisepän luovutus 19.10.2026 klo 13.37 (Postivahti: KOVA RAJA 36 %)

Edellinen: viesti-linssiseppa-luovutus-20261019-1141.md. Id:t /Users/Shared/Claude/osoitekirja.md: PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31,
JU local_24e63224-112c-449a-b6a3-e10e4ed43f4b, NS local_fcc10552-5810-49bf-b0cf-188456f1231c, NUI local_c6d63773-0270-4873-96f8-63c66cf52794,
SK local_b9ca71c7-3458-4e1d-aa21-f6c97e27c708, Postivahti local_0a4f4c68-d24d-4b1f-83d7-d3c098cec96b.

## 0. KÄYNNISSÄ NYT (taustaskriptit kuolevat nollauksessa → tarkista `ps -ef | grep ajo-` ja käynnistä uudelleen tarvittaessa)
Ajoskriptit /Users/Shared/Claude/proto-3d/tyokalut/linssiseppa-ajot/ (L2 = PROTO_LINJA=2, lukko /tmp/matkakirja-kaannospalvelu-2.lukko):
1. **ajo-kaikki204.zsh** (loki ajo-kaikki204.log, käännös kaanna-kaikki204.out): käännös museo-kamerajohtaja-204 + kysy-hiljaa-204 + koopenhamina-kuvat-204
   KÄÄNTÄÄ NYT (alkoi 13.25; HUOM kysy-hiljaa mukana vain f7f74fd58 asti). App → _tyo/linssiseppa/juna204-leidenb-app. Valmistuttua odottaa lippua
   `simu-kaikki204.nyt` → ajaa Leiden-uusinnan (sk-napautus204b-iphone.txt) + kipin havainnekuvat iPhone+iPad (sk-kippihav204.txt).
2. **ajo-kysyx204.zsh** (loki ajo-kysyx204.log): käännös kysy-hiljaa-204 (17425466c) + natiivi-ui/x-sulku-204, JONOSSA. App → juna204-kysy-app.
   Valmistuttua odottaa lippua `simu-kysyx204.nyt` → Kysy iPhone + iPad (sk-kysyhiljaa204.txt).
Simuvuoro: kun käännös on valmis → JU:lle "VALMIS SIMUUN" → JU:n "SIMU NYT" → `touch <lippu>` → lopuksi "SIMU VAPAA" JU:lle. Ei simua odottaessa.
Jos skripti kuoli: aja sama zsh-skripti uudelleen taustalle (käännös alkaa alusta jonossa).

## 1. TÄNÄÄN 11.51–13.37 TEHDYT (proto /Users/Shared/Claude/proto-3d/Matkakirja-proto, ei originia → ei pushia)
- **Kippikierrokset SK:lle** lähetetty (Kph v13, Lontoo v5, Ateena ateena-v13, Praha praha-v7; 8 kohdetta kukin).
- **Leiden (museo-kamerajohtaja-204)**: 3918f200c a–c (kohdepatsas ensin, VeistosAsento-saapuminen ≤ 4 m, odotus 4 s, kuvat 8 m; testit
  2099/2099) + da9bdd2f9 (kohdepatsas pidetään leikkauksen jälkeen, ettei pureta+ladata perillä). Simu 941acee2 12.43: patsas ladattu mustan alla,
  perillä veistos + jalusta kuvassa (lokit/todistus-leiden204-iphone-20261019-1243/kuvat/n-leiden.png), MUTTA video katkesi kuormassa (load 104)
  ennen saapumista → uusinta = kohta 0.1. PT:lle kerrottu. Ei vielä NS:lle.
- **Kysy 5 → 8** linssiseppa/kysy-8-204 ec1182f4d: PT kuittasi, NS:lle merge-pyyntö lähetetty (on jo juna-haarassa ba0ccc32d).
- **Noston Kysy (omistaja 12.11 + 13.31)** linssiseppa/kysy-hiljaa-204 (kysy-8:n päällä):
  192f657f6 aina hiljaa (syy: PuluChat tervehti 1. avauksella ja paikan vaihtuessa; nyt AvaaHiljaa, tekoälymerkintä jää) + kaikki kysymykset
  vieritykseen; f7f74fd58 rivit ruudun korkeudesta (iPad 8, iPhone pysty 7); PT kuittasi 192f657f6 (NS-kuittaus voimassa, lisäerät mukaan).
  Simu a33f2c44 (f7f74fd58) iPhone+iPad: 3/3 avausta hiljaa, 5/5 Pompejin kysymystä näkyy (ennen 2): kuvaparit
  lokit/kysy204-kuvapari-20261019/kysy-ennen-jalkeen-{iphone,ipad}.png → PT:llä.
  LISÄERÄT (ei vielä simulla, kohta 0.2): fd14a0ea5 yksi ✕ kerrallaan (Sulkunappi.Etusija, NUI hyväksyi pohjaansa), 17425466c puolikkaan noston
  Kysy iPhonella yläreunaan + oikea reuna noston oikeassa reunassa (omistaja 13.31, junan 204 ehto). PT:lle ilmoitettu (viesti jonossa).
  Lopputulos PT:lle: ennen = todistus-kysy204-iphone-20261019-1306/kuvat/K1-kysy.png, jälkeen = kysyx204-ajon K1, kuvatekstit "ennen"/"jälkeen".
- **Kph-kippi havainnekuvat (koopenhamina-kuvat-204)**: 512186145 (v11 k2–k8, myös Tivolin omien perään) + dd52cd391 (v12 + k1-v2 Vapahtajan
  kirkko). Viety ämpäriin (JU 12.41 ja 12.52): opas/kuvat-v11/, opas/kuvat-v12/. Ei vielä simulla (kohta 0.1) → kuvat PT:lle → NS.
- **SK:n kysy-jsonit (d524fdfa0)**: sovelluksessa ei kopiota; kysymykset tulevat workerilta (/opas/kysymykset, Pelikoodari). PT:lle kerrottu.
- **Levy**: _tyo/linssiseppa 7,2 → 1,5 G, worktree proto-linssiseppa-pyramidi poistettu.

## 2. SEURAAVA ERÄ
1. Kohta 0: simut → PT (Leiden-video, havainnekuvat, Kysy ennen/jälkeen) → PT:n kuittauksella NS:lle: museo-kamerajohtaja-204, kysy-hiljaa-204,
   koopenhamina-kuvat-204.
2. Muistiinpano: Leiden-ajossa esilataus aikakatkaisi 4,0 s:ssa vaikka kohdepatsas ladattu → jokin muu (kuvat 8 m / veistokset 4 m) hidas
   kuormassa; katso uusinnan lokista "esilataus valmis".
3. Kamerajohtajan (c)-siirrot VS/KS/PK ennallaan (edellinen luovutus).

## 3. WORKTREET (/Users/Shared/Claude/wt)
proto-linssiseppa-museokamera (museo-kamerajohtaja-204), proto-linssiseppa-kamerajohtaja (kamerajohtaja-204), proto-linssiseppa-kippikuvat
(koopenhamina-kuvat-204), proto-linssiseppa-kysy8 (kysy-hiljaa-204; kysy-8-204 on sen pohja), proto-linssiseppa-kierrokset195 (todistusajo.sh –
älä poista), linssiseppa-tuotantopohja-linssi (PR #4771). Appit _tyo/linssiseppa: juna204-kamera-app (Kysyn ennen-vertailu a66d91d0),
juna204-kysy-app, juna204-leidenb-app (käännöksissä). Peking361* jätetty (Peking tauolla).
tools/gpu-vapaa.sh ja .claude/settings.local.json* eivät ole minun.

## ALOITUSVIESTI SEURAAJALLE
Olet Linssiseppä (Opus, high). Lue CLAUDE.md ja tämä luovutus. ENSIN kohta 0: `ps -ef | grep "ajo-kaikki204\|ajo-kysyx204"` – jos skriptit
kuolivat, käynnistä ne uudelleen taustalle; kun KAIKKI204/KYSYX204 VALMIS → JU:lle VALMIS SIMUUN → lippu → tulokset PT:lle (≤ 3 riviä).
