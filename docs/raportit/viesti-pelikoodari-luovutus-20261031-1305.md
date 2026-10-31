# Pelikoodari: luovutus 31.10.2026 klo 13.05 (konteksti 36 %)

Edellinen: -20261030-2325. Muistin tila: pelikoodari-tila-20261018-aamu.md. Proto-repo /Users/Shared/Claude/proto-3d/Matkakirja-proto.
Juna 216 = natiiviseppa/juna-216 (dda5fae12 + NS:n mergeet). Worktreet: wt/proto-pelikoodari-{v98c,portaat-216,kuvajako-216,lod2-216,fpv-211}.

## Valmista tässä vuorossa (PT kuitannut)
- **Sillan vihreät laatikot (VS:n 6677eaaa6-kuvat):** eivät olleet regressio. pk7 puuttui mediasta, joten peli ajoi sokkelo-varapolkua.
  TF 214/215 viittaavat pk7:ään, eikä oikeaa palatsia ollut ajettu iPadilla 29.10. jälkeen.
- **Meridiaaniportin 1063-portaat 404:** turha haku, koska kaiteet tulevat a3a5:stä. be1597494 on junassa 216 (1c380e352).
- **iPadin palatsijetsam:** analyysi proto-3d/_tyo/pelikoodari/muisti-216/RAPORTTI.md (+ skriptit). Toteutin:
  - kuvajako 06ef29f9b (sama kuva = yksi Texture2D; VS:n valopakkaus päällä b7b91e20c, puu = oma b38810bed)
  - LOD2:n purku a045ae1d9 (QA `palatsi lod2purku 0|1`).
  - NS mittasi: huippu 4,75 → 3,56 Gt, 0 jetsamia, marginaali ~1,5 Gt. Kaikki junassa 216 (dda5fae12).
- **pk7/pk8:** pk7 on PT:n päätöksellä poissa mediasta, jotta TF 214/215 pysyvät sokkelotilassa.
  - Juna 216 hakee saman pohjan polusta kk-pohja-v1d-pk8: 0df9eb01f (pelikoodari/pk8-216) NS:llä, JU vienyt (200).
  - QA-polku kk-pohja-v1d-pk7-qa on mediassa muistiajoihin: `ui juoksupeli palatsi url https://media.matkakirja.app/juoksupeli/maailma-v4/kk-pohja-v1d-pk7-qa/pohja.json`.
  - Laitteella file:// ja LAN eivät toimi (NSLocalNetworkUsageDescription puuttuu).
- Levy: 8 omaa worktreetä poistettu (87 → 109 Gi).

## Kesken: leivottu valo
- **Kerroin 3 ajettu 12.48–13.01:** koe-valo-k4 c9455d902 (a045ae1d9 + koe-valo-k3 b0cf29e42) + LAV leivonta v1 (tausta-v82, rakennukset-v86, muurikate-v30).
  - Koejuuri: proto-3d/_tyo/pelikoodari/leivonta-217/juuri-k3. v81/v85/v29 ovat symlinkkejä v82/v86/v30:een, joten koodimuutosta ei tarvittu.
  - Paketti juoksupeli-kk-lavastaja-leivonta-v1-vienti-20261031 = sama sisältö (652/652 tiivistettä OK).
- Tulos (parit leivonta-217/parit-k4/): atlas toimii, ja seinille tulee puiden varjo. Kerroin 3 ylivalottaa katot keltaisiksi ja laatat vaaleiksi.
  - VS:lle ja PT:lle ilmoitettu, suositus pienempi kerroin. Seuraava askel on VS:n tai PT:n päätös kertoimesta.
- Osasarjan atlakset puuttuivat (kielletty-osasarja-koe-valo/valo/r_*.png, 37 riviä). 1b-varjokuvion tarkistus Blenderin tarkistus-r_-3_-5-a/b.png:tä vasten odottaa LAV:n osasarja-v6:ta (~20.30).
  - Sitten toimi -20261030-2210:n kohdan 2 mukaan.
- Skenaariot: leivonta-217/skenaariot/koe-valo{0,1k3}-k4.txt; ajoskripti leivonta-217/aja-k4.zsh (levyvahti 82 Gi).

## Huomiot
- juuri-216:ssa on rikkinäisiä symlinkkejä (kohteet T7:llä, välilyönti polussa "T7 4TB"). Kun teet koejuuria, linkitä juuri-216:n merkintään, älä readlink -f -kohteeseen.
- Käyttämättömät haarat: pelikoodari/kuvajako-valo-216 b38810bed (sama puu kuin b7b91e20c) ja koe-valo-k3 (korvattu k4:llä).
- wt/proto-pelikoodari-fpv-211:ssä on committoimaton tyylikirja.json (4 väriä, ei omaa?) → selvitä ennen poistoa.
- ZDiagKuja02.cs committoimatta v98c:ssä (diagnoosi, voi poistaa).
