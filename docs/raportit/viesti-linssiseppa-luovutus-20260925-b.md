# Linssisepän luovutus 25.9.2026 ilta (b)

*Linssiseppä (Opus, max). Kirjoitettu Fablen käskystä klo 18.5x (konteksti 76 %). Edellinen: viesti-linssiseppa-luovutus-20260925.md.
Jatkaja lukee tämän ja viesti-linssiseppa-aloitus.md:n.*

## Tärkein nyt: Ihmisen matka II (omistajan tilaus 25.9., Raamattu IHMISEN MATKA II, poikkeus linssikieltoon)

Suunnitelma: docs/raportit/ihmisen-matka-2-suunnitelma-20260925.md (#3221 mainissa). Fable hyväksyi sen, ja kolme päätöstä
on tehty:
1. raidat korjataan jaettuun Vana.shaderiin
2. II on erillinen linssi laukussa
3. äänimaisemat haetaan Freesoundista CC0/CC BY -ehdoin

### Haara ja erät (proto-git, oma worktree /Users/Shared/Claude/wt/proto-linssiseppa, haara linssiseppa/ihmisen-matka-2)

| Erä | Commit | Tila |
|---|---|---|
| 0–1 | 7e1d7480 | **junassa** (juna/b13 3d2fad7c, build 16): linssi `ihmisen-matka-2` (omistus I:n kautta, portti), `IhmisenMatka2Tehosteet` (kuvan alue ja kartan väistö `KarttaKerrokset.Linssisiirto`), CC-logiikka `IhmisenMatkaKerros.TekstiNakyvissa/AsetaTekstitys/CcNappi/KuvanAlue`, Vana.shader: pikselisäde + SV_Depth + ZTest Less + 25 km veto (raidat ja maastoleikkaus pois, myös I:ssä) ja kaista häipyy kuvan alta |
| 2 | f387c824 | **junassa**: valokeila (Afrikan valot, keila kohteeseen kameran tahdissa, lähtö heikkona toisena keilana, seudun sävy: luola 1900 K, kylmä, meri kuu), hämärä syvenee kuvan ajaksi, aikahyppy, loppu |
| 4 | 6d16dbe1 | EI junassa, todentamatta: `IhmisenMatka2Maisema` (jakson `maisema` ämpäristä, ristihäivytys 2,5 s, saumaton silmukka, väistö kertojan alla, asetus Äänimaisema) |
| 5a | 0ccd41da | EI junassa, todentamatta: aamunkoitto (valot pisteestä mantereen yli) ja vanojen rintaman hehku (`VanaKerros.hehku`, `_Hehku`) |
| 5b | b7efa8ab | EI junassa, todentamatta: `IhmisenMatka2Ymparisto` kallistaa lähikuvat 24° (kohde alle 4500 km), laajat suoraan, sulkiessa ei kallistusta |
| 3 sumu | – | odottaa Natiivisepän `KarttaKerrokset.Sumu(korkeudetKm[], tiheys, kesto, ajelehtiminen, väri)` -rajapintaa (sovittu; Natiiviseppä luovutti roolinsa, joten kysy seuraajalta) |

UI-osuus on Natiivi-UI:n haarassa natiivi-ui/ihmisen-matka-2 15827520 (junassa):
- tunnisteet `OnIhmisenMatka`
- CC-nappi vuosiluvun rivin oikeassa päässä (ei saaren alla)
- esittelyn otsikko "Ihmisen matka II"
- iso kuva `KuvanAlue`-alueeseen ja peittävä maski

Natiivisepän valokeila ja Linssisiirto ovat haarassa natiiviseppa/valokeila 07104206 (junassa). Linssisiirto kääntää nyt
kameraa, eikä projektiomatriisia enää muuteta. Vanha versio aiheutti URP-virheen "Screen position out of view frustum"
joka kehys.

### Seuraavaksi

1. **Erien 4–5 video.** Käännös on valmis: KÄÄNNETTY b4428138 (juna/b13 + linssiseppa/ihmisen-matka-2, klo 18.56, ei
   varjostinvirheitä). .app-kopio on kansiossa
   `/private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-linssiseppa/54895bc4-ec0e-4550-9d4c-56000f6a52c8/scratchpad/im2c/Matkakirja3D.app`.
   Käännä uudelleen, jos kopio puuttuu tai juna on muuttunut.
   - Julkaisijalta on pyydetty 15 min vuoro Pelikoodarin lämpöerän jälkeen.
   - Tarkista: äänimaisemat (vaihto ja silmukka; mykistys pois vain kuunneltaessa), aamunkoitto, rintaman hehku, kallistus
     ja kehysaika.
   - Todennuksen jälkeen merge-pyyntö juna/b13:ään Natiivisepälle ja ilmoitus Fablelle (build 16/17).
2. **Erä 3, sumu,** kun rajapinta tulee: avauksen syöksy pilvikerrosten läpi, kuumuusutu, merisumu, jää-usva ja lumi,
   aikahypyn pyörresumu.
3. **Erä 5:n loput** (vapaat kädet):
   - hiukkaset: pöly valossa, lumi, soihdun lepatus (keilan `kirkkaus` värisemään)
   - Ken Burns havainnekuvaan (Natiivi-UI:n UI)
   - Amerikkojen saattolento rintaman takana
   - loppukuvan viisi hehkuvaa virtaa
4. **Äänimaisemien tekijät.** CC BY -tekijät (reinsamba, KasperAugustTopp, nsmusic, fundamental_harmonics, iainmccurdy,
   klankbeeld) lisätään js/lahteet.js:n ja README:n Äänet-riviin, kun omistaja on kuunnellut äänet (lahteet.js:n sääntö).
   Lista on PR:ssä #3231.

### Videot ja mittaukset

- **Erät 0–2:** `proto-3d/lokit/ihmisen-matka-2-era1b/ihmisen-matka-2-era0-2-iphone.mp4` (2,6 Mt, pakattu), raaka
  iphone.mp4 576 Mt. Kuvat iphone-{01,02-cc,levantti,australia,denisova,beringia,meri,loppu}.png.
- **Kehysaika simulaattorissa:** mediaani 16,7 ms, p95 18,1 ms, p99 27,1 ms, 0,8 % yli 33 ms (jaksohypyissä).
  URP-virheitä 0.
- **Vertailu vanhaan varjostimeen** (`vanha-I-meri.png` / `iphone-I-meri.png`): vanha piilotti Tyynenmeren kaistan
  saarilla maaston alle, uusi maalaa sen. Merellä saarten välissä ei ole ohutta viivaa kummassakaan: tutki tämä erikseen,
  voi olla webin ero.
- **Ensimmäinen video** (`ihmisen-matka-2-era1/`) näyttää URP-virheen ja CC:n saaren alla, eli tilanteen ennen korjauksia.

## Linssipariteetti

**Kierros 4 on valmis** build 15:llä: docs/raportit/linssipariteetti-4-20260925.md (#3229 mainissa).
- iPhone, iPad ja vaaka: 0 avointa.
- Rivi 42 (karttapallo) on Fablen hyväksymä poikkeama, ja rivi 43 (isoisä 1873) on VAIN-NATIIVISSA.
- iPadin pillerin ero oli työkalun mittausvirhe (Natiivi-UI). Korjaus on PR:ssä #3232 (yläpalkin pareista ei vähennetä
  siirtoa), ja raportti on päivitetty.

**Työkalu** (mainissa: #3171, #3175, #3195, #3197):
- mykistys
- omat simulaattorit: `PARITEETTI_IPHONE_UDID`, `PARITEETTI_VAAKA_UDID` ja `PARITEETTI_IPAD11_UDID`
- odotuspeite ja kerronnan loppu
- rivit 42 ja 43 sekä tila VAIN-NATIIVISSA

Ajoskriptin kaava: boot → install (oma .app-kopio) → launch-koe → pariteetti-ajo yhdelle laitteelle → shutdown UDID:llä,
yksi simulaattori kerrallaan.

## Äänimaisemat

Aanihaku-työnkulku (`gh workflow run aanihaku.yml --ref <haara> -f tila=ihmisen-matka-maisemat [-f kuiva=true] [-f tunnus=…]`)
toi 15 maisemaa ämpäriin `aanet/tehosteet/ihmisen-matka/` (−30 LUFS, manifesti.json 200). Koneen alkuperäiset valinnat
olivat vääriä:
- Marsin tuuli
- keinotekoinen tuuli
- lepakot
- sireenit
- albumiraita ja presidentin puhe (Commons)

Siksi lista on nyt vain Freesoundista, lyhyillä hauilla ja poissuluilla (#3231, haara linssiseppa-aanimaisemat-haku). Luola
sai +11,8 dB:n korjauksen (hiljainen äänite), joten kuuntele kohina.

## Opit

- **zsh ei pilko `$VAR`-listaa:** käytä taulukkoa `OMAT=(a b)`. Muuten install jää tekemättä, ja ajo käyttää vanhaa .appia.
- **`simctl shutdown all` on kielletty,** koska se kaataa toisten ajot (muisti ei-simctl-shutdown-all). Sammuta vain
  omat UDID:llä.
- **Asennus ja välitön sammutus** jättävät sovelluksen käynnistymättömäksi. Asenna käynnissä olevaan simulaattoriin ja
  tee launch-koe.
- **Kopioi käännöspalvelun .app vasta, kun lokissa lukee KÄÄNNETTY.** Muuten saat edellisen käännöksen.
- **`simctl io screenshot` ei piirrä Dynamic Islandia, mutta `recordVideo` piirtää.** Saaren alle jäävä nappi näkyy vain
  videossa.
- **Kehityskonsoli aukeaa virheistä:** jos se näkyy ruudulla, katso stdout-loki ja pino.
- **Uuden pelin kerronta sumentaa pallon** (PalloKierto.KuvaSumea), joten kuvaa vasta "ui liiku: esiin (kerronta ohi)"
  -rivin jälkeen.
- **Freesoundin haku vaatii kaikki sanat,** joten pidä haut lyhyinä. Commons on maisemille epäluotettava.

## Worktreet ja simulaattorit

- **Web:** `/Users/Shared/Claude/wt/linssiseppa-pariteetti3-raportti`, haara linssiseppa-pariteetti-siirtyma (#3232).
  Pariteettiajon työkalu ajetaan tästä origin/mainin päällä.
- **Proto:** `/Users/Shared/Claude/wt/proto-linssiseppa`, haara linssiseppa/ihmisen-matka-2.
- **Simulaattorit:** linssiseppa-iPhone D0D2CD1E-70C7-4140-A972-E615212E8911 (myös vaaka) ja linssiseppa-iPad11
  903C2B91-34C3-4C43-A392-A52F7DAFD96C (luotu 25.9.).
