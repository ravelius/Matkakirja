# Natiivisepän luovutus 3.11.2026 klo 23.15 (konteksti 25 %, 7.37)

Vain voimassa oleva tila. Korvaa luovutuksen -20261103-2255. 1622-luovutuksen TILA-osio on yhä voimassa:
`git show afbe75860:docs/raportit/viesti-natiiviseppa-luovutus-20261103-1622.md`. Id:t: /Users/Shared/Claude/osoitekirja.md.
Cron Unity-beeta: luo uudelleen ("4 9 * * *", muisti unity67-paivitysseuranta).
EI testejä, kun `pgrep -fl "[e]sikatselu.sh|[U]nity -batchmode"` näyttää ajon (JU 22.5x).

## YÖTYÖ (PT, omistaja 22.31 "Koita saada Pariisin kartta tehtyä kokonaan")
Sijoita KK:n hyväksymät nähtävyydet peliin sitä mukaa kuin KS/PT ilmoittaa; sillat, kun osat tulevat. Pelikuvat JU:lta → PT → KK.

## ENSIMMÄISENÄ
1. **Kartta-testit AJAMATTA** (PT: ennen kuittausta): `sh Kartta-testit/kaanna.sh` ensimmäisessä välissä, kärjissä 7ee81d262 ja a94d8e7fb. Tulos PT:lle ja JU:lle. Lisätty testi RaivattuTalo (ElavaKarttaTestit). Viimeksi läpi 4819cd07b 603/603; VS:n haaran 597/597. Unity-kääntö vasta JU:n ajossa.
2. JU:n koeajo a94d8e7fb (sk _tyo/natiiviseppa/aluekuva-koko/sk-koko-nahtavyydet-v2.txt, kuvat PT:lle "k11 koe"): kuvista pitää näkyä (PT 23.11): sijainti, raivaus nähtävyyden ympäriltä, erottuuko Montparnassen ruskea kortteleista (jos ei, KS tummentaa). Katso ND:n takana talot kiinni kirkossa, Oikeuspalatsi kadonnut, vene-0…3-kuvista vene pieni ja sillan kohdalla leikattu. C#-muutokset ovat kääntämättä: virheestä JU ilmoittaa.
3. Ennen sitä JU vie ämpäriin: notre-dame-alue-v3, grand-palais-, invalides-, pantheon-, montparnasse-alue-v1, sacre-coeur-alue-v1, opera-alue-v1, _tyo/natiiviseppa/animaatiot-2029-20261103/ → piirroskartta/pariisi/. Pyydetty 23.1x; louvre-alue-v2 viety 23.00; eiffel- ja riemukaari-alue-v1 viety 23.04 (JU).

4. **UUSI TYÖ, PT 23.15 (KK): SILLAT.** Sillat a ja b hyväksytty; KS korjaa kannen värin ja eteläpään ja vie ne kirjastoon. Sijoita OSM:stä lähin suunta kaikille 32 sillalle. 10 siltaa (90° ja 30°) vaihdetaan uusiin perään, kun Codexin lisätilaus tulee. ÄLÄ KIERRÄ KUVIA (kaaret kallistuisivat). Pelikuvasta KK katsoo kannen leveyden kadun leveyteen: ota silta niin, että molemmat näkyvät. Omana committinaan nahtavyydet-218:aan.
5. JU 23.13: 8327359d1 oli jonossa L2:lla VS:n k12-sarjan jälkeen ja sk-kopio otettu ennen päivitystä; korvauspyyntö a94d8e7fb (sk-v2 päivitetty) lähetetty sen jälkeen. Varmista JU:lta, että ajetaan a94d8e7fb uudella sk:lla. sacre-coeur, opera ja animaatiot-2029 on viety 23.13.

## HAARAT (proto-repo, wt/proto-natiiviseppa-maskik4, peili natiivi-backup)
- **natiiviseppa/nahtavyydet-218 kärki 7ee81d262 = hyväksytyt ILMAN k11:tä**: f5b3c3361 (Louvre v2) → f8dd950a0 Eiffel → 6e8e41f65 Riemukaari → 6d1321c2f Sacré-Cœur → 60394e8e4 Opéra → a6efbacae Oikeuspalatsi pois → f935e5269 ND:n kehä pois → 2f9dd10c3 veneet → feda4d248 ND v3 → fe266d5c3 Grand Palais → 4e52b7128 Invalidit → 63a695670 Panthéon → 7ee81d262 Montparnasse.
- **natiiviseppa/koko-koe-218 kärki a94d8e7fb = edellinen + VS:n koko Pariisi k11 43df66241. KOE: PT 23.0x: EI junaan eikä ämpäriin ennen KK:ta; kuviin "k11 koe".** Worktree on nyt tässä haarassa. Uudet nähtävyydet: ensin nahtavyydet-218:aan omana committinaan, sitten merge koko-koe-218:aan.
- natiiviseppa/koealue-elava-218 9528c1d53 = JU:n aiempi koeajo (Eiffel + Riemukaari + k11 samassa); älä jatka tästä.

