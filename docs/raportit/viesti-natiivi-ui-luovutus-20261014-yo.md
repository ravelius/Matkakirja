# Natiivi-UI: luovutus 14.10.2026 klo 00.4x (nollaus, PT:n pyyntö, konteksti 52 %)

Natiivi-UI (Opus, high) → seuraava Natiivi-UI-sessio. Edellinen: viesti-natiivi-ui-luovutus-20261013-yo2.md (keskityksen historia,
ajot 1–9). Pysyvät säännöt -20261012-ilta.md ja -20261010-aamu.md. Ajoskriptit: /Users/Shared/Claude/proto-3d/lokit/natiivi-ui-ajoskriptit-20261012.

LINJAT: Julkaisijan pysyvä lupa ajaa testiajoja (ei käännöstä eikä simua) L2:lla, kun se on vapaa ja jono tyhjä (lukon `kuka`);
ilmoita LUKKO VAPAA. Julkaisija voi tauottaa luvan ("älä aloita uusia") – se voittaa. L1 vain Julkaisijan erillisellä luvalla.

JÄRJESTYS (PT 14.10. 00.5x): 1) keskitys → 2) museon valintasivu → 3) raketin mittaritaulu → 4) Tavlin/Myllyn tavoitepuhe.
Kaikki junaan 189; jokaisesta kuva-arkki ennen/jälkeen (iPhone + iPad) PT:lle ennen kuittausta.

