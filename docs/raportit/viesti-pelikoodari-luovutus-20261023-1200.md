# Pelikoodarin luovutus 23.10.2026 klo 12.00 (tili vvi@vvi.fi)

Edellinen: viesti-pelikoodari-luovutus-20261020-1825.md (21.10. ilta). Rooli: Pelikoodari (Opus, high). PT pyysi luovutuksen
(konteksti pehmeällä rajalla). main = 10b87422b (+ #5184 auki).

## TEHTY (23.10. 11.25–12.00)

- **Juna 210:** rikottavat-210 **da5883ffb** on NS:n rungossa (natiiviseppa/juna-210 bccb18d32).
- **PR #5059 tuotantoputki** mergetty squashina **10b87422b** (CI vihreä); worktree wt/pelikoodari-tuotantoputki poistettu (Postivahti).
- **Paperilohikäärme v3** (Codex #877): proto **pelikoodari/lohikaarme-v3-210 = 10b2b80dc** (wt/proto-pelikoodari-lohikaarme-v3,
  da5883ffb:n päällä). JuoksuV4Maailma.LataaLohikaarmeet/LohiMalliin: paperi lajin mukaan + naru ämpäristä
  `juoksupeli/maailma-v4/paperilohikaarme-v3/`, paperin keskikohta paikkamerkin levyn kohdalla (−1,4 m, nappauskorkeus ennallaan),
  naru venytetään ripustuspisteeseen, keinunta ±6°/±5°; ladataan vain kun reitillä voi olla lohikäärmeitä (sokkelon taso 1 ilman).
  tarkista.sh 0 virhettä. Ämpärissä (JU 11.31, 4/4). Pelissä näkyy vasta, kun taso 2 palaa (`JuoksuV4Reitti.SokkeloTasoRaja`).
- **Muistokuplat 1, 3, 5–8** (omistaja 11.33): proto **pelikoodari/muistokuplat-210 = 4c7b5351b** (wt/proto-pelikoodari-muistokuplat-210,
  da5883ffb:n päällä): Resources/JuoksuV4/esineet/ sinivalkoinen-maljakko (korvaa erä A:n kuvan), turkoosi-ruukku, teeastiat,
  rubiinilasit, bambusermi, maisemasermi (768×1024, jpg q80). Juoksu-testit 93/93. NS:lle ilmoitettu molemmat haarat junaan 210.
- **Studiojako PR #5184** (PT:n erä): docs/tuotanto/tekotavat/koodi.md (B), reseptit/historiapeli.md + minipeli.md (C).
  Dokumenttitesti 3/3. Raamatun luvun 13 karttaan lisää PT.

## JONO (PT 11.5x)

1. **Kupla 2 (keltainen-maljakko):** kun Codexin v2 tulee (`/Users/Shared/Claude/wt/fable-posti-0945/posti/muistokuplat-kahdeksan-20261021/02-keltainen-maljakko-v2.jpg`
   tai sama kansio PT:n uudessa postissa) → `esineet/keltainen-maljakko.jpg` (sips q80) + .meta uudella guidilla (kopioi
   celadon-kulho.jpg.meta ja vaihda `guid:`-rivi uuteen uuid4().hex-arvoon), haara muistokuplat-210 tai uusi, NS:lle. Siihen asti
   keltainen-maljakko rikkoutuu ilman kuplaa (tekstit on). Kupla 4 (lautaspino) HOLD: ei RikkoMalleissa.
2. **Yläreitti v2** (Codex #876, `proto-3d/_tyo/pelikoodari/codex-noudot-20261021/ylareitti-v2.zip`): v4-maailman (neljä huonetta)
   lisäosa; sokkelo ei lataa v4-osia (`JuoksuV4Reitti.SokkeloKaytossa`) eikä tasoa 2 ole (omistaja 19.10. 23.30). Kytketään, kun
   taso 2 palaa: 5 glb:tä yhteiseen origoon, collision.glb vain törmäykseen, 8 kattosolmua (world-addition.json `roof_node_actions`)
   renderer JA collider pois tasolla 2, reittigraafi 34 solmua / 42 yhteyttä, 3 laskeutumisaluetta, 4 lohikäärmepaikkaa.
   Jos taso 2 tulee sokkeloon, PT:n kanssa ensin: sopiiko lisäosa sokkeloon lainkaan (Codexin uusi tilaus?).
3. **"Juoksupeli täysin valmiiksi"** (asemataulun työlista, 7 kohtaa): 6) musiikki tasoille 2+ = nykyiset (JuoksuMusiikki, tehty);
   5) maali pääportti: Meridiaaniportin maali junassa 209 (81ce7687e) → varmista PT:ltä, onko kohta valmis; 7) Pelit-valikossa:
   omistajan/NUI:n kohta, tarkista tila PT:ltä. Avoimet junaan 210.

## AVOIMET MUUT

- Lukitus 209: PT/NS päättävät a9c5520d8 vs 02f6ab095 (vanha).
- Kartan sarja (lento-wasd, sarja-pysty c19d4a826): ei junaan ennen omistajaa.
- Valoseppä tekee junan 210 käännösnykäykset (#791-reunasiipi, JuoksuPalatsiVerkko.Profiili osan rajalla); en koske.

## OPIT

- Codexin lisäosa voi olla tehty maailmaan, jonka peli on jo korvannut (yläreitti v2 → v4): tarkista ennen kytkentää, mikä maailma
  on pelissä (kirjattu koodi.md:n oppeihin).
- Muistokuplan kuva = `Resources/JuoksuV4/esineet/<id>.jpg`, id = RikkoMallit-tunnus (ei Codexin tiedostonimi: 03 turkoosi-kannellinen-ruukku
  → turkoosi-ruukku, 05 teeastiaryhma → teeastiat, 06 punainen-lasiryhma → rubiinilasit).
