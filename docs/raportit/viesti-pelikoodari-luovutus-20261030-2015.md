# Pelikoodari: luovutus 30.10.2026 klo 20.15 (konteksti 33 %, Postivahdin pehmeä raja)

Edellinen luovutus: -20261030-1820. Muistin tilatiedosto: pelikoodari-tila-20261018-aamu.md.
- Työkansio P = /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/piirrokset-20261030.
- Proto-worktree: /Users/Shared/Claude/wt/proto-pelikoodari-v98c. Proto-haaroja ei pushata.

## ENSIMMÄINEN ERÄ: osasarja-v4:n pari ja mittarit PT:lle (PT 19.1x: lopullinen pari v4:llä)
| proto-haara | sisältö |
|---|---|
| pelikoodari/osasarja-v3-216 **88eed2939** | **Tämä junaan, kun PT kuittaa** (NS mergeää vasta PT:n luvalla). Päällä 0d0ac3520 (v2). Sisältää: 00e19dfb0 v3-kansiot (osasarja-v3, tausta-v81, muurikate-v29, c2-v26) ja kaukoniput tasoittain, e0658fd3c värit nippuihin, 88eed2939 OsasarjaKansio v4. |
| pelikoodari/testi-v4-uusi a50a8cb7f | 88eed2939 + ortokamera, vain esikatseluun |
| pelikoodari/testi-v3-uusi 36abbbad4 | v3 + värikorjaus + ortokamera (välivaihe) |

- **Kaukoniput** (JuoksuOsasarjaKokoaja.Kaukotasot): kukin osa kevyimmästä tasosta, jossa se on.
  - LOD2: 15 osaa, 86 ruutua, 64 356 kolmiota. Puuttuvat LOD1:stä omana nippunaan (vesisylkijä): 6 ruutua, 53 044 kolmiota.
  - Yhteensä 117 400 kolmiota (v2: 784 812, −85 %). Vesisylkijän LOD1 on nyt suurin erä; LAV:lle LOD2 vesisylkijälle, jos tarvitaan lisää.
  - Ruudun toinen nippu on ensimmäisen lapsena, joten näkyvyys seuraa vanhaa vastinetta.
- **Värikorjaus e0658fd3c:** Kokoaja ei kopioinut baseColorFactoria (Vari), alfarajaa eikä kaksipuolisuutta. Tekstuurittomat
  konsolit ja räystäät olivat siksi valkoisia tai liiloja. Vika oli jo v2:ssa.
- **v4-paketti (LAV, JU vei 19.18, SHA256SUMS 9c781f204aa2):** V4_kujakivi_sokkeli osissa (kivijalka-1m) ja kuvanimet KiviJakoa varten.
  - Ladonta on sama kuin v3:ssa: 1109 polkua, 3194 osaa (16 mallia), 977 pursotusta. Näyteosia ei ladota.
- **Esto palatsi-esto-v22** = tausta-v81 + rakennukset-v85 + osasarja-v3/v4.
  - Kansio: proto-3d/_tyo/pelikoodari/esto-216-20261030/palatsi-esto-v22 (SHA256 4dc64fdfde44).
  - 152 965 ruutua (v21: +43 / −755, v3:n muurit 0,80 m). Uudelleenleivonta v4:llä: 0 eroa.
  - Ämpäriin NS:lle PT:n kuittauksen jälkeen.
- **Koejuuri P/juuri-216:** linkit kielletty-osasarja-v3/-v4, tausta-v81, muurikate-v29, c2-v26 ja palatsi-esto-v22 osoittavat
  JU:n vientipaketteihin. v3: 106 tiedostoa, 77f02f0fc384, kaikki OK. v4: 9c781f204aa2.
