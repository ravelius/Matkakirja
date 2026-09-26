# Pelikoodarin luovutus 27.9.2026 klo 01.3x (konteksti 93 %, Fablen käsky)

Jatkoa luovutukselle `viesti-pelikoodari-luovutus-20260926-b.md`. Kaikki alla oleva on pushattu.

## 1. AVAUSKORTTI + KUTSUMINIATYYRI + LEHTIUUDISTUS — PR #3364 (v2291), odottaa kuvaparin kuittausta
Haara `pelikoodari-kaupunkikortti` (worktree /Users/Shared/Claude/wt/pelikoodari-kaupunkikortti), 5 commitia, pushattu.
Tehty:
- Kaupungin napautus avaa avauskortin (`js/kaupunkinosto.js avaaAvauskortti`, `latoAvauskortti`), liuska kytkimen
  `js/pallolauta/lauta.js KAUPUNKILIUSKA = false` takana.
- Kortin kartta ilman tekstejä: `piirraKaupunkiKartta(..., { pelkkaKartta: true })` (js/nahtavyydet.js).
- Kartan suurennos kortista: `avaaKarttaSuurennos(..., { kortista: true })` → body + oma huntu (blur), vaalea
  (css/kaupunkinosto.css `.kartta-suurennos-kortista`).
- Kutsuminiatyyri: `lauta.js paivitaKaupunkikortinKutsu` (merkkiryhmä `kaupunkikortinkutsu`, renkaittain haettu paikka,
  väistää nostot/muste/kalusteet/nappula, piiloon karttakerroin < 0,95); FLIP-kasvu 280 ms ja paluu (`kutsunMuunnos`,
  `suljeKaupunkipopup`); CSS css/styles.css `.kaupunkikortin-kutsu`.
- Lehden osiohakemisto `js/lehtiosiot.js` (osiohakemisto + piirraOsiohakemisto), kytketty `js/lehti.js`
  etusivulle; nostorivit `nostot.kaupunginNostoRivit(cityId)`; turisti-info ja radio (RADIO_KAUPUNKILEHDESSA=false) pois.
