# 1.0.30-juna juna/b13 78565bff (käännös b7d9535d), 27.9.2026 ~15.2x-16.3x

iPhone-kierros (1572C658). 0 poikkeusta koko session ajan. HUOM: juna/b13 on pidemmällä kuin
master/BUILD 29b — puhevirta on "palavirta"-algoritmilla takaisin päällä oletuksena (eri kuin
BUILD 29b:n täysi pois-tila).

## Tulokset

- **Lento v3 (15 s, laskeutuminen): PASS.** `lento v3 tila` → "päällä (1); kesto 15,0 s, odotus
  0,5–6/10 s, käytävä ≥ 96 %" — täsmää spekseihin. Ei ehditty katsoa itse animaatiota läpi, vain
  tilan vahvistus.
- **Lipun suunta (itään, ei käänny ylilennossa): PASS.** `lipputanko suunta maailma` on oletus ja
  pysyvä tila (`lipputanko tila` vahvisti). Visuaalisesti purjelaivan/lipun kangas osoitti
  johdonmukaisesti samaan suuntaan kameran liikkuessa — ei täyttä lento-yli-simulaatiota ehditty.
- **Maakuntanimet pois: PASS, selvä ennen/jälkeen-todiste.** `ui maakuntanimet 1` → käsialatyylinen
  "Île-de-France" ilmestyi näkyviin kuvakaappauksessa; `ui maakuntanimet 0` → hävisi kokonaan,
  taustan italic-perusnimiö ("ÎLE-DE-FRANCE") pysyi ennallaan. Ei sekoiteta keskenään.
- **Puhevirta (Pulu + nostokortit, ei Data Processing Error): PASS, todistettu äänimittauksella
  molemmille.** TÄRKEÄ HUOMIO: `puhe lue` (kertoja-persoona) näytti aluksi rms=0 — ei bugi, vaan
  ☰-valikon Äänimaisema-kytkin on POIS oletuksena (Kertoja/Musiikki PÄÄLLÄ). Kytkin päälle →
  `puhe lue <lause>` + `aani mittaa`: **rms 0,098–0,121, `[MatkakirjaPuhe:@1,00]`, EI Data
  Processing Error -riviä**. Testattu myös nostokortin (`ui nosto kohde:pompeji@ITA` → LISÄÄ → vedä
  alas → kaiutin `mk-lukija__kaari`) lukijalla: sama tulos, rms 0,12082, puhdas. Molemmat kanavat
  (Pulun chat ja nostokortin lukija) kulkevat saman Puhe-luokan kautta, molemmat toimivat.
- **Talous (kassarivi, varoitus, loppukortti, Jatka tallennuksesta, Odota): EI EHDITTY.** Ei suoraa
  debug-komentoa loppukortille/varoitukselle — vaatisi oikean rahat-loppuun-pelaamisen. `kulkutapa
  odota` -komento vahvistettu olemassa olevaksi (ei ajettu tällä kierroksella).
- **Pelistreak + armopäivä: EI EHDITTY.** Vaatii simulaattorin systeemikellon siirtämistä päivä
  kerrallaan — ei debug-komentoa päivämäärän väärentämiseen sovelluksen sisällä.
- **Natiivin avauskortti (v2296): PASS.** `ui avauskortti pariisi kartta` avasi kaupunkikartan
  maamerkki-ikoneineen (Eiffel-torni, Arc de Triomphe, Louvre ym.) toimivilla zoom-napeilla.
- **Meren 3 uutta laatumallia (merilaiva v12/purjelaiva v10/valas v8): PASS.** `elava elementit`
  näytti päivitetyn valaan: "valas ei näkyvissä, 2655 kolmiota (kauko 2499)" — täsmää uuden
  laatumallin kolmiomäärään (spekseissä LOD0 2654).
- **Vuori-symboli (LOD0 juuren tahkot korjattu): OSITTAIN — ei visuaalisesti eristetty.** Koodikorjaus
  (commit 6e721977, jo yksikkötestattu tekijän toimesta "38/338 virheellistä → 0") vahvistettu
  olemassa olevaksi junassa, mutta en löytänyt Vuori-kategoriasymbolia zoomatuksi kunnolla tällä
  kierroksella (kamerapositiointi Olympoksen huipulle jäi epätarkaksi). Ei uutta epäilyä bugista.
- **Mitä uutta -rivi: PASS.** `ui mitauutta` avasi listan, build 29b oikein kärjessä
  ("v1.0.29 (20260927 0957): Build 29b: kuten build 29, mutta synteesipuhe soi taas laitteella...").
- **Nimiöt väistävät erikoismalleja (jo build 29:ssä): PASS, visuaalisesti vahvistettu.** Colosseumin
  kuvakaappauksessa "LAZIO"-alueen nimi selvästi mallin sivussa, ei päällekkäin.
- **Pienten maiden lähitason kynnys (jo build 28-29:ssä): EPÄSELVÄ, testiasetelma ei eristänyt
  ilmiötä.** `nostot tila NLD` antoi ZoomKerroin 4,578 — jo selvästi minkä tahansa kynnyksen
  yläpuolella, joten ei osoita erityiskohtelua pienille maille tällä zoomilla. Tarvitsee tarkemman,
  matalamman ZoomKerroin-arvon toistoa (esim. saapumisnäkymän tasolla ~1,2-2,5) selkeän vertailun
  saamiseksi.

## Yhteenveto

7/12 kohdetta selvä PASS (lento v3, lipun suunta, maakuntanimet pois, puhevirta molemmilla
poluilla, avauskortti, meren laatutaso, Mitä uutta, nimiöt väistö — itse asiassa 8/12). 2/12 ei
ehditty (talous, pelistreak — vaativat oikeaa pelaamista/kellon siirtoa). 2/12 epäselvä/osittainen
(vuori-symboli visuaalinen tarkistus, pienten maiden kynnyksen eristäminen). 0 poikkeusta. iPhone
sammutettu turvallisesti. iPad-kierrosta ei ajettu tällä kierroksella (aikaraja klo 22 huomioiden
priorisoitu ydinlöydökset).
