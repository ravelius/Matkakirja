# Valoseppä: luovutus 23.10.2026 klo 15.46 (kova raja 36 %, Postivahti)

Tili vvi＠vvi.fi. PT: local_5df52e10-10e4-4b72-9554-0049db300dfe, NS: local_8254cd90-9a85-4d61-8a06-085e7562f05f,
JU: local_d8cad7de-3ff8-4f4b-8787-baa80836e175. Päiväkirja `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md`
(rivit 14.43–15.4x). Lue tämä kokonaan ennen jatkoa. Ei taustatehtäviä käynnissä (kaikki ketjut valmiit).

## Valmiina tänään (14.45–15.46)

- **Aukioiden läiskät ratkaistu, PT HYVÄKSYI k8b:n.**
  - Syy: Codexin `marmori.jpg` (laji 16, sillat/terassit/kaiteet) sisältää 2 × 3 tummaa täplää. 2 m:n toistossa niistä syntyi
    ruudukko. Analyysi on kansiossa `_tyo/linssiseppa2/laiskat/` (malli.py, tarkista.py).
  - k8b 9c4648d6b jakaa täplän pois varjostimessa (vain laskentaa, ei näytteitä; QA `valo k8`). Simu: `kierros2/k8b-3927fe529/pari-*`.
  - **Junaversio `linssiseppa2/grafiikka-210-k8b-juna` 18b47ba05** (= d1dac3bd8 + k8 + k8b, sisältö = testattu 3927fe529).
    **PT: junaan vasta, kun iPadin J-regressio on selvitetty** (k8:n tahra lisää pihalle 3 kohinaa).
- **Kevyt varjo** `linssiseppa2/grafiikka-210-kevyt` d1dac3bd8: varjo 4 näytteellä, Lattia lukee varjon kerran pikseliä kohden.
  QA `valo kevyt 0|1`. NS otti sen junaan (9fa844838). Ulkoasu ≈ k6 (`kierros2/k8b-3927fe529/varjo-*`).
  - **EI ratkaissut J:tä:** LT mittasi 9fa844838:lla J 22,3 ms, `kevyt 0` 21,9 ms, ilman grafiikka-210:tä 10,94 ms.
- **J-regression puolitus (NS johtaa, LT mittaa ajonaikaisilla kytkimillä fd109267f:llä):**
  - Valmiit haarat d1dac3bd8:n päällä, ei junaan: `linssiseppa2/puolitus-{kaikki-pois 4d7d1880e, k7 211b9efb0, k5 1c8c9031f,
    k4 256d681d9, pehmea aebd80703, tiilet bbb09bd01, maalaus 19de42cb9, testikamera d711b3376}`.
  - Varalle: `linssiseppa2/grafiikka-210-kevyt2` eac7b7f2c, pihan laatat sinittömällä hash12:lla (33 sin/pikseli → 0). Junaan, jos
    `tiilet 0` palauttaa J:n.
  - Koodin perusteella mikään k3–k7:n osa ei yksin selitä +11 ms:ää. **Odota LT:n tulosta NS:n kautta**; jos kaikki-pois on yhä
    punainen, kokeile testikameraa ja sitten haaran pohjan eroa runkoon.
- **RAKETTIVIDEO, PT HYVÄKSYI a65fa8e10:n** (haara `linssiseppa2/rakettivideo-210`, wt `/Users/Shared/Claude/wt/proto-linssiseppa2-rakettivideo`):
  - bae9a5fc0: sininen hetki video-tilassa, yöilme −1°…−6° lähimaastolle/merelle/savulle, pallo pelin käyrällä; QA `linssi raketti
    video sininen 0|1`.
  - a65fa8e10: rungon heitinvalo × 0,3 alhaalta, taivaanvalo × 1,15 (raketti ja torni hämärään).
  - Ajo: `rakettivideo/ajo-20261023-1524-pysty/rakettivideo-kokeilu-pysty.mp4` + `ruudut/arkki.jpg`.
  - NASA-vertailu: `nasa-vertailu/nasa-vertailu.jpg`. Sininen hetki ja liekin valo vastaavat, **maapilvi pienempi ja vesiheijastus
    puuttuu** → omistajan päätettäväksi.
  - Peli vs. video -pari: `peli-vs-video/peli-vs-video.jpg`. Video ei ole selvästi parempi (terävämpi ja sininen hetki, mutta pelissä
    isompi maapilvi ja koko alusta). PT:lle kerrottu 15.4x.

## Jono

1. **RAKETTINÄYTE KK:LLE** (PT 15.4x): video + ruudut + NASA-vertailu + peli vs. video -pari. KK:lle erot omistajan päätettäviksi:
   pienempi maapilvi, ei vesiheijastusta ja video vs. peli. **Tarkista ensin PT:n vastaus pariviestiin** (lähetä vai ei).
2. **J-regressio:** odota NS:n/LT:n kytkintulos; tee pyydetty kevennys tai peruutus. Kun J on selvä, 18b47ba05 (k8b) junaan PT:n luvalla.
3. Harjakoristeet: Codexin mallit eivät ole vielä tulleet (`wt/fable-posti-0945/posti/harjakoristeet-20261023/`).
4. A taide.md PR [ravelius/Matkakirja#5186](https://github.com/ravelius/Matkakirja/pull/5186) ennallaan.

## Opit

- **Luotaa ensin aineisto:** läiskä oli tekstuurissa (täplät näkyvät, kun kuvan toistaa 3 × 3). Tarkista Codexin kuva ennen
  varjostimen muuttamista.
- HLSL:n `?:` laskee molemmat haarat: kevyt- ja raskas-versio vaatii `[branch] if`- tai erillisen version, ei ehtolauseketta.
- `odota-sha.zsh`: pgrep-kuvio `aja-k[0-9][a-z]*.zsh` (korjattu; aiempi ei tunnistanut aja-k8b:tä). `pkill` ei pysäytä jo
  käynnistynyttä `todistusajo.sh`-lasta, eikä exec-korvattua `aja-mac.zsh`:ta (nimi muuttuu).
- Mac-videoajo ei tarvitse iPadia/simua: sen voi ajaa simuajon rinnalla (offline-piirto), kun PT pyytää kiireellä.

## Lisäys 15.47 (PT)

- Peli vs. video -pari on välitetty KK:lle omistajan päätettäväksi (PT suosittaa pelin omaa laukaisua). **Seuraaja odottaa valintaa; ei uusia rakettiajoja ennen sitä.** Jonon kohta 1 on siis odotustilassa.
