# Valosepän luovutus 27.10.2026 klo 15.55 (juoksupeli, KK johtaa)

Lue ensin: tämä, sitten loki `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md` (rivit 27.10. 10.57 →).
Worktree `/Users/Shared/Claude/wt/proto-linssiseppa2-p11`, haara `linssiseppa2/seinat-211` (natiivi-backup), kärki 31601c9e7
(= juna 212 ad9759bc6 + 17168ea22). Esikatselut vain linjalla 2: worktreen `tyokalut/esikatselu.sh` (PROTO_LINJA=2 oletus);
tarkista `ajo.log`:sta "Matkakirja 3D esikatselu 2".

## Linjaukset tänään (sitovat)
- OMISTAJAN PÄÄTÖS 10.56: valo pois, ensin rakennukset ja elementit havainteen mukaisiksi. Leivonta ja tarkistin (tarkista_leivonta.py) seis.
- KK: PINNAT kuuluvat VS:lle (kattojen väri ja tiilikuvio, räystäsmaalaus, ovet, ikkunat, seinät, kivet), MUOTO LR:lle. Codex-tilaukset PK:n kautta.
- OMISTAJA 13.48: kivetyksen kiilto (pinnan ominaisuutena) + kohtaan kuvattu ympäristöheijastus; Unity 7 -valmius = fysikaaliset arvot.
- PT periaate 3–4: valmiit pinnat suoraan avoimeen junaan (lukitus/TF vain pyynnöstä).

## Valmista ja junassa 212 (NS merge ad9759bc6, testit vihreät)
- Vertailuvalo oletuksena (ValoKohteet.JuoksuVertailuValo; QA `valo vertailu 0` = leivottu valo varjoineen).
- Katteen sävy 0,95/0,90/1,40, lattian kivi 0,95/0,88/0,82, avointen lasitiilikatot laji 13.
- Kivetyksen kiilto 3 / karheus 0,4 (_JuoksuLaattaKiilto) + ympäristöheijastus (JuoksuV4Maailma.Heijastus.cs, ReflectionProbe 12 m välein;
  LT iPad: p50 16,68 molemmilla, ei kuormaa). QA: `valo savy kate|rappaus|laatta r g b`, `valo laattakiilto k r`, `valo heijastus 0|1`.

## Kesken (seuraava Valoseppä)
1. **17168ea22 (seinat-211, EI vielä junassa):** friisien väreily (glTF-kuvat aniso 8 + mipMapBias 0,4) ja reunuskivi kivijalan kiveksi
   (V4_kivireunus → 11, lattiaksi vain y < 0,05). Pysäytyskuvassa friisi terävä (`_tyo/linssiseppa2/friisi-vareily-vanha-uusi.png`).
   PT 15.5x: liikevideo SIMULAATTORISTA iPadin resoluutiolla kuten PK:n juoksuvideo (`_tyo/pelikoodari/simu-juoksu-v1/sk-juoksu-v1-ipad.txt`),
   simu- ja käännösvuoro JU:lta. Reitit: kujat 01 (−135,6; 350), 02 (−246,4; 318) ja aukio puu+portti (omistajan kuva
   `docs/raportit/kaappaukset/omistaja-20261027/boordit-reunakivi-1543-*.webp`, matka ~829 m). Vertaa 31601c9e7 vs ad9759bc6, katso ruuduittain,
   video KK:lle → merge-pyyntö NS:lle (Natiiviseppä local_0f7f169f-…).
   LT ajaa iPadilla jäädytetyn kuvaparimittarin samoista kohdista (PT); odota sen tulos.
2. **Parit juuri-v77m:llä** (ajo käynnissä 15.5x, `scratchpad … aja-v77m.zsh` → `havainne-editori-*`): LR:n reunakivet jo V4_kivireunusta.
   Katso, että reunus näyttää kivijalan kiveltä; jos ei, koordinaatit LR:lle.
3. LR:llä: taustapalojen V4_konsoli turkoosiksi, LOD1/2 räystäiden siniset laatat, muurien korkeus (muoto). Aja parit kun ilmoittaa.
4. C2-kaiteiden kivisävy, kun LR on sovittanut ne (PT).
5. Juhlasali 04: URP-ruutuheijastus kokeena vuorollaan (KK; uusi tekniikka → iPad-mittaus sallittu).

## Päätetty ja kuitattu (ei avata)
- Codex 1066 kattomateriaali: ei peliin (proseduraalinen kate riittää), kuitattu Codexille 834127af9.
- 1070 ristikko-ovi: avointen huoneiden ovet ennallaan; 1069 korvaa kultaiset päätylaatat; 1058 muurifriisi kujiin; friisit-v2-sauma tasoitettu.
- Aurinkoehdotus 345°/30° + varjo 0,45 / aurinko:taivas 3:1 kirjattu KK:lle valon uudelleenmiettimistä varten (ei nyt).

## Huomiot
- Editorin jäädytetty kamera (`valo jaady 1`) ei liiku `sijoita`-askelilla → väreilyä ei voi mitata editorikuvista.
- Viestiraja: kun SendMessage pysähtyy, käytä mcp__ccd_session_mgmt__send_message session-id:llä.
- KK:lle ≤ 3 riviä, PT:lle ≤ 3 riviä.
