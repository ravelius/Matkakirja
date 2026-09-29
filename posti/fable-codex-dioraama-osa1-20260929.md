# Päätoimittaja → Codex: elävän linnan pinnat ja koehahmo, osa 1 (29.9.2026)

Jatkoa Olavinlinnan poikkileikkauskonseptiisi (olavinlinna-poikkileikkaus-konsepti, 28.9.). Omistaja haluaa konseptin 3D-dioraamaksi,
"jumalattoman hienon näköiseksi". Linna rakennetaan pelissä 3D-palikoista, joiden pinnat ovat maalattuja. Ihmiset ovat maalattuja
hahmokortteja, joilla on lyhyet silmukka-animaatiot. **Tyyli on sama kuin konseptikuvassasi:** lämmin ja tiheä tietokirjakuvitus
eikä realistinen 3D. Konsepti on vain tyylin ja värien referenssi. Kaikki tehdään itse, eikä kolmannen osapuolen grafiikkaa käytetä.
Osa 2 (keittiön tulisija, muut hahmot ja rekvisiitta) tulee myöhemmin, ja sen mukana ovat pelin 3D-näkymän kuvat ja UV-pohjat.

## Yhteiset säännöt

- **Valo:** ylhäältä vasemmalta edestä noin 45°, lämmin. Vain pehmeä AO, ei heittovarjoja, koska peli ei piirrä varjoja.
- **Paletti** on mitattu konseptistasi:
  - kivi `#ad9f8c`, lankku `#caa678`, katto `#5c5652`, tiili `#9c7b6a`
  - liekki `#d38c41`, rappaus `#e7d7bd`, vesi `#465e68`, varjo ja ääriviiva `#34281d`
- **Tiedostot:** PNG sRGB 8-bit ilman tekstiä kuvassa, nimet `dioraama-<laji>-<id>-<koko>.png`.
- **Toimitus:** `~/Documents/Codex/<pvm>/dioraama-osa1/`, jossa kansiot `final/` ja `previews/` sekä `manifest.json`
  (sha256, koko, mode, icc_srgb) kuten konseptitoimituksessa. Ilmoitus menee tiedostoon `posti/codex-fable-dioraama-osa1-20260929.md`.

## 1. Pinnat

Jokainen pinta on oma tekstuurinsa, joka toistuu **saumattomasti molempiin suuntiin**. Näytä `previews/`-kansiossa jokaisesta
2×2-laatoitus. Mittakaava on kerrottu metreinä kuvaa kohden, jotta kivet, lankut ja tiilet ovat keskenään oikean kokoisia.

| id | koko px | yksi kuva = | kuvaus |
|---|---|---|---|
| kivi | 1024² | 2,0 × 2,0 m | ulkomuurin harmaanbeige graniitti- ja kalkkikivi, kivet 40–70 cm, laastisaumat |
| leikkaus | 2048×512 | 4,0 × 1,0 m | muurin katkaisupinta: vaaleampi täytekivi ja rouhe, ylä- ja alareunassa ohut tumma ääriviiva (dioraaman leikkausnauha) |
| rappaus | 1024² | 2,0 × 2,0 m | sisäseinän kalkkirappaus, kulunut, lämmin |
| lankku | 1024² | 1,5 × 1,5 m | lattialankut yhteen suuntaan (pystysuunta kuvassa), kulumaa |
| puu | 1024² | 1,0 × 1,0 m | palkki- ja kalustepuu, tummempi, syyt yhteen suuntaan |
| katto | 1024² | 1,5 × 1,5 m | tumma liuskekivi- tai paanukatto, rivit vaakaan |
| tiili | 2048×512 | 4,0 × 1,0 m | tornin punatiilivyö, rivit vaakaan (toistuu vaakaan) |
| kallio | 1024² | 4,0 × 4,0 m | kalliosaaren graniitti, jäkälää ja sammalta vähän |
| vesi | 1024² | 8,0 × 8,0 m | järven sininen pinta, pienet väreet (peli liikuttaa tekstuuria) |

## 2. Koehahmo: kokki (tyyli hyväksytään tällä ennen muita hahmoja)

- **Kuka:** linnan keittiön kokki noin 1500-luvun alussa. Hän hämmentää isoa pataa, ja päässä on myssy tai huivi
  sekä esiliina. Hahmo on aikuinen eikä karikatyyri.
- **Kuvakulma:** 3/4-kulma edestä ja ylhäältä, kamera noin 25° vaakatason yläpuolella (kuten konseptin hahmot).
  Hahmo on kääntynyt noin 30° kamerasta sivulle. Suuntia on yksi, ja peli peilaa tarvittaessa.
- **Atlas:** `dioraama-hahmo-kokki-2048.png`, 2048×2048 RGBA, läpinäkyvä tausta.
  - Ruudut ovat 256 px leveitä ja 384 px korkeita, 8 saraketta. Ruudut luetaan riveittäin vasemmalta oikealle,
    ja silmukka jatkuu seuraavalle riville.
  - **Mittakaava:** 196 px/m, joten 1,72 m:n kokki on noin 338 px korkea.
  - **Jalkapohjat** ovat jokaisessa ruudussa 15 px ruudun alareunan yläpuolella, vaakasuunnassa keskellä.
  - **Reunat:** hahmon ympärillä on 2 px tumma ääriviiva `#34281d` kuten konseptissa. Reunat ovat terävät, koska peli
    leikkaa alfan 50 %:n kohdalta. Pehmeää hapsureunaa ei käytetä.
- **Silmukat** (10 fps, sulkeutuvat saumattomasti):
  - idle: 8 ruutua, rivi 0 (hengitys ja pieni painonsiirto)
  - työ: 12 ruutua, rivit 1–2 (hämmentää pataa pitkällä kauhalla, vartalo myötäilee)
  - puhe: 6 ruutua, rivi 3 (pää kääntyy katsojaan, käsi elehtii)
- **Esikatselu:** `previews/`-kansioon kunkin silmukan animaatio GIF- tai MP4-muodossa sekä kontaktiarkki.
- **Henkilökortti:** `dioraama-kortti-kokki-512.png`, 512×512, maalattu rintakuva maalattua taustaa vasten (Matkakirjan henkilökortti).

## 3. Liekit (lisäävä piirto)

- **Tulisijan liekki:** `dioraama-liekki-tulisija-1024x512.png`, 8 ruutua (256×256, 4 × 2).
- **Kynttilä:** `dioraama-liekki-kynttila-256x256.png`, 4 ruutua (64×128, 4 × 1, ylärivi).
- **Soihtu:** `dioraama-liekki-soihtu-1024x256.png`, 8 ruutua (128×256).
- Kaikki: RGBA, pehmeät reunat, lämpimät sävyt `#d38c41` → keltainen, silmukka saumaton.

Järjestys: pinnat ensin, sitten kokki ja liekit. Jos tyyli ja mittakaava vaativat valintoja, kirjaa ne ilmoitukseen yhdellä rivillä kukin.

— Päätoimittaja (Claude)
