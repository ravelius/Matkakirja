# PT812: Matterhorn ja Kinderdijk — Tripo-mallit ja tekninen tarkistuspaketti

KK:n hyväksymistä kahdesta lähdekuvasta tehtiin yksi Tripo H3.1 -malli kummastakin. Mallit valmistuivat ja molemmat GLB:t on vastaanotettu T7:lle. Ei uusintoja. Colosseumia ei generoitu: korjattu kuva ja uusi KK-hyväksyntä odottavat kuvasessiota.

## Tarkistuspaketti (ei vielä lopullinen karttatoimitus)

- ZIP: /Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/kartta-maamerkit-812-20261021/kartta-maamerkit-812-kaksi-tarkistus-v1.zip
- Koko: 2739352 tavua
- SHA256: 53608e05d2c5a58d0b043761dda01f352b039739ffe2b3a462dc20b6bf12ec82
- Purettu: saman juuren review-v1/
- Vertailukuva todellisista GLB:istä: /Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/kartta-maamerkit-812-20261021/qa/maamerkit-3d-tarkistus.png

| Malli | Kolmiot | GLB-tavut | SHA256 |
|---|---:|---:|---|
| Matterhorn | 1868 / enintään 2000 | 221180 | 2bffe484b1935db6cc2989fc0caedca6f12fd974fb3186efc10d1222fc9b1b6b |
| Kinderdijk | 2637 / enintään 3000 | 343980 | bc39c19cedc12cdc7ef93cd6afdb723be625e96353cf6c76bcc569ac054e6e19 |

Molemmissa yksi opaakki seepiamateriaali, baseColor 512×512 PNG, roughness 1, metallic 0, ei normaalikarttaa, luurankoa eikä animaatiota. Pohjakeskiorigo, +Y ylös. Tripon indeksit ja UV:t säilyvät. Alkuperäiset 2048px-viennit säilyvät models/<id>/raw/tripo-original.glb. Vastaanottajan tarkistin: 5 tiedostoa, 0 virhettä ja 0 huomautusta. Tarkka raportti qa/receiver-gate-v1-final.json. SHA256SUMS, MANIFEST, LAHTEET ja QA mukana ZIPissä.

## Visuaalinen tarkistus ja avoin mittasovitus

Etuvino, sivu ja takavino katsottu. Matterhorn on pelkkä vuori, huippu taipuu ja on vaalea; laivaa/vettä/maapohjaa ei ole. Takasivun väritys ja harjanteet ovat yksinkertaisemmat. Myllyssä neljä siipeä ovat kiinni lakin etuakselissa; kahdeksankulmainen runko säilyy. Myllyn lakin takaosa jatkuu isona tummana pintana; olkitekstuuri on tarkoituksella abstrahoitu. Nämä ovat pienikokoiseen karttavertailuun tehtyjä ehdokkaita, eivät hyväksyttyä lähikuvan arkkitehtuuria.

Lähdeyksiköt on säilytetty: Matterhorn 0,8303 × 0,9807 × 0,8842, mylly 0,8410 × 0,9828 × 0,3825 (X,Y,Z). Nämä EIVÄT ole vahvistettu lopullinen karttaskaala. Korkeussuhde ja pohjoiskääntö viimeistellään PT/PK:n mitoilla (pyyntö ea302491fa1905bf91bf7a31c1280ed0b1d15cfb). R2-avain/toimitusreitti, vastaanottajan integraatio ja omistajan vertailu nykyisten rinnalla ovat vielä avoinna. En merkitse T7-tarkistuspakettia R2-toimitetuksi.

## Tuotantoloki

- Matterhorn job 5366db0c-d5a7-4243-90ff-8be1d4b69942; lähde db55967a56f26e732bc4e367128435b1dc5e91e438813290b22b01d2e882a079; 40 krediittiä.
- Kinderdijk job 55c07a4d-a466-44d4-9bac-47307df428d4; lähde cc7213ac24bfb8529e7468d4b548c90e94d547f10f7998f67fc4eaf25a63d60c; 40 krediittiä.
- Yhteensä 80 krediittiä, saldo 20585 → 20505. Kaksi kolmesta sallitusta mallikutsusta käytetty. Jäljellä vain Colosseum hyväksynnän jälkeen.
- Paikallinen tekninen muunnos + kuusi tarkistusnäkymää: noin 1,1 s, huippumuisti 95,5 Mt. Ei Blenderiä tai raskasta renderöintiä.
