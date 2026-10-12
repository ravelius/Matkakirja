# Aarretehtävien kokeilu: Ateena, Pariisi, Tukholma (Sisältökirjuri 12.10.2026)

Omistaja 12.10. ("Joo"): vähemmän muistitietovisaa, enemmän tehtäviä, joiden vastaus löytyy kaupungista. Sisältö koneluettavana: `aarretehtavat-kokeilu-20261012.json` (Pelikoodari/NUI/LS1 toteuttavat kehityslipun taakse; omistaja näkee pelikuvat ennen vientiä). Kaanon: kohtaamishenkilö ei tunnista Horatiota (tarina.md 7.9.); faktat tarkistettu kahdesta lähteestä (liite).

## Tehtävät kaupungeittain

Tehtävä **a = KATSO JA LÖYDÄ** (napauta kohde kaupunkinäkymästä; vihjelause kuuluu henkilölle) ja **b = yksi kolmesta tyypistä**. Kullekin: vihje väärän vastauksen jälkeen (henkilön äänellä) ja lyhyt "tiesitkö".

| Kaupunki · henkilö | a) Katso ja löydä | b) Toinen tehtävä |
|---|---|---|
| **Ateena** · marmorikonservaattori Dafni (saapumispiste Akropolis) | Vihje: "Yhden temppelin pylväs makaa yhä maassa, sillä myrsky kaatoi sen vuonna 1852." → **Zeuksen temppeli** (620 m) | **AIKAJANA**: Parthenon (438 eaa.) → Zeuksen temppeli (n. 131 jaa.) → ensimmäiset nykyajan olympialaiset Kallimarmarolla (1896) |
| **Pariisi** · bukinisti Colette (Quai de Montebello) | Vihje: "kirkko, jonka kärkitorni romahti 2019" → **Notre-Dame** (120 m) | **ARVIO** liukusäätimellä: "Kuinka monta vihreää kirjalaatikkoa bukinistit pitävät Seinen rannoilla?" oikea 900, hyväksyttävä 700–1 100 (säädin 100–2 000) |
| **Tukholma** · lyhdynsytyttäjä Astrid (Skeppsbronin laituri) | Vihje: "linna, joka nousi vuonna 1697 palaneen Tre Kronorin paikalle" → **Kuninkaanlinna** (410 m) | **SALAKIRJOITUS**: "CHZH", avain 7 (Tre Kronorin palopäivä 7.5.1697, löytyy a:n "tiesitkö"-selityksestä), siirto taaksepäin → **VASA** |

Kohteet ovat kohdekarttojen (KAUPUNKIKARTAT) kohteita samoilla nimillä ja koordinaateilla; saapumispisteenä on kohtaamispisteen arviokoordinaatti (Wikipedia). Kaikki tekstit (vihjelause, vihje, tiesitkö) JSON:ssa, ≤ 160 merkkiä.

## Kerääntyvä arvoitus (ehdotus)

Jokainen ratkaistu kaupunki antaa **palan isoisän sivusta**: kolmikaistainen sivu, jossa Foggin kynäpiirros Kolme veljestä -riipuksesta (Codexin luonnos, jonka omistaja on nähnyt) ja yksi arvoitusrivi:

1. **Ateena** (vasen kaistale): "Ensimmäinen veli nukkuu kivessä, jonka mittaaja tuntee."
2. **Pariisi** (keskikaistale): "Toinen veli kulkee sivulta sivulle, kunnes joku avaa sen oikeasta kohdasta."
3. **Tukholma** (oikea kaistale): "Kolmas veli odottaa luukun takana, ja vastaus tulee vasta, kun kysyt."

Kun kaikki kolme on ratkaistu, sivu täydentyy ja loppuarvoitus aukeaa: *"Kolme kulmaa, yksi sydän. Kun veljet kohtaavat, keskellä loistaa se, mitä ei ole kukaan kantanut yli kolmeensataan vuoteen."* Kolme palaa = kolme veljestä; kuva ja rivit eivät paljasta riipuksen yksityiskohtia, joiden lähteet ovat epävarmat (ei värejä eikä karaatteja). Vaihtoehto: kirjain per kaupunki; ei suositella (ei tue aarteen tarinaa).

## PT:n päätettäväksi
1. Tyyppijakauma (Ateena aikajana, Pariisi arvio, Tukholma salakirjoitus) on kokeilua varten; haluatko kolme samaa tyyppiä?
2. Arvio: Pariisin luku 900 on lähteissä 900–1 000 (hyväksyttävä väli 700–1 100 kattaa).
3. Salakirjoituksessa käytetään A–Z (ei å/ä/ö); VASA on yksi sana, jonka voi purkaa kynällä.
4. Tukholmalla ei ole fokusvirran kohtaamishahmoa; Astrid on kaaren henkilö (lyhdynsytyttäjä). Pelikoodari päättää, mistä kortista Astrid puhuu.

## Liite: faktatarkistus (Sonnet, 2 lähdettä/väite)
OK: Olympieion 15 pylvästä + yksi kaatui 1852, pylväät ~17 m (korkeammat kuin Parthenonin), rakennus alkoi 500-luvulla eaa. ja valmistui Hadrianuksen aikana (131/132 jaa.); Parthenon valmistui 438 eaa. (koristeet 432 eaa.); Kallimarmaro marmoriseksi 144 jaa. (stadion alun perin 300-luvulta eaa.), ainoa kokonaan marmorinen stadion, olympialaiset 1896; Notre-Dame 1163–1345 (182 v), kärkitorni (flèche) romahti 15.4.2019, avattu uudelleen 7./8.12.2024, sijaitsee Île de la Citéllä; bukinistit ~900–1 000 laatikkoa, >3 km (3–4 km lähteittäin), myyjiä 217–240; Tre Kronor (Kolmen kruunun linna) paloi 7.5.1697, nykyinen kuninkaanlinna (Tessin nuorempi) rakennettiin sen paikalle ja on kuninkaan virallinen residenssi; Vasa upposi 10.8.1628 ~1 300 m satamasta, nostettiin 24.4.1961. Korjattu tekstiin: "keskitorni" → "kärkitorni", "Gamla Stanin suurin rakennus" jätetty pois (ei lähdettä), 1754 ei väitetä valmistumisvuodeksi. Koordinaatit (Wikipedia): Olympieion 37.96937, 23.73308; Parthenon 37.9715, 23.7266; Notre-Dame 48.85306, 2.35; Quai de Montebello 48.85194, 2.34944; kuninkaanlinna 59.32694, 18.07167; Skeppsbron 59.32361, 18.07528.
