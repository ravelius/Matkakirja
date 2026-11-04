# Pelikoodari: luovutus 4.11.2026 klo 12.30 – tarkastelutila toimii Macilla, koko kierros ajamatta

Korvaa -1132:n. Syy: konteksti 31 % (7.37). Polut kansiossa /Users/Shared/Claude/proto-3d/, lokit `lokit/`. **Merkitse jokaiseen tulokseen runko.**

## Työ nyt: vaihe A (omistajan päätökset 11.26 ja 11.49)
Suunnitelmat: `/Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/`: `20261104-juoksupeli-vapaa-maailma.md` (järjestys A, B, sitten C–E taso 1; lue ennen B:tä) ja `20261104-juoksupeli-tarkastelutila.md` (todistukset). Poikkeuskartoitus `20261104-juoksupeli-poikkeuskartoitus.md` on apulaisen raportti, ei todiste. Kamera-, katto- ja verkkokorjaukset vanhaan seis. Jos vapaan maailman malli on koodin kannalta väärin, kerro KK:lle ennen B:tä. Vanha peli säilyy lipun takana. Tulokset ja kuvien polut KK:lle (local_d5f31591); iPad JU:n vuorolla; esikatselu vain JU:n "ESIKATSELU NYT" -vuorolla.
**Taso 1 (omistaja 11.53, koskee vaihetta E, ei muuta tätä järjestystä):** omenat, heitto, eunukkien väistö ulkona; sisäesineet eivät kuulu tasolle 1. Ulkoesineet: omistaja hyväksyi 12.23 kala-altaan ja kukkaruukun kuvat, KK tilaa Tripolta mallit `_tyo/codex/juoksupeli-ulkoesineet-20261104/mallit-v1/`; kerroin KK:lle, että `<id>-ehja.glb` ja `<id>-rikki.glb` riittää.

## Tila
Haara `pelikoodari/tarkastelu-219` = **287059278** (kolme committia rungon c4a5bfafb päällä), worktree `/Users/Shared/Claude/wt/proto-pelikoodari-tarkastelu`. `unity-tarkistus.sh` 0 virhettä; koko `tarkista.sh` läpi ensimmäisellä commitilla d3b0ddad9 (palauta sen jälkeen `git restore` Tyylikirja.uss, Tyylikirja.cs, tyylikirja.json).

Koeajo 12 kuvaa, Mac, `lokit/tarkastelu-287059278-121931/` (katsoin vareily-01 ja takapinta-01-pinnat; kuvat oikein päin):
- Toistuu: uusi käynti samassa ajossa 0,02397/0,02396, 0,01904/0,01904; paikallaan-muutos 0,0 kaikissa 12:ssa. Kahden erillisen ajon väreilyluvut 0,01180/0,01182 (havainne-01), 0,00254/0,00256 (-03); edellinen ajo oli ennen korjauksia, ei vielä todistus 3. Paikallaan-luku 0,19–0,47 katosi samassa commitissa, jossa liike-epäterävyys otettiin pois; syytä ei eroteltu kokeella.
- Aika: 12 kuvaa 34 s + Unityn käynnistys ja lataus noin 9 min (618 s), 51 Mt.
- Tyhjä horisontin alla 0 paitsi havainne-07 (0,099; kuvan reuna ja mika = Pohjapallo: yli maailman reunan, ei palatsin vika; tarkista).
- **Takapinta on kohinainen:** syaania 1–15 %. Korttipuut ovat poissa pinnat-ruudusta nimellä (`puut`, `lehv`), mutta kuvassa kaukopuut ja taustan lehvästö (yhdistetty tausta-/ulkorengasmalliin) näkyvät yhä syaanina, samoin räystäiden aluspinnat, muurien sisäpinnat ja koroke-reunat. Nämä pitää erottaa ennen kuin takapinnasta tulee kärkilista: arvio, että puut pois lajin perusteella ja luku rakennuksittain. Väreilyn havainne-07:n pahin solu = `kk-tausta-2-0 lod1`.
- Väreily on suhteellinen pikselien osuus, jonka kirkkaus vaihtaa suuntaa ≥ 2 kertaa 8 ruudussa (raja 12/255). Vaihdoin luovutuksen toisen derivaatan tähän, koska se hälyttää tavallisesta reunasta (0,5 × kontrasti). Mainitse KK:lle.

