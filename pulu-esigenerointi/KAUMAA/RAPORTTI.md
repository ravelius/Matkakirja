# Pulun valmiit kysymykset kaupungeille ja maille (PK 9.11.2026)

Omistajan kortti 13.51 "Kyllä (Suositus)": pelin kaupungit + maat × 5 kysymystä nykyisellä esigenerointiputkella. Määrä tarkalleen tämä, ei uusintaottoja.

- Kohdat: 43 maata (Euroopan maat + TUR, CYP; LIE ja MCO uusina paketteina) `maa:<ISO3>` ja 65 kaupunkia `kaupunki:<id>`
  (kaupungit-kokoelman manner europe + TUR/CYP; Siperia ja merentakaiset pois). Avaimet = PuluChat.Lahteet.cs:66–69.
- Vaihe 1: 108 kohtaa × 5 = 540 kysymysvastausta (kaikki kysymykset uusia). Vaihe 2: 1 330 linkkivastausta ("Kerro lisää: X").
- Sonnet-agentit effort low (PILVIOHJE 9.10.), 11 + 17 agenttia + 3 korjausagenttia, noin 1 h 10 min (14.00–15.10).
- Tarkistukset: tarkista-era vaihe1 0 / vaihe2 0 virhettä; tarkista-valmis 5 "Euroopan ulkopuolinen linkki" = vääriä osumia
  (Perućica = Bosnian aarniometsä, "Peru"; Intian arkisto = Archivo de Indias Sevillassa, "Intia"); 42 varoitusta (maininnat tekstissä).
  Ensimmäisissä erissä 62 vastausta jäi 0–1 linkkiin → korjattu sulkeilla olemassa olevaan tekstiin.
- Faktat muistinvaraisia osin (aineistoa vain kaupungin/maan intro + katkelmat); epävarmat merkitty ("en ole varma", "noin").
  Pistokoe (Raamattu 2.31 Sisältökirjurin 30 vastausta) on PT:n päätös ennen vientiä.
- Paketit: haara pelikoodari/pulu-kaupungit-maat `pulu-esigenerointi/KAUMAA/vienti/pulu/vastaukset/v1/` ja kopio
  /Users/Shared/Claude/proto-3d/_valmiit/pulu-kaupungit-maat-vienti-20261109/ (44 tiedostoa, SHA256SUMS, 18 Mt). Pohja: ämpärin
  paketit 9.11. 14.0x; vanhat 1 584 kohtaa tavulleen ennallaan; maat.json: 43 maata, näiden versio 202611091313.
- Huom. putki: lataa-data.sh lukee nyt sisältöversion osoittimesta (v625 poistunut ämpäristä); valmistele.mjs vaihe1k.

## Esimerkit
1. kaupunki:pariisi – "Mitä Notre-Dame de Paris -kirkolle tapahtui vuonna 2019?" → "No niin, tää oli vakava päivä. Notre-Damen katto
   syttyi tuleen huhtikuussa 2019 … [[Île de la Citén]] saarella …"
2. maa:FIN – "Kuka kokosi Kalevalan ja mistä se kertoo?" → "Ai tota, tän minä tiedän. Kalevalan kokosi lääkäri ja kielentutkija
   [[Elias Lönnrot]], joka kiersi [[Karjalassa]] ja Kainuussa …"
3. kaupunki:lontoo – "Miksi Lontoossa on kaksi keskustaa?" → "Odotas vähän, tää on mielenkiintoinen. … City of London on vain 2,9
   neliökilometrin kokoinen alue … [[Englannin pankki]] …"

## Faktatarkistus PT:n pistokokeen jälkeen (9.11.2026)
- PT:n pistokoe (10/30 virheellisiä, 3 vakavaa) → listatut 10 korjattu paikallaan (`fakta/korjaukset-pistokoe.txt`).
- Kaikki 540 + 1 330 vastausta tarkistettu 21 Sonnet-agentilla (`fakta/FAKTAOHJE.md`, `fakta/era-N.txt` → `fakta/korjaukset-N*.txt`):
  198 korjausta + 1 tuplaväli, joista agenttien mukaan noin 70 väärää faktaa, loput epävarmojen lukujen pehmennyksiä, liioittelua ja
  kielivirheitä. Ei uusia ottoja; korjaus vain lauseen osaan (`tools/pulu-esigenerointi/korjaa-kaumaa.py`: katkelma täsmälleen kerran,
  [[linkit]] ennallaan; hylättyjä 0). Yksi agentin "linkkivirhe" (Michele Besson) on oikea genetiivi, ei muutettu.
- tarkista-valmis: samat 5 tunnettua väärää osumaa (Perućica, Intian arkisto) kuin ennen, 42 varoitusta (maininnat).
- Paketit koottu uudelleen (yhdista-kaumaa.mjs, pohja ämpärin maat.json ennallaan): vanhat kohdat tavulleen ennallaan, 108 uutta kohtaa.
  Kopio /Users/Shared/Claude/proto-3d/_valmiit/pulu-kaupungit-maat-vienti-20261109-2 (SHA256SUMS 44 tiedostoa). Uusi pistokoe 30 → PT.
