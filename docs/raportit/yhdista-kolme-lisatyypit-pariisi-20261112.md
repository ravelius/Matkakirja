# "Yhdistä kolme": lisätyypit c, f, i, Pariisi (SK 12.11.2026, KK 21.32)

Dataluonnokset samassa muodossa kuin `yhdistaKolme[]` (docs/raportit/yhdista-kolme-pariisi-20261112.md, kohta 3). EI pelidataa, EI latauksia, ei uusia juttuja. Lähteet: pelin omat jutut (js/packs/nahtavyysjutut.js), 1873-taulukko ja en-Wikipedia (WebFetch 12.11.2026); kuvat Commonsin rajapinnasta (imageinfo, Restrictions tyhjä kaikilla), jokainen kuva katsottu silmin. Kuvalinkki: https://commons.wikimedia.org/wiki/File: + tiedosto (välilyönnit alaviivoiksi).

Merkintä **3D / kuva** = onko KOHTEELLA (ylärivin graafinen asia) koodimalli (luettu `proto-3d/Matkakirja-proto-esikatselu/Assets/Matkakirja/Kartta/OhjelmaKohdePariisi*.cs`; PK vahvistaa) vai vain kuva.

## (c) Kadonnut ↔ mikä seisoo paikalla nyt

Asettelu: ylärivissä kadonnut rakennus (KUVA, kadonneilla ei ole 3D-mallia; selvitys 21.04), laput = nykyisen paikan nimi (teksti). Käänteinen asettelu (3D-malli ylhäällä, lappu = kadonneen nimi) onnistuu vain niillä, joilla on malli (Orsay, Grand Palais; Chaillotilla ei).

| # | Kadonnut (ylärivi) | Tila ylärivillä | Nyt paikalla (lappu) | Malli nykyisellä | Lähde (fakta) |
|---|---|---|---|---|---|
| 1 | Palais d'Orsay (poltettu 23–24.5.1871, raunio, purku alkoi 1898) | kuva | Orsayn museo | 3D (OhjelmaKohdePariisiOrsay) | 1873-taulukko V: en-Wikipedia "Palais d'Orsay", "Musée d'Orsay"; pelin juttu "Orsayn taidemuseo" |
| 2 | Palais de l'Industrie (1855, purettu 1897) | kuva | Grand Palais | 3D (OhjelmaKohdePariisiGrandPalais) | 1873-taulukko V: en-Wikipedia "Palais de l'Industrie"; pelin Grand Palais -juttu ("sen tieltä purettiin Palais de l'Industrie") |
| 3 | Palais du Trocadéro (1876–1878, purettu 1935) | kuva | Palais de Chaillot | EI mallia (kuva) | en-Wikipedia "Palais du Trocadéro": Chaillot rakennettiin 1937 näyttelyyn ja korvasi Trocadéron, kaksi siipeä säilyi; ei pelin omaa juttua → tarvitsee oman faktarivin kortille |

Varalla: Tuileries'n palatsi → Tuileries'n puutarha / Carrousel-terassi (en-Wikipedia "Tuileries Palace": purku valmis 30.9.1883; paikka avautuu Louvren siipien väliin). Löytämäni Commons-kuva (G.11602, CC0) esittää kuitenkin kaarta, ei palatsia → hylätty; sopiva kuva (palatsin raunio 1871) pitää hakea (PH17361 / PH4381, Paris Musées, ei vielä tarkistettu).
Ei valittu: Temple-torni → Square du Temple ja Grand Châtelet → Place du Châtelet (V-rivejä, mutta ei kuvaa tarkistettu), Les Halles, Bastilji (jo tähtikortti), Galerie des Machines (paikan käyttö 1873 TUNT.).

### Kuvat (c)

| Id | Tiedosto | Tekijä | Aika | Lisenssi | Koko | Näkyy |
|---|---|---|---|---|---|---|
| c1 | `Jean Alfred Desbrosses--ruins of the Palais d'Orsay.webp` | Jean Desbrosses (1835–1906) | 1871–1896, öljymaalaus | PD | 574×351 (matala) | Rauniokäytävä, holvikaaret ja ruohoa; selvästi raunio. Matala resoluutio: pieni laatta riittää. |
| c2 | `Palais de l'Industrie - Édouard Baldus.jpg` | Édouard Baldus (Metropolitan Museum) | 1850-l, albumiinivedos | PD | 3739×2910 | Rakennuksen pääsisäänkäynti, kaari ja koristeet. |
| c3 | `Le palais du Trocadéro, 1878.jpg` | Trichon (Brown University Library) | 1878, puupiirros | PD | 3121×2285 | Kaksi tornia, suihkulähde edessä, idealisoitu näkymä. |

