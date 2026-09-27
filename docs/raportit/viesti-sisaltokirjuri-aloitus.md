# Sisältökirjurin aloitusviesti (27.9.2026 klo ~23.4x, kontekstin nollaus)

Olet Sisältökirjuri (Sonnet), checkout `/Users/Shared/Claude/Matkakirja-sisaltokirjuri`
(haara `sisalto-pelikatalogi-20260927`). Ensimmäinen komento:
`git fetch origin main`. Lue `CLAUDE.md`, `docs/roolitus.md` ja
`docs/raportit/viesti-sisaltokirjuri-luovutus-20260927-j.md` KOKONAAN
ennen töiden aloitusta.

TILA lyhyesti: 14 kokonaan puuttuvan maan sarja käynnissä (pitkä-
luonnehdinta + Pulu). ROU (42 aluetta) valmis, PR #3514 avoinna.
UKR (25 aluetta) kesken — kaksi tutkimusagenttia käynnissä väärällä
ohjeistuksella, ks. luovutuksen kohta 3.

**TÄRKEIN OPPI**: `pitka`-kenttä kirjoitetaan Livian äänellä, NYKY-
AIKAAN — 1873-kytkös mainitaan yhtenä virkkeenä VAIN kun se on alueen
identiteetin ydinasia (esim. Transilvania kuului Unkarille), EI koko
tekstin runkona ("isoisä olisi nähnyt..."). Tämä virhe tehtiin ensin
CZE/HRV/ROU:lle; ROU korjattiin (PR #3514), CZE/HRV ovat yhä väärällä
tyylillä mainissa — kysy Fablelta halutaanko korjauskierros.

JONO: UKR (kesken) → BGR → SRB → BIH → ISL → ALB → MKD → MNE → CYP
(myös kuva puuttuu) → MLT → LUX → MDA → BLR, sitten loput 21 maata
(vain Pulu). Menetelmä ja worktree-ohjeet luovutuksen kohdassa 5.

Faktatarkistus: Pariisi/Lontoo/Rooma/Berliini/Wien/Madrid/Ateena/
Istanbul kaikki valmiit ja mergetty. Fable mainitsi "Wien/Madrid/
Ateena seuraavaksi" — tämä on todennäköisesti ristiriitainen vanha
tieto, tarkista Fablelta ennen uudelleentarkistusta (luovutuksen
kohta 4). Todennäköinen jatko: Tukholma/Bukarest/Pietari/Lissabon/
Sofia/Helsinki.

SITOVAT KÄYTÄNNÖT:
- JUMI → FABLE: jumissa yksi viesti Fablelle, ei korttia; muu jono jatkuu.
- VIESTIRAJA: SendMessage ~10/vuoro.
- Kohderyhmä 13+, EI lastenpeli.
- Agentit vain Sonnet/Opus. Kirjaa agenttien löydökset TIEDOSTOON heti.
- Älä mergaa checkout-haaraa (`sisalto-pelikatalogi-20260927`) äläkä
  poista sitä `--delete-branch`-lipulla.
- VAIN EUROOPPA on maantieteellinen rajaus.
- Main liikkuu useita committeja tunnissa: fetch+rebase juuri ennen
  pushia. `js/muutokset.js`-konfliktit ovat rutiinia (versionumero-
  rivit) — oma rivi ylimmäksi, numero main+1, main.js+sw.js samaan
  lukuun.
