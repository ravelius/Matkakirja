# Kreikan piilotuslista (GRC App Store), Sisältökirjuri 12.10.2026

PT/omistaja 12.10.: Kreikan valtion muistomerkkien kuvat, havainnekuvat ja 3D-opas piiloon vain Kreikan App Storessa (Raamattu #4493, perustelu `kreikka-kulttuuriperintolaki-20261012.md`). Koneluettava lista natiiville: `kreikka-piilotuslista-20261012.json` (muoto `{"alkiot":[{"maa":"GRC","kohteet":[...]}]}`; kohdetyypit `opas:`, `tehtava:`, `kuva:`). Ei oikeudellinen neuvo; rajaus on varovainen: mukana kaikki, joissa Kreikan valtion omistama muistomerkki tai museoesine on kuvan aihe.

## Päälista (75 kohdetta)
- **Opas:** `opas:ateena`, `opas:kreeta` (Kreeta mukana, koska opas kulkee Knossoksen, Koulesin linnoituksen ja Heraklionin muurien kautta; kuvat `data/oppaan-kuvat/kaupungit/ateena.json` ja `kreeta.json` poistuvat oppaan mukana, joten niille ei ole omia `kuva:`-rivejä).
- **Pallokierros (PT 14.10.):** `pallokierros:ateena` (Ateenan kuumailmapallokierros kokonaan: kerronta, historiaosiot ja niiden kuvat, kierroksen valinta; sisältö `docs/kohtaukset/pallokierros/ateena-*-20261014.*`). Tunnistemuoto `pallokierros:<kaupunki>` ehdotus, NS/LS1 vahvistaa. Akropolis-museo ei ole kierroksella (piilotetaan oppaalta erikseen).
- **Karttamalli:** `maamerkki:ateena` (kartan Ateenan Akropolis-malli, Kartta/Maamerkit FBX, 3D-kuvaus; NS 12.10.).
- **Aarretehtävät:** `tehtava:ateena:katso` (Zeuksen temppeli, katso ja löydä -kuvakohde). `tehtava:ateena:aikajana` EI ole listalla (PT 12.10.: laki koskee kuvia, ei tekstiä; aikajanassa ei ole kuvia).
- **Kuvat, Ateena:** neljä herokuvaa (Akropolis, Parthenon, Zeuksen temppeli, Panathinaiko), Hefaistoksen temppeli, Akropolis Hymettos-vuorelta, Ateena yöllä (Akropolis), Parthenonin länsijulkisivu, Herodes Atticuksen odeion, Kallimarmaron stadion, 1890-luvun photochrom (Akropolis ja Theseion), Akropolis Monastirakin aukiolta, karyatidit (Akropolis-museo), Tuulten torni (2), Akropoliin oliivipuu, Nike-temppeli (2), Syntagman metron arkeologinen kokoelma, Propylaia, Akropolis (Athens-13), Erekhtheion, Panathinaikon panoraama, Parthenon etelästä, Zeuksen temppeli (2), Pnyxin Bema.
- **Kuvat, Kreeta:** Koulesin linnoitus ja Rethymnonin linnoitus (herokuvat), Knossoksen rauniot ja pohjoinen sisäänkäynti, härkähyppyfresko (Heraklionin museo), Faistoksen levy, Koules-valokuva.
- Tiedostonimet ovat Commons-nimiä alaviivoin ilman päätettä (herokuvilla polku `herokoe/…`). Kohdat löytyvät paketeista `kulttuuri-kategoriat.js`, `nahtavyysjutut.js`, `maa-kategoriat.js`, `europe-valokuvat.js`, `fokusvirta-ateena.js` ja `fokusvirta-kreeta.js`.

## Laajennus 12.10. (kaikki Kreikan muistomerkkisisältö)
- **Tiedostot ja paketit:** `fokuskohteet-grc.js` (Delfoi, Epidauros, Olympia, Knossos, Marathon, Antikythera-kone, Parthenon, Olympieion, Hefaistoksen temppeli, Thessalonikin Rotunda), `europe-puzzles.js` (Parthenonin pylväikkö, korinttilainen kapiteeli, karyatidi), `maa-kategoriat.js` (Propylaia), `maakartat.js` (Meteora), `kohtaamiset` / `ihmeet` (pelin omat loistoaikakuvat: Delfoi, Olympieion, Korintin Apollon temppeli, Heraion) ja Kreikan kartan nostokuvat `karttanostot/20260920/grc-nosto-<paikka>-*.jpg`.
- **Nostokuvat (polkuosa, kaikki hash-versiot):** arkeologiset kohteet, linnoitukset ja luostarit: Bassae, Delos, Heraion, Pella, Philippi, Vergina, Sounion, Thermopylai, Samothrake, Meteora, Arta (silta), Monemvasia, Navarino sekä Korintin Apollon temppeli. Rajaus on paikan mukaan; kuvia ei ole katsottu yksitellen.
- **Intron Ateena:** `kuva:saapumisintro/ateena/` piilottaa koko Ateenan introsarjan (kuvat 5, 7 ja 8 esittävät Akropoliksen; kuvat 4 ja 6 piiloutuvat samalla, mikä on vaaraton ylipiilotus). Toimitusta ei ole vielä tullut.
- **Korvaavat kuvat (PT 12.10. 17.3x/17.5x):** jokaiselle tyhjäksi jäävälle kansi- ja avauskuvapaikalle (Ateenan 10, Kreetan 2) on valittu monumentiton Commons-kuva (satama, rantakatu, ranta, katu, puisto, raitiovaunu), jossa EI näy yhtään muistomerkkiä, ei edes taustalla; jokainen kuva katsottu. JSON-listassa kohde on muodossa `{"tunnus":…,"korvaava":"https://…"}` (+ tekijä, lisenssi, lähde; CC BY -kuvat vaativat nimeämisen lähdeluetteloon). Samoja kuvia käytetään useammalla paikalla (Zea, Mikrolimano, Vouliagmeni, Pireus, Glyfada, Kansallispuisto, raitiovaunu, Elafonisi, Preveli):

| Piilotettu tunnus | Korvaava Commons-kuva | Tekijä | Lisenssi |
|---|---|---|---|
| `kuva:herokoe/hero-ateena-akropoliskallio` | [Marina_Zeas_-_panoramio.jpg](https://commons.wikimedia.org/wiki/File:Marina_Zeas_-_panoramio.jpg) | Mister No | CC BY 3.0 |
| `kuva:herokoe/hero-ateena-aamu` | [Mikrolimano_(3792336834).jpg](https://commons.wikimedia.org/wiki/File:Mikrolimano_%283792336834%29.jpg) | Francisco Restivo from Porto, Portugal | CC BY 2.0 |
| `kuva:herokoe/hero-ateena-keskipaiva` | [Vouliagmeni_beach.JPG](https://commons.wikimedia.org/wiki/File:Vouliagmeni_beach.JPG) | C messier | CC0 |
| `kuva:herokoe/hero-ateena-ilta` | [Piraeus_Harbour_Sunset_(53812534106).jpg](https://commons.wikimedia.org/wiki/File:Piraeus_Harbour_Sunset_%2853812534106%29.jpg) | Mustang Joe | CC0 |
| `kuva:Atenas,_03` | [Lazaraki_Street_in_Glyfada_city_Athenian_Riviera.jpg](https://commons.wikimedia.org/wiki/File:Lazaraki_Street_in_Glyfada_city_Athenian_Riviera.jpg) | Cypkipras55 | CC0 |
| `kuva:The_Acropolis_from_Mount_Hymettus_on_February_9,_2020` | [National_Garden_of_Athens%2C_20240531_1540_9794.jpg](https://commons.wikimedia.org/wiki/File:National_Garden_of_Athens%2C_20240531_1540_9794.jpg) | Jakub Hałun | CC BY 4.0 |
| `kuva:Athens_at_night_on_September_28,_2022` | [Piraeus_Harbour_Sunset_(53812534106).jpg](https://commons.wikimedia.org/wiki/File:Piraeus_Harbour_Sunset_%2853812534106%29.jpg) | Mustang Joe | CC0 |
| `kuva:The_West_Facade_of_the_Parthenon_on_May_19,_2020` | [Tram_TA20049_at_Syntagma_Square.jpg](https://commons.wikimedia.org/wiki/File:Tram_TA20049_at_Syntagma_Square.jpg) | Sv1xv | CC BY 4.0 |
| `kuva:Odeon_of_Herodes_Atticus_2019` | [Marina_Zeas_-_panoramio.jpg](https://commons.wikimedia.org/wiki/File:Marina_Zeas_-_panoramio.jpg) | Mister No | CC BY 3.0 |
| `kuva:The_Panathenaic_Stadium_in_Athens_on_2_October_2018` | [Mikrolimano_(3792336834).jpg](https://commons.wikimedia.org/wiki/File:Mikrolimano_%283792336834%29.jpg) | Francisco Restivo from Porto, Portugal | CC BY 2.0 |
| `kuva:herokoe/hero-kreeta-keskipaiva` | [Greece_Crete_Elafonisi_Beach_The_Sun_Holidays.jpg](https://commons.wikimedia.org/wiki/File:Greece_Crete_Elafonisi_Beach_The_Sun_Holidays.jpg) | jarekgrafik | CC0 |
| `kuva:herokoe/hero-kreeta-ilta` | [Palm_beach_Preveli_on_Crete%2C_Greece.jpg](https://commons.wikimedia.org/wiki/File:Palm_beach_Preveli_on_Crete%2C_Greece.jpg) | dronepicr | CC BY 2.0 |


- **Ei mukana (luonto, kaupunki, ruoka):** Santorini, Olympos-vuori, Vikos, Samaria, Navagio, Kerkini, Prespa, Pelion, Korfu, Chios, Milos, Metsovo, Naoussa, Ioannina, Syros, Thessalonikin kaupunkimaisemat ilman muistomerkkiä, oliivit, venekuva.
- **Kuvaton oppaan Thessaloniki:** `data/oppaan-kuvat/kaupungit/thessaloniki.json` ei ole sallituissa 3D-kaupungeissa (opas ei avaudu), joten ei `opas:thessaloniki`-riviä; sen kuvat piiloutuisivat joka tapauksessa oppaan mukana.

## Harkinnanvaraiset (PT päättää; ei päälistassa)
| Kohde | Syy |
|---|---|
| `hero-kreeta-aamu` (Arkadin luostari), `Kreta (GR), Amnatos, Kloster Arkadi -- 2023 -- 8553` | kirkon omistama historiallinen kohde; valtion muistomerkkistatus epävarma |
| Chania Old Harbour (Venetsialaissatama), Pyhän Menaksen tuomiokirkko, Morosinin suihkulähde | kaupunkimaisemaa ja kirkkoja; valtion muistomerkkejä ehkä, ei antiikkia |
| Tzistarakis mosque in Athens (James Skene, 1839 vesiväri) | vanha maalaus muistomerkistä (kuva PD) |
| National Observatory of Athens (2 kuvaa), Numismatic Museum (Iliou Melathron) | 1800-luvun rakennuksia, omistus/suojelu epäselvä |
| Spyridon Louis 1896 (3 PD-valokuvaa, Kallimarmaro taustalla) | historiallisia valokuvia, stadion sivuosassa |
| Korintin kanava (Corinth Canal), Meteora-luostarit nostokuvissa Athos / Kalavryta / Missolonghi, Argos 1867, Mont Taygète 1831 | kanava ja maalaukset: valtion omistus/muistomerkkistatus epäselvä; Athos ja Kalavryta ovat luostariyhteisöjä |
| Idaean Cave panorama | arkeologinen luola (pyhäkkö), luontokohde |
| Isoisän päiväkirjakuvat `matkakirja-eurooppa-1873-ateena/kreeta-…-paper…`, Pulun kamerakuvat `pulu-cam-ateena-01`, `pulu-cam-kreeta-01` | tarkistettava katsomalla, esittävätkö ne muistomerkin (pelin omia kuvia) |

## Huomioita
1. **Kolme veljestä -arvoitus:** pala 1 (`ateena:aikajana`) pysyy mukana GRC:ssäkin, koska aikajana on tekstitehtävä (PT 12.10.). Jos Ateenan `katso`-tehtävä piilotetaan, se ei kuulu arvoituksen paloihin.
2. **Saapumisintron pilotti (tilattu Codexilta):** Ateenan kuvat 5, 7 ja 8 esittävät Akropoliksen/Parthenonin; jos ne tulevat, ne lisätään tähän listaan (`kuva:ateena-…`). Kuva 4 (Plakan katu) ja 6 (kahvi) eivät.
3. **Laajat aarretehtävät:** kun Ateenan/Kreetan tehtävät kirjoitetaan, muistomerkkiaiheiset lisätään `tehtava:`-riveinä; Ateenan a-tehtävä Plakassa tai kahvilla ei ole muistomerkki.
4. **Web-versio:** lista koskee vain natiivia GRC-storefrontia (omistajan päätös); selainversion sisältö ei muutu.

## Päivitys 12.10. 17.5x: kartan symbolit ja Sokrates (PT:n kysymys)
1. **Kohdekartan piirretyt monumenttisymbolit.** Kaksi eri asiaa: (a) kartan **geneeriset kategoriasymbolit** (`js/fokusnosto-symbolit.js`: pylväs, lyyra, malja, portti jne., koodilla piirretyt 1800-luvun kaiverrustyyliä) EIVÄT esitä yhtään tiettyä monumenttia eivätkä toista sen todellista ulkomuotoa → laki ei koske niitä. (b) **Miniatyyripiirrokset** (`js/packs/miniatyyrit.js`, kuvat `assets/kartat/miniatyyrit/ateena-*.webp`) ovat kohdekohtaisia kuvauksia todellisista kohteista → ne ovat "kuvauksia" samalla tavalla kuin havainnekuvat, joten **8 Ateenan miniatyyriä lisättiin listalle**: antiikin agora, Akropolis, Zeuksen temppeli, Kallimarmaro, Akropolis-museo, Niken temppeli, Iliou Melathron, Elginin marmorit (tunnus `kuva:miniatyyrit/ateena-<nimi>`; NS vahvistaa tunnistemuodon). Harkinnanvaraisia (ei listalla): Diogeneen astia (antiikin pithos-astia), Syntagma-aukio, Lykavittos, Maratonhuijaus, Louis 1896 (ei muistomerkkejä tai maisema/henkilö). Kun miniatyyri piiloutuu, kohde näkyy kartalla geneerisellä symbolilla.
2. **Sokrates (rintakuvakuvake Egeanmerellä).** Ajattelijat-linssin Sokrates on 3D-mallinnus Tanskan SMK:n kipsivalosta KAS635 (roomalainen kopio Tusculumin hermasta, PDM; päätös 1.10.2026 `raamattu-loki/paatokset-2026-09.md`), ei Kreikan valtion omistama muistomerkki eikä kuvaus Kreikassa olevasta teoksesta → **ei kuulu Kreikan lain piiriin**; ei lisätty listalle. Varaus: en ole lakimies; jos halutaan äärimmäinen varovaisuus, kuvake voidaan piilottaa `ajattelija:sokrates`-tunnuksella.

## Päivitys 12.10. 19.4x (PT, NS Kreikka v2): miniatyyrien korvaajat
Ateenan kohdekartta jäi GRC:ssä tyhjäksi, kun 8 miniatyyriä piilotettiin. Jokaiselle on nyt `{"tunnus","korvaava"}` -korvaaja: pelin oma **yleinen kategoriasymboli** (generoitu kaiverruskuva `assets/kartat/symbolit/sym-<kategoria>.webp`, osoite `https://matkakirja.app/assets/kartat/symbolit/sym-<kategoria>.webp`; kuvat ovat jo pelin omia, ei uusia tiedostoja): antiikin agora, Akropolis, Zeuksen temppeli, Niken temppeli ja Iliou Melathron → **historia** (murtunut pylväs); Kallimarmaro → **urheilu** (laakeriseppele); Akropolis-museo ja Elginin marmorit → **kulttuuri** (lyyra). Kohteet näkyvät ja ovat napautettavissa. Sokrates-rintakuvakuvake jää näkyviin (SMK:n tanskalainen kipsivalos, ei Kreikan lain piirissä).
