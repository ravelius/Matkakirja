# Pelikoodarin luovutus 25.10.2026 klo 06.43 (Postivahdin raja 34 %)

## Tila lyhyesti

- Juna 210 auki. NS:n runko `natiiviseppa/juna-210` 0fef31c8f sisältää kaikki tämän vuoron erät (6b8b2ac4a: + pelikoodari ensiruutu 88ebe19be).
- Jono: **(3) täysi kuva-ajo** (01/02/03/05 + piha, muurikujan video, lautaspöytä, 03A/B, 04 juhlasali) **vasta rungosta, jossa VS:n
  valokorjaus** (pihat, 03 marmori, 04 lattia palavat puhki) — PT 06.0x. Ennen kuvapyyntöjä muodot havainne-editorilla:
  `REF=<haara> zsh tyokalut/havainne/editori.sh kaikki` (wt/proto-natiivi-ui-havainne-editori-210, 5a2196375; kohdat 01–07, 04 = sali
  QA-sijoituksella, 07 = testikamera 380 m). Simu ei käytössä (SIMU VAPAA lähetetty JU:lle 05.4x).
- Ei ajossa olevia prosesseja.

## Haarat (proto, /Users/Shared/Claude/wt/)

| Haara | Kärki | Tila |
|---|---|---|
| pelikoodari/ensiruutu (wt/proto-pelikoodari-ensiruutu, pohja 14359846b) | 88ebe19be | kaikki junassa 210 (0fef31c8f) |
| pelikoodari/verkko-paallekkaiset | 965d67df1 | junassa (eeaa1a4db) |
| pelikoodari/kaukopuut-07 | c18a8a0b5 | junassa |

ensiruutu-haaran commitit: 7caa1f01f (lähipuiden/-koristeiden variantit + latvuksen häivytyskopio Lammitaan; nykäysriville pelisilmukan
vaiheet ja syyt, merkinnät "lähimalli uusi"/"lähipuu häivytys"), 57a44b422 (avoimen huoneen ovet aukeavat myös keisarin ollessa
huoneessa: 04 salin pohjoisovi auki, piha näkyy), d7d85b5d5 (kauko-/keskipuiden latvuksille runko + kaukopuille JUOKSU_KORTTI),
88ebe19be (LahipuutKansio → kielletty-lahipuut-v5/).

## Tehty tässä vuorossa

1. Lähipuut v4: NS teki osoittimen (14359846b); v5 PK 88ebe19be (JU 06.10, 44133d38db15).
2. **217 ms:n ensiruutu** (LT 211k-029, vain 1ja-ajossa, ei 2reiteissä; merkinnät tyhjät): todennäköisin syy lähipuiden/-koristeiden ja
   latvuksen häivytysvariantin ensikäännös (eivät olleet Lammitassa) → 7caa1f01f. **EI VIELÄ VAHVISTETTU**: seuraavan LT-ajon
   nykäysriviltä katsotaan "vaiheet:" (PostLateUpdate/ulkona = piirto) ja merkinnät.
3. **Ovet 04** (PT): 57a44b422. Laajentaa omistajan 24.10. 14.39 sääntöä ("reitin ovet") huoneen omiin oviin; PT:lle kerrottu.
   Vahvistettu editorissa rungosta 8e5b1a506: lokit/esikatselu-20261025-0559/sali-04.png (ovi auki), piha-159-298.png (v4-puut reunoilla).
4. **Alkulento t3** (NUI-kuva 029bb8aa): leijuvat vinoneliöt = runkottomat latvukset → d7d85b5d5 rungot. Iso kolmio ja editorin 07:n
   vaaleanvihreät kolmiot = **LR:n taustan maapintaa**, ei PK:n kerroksia (todiste: 07 ilman kauko-/lähipuita/-koristeita,
   lokit/esikatselu-20261025-0623/puut-pois-07.png) → PT:lle, LR:n asia. Punainen leijuva laatta horisontissa = LR:n ulkorengas/kaukomaisema.
5. v7b-kuva-ajo katkesi nollauksessa 05.36: valmiina iPad 04/03AB (lokit/havainne-04-ipad-v7, havainne-03ab-v7) ja kulma-810-pari-v7.

## Avoimet

- (3) täysi kuva-ajo VS:n valokorjauksen rungosta (PT:n sana).
- 217 ms: vahvistus seuraavasta LT-ajosta (jos toistuu, nykäysrivin vaiheet kertovat suunnan).
- d7d85b5d5:n rungot alkulennossa: vahvistus seuraavan rungon alkulentokuvasta.
- Käännösnykäykset 12/9 (raja 8) ja 04-havainnot (VS/LR) edellisestä luovutuksesta ennallaan.
