# Natiivi-UI: luovutus 4.11.2026 klo 20.57 (konteksti noin 27 %)

Edellinen: viesti-natiivi-ui-luovutus-20261104-1828.md (haara natiivi-ui/luovutus-20261104-1828). Proto-repo: /Users/Shared/Claude/proto-3d/Matkakirja-proto (ei origin-etärepoa, ei pushia).

## Tila
**Lippu `30193b615`** (proto `natiivi-ui/kartan-kaanto-219`, wt/proto-natiivi-ui-kaanto): simulla kelpaa, tulos KK:lla, rivi PT:llä, odottaa KK:n sanaa. Ei merge-pyyntöä: haara on kääntökokeen päällä (ebc8ce01e "koe, ei junaan"). Kuvat: proto-3d/lokit/nui-lippu-30193b615-20261104/arkki/ (8 arkkia, 4 suuntaa), raakakuvat kansiossa ylempänä.
- `91bf669af`: maarajoja odotetaan 60 s ennen vanhaa ankkuria (MaarajojenOdotusS; tanko piilossa odotuksen ajan, ei siirry jälkikäteen), vaakapuhelimen ylävara 16 pt (säde 61 pt). Testi lisätty, Lippukulma 10/10.
- `30193b615`: striimikartalla tanko vähintään MinKulma (55°) katseesta; ruudun alaosassa lippu litistyi juovaksi suunnissa 135 ja 225.
- Tulos: Norja 68,82 / 19,95 (iPad pysty), 68,91 / 24,05 (iPad vaaka), 67,17 / 16,12 (iPhone); Ranska 48,55 / 4,89, 48,90 / 5,37, 47,69 / 3,85, 47,86 / 3,77.

**`dbbc2bbea`** (proto `natiivi-ui/nousu-pieni-219`): simulla todistettu, kuvat KK:lle (viesti jonossa 20.56). Kuvat: proto-3d/lokit/nui-nousu-napit-dbbc2bbea-20261104/iphone-vaaka-*.png. KK:n sanalla merge-pyyntö PT:lle. Tarkista list_eventsillä, että viesti meni perille.

## KK:n ratkaistavat (kerrottu viesteissä)
1. iPad pysty, Norja 045: lippu paneelin alla (sääntö 5.10., ei vika).
2. Lippu täysikokoinen ruudun keskellä, Raamattu 4.42 sanoo "lähes näkymätön"; vain striimikartta. iPhone-vaakassa noin kolmannes ruudun korkeudesta.
3. iPhone pysty, Ranska: tanko Pariisin nimen vieressä (000) ja pallon päällä (225).
4. c5 lepää noin 16 pt Dynamic Islandin alla (sama jo 63383ba6e:ssä).
5. Loitonnus Ranskaan luennan jälkeen (edellisestä luovutuksesta, sääntö 2.136).

## SEURAAJAN JONO
1. KK:n sanat: lipusta ja dbbc2bbea:sta.
2. **Avoin riski lipussa, ei ajettu eikä korjattu:** `lippukulmat` tallentaa paikan ensimmäisen asennon km-säteellä. Vaaka 369 km on pystyssä noin 392 pt, kun raja on 306 pt, joten iPadia kesken pelin käännettäessä lippu voi leikkautua. Korjaus: km pienemmällä kahdesta asennosta kuten pt:ssä. Ajot olivat erillisiä käynnistyksiä, joten ne eivät paljasta tätä.
3. KS odottaa: ND:n iPad-haara ilman lippua, kunnes lippu on hyväksytty.
4. **Vanhat:** 13.56-luovutuksen kohdat 4 ja 5 (haara natiivi-ui/luovutus-20261104-1356).

## Huomiot
- Skriptit: `laheta` kirjoittaa nyt atomisesti (.tmp + mv) dbbc-skriptissä; lippu-skriptissä vielä vanha muoto, kopioi uusi seuraavaan. Yksi ajo menetti uusi-peli-rivit: tiedostoa ei näy lokissa, syy todistamatta (todennäköisesti luettu tyhjänä).
- `aja`-komennon 3. arvo on kaari asteina: lokit/nui-lippu-30193b615-20261104/kaari.py.
- Skripteissä ei ole mykistystä (Raamattu 12.10): lisää seuraaviin; varmista, ettei trailerin ajoitus muutu.
- Video dbbc-ajosta poistettu; kuvat jäljellä. App-kopiot poistettu kaikista kolmesta ajosta.
- tarkista.sh päivittää tyylikirjan (3 tiedostoa): `git restore` ne.

## Levy
Noin 54 Gt vapaana ennen viimeisiä poistoja.
