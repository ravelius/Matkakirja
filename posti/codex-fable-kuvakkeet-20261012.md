## 2026-10-12 — toimitus: kaikki 24 alkuperäistä viivakuvaketta (#85)

Vastaanotin tilauksen ja luin sen kokonaan sekä katsoin tyyliviitteen. Toimitan kaikki 24 kuvaketta yhdessä erässä, myös junan 184 kiireellisimmät kuvakkeet. Kolme rinnakkaista piirtäjäagenttia piirsi SVG-geometrian alusta, ja tarkistin sarjan erikseen ennen toimitusta. Kuvarasteria tai ulkoisten kuvakekirjastojen aineistoa ei käytetty.

Tiedostot kansiossa `posti/kuvakkeet-20261012/`:

- `<nimi>.svg`: yksi itsenäinen SVG jokaiselle alla luetellulle nimelle.
- `bodies.json`: nimellä indeksoitu, yhden rivin SVG-sisältö ilman `<svg>`-käärettä.
- `ikonit-viiva-sisallot.cs.txt`: kaikki 24 `Viiva["nimi"] = "...";`-riviä valmiiksi escapettuina.
- `ikonit-viiva-yhteenveto.png`: nimetty esikatselu vaalealla ja tummalla taustalla, 48 ja 24 pt.
- `small-sizes-light.png` ja `small-sizes-dark.png`: suoraan SVG:stä rasteroidut 20, 22 ja 28 pt tarkistusrivit; sarakejärjestys on `order.json`-tiedostossa.
- `delivery-manifest.json`, `structural-qa.json`, `visual-qa.json` ja `gas-channel-proof.json`: tiedostokohtaiset SHA256:t ja tarkistustulokset.

Toimitetut nimet: `kaasu`, `pallo`, `lippu`, `ajastin`, `nouto`, `jasenet`, `kopioi`, `jaa-koodi`, `valinta`, `aikajana`, `vanha-kartta`, `arvio`, `salakirjoitus`, `taso`, `vihje`, `kumoa`, `historia`, `shakki`, `kiipea`, `avaa`, `lyhty`, `kello`, `lukko`, `ok`.

Kaikissa on `viewBox="0 0 24 24"`, `currentColor`, viivaleveys 1.75 ja pyöristetyt viivanpäät/liitokset. Sisäelementit ja attribuutit läpäisivät sallittujen muotojen tarkistuksen. Kaikkien 24 SVG:n geometria vastaa yhden rivin sisältöä ja C#-merkkijonon roundtrip-tarkistus meni läpi. Kuvakkeissa ei ole tekstiä tai numeromerkkejä.

Kaasukuvakkeen alue x 9–15, y 7–19 on tyhjä myös viivaleveys huomioiden: 10-kertaisessa rasteritarkistuksessa 0 väritettyä pikseliä. Lippukangas on `class="taytto"` ja täytettävissä pelaajan värillä; muut täytöt ovat vain pieniä ympyräyksityiskohtia.

`jaa-koodi` on erikseen piirretty koodilappu ja ulospäin lähtevä nuoli. Se erottuu nykyisestä Jaa-kuvakkeesta; toimitan sen käyttöliittymän valittavaksi. `nouto` on koukku ja pieni pallo. Ajastin, tavallinen kello ja siirtohistoria on erotettu toisistaan nupilla ja kiertonuolella.

Sarja on tarkistettu natiivisti 20, 22, 24, 28 ja 48 pt:n koossa sekä vaalealla että tummalla taustalla. Toinen agentti tarkisti itsenäisesti yhteenvetoarkin tyyliviitteen rinnalla ja hyväksyi kaikki 24 omistajan katselmointiin. Näyttö lopullisen pelin kuvataustan päällä sekä omistajan/toimituksen hyväksyntä jäävät vastaanottajan integraatiovaiheeseen.

Tämä on aineistotoimitus postilaatikkoon. Pelikoodia, päähaaraa tai pelin julkaisua ei ole muutettu. Alkuperäinen tilaus ja tyyliviite säilyvät koskemattomina.
