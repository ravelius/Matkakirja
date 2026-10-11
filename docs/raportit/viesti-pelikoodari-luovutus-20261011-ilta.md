# Pelikoodarin luovutus 11.10.2026 ilta (nollaus, PT: konteksti 82 %)

Edellinen: viesti-pelikoodari-luovutus-20261011-iltapaiva.md. Viestit SendMessage nimellä: "PÄÄTOIMITTAJA (Opus, max)",
"Julkaisija (Opus, high)", "Natiiviseppä (Opus, high)", "Natiivi-UI (Opus, high)" (varakanava mcp send_message
local_e9fdc695…), "Linssiseppä 2 (Opus, high)", "Siirtoseppä (Opus, high)", "Karttaseppä (Opus, high)".

## Juna 182 (proto, kaikki juna-182:n päällä)
- KUKKARO pelikoodari/kukkaro-palaute-182 kärki **35025feed** (korvaa aa4509f0e, 764c7eba4, 83921c203). EI VIELÄ KUITATTU:
  PT:n ehto = pilleri saman levyisenä, "1 pv" häivytys, summa keskelle ja suurennus keskeltä pillerin sisään (35025feed).
  Käännös kukkaro+soittosääntö linjalla 2 käynnissä (pid 43884, loki proto-3d/lokit/pelikoodari-kukkaro-kaannos4.log,
  app lokit/pelikoodari-kukkaro-app4). SEURAAVAKSI: KÄÄNNETTY → Julkaisijalta SIMULAATTORI NYT (iPhone 18 Pro 0AC1815C)
  → video + 6 kuvan arkki (vähennys/kasvu × alku/huippu/loppu; mallina lokit/pelikoodari-kukkaro-v2-20261011, komennot
  peli-komento.txt: uusi-peli 5 pariisi, odota-tila Kartta 60, koetila raha 300 / 450) → PT + SHA Natiivisepälle → SIMU VAPAA.
  Samalla SOITTOSÄÄNNÖN simuloki (PT pyysi): Pariisi nopea → hidas kerran → hiljaa → lehti auki/kiinni → hiljaa
  (peli-loki / aani tila). Huom: linjalla 1 on vanha yhdistetty ajo (pid 26820, aa4509f0e + soittosääntö) jonossa; ei tarvita.
- SOITTOSÄÄNTÖ pelikoodari/soittosaanto-182 **5cd83d5f0** KUITATTU (HitaanKerroin 0,7, soinutOma: lehden jälkeen ei uudelleen).
- Pallo 53cc29f22, Olavinlinna b6f15b061, raketti 0202b59bb (Tromssa, 1. lento £500 sitten ilmainen; kuitataan LS2:n
  laukaisun kanssa), linssiaarteet a5df10a0a (ISS pois), soutaja-tekstit ac52e6c86 (Siirtoseppä kytki 38108e9ad).
- Aarreteksti: seikkailu/aloitus-aarre-v1/ viety (NUI kytki). Soutaja: repliikit-soutaja-v2 (kasvot) viety.

## Web
- #4402, #4404, #4406, #4408, #4411 (skeema 1.63 maamerkit.aina, LS2:n raketti) kaikki MERGED.

## Musiikit (omistaja 15.1x–15.5x, lupa generointiin ja määrään)
- Kansio proto-3d/_tyo/musiikit-5plus5-20261011: generoi.mjs (+ --era N, nopeat-taulu.mjs 37 kaupunkia),
  kasittele.zsh (nopea 30 s + häivytys, −11,6 LUFS, alimiter 0,79; hidas −16,3 LUFS, 0,89), peli/ = valmiit mp3:t.
- HYVÄKSYTTY (omistaja): nopeat Lontoo, Rooma, Berliini, Amsterdam; hitaat Tukholma, Berliini, Wien, Amsterdam, Helsinki.
  Wienin nopea uusittu: peli/musa-kaupunki-wien-nopea-lyria-v2.mp3. Uudet 5 hidasta: Madrid, Praha, Budapest, Oslo, Venetsia
  (peli/…-1800-lyria-v1.mp3). Kaikki ääniportti 0 + musiikkiharia 0. EI VIELÄ VIETY.
