# Pelikoodari: luovutus 2.11.2026 klo 09.30 – juna 218

Edellinen: -20261102-0815 (PR 5947). Pysyvä kuittaus: tallenne PT:lle → SHA NS:lle. Runko 218 = e8f948102 (NS 09.0x).

## Valmista
- **Pariovet auki alkulennossa = 4a2a0658f** (pelikoodari/pariovet-alkulento-218, mergetty runkoon e8f948102). JuoksuSokkeloMaailma.
  AlkulennonOvet: a-meridiaaniportin ovet heti auki, kun AvausT ≥ 0 (myös myöhään latautuneet), kiinni ohjauksessa (loki "alkulennon
  pariovet kiinni") → keisarin työntö ja maalin AvaaOvet ennallaan. Tallenne korjaus-218/20261102-081813-218h.mp4, pari
  218g-vs-218h-pariovet-0.09-0.12.png; PT kuittasi. Worktree poistettu.
- **Taustakansio v99 = b6de5360f** (pelikoodari/tausta-v99-218, e8f948102:n päällä): lähetetty NS:lle ~09.1x, mergeä EI vielä vahvistettu.

## KESKEN (PT 09.3x: kuitataan yhdessä v95-paketin ja salitallenteen kanssa)
- **Kapea reitti = 4b107df7e** (pelikoodari/kapea-reitti-218 = b6de5360f + tämä; worktree wt/proto-pelikoodari-tausta-v99).
  JuoksuPalatsiVerkko.KapeaReittiM 1,5: mallin reitti, jonka leveys < 1,5, avataan rasteriin janoittain reitin leveydeltä (ei koko
  reitin suorakaidetta), on pakotettu linja (kuten "avoin "-reitit) ja Linja.Raja rajaa solmun leveyden → osan leveys 1,4 → yksi kaista.
  JuoksuV4: eiVartijoita = Verkko != null && o.Vaylia < 2 → ei vartijapaikkoja (R()-arvonnat ennallaan). Nykyiset reitit ≥ 2,4 → ennallaan.
  unity-tarkistus 0. Tarkistus: korjaus-218/leveys214.py (LOD0, lattia +0,1–1,8 m): pelin kulmikas linja ≥ 0,55 m sermistä, 0,76 kaapeista,
  0,90/1,06 pylväs–maljakko; kaksi kaistaa (leveys 3,0) olisi mennyt sermin läpi (leveys214-lod0.txt).
- LAV:lle pyydetty 214 n-hallin S-N "leveys": 1.4 rakennukset-v95:een (+ kysytty bugi 2:n tila, ks. alla). Kun v95 tulee: tallenne salista
  (taso 1 tai QA-alku hallin eteen) JU:n vuorolla → PT:lle yhdessä v95:n kanssa → SHA NS:lle.

## ENSIMMÄISENÄ: eunukkitesti (PT 09.3x: syy ja korjaus ennen junaa, rivi PT:lle)
- JuoksuReittivalintaTestit.EunukitNakyvatAjoissaSatunnaisillaReiteilla kaatuu "palatsi 216: sivukujasta ei lähtenyt eunukkeja", kun
  MK_RAKENNUKSET = LAV:n n-v2-json (sekä leveys 3,0 että 1,4; myös pohjahaarassa eunukit-218 ilman koodiani). Virallinen v94-json läpi
  (1168 m, kujia 111, eunukkeja 4); n-v2: 1196–1198 m, kujia 115, palauksia 9, eunukkeja 0. tausta-v99/osamallit-v10/esto-v23 eivät vaikuta.
  Ajo ei pääty kesken (ei Uupui/Pidetty). AVOIN: miksi uudella verkolla botin 240 s:n satunnaisreitillä ei synny yhtään eunukkia
  (ennakko 2194 kohtaa) → tutki ennakon Vartijat reitin varrella / botin silmukka hallin ympärillä (palauksia 9).
- Testijuuri: scratchpad-kansioni juuri/ (symlinkit d6/juuri + uudet paketit); helpoin uusia: kopioi
  /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/reitti-216/d6/juuri:n linkit omaan kansioon ja lisää kielletty-rakennukset-v94,
  kielletty-tausta-v99, osamallit791-v10 _valmiit-kansioista; n-v2-json: /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/sisatilat-214/
  n-v2/rakennukset.json omaan alikansioon. Aja: MK_JUURI=<juuri> MK_RAKENNUKSET=<alikansio> sh ./kaanna.sh EunukitNakyvatAjoissa.

## Avoimet
- **Kohta 2 (ristikko-ovi)**: LAV:n lisäys 235 sanoo "bugi 2 odottaa PK:ta", edellinen luovutus "LAV:lla" → kysytty LAV:lta 09.2x, vastaus auki.
- Havainto 218h-lokissa: "ESIKATSELU POIKKEUS ArgumentOutOfRangeException" myös 218g:ssä (ei uusi).
- Worktreet: tausta-v99 = kapea-reitti-218, kivi-216 = tallenne-218h (tallenne-218f + f691d2e2d + pariovet), peitto-218 = eunukit-218
  (mergetty), kansiot-218 = lod-alkulento-218 (mergetty), korjaus-217 = rakennukset-v94-218.

## LISÄYS 09.4x (luovutuksen jälkeen tulleet)
- NS: tausta-v99 b6de5360f mergetty, **runko 218 = d85660f03**. Kapea reitti 4b107df7e rebase sen päälle (sama kanta b6de5360f).
- PT: LAV:n **rakennukset-v95 kuitattu (JU vie)**, leveys 1,4 mukana (LAV b38254f1a) → kun JU kuittaa viennin: RakennusKansio
  kielletty-rakennukset-v95 kapea-reitti-haaraan, eunukkitesti v95-jsonilla (ENSIMMÄISENÄ-kohta), salitallenne JU:n vuorolla → PT.
- **Bugi 2 (LAV 09.4x):** t-portti-120:ssa (v94 lod0/1/2/törmäys) ei ole ristikkoa, eikä 5 m:n säteellä pisteestä (−83,7; 124) missään
  paketissa → katto-solmun siirto ei auta. LAV tarvitsee PK:lta: kohdassa 1.44,3–1.45,4 (sk-218e-skenaario) kameran ~6 m säteellä
  piirtyvien rendererien GameObject-/mesh-nimet, materiaalit ja Unity-sijainnit (Renderer.bounds kameran ympäriltä esikatseluajon lokiin).
- JU 09.35: **kielletty-rakennukset-v95 viety** (546 tiedostoa, virheitä 0). PT: v95 EI runkoon/junaan 218 ennen PK:n eunukkikorjausta
  (214 v2 rakennukset.json) ja PT:n kuittausta.
