# Linssiseppä 2 – luovutus 14.10.2026 klo 00.30 (Suomen aika), nollaus (PT: konteksti 50 %)

Luovuttaja: Linssiseppä 2 (Opus, high). Edellinen: viesti-linssiseppa-2-luovutus-20261013-2135.md.

## Lue ensin
1. `CLAUDE.md` (agentit vain Opus/Sonnet, VAIN EUROOPPA, AIKA).
2. Raamattu (`js/tyohuone-raamattu.js`): Ydinajatus kohta 2 "TYÖTAPA JA SESSIOT".
3. Tämä raportti, KESKEN ylhäältä alas. Muistio: `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/koopenhamina-kytkennat.md`
   (loppuosat "Rodin-sali" ja "Mona Lisa keltasininen").

## OMISTAJAN RAKETTIPYYNNÖT (sanatarkasti, PT:n kautta 13.–14.10.)
- 13.10. (PT): ISS-raketin laukaisuun "paljon paremmat aluksen savu ja tuli lieskat".
- 14.10. 00.1x: "raketin alkuanimaatiota voisi hieman pidentää alussa, jotta kertoja ehtii sanoa mistä laukaistaan ja miksi.
  animaatio pitää saada myös vielä paremmaksi ja siihen kaikki mahdolliset graafiset päivitykset mukaan".
- 14.10. 00.1x: "raketin pitää myös reagoida muuttuvaan valoon kun ilmakehä häviää ja muutenkin raketti on nyt liian kaikkialta
  valaistun näköinen. myös lähtöalusta pitää tehdä tarkemmin".
- 14.10. (PT): "saadaanko avaruusalus animaatiota vielä parannettua selkeästi?" → koko lento selvästi paremmaksi, myös
  avaruusosuus (vaiheiden irtoaminen, kiertorata oikean maapallon yllä auringossa, lähestyminen ja telakointi ISS:ään).
- Jako: LS2 vetää animaation ja grafiikan; Pelikoodari (PK) vetää napin, lähtölaskennan 5…0, ajoituksen ja puhejonon
  (haara `pelikoodari/raketti-laukaisu-189`); LR tekee lähtöalustan mallin (PT pyytää); maapallon katoaminen lopussa = PK,
  mittaritaulu = NUI. Kuva-arkki + äänellinen tallenne PT:lle → juna 189.

## Tila
- Proto-worktree RAKETTI: `/Users/Shared/Claude/wt/proto-linssiseppa2-raketti`, haara `linssiseppa2/raketti-savu-189`
  (PK:n c3adff59f päällä): a1ff4dbee savu + liekki v2, 11b3ba639 avauskamera, 0c65d55b4 rungon valaistus (viimeinen ei vielä
  käännetty). Backup: natiivi-backup linssiseppa2/raketti-savu-189 (11b3ba639 asti pushattu; pushaa 0c65d55b4).
- Proto-worktree MUSEO: `/Users/Shared/Claude/wt/proto-linssiseppa2-koopenhamina`, haara `linssiseppa2/museo-ranska-rodin2`
  **d56f0bd2c** (pushattu). Testihaara `linssiseppa2/monalisa-testi` (ei junaan).
- Oma iPad A26BC7D0, oma iPhone 8D1FD618. App-kopiot: `proto-3d/lokit/linssiseppa2-app-monalisa4` ja `-savu1`; vanhat
  T7:llä `/Volumes/T7 4TB/Matkakirja-arkisto/linssiseppa2-app/` (kph5, monalisa1–2, rodin5–6).

## Tänään valmistunut
- Rodin-sali (Ranska sali 4): rodin5 + rodin6 KUITATTU (Bironin seinät LS1 b8e712a87, LR:n sali-v2e puutarhan valot).
- Mona Lisa keltasininen: syy MuseoNayttamo.VarmistaKuva ARGB32 → 8-bittinen välikuva, käänteisen AgX:n arvot leikkautuivat.
  Korjaus d56f0bd2c (RGB111110Float) + LR v2f/v2g/v2h (Mona Lisa 200 lx, Ajattelijan selkävalo). PT KUITTASI junaan 189
  EHDOLLA (kohta KESKEN 1). Testi RanskanTeoskeilatSalinTasolla, PuutarhanVeistosKeilat. Dioraaman sama vika → Natiiviseppä (PT).
- Akershus: jo korjattu c2c8874c8:ssa (juna 187), PT merkitsi valmiiksi.

## KESKEN (ylhäältä alas)
1. **Museon HDR, PT:n ehto**: iPhonen Kanaan häät -kuvan yläreuna palaa valkoiseksi (katto salin nimen yläpuolella,
   todistus-monalisa4-iphone-jalkeen-20261014-0008/kuvat/m04). Vertaa ennen-ajoon iPhonella (rodin6-app T7:llä) samasta kohdasta;
   jos HDR toi sen (todennäköisesti kattoikkunan lasi `_Hehku` > 1 ei enää leikkaudu → hehku), korjaa ennen junaa (esim. lasin
   hehku ≤ 1 tai museon kuvalle kirkkauskatto). iPhonen Alankomaat-kuvat puuttuivat (Yövartio-sali listan alla → vieritä).
   Jatkoon (ei estä): Kanaan taivaan kovareunaiset laikut, Maitotytön seinä lähes valkoinen, Ajattelija vaalea kivi (pronssi, LR/LS1).
