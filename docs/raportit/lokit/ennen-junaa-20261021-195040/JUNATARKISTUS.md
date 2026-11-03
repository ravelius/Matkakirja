# Ennen junaa: master aa1b21b8a (21.10.2026 19.50)

| Vaihe | Tila | Tulos |
|---|---|---|
| 1 Codex-toimitukset | **OK** | 32 toimitusta läpi (1-codex.txt) |
| 2 Kameratesti | **OK** | Linssit-testit: 33/33 läpi Kartta-testit: 3/3 läpi (2-kameratesti.txt) |
| 3 Nykäysvahti | **HYLÄTTY** | tarkistus-laite-9b2cf90cd: HYLÄTTY: 19 pitkää ruutua, 1 vahdittua liikettä;  |
| 4 Läpipeluubotti | **EI AJETTU** | logiikka 14/14 läpi; simun läpipeluu puuttuu (botti-osat.txt-simuajo) |

Simuajot: /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/varjot-koko/tarkistus-laite-9b2cf90cd

ENNEN JUNAA: HYLÄTTY (vaiheet 3)

## PT: hyväksytyt poikkeamat, TF 209 (21.10.2026 klo 21.16)
Lukittava runko: B 5093a3bc8 (62c2991a9 + PK a9c5520d8), LT kierros 34: loppukortti pystyssä ≥ 20 s, kylmäkäynnistykset 0/5,
GPU 10–11 ms, lämpö 0/0, alkunykäykset 0 (_tyo/linssiseppa2/varjot-koko/kierros34/lt-tulos-34.txt).
- Vaihe 3, kartan saapumislennon pitkät ruudut: TUNNETTU POIKKEAMA, korjaus junaan 210.
- Juoksupelin käännösnykäykset 9/9 (kierros 32: 7/8; raja ≤ 8 ylittyy mittausvaihtelun verran): TUNNETTU POIKKEAMA, korjaus 210.
- Juoksupelin kamerahypyt 2/2, kääntyilyt 2/3, piilossa 6/13: TUNNETTU POIKKEAMA, korjaus 210 (PK).
- Vaihe 4 simun läpipeluu ei ajettu; korvattu LT:n laiteajoilla (kierrokset 33–34).
PT hyväksyy lukituksen näillä poikkeamilla.