```js
{ id: 'pariisi-kadonneet-1', tyyppi: 'kadonnut-nyt',
  parit: [
    { kohde: { kuva: { tiedosto: "Jean Alfred Desbrosses--ruins of the Palais d'Orsay.webp",
        lahde: { tekija: 'Jean Desbrosses', teos: "Ruins of the Palais d'Orsay", lisenssi: 'PD', muokkaus: 'rajaus sallittu',
                 linkki: 'https://commons.wikimedia.org/wiki/File:Jean_Alfred_Desbrosses--ruins_of_the_Palais_d%27Orsay.webp' } } },
      nimi: "Palais d'Orsay", lappu: { teksti: 'Orsayn museo' } },
    { kohde: { kuva: { tiedosto: "Palais de l'Industrie - Édouard Baldus.jpg",
        lahde: { tekija: 'Édouard Baldus', teos: "Palais de l'Industrie", lisenssi: 'PD', muokkaus: 'rajaus sallittu',
                 linkki: 'https://commons.wikimedia.org/wiki/File:Palais_de_l%27Industrie_-_%C3%89douard_Baldus.jpg' } } },
      nimi: "Palais de l'Industrie", lappu: { teksti: 'Grand Palais' } },
    { kohde: { kuva: { tiedosto: 'Le palais du Trocadéro, 1878.jpg',
        lahde: { tekija: 'Trichon', teos: 'Le palais du Trocadéro, 1878', lisenssi: 'PD', muokkaus: 'rajaus sallittu',
                 linkki: 'https://commons.wikimedia.org/wiki/File:Le_palais_du_Trocad%C3%A9ro,_1878.jpg' } } },
      nimi: 'Palais du Trocadéro', lappu: { teksti: 'Palais de Chaillot' } },
  ] }
```

## (f) Taulu ↔ maalari

Kolme taulua, jotka ovat Pariisin museoissa (Commons/en-Wikipedia) ja joista pelissä on jo juttu tai kuva. Ylärivi KUVA (taulu, 2D), lappu = maalarin nimi (teksti). 3D-mallia ei ole eikä tule; tyyppi toimii kuvakehyksellä.

| # | Taulu | Maalari | Museo (lähde) | Pelissä jo | Lisenssi |
|---|---|---|---|---|---|
| 1 | Impression, soleil levant (1872) | Claude Monet | Musée Marmottan Monet, Pariisi (en-Wikipedia "Impression, Sunrise": "usually displayed" siellä; lainassa Orsayssa heinäkuuhun 2024) | kuva + juttu "Monet 1874" | PD |
| 2 | Bal du moulin de la Galette (1876) | Pierre-Auguste Renoir | Musée d'Orsay (Commons-tiedoston oma huomautus: tämä on Orsayn versio; pelin Orsay-juttu nimeää teoksen) | juttu (nimeää teoksen), KUVAA EI vielä pelissä → yksi uusi tuonti | PD |
| 3 | Bastille en démolition (Bastiljin purun ensipäivät, 1789) | Hubert Robert | Musée Carnavalet, Pariisi (en-Wikipedia "Hubert Robert") | kuva + juttu "Bastilji" | PD |

Varalla: Edelfeltin Louis Pasteur (1885; PD; kuva jo pelissä) — museota en-Wikipedia ei vahvista (viittaa Orsay-sivuun mutta ei sano omistajaa) → ei Pariisin museotaulu ennen tarkistusta; plussana suomalainen maalari. Kuvan tiedot silti alla.

