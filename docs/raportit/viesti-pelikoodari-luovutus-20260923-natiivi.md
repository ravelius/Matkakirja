# Pelikoodarin luovutus 23.9.2026 (klo 16.20): natiivi pelilogiikka

Omistajan linjaus 23.9.2026: natiiviin (Unity 6.3 + Cesium, iOS) mahdollisimman
pian, web ylläpitoon (vain bugikorjaukset). Pelikoodari tekee pelilogiikan portin;
3D-selvittäjä pitää kameran, karttalaatat, Cesiumin, merkit ja käännökset sekä
proto-gitin masterin. Edellinen luovutus: `viesti-pelikoodari-luovutus-20260923.md`.

## Missä mikäkin on

| Asia | Polku |
|---|---|
| Unity-proto (3D-selvittäjän, paikallinen git, ei remotea) | `/Users/Shared/Claude/proto-3d/Matkakirja-proto` (master) |
| **Pelikoodarin haara ja worktree** | `pelikoodari/pelilogiikka` → `/Users/Shared/Claude/wt/proto-pelikoodari` (ei omaa Library-kansiota) |
| Pelilogiikka (asmdef `Matkakirja.Peli`, `noEngineReferences`) | `Assets/Matkakirja/Peli/*.cs` |
| Unity-kerros (Pelikoodarin) | `Assets/Matkakirja/Scripts/Peli/` (PeliOhjain, PeliApu, MatkaDialogi, Tilarivi, PeliKomennot, LehtiKuori) |
| iOS-liitännäinen | `Assets/Plugins/iOS/MatkakirjaLehti.mm` + `Assets/Matkakirja/Editor/LehtiKuoriXcode.cs` (WebKit-linkitys) |
| Testit ja työkalut (Unityn ulkopuolella) | `Peli-testit/` — README.md, README-lehti.md, README-silmukka.md, silmukka-30s.txt |
| Vanha työkansio (erä 1, korvattu haaralla) | `/Users/Shared/Claude/natiivi-peli` — ei enää käytössä, voi poistaa |

Kansiorajat (3D-selvittäjän TYOTAPA.md, `proto-3d/TYOTAPA.md`): Pelikoodarin ovat
`Peli/`, `Scripts/Peli/`, `Plugins/iOS/`. `Pallo.unity` on generoitu (Rakennus.LuoPallo),
ProjectSettings/ ja Packages/ vain sopimalla. Haarat `<rooli>/<aihe>` masterista;
3D-selvittäjä mergeää, kun `./aja.sh luo|sim|xcode-sim` menee läpi.

## Commitit (haara pelikoodari/pelilogiikka)

- 28a1c3c erä 1: Sopimukset, MiniJson, SisaltoTuonti, Satunnainen (mulberry32), Reittiverkko, Pelitila, Matka, lehtikuori → **mergetty masteriin** (cff5fca)
- 8b42a40 aarrelaatat (Laatat.cs) · 1cebee4 erä 2: Kysely, Kokemus, Kysymysdata · 3682d7c laattakokoelman luku
- d97b359 laatat kytketty Matkaan, tallennus v3, pelijälki · 625e742 erä 3: Unity-silmukka
- **6ab5520** master (VP4 9c93dcb) yhdistetty → **merge-valmis**, ilmoitettu 3D-selvittäjälle; sim-ajon tulosta odotetaan

## Rajapinta (Assets/Matkakirja/Peli/Sopimukset.cs)

`IReittiverkko` (Siirrot = web findMoves, Saavutettavat(kaupunki|Sijainti)), `IKamera`
(`Aja(lat, lon, korkeus, kestoS, valmis)`, `KaupunkiNapautettu`; toteuttaja 3D:n
PalloKierto), `ILehti` (`Avaa`, `Suljettu`; LehtiKuori). `Sijainti.Avain` = web posKey.
`Siirto.Polku` ei sisällä lähtöä. Matkan julkinen API taaksepäin yhteensopiva:
`Matka.Luo/UusiPeli(…, Laattamaarat)`, `Matka.Lataa(verkko, json, maarat)`, `new Kysely(matka, data)`
(kytkee laattakoukut). README.md:ssä API lyhyesti.

## Testit ja kultaiset jäljet

