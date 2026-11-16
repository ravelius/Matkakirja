# Pulun loppulauseet (PT 9.11.2026, pistokoe 2)

Kansio F = /Users/Shared/Claude/wt/pulu-kaupungit-maat/pulu-esigenerointi/KAUMAA/fakta. Käytä VAIN Read- ja Write-työkaluja.

Pulu on kyyhky, joka vastaa pelaajan kysymyksiin rennolla puhekielellä. Vastauksen alussa on lyhyt avaus ("Ai tota.", "No niin,")
ja lopussa usein yksi Pulun oma kommentti (kyyhkyn näkökulma, isoisän matka, lentäminen). Pistokokeessa osa näistä
loppulauseista oli irrallisia tai merkityksettömiä, esim.:
- "Pulla oli ehkä kuitenkin lampaasta unohtunut." (lohikäärmetarina: ei tarkoita mitään)
- "Tarkkoja tietoja asukasmääristä en ole varma." (asukasmäärää ei kysytty)
- "Siinä on minulle selvä ero ruokalajien välillä." (epäselvä)
- "Isoisäsi kantajan olisi pitänyt odottaa pari vuotta." (mihin viittaa?)
- "Hänen urastaan muuten en tiedä paljoa." (turha)

Tehtävä: lue F/loppu-N.txt kokonaan (45 vastausta; jos Read katkaisee, lue loput offset/limit-parametreilla, kunnes näet viimeisen
### -lohkon). Katso JOKAISESTA vastauksesta viimeiset 1–2 virkettä (ja avauslause, jos se on outo). Jos lause on
- merkityksetön, kieliopiltaan rikki tai epälooginen,
- irrallinen (puhuu asiasta, jota ei kysytty, tai epävarmuudesta, jota ei tarvita),
- viittaa johonkin, mitä pelaaja ei voi tietää (esim. "pari vuotta" ilman perustetta),
niin joko POISTA se tai kirjoita tilalle LYHYT, järkevä Pulun lause, joka liittyy vastauksen aiheeseen (kyyhkyn näkökulma käy).
Hyvät, ymmärrettävät loppukommentit jätetään rauhaan, vaikka ne olisivat leikillisiä. Älä muuta faktoja äläkä muuta lauseita.

Säännöt:
- VANHA on TARKKA katkelma vastauksesta merkki merkiltä (kopioi suoraan). Poistossa VANHA = koko poistettava virke, UUSI tyhjä.
- [[käsite]]-merkinnät eivät saa muuttua: jos poistettavassa virkkeessä on [[merkintä]], korjaa virke järkeväksi niin, että
  merkintä säilyy täsmälleen samana, äläkä lisää uusia [[ ]]-merkintöjä.
- Ei rivinvaihtoja (\n) uuteen tekstiin. Jos vastauksessa on \n\n ennen loppukommenttia, VANHA voi alkaa edellisen virkkeen
  viimeisestä sanasta (esim. "asiaan.\n\nPidän …") ja UUSI "asiaan. …".
- Ei metalauseita ("aineisto", "lähde", "konteksti").

Kirjoita F/loppukorjaukset-N.txt:
```
### v1-417
VANHA: Pulla oli ehkä kuitenkin lampaasta unohtunut.
UUSI: Kyyhky ei olisi moiseen lampaaseen nokkaansa koskenut.
SYY: merkityksetön loppulause
```
Viimeiseksi riviksi "LOPPU: tarkistettu <määrä> vastausta (v1-<ensimmäinen>…v1-<viimeinen>), korjauksia <määrä>".
Vastaa lopuksi yhdellä rivillä: erä, tarkistettu määrä, korjausten määrä.
