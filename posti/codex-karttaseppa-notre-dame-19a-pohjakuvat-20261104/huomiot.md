# Notre-Dame /19a — viiden pohjakuvan toimitus

Tilaus #2005 /19a. Lähdecommit `ecb0aa11995f8c7811c77552c1f82536b73039ad`, lähdeblob `24a93c6762508bc61f0eb3cfc70b014b12558688`.

Viisi alkuperäistä 1024 × 1536 RGB PNG -kuvaa. Neljä vaakatasosta piirrettyä ortografista sivukuvaa (`lansi`, `pohjoinen`, `ita`, `etela`) ovat mallin rakennusviitteet. `pelikulma` on yläviisto **tarkastuskuva**, eikä sitä anneta viidentenä sivukuvana mallin rekonstruktioon.

| Tiedosto | Valittu otto | Värillisen siluetin rajaus x0,y0,x1,y1 | SHA256 |
|---|---:|---|---|
| lansi.png | 2 | [209, 183, 815, 1363] | `6ed3b62b16bdeea64cc3a3bb389d581b136ac1c56e149fe3efdb7e0e404123c9` |
| pohjoinen.png | 1 | [80, 181, 924, 1363] | `461cad5613372ecd0f82eb1d1e639f94ea1f87eb58e9fc12277a6a008048aaa0` |
| ita.png | 2 | [213, 183, 810, 1363] | `1e44e6a8d4702ddc6fa1a723f10a4b069fd35fcd42af4517e7dc6d93b2a7506e` |
| etela.png | 2 | [96, 181, 945, 1363] | `d67c336250810d30baa33e0f2248e7f2dec8e01fa4a38311c13da424c0dbaef6` |
| pelikulma.png | 7 | [59, 249, 904, 1362] | `8c05103ec98514f90be1e76abeb9208d2a60f2f938d1a8c56c7cdf69e1fb9364` |

Rajaus mitataan pikseleistä, joissa RGB-kanavien suurimman ja pienimmän ero ylittää 12. Se ei ole rakennusosien semanttinen segmentointi. Koordinaattien loppupiste ei kuulu rajaukseen.

## Yhteensopivuus ja rajat

Neljä sivukuvaa tarkistettu rinnakkain: sama alareuna y=1362 (viivan reunapikselit), huipun kärki y=181–183, tornien tasanteiden ja kerrosten linjat samassa korkeudessa. Eteläkuvassa länsitornit vasemmalla, pohjoiskuvassa oikealla; sivukuvassa toinen torni peittyy ensimmäisen taakse. Itäkuva esittää kuoria, säteittäisiä tukikaaria ja kappeleita, ei toista länsijulkisivua. Lännessä kolme portaalia ja ruusuikkuna. Tasanteet ovat tasaisia ja tornit levenevät ylöspäin. Lyhennetty keskilaiva, ristilaiva, kuori ja tukikaaret mukana. Ei ympäristöä eikä heittovarjoa.

Tavoite oli 2,5 px / malliyksikkö, noin 600 px leveys, 825 px pituus, 900 px tornikorkeus ja 1175 px huippukorkeus. Natiivien piirrosten mitatut siluettileveydet ovat 606/597 px (länsi/itä) ja 844/849 px (pohjoinen/etelä). Ne eivät ole kalibroituja valokuvia tai teknisiä mittapiirroksia. Pienissä koristeissa ja paikallisissa räystäissä on piirrosvaihtelua. Mallin lopullinen mitoitus tehdään tilauksen 19b lukuihin 240 : 330 : 360 : 470; nämä natiivikuvat eivät muuta niitä.

Yläviiston näkymän lähimmän jalan alareuna on y=1361. Kuvassa näkyvät tasanteet, risteävä katto, huippu, kuori ja tukikaaret. Kameratavoite on noin 60° ylhäältä; ImageGen ei anna kalibroitua kameraa tai mitattua kuvakulmaa. Kuva on kokonaismuodon ja katon katselua varten. Neljä elevatiota ovat ensisijaiset. 3D-geometrian todellinen vastaavuus, Tripon lopputuloksen laatu ja iPad-suorituskyky tarkistetaan erikseen /19b:ssä.

## Tuotanto ja jatko

14 kokonaista ImageGen-kutsua: länsi 2, pohjoinen 1, itä 2, etelä 2, pelikulma 7. Tilauksessa 19a ei ole yhden oton rajaa; kuvia korjattiin lähteen pyytämän yhteensopivuuden vuoksi. Valitut 5 kuvaa ja kaikki 9 aiempaa ehdokasta sekä täydet kehotteet säilyvät työtilassa. Ei osittaisia kuvankorjauksia, rajausta, skaalausta tai kuvapikselien liimaamista toimituskuviin.

Oma tarkistus: neljän sivukuvan yhteensopivuus riittää 19b-mallikokeeseen; yläviistokuva on erillinen visuaalinen vertailu. Vastaanottajan hyväksyntää, omistajan hyväksyntää näille uusille viidelle kuvalle, 3D-mallin syntymistä, pelin runtime-kytkentää tai julkaisua ei väitetä valmiiksi.

Työtila: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/notre-dame-3d-pohjakuvat-2005-20261104`. Kehotteet: `prompts/`. Natiiviehdokkaat: `originals/`. QA: `qa/set-verification.json` ja `qa/four-elevations-comparison.jpg`.
