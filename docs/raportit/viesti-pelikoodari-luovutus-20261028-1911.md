# Pelikoodari: luovutus 28.10.2026 klo 19.11

Seuraava Pelikoodari jatkaa tästä. Muisti: pelikoodari-tila-20261018-aamu.md (UUSIN). Edellinen luovutus -20261028-1009 (PR 5424).

## Tila
- KAAPU (käsipito v3, Codex robe-handhold-review-v3): JUNASSA 213 (NS ca099a266; haara pelikoodari/kaapu-213 9b7a7f8f5), ämpäri juoksupeli/hahmot-v5.
- LIITO #1222 (Codex glide-wings-review-v1, KK 18.5x + OMISTAJA 18.57 "Liito Ok"): proto pelikoodari/liito-213 d5ec0c2f4 = juna-213 ca099a266 +
  1 commit (hahmot-v6-juuri, glide_enter/loop/exit 2× + land_soft, ohitetun vartijan väistö). L1 + simu vihreä (lokit/todistus-liito213-d5ec0c2f4-20261028-1857).
  hahmot-v6 ämpärissä (JU 18.50). MERGE-PYYNTÖ NS:lle 19.1x: VAIN d5ec0c2f4 (PT: ennen KS:n porrastusparin 5 OK:ta, ei TF 213:n kustannuksella; muuten seuraava juna).
  → Tarkista NS:n vastaus; jos ei ehtinyt, uudelleen seuraavaan junaan.
- Proto-worktree /Users/Shared/Claude/wt/proto-pelikoodari-kaapu-213 (haarat kaapu-213, liito-213, vartija-213). Kehityshaara liikkeet-213
  (wt proto-pelikoodari-fpv-211, 6556d0e97) – drone, leikeloki, parkour, penkki EIVÄT ole junassa.

## Avoin: vartija lähemmäs (OMISTAJAN PÄÄTÖS 18.57 "Vartijan pitää vain olla lähempänä jotta puyi onnistuu lentämään vartijan yli")
- 18a9aed4b (liito-213:n kärki): JuoksuV4Reitti.Vartijat (Peli/Juoksupeli/JuoksuV4.cs:194) liito-osan kohta 0,6 → 0,3. Peli 761/761, tarkista 0, simu vihreä
  (todistus-liito213-18a9aed4b-20261028-1905). MUTTA videolla ero pieni: vartija kävelee yhä alastulon kohdalle ja on ~0,3 s Puyin edessä
  (pari kaapu-kk-20261028/liito-vartija/pari.png, ennen.mp4/jalkeen.mp4; KK:lle kerrottu).
- Seuraavaksi: selvitä vartijan liike liidon aikana (JuoksuV4Maailma.PaivitaVartijat: Tulossa/Varoitus MoveTowards KontaktiZ:aan 4 m/s, luonti
  KontaktiZ + 2,5 m; JuoksuV4.cs VartijaAskel "liito yli" → Ohitettu → väistö 1,8 m). Tavoite: vartija seisoo liidon alla hyppypaikan lähellä
  (Puyi selvästi yli) eikä kävele alastuloon. Lisää tarvittaessa lokirivi vartijan paikasta liidon aikana. Video samasta hypystä (siemen 7) KK:lle.
- vartija-213 dd94f2f9b (häivytys kameran ja Puyin välissä + idle) = KK:n aiempi ehdotus, omistajan päätös korvasi → ei jatketa.

## Codex
- Postit kuitattu: käsipito v3 0f6ece159, liito #1222 b74c06eb6 (claude/postilaatikko). Avoimia Codex-tilauksia ei.

## Skriptit (/Users/Shared/Claude/proto-3d/_tyo/pelikoodari/parkour-20261027/)
- kaanna-liito213-18a9aed4b.zsh, aja-liito213-18a9aed4b.zsh (simu-liito213.txt: oletusjuuri, siemen 7, sokkelo 0, vaaka, video 50 s); uusi SHA: sed-kopio.
- Liitoarkki: liito videoajassa ~52–56 s (vaihtelee), rajaus transpose=2,crop=1400:1400:450:500; paikanna fps=4-arkilla ensin.

## Jatko keskeytyksestä (Mac-uudelleenkäynnistys)
- Taustaajoja ei ole käynnissä; L1 ja simu kuitattu vapaiksi. Skriptit ajetaan uudelleen alusta; kuittaa JU:lle L1 VAPAA / SIMU VAPAA.
