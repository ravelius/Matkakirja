# Pelikoodari: luovutus 5.11.2026 klo 11.05: rakennetaan tason 1 peliä, liike valmis, seuraavaksi kamera ja kytkentä

Korvaa -1050:n tilan. Tausta tarvittaessa -1050 ja suunnitelma `Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261104-juoksupeli-vapaa-maailma.md` (lue kohdat Malli ja Järjestys). Ei junaan mitään ennen omistajan pyyntöä; omistajalle vain KK:n kautta. Merkitse jokaiseen tulokseen runko.
Proto-worktree `/Users/Shared/Claude/wt/proto-pelikoodari-tarkastelu`, haara `pelikoodari/tarkastelu-219`, kärki `ad7d6d28e`. Polut `/Users/Shared/Claude/proto-3d/`. Python `/opt/homebrew/bin/python3` ilman -I.
Viestit send_messagella: PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, KK local_d5f31591-21fa-4cb0-bab3-bcd3435d075a, LAV local_f12c9179-a76b-4ce8-a1fe-1e0f2c8f251e, Postivahti local_1f31f830-9df5-41c1-8992-172e100af57f.

## 1. Linja: OMISTAJAN PÄÄTÖKSET 10.51 ja 10.52 (KK 10.53)
10.51: juoksupelin ovet "Kelpaavat (Suositus)": listan viat korjataan, hän näkee ne ensimmäisen tason kuvissa, ei enää erillistä oviarkkia.
10.52: "juoksupelissä ja pariisin kartassa kannattaa keskittyä vain rakentamiseen ja testaan vasta kun ovat valmiita, myös kaikki muu ylimääräinen kannattaa jättää pois."
KK: korvaa KK:n 10.47 neljä selvitystä: ei vertailua julkaistuun versioon eikä laajuusselvityksiä. Ei iPad-ajoja, mittauksia eikä toistosarjoja; Macin kuvat vain oman työn katsomiseen. **Rivi KK:lle vasta, kun taso on näytettävässä kunnossa tai tarvitset päätöksen.**
Maan viat (raidat, piikit, kiilat) viety LAV:lle riviksi 10.5x; syytä ei mitattu. Minulle ovilistasta jää rakentamisen mukana: 颐和轩 kahdet portaat (ovi mallin omille portaille: `oma=True` tai käsin kuten 益寿斋 `22933732f`). Täytteet 绥寿殿, 益寿斋, 南库, 军机处, 浴德殿 ym.: -1050 kohta 2.

## 2. Tehty: `ad7d6d28e` (Peli-testit 174/174 dotnetilla; EI ajettu Unityssä, ei kytketty maailmaan)
- `tyokalut/kulkukartta.py` tallentaa `peli-lahde.npz`; `tyokalut/kulkukartta_peli.py <kansio> <JuoksuOvet.json> <ulos>` tekee `Scripts/Juoksupeli/Resources/JuoksuKulku.bytes`: 198 kt, raaka 4,6 Mt muistissa. Lähde `_tyo/pelikoodari/kulkukartta/v19` (ovia sieltä ei käytetä; ovet = v18 Resourcesista). 54 koneen portaat kuljettaviksi lattioineen; 245 ovea erikseen. Muisti mittaamatta.
- `Peli/Juoksupeli/JuoksuKulkuKartta.cs`: kuljettavuus, lattia, vapaa korkeus, seinän etäisyys; `*R`-metodit reitin kehyksessä, `Pohjaan` asetetaan `palatsi.Pohjaan`:iin (**tekemättä, ilman sitä kartta lukee väärästä kehyksestä**), `OviLahella`.
- `Peli/Juoksupeli/JuoksuV4.Vapaa.cs`: `JuoksuV4Reitti.LuoVapaa(siemen, kartta, palatsi, alku, suunta, alkuVapaaM)`, lippu `VapaaMaailma`, staattinen `SokkeloKartta`. Reitti syntyy kappaleina (enintään 30 m) keisarin jalan linjalta; toinen kaista sille puolelle, jossa on tilaa. Seinä → `Pysahdy`; pyyhkäisy kääntää heti, jos 2,5 m tilaa, muuten seinäkosketus ja 1 s:n muisti. Taso läpi `TasoAikaS` 240 s (`Maalissa`; elinvoima riittää 200 s, joten vaatii omenoita; viritetään pelaten).
- Omenat: kiinteät paikat 22 m:n ruudukossa, malli pseudo-osalla `EnnakkoLista`:n kautta, tulevat kerättäviksi, kun kappale kulkee 2 m:n sisältä. Keräys vaatii hypyn ja 0,8 m sivuttain (vanha sääntö). Ei arvota etukäteen ympäristöstä: **ennakko alueelta tekemättä** (kutsu `KarttaOmena` keisarin ympäriltä 120 m:n säteellä `EnnakoiAlue`:ssa, muutama ruutu kerrallaan, ettei mikään ilmesty yhtäkkiä).

