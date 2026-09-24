# Kohdekarttojen pienoismallit

453 kuvitettua pienoismallia (2026-09-22), yksi jokaista kohdekartan
nähtävyyttä/tapahtumaa kohti. Piirtyvät kaupungin kohdekartalle pienenä
(n. 64–96 px) ja avautuvat napautuksesta isona.

## Tyyli (kaanon — tarkistettu tiedostoista, ei tilauksen sanamuodosta)

Värillinen, vesiväri-/kynäjälkihenkinen kuvitus (EI yksivärinen
seepiasluonnos — vanhoissa tilauspohjissa ollut sanallinen "yksivärinen
seepiamusteluonnos"-kuvaus ei ole koskaan vastannut toimitettuja
tiedostoja, ks. `docs/raportit/codex-otostarkistus-20260922.md`).
Kevyt karikatyyri, muutama varma viiva, lämpimät maasävyt, valkoinen tai
läpinäkyvä tausta. Kohde tunnistettavana siluettina, ei tekstiä, ei
vesileimaa. Vuosiluvulliset kohteet (esim. "Palo 1666", "Faraday 1831")
ovat tapahtumia: tapahtuman tunnistettava hetki tai esine, ei henkilön
muotokuvaa tunnistettavine kasvoineen. Uutta tilausta kirjoittaessa
katso 3–5 olemassa olevaa tiedostoa tästä kansiosta esimerkiksi (älä
kuvaile tyyliä muistista) — esim. `helsinki-johanneksenkirkko.webp`,
`bryssel-grand-place.webp`.

## Muoto

512×512 px, WebP tai PNG, RGBA. Tiedostonimi `<kaupunki>-<kohde>.webp`
(kaupunkitunnus ja kohteen lyhyt kuvaava nimi, pienin kirjaimin,
väliviivoin).

## Lisenssi

Pelin oma tuotanto (Codexin tilaustyönä tuottama alkuperäinen kuvitus,
ei Commonsista tai muusta ulkopuolisesta lähteestä poimittu materiaali
— PD/CC-vaatimus ei koske näitä).

## Tilaushistoria

Valtaosa (n. 331 kuvaa) on peräisin ennen numeroitua tilauskäytäntöä —
alkuperäinen provenienssi ei ole jäljitettävissä yksittäisiin
postiviesteihin, mutta tuotantotapa (Codexin tilaustyö) on sama.
Myöhemmät, jäljitettävät erät:

| Tilaus | Pvm | Sisältö | Tilausviesti | Toimituscommit |
| --- | --- | --- | --- | --- |
| 4 | 21.9.2026 | 97 kohdetta, 12 kaupunkia (erät A+B) | `posti/fable-codexille-miniatyyrit-eurooppa-20260921.md` | `0da998e17` (PR #2669) |
| 4 lisäys 1 | 21.9.2026 | 7 puuttuvaa kohdetta (Ateena 6, Wien 1) | `docs/raportit/pienoismallit-puuttuvat-7-20260921.md` | `81880b016` (PR #2678) |
| 4 lisäys 2 | 21.9.2026 | 18 kohdetta, 3 uutta pelikaupunkia (Nikosia, Luxemburg, Valletta) | `posti/fable-codexille-miniatyyrit-18-20260921.md` | `43a5724b4` (PR #2688) |

Uusi tilaus jatkaa samalla numerolla ("tilaus 4 lisäys N") ja lisätään
tähän tauluun toimituksen jälkeen.
