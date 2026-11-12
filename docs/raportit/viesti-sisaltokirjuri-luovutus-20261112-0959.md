# Sisältökirjuri: luovutus 12.11.2026 klo 09.59 (konteksti ~38 %)

Haara koti/Matkakirja-sisaltokirjuri, kaikki commitattu. Edellinen: `viesti-sisaltokirjuri-luovutus-20261111-2230.md`. KK:n päätökset: Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261112-era3-luenta-ja-kuvateksti-paatokset.md (osiot A–D), seulonnat tarkistukset/*.md.

## Valmis tässä sessiossa
- Pariisin tekstit/pulun kuva (7a9a12f26, a4be3cdd9, 3ddd79751); introrivit erä 3 (24 kohdetta, b27110ebe) + Valletta (PR 6594 mainissa, rivit saapumisintro-rivit-valletta-20261112.*); Bergenin 4 Vallettan kuvaa pois (PR 6593 mainissa).
- Kuvatekstikorjaukset erä 3 koodissa: PR 6599 (e398d8b65) + Sofian kyltti "Banja Bašin moskeija" (13 tiedostoa) + introrivi (2ab496c14). Odottaa PT:n yhdistämistä.
- Luentapalojen faktatarkistus: erä 3 (72), jälkitarkistus 2a (28) ja 2b (36); raportit docs/raportit/luenta-faktatarkistus-era3-20261112.md (+ kirjoitusohje-ehdotus lopussa, KK hyväksyi: kortti lahteet-ja-tarkistus, vastuu SK), luenta-jalkitarkistus-era2a|era2b-20261112.md.
- Korjatut luentapalat koodissa: erä 3 PR 6601 (996ff1e3c, 39 palaa + äänitysjono.tsv), 2a/2b PR 6600 (137673d90, 15 palaa). Westminster "Paloon" → "Palosta" PR 6596.
- Äänittäjälle lopulliset tekstit: sk-tarkistus/era3-hyvaksytyt-korjatut.json (+ -lisarivit.json 5 riviä), era2ab-hyvaksytyt-korjatut.json; ok-avainlistat era3/era2a/era2b-ok-avaimet.txt.

## Seuraavaksi (seuraaja)
1. Varmista, että PR:t 6599, 6600, 6601 on yhdistetty (PT); ristiriidat mahdollisia äänitysjonossa/hahmotelma-pakeissa. Äänittäjän kuittaus uusinnoista.
2. NUI:n seuraaja lisää Vallettan + Sofian rivin IntroNimet-tauluun (rivit koti-haarassa).
3. KK:n huomioita avoinna: Luxemburg 1 seulonnan virke "linnoitus sai nykyisen ilmeensä" (arveluttaa); Tukholma #4 ja #6 ilman `lyhyt`; Bergenin avauskuvat 11 (Bergen #6/#7-uusia kuvia ei ole); Vallettalla vain 4 avauskuvaa; kuvatekstien luentajono (jos on) — kuvatekstejä ei ole äänitetty.
4. Kirjoita kortti lahteet-ja-tarkistus (kirjoitusohje: kaksi lähdettä jo kirjoitusvaiheessa, luku vain jos kaksi lähdettä sopii, `lahteet`-rivi tekstin mukana; vastuu SK).
5. Erä 4 introriveille ja kuvateksteille vain KK:n pyynnöstä (kaupunkilista: kysy KK:lta; erät 1–3 kattavat Euroopan 45 kaupungista 45 kohdetta; C/D-ryhmä (Bryssel, Kassa, Ljubljana, Luxemburg, Valletta tehty, 15 valtiota) vasta pyynnöstä).
6. Menetelmä: Sonnet-agentit (ei Fablea), 2 kaupunkia/agentti, kuvat katsotaan mediasta (julisteet/ + kuvat/), lähteet 2 per vuosi, säännöt 1–13; agentit omissa worktreissä + oma PR; tuloksista koonti KK:lle.
7. Scratchpad-työkalut (ei repossa): scratchpad/dump2.mjs (avauskuvat → JSON), luenta/ (palajaot), era3-rivit.py (rivit md+json).

## Opit
- Pack-tiedostoissa `K[kaupunki]` on lista kategorioita; avauskuvat ovat `id:'kaupunki'`-kategoriassa. Tekstit samaa pala-tekstiä useassa paikassa + äänitysjono.tsv (avain = tiivisteestä: `tools/aanitysjono/tarkista.mjs --lisaa --siivoa`).
- Hook "kontekstivahti" näkyy agenttien työkalutuloksissa; he eivät noudata sitä (ok).
