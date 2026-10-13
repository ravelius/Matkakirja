# Linssiseppä 2 – luovutus 14.10.2026 klo 01.45 (Suomen aika), nollaus (PT: konteksti 50 %)

Luovuttaja: Linssiseppä 2 (Opus, high). Edellinen: viesti-linssiseppa-2-luovutus-20261014-0030.md (ja välitila -0140).

## Lue ensin
1. `CLAUDE.md` (agentit vain Opus/Sonnet, VAIN EUROOPPA, AIKA).
2. Raamattu (`js/tyohuone-raamattu.js`): Ydinajatus kohta 2 "TYÖTAPA JA SESSIOT".
3. Tämä raportti, KESKEN ylhäältä alas.

## OMISTAJAN RAKETTIPYYNNÖT (sanatarkasti, PT:n kautta 13.–14.10.)
- 13.10. (PT): ISS-raketin laukaisuun "paljon paremmat aluksen savu ja tuli lieskat".
- 14.10. 00.1x: "raketin alkuanimaatiota voisi hieman pidentää alussa, jotta kertoja ehtii sanoa mistä laukaistaan ja miksi.
  animaatio pitää saada myös vielä paremmaksi ja siihen kaikki mahdolliset graafiset päivitykset mukaan".
- 14.10. 00.1x: "raketin pitää myös reagoida muuttuvaan valoon kun ilmakehä häviää ja muutenkin raketti on nyt liian kaikkialta
  valaistun näköinen. myös lähtöalusta pitää tehdä tarkemmin".
- 14.10. (PT): "saadaanko avaruusalus animaatiota vielä parannettua selkeästi?" → koko lento selvästi paremmaksi, myös
  avaruusosuus (vaiheiden irtoaminen, kiertorata oikean maapallon yllä auringossa, lähestyminen ja telakointi ISS:ään).
- PT 14.10. 00.3x: laukaisupaikka Nordmelaan (Andøya Spaceport Pad A): "Täältä nousi ensimmäinen raketti Länsi-Euroopasta
  kiertoradalle" pitää paikkansa vain siellä.
- Jako: LS2 animaatio ja grafiikka; PK nappi, lähtölaskenta, ajoitus, puhejono, maapallon katoaminen lopussa (RakettiLaukaisu.cs ja
  RakettiAanet.cs ovat PK:n – älä koske); LR mallit; NUI mittaritaulu. Kuva-arkki + äänellinen tallenne PT:lle → juna 189.

## KUITATTU JUNAAN 189 (PT 14.10. 01.4x)
- Museo: haara `linssiseppa2/museo-ranska-rodin2` **17dbdbd80** (worktree /Users/Shared/Claude/wt/proto-linssiseppa2-koopenhamina),
  korvaa cc72dabfe:n; NS:lle ilmoitettu 01.4x. Sisältö: d56f0bd2c HDR-kuva, c57e0679f muut kuin maalaukset ≤ 1 (iPhonen Kanaan häät
  -katto ei pala), cc72dabfe master-merge (LS1:n polvi), 17dbdbd80 patsaiden JPEG-vara simussa (simu ei tue ASTC:tä) + Rodinin pronssit
  LR:n arvoilla. Todisteet lokit/todistus-monalisa5b-iphone-20261014-0044, todistus-patsaat1-ipad-20261014-0123.

## RAKETTI – tila
Worktree /Users/Shared/Claude/wt/proto-linssiseppa2-raketti, haara `linssiseppa2/raketti-savu-189` rebasettu PK:n
`pelikoodari/raketti-laukaisu-189` 53502a886:n päälle; **c8a5eeead** uusin (natiivi-backup; push tehty 2f892a382:een asti, pushaa).
Käännetty: eda8c15f7 = aa77f623f (ennen 2f892a382 ja c8a5eeead).
- Nordmela: Nousu.AlustaLat/Lon 69,10867/15,58883 (LR:n alustan origo), RakettiReitti/Houkuttimet(+testi). Laatta `andoya-alusta-v4`
  ämpärissä (skripti _tyo/linssiseppa2/andoya/rakenna_laatta_v4.py <lat> <lon>, täyttömaa 6 m, LR:n kenttä, lamppumerkit).
  Kehys: glTF +X = 340°, −Z = 250° (GlbLukija peilaa z:n; Nousu.Suunta 160 – älä muuta ilman LR:ää).
