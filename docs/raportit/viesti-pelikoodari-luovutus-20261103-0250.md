# Pelikoodari: luovutus 3.11.2026 klo 02.50 – juna 218

Edellinen: -20261103-0230 (26a126396): sen tiedot ovat voimassa, ellei alla toisin. Syy: konteksti (paljon kuvia).
Proto-worktree /Users/Shared/Claude/wt/proto-pelikoodari-tausta-v99, haara pelikoodari/kapea-reitti-218 (commitit paikallisia),
kärki **c1dadbe90** (= e3579873d + ylityssuoja). Salirunko **pelikoodari/sali-218g = d23197d39** (c1dadbe90 + piirtajat-218
505fd53c1; merge-tree). Peli-testit 799/799, unity-tarkistus 0 virhettä.

## KK:n linja (02.4x–02.5x, omistajan puolesta, yövaltuutus 22.25) – SITOVA
- KK:lle EI lähetetä yksittäisiä salitallenteita. Vasta YKSI koottu paketti, kun kaikissa 8 salissa (yk cx th tj ty cc xf ys)
  ja tason 1 alussa Puyi on koko ajan ruudussa eikä kamera kulje minkään läpi. Tunnetut viat kerrotaan ennen lähetystä;
  vika palauttaa tallenteen. Ei leikkauksia (PT 02.4x: tunnettua vikaa ei leikata, aikaleima viestiin; muistissa).
- ty-v3, ty-v4 ja cc-v3 lähetettiin jo, mutta KK hylkäsi ne (katon läpi kulku, Puyi seinän/kaapin takana, kierto ilman Puyita).
- VALTAISTUIN (KK hyväksyi PK:n suosituksen): maali valtaistuimen eteen; Puyi seisoo korokkeella KASVOT KAMERAAN PÄIN koko
  kamerakierron ja Maali-kortin ajan. Ei istumista, ei Codex-tilausta. Syy nykyiseen: maali on takaoven edessä ~5 m (ty 13 m)
  valtaistuimen pohjoispuolella, joten valtaistuimen taustaseinä peittää Puyin kierrossa.
  Toteutus kesken. Maali = verkon LÄHIN SOLMU (JuoksuV4.AsetaMaali), joten valtaistuimen edessä ei välttämättä ole solmua.
  Ehdotus: QA-komento (JuoksupeliNakyma.Komento), joka siirtää Puyin pisteeseen (pohjan kehys "x,z", kuten maali) ja kääntää
  hänet kameraan päin. sk3:ssa komento kamerakierroksen kanssa samaan aikaan, koska kierto on kuvaleikkaus eikä siirtoa näy.
  Kerro KK:lle, että siirto tapahtuu leikkauksessa. Valtaistuimet (kamerakierros-rivit, pohjan kehys x z y): cc −165.35 374.94,
  cx −110.23 431.67, th −109.11 405.39, tj −163.77 325.28, ty −164.17 343.81, xf −165.84 426.35, yk −107.83 380.01,
  ys −106.39 328.46. Pohjoinen = suurempi z (reitti S-N alku → maali), joten valtaistuimen etupuoli = pienempi z.
  Esikatselu.cs: kamerakierroksen muunnos pohjan kehyksestä maailmaan on sen omassa koodissa (case "kamerakierros").

## Korjattu tässä vuorossa
- sk3-*.txt + tee-sk3.zsh: `ui juoksupeli avaus 0` ENNEN `ui juoksupeli v4`:ää (v4 avaa pelin ja avauslento alkaa avattaessa).
  tj 022501 oli käyttökelvoton: lento jatkui, botti juoksi maaliin ennen kuin kamera ehti (loki "juoksu loppui kesken lennon").
  cc 023928 ja myöhemmät: "avauslento pois", ei LentoAlkaa.
- ylityssuoja c1dadbe90 (DroneNosto.YlitysRaja, JuoksuV4Maailma läpikulun katon jälkeen): massan yläpuolella oleva kamera ei laske
  massaan kameran ja keisarin välissä; ei koskaan nosta. Syy: ty/cc 0,5–1,3 s kamera laskeutui 7 m:stä portin katon läpi; portin
  peittokartta on massaa maasta asti (ala −0,1), joten läpikulun katto 1b80e7201 ei tunnistanut sitä (ty-lokissa 0 riviä).
  EI VIELÄ NÄHTY pelissä. Loki "ylityssuoja päällä|pois" (ketju8s kerää huom-tiedostoon).
- ketju8s.zsh: RUNKO-muuttuja; JU:lta pyydetty 02.46 `RUNKO=pelikoodari/sali-218g zsh .../ketju8s.zsh ty yk cx th tj` (xf/ys
  jälkeen; toimitus jonossa, ei vahvistettu). Tarkista tulos: ylityssuoja-rivit, portinkatto 0,5–1,3 s poissa, ei jumia ylhäällä.

## Avoimet viat (kaikki korjattava ennen pakettia)
1. yk 6–9 s: keisari juoksee rakennuksen ("avoin tyohuone") läpi, ja kamera kulkee oven katon tiilten läpi, ~0,8 s seinän sisällä.
   KK: kamera nousee räystään yli tai laskee sen alle, ei geometrian läpi (2.177: korkealla suoraan takana, Puyi näkyy).
2. ty ~3 s: portin palkki kameran edessä.
3. cc ~4–5 s: Puyi hetken salin sisäseinän ja kaapin takana (cc-v3; loki PELAAJA PIILOSSA este "avoin varasto katto").
4. Valtaistuin (yllä), kaikki 8 salia.
5. HAVAINTO: salien alueella peittokartta näyttää massaa avoimillakin pihoilla ("kamera rakennusmassassa … huippu 5–7 ala 0.0"
   lähes joka sekunti 3,9 m:n kameralla, kuvassa avointa). Avoimet huoneet ovat massaa maasta asti (ala 0), joten kameran
   sisätilalogiikka (porttitunneli, läpikulun katto, AvoimessaHuoneessa) ei tunnista niitä. Todennäköinen yhteinen syy kohtiin
   1–3. Selvitä ensin (peittokartan Ala avoimissa huoneissa vs. LAV:n mallit); voi olla LAV:n tai peittokartan leivonnan asia.
   Ylityssuoja voi pitää kameran turhan korkealla, jos tällainen virhemassa on alla → tarkista uusinnoista.

## Tason 1 alku (taso1b6)
LAV poisti kujaportti-3:n takaisen massan (tausta v113/esto v37), mutta JU 02.4x: ÄLÄ kytke. LAV korjaa kaksi vikaa versioihin
tausta v114 / esto v38. Odota LAV:n ja JU:n VIETY-viestiä, kytke (TaustaKansio "kielletty-tausta-v114/", esto "palatsi-esto-v38/")
ja pyydä JU:lta taso1-vuoro (ketju-taso1b5.zsh → b6, runko kytkennän sisältävä). Tarkista z −836…−846 kamera.txt:stä + kuvat.

## Viestit
- Viestiraja tuli vastaan 02.5x (LAV:n kuittaus ei mennyt; ei tärkeä). Seuraavat: varakanava mcp__ccd_session_mgmt__send_message.

## Jono
1. Uusinnat 218g: tarkista. 2. Valtaistuin. 3. Avoimet viat 1–3 (+5). 4. taso1b6 v114/v38:n jälkeen. 5. Yksi koottu paketti KK:lle
viat kerrottuina. 6. Arkiset hahmot (Codexin paketti ei vielä postilaatikossa 02.3x). 7. VS:n sade. 8. Siivoukset.
