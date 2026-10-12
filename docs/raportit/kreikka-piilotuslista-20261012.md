# Kreikan piilotuslista (GRC App Store), Sisältökirjuri 12.10.2026

PT/omistaja 12.10.: Kreikan valtion muistomerkkien kuvat, havainnekuvat ja 3D-opas piiloon vain Kreikan App Storessa (Raamattu #4493, perustelu `kreikka-kulttuuriperintolaki-20261012.md`). Koneluettava lista natiiville: `kreikka-piilotuslista-20261012.json` (muoto `{"alkiot":[{"maa":"GRC","kohteet":[...]}]}`; kohdetyypit `opas:`, `tehtava:`, `kuva:`). Ei oikeudellinen neuvo; rajaus on varovainen: mukana kaikki, joissa Kreikan valtion omistama muistomerkki tai museoesine on kuvan aihe.

## Päälista (38 kohdetta)
- **Opas:** `opas:ateena`, `opas:kreeta` (Kreeta mukana, koska opas kulkee Knossoksen, Koulesin linnoituksen ja Heraklionin muurien kautta; kuvat `data/oppaan-kuvat/kaupungit/ateena.json` ja `kreeta.json` poistuvat oppaan mukana, joten niille ei ole omia `kuva:`-rivejä).
- **Aarretehtävät:** `tehtava:ateena:katso` (Zeuksen temppeli), `tehtava:ateena:aikajana` (Parthenon, Zeuksen temppeli, Kallimarmaro).
- **Kuvat, Ateena:** neljä herokuvaa (Akropolis, Parthenon, Zeuksen temppeli, Panathinaiko), Hefaistoksen temppeli, Akropolis Hymettos-vuorelta, Ateena yöllä (Akropolis), Parthenonin länsijulkisivu, Herodes Atticuksen odeion, Kallimarmaron stadion, 1890-luvun photochrom (Akropolis ja Theseion), Akropolis Monastirakin aukiolta, karyatidit (Akropolis-museo), Tuulten torni (2), Akropoliin oliivipuu, Nike-temppeli (2), Syntagman metron arkeologinen kokoelma, Propylaia, Akropolis (Athens-13), Erekhtheion, Panathinaikon panoraama, Parthenon etelästä, Zeuksen temppeli (2), Pnyxin Bema.
- **Kuvat, Kreeta:** Koulesin linnoitus ja Rethymnonin linnoitus (herokuvat), Knossoksen rauniot ja pohjoinen sisäänkäynti, härkähyppyfresko (Heraklionin museo), Faistoksen levy, Koules-valokuva.
- Tiedostonimet ovat Commons-nimiä alaviivoin ilman päätettä (herokuvilla polku `herokoe/…`). Kohdat löytyvät paketeista `kulttuuri-kategoriat.js`, `nahtavyysjutut.js`, `maa-kategoriat.js`, `europe-valokuvat.js`, `fokusvirta-ateena.js` ja `fokusvirta-kreeta.js`.

## Harkinnanvaraiset (PT päättää; ei päälistassa)
| Kohde | Syy |
|---|---|
| `hero-kreeta-aamu` (Arkadin luostari), `Kreta (GR), Amnatos, Kloster Arkadi -- 2023 -- 8553` | kirkon omistama historiallinen kohde; valtion muistomerkkistatus epävarma |
| Chania Old Harbour (Venetsialaissatama), Pyhän Menaksen tuomiokirkko, Morosinin suihkulähde | kaupunkimaisemaa ja kirkkoja; valtion muistomerkkejä ehkä, ei antiikkia |
| Tzistarakis mosque in Athens (James Skene, 1839 vesiväri) | vanha maalaus muistomerkistä (kuva PD) |
| National Observatory of Athens (2 kuvaa), Numismatic Museum (Iliou Melathron) | 1800-luvun rakennuksia, omistus/suojelu epäselvä |
| Spyridon Louis 1896 (3 PD-valokuvaa, Kallimarmaro taustalla) | historiallisia valokuvia, stadion sivuosassa |
| Idaean Cave panorama | arkeologinen luola (pyhäkkö), luontokohde |
| Isoisän päiväkirjakuvat `matkakirja-eurooppa-1873-ateena/kreeta-…-paper…`, Pulun kamerakuvat `pulu-cam-ateena-01`, `pulu-cam-kreeta-01` | tarkistettava katsomalla, esittävätkö ne muistomerkin (pelin omia kuvia) |

## Huomioita
1. **Kolme veljestä -arvoitus:** palat ovat `ateena:aikajana`, `pariisi:arvio`, `tukholma:salakirjoitus`. Jos `tehtava:ateena:aikajana` piilotetaan GRC:ssä, arvoitus ei voi valmistua Kreikan kaupassa: piilota koko arvoitus `kolme-veljesta` GRC:ssä tai siirrä pala 1 toiseen tehtävään (PT/Pelikoodari).
2. **Saapumisintron pilotti (tilattu Codexilta):** Ateenan kuvat 5, 7 ja 8 esittävät Akropoliksen/Parthenonin; jos ne tulevat, ne lisätään tähän listaan (`kuva:ateena-…`). Kuva 4 (Plakan katu) ja 6 (kahvi) eivät.
3. **Laajat aarretehtävät:** kun Ateenan/Kreetan tehtävät kirjoitetaan, muistomerkkiaiheiset lisätään `tehtava:`-riveinä; Ateenan a-tehtävä Plakassa tai kahvilla ei ole muistomerkki.
4. **Web-versio:** lista koskee vain natiivia GRC-storefrontia (omistajan päätös); selainversion sisältö ei muutu.
