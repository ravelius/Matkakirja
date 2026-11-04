# Valosepän luovutus 4.11.2026 klo 08.02

Syy: konteksti 26 % (pehmeä raja, Raamattu 7.37). Edellinen: viesti-valoseppa-luovutus-20261104-0733.md (lue sen Opit ja Työkalut; sen kohta 1 odottaa). Loki: /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md. Tulokset _tyo/linssiseppa2/pariisi-tyyli/: k46/TULOS.md, k45/TULOS.md, k45/yhd5/TULOS.md. KK:n linja: lokit/kk-peli-a94d8e7fb-20261103/KORJAUSLISTA.md, osio "VS: k46".

## Tila (haarat natiivi-backup, wt /Users/Shared/Claude/wt/proto-linssiseppa2-k30, nyt haarassa pariisi-k46-koe, puhdas; ei junaan)
- **k46b a0ee9fd92** (linssiseppa2/pariisi-k46-koe, k44 e97f26bcc:n päällä, EI k45:ttä, p46b, 617/617, pushattu; ei yhdistelmään ilman käskyä): arkki kaupunginosittain (bulevarditalot, vanha sokkelo, matala laita), vaihto vain kadun kohdalla (ElavaTyyli.ArkkiKartta). KK 07.57 väri ja kontrasti bulevarditalojen tasolle tehty (k46/tasaa.py). z15 kartalta R-B 55 | 54 (k46 68). PT:lle lähetetty 08.0x, **KK:n vastaus odottaa: pari-z15b.jpg, pari-z14-z15.jpg.** Jos KK näkee laikut yhä: arkki vaihtuu vasta z16:lta (`Materiaalista`: z == 15 → osa 0) ja z15 | z16 -kuva KK:lle.
- Kaupunginosien rajat ovat oma arvioni (ElavaPariisi.LahiOsa). Matala laita ei näy paikallisissa kuvissa: data vain 48,836–48,894 / 2,307–2,373, ja OpenFreeMapin robots.txt palautti 403, joten uutta dataa en hakenut. Laita ja muisti (2 arkkia 4,7 Mt + mipit, arkkikartta 0,26 Mt / z14-pala) laitteelta.
- z14 | z15 ruskea/harmaa näkyy yhä, sama kuin k44:ssä (KK k42/2), ei k46:sta.
- k45 3df4b748d, k44 e97f26bcc: tila kuten edellisessä luovutuksessa; PT ei ole kuitannut k45:tä. k46 ja k45 on tehty erikseen k44:n päälle; yhdistelmässä pieni ristiriita versiossa ElavaPariisi.Alue.
- yhd5 katsottu loppuun (y-eiffel, ecole-lahi: ei saumoja eikä lohkoja; École militairen viuhkakatot tarkistettava laiteajosta, k45/yhd5/TULOS.md kohta 6). r-0-21-paluu vain erokuvana.
- Sumeat kulmalohkot: syy NS, _tyo/natiiviseppa/aluekuva-koko/lohko-havainto.md (maastopala L14, ei jono). Katsottava seuraavasta laitekuvasta k44-pinnalla.

## Seuraavaksi
1. **KK:n vastaus k46b:stä** (ks. yllä).
2. **Kun PT käskee: yhdistelmä,** PT päättää mitkä (k44, k45, k46), laitteelta kuva KK:lle ennen hyväksyntää, muisti ja vieritys. Ehdot edellisen luovutuksen kohdassa 1.
3. **Pienet kohdat jäljellä, ei aloitettu:** z17:n Seinen rantaporras (z16:lla sigma 10 m vaatisi yli 64 näytteen varan), saaren kärki z15 | z16, toisto 1,7 km. Vaaleat porrasreunaiset rakennukset laiteajosta.
4. **Vyön puistot** ja vanhat: kuten edellisen luovutuksen kohdat 3 ja 4.

## Opit
- Arkkien vaihto ruuduittain katkaisee taloja z17:llä näkyvästi; vaihto katuverkon rajaamissa kortteleissa ei. Kortteli on iso ilman minor-katuja, joten kaupunginosan raja seuraa isoja katuja eikä monikulmiota.
- Korttelin viitepiste: palarajalle ulottuvalla ensimmäinen reunaruutu, muuten keskipiste. Poikkeus (kortteli ylittää monta palarajaa) voisi näkyä suorana leikkauksena; ei nähty kahdessa katsotussa kohdassa.
- R-B-mediaani arkista ei riitä: kartalta mitattu rajattu alue (k46/parit3.py) kertoo laikut suoraan.
- Tarkista NS:n kansio ennen omaa syytutkimusta: lohkojen syy oli jo kirjattu.

## Työkalut
Kuten edellisessä; k46/aja.zsh <wt> <ulos> <z> [alue] (data k46/data, 12 z14-palaa), parit k46/parit2.py ja parit3.py, tasaus k46/tasaa.py <malli.rgb> <arkki.rgb> <ulos.rgb> (ennen-arkit k46/ennen/), numpy vain venvissä tulivuoret/venv.
