# Kreikan piilotuslista (GRC App Store), Sisältökirjuri 12.10.2026

PT/omistaja 12.10.: Kreikan valtion muistomerkkien kuvat, havainnekuvat ja 3D-opas piiloon vain Kreikan App Storessa (Raamattu #4493, perustelu `kreikka-kulttuuriperintolaki-20261012.md`). Koneluettava lista natiiville: `kreikka-piilotuslista-20261012.json` (muoto `{"alkiot":[{"maa":"GRC","kohteet":[...]}]}`; kohdetyypit `opas:`, `tehtava:`, `kuva:`). Ei oikeudellinen neuvo; rajaus on varovainen: mukana kaikki, joissa Kreikan valtion omistama muistomerkki tai museoesine on kuvan aihe.

## Päälista (74 kohdetta)
- **Opas:** `opas:ateena`, `opas:kreeta` (Kreeta mukana, koska opas kulkee Knossoksen, Koulesin linnoituksen ja Heraklionin muurien kautta; kuvat `data/oppaan-kuvat/kaupungit/ateena.json` ja `kreeta.json` poistuvat oppaan mukana, joten niille ei ole omia `kuva:`-rivejä).
- **Aarretehtävät:** `tehtava:ateena:katso` (Zeuksen temppeli, katso ja löydä -kuvakohde). `tehtava:ateena:aikajana` EI ole listalla (PT 12.10.: laki koskee kuvia, ei tekstiä; aikajanassa ei ole kuvia).
- **Kuvat, Ateena:** neljä herokuvaa (Akropolis, Parthenon, Zeuksen temppeli, Panathinaiko), Hefaistoksen temppeli, Akropolis Hymettos-vuorelta, Ateena yöllä (Akropolis), Parthenonin länsijulkisivu, Herodes Atticuksen odeion, Kallimarmaron stadion, 1890-luvun photochrom (Akropolis ja Theseion), Akropolis Monastirakin aukiolta, karyatidit (Akropolis-museo), Tuulten torni (2), Akropoliin oliivipuu, Nike-temppeli (2), Syntagman metron arkeologinen kokoelma, Propylaia, Akropolis (Athens-13), Erekhtheion, Panathinaikon panoraama, Parthenon etelästä, Zeuksen temppeli (2), Pnyxin Bema.
- **Kuvat, Kreeta:** Koulesin linnoitus ja Rethymnonin linnoitus (herokuvat), Knossoksen rauniot ja pohjoinen sisäänkäynti, härkähyppyfresko (Heraklionin museo), Faistoksen levy, Koules-valokuva.
- Tiedostonimet ovat Commons-nimiä alaviivoin ilman päätettä (herokuvilla polku `herokoe/…`). Kohdat löytyvät paketeista `kulttuuri-kategoriat.js`, `nahtavyysjutut.js`, `maa-kategoriat.js`, `europe-valokuvat.js`, `fokusvirta-ateena.js` ja `fokusvirta-kreeta.js`.

## Laajennus 12.10. (kaikki Kreikan muistomerkkisisältö)
- **Tiedostot ja paketit:** `fokuskohteet-grc.js` (Delfoi, Epidauros, Olympia, Knossos, Marathon, Antikythera-kone, Parthenon, Olympieion, Hefaistoksen temppeli, Thessalonikin Rotunda), `europe-puzzles.js` (Parthenonin pylväikkö, korinttilainen kapiteeli, karyatidi), `maa-kategoriat.js` (Propylaia), `maakartat.js` (Meteora), `kohtaamiset` / `ihmeet` (pelin omat loistoaikakuvat: Delfoi, Olympieion, Korintin Apollon temppeli, Heraion) ja Kreikan kartan nostokuvat `karttanostot/20260920/grc-nosto-<paikka>-*.jpg`.
- **Nostokuvat (polkuosa, kaikki hash-versiot):** arkeologiset kohteet, linnoitukset ja luostarit: Bassae, Delos, Heraion, Pella, Philippi, Vergina, Sounion, Thermopylai, Samothrake, Meteora, Arta (silta), Monemvasia, Navarino sekä Korintin Apollon temppeli. Rajaus on paikan mukaan; kuvia ei ole katsottu yksitellen.
- **Intron Ateena:** `kuva:saapumisintro/ateena/` piilottaa koko Ateenan introsarjan (kuvat 5, 7 ja 8 esittävät Akropoliksen; kuvat 4 ja 6 piiloutuvat samalla, mikä on vaaraton ylipiilotus). Toimitusta ei ole vielä tullut.
- **Korvaavat kuvat:** ei korvaajia; piilotettu nosto näytetään tekstinä ilman kuvaa. Mahdollinen korvaus (maisemakuva ilman muistomerkkiä) tehdään myöhemmin PT:n pyynnöstä.
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
