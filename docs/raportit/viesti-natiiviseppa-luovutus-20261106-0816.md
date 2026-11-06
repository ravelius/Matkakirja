# Natiivisepän luovutus 6.11.2026 klo 08.16 (konteksti 30 %, pehmeä raja, 7.37)

Korvaa -0745:n. Sessio Natiiviseppä, kansio Matkakirja-3d-selvittaja. Cronia "4 9 * * *" unity-julkaisut.py ei luotu edellisessä sessiossa: luo se uudessa (Raamattu 7.41; polku proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py).

## SEURAAVA TYÖ
Odota KS:n seuraavan yhteisen ajon lokikansiota palat-v3-nd-ranta-paloilla. Ei omaa ajoa, ei junaan, ei iPadia. Kun se tulee:
1. Katso täysikoossa samalla kameralla: m4, po-la, etelärannan kuva. Read pienentää yli 2000 px:n kuvat, rajaa ensin.
2. Tarkista: talot rannassa asti, saari ilman taloja, ei laatikkoa Tour Saint-Jacquesin eikä Hôtel de Villen mallissa, leijuuko tai näkyykö seinäaukkoja uusilla rannoilla, asuntolaivat.
3. Pari KK:lle viat nimettyinä, kopio PT:lle ≤ 3 riviä. Mukaan luvut alta. Omistaja päättää; oletus pysyy palat-v3:ssa siihen asti.
KK:lta odotetaan myös sanaa palat-v4:stä (seinäaukot). Ei korjausta eikä ajoa ilman sitä. Jos sana tulee, tee kerralla kaikki hyväksytyt muutokset (KK:n sääntö).

## ND:n rantakoe (omistaja 08.13 "Kokeillaan", vain koe; KK:n sana)
- Palat `_tyo/natiiviseppa/pariisi-talot/palat-v3-nd-ranta`, loki `tee-palat-v3-nd-ranta.log`; KS:lle kerrottu 08.16.
- Maski `selvitys-yhteinen/nd-ranta/maski.png` (Seine + Cité, 1536×1024, 1 m/px, pohja.png:n ruudukko), tarkistus.png, korvaus.json; tekijä nd-ranta-maski.py. KS:ltä kysytty, rajataanko pohjakuva samaan viivaan; vastaus auki.
- Lisäys v3:een: taloja 126 020 → 127 144 (+1 124, +0,9 %), +2,9 Mt (+0,8 %), kolmioita +54 364, 6 palaa muuttui. Muistia ei mitattu. Tulos KK:lla.
- tee-palat.py muuttui: valinnainen 3. argumentti (maskin korvaus) ja OHJELMA-listaan Tour Saint-Jacques. sha256 a65dc0c213b77072… (v3 tehtiin 52cf81ba9670e96f…:lla). Oletuskomennon tuloksen pitäisi pysyä samana, koska maski on ensin; tätä ei ole ajettu tavuvertailuna.
- Rannoille tulee laatikoina Saint-Séverin, Saint-Gervais, Saint-Merri, Théâtre du Châtelet, Préfecture de Police ym. (06.55 "Jätetään laatikoina"). Kaksi asuntolaivaa jäi aineistoon. Täysi lista: nd-ranta-tarkista.py.

## Tulokset 08.03–08.10
- Ajo karttaseppa-yhteinen-2-127346f24 (palat-v3): sc-80:n rivi maassa, rinteissä ei näy painumista (6 m auki, ei talotonta paria). Rajat ennallaan. Rajaukset `selvitys-yhteinen/ajo-127346f24/`.
- Madeleine, Palais Bourbon, Saint-Sulpice nähty talojen kanssa vain ylhäältä; KS ottaa ne viistosta seuraavaan ajoon. Pompidou kunnossa po-la:ssa.
- ND:n sumea kiekko = pohja.png (KS, PT), ei NS:n työ.
- sc-80:n läikkä = seinäaukko. tee-palat.py jättää seinän pois tai aloittaa sen naapurin katolta 2x-maailmassa (`ala_y = max(pohja, nh)`). Tasaus (TaloKerros.shader:75) vie pohjat samalle tasolle, ja naapurin katto putoaa. Grand Orient way/69220186, naapuri Rich Club way/69220355: 10,5 × 32,6 m. Malli sovitettu kuvaan (kamera-sc80-etuala.json, sc80-etuala-sovitus.py), läikkä tyhjä mallissa. Pikselilleen sama ajossa 579ea327c.
- Laajuus (seina-aukot.py, .json; yläraja, näkyvät mittaamatta): ≥ 1 m 17 628 taloa, ≥ 3 m 5 662 (85 km), ≥ 5 m 2 336, ≥ 12 m 292.
- Ehdotus: `ala_y = max(pohja, min(nh, pohja + h_n))`, h_n = saman reunan naapurien korkein h, ja palat-v4. Koodaamatta, testaamatta, kolmioiden kasvu mittaamatta. KK:lla.

## Omistajan päätökset 6.11. (PT:n ja KK:n välittäminä)
- 06.55 suojatut talot "Jätetään laatikoina": ei suodatusta talokerrokseen. Riski App Storea ennen tarkistuslistalla (11.8).
- 06.58 kartta tasoitetaan keskustassa (KS). Talojen raja "En osaa sano", 08.13 korvasi kokeeksi: rantaan asti.
- KK 07.42: tasainen oletukseksi vasta, kun leijuminen on korjattu. Leijuminen poissa, päätös KK:lla.

## Muu tila (kuten -0745)
Koodi ennallaan natiiviseppa/marais-talot 7333833fe. Liiku 99748962f odottaa KK:n sanaa. Kyltit usvassa ilman rakennusta; ODbL ennen julkaisua; suorituskyky isossa iPadissa; Ateenan ja Tukholman viat odottavat Pariisia. Maskit sacre-coeur ja montparnasse jäävät. Sillan päät Valosepän.

## Viestit ja työtapa
Varakanava `mcp__ccd_session_mgmt__send_message` toimii. KK local_231e4bad, PT local_cf5b4eca, KS local_ddd980b0, NUI local_a3754ed8, JU local_b4a7e82a, Postivahti local_d8d003f6. Työpuu /Users/Shared/Claude/wt/proto-natiiviseppa-marais. Palatiedostot python3.14:llä ilman -I:tä. `tee-palat.py <D> <uusi kansio> [korvaus.json]`, aina uuteen kansioon.