| Id | Tiedosto | Tekijä | Aika | Lisenssi | Koko | Näkyy |
|---|---|---|---|---|---|---|
| f1 | `Monet - Impression, Sunrise.jpg` | Claude Monet | 1872 | PD | 5773×4478 | Sinertävä satama, oranssi aurinko, veneet (jo pelissä). |
| f2 | `Pierre-Auguste Renoir, Le Moulin de la Galette.jpg` | Pierre-Auguste Renoir | 1876 | PD | 2200×1639 | Silmin katsottu 12.11. (700 px): ulkoilmatanssit, pariskunta vasemmalla, pöytäseurue oikealla, täplikäs valo puiden alla; tunnistettava Orsayn versio, ei vääristymiä. |
| f3 | `The Bastille in the first days of its demolition, by Hubert Robert.jpg` | Hubert Robert | 1789 | PD | 5162×3428 | Tornit pölyssä, purkajat edessä (jo pelissä). |
| f varalla | `Albert Edelfelt - Louis Pasteur - 1885.jpg` | Albert Edelfelt | 1885 | PD | 2082×2532 | Pasteurin muotokuva (jo pelissä). |

```js
{ id: 'pariisi-taulut-1', tyyppi: 'taulu-maalari',
  parit: [
    { kohde: { kuva: { tiedosto: 'Monet - Impression, Sunrise.jpg',
        lahde: { tekija: 'Claude Monet', teos: 'Impression, soleil levant (1872), Musée Marmottan Monet', lisenssi: 'PD', muokkaus: 'rajaus sallittu',
                 linkki: 'https://commons.wikimedia.org/wiki/File:Monet_-_Impression,_Sunrise.jpg' } } },
      nimi: 'Impression, soleil levant', lappu: { teksti: 'Claude Monet' } },
    { kohde: { kuva: { tiedosto: 'Pierre-Auguste Renoir, Le Moulin de la Galette.jpg',
        lahde: { tekija: 'Pierre-Auguste Renoir', teos: 'Bal du moulin de la Galette (1876), Musée d\'Orsay', lisenssi: 'PD', muokkaus: 'rajaus sallittu',
                 linkki: 'https://commons.wikimedia.org/wiki/File:Pierre-Auguste_Renoir,_Le_Moulin_de_la_Galette.jpg' } } },
      nimi: 'Bal du moulin de la Galette', lappu: { teksti: 'Pierre-Auguste Renoir' } },
    { kohde: { kuva: { tiedosto: 'The Bastille in the first days of its demolition, by Hubert Robert.jpg',
        lahde: { tekija: 'Hubert Robert', teos: 'Bastiljin purun ensipäivät (1789), Musée Carnavalet', lisenssi: 'PD', muokkaus: 'rajaus sallittu',
                 linkki: 'https://commons.wikimedia.org/wiki/File:The_Bastille_in_the_first_days_of_its_demolition,_by_Hubert_Robert.jpg' } } },
      nimi: 'Bastiljin purku', lappu: { teksti: 'Hubert Robert' } },
  ] }
```

Huomiot: Monet ja Renoir ovat samaa koulukuntaa (tyyli ei ratkaise paria; tehtävä on tietopeli); Hubert Robert erottuu aikakaudella. Pelin tekstissä Monet'n ja Renoirin nimet esiintyvät (Monet 1874 -juttu ja Orsay-juttu), joten tieto löytyy pelin sisältä.

## (i) Henkilö ↔ rakennus

