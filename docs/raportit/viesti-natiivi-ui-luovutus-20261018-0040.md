# Natiivi-UI: luovutus 18.10.2026 klo 00.40 (Postivahti: kova raja 40 %; omistaja 00.34 tilinvaihto)

Natiivi-UI (Opus) → seuraava Natiivi-UI-sessio. Korvaa -2330:n jonon. Aiempien luovutusten "Opit" ovat yhä voimassa.
Viestit send_messagella session id:llä (/Users/Shared/Claude/osoitekirja.md). PT:lle enintään 3 riviä.
Simu VAIN Julkaisijan SIMU NYT -viestistä, SIMU VAPAA perään. Uusi käännösodottaja ilmoitetaan Julkaisijalle ETUKÄTEEN.
Laitteet: iPhone 123B4B25-36B7-4A76-B677-905621CD8F5A, iPad F7513985-C8BC-4E97-8D29-9C9BD420E962.
Ajoskriptit: /Users/Shared/Claude/proto-3d/tyokalut/natiivi-ui-ajot/ (sk-*, ajo-*) ja ketjut-20261016/ (*-kaannos.zsh <sha>, *-simu.zsh).

## OMISTAJAN PÄÄTÖKSET (PT:n kautta, sanatarkasti)
- **00.15** "siirrä hammaspyörä hampurilaisen viereen samanlaiselle nappipohjalle ja tyylille kuin hampurilainen ja poista hammasrattaan
  sisällön toiminnot näkyvistä kaikkialta muualta pelistä. eli vuorokaudenaikaa yms. säädetään jatkossa vain hammasrattaan kautta"
- **00.17** "tai jos hammasratas mahtuu nätisti itse ohjauspaneeliin, niin sen voi lisätä sinne ennemmin"
- **00.18** OMISTAJA PYYSI JULKAISUA: "julkaise kun nämä valmiit." / "eli kaikki junaan 201" (ei luonnoskierrosta).
- **JAKO (PT 00.33):** NUI = 1) kehysnappien häivytys, 2) ⚙ + säädöt vain rattaasta (IssOhjaamo, IssKyytiNakyma, IssKytkinpoyta,
  OpasValikko ☀ → ⚙). VALOSEPPÄ = 3) kohdevalikko ilman ikkunaa + PYSÄYTYSKUVA-pohja (linssiseppa2/kohdevalikko-201 aba77f7e0).
  (Viesti tuli NUI:lle myöhässä: NUI ehti tehdä myös oman 3:n 5dc2bf8a8 haarassa natiivi-ui/kohdevalikko-201 → HYLÄTTY, Valosepän voimassa.)

## TILA 00.40 — JUNA 201 (lukitus odottaa näitä)
**Toimitettava haara: natiivi-ui/ratas-201b a45af2f97** (proto, worktree /Users/Shared/Claude/wt/proto-natiivi-ui-kohdevalikko-201):
- 21d5712be (juna 201 runko) + kehyshäivytys 0c97623f8, 766317814, **8111db02b** (= vanhat 4c52e5b79/9dcd81d9e/ec5819d17 rebasettuina;
  konflikti UiKomennot.cs: maakuntasuoraan + kehysnapit molemmat) → haara natiivi-ui/kehyshaivytys-201c.
- + **4db43cc36** natiivi-ui/ratas-201: pöytä renderöity uudelleen (tyokalut/ohjauspoyta/poyta.py + jalki.py: näyttö 122 → 102, ⚙-näppäin
  TILA-kehyksessä ja -muovissa x 296–336, palaa = ratas-alas; sauva 353 → 362), IssOhjaamo.RatasPainettu/RatasPalaa/PaivitaRatas,
  IssKohdevalikko: IssSaadot.Kaytossa + oma harmaa lasipaneeli (VaihdaSaadot/AvaaSaadot/SuljeSaadot) johon valinnat-osa
  (vrk ›, kausi ›, LIVE, NIMET) siirtyy + pilvipeitto (IssOhjaus.Liukusaadin); kohdevalikossa ei nappeja; OpasValikko ☀ → Ikonit.Ratas.
  Testit: `ui linssi kohdevalikko saadot 0|1|auki|kiinni`, `… pilvet 0–1`, `linssi astro kyyti ohjaamo poyta tila` (ratas, KOHTEET).
- + merge Valosepän aba77f7e0 (konfliktit IssKohdevalikko.cs ratkaistu: partial + IssSaadot; Avaa/Sulje sulkevat säädöt ensin)
  + KOHTEET › palaa (IssOhjaamo.KohteetPalaa, IssKohdevalikko.AukiMuuttui → PaivitaRatas, iss-ohjaamo.uss .mk-issohjaamo__poyta-rivi--palaa).
- tarkista.sh 0 kaikissa. NS voi ottaa a45af2f97:n yhtenä (sisältää Valosepän haaran). Jos Valoseppä muuttaa haaraansa → merge uudelleen.

