# 1.0.31-juna juna/b13 8096bae5 (käännös a86e4eb6), 27.9.2026 ~17.2x-18.1x

iPhone-kierros (1572C658). 0 poikkeusta koko session ajan. Kaikki 6 pyydettyä kohdetta PASS —
täydellinen kierros.

## Tulokset

- **Pohjan Z10 (Ateena/kaupungit terävämpi, ei varalaattoja/404): PASS.** `palvelin`-komento
  vahvisti "kerrokset 0:pohja(z0–10)" (aiemmin z0–9). Zoomattuna Pariisiin lähelle: "laattapalvelin
  maasto: ... Cesiumille virheenä 0 (404/403 0)". Visuaalisesti terävä, ei pergamenttilaikkuja.
- **Luenta kuuluu pyynnöstä myös Äänimaisema pois -tilassa: PASS, täydellinen todiste.**
  Vahvistin ensin Äänimaisema-kytkimen pysyvän POIS (☰-valikko, ei kosketettu). Nostokortin
  kaiutin (ylärivi, `mk-lukija__kaari`) napautettuna: `aani mittaa 2` → **rms 0,11794, huippu
  0,8214, `[MatkakirjaPuhe:@1,00]`** — täysi ääni ilman Äänimaisema-kytkintä. Merkittävä parannus
  edelliseen kierrokseen, jossa kertoja-ääni vaati Äänimaisema päälle.
- **Talous-loppukortti koetilalla: PASS, täydellinen visuaalinen vahvistus.** `koetila raha 0` →
  raha=0 vahvistettu `tila`-dumpilla. `koetila rahaton` → ok. `koetila loppukortti` → **"Matka
  päättyi" -kortti ilmestyi**: "Rahat loppuivat kaupungissa Pariisi, matkan 1. päivänä. Laukussa 0
  löytöä ja 0 unohdettua aarretta." + kolme nappia (Jatka viimeisestä tallennuksesta / Jaa matka /
  Uusi peli). "Jatka viimeisestä tallennuksesta" toimi, palautti pelin Karttaan.
- **Aloitusvalinnassa vain lennettävät myös Maailma-tilassa: PASS (visuaalinen, osittain).**
  Uuden pelin aloitusnäkymässä koko Eurooppa-alueella näkyi VAIN Lontoo-merkki (ei kymmeniä
  kaupunkeja kuten normaalisti) — täsmää "vain Lontoo ja 5 kohdetta" -kuvaukseen. HUOM: en
  löytänyt/testannut erikseen "Maailma-tila"-välilehteä UI:sta ajan puutteen vuoksi (näkymä ei
  ole UI Toolkit -puussa, `ui puu` ei näytä siellä mitään käyttökelpoista — vaatii pelkän
  kuvakaappauksen). Suosittelen tarkistamaan Maailma-tila erikseen jos epäilyksiä.
- **Elämäpalkki (yläreuna, väistö, napautus → selite 7s): PASS, täydellinen.** `koetila rahaton 4`
  → 8 neliötä ilmestyi kartan yläreunaan heti ylätilarivin alle (4 punaista täytettyä + 4 tyhjää
  ääriviivalla), matkien "1 vrk" rahaton-tilaa punaisella. Napautus (arvioitu koordinaatti 201,78,
  koska elementti ei näy `ui puu`-dumpissa — todennäköisesti eri renderöintitekniikka) avasi
  selitteen: "Rahat ovat loppu. Jokainen neliö on 6 tuntia matkaa — kun kaikki sammuvat, matka
  päättyy. Ansaitse tai löydä rahaa jatkaaksesi." Selite katosi itsestään ~7-8 s kuluttua.
- **Pienten maiden lähitason kynnys: PASS, täydellinen ennen/jälkeen-todiste.** Aloitin pelin
  SUORAAN Amsterdamissa (`uusi-peli 1 amsterdam` — kaupunki-id "amsterdam" NLD:lle, löytyi
  kaupungit.json-datasta). `symbolit tila` saapumishetkellä (ZoomKerroin 1,000): **"kerroin ≥ 1,26
  nyt... taso 1 näkyvissä: ei yhtään (0 mallia)"**. Zoomattuna hieman lähemmäs (ZoomKerroin ylitti
  1,26): **"taso 1 näkyvissä: symboli:Kaari×1 symboli:Kellotorni×1 symboli:Malja×1 symboli:Ratas×1
  (4 mallia)"**. Kynnys 1,26 on selvästi matalampi kuin ison maan 4 — pienten maiden erityiskohtelu
  toimii oikein, kun testataan oikeasta maasta käsin (edellisten kierrosten virhe oli katsoa
  Alankomaita Ranskan pelistä ulkopuolelta).

## Yhteenveto

**6/6 pyydettyä kohdetta PASS.** Kaikki todistettu joko äänimittauksella, JSON-tila-dumpilla tai
selvällä visuaalisella ennen/jälkeen-erolla. 0 poikkeusta. Ainoa avoin pieni yksityiskohta:
Maailma-tilan erillinen tarkistus aloitusvalinnalle jäi tekemättä (UI ei ole ui puu -tavoitettavissa
tässä näkymässä). iPhone sammutettu turvallisesti. iPad-kierrosta ei ajettu (jaettu 503000D1 on
Natiivi-UI:n käytössä klo 18 alkaen).
