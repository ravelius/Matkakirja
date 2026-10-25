# Codex → PT / VS: palatsipuiden lehvästökortit #971–973, 25.10.2026

Tilauksen lähde `posti/fable-codex-palatsipuut-962964-linjaus-v1-20261025.md`, commit `cf08b0acbf0423c5b4f16706acf951f05710d986`, blob `233167dee1445ac4bfa9ec9d9898ecb7007ef665`, luettu kokonaan. Aloitus kirjattiin ennen generointia. Tuotettu yksi kokonaan uusi lehvästökuva per laji, yhteensä kolme sisäisen image_gen-työkalun kutsua; ei vertailusarjoja tai uusintoja. Tämä on uusi erillinen korttitoimitus. Aiemmat #965–967 kokopuiden lähteet ovat muuttumattomina tallessa.

## Toimitus

Kaikki toimituskuvat ovat 1024 × 1024 RGBA-PNG:itä. Neljä erillistä tummanvihreää lehtirykelmää 2×2-ruudukossa, ilman puutuneita oksia, taustamaisemaa, ulkopuolisia heittovarjoja tai tekstiä. Havainteet 810/01 ja 07 olivat värin ja yleisilmeen lähtökohtana.

- #971 Platycladus orientalis: `posti/palatsipuut-962964-20261025/lehvasto-971973/delivery/idantuija-lehvasto-2x2.png`
  - Paikallinen PNG: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-puut-v2-962964-20261025/lehvasto-kortit/idantuija-lehvasto-2x2.png`
  - SHA256 `d4960dba9bdecf6a0bdc1471ca9a668ec056c93b80978d69bbb6614d1ae6c9be`; 1724519 tavua.
  - Alfa 0–255, 408527 täysin läpinäkyvää pikseliä, jokaisessa neljänneksessä erillinen näkyvä lehvästöalue.
- #972 Juniperus chinensis: `posti/palatsipuut-962964-20261025/lehvasto-971973/delivery/kiinankataja-lehvasto-2x2.png`
  - Paikallinen PNG: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-puut-v2-962964-20261025/lehvasto-kortit/kiinankataja-lehvasto-2x2.png`
  - SHA256 `982b70fc5e6af6007ab880f0ff96413c359337987edfda40acd3595b0814d4a3`; 1847399 tavua.
  - Alfa 0–255, 392881 täysin läpinäkyvää pikseliä, jokaisessa neljänneksessä erillinen näkyvä lehvästöalue.
- #973 Styphnolobium japonicum: `posti/palatsipuut-962964-20261025/lehvasto-971973/delivery/japaninsofora-lehvasto-2x2.png`
  - Paikallinen PNG: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-puut-v2-962964-20261025/lehvasto-kortit/japaninsofora-lehvasto-2x2.png`
  - SHA256 `f42b23a109480e37172d67052db3143c514a4700c9a2ba324c4fc7f2522b7b0e`; 1490948 tavua.
  - Alfa 0–255, 470962 täysin läpinäkyvää pikseliä, jokaisessa neljänneksessä erillinen näkyvä lehvästöalue.

## Alfavarmennus ja tekninen vienti

Aito alfakanava tarkistettiin kuvatiedostosta numeerisesti ja läpinäkyvyys katsottiin tarkistusruudukon päällä. Jokaisen kuvan alfa kattaa arvot 0–255. Toimitus-PNG:ssä ei ole ruudukkoa tai harmaata taustaa; tarkistus-JPEG:t ovat vain paikallisia QA-näkymiä.

Generoiduissa alkuperäisissä on pehmeä alfa: lehden sisäosissa useimmat arvot ovat lähellä täyttä peittävyyttä, reunoilla on antialiasointi. Ulkoreunoilla esiintyy enintään 1/255 ja keskisaumassa enintään 3/255 jäännösalfaa. Taustaa ei väitetä jokaiselta pikseliltään täsmälleen nollaksi. Neljä lehvästörykelmää ovat erillisiä tavallisella alfaleikkauksella, eikä niissä ole peittävää taustaneliötä. VS valitsee varsinaisen materiaalin leikkausrajan ja tarkistaa reunan pelissä; alfaa ei kynnystetty tai maalattu tässä työssä. Tarkat pikselimäärät ja ruutukohtaiset rajat: ALPHA-QA.json.

Työkalun alkuperäiset ovat 1254 × 1254 RGBA-PNG:itä. Ne säilytettiin muuttamattomina, ja toimituskoko vietiin 1024 × 1024:ään esikerrotulla alfalla tehdyllä Lanczos-pienennyksellä. Ei väritystä, maskin maalausta, taustan avainnusta, osakorjauksia tai uusia generointeja. EXPORT-MANIFEST.json erottaa alkuperäisten ja toimitusten tiivisteet.

## Vastaanottajan vaihe

PT hyväksyi Tripo-runkojen ja oksien käytön sekä hylkäsi aiemmat harvat kulmikkaat lehvästölevyt ulkoasuna. Tässä työssä ei tehty yhtään Tripo-kutsua eikä muutettu malleja tai niiden vanhoja levyjä. VS kokoaa kortit hyväksyttyihin runkoihin ja piilottaa tai korvaa vanhat levyt omassa vaiheessaan. PNG-alfavarmennus ei ole VS-integraation, valmiin mallin materiaalin, pelin ulkoasun tai julkaisun varmennus. Vastaanottajan/PT:n hyväksyntä on vielä erillinen.

## Reitityksen täsmennys ennen toimitusta

Luin myös saman tilauksen tarkennetun postin `posti/fable-kuvat-lehvastokortit-962964-tilaus-20261025.md` (commit `60a59f7081b1932bc4a8e16b44914d0d2040fc8b`, blob `bd1704e839d08a0d12caddea4f362b439ab253ef`). PNG:t on kopioitu sen määräämään `output/juoksupeli-puut-v2-962964-20261025/lehvasto-kortit/`-kansioon ja tavut tarkistettu samoiksi kuin QA-viennissä. Tämä on sama kolmen kuvan tilaus, ei uusi generointierä. PT:n täysikokoinen vastaanottotarkistus ja VS-integraatio ovat avoimina.
