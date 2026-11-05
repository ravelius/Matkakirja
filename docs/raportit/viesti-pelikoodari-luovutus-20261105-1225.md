# Pelikoodari: luovutus 5.11.2026 klo 12.25: taso 1 juostaan kartalla, katot paikoillaan, yksi kamerasääntö; seuraavaksi eunukit ja ulkoesineet

Korvaa -1105:n tilan. Yksityiskohdat, joita tässä ei toisteta: -1105 kohdat 4, 5 ja "PT 11.0x"; suunnitelma `Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261104-juoksupeli-vapaa-maailma.md` (Malli, Järjestys, Tasot).
Proto-worktree `/Users/Shared/Claude/wt/proto-pelikoodari-tarkastelu`, haara `pelikoodari/tarkastelu-219`, kärki `6e87fe375` (pushattu natiivi-backupiin). Python `/opt/homebrew/bin/python3` ilman -I. Ei junaan mitään ennen omistajan pyyntöä; omistajalle vain KK:n kautta.
Viestit send_messagella: PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, KK local_d5f31591-21fa-4cb0-bab3-bcd3435d075a, LAV local_f12c9179-a76b-4ce8-a1fe-1e0f2c8f251e, Postivahti local_1f31f830-9df5-41c1-8992-172e100af57f.

## 1. Linja (omistaja 10.51, 10.52, 10.55; KK 10.53)
Vain rakentamista. Ei iPad-ajoja, mittauksia eikä toistosarjoja; Macin kuvat vain oman työn katsomiseen JU:n vuorolla. Ovet kelpaavat, listan viat korjataan rakentamisen mukana. Muistin kevennys ja testinäkymän jatkotyöt pois. **Rivi KK:lle, kun taso on näytettävässä kunnossa tai tarvitset päätöksen.** Sitä ei ole vielä lähetetty: eunukit ja esineet puuttuvat.

## 2. Tehty tässä erässä: c893bfd40, ab92d15c5, 6e87fe375 (Peli-testit 181/181, unity-tarkistus 0)
Käyttöön QA:lla `ui juoksupeli vapaa 1` ennen `ui juoksupeli v4`. Ilman lippua vanha peli ennallaan.
- **Kytkentä:** `JuoksuV4Maailma` lataa `JuoksuKulku`:n latauksen lopussa ja asettaa `Pohjaan`; `JuoksuV4Reitti.LuoVapaaTaso`, `VapaaValmis`; `PuuVerkko = null`. Lattia kartalta `maaKohde`:n kautta; olemassa oleva jousi pehmentää portaat.
- **Lähtö:** ovelta 9,5 m ja kerran itsestään kujalle etelään (`TyohuoneKaanto`, avauksen osa; omistaja 27.10. 10.25). Ilman tätä avauksen lopussa keisari jäi kuvan ulkopuolelle.
- **Katot ja seinät:** `JuoksuSokkeloMaailma.KatotAina` joka ruutu; seinän häivytys pois kartalla.
- **Kamera:** `Peli/Juoksupeli/JuoksuKulkuKamera.cs` testeineen. Ahtaus 1,5–8 m → korkeus 2,4–9 m, etäisyys 3,5–8 m; lasku 0,35 s, nousu 1,2 s; kamana luetaan jäljeltä ja edestä; paikka keisarin jäljeltä; jyrkkyysraja 0,9 vaakamatkasta; katse 1–6 m eteen. Maailmassa ohitus juuri ennen `KaapuKulma`-kohtaa, 1,2 s:n sekoitus (`VapaaKameraSekoitusS`): avauksessa ja kiinniotossa vanha asento. **Vanha kamerakoodi ajaa yhä alla:** poistetaan vasta, kun omistaja on hyväksynyt uuden (suunnitelman riski 1).
- **Maali pois:** `Maalissa` tulee ajasta (`TasoAikaS` 240 s, virittämättä pelaten), ei maalikuvaa eikä maalirivejä, kortin otsikko "Taso läpi!" (`ui.juoksupeli.loppu.taso`, `JuoksuTulos.TasoLapi`).
- **Kynnys:** seinälle pysähdys alle 1,5 m:n päässä ovesta → huuto "Sisälle pääsee seuraavalla tasolla." (`ui.juoksupeli.kynnys`).
- **Opetus:** `KaantoEdessaS` kartalla: avoin sivu ikkunassa.
- **Omenat:** `EnnakoiAlue` → `KarttaEnnakko`, 120 m:n säde, muutama ruutu kerrallaan.
- **Ovet:** `OvetKoe` latauksessa kaikille 245:lle. Ovimalli oletuksena ämpäristä `ovi-v1/`; vienti ei ole tehty, ja ilman sitä lehdet puuttuvat. Macilla `ui juoksupeli ovikoe juuri file:///Users/Shared/Claude/proto-3d/_tyo/codex/juoksupeli-ovi-20261104/mallit-v1/` ja `ovikoe koe`. Ämpärivienti vasta luvalla (PK vahvistaa viittaukset).

