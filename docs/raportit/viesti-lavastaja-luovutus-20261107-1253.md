# Lavastajan luovutus 7.11.2026 12.53 — riittää yksin (korvaa -1209)

A = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri/aukot. Loki: muuri/KORJAUS.md, loppu. Luovutus kontekstin takia (27 %).

## Tehtävä nyt (PT, omistaja 12.50)
Muuriaukko korjattava ennen junaa 220. Tavoite: kamera 262 4 -75 -141 15 80 näyttää iPadilla koko seinän. Kivet palaavat junaan JU:n kautta (omistaja 12.09). v127 ei vientiin nyt, irti kivistä vain PT:n sanalla. PT: ei neljättä koeajoa ilman uutta syytä.

## Seuraava askel
Odota JU:n kuittausta: seina3 (pid 62787, a8b873e5d, vahti pois, A/sk-seina3-ipad.txt, loki lokit/linnanrakentaja-seina3-ipad). Katso pelia.png ja raja-x.png täysikoossa. Skenaariossa `palatsi osasarja-valo 0`.
- Seinä näkyy pelia-kuvassa = syy leivotussa instanssimateriaalissa (JUOKSU_LEIVOTTU + instansointi, _LeivottuST, LeivotutMateriaalit, Osasarja.cs 311-322; JuoksuMaailma.shader 229-247).
- Ei näy = rajaus tai muu piirto. Ehdokas: r.maailma lasketaan vain Viimeistele:ssa (Muurikate.cs 460), PiirraInst käyttää sitä worldBounds:na; piirtomatriisit päivittyvät juuren siirtyessä (rivi 534). Lisää tilapäinen lokirivi tai korjaa ja todista.
Sitten korjaus, rivi PT:lle: syy, korjaus, sha. Koodimuutos kuuluu ehkä PK:lle/NS:lle: katso docs/vastuukartta.md. Ajo vain JU:n vuorolla.

## Todistettu
- Koskee julkaistua: seina2 (lokit/linnanrakentaja-seina2-ipad/pelia.png, a8b873e5d, ei kiviä, ei bottia): seinä puuttuu. Kivet eivät aiheuta.
- Koko toisto-osa seina-2m-t80 puuttuu (punainen, friisi, konsoli, C3-kate). Kivijalka on pursotus, siksi näkyy.
- Muu kuin osasarja: leijuva laatta y noin 4-4,5 on peittopisteiden lukema ennen sarjoja; päätelty, ei mitattu. Macilla seinän sisällä.
- Runko kaikissa lodeissa (SHA = julkaistu); lataus ok (konsoli 1333); sama osa näkyi iPadilla raja-x:ssä (kivisivu10, polku muuri3-lansi-etela-13); atlakset kaikki 1024; JUOKSU_LEIVOTTU multi_compile.
- Vanha raja-x kuvattu 8 s kameran jälkeen; atlas ehkä kesken, ei todistettu. Mac-parin koodi e1b8a1091, ei a8b873e5d.

## PT:lle jo vastattu
Viiru = ruudun päällä, ei 3D (päätelty alkuvalikoksi). 404:t: a3/a5 lod1 eivät näy; pursotukset rakennetaan pelissä. Huippu 4282 Mt latauksen lopussa, QA-liput päällä. Alkuvalikko: sk-seina*-ipad-tiedostoista puuttuu rivi `alku odota-tila Aloitus 40;uusi-peli 5 lontoo;odota-tila Kartta 40`: lisää se seuraavaan skenaarioon.
Ovet: Taihedian kuvattu 6.11.; v127 ja lattiareiät auki.

## Varo
Kolmio-, laatta- ja raitarajaukset ennallaan (f503bac20). v115pala ei vientiin. Kartta (jalat) on PK:lla.
