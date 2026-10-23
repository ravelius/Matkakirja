# C Resepti: minipeli (lautapeli)

*(Pelikoodari 23.10.2026, studiojako (Raamattu 4.21). Lyhyt tuotetyypin kooste. Suunta: `docs/tuotanto/suunta/`; tekotavat:
`docs/tuotanto/tekotavat/koodi.md`, `ui.md`, `aani.md`, `testaus.md`; vaiheet, portit ja luvat: `docs/tuotanto/tuotannonohjaus.md`.
Pelien kehittämissivu: `docs/pelikatalogi.md`. Mallit valmiista: Mylly, Tavli ja Shakki.)*

## Tuote

Lautapeli bottia tai kaveria vastaan (Raamattu 2.184, 2.185 LAUTAPELIT; katalogin kortti- ja pihapelit samaan osioon): peli,
jossa oppii, ei pelkkä visa. Avataan Pelit-välilehdeltä tai matkalla kohtaamisena; tulos kirjautuu matkakirjaan ja botin
voitosta tulee palkkio. Ei sisällä videopelejä (resepti historiapeli).

## Rajaus

- Uusi peli kootaan lautapelimoottorista ja yhteisistä osista (2.201 YHTEISET OSAT ENSIN); oma nappi, kortti tai valikko vain,
  jos yhteistä ei ole, ja silloin yhteiseksi kaikille.
- Vuoropeli ei tarvitse taukoa; ☰:ssä Säännöt, Kertoja, Tekstitys, Musiikki ja alimpana Poistu; Luovuta jää peliin.
- Kumoa-nappia ei tehdä (pohjassa ei ole): vain testikomento.

## Tavoite (kirjataan ennen työtä)

| Ala | Tavoite |
|---|---|
| Oppiminen | yksi lause: mitä pelaaja oppii (Tavli: osuma- ja sisääntulotodennäköisyydet paneelin ohjeessa) |
| Lauta | havainnekuva tai Lavastajan esikatselu laudasta ja nappuloista |
| UI | kuvakaappaus Myllyn pohjasta, johon pelin erot on piirretty |
| Botti | tasot Helppo, Normaali, Vaikea: kuvaus siitä, miten kukin pelaa |

## Tuotokset ja polut

| Tuotos | Tekijä | Polku |
|---|---|---|
| Säännöt ja tila | Pelikoodari | proto `Assets/Matkakirja/Peli/Pelit/<Peli>.cs` + `Pelikehys.cs` (puhdas, ei UnityEngineä) |
| Botti | Pelikoodari | `Peli/Pelit/<Peli>Botti.cs`; haku kopiosta taustasäikeessä (`Task.Run`) |
| Testit | Pelikoodari | `Peli-testit/Testit/<Peli>Testit.cs` (säännöt, lailliset siirrot, botin tasot, loppuasemat) |
| Näkymä | Pelikoodari / Natiivi-UI | `UI/Pelit/<Peli>Nakyma.cs` LAUTAPELI-pohjalla (`lautapeli.uss`), `PelinAsettelu`, `PelinValikko`, `PelinValintakortti`, `PelinTuloskortti` |
| Lauta ja nappulat | Lavastaja | Blender-kerroksina ämpärissä (malli `MyllyLauta.Lataa`), vektori varalla |
| Äänet | Äänittäjä | tehosteväylä (click, correct, coin, wrong) ja pelin omat naksahdukset `Resources/Pelit/<Peli>` (CC0) |
| Säännöt ja opas | Sisältökirjuri → Pelikoodari | `Lautapeliopas` (☰ › Säännöt), tekstit `ui.fi.json` |
| Palkkio | Pelikoodari | `PelinTalous.Minipeli` (40 / 60 / 80 £ tason mukaan) |

## Reseptikohtaiset säännöt

- **Valinta KORTTI-pohjalla:** vastustaja KYTKIN-ryhmänä Helppo / Normaali / Vaikea + Kaveri samalla laitteella; Peruuta / Aloita peli.
- **Tulos KORTTI-pohjalla:** voitto, häviö, tasapeli; "Tulos kirjattiin matkakirjaan."; kultainen jatko avauspaikan mukaan
  (matkalta Jatka matkaa, Pelit-välilehdeltä Pelaa uudelleen).
- **Asettelu:** kapealla paneeli laudan alla, keskileveällä ja leveällä oikealla 350 pt; matalalla vaakaruudulla lauta koko
  korkeuteen ja palsta oikealle (B UI luku 5).
- **Satunnaisuus ensin, animaatio sitten:** nopan tulos `Satunnainen`-lähteestä ennen vieritystä, jotta testi ja botti toistavat.
- **Testikomento** jokaiselle tilalle: `ui <peli> [valinta | peli helppo|normaali|vaikea|kaveri | asema … | tila | sulje]`.
- **Lautapeliopas** testataan (`LautapeliopasTestit`): sääntöteksti vastaa koodin sääntöjä.

## Valmis kun

- [ ] Säännöt ja botti testeineen `Peli/Pelit/`-kansiossa; `kaanna.sh` 0 fail.
- [ ] Näkymä vain yhteisistä osista ja LAUTAPELI-pohjasta; `tarkista.sh` 0 virhettä (pohja-, liike- ja kielivahti).
- [ ] Valinta, peli ja tulos mitattu iPhone pysty, iPhone vaaka ja iPad (B UI P3–P10).
- [ ] Botin tasot erottuvat (botti botti vastaan -ajo testissä: Vaikea voittaa Helpon selvästi); palkkio ja matkakirjamerkintä toimivat.
- [ ] Testikomento jokaiselle tilalle; opit kirjattu tähän tai tekotapaan.

Vaiheet, hyväksyjät ja luvat: tuotannonohjaus.
