# Karttaseppä: luovutus 5.11.2026 klo 21.42 (KS)
Syy: pehmeä raja 26 %, luonteva tauko, koska seuraava ajo odottaa JU:n vuoroa (7.37). **Voittaa ristiriidassa -2128:n.** W = /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219, haara karttaseppa/nahtavyydet-219, etäpää natiivi-backup, kärki 024338c23 (ajamatta). Python `/opt/homebrew/bin/python3` ilman -I. Testit: `/bin/bash <W>/Kartta-testit/kaanna.sh PariisiKallistus` (zsh ei toimi), 13/13 horisontin jälkeen.

## ENSIN
1. Vahti Monitorilla: `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh`.
2. Pyydä JU:lta (local_b4a7e82a-2522-437f-84ff-813401120931) vuoro: 024338c23 + `_tyo/karttaseppa/sk-pariisi-yhteis.txt`, `ESIKATSELU_PISTEKERROIN=0.465`, ipad, --batch. Lopuksi LUKKO VAPAA + linja + kesto + kuvamäärä.
3. Odottaa KK:lta: Invalidien otto 2 (288647d2a). Suositukseni KK:lle: kelpaa, kunniapihan aukko täytetään pelissä. Tripolle kirjoitetaan vasta KK:n vastauksen jälkeen.

## SÄVY: yhä ratkaisematta, valo on suljettu pois (ajo lokit/esikatselu-20261105-213318)
Ennusteeni ei pitänyt (`_tyo/karttaseppa/savy-ennuste-20261105.md`, kumottu).
- `valo tila` on sama kaikissa 7 kuvassa: rinne 1,00, tasaus 1,00, intensiteetti 0,000, ambientti sama. **Valo ei siis selitä tummuutta.** Suunta ja ajan kulku eivät myöskään: kuvat 1 ja 4 ovat identtiset (120,5).
- Alaneljännes: GP-piste 75° 120,5, 45° 127, 75° suunta 0 130 tummia; GP-piste 85° 168 vaalea; Tuileries 45° 165 ja 159 vaaleita.
- Malleja ja kylttejä tummuus ei koske (max 233 ja 239). Kartta on noin 0,75-kertainen ja taivas vain noin 0,95-kertainen (188,5 ja 200). Kuvat jakautuvat kahteen tilaan: 1, 2, 4, 5 ja 3, 6, 7. Tila vaihtuu GP-pisteessä kulman mukaan, joten pelkkä paikka ei riitä.
- Seuraava epäily, ei todistettu: tileset-varjostimen globaali, joka tummentaa karttaa muttei malleja: `_keilaHamaryys`, `_pallonTummuus`, `_radioHamara`, `_aurinko.w`. Skenaarion lopussa on `valokeila tila` ja `paivanvalo tila`. Jos ne eivät erota kuvia, tarvitaan yksi lokirivi, joka tulostaa globaalit (`Shader.GetGlobalFloat`), ajolle.
- Sivuhavainto: `Pintaosuma.Tiheys` palauttaa 0 tasan itään tai länteen katsottaessa, koska se mittaa vain leveysasteen. Totta laskennassa, ei tämän tummuuden syy. Vaikuttaa karkeiden viivojen piilotukseen. Kerro PT:lle, älä korjaa ilman omaa tehtävää.

## TEHTY
- **Horisontti (omistaja 21.30)** 9071a381b: kartan liuku 2,25-kertainen Pariisissa (`PariisiKallistus.PehmeaLiuku`, 45°:ssa noin 11 % → 25 % ruudun korkeudesta) ja matalissa kulmissa alku 0,85 × d. Raja ennallaan. Mallit ja kyltit käyttävät omaa alkua (`RuutuKohdeAlkuM`), joten rakennus seisoo rajalla kuten omistaja 21.28 sanoi. **Ei nähty pelissä.** 85°:ssa maa on ruudulla niin kapea, että ero voi jäädä pieneksi: katso kuva.
- **Eiffelin maa (omistaja 21.32)** 024338c23: malli 70 m Marskentälle päin (X 669,6, Y 398,9), kiveys 35 m jalkojen ulkopuolelle, joen puoleinen raja suora, väri kartan katu. Skripti `_tyo/karttaseppa/sarja24-asennus/eiffel-alusta.py <alkup> <ulos> 70 35`; alkuperäinen pohja gitistä 024338c23~1. Syy: malli on 300 m ja oikea 125 m (2,4-kertainen), joten jalat jäivät rantaan. Joen etäisyys on arvio (keskipisteestä noin 185 m), **tarkista ylhäältä otetusta kuvasta**. KK:lle kerrottava, että malli on 70 m oikeasta paikasta; koko säilyi.

## TYÖJONO
1. **Yhteinen ajo** (ylhäällä). Parit samasta kohdasta KK:lle: horisontti (vanha savy-6, 213318), Eiffel ylhäältä ja 45° (vanha: omistajan kuva), Riemukaari 24p ylhäältä ja 45° (96a9b2b68, PT: muut alustat Codexilta vasta KK:n kuittauksen jälkeen).
2. **Katsepiste:** KK haluaa saman ajon, mutta se on omassa haarassa `karttaseppa/katsepiste-maa-219` (fb4379432, ei yhdistetä ilman omistajan sanaa). Suositus: tee ajohaara, jossa KatseNousu on komennolla kytkettävä, ja lisää skenaarioon parit 45°, 75°, 85°. Ei kärkeen ilman omistajaa. Skenaariossa ei vielä ole näitä.
3. **Vahtiosumat (PT, ennen junaa, ei ennen nykyisiä töitä):** lista `_tyo/natiivi-ui/vahtiosumat-20261105.md`. Valovahti Komennot 1261, Nahtavyysalue 479, 826; liikevahti Nahtavyysalue 539, 553, 575, 592, 593, 704; Nimikerros 658 (098cf05cd), PariisiKallistus 120 (16ff1de18). Korjaa tai perustele PT:lle rivi riviltä. Rivinumerot on luettu NUI:n haarasta 8814fbffa, joten etsi sisällöstä. Aloittamatta.
4. Pystysauman korjaus (PT, sävyn jälkeen): -2128 kohta 2.
5. Sacré-Cœur pelissä, Montparnasse mitoista, Opéra ja Eiffelin vaalea neliö: -2128 kohdat 4–6. Vaalea neliö voi poistua Eiffelin uudella kiveyksellä, katso.

## Opit
- `ls -t lokit | head -1` voi olla toisen roolin ajo: ota kansio ajon omasta tulosteesta.
- `Kartta-testit/kaanna.sh` vain sh/bash.