KESKEN NOLLAUSHETKELLÄ: taustalla L2:lla ketju `raketti189-kuvat.sh 2; PROTO_LINJA=2 keskitys188k.sh` (oli jonossa toisen ajon
d0d246387 perässä 00.33 alkaen). Jos nollaus katkaisi sen: tarkista lokit (lokit/natiivi-ui-raketti189-kuvat/*.log,
ajoskriptit/keskitys188k-*.log), lukko /tmp/matkakirja-kaannospalvelu-2.lukko (vanhentunut pid siivoutuu itse) ja aja uudelleen.

## 1. NAPPIEN KESKITYS (juna 189; tyylikirja-PR ravelius/Matkakirja#4571)
Omistaja 13.10. 21.0x sanatarkasti: "Peliin pitäisi saada edottomasti joku toiminto, mikä aina tarkistaisi, että kaikki nappien
sisällä olevat elementit, symbolit tai tekstit olisivat aina keskitettyjä, koska ne tulevat joka kerta ensin vain vähän sinne päin."
PT: ≤ 0,5 pt vaaka ja pysty, kaikki näkymät, neljä kokoa, testi kaatuu. Omistaja 13.10. 22.2x kohtaan 3 (kortti): "Kyllä, keskelle"
(optinen keskitys uutena tyylikirja-arvona, pohjana). PT: kuvake keskitetään piirtoalueestaan; mikserin × (kehittäjätyökalu) ulos.

Haara natiivi-ui/keskitys-188 (proto-git), worktree /Users/Shared/Claude/wt/proto-natiivi-ui-keskitys188, HEAD 2728a1645.
- Pohja: Kirjasimet.KeskitaOptisesti (Kosketusnappi kutsuu GeometryChangedissa): translate kirjasimen mitoista; pysty versaali–
  peruslinja (symboli omasta piirroksestaan, puuttuvat merkit → cap-kaava), yksirivisen sivutilat. EI lisää merkkejä kirjasimeen
  (lisäys kesken piirron teki laatikoita, b4d0e943a).
- UI-korjaukset: pelkän kuvakkeen napit margin-right 0 (⏸ pulu.uss, mikserin ‹ .mk-pikkunappi, mikserin avausnappi), näyttelyrivi
  flex-shrink 0, yhtenäisen valikkorivin napit padding-left 6 px (Linssit.uss).
- Testi (AsetteluTesti.Keskitys.cs): kuvat/väritetyt lehdet/kuvakkeet laatikostaan; viiva ≤ 1,5 pt koriste; monen osan napissa ja
  monirivinen teksti laatikostaan; reunaton tekstilinkki ohitetaan; mikseri ohitetaan; peitto piirtojärjestyksestä (myös ylempi
  paneeli); vika- ja peittokuvat tulokset/asettelukuvat/keskitys; MATKAKIRJA_KESKITYS_NAPPIKUVAT=1 = kuva joka napista.
  ui-asettelutesti.sh ilman osaa: keskitys pallo kolmena varauksena (iphone-pysty, iphone-vaaka, ipad) + linna.
- Tila ajon 10 jälkeen: linna LÄPI, pallo iPad/iPhone ainoa keskitysvika "Mikä tämä on?" → 2728a1645 (monen osan teksti laatikostaan
  myös vaakaan) ajamatta (jonossa, ks. yllä). Muut pallon viat eivät ole keskitystä (aarretehtävä ei avautunut ×2/koko, metrolinja
  iPhone vaaka, taidehallin turva-alue iPhone vaaka).
- SEURAAVAKSI: keskitys188k.sh läpi → ennen/jälkeen-arkki (keskitys188-kuvat.sh <haara> <nimi> <linja> + keskitys-arkki.py, ennen-
  haara rakennetaan commit-tree:llä: HEAD + Assets/Matkakirja/UI 10b4e302b:stä, ks. -20261013-yo2) → PT → SHA NS:lle junaan 189.
- HUOM: ut-editori.sh ei tunnista Editor-kansion käännösvirheitä (28 CS0433 peittää; CS0136 meni ajoon) → katso Unityn loki.

## 2. MUSEON VALITSE NÄYTTELY (juna 189)
Omistaja 14.10. 00.5x sanatarkasti (iPad-kuva Rijksmuseum): "muuta staattiseksi kuvaksi koska kyseessä ei ole aito 3d panorointi.
suurenna tekstin osuutta ja pienennä kuvaa". PT: sama sivupohja kaikille museoille (Alankomaat, Ranska), tyylikirjan koot.
Haara natiivi-ui/museo-valinta-189 (pohja linssiseppa/museo-maa-188 bbdaa467c + natiiviseppa/juna-189, LS1:n ohje), worktree
/Users/Shared/Claude/wt/proto-natiivi-ui-museovalinta189, 7ddead7c1: panorointi pois (Cover + keskitys), kuva 16:10 (pinossa 16 %),
SarakeSuhde 1,4 / SarakeMax 620, salien nimet Koko.Valiotsikko, kuvaukset Koko.Leipa (inline MuseoTaulussa, ei uutta USS-luokkaa).
Ennen-haara natiivi-ui/museo-valinta-189-ennen (a981b8eb0). LS1 ei muokkaa MuseoTaulua; LS1 tekee Ranskan kuvat (pyydetty: keskushallin
kuva ≥ 1200 px kohde keskellä, salikuvat 256 px). SEURAAVAKSI: `zsh museo189-kuvat.sh 2` → kuva-arkki PT:lle.

## 3. RAKETIN MITTARITAULU (juna 189)
Omistaja 14.10. 00.1x sanatarkasti: "tuo vihreä taulu pitää tehdä paljon tyylikkäämmin. teksti ei mahdu myöskään sopivasti siihen".
PK: pisin muoto "T+ 23 h 21 min · 380,0 km · 0,0 G" ja "27 547 km/h · 7,65 km/s"; leikkautui oikealta (paneelilla ei leveysrajaa).
Haara natiivi-ui/raketti-lcd-189 (pohja PK:n pelikoodari/raketti-laukaisu-189 02754cfdd; RakettiNakyma.cs on nyt NUI:n, PK pitää
RakettiLaukaisu.cs:n), worktree /Users/Shared/Claude/wt/proto-natiivi-ui-rakettilcd189, 196e3e507: Cupolan v3-nahka (mini-kehys
9-slice, IssOhjaamo.Pukeudu internal), rivit aika / "{0} km · {1} G" (ui.raketti.lukemat muutettu) / nopeudet Mittari-kirjasimella
keskitettyinä, KÄYNNISTÄ ja OHITA lasilla LCD-nappeina, leveys 92 % ≤ 520 pt, Sovita (30→17, 15→12). Testinäkymä "raketin paneeli
lennossa" (acb78a37c = ennen-haara natiivi-ui/raketti-lcd-189-ennen). SEURAAVAKSI: raketti189-kuvat.sh tulokset → katso kuvat ITSE
(onko tyylikäs, mahtuuko) → arkki PT:lle. EI ole vielä nähty kuvana.

## 4. TAVLIN/MYLLYN TAVOITEPUHE (juna 189, odottaa klippiä)
Omistaja 14.10. 00.3x sanatarkasti: "tavlissa pitäisi selittää ääneen mitä pelissä yritetään tehdä". SK kirjoittaa Tavlin (ja Myllyn,
jos puuttuu) tavoitteen puheeksi, Äänittäjä äänittää; NUI kytkee klipin Lautapeliopas-koodiin pelin alkuun ennen ensimmäistä
heittoa samalla tavalla kuin nykyinen puheopastus. Ei aloitettu.

## Muut
- Pelikoodarille vastattu pohjista: KÄYNNISTÄ/NYT = .mk-issohjaamo__lcdnappi (NYT LCD:n oikealle), lähtölaskenta LCD:n isolla rivillä,
  iso keskinumero ei pohjaa → PT; Pulun Kuvat = GALLERIA-pohja (osio per kohde).
- Siluetti (juna 188) valmis ja NS:llä; juna 188 julkaistiin ilman nappeja.
