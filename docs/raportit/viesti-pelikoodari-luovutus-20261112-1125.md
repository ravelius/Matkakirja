# Pelikoodari: luovutus 12.11.2026 klo 11.25 (Raamattu 7.37)

Edellinen luovutus: viesti-pelikoodari-luovutus-20261112-1012.md (2da0d64dd). Sen kohdat 1–3 on tehty (alla), kohta 4 on ennallaan.
Ei agentteja käynnissä. Työkopiot (/Users/Shared/Claude/wt): proto-pelikoodari-kameralaite, -pistekaarella, -v133d, -b1, pelikoodari-luovutus-1012.

## 0. TEHTY TÄSSÄ VUOROSSA (älä toista)

### Kameran toisto jaolla (KK 09.30 kohdat 3–4 + 09.53 päätös 1)
- Haara: natiivi-backup kameralaite/pala-2.
  - bf20268d5: Seurantaohjaaja.LeikkausSyy (alku / hyppy / U); C3 jakaa U-leikkaukset laukaisijan mukaan.
  - f3b1f67d1: tarkka < 0,3 -selitys.
- Raportti: /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/kameralaite/TULOS-toisto-jako-1059.md. Lähetetty KK:lle 10.59 ja PT:lle.
- Tulokset:
  - Lattia 3,3: T14 FAIL (1,49 / 1,50), L-rikkeet 0 / 36, pisin peitto 0,48 s.
  - Lattia 3,6: T14 OK, L-rikkeet 0 / 32, pisin peitto 0,55 s.
  - Hyppyleikkauksia 0. U-leikkauksia 421: ympäri 382, kaksi käännöstä 22, yksi käännös 17.
  - Risteysten 11 hyppyä eivät leikkaa, joten 1,60 / 1,37 m:n lähteitä ei korjata.
  - Suositus: lattia 3,6. **ODOTTAA KK:N SANAA.**
  - Jos KK valitsee 3,6, vaihda SeurantaAsetus-konstruktorin oletus dTavLattiaVara = 0.3 → 0.6 (Seurantaohjaaja.cs rivi 66) ja C3_VARA-oletus Vara() KameraToistoTestit.cs:ssä.

### Otteen pito (KK 09.53 päätös 2)
- Haara: pala-2 e3e6e75b9. Unity 0 virhettä, Linssit-testit 2324/2324.
- Muutokset:
  - JuoksuSeurantaKamera.OteKuva: laite kohti vanhan kameran asentoa ruudun ajassa; ohjaajaa ei askelleta.
  - JuoksuV4Maailma: uusiOte (kiinni tai loppukortti, ei maali).
  - Testi T14OtteenPito.
- Mac-pari tilattu JU:lta 11.15: sk-ote-vanha.txt ja sk-ote-uusi.txt kansiossa _tyo/pelikoodari/kameralaite.
  - **ODOTTAA JU:N POLKUJA.** Kun tulevat: rinnakkaisleike + arkki + kameraruutu-rivit KK:lle (karkea kuva KK:lle, PT kopiona).
- KK 10.40 -havainnot on raportoitu samassa viestissä (raportti TULOS-ote-ja-havainnot.md):
  - Kumpikaan ei ole otteessa.
  - Uusi löydös: jalat kuvan ulkona noin 0,2 s lähes joka U-leikkauksen jälkeen. Koko toistossa 145 s (lattia 3,3) / 127 s (3,6), pisin 0,71 s.
  - Mittarit lisätty: C3-rivi "jalat kuvan ulkona" ja KuvausHavainnot (MITTAUS=kuvaus).
  - KK:lta kysytty, korjataanko leikkausasento seuraavaksi. **ODOTTAA KK:TA.** Älä korjaa ennen sanaa.

### Tausta v133e (luovutuksen kohta 3)
- Haara: natiivi-backup pelikoodari/tausta-v133d @ 8c0caf4d8. Junaan ei vielä.
- Kulkukartta ajettu uudelleen: kulkukartta/v133e.log; kuljettavaa −32,8 / +1,2 m², esineitä 109 → 106.
- Peli-testit 930/931. LinjatOikeallaKartalla on sama vika kuin v133d:llä; v133e ei vaikuta siihen.
- Syy: v133d:n kulkumuutos pohjassa (−84,8; 292,7) kaventaa siemen 1:n osan 7 4,25 → 1,75 m. Botti lähtee siksi uudelle polulle, jossa reittipari hyppää 6,2 m pohjassa (−72,6; 191,5). Siellä ei ole kulkumuutosta, joten vika on reittigeneraattorin leveän alueen jatkossa.
- Työkalu: /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/kulkukartta/reitti/ (ReittiVertailu.cs + aja.sh <wt> <JuoksuKulku.bytes> [siemen]; c/d/e.txt = v133c/d/e).
- LAV:lta kysytty 11.25, onko kavennus K1:n tarkoituksellinen. **ODOTTAA LAV:IA.** Sitten korjaus reittigeneraattoriin (leveä alue, jatkon sivu), ennen junasanaa.

