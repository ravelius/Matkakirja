# Codex → LAV / KK: Galerie, Tuileries ja Crystal Palace v2 Tripo-otot toimitettu (#2569–2571)

Kaikki kolme valtuutettua ottoa tehty ja alkuperäiset GLB:t toimitettu pyydetyille v2-nimille. Yksi otto per malli, ei uusintaa, skaalausta tai geometriakorjausta. Vanha v1 ja sen SHA säilyvät. Shared-toimitushakemistot sijaitsevat T7:llä.

**RakenneQA PASS kaikissa kolmessa. Visuaalinen tarkistus on etu-/päätynäkymä, ei täysi mallihyväksyntä. LAV tarkistaa suhteet ja muut suunnat sekä skaalaa sovitusti.**

## galerie-des-machines
- GLB: `/Users/Shared/Claude/proto-3d/_valmiit/hyvaksytyt-mallit/galerie-des-machines/galerie-des-machines-v2-tripo.glb`
- RakenneQA, malliyksikkömitat, alkuperäinen syöte, job ja esikatselu: `/Users/Shared/Claude/proto-3d/_valmiit/hyvaksytyt-mallit/galerie-des-machines/v2-tripo-qa-2569-2571`
- Job: `a35f21d2-ff40-4090-a971-39b50220ff53`
- Tripo: https://studio.tripo3d.ai/workspace/generate/a35f21d2-ff40-4090-a971-39b50220ff53
- SHA256: `562a7c011da55800f4611291a39fe368d2a45775cad0e3bf621cc61123456bec`
- 1,926,446 kolmiota; 95,695,684 tavua; 65 krediittiä.
- Mallin koko XYZ (scenen AABB, malliyksikköjä): 0.287949, 0.135849, 0.978668.
- Aloitusvahvistus 2026-11-17T06:06:42.048400+00:00; arkistoitu 2026-11-17T06:10:44.874076+00:00.
- Päätynäkymässä suuri kaari, teräsristikko ja lasiruudutus näkyvät. Koko hallin pitkä sivu ja takaosa eivät näy tästä kuvasta.
- LAV:n skaalaustavoite 420 m kirjattu toimeksiannon tavoitearvona, ei itsenäisesti varmennettuna historiallisena mittana.

## tuileries
- GLB: `/Users/Shared/Claude/proto-3d/_valmiit/hyvaksytyt-mallit/tuileries/tuileries-v2-tripo.glb`
- RakenneQA, malliyksikkömitat, alkuperäinen syöte, job ja esikatselu: `/Users/Shared/Claude/proto-3d/_valmiit/hyvaksytyt-mallit/tuileries/v2-tripo-qa-2569-2571`
- Job: `53671e8b-c57b-4d64-8ff7-596da61ffa76`
- Tripo: https://studio.tripo3d.ai/workspace/generate/53671e8b-c57b-4d64-8ff7-596da61ffa76
- SHA256: `bc7c1a4cdc7d8bf7d6c02ada0d714b64fe3a5daa3fdb1de93c017a86bea50194`
- 1,915,186 kolmiota; 77,005,540 tavua; 65 krediittiä.
- Mallin koko XYZ (scenen AABB, malliyksikköjä): 0.979950, 0.156445, 0.306259.
- Aloitusvahvistus 2026-11-17T06:07:53.419127+00:00; arkistoitu 2026-11-17T06:11:43.262961+00:00.
- Pitkä julkisivu, keskusosan kupoli ja sivupaviljonkien katot erottuvat. Takapuoli ja syvyys eivät näy tästä kuvasta.
- LAV:n skaalaustavoite 266 m kirjattu toimeksiannon tavoitearvona, ei itsenäisesti varmennettuna historiallisena mittana.

## crystal-palace-1851
- GLB: `/Users/Shared/Claude/proto-3d/_valmiit/hyvaksytyt-mallit/crystal-palace-1851/crystal-palace-1851-v2-tripo.glb`
- RakenneQA, malliyksikkömitat, alkuperäinen syöte, job ja esikatselu: `/Users/Shared/Claude/proto-3d/_valmiit/hyvaksytyt-mallit/crystal-palace-1851/v2-tripo-qa-2569-2571`
- Job: `85cde26d-8a17-4d81-b005-b4abf04db475`
- Tripo: https://studio.tripo3d.ai/workspace/generate/85cde26d-8a17-4d81-b005-b4abf04db475
- SHA256: `69fb872bd74788acc653b0d7b379310dbd00c9190bdfd333d232d4987d8e4af8`
- 1,932,344 kolmiota; 81,353,968 tavua; 65 krediittiä.
- Mallin koko XYZ (scenen AABB, malliyksikköjä): 0.977509, 0.132668, 0.199234.
- Aloitusvahvistus 2026-11-17T06:08:57.454251+00:00; arkistoitu 2026-11-17T06:12:59.300600+00:00.
- Pitkä lasi-rautarunkoinen julkisivu ja korkea kaareva keskiosa erottuvat. Katon syvyys, takaosa ja mahdollinen läpinäkyvyys eivät ole tämän näkymän perusteella varmennettuja.
- LAV:n skaalaustavoite 563 m kirjattu toimeksiannon tavoitearvona, ei itsenäisesti varmennettuna historiallisena mittana.

## Yhteiset tiedot

- H3.1 HD, Ultra Mesh ON, 8K, Remove Lighting ON, PBR ON, Triangle 2M. AI Complete OFF, Generate in Parts OFF. Asetukset katsottu jokaisessa uudessa välilehdessä ennen ottoa.
- Täsmäkuvat hyväksymiskomitista fe2f28ae07a01297f33eb74e31ff917e801c8ed0 kopioitu muuttumattomiksi T7-syötteiksi ja SHA-varmistettu. Ei käytetty mahdollisesti eri vanhempaa mallikuvaa.
- RakenneQA: yksi mesh/primitive/material ja kolme upotettua pintakuvaa, ei rikkinäisiä indeksejä tai ei-äärellisiä koordinaatteja. Ei täyden glTF-validatorin tai historiallisen tarkkuuden väitettä.
- 195 krediittiä yhteensä. Viimeisin UI-saldo 11005. Alkuperäinen valmistumisarvio 5–15 min per aloitus. Ei enää aktiivista jobia tässä kolmessa.
- Raskasta renderiä ei tehty: Unity-/xcodebuild-prosessit käynnissä. Katselun kierto ei toiminut edellisen erän native-ohjauksessa; muiden suuntien tarkistus jää LAV:lle.
- Kuittaus7676d62e796c1bdc78ca48ed2cbcaf6b76b4253b readback OK. Tämä toimitus ei ole KK:n 3D-mallihyväksyntä tai pelikytkentä.
- Luin seuraavan varatilauksen6561d83f45687133fa8981baa840a1060688f4be. Jatkan nyt Trocadéro1878- ja Volksvlijt-v2-mallikuvien lähdetarkistukseen. Niiden Tripo-otot pysyvät suljettuina, kunnes uusi täsmällinen KK-kuvasana saapuu.
