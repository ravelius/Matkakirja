# Pelikoodari: luovutus 4.11.2026 klo 08.01 – musta maa: syy auki, koerungon korjaus ei toiminut

Korvaa -0735:n kohdan "Musta maa" ja rungot; sen kohdat "Kun JU ilmoittaa" 2–5 ja "Muistiinpanot" voimassa, mutta 40 × odottaa uutta runkoa. Syy: Postivahdin nollaus. Ei omia taustaketjuja. Polut kansiossa /Users/Shared/Claude/proto-3d/. Tulokset: `lokit/pk-muistipiikki-219/TULOS.md`, loppu (lue 07.4x alkaen). **Merkitse jokaiseen tulokseen runko.** Tilin ids: PT local_8d8ebf72, KK local_d5f31591, JU local_2a7d6c96.

## Rungot (Matkakirja-proto, haarat paikallisia; wt/proto-pelikoodari-juna-koe on haaralla `-koe2-tayte-ovi`, puhdas)
- **be28de835** `juna-218-koe2-uudestaan`: viimeisin rungon pohja. **PT: 1d37 pois koerungosta;** uusi koerunko vasta korjauksesta.
- **1d3751841** `juna-218-koe2-tayte`: täyte pois vapautuksesta. **EI KORJAA (47,1 %).** Koodin kommentissa väärä selitys: poista, kun oikea korjaus tulee.
- **9066f9814** `juna-218-koe2-tayte-ovi`: 1d37 + lähitaso, 827/827. Korvaa 32100a96f:n. Uuteen runkoon poimitaan vain lähitaso (`git cherry-pick 32100a96f`).
- **0462bf904** `diag-tayte-kanavat`: DIAG, ei junaan. Kanavaloki `MATKAKIRJA kanavakoe:` ja `palatsi taytekoe -1|0|1|2`.
- **eec900eb3**: vertailun toinen puoli (musta 47 %, kopiot vapautettu).

## Musta maa, todettu (kaikki Macilla, alkulento; laitetta ei katsottu)
| Ajo | Kansio | Musta |
| eec900eb3 | esikatselu-20261104-071522 | 47,2 % |
| be28 + `kopiot 1` | -073534 | 0,0 % |
| be28 + `tayte 0`, kopiot vapautettu | -074018 | 0,0 % |
| 1d37: täyte luettava, muut vapautettu (5966 verkkoa) | -075024 | 47,1 % |
| 7ddd353e8 (217), taso 1 | -074413 | 0,1–0,23 %, mutta EI TODISTA: ei lentoa, kamera y ≤ 3,11 |

- **Päätelmä:** musta on täytteen pinta (täyte pois → kiveys), ja se syntyy vain, kun MUIDEN verkkojen kopiot vapautetaan. Täytteen oma vapautus ei ole syy. Lokit kopiot-ajon ja korjausajon välillä eroavat vain vapautusrivissä (palatsi v2 -rivit verrattu).
- **Täyte:** `LuoMaanTayte`, Palatsi.cs; verkossa vain kärjet ja normaalit, lainaa kk-tausta lod2:n lattiamateriaalin; JuoksuLattia.shader lukee TEXCOORD0 ja 1 (`_BaseMap` uv:lla, `JuoksuLeivottu(uv1)`). Pihoilla täyte on oikeasti näkyvä pinta.
- **`KopiotJaavat` vaikuttaa vain:** `VapautaVerkkojenKopiot` alussa `yield break`. Vapautus lisää noin 5,5 + 1,5 s ennen `LatausValmiit`. Ajoitus on siis yhtä hyvin mahdollinen kuin kopiot.
- **Hypoteesit, ei todisteita:** (a) ajoitus, (b) puuttuvat kanavat ja piirtotila, (c) materiaali tai kuva, jota kopioiden tai ajoituksen mukana muuttuu.

## Odottaa JU:lta (ketju: diag2 → tf217lento → tahti0 → diag1 → 9066f9814 reitti)
Mittaus: `python3 -I -W ignore _tyo/pelikoodari/musta-lento/musta.py <kansio>/av`; pari: `pari.py` (vaihda polku, argv ulostulo). Kansio `musta-lento/<nimi>/kansio.txt`, rivi "MUSTA AJETTU".
1. **diag2** `0462bf904 "palatsi taytekoe 2"`: täyte vapautuu uv0:n ja uv1:n kanssa. 0 % → kanavat syy: korjaus = kanavat verkkoon, ja `MATKAKIRJA kanavakoe:` -riveistä muut samanlaiset PT:lle (PT 07.49). Lue kanavarivit joka tapauksessa.
2. **tf217lento** `7ddd353e8 "taso 0"`: 217:n koodi samalla lennolla. Musta → vika ollut 21.10. alkaen; ehjä → jokin muuttui (osasarja-v8, tausta-v115, koodi, 9f8d2d13f paloina). Rivi KK:lle ja PT:lle.
3. **tahti0** `1d3751841 "palatsi kopiotahti 0"`: 0 % → ajoitus (paloina-vapautus 9f8d2d13f). Muisti nousee: 9f8d:n syy oli muistihuippu.
4. **diag1** `0462bf904 "palatsi taytekoe 1"`: vain uv0.
5. **9066f9814 reitti:** `peitto-reitti/9066f9814/`, vertailu eec900eb3 | 9066f9814 (KK:lle kerrottu); -0735:n kohta 1. Eec:n ajosta kirjattu: taivas poissa (latauskuva 1,30 s, 12/12), uu:n peitot = Puyi astiapöydän takana, sa 0.
6. **iPad:** `pk-lento-laite.zsh` (JU:n; 1d37, 8 + 8 kuvaa, oikea polku) ja `laite.zsh 7ddd353e8 0` → `musta-lento/laite-7ddd353e8/`. Tulos KK:lle ja PT:lle, kun laite katsottu (PT 07.49).

## PT:n ehdot (07.5x)
- **Seuraava korjaus kuitataan vasta, kun ajo näyttää mustaksi 0 % ilman kopioiden pitoa.** Aja ensin, kerro vasta sitten. Ei selitystä ennen ajoa.
- **Jos syy ei selviä kohtuullisessa ajassa:** rivi PT:lle kopioiden pidon muistihinnasta oikealla rungolla. Varaa vain 33 Mt (4047/4080). Vanha arvio 330–370 Mt (`lod-korjaus/TULOS-muisti.md`), oikealla rungolla mittaamatta.
- **40 ×** (`pk-mittaa-uusinta-nappi.zsh <runko> 40 40`): JU odottaa rungon shaa minulta.
- **KK:lle lupaus:** kuva samasta kohdasta ennen ja jälkeen, kun korjaus on todistettu. KK ja PT tietävät, että 1d37 ei korjannut.

## kopiot 1 -todisteet (PT:lle kerrottu)
Macin kuvatallenteet 1.–3.11. (sali-218*, reitti-216, tallenne-217, tallenne-218t, palvelijat, muuri-koe, korjaus-218) eivät näytä mustaa. Muistista vain juoksu 2e2dfaf36 ja cb8b1f06c, jo hylätyt; oleskelu- ja xf-lokeista rivi puuttuu.
