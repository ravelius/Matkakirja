# C Resepti: esirenderöity video

*(Natiivi-UI 21.10.2026, Raamattu 4.21 STUDIOJAKO (omistaja 21.10.2026 klo 18.02) ja ESIRENDERÖITY VIDEO. Lyhyt kooste: mistä
osista video tehdään ja mihin ohjeeseen kukin osa viittaa. Vaiheet, portit ja luvat vain D Tuotannonohjauksessa. Yksityiskohtainen
pohja `docs/moduulit/tuotantopohjat/esirenderoity-video.md` on voimassa, kunnes sen ala-osuudet on siirretty B-tekotapoihin.)*

**Mikä:** kohtaus ilman vuorovaikutusta, jossa laatu ratkaisee: aarteen löytöhetki, raketin lento ja isoisän uni (4.21).
Järjestys: Kolme veljestä → raketti → uni; raketti vasta, kun aarrevideo toimii pelissä.

## Osat

| Osa | Ohje | Tekijä (4.21 TEKIJÄT) |
|---|---|---|
| Laatutaso ja tavoitekuva (pelin ruutu tai mallikuva) | A Suunta: taide, kamera | Valoseppä, Linssiseppä |
| Kuva pelistä (raketti, valas, uni): oma video-laatutaso, `Videotallennin` kuva kerrallaan | B Tekotavat: kamera ja video | Linssiseppä, Valoseppä |
| Kuva Blenderistä (vain aarteen löytöhetki) Tripo-mallista | B Tekotavat: 3D ja kuvat; Codex | Lavastaja, Codex |
| Ääniraita (kertoja, Pulu, musiikki) videon ajan mukaan | B Tekotavat: ääni | Äänittäjä |
| Tekstit, tekstitys, mittarit, Ohita | B Tekotavat: UI (`tekotavat/ui.md`) | Natiivi-UI |
| Vastaanotto ja pelikytkentä | tämä resepti, luvut alla | Natiivi-UI |

## Muoto (molemmat kulut)

- **Pysty (päätapa) ja vaaka** samasta kamera-ajosta; peli rajaa ruudun täyteen, joten tärkeä sisältö keskialueelle.
- **HEVC 10-bit** (Main 10, `hvc1`), kevyt rakeisuus, noin 5–10 Mt / versio, **enintään 30 MiB**.
- **Ei tekstiä videoon:** tekstitys, mittarit ja havainnekuva-merkintä tulevat käyttöliittymästä videon ajan mukaan; puhe ja musiikki
  ääniraidalla.
- **Nimet:** `<nimi>-pysty.mp4`, `<nimi>-vaaka.mp4`; kansio `<aihe>-v<N>/` manifesteineen (`SHA256SUMS`), `LAHTEET.md`, `ruudut/`.

## Vastaanotto (Natiivi-UI)

1. `ffprobe`: `hevc`, `hvc1`, `Main 10`, `yuv420p10le`, pysty leveys < korkeus, vaaka päinvastoin; koko alle 31 457 280 tavua;
   `shasum -a 256 -c SHA256SUMS`.
2. Ruudut alusta, keskeltä ja lopusta täysikokoisina rinnakkain tavoitekuvan kanssa (kuvateksti kuvan ulkopuolella).
3. Ääniraita liitetään videoon vastaanotossa.

## Pelikytkentä (Natiivi-UI)

- **Valmiina ennen hetkeä:** video ladataan kokonaan laitteelle ja puskuroidaan ennen kohtauksen alkua (raketissa latauskuvan aikana);
  toisto alkaa heti eikä pätki. Muisti vai levy valitaan koon mukaan.
- **UI videon päällä yhteisillä osilla:** tekstitys yhteiselle tekstityskaistaleelle (Tekstitys-kytkin), Ohita yhteisellä
  Ohita-osalla, ☰ ja kertojan napit kuten linsseissä (2.70); ei omia nappeja eikä tekstiä videon sisään.
- **Ajat videon aikaan:** kuvakäsikirjoituksen aikaleimat ohjaavat UI-tekstien ja mittarien näyttöä.
- **Loppu:** häivytys elävään näkymään (raketti → Cupola) tai takaisin kartalle; jokainen videon avaama ikkuna sulkeutuu mukana.
- **Tarkistus:** iPhone pysty ja vaaka sekä iPad; video ei pätki alussa, tekstitys ei peitä painikkeita, Ohita toimii heti.

## Tyypilliset virheet

- Teksti tai logo poltettu videoon (ei käänny, ei tottele Tekstitys-kytkintä).
- Video ladataan vasta kohtauksen alkaessa → musta ruutu tai nykäys alussa.
- Vain pystyversio iPadille tai vaaka puhelimelle ilman rajausta keskialueelle.
- Oma Ohita- tai sulje-nappi yhteisen osan sijaan.