- LR:n mallit: A raketti v3 runko (2dfbe21de), B irtoavat osat (44ce3da13: torni 2. vaihe +15 s, nokkakartio SECO +15 s),
  D alusta v3d + valot-ja-vesi.json (7f1e20219 vesisuihkut, 2f892a382 linssien yöhehku RakettiLinssi), C ISS v1 + portti IssMalliin
  (6a8e9dd7f; iss.glb kirjoitettu Unity-kehykseen → z-peilaus kumotaan koodissa). _valmiit/iss-raketti-v3, iss-asema-v1.

## Parannuslista (tila)
1. Rungon valo – TEHTY, korjattu a1e626c55: aurinko todellisesta auringosta (ennen RenderSettings.sun = kameraa seuraava valo →
   "kaikkialta valaistu"). Valodiagnoosi lokiin ("raketti: valo aurinko …"). EI VIELÄ NÄHTY päivällä (savu3-iPad päivä).
2. Savu – savu2 + savu3 (0e562373c): vana venytetyistä hiukkasista välin mukaan, tasoitettu nopeus, esisavu hienompi. Simuun savu3.
3. Avauslento + kertoja – PK:n puoli valmis.
4. Alusta (LR) + vesisuihkut + liekin hehku maahan – TEHTY.
5. Max-Q-kartio – TEHTY (pieni kaukaa). 6. Irtoamispöllähdys – TEHTY. 8. 2. vaiheen välähdys – TEHTY (c8a5eeead), torni/nokka – TEHTY.
7. Taivas/kaari – ei muutettu. 9. Kiertorata – valo korjattu, sommittelu KESKEN (PT 4). 10. RCS-suihkut – EI TEHTY. 11. Värinä – TEHTY.

## KESKEN (ylhäältä alas)
1. **PT:n korjattavat savu2-arkista** (01.4x): (1) avauslento 4 s näyttää mustaa ruutua "ASTRONAUTIN KAMERA · kuvat NASA" – väärä
   linssin latausotsikko (avaus alkaa ennen kuin pallo/laatat näkyvät; selvitä PK:n kanssa: latausruudun otsikko raketille);
   (2) esisavu – korjattu 0e562373c, varmista savu3:ssa; (3) lähestyminen T+9 h: maapallo tasainen sininen ilman tekstuuria =
   omistajan bugi → PK:n 2e798807e (nousukaari) on mukana rebasessa, tarkista savu3:ssa, muuten yhdessä PK:n kanssa;
   (4) kiertorata-ruudussa ei Maata → Nousu.Kamera: kiertoradalla kamera niin, että Maa näkyy alla (kallistus/katse).
2. **savu3-simu**: ketju `_tyo/linssiseppa2/raketti-savu/ketju-savu3.zsh` (irrotettu, odottaa lippua `raketti-savu/simu-nyt-savu3`),
   käännös eda8c15f7 VALMIS. Kun Julkaisija antaa SIMU NYT: `touch /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/raketti-savu/simu-nyt-savu3`
   → iPad (päivä, `linssi linssi raketti kello +13`) ja iPhone (yö), lopuksi SIMU VAPAA Julkaisijalle. Parempi: käännä ensin
   c8a5eeead + PT:n korjaukset ja aja silloin (pysäytä vanha ketju omalla PID:llä, ps | grep ketju-savu3).
3. Kuva-arkki + äänellinen tallenne (video aani/-kansiosta) PT:lle, kun PT:n 4 kohtaa korjattu.
4. RCS-suihkut lähestymisessä, kiertoradan sommittelu (yllä).

## Huomiot
- Komento-/kommenttivirhe: älä lisää `//`-kommenttia lausekkeen keskelle (käännös 00.58 kaatui CS1002); aja `tyokalut/tarkista.sh`
  worktreessa ennen käännöspyyntöä (~1 min, ei Unityä).
- Jonossa odottavan oman käännöksen saa vaihtaa uudempaan, jos se ei omista lukkoa (/tmp/matkakirja-kaannospalvelu[-2].lukko/pid).
- `linssi astro kyyti kello` ei toimi rakettitilassa; käytä PK:n `linssi linssi raketti kello <+h|pois>`.
