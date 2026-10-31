# Julkaisija: luovutus 31.10.2026 klo 22.05 (viikkokäyttö 90 %, PT)

Rooli: Julkaisija (JU) – viennit ämpäriin, PR-merget PT:n käskystä, käännös- ja simuvuorot, TF omistajan päätöksellä.
Työkalut: /Users/Shared/Claude/julkaisija-tyokalut/ (vie-paketti.sh, tyhjenna-reuna.mjs, vie-57xx.zsh-putket, lukkovahti.zsh).

## Tila nyt
- Juna 216 (TF + web) EI lukittu. Omistaja 13.27: julkaisu, kun karttatyöt ja valo valmiit; lukitusmerkin antaa PT.
- TF 215 ulkoisilla testaajilla (iOS + Mac), 214 vanhennettu.
- Kesken ei ole yhtään vientiä eikä JU:n käännöstä. L1 ja L2 vapaat 22.05; NUI:lla simuvuoro (museo fb8391171, 12 min) annettu, ilmoittaa sammutuksesta.
- Lukkovahti käynnissä (taustatyö), valovahdin taukolippu /tmp/matkakirja-valovahti-tauko paikallaan (PT 31.10.: vahti ajaa Unityä vain PT:n luvalla).

## Tänään viety (kaikki tiedosto tiedostolta tarkistettu ämpäristä)
- LAV: v98c, v99, v100, osasarja-v2…v6, leivonta-v3 (rakennukset-v88, muurikate-v32, tausta-v86), tausta-v87, tausta-v89.
- PK: palatsi-esto-v20/v22/v23, lahipuut-v12, kk-pohja-v1d-pk7-qa, pk8.
- Omat mallit v6k28 ja v6k29; uusin-5.json → v6k29 (vain juna 216). uusin-4 (v6k26) ja uusin-3 (v6h3) koskematta.
- Web-PR:t mergetty + julkaisu + vie-sisalto: 5699, 5701, 5702, 5704, 5690, 5716, 5708 (958 kuvaa), 5720, 5727 (KS:n karttalista valmis).
- Miniatyyrien reunavälimuisti tyhjennetty (421 + 14).

## Opit (tärkeät)
- pk7-tapaus: julkaistu TF voi viitata polkuun ennen kuin sisältö on olemassa. Ennen vientiä: grep TF 214 (proto 7162bc1b8) ja 215 (c0b59f6b0) uudesta kansionimestä; osoittimia (uusin-4/-3) ei kosketa ilman PT:tä.
- vie-paketti.sh ei ylikirjoita: muuttunut sisältö vanhalla kansionimellä → ei viedä, uusi nimi LAV:lta (v98).
- Alikansioissa ei .md- eikä SHA256SUMS-tiedostoja; LAHTEET.md:ssä sana "lisenssi".
- KS:n pinotut PR:t: squash-merge rikkoo pinon → kohde mainiksi + KS yhdistää mainin. Luonnos-PR: gh pr ready ennen mergeä.
- Vie-assetit ENNEN mergeä (muuten kuvat 404), --match-head-commit kuitattuun kärkeen.

## Avoinna
- Juna 216: lukitus + TF vasta PT:n merkillä (muistiajo-216.txt tarvitaan tf-kaynnista.sh:lle).
- KS piirros-pariisi-216 00b0ac3ac käännetty (app _tyo/karttaseppa/piirros-pariisi-216-00b0ac3ac-app), kuvat KS:llä.
