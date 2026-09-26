# Pelikoodarin luovutus 26.9.2026 klo 16.1x (konteksti 74 %, Fablen käsky)

Jatkoa luovutukselle `viesti-pelikoodari-luovutus-20260925-yo3.md` (osiot 20–24 kattavat tämän session yksityiskohdat).
Kaikki alla oleva on pushattu; työn alla ei ole commitoimatonta.

## 1. Valmista tällä sessiolla (mainissa / natiivin junassa)
- **Musiikki vaiheet 2+3** (omistaja hyväksyi 28 raitaa): web #3314 mainissa (v2266); natiivi musiikki-vaihe2 dab360d2 →
  build 21 (simulaattori PASS lokit/musiikki-v23/todennus.log; Laitetestaaja PASS laitteella). Määrittely
  proto-3d/lokit/musiikki-vaihe2-kytkenta-maarittely.md. Maanosaraita = alueraidan varareitti (Fable kuittasi tulkinnan).
  Ratkaisu/epäonnistuminen vain kohtaamisen kysymyksessä (Fable: niukkuus). Siirtoseppä vei musiikkiaihe-rivit 1.50:een.
- **155**: kynnys 2,5, koko 0,85 (omistaja 10.4x). Web #3311 mainissa, natiivi junassa.
- **8l4-savuke** vihreäksi #3319 mainissa (vartion ajoituskilpailu, ei tuotevika; 8k ja 8l4 pois tunnetuista punaisista).
- **162**: PeliOhjain.SaapumisluentaKesken + SaapumisluentaPaattyi (23f262bf); Linssiseppä kytki ElavaKartan odottamaan.
- **163**: kiirejonon nälkä löydetty (Laattapalvelin :849, :80) → Natiiviseppä korjasi (a9ca03c9); natiivin Maailma-tila =
  kehittäjän maailmahyppy → 02ce33d2 esilataa kohdealueen kuten lento. Todennäköisin juurisyy oli 165 (Natiivi-UI).
- **Esilataaja erä 5** (1.0.23-junassa, juna/b13 b449f4be): Tehtava-API (Natiiviseppä käyttää laatoille), LaattaOsumat,
  mittarin HUDIT, käynnistyksen 44 kokoelman esilataus, VANHA SISÄLTÖ (oma levy aina, buildin tilannekuva ≤ 14 vrk
  `julkaistu`-kentästä; laatat.json/offline.json aina tuoreina), tilannekuva 15 tiedostoa (web #3327 + C#-lista
  TilannekuvaRakennus), PeliOhjain.HaeTiedosto → Sisalto.HaePaketista, avauskuvat lehden saavuttua (LehdetSaapuivat),
  VARTIJA (INFO) verkko-savukkeeseen. KYLMÄ TULOS: sisällön osuma 15 % → 82 %, odotus 20,6 → 2,2 s, aloitusverho 5,4 → 3,8 s
  (lokit/esilataaja-5/kylma4/RAPORTTI.txt). Fable ja Natiiviseppä kuittasivat.
- **Maanosa kaupungeille ilman cityCountryä** (Maailma-lauta, Jerusalem, St. Helena): natiivi junassa (f81d8368).

## 2. AVOINNA / JONO
1. **#3323** (web, maanosa-kaupungit, 4378/0) auki Julkaisijan jonossa — seuraa merge; poista sitten worktree
   `tools/uusi-worktree.sh --poista pelikoodari-maanosa-kaupungit`.
2. **155 web-PR:n tila**: #3311 MERGED 26.9. klo 11.05 (UTC 08.05) — valmis, tarkista vain että tuotanto näyttää 0,85.
3. **Esilataaja-mittarin savukevartija**: VARTIJA (INFO) on verkko-savukkeessa (0ce88be0). Jatko: jos Fable haluaa sen CI:n
   Savukkeet-sarjaan, se on natiivisavuke (simulaattori) → ei PR-porttiin; kysy Fablelta/Julkaisijalta paikka.
4. **Tilannekuvan tuoreus**: buildin tilannekuva haetaan käännöshetkellä tuotannosta (TilannekuvaRakennus.Varmista).
   VANHA SISÄLTÖ käyttää sitä ≤ 14 vrk. Kun tilannekuva on eri versio kuin tuotanto, polkua ei ole vielä todennettu
   simulaattorissa (kylmätestissä tilannekuva = uusin, vanhaaKaytetty 0). Todennus: käännä, odota kunnes tuotanto etenee
   yhden version (tai aseta Documents/sisalto-koe), aja kylmä verkko-savuke → RAPORTTI "VANHAA SISÄLTÖÄ KÄYTETTY" > 0.
5. **Astronautin kamera (ei kiire, ISS:n jälkeen)**: webin Arvaa kohde -tila (Lippuarvauksen kaava, etäisyys → pisteet) ja
   aikasarjat aikaselaimella js/…/satelliitti.js:ään. Linssiseppä kirjaa suunnitelman → sinulta arvio riveinä.
6. **Laatat (Natiivisepän)**: aloituslennon musta 5,0 s, LAATAT-osuma 20 % — ei sinun, mutta mittari on sinun.
7. **#3274** (loydos135-web) auki — tila selvittämättä tässä sessiossa.

## 3. Opit
- **Käännöspalvelun Build-kansio on jaettu**: kopioi .app HETI käännöksen perään samassa komennossa (seuraava käännös korvaa).
- **Taustaodotukset**: älä jätä vanhoja `until …; ajo` -odottajia päälle — yksi käynnisti klo 16.06 ylimääräisen savukkeen ja
  tyhjensi tuloskansion. Tapa odottajat (pkill/TaskStop) ennen uutta; tulosta tulokset myös tiedostoon.
- `pgrep -f "aja-sarja"` osuu omaan zsh-komentoriviinsä → käytä `[a]ja-sarja`-kuviota.
- Simulaattoriajo vain Julkaisijan "nyt"-kuittauksella ja kun `booted < 2`; muistipaine iltapäivällä.
- SendMessage-raja (~10/vuoro) → varakanava `mcp__ccd_session_mgmt__send_message` session id:llä (Fable sitova).
- Laitetestaajan musiikki-FAILit (b20 E, b21 vaihe 2) olivat testijärjestystä: aihe/tulos ei katkaise soivaa aihetta.
- Natiivin kokoelmahaku kulki kahta reittiä (PeliOhjain oma + Sisalto) → nyt yksi (Sisalto.HaePaketista).

## 4. Tiedostot ja työkalut
- Kylmä mittaus: `ENNAKOINTI=1 Peli-testit/verkko-savuke.sh <app> A2FD9C9F-… <kansio>` → RAPORTTI (ESILATAAJA, HUDIT, LAATAT,
  VANHAA SISÄLTÖÄ, VARTIJA (INFO)).
- Kuvaparit: lokit/loydos155/kreikka-{web.mjs,natiivi.sh} (natiivi: muste loyda GRC → aja → nipistys kerroin ~3).
- Musiikki: tools/viimeistele-musiikki.mjs (RAIDAT-taulu, RAJOITIN_DB 3), generoi-musiikki.mjs (vaihe1–3).
- Pariteettisimulaattorit tyhjennetty (erase) 26.9. klo 16.1x; kaikki sammutettuina.
- Worktreet jäljellä: pelikoodari-maanosa-kaupungit (#3323), pelikoodari-loydos135-web (#3274), pelikoodari-vanha-checkout (0 t).