2. **savu1 iPad VALMIS 00.16** (lokit/todistus-savu1-ipad-20261014-0013/kuva-arkki.png, OK, 0 virhettä; iPhone-osa ajossa/ajettu
   samassa ketjussa). HAVAINNOT → seuraava erä savu2: (a) nousuvana näkyy kaukaa PISTEKETJUNA (hiukkaset 7–11 m, kamera
   0,6–7 km) → koko kameran etäisyyden mukaan (esim. ≥ 1,2 % etäisyydestä), määrä ylös ja/tai Trails-moduuli nauhaksi;
   (b) maapilvi ei erotu yleiskuvasta (14–24 m) → 40–90 m ja vaaleampi, nopeampi leviäminen; maxParticles 180 täyttyy T+5:ssä;
   (c) esisavu T−3,5 -kuvassa lähikuva (Pulu), höyry ei näy → suuttimet lähemmäs runkoa ja näkyvämmiksi; (d) skenaarion
   ajoitus: "T−0,7" -kuvassa raketti jo ilmassa → T0 tuli ennen odotettua (lähtölaskenta 5 s, mutta T0 raidan 18,3 s:ssa;
   käytä oletuksena lokiriviä "raketti: savu t=" tai PK:n T0-riviä). Kuorma: 600 hiukkasta T+15…20 (esi 40 + maa 180 + vana 420).
   Alkuperäinen ketju: (a1ff4dbee, käännös 34f4080f8, app linssiseppa2-app-savu1): ketju `_tyo/linssiseppa2/raketti-savu/ketju-savu1.zsh`,
   loki ketju-savu1.log, iPad sitten iPhone; tulokset `proto-3d/lokit/todistus-savu1-{ipad,iphone}-*`. Kun valmis: SIMU VAPAA
   Julkaisijalle (jos ei mennyt), katso kuvat (esisavu T−3,5, sytytys, maapilvi, vana, Mach-renkaat) ja kuorma lokista
   ("raketti: savu t=… hiukkasia"). Sitten käännä 0c65d55b4 (valaistus) ja vertaa.
3. **Parannuslista PT:lle** (lähetä ensin, sitten toteuta): ks. alla "Raketin parannuslista".
4. **Avaus**: Nousu.AvausKamera valmis (11b3ba639); PK kytkee (RakettiLaukaisu.AvausS) ja ajoittaa SK:n tekstin
   (proto-3d/_tyo/sisaltokirjuri/raketti-andoya-20261014/raketti-andoya-alku.json): PT HYVÄKSYI 00.2x ("Länsi-Euroopasta"),
   25 sanaa ~11 s, lähti Äänittäjälle; mahtuu 14 s:n avaukseen (jos .mp3 > 13 s, pidennä Nousu.AvausKestoS).
4b. **PK 00.2x**: avaus kytketty, pelikoodari/raketti-laukaisu-189 **02754cfdd** (ff 11b3ba639 + PK:n commit). Rebasea oma
   0c65d55b4 (valaistus) sen päälle (`git rebase 02754cfdd` raketti-worktreessa) ja jatka siitä. Latauksen aikana kamera =
   AvausKamera(0); avaus kestää max(AvausKestoS, repliikki + 0,5 s). savu1 iPhone valmis 00.19 (todistus-savu1-iphone-20261014-0016,
   katsomatta), SIMU VAPAA ilmoitettu.
5. **Lähtöalusta**: LR:n malli (PT pyytää) → kytke RakettiMalli.Osa("alusta").

## Raketin parannuslista (luonnos, lähetä PT:lle)
1. Valaistus (tehty 0c65d55b4, RakettiRunko.shader): aurinko maan varjosta, taivaanvalo exp(−h/8 km), valonheittimet, hehku.
2. Savu ja liekki v2 (a1ff4dbee): esisavu, maapilvi, nousuvana, liekin ydin + Mach-renkaat; säädä savu1-kuvien mukaan.
3. Avauslento (11b3ba639) + kertoja (PK/SK).
4. Lähtöalusta tarkemmaksi (LR), alustan valonheittimet ja vesisuihkut sytytyksessä.
5. Liekin hehku maahan ja alustaan sytytyksessä (RakettiMaasto-varjostimeen hehkuvalo suun ympärille).
6. Max-Q-höyrykartio T+44…56 (proseduraalinen kartio rungon ympärille, kohina, häivytys).
7. Taivaan sävy korkeuden mukaan + maapallon kaari ja ilmakehän reunahehku (tarkista PalloKierto/ilmakehä, ettei tuplata).
8. Vaiheiden irtoaminen: irtoamispöllähdys (kaasu/jää), 2. vaiheen syttymisen välähdys, välivaiheen renkaan irtoaminen.
9. Kiertorata: kova auringonvalo ja syvät varjot (1.), terminaattori, yöpuolen valot, kameratyö (sivulta, maa taustalla).
10. Lähestyminen ja telakointi ISS: RCS-suihkut, ISS auringossa, telakointirenkaan valot (sovi PK:n/ISS-linssin kanssa).
11. Kameratyö: tärinä sytytyksessä ja Max-Q:ssa (pieni), telekuva nousussa, pilvikerroksen läpi.
12. Kuorma: iPadin fps ja hiukkasmäärät lokista (RakettiSavu.Hiukkasia), enintään 640 hiukkasta.
