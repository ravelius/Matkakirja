# Lavastaja: luovutus 25.10.2026 klo 08.35 (Postivahdin kova raja 44 %)

Edellinen: `docs/raportit/viesti-lavastaja-luovutus-20261025.md` (f80afe02e). Haara `linnanrakentaja-tyo-20260929`.
Proto: `wt/proto-lavastaja-muoto`, haara `lavastaja/muoto-210` (ei etärepoa, JU ottaa paikallisesti).

## Tämän session erät (kaikki PT:n kuittaamia ja JU:n ämpärissä, ellei toisin mainita)

| Paketti (`_valmiit/…-20261025`) | Tunniste | Sisältö | Osoitin |
|---|---|---|---|
| kielletty-lahipuut-v3 | 5c373cca1240 | +630 pihapuuta sivupihoille ja puutarhoihin (latvuspeitto) | PK |
| kielletty-lahipuut-v4 | 3156972dacef | ei runkoja juostavalla alueella (esto-v12 + pk2) | PK |
| kielletty-lahipuut-v5 | 44133d38db15 | ei puita juoksijan saavutettavilla pihoilla eikä avoimien huoneiden ovien edessä | PK |
| avoimet-v43 | cbe49448c05f | juhlasali: 5 pylvästä/rivi, kalusteet seinillä, mitat ennallaan | muoto-210 ff27a58c0 |
| kk-ulkorengas-v4 | 2446d044d397 | leijuvat seinävyöt pois, tukemattomille katoille seinä maahan | muoto-210 5a9b1f026 |
| kk-ulkorengas-v5 | 2fa0356c6011 | lisätyille seinille kerroskaistat (harmaa + V4_teal) | muoto-210 0c886ba9d (NS:lle) |

Myöhemmin PK teki lahipuut-v6:n (palatsipuiden lehvästö) ja tausta-v47:n (rungossa d2f94a515).

## VIRHE, korjattava (PT tietää, 08.35)

Kokosin oman nurmikorjaukseni nimellä tausta-v47 kansioon `_valmiit/juoksupeli-kk-tausta-peking-v47-vienti-20261025`, jonka PK oli
jo luonut 07.44 → PK:n paketin tiedostot ylikirjoittuivat (nyt minun 43e1228cef22; PK:n oli 455b763e82cc). Ämpäri ja runko ennallaan;
PK:n lähde `_tyo/pelikoodari/nurmi-v47/`. Palautus PK/JU. Osoitinkomentoni muoto-210 daeb1df4b (TaustaKansio v47) on tarpeeton: ei junaan.
OPPI (PT 25.10.): ennen kirjoitusta _valmiit-kansioon katso `ls`:llä, ettei kansiota ole jo olemassa (myös toisen roolin), ja käytä
aina uutta versionumeroa (tarkista myös muiden roolien _tyo-kansiot ja ämpäri). JU palauttaa PK:n kansion ämpäristä.

## Diagnoosit (hyödyllisiä)

- Nurmikolmiot (PT 06.2x): Codexin maaruudukon (25 × 25 m) nurmipuolikkaat (V4_ruoho), jotka taustan leikkaukset (kasvon keskipiste)
  jättivät irrallisiksi kolmioiksi kiveyksen päälle. Poisto tekee reikiä → muunna V4_lattiaksi samoilla kärjillä/UV:illa
  (leivottu valo on laatan yhteinen kuva, TEXCOORD_1). Työkalu `korjaa_nurmi.py`.
- Esto-v12:ssa taustan 933b-puukortit näkyvät "seininä" → puun ruutu näyttää estetyltä; puiden juostavuuden tarkistus avaa ne (`puut_saavutettava.py`).
- Ulkorengas: Codexin korkeista kaupunkitaloista LOD2:ssa vain seinävyöt ja katto (`poista_leijuvat.py`, `leijuvat.py`).
- Blender-kuvani ovat peilikuvia pelistä (glTF Z pohjoinen → itä vasemmalla); peilaa ennen vertailua. Muotovertailut nyt NUI:n
  havainne-editorilla (natiivi-ui/havainne-editori-210 3c4271037, `REF=<haara> zsh tyokalut/havainne/editori.sh kaikki`).

## Työkalut (`proto-3d/_tyo/linnanrakentaja/kielletty-rakennukset/tyokalut/`)

puut_maski.py, puut_pihat.py, puut_juostava.py, puut_saavutettava.py, puut_yleiskuva.py, avoimet_sali_pylvasrivi.py,
leijuvat.py, poista_leijuvat.py, korjaa_nurmi.py. Codex-tilaus palatsipuista hyväksytty (posti 3d41d30be).

## Seuraava (PT 25.10.)

- PK tekee nyt taustan LOD0-atlaksen uudelleenleivonnan ilman Taihemenin varjoa (tausta-v48) ja poistaa salista 04 matot ja sermit.
  Uusi LR EI tee niitä ennen kuin PT erikseen siirtää.
- Odottaa: Codexin palatsipuut #962–964 → istutusten tihennys havainteen 07 mukaan (juoksijan pihat ja akseli vapaina), kun PT siirtää.
- JU:n levysiivous tehty: poistettu proto-lavastaja-{kattoalapinta, monalisa, sokkeli-k1b} ja lavastaja-esikatselu-jumi (kärjet jo junissa);
  jäi proto-lavastaja-muoto (juna 210 käytössä) ja lavastaja-tarkista-ennen (5f9439670 ei origin/mainissa, PR tarkistettava).