Pelin jutuista (nahtavyysjutut.js) löytyvät nimetyt arkkitehdit: **Jacques-Germain Soufflot** (Panthéon-juttu), **Jules Hardouin-Mansart** (Invalidit-juttu: kuninkaan kirkko), **Victor Laloux** (Orsay-juttu: Gare d'Orsay), **Charles Garnier** (Palais Garnier), **Gustave Eiffel** (Eiffel-torni). Haussmann esiintyy jutuissa (Garnierin tontti), mutta hänen "rakennuksensa" on kaupunkirakenne (bulevardit), jolla ei ole mallia → pois. Eiffel–torni ja Garnier–ooppera ovat TRIVIAALEJA (nimi on rakennuksessa) → vain varalle.

Asettelu: ylärivissä rakennus (3D-malli pyörii), lappu = henkilön muotokuva + nimi (kuva).

| # | Rakennus (ylärivi) | Henkilö (lappu) | Malli | Lähde (pelin juttu) |
|---|---|---|---|---|
| 1 | Panthéon | Jacques-Germain Soufflot | 3D | Panthéon-juttu: "Soufflot'n suunnitteleman kirkon…" |
| 2 | Invalidit | Jules Hardouin-Mansart | 3D | Invalidit-juttu: kuninkaan oma kirkko, Hardouin-Mansartin suunnittelema; en-Wikipedia "Les Invalides": Hardouin-Mansart suunnitteli kupolikirkon 1676 |
| 3 | Orsayn museo (Gare d'Orsay) | Victor Laloux | 3D | Orsay-juttu: "Victor Laloux'n suunnittelema Gare d'Orsay" |
| varalla | Palais Garnier / Eiffel-torni | Charles Garnier / Gustave Eiffel | 3D / 3D | triviaaleja (sama nimi) |

### Kuvat (i)

| Id | Tiedosto | Tekijä | Aika | Lisenssi | Koko | Näkyy |
|---|---|---|---|---|---|---|
| i1 | `Jacques-Germain Soufflot (1713 -1780).jpg` | Louis-Michel van Loo (Louvre) | 1700-l maalaus | PD | 500×658 | Punaisessa samettitakissa, piirtää suunnitelmaa. |
| i2 | `Jules Hardouin-Mansart, Hyacinthe Rigaud.jpg` | Hyacinthe Rigaud | 1685 maalaus | PD | 470×624 | Pitkätukkainen mies, taustalla kupolirakennus. |
| i3 | `Déchenaud-Laloux.jpg` | Adolphe Déchenaud (1868–1929; Musée d'Orsay) | ennen 1929 | PD | 543×650 | Parrakas mies mustassa puvussa, rinnassa pieni punainen merkki. |
| i varalla | `Portrait de l'architecte Soufflot, D.2840.jpg` | André Pujos (Carnavalet) | 1700-l piirros | CC0 | 1244×1624 | vaihtoehtoinen Soufflot. |

```js
{ id: 'pariisi-arkkitehdit-1', tyyppi: 'henkilo-rakennus',
  parit: [
    { kohde: { malli: 'pantheon:Panthéon' }, nimi: 'Panthéon',
      lappu: { kuva: { tiedosto: 'Jacques-Germain Soufflot (1713 -1780).jpg',
        lahde: { tekija: 'Louis-Michel van Loo', teos: 'Jacques-Germain Soufflot', lisenssi: 'PD', muokkaus: 'rajaus sallittu',
                 linkki: 'https://commons.wikimedia.org/wiki/File:Jacques-Germain_Soufflot_(1713_-1780).jpg' } }, nimi: 'Jacques-Germain Soufflot' } },
    { kohde: { malli: 'invalides:Invalidit' }, nimi: 'Invalidit',
      lappu: { kuva: { tiedosto: 'Jules Hardouin-Mansart, Hyacinthe Rigaud.jpg',
        lahde: { tekija: 'Hyacinthe Rigaud', teos: 'Jules Hardouin-Mansart (1685)', lisenssi: 'PD', muokkaus: 'rajaus sallittu',
                 linkki: 'https://commons.wikimedia.org/wiki/File:Jules_Hardouin-Mansart,_Hyacinthe_Rigaud.jpg' } }, nimi: 'Jules Hardouin-Mansart' } },
    { kohde: { malli: '<Orsay-avain, PK vahvistaa>' }, nimi: 'Orsayn museo',
      lappu: { kuva: { tiedosto: 'Déchenaud-Laloux.jpg',
        lahde: { tekija: 'Adolphe Déchenaud', teos: 'Portrait de Victor Laloux', lisenssi: 'PD', muokkaus: 'rajaus sallittu',
                 linkki: 'https://commons.wikimedia.org/wiki/File:D%C3%A9chenaud-Laloux.jpg' } }, nimi: 'Victor Laloux' } },
  ] }
```

## Yhteenveto: mitä uutta tuotava / varmistettava
- **Uusia kuvia (jos tyypit otetaan käyttöön):** c1 (Orsay-raunio), c2 (Baldus), c3 (Trocadéro), f2 (Renoir), i1, i2, i3. Jo pelissä: f1, f3 (ja varalla Edelfelt). Kaikki PD tai CC0 (ei BY/BY-SA-vaatimuksia).
- **Faktaa tarvitaan:** Palais de Chaillot ei ole pelin jutussa (ainoa kolmikon kohta ilman omaa juttua); rivin fakta en-Wikipedia "Palais du Trocadéro".
- **PK vahvistaa:** mallit (Orsay-avain, Panthéon, Invalidit, Grand Palais) ovat samassa tilassa kehyksen puussa.
- **TARKISTETTAVAA:** Edelfeltin taulun museo (jos halutaan varalle), Tuileries-kuva (jos halutaan kolmanneksi c-pariksi Chaillotin sijaan).
