# Käynnistyksen 27 s hiljaisuus kuormassa (Karttaseppä 17.10.2026, PT:n toimeksianto junaan 199)

Ajo: `proto-3d/lokit/todistus-iss-reitti-iphone-198-20261017-0519` (iPhone 123B4B25, käännös 554b959e3, kuorma 4,7):
`[3] PUUTE konsoli hiljaa 27 s`. Selvitys tehtiin olemassa olevista lokeista, ilman simuajoa (PT: simut vasta junan 198 lukituksen jälkeen).

## Mitä pinonäyte näyttää

`pinonayte-1.txt`: pääsäie 15/16 näytteessä tässä ketjussa:
`KehysMittari.Update → KehysMittari.Kirjaa → File.AppendAllText → FileStream.FlushBuffer → write`.
Pääsäie on siis kiinni synkronisessa tiedostokirjoituksessa (`kehysajat.jsonl`, rivi joka 5. sekunti, vain kehittäjätilassa).
Muut säikeet odottavat työtä; mitään laskentaa ei ole käynnissä.

## Sama kuvio muissa ajoissa

Kaikki 1 288 todistusajoa käytiin läpi (`pinot.py`/`pinot2.py`, scratchpad): 58:ssa on PUUTE "konsoli hiljaa". Kun pinonäytteen pääsäie
on tunnistettavassa kohdassa, yleisin syy on synkroninen tiedosto-I/O pääsäikeessä (13 tapausta, kaikki 16.–17.10.):

| Kutsuja pääsäikeessä | Ajoja | Kärki |
|---|---|---|
| `KehysMittari.Kirjaa` → `File.AppendAllText` | 3 | write / close |
| korutiini `Hae…MoveNext` → `File.WriteAllBytes` / `File.Exists` (välimuisti) | 6 | write / close / stat |
| `AaniKaappaus.Update` → `File.WriteAllBytes` | 1 | close |
| `UiKomennot.Kirjaa` / `DeleteFile` (QA-komentojen tiedostot) | 2 | write / unlink |
| `LinssiOhjain.LueKomennot` (komentotiedoston luku) | 1 | read |

Muut tapaukset ovat renderöintiä (URP odottaa GPU:ta, 5) tai näytteitä ilman selvää kärkeä.

## Syy

Simulaattorien data on ulkoisella T7-levyllä (`/Volumes/T7 4TB/Simulaattorit/Sarja/…`), ja T7 on 100 % täynnä (20 Gi vapaana
17.10. 05.3x). Lisäksi kone on kuormassa (swap, rinnakkaiset käännökset; muisti `levyn-notkahdus-on-swap`). Silloin yksittäinen
pieni `write()` tai `close()` voi odottaa levyä kymmeniä sekunteja, ja koska kutsu on pääsäikeessä, koko peli pysähtyy eikä
konsoliin tule rivejä. Koodissa ei ole virhettä, joka jumittaisi ilman levyn hitautta.

Laitteella (sisäinen flash) sama kutsu kestää millisekunteja, joten pelaaja ei näe 27 s:n jäätymistä. Pääsäikeen synkroninen I/O
on silti nykimisriski myös laitteella (välimuistikirjoitukset `Hae`-korutiineissa ovat isoja tiedostoja).

## Ehdotus junaan 199 (rooleille, ei Karttasepän koodia)

1. **Testiympäristö (Julkaisija / Natiiviseppä):** simusarjalle tilaa T7:lle tai sarja sisäiselle levylle, kun tilaa on;
   täysi T7 tekee hiljaisuus-PUUTTEISTA kohinaa. Todistusajon PUUTE-riville voisi lisätä pinonäytteen kärjen (`write`/`close` →
   "levy-I/O", ei jäätymistä pelissä).
2. **Peli (Pelikoodari / omistajat):** tiedostokirjoitukset pois pääsäikeestä: `KehysMittari` kirjoittaa rivin taustasäikeessä
   (`Task.Run`/jono) tai pitää `StreamWriter`in auki; `Hae…`-korutiinien välimuistikirjoitus `File.WriteAllBytesAsync`/taustasäie;
   `UiKomennot`/`LinssiOhjain` (vain QA) voi jäädä.
3. Simuajo, jolla korjaus todennetaan, vasta junan 198 lukituksen jälkeen (PT).
