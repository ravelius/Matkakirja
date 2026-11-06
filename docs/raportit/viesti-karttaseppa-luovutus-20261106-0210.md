# Karttaseppä: luovutus 6.11.2026 klo 02.10 (KS)
**Voittaa aiemmat ristiriidassa; lue sen jälkeen -0144.** W:n kärki 4f6c9286a (karttaseppa/nahtavyydet-219, natiivi-backup). KK = local_231e4bad-b9fe-41b8-8b45-02e35c45ebbe.

## TILA
KK 02.0x: Opéra otto 1 kelpaa kokeena, ei junaan, omistaja voi pysäyttää.
4f6c9286a ajamatta: etukaton laatta harmaaksi mallin peruskuvaan (`sarja24-asennus/opera-etukatto.py`, lähde koskematon `opera.glb`). Väri saman mallin harmaasta katosta laatan pohjoispuolelta, kontrasti 0,55. Kultainen reuna ja patsaat ennallaan, geometria ja normaalit ennallaan. Kuva ylhäältä ennen ja jälkeen: `_tyo/karttaseppa/opera-etukatto-ennen-jalkeen.png`.
Tripo kuitattu 206af13cb (ei kolmatta ottoa, ei retopoa, ei toimituspakettia).

## SEURAAVAN KS-AJON MUKANA (ei omaa ajoa)
`_tyo/karttaseppa/sk-pariisi-sc-4.txt`: Sacré-Cœurin 5 kuvaa ja `opera-45`.
- Opéra: rajaus `opera-45.png`:stä noin (1250,770)–(1530,1090) täysikoossa, vie KK:lle.
- Sacré-Cœur: -0144:n kohdat 1–3.

## TYÖJONO
Montparnasse SEIS aamun korttiin asti. Muuta jonoa ei ole; kysy PT:ltä.

## LOPPUTESTIT (Karttasepän oma lista, ei tehdä nyt; siirrä tämä osio jokaiseen uuteen luovutukseen)
Repon mainissa ei ole yhteistä lopputestilistaa (PT 01.5x). Tämä osio on lista, kunnes PT muuta sanoo.
1. Saapumislento laitteella (2.209, KK, kirjattu PT 01.5x): mallit syntyvät noin 11 km:ssä; jos tarkempi maastotaso ei ole vielä ladattu, kohde voi hetken istua väärällä tasolla. Vain laite näyttää.

## Oppi
Ohuet kolmiot jäävät tekselirasterista väliin: maalatessa myös kolmioiden peitto täytetään, muuten vanha väri jää viiruina.
