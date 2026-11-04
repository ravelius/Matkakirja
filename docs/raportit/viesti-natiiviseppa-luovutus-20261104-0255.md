# Natiivisepän luovutus 4.11.2026 klo 02.55 (konteksti 30 %, 7.37)

Korvaa luovutuksen -20261104-0208 (myös sen LISÄYKSET). Siitä yhä voimassa vain KS-kohta ja "Sauman syy varmistettu". Luovutuksesta -0129 voimassa: KK:n lista, GP, f1fb45f10, Selvitetty, AVOIMET (`git show 97afe2e4c:docs/raportit/viesti-natiiviseppa-luovutus-20261104-0129.md`); HAARAT alla olevin muutoksin.
Id:t: /Users/Shared/Claude/osoitekirja.md. Cron Unity-beeta: luo uudelleen ("4 9 * * *", muisti unity67-paivitysseuranta).
Vuoro aina JU:lta. Skripti `zsh .../tyokalut/esikatselu.sh`; Kartta-testit `sh Kartta-testit/kaanna.sh`.

## HETI NOLLAUKSEN JÄLKEEN (PT:n päätökset sitovat)
1. **f5c1f14b0-todiste, tärkein. Odota kuvia** (JU, arviolta 03.32): /Users/Shared/Claude/proto-3d/lokit/julkaisija-reuna-iso-f5c1f14b0/ (skenaario _tyo/natiiviseppa/aluekuva-koko/sk-ipad-reuna.txt: r-0-30, 0-21, 0-17, 0-15, 0-13, 0-11, 0-21-paluu, joinville). Tee odotussilmukka Bashin taustalle, Monitor ei tarvita.
   - Katso täysikoossa/rajauksina, EI vain Joinvillestä (KK 02.50): vertailu lokit/julkaisija-k24-iso-3332c8e15/k-h-0-15.png, läiskät siellä pikseleissä (x, y, kuva 2732×2048): (1295,70), (1603,130), (2452,370), (2411,1500), (2678,1070), sekä 0-17:n ja 0-21:n vastaavat; KK:n kuva k24-ipad-laiskat-0-15.png (lokit/kk-peli-a94d8e7fb-20261103/).
   - Puhdas = suorareunaisia tummia läiskiä ei näy ja tiet eivät muutu muualla. **Rivi HETI PT:lle ja VS:lle** (PT 02.5x). Puhdas → VS yhdistää f5c1f14b0:n aamun kuvaan, JU ajaa viimeistään 04.00. Ei puhdas → läiskä näkyy aamulla, PT kertoo KK:lle.
2. **Haamut 0,13 (KK k24 kohta 1):** korjaus 204104d31 on k28:ssa 984342737 ja k29:ssä 1a8f03720, ei uutta shaa (kerrottu PT:lle). Nähty vain Macilla. Katso iPadilta r-0-13 (Riemukaari, Eiffel, Louvre, Grand Palais, Garnier, Invalidit täysinä) ja r-0-15 (ei näy). Vian jäädessä sha VS:lle viimeistään 03.45. Syy jäljellä olevaan: korkeus_m-rajat PiirrosKerros.Esineet.cs:334, data nahtavyydet-218.
3. **0,21 mennessä | paluu (KK kohta 3):** vertaa r-0-21 ja r-0-21-paluu. Nimet KS:llä (ValitseTaso-hystereesi, päätelty, kerrottu). Tiet vaaleammat paluulla: SYY AUKI, minun; ei tutkittu.
4. **z11/z12-saumat:** katso k28:sta (lokit/julkaisija-reuna-iso-984342737/ tai julkaisija-k28-iso-984342737/), ei b70ee175a:sta.
5. **Kulu (KK):** PT:lle kerrottu, että stilleistä ei näe; mittaa vierityksen sujuvuus k28:sta, kun JU antaa vuoron.

## Päätökset
- PT, KK 02.5x: häivytysvyö 0,13 ja länsiraja 1 200 m kelpaavat aamuun, ei muutosta.
- Länsiraja: VS tekee seuraavalla kierroksella (ReunaM noin 2400, muisti mitattava). NS EI koske siihen. Ei KS:n eikä NS:n aamuun.
- KK hyväksyi k24-pinnalla: saumat 48,8503 ja 2,3071, hiusviiva, Alma, vinjetti 0,30–0,15, muisti 3512/4080 Mt.

## Tehty tässä sessiossa
- **Ruskeat läiskät f5c1f14b0** (ElavaTyyli.PoistaKarkeaRanta = kaksi PoistaKierros-kierrosta, ElavaTyyliVersio e15, testi PuhdistusPoistaaLeveanTienJaReunanTien; 612/612). Syy: leveän tien risteyksessä ja palan reunalla ei 5 × 5 -ympäristössä ole vaaleaa pikseliä. Toistettu Pythonilla paloille 10/518/352 ja 519/352: yksi kierros jättää läiskän palan 519 reunaan, kaksi poistaa. Pelissä ajamatta. Julkaistusta kartasta (KK:n kysymys) ei tarkistettu.
- **627562dad peruttu 3cb530e6b:** peite enintään Z10. Tein sen ennen iPad-kuvia; iPadilla tiet jatkuvat lon 2,4609:n yli ehjinä, joten pystyreuna oli näissä kuvissa vain Macin 640×480-ajossa, ja korjaus olisi sumentanut iPadin. Ei päätynyt yhdistelmään (VS). Älä tee uudelleen.
- iPad 3332c8e15 katsottu: lokit/julkaisija-k24-iso-3332c8e15/NS-havainnot.md (9 täysikoossa, 9 puolikoossa, 27 ei).