## 3. Seuraavaksi, järjestyksessä (suunnitelman C ja E)
1. **Kytkentä:** `JuoksuV4Maailma` latausvaiheessa (`JuoksuV4Maailma.cs` noin rivi 510, `SokkeloVerkko = v`): jos `VapaaMaailma`, `Resources.Load<TextAsset>("JuoksuKulku")` → `JuoksuKulkuKartta.Lue`, `Pohjaan = pal.Pohjaan`, `SokkeloKartta`; `PuuVerkko = null` (kaikki lähipuut piirtoon, koska ne ovat kartassa esteitä). `JuoksupeliNakyma.cs` rivi 747: `LuoVapaa`, alku `pal.Maailmaan(-129.5, 428.7)` (JuoksuTaso.Alku), suunta `Lansi` (AlkuSuunta), `alkuVapaaM` noin 9,5 (työhuone ei ole kartalla; OviS 5,9 ennallaan). QA `ui juoksupeli vapaa 1` (case-lista rivillä ~2120). Paikan korkeus: `Paivita`:ssa `var p = U(r.PisteKaarella…)` jälkeen `p.y = r.Kartta.LattiaR(...)`, kun ei NaN (U:n z on −z; tarkista). 0,25 m:n portaat tarvitsevat pehmennyksen.
2. **Katot ja seinät:** katot paikoillaan joka ruutu vapaassa tilassa (`sokkeloMaailma.KatotPaikoilleen()` tai häivytys pois `Paivita`:n rivillä ~1106); `SeinaHaivytys` pois. Tarkista `KeisariSisalla`.
3. **Kamera, yksi sääntö:** uusi puhdas `Peli/Juoksupeli/JuoksuKulkuKamera.cs` testeineen. Vanha koodi saa ajaa, ohitus juuri ennen `var asento = new KameraAsento(...)` (rivi ~2613): `if (r.Kartta != null && AvausT < 0f) (hx, hy, hz, hyaw, hpit) = vapaaKamera.Seuraa(...)`. Rakenne, josta aloittaisin:
   - Ahtaus = pienin `SeinaEtR` keisarista, 4 m edestä ja kameran paikasta; t = smoothstep 1,5–8 m. Korkeus 2,4 → 9 m, etäisyys 3,5 → 8 m (säädetään kuvista). Matalin voittaa; lasku nopea (τ 0,35), nousu hidas (τ 1,2).
   - Korkeus enintään `VapaaKorkeusR(kameran kohta) − 0,4` (kamana, portti).
   - Vaakapaikka **keisarin jäljeltä**: puskuri 0,25 m:n välein, kamera kohdassa, joka on etäisyyden verran jäljessä, koska keisari mahtui siitä; matalalla suodatin.
   - Katse keisarin rintaan + hieman eteen; avauksen lopusta 1,2 s:n sekoitus vanhasta asennosta.
   - Testi: puhtaalla kartalla kamera ei ole seinässä kääntyessä; korkeus putoaa kujalla ja nousee aukiolla.
