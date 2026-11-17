# Uskonnot-merkki — kolme vaihtoehtoa KK:n arvioon

Tilaus #2636, LAV → Codex, 17.11.2026. Lähde: `posti/lav-codex-uskonnot-merkki-20261117.md`, commit `299cc91b6d9b4a331e3cb838b88b1d60828475d5`, blob `425fa99060935f4f7498f6a2f3fb37120468f6fb`.

Katselmuspaketti. KK valitsee merkin. Mitään vaihtoehtoa ei ole kytketty peliin eikä hyväksytty omistajan puolesta.

| Vaihtoehto | Ajatus | Huomio |
|---|---|---|
| A — Kynttilä | Hiljentymisen ja muistamisen valo | Suositus: selkein pienessä koossa, ei rakennustyyliin sidottu. Voi tarkoittaa myös muistamista. |
| B — Öljylamppu | Monissa kulttuureissa käytetty valonlähde | Koristelematon lamppu. Leveässä muodossa liekki jää 24 px:nä pienemmäksi. |
| C — Hiljentymishuone | Avoin, tunnukseton hiljentymispaikka | Ei tornia tai uskonnollista tunnusta. Kupolirakennus on muita vaihtoehtoja kulttuurisidonnaisempi. |

## Katsominen

- `vaihtoehdot.png`: kaikki kolme ja niiden pienet esikatselut.
- `kooste-*-vektori-24-40-128.png`: kukin uusi vektorimerkki nykyisten kuuden vieressä kaikissa pyydetyissä koissa.
- `kooste-*-rasteri-24-40-128.png`: vastaava vertailu uudella rasterimerkillä. Kuusi vertailumerkkiä ovat nykyisen natiivisarjan muotoja.
- Koosteiden lämmin tausta ja selitteet ovat vain vertailua varten. Yksittäisissä merkeissä ei ole taustaa, tekstiä tai kehystä.

## Kunkin vaihtoehtokansion sisältö

- `merkki-uskonnot.svg`: täytetty kynävektori; `viewBox="-8 -8 16 16"`, yksi yhdistetty polku, `fill-rule="nonzero"`. Ei SVG-strokea.
- `polkumerkkijono.txt`: täsmälleen saman SVG-polun `d`-arvo natiivikäyttöön.
- `polut.json`: yhdistetty polku, erilliset vedot ja kynän parametrit. Natiivivastaanottaja lisää merkin vasta KK:n valinnan jälkeen.
- `merkki-uskonnot.png`: 512 × 512 RGBA, aito läpinäkyvyys, seepianmusta viiva ja hillitty vaalea seepia. Tämä on pyydetty rasteritoimitus.
- `merkki-uskonnot-rasterilähde.svg`: rasteriversion muokattava lähde.
- `merkki-uskonnot-vektori.png`: vektorin 512 px:n esikatselu.
- `merkki-uskonnot-24.png`, `-40.png`, `-128.png`: rasteriversion pienet esikatselut.

## Menetelmä ja lähteet

Vektorin ääriviivat on laskettu nykyisellä `js/fokusnosto-symbolit.js`-tiedoston `nostosymTeranJalki`-algoritmilla: terä −40°, vahva a/b 0,775/0,36 ja ohut 0,50/0,235. Kynttilässä ja öljylampussa on kuusi vetoa, hiljentymishuoneessa viisi. Kyseessä on SVG-kuvitustyö olemassa olevaan merkkisarjaan, ei kuvageneraattorin tulos.

Rasterissa on samoihin muotoihin perustuva kevyempi kynäviiva (0,52 × vektoriterä), vaalea seepiapinta ja muutama varjostusveto. Rasterin esikuvat ovat `assets/koristeet/nostotyypit/LUEMINUT.md` ja nykyiset atlasmerkit. Vektori ja rasteri ovat tarkoituksella kaksi erillistä esitystapaa.

Kuusi vertailumuotoa on luettu tiedoston `Matkakirja-proto-mac/Assets/Matkakirja/UI/NostoMerkit.cs` vakioista Ruusu, Tiimalasi, Lamppu, Lyyra, Vuori ja Salama. Ne on sovitettu koosteisiin samalla 16 yksikön alueella; lyyra käyttää omaa avointa viivamuotoaan 1,2 yksikön pyöristetyllä viivalla. Koosteet eivät ole kuvakaappauksia pelistä. Nykyisiä merkkejä tai ajettavaa pelilähdettä ei muutettu. Lähdetiedostojen SHA256-arvot ovat `manifest.json`-tiedostossa.

Tekninen tarkastus: `QA.json`. Paketin tavuntarkistus: `SHA256SUMS` (ajettava tässä kansiossa: `shasum -a 256 -c SHA256SUMS`). Ei R2-siirtoa, pelikytkentää tai pelijulkaisua tässä toimituksessa.
