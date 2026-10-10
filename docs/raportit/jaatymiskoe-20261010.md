# Jäätymiskoe 10.10.2026 (Pelikoodari)

**Tulos:** Pariisin matalan kiinteän kameran jäätyminen ei koske peliä eikä TF 174/175:tä. Se esiintyi vain testikomennoissa,
jotka kutsuvat isäntäkoneen äänipalvelinta pääsäikeestä, ja vain aamulla 06.37–07.40. Syy on todennäköisesti isäntäkoneen
äänipalvelimen (coreaudiod) jumi. Pinonäytettä ei saatu, koska vika ei toistunut.

## Havainnot
| Ajo | Aika | Sisältö | Tulos |
|---|---|---|---|
| kaupunki-pisteet-175 ajo 2 | 06.37 | kamera + pakotukset + kaappaus (AaniKaappaus, natiivi tap) | jäätyi kaappauksen alussa |
| ajo 3 | 07.34 | kamera + pakotukset + aani mittaa ×2 | jäätyi 2. mittauksessa |
| vertailu 174-rungolla | 07.40 | sama kuin ajo 3 | jäätyi 2. mittauksessa |
| koe A | 09.27 | kamera, ei pakotuksia, kuuntelija 0 | ok, 60 fps |
| koe B | 09.31 | A + kello ja astia | ok |
| koe C | 09.58 | A + kuuntelija täysillä (load 38–208) | ok |
| koe D | 10.27 | A + aani mittaa ×2 (ajon 3 toisto) | ok |

Jäätyneissä appi ei kaatunut (ei .ips:ää, ei jetsamia), loki vain loppui. Kaikissa kolmessa viimeinen tapahtuma oli
testikomennon natiivi äänikutsu: `aani mittaa` → `AaniIstunto.Tila()` → `MatkakirjaAani_Tila` (AVAudioSessionin ominaisuudet
pääsäikeessä) tai kaappaus → `MatkakirjaSilmukka_Kaappaa` (AVAudioEngine-tap). Pelin omat polut eivät tee näitä kutsuja.

## Korjaukset (proto pelikoodari/mittaa-aikaraja dad7ae249, pohja a4c6539e5, juna 176)
1. `AaniIstunto.TilaAikarajalla(500)`: aani mittaa lukee istunnon tilan taustasäikeessä; yli 0,5 s → "ei vastausta".
2. `todistusajo.sh` JÄÄTYMISVAHTI: kun konsolilokiin on tullut pelin rivejä ja se on ollut hiljaa 10 s, otetaan 5 s:n
   pinonäyte (`sample`) tiedostoon `pinonayte-<n>.txt` ja kirjataan PUUTE. Seuraava jäätyminen näyttää syyn suoraan.

Jos jäätyminen toistuu: tarkista ensin `coreaudiod` (omistajan huoltokomento `sudo killall coreaudiod`) ja vahdin pinonäyte.

Todisteet: `proto-3d/lokit/todistus-kaupunki-pisteet-175-20261010-{0634,0731}`, `…-vertailu-20261010-0737`,
`todistus-jaatyminen-{a,b,c,d}-20261010-*`.
