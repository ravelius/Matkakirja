# Pelikoodari: luovutus 31.10.2026 klo 19.05 (konteksti 42 %)

Edellinen: -20261031-1305. Muistin tila: pelikoodari-tila-20261018-aamu.md. Proto-repo /Users/Shared/Claude/proto-3d/Matkakirja-proto.
Worktreet: wt/proto-pelikoodari-reitti-216 (pelikoodari/reitti-216) ja wt/proto-pelikoodari-v98c (koe-valo-k4 c9455d902, pushattu).

## Valmista tässä vuorossa
- **Reittivalinta 1–6 (omistaja 31.10. 18.26, Raamattu 2.177 PELIN YDINAJATUS; PT hyväksyi suunnitelman):** haara pelikoodari/reitti-216.
  - 338b06286: koko palatsi auki (taso 1 ei sulje kuja-75:n sivuhaaroja; 1554 solmua saavutettavissa, 0 umpikujaa).
  - Eunukit: eunukki lähtee liikkeelle vain, jos se on näkynyt vähintään 2,5 s; näkökenttä kamerasta 6 m keisarin takaa, 45 m, ±45°.
    Muuten eunukki jää odottamaan ("ei nähty"). Kohdattu eunukki ei palaa samaan kohtaan. PT: odottavat ok.
  - Täydennys: kerätty ja rikottu täydentyy puolet, sitten neljännes, sitten kahdeksasosa, sitten ei mitään.
    Täydennys tehdään vain, kun kuja on yli 125 m päässä tai takana yli 55 m päässä.
  - KORJAUS: palatsin 2072 kujaa olivat 21.10. lähtien tyhjiä, koska alueennakko mittasi tyhjän alun reitin matkana.
    Nyt rauhallinen alku mitataan etäisyytenä lähdöstä: 210 estettä, 238 omenaa, 139 aarretta ja 634 eunukkipaikkaa.
  - ffd491927: kaistoille osuvat lähipuut pois (PT: b-08:ssa keisari juoksi rungon läpi). JuoksuPalatsiVerkko.KaistaRungot poistaa
    puut alle 1,6 m:n päästä kujan keskilinjasta, eli 169/4935 puuta (3,4 %). Verkkoa ei muuteta: rasterin esto kutisti verkon
    1554 → 643 solmuun.
  - Testit JuoksuReittivalintaTestit (MK_JUURI = .../leivonta-217/juuri-k3, pelin versiot pk8/v85/v81/791-v6/esto-v23/lahipuut-v12).
    kaanna.sh 781/781, unity-tarkistus 0 virhettä.
- NS:lle merge-pyyntö ffd491927 (PT:n lupa "avoin juna 216, jos vihreä ennen lukitusta"). Kuvasarja KK:lle:
  proto-3d/_tyo/pelikoodari/reitti-216/ (video-b-eunukit.mp4, arkki-b.jpg, nostot/). Tiheys aukioilla omistajalle KK:n kautta.
- Siivous: fpv-211, kuvajako-216, lod2-216 ja portaat-216 poistettu. tyylikirja.json-löydös NUI:lle (patch _tyo/pelikoodari/siivous-1031/).

## Kesken / seuraava
1. **Puukorjauksen kuvatarkistus:** levy 71 Gi < 82, joten ajo ei käynnistynyt. Kun levyä on yli 82 Gi:
   `zsh /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/reitti-216/aja-puut.zsh`. Kuvat c-* tulevat lokikansioon. Vertaa b-08:aan:
   puun ei pidä olla reitillä. Kerro tulos PT:lle yhdellä rivillä.
2. Jos NS kysyy, mergen pohja on 76b1894ed ja haara rebase-vapaa. Lokissa ei ole uusia virheitä.
3. **Leivottu valo:** VS mittaa kertoimet 1 ja 1,25 havainnetta vasten, ja kertoimen päätös tulee VS:ltä.
   Kun LAV:n osasarja-v6 tulee, tee 1b-varjokuvion tarkistus (luovutus -20261030-2210 kohta 2).
4. Taso 1:n maali ohittaa QA-komennon `maali x,z` (JuoksuTaso.Maali), joten avoimen sivuhaaran kuva vaatii tasolle oman alkupisteen.

## Huomiot
- Näkyvyysmalli on arvio ilman peittoa (kamera muurien yllä). Testiajossa noin 50–60 % eunukeista jää odottamaan.
  Säätö: JuoksuV4Saanto.NakoM / NakoKulma / NakoTakanaM.
- Eunukkien täydennys uudelle käynnille on 50 %, eikä se vähene käynneittäin (omistajan "vähemmän" koskee kerättäviä).
- LAV voi tehdä puut.json v13:n ilman kaistarunkoja, jolloin ajonaikainen suodatus ei poista mitään (verkko on totuus).
