# Natiivi-UI:n luovutus 24.9.2026 (klo 00)

Jatkaa luovutusta `viesti-natiivi-ui-luovutus-20260923-yo.md`. Proto-git:
`/Users/Shared/Claude/proto-3d/Matkakirja-proto`, Natiiviseppä mergeää ja tekee `.meta`t editorissa.
Käännöstarkistus `./Peli-testit/unity-tarkistus.sh`, testikomennot `UI/UiKomennot.cs`:n alun kommentissa.

## Tila

**Kaikki Natiivi-UI:n haarat ovat masterissa** (d4493df), avoimia merge-pyyntöjä ei ole, erä-worktreet
on poistettu. Mitään ei ole ajettu Unityssä eikä laitteella tässä sessiossa: kaikki on vain käännöstarkistettu.

Tämän session erät (masterissa):
- Nähtävyydet ja kohdekartta, vertailuarkin maakäyrät, lehden fokustehtävät ja pullavinkki
- Omistajan aloituskaava: portti → lähtövalinta pallolta (Karttapisteet `aloitus:<id>`, suora valinta
  ilman vahvistusta) → aloituslento (Natiivisepän Nappula.AloitusLento, Pelikoodarin AloituslentoAlkoi/
  -Paattyi) → avausteksti matalana kaistaleena lennon aikana; lennolla ei matkakirjakorttia eikä luentakuvia
- Vaaka-asennon yläpalkki ja väkäsnappi (myös iPad vaakana), Livian avausesittely
- Sähkelinja ja sähketehtävä (SahkeKortin kentät Pelikoodarilta), kukkaroleiman selitteet
- KortinLukija (kaiutin nostokortteihin), pulun "Avaa juttu", linssin hampurilainen ja varusteiden esikatselu
- Oma DC-3-lentokone (Kartta/Malli, Blender-skripti Lahde~/dc3.py, CC0)
- "Mitä uutta" + "Peli päivittyi" (muutosloki-natiivi + osoittimen sisältörivi, versio + build;
  BuildNumeroSilta Natiivisepältä)
- Matkakirjakortin kaikki webin polut ja "Katso kuva"; skeeman 1.24 saapumistekstit
- Kaupunkikortin nostohaitari, kelausrivit, lisäkaupungin kortti; turisti-info-rajapinta poistettu (web: ei merkkiä)
- Palaute- ja ehdotuskanava, kuvavinkki, pro-osio (iOS-kuvanvalitsin Pelikoodarilta)
- Täkynostot, syvennystarinat, "Koe ihme", Livian leikekirja (takynostot-kokoelma, kaupungin pooli)
- Aarteen paljastus webin mukaan, reaktiot (sydän / peukku alas / virheilmoitus)
- Pelitehosteet ja lentomoottori (Pelikoodarin Tehostetaulu), pulun tasot −21 dB, LRU-suoja, äänten ajoitus
  (dieLand onLand, aarreääni kuvan noustessa)
- Offline-lataus: vain "Kaikki" ja maanosat (OfflineMaa.Manner, maailma-osa vain Kaikissa)

## Odottaa muita

