# Todistusajo: lasihaku-207-iphone 8a541e27

**lasihaku-207-iphone 8a541e27: PUUTE — 2: napit himmenivät 5 s jälkeen: ei lokiriviä; 2: museon lasikortti lasilla: ei lokiriviä; 3: pitkiä ruutuja kameran liikkeessä 25 (> 20 ms = nykäys; pitkat-ruudut.txt)**

Laite iphone `123B4B25-36B7-4A76-B677-905621CD8F5A`, skenaario `sk-lasihaku-207.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-lasihaku-207-iphone-20261020-0327`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt 8a541e27 = 8a541e27
- **OK** haaran b8198b4e3 sisältyy käännökseen

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: elävä opas aukesi` | OK: linssit: opas: auki (aloitusvalikko, kartta valinnasta), data Google, worker https://matkakirja-pollo.samireivinen.workers.dev/opas/seuraava |
| `oletus: kehysnapit löytyivät ilman hakua (ryhmiä > 0)` | OK: ui-komento: ui kehysnapit tila → =kehysnapit päällä, näkyvissä, ryhmiä 22, viimeisin osuma tyhjä |
| `oletus: napit himmenivät 5 s jälkeen` | PUUTE: ei riviä 12 s:ssa |
| `oletus: lasipaneelit kiinnittyneet (Rakenne.Seuraa)` | OK: ui-komento: ui lasi tila → =lasipohja päällä, paneeleja 30 (lasilla 0); lasitausta pois, paneeleja 0, lähde pallon kamera, kuva 0×0 (1/8), sumennus 8 pt |
| `tap-teksti Astu sisään → tap 196.5 757.0` | lähetetty |
| `oletus: museo aukesi` | OK: linssit: museo: auki Ranskan sali: 10 osaa, 51 teosta, 61 pysähdystä, 9100 kolmiota, 4 näyttelyä, 97 ms (rivi 1614 jo ennen askelta, askel alkoi rivillä 1776) |
| `tap-teksti Louvren klassikot → tap 219.5 484.5` | lähetetty |
| `oletus: museon lasikortti lasilla` | PUUTE: ei riviä 5 s:ssa |
| `oletus: museon kehysrivit löytyivät` | OK: ui-komento: ui kehysnapit tila → =kehysnapit päällä, näkyvissä, ryhmiä 22, viimeisin osuma mk-museo-nakyma |

- **PUUTE** napit himmenivät 5 s jälkeen: ei lokiriviä
- **PUUTE** museon lasikortti lasilla: ei lokiriviä

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)
- **PUUTE** pitkiä ruutuja kameran liikkeessä 25 (> 20 ms = nykäys; pitkat-ruudut.txt)

## 4. Stillit tiloista
- **OK** [L1-opas.png](kuvat/L1-opas.png): Oppaan kehysnapit näkyvissä (1179×2556 px, pysty)
- **OK** [L2-opas-himmea.png](kuvat/L2-opas-himmea.png): Napit himmeinä (1179×2556 px, pysty)
- **OK** [L3-museo-kortti.png](kuvat/L3-museo-kortti.png): Museon huonekortti lasilla (Rakenne.Luokka LasiKortti) (1179×2556 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 70.76 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **OK** kone kuormaton (load 8.57)

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus: ei mitattu tässä ajossa (vaatii merkki + videokaappauksen)

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
