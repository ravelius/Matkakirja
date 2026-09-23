# Pelikoodarin luovutus 23.9.2026 (klo 17.43): natiivi erä 4 ja luennat

Jatkaa luovutusta `viesti-pelikoodari-luovutus-20260923-natiivi.md`. Omistajan linjaus:
koko peli natiiviin pysähtymättä. Sopimukset sessioiden välillä:
`/Users/Shared/Claude/proto-3d/RAJAPINTA.md` (Pelikoodarin, sessiot/näkymät/syöte/äänet) ja
`Assets/Matkakirja/RAJAPINTA.md` (Natiivisepän, kamera/kartta).

## Missä

| Asia | Polku |
|---|---|
| Proto-haara | `pelikoodari/kysymys-ui` @ 713d16b, worktree `/Users/Shared/Claude/wt/proto-pelikoodari` |
| Master | 160f175 sisältää kaiken 9c0d3f6:een asti; 713d16b (NakymaPeitto) merge-pyyntö Natiivisepällä |
| Verkkopelin PR | #2955 `pelikoodari-lehti-silta` (pohjana #2942 lehtikuori), worktree `/Users/Shared/Claude/wt/pelikoodari-lehti-silta` |
| Koepaketti (Siirtoseppä) | `/Users/Shared/Claude/sisalto-koe/v4/` (skeema 1.9); ämpärissä vielä v2 |

## Tehty tänään (proto)

- **Erä 4, kysymysvirta:** "Tutki kaupunkia" -nappi → IKysymysNakyma (UGUI-vara KysymysDialogi):
  vaihtoehdot, vihje, 50:50, 45 s (jäljellä oleva aika tallennukseen), tulos, fakta, löytö, Jatka.
  Samaan näkymään pulma, rosvon kaksintaistelu (Helpotus) ja tapahtumakortti (`PeliOhjain.Tehtava`).
  `Matka.ArvioiEsivalinta` purkaa liftauksen esivalinnan, kun Pysy tulee tarjolle (web beginTurn).
- **Pelilogiikka (agentit, kultaiset jäljet):** Pulmat.cs (11 generaattoria), Tapahtumat.cs,
  Kaksintaistelu.cs, Kaupat.cs + Voitto.cs. Tallennusversio 3, uudet kentät valinnaisia.
- **Syöte:** SyoteLukko (Esta/Vapauta, LisaaPeitto → UiPeittaa, LisaaNakymaPeitto → NakymaPeitetty).
- **Näkymärajapinnat Natiivi-UI:lle:** ITilarivi, IMatkaValinta, IKysymysNakyma, IKaupunkiKortti,
  PeliNakymat-tehdas (NakymaSopimukset.cs, KysymysApu.cs). Natiivi-UI tekee UITK-näkymät.
- **Luennat:** Puhe.cs (lataus + välimuisti Documents/aani, häivytys 1,5 s, yksi puhuja, kytkin),
  Luennat.cs (intro, lento-alku, saapumispuheet 45, matkakirjaluennot kokoelmasta `luennat`),
  MatkakirjaAani.mm (Playback + MixWithOthers).
- **Kuva- ja lippukysymykset** kokoelmista `kuvakysymykset`, `lippumaat` (valmiit url:t).
- **Lehti:** LehtiKuori.Avautui/Viesti (.mm), teko-silta (#tila-alkutila, {tapahtuma:'teko'} →
  PeliOhjain.LehdenTeko → KauppaTeko), PeliOhjain.LueLehti ilman matkaa.
- **Vartija** SaannotTestit: paketin `saannot` = C#-vakiot. unity-tarkistus.sh kääntää myös
  Matkakirja.Kartta-asmdefin ja UI-kansion.
- Testit: `cd Peli-testit && ./kaanna.sh` 128+/128+, `./unity-tarkistus.sh` 0.

## Avoinna

1. **Sim/iPad-ajo** puuttuu kokonaan tämän päivän eristä: Natiiviseppä ajaa silmukka-kysymys.txt
   (odotukset README-silmukka.md k1–k8) ja `luento intro` + `tila puhe`.
2. **TTS natiivissa:** Fable hyväksyi (23.9.). Verkkopelin PR #2956 (pollo-worker: x-matkakirja-natiivi +
   bundle id User-Agentissa, vain puhe) odottaa Julkaisijaa; proto 76366d6 Puhe.Lue + kohtaamisten
   repliikit (löytörepliikki ääneen). iPad ab8098e: silmukka-kysymys k1–k8 ok, luento soi.
3. **PR #2955** odottaa #2942:ta (Julkaisija). Kokoelmat kuvakysymykset/lippumaat/luennat/saannot
   tulevat ämpäriin Siirtosepän nipun mukana; siihen asti natiivi toimii ilman niitä (hiljaa).
4. Pulmapiirrokset (Luonnos/PulmaId) ja kaikki UITK-näkymät: Natiivi-UI.
5. Voittotarkistusta Matka ei kutsu (vaelluksessa aina epätosi); pilvisynkka ja tallennuksen
   versiopolku myöhemmin; linssikoukut Linssisepälle.