## 1. SEURAAVA TYÖ (järjestyksessä)
1. KK:n sana lattiasta (3,3 / 3,6) → oletuksen vaihto pala-2:ssa + toisto uudelleen.
2. JU:n ote-pari → KK:lle.
3. Kolme pahinta (a)-ikkunaa KK:lle:
   - siemen 1 t 202,3, siemen 11 t 172,1 ja siemen 8 t 177,3
   - kaikilla L 0 ja peitto 0; a / j / ω c3-vara-*.txt:ssä
   - tarvittaessa C3Sarja tai Mac-kuvat JU:lta.
4. KK:n sanalla leikkausasennon korjaus (jalat kuvaan U-leikkauksessa).
5. LAV:n vastaus → LinjatOikeallaKartalla: leveän alueen jatko reittigeneraattorissa.

## 2. B1 (botti maali) ennallaan
natiivi-backup pelikoodari/seinat-taso1-v133c @ a405aeb07, odottaa KK:n junasanaa.

## LISÄYS 11.3x: viestit luovutuksen jälkeen (EI VIELÄ KÄSITELTY, toimi näiden mukaan; kohdan 1 järjestys korvautuu)
- KK 11.03 PÄÄTÖS: lattia 3,6 on työarvo → vaihda oletus (pala-2: Seurantaohjaaja.cs rivi 66 dTavLattiaVara 0.6 + Vara()-oletus 0.6) ja aja T14/C3.
  - Risteysten 11 hyppyä: kohta SULJETTU.
  - Lopullinen "kytkin pois" vasta Mac-parista.
- KK 11.19 PÄÄTÖS: otteen pito HYVÄKSYTTY koodina. Havainnot t 33,36 / 53,07 on selitetty. **KORJAA LEIKKAUSASENTO ENSIN**: leikkaus laskeutuu suoraan asentoon, jossa jalat ovat kuvassa ensimmäisestä ruudusta; ei korjausliikettä jälkeenpäin. Ehdot (koko toisto, lattia 3,6):
  1. jalat ulkona ≤ 0,5 s leikkauksesta = 0 s (nyt 85 s)
  2. kulmanopeus 0,5 s leikkauksen jälkeen ei kasva (ei nyökkäystä)
  3. T14 ja ahtauden luvut eivät huonone, leikkauksia ei tule lisää
  4. kerro, mistä loput noin 40 s jalat ulkona tulee (pisin 0,71 s sivureunalla, siemen 2 t 139), ja ehdota korjausta, mutta ÄLÄ korjaa.
  - Sitten kolme pahinta (a)/(b)-ikkunaa ahtaasta ja Mac-pari, jossa on yksi U-leikkaus.
  - Pariin KK:lle myös pisin peitto (siemen 10 t 133,2) ja KK:n havainnot (pari-2:n jalat 4 ruutua, pari-1 74–75 s kulma). YKSI koottu viesti.
- JU 11.2x: ote-pari e3e6e75b9 on jonossa → lokit/pelikoodari-ote-{vanha,uusi}-e3e6e75b9 + rinnakkaisleike ± 8 s + arkki. JU lähettää polut; vie KK:lle (KK haluaa sen).
- KK 11.3x: Raamatun kortti matkustus-ja-reitit (PR 6611) on Pelikoodarin vastuulla. Tarkista työn väliin: `node tools/kirjaa.mjs lue matkustus-ja-reitit` (kansio /Users/Shared/Claude/Matkakirja-fable).
  - Vastaa KK:lle yhdellä viestillä (≤ 8 riviä), koodista tarkistettuna:
    1. koskeeko sääntö 12 (kaksitaso matalalla kartan yllä) kaikkia lentoja vai vain saapumis- ja aloituslentoa
    2. onko kaupunkien välisillä lennoilla yhä oma aurinko pelin kellonajan mukaan ja sininen taivas (vanha 2.163)
    3. väärät tai puuttuvat säännöt (hinnat säännössä 3, automaattinen noppa säännössä 4)
    4. mitkä lennon kuvakulmat ovat voimassa (KK lisää ne kamera-korttiin).
- LAV 11.3x: kohdan (−84,8; 292,7) kavennusta EI ollut tarkoitettu. v133c → v133d -ero palassa 1-3:
  - K4: 2 uutta V4_lattia-kolmiota y 0, kärjet (−91,43; 291,74), (−83,07; 291,93), (−80,81; 294,19), (−82,23; 294,48), eli täsmälleen kavennuksen kaistale.
  - K1: kivireunuksen alakärjet → −0,02, pysty 0,32 m, z 294,15–294,48, x −82,4…−78,3.
  - K1: 8 m:n kalteva suikale (−90,16; 291,77)–(−82,23; 294,48), kärki 0,19 → −0,02.
  - LAV kysyy, kumpi on syy kulkukartassa: uusi lattia y 0 reunuksen vieressä vai kalteva suikale. Tarkista kulkukartta.py:n tulkinta (esim. katoavat.py / kartta_koe.py) ja vastaa LAV:lle. LAV korjaa geometrian v134:ään; reittigeneraattoria ei korjata, jos syy on geometria.
