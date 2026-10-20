# Päätoimittajan luovutus 20.10.2026 klo 04.50 (oma nollaus, konteksti 30 %)

PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31. KK local_8e4fcfed-fc40-464c-854a-1d031b005332 (nollautunut yöllä 2× viimeksi 04.30). Id:t /Users/Shared/Claude/osoitekirja.md.
Edellinen: viesti-fable-luovutus-20261020-0100.md (käsitelty). Asemataulu https://claude.ai/artifact/R6VQFTUNq629zSzah719Uy.
VIESTIRAJA: SendMessage pysähtyy 10 viestin jälkeen → käytä suoraan mcp__ccd_session_mgmt__send_message session-id:llä (tässä vuorossa koko yö).
HUOM. Edellinen PT kirjoitti osaan viesteistä kellonajan "05.x", vaikka kello oli 04.xx; luota git-lokin aikoihin.

## 0. HETI ALUSSA
1. Monitorit odottajat-vahti.py ja codex-posti-vahti.sh (30 min, uudelleen).
2. Juna 207 auki, runko NS:llä f63f51757 (vihreä). PT antaa NS:lle OK-rivit muodossa "PT OK 207: <rooli> <sha>" vain KK:n OK:n jälkeen.
3. Ei lukitusta ilman "OMISTAJA PYYSI JULKAISUA".

## 1. Juna 206
LUKITTU 00.57, BUILD 82e263c79. Muistiajo iPad Pro 13 OK (vapaa min 2009 Mt). TF iOS + Mac + sisäinen 01.34, ULKOINEN 01.52 (PT:n lupa LT:n kierroksen jälkeen). Asemataulu 5/5.
LT:n laitekierros: 60 fps, Kiinni-kehote luettava (läpinäkyvä pohja = omistajan sääntö 14.10. 21.42, ei poikkeusta), 0 kaatumista.

## 2. Juna 207: mukana (runko f63f51757, kaikki testit vihreinä)
- Lavastaja kaukomaisema rengas-v8f c35eca1e8 (leijuvat palat pois).
- VS 957ff9eb8 (seinät k4 + katot k5) + 61afdf9c3 (DoF POIS juoksupelistä, KK 02.4x) + pöly 2459aeb85.
- NUI lasihaku b8198b4e3: 2 Hz -nykäys pois (syy Lasipohja.Etsi 0,5 s -ajastin; LT iPad: pitkiä ruutuja 41 → 0–2, p99 33,2 → 16,9 ms). Näkyvä lasi todistettu (KK OK).
- PK a384ac8ef (sokkelon väistöaarteet ~27 % + kääretaulut ~7 %) + R1 k3 740050b1 (sirpaleet + pöly) + kuplan rivitys e60cad5e1.
- LS askeleet-kaiku d88d7f1e9 (KK OK) + Mona Lisa b1d520daf (KK OK, videot 18f06da5 omistajalle aamulla) + NUI museo-valikot 7a45cff6f.
- Raamattu-loki: MUSEON MAALAUKSEN LÄHESTYMINEN (#5019, 01.01).

## 3. Juna 207: odottaa
- NUI ISS-207 (81be0b791 + vartija 17acd9b04 + revontulten katse ≤ 45° 6733e153c + i-nappi 30b0d81e6; yhdistelmä 2f30d1ad7): KK hylkäsi 5bba0fcd:n (revontulet eivät näkyneet), uusi simu → KK → PT OK NS:lle.
- KS karttanostot: kierros 3 KK OK (a659342c); kortin sumeus korjattu a2079a6e8 → kierros 4 JU:lla vain todisteeksi → PT OK NS:lle.
- PK: R0-pöly vahvemmaksi seuraavaan käännökseen (KK: ei estä 207:ää).

## 4. Juna 208 (työn alla)
- Läpijuostavat korttelit: Codexin 713718-paketti sisälsi myös rakennukset ja portaat (Codex fa9c0cfa0). Lavastaja korttelit v3 (_valmiit/juoksupeli-sokkelo-korttelit-v3-vienti-20261020, KK OK, vain punakulta). PK:n logiikka 21f804e1a (pelikoodari/korttelit-208, oletuksena pois: reitit, botti, portaat, katon häivytys, kamera) → kytkentä + simu, kun korttelit.json on tullut.
- VS (luovuttamassa 35 %): (1) _Haivytys JuoksuMaailma.shaderiin katoille PK:lle, (2) vesiuoma veden näköiseksi (KK), (3) DoF iPadilla: syy syvyyskuva puuttui Mobile-putkesta → syva-208 da677242c; LT mittaa vyöhykkeet (vyoero.py) + GPU + muisti ennen paluuta. KK:n ehto: Puyi ja lähi ≥ 95 %.
- Omistajan kysymys "viekö syväterävyys liikaa tehoa?": EI (+0,5–0,65 ms GPU, 60 fps säilyy), mutta 206/207:ssä iPadilla koko kuva sumeni → pois. KK:lla aamun koosteeseen.

## 5. Codex
Postilaatikko: kuitattu ed33e7980 (esteet v2 + mittapalat, järjestys) ja 78dd1d639 (kuitti fa9c0cfa0). Codexin seuraava työ Puyi207-hiha (v10 hylätty sen omissa testeissä). Ei muita avoimia PT:n tilauksia.

## 6. Roolit
Nollattu yöllä: NS, JU, PK, NUI, KK (2×). VS luovuttaa. Levossa tarkoituksella: Työkaluseppä, Projektiseppä, Sisältökirjuri, Äänittäjä (207 valmis; käännösääni jätetty pois KK:n päätöksellä, puu-1 + puu-2 jäävät). Linssiseppä levossa (Mona Lisa valmis).
Opit: (1) silmäarvio terävyydestä ei kelpaa → vyoero.py; (2) agentin heredoc + rm -ketju jäi lupakyselyyn 1,5 h → PT pysäytti vuoron (stop_session) ja ohjasi Edit + skripti tiedostosta + uusi versio ilman poistoja; (3) LT:n laitekierros tarvitsee PT:n kierrosviestin ennen asennusta.
