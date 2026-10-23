# C1e (945577013, JU d1abf4c89) simussa 19.10. 11.26–11.32, uusi bundle-id joka ajoon

| Ajo | Napautus → 1. lokirivi | → startUnity (swizzle osui) | Logo ruudulla | Peli |
|---|---|---|---|---|
| iPhone vaalea | ~5,5 s | ~6,7 s | 5,5 s | 18,75 s |
| iPhone tumma | ~12,5 s | ~15,6 s | 15,25 s | 22,75 s |
| iPad vaalea | ~6,5 s | ~9 s | 8,5 s | 19,75 s |

- NSLog "startUnity 100 ms päähän" näkyy kaikissa → peite tulee ruudulle ikkunan auetessa, ja logo näkyy heti sen mukana.
- Musta ennen logoa on ohjelman latausta ennen ensimmäistäkään lokiriviä (dyld + Unityn alustus), simussa 5–12 s (T7-levy,
  tuore asennus). Koska aikaa on kulunut yli LogoViive (1,0 s) jo ikkunan auetessa, häivytys alkaa heti (0,8 s).
- Laitteella lataus on oletettavasti alle 1 s → musta ~1 s → logo häivyttyy → peli. Simussa tätä ei voi todentaa; todiste vaatii laitteen.
- Huom: Unity raportoi "Build type 'Development'" (Xcode-konfiguraatio Release). Ei vaikuta tulokseen.
- Ruudut: ../logo-feidaus-c1-*-1126/1128/1130*/ruudut, video c1e-logo-3ajoa.mp4 (selitysraita ylhäällä).
