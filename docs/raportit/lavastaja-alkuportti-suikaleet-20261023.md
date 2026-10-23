# Lavastaja 23.10.2026: alkuportin väreily ja kattojen suikaleet (PT:n erä 13.3x, omistajan kuvat 1322)

## 1. Alkuportin väreily (drone-kuva)
- Syy: rakennukset-v12:n hallit (kk_juoksu.halli): seinän ulkopinta (ovet V4_wood / seinä V4_red) ja sisäpinta samassa tasossa selkä
  selkää vasten. JuoksuMaailma.shader on Cull Off → molemmat piirtyvät ja väreilevät. Meridiaaniportissa 1 715 m² päällekkäistä
  (punainen–puu), lisäksi lattia 1 cm jalustan yllä. Ei sokkelista (tausta-v18:n ja A:n välillä ei päällekkäisyyksiä portin alueella).
- Korjaus rakennukset-v13: sisäpinta SEINA_T = 0,2 m sisempänä, lattia 3 cm. Koskee kaikkia halleja (A, B, C, D, F, G, L, M);
  törmäysmallit ja rakennukset.json ennallaan (tavu tavulta). A:n jäännös 14 m² (siiven pääty), muissa malleissa omia vanhoja päällekkäisyyksiä
  (g-taihedian ristikko-ovet, L:n terassi) – ei tässä erässä.
- Paketti: _valmiit/juoksupeli-kielletty-rakennukset-v13-vienti-20261023 (49 tiedostoa, SHA256SUMS 21412aa19858). Työkalu: tyokalut/kk_juoksu.py,
  pakkaa_rakennukset_v13.zsh.

## 2. Kattojen irralliset keltaiset suikaleet (kuja-kuva)
- Ei muurikate-v6 eikä avoimet-v15:n katto_raystas: tausta. Kaksi lähdettä:
  (a) muurien madallus 4,5 m:iin (v10/v11b) litisti hallien räystäiden kasvot muurivyöhykkeellä irrallisiksi vaakanauhoiksi;
  (b) Pekingin oma Meridiaaniportin katto ulottui A:n korvausalueen yli → 23–30 m:n suikaleet portin tornin vieressä (näkyy myös drone-kuvassa).
- Korjaus tausta-v19 (peking_tausta.py, V19): (a) kattomateriaalin kasvot, jotka ovat muurin harjan ulkopuolella JA joiden kattoalue jatkuu
  vyöhykkeen ulkopuolelle (= hallin räystäs), poistetaan litistämisen sijaan; porttien katot ja muurien harjakate jäävät (ensimmäinen versio
  ilman tätä ehtoa söi porttien katot, hylätty). (b) A:n alue 5 m laajempana yli 13 m:n korkeudelta tyhjäksi. LOD0 134 + 35 + 2 kasvoa.
- Jää: Codexin alkuperäiset päätyjen irralliset reunanauhat (olivat jo v1:ssä; tulivat näkyviin, kun muurit madallettiin). Seuraava askel,
  jos pelikuvassa yhä näkyy: poisto ohuina erillisinä kultaosina (luonnos irtosuikaleet-tarkistuksessa).
- Paketti: _valmiit/juoksupeli-kk-tausta-peking-v19-vienti-20261023 (66 riviä, SHA256SUMS 86825d5c7a5f). aja_tausta_v19.zsh, pakkaa_tausta_v19.zsh.

## Proto
- lavastaja/sokkeli-k1b-210 fa138c5e5 (k1b 4ea7fec01:n päällä): TaustaKansio v19, RakennusKansio v13. tarkista.sh 0 virhettä.
- Tarvitsee: JU vie kaksi pakettia ämpäriin; sitten pelikuvapari (ei ajettu: kuvapari Blenderillä Workbench, kaksipuolinen kuten peli).
- Kuvapari: /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/tavoiteluuppi-k1/alkuportti-v13-v19-kuvapari.jpg
  (vasen ennen v18+v12, oikea jälkeen v19+v13; ylhäällä etelästä, alhaalla tornin julkisivu: väreilevät ovet ja oikean räystään suikale poissa).

## Kesken (PT 23.10. 14.1x)
- PT hyväksyi junaan; JU vie paketit ämpäriin. Todistus pelistä: kun junan 210 runko on koottu, alkulennon porttikohdasta lyhyt video
  tai 3 peräkkäistä ruutua (väreily näkyy vain liikkeessä) → PT:lle. Mac-esikatselu vain, kun `pgrep -f "Matkakirja.app/Contents/MacOS"` on tyhjä.
