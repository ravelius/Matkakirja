# Karttaseppä: luovutus 9.11.2026 klo 21.44 (KS)
Syy: konteksti yli 25 % (hook), pehmeä raja. Korvaa -1831:n. Vanhemmat luovutukset historiaa.
`T=/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/` · `K=$T/pelin-koko-talot/`

## VALMIIT TÄSSÄ VUOROSSA (kaikki PT:n kuittaamia)
- Natiivi 9be5c8e2e (tietonapautus) junassa 224 (f89d62d0e). Ajot katsottu: nimet-3, nimet-4 (ND:n laatikon sisäpisteet eivät avaa ND:tä ✓, Forum pohjoisesta ✓), lontoo-kyltit + kensington (3/3 ✓). Kuvat `$T/nostot-korostetut-20261109/*-1000/`.
- Havainto PK:lle viety (PT): saman kohteen 2. avaus → palkissa ▷, puhe ei ala (lukija, ei KS:n).
- Työlista: "Lontoon kumpu" merkitty valmiiksi (kaikki tehty 7.11., junassa 220→224); "Muut Euroopan pääkaupungit" tilanne päivitetty.

## TYÖN ALLA: PELIN KOKO, OSA 2 TALOT PALVELIMELLE (vetäjä KS; PT 21.3x; suunnitelma /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261109-pelin-koko.md – lue)
Tehty:
1. **Natiivihaara karttaseppa/talot-palvelimelle** (natiivi-backup, worktree /Users/Shared/Claude/wt/proto-karttaseppa-talot, juna 224 b804a87d6 päällä), unity-tarkistus sh 0:
   - 0a6c8f264: `tyokalut/talot_paketti.py` (lähde → julisteet/talot/tiedostot/<sha256>.gz + <kaupunki>/v<N>/hakemisto.json + SHA256SUMS + KOKO.txt; --edellinen = päivityskoko; --buildiin), hakemistot `Assets/StreamingAssets/talot/{pariisi,lontoo}.json` (+ metat), Rakennus.cs KopioiTalopalat → KopioiUlkoesineet (talokopio ja .valmis pois, hakemistojen tarkistus).
   - 94b11251a: Lähteet-rivi "Kaupunkien 3D-talot" (© OpenStreetMap contributors; Pariisin korkeudet IGN BD TOPO®; ODbL, Licence Ouverte 2.0) + ui.fi.json-avain. Kartan kulman © OpenStreetMap oli jo (KrediititTiivis).
   - **EI JUNAAN ENNEN NS:n LUKIJAA** (TaloKerros lukee vielä Data/Raw/talopalat → ilman lukijaa build on taloton).
2. **PR ravelius/Matkakirja#6523** (haara karttaseppa/tf-talot-hakemisto, worktree wt/karttaseppa-tf-talot): TF-tarkistus hyväksyy talot/<k>.json TAI vanhan talopalat/*.valmis. Yhdistä, kun checks vihreät (sidottu tähän sessioon).
3. Koepaketit `$K/koe-pariisi-v1` (219 palaa, 95,9 Mt; purettuna 352) ja `$K/koe-lontoo-v1` (242, 95,6 Mt; 309). Toistuva (sama syöte → samat sha:t). Esimerkki talokorjauksesta: v21-koe12 → v22-lahi = 12 palaa, 8,7 Mt (`$K/koe-v22-vs-v21/KOKO.txt`). Koepaketit EIVÄT ole vientiin: lopullinen paketti `_valmiit/talot-<k>-v1/` vasta kun NS:n lukija toimii Macilla.
4. **Rajapinta NS:lle** `$K/RAJAPINTA.md` (palvelin julisteet/talot/, buildiin hakemisto, laitteella .gz ilman iCloudia, Esilataaja: saapumisalue Nakyva/SeuraavaRuutu, muu Joutilas; kehityksen `talot kansio` ennallaan). Lähetetty NS:lle (local_0f7f169f-…) 21.4x; **vastaus odottaa**: kuittaus + kumman haaran päälle.

Auki (järjestyksessä):
a. NS:n vastaus rajapintaan → yhdistä haarat (NS:n lukija + 94b11251a) → Mac-esikatselu Lontoossa (ei Pariisin iPad-ajoja ennen "Pariisi valmis").
b. **JU:lta kysytty 21.4x:** osan 1 poistolista (vanhat Pariisin pohjakuvat 192 Mt + simulaattorin mallit 117 Mt) → vahvista, ettei mikään käytössä oleva lähde (grep natiivin Resources-viittaukset). Lisäksi **pienen iPadin jakosivun sijainti** → tarkista OSM-tunnustus siellä ennen ensimmäistä vientiä; jos puuttuu, lisää.
c. Lopullinen paketti `_valmiit/` + JU vie vain uusiin polkuihin (julisteet/talot/ on tyhjä, 404 tarkistettu).
d. Valmis-rivi KK:lle + PT:lle: ladattava, asennettu, talokorjauksen päivityskoko ennen/jälkeen (nyt koko peli 834 Mt ladattava / 2 023 asennettu → talot −191 / −661). Pienen iPadin tallenne suunnitelman mukaan, vain omistajan ollessa studiolla.

## Vahdit (viritä uudelleen)
- Postilaatikko: Monitor `/bin/zsh $T/postilaatikko-vahti.sh` (30 min; käsitelty e123c0b10).
- Ajovahti: ei ajoja jonossa.

## LISÄYS 21.5x (luovutuksen jälkeen)
- **NS kuittasi RAJAPINTA.md:n** (KS:n muoto voittaa). NS:n poikkeamat hyväksytty: laitekansio persistentDataPath/talot + SetNoBackupFlag; siivous käynnistyksessä buildin hakemistojen mukaan.
- **UUSI HAARA (käytä tätä): karttaseppa/talot-palvelimelle-ns e5f6fcf72** = NS:n lukija natiiviseppa/talolataus 5a04c09f4 + KS:n kaksi committia (c0fb9da69, e5f6fcf72), natiivi-backupissa, unity-tarkistus sh 0. JU yhdistää yhtenä NS:n kanssa. Vanha karttaseppa/talot-palvelimelle 94b11251a korvattu.
- NUI (local_4b84cd90-…) tekee Offline-karttoihin talot: vastattu (lista buildin StreamingAssets/talot/<k>.json, pariisi=FRA lontoo=GBR, kutsu NS:n lataajaa, alueen poisto poistaa kaupungin palat NS:n funktiolla).
- **JU:n poistolista (osa 1) VAHVISTAMATTA:** /Users/Shared/Claude/julkaisija-tyokalut/pelin-koko-osa1-poistolista.md (A/H/I/J siirto pois Resourcesista, C–G pois vain laitekäännöksistä; kysymys: sacre-coeur-portaat astc-verkko 4 kt). Tarkistusagentti jäi kesken nollauksessa → tee uudelleen (Sonnet-Explore: Nahtavyysalue.cs 159–254 ja 1434, koepohja/koemalli-komennot, testit) ja vastaa JU:lle (local_2a7d6c96-…) "OK" tai korjaukset.
- **Jakosivu** /Users/Shared/Claude/proto-3d/jako/index.html (JU kirjoittaa käsin joka käännökseen): EI ODbL-tunnustusta → JU:lle pyydetty pysyvä rivi (ks. viesti 21.5x); tarkista, että se on sivulla ennen talojen vientiä.