## 3. Katsottu pelistä
Skenaario `_tyo/pelikoodari/vapaa-1/sk-a.txt` (botti, kuva 3 s välein), arkki `_tyo/pelikoodari/vapaa-1/arkki-b.jpg`, täysikoko `lokit/esikatselu-20261105-121750` (6e87fe375, Mac, iPad-koko). Kaikki 30 kuvaa katsottu: keisari ruudussa joka kuvassa avauksen jälkeen, katot paikoillaan, kamera matalalla kujilla ja portissa, näkymä eteen. Ensimmäisen ajon viat (`-120835`: avauksen loppu ilman keisaria, katse suoraan maahan) korjautuivat.
Ei katsottu: kiinniotto, uupuminen, "Taso läpi!" -kortti, kynnysviesti, opetus (botti ja `opetus 0`), oikea kosketusohjaus, ruudunpäivitys.
Nähty, ei korjattu: tumma viiru seinässä kuvassa 14, tumma läikkä seinän juuressa kuvissa 24–25 ja 29 (eivät ole kamerasta; samaa perhettä LAV:n maan vikojen kanssa?). Puun runko voi käydä kameran edessä (kuvat -120835 27–28): runko ei ole kuljettava, mutta kamera kulkee 1 m:n päästä; katso pelatessa.

## 4. Seuraavaksi, järjestyksessä
1. **Eunukit edestä.** Ei kappalekohtaisesti: kappale syntyy vasta edellisen lopussa, joten malli ilmestyisi näkyville 20–28 m:n päähän (omistaja 20.10.: "mikään ei saa ilmestyä yhtäkkiä"). Tee kuten omenat: kiinteä ruudukko (arvio 25 m, osuus `EunukkiKerroin`:n mukaan), malli `EnnakkoLista`:n kautta (`V4Ennakko.Vartijat`, `Odotuspaikka`, pseudo-osa), ja tulee vartijapaikaksi, kun kappale kulkee muutaman metrin sisältä. Ensin luettava `LisaaEnnakot`:n vartijaosa ja `PaivitaVartijat`: montako seisovaa hahmoa saa olla kerralla ja miten hahmo lähtee sivulta kaistalle. Käännöksessä katkaistut paikat: `KarttaKaanto` poistaa ne reitiltä, hahmo jää seisomaan paikalleen. Takaa-ajaja toimii jo (kuvissa näkyy).
2. **Ulkoesineet:** `JuoksuV4Maailma.Ulkoesineet.cs` (`Jonoon`, `Resources/JuoksuEsineet.json`, 109 kpl, `esineJuuri`) peliin lipulla; törmäys kuten Vaisto-este samalla tavalla kuin omenat: kiinteä paikka, tulee esteeksi kappaleen kohdalla. Rikkoutuminen: ehjä → rikki-malli (`RikkoLaskuri`, `V4Este.Rikki`). Ämpärivienti kuten ovet.
3. **颐和轩:n ovi** omille portaille ja täytteet 绥寿殿, 益寿斋, 南库, 军机处, 浴德殿 ym. (-1050 kohta 2), rakentamisen mukana.
4. Oma katselu JU:n vuorolla kosketusohjauksella tai botilla, tarkista kohdan 3 "ei katsottu"; `TasoAikaS` ja kameran käyrä pelaten.
5. **Rivi KK:lle:** taso näytettävässä kunnossa. Yhden oven kamerakoe (D) vasta tason jälkeen.

## 5. Rajoitukset, joista tiedän
- -1105 kohta 4 pätee: kappaleen `Sivu`, 90°:n käännökset, kapea rako, `unity-tarkistus` ei löydä CS0152:ta.
- Vanhan kameran kamerasuoja-lokit jatkuvat vapaassa tilassa: ne kertovat ohitetusta asennosta, eivät ruudusta.
- `alkuKaanto` kääntää myös, jos oikea tai vasen ei olisi tilava: lähtö on käsin tehty tasolle 1, ei yleinen sääntö.

## 6. Siivous
Vanhat scratchpadit poistettu PT:n pyynnöstä, rivi PT:lle lähetetty.

## OPIT
Kamera katsotaan aina myös käännöksen jälkeen: jäljeltä luettu paikka on silloin kulman takana ja lähellä, ja korkeus pitää sitoa todelliseen vaakamatkaan, muuten katse putoaa maahan. Puhtaassa testissä sama vika ei näkynyt, ennen kuin sille kirjoitti oman testin kulmakertoimesta.