- **Parit:** vanha = esikatselu-20261030-182010 (30eb17cd6, ennen osasarjaa).
  - v3 ennen värikorjausta: P/v3-parit. Välivaihe 36abbbad4: esikatselu-20261030-190949.
  - v4: kummankin ajon (192005 ja 194218) pelikuvat ovat ylhäältä noin 35 m:n korkeudesta. Linjalla 2 ajoi samaan aikaan Valosepän
    varjo-v4- ja lodraja-v4-ajo, jonka komento `valo testikamera 25 35 22 50` päätyi yhteisen datakansion kautta minun ajooni.
    Lukko ei estänyt päällekkäisyyttä (ilmoitettu PT:lle). Yläkuvat ovat kunnossa: P/v4-parit/*-yla (ero 0–5,4 % kuten v3:lla).
  - Skenaarioon lisätty `ui juoksupeli valo testikamera 0`. **Aja uudelleen, kun linja 2 on hiljaa** (`pgrep -fl esikatselu.sh`):
    `zsh /Users/Shared/Claude/wt/proto-pelikoodari-pk7-214/tyokalut/esikatselu.sh a50a8cb7f P/skenaariot/v2-pari.txt ipad --batch`
  - Sitten: `cd P; python3 v2_parit.py /Users/Shared/Claude/proto-3d/lokit/esikatselu-20261030-182010 <uusi loki> P/v4-parit`.
  - Tarkista lähikuvat (sääntö 2.177): kivijalka (05 oikea, 02 vasen) ja reunakivi.
- **Avoin:** reunakivi (V4_kujakivi_reuna, pursotus) oli valkoinen vielä värikorjauksen jälkeen (v3).
  - Kuva on vaalea (keskiarvo 202/192/186), eikä KiviJakossa ole reunakivi-v01-albedoa.
  - Jos vika näkyy myös v4:ssä, vertaa vanhaan reunakiveen (muurikate-v26-pohja): sävy _KujaKivi 3 ja kuvan nimi. Kysy tarvittaessa Valosepältä.
- **Viesti PT:lle (≤ 3 riviä):** sha 88eed2939, parien polku, kauko 785 k → 117 k, esto v22.

## Jono sen jälkeen
- **Reittivalinta (PT 19.2x, omistajan päätös PT:n kautta: ei loputonta eikä vaihtuvaa rataa):** v4-parin jälkeen yksi rivi PT:lle.
  - Valmiina on jo: palatsin todellinen kulkuverkko (JuoksuPalatsiVerkko), käännökset risteyksissä (VasenAuki/OikeaAuki) sekä tasoittain
    rajaus, alku ja maali (JuoksuTaso, SuljeSivut).
  - Vaihtuu joka juoksulla: kujien sisältö (esteet, omenat, vartijat), koska siemen on kellosta (JuoksupeliNakyma.cs:705
    `Environment.TickCount`) → kiinteä siemen per taso (pieni muutos).
  - Aukeavat portit (suljettu sivuhaara aukeaa ehdolla, ovilehdet rakennuksissa) ovat uusi logiikka: arvio 1–2 päivää.
- **Osasarjan leivonta (LAV:n SOPIMUS.md leivonta-216, VS:n kuittaus linssiseppa2/leivonta-216-vs-kuittaus.md, shader d420087dc):**
  - Alkaa, kun v4-pari on hyväksytty.
  - PK vastasi LAV:lle: k = Ladonta.Sijoitukset-järjestys ja tarkiste (> 5 cm → ST 0 + varoitus), karki.bin (Kaukotasot-sääntö),
    pursotukset.glb LAV:lta käy.
  - PK:n osuus (VS): materiaalikopio per ruutu, lähiruutujen atlakset, `_LeivottuST` MaterialPropertyBlockilla (Valopohja.IdLeivottuST),
    kaukonippuihin `_LeivottuKarki = 1` + colors32 ja ST-muunnos glTF → Unity.
- **Codexin mittapiirrokset** posti/codex-pelikoodari-mittapiirrokset-* (taihemen/taihedian v3, sivuhallit v2): odottaneet yli 7 h (Postivahti 19.3x).
- **A6:** kun Codexin 7-välinen GLB on LR:n paketissa, tarkista läikät.

## Huomiot
- Peli-testit: `cd Peli-testit; ./kaanna.sh [Testi]`; MK_OSASARJA=<kansio> ajaa paketin tarkistuksen (kaukotasot raportissa).
- Esikatselun "ESIKATSELU POIKKEUS ArgumentOutOfRangeException" tulee Unityn hakuindeksistä (SearchDatabase), ei pelistä.
