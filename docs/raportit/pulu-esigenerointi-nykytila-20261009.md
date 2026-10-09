# Pulun esigenerointi: nykytila ja laskelma (Natiivi-UI 9.10.2026)

Päätoimittajan selvitys omistajan 9.10. klo 11.5x tavoitteesta: valmiit kysymykset, vastaukset ja vastausten linkkien kysymykset
valmiiksi, jotta peruspeli toimii ilman API-krediittejä. Ei koodimuutoksia, ei luentaääniä. Lähteet: natiivi proto (PuluChat,
NostoSisalto), Pöllö-worker (origin/main 9.10.), sisältöpaketin kopio sisalto-koe-2/v12 (25.9.). [laskettu] = datasta,
[arvio] = oma arvio.

## 1. Valmiit kysymykset nyt

- Lähde on data, pakettien kenttä `kysymykset` (fokus-, maasto- ja hahmotelmakohteet sekä `takynostot.json`). Natiivi lukee
  ne (NostoSisalto: kohde 2, täkynosto 3), ja chatissa näkyy enintään 2 sirua. Worker ei tuota kysymyksiä eikä
  generointityökalua ole: sisältöistunnot kirjoittivat ne käsin ("2 per nosto", 19.9.).
- Määrä [laskettu]: kohteilla tasan 2 (2 318/2 324, 6 ilman). Täkynostoilla 3 (85/107). Omistajan arvio 2 pitää kohteille.

## 2. Euroopan kohdat, joilla on Pulun kysymykset [laskettu, 33 Euroopan maata]

1 328 kohdetta (2 656 kysymystä) ja 85 täkynostoa (255 kysymystä), yhteensä **1 413 kohtaa**. Kysy-nappia ei ole skandaaleilla,
syvennyksillä, hetkillä eikä eläintäyillä. Lisäksi on 97 maakuntakorttia, joissa on omat 232 kysymys–vastaus-paria.

## 3. Alleviivatut linkit

- Worker pyytää mallilta 2–5 `[[käsite]]`-merkintää vastausta kohden (KASITEKEHOTE). Natiivi tekee niistä alleviivatut linkit
  (enintään 12). **Napautus lähettää Pululle uuden kysymyksen "Kerro lisää: ⟨käsite⟩"**, eli jokainen linkki on uusi kysymys.
- Lisäksi jokaisessa vastauksessa on 2 jatkokysymysnappia (`jatkot`), myös ne ovat uusia kysymyksiä. "Matkakirja: A · B" -rivi
  avaa pelin omaa sisältöä, ei Pulua.
- Keskiarvo noin **3,5 linkkiä vastausta kohden** [arvio ohjeesta, näytevastauksia ei ole tallessa].

## 4. Laskelma (1 413 kohtaa × 5 valmista kysymystä)

| Syvyys | Vastauksia [arvio, ilman yhdistämistä] | Sonnet 5.5, 0,013 $/vast. | Batch −50 % |
|---|---|---|---|
| Valmiit kysymykset | 7 065 | 92 $ | 46 $ |
| + linkit, 1 taso (×3,5) | 31 800 | 413 $ | 207 $ |
| + linkit, 2 tasoa (×3,5²) | 118 300 | 1 540 $ | 770 $ |

- Hinta perustuu workerin mitattuun hintaan (Sonnet 5.5, noin 11 k syötetokenia lämpimällä välimuistilla ja noin 500 tulostetokenia).
  Haiku-luokan malli olisi arviolta kolmannes tästä [arvio].
- Saman kohdan toistuvat käsitteet yhdistämällä (sama "Kerro lisää: X") määrä pienenee arviolta 20–40 % [arvio].
- Jos jatkonapit (2 per vastaus) generoidaan linkkien lisäksi, kerroin on noin 5,5 eikä 3,5. Kaksi tasoa tekisi silloin noin 214 000
  vastausta. Suositus: ensin valmiit kysymykset ja yksi linkkitaso, jatkonappeina näytetään valmiit kysymykset.

## 5. Ehdotus: tallennus ja näkymä

- **Ämpäripaketti, ei tietokantaa:** sisältö on staattista. R2-polku `pulu/vastaukset/v1/<iso3>.json` ja `uusin.json`-osoitin kuten
  muissa paketeissa, välimuisti laitteella ja lataus samoin kaikilla verkoilla.
  - Rakenne: kohdan id → kysymykset → vastaus (teksti `[[käsite]]`-merkinnöin) → käsite → linkkivastauksen id.
  - Natiivi hakee vastauksen paketista. Linkki, jolle vastausta ei ole, näkyy alleviivaamattomana, kunnes maksullinen vapaa
    kysyminen tulee.
- Generointi tehdään yhdellä työkalulla (Batch API, nykyinen järjestelmäkehote). Tarkistus ja yhdistäminen ennen ämpäriä.
  Kehotteen tiiviste tallennetaan pakettiin.
- **Näkymä:** chatin olemassa olevalla sirurivillä näkyvät 2 ensimmäistä kysymystä, ja loput 3 tulevat esiin vierittämällä
  vaakasuunnassa. Sama pohja (mk-chat__siru), ei uutta pohjaa.
- **Päätettävä:** omistajan 5.10. linja "pululla ei valmiiksi kirjoitettuja vastauksia, vain valmiita kysymyksiä" (PuluChat) on
  ristiriidassa uuden tavoitteen kanssa. Uusi tavoite kumoaa sen, mutta päätös kannattaa kirjata Raamattuun.
- Valmiita kysymyksiä on nyt 2 kohtaa kohden. Kolme lisäkysymystä kohtaa kohden (noin 4 240 Euroopassa) kirjoitetaan
  sisältöistunnoissa tai generoidaan samalla työkalulla omistajan hyväksynnällä.