- `cd Peli-testit && ./kaanna.sh [suodin]` — Unityn dotnet 6 + csc (C# 9) ilman editoria: **85/85**.
- `./unity-tarkistus.sh` — kääntää Peli + kaikki Scripts oikeita Unity-DLL:iä vasten
  (lukee `proto-3d/Matkakirja-proto/Library/ScriptAssemblies`): **0 virhettä** (iOS + editori).
- Kultaiset jäljet tuotetaan VERKKOPELISTÄ (vaativat checkoutin `/Users/Shared/Claude/Matkakirja-pelikoodari`):
  `node Kultaiset/tee-kultaiset.mjs` (siirrot 8052 tapausta + mulberry32),
  `tee-matkajalki.mjs` (733 askelta), `tee-kysymysjalki.mjs` (1496 tekoa),
  `tee-laattajalki.mjs` (252 kääntöä, RNG 279 luonnissa), `tee-pelijalki.mjs` (2660 tekoa, laatat päällä).
  C# toistaa kaikki identtisesti, myös tallennus/lataus kesken. Verkkopelin muutos, joka koskee
  sääntöjä, näkyy uudelleenajossa erona — aja generaattorit ennen kuin epäilet C#:ia.
- Sisältöpaketti: `https://media.matkakirja.app/sisalto/1/uusin.json` → `sisalto/1/v1/`. Näytteet
  `Peli-testit/Kultaiset/paketti/`. `kokoelmat/laatat.json` (Siirtoseppä #2944) tulee ämpäriin vasta
  pinon #2938…#2944 mergen jälkeen; siihen asti luku moduulista `moduulit/js/packs/maailmankartta.json`.

## Portista pois (koukut paikallaan)

Pulmat (generaattorit paketissa funktioina, Siirtosepän PR #2939 tuo ne tunnisteiksi), tapahtumakortit
(maailmankartalla 0), kaksintaistelu (`Matka.Kaksintaistelu`), linssit kylkiäisenä ja kynnykset,
voittotarkistus, mannerlennot, muut laudat, botit. Jerusalemilla ei maata (tarkoituksellista).

## Erä 4 (seuraava)

1. **Kysymys-UI** (Scripts/Peli/KysymysDialogi.cs, UGUI+TMP kuten MatkaDialogi): 'stay'/Tutki →
   Kysely avaa kysymyksen → vaihtoehdot, vihje, 50:50, aikaraja → vastaus → laatta kääntyy
   (`Matka.Loysi`) → löytöilmoitus. Vasta tämän jälkeen aarteet näkyvät pelissä.
2. **Pallon kosketusesto dialogien ajaksi** — pyydä 3D-selvittäjältä kytkin (esim. `PalloKierto.Pysayta(bool)`);
   nyt veto dialogin päällä pyörittää palloa.
3. Sim-ajon palaute 3D-selvittäjältä (README-silmukka.md, silmukka-30s.txt; odotus siemen 12345:
   bussi Lontooseen 250 £, lehti, liftaus 4 takaisin Pariisiin, lehti).
4. Tallennuksen versiopolku ja pilvisynkka myöhemmin; aarrelaattojen merkit 3D-puolelle (`Laattamaailma.Laatat`).

Ali-agentit sallittu (omistaja 23.9.): Opus koodiin, Sonnet lukevaan, ei koskaan Fable-mallia.
Toimiva kaava: rinnakkaiset agentit omiin tiedostoihin, julkinen API vain lisäyksin, kultainen jälki
verkkopelistä jokaiselle osalle, integrointi ja testit itse.

## Riskit

- Silmukkaa ja lehtikuorta ei ole ajettu Unityssä eikä laitteella (vain käännöstarkistus).
- 3D:n komento `kaupunki id` avaa matkavalinnan, kun peli on päällä → 3D-mittauksiin
  `Documents/peli-pois.txt` tai komento `peli pois`.
- Lehti: äänettömyyskytkin voi mykistää luennan (AVAudioSession); pallo piirtää lehden alla
  (harkitse tauotusta); Web Inspector päällä ilman DEBUG-lippua → `MATKAKIRJA_EI_TARKASTINTA` ennen App Storea.
- 1,7 Mt:n moduulin jäsennys pääsäikeessä ensimmäisellä käynnistyksellä (~0,2 s Macilla).
- Levy ~30 Gt vapaana: ei toista Unity-kopiota.

## Verkkopelin avoimet PR:t (Julkaisijalla)

#2919 heiton tökkäys · #2920 liu'un loppu (pohjana #2919) · #2921 symbolien GPU-häivytys ·
#2924 kokeet ratasvalikkoon · #2936 savukkeet GL-rungolle (pohjana #2931, mergetty) ·
#2942 lehtikuori `?lehti=` (natiivin lehti riippuu tästä) · #2898 äänten lisenssiportti (mainin tasalla a72c3ecae).
Erä-worktreet `/Users/Shared/Claude/wt/pelikoodari-*` poistetaan mergen jälkeen
(`tools/uusi-worktree.sh --poista`).
