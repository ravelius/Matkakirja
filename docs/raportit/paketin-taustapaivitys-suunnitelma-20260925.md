# Sisältöpaketin taustapäivitys: toteutussuunnitelma (25.9.2026)

Siirtoseppä (Opus). Pohjana ovat selvitys `paketin-taustapaivitys-20260925.md` ja omistajan hyväksyntä
25.9.2026. Mobiilidatalla ladataan automaattisesti vain alle 5 Mt:n deltat. Isommat odottavat
Wi-Fiä, eikä pelaajalta kysytä. **Koodi aloitetaan vasta build 15:n jälkeen.** Latauksen hoitaa
Pelikoodarin Esilataaja (`docs/raportit/esilataaja-suunnitelma-20260925.md`, haara
`pelikoodari/esilataus-nykytila`). Rajapinta sovittiin 25.9.

## Vastuut

| Osa | Tekijä |
|---|---|
| Hakemisto, osoittimen lisäkentät, tasoittainen kartta (CI, `julkaise-sisalto.mjs`, `vie-sisalto.yml`) | Siirtoseppä |
| `PakettiPaivitys.cs`: vertailu, sha256, `valmis.json`, käyttöönotto, siivous, `Sisalto.cs`:n tiedostovarasto | Siirtoseppä (proto, oma haara) |
| Esilataaja: jono, verkkotyyppi (Wi-Fi, mobiilidata alle 5 Mt, Low Data Mode), Range-jatkaminen, rinnakkaisuus, uusinta, `Joutilas` | Pelikoodari |
| `SISALTOTASO`-vakio ja sen nosto buildiin | Natiiviseppä |

## Vaihe 1: palvelin (Siirtoseppä, 1.x ja 2.0)

1. **`hakemisto.json`** kirjoitetaan jokaiseen versiokansioon. Se listaa kaikki paketin tiedostot
   muodossa `{ polku, sha256, tavuja, siirto }`, jossa `siirto` on brotlin (taso 5) arvio siirtokoosta.
   Nykyinen manifesti ei riitä, koska skeemoilla ei ole tiivistettä ja manifesti kuuluu itse pakettiin.
2. **Osoittimen lisäkentät** (lisäys, vanha natiivi ohittaa ne):
   - `hakemisto: { polku, sha256, tavuja }`
   - `tavuja` (raakana) ja `siirto` (brotli-arvio), koko paketti
   - `tasoittain: { ios: { "<taso>": <versio> } }`: uusin versio, jonka kukin sisältötaso osaa lukea.
     CI kopioi kartan edellisestä osoittimesta. Kun `MIN_SOVELLUS.ios` nousee, vanha taso jää
     osoittamaan viimeiseen sille kelpaavaan versioon.
3. `osoitin.sha256` pysyy entisenä, eli se on koko paketin tiiviste. Se lasketaan hakemiston riveistä
   samalla säännöllä (polut aakkosjärjestyksessä, `polku\tsha256\n`, hakemisto itse pois). Natiivi voi
   siis tarkistaa sen.
4. **Testit:** hakemisto vastaa pakettia, `tasoittain` periytyy, ja uusi taso nostaa karttaa.
   Julkaisusääntö: `MIN_SOVELLUS.ios` nostetaan aina, kun paketti muuttaa vanhan buildin käytöstä
   (1.42:n opetus).

## Vaihe 2: natiivi (`PakettiPaivitys.cs`, Siirtoseppä + Esilataaja)

**Levyrakenne** (`persistentDataPath/sisalto/`):
- `tiedostot/<sha256>` on sisällön mukaan avainnettu varasto. Kahden version yhteinen tiedosto
  tallennetaan kerran. iOS no-backup -lippu.
- `<pää>/v<N>/hakemisto.json` ja `valmis.json` = `{ versio, polku, sha256, valmistui }`.
- `kaytossa.txt` kertoo käytössä olevan version (korvaa `viimeisin.txt`:n).

**Kulku:**
1. **Käynnistys ja taustalta palaaminen,** enintään kerran 6 tunnissa: haetaan osoitin ja valitaan
   kohdeversio `tasoittain.ios[SISALTOTASO]`, tai `versio`, jos `minSovellus.ios ≤ SISALTOTASO`.
   Jos kohde on sama kuin käytössä oleva versio tai `valmis.json` on jo olemassa, lopetetaan.
