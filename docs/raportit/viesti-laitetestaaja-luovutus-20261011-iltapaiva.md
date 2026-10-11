# Laitetestaaja: luovutus 11.10.2026 iltapäivällä (nollaus, PT:n pyyntö 50 %) + aloitusviesti

## Tila: LEPO, ODOTTAA SIMUVUOROJA
Ei käynnissä olevia ajoja, oma iPad `3622D89D` sammutettu, ei omia worktreitä. Haara `laitetestaaja-savukierros-b13`, kaikki pushattu (kärki `git log -1`). Simu vain Julkaisijan "SIMULAATTORI NYT" -vuorolla (1 simu kerrallaan, `n == 0`; päivällä yksi paikka varattu linnalle), käännöslukkoa ei tarvita. **Viestijarru:** SendMessage pysähtyi 10 viestiin ilman käyttäjän viestiä; varakanavaa (`mcp__ccd_session_mgmt__send_message`) EI käytetty, koska se kiertäisi jarrun. Uusi sessio voi viestiä vapaasti.

## Jonossa (järjestyksessä)
1. **Karttasepän natiivikuva TF 181:llä** (alkulennon pallon lähtövalinta). Ehdot: Julkaisija ilmoittaa #4380 (Aloituskaupungit) mergetyksi ja sisältöosoittimen vaihtuneeksi + SIMULAATTORI NYT. **Odotus (omistaja 11.5x): Lontoo + KOLME kohdetta: Ateena, Pariisi, Tukholma** (Istanbul ja Moskova pois). Tarkista myös peittääkö Lontoon nappula Pariisin nimen. Sisältö tuoreena (puhdas asennus tai sisällön päivitys). Tallenna `proto-3d/_tyo/karttaseppa/aloituskaupungit-20261011/natiivi-aloitusvalinta-181.png`, vertailu samassa kansiossa `web-aloitusvalinta-3-kohdetta.png`; polku + havainto (3 kohdetta: kyllä/ei, nappula peittää: kyllä/ei) Karttasepälle (`local_4bd7c316-55bc-423a-9da1-821fdd123cab`).
2. **Olavinlinnan 8. kierros**, kun Siirtoseppä lähettää korjaukset. PT:n tapa: osat aloituskohdista (`poikki seikkailu aloitus <kohta>` → `Documents/linssi-komento.txt`), botin hyväksymät osat ensin, koko ensikertalaisen läpipeluu vasta kun kaikki osat läpi. Raportti `docs/raportit/laitetestaaja-olavinlinna-kahdeksas-20261011.md` + kuva-arkki + video, PT:lle yksi rivi (haara + commit + läpi/ei läpi), SIMU VAPAA Julkaisijalle.

   **8. kierroksen osajako kahdelle simulle (Siirtoseppä, PT/omistaja 12.5x), rinnakkain:** SIMU A: laituri, sisapihat, kirkkotorni, kappeli, palatsi, ampumakaytava, komero, tyrma. SIMU B: porttikaytava, keittio, tott-kammio, muuriportaat, sali, muurikaytava, harja, pako, paluu. Aja vain botin hyväksymät osat (Siirtoseppä kertoo ne, kun 8. kierroksen käännös on valmis). Kaksi simua vaatii Julkaisijan luvan + toisen UDID:n (päivällä muuten 1 simu kerrallaan); `ajo.env` U/SCRATCH erikseen kummallekin (kaksi scratch-kansiota, kaksi `rec.sh`-tallennetta).