- Savuke `tools/savukkeet/savuke-avauskortti.mjs` (#390, #834 PR-porttiin, 16/16 kummallakin); pariisi-lahizoomin
  liuska-lohko ja 8o–8q sekä savuke-kaupunkipopup ohittavat itsensä (LIUSKA_KAYTOSSA). tests/avauskortti.test.mjs.
- npm test 4415/4415, niputus ok. Kuvat: proto-3d/lokit/kaupunkikortti-web/kuvasarja-*.png, kutsu-kasvaa-pariisi-iphone.mp4.
PUUTTUU (omistajan päätökset kortilla 00.1x ja 00.2x):
1. **Kartan korkeus 35 % sekä iPhonessa että iPadissa** — nyt kartta on omassa kuvasuhteessaan (css/kaupunkinosto.css
   `.avauskortti-kartta .kartta-kehys`). Kiinteä korkeus vaatii, että kehyksen sisältö (kotelo + piirrokset %-asemoinnilla)
   täyttää sen: joko `aspect-ratio`-rajaus kotelolle + `object-fit: cover` JA piirrosten asemointi samaan rajaukseen,
   tai kotelon skaalaus/keskitys (kehys overflow hidden, kotelo leveys = max(kehys, korkeus × suhde)). Ensimmäinen
   kokeilu (pelkkä height) jätti tyhjän kaistan yläreunaan.
2. **Kuvapariin kulma + versio suoraan kuvaan** (Raamattu-PR #3361): tekstit PNG:hen (esim. "Pariisi · iPhone ·
   kortti"). Aja `savuke-avauskortti.mjs <kansio>` ja lisää tekstit PIL:llä ennen Fablelle lähettämistä.
3. Fable kysyi: kuuluvatko saapumisen traileri ja 1873-postikortit sääntöön "ei mitään automaattisesti" — vastaus puuttuu.

## 2. xAI GROK TTS (ÄÄNI ARA) STRIIMILUENTAAN — omistajan päätös 00.3x/01.2x, EI ALOITETTU
Suunnitelma:
- Reitti: `tools/pollo/worker.js` (worker `matkakirja-pollo`) — nykyinen puhe `PUHE_MALLI_OLETUS = 'gpt-4o-mini-tts'`
  (worker.js:93, persoonat :108–130, kutsu ~:1022). Lisää xAI-haara: REST `POST https://api.x.ai/v1/tts`
  (tai `wss://api.x.ai/v1/tts`), kentät `text`, `voice_id: 'ara'`, `language: 'fi'` (varalla `'auto'`),
  `output_format` mp3 24 kHz, `optimize_streaming_latency: 1`. Vastaus striimataan eteenpäin kuten nyt.
- Kytkin: `env.PUHE_XAI` (oletus 1) + pyyntökohtainen `?xai=0|1` A/B:hen. Varapolku: xAI:n virhe tai aikakatkaisu
  (esim. 4 s ensimmäiseen tavuun) → nykyinen gpt-4o-mini-tts. Esigeneroidut eleven_v3-äänet ennallaan.
- Avain: `XAI_API_KEY` Macin ympäristössä (viite: ~/.matkakirja-avaimet-koodaus.zsh; lataa `zsh -lc`). Workerille
  `wrangler secret put XAI_API_KEY` (tools/pollo/wrangler.jsonc) ja GitHubin secretsiin — EI repoon, EI lokiin.
- Mittaa ttfb suomeksi tuotannosta; natiivi (Natiiviseppä/Natiivi-UI) käyttää samaa worker-reittiä.
- Mittaustulokset (#3347 + Fablen xAI-ajo): ElevenLabs Flash v2.5 0,19–0,26 s, v3-striimi 0,5–0,7 s, 4o-mini-tts
  0,5–1,3 s; xAI REST eve/ara/aurora ttfb 0,16–0,39 s, koko lause 1,3–1,9 s. Fablen xAI-näytteet on vielä vietävä
  ämpäriin `audio/vertailu/puhe-striimi-20260926/xai-*.mp3` ja rivi raporttiin docs/raportit/puhe-striimivertailu-20260926.md.
- Oma xai-kokeiluskripti: scratchpad `puhe/xai.mjs` (WebSocket; Noden WebSocket ei välittänyt Authorization-otsaketta —
  käytä RESTiä tai `ws`-pakettia).

## 3. LÖYDÖS 177 (Uusi peli -tyhjennys) — MERGETTY JUNAAN
Natiiviseppä mergesi `pelikoodari/uusi-peli-177` 2769b6a8 + `natiivi-ui/uusi-peli-177-ui` 1efa214e → juna/b13 d211337c.
AVOIN: Natiiviseppä pyysi lisäämään säilytettävät kehitysavaimet `PeliOhjain.SailyvatAsetukset`iin (uusi commit samaan
tai uuteen haaraan, sitten merge-pyyntö): `matkakirja-saapumisvartija` (Saapumisvartija.LippuAvain),
`matkakirja-liike-120` (Ruudunpaivitys.Liike120Avain), `matkakirja-yksi-portti` (LaattaPortit.YksiPorttiAvain),
`matkakirja-saapumislaatat` (GetInt), `matkakirja-aihemerkit` (NostotKartalla, SetInt). Tarkista kunkin laji (s/i/f)
Get/Set-kutsuista juna/b13:ssa ennen lisäystä. (`matkakirja-valmius-kevennys-pois` on jo listalla.)

## 4. Muut tämän session työt (valmiit)
- #3274 (löydös 135), #3339 (build-questions qa-*.json), #3342 (174b kuvamerkit), #3347 (striimivertailu), #3353 (178)
  mainissa. #3357 (Pulun esigenerointisuunnitelma, docs) — omistaja 00.5x: EI putkea vielä.
- #3323 (maanosa-kaupungit) yhä auki Julkaisijan jonossa; worktree pelikoodari-maanosa-kaupungit poistetaan mergen jälkeen.
- Worktreet: pelikoodari-kaupunkikortti (#3364), pelikoodari-maanosa-kaupungit (#3323), pelikoodari-pulu-esigenerointi (#3357);
  proto: /Users/Shared/Claude/wt/proto-pelikoodari-uusipeli (177).

## 5. Opit
- Preview-selain (Claude Browser) näyttää vanhaa koodia service workerin vuoksi ja ämpäri estää localhostin: todenna
  Playwrightilla (`serviceWorkers: 'block'` + ämpärin route-välitys, kuten savuke-avauskortti.mjs).
- Headless-Chromiumissa sivun ajastimet kuristuvat raskaasti pallon kanssa (50 ms → sekunteja): videon animaatiot
  näyttävät hitaammilta kuin laitteella.
- BSD-sed ei tue `\b`:tä — käytä perliä.
- Uudet ylätason nimet eri moduuleissa: aja `node tools/tarkista-niputus.mjs` (törmäys `liikeVahennetty`).