2. **Delta:** haetaan `hakemisto.json` ja tarkistetaan sen sha256 osoittimesta. Puuttuvat sha256:t
   (ne, joita ei ole `tiedostot/`-kansiossa) muuttuvat tehtäviksi:
   `Esilataaja.Pyyda(Kohde.Tiedosto(osoite, sha256, siirto, "tiedostot/<sha>.lataus"), Taso.Muu, Kohta.Kaynnistys, ryhma "paketti:<pää>:v<N>")`.
3. **Mobiilidatan raja koskee ryhmää:** jos ryhmän `siirto` on yhteensä alle 5 Mt, se ladataan myös
   mobiilidatalla. Muuten koko ryhmä odottaa Wi-Fiä. Esilataajan pitää laskea raja ryhmän summasta,
   ei tiedostoista erikseen (sovitaan Pelikoodarin kanssa).
4. **`RyhmaValmis`:** jokaisen tiedoston sha256 tarkistetaan, ja tiedosto siirretään nimelle
   `tiedostot/<sha>`. Jos tiiviste ei täsmää, tiedosto poistetaan ja ryhmä yritetään uudelleen
   seuraavalla kierroksella. Kun kaikki täsmää, kirjoitetaan `valmis.json` atomisesti.
5. **Käyttöönotto:**
   - seuraavassa käynnistyksessä ennen ensimmäistä sisällön lukua, tai
   - `Esilataaja.Joutilas`-tapahtumassa vain, jos pelaaja on aloitusruudussa eikä yhtään kokoelmaa
     ole vielä ladattu muistiin.
   Kesken pelin ei vaihdeta koskaan. Käyttöönotto kirjoittaa `kaytossa.txt`:n ja näyttää osoittimen
   `muutos`-rivin "Mitä uutta" -listassa.
6. **Palautus:** jos osoitin osoittaa taaksepäin ja sen `valmis.json` on olemassa, versio vaihtuu
   seuraavassa käynnistyksessä ilman latausta. Muuten kulku on sama kuin vaiheissa 2–5.
7. **`Sisalto.cs`:** `HaePaketista(polku)` lukee käytössä olevan version hakemistosta polun sha256:n ja
   sen jälkeen tiedoston `tiedostot/<sha>`. Jos versio ei ole valmis, luetaan kuten nyt (laiskasti
   verkosta), jotta ensimmäinen käynnistys ilman pakettia toimii.

## Vaihe 3: siivous

- Säilytetään käytössä oleva versio ja edellinen valmis versio. Muiden versioiden `v<N>`-kansiot
  poistetaan, samoin `tiedostot/`-kansion tiedostot, joihin säilytettävien hakemistojen rivit eivät viittaa.
- Vanhan mallin kansiot (`sisalto/1/v<N>/kokoelmat/…`) poistetaan ensimmäisellä ajolla, kun uusi
  varasto on valmis.
- Siivous ajetaan käyttöönoton jälkeen joutilaana, ei käynnistyksen kriittisellä polulla.

## Tarkistukset ja valmiin määritelmä

- **CI:** `tests/vienti.test.mjs` ja `sisaltopaketti.test.mjs` (hakemisto ja tasoittainen kartta).
- **Natiivi:** EditMode-testit (dotnet + csc ilman editoria) sha256-tarkistukselle, `tasoittain`-valinnalle,
  siivouksen viittauslaskennalle ja väärälle tiivisteelle.
- **Laitteella:**
  1. Juna tekee uuden version → delta ladataan Wi-Fillä ja otetaan käyttöön seuraavassa käynnistyksessä.
  2. Mobiilidatalla 3 Mt:n delta latautuu, 9 Mt:n delta odottaa.
  3. Palautus toimii ilman latausta.
  4. Levyllä on siivouksen jälkeen enintään kaksi versiota.
- **Järjestys:** vaihe 1 → Natiiviseppä lisää `SISALTOTASO`-vakion → vaihe 2 yhdessä Esilataajan kanssa
  → vaihe 3. Jokainen vaihe on oma PR tai haara.
