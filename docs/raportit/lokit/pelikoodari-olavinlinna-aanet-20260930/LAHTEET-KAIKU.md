# Olavinlinnan repliikkien kaiku: lähteet ja käsittely (Pelikoodari 30.9.2026)

## Demo (keittiö, kuiva ja kaiku)
`demo/keittio-demo-kuiva.mp3` ja `demo/keittio-demo-kaiku.mp3`, 28 s, järjestys: kokki 1, vesipoika 1, kokki 2,
vouti "oven takaa" (paikkamerkkinä voudin näyte, eri repliikki), Pulu. Repliikit: 29.9. otot (lokit/linna-keittio-aanet)
ja voudin näyte 30.9. (eleven_v4). Käsittely: kevyt kompressio (2:1), normalisointi −19 LUFS / −1 dBTP.
- keittiö: lyhyt tiheä kaiku (vaste 0,9 s, lisävaimennettu), jälkikaiku noin 13 dB kuivan alapuolella, esiviive 12 ms.
- oven takaa: alipäästö 1,6 kHz, pitkä kaiku (1,9 s) suunnilleen kuivan tasolla (vaimea ja kaikuva), esiviive 25 ms, −25 LUFS.
- Vasteista on poistettu suora ääni (3 ms) ja ne on energianormitettu: märkä on pelkkiä heijastuksia ja jälkikaikua
  (ilman tätä märkä oli viivästetty kopio puheesta = kampasuodinväri eikä kaiku).
- Pulu: kuiva (pelaajan vierellä).
Skripti: `demo/tee-keittiodemo.sh` (ffmpeg afir, poltetaan tiedostoihin: web ja natiivi kuulostavat samalta).

## Impulssivasteet
- OpenAIR (openairlib.net): sivusto suljettu 30.9.2026 (403 "suspended") → ei käytettävissä.
- VALSOUNDS (Vincennesin ja Germollesin linnat, Zenodo, CC BY 4.0): tiedostot rajattuja (restricted) → ei ladattavissa.
- **Demossa käytetty:** MusicSphere, St. Jakobus -kirkko, Ilmenau, Part 1: Omnidirectional Room Impulse Responses,
  Stolz, Treybig, Werner (TU Ilmenau), https://doi.org/10.5281/zenodo.19496982. Lähde 6, mikrofoni 0 (T30 ≈ 1,4 s).
  Keittiön vaste lyhennetty (0,9 s) ja lisävaimennettu; kappelin vaste 1,9 s.
  **LISENSSIRISTIRIITA:** Zenodon tietue: CC BY 4.0, mutta SOFA-tiedoston oma metatieto: "Creative Commons
  Attribution-NonCommercial-ShareAlike 4.0". Tuotantoon ei käytetä ennen selvitystä (kysytään tekijöiltä
  georg.stolz@tu-ilmenau.de) tai vaihdetaan vasteeseen, jonka lisenssi on yksiselitteinen CC BY / CC0.
- Tuotannon ehdokkaita (CC BY 4.0, avoimet): ChurchIR (Zenodo 14901751, monikanavaiset kirkkovasteet), OK5 Aalto
  (Zenodo 18622201, 25 tilaa, mm. porraskäytävät), MusicSphere Sint-Martinus Heers (Zenodo 22686848).


---

## TUOTANTO (30.9.2026 ilta, Päätoimittaja: yksiselitteisesti CC BY -vasteet; Ilmenaun vastetta EI käytetä tuotannossa)

Lisenssi tarkistettu sekä tietueesta että tiedostoista:

| Vaste (kaiku/tuotanto/) | Tila | Lähde | Tietue | Tiedoston oma metatieto | T20 |
|---|---|---|---|---|---|
| ir-keittio.wav | keittiö (lyhyt, tiheä) | Aalto OK5, kitchen_akulab, mittaus 0, kanava 0 | CC BY 4.0 (Zenodo 18622201) | SOFA License: "Creative Commons Attribution 4.0 International" | 0,5 s |
| ir-kappeli.wav | kappeli, "oven takaa" (pitkä) | ChurchIR, SS. Marcellino e Pietro, Cremona, OMNI/SC_MC_OMNI_1 | CC BY 4.0 (Zenodo 14901751) | WAV: ei lisenssimerkintää (tietue voimassa) | 3,9 s |
| ir-keskushalli.wav | keskushalli/väentupa | Aalto OK5, hallway_second_floor, mittaus 0 | CC BY 4.0 | SOFA: CC BY 4.0 International | 1,35 s |
| ir-portaat.wav | kierreportaat, torni (kaikuva) | Aalto OK5, stairway_second_floor, mittaus 1 | CC BY 4.0 | SOFA: CC BY 4.0 International | 2,4 s |
| ir-holvi.wav | fatabuurin holvi (pieni, kova) | Aalto OK5, toilet_second_floor | CC BY 4.0 | SOFA: CC BY 4.0 International | 1,1 s |

- Muurinharja: keskushallin vaste hyvin heikkona (lähes kuiva). Laituri/vene: kuiva. Pulu: aina kuiva.
- Käsittely: suora ääni pois (3 ms), kohinahäntä pehmeästi pois, energianormitus; kaiku poltetaan tiedostoihin (ffmpeg afir,
  esiviive 12–25 ms). Keittiön märkä noin 14 dB kuivan alla; "oven takaa" alipäästö 1,6 kHz ja märkä noin kuivan tasolla.
- Tekijätiedot (CC BY): "Kaiut: Aalto Acoustics Lab, OK5 (de las Heras, Meyer-Kahlen, Lokki, Arend), CC BY 4.0,
  doi 10.5281/zenodo.18622201; ChurchIR (Giampiccolo, Parrinelli, Antonacci, Politecnico di Milano), CC BY 4.0,
  doi 10.5281/zenodo.14901751." Rivi lisätään js/lahteet.js:ään, kun kuunnelmat viedään peliin.
- Demo uusilla vasteilla: demo/keittio-demo-kaiku-v2.mp3 (v1 Ilmenau siirretty demo/v1-ilmenau/, ei tuotantoon).
