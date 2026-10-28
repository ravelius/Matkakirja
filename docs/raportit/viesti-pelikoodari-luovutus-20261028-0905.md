# Pelikoodari: luovutus 28.10.2026 klo 09.05

Seuraava Pelikoodari jatkaa tästä. Muisti: pelikoodari-tila-20261018-aamu.md (UUSIN). Edellinen luovutus: 610b002cf (-20261028-0200, PR 5396).

## Haara
- Proto `pelikoodari/liikkeet-213` (wt /Users/Shared/Claude/wt/proto-pelikoodari-fpv-211, paikallinen proto-git), pää 7304a15f3.
  tarkista.sh 0 virhettä. EI JUNAAN ennen KK:n kuittausta (KK 09.0x).
- Ketju 6c8977774 → 0a1d84853 (kaapuloki + kaapukamera) → 641239209 (kaapupysays) → 516baee32 (kaapumorfi 0|1) → 6518b083d
  (kaapupysays <leikeaika>, perus 1) → 3b8f421a7 (estemalli <nimi> <url|pois> [vain], estepysays <n> <s>) → 7304a15f3 (hahmovarjostin:
  glTF doubleSided → Cull Off, takapinnan normaali käännetään; QA kaksipuolinen 0|1).

## Tila
- OMISTAJA 07.33 parkourvideo11 (b55d65b5b): "Hyvä suunta, jatka"; lyhyt hyppy 0,3 s jää.
- MARMORIPENKKI (Codex 16c691ac3, glb:t _tyo/pelikoodari/penkki-marmori-20261028/v01|v02, SHA OK): v01 valittu, KK hyväksyi valinnan.
  Vertailu: penkki-marmori-20261028/vertailu/ (KK-penkki-ennen-v01-v02-havainne.png). Video 12 pysty: parkour-20261027/
  parkourvideo12-penkki-v01-3b8f421a7.mp4 (skenaario simu-parkour-penkki.txt, siemen 7, estemalli v01 vain).
- KAAPU (kaavun nosto): pelissä toimii (morfi siisti, samalla kellolla), mutta käsi ei pidä helmaa myöskään Codexin omissa kuvissa →
  Codexin käsikorjaus (0a248af29) ja viittakorjaus (082c66e50) työn alla (Codexin diagnoosi c5108dc70-ketju). Kaapu POIS siihen asti.
- VIITAN REIÄT: Codexin diagnoosin vihje → pelin hahmovarjostin karsi takapinnat (Cull Back), vaikka Puyin materiaali on doubleSided →
  korjaus 7304a15f3. Käännös L1:llä käynnissä 09.0x (kaanna-viitta.zsh, JU:n KÄÄNNÖS NYT; app _tyo/pelikoodari/kaapu-app-7304a15f3).
- Codexin postit kuitattu 0816ca9a1 (penkki ja jump-robe-diagnoosi).

## Seuraavaksi (KK 28.10. 09.0x, kaikki ennen seuraavaa videota)
1. Viitan A/B: `zsh …/parkour-20261027/aja-viitta-kaikki.zsh` (JU:n SIMU NYT; vaaka; k1 = korjaus, k0 = ennen; viitta jump_robe 0,45 s,
   pelikamera/oikea/vasen/edestä) → Sonnet vertaa → KK:lle A/B ja Codexille (vastaus diagnoosin kohtaan 2, 0816ca9a1 lupasi).
2. Penkin päällyslaatta palaa auringossa puhtaan valkoiseksi ilman juonteita (havainne 01: vaalea lämmin harmaa, juonteet näkyvät) →
   sävy/valotus alas (VS:n kanssa, jos valo; muuten Codexin albedo/materiaali). Pelin maailmavarjostin ei lue COLOR_0:aa.
3. Penkin kaksi turkoosia laattaa (myös vanhassa penkissä): selvitä mitä ne ovat (Codexin malli; ei omistajan pelimerkki?) → pois, jos ei päätetty.
4. Video 12:n viat: kamera pylväiden/räystäiden läpi ~4, 7 ja 20,5 s (regressio v11:een nähden; siemen 7 vs v11:n oletussiemen – vertaa
   ensin samalla siemenellä), perus→viitta-mallin vaihdon poksahdus 22,5 s (esittelyn puolivälissä; häivytys tai vaihto piilossa),
   T-asento maalissa 36–38 s (V4Leike Maalissa → idle, idle on mallissa → syy muualla; tarkista mallinvaihto / Soita maalissa).
   Huom: toinen hyppyeste meni vault_low:lla eikä vault_hand:lla (siemen 7) → skenaarion vault_hand-oletus PUUTE.
5. Seuraava video VAAKA (omistaja 08.59, Raamattu 9.11): skenaarioissa `ui kierto vaaka`; koko video tarkistettuna (väläykset,
   jähmettymät, läpikulut; Sonnet + ffmpeg freezedetect). Junaan penkin kanssa, kun video puhdas ja KK kuitannut.

## Jatko keskeytyksestä (Mac-uudelleenkäynnistys)
- Pitkiä taustaajoja ei ole. Käännös: `zsh /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/parkour-20261027/kaanna-viitta.zsh`
  (vain JU:n KÄÄNNÖS NYT -vuorolla), simu: `aja-viitta-kaikki.zsh` (SIMU NYT). Kaikki ajot alusta, ei osittaista tilaa.

## Opit
- Jäädytä leikeajasta, ei painon huipusta (0,28 s oli ennen käden pitoa). `kaapupysays <s>` + `estepysays <n> <s>` + siemen → toistettavat parit.
- todistusajo ilman `--nyt` hylkää ajon, jos toinen simu on käynnissä, vaikka JU antoi SIMU NYT → lisää `--nyt` vain NYT-vuorolla.
- Videon rajaus: ffmpeg freezedetect (lataus/maali paikallaan) → -ss/-to, 960×1280 (vaaka 1280×960), crf 23.
