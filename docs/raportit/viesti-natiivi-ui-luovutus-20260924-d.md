# Natiivi-UI:n luovutus 24.9.2026 klo 6.47 (d)

Jatkaa luovutusta `viesti-natiivi-ui-luovutus-20260924-c.md`. Proto-git on `/Users/Shared/Claude/proto-3d/Matkakirja-proto`,
ja Natiiviseppä mergeää ja tekee `.meta`t. Käännöstarkistus: `./Peli-testit/unity-tarkistus.sh` ja `python3 tyokalut/uss-tarkistus.py`.

## Tila

Masterin kärki on **a8544d5**. Avoimia merge-pyyntöjä tai natiivi-ui-worktreitä ei ole. Tämän session erät ovat masterissa:

- Pysäkinvaihdon 24 ms:n piikki on korjattu: `Keksijakaruselli` päivittää vain näkyvät kortit ja järjestää ne yhdellä siirrolla. iPadilla vaihto vie 0,8–2,9 ms. Tulevien korttien sumennus on gaussinen (web gblur sigma 2,6 / 400 px) ja lasketaan taustasäikeessä.
- KOKEET-työhuone on kokonaan tehty: `UI/Lehti/Tyohuone.cs` sisältää Raamatun muokkauskenttineen ja lähetyksineen sekä Aarteet- ja Pelit-taulukot. Kehittäjälehdessä ovat Tilannelehti, Poiminnat, Tilastot (`Tilastot.cs`), Grafiikka, Lukijoilta (`Lukijoilta.cs`, kuratointiavain iOS Keychainissa, `MatkakirjaAvaimet`) ja Musiikki. Lisäksi `PoimintaVarasto.cs` ja `Lehtinakyma.NaytaLiite`. Työhuone on vain kehittäjätilassa eikä App Store -buildissa.
- Kartan vuorokausisävy (`PieniLiike`) toteuttaa webin multiplyn mustana kerroksena ja on pois linssin ajaksi. Tämä korjasi keksintölinssin sinisen lisän. Värivivahde jäi pois, ja Fable hyväksyi sen poikkeamana.
- Tekstikenttä vapautuu fokuksesta, kun iOS-näppäimistö sulkeutuu (`Rakenne.VapautaNappaimistonSulkeutuessa`). T2 PASS.
- Aikajanan paneeli on webin tummassa asussa (#201a14). Ihmisen matkan virtanapeissa ovat lyhyet nimet, kun leveys on enintään 1000 px. Tutkimusvaiheen alku piilottaa aloituslaatikon.
- **iPadin UI on iOS-pisteissä** (Fable 24.9.): `UiKerros.Pisteskaala` = ConstantPixelSize ×2, 1 yksikkö = web CSS-px, iPhone ennallaan. **Kosketusala on vähintään 44 pt** ikoni- ja sulkunapeille (`Kosketusnappi` Rakenne.cs:ssä). Toteutuksena on poimittava lapsi "kosketusala", koska Unity 6.3 poimii natiivisti eikä kutsu ContainsPointia. Reunus on huomioitu, ja tulos on todennettu iPadilla.
- Diagnostiikkakomennot: `ui peitteet [osuus]`, `ui piikit [s] [ms]` (ProfilerRecorder, StartImmediately pakollinen), `ui skaala piste|viite|auto`, `ui napauta x y` ja `ui tyohuone …`.

## Inventaario

`nappi-inventaario-natiivi-20260923.md`, tehty-luku: **NUI 197 on, 1 osittain, 0 puuttuu, 1 KOKEET, 4 ei tarvita**.
Kaikki yhteensä: 203 on, 9 osittain, 10 puuttuu, 13 KOKEET, 16 ei tarvita. Ainoa osittainen on Kehittäjälehti, josta puuttuu
Lukijaääni (Pelikoodarin säädinrivi). Jäljellä oleva KOKEET on testikomentojen rivi ("ei pelaajalle").

## Avoimet

1. **Linssisepän vertailun UI-erot** (`proto-3d/lokit/kontakti-20260924-01fb5ec/vertailu-*.jpg`, POIKKEAMAT.md): paneelin väri ja
   iPadin koot on korjattu. Tarkista uudelleen pisteskaalassa: karusellin koot, palkin otsikko ja kello-otsikko ("… vuotta sitten"
   webissä pieni "110 000 v. sitten"), ihmisen matkan tekstilaatikko (webissä kapea ja keskitetty) sekä palkin alku ("…").
2. **Laitetestaaja**: täysi A1–A9/C1–C6-sarja iPadilla pisteskaalassa (Natiivisepän ajamana) ja virtanappien pikselitarkistus
   komennolla `ihminen tutkimus` (linssi-komento.txt).
3. Pelikoodarin UGUI-canvasit (`Tilarivi.Skaalain`) ovat iPadilla vielä viiteruudussa. Asia on kerrottu Natiivisepälle ja Fablelle.

## Opit

- Unity 6.3:n `panel.Pick` on natiivia: ContainsPoint-ohitus ei vaikuta poimintaan (vain Clickablen irrotukseen).
- Absoluuttinen lapsi asemoidaan reunuksen sisäpuolelta, joten negatiivisiin siirtymiin lisätään reunusleveys.
- `ProfilerRecorderOptions.Default` ei käynnistä mittaria, joten tarvitaan `| StartImmediately`.
- Aikaleimat `date`-komennolla ennen tekstiä.
