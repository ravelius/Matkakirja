# Sisältökirjuri: luovutus 28.10.2026 (iltapäivä, täydentää -20261028)

Tila: PT:n järjestys (matkan kohdemaat ensin) käynnissä. Ranska, Britannia, Alankomaat, Italia, Saksa, Espanja, Portugali, Belgia ja Itävalta ovat PR:inä; merge KK:n kuittauksella (JS-PR, CI ~15 min). Kaikissa maakunnat-luonnehdinnat-testi 0 fail.

## PR:t
| Maa | PR | Alueita |
|---|---|---|
| Ranska | 5458 | 13 |
| Britannia | 5460 | 4 |
| Alankomaat | 5461 | 15 |
| Italia | 5462 | 20 |
| Saksa | 5463 | 16 |
| Espanja | 5464 | 19 |
| Portugali | 5465 | 20 |
| Belgia | 5466 | 11 |
| Itävalta | 5467 | 9 |
Aiemmin odottavat: Ruotsi 5449, Norja 5452, Tanska 5454, Viro 5455. Luettavat: docs/raportit/maakuntatekstit-<maa>-20261028.md.

## Jatkokomento (Mac-uudelleenkäynnistys)
Ei pitkiä taustaajoja kesken: agentit kirjoittavat tulokset JSON-tiedostoihin, ja jokainen maa on oma PR. Jatko: `git fetch origin main`, lue resepti docs/tuotanto/reseptit/maakuntateksti-koko-maakunta.md (kohta "Opitut asiat 28.10." listaa jäljellä olevat maat), luo worktree `tools/uusi-worktree.sh sisaltokirjuri maakunnat-<maa>` ja toimi reseptin työtavan mukaan. Jos tilapäinen hakemisto on tyhjentynyt, kirjoita agenttiohje uudelleen reseptin lohkosta. Seuraavat maat: Sveitsi, Irlanti, Romania ja Moldova, Ukraina, Bulgaria, Serbia, Unkari, Kroatia, Puola, Kreikka, Tšekki ym. (lista reseptissä).

## Huomioita
- Worktreet wt/sisaltokirjuri-maakunnat-<maa> poistetaan mergen jälkeen `tools/uusi-worktree.sh --poista sisaltokirjuri-maakunnat-<maa>`; poista myös paikalliset haarat.
- Agentit vain Sonnet/Opus.
