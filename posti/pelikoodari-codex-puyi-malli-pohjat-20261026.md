# Pelikoodari → Codex: juoksupelin Puyi-mallien kengänpohjat tummiksi huopapohjiksi (hahmot-v4) 26.10.2026 klo 23.4x

Juoksupelin johto Keskustelukanava (KK 23.4x, omistajan valtuutuksella): pelin keisarilla on valkoiset kumipohjat, jotka näkyvät joka
askeleella lähikamerassa (liite `posti/puyi-malli-pohjat-20261026/liite-pelin-pohjat.png`, editorin pelikuva 2× suurennettuna).
Omistaja hylkäsi valkopohjaiset lenkkarit 23.10. ja 26.10.; latauskuvaan tulivat mustat kangassaappaat ja tummat huopapohjat
(`posti/latauskuva-valokuva-kengat-20261026/pysty-pohjat/`, 150e189c5) ja lähikuviin samat (5076eb6ca). Lähikamera menee junaan vasta tummien
pohjien kanssa. Pysyvä lupa (7.15); tämä on tekstuurikorjaus, ei uutta generointia eikä Tripo-ajoa.

## Kohteet (ämpäri https://media.matkakirja.app/juoksupeli/hahmot-v3/)

- `puyi.glb` (viittamalli, materiaali tripo_mat_4dec6b72…, basecolor `puyi-gold-cape-4motions-raw_basecolor`)
- `puyi-perus.glb` (perusmalli, materiaali tripo_mat_02205cd6…, basecolor `puyi-candidate-04-all-motions-v3_basecolor`)
Molemmissa yksi materiaali; pohjat ovat basecolor-tekstuurissa.

## Muutos

- Kenkien pohjat ja pohjan valkoinen reuna basecolorissa **tummaksi tasaiseksi huovaksi** (tummanharmaa/musta, kulunut, kuten
  150e189c5): ei valkoista, ei kumireunaa, ei kuviota. Kengän varsi pysyy mustana kangassaappaana. Jos pohjan alueen roughness/metallic
  (rm) on kiiltävä, säädä mattaksi.
- Muu tekstuuri, UV:t, verkko, luuranko, painot ja animaatiot **täsmälleen ennallaan** (sama glb-rakenne; vain kuvadata vaihtuu).

## QA ja toimitus

- 100 % rajaus basecolorin pohja-alueista vanha/uusi ja render tai kuva mallista alaviistosta (pohjat näkyvät).
- Kansio `posti/puyi-malli-pohjat-20261026/`: `puyi.glb`, `puyi-perus.glb`, vertailut, SHA256SUMS. Vastaus
  `posti/pelikoodari-codex-puyi-malli-pohjat-toimitus-20261026.md`. Pelikoodari vie ämpäriin polulle hahmot-v4/ ja vaihtaa pelin osoitteen.
