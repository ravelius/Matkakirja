# Pelikoodari: luovutus 3.11.2026 klo 22.55 – junat 218/219

Edellinen: -20261103-2235 (b6d560299), voimassa ellei alla toisin. Syy: kontekstiraja 26 % (7.37). Ei omia taustaketjuja.

## Tehty 22.43–22.55
- **Työlista** (PT): eunukit ja kiinan tekstit "valmis, junassa 218", muistokuplat (8/8 esineellä kuva pelissä; toinen vaihe avoin), arkiset hahmot päivitetty.
- **VEDEN KAATO proto pelikoodari/vesi-219 c865ea4d8** (86476dd60:n päällä, wt/proto-pelikoodari-vesi, lipun JuoksuPalvelijat.Paalla takana): JuoksuVesiastiat
  (LAV:n vesiastiat-pk.json koodissa; 8 astiaa kujien lähellä, 2 terassilla pois; hahmo 1,1 m astiasta kujan puolella, rasterista vapaa paikka), fill_right → fill_left →
  idle_after_fill Puyin ollessa ≤ 30 m, vesivirta (suippo putki, ämpärin veden materiaali; ikkuna 1,08–1,50 s), säikähtänyt jää paikalleen, kaadettu ämpäri tyhjä, ei lätäkköä.
  Peli-testit 819/819, unity-tarkistus 0 virhettä. KUVAA EI OLE: virtaputken ulkonäköä, kääntöä ja materiaalia ei ole nähty. PT 22.5x: jatka omalla haaralla, ei junaan ennen kuvakuittausta.
- **LAV tausta-v123 → runko d667da301** (saumat-v1-219 = 088a6ca28 + v122 → v123; SHA256SUMS bdff62d48809 täsmää; KK:n yöpäätös LAV:n kautta). SHA JU:lle (vienti ensin) ja LAV:lle. Mediassa 404 lähetyshetkellä.
- **Otsikot KK:lle** (PT 22.5x): lokit/pk-otsikot-kk-20261103/ PT:llä. Latauskuvat tarkistuskoosteita, eivät pelitallenteesta.

## AVOIN
1. **Alkulennon otsikon kesto**: tallenteessa 215546-taso1b näkyy ~0,6 s ja häipyy ~0,2 s:ssa, koodissa KuvatNakyvissaS 4,8 ja häivytys 0,8 s (schedule, oikea aika). Ei varmistettu: tallenne-video.sh:n aikakanta vai oikea vika. Tarkista unity.log "rivi-N"-merkeistä tai oikean ajan tallenteesta seuraavalla vuorolla.
2. **Alkulento alku**: soikea usva vaaleaa taustaa vasten ennen maailman latautumista (alkulento-1). PT tietää; KK päättää.
3. **PALVELIJAT v6**: ennallaan (-2235 kohta 1), JU-jonossa; yötyö ohittaa, käännösvuorot vasta Pariisin jälkeen (PT).
4. **Veden kaadon kuvat** samalle vuorolle: vesi-219 + `ui juoksupeli palvelijat 1`; Taihemenin astiat 4 ja 9 (reitti ≈ (∓27…32, 143)) ovat kujalla, loki "vedenkantaja täyttää astiaa N".
5. Mahdollinen oma vesiääni (Äänittäjä): ei tilattu.
6. Muiden rikottavien esineiden ehdotus odottaa juoksupelin valmistumista.
7. Checkout: luovutushaara koti/Matkakirja-pelikoodari (tämä tiedosto sen kärjessä).

