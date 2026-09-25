# Miniatyyrit: kohtauskuvat → leikatut kohteet (25.9.2026)

Omistajan löydös 95 (build 13) ja Fablen päätös 25.9.: karttanostojen ja nähtävyyksien kuvat ovat **leikattuja kohteita, eivät kohtauksia** — yksittäinen kohde läpinäkyvällä pohjalla, sama tyyli kuin vanhat 1024 px nähtävyydet (esim. assets/kartat/miniatyyrit/ateena-akropolis.webp).

**Mittaus:** assets/kartat/miniatyyrit/*.webp (423 kpl), läpinäkymättömien pikselien osuus (alfa > 200) kuvasta 256×256:ksi skaalattuna. Leikatuilla kohteilla täyttö on yleensä 0,1–0,5, kohtauskuvilla 0,6–0,9. **70 kuvaa ylittää rajan 0,6** — kaikki 512 px:n kuvia paitsi newyork-metropolitan-museo (1024 px). Rajan tuntumassa (0,55–0,60) on muutama epäselvä, niitä ei ole listalla.

Ämpärin puolella (kohtaamiset/miniatyyrit/*.png, 626 kuvaa, kaikki 1024 px) ei ole ongelmaa: täyttö ≤ 0,6 lähes kaikilla, reunapikselit läpinäkyviä. Ämpärissä puuttuu 27 kuvaa (404, ks. lopussa) — nämä näkyvät pelissä täplänä.

## Pilotti: Ateena (6 kuvaa) — tilattu Codexilta build 14:ään

| Tiedosto | Kohde | Täyttö |
| --- | --- | --- |
| ateena-akropolis-museo.webp | Akropolis-museo | 0.75 |
| ateena-diogeneen-astia.webp | Diogeneen astia | 0.81 |
| ateena-elginin-marmorit.webp | Elginin marmorit | 0.89 |
| ateena-iliou-melathron.webp | Iliou Melathron | 0.78 |
| ateena-maratonhuijaus.webp | Maratonhuijaus | 0.69 |
| ateena-niken-temppeli.webp | Niken temppeli | 0.73 |

## Kaikki 70 (tilataan heti kun omistaja on hyväksynyt pilotin build 14:stä)

| Kaupunki | Kohde | Tiedosto | Leveys | Täyttö |
| --- | --- | --- | --- | --- |
| amsterdam | Herengracht 537 | amsterdam-herengracht-537.webp | 512 | 0.66 |
| amsterdam | Kapein talo | amsterdam-kapein-talo.webp | 512 | 0.70 |
| amsterdam | Kissalaiva | amsterdam-kissalaiva.webp | 512 | 0.67 |
| amsterdam | Maitotyttö | amsterdam-maitotytto.webp | 512 | 0.66 |
| amsterdam | Yövartio | amsterdam-yovartio.webp | 512 | 0.77 |
| ateena | Akropolis-museo | ateena-akropolis-museo.webp | 512 | 0.75 |
| ateena | Diogeneen astia | ateena-diogeneen-astia.webp | 512 | 0.81 |
| ateena | Elginin marmorit | ateena-elginin-marmorit.webp | 512 | 0.89 |
| ateena | Iliou Melathron | ateena-iliou-melathron.webp | 512 | 0.78 |
| ateena | Maratonhuijaus | ateena-maratonhuijaus.webp | 512 | 0.69 |
| ateena | Niken temppeli | ateena-niken-temppeli.webp | 512 | 0.73 |
| berliini | Gaertnerin Berliini | berliini-gaertnerin-berliini.webp | 512 | 0.86 |
| berliini | Marlene Dietrich | berliini-marlene-dietrich.webp | 512 | 0.70 |
| berliini | Muuri 1961 | berliini-muuri-1961.webp | 512 | 0.80 |
| bryssel | Galeries Royales Saint-Hubert | bryssel-galeries-royales-saint-hubert.webp | 512 | 0.83 |
| helsinki | Suomi herää 1899 | helsinki-suomi-heraa-1899.webp | 512 | 0.81 |
| ljubljana | Keskustori | ljubljana-keskustori.webp | 512 | 0.63 |
| ljubljana | Križanke | ljubljana-kri-anke.webp | 512 | 0.76 |
| ljubljana | Ljubljanan linna | ljubljana-ljubljanan-linna.webp | 512 | 0.62 |
| ljubljana | Lohikäärmesilta | ljubljana-lohikaarmesilta.webp | 512 | 0.60 |
| ljubljana | Prešernin aukio | ljubljana-pre-ernin-aukio.webp | 512 | 0.67 |
| ljubljana | Tivoli-puisto | ljubljana-tivoli-puisto.webp | 512 | 0.67 |
| ljubljana | Tromostovje | ljubljana-tromostovje.webp | 512 | 0.72 |
| lontoo | Abbey Roadin suojatie | lontoo-abbey-roadin-suojatie.webp | 512 | 0.80 |
| lontoo | Canaletto Lontoossa | lontoo-canaletto-lontoossa.webp | 512 | 0.61 |
| lontoo | Dickensin pubi | lontoo-dickensin-pubi.webp | 512 | 0.73 |
| lontoo | Exchange Alley | lontoo-exchange-alley.webp | 512 | 0.83 |
| lontoo | Fleming 1928 | lontoo-fleming-1928.webp | 512 | 0.70 |
| lontoo | Globe 1599 | lontoo-globe-1599.webp | 512 | 0.67 |
| lontoo | Leake Streetin tunneli | lontoo-leake-streetin-tunneli.webp | 512 | 0.81 |
| lontoo | Metron höyryveturi | lontoo-metron-hoyryveturi.webp | 512 | 0.69 |
| lontoo | Palo 1666 | lontoo-palo-1666.webp | 512 | 0.74 |
| lontoo | Turbiinihalli | lontoo-turbiinihalli.webp | 512 | 0.78 |
| luxemburg | Bockin kasematit | luxemburg-bockin-kasematit.webp | 512 | 0.73 |
| luxemburg | Chemin de la Corniche | luxemburg-chemin-de-la-corniche.webp | 512 | 0.70 |
| luxemburg | Suurherttuallinen palatsi | luxemburg-suurherttuallinen-palatsi.webp | 512 | 0.62 |
| madrid | Chotis | madrid-chotis.webp | 512 | 0.66 |
| madrid | Goyan kansankuvat | madrid-goyan-kansankuvat.webp | 512 | 0.72 |
| madrid | Gran Vía | madrid-gran-v-a.webp | 512 | 0.67 |
| madrid | Kaksi joukkuetta | madrid-kaksi-joukkuetta.webp | 512 | 0.61 |
| madrid | Tapaskierros | madrid-tapaskierros.webp | 512 | 0.83 |
| newyork | Metropolitan-museo | newyork-metropolitan-museo.webp | 1024 | 0.83 |
| nikosia | Leventis-museo | nikosia-leventis-museo.webp | 512 | 0.74 |
| pariisi | 72 nimeä | pariisi-72-nimea.webp | 512 | 0.70 |
| pariisi | Bastilji 1789 | pariisi-bastilji-1789.webp | 512 | 0.79 |
| pariisi | Carmenin ensi-ilta | pariisi-carmenin-ensi-ilta.webp | 512 | 0.79 |
| pariisi | Curie 1898 | pariisi-curie-1898.webp | 512 | 0.62 |
| pariisi | Impressionistit | pariisi-impressionistit.webp | 512 | 0.90 |
| pariisi | Kirahvin kävelymatka | pariisi-kirahvin-kavelymatka.webp | 512 | 0.66 |
| pariisi | Lumière 1895 | pariisi-lumiere-1895.webp | 512 | 0.75 |
| pariisi | Paras patonki | pariisi-paras-patonki.webp | 512 | 0.63 |
| pariisi | Pariisi soi | pariisi-pariisi-soi.webp | 512 | 0.62 |
| pariisi | Pasteur 1862 | pariisi-pasteur-1862.webp | 512 | 0.62 |
| pariisi | Torni romuraudaksi | pariisi-torni-romuraudaksi.webp | 512 | 0.69 |
| pariisi | Tuileriain rauniot | pariisi-tuileriain-rauniot.webp | 512 | 0.80 |
| pariisi | Vrain-Lucas | pariisi-vrain-lucas.webp | 512 | 0.88 |
| pietari | Jänissaari 1703 | pietari-janissaari-1703.webp | 512 | 0.72 |
| rooma | Aqua Virgo | rooma-aqua-virgo.webp | 512 | 0.62 |
| rooma | Areenan kellari | rooma-areenan-kellari.webp | 512 | 0.70 |
| rooma | Kolikko olan yli | rooma-kolikko-olan-yli.webp | 512 | 0.84 |
| rooma | Sikstus 1510 | rooma-sikstus-1510.webp | 512 | 0.77 |
| valletta | Auberge de Castille | valletta-auberge-de-castille.webp | 512 | 0.61 |
| valletta | Pyhän Elmon linnake | valletta-pyhan-elmon-linnake.webp | 512 | 0.62 |
| valletta | Suurmestarin palatsi | valletta-suurmestarin-palatsi.webp | 512 | 0.77 |
| valletta | Yläbarrakan puutarhat | valletta-ylabarrakka-puutarhat.webp | 512 | 0.72 |
| wien | Figaro 1786 | wien-figaro-1786.webp | 512 | 0.83 |
| wien | Lipizzanit | wien-lipizzanit.webp | 512 | 0.69 |
| wien | Taikahuilu | wien-taikahuilu.webp | 512 | 0.91 |
| wien | Vuoristovesijohto | wien-vuoristovesijohto.webp | 512 | 0.83 |
| wien | Yhdeksäs 1824 | wien-yhdeksas-1824.webp | 512 | 0.80 |

## Ämpärin puuttuvat miniatyyrit (27, 404 — täplä pelissä)

- berliini / Lehmän hinnalla (berliini-lehman-hinnalla)
- berliini / Berliinin karhu (berliini-berliinin-karhu)
- lontoo / Etelämeren kupla (lontoo-etelameren-kupla)
- lontoo / Cheapsiden kätkö (lontoo-cheapsiden-katko)
- lontoo / Thamesin vuorovesi (lontoo-thamesin-vuorovesi)
- kobenhavn / Tivolin portti (kobenhavn-tivolin-portti)
- rooma / Torre Argentina (rooma-torre-argentina)
- rooma / Vatikaanin palatsi (rooma-vatikaanin-palatsi)
- praha / Klementinum (praha-klementinum)
- tukholma / Vädersolstavlan (tukholma-vadersolstavlan)
- tukholma / Norrström (tukholma-norrstrom)
- istanbul / Vararikko 1875 (istanbul-vararikko-1875)
- istanbul / Camondon portaat (istanbul-camondon-portaat)
- istanbul / Käärmepylväs (istanbul-kaarmepylvas)
- sofia / Serdican areena (sofia-serdican-areena)
- sofia / Banja Bashin moskeija (sofia-banja-bashin-moskeija)
- sofia / Sofia-patsas (sofia-sofia-patsas)
- bukarest / Szathmárin studio (bukarest-szathmarin-studio)
- madrid / Tasavallan vuosi (madrid-tasavallan-vuosi)
- lissabon / Calçada (lissabon-calcada)
- lissabon / Largo da Severa (lissabon-largo-da-severa)
- oslo / Akershus (oslo-akershus)
- dublin / St James’s Gate (dublin-st-james-s-gate)
- edinburgh / Scott-monumentti (edinburgh-scott-monumentti)
- moskova / Näyttely 1872 (moskova-nayttely-1872)
- granada / Leijonain piha (granada-leijonain-piha)
- krakova / Wawel (krakova-wawel)