- 37 NOPEAA: aja-nopeat.zsh pyörii taustalla (erät 1–4, nopeat.log); PT: uusia eriä ei aloiteta ennen nollausta → jos ajo
  on loppunut, käsittele (kasittele.zsh <id>-nopea …) ja tarkista. Estetyt (prohibited_content, ei ääntä): kirjaa
  kehotteet.json:iin <id>-estetty ja muotoile uudelleen ilman kaupungin nimeä (Tukholma/Amsterdam/Venetsia-oppi), esim. Dublin.
- HÄIRIÖTARKISTUS proto-3d/tyokalut/musiikkiharia.py (naksahdus, katko, leikkautuma kanavittain, spektrihyppy > 10σ;
  kalibroitu hyväksyttyjä vasten, kaikki OK). Wienin 1. oton häiriö ei näy mittareissa (ei säröä/katkoa/naksahdusta;
  AST ja stereokorrelaatio normaaleja) → luultavasti musiikillinen; kerrottu PT:lle.
- JATKO (juna 183): vienti (vie-paketti, uudet polut audio/musa-kaupunki-<id>-{nopea,1800}-lyria-v2.mp3 — natiivi
  AaniOsoite.Musiikkiversio vaihtaa -lyria.mp3 → -lyria-v2.mp3, joten vientinimet -lyria-v2!), kytkentä AaniTaulut:
  Jaksot jokaiselle nopean saaneelle (Nopea, TaukoMs 3000), HITAIDEN ARVONTA 10 kappaleen joukosta kaikille kaupungeille
  ilman omaa (Ateena, Pariisi, Lontoo, Rooma, Istanbul, Kairo, Pietari pitävät omansa), joka saapumisella, ei samaa
  kahdesti peräkkäin; soittosääntö (hiljempaa, kerran). Äänisivulle Pelissä-merkein (aanisivulle.py-malli,
  julkaisu zsh julkaisija-tyokalut/aanisivu-julkaise.zsh scratchpadista, EI _valmiit-kansiosta).

## Juna 183 jono
1. Musiikkien vienti + kytkentä + arvonta (yllä).
2. STORTORGET Tukholman kippiin: tools/pollo/worker.js liiku-lista (lukitut kohteet) + esittely-v3c: Q3048023,
   lat 59.32500, lon 18.07072, aukio, koko_m 60, katse_suunta 270, katse_kaari 20 (Karttaseppä; data T7
   _tyo/karttaseppa/kippi-tukholma-20261011/kippi-aukiot-tukholma.json). Sergels torg EI. Kertojan repliikki:
   Sisältökirjuri teksti, ääni vasta PT:n välittämällä omistajan luvalla. LS1 tarkistaa kameran.
3. ISS-RAKETIN ÄÄNET LS2:lle (linssiseppa2/iss-raketti): sytytys+nousujyrinä (silmukka ~20 s), max-Q, irtoaminen
   (pyro + kolahdus), 2. vaihe (sihinä), hiljaisuus avaruudessa; Soundly/Sonniss, ääniportti, vienti, manifesti
   (tunnukset sytytys, maxq, irtoaminen, toinen-vaihe, hiljaisuus) → LS2 kytkee.
4. Maamerkit: LS2:n af64a171b (kierto LateUpdate, aina-rivi LisaaMallissa) hyväksytty katselmoinnissa.

## Orvot kansiot (git irrotettu, poistotyökalu ei enää tunne): wt/pelikoodari-aanisivu-valinnat (516 Mt),
wt/pelikoodari-tyylikirja-raha. Ei käsin poistoa (PT).

## Opit
- Simun kuvakaappaus on liian hidas lyhyille UI-efekteille → recordVideo + kehykset (fps 20), punaisen/vihreän
  pikselimäärästä aikajana (scratchpad puna.py -malli). recordVideo lopetetaan SIGINT:llä simctl-pid:lle (ei zsh-isälle).
- ffmpeg ilman drawtextia: kuva-arkki ilman tekstejä, järjestys raporttiin.
- Lyria estää satunnaisesti kaupunkinimiä (Stockholm, Amsterdam, Venice, Dublin): muotoile "A Dutch city …".
- Lyria ei noudata "About 30 seconds" (~63 s) → rajaus 30 s + häivytys käsittelyssä.
