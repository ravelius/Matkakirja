# Palatsin pintakuvat: katto, friisi ja rappaus

Neljä muunnelmaa jokaisesta, Lavastajan 7eb80206:n UV-mitat. Kaikki pinnat ovat paikallisia PNG-materiaaleja; geometrian, törmäykset ja pelin koodin tekee vastaanottaja. Ei uusia Tripo-malleja.

| Pinta | Kuva | Metrit | UV/toisto |
|---|---|---|---|
| katto | 512 ×512 | 1 ×1 | X/Y repeat, u räystään suunta, kuvan yläreuna harjalla, alareuna alamäkeen |
| friisi | 2048 ×512 | 4,13 ×1,03 | X repeat, Y clamp, yläreuna räystäällä |
| kultalista | 512 ×32 | 1 ×0,06 | X repeat, Y clamp |
| rappaus | 2048 ×2048 | 4 ×4 | X/Y repeat, u seinän suunta, UV-v ylös maasta |
| rappauksen alalika | 2048 ×256 | 4 ×0,50 | X repeat, Y clamp, maailman Y 1,20…1,70 m |

Albedo sRGB, kaikki muut kartat lineaarisina. Normal on tangenttiavaruuden OpenGL +Y. Tarvittaessa DirectX-importeri kääntää vihreän kanavan, ei koko kuvaa. Roughness: valkea karhea; smoothness=1−roughness. Katoille ja rappaukselle metallic=0, friisin kultakohtiin ja kultalistaan mukana erillinen maltillinen metallic-kartta (0,7 kullassa, 0 muualla); sitä voi pienentää pelin valaistusvertailussa.

Katto: neljä pyöreää kansitiili/koururiviä metrillä, neljä 0,25 m limitystä alamäkeen. Normaalikartta on laskettu kaarevasta profiilista; korkeusvaihtelu noin viisi senttiä. Vapaaehtoinen 16-bit height: arvo/65535 ×0,065 −0,025 metriä. Käytä oletuksena normalia, älä lisää displacementia tai törmäysgeometriaa automaattisesti. Normal ei muuta katon siluettia tai peitä räystästä; valmiit räystään päätetiilet/harja säilyvät. 2D-esikatselu valaisee tätä profiilia, mutta ei osoita pelin vinon kameran lopputulosta.

Friisi: neljä kukka-/pilvi-/köynnösaihetta. Alkuperäiset kolme liian huonosti toistuvaa ehdokasta säilytetty erillään; toimitetut 1–3 ovat kokonaan uusia kuvia. Variantti 4 on ensimmäisen kierroksen parannettu reunaratkaisu. Toistossa ornamenttien väliin jää kapea sinivihreä rauhallinen alue. Native-kuva 2172 ×724 on normalisoitu kokonaisena LR:n 2048 ×512 UV-suorakulmioon ilman rajausta tai käsinmaalausta: ornamenttien kuvasuhde siis muuttuu, sitä ei väitetä alkuperäisen pikselimitan säilymiseksi. Kultakuvion kohotus 0,35 mm, height=arvo/65535 ×0,001 m. Toistoreunat ovat visuaalisen toleranssin sisällä (keskiero noin 1,15–2,15/255), eivät pikseli-identtiset: etenkin kultaviivan satunnainen noin pikselin porrastus pitää arvioida pelin lähikameralla. Saumat esikatselu/friisi-vNN-toistosauma.png.

Rappaus: neljä sävy-/laikkumuunnelmaa. Native-pohjat 1254 ×1254, toimituksen 2048 px ei ole natiivi 2K-generointi. Materiaaligraafi näytteistää muuttumattomia pohjia neljällä jaksollisella UV-projektiolla pehmeästi; toistorajat jatkuvat, mutta mahdollinen toiston havaittavuus arvioidaan 4 m ruudukolla pelissä. Normaali on maltillinen alle millimetrin pinnan vaihtelu, ei näkyvien värivarjojen automaattinen syvyysarvio. Height=arvo/65535 ×0,002 −0,001 m.

Alalika on erillinen RGB-pintanauha samasta rappauksesta ja lisäksi lineaarinen dirt-mask: 0 ei likaa, 255 täysi. Nauhan alareuna tulee sokkelin yläpuolelle 1,20 m korkeuteen, yläreuna 1,70 metriin. Kuva on laskettu pääseinän maasta alkavan 4 m UV-vaiheen mukaan, joten nauhan yläreuna vastaa seinän samaa kohtaa. Jos LR:n seinä-UV alkaa eri korkeudesta, käytä dirt-maskia oman seinän pohjavärin päällä tai siirrä UV-vaihetta; älä liitä eri varianttia tai eri UV-vaihetta saumattomuuden oletuksella. Lika on materiaalin värikerros, ei valaistu varjo. Height ei vaikuta törmäyksiin.

Kaikki esikatselut ovat teknisiä materiaalikuvia havainteen rinnalla. Varsinainen sama kamera + sama valo -parikuva on LR:n seuraava vaihe. Vastaanottokuittaus, peli-integraatio, KK ja omistajan hyväksyntä ovat erillisiä ja avoimia. Palautteeseen variantti, tiedoston SHA, importin väriavaruudet/normal-suunta ja kuvapari.