- **Ehdotusworkerin natiiviportti** (web-PR #3003, Pelikoodari → Julkaisija, worker julkaistaan käsin):
  ennen sitä palaute, ehdotukset, kuvavinkki, pro ja reaktiot saavat 403.
- Ei mitään muuta avointa Natiivi-UI:lle; Siirtosepän 1.23/1.24-erät on kytketty.

## Inventaario

Fable kirjasi 30/71 ennen tämän illan loppuerää; sen jälkeen tehty palaute (6 riviä), täkynostot/syvennys/ihme/
leikekirja (6), paljastus, reaktiot, tehosteet, Mitä uutta + Peli päivittyi, offline. Tila-osiot:
`nappi-inventaario-natiivi-20260923.md` "Tehty (24.9. yö)" ja "Ei webissä, odottaa omistajaa". Taulukon rivien
Tila-sarake on osin vanha; osiot ovat ajan tasalla.

### Seuraavat 10

1. "Liiku" (kompassi, kulkutapaliuku) webin kulun mukaiseksi (osio 6; PK)
2. "Lentäen" → ✈-kohdemerkit kartalla ja kamerasovitus (NS + NUI)
3. "Vaihda matkustustapa" kesken reitin (PK:n rajapinta ensin)
4. Lähteet-dialogi: nimikilpi ja koko lähdeluettelo linkkeineen (Tietoja.cs; SS: lahteet-data)
5. Kohdekortin kierros: pelin sisäinen kehys, "Avaa selaimessa ↗", ✕ (nyt ulkoinen linkki)
6. Pulun chat: sanelu (mikrofoni) ja "Kirjoita kysymys" (PK: iOS-puheentunnistus)
7. Pulun chat: "Ehdota sisältöä" ylärivissä (yksi rivi: `ui.Palaute.Avaa()`), linssin valmiit kysymykset (LS)
8. "Ehdota tallennettavaksi" (poiminta)
9. Tiedeliite: "Lue juttu", ✕, ☰ sisällys, keksijät ‹ ›, karuselli, kuvan suurennus (LS, SS)
10. Aikajanalinssit: kortit → keksintö, lappukahva "Näytä X", löytöpaikan kehys → nosto (LS)

Tarkistettava: "Maiden lehdet" -nappi (kartta-lataus.js on vanhan kartan; todennäköisesti ei tarvita pallolla).

## Sähkenäkymät

Valmiit ja masterissa: kaveriapu (KysymysNakyma), sähkeliuska ja retkikunta (SahkeNakyma), pöllön
sähketehtävä (Sahketehtava.cs; kaupunki, hakemistomaa ja nappitekstit SahkeKortista). Puuttuu: kirjoituskoneen
naksutus (ei ääniassettia), kysymysrivin alleviivausanimaatio.

## Kuvasarjat Laitetestaajalle (kaikki `ui aloita pariisi` jälkeen, ilman ääniä)

- Aloitus: `ui aloitus valinta` (pallo, kultapisteet, Livian avaus `ui livia avaus nollaa`), `ui aloitus lento`
  (avausteksti pysty + vaaka), oikea lento: uusi matka → Ateena (DC-3, savujana, ei korttia päällä)
- `ui ylapalkki vaaka` + `ui ylapalkki auki` · `ui mitauutta` · `ui mitauutta paivittyi` · `ui offline demo`
- `ui nahtavyydet firenze` (+ kokoruutu) · `ui kaupunki pariisi nostot` · `ui lisakaupunki lyon`
- `ui matkakirja tanger havainto` · `ui matkakirja managua saapuminen` · `ui matkakirja bergen reitti`
- `ui nosto kohde:thessaloniki@GRC` → LISÄÄ (kaiutin, reaktiot) · `ui nosto nosto:sofia-korut` ·
  `ui nosto syvennys:ateena-nike` · `ui ihme` · `ui leikekirja delfoi@GRC`
- `ui paljastus isoAarre` · `ui paljastus pollo` · `ui reaktio lehti venetsia` · `ui reaktio virhe`
- `ui sahketehtava sofia tyhja|ohi2|pullat|osui|lahetetty` · `ui sahke liuska|apu|uusi|jasen`
- `ui palaute palaute|ehdotus|kuvavinkki|pro|periaate` (ei lähetä)
- `ui linssi valikko keksinnot` · `ui linssi varusteet satelliitti` · `ui linssi vertailu FIN SWE ITA JPN`
- `ui lehti fokus ateena [juliste]` · `ui pulu juttu firenze`
- Äänikierros erikseen (omistajan ikkunan ulkopuolella): `ui tehoste lista`, `ui tehoste correct`,
  `ui lentoaani alku 6`, `ui noppa 5` (dieLand ensimmäisessä osumassa)

## Sopimukset

- Sääntö (omistaja 23.9.): mitä webissä ei ole → ei tehdä, kysytään Fablelta, kirjataan inventaarion osioon.
- Fablen käskyt sitovat Raamatun linjausten sisällä; omistajalta kysytään vain Raamatun listaamat asiat.
- Rajapinnat: UiPalvelut (Offline, KarttaValot, ValoNapautettu), MitaUutta.BuildNumero (Natiiviseppä),
  Palautekanava.Kuvanvalitsin (Pelikoodari), Aloitusnakyma.LuentaPelilta (Pelikoodari asettaa).
