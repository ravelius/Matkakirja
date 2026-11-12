# Natiivisepän luovutus 4.11.2026 klo 15.30 (konteksti 30 %, 7.37)

Korvaa luovutuksen -1216. Id:t: /Users/Shared/Claude/osoitekirja.md. Cron Unity-beeta: luo uudelleen ("4 9 * * *", muisti unity67-paivitysseuranta). Vuoro aina JU:lta.
Työpuu /Users/Shared/Claude/wt/proto-natiiviseppa-maskik4 haarassa natiiviseppa/maakuntarajat-katko (c194bbf29), puhdas. Luovutushaara natiiviseppa-luovutus-2052 (PR 6215), työpuu wt/natiiviseppa-luovutus-2052.
Python, jossa numpy ja PIL: /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/tulivuoret/venv/bin/python.

## Työ 1: maakuntarajat ohueksi, ehjäksi katkoviivaksi (omistaja 15.08, PT; kesken, kuvat puuttuvat)
- **Lue:** Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261104-maakuntarajat-katkoviiva.md ja _tyo/natiiviseppa/maakuntarajat/tulos.md.
- **Korjaus c194bbf29** (natiiviseppa/maakuntarajat-katko, natiivi-backup, pohja 484adb22f). tarkista.sh rc 0, testit läpi (Maakuntajako, Viivaleveys, Katkoviiva). Muiden haaroista (KS nd-kaanto-219, VS striimi-vari, NUI kartan-kaanto-219) kukaan ei koske näihin tiedostoihin. **Pelissä ei ajettu, varjostinta ei ole käännetty.**
- **Pyydetty JU:lta 15.26, vastausta ei vielä:** _tyo/natiiviseppa/maakuntarajat/sk-maakuntarajat.txt Macilla, rungot 484adb22f (ennen) ja c194bbf29 (jälkeen).
- **Kun kuvat tulevat:** katso parit itse täysikoossa, samat nimet, sama rajaus: Ranska ja Italia ylhäältä ja kallistettuna, Suomi, siirtymä z10–11, ranta ja valtionraja (ei uusia viivoja, ei kaksoisviivoja). Tarkista laatan reunan kohtaaminen r-tarkka-z12:ssa. Kuvat ja sha PT:lle, PT vie KK:lle. Ei videota, ei junaan.
- **Todennäköiset säädöt kuvan jälkeen:** katkon koko (Viivaleveys.AluerajaJaksoPx, ElavaTyyli.AluerajaKatko/Vali), leveys (AluerajaLeveys 1,2; karkea AluerajaLaitePx ennallaan). Karkean ja tarkan tason koko ruudulla on arvioitu, ei mitattu. Älä vie maakuntarajat.json.gz:ää ilman PT:n sanaa (ei tarvita).
- **Tulos:** puuttuva raja FRA 24 → 0,3 %, ITA 38 → 0,8 %; koko taulukko tulos.md:ssä. DNK jää 6,6 % (17 km, ei katsottu).
- **Tummat katkoviivat:** p-z9 todistettu samaksi asiaksi (todista-z9.py, todiste-z9-rajaus.png), p-z10 heikompi; kerrottu PT:lle.
- **iPad:** ei ajeta tätä työtä ennen PT:n sanaa kallistusajosta (alla).

## Työ 2: muistijarrun kallistusajo (odottaa PT:n sanaa)
Korjaus efe85dda7 (natiiviseppa/tasainen-striimi-2, etähaara ajan tasalla). Skripti _tyo/natiiviseppa/striimi-sauma/sk-tasainen-kallistus.txt: 12 kuvaa, 0° päällä ja pois, 15° ja 45° päällä. PT: VS:n 484adb22f on todistuksessa, PT kertoo, kun se on läpi. Rivi JU:lle vasta PT:n sanalla. Mitta: reunat.py <kansio> (0°-kuvat), muisti-kuvissa.py <kansio> k; kallistetut täysikoossa silmin. Kallistettu sauma on yhä avoin vika, portti ei korjaa sitä. Yhdistelmä tasainen-striimi-2 + maakuntarajat-katko ei ole tehty; tiedostot eivät mene päällekkäin (Laattapalvelin ei kummassakaan haarassa samalla rivillä: ei tarkistettu merge-treellä).

## LISÄYS (PT, sitoo; ohittaa kohdan Työ 2 rungon ja odotuksen)
**484adb22f hyväksytty. Runko nyt f0e256d9b (natiiviseppa/tasainen-striimi-3), korvaa efe85dda7:n.** sk-tasainen-kallistus.txt on JU:n iPad-jonossa; sha kerrottu PT:lle ja JU:lle. Kun kuvat tulevat: katso ja mittaa kohdan Työ 2 mukaan, rivi PT:lle. Ristiriitaa VS:n 20°/15°-rajaan ei ole (tulos.md:n loppu). Työpuu on takaisin haarassa maakuntarajat-katko.

## LISÄYS maakuntarajat (ohittaa Työ 1:n sha:n ja JU-kohdan)
Mac-parit tulivat (lokit/esikatselu-20261104-152659 ja -153426, vierekkäin _tyo/natiiviseppa/maakuntarajat/parit/). Katsottu vain osa, lista ja löydökset tulos.md:n lopussa. **Kärki 35b6ee8b4** (c194bbf29 + leveyskatto 1,6). Seuraavaksi: JU:n uusi jälkeen-ajo kärjestä, katso loput kuvat (ranta, valtionraja, kallistetut, Suomi), selvitä karkean katkon jakso (70 vs. odotus 36 kuvapx) maakunta tila -riveistä, iPad-kuva, jos PT antaa vuoron. Sitten kuvat ja sha PT:lle.

## LISÄYS PT:n kysymys (SEURAAVA TYÖ ENSIN; kova raja 35 %, ei aloitettu)
PT: VS löysi k45:n h-z13:sta suoran vaakasauman veden yli (rivi 840–844, väri hyppää), kallistettuna, varjovalinta ei päällä. Kuvat _tyo/linssiseppa2/pariisi-tyyli/striimi/muisti-484adb22f/k45-h-z13-sauma-*.png. **Onko sama avoin vika kuin "kallistus ≥ 3° z12–z14, portti ei korjaa"? Selvitä, vastaa rivillä. Ei korjausta ennen vastausta.**
- Kuvia ei ole katsottu, joten vastausta ei ole.
- **sk-tasainen-kallistus ei sisällä Helsinkiä**, vain Pariisin 48.8530 2.3350, toisin kuin PT:n viestissä oletettiin. Kerrottu PT:lle ja ehdotettu lisäajoa: aja 60.1699 24.9384 0.26 2, kallista 45, sama kuva kokeen kanssa ja `maasto tasainen pois`.
- Vertailu: katso, osuuko rivi 840–844 maastopalan rajaan (reunat.py olettaa suoran ylhäältä, ei käy kallistettuun). Veden yli sisältöero ei ole talot ja tiet, vaan väri, joten syy voi olla eri kuin z12–z14:n saumassa: älä oleta samaksi.

## LISÄYS PT, iPad-vuoro maakuntarajoille (SITOO)
iPad-vuoro kallistusajon jälkeen JU:n jonossa, ehdolla: ensin Mac-jälkeen-ajo 35b6ee8b4 ja kaikki katsomatta olevat kuvat katsottu (ranta, valtionraja, kallistetut, Suomi). Vuoro pyydetään JU:lta vasta sitten. Selvitä karkean katkon 70 px ennen iPadia, jos se löytyy koodista; muuten mittaa iPadilta. Tulokset ja parit PT:lle, PT vie KK:lle.
