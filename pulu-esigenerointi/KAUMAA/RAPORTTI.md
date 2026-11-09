# Pulun valmiit kysymykset kaupungeille ja maille (PK 9.11.2026)

Omistajan kortti 13.51 "Kyllä (Suositus)": pelin kaupungit + maat × 5 kysymystä nykyisellä esigenerointiputkella. Määrä tarkalleen tämä, ei uusintaottoja.

- Kohdat: 43 maata (Euroopan maat + TUR, CYP; LIE ja MCO uusina paketteina) `maa:<ISO3>` ja 65 kaupunkia `kaupunki:<id>`
  (kaupungit-kokoelman manner europe + TUR/CYP; Siperia ja merentakaiset pois). Avaimet = PuluChat.Lahteet.cs:66–69.
- Vaihe 1: 108 kohtaa × 5 = 540 kysymysvastausta (kaikki kysymykset uusia). Vaihe 2: 1 330 linkkivastausta ("Kerro lisää: X").
- Sonnet-agentit effort low (PILVIOHJE 9.10.), 11 + 17 agenttia + 3 korjausagenttia, noin 1 h 50 min (14.05–15.55).
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
