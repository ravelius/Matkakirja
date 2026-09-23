# Pelikoodarin luovutus 23.9.2026 yö: natiivi, erä 5

Jatkaa luovutusta `viesti-pelikoodari-luovutus-20260923-natiivi4.md`. Lue ensin
`/Users/Shared/Claude/proto-3d/RAJAPINTA.md`, jossa on uudet osiot: sähke, noppa, kukkaro, aloituslento ja lennon vaiheet.

## Sitovat linjaukset tältä illalta (Fable)

- Jos jotain ei ole web-pelissä, sitä EI toteuteta kysymättä ensin Fablelta. Ilman vastausta asia jää puuttuvien listalle.
- Fablen käskyt ovat sitovia Raamatun sisällä ilman omistajan erillistä lupaa.
- Omistajan päätös: natiivin sähkekorjaukset tehdään myös webiin (#2997), jotta pelit pysyvät samoina.
- Pysyvää reittihistoriaa ja tallennusversiota 6 ei tehdä, koska niitä ei ole webissä.

## Masterissa (proto-git, master 6da52ae)

| Erä | Sisältö |
|---|---|
| B5 sähke | Sahke.cs, Sahketehtava.cs, SahkeYhteys.cs, PeliOhjain.Sahke.cs (PeliOhjain on nyt `partial`), SilmukanTila.Sahketehtava, ISahkeNakyma/ISahketehtavaNakyma, kultainen sahkejalki.json + SahkeTestit. Linja avataan vain, kun PeliNakymat.Sahke on asetettu. |
| noppa | PeliNakymat.Noppa(arvo, lat, lon, valmis): liike alkaa vasta nopan jälkeen, ja PeliOhjain.MatkaPerilla(kaupunki) |
| ajoitus | PeliOhjain.Ajoitus.cs: loki "MATKAKIRJA ajoitus <nimi> <ms>" (yli 4 ms). Nykäykset ovat UI:n ensiavauksessa, eivät pelilogiikassa (Natiivi-UI:lla). |
| kaupat ja raha | PeliOhjain.Raha.cs: RahaMuuttui(muutos, syy, saldo); syy on RahaSyyt tai LehtiTeko.Selite |
| migraatio | Kultaiset/vanhat-tallennukset/ (v3 = TestFlight 1 741352b, v4): TallennusTestit.VanhatTallennuksetNousevatNykyversioon |
| A4 kuori pois | WKWebView-lehtikuori poistettu. PeliOhjain.Lehti on nyt ILehtiNakyma. |
| aloituslento | PeliOhjain.Aloitus.cs: UusiMatka lennättää Lontoosta valittuun kaupunkiin (Nappula.AloitusLento). Intro ja koneen ääni alkavat lahti()-hetkellä, ja kesto on vähintään intron verran. AloituslentoAlkoi/Paattyi. Pelitila ei muutu. |
| ui-toiveet | SahkeKortti.Kaupunki/HakemistoMaa ja nappitekstit, LehtiTeko.Selite |

## Merge-pyynnössä Natiisepällä

- `pelikoodari/lennon-vaiheet` 5e27f10: Lento.cs (Lentosuunnitelma: 48 isoympyräpistettä, Nousu/Matka/Lasku), PeliOhjain.Lento.cs (LennonVaiheMuuttui, Lento), peli-tila.json lento. .meta: Lento.cs, PeliOhjain.Lento.cs.
- `pelikoodari/luenta-saapuessa` d6a5ac2 (pinottu edellisen päälle): matkakirjaluento soi jokaisella saapumisella webin luettuSaapuminen-säännöllä, ja vain saapumislehden sulkeutuessa.
- `pelikoodari/paataso` 375c058: kysymykset ja pulmat luetaan skeeman 1.19 päätason kentistä, ja raaka data on varana (Peli/Paataso.cs, PaatasoTestit). .meta: Paataso.cs. Siirtosepältä on pyydetty pulmien generaattori ja kuvat päätasolle. Sen jälkeen vartija voi kieltää datan luvun.

## Web-PR:t (Julkaisijalla, kaikki vihreitä)

- **#2982** natiivin vartija: sähkejälki mukaan (11 jälkeä). Mergetään ensin.
- **#2990** natiivin yöportti (`.github/workflows/natiivi-yoportti.yml`): proton master joka yö 02.30 UTC. Vaiheet: kaanna.sh, tyokalut/tarkista.sh ja vartija, jonka tee-*.mjs-kopioiden pitää vastata proton masteria. Mergetään #2982:n jälkeen ja ajetaan kerran käsin. Tämä on Fablen kohta 2 ("vartija vihreänä mainissa + natiivin CI-portti").
- **#2985** workerien natiiviportti (sahke-worker: x-matkakirja-natiivi; pollo: tehtava 'sahke' natiiville). Mergen jälkeen sahke-worker.yml ajetaan käsin, pollo-julkaisu lähtee itsestään.
- **#2997** v2154: sähkeen kolme korjausta (nimimerkki, omat viestit eivät palaa itselle, lennon aikana lähtenyt saa aarteen palattuaan) ja pullatarjous katoaa ratkaistun aarteen avauksen alta. Uudet väitteet ovat tiedostoissa tests/sahke-tila.test.mjs ja tools/savuke-sahketehtava.mjs. Viisi vanhaa savukeväitettä punastuu samoin myös mainissa. Jos main liikkuu ennen mergeä, aja versiotyökalu uudelleen.
- #2955 (lehden silta) on suljettu vanhentuneena.

## Kesken: B7 musiikki ja äänimaisema

- Spesifikaatio: `/Users/Shared/Claude/proto-3d/lokit/b7-musiikki-spesifikaatio.md`. Siinä on kuusi erää, yhteensä noin 4,5 päivää. Natiivissa ei tällä hetkellä soi musiikki eikä äänimaisema. Natiivi-UI kytkee tehosteet ja lentoäänen haarassa natiivi-ui/tehosteet.
- Erät 1–2 (kultaiset jäljet ja puhdas C#: AaniTaulut, AaniOsoite, Musiikkivalitsin, Maisemakori, Vaisto, AaniTila, Tehostetaulu) ovat Opus-agentilla worktreessä `/Users/Shared/Claude/wt/proto-pelikoodari-aani`, haara `pelikoodari/aani-logiikka`. Tarkista commitit: `git -C /Users/Shared/Claude/wt/proto-pelikoodari-aani log --oneline master..`. Jos agentti katkesi, jatka spesifikaation kohdasta 5.4.
- Tehostetaulun muoto on sovittu Natiivi-UI:n kanssa: `Tehoste {Nimi, Url, Aloitus, Kesto, Gain, Vire?, Tasavire}`, `Tehostetaulu {Master 0.24, NousuS, LaskuS, VireHeitto, Kaikki, Hae, Lento}`. Kerro Natiivi-UI:lle commit-hash, kun se on valmis.
- Siirtosepältä on tilattu maisemakori:<kaupunki>-rivit (OLETUSKORIT), aarreaiheiden tunnukset ja MUSIIKIN_PAATE.
- Seuraavat erät: 3 Unity-soitin (Aanisoitin.cs), 4 koukut (TilaVaihtui, LiikeAlkoi, KysymysAvautui/Suljettu, AarrePaljastui, IntroLoppui, LinssiOhjain.MusiikkiKasittelija), 5 jet-silmukka ja tehosteet yhdessä Natiivi-UI:n kanssa, 6 kuulokoe.

## Muut avoimet

- Laatan napautus omassa kaupungissa avaa kaupunkikortin, kun webissä se avaa laattakysymyksen. Tämä on sopimatta Natiivisepän ja Natiivi-UI:n kanssa.
- KulttuurivisaTarjolla kytkeytyy, kun paketin skeema tuo kulttuurivisan (Natiivi-UI asettaa).
- Worktreet: `/Users/Shared/Claude/wt/proto-pelikoodari` (nyt haarassa pelikoodari/paataso), `proto-pelikoodari-aani` (B7-agentti). Web-worktreet `wt/pelikoodari-{sahke-natiiviportti, natiivi-yoportti, sahke-korjaukset, pulmavartija}` poistetaan niiden PR:ien mergen jälkeen (`tools/uusi-worktree.sh --poista`).
