# Pariisin korttelit v2: pelikuvat 11.10.2026 (Linssiseppä 2)

Proto `linssiseppa2/pariisi-korttelit-182` **8decb5018** (juna-182 ddadb8bae + useat leikkausrenkaat/kohde + osoitin uusin-5, vara uusin-4),
käännös 0974a6026 (linja 2), simu A26BC7D0 12.05–12.21. Paketti v6k17 = v6k16 + LR:n pariisi-korttelit-v2 KTX2:na
(`proto-3d/_tyo/linssiseppa2/pariisi-v2/v6k17`, portti 0 virhettä, GPU 21 Mt). Ei viety, ei osoitinta. Testit 1440/1440, Unity 0 virhettä.
Leikkaus toimii: lokissa 9 aluetta (palais-bourbon 1–4 + muut). Kuvat ylärivi v6k16 (ennen), alarivi v6k17 (jälkeen), sama .app.

## Havainnot
1. **Palais Bourbon: Googlen aineisto EI ole sumennettu** näistä kulmista (650–950 m ja portikko 130–160 m), ja se on selvästi parempi
   kuin malli (bourbon-google-vs-malli.jpg, lahi k2/k3). Malli heikentäisi näkymää → ehdotus: palais-bourbon pois paketista.
2. **Banque de France**: sumennus poistuu (iso parannus), mutta pohjoiskärjessä valkoinen kiila (reikä: leikkausalue ilman mallin maata/kattoa),
   julkisivut tummemmat ja vihertävämmät kuin naapurit.
3. **Quai Branly (Palais de l'Alma)**: rakennus hyvä, mutta sisäpiha ja tontti valkoisina (IGN:n maskattu orto maatekstuurissa) ja Googlen
   sumennus jatkuu leikkausrenkaan ulkopuolelle (puutarha rantaan asti) → rengas koko sumennetulle tontille + geneerinen maa (sora/nurmi).
4. **Kaukolaatat (oma, tutkittava)**: v6k17:llä Banquen pohjoispuolen kaukaiset Googlen laatat jäivät karkeiksi venyneiksi möykyiksi
   (banque-kaukolaatat.jpg); v6k16 samasta kulmasta terävä. Joko lataus kesken 20 s:ssa (3 mallia enemmän) tai leikkausmaskin
   rasterikerros (9 polygonia, pieni muisti SSE 2) hidastaa laattojen tarkentumista → pidempi odotus ja muistimittaus ennen vientiä.

## Ehdotus
Ei junaan 182: koodi yksin ei hyödytä (uusin-5 puuttuu → 404 + ämpärin CDN välimuistittaa 404:n, joten osoitinta ei pidä pyytää ennen kuin
uusin-5 on olemassa). Seuraavaksi: LR korjaa 2–3 (ja päättää 1), LS2 tutkii kohdan 4; sitten v6k17 uudelleen + uusi kuvakierros.
Skriptit: `_tyo/linssiseppa2/pariisi-v2/` (sijainnit.py, kaanna-pk2.zsh, arkki-pk2.py), kulmat `skriptit-20261009/pk2(-b)-pariisi.txt`.