## HAARAT
- **natiiviseppa/haivytys-k24-218 kärki f5c1f14b0** = b70ee175a + 627562dad + revertti + läiskät. Peilissä natiivi-backup. EI junaan eikä ämpäriin. Worktree wt/proto-natiiviseppa-maskik4.
- VS: f5c1f14b0 yhdistyy k29:n kanssa ilman ristiriitoja (merge-tree, ei ajettu); ei k28:ssa eikä k29:ssä.
- **KS seuraavaan yhdistelmään:** karttaseppa/pariisi-nimet-220 kärki 498ce79dd (korvaa -0129:n 76d11201a-kohdan; sha tarkistamatta, kääntämättä; ei tee mitään ilman Resources/Esineet/pariisi-nimipeite.bytes, joka tulee uusien puiden kanssa, KK ei ole valinnut). Puita ei viedä vielä. d-sillan kaide -0129:n kohta 4 yhä tekemättä.

## KK:n lista, kohdat 2–4 (-0129): aloittamatta
## Avoimet häivytyksessä
Kaukaa saapuessa kerroksen kytkeytyminen (120 km) ei testattu liikkeessä. Pystyreunaa muilla näyttöko'oilla ei katsottu.

## LISÄYS 02.5x (KS)
karttaseppa/pariisi-nimet-220 kärki nyt 932078810 (korvaa 498ce79dd:n): 0,21:n nimikoko, taso paikallaan hystereesillä 0, liikkeessä 0,12. Ajamatta; f5c1f14b0-ajossa ei näy, joten r-0-21 / paluu -kuvien nimiero EI kerro tästä. Tie-ero on NS:n.

## LISÄYS 03.25 (SITOO, ohittaa HETI-kohdat 1 ja 2)
**f5c1f14b0-todiste tehty, kohta 1 POIS:** lokit/julkaisija-reuna-iso-f5c1f14b0/ (valmis 03.23, muisti 3464/4080, varoituksia 0). Pari vanha | uusi _tyo/natiiviseppa/aluekuva-koko/todiste-015.png: viidessä kohdassa tummat läiskät poissa, tiet ennallaan. 0,15, 0,21 ja 0,13 täysikoossa, 0,30, 0,17 ja paluu puolikoossa. PT ja VS tietävät; VS yhdistää aamun kuvaan, JU ajaa viimeistään 04.00. Katso sen yhdistelmän kuvat, kun JU antaa kansion.
**Haamut, kohta 2 POIS:** r-0-13 iPadilla täysinä (täysikokoinen rajaus), 0,15:llä ei näy. Kerrottu PT:lle.
**Jää, ei estä aamua:** haalea suorareunainen sävyero ainakin 2 kohdassa (Joinville lon 2,4609; kuvan 0-15 kohta (2452,370), alapuoli), myös vanhassa ajossa; PoistaKierros ei selitä sitä, syy tutkimatta.
**Seuraavaksi:** kohta 3 (tiet 0,21 mennessä | paluu, r-0-21 ja r-0-21-paluu, syy tutkimatta), kohta 4 (z11/z12 k28:sta), kohta 5 (kulu). elava-kulu tässä ajossa: z14 mediaani 87 ms, z15 73 ms, huippu 1305/1616 ms; ero k24:n 236/305 ms:aan selittämättä, n on suurempi.

## LISÄYS 03.28 (PT, KK 03.25; KORJAUSLISTA osio f5c1; SITOO)
**f5c1f14b0 OK aamuun** (KK: tummat läiskät poissa, tiet ja raiteet ennallaan). Ei junaan, pinta ei hyväksytty.
**Seuraava kierros, ei aamun este: haalea suorareunainen sävyero** rajauksissa 2, 3 ja 4 (Joinville, lon 2,4609; todiste-015.png), myös vanhassa ajossa. Suora reuna ei saa jäädä lopulliseen. Selvitä ensin, onko sama julkaistussa kartassa (Raamattu-linja: KK k24/2:n kysymys, tarkistamatta). Syy tutkimatta.
**Tie-ero 0,21 mennessä | paluu RATKAISTU, koodia ei muutettu:** nimien ulkopuolella kuvat ovat samat. Mitattu lokit/julkaisija-reuna-iso-f5c1f14b0/ ja julkaisija-k24-iso-3332c8e15/, 2732×2048: keskimääräinen ero 0,0, tiepikselit 216,31 | 216,31 ja 216,35 | 216,35. Mittauksesta rajattu pois nimet ja raiteet sekä 7 px niiden ympäriltä (23 % kuvasta), joten nimien alta tietä ei ole verrattu. Skripti _tyo/natiiviseppa/aluekuva-koko/tieero-021-paluu.py. KK:n "tiet vaaleammat" nähtiin arkilta 36 %:n koossa; se johtuu nimistä (isot tummat nimet mennessä), ei teistä. Nimien koko on KS:n (932078810, k33:ssa); tuomio KK:n ohjeen mukaan yhdistelmän r-0-21 / paluu -kuvista. Ei uutta tutkittavaa NS:lle, ellei yhdistelmässä tule tie-eroa: aja skripti sen kuville.
**Yhdistelmästä katsotaan** c-0-17 ja r-0-21-paluu (KK f5c1/2).
**0,30-kuva:** KK haluaa sen yhdistelmän ajosta. JU lisää, jos ajo ei ole alkanut; muuten NS ottaa oman, PT kertoo. Älä ota ennen PT:n riviä.