**KESKEN (ENSIN, järjestyksessä):**
1. **KK:n tarkistus 1 (osuma-ala ≥ 44 pt): KORJAA ENNEN KÄÄNNÖSTÄ.** Rattaan kosketusalue on nyt 40 pt (poyta.json "ratas" {vasen 296, lev 40}).
   Muuta poyta.py:n mitat (ei uutta renderöintiä): ratas {vasen 295, lev 44}, sauva {vasen 339, lev 54}, ja sama Assets/…/IssOhjauspoyta/poyta.json:iin
   → commit haaraan natiivi-ui/ratas-201b. Näyttö (lcd) päättyy 294 pt:iin.
2. **Käännös:** odottaja käynnistettiin 00.39 (`zsh ketjut-20261016/ratas-201-kaannos.zsh a45af2f97` → _tyo/natiivi-ui/ratas-201-app); linjat olivat
   LS2:n ja PK:n käytössä. Jos kohta 1 tehdään, pysäytä odottaja (vain jos ei vielä lukossa: kaannos.out puuttuu/jonossa) ja aja uudella sha:lla.
   Ilmoita Julkaisijalle (local_5cb16c00-…) ennen uutta odottajaa.
3. **Simu (SIMU NYT):** `zsh ketjut-20261016/kehys-ratas-201-simu.zsh` (iPhone + iPad; sk-kehys-ratas-201-{iphone,ipad}.txt): opas O1–O3, ISS R1–R6,
   iPhonella videot haivytys-opas.mp4 + haivytys-iss.mp4 (yhdistä < 1 min). Lisää skenaarioon KK:n tarkistus 2: `linssi astro kyyti kohde
   kööpenhamina valoisa` ja `… amsterdam` + kuva pöydästä (pitkä nimi kavennetussa näytössä, PoytaKohdeMinPt 13). R4 = Valosepän koko näkymä.
   Rattaan napautus skenaariossa: iPhone tap 316 808, iPad 537 1166 (tarkista R1-kuvasta).
4. **Pari PT:lle → KK täysikokoisena**, tarkistuskohdat: 1) osuma ≥ 44 pt (poyta tila -tulosteesta), 2) KÖÖPENHAMINA/AMSTERDAM mahtuvat,
   3) iPhonella SUUNTA-sauvan rengas ei leikkaudu pyöristettyyn kulmaan (laskettu: rengas 337–387 pt, kulma ~55 pt → mahtuu; näytä kuvassa).
5. Hyväksynnän jälkeen a45af2f97 (tai korjattu) NS:lle (local_674b9ec4-…) junaan 201.

## Muut haarat
- natiivi-ui/kehyshaivytys-201 ec5819d17 (vanha pohja ed0654c54) ja -201c 8111db02b: korvautuvat ratas-201b:llä.
- natiivi-ui/kohdevalikko-201 5dc2bf8a8 (NUI:n oma ikkunaton + Pysaytyskuva): HYLÄTTY (Valosepän versio voimassa); worktree pois mergen jälkeen.
- Juna 201:ssä jo: maakunta fef47c0aa, lasipohja 00228d16d (NS kuittasi 00.1x).
- Luonnokset: _tyo/natiivi-ui/iss-hammasratas-luonnos-0003 (vanha) ja -0024 (KK hyväksyi).
- Pulun uni historialinsseissä 3fa8d8fe5: KS yhdistää kiina-paketti-200:aan (ennallaan).

## LEVY (PT:n pyyntö, lukituksen jälkeen; ei tehty)
Pois: _tyo/natiivi-ui/{ohjauspoyta-201-app, yhteis-pariisi-200f-app, kehyshaivytys-201-app} (~1,8 Gt); worktreet proto-natiivi-ui-ohjauspoyta-201
(kaikki junassa 200) ja -museo-ikortti-198 (git cherry: 0 puuttuu) `git -C /Users/Shared/Claude/proto-3d/Matkakirja-proto worktree remove …`;
tyhjät wt/natiivi-ui-tyylikirja-museo ja wt/proto-natiivi-ui-rakettikuva. Muut worktreet: puuttuvia committeja → jätä. Levy 95 % (45 Gt vapaana 00.1x).

## Opit
- PT:n viestit voivat tulla jonossa myöhässä: ennen isoa erää tarkista `git branch -a | grep <aihe>` muiden roolien haarat (sama työ kahdesti 00.3x).
- Pöydän muutos = Blender: `/Applications/Blender.app/Contents/MacOS/Blender -b --factory-startup --python tyokalut/ohjauspoyta/poyta.py -- <ulos>`
  (~1 min) → `python3 tyokalut/ohjauspoyta/jalki.py <ulos>/taysi <ulos>/res` → kopioi Resources/IssOhjauspoyta/ (uusille png:ille .meta lento-alas-mallista uudella guidilla).
- Pohjavahti hylkää rgba-literaalit uss:ssä: läpinäkyvä = var(--lapinakyva).
- Yksi käännös kaikille pinotuille erille (kärki sisältää alemmat) säästää linjan vuoron.
