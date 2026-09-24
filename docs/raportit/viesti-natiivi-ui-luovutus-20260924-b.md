# Natiivi-UI:n luovutus 24.9.2026 (b)

Jatkaa luovutusta `viesti-natiivi-ui-luovutus-20260924.md`. Proto-git on `/Users/Shared/Claude/proto-3d/Matkakirja-proto`,
ja Natiiviseppä mergeää ja tekee `.meta`t. Käännöstarkistus: `./Peli-testit/unity-tarkistus.sh` ja `python3 tyokalut/uss-tarkistus.py`.
Uusi apuri `Rakenne.Olio(x)` korvaa kutsun `MiniJson.Objekti`, joka heittää poikkeuksen nullista. Käytä UI:ssa aina `Rakenne.Olio`a.

## Tila

Masterin kärki on **07bc3e4**. Kaikki tämän session erät ovat masterissa, paitsi alla mainittu merge-pyyntö. Mitään ei ole
ajettu Unityssä, ja kaikki on vain käännöstarkistettu. Laitteella ovat käyneet vain Natiivisepän ja Linssisepän kuvat
(astrosumu ok) sekä Laitetestaajan kuvasarja A1–A9 (`kuvasarjat-natiivi-ui-20260924-tulos.md`).

Masterissa tämän session aikana:
- iPad-korjaukset: `Rakenne.Olio` (maalehden otsikko GRC → Kreikka), matkakirjakortti lappuna luennan aikana
  (web TEKSTIT PIILOON KAIKILLA LAITTEILLA), avausteksti aloituslennolla (Piilota-ajastin, AloituslentoAlkoi)
- Lähteet-dialogi paketin `moduulit/js/lahteet.json`:sta
- Chat: "Ehdota sisältöä", "Ehdota tallennettavaksi", sanelu + "Kirjoita kysymys" (Pelikoodarin Sanelu),
  paikallinen tietohaku `UI/Pulu/PuluHaku.cs` (web pollo-haku.js) → aineisto kontekstiin ja "Matkakirja: A · B" -linkit
- Äänet: B7-äänisoittimen koukut, tehosteiden webpariteetti (kaiku, makeup, vire), äänet tauolle sanelun ajaksi
- Liiku, kulkutapaliuku ja "Vaihda matkustustapa" (Pelikoodarin kulkutavat), nopan siirtolista ilman Peruuta-nappia
- Tiedeliite (`UI/Linssit/Tiedeliitenakyma.cs`, Linssisepän data), keksintöpaneelin lappukahva, astronautin
  lähdelinkit, avaruussumu pallon päälle (eksponentti 1,2), matkakirjakortti piiloon linssin ajaksi
- Pöllöpoimintojen pillerit artikkelin loppuun (`UI/Pulu/Poimintapillerit.cs`)
- Kaupunkilehti: kulttuurivisa ("LEHDEN KYSYMYS"), maston liitelinkki ja sää-rivi (Open-Meteo, vuosiennuste);
  pulu ja chat nousevat lehden päälle (`UiKerros.AsetaJarjestys`, A5); "Ehdota sisältöä" -pillerin kosketusala (A4)

## Merge-pyynnössä

- **natiivi-ui/lehti-kulttuuri 3d3ee8b**: maalehden uutiset (`UI/Lehti/Uutiset.cs`, UUTISPROXY + MyMemory-käännös).
  Worktree `/Users/Shared/Claude/wt/proto-natiivi-ui-lehti8`, joka poistetaan mergen jälkeen.

## Odottaa muita

- **Jaa matka** (inventaarion rivi 402): iOS-jakoarkki on pyydetty Pelikoodarilta (`Jakaminen.Saatavilla`, `JaaTeksti`).
  Kun rajapinta on masterissa, lisää huipennukseen nappi, joka näkyy vain `Saatavilla`-tilassa, ja teksti `Yhteenveto().Teksti`.
- **Laitetestaaja**: A4, A5 ja A7 ajetaan uudelleen uudella buildilla. Lisäksi kuvataan kulttuurivisa (`ui lehti ateena 1`)
  ja sää-rivi. Jos A4 ei vieläkään reagoi, katso lokista "MATKAKIRJA ui chat: Ehdota sisältöä" ja vertaa `ui chat ehdota` -komentoon.
- Lentokaaret: Natiiviseppä + Pelikoodari, valmis (✈-merkit eivät ole pallolla webissäkään).

## Seuraavat (inventaarion osio 8 ja avoimet)

1. **Lehden mediarivi**: maan radio ja tv (index.html:822, 836; web paivitaMediarivit), kaupunkilehden etusivun
   lopussa ja maaosastossa. Kokoelma `radiot` on paketissa (1.2x). Sovi soittimesta Linssisepän RadioNakyman kanssa.
2. **"Lue lisää" → wiki-dialogi** lehdessä (index.html:796, 807, 870–899): tarkista natiivin nykyinen "Lue lisää aiheesta".
3. **Noston "Avaa sivusto"**, **tiivis lehtiarkki ✕** ja **"Jatka matkaa"**: tarkista webistä, ovatko ne käytössä lehtitilassa.
4. Linssin valmiit kysymykset chatissa (LS) ja maailmanradion rivit (LS).
5. KOKEET-rivit (osio 20) vain kehittäjätilassa, pienellä prioriteetilla.

Inventaario: `nappi-inventaario-natiivi-20260923.md`. Tila-sarake on tarkistettu (65 riviä), ja avoimet rivit ovat osiossa
"Taulukon tarkistus (24.9.2026 aamu)". Kuvasarjojen lista: `kuvasarjat-natiivi-ui-20260924.md` (A1–A9 + B + C).

## Sopimukset

- Webin nykyinen kulku on totuus. Mitä webissä ei ole, sitä ei tehdä, vaan asia kysytään Fablelta.
- Viestit Fablelle: vain valmis erä, jumi tai kysymys, enintään 8 riviä. Natiiviseppä (merge) ja Pelikoodari/Linssiseppä
  (rajapinnat) suoraan.
- Laitetestaajan löydökset korjataan ennen uusia rivejä (Fable 24.9.).
