# Pelikoodari: luovutus 30.10.2026 klo 21.52 (konteksti 27 %, PT:n pyyntö)

Edellinen luovutus: -20261030-2112. Muistin tilatiedosto: pelikoodari-tila-20261018-aamu.md.
- Työkansio P = /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/piirrokset-20261030.
- Proto-worktree: /Users/Shared/Claude/wt/proto-pelikoodari-v98c, nyt haaralla pelikoodari/osasarja-v5-216. Proto-haaroja ei pushata.

## VALMIS: osasarja-v5 junaan 216 (PT kuittasi klo 21.5x, NS:lle)
| proto-haara | sisältö |
|---|---|
| pelikoodari/osasarja-v5-216 **a2d9e0c7b** | **Junaan 216** (NS mergeää). Pohja 9ae1b6277 (v4 + tekstuurikorjaus) + OsasarjaKansio kielletty-osasarja-v5 + EstoTiedosto palatsi-esto-v23. |

- **v5 korjaa v4:n regression:** kujien 02 ja 05 vasemman muurin kivijalan porras ja vaalea nauha ovat poissa.
  - LAV:n paketti: /Users/Shared/Claude/proto-3d/_valmiit/juoksupeli-kk-lavastaja-osasarja-v5-vienti-20261030, SHA256SUMS 29551b4a10f3 (tarkistettu).
  - Muutokset: muuri3-lansi-pohj-06/-07/-07-b/c/d kivijalka 1,80 m (profiilit kivijalka, kivijalka-kansi, kivijalka-taka-t80 ja kivijalka-kansi-taka-t80) sekä päädyt paaty-alku/-loppu-t80-18.
- **palatsi-esto-v23:** tausta-v81 + rakennukset-v85 + osasarja-v5, 152 983 ruutua (v22: 152 965).
  - Tiedosto on kansiossa proto-3d/_tyo/pelikoodari/esto-216-20261030/palatsi-esto-v23, ja se on linkitetty P/juuri-216:een.
  - **JU/NS: vie esto-v23 ämpäriin junan mukana.** Se on PK:n leivonta eikä kuulu LAV:n pakettiin.
- Peli-testit: `MK_OSASARJA=P/juuri-216/kielletty-osasarja-v5 ./kaanna.sh JuoksuOsasarja` 10/10 (1109 polkua, 3194 osaa, 18 mallia, kauko 117 400 kolmiota).
- Pari peli vs havainne (havainne-editori; v3 = 00e19dfb0 samoilla kameroilla): P/v5-parit/ ja P/v5-tila.md.
  - Ero havainteeseen on sama kuin v3:ssa:
    - kujan 02 vasemmalla matala kivijalkamuuri ja punaiset pilarit, havainteessa yhtenäinen korkea punamuuri;
    - kujilla puita, joita havainteessa ei ole;
    - havainteen muurit ja kivijalka ovat korkeammat.
  - Nämä ovat LAV:n tai PT:n asioita, eivät regressio.

## Muut tämän session päätökset
- **Reittivalinta:** ei tehdä mitään.
  - Siemen ei muuta aluetta eikä avoimia reittejä: kulkuverkko, tason SuljeSivut, alku ja maali ovat kiinteät. Siemen vaikuttaa vain kujien sisältöön.
  - PT (omistaja 19.12): esteiden vaihtelu kellosiemenellä pysyy. Kiinnityskokeilu on peruttu, eikä siitä tehty committia.
  - Pelaaja voi jo valita reittinsä risteyksissä, joten aukeavia portteja ei tehdä.
- **Codexin mittapiirrokset** (Taihemen v3, Taihedian v3, sivuhallit v2) eivät ole enää jonossa: omistaja hyväksyi ne 12.28/12.36, ja 3D-mallit ovat junassa 216 (17.26).

## Jono seuraavaksi
- **Osasarjan leivonta** (LAV:n SOPIMUS.md proto-3d/_tyo/linnanrakentaja/leivonta-216, VS:n shader d420087dc haaralla linssiseppa2/leivonta-217):
  - Juna 217. Aloitus PT:n luvalla nyt, kun v5 on hyväksytty.
  - PK:n osuus on lueteltu -2015-luovutuksessa. Pohjaksi otetaan v5, koska LAV:n koepaketti oli v4:llä.
- **A6:** kun Codexin 7-välinen GLB on LR:n paketissa, tarkista läikät.

## Huomiot
- Havainne-editori: `REF=<haara|sha> RUNKO=9ae1b6277 JUURI=P/juuri-216 zsh tyokalut/havainne/editori.sh 02 05`.
  - Lähikuva: `LAHIKUVA="1.4 2.5 6 70" … editori.sh 06 <x> <z> <suunta>`. Kohdat: 02 = -245.44 318 -2.03 ja 05 = -251.6 393 -3.
  - Ajoskripti: P/v5_parit.py.
- Levy oli 21.4x:llä 96 Gi (raja 95).
