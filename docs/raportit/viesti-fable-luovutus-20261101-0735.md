# PT:n luovutus 1.11.2026 klo 07.35

Edellinen: viesti-fable-luovutus-20261101-0515.md. Osoitteet: /Users/Shared/Claude/osoitekirja.md. Viestit aina send_message id:llä.
YÖLUPA (KK 23.42) voimassa aamuun: ei ostoja, ei uusia pysyviä poistoja, ei asetuksia/avaimia/CLAUDE.md.
Kellonaika: tarkista `date` ennen aikaleimoja (tällä vuorolla viestien ajat 06.0x–07.1x olivat osin liian myöhäisiä).

## JUNA 216 (runko 655f80e81, NS; testit vihreät)
Rungossa: GC-kevennys 1, Pariisin uusi kartta + nimiökorjaukset, Pariisin lähin taso (1,5 km iPad / 1,0 km puhelin; 0,75 km vain
tarkkuusalueella, lippu TarkkuusPalatPelissa=false), taivas 8192 (VS, 64 Mt, ei nykäystä), muurikate-v36, tausta-v89f (maaliportin
sauma korjattu, PT kuittasi kuvasta), edusta-v3 (Chaofangin nollat korjattu, PK:n pari puhdas), maaliovien koodi (ab0c93256).
Ehdot ennen TF:ää (julkaisu vain omistajan pyynnöstä):
1. PARIISI (KK): 0,5 m/px -keskusta. Erä 1 (9 palaa) PT:n hyväksymä; loput 26 tilattu Codexilta (postilaatikko b9ba46ec6).
   KS: kerros 0,5 m 35/35 valmis, maamerkit ennallaan (Louvre 1,34× terävä), palikka dbe7e3777 rungossa. Kun palat tulevat:
   KS tarkistaa → PT → KS kääntää lipun true → NS käännös → L1/L2 (Notre-Dame, Louvre) KK:lle → juna-ehto 1 täyttyy.
2. VALO (KK): räystäiden alusvarjo. VS:n b2 (leivonnan venytys) HYLÄTTY: vahvistaa tekselilaikut (näkyvät kaukokuvassa).
   PT:n linja: varjostimessa pehmeä pystygradientti räystäslinjasta (ylin ~1/4 → 0,65, liuku 1:een) kerrottuna leivotun päälle.
   VS tekee b3:n → PT kuittaa → NS runkoon. Täyttöpeitto p4 oletuksena (friisin mustat pois).
3. LAV leivonta v4 + SOLU_LIMA=0.003 (PT:n päätös, kaikki rakennukset) käynnissä: 42/136 klo 07.2x, vahti pid 46916.
   Mukana Meridiaaniportin ovet (ovi_V/ovi_O, PT kuittasi kuvan). Jonossa: kaiteeton c2 LIMA-uusinta, muurikate-v37
   (marmorikaide nurinpäin). Jokainen paketti: PT tarkistaa SHA → JU vie ämpäriin → PK kytkee polun → NS runkoon.
4. REITTI (PK): KK kuittasi c5j:n toiminnan. Omistajalle vasta v4-valolla: reaaliaikainen tallenne (ei diaesitys; sivueunukin
   ennakoitavuus, kameran pehmeys, ovien aukeaminen maalissa).

## LEVY
Lokit kertyvät sisälevylle (~1 Gt/ajo, esikatselu-/pari-/todistus-*). Siirsin 22 Gt T7:lle linkein: tools/levy/siirra_lokit_t7.py
(--aja; kansiot, joihin ei koskettu 2 h). Levy 85 Gi klo 06.2x. T7:llä vapaata ~100 Gi (3,6 Ti) → kerro omistajalle, kun < 50.

## MUUT
- PR 5817 (Pariisi web) ja 5821 (offline-maasto 10-29) mergetty; 09-24-maasto jää ämpäriin (TF 215).
- Nollattu tällä vuorolla: LAV ×3, VS, KS, PK, NS, Postivahti itse.

## Säännöt, jotka opin
- Kuittauksen yhteydessä pyydä JU:lta vienti samassa viestissä (edusta-v3 jäi viemättä → PK sai 404).
- Kuittaa sauma/korjaus vasta pelikuvasta, ei paketin kuvauksesta (v89e kuitattiin liian aikaisin).
- Omistajan aiemmat päätökset (esim. lähin zoom 0,75 km 30.10.) tarkista lokista, kun KK kysyy "onko tämä tehty".
