# Kartuscha: vajaat maat 5 aiheeseen (2026-09-21)

Kaikki 9 alle 5 aiheen maata täydennetty. DNK/FIN/HRV/POL tehtiin
edellisessä sessiossa; tässä erässä BGR/EST/ROU/LTU/LVA.

## Uudet aiheet per maa

- **BGR** (+3): historia (Tsarevets, Madaran ratsastaja, Aleksanteri
  Nevskin katedraali, Sveshtarin kuningashauta), ruoka (jogurttibakteeri,
  banitsa, shopska-salaatti, rakia), kulttuuri (martenitsa, kukeri,
  Chiprovtsin matot, horo)
- **EST** (+3): historia (raatihuone, Mustpeade, Tarton yliopisto, Pirita),
  ruoka (must leib, marsipaani, räim, verivorst), kulttuuri (laulujuhlat,
  kansanpuku, kannel, Kalevipoeg)
- **ROU** (+3): historia (Sighișoara, Poenari, Cuza, Curtea de Argeș),
  luonto (Tonavan suisto, Retezat, Turdan suolakaivos, Bucegin Sfinksi),
  ruoka (mämäligä, sarmale, țuică, viinikellari)
- **LTU** (+2): historia (suuriruhtinaskunta, Gediminas, itsenäisyys-
  julistus, Baltian ketju), ruoka (cepelinai, šaltibarščiai, ruisleipä,
  skilandis)
- **LVA** (+2): historia (Riian perustaminen, Mustapäiden talo, Kolme
  veljestä, vapaudenpatsas), ruoka (musta balsami, sklandrausis, harmaat
  herneet, Jāņu siers)

Yhteensä 52 uutta nostoa, 13 uutta tehtava-kysymystä.

## Prosessi

Tutkimus ja kuvahaku delegoitiin viidelle rinnakkaiselle taustasessiolle
(yksi per maa), jotka tarkistivat kuvat visuaalisesti Commonsin thumb.php-
osoitteesta ja vahvistivat faktat verkkohausta. Itse tarkistin vielä
pistokokein 2 kuvaa per maa, tekstipituudet ohjelmallisesti ja splicasin
sisällön käsin ennen testejä.

## Löytynyt ja korjattu virhe

BGR:n historia-aiheen Madaran ratsastaja -kuva ("...DD 38.jpg") oli
Diego Delson samasta kuvasarjasta kuin jo käytössä ollut
"...DD 39.jpg" (fokuskohteet-bgr.js, maakartat.js) — molemmat
törmäsivät samaan lyhennettyyn peilipolkuun
(`tests/media.test.mjs`: "jokainen kuvatiedosto saa oman peilipolkunsa").
Vaihdettu toiseen, riippumattomaan Madara-kuvaan (Feradz, CC BY 3.0).
Opittu: agenttiohjeeseen pitää jatkossa lisätä myös
fokuskohteet-<iso>.js ja maakartat.js kuvien tarkistuslistaan, ei vain
maa-kategoriat.js:n omaa maablokkia.

## Testit

`node --test tests/*.test.mjs` — 3784 pass, 0 fail, 13 skip (jokaisen
maan lisäyksen jälkeen erikseen ja lopuksi kaikkien jälkeen).
`node tools/tarkista-kaksoisavaimet.mjs` — ei kaksoisavaimia.

## Haara ja committit

`sisalto-kartuscha-vajaat-maat`, yksi commit per maa: LVA (fcb1504c),
LTU (a5820adc), ROU (35277c89), EST (f00d880f), BGR (33407395).
Kaikki pushattu.
