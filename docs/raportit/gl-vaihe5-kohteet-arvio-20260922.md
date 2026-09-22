# GL vaihe 5: kohteet (sykkivä halo) ja linssimerkit rungolle — toteutettavuus (Pelikoodari 22.9.2026)

Kysymys (Fable): onnistuuko halo GL:ssä? **Kyllä, pienellä shader-lisäyksellä.**

## Nykyinen CSS2D-kohde (js/pallolauta/merkit.js kohdeElementti)

Yksi svg: (huomiorengas vain lähtövalinnassa) + halo `.target-halo.fokus`
(ympyrän viiva, `stroke-width` 3,4 / 2,4 px ruudun mitassa, animaatio
`kohde-halo` 2,4 s: scale 1,14 → 1,42 ja opacity 0,85 → 0,4, reduced motion
staattinen scale 1,25 / 0,7) + piste `.target-piste` + kaupungin nimi halon
yläpuolella. Napautus reititetään lat/lng:llä (lauta.js `lahinKohde`,
`lahinLinssimerkki`), ei DOM-elementistä → GL-siirto ei koske osumaan.

## GL-vastine (js/pallonimiot-gl.js + glnimiot-sovitin.js)

Rungossa on jo `syke`-attribuutti ja `sykeKerroin`-uniform (hehkupiste:
koon kerroin levossa). Halo tarvitsee toisen kanavan, joka animoi myös
liikkeessä ja säätää peittoa:

- attribute `halo` (0/1), uniformit `haloKerroin` (1,14…1,42) ja
  `haloPeitto` (0,85…0,4); shaderissa `koko *= mix(1, haloKerroin, halo)`,
  `alpha *= mix(1, haloPeitto, halo)`. Sovitin päivittää uniformit
  kehyskoukusta samalla kuin `syke(arvo)` (sini 2,4 s; reduced motion →
  vakiot 1,25 / 0,7). Kustannus: kaksi uniformia, ei geometriaa.
- Kohde = kolme instanssia samassa maapisteessä: halo-rengas (rasteroitu
  ympyrän viiva, `katto` pitää ruutukoon vakiona kuten nappulalla), piste
  (kuten hehkupiste, ilman sykettä) ja nimiö (`dy` halon yläpuolelle,
  nimiorasterit.js sama fontti kuin `.target-nimi`).
- Viivan paksuus skaalautuu renkaan mukana (+25 % laajimmillaan), koska
  sprite skaalaa koko kuvan; CSS:ssä `non-scaling-stroke`. Ero on 0,8 px
  — hyväksyttävä, tai rasteroidaan kaksi rengasta (ohut/paksu) ja
  vaihdetaan puolivälissä.
- Häivytys sisään/ulos: sovittimen `haivytykset` (kylkivaihdon crossfade)
  kelpaa sellaisenaan (`#nimio-vanha`-malli).
- Lähtövalinnan huomiorengas (`kohde.huomio`) jää CSS2D:hen: se elää vain
  pickstart-vaiheessa, jossa GL-runkoa ei kannata herättää.

## Linssimerkit

`lahinLinssimerkki` reitittää napautuksen lat/lng:llä. Merkki on
kuvamerkki (svg → rasteri kuten nostojen tyyppimerkit) + mahdollinen
nimiö; instanssi kuten nosto ilman sovittelua (kiinteä este nimiöille,
kuten nappula). Ei halo-animaatiota → ei shader-muutoksia.

## Työmäärä ja mittaus

Yksi erä: shaderin halo-kanava + sovittimen `jaaPeli` (kohteet ja
linssimerkit rungolle, huomio CSS2D:hen) + `savuke-glnimiot-kohteet`
(kohde rungolla, DOM tyhjä kohteista, halon koko/peitto vaihtelee 2,4 s
jaksolla, napautus avaa kohteen, reduced motion staattinen) + kaappaus
z6/z8 puhelin. Sulavuusvaikutus mitataan kehysprofiililla (porras 5 vs 4
ennen/jälkeen). `?glnimiot=0` pysyy perääntymistienä.