4. **Kynnys:** seinälle pysähdyttäessä `OviLahella(…, 1,5)` → lyhyt viesti (kielitiedostot), että sisälle pääsee seuraavalla tasolla. Tuoreet tekstit: katso `omistajan toimet` / generointi ei tarvita, pelkkä teksti.
5. **Ovet ja esineet normaalipeliin:** `OvetKoe` ja `OviMallitPaikoilleen` ajetaan nyt vain komennolla; ovimalli on `_tyo/codex/juoksupeli-ovi-20261104/mallit-v1/` (`ovikoe juuri file://…` toimii vain Macilla, ämpärivienti vasta luvalla: PK vahvistaa viittaukset). Kala-allas ja ruukku: `JuoksuV4Maailma.Ulkoesineet.cs` (esinekoe), `Resources/JuoksuEsineet.json`, 109 kpl; törmäys ja rikkoutuminen kuten Vaisto-este kappaleelle tullessa, samalla tavalla kuin omenat.
6. **Eunukit:** ensin edestä tulevat kappaleille (≥ 20 m, kaksi kaistaa): `V4Vartijapaikka` + `Odotuspaikka` + `V4Ennakko` kuten `Sisalto`, harvoin (`EunukkiKerroin`). Reitin hakeminen kartalta myöhemmin. Takaa-ajaja toimii S:n kautta ilman muutosta; odottaessa se saavuttaa keisarin (testissä noin alle 30 s).
7. **Maali pois näkyvistä:** `MaaliSuunta` on jo null ilman verkkoa; tarkista nuoli, maalikuva, `MaaliT`, Maali-kortti ja loppukortin teksti, kun `Maalissa` tulee ajasta. Opetus (`JuoksuOpetus`) laukeaa tilanteesta: ensimmäinen käännös ja este, ei T-risteys (`KaantoEdessaS` palauttaa −1 ilman verkkoa).
8. **Oma katselu Macilla** JU:n vuorolla, kun 1–3 on tehty: yksi lyhyt botti- tai kosketusajo, kuvat vain itselle. Botti: `JuoksuV4Botti` toimii kartalla (testi `BottiEiKoskaanSeinanSisalla`). Ei iPadia. Sitten yhden oven kamerakoe vasta tason jälkeen (suunnitelman D ei ole tason 1 este).

## 4. Rajoitukset, joista tiedän
- Kappaleen `Sivu`-kaista lasketaan koko kappaleelta: yksi este 30 m:n päässä poistaa toisen kaistan alusta asti. Jos näkyy pelissä, lyhennä kappale kaistan muutoskohtaan.
- Käännökset ovat 90° reitin kehyksessä (palatsin akselit, −2,03° pohjasta): vino seinä pysäyttää. Omistajan ohjain on 90°, joten jätetty.
- Kartta 1 m:n karkeudella: `SeinaEtR` ja `VapaaKorkeusR`; kuljettavuus 0,5 m. Kapea rako alle 0,6 m ei läpäise kehoa, tarkoituksella.
- Vanhojen verkkoon sidottujen osien kutsut (`Reitti.Verkko`): tarkistettu vain säännöstä; maailmassa katso `r.Sokkelo.Palatsi`, `sokkeloMaailma.Verkkotila`, `PaivitaVartijat` kytkennän yhteydessä.
- Työkaluvika: `unity-tarkistus` ei löytänyt CS0152:ta (-1320 kohta 5): älä sano 0 virhettä todisteeksi; käännös esikatselussa.

## 5. Säilyvät -1050:stä
Muistimittaukset seis; luvut ja `lahtotaso.zsh`-korjaus -1050 kohta 3. 404:t -1050 kohta 4. Kaide (sävy a, haaleus, LOD2) ja tk-taihemen-lod0: ei tason 1 rakentamisen este, omistajan 10.52:n mukaan odottavat. 9 ovetonta saa jäädä.

**PT 11.0x: OMISTAJA 10.55:** pois muistin keventäminen sekä testinäkymän ja muistivahdin jatkotyöt. Jatkuu tason 1 rakentaminen; ei iPad-ajoja eikä toistosarjoja (Raamattu 2.209). Epäselvät työt rivinä KK:lle, älä karsi niitä itse. Siksi `lahtotaso.zsh`-korjaus ja Testinäkymän rivi `juoksupeli-tarkastelu` (-1320 kohta 4) eivät ole työlistallasi.

## OPIT
Keho vaatii varan myös eteenpäin: pysähtymispaikka 0,25 m seinästä esti sivukäännöksen, koska sivun tilatarkistus osui seinään. Odottaminen seinällä ei ole turvallista testissä: takaa-ajaja saavuttaa, ja `Seis` selittää "ei käännöstä".
