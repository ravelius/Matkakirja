# Natiivi-UI: luovutus 5.11.2026 klo 14.50 (konteksti 27 %, kaksi uutta isoa työtä aloittamatta)

Korvaa -1415:n. Proto: /Users/Shared/Claude/wt/proto-natiivi-ui-nousu-pieni, haara natiivi-ui/pariisi-lento-219, kärki d5850ff4e, ei committaamatonta. Peili: remote natiivi-backup, haara peili/proto/natiivi-ui/pariisi-lento-219 (vie uudet commitit samoin).
Sääntö 2.214: näkyvä Pariisin askel → Macin kuva (polku + yksi rivi) KK:lle local_d5f31591-21fa-4cb0-bab3-bcd3435d075a, kopio PT:lle. Ei selitekaistaa, ei iPadia, Mac-ajot JU:n vuorolla. Tunnettua vikaa ei leikata kuvasta.

## Ensin
1. Kuittaa JU:lle (local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd) "NUI valmis". JU antaa linjan vain kuittauksella.
2. JU:n viestillä ESIKATSELU NYT: `zsh /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/aloituslento-219/aja4.zsh` (d5850ff4e, sk-matka). Skriptissä ei PROTO_LINJA-riviä: anna `PROTO_LINJA=<linja>` komennon edessä. Kuittaa alku, rivi valmiista.
3. Jos kääntäjä valittaa: `lat`/`lon` uusina paikallisina `ElavaNimet.PoimiSisalto.Lisaa`:ssa (d5850ff4e; ei ole vielä käännetty).

## Katso aja4:n kuvista
- Huipun nimet poissa: a14:n alareuna ja b11 (edellisessä näkyi "Montagne Sainte-Geneviève 61 m"). Ei Col de la Chapellea.
- Kamera jää Pariisin ylle luennon ja Pulun kuvan jälkeen: b12, c01–c03 eivät saa olla Ranskan näkymä (edellisessä olivat).
- Kierto samassa rungossa kuvien kanssa, kuvat nousevat omilta paikoiltaan; kartta ei tummu (mittari: `scratchpad`-skriptin tapaan kirkkaus ruudun reunakaistasta a11–b01, oli 179,0 kaikissa).
- Sen jälkeen kuva KK:lle ja kopio PT:lle. KK (14.2x): LIIKE RUUTUSARJANA KK:lle, nyt kun kierto on samassa rungossa. KK nollautui 14.3x:n jälkeen; kuvat seuraavalle KK:lle, sama id.

## Tehty tällä vuorolla
- aja3 (9fd4cfdc8), lokit/esikatselu-20261105-142710: isoisän kuvien aikana kartta ei tummu (a11–b01 kirkkaus sama). Nimen poisto EI toiminut: 62d00acfc oli sidottu `PiirrosKerros.Nakyvyys`:een, joka on Pariisissa 0 (Valoseppä 99035b765 poisti piirroksen). a14.png meni KK:lle vian kanssa.
- 24622b08f: NS:n haara yhdistetty (sisältää 2c9ca58a6: omistaja 14.29 kamera jää, ei maan saapumiskohtausta).
- 45abf3d41: `OhitaEsitys` (Saapumisesitys): KiertoHiivu + OhitaLuento. Sen 200 m:n raja oli PT:n mielestä liian laaja, EI ajeta.
- d5850ff4e: huippujen nimet pois vain Pariisin alueelta: `ElavaNimet.PariisinAlueella` (48,70–49,00 N, 2,10–2,60 E). Koko kartan ehto: rivi PT:lle lähetetty työlistalle Pariisin jälkeen.
- KS:n d4929e087 suodattaa ketjuhotellit Pariisin kartalta omassa haarassaan: jos haarat yhdistyvät, katso voiko huippusuodatus olla samassa paikassa.

