# Puyin liito – #1222, 28.10.2026

Kumulatiivinen liike-GLB: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-liikkeet-20261027/glide-wings-review-v1/motions/puyi-liikkeet.glb`
SHA256: `9b796f5628de78a1deb46654e9b8f75e556098d40eec53f692d877db8b531870`. 7 507 024 tavua, 14 leikettä.

Pohjana tänään toimitetun käsipitokorjauksen 11 liikkeen paketti. Näiden animaatioiden JSON, accessor-arvot ja lähdebinääri säilyvät tavuittain. Mukaan lisätty korvaavat `glide_enter`, `glide_loop`, `glide_exit`. Vastaanottaja korvaa vain samannimiset liikkeet; muiden aiemmin peliin tuotujen liikkeiden kirjastoa ei poisteta.

Ei päämallin vaihtoa eikä uusia morfeja. Solmuhierarkia, rest-asento ja solmunimet säilyvät. Tiedostossa ei ole meshejä, materiaaleja tai kuvia. Kaavun aiempi käsipitokorjaus vaatii edelleen oman v3-asennusohjeensa kaksi morfia. Näissä kolmessa liitoleikkeessä ei ole weights-kanavia; vastaanottajan sopimuksen mukaan puuttuva kanava palauttaa morfipainot nollaan.

## Liike ja ajoitus
- Keskiliidossa kädet noin 35,8–38,8° alaviistoon, kyynärpäissä noin 28° ja polvissa noin 49° koukistus.
- Vartalo eteen, jalat lähellä toisiaan. Viitan luuristikko kaartuu taakse ja sivuille; pieni jaksollinen lepatus.
- Enter/exit kestot ennallaan 1,0416666 s, loop 2,0416667 s. Enterin alku ja exitin loppu ovat alkuperäiset. Enterin loppu ja exitin alku yhdistyvät uuteen loopin alkuasentoon.
- Pelin 2× enter/exit, 1,9 s liito ja 0,25 s ristihäivytys säilyvät pelin vastuulla. Käännösleikkeet glide_left/right ennallaan.

## Tarkistettu ja tarkistamatta
Tallennettu tiedosto luettiin uudelleen. 294 asentonäytettä sekä 54 skinnatun geometrian näytettä: loop ilman T-asentoa, nivelkulmat yllä, loopin sauma ja enter/exit-liitokset alle 0,00003 mm. Tallennetun ja lasketun asennon suurin kärki-ero 0,052 mm. Uusissa avainruuduissa suurin kiertomuutos noin 1,95° / 1/120 s.

Kaikki kolme kuva-arkkia on katsottu. Kahdeksan ruudun sarjat ovat paikallisia GLB-esikatseluja: 2× enter/exit, loop keskellä, ei pelin ristihäivytystä, rataliikettä, putoamiskaarta tai törmäyksiä. Ne eivät ole pelistä kaapattuja kuvia. Materiaali näkyy molemmilta puolilta, kuten PK:n erillisessä Cull Off -korjauksessa.

Tunnettu raja: viitan enimmäisreunavenymä lepotilaan nähden on 1,71× (vanha noin 1,50×). Pienissä paikallisissa taitteissa enintään kaksi kolmiota painuu alle 5 % lepopinta-alasta; pahimmassa yksittäisessä kohdassa 0,36 %. Nollapintaisia kolmioita ei mitatuissa näytteissä ole. Nämä eivät erotu katsotuissa pelikameran kokoisissa kuvissa, mutta lähikamera ja pelin häivytys on vielä vastaanottajan tarkistettava. Tämä ei ole vaatteen simulaatio eikä todistus kaikkien aiempien kainalo-/ihokontaktien korjauksesta. Lähdegeometriaa tai skin-painoja ei muutettu.

PK: tuo kolme glide-leikettä, tee sama 1,9 s katonreunahyppy ja 8 ruutua. Tarkista myös liitos land_softiin ja viitan taitteet. KK hyväksyy ulkoasun pelistä. Vastaanotto, peli-integraatio ja KK-hyväksyntä ovat vielä auki.

Uudet Tripo-kutsut 0, krediitit 0. Ei uusia videoita. Työ tehtiin yhdellä matalan prioriteetin CPU-prosessilla; viennin huippumuisti 211 MiB ja kuvien 620 MiB.