## Koodi
- `Scripts/Juoksupeli/JuoksuTarkastelu.cs`: komennot `ui juoksupeli tarkastelu tila|kamera x y z yaw pitch [fov]|katot 0|1|kansio P|mittaa [nimi]|kierros [ruudukko 40] [enintään 400] [pahimmat 20]|pois`. y = maan yläpuolella (`MaanPinta`), pitch alas +. Askel → `saanto.Piirra` → PiirronJalkeen (kamera `KameraKirjoittaja`lla, ei vain piirron ajaksi, joten Mika ja LateUpdate näkevät sen). Aika seis koko tilan ajan (timeScale 0); 30 asettumisruutua dt 1/30 uudessa paikassa, 3 samassa, `TarkasteluKesken` odottaa enintään 240. Ei reittimittaria; solmut vain paikkoina.
- `JuoksuV4Maailma.Tarkastelu.cs`: piilotus, kamera, pinnat. Pinnat-ruutu: `_JuoksuTarkastelu`, jälkikäsittely ja taivas pois. Katot pakotetaan paikoilleen (`KatotPaikoilleen`, omistajan 11.42 linjaus), `tarkastelu katot 0` = pelin säännöt.
- Varjostimet: `frag` → `fragPeli` + kääre, joka asettaa takapinnan värin lopuksi, joten pelin haarat ja derivaatat eivät muutu. Yksi uusi yhtenäinen, ei uutta muistia.
- Kaappaus: `AfterRenderingPostProcessing` → RGBA8 sRGB → `AsyncGPUReadback` ruudun välein ilman odotusta, luvut järjestyksessä. **Kuvan rivi 0 on alareuna** (todettu Macilla, RT-kohde). **Tarkista laitteella:** näytöllisessä ajossa kamera piirtää itse eri kohteeseen, joten rivijärjestys pitää katsoa ensimmäisestä iPad-kuvasta.
- Batch-ajossa ei ole näyttöä: `PiirraIlmanNayttoa` piirtää vain pyydetyt ruudut 2202 × 1651 -kohteeseen (iso iPad × 0,8). Siksi väliruutuja ei piirretä Macilla, laitteella piirretään; todistus laitteella.
- `tyokalut/tarkastelu.sh <sha> [ruudukko] [enintään] [pahimmat] [--vertaa kansio]` ja `tarkastelu_yhteenveto.py`: yhteenveto.md, viimeinen rivi OK/VIKA. Ajossa `PROTO_LINJA=2` JU:n antaman vuoron mukaan. Oletusaikaraja 125 min.

## Tekemättä, tässä järjestyksessä
1. Pyydä JU:lta esikatselu ja aja koko kierros kahdesti: `PROTO_LINJA=<JU> zsh tyokalut/tarkastelu.sh 287059278` (taustalle; arvio 400 kuvaa ~20 min + 10 min käynnistys, mittaa piste/s). Toinen `--vertaa`. Täsmää todistus 3.
2. Takapinnan kohina pois (yllä), sitten todistukset: (1) omistajan vihreät boordit listan kärjessä: mitä boordit ovat, katso pahimmat ja `mika`; (2) tunnettu puuttuva pinta löytyy; (4) normaalipelin muisti ei muutu: mittaa ensilento JU:n vuorolla lukuihin ka 4000, huippu 4068 (c4a5bfafb, raja 4080). `palatsi kopiot 1` on vain tool-ajossa ja nostaa muistia: iPad-ajossa harkitse ilman kopioita.
3. Testinäkymän rivi: `Peli/Testihypyt.cs` Aloitukset (malli `juoksupeli-taso1`). `tarkastelu`-komento vaatii valmiin V4Kierroksen ja palatsin, joten lisää viivästetty aloitus (lippu, jonka PaivitaRuutu lukee). Avaus, botti, opetus ja palvelijat pois samalla rivillä. Kosketusohjaus (yksi sormi kääntää, kaksi siirtää, nipistys nostaa) on kirjoitettu `LueOhjaus`iin, **ei koskaan ajettu**. HUD jää näkyviin tilassa; piilota, jos häiritsee.
4. Kartta ristiriidoista (vaihe B) vasta tämän jälkeen. Kierrosnäytteet: havainne 8, solmut (ruudukko 40 m) ja rakennukset 5 kuvaa/rakennus, harvennettu enintään 400:aan.
5. iPad-lähtötilanne JU:n vuorolla: tulokset `Documents/tarkastelu/` (tuloskansio komennolla `kansio`); kuvia vain pahimmista (7 Mt, 4 s/kuva).

## JU:lta odottaa (pyydetty, -1132:sta ennallaan)
1. **☰-koe e65d4a4ef:** `pk-mittaa-uusinta-nappi.zsh e65d4a4ef 1 40`. `grep 'juoksupeli: valikko avattu' ui-loki.txt` ajon alusta (loki kertyy). PT: fokus = suunniteltu (2.201), ei korjausta; kosketus = selvitä lähde. Ei avausta = syy jää auki. Rivi PT:lle.
2. **Viivat:** `_tyo/pelikoodari/musta-lento/aja-viivat.zsh c4a5bfafb`: tulos `viivat-c4a5bfafb/mika.txt`, rivi `VIIVAT AJETTU`. Etsi kuvasta viivan y ja lue kolmio. Syy KK:lle ja PT:lle; paikkakorjausta ei tehdä.
3. **Reittiajo** `REITTI AJETTU c4a5bfafb` (`peitto-reitti/aja-runko.zsh`): kuvat ja kirjaus `lokit/pk-muistipiikki-219/TULOS.md`:hen.
Muisti (PT 11.2x): ensilento 4/4 alle rajan, ei korjausta nyt, 1af126155 poissa.

## Muistiinpanot
- Viestit: PT local_8d8ebf72, JU local_2a7d6c96, KK local_d5f31591, Postivahti local_1f31f830, täydet id:t osoitekirjassa.
- Proton commitit samassa gitissä kaikissa proton worktreissa. `TULOS.md` ei ole gitissä.
- zsh: `echo ==` ja `${(f)…}` kaatavat komentotarkistuksen; aja lyhyet komennot erikseen.
- Esikatselukopio poistaa muutokset ajon lopussa; ajetaan aina commitista.
