# Natiivisepän luovutus 31.10.2026 klo 02.15 (konteksti ~33 %; Postivahti)

Vain voimassa oleva tila. Historia: /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/juna214/jono-214.txt (loppu = uusin).
Id:t: /Users/Shared/Claude/osoitekirja.md. Levy ~110 Gi; laitekäännökset sallittu, yksi Unity kerrallaan (PT).

## TILA
- **Juna 216 runko natiiviseppa/juna-216 = 1c380e352** (6677eaaa6 + PK portaat-a3a5 be1597494), testit VIHREÄT 2217/777/575, peilissä,
  PT:lle ilmoitettu. iPad-äppi lokit/natiiviseppa-app-216-portaat.
- **PT:N YKKÖSVIKA = palatsin jetsam iPadilla** (junan 216 lähtöehto). Kehitysäpin katto 5,12 Gt (ei increased-memory-limit; PT: Apple-muutosta
  EI tehdä, 5,12 = tiukempi mittari). **Tavoite: huippu ≥ 1 Gt alle katon (≤ ~4,1 Gt)**, lista syöjistä koon mukaan + uusi huippu PT:lle.
  Selvitys: /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/muisti216/SELVITYS.md (kohta 5 = P-mittauksen ryhmät), LT-ohje samassa kansiossa.
- Mittaukset (LT, QA-pohja kk-pohja-v1d-pk7-qa, aineisto proto-3d/_tyo/linssiseppa2/varjot-koko/muisti216/):
  P 352012b49 (ei korjauksia): jetsam, fp 5041, tex 2305 (LOD0 500, LOD1 338, LOD2 275, v4 muut 302, valo 149, kartta juoksun aikana ~750).
  K 0e846e433 (kuvajako + valopakkaus): ELOSSA; kuja 02 fp 4494 tex 1370, aukio 03 huippu 4748 → marginaali vain ~0,37 Gt.
  K-kytkinajot (lod0 0, leivottu 0, lähipuut+koristeet 0, peitto 0) LT:llä käynnissä; valopakkaus-ajo meni väärällä komennolla
  (oikea `ui juoksupeli valo valopakkaus 0`, matala prioriteetti).
- **Koehaara natiiviseppa/muisti-216** (wt /Users/Shared/Claude/wt/proto-natiiviseppa-muisti, peili peili/proto/natiiviseppa/muisti-216):
  1c380e352 + NS:n QA `ui juoksupeli muisti <leivottu|kuvat|peitto|lod0|lod1|lahipuut|koristeet> 0|1` + `muisti luettelo`, MuistiTarkka
  T-rivit (varoitus + tex +200 Mt, ryhmät malli+LOD) + PK kuvajako 06ef29f9b + VS valopakkaus (b38810bed = b7b91e20c sisällöltään)
  + PK lod2-purku a045ae1d9 (c41540945; QA `ui juoksupeli palatsi lod2purku 0|1`) + KS juoksu-muisti 9287cb95e (57a04b535; QA `kartta muisti pois`).
  EI junaan (NS:n QA-koodi vain mittaukseen).

## KESKEN
- **Laitekäännös KL 57a04b535** (kaikki 4 säästöä) alkoi 02.08 → lokit/natiiviseppa-app-216-muisti-kartta (~10 min). Jos .app puuttuu nollauksen
  jälkeen (taustaajo voi kuolla nollauksessa), aja: `PROTO_LAITE_KOPIO="/Volumes/T7 4TB/koodaus/proto-natiiviseppa-unity-b7"
  zsh /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/laite-sha.sh 57a04b535 /Users/Shared/Claude/proto-3d/lokit/natiiviseppa-app-216-muisti-kartta`.
  Valmistuttua polku LT:lle (local_ede7e965-…): KL oletus kuja 02 + aukio (huippu, J-ms koska kauko piirtää LOD1:tä, kuvat) on tärkein.
- L c41540945 (lod2-purku) valmis → lokit/natiiviseppa-app-216-muisti-lod2, LT:lle ilmoitettu.
- **Junaan 216 PT:n kuittauksella:** VS valopakkaus-216 b7b91e20c (= kuvajako 06ef29f9b + pakkaus 17a5041aa) KUN VS:n lohkoutumistarkistus
  menee läpi (VS ilmoittaa). LOD2-purku (PK a045ae1d9, b7b91e20c:n päällä) ja kartan muisti (KS 9287cb95e) vasta KL-mittauksen + kuvaparin jälkeen
  (PT:n ehto: säästö + ulkoasu ennallaan, pari kuja 02 + aukio). Huom: a045ae1d9 + oma muistikoodi = ristiriita Palatsi.cs:ssä vain koehaarassa.
- **KS koe D:** koehaara natiiviseppa/ks-fps-d-216 51415e442 (1c380e352 + 57fabae3e, EI junaan), peilissä; käännös PT:n ehdolla vasta
  palatsimuistiajon jälkeen → lokit/natiiviseppa-app-216-ks-fps-d, polku KS:lle.
- KS mittarit3 c895e6940 (A+B+C) käännetty → lokit/natiiviseppa-app-216-ks-mittarit3; PT: A+B+C jäävät koehaaraan.

## JATKOKOMENNOT
- Työtapa: merge --no-ff juna-216:een (wt/proto-natiiviseppa-ehdokas) → push peiliin → testit → SHA PT:lle. Koehaarat: `git merge-tree
  --write-tree` + `commit-tree` ilman checkoutia.
- Testit: `EI_PEILIA=1 nice -n 15 zsh /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/juna210/testit210-rinn.sh <työpuu>`
  (dotnet, ei Unityä; EI käännä Juoksupeliä eikä MuistiTarkkaa → Unity-käännös on ainoa todiste niille).
- Laitekäännös: ks. yllä (laite-sha.sh <sha> <lokikansio>, ~8–10 min, L1-lukko /tmp/matkakirja-kaannospalvelu.lukko).
- Cron Unity-beeta "4 9 * * *" (unity-julkaisut.py) luodaan uudelleen. ÄLÄ poista wt/proto-natiiviseppa-ehdokas, -muisti, -tyokalut eikä T7-kopioita.
