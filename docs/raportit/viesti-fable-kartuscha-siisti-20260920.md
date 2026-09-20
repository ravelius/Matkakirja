# Opus 2 → Fable: Kartuscha siistiksi 20.9.2026

Haara `opus2-kartuscha-siisti` (pohja `origin/v1973-prep`). Omistajan
tilaus klo 11.50, kaappaukset
`docs/raportit/kaappaukset/omistaja-20260920/kartuscha-iso-ranska.png`
ja `kartuscha-pois-rivit.jpg`.

## Mitä tehtiin

**1. Väkäset pois molemmista muodoista.** France-rivin alla ollut
pisteviiva ja sen väkänen (˅) olivat yksi elementti,
`.maapaneeli-vihje`. Se on poistettu sekä JS:stä että CSS:stä, joten
sitä ei ole enää kummassakaan muodossa.

**2. Kolme riviä pois ISOSTA muodosta.** Piilotus on CSS:ssä ja
kokonaan `.valikko-auki`-ehdon takana, joten **pieni muoto on
täsmälleen ennallaan**:

| rivi | pieni muoto | iso muoto |
|---|---|---|
| `France · tasavalta v. 1873` (alarivi) | näkyy | pois |
| `VALTIOMUOTO 1873 tasavalta` | — | pois |
| `NYT`-otsikko | — | pois |
| väkiluku, pinta-ala, demokratia, keskitulo, kielet | — | jäävät |
| kategoriat | — | jäävät |

Piilotus eikä poisto: alarivi on pienen muodon ainoa alarivi ja
`.maapaneeli-vuosi` täytetään samasta datasta molemmissa muodoissa.
DOM pysyy samana, joten vartijat näkevät rivien olevan tallella siellä,
missä niiden kuuluukin olla.

**3. Radion merkkivalo ison muodon oikeaan yläkulmaan.** Pelkkä pieni
punainen valo ja sen alla pienellä `radio` — ei muuta tekstiä. Valo
palaa vain soiton aikana ja on muuten sammuksissa. Napautus avaa ja
sulkee maan radion (`js/packs/radiot.js` `RADIOT[iso]`). Nappi on
piilossa mailta, joilla ei ole lähetystä.

Soitin on **sama kuin maalehden radionapissa**
(`ui.kulttuuriAaniNapista`): taustan väistö, peilin varareitti ja
pysäytys tulevat siitä valmiina, ja se merkitsee soivan napin
`soi`-luokalla. Juuri se luokka sytyttää valon, joten valo ei voi olla
soittimen kanssa eri mieltä. Soittimen oma kuvake ja aikanäyttö ovat
napissa (ne kuuluvat sen sopimukseen) mutta CSS piilottaa ne: valo on
ainoa merkki.

Kaksi kohtaa, jotka piti hoitaa erikseen:

- **Maan vaihtuessa soiva lähetys katkaistaan.** Nappi on sama elementti
  kaikille maille; ilman tätä Ranskan lähetys jäisi soimaan Espanjan
  kartuschan valo palaen. Sama purettaessa kaluste.
- **Jokin muu soimassa → se kiinni ensin.** Soitin on yhteinen ja lukee
  minkä tahansa soivan äänen omakseen (`kulttuuriAaniNapista` pysäyttää
  ja poistuu). Ilman tätä radion napautus kulttuurinäytteen soidessa
  pysäyttäisi näytteen avaamatta radiota.

## Savuke

`tools/savukkeet/savuke-kartuscha-siisti.mjs`, ruudut **390 ja 1400**:
**26/26 vartiota läpi**, sivulla ei virheitä.

Väitteet: väkäsiä 0 kpl molemmissa muodoissa · pienessä muodossa alarivi
näkyy · isossa muodossa alarivin, vuosilohkon ja Nyt-otsikon laatikko on
nolla · väkiluku/pinta-ala/demokratia/keskitulo/kielet ja ≥ 6 kategoriaa
jäävät · radio on kortin oikealla puoliskolla ylimmässä neljänneksessä ja
siinä lukee "radio" · valo sammuksissa ennen napautusta, punainen
soidessa, sammuu suljettaessa · radio ei näy pienessä muodossa.

Vastakokeet: **A** maa ilman lähetystä → nappi piilossa (väite 5 kaatuu);
**B** piilotus kumottu palvelimessa → rivit palaavat (väite 3 kaatuu).

Kuvat: `docs/raportit/kaappaukset/kartuscha-siisti-20260920/`
(`kartuscha-390.png`, `kartuscha-1400.png` ja palava valo
`radio-palaa-390.png`, `radio-palaa-1400.png`).

`node --test tests/*.test.mjs`: **3 750 testiä, 0 punaista** (13 ohitettua).

## Savukkeen rajoite — ja kaksi omaa harha-askeltani

**Savuke ei saa oikeaa lähetystä soimaan.** Audio-elementin pyyntö ei
kulje `page.route`n läpi, joten virta katkeaa hetkessä ja soitin nollaa
itsensä. Valo syttyy ja sammuu oikein, mutta nopeammin kuin yksi kiinteä
odotus ehtii katsoa. Siksi syttyminen mitataan kyselemällä
(`waitForFunction`), ja sulkeminen mitataan vain jos lähetys on yhä auki
napautushetkellä — muuten sammunut valo ei todistaisi napautuksesta
mitään. Molemmilla ruuduilla mittaus osui auki olevaan lähetykseen, eli
**napautuksen sulkeminen on oikeasti todistettu**, ei ohitettu.

Ennen kuin ymmärsin tämän, **syytin kahdesti tuotantokoodia savukkeeni
puutteesta**: ensin luulin, että jokin muu ääni syö ensimmäisen
napautuksen, sitten että äänipeili kaataa lähetyksen. Kumpikaan ei ollut
se: kiinteä 1,2 s odotus vain katsoi valoa sen jälkeen, kun se oli jo
ehtinyt sammua. Poistin ensimmäisestä arvauksesta jääneen väitteen
koodikommentista — muutos itse (muu ääni kiinni ensin) on oikein, mutta
sitä ei ole mitattu, eikä kommentti saa väittää niin.

## Mitä jäi tekemättä

- **Muut maat kuin Ranska** on katettu vain vastakokeella A (maa ilman
  lähetystä). Valo ja napautus on mitattu FRA:lla.
- **Oikealla lähetyksellä** en ajanut savuketta: se olisi hidas ja
  verkosta riippuvainen. Soittimen polku on sama kuin maalehden
  radionapilla, joka on ollut käytössä jo.
- **1400 px:n kartuschakuvassa** saapumiskortti peittää kortin oikean
  reunan, joten valo ei näy siinä; 390 px:n kuvassa ja erillisissä
  `radio-palaa-*.png`-kuvissa näkyy.
