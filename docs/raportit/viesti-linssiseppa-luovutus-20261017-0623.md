# Linssisepän luovutus 17.10.2026 klo 06.23 (konteksti ~35 %, PT pyysi kirjaamaan)

Edellinen: viesti-linssiseppa-luovutus-20261017-0442.md (yleisohjeet, osoitteet, testikomennot).
Proto-git /Users/Shared/Claude/proto-3d/Matkakirja-proto (paikalliset haarat, ei pushia). Ajot proto-3d/tyokalut/linssiseppa-ajot/.
Viestit AINA send_message id:llä: PT local_5df52e10-10e4-4b72-9554-0049db300dfe (≤ 3 riviä), Julkaisija local_5cb16c00-98db-4cd9-8d7c-1b0bc8ced914,
NS local_674b9ec4-e2f3-48e9-a810-a129f20a4f03. JU 05.48: junan 199 L2-käännökset vasta LUKITSE 198:n (~06.45) jälkeen.

## 1. ENSIMMÄISEKSI: KAASUVIPU ODOTTAA KK:N OK:TA
- Haara linssiseppa/laivavipu-199 (worktree wt/proto-linssiseppa-vipu): a65421671 = luonnos (LaivaVipu.cs + OpasTapit + `ui opasvalikko
  laivavipu 1|0`), 792952911 = kytkin oletukseksi päälle. PT 06.2x: kuvapari OK, viety KK:lle. **Kun KK OK tulee (PT:n kautta):
  lähetä 792952911 NS:lle junaan 199.** Ennen sitä EI NS:lle.
- Kuvat _valmiit/vapaalento-20261017/laivavipu-199/ (pari-L0-NYK-L1-UUSI.png), simu de9ff3ad OK. KK:n ehdot täyttyvät: ei peitä
  kompassia/nappeja, napsahdus heti (ei animaatiota).
- Haara pohjautuu linssiseppa/vapaalento-kontrasti-198:aan (8dd489981) — jos kontrasti ei mennyt junaan 198, NS ottaa sen vivun mukana.

## 2. VALMIIT TÄNÄÄN (kaikki simu OK, poikkeukset 0)
- Vapaalento c59d63e01 → juna 198 (KK OK). Kuvat _valmiit/vapaalento-20261017/v2-198/.
- Kontrasti 8dd489981 (linssiseppa/vapaalento-kontrasti-198): Palaa kierrokselle + Mikä tämä on? Lasipohja.KirkasPaneeli (5252b59cb),
  metrolinjan MuutPeitto 1 (ei taustaa eikä ääriviivaa, omistaja 7.10./14.10.). Kierroslista vaalean kiven päällä yhä heikko →
  PT:lle ehdotettu omistajan aamukorttiin. Kuvat _valmiit/vapaalento-20261017/kontrasti-198/. Junastatus: kysy PT:ltä.
- Kiina valmis 198: d683c91f9 + vuosi = kartta fce13114a + testikorjaus 109a2ad36 (Linssit-testit 1973/1973) → NS junaan 198.
  Kuvat _valmiit/kiina-valmis-20261017/ (+ vuosi-198/, ääninäyte kiina-kertoja-1280-naytte.wav).
- Kiina-199 95c450bf8 (linssiseppa/kiina-199): pysäkin nimet toistossa (06e90af18) + Kiina porttilinsseihin (Lontoon kortti ja
  kartussi pois). Lähetetty NS:lle junaan 199 (PT OK). Kuvat _valmiit/kiina-valmis-20261017/kiina-199/.
- Alankomaiden kohdat 0836aa941 (linssiseppa/alankomaat-kohdat-199, cmp main d69b94eb0 OK, 195 ympyrää) → ilmoitettu NS:lle junaan 199.

## 3. OPIT
- Kiinan linssissä on aloituskortti (78a2b34a4): skenaariot tarvitsevat `linssi kiina ajo` + `linssi kiina ajo tauko` ennen kuvia
  (sk-kiina-valmis3-ipad.txt). Kertoja soi pysäkillä 1280 ~44 s ajon alusta.
- `linssi kaupunki google 0` kesken ajon ei vaihda laattoja (W1 jäi Googleksi) → Ion-vertailu vaatii oman ajon.
- Avoimet: tuotantopohja #4771 (luku 8 opit Kiinasta), Louvren pariteetti fc6024f6a (rebase vapaalento-197:n päälle, ei junaan ilman PT:tä).
- tools/gpu-vapaa.sh ja .claude/settings.local.json* eivät ole minun (älä committaa).

## ALOITUSVIESTI SEURAAJALLE
Olet Linssiseppä (Opus, high). Lue CLAUDE.md ja tämä luovutus (git show <sha>:docs/raportit/viesti-linssiseppa-luovutus-20261017-0623.md).
Ensin: kysy PT:ltä, onko KK hyväksynyt kaasuvivun → jos on, 792952911 NS:lle junaan 199. Sitten jono PT:ltä.
