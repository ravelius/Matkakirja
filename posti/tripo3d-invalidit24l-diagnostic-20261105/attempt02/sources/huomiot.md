# Invalidit 24o — kaksi viistokuvaa, 5.11.2026

Lähde: posti/karttaseppa-codex-invalides-24o-20261105.md, commit 2bd4c4bd4025379013613f590537fd55d17464d1, blob 92739e2b3a5179b5e73a02d1d1278835932f0a9d. Lähtökuvat ja sitova yläkuva tarkistettu otto2-toimituksen a614d2393e365efb8dc18852c2be50b8e3828d6b tavuihin.

Kaksi kokonaan uutta ImageGen-kuvaa: yksi kutsu lounaiskuvalle ja yksi koilliskuvalle. Ei uusintoja, paikallista inpaint-korjausta, jälkiskaalausta tai piirto-/pikselikorjausta. Molemmat 1536 × 1024 RGB PNG. Toimituskuvat ovat generaattorin alkuperäiset tavut; vanhat kuvat säilyvät.

## Pihojen laskenta

| Kuva | Lounaiskortteli | Kaakkoiskortteli | Pohjoisosa |
| --- | --- | --- | --- |
| viisto-lounas.png | 4, kaksi + kaksi | 6, kaksi × kolme | kunniapiha + 2 + 2 |
| viisto-koillinen.png | 4, kaksi + kaksi | **4, kaksi × kaksi** | kunniapiha + 2 + 2 |

Molempiin muodostui pyydetty pohjois-eteläinen välisiipi lounaiskorttelin eteläiseen pihaan. Harmaa katto ja arkadiseinät yhdistävät olemassa olevan poikittaissiiven ulkosiiven kanssa. Neljä pihalattiaa ovat avoimia ja näkyvissä.

## Poikkeamat ja käyttöpäätös

- Lounaiskuvassa kokonaisuus siirtyi arviolta 20 px vasemmalle: kupolin risti on noin x716, lähtökuvassa noin x738. Koko rakenne ja J-siipi säilyvät kuvan sisällä. Kupolin/arkadien yksityiskohtia ja kattotekstuuria piirtyi uudelleen. Kamera-/rajausidenttisyyttä ei siten väitetä.
- Koilliskuvan sommittelu ja ulkosiluetti säilyivät silmämääräisesti lähellä lähtökuvaa. Kattotekstuuri ja arkadiviivat piirtyivät uudelleen muuallakin kuin korjauskohdassa; kuva ei ole pikselilleen muuttumaton.
- **Koilliskuvan kaakkoiskorttelissa oli jo lähtökuvassa vain neljä näkyvää pihaa, vaikka sitovassa yläkuvassa niitä on kuusi. Se jäi neljään.** Rajasin tämän erän lähteen ainoaan sallittuun rakennemuutokseen, lounaiskorttelin välisiipeen; en muuttanut muita kortteleita. Koilliskuvan kaakkoiskorttelia ei kuitata kuudeksi eikä selitetä piiloon jääneiksi pihoiksi.

Pyydetty välisiipikorjaus onnistui kummassakin. Koko tilauksen tiukka QA ei kuitenkaan ole täysin PASS yllä olevien poikkeamien vuoksi. Tämä on yhden sallitun oton arviointitoimitus Karttasepälle. Karttasepän hyväksyntä/syötevalmius, Tripo-ajo, runtime ja julkaisu ovat erillisiä eikä niitä merkitä valmiiksi. En tee lisäottoja tämän kahden kutsun erän perusteella.

Paikallinen täydellinen lähde-, kehote- ja QA-aineisto: /Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/invalides-24o-2133-20261105/ (prompts/viisto-lounas.json, prompts/viisto-koillinen.json, qa/*.json). Tuotantotapa: sisäänrakennettu image_gen, kaksi alkuperäistä natiivikuvaa.
