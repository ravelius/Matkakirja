# Koeversion assetit: c390b057f + e48424a75 (PK 7.11. 07.46, PT 07.45)

**Tulos: assetit eivät ole kunnossa. Talot puuttuvat molemmista kaupungeista, eikä ämpärivienti yksin korjaa sitä, koska koodi ei osaa hakea niitä sieltä.** Muu aineisto on koodissa, Resourcesissa tai ämpärissä.

Selvitetty koodista ja kansioista. TF-käännöstä ei ole ajettu, ämpäristä tarkistettu vain yksi näytetiedosto per kansio.

## Puuttuu

| Mikä | Nyt | TF:ssä |
|---|---|---|
| Pariisin talot | `_tyo/natiiviseppa/pariisi-talot/palat-v20-ryhma4` (353 Mt, 219 palaa), vain Macissa | Ei taloja |
| Lontoon talot | `_tyo/pelikoodari/lontoo/palat-d7` (310 Mt, 242 palaa), vain Macissa | Ei taloja |

- **Lukutapa:** `TaloKerros.cs:147–178` lukee vain paikallisesta kansiosta (`File.ReadAllBytes`), oletus `Documents/talopalat`. Verkkohakua ei ole. Kansio on tähän asti annettu koekomennolla `talot kansio`.
- **Todiste laitteelta:** tämän aamun iPad-ajo ilman komentoa: `talot: 0 palaa kansiossa …/Documents/talopalat` (`lokit/pelikoodari-pallo-ipad-a4269054a/konsoli.txt`).
- **Ämpärissä ei ole:** `talopalat/indeksi.txt` ja `talot/indeksi.txt` antavat 404; muita mahdollisia polkuja ei tutkittu.

## Vaatii koodimuutoksen

1. **Palojen lähde:** kansion oletus pitää osoittaa aineistoon, joko sovelluksen mukana tai ladattuna.
2. **Lontoon alue:** `TaloAlue` on oletuksena Pariisi, ja Lontoo tulee vain komennolla `talot alue 51.465 51.535 -0.215 0.015 0`. Ilman sitä myös `PariisiKallistus.LontooKoe` jää pois: Lontoossa ei ole Pariisin kallistusta ja usvaa, omaa poistotaulua eikä 600 metrin reunaa. Alueen ja kansion pitää vaihtua kameran mukaan.
3. **Grand Palais ja Riemukaari:** ajossa 46 pohjat `-pohja-r6` tulivat komennolla `koepohja`. Koodin oletus on `-pohja`, joten TF ei näytä samaa kuin ajo, ellei oletusta vaihdeta. Tiedostot ovat Resourcesissa.

**Suositus koeversioon: palat sovelluksen mukana (StreamingAssets), ei ämpäriin.** Julkaistu aineisto pysyy koskematta eikä latauskoodia tarvita. Sovellus kasvaa noin 660 Mt. Tätä ei ole kokeiltu.

**Lisenssi:** `TaloKerros.cs:2` sanoo "ODbL tarkistettava ennen julkaisua". Tarkistusta ei ole tehty; PT:n päätettävä, koskeeko se sisäistä koeversiota.

## Kunnossa

- **Lontoon mallit:** pelkkää koodia (`OhjelmaKohdeLontoo*.cs`), ja ne syttyvät kameran mukaan ilman komentoa. Poistotaulu ja St Paul'sin kyltti ovat koodissa. e48424a75:n haarassa ei ole uusia tiedostoja koodin lisäksi.
- **974a75318:** kaikki `Nahtavyysalue.cs`:n `NotreDameKoe`-viitteet löytyvät Resourcesista c390b057f:ssä (97 tiedostoa, 170 Mt), siis myös r8- ja r9-pohjat. Polkujen vertailu tehty skriptillä.
- **a80a81323:** vain varjostin `Resources/TaloKerros.shader`, tulee käännökseen.
- **Laatat:** `2026-11-03-pohja-valitaso` ja `pariisi/isoisa4-20261103` antavat ämpäristä 200 (yksi näytetiedosto kummastakin). `laattapaketti.bin` on käännöksessä (`Data/Raw`, 34 Mt). Mac-polku `Laattapalvelin.cs:585` on vain editorissa, ei laitteella.
- **Koekomennot `maasto siirtyma` ja `elavakartta`:** eivät tuo aineistoa. Ensimmäinen on Mac-ajon tarkkuussäätö, jälkimmäinen pelkät laskurit.
- **`Striimi`, `TaloAlue.Paalla`, `PoistoPaalla`, `OhjelmaKohteet.Paalla`:** oletuksena päällä.

## Tarkistamatta

- Yhdistetty c390b057f + e48424a75 ei ole vielä olemassa, joten viitteet on tarkistettu kummastakin erikseen.
- Lontoon poistotaulu vaikuttaa kartan rakennustasoon vain, kun `PariisiKallistus.LontooKoe` on päällä (kohta 2).
- Pääkartan ajon kuvat ovat Macista ja iPadilta, joilla palat tulivat komennolla. Ilman paloja koeversiota ei ole katsottu.