## Päätökset (PT/KK)
- Hyväksytty: ND:n sijoitus 993075f27 ja kaikki 9 G-nähtävyyttä (Louvre 0,91, Eiffel, Riemukaari, Sacré-Cœur, Opéra, Grand Palais, Invalidit, Panthéon, Montparnasse). Eiffelin yläosa saa peittää takana olevaa Seineä, jalat maalla (omistaja 22.14). Eiffelin suhde ympäristöön ja Riemukaaren aukio katsotaan pelikuvasta.
- Oikeuspalatsi pois, tavallinen kortteli; KS tuo pienen Sainte-Chapellen Codexilta → sijoita kun tulee.
- PT:n korjauslistan kohta 3 (nimet) on KS:n, ei NS:n.
- Raivaus: maskilla talo lähtee vain koko talon ollessa kuvan alla, julkisivun edusta kattopisteestä (ElavaKoealue.RaivattuTalo; koskee kaikkia aluekuvia). HdV ja TSJ käyttävät yhä monikulmiota.
- Vene: pituus_koealue_m (0,47 × vanha), reitin "sillat" OSM:stä (17 siltaa, 36–58 m), kuva ja vana leikataan sillan kohdalta vain striimikartalla (PiirrosKerros.Animaatiot). Työkalu esineet/veneet-koealue.py (ajettava vain kerran, koska lukee ja kirjoittaa saman JSONin; uudelleenajo vaihtaa vain samat kentät).

## Työkalut (_tyo/natiiviseppa/esineet/, ei gitissä; muutettu tänään)
- tee-esineet.py: määrittelyn "rajaus" (koko Pariisi, saa olla koealuetta laajempi), "nahtavyydet_lisa" (koealueen ulkopuoliset: avain, lat, lon), maskin "edusta". Uusi aluekuva: rajaus4-rajaus alueet/, `osakirjasto.py lisaa … --kopioi --ankkuri <lev//2> <kork//2>`, kaupunki-pariisi-k4vt-alue.json nahtavyydet + nahtavyydet_lisa, `python3 -I tee-esineet.py kaupunki-pariisi-k4vt-alue.json <checkout>`, commit, JU: vienti + ajo.
- osakirjasto.py korvaa päivittää nyt koko_px:n. raivaus-kuva.py käyttää samaa koko talo -sääntöä.
- Tarkistuskuvat: proto-3d/lokit/natiiviseppa-maskiraivaus-20261103/ (aluekuva-eiffel-riemukaari.png, raivaus-koko-talo-nd.png).

## AVOIMET
0. KS 23.1x: terävä vaalea kiekko nd-keski.png (1810, 545) ND:n ja HdV:n alla. Ei esinekerroksen aukio eikä ND:n taso; kaupunkimerkkiä (KaupunkiMerkit, Pariisin piste HdV:llä) ei ole suljettu pois. Katso koeajon kuvasta, tulos KS:lle.
1. Puut ja aukiot vain vanhalla koealueella: KS:ltä pyydetty koko Pariisin puut.json + esinepaikat.json; odottaa.
2. Sillat: KS + Codex (kivisilta-arkki), sijoitus OSM:stä; tulee myös veneen sillat-tietoon vertailu.
3. Moni kaupunki: toiselle ElavaKoealueelle KoealueenRaivaus-kutsu Laattapalvelin.Awakeen.
4. Vanha jono: 354 ms PostLateUpdate → xctrace (JU:n laitevuoro); GC-haara vasta PT:n luvalla.
5. Hylätyt, älä yhdistä: natiiviseppa/kertoimet-takana-218, abc7c5ae5, natiiviseppa/maskiraivaus-218, natiiviseppa/maskiraivaus-k4-218.

## TILA (worktreet)
- wt/proto-natiiviseppa-maskik4 (nykyinen), -raivaus, -kertoimet, -koealue: älä poista. Luovutushaara natiiviseppa-luovutus-2052 (PR 6215).
- PT (levy 67 Gi): poista luovutus-worktreet --poista:lla, kun PR on mergetty. 1622 poistettu; 1708, 1845, 1905 PR auki; 2015:llä ei PR:ää; 2052 on käytössä.
