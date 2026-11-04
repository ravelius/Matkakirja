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

## LISÄYS 4.11. klo 21.0x: KK:N PALAUTE LIPUSTA (seuraajan ykköstyö, korvaa jonon kohdan 1 lipun osalta)
KK: lippu 30193b615 ei vielä omistajalle, eikä mergeä (koe, ei junaan). Koko lippu ruudussa ja Norjan paikka kelpaavat. KK:n sanat sellaisinaan:

1. VÄRI: suunnassa 135 punainen haalistuu vaaleanpunaiseksi (ipad-pysty-FRA-135, iphone-pysty-FRA-135, iphone-vaaka-NOR-135), ja suunnassa 045 sininen harmaantuu (oma rajauksesi). Tavoite: lipun värit näyttävät samoilta joka suunnassa; kartan kääntö ei saa muuttaa kankaan valoa.
2. KOKO iPHONELLA: kolmannes ruudun korkeudesta on liikaa (omistaja 27.10. 13.25: "ei saa kasvaa", "ihan valtavan kokoinen"). Tavoite: lippu on merkki eikä kuvan pääosa, ja iPhonella se vie ruudusta suunnilleen saman osuuden kuin iPadilla.
3. NIMI: tanko halkaisee Pariisin nimen myös iPhone-vaakassa suunnissa 000, 045 ja 225, ei vain pystyssä. Tavoite: tanko ja kangas eivät osu kohdekaupungin nimeen eivätkä nappulaan yhdessäkään neljästä suunnasta. Tarkista ensin, riittääkö kohdan 2 korjaus.
4. MERKIT KANKAALLA: iphone-vaaka-FRA-135:ssä kaupunkipiste ja ratas piirtyvät kankaan päälle, iphone-pysty-FRA-225:ssä lintumerkki. Tavoite: kangas peittää kartan pienet merkit. Jos tämä on iso työ, kerro äläkä tee.
5. LAITTEEN KÄÄNTÖ: aja iPad vaaka → pysty → vaaka samassa ajossa. Tavoite: koko lippu pysyy ruudussa. Korjaa, jos leikkautuu.

Arviot: iPad pysty, Norja 045 paneelin alla kelpaa, KK kertoo omistajalle. Täysikoko ruudun keskellä (poikkeama 4.42:sta) on omistajan päätös: KK kysyy sen korjattujen kuvien kanssa, joten sitä ei muuteta nyt. Sama kuvasarja arkkeina KK:lle, kun korjaus on valmis. dbbc2bbea: KK:n vuoro ennallaan; tarkista, onko sen vastaus tullut erikseen.

Lähtökohdat, ei todistettuja:
- Kohta 2: lippu on kiinteä 120 pt (Lipputanko.KorkeusPt): iPadilla noin 9–12 % ruudun korkeudesta, iPhone-vaakassa 30 %. Saman osuuden tavoite on noin 40–50 pt; katso MinNakyvaPt 36 ja kangas pienenä. Pienempi lippu kasvattaa KiertoSadePt:n sädettä, joten kulma ja kuvat vaihtuvat: aja kaikki uudelleen.
- Kohta 1: 91bf-ajosta lähtien kangas on ruudun oikealle (Lipputanko, liehunta "ruutu"), mutta valo tulee maailmasta. Etsi kankaan valon laskenta varjostimesta ennen korjausta.
- Kohta 5: ks. jonon kohta 2 (km pienemmällä kahdesta asennosta). Ajo: skriptiin `ui kierto` samassa käynnistyksessä, atominen `laheta`.

## LISÄYS 2: KK:N SANA dbbc2bbea:STA (seuraajan toinen työ)
KK sanasta sanaan: "dbbc2bbea kelpaa valtuutuksella (katsoin 4 kuvaa): haku, ☰ ja kortti jäävät näkyviin. Korjaa samalla c5:n lepopaikka: kuvan reuna ei saa jäädä Dynamic Islandin alle. Yksi simukuva c5:stä riittää. Sen jälkeen merge-pyyntö PT:lle, kuvaa ei tarvitse tuoda minulle. Ajoitusta ei voi arvioida tästä ajosta, kuten sanoit."
Lähtökohta: c5 lepo -244,-39, koko 316×237, kuva vasemmalla noin 35 pt; Dynamic Island ulottuu noin 51 pt:iin (ajon iphone-vaaka-c5.png). Haara natiivi-ui/nousu-pieni-219, TraileriLiike.NousuLepo. Skripti lokit/nui-nousu-napit-dbbc2bbea-20261104/ajo.zsh; simuvuoro JU:lta; app-kopio on poistettu, joten poista käännöksen ohitus tai käännä uudelleen.