## Tehdyt tänään (kaikki pushattu, haara `laitetestaaja-savukierros-b13`)
Raportit `docs/raportit/laitetestaaja-olavinlinna-{neljas,viides,kuudes,seitsemas}-20261011.md`, arkit `docs/raportit/kuvat/laitetestaaja-olavinlinna-<n>-20261011/kuva-arkki.jpg`; kuvat/lokit/ääni/video `proto-3d/lokit/laitetestaaja-olavinlinna-<n>-20261011/`.
- 4. (v8, 181h): kipinä näkyy, Hälytys-silmukka korjattu; pako vain ajastimella; muunnelma 3 jumi 445 s.
- 5. (v10, 181j): pako omalla liikkeellä 4/5; karmi upottaa kameran; linnaan ei päästy.
- 6. (v11, 181k): linnaan päästiin (portti → pikkupiha → keittiö-alue), keittiö täysin musta, turva 60 s, varoitus 3 s.
- 7. (osat aloituskohdista, `olavinlinna-auto-1011-1009`, 6d5756c0): vain porttikäytävä läpi; muut kamera seinässä/mustaa; kyltit takaisin; NullReferenceException.
- Apurahakuvat TF 181:llä (PT valitsi `maapallo-eurooppa-a` + `kuumailmapallo-pariisi-a`, PR #4397): `proto-3d/_tyo/laitetestaaja/apuraha-kuvat-20261011/`.

## Työkalut ja opit
`docs/raportit/laitetestaaja-pelaaja-tyokalut-20261011/` (ajo.env, alusta.sh, k.sh, puu.py, suunta.py, sheet.py, arkki.py). `$SCRATCH` = `/private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-laitetestaaja/9782cd7b-5284-467d-b73d-071728363381/scratchpad` (väliaikainen; uusi sessio tekee omansa: kopioi työkalut, aseta `SCRATCH`, käännä `.simkosketus` komennolla `clang -framework Foundation -o $SCRATCH/.simkosketus proto-3d/Matkakirja-proto/tyokalut/todistusajo/simkosketus.m`). Lisäksi scratchissa `kavele.sh` (askelkuvat + arkki), `aloita.sh <kohta>` (aloituskohta + odotus), `rec.sh` (simctl recordVideo).
- `ajo.env`: vaihda `APP=`-polku; `sed -i '' 's#^APP=.*#APP=<polku>#' ajo.env`. Simut: `zsh /Users/Shared/Claude/proto-3d/tyokalut/simusarja.sh simctl …` (T7-sarja); `xcrun` ei suoraan, lista booted samalla tavalla.
- Linnassa komennot: `linssi-komento.txt` (`kehittaja 1`, `kaappaa 1500 <nimi>` äänelle, `poikki seikkailu aloitus <kohta>`), `peli-komento.txt` (`aani mykistys`), `ui-komento.txt` (`ui kierto vaaka`; linnan sulkeminen palauttaa pystyyn). Napautukset `k.sh tt <teksti>` / `tv x y`, veto `vv x1 y1 x2 y2 dur` (vaakakoordinaatit 1376×1032). Tatti vasen alakulma `vv 120 900 120 800 2` = eteen; katse = veto oikealla (veto vasemmalle = katse oikealle).
- **recordVideo rikkoutuu yli ~2,5 Gt** (rikkoutui 33 min ajossa; video vain 16 min): pidä ajot < 20 min per tallenne tai käynnistä uusi `rec.sh` ja katkaise SIGINT:llä väliajoin. Pakkaus taustalla `perl -MPOSIX -e 'setsid(); exec @ARGV' ./enc.sh` + `nice`.
- Ääni: `kaappaa 1500` kirjoittaa Unity-wavin vasta lopussa (älä sammuta simua kesken; odota `v<nimi>.wav` > 100 Mt); analyysi `ffmpeg … -ac 1 -ar 8000 -f f32le` RMS 10 s. Latausruudun aikana kuormassa −inf/−48 dB (ei peliä).
- Kone voi olla kuormassa (load 100–260): linnan avaus 200–350 s, appi putosi kerran SpringBoardiin → `alusta.sh` uudelleen.
- Sudenkuopat: ei ketjutettua `sleep`: käytä `python3 -c 'import time; time.sleep(n)'`; ei `zsh -c`/eval; `mcp__Claude_Code_iOS_Simulator__control` ei näe T7-sarjan simua (käytä k.sh/simkosketus); ei pinch-työkalua.

## Kanavat
PT `local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc`; Julkaisija `local_1325b8e8-c39c-49f0-9ba2-7cabd4f44629`; Karttaseppä `local_4bd7c316-55bc-423a-9da1-821fdd123cab`; viesti vain valmis erä/jumi/kysymys, ≤ 8 riviä; `ListAgents` jos id vaihtuu.