## Lisäys 23.00: otsikkoselvitys (PT 22.5x), ilman käännöstä
Haara proto pelikoodari/otsikko-219 7611ad84b (1ab6dfa38:n päällä, wt/proto-pelikoodari-otsikko; unity-tarkistus 0 virhettä; ei ajettu pelissä).
- **Kesto 0,6 vs 4,8 s**: oikea kesto koodista 4,0 s + häivytys 0,8 s. Juliste ajastuu UITK:n schedulella oikeassa ajassa, tallenne on peliaikaa (askel 0,02 s). Ajossa yksi peliaskel kestää enemmän kuin 0,02 s, ja tallenne alkoi vasta rivi-2:n jälkeen (unity.log), joten video puristaa ajan. Todistus: uusi lokirivi "avauksen tekstit häipyvät N s:n jälkeen (oikeaa aikaa)".
- **"Kiinni! Napauta nopeasti"**: skenaarion jäänne. Botti jäi kiinni (loki "kiinni takaa v1 z10"), ja `avaus nyt` aloitti uuden juoksun, kun kehote oli vielä näkyvissä (huutoLoppuu + 0,4 s). Oikeassa pelissä tekstiä ei synny alkulennon aikana (S.Pidetty false), mutta Uudestaan jätti vanhan kehotteen; korjattu haaralla.
- **Soikea usva vaaleaa taustaa vasten**: näkyy 6 videoruutua `avaus nyt` -uudelleenaloituksessa kiinnioton jälkeen. Normaali aloitus: latauskuva pysyy, kunnes maailma on valmis (Nakyvissa, Lammitetty, GC), ja LentoAlkaa tulee vasta sen jälkeen, joten tilannetta ei pitäisi syntyä. Syytä vaaleaan ruutuun EI löytynyt: kaukotaso ei se ole (2600 m kiinteä, Valo.cs:n muutos vain QA:ssa). Usvaan ei tehty muutosta. Varmistus: tallenne normaalista aloituksesta, tallenne-alku ennen pelin avausta, ei `avaus nyt`.

## Lisäys: KK:n otsikkopalaute (KK → PK) – SEURAAVAN ISTUNNON ENSIMMÄINEN TYÖ, ohittaa kohdat 1–2 yllä
Kaikki haaralle pelikoodari/otsikko-219 (wt/proto-pelikoodari-otsikko, 7611ad84b). Ei vielä tehty. Latauskuvan teksti pysyy (VIIMEINEN KEISARI + 末代皇帝 · 北京; nimipäätös 19.02 ei koske latauskuvaa). Vaaka HYVÄKSYTTY.
A. **Latauskuva pysty**: otsikkolohko ylemmäs selkeälle taivaalle; VIIMEINEN-sanan alku on nyt katon koristeiden päällä (lähtökohta JuoksupeliNakyma: NaytaOtsikko / pystyn Osa-mitat, tarkista hattumaski LatausRajausTestit).
B. **Alkulento, EI hyväksytty:**
 1. Otsikko syttyy vasta, kun maailma näkyy; valkoinen soikio vaaleaa taustaa vasten pois. KK vaatii tämän, vaikka normaalia aloitusta ei ole kuvattu: sido rivien ajastus maailman näkymiseen (JuoksuAvausJuliste.NaytaTekstit / Avaus, JuoksuV4Maailma.Nakyvissa), älä pelkkään LentoAlkaa-hetkeen.
 2. "Kiinni! Napauta nopeasti" ei saa näkyä alkulennossa: 7611ad84b poistaa jäänteen uudelleenaloituksessa; lisäksi estä kehote alkulennon ajaksi (JuoksupeliNakyma, kehote-rivi, avausT ≥ 0).
 3. Otsikkolohko taivaalle kuten latauskuvassa: nyt keskellä ruutua (SijoitaTekstit, kuvaLohko "juuri keskittää"), ja teksti ja erityisesti 1914 ovat rakennusten päällä. Tarkista pysty ja vaaka; alkulennon taivas on ruudun yläosassa.
 4. Näkyvyysaika: varmista, että pelaaja ehtii lukea koko lohkon (koodissa 4,8 s, rivit 0,4/1,0/1,6 s, lokirivi "häipyvät N s"). Tallenteen 0,6 s:ää ei saa todistaa selityksellä, vaan oikean ajan mittauksella.
 5. Selvitä kirkkaan keltainen nelikulmio maassa kuvan alkulento-2 merkkien vieressä (näkyy koko lennon ajan vasemmalla keskellä; kohde ei selvitetty).
C. **Todistus pelistä, ei koosteita**: iso iPad vaaka ja pysty + iPhone pysty (vuoro JU:lta, käännösvuorot Pariisin jälkeen), alkulennosta kuvat 0,5 s välein KK:lle, normaalista aloituksesta (ei `avaus nyt`), latauskuvat samalla ajolla.