## Uudet työt, omistaja 14.44 (PT:n välitys), ei aloitettu
**1) Kyltti uusille 3D-kohteille:** "Notre-Dame, Sainte-Chapelle, Louvre, sarja 24:n kahdeksan: sama vaalea kyltti kuin 2.212:ssa, samalla zoomtasolla; sinun pohjasi."
- Mallit ovat vain KS:n haarassa karttaseppa/nahtavyydet-219 (d4929e087, worktree proto-karttaseppa-nd-kaanto-219): `Nahtavyysalue.Malli` (Nimi, Qid, Rajat, T). Yhdistäminen omaani: 52 committia ja ristiriita `Laattapalvelin.Elava.cs`:ssä, joten ÄLÄ yhdistä; tee uusi haara KS:n kärjestä ja uusi worktree /Users/Shared/Claude/wt:hen (415 Mt, levyä 113 Gi). Kerro KS:lle (local_7b57e35a-3a8e-4943-aba1-c960b9eb4671), koska koskee sen tiedostoa.
- Pohja: `UI/KarttaKyltti.cs`. `Aseta(teksti, x, y, peitto)` sisältää jo saman tason portin (`MaamerkkiLahella`) ja tyylin. Malli: `KaupunkiPallot.cs:677`, muunnos `juuri.WorldToLocal(RuntimePanelUtils.ScreenToPanel(...))`, kohta :596.
- Ehdotus: Nahtavyysalue antaa näkyvien mallien kylttilistan (Nimi, maailman piste, peitto = o.nakyvyys), paikka refaktoroidaan `OmaNimenPaikka`:sta Malli-olion mukaan (toimii ilman Qid:tä, sarja 24 tulee datana `S/tyokalut/peli.py`:llä). Kyltin peitto × (1 − Horisonttiusva.Peitto).
- Avoin päätös: kursiivinen oma nimi (`Nimikerros` r.oma, KS 6b9788c79, KK:n pyyntö) kyltin rinnalla tuottaisi saman nimen kahdesti. Suositus: kyltti korvaa oman nimen; kerro PT:lle rivillä.
- Sarja 24: KS:n luovutus -1407: vain Eiffel Codexilla, muut 7 odottavat KK:ta, eikä mikään ole vielä pelissä. Tee kyltti datavetoiseksi, niin ne tulevat mukaan itsestään. Mac-kuva Notre-Damesta, Sainte-Chapellesta ja Louvresta.

**2) Nimet häipyvät horisontissa:** "samaan tahtiin kuin kartta: nimi ei koskaan näy tyhjän tai taivaan päällä. NS tekee kallistuksen 90°:een asti, sovi rajapinta sen kanssa." Mac-kuvat KK:lle, kopio PT:lle, ei iPad-ajoja.
- Lähetin NS:lle (local_0f7f169f-2ceb-43d2-8fb4-223dda2c0870) ehdotuksen: yksi lähde `Horisonttiusva.Peitto(yYlhaalta)`, jota Nimikerros (:648), KaupunkiMerkit (:1258), KaupunkiPallot (:590) ja NostotKartalla jo lukevat; NS pitää `RuutuRajaY`:n ja `RuutuVoima`:n (`Aurinko.cs:294–299`) kartan todellisessa häivytyksessä 90°:een asti. Riskit: `RajanRuutuY` NaN → raja 0, nimet eivät häivy; voima × `Ilma` ja 0 sumun aikana. Vastaus odottaa: NS kertoo myös sha:n.
- Tarkista: striimikartan oma häivytys tai lataamaton alue (laattojen kantama) ei kulje Horisonttiusvan kautta; juuri se voi olla "tyhjä". Tyhjän alueen nimet voivat vaatia oman ehdon.

## Huomiot
- zsh: `git show $K:Assets/x` ei toimi, koska `:A` on zsh:n muunnin. Kirjoita `"${K}:Assets/x"`. `echo ===` kaatuu myös zsh:ssa.
- Työlistaan kirjattu omistajan 14.29-päätös (rivi Pariisi alusta isoisän ajan kartaksi).
- Ei auki olevia ajoja. PT on tiedossa d5850ff4e:stä. Testikytkimen puuttuvaa Pulun kuvaa ei korjata (PT). Soikio pysyy (KK). Lippu SEIS (omistaja 12.17) ei estä tätä työtä.
- NS sai tiedon d5850ff4e:stä jonossa; sen viesti 14.4x viittaa vielä 45abf3d41:een. Oikea runko on d5850ff4e.
