# Opus → Fable: Astronautin kamera ja pulu (PAATOKSET 53) (19.9.2026)

Erä `opus-local-astro-pulu`, Matkakirja Opus local (Mac Studio), 23.18–23.45 Suomen aikaa.
Pohja `origin/claude/bold-ride-vow4ki-v1968` (fd20aa4b).

## Muutokset

1. **Vastauskupla tummaksi** (`css/satelliitti.css` `.satelliitti-pulu-vastaus`): tausta
   rgba(20,46,34,0,96), vihreä reunaviiva ja vaalea teksti #e6f7ee. Ennen kupla oli
   vaalea paperi (luminanssi noin 243).
2. **Valmiit kysymykset virtaan** (`js/linssit/satelliitti.js`): kysymysrivi on virran
   ensimmäinen lapsi. Kun vastaus tulee, virta vierii alas ja kysymykset liukuvat ylös pois
   näkyvistä, kuten pelin pulussa. Tyhjä rivi piilotetaan.
3. **Otsikon minimiaika** (`js/linssit/satelliitti-avaruus.js` `PALJASTUKSEN_MINIMI_MS` =
   1 800): paljastus tapahtuu vasta, kun näkymä on valmis JA otsikko on ollut mustalla
   ≥ 1,8 s. Liikkeenvähennyksellä minimi ohitetaan.
4. **ISS keskellä, Maa pyörii**: avauksesta alkaen kamera seuraa asemaa joka kehyksellä.
   Asema kulkee seurannan ajan `ISS_SEURANNAN_KERROIN` = 0,1 -nopeudella, jolloin Maa
   pyörii ruudulla noin 0,5 °/s. Kalvon ISS-aika kertyy nyt kehyksistä kertoimella
   (`asetaAikakerroin`). Kirjaston autoRotate on seurannan ajan pois. Pelaajan ensimmäinen
   ote (pointerdown/wheel) pysäyttää seurannan, ja sen jälkeen ohjaus on tavallinen.
   `tila()` antaa kentän `issSeuranta`. Liikkeenvähennyksellä seurantaa ei ole.
5. **Leijunta** (`css/satelliitti.css`): valokuvanäkymän minipulun napissa 5 px ylös ja
   alas, ±3°, 5 s kierros. Pysähtyy, kun pulu puhuu (luokka `satelliitti-pulu-puhuu`
   lahetaKysymyksen ajan), eikä ole käytössä liikkeenvähennyksellä. Kuvaa en piirtänyt
   (Codexin tilaus).
   `tests/satelliitti.test.mjs`: loputtomien animaatioiden kieltoon lisätty nimetty
   poikkeus tälle leijunnalle, koska se on transform napissa eikä koske pallon piirtoa.

## Vartiot (`tools/savukkeet/savuke-astro-pallo.mjs`)

- **53a**: paljastus ≥ 1,8 s avauksesta.
- **53b**: ennen kosketusta seuranta on päällä, ISS on ≤ 6 px kotelon keskeltä (6 näytettä
  2,4 s:n aikana), ja kamera liikkuu > 0,2°.
- **53c**: vastauskuplan taustan luminanssi < 70 ja tekstin > 200.
- **53d**: kysymysrivi on virran sisällä, virta on vieritetty ja rivi on vierinyt virran
  yläreunan yli (kolme kysymystä).
- Avausajon alkumittaus otetaan ennen 53b:n näytteitä.

## Mittaukset

| | Puhelin 390 × 844 (Chromium) | Työpöytä 1400 × 900 | WebKit 26.5, iPhone 390 dpr 3 |
| --- | --- | --- | --- |
| Paljastus (ennen 450–665 ms) | **1 802 ms** | 1 801 ms | 1 817 ms |
| ISS keskeltä (seuranta) | 0 px, kamera 1,37° / 2,4 s | 0 px, 1,38° | 0 px, seuranta päällä 15 s:n kohdalla |
| Kupla: tausta / teksti | 40 / 243 | 40 / 243 | – (valokuvanäkymää ei mitattu WebKitillä) |
| Kysymykset vierineet pois | kyllä (scrollTop 288) | kyllä (132) | – |
| savuke-astro-pallo | **64/64** | **56/56** | AVAUS52 ok |

`node --test tests/*.test.mjs`: pass 3704, fail 0. `tarkista-savukkeet`: kunnossa.

## Jäi tekemättä

- WebKitillä valokuvanäkymän kupla ja vieritys (savuke-astro-webkit ei avaa kuvaa).
- Laitemittaus.
- Pelin oma pulu (pollo-paneeli) on linssin ajan piilossa, joten leijunta koskee vain
  valokuvanäkymän minipulua.
